"""Run with Python + Playwright against KOBAGS_BASE_URL (local demo default)."""
import asyncio, json, os, re, uuid
from pathlib import Path
from browser_support import BASE, launch
from playwright.async_api import async_playwright
EVIDENCE=Path(__file__).resolve().parents[1]/'evidence'
async def main():
 async with async_playwright() as p:
  browser=await launch(p)
  context=await browser.new_context(viewport={'width':1440,'height':1080},extra_http_headers={'oai-authenticated-user-id':'qa-'+str(uuid.uuid4())})
  initial=(await (await context.request.get(BASE+'/api/demo')).json())['state']
  assert initial['requests']==[] and initial['inquiries']==[], 'Use the compiled local Worker (npm run start), not the shared development mock-auth preview.'
  page=await context.new_page();page.set_default_timeout(45000);failures=[];console=[]
  page.on('pageerror',lambda e:console.append(str(e)))
  async def go(path):
   await page.goto(BASE+path,wait_until='networkidle');await page.wait_for_timeout(250)
  async def post(action):
   res=await context.request.post(BASE+'/api/demo',data=action);return res,await res.json()
  async def state():return (await (await context.request.get(BASE+'/api/demo')).json())['state']
  await go('/')
  await page.get_by_role('link',name='Design your bag',exact=True).first.click()
  await page.locator('.bag-picker').wait_for()
  await page.get_by_role('button',name='D-Cut',exact=True).click()
  await page.locator('#bag-size').click();await page.get_by_role('option',name=re.compile('Large')).click()
  await page.get_by_role('button',name='Navy blue',exact=True).click()
  await page.get_by_role('tab',name='Photo + artwork',exact=True).click()
  await page.get_by_role('tab',name='02 Your design').click()
  await page.get_by_label('Brand name or message').fill('MIRA\nMARKET')
  canvas=page.locator('.preview-stage canvas');await canvas.focus();await page.keyboard.press('ArrowRight')
  d=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  assert d['product']=='d-cut-bag' and d['size']=='Large' and d['x']==51
  await page.get_by_role('group',name='Select artwork layer').get_by_role('button',name='Logo',exact=True).click()
  await page.locator('input[type=file]').set_input_files({'name':'bad.svg','mimeType':'image/svg+xml','buffer':b'<svg xmlns="http://www.w3.org/2000/svg"/>'})
  assert await page.get_by_role('alert').count()==1
  await page.locator('input[type=file]').set_input_files(str(Path(__file__).resolve().parents[1]/'public/assets/logo.png'))
  await page.wait_for_timeout(400)
  assert (await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1')).logo")).startswith('data:image/webp')
  async with page.expect_download() as dl:await page.get_by_role('button',name='Download design preview',exact=True).click()
  await (await dl.value).save_as(str(EVIDENCE/'downloaded-design.png'))
  await page.screenshot(path=str(EVIDENCE/'desktop-studio.png'),full_page=True)
  await page.get_by_role('link',name='Get a quote for this bag').click();await page.wait_for_load_state('networkidle')
  await page.locator('.quote-summary').get_by_text('Large · 50 × 47.5 × 12 cm',exact=True).wait_for()
  await page.get_by_role('button',name='Continue',exact=True).click()
  await page.get_by_role('button',name='Continue',exact=True).click()
  await page.locator('#quantity').fill('4999');await page.get_by_role('button',name='Continue',exact=True).click()
  assert 'minimum' in (await page.get_by_role('alert').inner_text()).lower()
  await page.get_by_role('link',name='Switch to Albanian').click()
  assert 'Minimumi' in await page.get_by_role('alert').inner_text()
  await page.get_by_role('link',name='Kalo në anglisht').click()
  await page.locator('#quantity').fill('5000');await page.locator('#q-city').fill('Prishtina')
  await page.reload(wait_until='networkidle');assert await page.locator('#q-city').input_value()=='Prishtina'
  await page.get_by_role('button',name='Continue',exact=True).click()
  for key,value in {'company':'Mira Market — fictional QA','contact':'Arta Demo','email':'arta@example.com'}.items():await page.locator('#q-'+key).fill(value)
  await page.get_by_role('checkbox').check()
  async def fail(route):await route.fulfill(status=503,content_type='application/json',body='{"error":"STORAGE_UNAVAILABLE"}')
  await page.route('**/api/demo',fail)
  await page.get_by_role('button',name='Save design request').click()
  await page.get_by_role('alert').wait_for();assert await page.locator('#q-company').input_value()=='Mira Market — fictional QA'
  assert await page.get_by_text('Your bag has a beginning.').count()==0
  await page.unroute('**/api/demo',fail)
  await page.get_by_role('button',name='Save design request').click();await page.get_by_text('Your bag has a beginning.').wait_for()
  s=await state();assert len(s['requests'])==1;r=s['requests'][0];rid=r['id'];snap=r['snapshot']
  res,data=await post({'type':'submit','design':snap});assert res.status==200 and len(data['state']['requests'])==1 and data['id']==rid
  assert snap['size']=='Large' and snap['quantity']==5000 and snap['city']=='Prishtina' and snap['logo']
  bad={**snap,'quantity':4999,'key':str(uuid.uuid4())};res,_=await post({'type':'submit','design':bad});assert res.status==400
  res,_=await post({'type':'release','id':rid});assert res.status==400
  await go('/demo/admin?id='+rid);await page.get_by_role('heading',name='Mira Market — fictional QA').wait_for()
  await page.locator('#owner').fill('Demo sales owner');await page.get_by_role('button',name='Assign',exact=True).click()
  await page.locator('#sales-note').fill('Artwork received. Destination confirmed for demo.');await page.get_by_role('button',name='Add note').click()
  await page.get_by_role('tab',name=re.compile('^Quotation')).click()
  await page.get_by_role('button',name='Prepare a demo quotation').click()
  await page.get_by_role('button',name='Issue demo quotation',exact=True).click();await page.get_by_role('dialog').wait_for(state='hidden')
  await page.get_by_role('tab',name=re.compile('^Artwork')).click();await page.get_by_role('button',name='Issue artwork proof from buyer design').click()
  await page.get_by_role('button',name='Issue artwork revision',exact=True).click();await page.get_by_role('dialog').wait_for(state='hidden')
  s=await state();assert s['requests'][0]['artworks'][0]['design']['logo']==snap['logo']
  await go('/demo/customer?id='+rid);await page.get_by_role('tab',name=re.compile('^Quotation')).click()
  await page.get_by_role('button',name='Accept demo quotation',exact=True).click();await page.get_by_role('button',name='Accepted',exact=True).wait_for()
  await page.get_by_role('tab',name=re.compile('^Artwork')).click();await page.get_by_role('button',name='Request a correction').click()
  await page.locator('#change-comment').fill('Please replace the logo with the text MIRA MARKET.');await page.get_by_role('button',name='Request change',exact=True).click();await page.get_by_role('dialog').wait_for(state='hidden')
  res,_=await post({'type':'approve-artwork','id':rid,'version':1});assert res.status==400
  await go('/demo/admin?id='+rid);await page.get_by_role('tab',name=re.compile('^Artwork')).click();await page.get_by_role('button',name='Issue a revised artwork proof').click()
  await page.locator('#proof-caption').fill('MIRA\nMARKET');await page.get_by_role('button',name='Issue artwork revision',exact=True).click();await page.get_by_role('dialog').wait_for(state='hidden')
  res,_=await post({'type':'approve-artwork','id':rid,'version':1});assert res.status==400
  await go('/demo/customer?id='+rid);await page.get_by_role('tab',name=re.compile('^Artwork')).click();await page.get_by_role('button',name='Approve this revision').click()
  await page.get_by_role('button',name='Artwork approved').wait_for();await page.screenshot(path=str(EVIDENCE/'customer-artwork.png'),full_page=True)
  await go('/demo/admin?id='+rid);await page.get_by_role('tab',name='Timeline',exact=True).click();await page.get_by_role('button',name='Create demo production handoff').click()
  await page.get_by_role('button',name='Advance demo production status').wait_for()
  s=await state();assert s['requests'][0]['order']['artworkVersion']==2
  res,_=await post({'type':'issue-artwork','id':rid,'caption':'Wrong'});assert res.status==400
  old_description=s['requests'][0]['snapshot']['description']
  await post({'type':'save-product','slug':'d-cut-bag','description':'A published QA demonstration description.'});await post({'type':'publish-product','slug':'d-cut-bag'})
  await go('/products/d-cut-bag');assert await page.get_by_text('A published QA demonstration description.',exact=True).count()==1
  assert (await state())['requests'][0]['snapshot']['description']==old_description
  await go('/demo/customer?id='+rid);await page.get_by_role('tab',name='Timeline',exact=True).click();await page.get_by_role('button',name='Request these bags again').click()
  await page.wait_for_url('**/quote');d=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))");assert d['reorderOf']==rid and d['key']!=snap['key']
  await page.get_by_role('button',name='Continue',exact=True).click();await page.get_by_role('checkbox').check();await page.get_by_role('button',name='Save design request').click();await page.get_by_text('Your bag has a beginning.').wait_for()
  s=await state();assert len(s['requests'])==2 and s['requests'][0]['quotes']==[] and s['requests'][0]['snapshot']['reorderOf']==rid
  routes=['/','/design','/products','/manufacturing','/sustainability','/certifications','/partners','/partners/apply','/resources','/industries','/industries/retail','/samples','/contact','/privacy','/terms','/cookies']
  for path in routes:
   await go(path);assert await page.locator('h1').count()==1,path
  res=await context.request.get(BASE+'/not-a-real-page');assert res.status==404
  await page.set_viewport_size({'width':390,'height':844});await go('/design');await page.screenshot(path=str(EVIDENCE/'mobile-studio.png'),full_page=True)
  assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'), 'Mobile horizontal overflow'
  await page.get_by_role('button',name='Toggle menu').click();assert await page.locator('.nav.open').is_visible()
  await page.get_by_role('link',name='Our bags',exact=True).first.click();await page.wait_for_load_state('networkidle')
  await page.screenshot(path=str(EVIDENCE/'mobile-catalog.png'),full_page=True)
  assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'), 'Catalog horizontal overflow'
  assert not console,console
  EVIDENCE.joinpath('qa-results.json').write_text(json.dumps({'status':'passed','request':rid,'checks':['designer selection, logo upload, safe image validation, download','quote draft refresh and Albanian errors','failed submission preserves input; retry saves once','server quantity validation and idempotency','sales owner, notes and quote issue','artwork correction, stale rejection and approval','production gates and version references','catalog publication keeps immutable snapshot','repeat request has new id and no commercial terms','all public routes; 404; mobile navigation and overflow'],'browserErrors':console},indent=2))
  print('PASS',rid)
  await browser.close()
asyncio.run(main())
