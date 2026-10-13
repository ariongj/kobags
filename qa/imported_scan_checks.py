"""Uploaded coffee scan: real rendering, controls, isolation and recovery."""
import asyncio,io,json
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright
from browser_support import BASE,launch
ROOT=Path(__file__).resolve().parents[1]
async def main():
 errors=[];checks=[]
 async with async_playwright() as p:
  b=await launch(p);context=await b.new_context(viewport={'width':1440,'height':950});page=await context.new_page();page.set_default_timeout(60000)
  page.on('pageerror',lambda e:errors.append(str(e)))
  await page.goto(BASE+'/design',wait_until='networkidle');await page.locator('.studio-3d[data-status=ready]').wait_for()
  await page.get_by_role('tab',name='02 Your design',exact=True).click();await page.get_by_label('Brand name or message').fill('KEEP MY BAG')
  saved=await page.evaluate("localStorage.getItem('kobags-design-v1')")
  await page.get_by_role('button',name='3D test — coffee scan',exact=True).click()
  async def ready():
   await page.locator('.scan-viewer[data-status=ready]').wait_for();await page.wait_for_timeout(750)
  async def number(key):return float(await page.locator('.scan-host').get_attribute('data-'+key))
  await ready();assert await page.locator('.bag-pick[aria-pressed=true]').count()==1
  assert await page.locator('.studio-controls').count()==0
  assert 'model=coffee-test' in page.url
  assert saved==await page.evaluate("localStorage.getItem('kobags-design-v1')")
  first=await page.locator('.scan-host canvas').screenshot()
  im=Image.open(io.BytesIO(first)).convert('RGB');w,h=im.size;pixels=list(im.crop((w*.2,h*.1,w*.8,h*.8)).getdata())
  assert sum(1 for r,g,b in pixels if max(r,g,b)<210)>1500,'Scan geometry/texture missing from first render'
  checks.append('Visible textured scan on first render; isolated selection, no quotation and saved bag unchanged')
  angle=await number('angle');await page.get_by_role('button',name='Rotate scan right',exact=True).click();await page.wait_for_timeout(400);assert abs(await number('angle')-angle)>.2
  assert first!=await page.locator('.scan-host canvas').screenshot()
  distance=await number('distance');await page.get_by_role('button',name='Zoom in scan',exact=True).click();await page.wait_for_timeout(300);assert await number('distance')<distance
  canvas=page.locator('.scan-host canvas');await canvas.focus();angle=await number('angle');await page.keyboard.press('ArrowLeft');await page.wait_for_timeout(300);assert abs(await number('angle')-angle)>.2
  box=await canvas.bounding_box();angle=await number('angle');await page.mouse.move(box['x']+box['width']*.35,box['y']+box['height']*.45);await page.mouse.down();await page.mouse.move(box['x']+box['width']*.6,box['y']+box['height']*.5,steps=8);await page.mouse.up();await page.wait_for_timeout(500);assert abs(await number('angle')-angle)>.2
  await page.get_by_role('button',name='Auto rotate scan',exact=True).click();angle=await number('angle');await page.wait_for_timeout(1200);assert abs(await number('angle')-angle)>.01
  await page.get_by_role('button',name='Pause scan rotation',exact=True).click();await page.get_by_role('button',name='Reset scan view',exact=True).click();await page.wait_for_timeout(500)
  checks.append('Pointer and keyboard rotation, zoom, reset and opt-in auto rotation')
  for preset in ['front','back','top','bottom','angle']:
   await page.get_by_label('Scan viewpoint',exact=True).select_option(preset);await page.wait_for_timeout(700)
   polar=await number('polar')
   if preset=='top':assert polar<.01,polar
   if preset=='bottom':assert polar>3.13,polar
   capture=await page.locator('.scan-viewer').screenshot(path=str(ROOT/('evidence/coffee-repaired-'+preset+'.png')))
   frame=Image.open(io.BytesIO(capture)).convert('RGB');w,h=frame.size
   assert sum(1 for r,g,b in frame.crop((w*.25,h*.15,w*.75,h*.75)).getdata() if max(r,g,b)<220)>800,('Empty preset',preset)
  await page.get_by_label('Scan viewpoint',exact=True).select_option('front')
  for side,steps in [('right',4),('left',8)]:
   for _ in range(steps):await page.get_by_role('button',name='Rotate scan right',exact=True).click()
   await page.wait_for_timeout(700)
   await page.locator('.scan-viewer').screenshot(path=str(ROOT/('evidence/coffee-repaired-'+side+'.png')))
  await page.get_by_label('Scan viewpoint',exact=True).select_option('angle');await page.wait_for_timeout(500)
  checks.append('Seven angles render, including left/right, top and underside; pole views reach the correct angles')
  await page.screenshot(path=str(ROOT/'evidence/coffee-scan-desktop.jpg'),type='jpeg',quality=85,full_page=True)
  await page.get_by_role('button',name='Enlarge scan',exact=True).click();await page.get_by_role('dialog').locator('.scan-viewer[data-status=ready]').wait_for();await page.keyboard.press('Escape');await ready()
  await page.reload(wait_until='networkidle');await ready();assert saved==await page.evaluate("localStorage.getItem('kobags-design-v1')")
  for width in [768,390,320]:
   await page.set_viewport_size({'width':width,'height':844});await page.wait_for_timeout(300);assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),width
   boxes=await page.locator('.bag-pick').evaluate_all('(els)=>els.map(e=>e.getBoundingClientRect().top)');assert max(boxes)-min(boxes)<2
  await page.locator('.scan-host canvas').scroll_into_view_if_needed();await page.wait_for_timeout(750)
  mobile_image=Image.open(io.BytesIO(await page.locator('.scan-host canvas').screenshot())).convert('RGB')
  assert sum(1 for r,g,b in mobile_image.getdata() if max(r,g,b)<210)>1000,'Mobile scan is blank'
  await page.screenshot(path=str(ROOT/'evidence/coffee-scan-mobile.jpg'),type='jpeg',quality=85,full_page=True)
  await page.get_by_role('button',name='Back to your bag',exact=True).click();await page.locator('.studio-3d[data-status=ready]').wait_for();assert 'model=' not in page.url;assert saved==await page.evaluate("localStorage.getItem('kobags-design-v1')")
  await page.get_by_role('button',name='T-Shirt',exact=True).click();await page.locator('.studio-3d[data-status=ready]').wait_for();assert await page.get_by_role('link',name='Get a quote for this bag',exact=True).is_visible()
  checks.append('Fullscreen, reload and direct link; one-row picker at 320/390/768px; normal bag return and quotation preserved')
  await context.close()
  mobile=await b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce');mp=await mobile.new_page();mp.set_default_timeout(60000);await mp.goto(BASE+'/sq/design?model=coffee-test',wait_until='networkidle');await mp.locator('.scan-viewer[data-status=ready]').wait_for();assert await mp.get_by_role('button',name='Rrotullo skanimin automatikisht',exact=True).is_disabled()
  await mp.locator('.scan-host canvas').scroll_into_view_if_needed();box=await mp.locator('.scan-host canvas').bounding_box();angle=float(await mp.locator('.scan-host').get_attribute('data-angle'));cdp=await mobile.new_cdp_session(mp)
  x=box['x']+box['width']*.3;y=box['y']+box['height']*.5
  await cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
  await cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+85,'y':y+10}]})
  await cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});await mp.wait_for_timeout(500)
  assert abs(float(await mp.locator('.scan-host').get_attribute('data-angle'))-angle)>.1
  checks.append('Albanian UI, mobile touch rotation and reduced-motion setting');await mobile.close()
  failed=await b.new_context();fp=await failed.new_page();fp.set_default_timeout(60000)
  await fp.route('**/assets/models/coffee-test.glb*',lambda route:route.fulfill(status=503,body='Unavailable'))
  await fp.goto(BASE+'/design?model=coffee-test',wait_until='networkidle');await fp.get_by_role('alert').wait_for();await fp.unroute('**/assets/models/coffee-test.glb*');await fp.get_by_role('button',name='Try again',exact=True).click();await fp.locator('.scan-viewer[data-status=ready]').wait_for();await failed.close()
  fallback=await b.new_context();await fallback.add_init_script("const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(String(type).includes('webgl'))return null;return original.call(this,type,...args)}");fp=await fallback.new_page();await fp.goto(BASE+'/design?model=coffee-test',wait_until='networkidle');await fp.get_by_role('alert').wait_for();assert await fp.get_by_role('button',name='Back to your bag',exact=True).is_visible();await fallback.close()
  checks.append('Failed asset retry and understandable WebGL-unavailable state')
  await b.close()
 assert not errors,errors
 (ROOT/'evidence/imported-scan-checks.json').write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors},indent=2)+'\n');print('PASS',len(checks),'imported scan checks')
asyncio.run(main())
