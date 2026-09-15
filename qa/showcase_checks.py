"""Local-only acceptance checks for the 3D showroom and site-wide redesign."""
import asyncio,json,uuid,math
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE,launch
ROOT=Path(__file__).resolve().parents[1]
async def main():
 async with async_playwright() as p:
  b=await launch(p);context=await b.new_context(viewport={'width':1440,'height':1000},extra_http_headers={'oai-authenticated-user-id':'showcase-'+str(uuid.uuid4())})
  page=await context.new_page();page.set_default_timeout(60000);errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  await page.goto(BASE+'/',wait_until='networkidle')
  assert not await page.evaluate("performance.getEntriesByType('resource').some(r=>r.name.includes('bag-scene-'))"),'3D engine should load near the showroom, not with the top hero'
  await page.screenshot(path=str(ROOT/'evidence/v5-home.jpg'),type='jpeg',quality=86)
  stage=page.locator('.showcase-canvas')
  await page.locator('#bag-showcase').scroll_into_view_if_needed();await stage.locator('canvas').wait_for();await page.wait_for_function("document.querySelector('.showcase-canvas').dataset.ready==='true'")
  assert await page.evaluate("performance.getEntriesByType('resource').some(r=>r.name.includes('bag-scene-'))")
  await page.get_by_role('button',name='Pause bag animation',exact=True).click()
  await page.get_by_role('button',name='Front',exact=True).click();await page.wait_for_function("Math.abs(Number(document.querySelector('.showcase-canvas').dataset.angle)) < .03")
  front=float(await stage.get_attribute('data-angle'))
  await page.get_by_role('button',name='Back',exact=True).click();await page.wait_for_function("Math.abs(Number(document.querySelector('.showcase-canvas').dataset.angle)) > 3")
  back=float(await stage.get_attribute('data-angle'));assert abs(back-front)>2.5
  await page.get_by_role('button',name='Reset 3D view').click();await page.wait_for_function("Math.abs(Number(document.querySelector('.showcase-canvas').dataset.angle)-.426) < .03")
  before=float(await stage.get_attribute('data-angle'));await stage.focus();await page.keyboard.press('ArrowRight');await page.wait_for_function('(a)=>Math.abs(Number(document.querySelector(".showcase-canvas").dataset.angle)-a) > .1',arg=before);assert abs(float(await stage.get_attribute('data-angle'))-before)>.1
  box=await stage.bounding_box();x=box['x']+box['width']*.5;y=box['y']+box['height']*.5
  before=float(await stage.get_attribute('data-angle'));await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+90,y+10,steps=8);await page.mouse.up();await page.wait_for_function('(a)=>Math.abs(Number(document.querySelector(".showcase-canvas").dataset.angle)-a) > .05',arg=before)
  assert abs(float(await stage.get_attribute('data-angle'))-before)>.05
  await page.get_by_role('button',name='Reset 3D view').click()
  await page.get_by_role('button',name='Explore the construction',exact=True).click();await page.wait_for_function("document.querySelector('.showcase-canvas').dataset.construction==='open'");await page.wait_for_timeout(500)
  async def section_shot(name):
   await page.evaluate('window.scrollTo(0,0)');box=await page.locator('#bag-showcase').bounding_box()
   await page.screenshot(path=str(ROOT/'evidence'/name),full_page=True,clip=box,type='jpeg',quality=86)
  await section_shot('v5-construction.jpg')
  await page.get_by_role('button',name='Back to the finished bag',exact=True).click();await page.wait_for_function("document.querySelector('.showcase-canvas').dataset.construction==='closed'")
  await page.get_by_label('YOUR BRAND NAME',exact=True).fill('NOVA STUDIO')
  await page.get_by_role('button',name='Forest green 3D bag',exact=True).click();await page.wait_for_timeout(700)
  assert await stage.get_attribute('data-color')=='Forest green'
  await section_shot('v5-showcase.jpg')
  # The renderer stops while its section is out of view.
  await page.evaluate('window.scrollTo(0,0)');await page.wait_for_timeout(350)
  frame=await stage.get_attribute('data-frame');await page.wait_for_timeout(350);assert frame==await stage.get_attribute('data-frame')
  await page.get_by_role('link',name='Continue in the design studio',exact=True).click();await page.wait_for_url('**/design')
  d=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  assert (d['text'],d['color'],d['ink'],d['product'],d['textFont'])==('NOVA STUDIO','Forest green','#ffffff','handle-bag','sans')
  await page.locator('.preview-stage canvas[data-ready=true]').wait_for()
  # Representative layouts, with the mapped route suite covering the entire site.
  routes=['/','/products','/products/box-bag','/design','/quote','/manufacturing','/sustainability','/partners','/resources','/contact','/blog','/demo/customer','/demo/admin','/handoff']
  for width in [1440,1024,390,320]:
   await page.set_viewport_size({'width':width,'height':900})
   for route in routes:
    await page.goto(BASE+route,wait_until='networkidle')
    assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth'),f'{route} overflows at {width}'
    if width==1440 and route in ['/products','/manufacturing','/design','/demo/admin']:
     await page.screenshot(path=str(ROOT/'evidence'/('v5-'+route.strip('/').replace('/','-')+'.jpg')),type='jpeg',quality=86)
  await page.set_viewport_size({'width':390,'height':844});await page.goto(BASE+'/',wait_until='networkidle')
  await page.screenshot(path=str(ROOT/'evidence/v5-mobile-home.jpg'),type='jpeg',quality=86)
  await page.locator('#bag-showcase').scroll_into_view_if_needed();await page.wait_for_function("document.querySelector('.showcase-canvas').dataset.ready==='true'")
  await page.get_by_role('button',name='Pause bag animation').click();await page.get_by_role('button',name='Explore the construction').click();await page.wait_for_function("document.querySelector('.showcase-canvas').dataset.construction==='open'");await section_shot('v5-mobile-showcase.jpg')
  # Reduced-motion starts static, with working manual rotation.
  reduced=await b.new_context(reduced_motion='reduce',viewport={'width':1000,'height':900});rp=await reduced.new_page();await rp.goto(BASE+'/',wait_until='networkidle');await rp.locator('#bag-showcase').scroll_into_view_if_needed();await rp.wait_for_function("document.querySelector('.showcase-canvas').dataset.ready==='true'")
  await rp.get_by_role('button',name='Play bag animation',exact=True).wait_for()
  angle=await rp.locator('.showcase-canvas').get_attribute('data-angle');await rp.wait_for_timeout(500);assert angle==await rp.locator('.showcase-canvas').get_attribute('data-angle')
  await reduced.close()
  # Devices without WebGL get a functional flat preview and a path to the studio.
  fallback=await b.new_context();await fallback.add_init_script("const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl2'||type==='webgl'||type==='experimental-webgl')return null;return original.call(this,type,...args)}")
  fp=await fallback.new_page();await fp.goto(BASE+'/',wait_until='networkidle');await fp.locator('#bag-showcase').scroll_into_view_if_needed();await fp.wait_for_function("document.querySelector('.showcase-canvas').dataset.status==='fallback'")
  await fp.get_by_role('button',name='White 3D bag',exact=True).click();await fp.get_by_label('YOUR BRAND NAME',exact=True).fill('WHITE TEST');await fp.locator('.showcase-fallback canvas[data-ready=true]').wait_for()
  assert await fp.get_by_role('button',name='Explore the construction').is_disabled()
  await fp.get_by_role('link',name='Continue in the design studio').click();await fp.wait_for_url('**/design');d=await fp.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))");assert d['color']=='White' and d['ink']=='#12313b' and d['text']=='WHITE TEST'
  await fallback.close();assert not errors,errors
  (ROOT/'evidence/v5-showcase-checks.json').write_text(json.dumps({'status':'passed','responsiveWidths':[1440,1024,390,320],'responsiveRoutes':routes,'checks':['3D library lazy load','WebGL geometry and canvas render','front/back, keyboard and pointer rotation','animated construction view','live branding and color saved into designer','offscreen rendering suspension','reduced-motion default','working 2D fallback without WebGL','56 representative viewport-route layouts without overflow'],'browserErrors':errors,'environment':'Chromium, local compiled Worker, software WebGL for automated rendering; not a physical-device GPU performance benchmark'},indent=2))
  print('PASS 3D showroom and 56 responsive layouts');await b.close()
asyncio.run(main())
