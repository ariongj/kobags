"""Final presentation: Albanian buyer journey, policies, recovery and draft reset, local only."""
import asyncio, json, re, uuid
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE, launch
ROOT=Path(__file__).resolve().parents[1]

async def main():
 async with async_playwright() as p:
  browser=await launch(p)
  context=await browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
  page=await context.new_page();page.set_default_timeout(30000);errors=[];failed_assets=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.on('response',lambda r:failed_assets.append(r.url) if r.status>=400 and r.request.resource_type in ['stylesheet','script','image','font'] else None)
  async def go(path,status=200):
   localized='/sq'+(path if path!='/' else '') if '/sq/' in page.url or page.url.endswith('/sq') else path
   r=await page.goto(BASE+localized,wait_until='networkidle');assert r.status==status,(localized,r.status)
  async def state():return (await (await context.request.get(BASE+'/api/demo')).json())['state']
  async def fits():assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
  await go('/demo/customer');assert (await state())['requests']==[]
  await page.get_by_role('link',name='Switch to Albanian').click()
  await page.get_by_role('heading',name='Dizajni juaj i parë fillon këtu.').wait_for()
  await page.get_by_role('button',name='Krijo shembull fiktiv').click()
  await page.get_by_role('button',name='Përgatit ofertën demo',exact=True).wait_for()
  record=(await state())['requests'][0];rid=record['id'];snapshot=record['snapshot']
  assert snapshot['size']=='Large' and snapshot['color']=='Forest green'
  assert 'E madhe' in await page.locator('.request-overview').inner_text()
  assert 'E gjelbër' in await page.locator('.request-overview').inner_text()
  await page.get_by_role('button',name='Përgatit ofertën demo',exact=True).click()
  await page.get_by_text('OFERTË DEMO · V1',exact=True).wait_for()
  assert 'Çmime fiktive vetëm për demonstrim' in await page.locator('.document-terms').inner_text()
  assert await page.get_by_role('columnheader',name='Artikulli',exact=True).is_visible()
  assert 'Nuk kërkohet' in await page.locator('.quote-document').inner_text()
  async with page.expect_download():await page.get_by_role('button',name='Shkarko ofertën demo',exact=True).click()
  await page.get_by_role('button',name='Prano ofertën demo',exact=True).click();await page.get_by_role('button',name='Pranuar',exact=True).wait_for()
  await page.get_by_role('button',name='Shqyrto dizajnin',exact=True).click()
  await page.get_by_text('PROVA E DIZAJNIT · V1',exact=True).wait_for()
  await page.get_by_role('button',name='Mirato këtë version',exact=True).click();await page.get_by_role('button',name='Dizajni u miratua',exact=True).wait_for()
  await page.get_by_role('button',name='Shqyrto dhe porosit në demo',exact=True).click()
  await page.get_by_text('Oferta e fundit u pranua',exact=True).wait_for()
  await page.get_by_role('button',name='Vendos porosinë demo',exact=True).click()
  await page.get_by_role('heading',name='Porosia juaj demo u vendos.',exact=True).wait_for()
  await page.get_by_role('button',name='Shiko porosinë',exact=True).click()
  await page.get_by_text('U miratua dizajni v1',exact=True).wait_for()
  assert 'Prodhimi u planifikua' in await page.locator('.handoff').inner_text()
  month=['janar','shkurt','mars','prill','maj','qershor','korrik','gusht','shtator','tetor','nëntor','dhjetor'][await page.evaluate('new Date().getMonth()')]
  assert month in await page.locator('.timeline').inner_text(), 'Timeline dates must stay Albanian even in browsers without sq locale data'
  assert (await state())['requests'][0]['snapshot']==snapshot, 'Display translations must preserve the stored design'
  await fits()
  await page.evaluate('document.activeElement?.blur(); window.scrollTo({top:0,behavior:"instant"})');await page.wait_for_timeout(150)
  assert await page.locator('.skip-link').evaluate('(e)=>e.getBoundingClientRect().bottom<=0'), 'The skip link should appear only when focused'
  await page.screenshot(path=str(ROOT/'evidence/completion-mobile-order-sq.jpg'),type='jpeg',quality=84)
  # Published or buyer-authored terms must remain intact rather than being auto-translated.
  await go('/demo/customer')
  other_snapshot={**snapshot,'key':str(uuid.uuid4()),'company':'Fictional custom-terms QA','consent':True}
  r=await context.request.post(BASE+'/api/demo',data={'type':'submit','design':other_snapshot});assert r.status==200
  other_id=(await r.json())['id']
  r=await context.request.post(BASE+'/api/demo',data={'type':'issue-quote','id':other_id,'unitCents':42,'setupCents':500,'validUntil':'2099-12-31','terms':'Client-approved custom wording: preserve this exactly.','payment':'not-required'});assert r.status==200
  await go('/demo/customer?id='+other_id)
  await page.get_by_role('tab',name=re.compile('Oferta')).click()
  assert await page.get_by_text('Client-approved custom wording: preserve this exactly.',exact=True).is_visible()
  for path,title in [('/privacy','Privatësia dhe të dhënat tuaja.'),('/terms','Kushte të qarta, që nga fillimi.'),('/cookies','Cookies dhe ruajtja në shfletues.')]:
   await go(path);await page.get_by_role('heading',name=title,exact=True).wait_for();await fits()
   assert await page.locator('html').get_attribute('lang')=='sq'
   assert await page.get_by_role('link',name='Kalo te përmbajtja',exact=True).count()==1
   assert 'This public website demonstration' not in await page.locator('.prose').inner_text()
  before=(await state())['requests']
  await page.evaluate("localStorage.setItem('kobags-quote-step','3');let d=JSON.parse(localStorage.getItem('kobags-design-v1'));d.text='LOCAL DRAFT TO RESET';localStorage.setItem('kobags-design-v1',JSON.stringify(d))")
  await page.reload(wait_until='networkidle')
  await page.get_by_role('button',name='Pastroni dizajnin në këtë shfletues',exact=True).click()
  await page.get_by_role('status').filter(has_text='Dizajni i shfletuesit u pastrua').wait_for()
  draft=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  assert draft['text']!='LOCAL DRAFT TO RESET' and await page.evaluate("localStorage.getItem('kobags-quote-step')")==None
  assert (await state())['requests']==before, 'Clearing a browser draft must preserve submitted records'
  await go('/certifications');assert await page.get_by_text('27 janar 2026',exact=True).count()==2
  assert await page.get_by_text('26 janar 2029',exact=True).count()==2
  for width in [320,390,768]:
   await page.set_viewport_size({'width':width,'height':844})
   for path in ['/privacy','/terms','/cookies','/demo/customer?id='+rid]:
    await go(path);await fits()
   await go('/missing-page-for-qa',404)
   await page.get_by_role('heading',name='Kjo faqe nuk u gjet.',exact=True).wait_for()
   assert await page.get_by_role('link',name='Kthehu në ballinë',exact=True).get_attribute('href')=='/sq'
   assert await page.get_by_role('link',name='Hap studion e çantave',exact=True).get_attribute('href')=='/sq/design'
   await fits()
  assert not errors,errors
  assert not failed_assets,failed_assets
  result={'status':'passed','checks':['full Albanian customer quotation/artwork/order journey at 390px','translated specifications, statuses, dates, quote download and timeline','stored design and custom terms unchanged','EN/SQ footer policies and cookie reset retain submitted records','Albanian certificate dates','localized 404 with correct destinations','320/390/768px presentation without horizontal overflow','all requested styles, scripts, images and fonts resolve'],'browserErrors':errors,'failedAssets':failed_assets}
  (ROOT/'evidence/completion-checks.json').write_text(json.dumps(result,indent=2));print('PASS final Albanian buyer journey, footer policies, certificate dates, draft reset and 404 recovery');await browser.close()
asyncio.run(main())
