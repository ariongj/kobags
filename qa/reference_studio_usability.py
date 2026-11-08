"""Read-only public studio usability checks. No production writes or inquiries.
Native screenshots precede test-only animation pause on the VPS software GPU.
"""
import argparse,asyncio,json,sys,time
from pathlib import Path
from urllib.parse import urlsplit
from datetime import datetime,timezone
from playwright.async_api import async_playwright,expect
from browser_support import launch
parser=argparse.ArgumentParser();parser.add_argument('--live',action='store_true');parser.add_argument('--width',type=int,default=393)
args=parser.parse_args();OUT=Path(__file__).resolve().parents[1]/'deliverables/handoff/studio-20261109';OUT.mkdir(parents=True,exist_ok=True)
MODE='live' if args.live else 'local';checks=[];errors=[]
async def main():
 async with async_playwright() as p:
  browser=await launch(p);ctx=await browser.new_context(viewport={'width':args.width,'height':852},is_mobile=args.width<800,has_touch=args.width<800,extra_http_headers={'Cache-Control':'no-cache'})
  page=await ctx.new_page();page.set_default_timeout(30000)
  page.on('pageerror',lambda e:errors.append(str(e)))
  async def route(r):
   u=urlsplit(r.request.url)
   if u.scheme not in ['http','https']:return await r.continue_()
   if r.request.method not in ['GET','HEAD','OPTIONS'] and not u.path.startswith('/cdn-cgi/challenge-platform/'):
    errors.append('Blocked unexpected application write: '+u.path);return await r.abort()
   if args.live:return await r.continue_()
   response=await r.fetch(url='http://127.0.0.1:8787'+u.path+('?' +u.query if u.query else ''),headers={**r.request.headers,'Host':u.netloc},max_redirects=0);await r.fulfill(response=response)
  await ctx.route('**/*',route)
  async def ready():
   await page.frame_locator('.reference-studio-frame').locator('html[data-studio-source]').wait_for(timeout=120000)
   return next(f for f in page.frames if '/design/viewer' in f.url)
  await page.goto('https://kobags.itdks.tech/design',wait_until='domcontentloaded');frame=await ready()
  assert not await page.evaluate('() => document.documentElement.scrollWidth>innerWidth')
  assert not await frame.evaluate('() => document.documentElement.scrollWidth>innerWidth')
  await page.screenshot(path=str(OUT/f'{MODE}-initial-{args.width}.png'),full_page=True,timeout=120000)
  await frame.evaluate('() => __api.renderer.setAnimationLoop(null)')
  print('Native initial screenshot and width passed',flush=True)
  checks.append('Native initial render; no document or viewer horizontal overflow')
  front_before=await frame.evaluate('() => JSON.stringify(__api.design.front)')
  await frame.locator('#edit-back').click();assert await frame.evaluate('() => __api.getSide()')=='back'
  assert await frame.locator('[data-pane=design]').is_visible()
  assert await frame.locator('.studio-edit-title').text_content()=='Back artwork'
  await frame.locator('#addText').click();await frame.locator('#pText').fill('BACK ONLY · TEST')
  text_id=await frame.evaluate('() => __api.design.back.at(-1).id')
  await frame.locator('#addQr').click();await frame.locator('#pQr').fill('https://kobags-group.com/back-review')
  assert await frame.evaluate('() => JSON.stringify(__api.design.front)')==front_before
  await frame.locator('#artwork-picker').select_option(str(text_id));assert await frame.locator('#pText').input_value()=='BACK ONLY · TEST'
  await frame.locator('#duplicate-artwork').click()
  new=await frame.evaluate('() => ({...__api.design.back.at(-1)})');assert new['kind']=='text' and new['id']!=text_id
  # Exercise the canvas's real touch-pointer path inside the scrolled iframe.
  editor=frame.locator('#editor');await editor.scroll_into_view_if_needed()
  point=await editor.evaluate('''e=>{const item=__api.design.back.at(-1),r=e.getBoundingClientRect();return {x:r.left+item.x/__api.state.W*r.width,y:r.top+item.y/__api.state.H*r.height}}''')
  bounds=await page.locator('.reference-studio-frame').bounding_box();x=point['x']+bounds['x'];y=point['y']+bounds['y']
  before_drag=await frame.evaluate('() => __api.design.back.at(-1).x')
  if args.width<800:
   session=await ctx.new_cdp_session(page)
   await session.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y,'id':1}]})
   for n in range(1,5):await session.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+16*n/4,'y':y+6*n/4,'id':1}]})
   await session.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});await session.detach()
  else:
   await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+16,y+6,steps=4);await page.mouse.up()
  assert await frame.evaluate('() => __api.design.back.at(-1).x')>before_drag,'Canvas drag did not move the selected back artwork'
  checks.append('Touch-pointer canvas drag moves selected back artwork after the editor scrolls into view')
  await frame.get_by_role('button',name='Move right',exact=True).click();await frame.get_by_role('button',name='Make artwork larger',exact=True).click()
  moved=await frame.evaluate('() => ({...__api.design.back.at(-1)})');assert moved['x']>new['x'] and moved['w']>new['w']
  checks.append('Direct back-side editing; independent text/QR; artwork picker, duplicate, position nudge and size controls')
  await frame.locator('#copySide').click();await frame.locator('.studio-copy-confirm').wait_for(state='visible')
  await frame.locator('.studio-copy-confirm').get_by_role('button',name='Cancel',exact=True).click()
  assert await frame.locator('#copySide').evaluate('(e)=>document.activeElement===e')
  assert await frame.evaluate('() => JSON.stringify(__api.design.front)')==front_before
  await frame.locator('#copySide').click();await frame.locator('#confirm-copy').click()
  assert await frame.locator('#copySide').evaluate('(e)=>document.activeElement===e')
  equal=await frame.evaluate('''() => {const strip=x=>x.map(({id,...other})=>other);return JSON.stringify(strip(__api.design.front))===JSON.stringify(strip(__api.design.back))}''');assert equal
  checks.append('Copy confirmation protects existing artwork; cancel preserves it; replace copies both sides')
  await page.wait_for_timeout(700)
  saved=await frame.evaluate('() => JSON.parse(localStorage.getItem("kobags-reference-studio-v1"))');assert any(x.get('text')=='BACK ONLY · TEST' for x in saved['design']['back'])
  await page.reload(wait_until='domcontentloaded');frame=await ready();await frame.evaluate('() => __api.renderer.setAnimationLoop(null)')
  assert await frame.evaluate('() => __api.getSide()')=='back'
  assert await frame.evaluate('() => __api.design.back.some(x=>x.text==="BACK ONLY · TEST")')
  assert await frame.evaluate('() => __api.design.back.some(x=>x.kind==="qr"&&x.data.includes("back-review"))')
  checks.append('Both sides and selected back side survive reload')
  await frame.locator('#product-references summary').click()
  assert await frame.locator('.reference-gallery-card').count()==2
  first=frame.locator('.reference-gallery-card').first;await first.click()
  await frame.locator('#reference-photo-dialog').wait_for(state='visible')
  await frame.wait_for_function('() => {const i=document.querySelector(".reference-photo-image");return i.complete&&i.naturalWidth>0}')
  await page.screenshot(path=str(OUT/f'{MODE}-reference-{args.width}.png'),full_page=True)
  await page.keyboard.press('ArrowRight');assert '2 of 2'==await frame.locator('.reference-photo-controls span').text_content()
  await page.keyboard.press('Escape');await frame.locator('#reference-photo-dialog').wait_for(state='hidden')
  assert await first.evaluate('(e)=>document.activeElement===e')
  await frame.locator('#tabs [data-tab=bag]').click();await frame.locator('#typeSeg [data-v=string]').click()
  await frame.wait_for_function('() => document.getElementById("product-references").dataset.product==="string"')
  assert 'String' in await frame.locator('.reference-gallery-card').first.text_content()
  await frame.locator('#typeSeg [data-v=bottle]').click();assert await frame.locator('#product-references').is_hidden()
  checks.append('Real reference photos load, dialog navigation/Escape/focus return work, references follow product; Bottle does not show unrelated photos')
  await frame.locator('#tabs [data-tab=bag]').focus();await page.keyboard.press('ArrowRight')
  assert await frame.locator('#tabs [data-tab=design]').get_attribute('aria-selected')=='true'
  assert not await page.evaluate('() => document.documentElement.scrollWidth>innerWidth')
  assert not await frame.evaluate('() => document.documentElement.scrollWidth>innerWidth')
  checks.append('Keyboard tab navigation; width stays contained after editing and references')
  assert not errors,errors
  await ctx.unroute_all(behavior='ignoreErrors');await ctx.close();await browser.close()
result={}
try:
 asyncio.run(main());result={'status':'pass'}
except BaseException as e:
 result={'status':'failed','error':str(e)};raise
finally:
 result.update({'dateUTC':datetime.now(timezone.utc).isoformat(),'mode':MODE,'viewport':args.width,'checks':checks,'errors':errors,'submittedInquiries':0,'rendering':'Chromium SwiftShader; native initial screenshot, then test-only animation pause for controls; not physical-device FPS'})
 (OUT/f'{MODE}-usability-{args.width}.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2),flush=True)
