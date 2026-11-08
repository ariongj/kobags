"""Journey test. Pause continuous rendering only in automation on the VPS software GPU; exports and quote snapshots still render. No real inquiries are submitted."""
import asyncio,sys,json,time
from pathlib import Path
from datetime import datetime,timezone
OUT=Path(__file__).resolve().parents[1]/'deliverables/handoff/studio-20261108'
OUT.mkdir(parents=True,exist_ok=True)
WIDTH=next((int(arg) for arg in sys.argv[1:] if arg.isdigit()),1440)
LIVE='--live' in sys.argv
MODE='exact-live' if LIVE else 'exact-local'
from urllib.parse import urlsplit
sys.path.insert(0,str(Path(__file__).resolve().parent))
from browser_support import launch
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await launch(p);c=await b.new_context(viewport={'width':WIDTH,'height':852},is_mobile=WIDTH<800,has_touch=WIDTH<800);page=await c.new_page();page.set_default_timeout(20000)
  page.on('console',lambda m:print('CONSOLE',m.type,m.text[:350],flush=True) if m.type=='error' else None)
  page.on('pageerror',lambda e:print('ERROR',e,flush=True))
  page.on('framenavigated',lambda f:print('NAV','root' if f.parent_frame is None else 'child',f.url,flush=True))
  async def route(r):
   u=urlsplit(r.request.url)
   if u.scheme not in ['http','https']:return await r.continue_()
   if r.request.method not in ['GET','HEAD','OPTIONS'] and not u.path.startswith('/cdn-cgi/challenge-platform/'):raise Exception('Unexpected application write '+u.path)
   if LIVE:return await r.continue_()
   x=await r.fetch(url='http://127.0.0.1:8787'+u.path+('?' +u.query if u.query else ''),headers={**r.request.headers,'Host':u.netloc},max_redirects=0);await r.fulfill(response=x)
  await c.route('**/*',route)
  await page.goto('https://kobags.itdks.tech/design')
  await page.frame_locator('.reference-studio-frame').locator('html[data-studio-source]').wait_for(timeout=120000)
  f=next(f for f in page.frames if '/design/viewer' in f.url)
  await f.evaluate('() => __api.renderer.setAnimationLoop(null)')
  
  
  await f.locator('#tabs button[data-tab=design]').click()
  await f.locator('#addText').click()
  await f.locator('#pText').fill('CLIENT REVIEW')
  ed=f.locator('#editor');await ed.scroll_into_view_if_needed()
  pos=await ed.evaluate('(e)=>{let a=__api.design.front.at(-1),r=e.getBoundingClientRect();return {x:r.left+a.x/__api.state.W*r.width,y:r.top+a.y/__api.state.H*r.height}}')
  bounds=await page.locator('.reference-studio-frame').bounding_box();x=pos['x']+bounds['x'];y=pos['y']+bounds['y']
  before=await f.evaluate('() => __api.design.front.at(-1).x')
  if WIDTH<800:
   cd=await c.new_cdp_session(page)
   await cd.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y,'id':1}]})
   for n in range(1,5):await cd.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+16*n/4,'y':y+6*n/4,'id':1}]})
   await cd.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});await cd.detach()
  else:
   await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+16,y+6,steps=5);await page.mouse.up()
  assert await f.evaluate('() => __api.design.front.at(-1).x')!=before
  await f.locator('#pSize').evaluate("e=>{e.value='12';e.dispatchEvent(new Event('input',{bubbles:true}))}")
  assert await f.evaluate('() => __api.design.front.at(-1).w')==12
  await f.locator('#addQr').click()
  await f.locator('#pQr').fill('https://kobags-group.com/')
  assert not await f.evaluate('() => document.documentElement.scrollWidth>innerWidth')
  assert not await page.evaluate('() => document.documentElement.scrollWidth>innerWidth')
  await page.screenshot(path=str(OUT/f'{MODE}-mobile-controls-{WIDTH}.png'),full_page=True,timeout=120000)
  print('loaded input',await f.locator('#addLogo').count(),flush=True)
  from PIL import Image,ImageDraw
  logo=Image.new('RGB',(160,80),'white');ImageDraw.Draw(logo).rectangle((20,20,140,60),fill='#143442');logo.save(OUT/'qa-logo.png')
  await f.locator('#addLogo').set_input_files(str(OUT/'qa-logo.png'))
  print('SET INPUT done',page.url,flush=True)
  await page.wait_for_timeout(1000)
  print('frames after upload',[(x.url,x.parent_frame is None) for x in page.frames],flush=True)
  print('frame identities',f.is_detached(),[x==f for x in page.frames],flush=True)
  print('DOM after upload',await f.evaluate('() => ({url:location.href,body:!!document.body,inputs:document.querySelectorAll("input").length,note:document.getElementById("designNote")?.textContent})'),flush=True)

  assert await f.evaluate('() => __api.design.front.some(e=>e.kind==="logo")')
  await f.evaluate('() => {document.querySelector("#pMethod button[data-v=full]").click();document.getElementById("copySide").click();document.querySelector("#sideSeg button[data-v=back]").click()}')
  await page.wait_for_timeout(1200)
  saved=await f.evaluate('() => JSON.parse(localStorage.getItem("kobags-reference-studio-v1"))')
  assert saved['uploaded'] and len(saved['design']['back'])==len(saved['design']['front'])
  print('SAVED',len(saved['design']['front']),flush=True)
  await page.reload(wait_until='domcontentloaded')
  await page.frame_locator('.reference-studio-frame').locator('html[data-studio-source]').wait_for(timeout=120000)
  f=next(f for f in page.frames if '/design/viewer' in f.url)
  await f.evaluate('() => __api.renderer.setAnimationLoop(null)')
  restored=await f.evaluate('() => ({front:__api.design.front,back:__api.design.back,side:__api.getSide()})')
  assert len(restored['back'])==len(saved['design']['back']) and restored['side']=='back'
  assert any(e['kind']=='logo' for e in restored['front'])
  print('RESTORED',flush=True)
  async with page.expect_download() as d: await f.evaluate('() => document.getElementById("shot").click()')
  dl=await d.value; await dl.save_as(str(OUT/f'{MODE}-export-{WIDTH}.png'))
  print('EXPORTED',flush=True)
  print('QUOTE BUTTON',await page.evaluate('() => {const b=document.querySelector(".reference-studio-bar button");return {text:b?.textContent,disabled:b?.disabled}}'),flush=True)
  await page.wait_for_function('() => {const b=document.querySelector(".reference-studio-bar button");return b && !b.disabled && b.textContent.includes("Continue to quote")}',polling=200,timeout=45000)
  button=await page.evaluate('() => {const b=document.querySelector(".reference-studio-bar button");b.scrollIntoView({block:"center"});const r=b.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}}')
  if WIDTH<800:await page.touchscreen.tap(button['x'],button['y'])
  else:await page.mouse.click(button['x'],button['y'])
  await page.wait_for_url('**/quote',timeout=120000)
  draft=await page.evaluate('() => JSON.parse(localStorage.getItem("kobags-design-v1"))')
  assert draft['customDimensions']=='40 × 38.5 × 17 cm'
  assert draft['logo'].startswith('data:image/') and draft['backLogo'].startswith('data:image/')
  assert draft['referenceStudio']['source']=='ariongj-mo-b23cd8f'
  assert draft['referenceStudio']['front'].startswith('data:image/') and draft['referenceStudio']['back'].startswith('data:image/')
  assert '[3D studio]' in draft['note']
  print('QUOTE TRANSFER PASSED',flush=True)
  await page.screenshot(path=str(OUT/f'{MODE}-quote-{WIDTH}.png'),full_page=True,timeout=120000)
  (OUT/f'{MODE}-journey-{WIDTH}.json').write_text(json.dumps({'status':'pass','date':datetime.now(timezone.utc).isoformat(),'viewport':WIDTH,'mode':MODE,'checks':['Add text and QR; drag artwork','Upload logo through file input','Copy artwork to back','Draft save and reload retain uploaded artwork','Actual 3D PNG export','Quote contains matching dimensions and front/back artwork and 3D previews'],'submittedInquiries':0,'rendering':'SwiftShader software GPU; animation loop paused for editing logic. PNG export and quote snapshots force native renders. Not a physical-phone FPS test.'},indent=2))

  await c.close();await b.close()
asyncio.run(main())
