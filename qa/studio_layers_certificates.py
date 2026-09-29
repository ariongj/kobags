"""Local acceptance of independent artwork layers and original certificate evidence."""
import asyncio, base64, hashlib, json, uuid
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE, launch
ROOT = Path(__file__).resolve().parents[1]
async def main():
 async with async_playwright() as p:
  browser = await launch(p)
  context = await browser.new_context(viewport={'width':1440,'height':1100})
  page = await context.new_page();page.set_default_timeout(35000)
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  async def ready():await page.wait_for_function("document.querySelector('.preview-stage canvas')?.dataset.ready === 'true'")
  async def draft():return await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  async def canvas():
   await ready();return await page.locator('.preview-stage canvas').evaluate('(c)=>c.toDataURL()')
  async def layer(name):await page.get_by_role('group',name='Select artwork layer').get_by_role('button',name=name).click()
  async def screenshot(name):
   await page.evaluate('document.activeElement?.blur();window.scrollTo({top:0,behavior:"instant"})');await page.wait_for_timeout(150)
   await page.screenshot(path=str(ROOT/'evidence'/name),type='jpeg',quality=83,full_page=True)
  await page.goto(BASE+'/design',wait_until='networkidle');await page.get_by_role('tab',name='Photo + artwork',exact=True).click();await ready()
  await page.get_by_role('tab',name='02 Your design').click()
  await page.get_by_label('Brand name or message').fill('NOVA\nEVERYDAY GOODS')
  await page.locator('#artwork-font').click();await page.get_by_role('option',name='Editorial serif').click()
  await page.get_by_role('button',name='Undo change',exact=True).click();assert 'textFont' not in await draft()
  raw=await page.evaluate("""()=>{const c=document.createElement('canvas');c.width=600;c.height=300;const x=c.getContext('2d');x.fillStyle='#ffffff';x.fillRect(0,0,600,300);x.fillStyle='#193b67';x.beginPath();x.arc(300,150,110,0,Math.PI*2);x.fill();x.fillStyle='#d9cba6';x.font='bold 130px Georgia';x.textAlign='center';x.fillText('N',300,193);return c.toDataURL('image/png').split(',')[1]}""")
  await page.get_by_role('group',name='Select artwork layer').get_by_role('button',name='Logo',exact=True).click()
  await page.locator('input[type=file]').set_input_files({'name':'nova-mark.png','mimeType':'image/png','buffer':base64.b64decode(raw)})
  await page.get_by_text('nova-mark.png',exact=True).wait_for();await ready()
  d=await draft();assert d['text']=='NOVA\nEVERYDAY GOODS' and d['logo'] and d['layeredArtwork'] and d['textPlacement']['y']==56 and d['y']==44
  # Undo must remove optional layered fields too, then redo restores the entire design.
  await page.get_by_role('button',name='Undo change',exact=True).click();await ready();undo=await draft();assert not undo['logo'] and 'textPlacement' not in undo and 'layeredArtwork' not in undo
  await page.get_by_role('button',name='Redo change',exact=True).click();await ready();assert (await draft())['logo']==d['logo']
  await page.get_by_role('button',name='Remove white background',exact=True).click();await page.get_by_role('button',name='Restore original background',exact=True).wait_for();await ready()
  await layer('Text');await page.get_by_text('Position & rotation',exact=True).click();await page.get_by_label('Vertical position',exact=True).fill('68');await page.get_by_label('Artwork rotation',exact=True).fill('-8');await page.get_by_label('Artwork rotation',exact=True).press('Enter');await ready()
  d=await draft();assert d['textPlacement']['y']==68 and d['textPlacement']['rotation']==-8 and d['rotation']==0 and d['y']==44
  # Pointer hit testing selects the logo; keyboard movements affect only that layer.
  c=page.locator('.preview-stage canvas');await c.scroll_into_view_if_needed();box=await c.bounding_box();x=box['x']+box['width']*.5;y=box['y']+box['height']*.44
  await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+box['width']*.05,y,steps=6);await page.mouse.up();await ready();assert abs((await draft())['x']-55)<.3 and (await draft())['textPlacement']['x']==50
  await c.focus();await page.keyboard.press('ArrowLeft');await ready();assert abs((await draft())['x']-54)<.3
  # Separate layers are visibly rendered and survive removal/undo without blanking each other.
  await page.get_by_role('button',name='Toggle artwork guides').click();both=await canvas()
  await layer('Text');await page.get_by_role('button',name='Remove selected',exact=True).click();without_text=await canvas();assert both!=without_text and (await draft())['logo']
  await page.get_by_role('button',name='Undo change',exact=True).click();assert await canvas()==both
  await layer('Logo');await page.get_by_role('button',name='Remove selected',exact=True).click();without_logo=await canvas();assert without_logo!=both and without_logo!=without_text and (await draft())['text']
  await page.get_by_role('button',name='Undo change',exact=True).click();assert await canvas()==both
  await page.get_by_role('button',name='Copy design to back',exact=True).click();d=await draft()
  assert d['backLogo']==d['logo'] and d['backText']==d['text'] and d['backTextPlacement']==d['textPlacement']
  await page.get_by_role('tab',name='Back',exact=True).click();await layer('Text');await page.get_by_label('Brand name or message').fill('MADE FOR\nEVERY DAY');await page.get_by_label('Horizontal position',exact=True).fill('46');await ready();assert (await draft())['textPlacement']['x']==50
  await page.get_by_role('tab',name='01 The bag').click();await page.get_by_text('Need a custom size?',exact=True).click();await page.get_by_label('Requested dimensions',exact=True).fill('40 × 35 × 12 cm')
  await page.locator('#studio-print-colors').click();await page.get_by_role('option',name='2 colors',exact=True).click()
  async with page.expect_download() as pending:await page.get_by_role('button',name='Download both sides + specifications',exact=True).click()
  output=await pending.value;sheet=ROOT/'evidence/layered-design-sheet.png';await output.save_as(str(sheet));data=sheet.read_bytes();assert (int.from_bytes(data[16:20],'big'),int.from_bytes(data[20:24],'big'))==(2000,1400)
  await page.get_by_role('tab',name='Front',exact=True).click();await page.get_by_role('tab',name='02 Your design').click();await layer('Text');await ready();await screenshot('studio-layered-desktop.jpg')
  for width in [1024,768,390,320]:
   await page.set_viewport_size({'width':width,'height':900});await page.wait_for_timeout(100);assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),width
  await page.set_viewport_size({'width':390,'height':844});await screenshot('studio-layered-mobile.jpg')
  await page.reload(wait_until='networkidle');await page.get_by_role('tab',name='Photo + artwork',exact=True).click();await ready();saved=await draft();assert saved['backText']=='MADE FOR\nEVERY DAY' and saved['customDimensions']=='40 × 35 × 12 cm'
  await page.get_by_role('link',name='Get a quote for this bag',exact=True).click();await page.wait_for_url('**/quote')
  await page.goto(BASE+'/quote?demo=1',wait_until='networkidle')
  await page.get_by_role('button',name='Use demo details',exact=True).click();await page.get_by_role('button',name='Continue',exact=True).click()
  assert await page.locator('.quote-artwork-pair canvas').count()==2
  saved=await draft();saved.update(company='Fictional layered QA',contact='Demo Buyer',email='layers@example.com',city='Prishtina',consent=True,key=str(uuid.uuid4()))
  response=await context.request.post(BASE+'/api/demo',data={'type':'submit','design':saved});assert response.status==200,await response.text();result=await response.json();request=result['state']['requests'][0];rid=request['id']
  fields=['layeredArtwork','textPlacement','backTextPlacement','logo','text','backLogo','backText','customDimensions','printColors']
  for field in fields:assert request['snapshot'][field]==saved[field],field
  response=await context.request.post(BASE+'/api/demo',data={'type':'prepare-demo','id':rid});assert response.status==200
  proof=(await response.json())['state']['requests'][0]['artworks'][0]['design']
  for field in fields:assert proof[field]==saved[field],field
  response=await context.request.post(BASE+'/api/demo',data={'type':'issue-artwork','id':rid,'caption':saved['text']});assert response.status==200
  revised=(await response.json())['state']['requests'][0]['artworks'][-1]['design']
  assert revised['logo']==saved['logo'] and revised['textPlacement']==saved['textPlacement'] and revised['backLogo']==saved['backLogo']
  invalid={**saved,'key':str(uuid.uuid4()),'textPlacement':{**saved['textPlacement'],'x':999}}
  assert (await context.request.post(BASE+'/api/demo',data={'type':'submit','design':invalid})).status==400
  await page.goto(BASE+'/demo/customer?id='+rid,wait_until='networkidle')
  await page.get_by_role('button',name='Review demo quote',exact=True).click();await page.get_by_role('button',name='Accept demo quotation',exact=True).click();await page.get_by_role('button',name='Review my artwork',exact=True).click();await page.get_by_role('button',name='Approve this revision',exact=True).click();await page.get_by_role('button',name='Review & place demo order',exact=True).click();await page.get_by_role('button',name='Place demo order',exact=True).click();await page.get_by_role('heading',name='Your demo order is placed.',exact=True).wait_for()
  await page.get_by_role('button',name='View order details',exact=True).click();await page.get_by_role('button',name='Request these bags again',exact=True).click();await page.wait_for_url('**/quote')
  repeated=await draft()
  for field in fields:assert repeated[field]==saved[field],field
  assert repeated['reorderOf']==rid
  await page.set_viewport_size({'width':1440,'height':1100});await page.goto(BASE+'/certifications',wait_until='networkidle')
  assert await page.locator('.certificate-record').count()==2
  await page.get_by_label('Search certificates').fill('SB.26.0005');assert await page.locator('.certificate-record').count()==1 and await page.locator('#iso-14001').count()==1
  await page.get_by_label('Search certificates').fill('no match');await page.get_by_role('heading',name='No matching certificates').wait_for();await page.get_by_role('button',name='Show all certificates').click()
  await page.get_by_role('button',name='Inspect ISO 9001:2015',exact=True).click();dialog=page.get_by_role('dialog');await dialog.get_by_role('button',name='Zoom in',exact=True).click();assert 'zoomed' in await dialog.locator('.certificate-viewer').get_attribute('class')
  await dialog.get_by_role('button',name='Fit document',exact=True).click();await page.keyboard.press('Escape');assert await page.get_by_role('button',name='Inspect ISO 9001:2015',exact=True).evaluate('(b)=>document.activeElement===b')
  for n in ['9001','14001']:
   article=page.locator('#iso-'+n);assert '26 January 2027' in await article.inner_text() and '26 January 2029' in await article.inner_text()
   async with page.expect_download() as pending:await article.get_by_role('link',name='Download original',exact=True).click()
   path=await (await pending.value).path();assert hashlib.sha256(Path(path).read_bytes()).digest()==hashlib.sha256((ROOT/f'public/documents/iso-{n}-original.png').read_bytes()).digest()
  await screenshot('certificates-desktop.jpg')
  for width in [768,390,320]:
   await page.set_viewport_size({'width':width,'height':844});assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),width
  await page.set_viewport_size({'width':390,'height':844});await screenshot('certificates-mobile.jpg')
  await page.get_by_role('button',name='Inspect ISO 14001:2015',exact=True).click();await page.get_by_role('dialog').get_by_role('button',name='Zoom in',exact=True).click();assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth');await page.keyboard.press('Escape')
  await page.set_viewport_size({'width':1440,'height':1000});await page.goto(BASE+'/',wait_until='networkidle');await page.locator('.certificate-showcase').scroll_into_view_if_needed();await page.locator('.certificate-showcase').screenshot(path=str(ROOT/'evidence/certificates-home.jpg'),type='jpeg',quality=85)
  assert not errors,errors
  (ROOT/'evidence/studio-layers-certificates.json').write_text(json.dumps({'status':'passed','widths':[1440,1024,768,390,320],'sheetDimensions':[2000,1400],'checks':['logo and text together; preserved text on upload','independent drag, keyboard, rotation and coordinates','undo/redo removes optional fields and restores identical canvas','individual layer removal and copy to opposite face','custom dimension request and print inks','both faces in downloadable sheet and quote review','draft persistence through reload and navigation','server RFQ and proof retain layered artwork; invalid coordinates rejected','sales proof-caption revision keeps the image layer and placement','mobile layered design approval, order and reorder preserve both faces','certificate search, empty state, zoom, keyboard focus and original-byte downloads','conditional certificate dates visible','responsive studio, certificates and mobile zoom'],'browserErrors':errors},indent=2))
  await browser.close();print('PASS artwork layers and certificate library')
asyncio.run(main())
