"""Public studio pause: isolated production Worker, never the live customer inbox."""
import asyncio, json, re, sqlite3
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE, launch
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'evidence/studio-local-only-20261020'
checks=[];errors=[]
async def main():
 OUT.mkdir(exist_ok=True)
 async with async_playwright() as pw:
  browser=await launch(pw)
  ctx=await browser.new_context(viewport={'width':393,'height':750},is_mobile=True,has_touch=True,reduced_motion='reduce')
  page=await ctx.new_page();page.set_default_timeout(30000)
  page.on('pageerror',lambda e:errors.append(str(e)))
  for path in ['/design','/design?model=coffee-test','/sq/design?model=coffee-test','/design/?preview=1','/design/anything','/%64esign?studio=1']:
   response=await ctx.request.get(BASE+path,max_redirects=0,headers={'x-kobags-language':'en','x-forwarded-host':'localhost','Cookie':'studioEnabled=true'})
   assert response.status in [307,308],(path,response.status)
   if not path.startswith('/design/?'):
    assert response.headers['location'].endswith('/sq/products' if path.startswith('/sq/') else '/products'),(path,response.headers)
    assert 'noindex' in response.headers['x-robots-tag']
   await page.goto(BASE+path,wait_until='networkidle')
   assert page.url.endswith('/products') and not await page.locator('.studio-compact').count(),page.url
  checks.append('Old EN/SQ studio and scan links redirect to the catalogue; query/cookie/host headers cannot enable production studio')
  sitemap=await (await ctx.request.get(BASE+'/sitemap.xml')).text()
  assert '/design' not in sitemap and '/products/handle-bag' in sitemap
  checks.append('Sitemap retains products and excludes the studio')
  paths=['/','/products','/products/box-bag','/manufacturing','/sustainability','/industries/retail','/resources','/bags-kosovo','/blog/helpingbusinesseskobags','/quote','/not-a-real-page']
  for lang in ['','/sq']:
   for path in paths:
    await page.goto(BASE+lang+('' if path=='/' and lang else path),wait_until='networkidle')
    assert not await page.locator('a[href*="/design"]').count(),(lang,path)
    assert not await page.locator('.bag-showcase').count(),(lang,path)
    assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),(lang,path)
    body=await page.locator('body').inner_text()
    assert not re.search(r'\b(studio|studioja|studion|3d)\b',body,re.I),(lang,path,body)
    if path=='/':
     assert not re.search(r'\b(3d|studio)\b',await page.locator('meta[name=description]').get_attribute('content'),re.I)
     await page.locator('.mobile-toggle').click();assert not await page.locator('.nav a[href*=design]').count()
     await page.locator('.mobile-toggle').click()
     await page.screenshot(path=str(OUT/f'home-{lang.strip("/") or "en"}.jpg'),quality=85)
  checks.append('22 phone pages in EN/SQ: no studio links/promotions, no horizontal overflow; mobile navigation and metadata clean')
  for w,h in [(320,568),(1440,900)]:
   await page.set_viewport_size({'width':w,'height':h})
   for path in ['/','/products/box-bag','/quote']:
    await page.goto(BASE+path,wait_until='networkidle');assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),(w,path)
  checks.append('Narrow phone and desktop home/product/quote layouts fit')
  await ctx.close()
  for lang in ['','/sq']:
   ctx=await browser.new_context(viewport={'width':393,'height':750},is_mobile=True,has_touch=True,reduced_motion='reduce')
   page=await ctx.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
   await page.goto(BASE+lang+'/products/box-bag',wait_until='networkidle')
   assert not await page.get_by_role('button',name=re.compile('Design this bag|Dizajnoni këtë')).count()
   await page.get_by_role('button',name='Kërkoni ofertë' if lang else 'Request a quote',exact=True).click()
   await page.wait_for_url('**/quote');await page.wait_for_load_state('networkidle')
   assert (await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))"))['product']=='box-bag'
   assert await page.locator('.quote-product-photo img').evaluate('(e)=>e.complete&&e.naturalWidth>0')
   await page.screenshot(path=str(OUT/f'quote-{lang.strip("/") or "en"}.jpg'),quality=85)
   next=page.get_by_role('button',name='Vazhdo' if lang else 'Continue',exact=True)
   await next.click();assert not await page.locator('.quote-artwork-pair').count()
   await next.click()
   await page.locator('#quantity').fill('4999');await page.locator('#q-city').fill('Prishtina');await next.click();await page.get_by_role('alert').wait_for()
   await page.locator('#quantity').fill('7000');await next.click()
   for name,value in {'company':'Local-only studio QA','contact':'Synthetic Buyer','email':'studio-pause@example.test','phone':'+38344123456','note':'Local test: please discuss a one-color logo on the front.'}.items():
    await page.locator('#q-'+name).fill(value)
   await page.get_by_role('checkbox').check()
   captured=[]
   async def lose_response(route):
    if route.request.method=='POST':
     response=await route.fetch();assert response.status==201,(response.status,await response.text())
     captured.append({'receipt':await response.json(),'payload':route.request.post_data_json});await route.abort('failed')
    else:await route.continue_()
   await page.route('**/api/inquiries',lose_response)
   save=page.get_by_role('button',name='Dërgo kërkesën për ofertë' if lang else 'Send quote request',exact=True)
   await save.click();await page.get_by_role('alert').wait_for()
   await page.unroute('**/api/inquiries',lose_response);await save.click()
   await page.get_by_role('heading',name='Kërkesa juaj u ruajt.' if lang else 'Your request is saved.',exact=True).wait_for()
   assert len(captured)==1
   d=captured[0]['payload']['design'];assert d['text']=='' and d['logo']=='' and d['backText']=='' and not d['elements']
   assert d['product']=='box-bag' and d['quantity']==7000
   assert captured[0]['receipt']['id'] in page.url
   await page.reload(wait_until='networkidle');assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
   # Read only our isolated local D1 copy to verify durable persistence.
   saved=False
   for dbfile in Path('/tmp/kobags-studio-hidden-state/v3/d1').rglob('*.sqlite'):
    conn=sqlite3.connect(f'file:{dbfile}?mode=ro',uri=True)
    try:
     row=conn.execute('SELECT data FROM cms_inquiries WHERE id=?',(captured[0]['receipt']['id'],)).fetchone()
     if row:
      data=json.loads(row[0]);assert data['text']=='' and data['quantity']==7000 and data['email']=='studio-pause@example.test';saved=True
    except sqlite3.OperationalError:pass
    finally:conn.close()
   assert saved,'Request was not found in isolated inbox'
   checks.append(f'{lang or "EN"}: product-to-quote, four steps, MOQ validation, lost-response retry, saved CMS inquiry and receipt reload; no placeholder artwork submitted')
   await ctx.close()
  assert not errors,errors
  await browser.close()
 OUT.joinpath('public-report.json').write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors,'scope':'Isolated local production Worker; synthetic requests only'},indent=2)+'\n')
 print(json.dumps(checks,indent=2),flush=True)
asyncio.run(main())
