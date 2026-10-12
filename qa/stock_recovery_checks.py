"""Stock checkout recovery, using isolated local synthetic inquiries only."""
import asyncio,json
from pathlib import Path
from urllib.parse import urlparse,parse_qs,unquote
from playwright.async_api import async_playwright
from browser_support import BASE,launch
ROOT=Path(__file__).resolve().parents[1]
async def main():
 checks=[];errors=[]
 async with async_playwright() as p:
  b=await launch(p)
  for lang in ['', '/sq']:
   for changed in [False,True]:
    context=await b.new_context(viewport={'width':390,'height':844});page=await context.new_page()
    page.on('pageerror',lambda e:errors.append(str(e)))
    await page.goto(BASE+lang+'/quote?collection=smiley',wait_until='networkidle')
    assert await page.locator('[name=contact]').get_attribute('maxlength')=='100'
    assert await page.locator('[name=country]').get_attribute('maxlength')=='100'
    await page.locator('.stock-form select').select_option('gsm-50-white')
    for field,value in {'company':'Synthetic stock audit','contact':'Test Buyer','email':'audit@example.test','city':'Prishtina','country':'Kosova'}.items():
     await page.locator('[name='+field+']').fill(value)
    await page.locator('textarea').fill('Original delivery note');await page.get_by_role('checkbox').check()
    captured=[]
    async def lose_response(route):
     if route.request.method=='POST':
      response=await route.fetch();assert response.status==200
      captured.append(await response.json());await route.abort('failed')
     else:await route.continue_()
    await page.route('**/api/demo',lose_response)
    await page.locator('.stock-form > button').click();await page.get_by_role('alert').wait_for()
    await page.unroute('**/api/demo',lose_response);assert len(captured)==1
    if changed:await page.locator('textarea').fill('Updated delivery note')
    await page.locator('.stock-form > button').click()
    receipt='Kërkesa për stokun është përgatitur.' if lang else 'Your stock request is prepared.'
    await page.get_by_role('heading',name=receipt,exact=True).wait_for()
    saved=parse_qs(urlparse(page.url).query)['prepared'][0]
    state=await (await context.request.get(BASE+'/api/demo')).json()
    assert len(state['state']['inquiries'])==(2 if changed else 1)
    assert (saved!=captured[0]['id'])==changed
    expected='Updated delivery note' if changed else 'Original delivery note'
    mail=unquote(await page.locator('main a[href^="mailto:"]').get_attribute('href'))
    assert expected in mail and 'audit@example.test' in mail
    await page.reload(wait_until='networkidle');await page.get_by_role('heading',name=receipt,exact=True).wait_for()
    assert expected in await page.locator('main').inner_text()
    assert await page.evaluate("sessionStorage.getItem('kobags-stock:smiley')") is None
    assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
    stranger=await b.new_context();other=await stranger.new_page()
    await other.goto(page.url,wait_until='networkidle')
    assert await other.get_by_role('heading',name=receipt,exact=True).count()==0
    assert await other.get_by_role('alert').count()==1
    assert 'audit@example.test' not in await other.locator('main').inner_text()
    await other.locator('[name=company]').fill('New browser buyer')
    await other.reload(wait_until='networkidle')
    assert await other.locator('[name=company]').input_value()=='New browser buyer'
    await stranger.close()
    checks.append(('SQ' if lang else 'EN')+(' edited' if changed else ' unchanged')+': lost response retry, receipt reload, immutable email and browser ownership')
    await context.close()
  context=await b.new_context();page=await context.new_page()
  await page.add_init_script("sessionStorage.setItem('kobags-stock:smiley',JSON.stringify({variant:'gsm-50',company:'Kept buyer'}))")
  await page.goto(BASE+'/quote?collection=smiley',wait_until='networkidle')
  assert 'no longer available' in await page.get_by_role('status').inner_text()
  assert await page.locator('.stock-form > button').is_disabled()
  assert await page.locator('[name=company]').input_value()=='Kept buyer'
  checks.append('Removed stock variant shows recovery guidance and retains buyer details')
  await b.close()
 assert not errors,errors
 (ROOT/'evidence/stock-recovery-checks.json').write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors},indent=2)+'\n')
 print('PASS',len(checks),'stock recovery checks')
asyncio.run(main())
