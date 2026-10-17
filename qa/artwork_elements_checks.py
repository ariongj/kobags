"""Local-only multi-element, cleanup, QR decoding and mobile buyer acceptance."""
import asyncio, base64, io, json, sys, uuid
from pathlib import Path
from PIL import Image, ImageDraw
from playwright.async_api import async_playwright
from browser_support import BASE, launch
sys.path.insert(0,'/tmp/kobags-qr-qa')
import zxingcpp
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'evidence/artwork-elements'
async def main():
 OUT.mkdir(exist_ok=True);report={'checks':[],'errors':[]}
 async with async_playwright() as p:
  browser=await launch(p);ctx=await browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,reduced_motion='reduce')
  page=await ctx.new_page();page.set_default_timeout(30000);page.on('pageerror',lambda e:report['errors'].append(str(e)))
  async def draft():return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  async def ready():await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
  async def top():await page.evaluate("document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'})")
  async def shot(name):await top();await page.screenshot(path=str(OUT/(name+'.jpg')),full_page=True,type='jpeg',quality=88)
  async def select(kind):await page.get_by_role('group',name='Your elements',exact=True).get_by_role('button',name=kind).first.tap()
  async def image_pixels(src):
   return await page.evaluate('''async src=>{const i=new Image();i.src=src;await i.decode();const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const x=c.getContext('2d');x.drawImage(i,0,0);return {corner:[...x.getImageData(0,0,1,1).data],center:[...x.getImageData(Math.floor(i.width/2),Math.floor(i.height/2),1,1).data]}}''',src)
  add=page.get_by_role('group',name='Add artwork',exact=True)
  await page.goto(BASE+'/design',wait_until='networkidle');await ready()
  await page.get_by_role('tab',name='02 Your design',exact=True).tap()
  await page.get_by_label('Brand name or message').fill('KOBAGS')
  im=Image.new('RGBA',(300,300),'white');x=ImageDraw.Draw(im);x.ellipse((45,45,255,255),fill='#123442');x.ellipse((110,110,190,190),fill='white');buf=io.BytesIO();im.save(buf,format='PNG')
  await add.get_by_role('button',name='Logo',exact=True).tap()
  await page.locator('input[type=file]').set_input_files({'name':'brand-mark.png','mimeType':'image/png','buffer':buf.getvalue()})
  await page.get_by_role('button',name='Restore original',exact=True).wait_for();await ready()
  d=await draft();pix=await image_pixels(d['logo']);assert pix['corner'][3]==0 and pix['center'][3]==255,pix
  cleaned=d['logo'];assert d['text']=='KOBAGS'
  await page.get_by_role('button',name='Restore original',exact=True).tap();assert (await image_pixels((await draft())['logo']))['corner'][3]==255
  await page.get_by_role('button',name='Undo change',exact=True).tap();assert (await draft())['logo']==cleaned
  report['checks'].append('Automatic logo cleanup, enclosed white details, original restore and atomic undo')
  await add.get_by_role('button',name='QR',exact=True).tap();dialog=page.get_by_role('dialog')
  await dialog.get_by_label('Website or page link').fill('javascript:alert(1)');await dialog.get_by_role('button',name='Add QR code',exact=True).tap();assert await dialog.get_by_role('alert').is_visible()
  await dialog.get_by_label('Website or page link').fill('example.com/kobags');await dialog.get_by_role('button',name='Add QR code',exact=True).tap();await dialog.wait_for(state='hidden');await ready()
  d=await draft();qr=next(e for e in d['elements'] if e['kind']=='qr');qid=qr['id']
  raw=base64.b64decode(qr['logo'].split(',')[1]);(OUT/'qr-code.png').write_bytes(raw)
  decoded=zxingcpp.read_barcodes(Image.open(io.BytesIO(raw)));assert decoded and decoded[0].text=='https://example.com/kobags'
  await page.get_by_label('Website or page link').fill('https://example.com/changed');await page.get_by_role('button',name='Update QR code',exact=True).tap();await ready()
  await page.get_by_role('button',name='Undo change',exact=True).tap();assert await page.get_by_label('Website or page link').input_value()=='https://example.com/kobags'
  await page.get_by_role('button',name='Place right',exact=True).tap();before=await draft();assert next(e for e in before['elements'] if e['id']==qid)['x']==67
  await page.get_by_role('button',name='Front',exact=True).tap();await top();await ready()
  host=page.locator('.preview-stage .studio-3d-host');canvas=host.locator('canvas');cdp=await ctx.new_cdp_session(page)
  await page.wait_for_function("id=>JSON.parse(document.querySelector('.preview-stage .studio-3d-host').dataset.artworkTargets).some(t=>t.layer=== 'element:'+id&&t.visible)",arg=qid)
  targets=json.loads(await host.get_attribute('data-artwork-targets'));target=next(t for t in targets if t['layer']=='element:'+qid and t['side']=='front');box=await canvas.bounding_box();px=box['x']+target['x']*box['width'];py=box['y']+target['y']*box['height'];angle=float(await host.get_attribute('data-angle'))
  await cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':px,'y':py}]})
  for step in range(1,6):await cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':px-2*step,'y':py-step}]})
  await cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});await ready();moved=await draft()
  assert next(e for e in moved['elements'] if e['id']==qid)['x']!=qr['x']
  assert next(e for e in moved['elements'] if e['id']==qid)['x'] != next(e for e in before['elements'] if e['id']==qid)['x']
  assert moved['x']==before['x'] and moved['textPlacement']==before['textPlacement']
  assert abs(float(await host.get_attribute('data-angle'))-angle)<.01
  await add.get_by_role('button',name='Text',exact=True).tap();await page.get_by_label('Brand name or message').fill('');assert await page.get_by_role('group',name='Your elements').get_by_role('button').count()==4;await page.get_by_label('Brand name or message').fill('MADE TO REUSE');await page.get_by_role('button',name='Place left',exact=True).tap();await ready()
  assert await add.get_by_role('button',name='Logo',exact=True).is_disabled()
  assert await page.get_by_role('group',name='Your elements',exact=True).get_by_role('button').count()==4
  before=await draft();await page.get_by_role('button',name='Copy design to back',exact=True).tap();await ready();copied=await draft();assert len(copied['elements'])==4
  assert len({e['id'] for e in copied['elements']})==4
  assert copied['backLogo']==copied['logo'] and copied['backText']==copied['text']
  await page.get_by_role('button',name='Back',exact=True).tap();await select('Select Text');await page.get_by_label('Brand name or message').fill('BACK BRAND');await ready();assert (await draft())['text']=='KOBAGS'
  report['checks'].append('Four elements per face, QR URL validation and decoded contents, independent touch drag, quick alignment and copy/back editing')
  await page.get_by_role('button',name='Front',exact=True).tap();await select('Select QR');await ready();await shot('mobile-qr-editor')
  await page.get_by_role('button',name='Toggle artwork guides',exact=True).tap()
  await page.locator('.studio-resources > summary').tap()
  async with page.expect_download() as pending:await page.get_by_role('button',name='Download both sides + specifications',exact=True).tap()
  await (await pending.value).save_as(str(OUT/'design-sheet.png'));sheet=Image.open(OUT/'design-sheet.png');assert sheet.size==(2000,1400)
  codes=zxingcpp.read_barcodes(sheet);report['sheetQrCodes']=[c.text for c in codes]
  assert 'https://example.com/kobags' in report['sheetQrCodes'],report
  await page.get_by_role('button',name='Photo + artwork',exact=True).tap();await page.wait_for_function("document.querySelector('.preview-stage .bag-canvas')?.dataset.ready==='true'")
  assert len(json.loads(await page.locator('.preview-stage .bag-canvas').get_attribute('data-artwork-targets')))==4
  await shot('mobile-photo-editor')
  for width,height in [(320,568),(390,844),(768,1024),(1440,1000)]:
   await page.set_viewport_size({'width':width,'height':height});await page.wait_for_timeout(100)
   assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),width
  await shot('desktop-elements')
  await page.get_by_role('button',name='3D view',exact=True).click();await ready()
  # A second independent logo can be added without replacing the first.
  await page.get_by_role('group',name='Your elements').get_by_role('button',name='Select Text').last.click()
  await page.get_by_role('button',name='Remove selected',exact=True).click()
  original_logo=(await draft())['logo']
  await add.get_by_role('button',name='Logo',exact=True).click()
  await page.locator('input[type=file]').set_input_files({'name':'partner-mark.png','mimeType':'image/png','buffer':buf.getvalue()})
  await page.locator('.artwork-file strong').filter(has_text='partner-mark.png').wait_for();await ready()
  assert (await draft())['logo']==original_logo
  assert any(e['kind']=='logo' and e['name']=='partner-mark.png' for e in (await draft())['elements'])
  await page.get_by_role('button',name='Undo change',exact=True).click();await page.get_by_role('button',name='Undo change',exact=True).click()
  assert any(e['text']=='MADE TO REUSE' for e in (await draft())['elements'])
  report['checks'].append('QR edit/undo synchronizes the link field; empty text stays editable; second logo upload and atomic removal undo')
  saved=await draft();await page.reload(wait_until='networkidle');await ready();assert (await draft())['elements']==saved['elements']
  await page.get_by_role('link',name='Get a quote for this bag',exact=True).click();await page.wait_for_url('**/quote')
  assert (await draft())['elements']==saved['elements']
  payload={**saved,'company':'Local artwork QA','contact':'QA Buyer','city':'Prishtina','email':'artwork@example.com','consent':True,'key':str(uuid.uuid4())}
  await ctx.request.get(BASE+'/api/inquiries')
  r=await ctx.request.post(BASE+'/api/inquiries',data={'kind':'quote','design':payload,'language':'en'},headers={'Origin':BASE})
  if r.status==409:r=await ctx.request.post(BASE+'/api/inquiries',data={'kind':'quote','design':payload,'language':'en'},headers={'Origin':BASE})
  assert r.status in (200,201),(r.status,await r.text());report['localInquiry']=(await r.json())['id'];report['submittedElements']=payload['elements']
  report['checks'].append('Both-face export QR decodes, four photo elements, phone/tablet/desktop reflow, reload and local live RFQ acceptance')
  await page.goto(BASE+'/sq/design',wait_until='networkidle');await page.set_viewport_size({'width':390,'height':844});await page.get_by_role('tab').nth(1).tap();await shot('albanian-elements');assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
  await page.add_script_tag(path=str(ROOT/'node_modules/axe-core/axe.min.js'))
  violations=await page.evaluate("async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))")
  report['accessibility']=violations;(OUT/'checks.json').write_text(json.dumps(report,indent=2));assert not violations,violations
  assert not report['errors'],report['errors'];report['status']='passed'
  (OUT/'checks.json').write_text(json.dumps(report,indent=2));await browser.close();print('PASS multi-element mobile artwork, decoded QR exports and local request',flush=True)
asyncio.run(main())
