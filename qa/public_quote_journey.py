"""Public four-step quote journey with synthetic buyers; studio remains unavailable."""
import asyncio, copy, json, os, uuid
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE, launch

ROOT = Path(__file__).resolve().parents[1]

async def main():
    checks, errors = [], []
    async with async_playwright() as playwright:
        browser = await launch(playwright)
        owner = await browser.new_context(extra_http_headers={'cf-connecting-ip':'live-launch-'+uuid.uuid4().hex})
        async def post(path, data):
            result = await owner.request.post(BASE+path, data=data, headers={'Origin':BASE})
            assert result.status == 200, (path,result.status,(await result.text())[:200])
            return await result.json()
        await post('/api/cms/login', {'email':os.environ.get('KOBAGS_QA_EMAIL','info@itdks.tech'),'password':os.environ['KOBAGS_QA_PASSWORD']})
        async def settings():
            records = (await (await owner.request.get(BASE+'/api/cms/records')).json())['records']
            return next(record for record in records if record['kind']=='settings')
        original = await settings()
        async def change(action, data=None):
            current=await settings()
            return await post('/api/cms/records', {'id':current['id'],'action':action,'revision':current['revision'],**({'data':data} if data else {})})
        enabled=copy.deepcopy(original['published'] or original['draft']); enabled['settings']['liveInquiries']=True
        await change('save', enabled); await change('publish')
        try:
            for language in ['', '/sq']:
                context = await browser.new_context(viewport={'width':390,'height':844}, reduced_motion='reduce',extra_http_headers={'cf-connecting-ip':'buyer-'+uuid.uuid4().hex})
                page=await context.new_page();page.set_default_timeout(60000)
                page.on('pageerror',lambda error:errors.append(str(error)))
                await page.goto(BASE+language+'/quote',wait_until='networkidle')
                next_button=page.get_by_role('button',name='Vazhdo' if language else 'Continue',exact=True)
                await next_button.click();await next_button.click()
                await page.locator('#quantity').fill('4999');await page.locator('#q-city').fill('Prishtina')
                await next_button.click();await page.get_by_role('alert').wait_for()
                await page.locator('#quantity').fill('7000');await next_button.click()
                for field,value in {'company':'Synthetic launch buyer','contact':'Test Buyer','email':'live-launch@example.test','phone':'+38344123456','note':'Local end-to-end launch verification'}.items():
                    await page.locator('#q-'+field).fill(value)
                await page.get_by_role('checkbox').check()
                captured=[]
                async def lose_response(route):
                    if route.request.method=='POST':
                        result=await route.fetch();assert result.status==201,(await result.text())[:200]
                        captured.append(await result.json());await route.abort('failed')
                    else:await route.continue_()
                await page.route('**/api/inquiries',lose_response)
                save=page.get_by_role('button',name='Dërgo kërkesën për ofertë' if language else 'Send quote request',exact=True)
                await save.click();await page.get_by_role('alert').wait_for()
                assert await page.locator('#q-email').input_value()=='live-launch@example.test'
                await page.unroute('**/api/inquiries',lose_response);await save.click()
                heading='Kërkesa juaj u ruajt.' if language else 'Your request is saved.'
                await page.get_by_role('heading',name=heading,exact=True).wait_for()
                reference=captured[0]['id'];assert reference in page.url
                detail=await (await owner.request.get(BASE+'/api/cms/inquiries/'+reference)).json()
                data=detail['inquiry']['data']
                assert not data['text'] and not data['backText'] and not data['elements']
                assert data['quantity']==7000 and data['color']=='Natural' and data['consent'] is True
                assert data['email']=='live-launch@example.test' and data['language']==('sq' if language else 'en')
                assert await page.locator('main a[href^="mailto:"],main a[href*="/demo/"]').count()==0
                await page.reload(wait_until='networkidle');await page.get_by_role('heading',name=heading,exact=True).wait_for()
                assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
                checks.append(('SQ' if language else 'EN')+': Natural default, public specification-only request, all four quote steps, MOQ validation, lost response retry recovers same live inbox reference, immutable CMS snapshot, receipt reload and mobile fit')
                await context.close()
        finally:
            if original['published'] is not None:
                await change('save',original['published']);await change('publish')
            else:await change('unpublish')
            if original['draft']!=original['published']:await change('save',original['draft'])
        await browser.close()
    assert not errors,errors
    (ROOT/'evidence/public-quote-security-journey.json').write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors,'scope':'Local compiled Worker; synthetic buyers; CMS settings restored; no outgoing email'},indent=2)+'\n')
    print('PASS',len(checks),'live buyer journeys',flush=True)

asyncio.run(main())
