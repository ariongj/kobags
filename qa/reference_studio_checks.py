import asyncio,json,sys,time
from pathlib import Path
from urllib.parse import urlsplit
from datetime import datetime,timezone
from playwright.async_api import async_playwright
sys.path.insert(0,'/home/codex/Kobags-group.com/qa')
from browser_support import launch
ROOT=Path('/home/codex/Kobags-group.com'); OUT=ROOT/'deliverables/handoff/studio-20261108'
LIVE='--live' in sys.argv; QUICK='--quick' in sys.argv; MODE='exact-live' if LIVE else 'exact-local'
STUDIO='https://kobags.itdks.tech'; MAIN='https://kobags-group.com'; LOCAL='http://127.0.0.1:8787'
checks=[];errors=[];hosts=set();metrics=[]
async def main():
 async with async_playwright() as p:
  browser=await launch(p)
  slots=asyncio.Semaphore(6)
  async def context(width,blocked=False):
   c=await browser.new_context(viewport={'width':width,'height':900 if width>800 else 852},is_mobile=width<800,has_touch=width<800,color_scheme='light',reduced_motion='reduce')
   if blocked: await c.add_init_script("Storage.prototype.setItem=function(){throw new DOMException('Blocked','SecurityError')};")
   async def route(r):
    u=urlsplit(r.request.url); hosts.add(u.netloc)
    if LIVE and u.path.startswith('/cdn-cgi/challenge-platform/'): await r.continue_();return
    if r.request.method not in ['GET','HEAD','OPTIONS']: errors.append('Application write blocked: '+u.path);await r.abort();return
    if LIVE: await r.continue_();return
    if u.netloc not in ['kobags.itdks.tech','kobags-group.com','www.kobags-group.com']: errors.append('Unexpected external request '+u.netloc);await r.abort();return
    async with slots:
     response=await r.fetch(url=LOCAL+u.path+('?' +u.query if u.query else ''),headers={**r.request.headers,'Host':u.netloc},max_redirects=0)
     await r.fulfill(response=response)
   await c.route('**/*',route)
   return c
  async def ready(page,embedded=True):
   if embedded:
    await page.locator('.reference-studio-frame').wait_for()
    f=page.frame_locator('.reference-studio-frame')
    await f.locator('html[data-studio-source="ariongj-mo-b23cd8f"]').wait_for(timeout=120000)
    return next(f for f in page.frames if '/design/viewer' in f.url)
   await page.wait_for_function("() => document.documentElement.dataset.studioSource==='ariongj-mo-b23cd8f'",timeout=120000)
   return page
  async def capture(page,name):
   await page.screenshot(path=str(OUT/f'{MODE}-{name}.png'),full_page=True,timeout=120000)
  # Compare at the exact original standalone size before checking website chrome.
  c=await context(1440);page=await c.new_page();page.set_default_timeout(30000);page.on('pageerror',lambda e:(errors.append(str(e)),print('PAGE ERROR:',e,flush=True)));page.on('console',lambda msg:print('CONSOLE:',msg.text,flush=True) if msg.type=='error' else None)
  start=time.monotonic();await page.goto(STUDIO+'/design/viewer',wait_until='domcontentloaded');print('Document loaded',flush=True);await ready(page,False)
  metrics.append({'view':'standalone','readySeconds':round(time.monotonic()-start,2),'renderer':'Chromium SwiftShader software WebGL on VPS; no throttling; not phone hardware'})
  await page.wait_for_timeout(700);await capture(page,'source-1440')
  assert await page.locator('.sample').count()==20
  default=await page.evaluate('({...window.__api.state})')
  assert default['bag']=='#efeee9' and default['handle']=='#2b4db5' and default['size']=='L',default
  checks.append('Exact supplied default sample: white Box L, blue handles, original artwork; 20 samples')
  print('Exact source loaded',default,flush=True)
  await c.close()
  if QUICK: await browser.close();return
  for width in ([393,320] if LIVE else [1440,393,320]):
   print('Studio viewport',width,flush=True)
   c=await context(width); page=await c.new_page();page.set_default_timeout(45000);page.on('pageerror',lambda e:(errors.append(str(e)),print('PAGE ERROR:',e,flush=True)));page.on('console',lambda msg:print('CONSOLE:',msg.text,flush=True) if msg.type=='error' else None)
   start=time.monotonic();await page.goto(STUDIO+'/design',wait_until='domcontentloaded');f=await ready(page)
   metrics.append({'viewport':width,'readySeconds':round(time.monotonic()-start,2)})
   assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
   assert not await f.evaluate('document.documentElement.scrollWidth>innerWidth')
   await capture(page,f'studio-{width}')
   if width>800:
    await f.evaluate('() => {let a=__api,s=document.getElementById("stage");a.renderer.setPixelRatio(0.5);a.composer.setPixelRatio(0.5);a.composer.setSize(s.clientWidth,s.clientHeight);a.render()}')
    metrics.append({'desktopInteractionRasterScale':0.5,'reason':'Software GPU only; native-resolution screenshot captured first. Phone tests keep normal rendering.'})
   assert await page.get_by_role('button',name='Continue to quote',exact=True).is_enabled()
   if width!=320 and not LIVE and '--focused' not in sys.argv:
    for i in range(20):
     print('  Sample',i,flush=True)
     await f.locator('#tabs button[data-tab=samples]').click()
     await f.locator(f'.sample[data-i="{i}"]').click()
     snapshot=await f.evaluate('({state:{...__api.state},front:__api.design.front.length,back:__api.design.back.length})')
     assert snapshot['front']>0
     if width==1440 and i in [0,5,12,14,17]:
      await f.evaluate('__api.render()');await page.wait_for_timeout(100)
      await f.locator('#stage').screenshot(path=str(OUT/f'{MODE}-sample-{i}.png'))
    await f.locator('#tabs button[data-tab=bag]').click()
    for typ in ['box','handle','dcut','tshirt','string','bottle']:
     print('  Type',typ,flush=True)
     await f.locator('#typeSeg button[data-v="'+typ+'"]').click()
     assert await f.evaluate('__api.state.type')==typ
     for label in await f.locator('#sizeSeg button').evaluate_all('(bs)=>bs.map(b=>b.dataset.v)'):
      await f.locator('#sizeSeg button[data-v="'+label+'"]').click()
      assert await f.evaluate('__api.state.size')==label
     await f.locator('#v-top').click();await f.locator('#v-side').click();await f.locator('#v-front').click()
    checks.append(f'{width}px: 20 samples, six bag types, every standard size and camera controls')
   await f.locator('#tabs button[data-tab=samples]').click();await f.locator('.sample[data-i="0"]').click()
   await f.locator('#tabs button[data-tab=bag]').click()
   await f.locator('#poseSeg button[data-v=relaxed]').click()
   await f.locator('#drop').evaluate("e=>{e.value='24';e.dispatchEvent(new Event('input',{bubbles:true}))}")
   await f.locator('#tabs button[data-tab=design]').click()
   await f.locator('#addText').click();await f.locator('#pText').fill('CLIENT REVIEW')
   await f.locator('#pSize').evaluate("e=>{e.value='12';e.dispatchEvent(new Event('input',{bubbles:true}))}")
   before=await f.evaluate('__api.design.front.at(-1).x')
   # Flat artwork canvas uses physical coordinates and works with pointer/touch.
   ed=f.locator('#editor');await ed.scroll_into_view_if_needed()
   pos=await ed.evaluate('(e)=>{let a=__api.design.front.at(-1),r=e.getBoundingClientRect();return {x:r.left+a.x/__api.state.W*r.width,y:r.top+a.y/__api.state.H*r.height}}')
   # Frame bounds must be added for browser-level mouse/touch coordinates.
   bounds=await page.locator('.reference-studio-frame').bounding_box();x=pos['x']+bounds['x'];y=pos['y']+bounds['y']
   if width<800:
    cd=await c.new_cdp_session(page)
    await cd.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y,'id':1}]})
    for n in range(1,5): await cd.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+16*n/4,'y':y+6*n/4,'id':1}]})
    await cd.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});await cd.detach()
   else:
    await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+16,y+6,steps=5);await page.mouse.up()
   assert await f.evaluate('__api.design.front.at(-1).x')!=before,'Artwork did not move'
   await f.locator('#addQr').click();await f.locator('#pQr').fill('https://kobags-group.com/')
   await f.locator('#pSize').evaluate("e=>{e.value='5.5';e.dispatchEvent(new Event('input',{bubbles:true}))}")
   # The test logo stays in this isolated browser profile.
   from PIL import Image,ImageDraw
   from io import BytesIO
   im=Image.new('RGB',(160,80),'white');ImageDraw.Draw(im).rectangle((20,20,140,60),fill='#143442');out=BytesIO();im.save(out,format='PNG');logo=out.getvalue()
   print('  Upload start',width,'count',await f.locator('#addLogo').count(),'url',f.url,flush=True)
   (OUT/'qa-logo.png').write_bytes(logo)
   await f.evaluate('''async bytes => {const input=document.getElementById('addLogo'), transfer=new DataTransfer(); transfer.items.add(new File([new Uint8Array(bytes)], 'qa-logo.png', {type:'image/png'})); input.files=transfer.files; input.dispatchEvent(new Event('change',{bubbles:true}));}''',list(logo))
   await page.wait_for_timeout(1200)
   print('  Upload status',await f.evaluate('() => document.getElementById("designNote").textContent'),await f.evaluate('JSON.stringify(__api.design.front.map(e=>({kind:e.kind,text:e.text,asset:e.asset})))'),flush=True)
   await f.wait_for_function("() => __api.design.front.some(x=>x.kind==='logo')");print('  Upload done',width,flush=True)
   await f.evaluate('() => document.querySelector("#pMethod button[data-v=full]").click()')
   await f.evaluate('() => {document.getElementById("copySide").click();document.querySelector("#sideSeg button[data-v=back]").click()}')
   await page.screenshot(path=str(OUT/f'{MODE}-artwork-{width}.png'),timeout=120000)
   await page.wait_for_timeout(800)
   saved=await f.evaluate("JSON.parse(localStorage.getItem('kobags-reference-studio-v1'))")
   assert saved['uploaded'] and saved['state']['drop']==24 and saved['state']['pose']=='relaxed'
   count=len(saved['design']['back'])
   print('  Reload',width,flush=True);await page.reload(wait_until='domcontentloaded');f=await ready(page)
   restored=await f.evaluate('({state:{...__api.state},front:__api.design.front,back:__api.design.back,side:__api.getSide()})')
   assert len(restored['back'])==count and restored['side']=='back',restored
   assert restored['state']['drop']==24 and restored['state']['pose']=='relaxed'
   assert any(e['kind']=='logo' for e in restored['front'])
   await f.locator('#shot').scroll_into_view_if_needed()
   async with page.expect_download() as d: await f.locator('#shot').click()
   download=await d.value;await download.save_as(str(OUT/f'{MODE}-export-{width}.png'))
   assert (OUT/f'{MODE}-export-{width}.png').stat().st_size>10000
   checks.append(f'{width}px: text + QR + uploaded logo, select/drag/resize, both sides, draft reload with image and handle settings, PNG export')
   print('  Quote',width,flush=True);await page.get_by_role('button',name='Continue to quote',exact=True).click()
   await page.wait_for_url('**/quote')
   draft=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   assert draft['customDimensions']=='40 × 38.5 × 17 cm' and draft['logo'].startswith('data:image/') and draft['backLogo'].startswith('data:image/') and draft['referenceStudio']['source']=='ariongj-mo-b23cd8f'
   assert '[3D studio]' in draft['note']
   checks.append(f'{width}px: quote handoff retains dimensions, front/back artwork and bag/handle specification; no request submitted')
   await c.close()
  # Storage restrictions must not prevent the actual configurator from opening.
  c=await context(393,True);page=await c.new_page();page.on('pageerror',lambda e:(errors.append(str(e)),print('PAGE ERROR:',e,flush=True)));page.on('console',lambda msg:print('CONSOLE:',msg.text,flush=True) if msg.type=='error' else None)
  await page.goto(STUDIO+'/design');f=await ready(page);await f.locator('#tabs button[data-tab=design]').click();await f.locator('#addText').click()
  await page.get_by_text('Your browser could not save this draft.',exact=False).wait_for(timeout=10000)
  assert await f.locator('#pText').input_value()=='Your text';checks.append('Blocked storage: studio stays editable and offers explicit download warning')
  await c.close()
  # Homepage uses the same renderer; main domain keeps the studio unavailable.
  c=await context(393);page=await c.new_page();page.on('pageerror',lambda e:(errors.append(str(e)),print('PAGE ERROR:',e,flush=True)));page.on('console',lambda msg:print('CONSOLE:',msg.text,flush=True) if msg.type=='error' else None)
  await page.goto(STUDIO+'/');await page.locator('.reference-showcase-frame').scroll_into_view_if_needed()
  await page.frame_locator('.reference-showcase-frame').locator('html[data-studio-source="ariongj-mo-b23cd8f"]').wait_for(timeout=120000)
  preview=next(f for f in page.frames if 'preview=1' in f.url)
  assert not await preview.locator('#panel').is_visible()
  assert await preview.evaluate('__api.state.handle')=='#2b4db5'
  await page.locator('#bag-showcase').screenshot(path=str(OUT/f'{MODE}-homepage-preview-393.png'))
  await page.goto(STUDIO+'/sq/design');await ready(page)
  await page.get_by_role('button',name='Vazhdoni te oferta',exact=True).wait_for()
  checks.append('Homepage renders the identical sample; Albanian studio route and quote navigation available')
  for path in ['/design','/design/viewer','/sq/design/viewer?preview=1']:
   await page.goto(MAIN+path);assert '/products' in page.url,page.url
  await page.goto(MAIN+'/');assert await page.locator('.reference-showcase-frame').count()==0
  assert await page.locator('a[href="/design"]').count()==0
  checks.append('Main domain excludes the studio, including direct viewer and Albanian URLs')
  await c.unroute_all(behavior='ignoreErrors');await c.close();await browser.close()
  assert not errors,errors
try:
 asyncio.run(main())
 result={'status':'pass','date':datetime.now(timezone.utc).isoformat(),'mode':MODE,'source':'ariongj/mo@b23cd8fb92cded92b01bef683a96d449da808dca','checks':checks,'errors':errors,'networkHosts':sorted(hosts),'metrics':metrics}
except Exception as e:
 result={'status':'failed','error':str(e),'checks':checks,'errors':errors,'networkHosts':sorted(hosts),'metrics':metrics};raise
finally:
 (OUT/f'{MODE}-results.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2),flush=True)
