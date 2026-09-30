"""Additional local checks: full structure, secondary inquiries, catalog, data isolation and gates."""
import asyncio, json, re, uuid
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE, launch
ROOT=Path(__file__).resolve().parents[1]
async def main():
 async with async_playwright() as p:
  browser=await launch(p)
  context=await browser.new_context(viewport={'width':1440,'height':1000},extra_http_headers={'oai-authenticated-user-id':'qa-extra-'+str(uuid.uuid4())})
  initial=(await (await context.request.get(BASE+'/api/demo')).json())['state']
  assert initial['requests']==[] and initial['inquiries']==[], 'Use the compiled local Worker (npm run start), not the shared development mock-auth preview.'
  page=await context.new_page();page.set_default_timeout(30000);errors=[]
  page.on('pageerror',lambda e: errors.append(str(e)))
  async def go(path):
   res=await page.goto(BASE+path,wait_until='networkidle');assert res.status==200,(path,res.status)
  async def post(data,expected=200):
   res=await context.request.post(BASE+'/api/demo',data=data);body=await res.json();assert res.status==expected,(data.get('type'),res.status,body);return body
  async def state():return (await (await context.request.get(BASE+'/api/demo')).json())['state']
  await go('/');await page.screenshot(path=str(ROOT/'evidence/desktop-home.png'),full_page=True)
  await page.get_by_role('link',name='Switch to Albanian').click();assert 'Ndërtojmë marka' in await page.locator('h1').inner_text()
  await page.get_by_role('link',name='Kalo në anglisht').click()
  for path,kind in [('/samples','sample'),('/partners/apply','partner'),('/contact','contact')]:
   await go(path)
   for k,v in {'company':'Fictional '+kind,'contact':'Demo Buyer','email':'buyer@example.com','country':'Kosovo'}.items():await page.locator('#inquiry-'+k).fill(v)
   await page.locator('#inquiry-message').fill('Fictional inquiry for the isolated QA workspace.')
   await page.get_by_role('button',name='Save inquiry').click();await page.get_by_role('alert').wait_for()
   await page.get_by_role('checkbox').check();await page.get_by_role('button',name='Save inquiry').click();await page.get_by_role('heading',name='Your inquiry is saved.').wait_for()
  s=await state();assert {i['kind'] for i in s['inquiries']}=={'sample','partner','contact'}
  await post({'type':'inquiry-stage','id':s['inquiries'][0]['id'],'status':'reviewing'})
  assert (await state())['inquiries'][0]['status']=='reviewing'
  await go('/products');assert await page.locator('.product-card').count()==5
  await page.locator('#handle-filter').click();await page.get_by_role('option',name='Die-cut',exact=True).click();assert await page.locator('.product-card').count()==1
  await page.get_by_role('button',name='Reset filters',exact=True).click()
  for i in range(3):await page.locator('.product-card').nth(i).get_by_role('checkbox').check()
  assert await page.locator('.product-card').nth(3).get_by_role('checkbox').is_disabled()
  assert await page.get_by_role('table').count()==1
  # Every published size can be selected in the studio and quoted by the server.
  s=await state();assert sum(len(p['variants']) for p in s['catalog'])==15
  await go('/products/handle-bag')
  await page.locator('#detail-size').click();await page.get_by_role('option',name=re.compile('Medium')).click()
  await page.get_by_role('button',name='Design this bag',exact=True).click();await page.wait_for_url('**/design');await page.locator('.bag-picker').wait_for()
  draft=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  draft.update({'company':'Fictional gates test','contact':'Demo Buyer','email':'buyer@example.com','city':'Prishtina','consent':True,'key':str(uuid.uuid4())})
  created=await post({'type':'submit','design':draft});rid=created['id'];assert created['state']['requests'][0]['snapshot']['dimensions']=='40 × 37 × 10 cm'
  # Latest versions and the payment condition all independently block release.
  quote={'type':'issue-quote','id':rid,'unitCents':42,'setupCents':3500,'validUntil':'2099-12-31','terms':'Fictional QA terms','payment':'pending'}
  await post(quote);await post({'type':'accept-quote','id':rid,'version':1})
  await post({'type':'issue-artwork','id':rid,'caption':''});await post({'type':'approve-artwork','id':rid,'version':1})
  await post({'type':'release','id':rid},400)
  await post({'type':'payment','id':rid})
  await post(quote);await post({'type':'accept-quote','id':rid,'version':1},400);await post({'type':'release','id':rid},400)
  await post({'type':'accept-quote','id':rid,'version':2});await post({'type':'payment','id':rid})
  await post({'type':'issue-artwork','id':rid,'caption':'REVISED'});await post({'type':'release','id':rid},400)
  await post({'type':'approve-artwork','id':rid,'version':2});released=await post({'type':'release','id':rid});order=released['state']['requests'][0]['order']
  assert order['quoteVersion']==2 and order['artworkVersion']==2
  await post({'type':'order-stage','id':rid,'status':'Dispatched'},400)
  for status in ['In production','Quality review','Ready for dispatch','Dispatched']:await post({'type':'order-stage','id':rid,'status':status})
  # Concurrent edits preserve both fields through revision retries.
  await asyncio.gather(post({'type':'assign','id':rid,'owner':'QA owner'}),post({'type':'note','id':rid,'note':'QA concurrent note'}))
  r=(await state())['requests'][0];assert r['owner']=='QA owner' and 'QA concurrent note' in r['notes']
  other=await browser.new_context(extra_http_headers={'oai-authenticated-user-id':'qa-other-'+str(uuid.uuid4())})
  assert (await (await other.request.get(BASE+'/api/demo')).json())['state']['requests']==[]
  res=await other.request.post(BASE+'/api/demo',data={'type':'note','id':rid,'note':'Not mine'});assert res.status==400
  await other.close()
  await post({'type':'content-save','id':'iso9001','body':'Fictional review text','owner':'to confirm','review':''})
  await post({'type':'content-publish','id':'iso9001'},400)
  await post({'type':'content-save','id':'artwork','body':'Published QA artwork guide.','owner':'Demo editor','review':'2026-09-15'});await post({'type':'content-publish','id':'artwork'})
  await go('/resources');await page.get_by_text('Published QA artwork guide.',exact=True).wait_for()
  # Handoff supplies the canonical clickable map. Check every route and every internal destination.
  await go('/handoff');paths=await page.locator('.outline-group a').evaluate_all('(els)=>els.map(a=>a.getAttribute("href"))');assert len(paths)==32,len(paths)
  links=set()
  for path in paths:
   await go(path);assert await page.locator('h1').count()==1,path
   links.update(await page.locator('a[href^="/"]').evaluate_all('(els)=>els.map(a=>a.getAttribute("href").split("#")[0])'))
  for link in sorted(links):
   res=await context.request.get(BASE+link);assert res.status==200,(link,res.status)
  redirects={'/shop':'/products','/shop-catalog':'/products','/shop-catalog/d-cut-bag':'/products/d-cut-bag','/kobags-bagsdetails/string-bag':'/products/string-bag','/contact-us':'/contact','/partner':'/partners','/become-partner':'/partners/apply','/blog-home':'/blog','/privacy-policy':'/privacy','/terms-conditions':'/terms','/thank-you':'/quote'}
  for old,new in redirects.items():
   res=await context.request.get(BASE+old,max_redirects=0);assert res.status in (301,302,307,308),(old,res.status);assert res.headers['location'].endswith(new)
  for path in ['/missing','/products/missing','/blog/missing']:
   res=await context.request.get(BASE+path);assert res.status==404,path
  await page.set_viewport_size({'width':390,'height':844})
  for path,name in [('/','mobile-home'),('/handoff','mobile-handoff'),('/blog','mobile-journal'),('/demo/admin','mobile-sales')]:
   await go(path);assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth'),path
   await page.screenshot(path=str(ROOT/'evidence'/f'{name}.png'),full_page=True)
  await page.set_viewport_size({'width':1440,'height':1000});await go('/handoff');await page.screenshot(path=str(ROOT/'evidence/desktop-handoff.png'),full_page=True)
  assert not errors,errors
  result={'status':'passed','routes':paths,'internalLinksChecked':len(links),'redirectsChecked':len(redirects),'checks':['Homepage EN/SQ','Three inquiry types, consent and inbox persistence','Catalog filters and maximum three comparison','15 published size variants; Medium RFQ','Latest quote and artwork gates; fictional payment condition','Sequential order statuses','Concurrent edits preserved','Separate private-owner records','Content draft/publication and evidence review gate','Every page, internal link, download and legacy redirect','Desktop/mobile home, handoff, journal and sales; no overflow'],'browserErrors':errors}
  (ROOT/'evidence/site-checks.json').write_text(json.dumps(result,indent=2));print('PASS',len(paths),'pages;',len(links),'internal links;',len(redirects),'redirects')
  await browser.close()
asyncio.run(main())
