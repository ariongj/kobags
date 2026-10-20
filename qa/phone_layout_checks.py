"""Phone layout, photo framing, navigation and readable-text checks on localhost."""
import asyncio,json,traceback
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import launch,BASE
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'evidence/phone-experience-20261020'
report={'layouts':[],'checks':[],'errors':[]}
async def main():
 OUT.mkdir(exist_ok=True)
 async with async_playwright() as p:
  b=await launch(p);c=await b.new_context(viewport={'width':393,'height':750},is_mobile=True,has_touch=True,reduced_motion='reduce')
  page=await c.new_page();page.set_default_timeout(45000);page.on('pageerror',lambda e:report['errors'].append(str(e)))
  for lang in ['en','sq']:
   for width,height in [(320,568),(393,650),(393,750),(430,932),(768,1024),(1440,900)]:
    await page.set_viewport_size({'width':width,'height':height})
    await page.goto(BASE+('/sq' if lang=='sq' else '/'),wait_until='networkidle')
    assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),(lang,width)
    assert await page.locator('h1').count()==1
    assert await page.locator('.industrial-hero-photo').evaluate('(e)=>e.complete&&e.naturalWidth>0')
    assert await page.locator('.home-production-film').evaluate('(e)=>getComputedStyle(e).transform')=='none'
    if width<=800:
     film=await page.locator('.home-production-film').bounding_box();steps=await page.locator('.home-production-details').bounding_box()
     assert film['y']+film['height']<=steps['y']+1
     buttons=await page.locator('.industrial-hero .actions a').evaluate_all('(es)=>es.map(e=>({h:e.getBoundingClientRect().height,w:e.getBoundingClientRect().width,sw:e.scrollWidth,cw:e.clientWidth}))')
     assert all(e['h']>=44 and e['sw']<=e['cw']+1 for e in buttons),buttons
    if width==393 and height==750:
     await page.screenshot(path=str(OUT/f'home-{lang}.jpg'),quality=88)
     await page.locator('.home-production').scroll_into_view_if_needed();await page.screenshot(path=str(OUT/f'production-{lang}.jpg'),quality=88)
    report['layouts'].append({'route':lang+' home','width':width,'height':height,'overflow':False})
  report['checks'].append('12 EN/SQ homepage layouts; compact actions; manufacturing film before the steps')
  await page.set_viewport_size({'width':393,'height':750});await page.goto(BASE+'/design',wait_until='networkidle')
  await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
  await page.get_by_role('button',name='Switch to photo view',exact=True).tap()
  await page.get_by_role('tab',name='02 Your design',exact=True).tap()
  add=page.get_by_role('group',name='Add artwork',exact=True)
  positions=await add.get_by_role('button').evaluate_all('(es)=>es.map(e=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,hit:e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))}})')
  assert all(e['top']>=56 and e['bottom']<750 and e['hit'] for e in positions),positions
  report['checks'].append('Opening Your design reveals all three add actions without extra scrolling')
  for family in ['Box','D-Cut','Handle','String','T-Shirt']:
   await page.evaluate("window.scrollTo({top:0,behavior:'instant'})")
   await page.get_by_role('button',name=family,exact=True).tap()
   canvas=page.locator('.preview-stage > canvas[data-ready=true]');await canvas.wait_for()
   await page.wait_for_function('(family)=>document.querySelector(".preview-stage >canvas")?.getAttribute("aria-label")?.startsWith(family)',arg=family)
   metrics=await canvas.evaluate('''c=>{const r=c.getBoundingClientRect(),pixels=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let top=c.height,bottom=0;for(let y=0;y<c.height;y+=4)for(let x=0;x<c.width;x+=4)if(pixels[(y*c.width+x)*4+3]>128){top=Math.min(top,y);bottom=Math.max(bottom,y)}return {bagHeight:(bottom-top)*Math.min(r.width,r.height)/c.height,canvasHeight:r.height,stageWidth:c.parentElement.getBoundingClientRect().width}}''')
   assert metrics['bagHeight']>=200 and metrics['stageWidth']>=370,metrics
   await page.evaluate('window.scrollTo({top:180,behavior:"instant"})')
   await page.screenshot(path=str(OUT/f'photo-{family.lower()}.jpg'),quality=88)
   report['layouts'].append({'family':family,**metrics})
  report['checks'].append('All five real-photo bag silhouettes exceed 200px at 393×750; full-width stage')
  await page.get_by_role('button',name='Expand editing controls',exact=True).tap()
  assert not await page.locator('.preview-stage').is_visible()
  assert await page.locator('.artwork-editor').evaluate('(e)=>e.scrollHeight<=e.clientHeight+1')
  await page.get_by_role('button',name='Show bag preview',exact=True).tap()
  assert await page.locator('.preview-stage').is_visible()
  await page.get_by_role('button',name='Enlarge preview',exact=True).tap()
  dialog=page.get_by_role('dialog');await dialog.wait_for();await page.keyboard.press('Escape');await dialog.wait_for(state='hidden')
  assert await page.get_by_role('button',name='Enlarge preview',exact=True).evaluate('(e)=>document.activeElement===e')
  report['checks'].append('Focus mode, preview restoration and fullscreen focus return')
  # Safari-like short layout viewport: normal page scrolling keeps controls reachable.
  await page.set_viewport_size({'width':393,'height':420})
  assert await page.locator('.preview-stage').evaluate('(e)=>getComputedStyle(e).position')=='relative'
  await add.get_by_role('button',name='QR',exact=True).tap();await dialog.get_by_label('Website or page link').fill('example.com/phone');await dialog.get_by_role('button',name='Add QR code',exact=True).tap();await dialog.wait_for(state='hidden')
  report['checks'].append('Short viewport QR entry remains usable; pinned canvas releases space')
  await add.get_by_role('button',name='Text',exact=True).tap()
  await add.get_by_role('button',name='QR',exact=True).tap();await dialog.get_by_label('Website or page link').fill('example.com/last');await dialog.get_by_role('button',name='Add QR code',exact=True).tap();await dialog.wait_for(state='hidden')
  assert await add.get_by_role('button',name='QR',exact=True).is_disabled()
  assert await page.get_by_label('Selected element',exact=True).evaluate('(e)=>document.activeElement===e')
  report['checks'].append('Fourth artwork addition returns focus to the mobile selector when Add becomes disabled')
  assert not report['errors'],report['errors']
  await b.close()
try:
 asyncio.run(main());report['status']='passed'
except Exception as e:
 report.update(status='failed',failure=str(e),traceback=traceback.format_exc());raise
finally:
 OUT.mkdir(exist_ok=True);(OUT/'layouts.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
