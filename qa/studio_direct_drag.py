"""Local acceptance: direct 3D layer selection, mouse/touch movement and brand color."""
import asyncio, json, base64
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE, launch
ROOT=Path(__file__).resolve().parents[1]
async def main():
 async with async_playwright() as p:
  browser=await launch(p)
  context=await browser.new_context(viewport={'width':1440,'height':900})
  await context.add_init_script("""if(!localStorage.getItem('kobags-design-v1')){const c=document.createElement('canvas');c.width=c.height=200;const x=c.getContext('2d');x.fillStyle='#d8eab5';x.fillRect(20,20,160,160);x.fillStyle='#153447';x.font='bold 90px Arial';x.textAlign='center';x.fillText('N',100,130);let logo=c.toDataURL();localStorage.setItem('kobags-design-v1',JSON.stringify({product:'box-bag',color:'Forest green',text:'NOVA STUDIO',logo,logoName:'nova.png',x:45,y:47,scale:23,rotation:17,layeredArtwork:true,textPlacement:{x:50,y:70,scale:24,rotation:-8},backLogo:logo,backLogoName:'nova.png',backText:'THE BACK',backX:48,backY:48,backScale:21,backRotation:0,backTextPlacement:{x:50,y:70,scale:22,rotation:0}}))}""")
  page=await context.new_page();page.set_default_timeout(45000);errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  host=page.locator('.preview-stage .studio-3d-host');canvas=host.locator('canvas')
  async def ready():
   await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
   await page.wait_for_function("JSON.parse(document.querySelector('.preview-stage .studio-3d-host')?.dataset.artworkTargets||'[]').length===4")
  async def draft(): return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  async def angle(): return float(await host.get_attribute('data-angle'))
  async def target(layer,side='front',where=None):
   h=where or host;await h.locator('canvas').scroll_into_view_if_needed()
   a=json.loads(await h.get_attribute('data-artwork-targets'));t=next(t for t in a if t['side']==side and t['layer']==layer);assert t['visible'],t
   b=await h.locator('canvas').bounding_box();return (b['x']+t['x']*b['width'],b['y']+t['y']*b['height'])
  async def drag(layer,dx,dy,side='front',pause=False,where=None):
   x,y=await target(layer,side,where);await page.mouse.move(x,y);await page.mouse.down()
   h=where or host
   assert await h.get_attribute('data-dragging')=='true', {'layer':layer,'selection':await h.get_attribute('data-selection')}
   await page.mouse.move(x+dx/2,y+dy/2,steps=5)
   if pause: await page.wait_for_timeout(850)
   await page.mouse.move(x+dx,y+dy,steps=5);await page.mouse.up();await ready()
  async def visible_artwork(layer, side='front'):
   await target(layer,side)
   # Sample the rendered image, not just design state or mesh metadata.
   targets=json.loads(await host.get_attribute('data-artwork-targets'));point=next(t for t in targets if t['side']==side and t['layer']==layer)
   png=base64.b64encode(await canvas.screenshot()).decode()
   bright=await page.evaluate("""async ({png,x,y})=>{const im=new Image();im.src='data:image/png;base64,'+png;await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const ctx=c.getContext('2d');ctx.drawImage(im,0,0);const pixels=ctx.getImageData(Math.round(x*c.width)-20,Math.round(y*c.height)-10,40,20).data;let n=0;for(let i=0;i<pixels.length;i+=4)if(pixels[i]>130&&pixels[i+1]>130&&pixels[i+2]>85)n++;return n;}""",{'png':png,'x':point['x'],'y':point['y']})
   assert bright>12, {'layer':layer,'side':side,'visiblePixels':bright}
  await page.goto(BASE+'/design',wait_until='networkidle');await ready()
  await visible_artwork('logo');await visible_artwork('text')
  a=await angle();initial=await draft();await drag('logo',35,15,pause=True);moved=await draft()
  assert moved['x']>initial['x']+2 and moved['y']>initial['y']+1,(initial['x'],moved['x'],initial['y'],moved['y'])
  assert moved['textPlacement']==initial['textPlacement'] and moved['backX']==initial['backX'] and abs(await angle()-a)<.01
  assert await page.get_by_role('group',name='Select artwork layer').get_by_role('button',name='Logo',exact=True).get_attribute('aria-pressed')=='true'
  await page.get_by_role('button',name='Undo change',exact=True).click();await ready();assert (await draft())['x']==initial['x'] and (await draft())['y']==initial['y']
  await page.get_by_role('button',name='Redo change',exact=True).click();await ready();assert (await draft())['x']==moved['x']
  await drag('text',-22,-12);textMoved=await draft();assert textMoved['textPlacement']['x']<moved['textPlacement']['x'] and textMoved['x']==moved['x']
  await canvas.focus();await page.keyboard.press('ArrowRight');await ready();nudged=await draft();assert abs(nudged['textPlacement']['x']-textMoved['textPlacement']['x']-1)<.001
  await page.keyboard.press('Shift+ArrowUp');await ready();assert abs((await draft())['textPlacement']['y']-nudged['textPlacement']['y']+5)<.001
  await page.keyboard.press('Escape');await page.wait_for_function("document.querySelector('.preview-stage .studio-3d-host').dataset.selection===''")
  await page.get_by_role('group',name='Select artwork layer').get_by_role('button',name='Text',exact=True).click();await page.wait_for_function("document.querySelector('.preview-stage .studio-3d-host').dataset.selection==='front:text'")
  # Empty-space dragging still rotates, without moving either artwork layer.
  before=await draft();box=await canvas.bounding_box();a=await angle();x=box['x']+box['width']*.12;y=box['y']+box['height']*.5
  await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+85,y+10,steps=8);await page.mouse.up()
  await page.wait_for_function("Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle)-"+str(a)+")>.2")
  assert (await draft())==before and await host.get_attribute('data-selection')==''
  # Orbit to the back without using a face tab; selection must change side without snapping.
  await page.get_by_role('button',name='Reset 3D view',exact=True).click()
  for _ in range(7): await page.get_by_role('button',name='Rotate bag right',exact=True).click()
  await page.wait_for_function("JSON.parse(document.querySelector('.preview-stage .studio-3d-host').dataset.artworkTargets).some(x=>x.side==='back'&&x.visible)")
  await page.wait_for_function("Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle)+3.102)<.02")
  assert (await draft())['side']=='front';a=await angle();before=await draft();await drag('logo',-20,12,'back');after=await draft()
  assert after['side']=='back' and after['backX']!=before['backX'] and after['x']==before['x'] and abs(await angle()-a)<.01,(a,await angle())
  # Guides are view-only, including clean downloaded PNGs.
  async def download():
   async with page.expect_download() as pending: await page.get_by_role('button',name='Download design preview',exact=True).click()
   path=await (await pending.value).path();return Path(path).read_bytes()
  clean=await download();await page.get_by_role('button',name='Toggle artwork guides',exact=True).click();await ready();assert await download()==clean
  assert await page.get_by_role('tab',name='3D view',exact=True).get_attribute('data-state')=='active'
  await page.get_by_role('button',name='Toggle artwork guides',exact=True).click()
  # Fullscreen uses the same editable draft.
  await page.get_by_role('button',name='Enlarge preview',exact=True).click();dialog=page.get_by_role('dialog');await dialog.locator('.studio-3d[data-status=ready]').wait_for();dh=dialog.locator('.studio-3d-host')
  await page.wait_for_function("document.querySelector('[role=dialog] .studio-3d-host')?.dataset.artworkTargets")
  before=await draft();await drag('text',22,0,'back',where=dh);assert (await draft())['backTextPlacement']['x']!=before['backTextPlacement']['x']
  await page.keyboard.press('Escape');await page.keyboard.press('Escape');await dialog.wait_for(state='hidden')
  await page.get_by_role('tab',name='Front',exact=True).click();await ready();await page.wait_for_function("Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle))<.01");await visible_artwork('logo');await visible_artwork('text')
  await page.evaluate('window.scrollTo({top:0,behavior:"instant"})');await page.screenshot(path=str(ROOT/'evidence/studio-direct-drag-desktop.jpg'),type='jpeg',quality=85,full_page=True)
  # Mobile touch: artwork moves while the camera and other layers remain fixed.
  await page.set_viewport_size({'width':390,'height':844});await canvas.scroll_into_view_if_needed();await ready();cdp=await context.new_cdp_session(page)
  before=await draft();a=await angle();x,y=await target('logo');await cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y,'id':1}]})
  for step in range(1,7): await cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+step*3,'y':y+step,'id':1}]})
  await cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});await ready();after=await draft()
  assert after['x']!=before['x'] and after['textPlacement']==before['textPlacement'] and abs(await angle()-a)<.01
  assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth');await visible_artwork('logo')
  await page.screenshot(path=str(ROOT/'evidence/studio-direct-drag-mobile.jpg'),type='jpeg',quality=85,full_page=True)
  for width in [320,768,1440]:
   await page.set_viewport_size({'width':width,'height':900});assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
  # Header color is the exact requested headline color; original logo geometry stays intact.
  await page.goto(BASE,wait_until='networkidle');await page.locator('.brand-wordmark img').wait_for()
  assert await page.locator('.brand-wordmark').evaluate("e=>getComputedStyle(e,'::after').backgroundColor")=='rgb(198, 235, 157)'
  await page.locator('.header').screenshot(path=str(ROOT/'evidence/header-lime-desktop.jpg'),type='jpeg',quality=95)
  await page.set_viewport_size({'width':390,'height':844});await page.locator('.header').screenshot(path=str(ROOT/'evidence/header-lime-mobile.jpg'),type='jpeg',quality=95)
  assert not errors,errors
  (ROOT/'evidence/studio-direct-drag.json').write_text(json.dumps({'status':'passed','checks':['direct logo and text selection on 3D mesh','independent layer and face movement','one undo per complete gesture including pauses','keyboard nudge, escape, sidebar reselection','empty-space orbit','back-face selection without camera snap','clean exports independent of guides','fullscreen editing','mobile touch dragging','320/390/768/1440 layout','exact lime header treatment','visible uploaded logo/text after saved-draft load and fullscreen'],'browserErrors':errors},indent=2))
  await browser.close();print('PASS direct 3D artwork movement and lime logo')
asyncio.run(main())
