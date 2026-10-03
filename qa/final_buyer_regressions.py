"""Focused buyer regressions. Local preview only; all records are synthetic.
Run after the production build/preview has been restarted with the fixes.
Writes its report and optional failure screenshot to evidence/.
"""
import asyncio, json, re, sys, uuid
from pathlib import Path
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'qa'))
from browser_support import BASE, launch
from playwright.async_api import async_playwright

OUTPUT = ROOT / 'evidence/final-buyer-regressions.json'

async def main():
    checks, errors = [], []
    async with async_playwright() as p:
        browser = await launch(p)
        context = await browser.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True)
        page = await context.new_page()
        page.set_default_timeout(30000)
        page.on('pageerror', lambda err: errors.append(str(err)))
        other = None

        def passed(name):
            checks.append(name)
            print('PASS', name, flush=True)

        async def go(path):
            response = await page.goto(BASE + path, wait_until='networkidle')
            assert response.status == 200, (path, response.status)

        async def state(ctx=None):
            response = await (ctx or context).request.get(BASE + '/api/demo')
            assert response.status == 200
            return (await response.json())['state']

        async def post(action, expected=200, ctx=None):
            response = await (ctx or context).request.post(BASE + '/api/demo', data=action)
            data = await response.json()
            assert response.status == expected, (action['type'], response.status, data.get('error'))
            return data

        async def draft():
            return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")

        async def design_text(front, back, sq=False):
            prefix = '/sq' if sq else ''
            await go(prefix + '/design')
            await page.get_by_role('button', name='Box', exact=True).click()
            await page.get_by_role('tab', name=re.compile(r'^02 ')).click()
            await page.get_by_role('button', name='Përpara' if sq else 'Front', exact=True).click()
            await page.get_by_role('group', name='Zgjidhni shtresën e dizajnit' if sq else 'Select artwork layer').get_by_role('button', name=re.compile(r'^(Tekst|Text)')).click()
            await page.get_by_label('Emri i markës ose mesazhi' if sq else 'Brand name or message', exact=True).fill(front)
            await page.get_by_role('button', name='Ndrysho prapa' if sq else 'Edit back', exact=True).click()
            await page.get_by_role('group', name='Zgjidhni shtresën e dizajnit' if sq else 'Select artwork layer').get_by_role('button', name=re.compile(r'^(Tekst|Text)')).click()
            await page.get_by_label('Emri i markës ose mesazhi' if sq else 'Brand name or message', exact=True).fill(back)
            # Keep the back selected to exercise a proof which previously hid the front.
            value = await draft()
            assert value['text'] == front and value['backText'] == back
            await go(prefix + '/quote')

        async def complete_quote(sq=False):
            for _ in range(6):
                save = page.get_by_role('button', name='Ruaj kërkesën e dizajnit' if sq else 'Save design request', exact=True)
                if await save.is_visible():
                    await page.locator('#q-company').fill('Fictional final buyer QA')
                    await page.locator('#q-contact').fill('Test Buyer')
                    await page.locator('#q-email').fill('buyer@example.com')
                    await page.get_by_role('checkbox').check()
                    async with page.expect_response(lambda r: r.url.endswith('/api/demo') and r.request.method == 'POST') as response_info:
                        await save.click()
                    response = await response_info.value
                    data = await response.json()
                    assert response.status == 200, data
                    await page.get_by_role('heading', name='Çanta juaj ka një fillim.' if sq else 'Your bag has a beginning.', exact=True).wait_for()
                    assert parse_qs(urlparse(page.url).query).get('submitted') == [data['id']]
                    return data['id']
                if await page.locator('#q-city').is_visible():
                    await page.locator('#q-city').fill('Prishtina')
                await page.get_by_role('button', name='Vazhdo' if sq else 'Continue', exact=True).click()
            raise AssertionError('Quote never reached final submission')

        async def assert_not_success(reference):
            await go('/quote?submitted=' + reference)
            assert await page.get_by_role('heading', name='Your bag has a beginning.', exact=True).count() == 0, 'Unowned/invalid URL claims a saved request'
            assert await page.get_by_role('link', name='Explore next steps', exact=True).count() == 0, 'Unowned/invalid reference exposes a next-step success link'

        try:
            await go('/quote')
            assert (await state())['requests'] == []

            await design_text('QA FIRST DESIGN', 'QA FIRST BACK')
            first = await complete_quote()
            saved = (await state())['requests']
            assert len(saved) == 1 and saved[0]['snapshot']['text'] == 'QA FIRST DESIGN'
            assert saved[0]['snapshot']['product'] == 'box-bag', 'Quote form lost the selected bag family'
            first_snapshot = saved[0]['snapshot']

            # Do not use Start another request: normal navigation must create a new request.
            await design_text('QA SECOND DESIGN', 'QA SECOND BACK')
            second = await complete_quote()
            saved = (await state())['requests']
            assert second != first and len(saved) == 2, 'An edited bag was silently deduplicated against its earlier request'
            by_id = {r['id']: r for r in saved}
            assert by_id[first]['snapshot']['text'] == 'QA FIRST DESIGN'
            assert by_id[second]['snapshot']['text'] == 'QA SECOND DESIGN'
            assert by_id[second]['snapshot']['backText'] == 'QA SECOND BACK'
            passed('consecutive UI submissions preserve two different front/back designs')

            await assert_not_success('KBG-DOESNOTEXIST')
            await assert_not_success('invalid-reference')
            other = await browser.new_context()
            assert (await state(other))['requests'] == []
            foreign = await post({'type': 'submit', 'design': {**first_snapshot, 'key': str(uuid.uuid4()), 'text': 'FOREIGN WORKSPACE'}}, ctx=other)
            await assert_not_success(foreign['id'])
            assert len((await state())['requests']) == 2
            passed('invalid and foreign success references cannot claim saved requests')

            await design_text('QA SHQIP FRONT', 'QA SHQIP BACK', sq=True)
            third = await complete_quote(sq=True)
            assert urlparse(page.url).path == '/sq/quote', 'Successful SQ submission changed to English URL'
            await page.reload(wait_until='networkidle')
            await page.get_by_role('heading', name='Çanta juaj ka një fillim.', exact=True).wait_for()
            assert await page.locator('html').get_attribute('lang') == 'sq'
            assert parse_qs(urlparse(page.url).query)['submitted'] == [third]
            passed('Albanian success URL, refresh and saved reference remain Albanian')

            for invalid_date in ['2099-02-30', '2099-13-01', '2099-00-10']:
                invalid = {**first_snapshot, 'key': str(uuid.uuid4()), 'date': invalid_date}
                await post({'type': 'submit', 'design': invalid}, expected=400)
            assert len((await state())['requests']) == 3
            passed('impossible calendar dates are rejected without creating requests')

            await post({'type': 'prepare-demo', 'id': first})
            await post({'type': 'issue-quote', 'id': first, 'unitCents': 45, 'setupCents': 12000, 'validUntil': '2099-02-30', 'terms': 'Fictional QA quote', 'payment': 'not-required'}, expected=400)
            await post({'type': 'quote-change', 'id': first, 'version': 1, 'comment': 'Fictional QA: please revise this quote.'})
            await post({'type': 'accept-quote', 'id': first, 'version': 1}, expected=400)
            record = next(r for r in (await state())['requests'] if r['id'] == first)
            assert record['quotes'][-1]['status'] == 'changes-requested'
            await post({'type': 'issue-quote', 'id': first, 'unitCents': 46, 'setupCents': 12000, 'validUntil': '2099-12-31', 'terms': 'Fictional revised QA quote', 'payment': 'not-required'})
            await post({'type': 'accept-quote', 'id': first, 'version': 1}, expected=400)
            await post({'type': 'accept-quote', 'id': first, 'version': 2})
            passed('pending-change and stale quote acceptance blocked; revised quote accepted')

            await post({'type': 'artwork-change', 'id': first, 'version': 1, 'comment': 'Fictional QA: replace the front text.'})
            await post({'type': 'issue-artwork', 'id': first, 'caption': 'QA APPROVED VERSION TWO'})
            await go('/demo/customer?id=' + first)
            await page.get_by_role('tab', name=re.compile(r'^Artwork')).click()
            await page.get_by_text('ARTWORK PROOF · V2', exact=True).wait_for()
            proof = page.locator('.proof-preview')
            front_canvas = proof.locator('canvas[aria-label*="front branding preview"]')
            back_canvas = proof.locator('canvas[aria-label*="back branding preview"]')
            # Supports paired previews or a compact face selector, without accepting a hidden unreviewable face.
            previews = {}
            for face in ['front', 'back']:
                canvas = proof.locator(f'canvas[aria-label*="{face} branding preview"]')
                if not await canvas.is_visible():
                    control = proof.get_by_role('button', name=face.capitalize(), exact=True)
                    if not await control.count():
                        control = proof.get_by_role('tab', name=face.capitalize(), exact=True)
                    assert await control.count(), f'Approved proof has no way to inspect {face}'
                    await control.click()
                    canvas = proof.locator(f'canvas[aria-label*="{face} branding preview"]')
                await canvas.wait_for(state='visible')
                await page.wait_for_function('(face) => { const c = document.querySelector(`.proof-preview canvas[aria-label*="${face} branding preview"]`); return c?.dataset.ready === "true"; }', arg=face)
                previews[face] = await canvas.evaluate('(c) => c.toDataURL()')
            assert previews['front'] != previews['back'], 'Different front/back artwork rendered identically'
            await page.get_by_role('button', name='Approve this revision', exact=True).click()
            await page.get_by_role('button', name='Artwork approved', exact=True).wait_for()
            passed('both faces are reviewable before approving revised artwork v2')

            await post({'type': 'release', 'id': first})
            # An unrelated unfinished design must not leak optional layers into a reorder.
            await page.evaluate("""() => {
                const saved = JSON.parse(localStorage.getItem('kobags-design-v1'));
                Object.assign(saved, {layeredArtwork:true, textFont:'mono', backInk:'#ff00ff',
                    textPlacement:{x:12,y:18,scale:22,rotation:31},
                    backTextPlacement:{x:85,y:82,scale:19,rotation:17}});
                localStorage.setItem('kobags-design-v1', JSON.stringify(saved));
            }""")
            await go('/demo/customer?id=' + first)
            await page.get_by_role('tab', name='Timeline', exact=True).click()
            await page.get_by_role('button', name='Request these bags again', exact=True).click()
            await page.wait_for_url('**/quote')
            repeated = await draft()
            assert repeated['text'] == 'QA APPROVED VERSION TWO', 'Reorder restored original artwork instead of ordered v2'
            assert repeated['backText'] == 'QA FIRST BACK'
            assert repeated['reorderOf'] == first and repeated['key'] != first_snapshot['key']
            assert repeated['date'] == '' and repeated['consent'] is False
            ordered = next(r for r in (await state())['requests'] if r['id'] == first)['artworks'][-1]['design']
            for key in ['layeredArtwork', 'textFont', 'backInk', 'textPlacement', 'backTextPlacement']:
                assert repeated.get(key) == ordered.get(key), f'Reorder leaked unrelated draft field: {key}'
            fourth = await complete_quote()
            record = next(r for r in (await state())['requests'] if r['id'] == fourth)
            assert record['snapshot']['text'] == 'QA APPROVED VERSION TWO'
            assert record['snapshot']['backText'] == 'QA FIRST BACK'
            assert record['quotes'] == [] and record['artworks'] == [] and not record.get('order')
            passed('reorder preserves ordered artwork v2 and needs fresh approvals')

            assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth'), 'Mobile success page overflows'
            assert not errors, errors
            OUTPUT.write_text(json.dumps({'status': 'passed', 'checks': checks, 'browserErrors': errors, 'requests': [first, second, third, fourth]}, indent=2))
            print('PASS focused buyer regression checks; evidence:', OUTPUT, flush=True)
        except Exception as exc:
            OUTPUT.write_text(json.dumps({'status': 'failed', 'checks': checks, 'error': str(exc), 'browserErrors': errors, 'url': page.url}, indent=2))
            await page.screenshot(path=str(ROOT/'evidence/final-buyer-regressions-failure.jpg'), type='jpeg', quality=84, full_page=True)
            raise
        finally:
            if other:
                await other.close()
            await browser.close()

asyncio.run(main())
