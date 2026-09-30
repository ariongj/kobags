"""Rendered EN/SQ editorial copy, metadata, media and presentation checks, local only."""
import asyncio, collections, json, re, uuid
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE, launch
ROOT = Path(__file__).resolve().parents[1]
EDITORIAL = 'main h1, main h2, main h3, main p, main figcaption, main summary'

def normalize(text):
    return re.sub(r'\s+', ' ', text).strip().casefold()

async def main():
    async with async_playwright() as p:
        browser = await launch(p)
        context = await browser.new_context(viewport={'width':1440,'height':1000}, extra_http_headers={'oai-authenticated-user-id':'qa-copy-'+str(uuid.uuid4())})
        page = await context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        async def go(path):
            lang = 'sq' if '/sq/' in page.url or page.url.endswith('/sq') else 'en'
            localized = '/sq'+(path if path!='/' else '') if lang=='sq' else path
            response = await page.goto(BASE+localized, wait_until='networkidle')
            assert response.status == 200, (path, response.status)
        await go('/handoff')
        paths = await page.locator('.outline-group a').evaluate_all('(els)=>els.map(a=>a.getAttribute("href"))')
        marketing = [path for path in paths if not path.startswith('/demo/') and path not in ['/handoff','/design','/quote','/privacy','/terms','/cookies']]
        results, headings, descriptions, duplicates = [], {}, {}, []
        for lang in ['en', 'sq']:
            if lang == 'sq':
                await page.get_by_role('link',name='Switch to Albanian').click()
            for path in marketing:
                await go(path)
                assert await page.locator('h1').count() == 1, path
                assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth'), path
                if path == '/':
                    origin = 'Made in Kosova' if lang == 'en' else 'Prodhuar në Kosovë'
                    assert (await page.locator('main').inner_text()).count(origin) == 1
                copy = await page.locator(EDITORIAL).evaluate_all('(els)=>els.filter(e=>e.checkVisibility()).map(e=>({tag:e.tagName,text:e.innerText}))')
                counts = collections.Counter(normalize(e['text']) for e in copy if len(normalize(e['text'])) >= 24)
                repeats = [text for text,count in counts.items() if count>1]
                if repeats: duplicates.append({'path':path,'language':lang,'text':repeats})
                title = await page.locator('main h1').inner_text()
                headings.setdefault(lang, {})[path] = normalize(title)
                if lang == 'en':
                    description = await page.locator('meta[name=description]').get_attribute('content')
                    descriptions[path] = description
                media = await page.locator('main img').evaluate_all('(els)=>els.filter(e=>e.checkVisibility()&&!e.closest("[aria-hidden=true]")).map(e=>({src:e.getAttribute("src"),loaded:e.complete&&e.naturalWidth>0}))')
                # Lazy photos are checked by requesting each distinct file below.
                for src in set(e['src'] for e in media if e['src'] and e['src'].startswith('/')):
                    response = await context.request.get(BASE+src)
                    assert response.status == 200, (path,src,response.status)
                for src in await page.locator('main video source').evaluate_all('(els)=>els.map(e=>e.getAttribute("src"))'):
                    response = await context.request.get(BASE+src, headers={'Range':'bytes=0-1023'})
                    assert response.status in (200,206) and response.headers.get('content-type','').startswith('video/'), (path,src)
                results.append({'path':path,'language':lang,'title':title,'mediaFiles':len(media)})
            assert len(set(headings[lang].values())) == len(headings[lang]), (lang,'Duplicate page headings')
        assert len(set(descriptions.values())) == len(descriptions), 'Repeated marketing descriptions'
        await go('/resources')
        await page.get_by_role('heading',name='Përgatitja e dizajnit për shtyp').wait_for()
        link = page.get_by_role('link',name='Shkarkoni listën',exact=True)
        assert await link.get_attribute('href') == '/documents/buyer-checklist-sq.txt'
        response = await context.request.get(BASE+'/documents/buyer-checklist-sq.txt')
        assert response.status == 200 and 'LISTA PËR BLERËSIT' in await response.text()
        await page.get_by_role('link',name='Kalo në anglisht').click()
        await page.get_by_role('heading',name='Preparing your artwork').wait_for()
        assert await page.get_by_role('link',name='Download checklist',exact=True).get_attribute('href') == '/documents/buyer-checklist.txt'
        response = await context.request.get(BASE+'/documents/buyer-checklist.txt')
        assert response.status == 200 and 'Private demonstration' not in await response.text()
        # Albanian defaults must never hide a separately published editorial revision.
        response = await context.request.post(BASE+'/api/demo',data={'type':'content-save','id':'artwork','body':'A client-reviewed artwork revision.','owner':'QA editor','review':'2026-09-30'})
        assert response.status == 200
        response = await context.request.post(BASE+'/api/demo',data={'type':'content-publish','id':'artwork'})
        assert response.status == 200
        await go('/resources')
        await page.get_by_role('link',name='Switch to Albanian').click()
        await page.get_by_text('A client-reviewed artwork revision.',exact=True).wait_for()
        await go('/products/handle-bag')
        assert 'Indicative dispatch' not in await page.locator('main').inner_text()
        assert 'Dërgesa orientuese' in await page.locator('main').inner_text()
        await go('/')
        assert 'Rrotullo çantën majtas' == await page.locator('.showcase-view-controls button').first.get_attribute('aria-label')
        await page.get_by_role('link',name='Kalo në anglisht').click()
        for width,height,name in [(1440,1000,'desktop'),(390,844,'mobile'),(320,844,'small-mobile')]:
            await page.set_viewport_size({'width':width,'height':height})
            await go('/')
            await page.locator('.showcase-stage').scroll_into_view_if_needed()
            await page.locator('.showcase-canvas[data-status=ready]').wait_for()
            await page.evaluate('window.scrollTo(0,0)')
            await page.screenshot(path=str(ROOT/'evidence'/f'presentation-{name}-home.jpg'), type='jpeg',quality=82,full_page=True)
            assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),width
        assert not errors, errors
        assert not duplicates, duplicates
        await page.goto(BASE+'/handoff', wait_until='networkidle')
        assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
        for label, filename in [('Download code & images','kobags-source.zip'),('Download factory videos','kobags-media.zip')]:
            assert await page.get_by_role('link',name=label,exact=True).is_visible()
            response = await context.request.get(BASE+'/documents/'+filename, headers={'Range':'bytes=0-1023'})
            assert response.status in (200,206) and (await response.body())[:2] == b'PK', filename
        report={'status':'passed','pages':results,'metadataDescriptions':descriptions,'duplicateEditorialBlocks':duplicates,'resourceTranslations':True,'localizedChecklist':True,'publishedRevisionPreserved':True,'browserErrors':errors}
        (ROOT/'evidence/presentation-copy-checks.json').write_text(json.dumps(report,indent=2,ensure_ascii=False))
        print('PASS',len(results),'EN/SQ marketing page checks; unique copy, metadata, media and resource translations')
        await browser.close()
asyncio.run(main())
