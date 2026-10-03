"""Local preview only. Confirm photo placement preserves uploaded logo proportions."""
import asyncio, io, json, math, sys, traceback
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'qa'))
from browser_support import launch, BASE
OUT=ROOT/'evidence/studio-aspect-check'; OUT.mkdir(exist_ok=True)
R={'cases':[],'checks':[],'errors':[]}
def analyze(path):
 im=Image.open(path).convert('RGB');p=[(i%im.width,i//im.width) for i,(r,g,b) in enumerate(im.getdata()) if r>230 and g<30 and b<30]
 if not p:return {'count':0,'size':im.size}
 n=len(p);mx=sum(x for x,y in p)/n;my=sum(y for x,y in p)/n;xx=sum((x-mx)**2 for x,y in p)/n;yy=sum((y-my)**2 for x,y in p)/n;xy=sum((x-mx)*(y-my) for x,y in p)/n;disc=math.sqrt((xx-yy)**2+4*xy**2)
 return {'count':n,'center':[mx,my],'size':im.size,'bbox':[min(x for x,y in p),min(y for x,y in p),max(x for x,y in p),max(y for x,y in p)],'covarianceAspect':math.sqrt((xx+yy+disc)/(xx+yy-disc))}
async def main():
 async with async_playwright() as pw:
  b=await launch(pw);c=await b.new_context(viewport={'width':1440,'height':1050},accept_downloads=True);p=await c.new_page();p.set_default_timeout(45000);p.on('pageerror',lambda e:R['errors'].append(str(e)))
  async def ready(sel='.preview-stage .bag-canvas'):
   await p.wait_for_function('document.querySelector('+json.dumps(sel)+")?.dataset.ready==='true'")
  async def draft():return await p.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  async def inputval(label,value):
   q=p.get_by_label(label,exact=True);await q.fill(str(value));await q.press('Enter');await ready()
  async def export(name):
   await p.wait_for_function("!document.querySelector('.studio-download').disabled")
   async with p.expect_download() as ev:await p.get_by_role('button',name='Download design preview',exact=True).click()
   dest=OUT/(name+'.png');await (await ev.value).save_as(dest);assert Image.open(dest).size==(1600,1820);return analyze(dest)
  async def drag_actual(sel,dx=20,dy=4,touch=False):
   canvas=p.locator(sel);await canvas.scroll_into_view_if_needed();await ready(sel);dest=OUT/'last-drag-source.png';await canvas.screenshot(path=str(dest));a=analyze(dest);assert a['count']>30,a;bb=await canvas.bounding_box();x=bb['x']+a['center'][0]/a['size'][0]*bb['width'];y=bb['y']+a['center'][1]/a['size'][1]*bb['height']
   if touch:
    cd=await c.new_cdp_session(p);await cd.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y,'id':1}]})
    for i in range(1,7):await cd.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+dx*i/6,'y':y+dy*i/6,'id':1}]})
    await cd.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});await cd.detach()
   else:
    await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(x+dx/2,y+dy/2,steps=3);await p.wait_for_timeout(850);await p.mouse.move(x+dx,y+dy,steps=3);await p.mouse.up()
   await ready(sel)
  await p.goto(BASE+'/design',wait_until='networkidle');await p.locator('.view-mode-tabs').get_by_text('Photo + artwork',exact=True).click();await ready();await p.get_by_role('tab',name='02 Your design').click();await p.get_by_label('Brand name or message',exact=True).fill('');await p.get_by_role('group',name='Select artwork layer').get_by_role('button',name='Logo',exact=True).click()
  im=Image.new('RGB',(128,128),'red');buf=io.BytesIO();im.save(buf,format='PNG');await p.locator('input[type=file]').set_input_files({'name':'aspect-square.png','mimeType':'image/png','buffer':buf.getvalue()});await p.get_by_text('aspect-square.png',exact=True).wait_for();await p.get_by_text('Position & rotation',exact=True).click();await p.get_by_role('slider').focus();await p.keyboard.press('Home');await ready()
  for family in ['Handle','Box','D-Cut','T-Shirt','String']:
   await p.get_by_role('button',name=family,exact=True).click();await ready()
   for label,x in [('center',50),('right',76)]:
    await inputval('Horizontal position',x);await inputval('Vertical position',56);a=await export(family.lower()+'-'+label);R['cases'].append({'family':family,'position':label,**a});print(R['cases'][-1],flush=True);assert a['count']>100,a
    if label=='center':assert a['covarianceAspect']<1.12,('Logo distorted',family,a)
  await p.get_by_role('button',name='Handle',exact=True).click();await inputval('Horizontal position',50);await inputval('Vertical position',56)
  await inputval('Artwork rotation',25);a=await export('handle-rotated');assert a['covarianceAspect']<1.12,a;R['checks'].append('Rotated square keeps original aspect ratio')
  before=await draft();await drag_actual('.preview-stage .bag-canvas');after=await draft();assert after['x']>before['x'];await p.get_by_role('button',name='Undo change',exact=True).click();await ready();assert (await draft())['x']==before['x'];R['checks'].append('Photo projected pixels drag and paused gesture Undo restores original')
  await p.get_by_role('button',name='Enlarge preview',exact=True).click();await ready('[role=dialog] .bag-canvas');before=await draft();await drag_actual('[role=dialog] .bag-canvas',dx=20);after=await draft();assert after['x']>before['x'];await p.keyboard.press('Escape');await p.get_by_role('dialog').wait_for(state='hidden');await p.get_by_role('button',name='Undo change',exact=True).click();await ready();assert (await draft())['x']==before['x'];R['checks'].append('Fullscreen actual-pixel logo drag and Undo')
  await p.set_viewport_size({'width':390,'height':844});before=await draft();await drag_actual('.preview-stage .bag-canvas',dx=12,dy=0,touch=True);after=await draft();assert after['x']>before['x'];assert not await p.evaluate('document.documentElement.scrollWidth>innerWidth');await p.screenshot(path=str(OUT/'mobile.png'),full_page=True);R['checks'].append('390 px mobile touch targets preserve compact layout')
  assert not R['errors'],R['errors'];await b.close()
try:asyncio.run(main());R['status']='passed'
except Exception as e:R['status']='failed';R['failure']=str(e);R['traceback']=traceback.format_exc();raise
finally:(OUT/'report.json').write_text(json.dumps(R,indent=2));print(json.dumps(R,indent=2))
