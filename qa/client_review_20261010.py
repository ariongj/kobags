"""Client-review regressions against the local compiled Worker; restores CMS fixtures."""
import asyncio, copy, json, os, uuid
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE, launch
ROOT=Path(__file__).resolve().parents[1]

async def main():
 checks=[]; errors=[]
 async with async_playwright() as p:
  browser=await launch(p)
  owner=await browser.new_context(extra_http_headers={'cf-connecting-ip':'198.19.10.'+str(int(uuid.uuid4().hex[:2],16))})
  guest=await browser.new_context(viewport={'width':390,'height':844},has_touch=True)
  page=await guest.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
  async def post(path,data,status=200):
   r=await owner.request.post(BASE+path,data=data,headers={'Origin':BASE})
   assert r.status==status,(path,r.status,(await r.text())[:400]);return await r.json()
  async def records():
   return (await (await owner.request.get(BASE+'/api/cms/records')).json())['records']
  async def action(id,action,data=None,status=200):
   record=next(r for r in await records() if r['id']==id)
   return await post('/api/cms/records',{'id':id,'action':action,'revision':record['revision'],**({'data':data} if data is not None else {})},status)
  async def publish(id,data):
   await action(id,'save',data);await action(id,'publish')
  async def go(route):
   r=await page.goto(BASE+route,wait_until='networkidle');assert r.status==200,(route,r.status)
  await post('/api/cms/login',{'email':'info@itdks.tech','password':os.environ['KOBAGS_QA_PASSWORD']})
  initial=await records();settings=next(r for r in initial if r['kind']=='settings');products=[r for r in initial if r['kind']=='product'];box=next(r for r in products if r['slug']=='box-bag')
  restore=[settings,box];archived=[]
  try:
   edited=copy.deepcopy(box['draft']);edited.update({'activeSizes':['Medium'],'printColors':2});edited['product']['name']='QA Box';edited['product']['image']='/assets/client-2026-09/handle-bag.jpg';edited['productSq']['name']='QA Çanta';edited['product']['variants'][1]['gsm']=95
   await publish(box['id'],edited)
   updated=copy.deepcopy(settings['draft']);updated['settings']['leadTime']='QA production guidance after approval.';updated['settings']['leadTimeSq']='QA afati pas miratimit.';updated['settings']['social']={'instagram':'https://www.instagram.com/kobags-qa-only/'}
   invalid=copy.deepcopy(updated);invalid['settings']['social']['instagram']='https://instagram.com.example.test/profile';await action(settings['id'],'save',invalid,422)
   invalid['settings']['social']['instagram']='javascript:alert(1)';await action(settings['id'],'save',invalid,422)
   await publish(settings['id'],updated)
   await go('/');card=page.locator('.home-product[href="/products/box-bag"]');assert 'QA Box' in await card.inner_text();assert '1 size' in await card.inner_text();assert await card.locator('img').get_attribute('src')==edited['product']['image']
   assert await page.locator('.footer-socials a').get_attribute('href')==updated['settings']['social']['instagram']
   assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
   await go('/sq');assert 'QA Çanta' in await page.locator('.home-product[href="/sq/products/box-bag"]').inner_text()
   await go('/products/box-bag');assert 'up to 2 colors' in await page.locator('main').inner_text();assert 'QA production guidance' in await page.locator('main').inner_text();await page.locator('#detail-size').click();assert await page.get_by_role('option').count()==1;await page.keyboard.press('Escape')
   await go('/sq/products/box-bag');assert 'QA afati pas miratimit.' in await page.locator('main').inner_text()
   await go('/products');await page.locator('[data-slug="box-bag"]').get_by_role('checkbox').check();assert '95' in await page.locator('table').inner_text();assert 'up to 2 colors' in await page.locator('table').inner_text()
   checks.append('CMS names, bilingual copy, custom images, active sizes, comparison GSM, print limits and lead time stay consistent')
   checks.append('Published social profile appears on mobile footer; unsafe and incorrect-platform URLs rejected')
   for product in products:
    if not product['archived']:
     await action(product['id'],'archive');archived.append(product['id'])
   await go('/');assert await page.locator('.home-product').count()==0
   await go('/products');assert await page.locator('.product-card').count()==0;assert '0 bag families' in await page.locator('main').inner_text()
   checks.append('Archived products do not reappear through fallback catalogue data, including an empty catalogue')
  finally:
   for id in archived:await action(id,'unarchive')
   for record in restore:
    if record['published'] is not None:await publish(record['id'],record['published'])
    else:await action(record['id'],'unpublish')
    if record['draft']!=record['published']:await action(record['id'],'save',record['draft'])
  # These requests use isolated demo data only, never a production inbox.
  for slug,name in [('thank-you','Thank you bags'),('smiley','Smiley bags')]:
   await go('/products');assert await page.locator('.home-collection-categories a').count()==2
   await page.locator('a[href="/quote?collection='+slug+'"]').click();await page.wait_for_load_state('networkidle')
   assert name in await page.locator('.quote-collection-note').inner_text()
   await page.get_by_role('button',name='Continue',exact=True).click();await page.reload(wait_until='networkidle')
   assert await page.evaluate('localStorage.getItem("kobags-quote-step:'+slug+'")')=='1'
   await page.get_by_role('link',name='EN: Switch to Albanian',exact=True).click();await page.wait_for_load_state('networkidle')
   assert 'collection='+slug in page.url
   assert await page.evaluate('localStorage.getItem("kobags-quote-step:'+slug+'")')=='1'
   await page.get_by_role('button',name='Vazhdo',exact=True).click();await page.locator('#q-city').fill('Prishtina');await page.get_by_role('button',name='Vazhdo',exact=True).click()
   await page.locator('#q-company').fill('Client Review QA');await page.locator('#q-contact').fill('Test Buyer');await page.locator('#q-email').fill('buyer@example.test')
   await page.locator('#q-note').fill('Collection: '+name+'\n\nRetain this customer note.');await page.get_by_role('checkbox').check()
   async with page.expect_response(lambda r:r.url.endswith('/api/demo') and r.request.method=='POST') as response:
    await page.get_by_role('button',name='Ruaj kërkesën e dizajnit',exact=True).click()
   r=await response.value;assert r.status==200;(saved_id,)=[(await r.json())['id']]
   requests=(await (await guest.request.get(BASE+'/api/demo')).json())['state']['requests'];saved=next(r for r in requests if r['id']==saved_id)
   assert saved['snapshot']['note']=='Collection: '+name+'\n\nRetain this customer note.'
   assert await page.evaluate('localStorage.getItem("kobags-quote-step:'+slug+'")')=='0'
   checks.append(name+': catalogue discovery, refresh/language step recovery, single collection label and successful request')
  assert not errors,errors
  (ROOT/'evidence/client-review-20261010.json').write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors,'scope':'Local compiled Worker, synthetic data, original CMS content restored'},indent=2))
  print('PASS',len(checks),'client-review regression groups');await browser.close()
asyncio.run(main())
