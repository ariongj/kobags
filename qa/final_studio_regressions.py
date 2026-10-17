import asyncio, json, base64, sys, traceback
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'qa'))
from browser_support import launch, BASE, artwork_point
from playwright.async_api import async_playwright
OUT=ROOT/'evidence/final-studio-regressions.json'
checks=[];errors=[]
async def main():
 async with async_playwright() as p:
  b=await launch(p);c=await b.new_context(viewport={'width':1440,'height':1050});page=await c.new_page();page.set_default_timeout(40000)
  page.on('pageerror',lambda e:errors.append(str(e)))
  async def draft():return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  async def ready(selector='.preview-stage .bag-canvas'):await page.wait_for_function("document.querySelector("+json.dumps(selector)+")?.dataset.ready==='true'")
  async def edit():
   await page.get_by_role('button',name='Photo + artwork',exact=True).click();await ready();await page.get_by_role('tab',name='02 Your design').click()
  async def ink(value):
   await page.locator('#ink').evaluate("(e,value)=>{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,value);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));}",value)
   await page.wait_for_function("JSON.parse(localStorage.getItem('kobags-design-v1')).ink==="+json.dumps(value))
  async def drag(selector, xpercent, ypercent, dx=50, pause=False, touch=False):
   canvas=page.locator(selector);point=await artwork_point(canvas);x=point['x'];y=point['y']
   if touch:
    cdp=await c.new_cdp_session(page);await cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y,'id':1}]})
    for i in range(1,7):await cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+dx*i/6,'y':y,'id':1}]})
    await cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});await cdp.detach()
   else:
    await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+dx/2,y,steps=4)
    if pause:await page.wait_for_timeout(950)
    await page.mouse.move(x+dx,y,steps=4);await page.mouse.up()
   await ready(selector)
  await page.goto(BASE+'/design',wait_until='networkidle');await edit();await ink('#193b67');await page.reload(wait_until='networkidle');assert (await draft())['ink']=='#193b67';checks.append('Custom text ink survives reload')
  await page.get_by_role('link',name='Get a quote for this bag',exact=True).click();await page.wait_for_url('**/quote');await page.wait_for_load_state('networkidle');assert (await draft())['ink']=='#193b67';checks.append('Custom text ink survives studio-to-quote navigation')
  await page.goto(BASE+'/sq/design',wait_until='networkidle');assert (await draft())['ink']=='#193b67';assert await page.locator('html').get_attribute('lang')=='sq';checks.append('Custom text ink survives Albanian route navigation')
  await page.goto(BASE+'/design',wait_until='networkidle');await edit();await page.get_by_role('tab',name='01 The bag').click();await page.get_by_role('button',name='White',exact=True).click();await ready();await page.get_by_role('button',name='Undo change',exact=True).click();await ready();assert (await draft())['color']=='Natural' and (await draft())['ink']=='#193b67';checks.append('Undo restores the approved Natural default and explicit ink together')
  await page.get_by_role('tab',name='02 Your design').click();start=await draft();await drag('.preview-stage .bag-canvas',start['x'],start['y'],pause=True);moved=await draft();assert moved['x']!=start['x'];await page.get_by_role('button',name='Undo change',exact=True).click();await ready();assert abs((await draft())['x']-start['x'])<.01;checks.append('A flat drag with a 950 ms pause is one undo gesture')
  await page.evaluate("""()=>{const d=JSON.parse(localStorage.getItem('kobags-design-v1'));const c=document.createElement('canvas');c.width=c.height=100;const x=c.getContext('2d');x.fillStyle='#ff0000';x.fillRect(0,0,100,100);Object.assign(d,{logo:c.toDataURL(),logoName:'overlap.png',text:'XXXXXXXX',x:50,y:56,scale:10,layeredArtwork:true,textPlacement:{x:50,y:56,scale:50,rotation:0}});localStorage.setItem('kobags-design-v1',JSON.stringify(d));}""")
  await page.reload(wait_until='networkidle');await edit();await page.get_by_role('group',name='Your elements').get_by_role('button',name='Select Logo').first.click();await ready();start=await draft();await drag('.preview-stage .bag-canvas',50,56,dx=35);after=await draft();assert after['x']>50 and after['textPlacement']==start['textPlacement'];assert await page.get_by_role('group',name='Your elements').get_by_role('button',name='Select Logo').first.get_attribute('aria-pressed')=='true';checks.append('Selected overlapping logo moves alone in photo mode')
  await page.get_by_role('button',name='Enlarge preview',exact=True).click();await ready('[role=dialog] .bag-canvas');start=await draft();await drag('[role=dialog] .bag-canvas',start['x'],start['y'],dx=25,pause=True);after=await draft();assert after['x']>start['x'] and after['textPlacement']==start['textPlacement'];await page.keyboard.press('Escape');await page.get_by_role('dialog').wait_for(state='hidden');await page.get_by_role('button',name='Undo change',exact=True).click();await ready();assert abs((await draft())['x']-start['x'])<.01;checks.append('Fullscreen photo artwork is editable and keeps one undo per gesture')
  await page.set_viewport_size({'width':390,'height':844});start=await draft();await drag('.preview-stage .bag-canvas',start['x'],start['y'],dx=15,touch=True);after=await draft();assert after['x']>start['x'] and after['textPlacement']==start['textPlacement'];assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth');checks.append('Mobile touch drags the selected photo layer without horizontal overflow')
  # A delayed decoder keeps the primary quote action unavailable until the logo is stored.
  await page.set_viewport_size({'width':1440,'height':1050});raw=await page.evaluate("""()=>{const c=document.createElement('canvas');c.width=c.height=100;const x=c.getContext('2d');x.fillStyle='blue';x.fillRect(0,0,100,100);const original=window.createImageBitmap;window.createImageBitmap=async(...args)=>{window.auditUploadPending=true;await new Promise(r=>window.releaseAuditUpload=r);return original(...args)};return c.toDataURL().split(',')[1];}""")
  await page.locator('input[type=file]').set_input_files({'name':'pending-safe.png','mimeType':'image/png','buffer':base64.b64decode(raw)})
  await page.wait_for_function('window.auditUploadPending===true');assert await page.get_by_role('button',name='Preparing artwork…',exact=True).is_disabled();assert await page.get_by_role('link',name='Get a quote for this bag',exact=True).count()==0
  await page.evaluate('window.releaseAuditUpload()');await page.get_by_role('link',name='Get a quote for this bag',exact=True).wait_for();saved=await draft();assert saved['logoName']=='pending-safe.png' and saved['logo'];await page.get_by_role('link',name='Get a quote for this bag',exact=True).click();await page.wait_for_url('**/quote');await page.wait_for_load_state('networkidle');assert (await draft())['logo']==saved['logo'];checks.append('Quote CTA waits for upload storage, then carries the completed logo')
  await c.close()
  # A device without WebGL retains the same selected-layer behavior and gesture history.
  c=await b.new_context(viewport={'width':390,'height':844});await c.add_init_script("""(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...rest){if(kind==='webgl'||kind==='webgl2'||kind==='experimental-webgl')return null;return original.call(this,kind,...rest)}})()""")
  page=await c.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.set_default_timeout(40000)
  await page.goto(BASE+'/design',wait_until='networkidle');await page.locator('.studio-3d[data-status=fallback]').wait_for();await ready();await page.get_by_role('tab',name='02 Your design').click();start=await draft();await drag('.preview-stage .bag-canvas',start['x'],start['y'],dx=20,pause=True);after=await draft();assert after['x']>start['x'];await page.get_by_role('button',name='Undo change',exact=True).click();await ready();assert abs((await draft())['x']-start['x'])<.01;assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth');checks.append('No-WebGL mobile fallback remains editable with atomic drag undo')
  assert not errors,errors
  await b.close()
try:
 asyncio.run(main());OUT.write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors},indent=2));print(OUT.read_text())
except Exception as e:
 OUT.write_text(json.dumps({'status':'failed','checksCompleted':checks,'failure':str(e),'browserErrors':errors,'traceback':traceback.format_exc()},indent=2));print(OUT.read_text());raise
