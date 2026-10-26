"""Read-only domain isolation and editor checks; local Worker by default, --live after deploy."""
import asyncio, base64, json, os, sys
from pathlib import Path
from urllib.parse import urlsplit
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT/'qa'))
from browser_support import launch

LIVE='--live' in sys.argv
PREVIEW='https://kobags.itdks.tech'
MAIN='https://kobags-group.com'
LOCAL='http://127.0.0.1:8787'
OUT=ROOT/'deliverables/handoff/studio-subdomain-20261026'
checks=[];errors=[]

async def main():
 OUT.mkdir(parents=True,exist_ok=True)
 async with async_playwright() as p:
  browser=await launch(p)
  fetch_slots=asyncio.Semaphore(6)
  async def context(width=393):
   c=await browser.new_context(viewport={'width':width,'height':852 if width<800 else 1000},is_mobile=width<800,has_touch=width<800,reduced_motion='reduce')
   async def route(r):
    u=urlsplit(r.request.url)
    # Allow the host's normal browser verification; still block all application writes.
    if LIVE and u.hostname in ['kobags.itdks.tech','kobags-group.com','www.kobags-group.com'] and u.path.startswith('/cdn-cgi/challenge-platform/'):
     await r.continue_();return
    if r.request.method not in ['GET','HEAD','OPTIONS']:
     errors.append('Unexpected write blocked: '+u.path);await r.abort();return
    if LIVE:
     await r.continue_();return
    if u.hostname not in ['kobags.itdks.tech','kobags-group.com','www.kobags-group.com']:
     await r.abort();return
    async with fetch_slots:
     result=await r.fetch(url=LOCAL+u.path+('?' +u.query if u.query else ''),headers={**r.request.headers,'Host':u.netloc},max_redirects=0,max_retries=2)
     await r.fulfill(response=result)
   await c.route('**/*',route)
   return c
  api=await p.request.new_context(user_agent='Mozilla/5.0')
  async def get(origin,path,headers=None):
   headers=headers or {}
   return await api.get((origin if LIVE else LOCAL)+path,headers={**headers,**({'Host':urlsplit(origin).netloc} if not LIVE else {})},max_redirects=0)
  for prefix in ['', '/sq']:
   r=await get(PREVIEW,prefix+'/design');assert r.status==200,(r.status,await r.text())
   assert 'noindex' in r.headers.get('x-robots-tag','')
   assert 'no-store' in r.headers.get('cache-control','')
   for suffix in ['', '?model=coffee-test&preview=1', '/extra', '?studioEnabled=true']:
    r=await get(MAIN,prefix+'/design'+suffix,{'x-kobags-studio-enabled':'1','x-kobags-studio-preview':'1','x-forwarded-host':'kobags.itdks.tech','Cookie':'studioEnabled=true'})
    assert r.status==307 and r.headers['location'].endswith(prefix+'/products'),(r.status,r.headers)
   checks.append((prefix or 'EN')+': preview opens; main-domain direct/query/nested editor links stay blocked despite spoofed headers/cookies')
  r=await get(PREVIEW,'/robots.txt');assert 'Disallow: /\n' in await r.text()
  r=await get(PREVIEW,'/sitemap.xml');assert '<loc>' not in await r.text()
  r=await get(MAIN,'/robots.txt');assert 'Sitemap: https://kobags-group.com/sitemap.xml' in await r.text()
  r=await get(MAIN,'/sitemap.xml');s=await r.text();assert '/design' not in s and 'https://kobags-group.com/products/box-bag' in s
  checks.append('Preview is excluded from indexing; main robots/sitemap retain business-domain SEO and exclude studio')
  c=await context(393);page=await c.new_page();page.set_default_timeout(60000)
  page.on('pageerror',lambda e:errors.append(str(e)))
  for path in ['/','/sq','/products/box-bag','/sq/products/box-bag','/quote']:
   await page.goto(MAIN+path,wait_until='networkidle')
   assert not await page.locator('a[href*="/design"]').count(),path
   assert not await page.locator('.bag-showcase,.studio-compact').count(),path
   assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),path
  checks.append('Main-domain home, product and quote pages have no studio links/promotions or mobile overflow')
  await page.goto(MAIN+'/',wait_until='networkidle')
  await page.screenshot(path=str(OUT/('live-main-mobile.jpg' if LIVE else 'local-main-mobile.jpg')),quality=82)
  await c.unroute_all(behavior='wait');await c.close()
  for width in [1440,393,320]:
   print('Checking studio viewport',width,flush=True)
   c=await context(width);page=await c.new_page();page.set_default_timeout(90000)
   page.on('pageerror',lambda e:errors.append(str(e)))
   await page.goto(PREVIEW+'/design',wait_until='networkidle')
   await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
   assert await page.locator('.bag-pick').count()==5
   assert (await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))"))['color']=='Natural'
   assert await page.locator('.nav a[href$="/design"]').count()==1
   assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
   if width==1440:
    for label,slug in [('Box','box-bag'),('D-Cut','d-cut-bag'),('Handle','handle-bag'),('String','string-bag'),('T-Shirt','t-shirt-bag')]:
     await page.get_by_role('button',name=label,exact=True).click()
     await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
     await page.wait_for_function('(slug)=>document.querySelector(".studio-3d-host")?.dataset.model===slug',arg=slug)
    angle=float(await page.locator('.studio-3d-host').get_attribute('data-angle'))
    await page.get_by_role('button',name='Rotate bag right',exact=True).click()
    await page.wait_for_function('(a)=>Math.abs(Number(document.querySelector(".studio-3d-host").dataset.angle)-a)>.1',arg=angle)
    checks.append('All five 3D bag models load and rotation changes the camera')
   if width==393:
    await page.get_by_role('tab',name='02 Your design',exact=True).tap()
    await page.get_by_label('Brand name or message').fill('STUDIO TEST')
    add=page.get_by_role('group',name='Add artwork',exact=True)
    await add.get_by_role('button',name='QR',exact=True).tap()
    dialog=page.get_by_role('dialog');await dialog.get_by_label('Website or page link').fill('https://kobags-group.com')
    await dialog.get_by_role('button',name='Add QR code',exact=True).tap();await dialog.wait_for(state='hidden')
    draft=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
    qr=next(e for e in draft['elements'] if e['kind']=='qr')
    await page.get_by_label('Selected element',exact=True).select_option('element:'+qr['id'])
    await page.get_by_role('button',name='Make selected element larger',exact=True).tap()
    after=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
    assert next(e for e in after['elements'] if e['id']==qr['id'])['scale']==qr['scale']+2
    await add.get_by_role('button',name='Logo',exact=True).tap()
    raw=await page.evaluate("""()=>{const c=document.createElement('canvas');c.width=c.height=100;const x=c.getContext('2d');x.fillStyle='white';x.fillRect(0,0,100,100);x.fillStyle='#007a36';x.fillRect(25,25,50,50);return c.toDataURL('image/png').split(',')[1]}""")
    await page.locator('input[type=file]').set_input_files({'name':'studio-test.png','mimeType':'image/png','buffer':base64.b64decode(raw)})
    await page.locator('.artwork-file strong').filter(has_text='studio-test.png').wait_for()
    await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
    checks.append('Mobile text editing, QR creation/selection/resizing and logo upload work in the 3D editor')
   await page.screenshot(path=str(OUT/f'{"live" if LIVE else "local"}-studio-{width}.jpg'),quality=82)
   await page.goto(PREVIEW+'/sq/design',wait_until='networkidle')
   await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
   assert await page.locator('html').get_attribute('lang')=='sq'
   assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
   checks.append(str(width)+': EN/SQ studio renders, natural default, navigation, hydration and viewport fit')
   await c.unroute_all(behavior='wait');await c.close()
  await api.dispose();await browser.close()
 assert not errors,errors
 result={'status':'passed','scope':'Live read-only' if LIVE else 'Isolated local Worker with domain identities','checks':checks,'browserErrors':errors,'submittedInquiries':0}
 (OUT/('live-results.json' if LIVE else 'local-results.json')).write_text(json.dumps(result,indent=2)+'\n')
 print(json.dumps(result,indent=2),flush=True)
asyncio.run(main())
