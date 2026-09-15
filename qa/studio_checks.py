"""Focused local checks for the polished bag studio and its saved artwork contract."""
import asyncio, json, uuid, base64
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE, launch
ROOT = Path(__file__).resolve().parents[1]
async def main():
 async with async_playwright() as pw:
  browser = await launch(pw)
  context = await browser.new_context(viewport={'width':1440,'height':1100}, extra_http_headers={'oai-authenticated-user-id':'studio-'+str(uuid.uuid4())})
  page=await context.new_page();page.set_default_timeout(30000);errors=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  async def ready():
   await page.wait_for_function("document.querySelector('.preview-stage canvas')?.dataset.ready === 'true'")
  async def draft():return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  await page.goto(BASE+'/design',wait_until='networkidle');await ready()
  assert await page.locator('.bag-picker canvas[data-ready=true]').count()==5
  shapes={}
  for name in ['D-Cut','Handle','Box','T-Shirt','String']:
   await page.get_by_role('button',name=name,exact=True).click();await ready()
   shapes[name]=await page.locator('.preview-stage canvas').evaluate('(c)=>c.toDataURL().length')
  assert len(set(shapes.values()))==5
  await page.get_by_role('button',name='Box',exact=True).click()
  await page.get_by_role('tab',name='02 Your design').click()
  await page.get_by_label('Or type your brand name').fill('ATELIER\nNOVA')
  await page.locator('#artwork-font').click();await page.get_by_role('option',name='Editorial serif').click()
  await page.get_by_role('button',name='Align text left').click()
  await page.get_by_label('Horizontal position',exact=True).fill('62')
  await page.get_by_label('Vertical position',exact=True).fill('60')
  await page.get_by_label('Artwork rotation',exact=True).fill('-12')
  await page.get_by_label('Artwork rotation',exact=True).press('Enter');await ready()
  d=await draft();assert (d['x'],d['y'],d['rotation'],d['textFont'],d['textAlign'])==(62,60,-12,'serif','left')
  # Empty and partial numeric input may be typed naturally; blur clamps bounds.
  field=page.get_by_label('Horizontal position',exact=True)
  await field.fill('');await field.press_sequentially('60');await field.press('Enter');assert (await draft())['x']==60
  await page.get_by_role('button',name='Center artwork',exact=True).click();await ready()
  canvas=page.locator('.preview-stage canvas');box=await canvas.bounding_box()
  x=box['x']+box['width']*.52;y=box['y']+box['height']*.56
  await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+box['width']*.05,y+box['height']*.03,steps=6);await page.mouse.up();await ready()
  d=await draft();assert abs(d['x']-55)<.25 and abs(d['y']-59)<.25, (d['x'],d['y'])
  await page.get_by_role('button',name='Center artwork',exact=True).click()
  await page.get_by_role('tab',name='Back',exact=True).click()
  await page.get_by_label('Or type your brand name').fill('MADE TO CARRY')
  await page.locator('#artwork-font').click();await page.get_by_role('option',name='Monospace',exact=True).click()
  await page.locator('#ink').fill('#d8c99f')
  # A large, simple raster logo stays sharp rather than being reduced to 320px.
  raw=await page.evaluate("""()=>{let c=document.createElement('canvas');c.width=1400;c.height=700;let x=c.getContext('2d');x.fillStyle='#193b67';x.fillRect(60,60,1280,580);x.fillStyle='white';x.font='bold 160px Arial';x.fillText('NOVA',450,420);return c.toDataURL('image/png').split(',')[1]}""")
  await page.locator('input[type=file]').set_input_files({'name':'nova-back.png','mimeType':'image/png','buffer':base64.b64decode(raw)})
  await page.get_by_text('nova-back.png',exact=True).wait_for();await ready()
  d=await draft();assert d['backLogoName']=='nova-back.png' and d['text']=='ATELIER\nNOVA' and d['textFont']=='serif'
  upload_width=await page.evaluate("""async()=>{const i=new Image();i.src=JSON.parse(localStorage.getItem('kobags-design-v1')).backLogo;await i.decode();return i.width}""")
  assert upload_width==1024
  await page.get_by_label('Or type your brand name').fill('MADE TO CARRY')
  d=await draft();assert not d['backLogo'] and not d['backLogoName'] and d['backTextFont']=='mono' and d['backInk']=='#d8c99f'
  await page.get_by_role('tab',name='Front',exact=True).click();await ready()
  assert await page.locator('#artwork-font').inner_text()=='Editorial serif'
  await page.get_by_role('button',name='Enlarge preview',exact=True).click()
  await page.get_by_role('dialog').locator('canvas[data-ready=true]').wait_for()
  await page.keyboard.press('Escape')
  await page.wait_for_function("document.activeElement?.getAttribute('aria-label') === 'Enlarge preview'")
  # Guides are an editor overlay, never included in a downloadable concept.
  async with page.expect_download() as out:await page.get_by_role('button',name='Download design preview',exact=True).click()
  first=ROOT/'evidence/studio-v4-download.png';await (await out.value).save_as(str(first))
  await page.get_by_role('button',name='Toggle artwork guides',exact=True).click();await ready()
  async with page.expect_download() as out:await page.get_by_role('button',name='Download design preview',exact=True).click()
  second=await (await out.value).path();assert first.read_bytes()==Path(second).read_bytes()
  assert int.from_bytes(first.read_bytes()[16:20],'big')==1600 and int.from_bytes(first.read_bytes()[20:24],'big')==1820
  await page.get_by_role('button',name='Toggle artwork guides',exact=True).click();await ready()
  # Rapid drafts only present the latest completed render.
  for text in ['N','NO','NOV','NOVA']:await page.get_by_label('Or type your brand name').fill(text)
  await page.get_by_role('tab',name='01 The bag').click()
  for color in ['Navy blue','Natural','Forest green']:await page.get_by_role('button',name=color,exact=True).click()
  await ready();assert (await draft())['text']=='NOVA'
  await page.evaluate('window.scrollTo(0,0)')
  await page.screenshot(path=str(ROOT/'evidence/studio-v4-bag.png'),full_page=True)
  await page.get_by_role('tab',name='02 Your design').click();await ready()
  await page.evaluate('window.scrollTo(0,0)')
  await page.screenshot(path=str(ROOT/'evidence/studio-v4-editor.png'),full_page=True)
  widths=[]
  for width in [1440,1024,800,390,320]:
   await page.set_viewport_size({'width':width,'height':900});await page.wait_for_timeout(120)
   assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth'),f'Overflow {width}'
   widths.append(width)
  await page.set_viewport_size({'width':390,'height':844})
  await page.evaluate('window.scrollTo(0,0)')
  await page.screenshot(path=str(ROOT/'evidence/studio-v4-mobile.png'),full_page=True)
  await page.get_by_role('link',name='Get a quote for this bag',exact=True).click();await page.wait_for_url('**/quote')
  saved=await draft();assert saved['previewVersion']=='v4' and saved['backText']=='MADE TO CARRY'
  saved.update(company='Nova — fictional studio QA',contact='Demo Buyer',email='studio@example.com',city='Prishtina',consent=True,key=str(uuid.uuid4()))
  response=await context.request.post(BASE+'/api/demo',data={'type':'submit','design':saved});assert response.status==200,await response.text()
  data=await response.json();snapshot=data['state']['requests'][0]['snapshot']
  for field in ['previewVersion','textFont','textAlign','backText','backTextFont','backInk']:
   assert snapshot[field]==saved[field],field
  invalid={**saved,'key':str(uuid.uuid4()),'textFont':'untrusted'}
  assert (await context.request.post(BASE+'/api/demo',data={'type':'submit','design':invalid})).status==400
  assert not errors,errors
  (ROOT/'evidence/studio-v4-checks.json').write_text(json.dumps({'status':'passed','widths':widths,'mockups':list(shapes),'uploadPreviewWidth':upload_width,'download':[1600,1820],'checks':['five distinct high-resolution model previews','front/back typeface, color, alignment and filename independence','partial numeric input and negative rotation','offset-preserving pointer drag','1024px upload when payload budget allows','clean identical exports with guides on or off','fullscreen preview and rapid draft changes','responsive layout and quote navigation','server persistence of optional v4 artwork fields; invalid font rejected'],'browserErrors':errors},indent=2))
  print('PASS polished studio');await browser.close()
asyncio.run(main())
