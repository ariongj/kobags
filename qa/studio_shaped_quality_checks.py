"""Repeatable top/opening, fabric-color and narrow-screen visual QA. Local only."""
import asyncio,sys,os,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'qa'))
from browser_support import BASE,launch
from playwright.async_api import async_playwright
FAMILIES=os.getenv('KOBAGS_QA_FAMILIES','T-Shirt,String').split(',')
async def run():
 async with async_playwright() as p:
  b=await launch(p);c=await b.new_context(viewport={'width':1440,'height':1040},reduced_motion='reduce');page=await c.new_page();errors=[];checks=[];page.on('pageerror',lambda e:errors.append(str(e)))
  await page.goto(BASE+'/design',wait_until='networkidle');await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
  for family in FAMILIES:
   await page.get_by_role('button',name=family,exact=True).click();await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
   for color in ['Natural','Forest green']:
    await page.get_by_role('button',name=color,exact=True).click();await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
    for name,up,right in [('front',0,0),('angle',2,2),('interior',6,3),('back',2,0)]:
     await page.get_by_role('button',name='Back' if name=='back' else 'Front',exact=True).click();canvas=page.locator('.preview-stage .studio-3d-host canvas');await canvas.focus()
     for _ in range(up):await page.keyboard.press('ArrowUp')
     for _ in range(right):await page.keyboard.press('ArrowRight')
     await page.wait_for_timeout(700);await canvas.evaluate('(c)=>c.blur()')
     await page.locator('.preview-stage').screenshot(path=str(ROOT/f'evidence/visual-final-{family.lower()}-{color.split()[0].lower()}-{name}.png'))
     checks.append(f'{family} / {color} / {name}: rendered without fallback')
  for width in [320,390]:
   await page.set_viewport_size({'width':width,'height':844})
   for family in FAMILIES:
    await page.get_by_role('button',name=family,exact=True).click();await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
    await page.get_by_role('button',name='White',exact=True).click();await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
    await page.get_by_role('button',name='Rotate bag right',exact=True).click();await page.wait_for_timeout(400)
    assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
    await page.locator('.preview-stage').screenshot(path=str(ROOT/f'evidence/visual-mobile-{family.lower()}-{width}.png'))
    checks.append(f'{family} / White / {width}px: rendered, controls reachable, no horizontal overflow')
  assert not errors,errors
  (ROOT/'evidence/studio-shaped-quality-checks.json').write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors,'scope':'Compiled local Worker, screenshot comparison and responsive rendering; no claim of scan accuracy'},indent=2))
  await b.close();print('PASS',len(checks),'visual rendering and responsive checks')
asyncio.run(run())
