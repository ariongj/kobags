"""Local browser acceptance for the compact, rotatable bag designer."""
import asyncio,base64,hashlib,json,math
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE,launch
ROOT=Path(__file__).resolve().parents[1]
async def main():
 async with async_playwright() as p:
  b=await launch(p);ctx=await b.new_context(viewport={'width':1440,'height':900});page=await ctx.new_page();page.set_default_timeout(40000)
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  async def ready():
   await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for();await page.wait_for_timeout(400)
  async def draft():return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  async def number(key):return float(await page.locator('.preview-stage .studio-3d-host').get_attribute('data-'+key))
  async def shot(name):
   await page.evaluate('document.activeElement?.blur();window.scrollTo({top:0,behavior:"instant"})');await page.wait_for_timeout(100)
   await page.screenshot(path=str(ROOT/'evidence'/name),type='jpeg',quality=83,full_page=True)
  await page.goto(BASE+'/design',wait_until='networkidle');await ready()
  assert await page.get_by_role('tab',name='3D view',exact=True).get_attribute('data-state')=='active'
  button=await page.locator('.studio-quote .button').bounding_box();assert button['y']+button['height']<=900,button
  assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
  models={}
  for label,slug in [('Handle','handle-bag'),('Box','box-bag'),('D-Cut','d-cut-bag'),('T-Shirt','t-shirt-bag'),('String','string-bag')]:
   await page.get_by_role('button',name=label,exact=True).click();await ready()
   assert await page.locator('.studio-3d-host').get_attribute('data-model')==slug
   raw=await page.locator('.preview-stage').screenshot(path=str(ROOT/'evidence'/f'studio-3d-{slug}.jpg'),type='jpeg',quality=83)
   models[slug]=hashlib.sha256(raw).hexdigest()
  assert len(set(models.values()))==5
  await page.get_by_role('button',name='Box',exact=True).click();await ready()
  before=await number('angle');await page.get_by_role('button',name='Rotate bag right',exact=True).click();await page.wait_for_timeout(450);assert abs(await number('angle')-before)>.2
  canvas=page.locator('.preview-stage .studio-3d-host canvas');box=await canvas.bounding_box();before=await number('angle');x=box['x']+box['width']*.5;y=box['y']+box['height']*.5
  await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+110,y+20,steps=10);await page.mouse.up();await page.wait_for_timeout(700);assert abs(await number('angle')-before)>.2
  await canvas.focus();before=await number('angle');await page.keyboard.press('ArrowLeft');await page.wait_for_timeout(400);assert abs(await number('angle')-before)>.2
  distance=await number('distance');await page.get_by_role('button',name='Zoom in',exact=True).click();await page.wait_for_function("Number(document.querySelector('.preview-stage .studio-3d-host').dataset.distance)<"+str(distance))
  await page.get_by_role('tab',name='Back',exact=True).click();await page.wait_for_function("Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle))>2.9")
  await page.get_by_role('tab',name='Front',exact=True).click();await page.wait_for_function("Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle))<.1")
  await page.get_by_role('button',name='Auto rotate bag',exact=True).click();before=await number('angle');await page.wait_for_function("Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle)-"+str(before)+")>.01");await page.get_by_role('button',name='Pause rotation',exact=True).click()
  # Text and uploaded artwork update the same design shown on both 3D faces.
  await page.get_by_role('tab',name='02 Your design',exact=True).click();await page.get_by_label('Brand name or message').fill('NOVA\nFRONT');await ready()
  first=await canvas.screenshot();await page.get_by_label('Brand name or message').fill('NOVA\nSTUDIO');await ready();assert first!=await canvas.screenshot()
  await page.get_by_role('group',name='Select artwork layer').get_by_role('button',name='Logo',exact=True).click()
  raw=await page.evaluate("""()=>{let c=document.createElement('canvas');c.width=c.height=300;let x=c.getContext('2d');x.fillStyle='#d9cba6';x.beginPath();x.arc(150,150,120,0,Math.PI*2);x.fill();x.fillStyle='#193b67';x.font='bold 160px Georgia';x.textAlign='center';x.fillText('N',150,200);return c.toDataURL('image/png').split(',')[1]}""")
  await page.locator('input[type=file]').set_input_files({'name':'nova-studio.png','mimeType':'image/png','buffer':base64.b64decode(raw)});await page.get_by_text('nova-studio.png',exact=True).wait_for();await ready()
  await page.get_by_role('button',name='Copy design to back',exact=True).click();await page.get_by_role('button',name='Edit back',exact=True).click()
  await page.get_by_role('group',name='Select artwork layer').get_by_role('button',name='Text',exact=True).click();await page.get_by_label('Brand name or message').fill('MADE FOR\nEVERY DAY');await ready()
  assert await page.locator('.studio-3d-host').get_attribute('data-back-artwork')=='true'
  assert abs(await number('angle'))>2.9
  await page.get_by_role('button',name='Edit front',exact=True).click();await ready();await page.get_by_role('button',name='Reset 3D view',exact=True).click();await page.wait_for_timeout(500)
  # Precision controls are optional and do not crowd the first edit.
  assert not await page.get_by_label('Horizontal position',exact=True).is_visible()
  await page.get_by_text('Position & rotation',exact=True).click();await page.get_by_label('Horizontal position',exact=True).fill('56');await ready();assert (await draft())['textPlacement']['x']==56
  await page.get_by_role('tab',name='Place artwork',exact=True).click();await page.wait_for_function("document.querySelector('.preview-stage>.bag-canvas')?.dataset.ready==='true'")
  saved=await draft();assert saved['backText']=='MADE FOR\nEVERY DAY' and saved['logo'] and saved['backLogo']
  async with page.expect_download() as download:await page.get_by_role('button',name='Download both sides + specifications',exact=True).click()
  path=await (await download.value).path();png=Path(path).read_bytes();assert int.from_bytes(png[16:20],'big')==2000
  await page.get_by_role('tab',name='3D view',exact=True).click();await ready();await page.get_by_text('Position & rotation',exact=True).click();await shot('studio-3d-desktop.jpg')
  await page.get_by_role('button',name='Enlarge preview',exact=True).click();await page.get_by_role('dialog').locator('.studio-3d[data-status=ready]').wait_for();await page.get_by_role('dialog').get_by_role('button',name='Rotate bag left',exact=True).click();await page.keyboard.press('Escape');await ready()
  for width in [1024,768,390,320]:
   await page.set_viewport_size({'width':width,'height':844});await page.wait_for_timeout(200);assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),width
  await page.set_viewport_size({'width':390,'height':844});await shot('studio-3d-mobile.jpg')
  assert await page.locator('.preview-stage').evaluate('(e)=>e.getBoundingClientRect().height')<=320
  await page.get_by_role('button',name='Rotate bag left',exact=True).click();await ready()
  await page.get_by_role('link',name='Get a quote for this bag',exact=True).click();await page.wait_for_url('**/quote');assert (await draft())['backText']==saved['backText']
  # Motion preference and WebGL failure have usable, explicit alternatives.
  reduced=await b.new_context(reduced_motion='reduce');rp=await reduced.new_page();await rp.goto(BASE+'/design',wait_until='networkidle');await rp.locator('.studio-3d[data-status=ready]').wait_for();assert await rp.get_by_role('button',name='Auto rotate bag',exact=True).is_disabled();await reduced.close()
  fallback=await b.new_context();await fallback.add_init_script("const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(String(type).includes('webgl'))return null;return original.call(this,type,...args)}")
  fp=await fallback.new_page();await fp.goto(BASE+'/design',wait_until='networkidle');await fp.locator('.studio-3d[data-status=fallback]').wait_for();await fp.locator('.studio-3d canvas[data-ready=true]').wait_for();await fp.get_by_role('tab',name='Place artwork',exact=True).click();await fp.locator('.preview-stage>.bag-canvas[data-ready=true]').wait_for();await fallback.close()
  assert not errors,errors
  (ROOT/'evidence/studio-3d-checks.json').write_text(json.dumps({'status':'passed','models':list(models),'widths':[1440,1024,768,390,320],'desktopQuoteVisibleWithoutScroll':True,'checks':['five distinct volumetric families','drag, arrow buttons and keyboard rotation','zoom, reset, front/back and opt-in spin','independent front/back logo and text with live textures','shared artwork state between 3D and precision placement','two-sided export, fullscreen and quote carry-through','compact desktop CTA and mobile canvas','reduced motion and unavailable-WebGL fallback'],'browserErrors':errors},indent=2))
  await b.close();print('PASS compact 3D bag studio')
asyncio.run(main())
