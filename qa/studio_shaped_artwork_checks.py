"""Raycast/drag regression on the rebuilt soft bag surfaces; local browser only."""
import asyncio,base64,json,os
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE,launch
ROOT=Path(__file__).resolve().parents[1]
async def main():
 checks=[];errors=[]
 async with async_playwright() as p:
  b=await launch(p);ctx=await b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');page=await ctx.new_page();page.set_default_timeout(45000)
  page.on('pageerror',lambda e:errors.append(str(e)))
  host=page.locator('.preview-stage .studio-3d-host');canvas=host.locator('canvas')
  async def ready():await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
  async def draft():return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  def placement(d,side,layer):
   if layer=='text' and d.get('layeredArtwork'):
    item=d.get('backTextPlacement' if side=='back' else 'textPlacement')
    if item:return item['x'],item['y']
   return (d['backX'],d['backY']) if side=='back' else (d['x'],d['y'])
  await page.goto(BASE+'/design',wait_until='networkidle');await ready()
  raw=await page.evaluate("""()=>{const c=document.createElement('canvas');c.width=160;c.height=100;const x=c.getContext('2d');x.fillStyle='#193b67';x.fillRect(5,5,150,90);x.fillStyle='#fff';x.font='bold 36px sans-serif';x.fillText('QA',50,65);return c.toDataURL().split(',')[1]}""")
  for family in os.getenv('KOBAGS_QA_FAMILIES','T-Shirt,String').split(','):
   print('Testing artwork:',family,flush=True)
   await page.get_by_role('button',name=family,exact=True).click();await ready()
   await page.get_by_role('tab',name='02 Your design',exact=True).click()
   await page.get_by_role('group',name='Select artwork layer').get_by_role('button',name='Text',exact=True).click()
   await page.get_by_label('Brand name or message',exact=True).fill('SOFT BAG');await ready()
   await page.locator('input[type=file]').set_input_files({'name':'shape-qa.png','mimeType':'image/png','buffer':base64.b64decode(raw)})
   await page.get_by_text('shape-qa.png',exact=True).wait_for();await ready()
   await page.get_by_role('button',name='Copy design to back',exact=True).click()
   for side in ['front','back']:
    await page.get_by_role('button',name='Front' if side=='front' else 'Back',exact=True).click();await ready()
    for layer in ['logo','text']:
     await page.get_by_role('group',name='Select artwork layer').get_by_role('button',name=layer.title(),exact=True).click()
     await page.wait_for_timeout(300);await canvas.scroll_into_view_if_needed()
     target=await host.evaluate("(e,args)=>JSON.parse(e.dataset.artworkTargets).find(p=>p.side===args[0]&&p.layer===args[1])",[side,layer]);assert target,(family,side,layer)
     box=await canvas.bounding_box();x=box['x']+target['x']*box['width'];y=box['y']+target['y']*box['height'];before=placement(await draft(),side,layer)
     await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+24,y+12,steps=5)
     assert await host.get_attribute('data-dragging')=='true',(family,side,layer,'raycast missed')
     await page.mouse.up();await page.wait_for_timeout(200)
     after=placement(await draft(),side,layer);assert after!=before,(family,side,layer,before,after)
     await page.get_by_role('button',name='Undo change',exact=True).click();await page.wait_for_timeout(200)
     assert placement(await draft(),side,layer)==before
     checks.append(f'{family} / {side} / {layer}: select, drag on 3D surface and undo')
   await page.get_by_role('button',name='Front',exact=True).click()
  assert not errors,errors
  await b.close()
 (ROOT/'evidence/studio-shaped-artwork-checks.json').write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors},indent=2));print('PASS',len(checks),'shaped artwork checks')
asyncio.run(main())
