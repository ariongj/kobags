"""Lost-response inquiry retries against isolated local synthetic records."""
import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE, launch

ROOT = Path(__file__).resolve().parents[1]

async def main():
    results, errors = [], []
    async with async_playwright() as playwright:
        browser = await launch(playwright)
        for route_path in ['/contact', '/samples', '/partners/apply']:
            for changed in [False, True]:
                context = await browser.new_context(viewport={'width':390, 'height':844})
                page = await context.new_page()
                page.on('pageerror', lambda error: errors.append(str(error)))
                await page.goto(BASE + route_path, wait_until='networkidle')
                for field, value in {'company':'Fictional retry check','contact':'Test Buyer','email':'test@example.com','country':'Kosovo','message':'Original inquiry for QA'}.items():
                    await page.locator('#inquiry-' + field).fill(value)
                await page.get_by_role('checkbox').check()
                captured = []
                async def lose_response(route):
                    if route.request.method == 'POST':
                        response = await route.fetch()
                        assert response.status == 200
                        captured.append(await response.json())
                        await route.abort('failed')
                    else:
                        await route.continue_()
                await page.route('**/api/demo', lose_response)
                await page.get_by_role('button', name='Save inquiry', exact=True).click()
                await page.get_by_role('alert').wait_for()
                await page.unroute('**/api/demo', lose_response)
                assert len(captured) == 1
                if changed:
                    await page.locator('#inquiry-message').fill('Changed inquiry after the lost response')
                await page.get_by_role('button', name='Save inquiry', exact=True).click()
                await page.get_by_role('heading', name='Your inquiry is saved.', exact=True).wait_for()
                response = await context.request.get(BASE + '/api/demo')
                inquiries = (await response.json())['state']['inquiries']
                assert len(inquiries) == (2 if changed else 1), inquiries
                if changed:
                    assert 'Changed inquiry after the lost response' in inquiries[0]['message']
                    assert inquiries[0]['id'] != captured[0]['id']
                else:
                    assert inquiries[0]['id'] == captured[0]['id']
                assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')
                results.append({'route':route_path,'editedRetry':changed,'savedCount':len(inquiries),'status':'passed'})
                print(results[-1], flush=True)
                await context.close()
        await browser.close()
    assert not errors, errors
    (ROOT/'evidence/inquiry-retry-checks.json').write_text(json.dumps({'status':'passed','cases':results,'browserErrors':errors}, indent=2))

asyncio.run(main())
