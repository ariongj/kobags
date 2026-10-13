"""Launch conversion checks: local synthetic requests; no emails are sent."""
import asyncio, json, uuid
from pathlib import Path
from urllib.parse import unquote
from playwright.async_api import async_playwright
from browser_support import BASE, launch

ROOT = Path(__file__).resolve().parents[1]

async def main():
    checks, errors = [], []
    async with async_playwright() as playwright:
        browser = await launch(playwright)
        async def accessible_receipt(page):
            await page.add_script_tag(path=str(ROOT/'node_modules/axe-core/axe.min.js'))
            violations = await page.evaluate("""async()=>{
              const result=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});
              return result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}));
            }""")
            assert not violations, violations
        for language in ['', '/sq']:
            for route in ['/contact', '/samples', '/partners/apply']:
                context = await browser.new_context(viewport={'width':390, 'height':844}, reduced_motion='reduce')
                page = await context.new_page()
                page.on('pageerror', lambda error: errors.append(str(error)))
                await page.goto(BASE + language + route, wait_until='networkidle')
                for field, value in {'company':'Synthetic launch audit', 'contact':'Test Buyer', 'email':'launch@example.test', 'country':'Kosova', 'message':'Please confirm availability for our launch test.'}.items():
                    await page.locator('#inquiry-' + field).fill(value)
                await page.get_by_role('checkbox').check()
                await page.locator('.inquiry-form button[type=submit]').click()
                heading = 'Kërkesa juaj është përgatitur.' if language else 'Your inquiry is prepared.'
                await page.get_by_role('heading', name=heading, exact=True).wait_for()
                assert 'prepared=' in page.url
                link = page.locator('.prepared-request-actions a.button')
                email = unquote(await link.get_attribute('href'))
                assert 'launch@example.test' in email and 'Please confirm availability' in email
                assert 'mailto:info@kobags-group.com?' in email
                await page.reload(wait_until='networkidle')
                await page.get_by_role('heading', name=heading, exact=True).wait_for()
                assert unquote(await link.get_attribute('href')) == email
                assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')
                await accessible_receipt(page)
                stranger = await browser.new_context()
                other = await stranger.new_page()
                await other.goto(page.url, wait_until='networkidle')
                assert await other.get_by_role('heading', name=heading, exact=True).count() == 0
                assert 'launch@example.test' not in await other.locator('main').inner_text()
                await stranger.close()
                checks.append(language + route + ': explicit email handoff, immutable reload receipt, browser ownership and mobile fit')
                await context.close()

            context = await browser.new_context(viewport={'width':390, 'height':844}, reduced_motion='reduce')
            page = await context.new_page()
            page.on('pageerror', lambda error: errors.append(str(error)))
            await page.goto(BASE + language + '/quote', wait_until='networkidle')
            await page.wait_for_function("localStorage.getItem('kobags-design-v1')")
            await page.evaluate("""key => {
                const d=JSON.parse(localStorage.getItem('kobags-design-v1'));
                Object.assign(d,{key,company:'Synthetic launch audit',contact:'Test Buyer',email:'launch@example.test',city:'Prishtina',country:'Kosova',quantity:5000,date:'',consent:false,text:'SAVED FRONT',backText:'SAVED BACK',note:'Saved request details'});
                localStorage.setItem('kobags-design-v1',JSON.stringify(d));
                localStorage.setItem('kobags-quote-step','3');
            }""", str(uuid.uuid4()))
            await page.reload(wait_until='networkidle')
            await page.get_by_role('checkbox').check()
            await page.get_by_role('button', name='Ruaj kërkesën e dizajnit' if language else 'Save design request', exact=True).click()
            heading = 'Kërkesa e dizajnit është përgatitur.' if language else 'Your design request is prepared.'
            await page.get_by_role('heading', name=heading, exact=True).wait_for()
            assert await page.locator('main a[href*="/demo/"]').count() == 0
            link = page.locator('.prepared-request-actions a.button')
            email = unquote(await link.get_attribute('href'))
            assert all(value in email for value in ['SAVED FRONT','SAVED BACK','5000','launch@example.test','Saved request details'])
            await page.evaluate("""()=>{const d=JSON.parse(localStorage.getItem('kobags-design-v1'));d.text='LATER EDIT';localStorage.setItem('kobags-design-v1',JSON.stringify(d));}""")
            await page.reload(wait_until='networkidle')
            await page.get_by_role('heading', name=heading, exact=True).wait_for()
            assert unquote(await link.get_attribute('href')) == email
            if not language:
                async with page.expect_download() as download:
                    await page.get_by_role('button', name='Download saved design', exact=True).click()
                content = Path(await (await download.value).path()).read_bytes()
                assert content[:8] == b'\x89PNG\r\n\x1a\n'
                assert int.from_bytes(content[16:20], 'big') == 2000 and int.from_bytes(content[20:24], 'big') == 1220
            assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')
            await accessible_receipt(page)
            checks.append(language + '/quote: email contains immutable saved specification and both faces, preview download, no fictional ordering path, mobile fit')
            await context.close()
        await browser.close()
    assert not errors, errors
    report = {'status':'passed', 'checks':checks, 'browserErrors':errors, 'scope':'Local compiled Worker, synthetic contacts; mail links inspected without opening or sending'}
    (ROOT/'evidence/launch-functional-checks.json').write_text(json.dumps(report, indent=2)+'\n')
    print('PASS', len(checks), 'launch conversion checks', flush=True)

asyncio.run(main())
