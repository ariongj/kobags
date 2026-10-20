"""Development-only studio availability and editing smoke test; localhost only."""
import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE,launch
ROOT=Path(__file__).resolve().parents[1]
async def main():
 checks=[];errors=[]
 async with async_playwright() as p:
  b=await launch(p);c=await b.new_context(viewport={'width':393,'height':750},is_mobile=True,has_touch=True,reduced_motion='reduce')
  page=await c.new_page();page.set_default_timeout(90000);page.on('pageerror',lambda e:errors.append(str(e)))
  for prefix in ['','/sq']:
   r=await page.goto(BASE+prefix+'/design',wait_until='networkidle');assert r.status==200 and page.url.endswith('/design')
   await page.locator('.studio-3d[data-status=ready]').wait_for()
   assert await page.locator('.bag-pick').count()==5
   assert (await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))"))['color']=='Natural'
   assert await page.locator('.nav a[href$="/design"]').count()==1
   checks.append((prefix or 'EN')+': local studio and navigation available, five bags, 3D renderer ready, Natural default')
  await page.goto(BASE+'/design',wait_until='networkidle')
  await page.locator('.studio-3d[data-status=ready]').wait_for()
  await page.get_by_role('tab',name='02 Your design',exact=True).tap()
  add=page.get_by_role('group',name='Add artwork',exact=True)
  await add.get_by_role('button',name='QR',exact=True).tap()
  dialog=page.get_by_role('dialog');await dialog.get_by_label('Website or page link').fill('https://example.com/local-scan-test')
  await dialog.get_by_role('button',name='Add QR code',exact=True).tap();await dialog.wait_for(state='hidden')
  await page.locator('.studio-3d[data-status=ready]').wait_for()
  draft=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  qr=next(e for e in draft['elements'] if e['kind']=='qr')
  await page.get_by_label('Selected element',exact=True).select_option('element:'+qr['id'])
  await page.get_by_role('button',name='Make selected element larger',exact=True).tap()
  after=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  assert next(e for e in after['elements'] if e['id']==qr['id'])['scale']==qr['scale']+2
  checks.append('Local mobile QR creation, layer selection and resizing preserved')
  await page.goto(BASE+'/design?model=coffee-test',wait_until='networkidle')
  await page.locator('.imported-scan .scan-viewer[data-status=ready]').wait_for()
  checks.append('Uploaded coffee scan test route remains available locally')
  assert not errors,errors
  await b.close()
 out=ROOT/'evidence/studio-local-only-20261020';out.mkdir(exist_ok=True)
 (out/'development-report.json').write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors},indent=2)+'\n')
 print(json.dumps(checks,indent=2),flush=True)
asyncio.run(main())
