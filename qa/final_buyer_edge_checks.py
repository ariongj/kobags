"""Read-only-checkout buyer edge diagnostics; synthetic local preview state only."""
import asyncio, json, sys, uuid, traceback
from pathlib import Path
from urllib.parse import urlparse, parse_qs
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'qa'))
from browser_support import BASE, launch
from playwright.async_api import async_playwright
OUT=ROOT/'evidence/final-buyer-edge-checks.json'

async def main():
 results=[]
 async with async_playwright() as p:
  browser=await launch(p)
  async def setup(init=None):
   ctx=await browser.new_context(viewport={'width':1440,'height':1000})
   if init:await ctx.add_init_script(init)
   page=await ctx.new_page();page.set_default_timeout(45000)
   await page.goto(BASE+'/quote',wait_until='networkidle')
   d=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   return ctx,page,d
  async def state(ctx):return (await (await ctx.request.get(BASE+'/api/demo')).json())['state']
  async def post(ctx,a):
   r=await ctx.request.post(BASE+'/api/demo',data=a);d=await r.json();assert r.status==200,(r.status,d);return d
  async def seed_draft(page,d):
   await page.evaluate('(d)=>{localStorage.setItem("kobags-design-v1",JSON.stringify(d));localStorage.setItem("kobags-quote-step","3")}',d)
   await page.goto(BASE+'/quote',wait_until='networkidle')
  async def submit(page):
   async with page.expect_response(lambda r:r.url.endswith('/api/demo') and r.request.method=='POST') as r:
    await page.get_by_role('button',name='Save design request',exact=True).click()
   response=await r.value
   data=await response.json()
   if response.status == 400 and data.get('error') == 'REQUEST_KEY_CONFLICT':
    # The UI performs its one safe retry; observe the completed result rather than the first conflict.
    await page.get_by_role('heading',name='Your bag has a beginning.',exact=True).wait_for()
    return 200,{'id':parse_qs(urlparse(page.url).query)['submitted'][0],'state':await state(page.context)}
   await page.get_by_role('heading',name='Your bag has a beginning.',exact=True).wait_for()
   return response.status,data
  async def studio(page,text):
   await page.goto(BASE+'/design',wait_until='networkidle')
   await page.get_by_role('tab',name='02 Your design',exact=True).click()
   await page.get_by_role('group',name='Select artwork layer').get_by_role('button',name='Text',exact=True).click()
   await page.get_by_label('Brand name or message',exact=True).fill(text)
  async def report(name,func):
   try:result=await func();results.append({'case':name,**result})
   except Exception as exc:results.append({'case':name,'diagnostic_error':str(exc),'traceback':traceback.format_exc()})
   OUT.write_text(json.dumps(results,indent=2));print(json.dumps(results[-1]),flush=True)

  async def legacy():
   ctx,page,d=await setup()
   d.update(key=str(uuid.uuid4()),company='Fictional legacy QA',contact='Test Buyer',email='buyer@example.com',city='Prishtina',consent=True,text='LEGACY ORIGINAL')
   original=await post(ctx,{'type':'submit','design':d})
   d['text']='LEGACY NEW DESIGN'
   await seed_draft(page,d)
   status,res=await submit(page)
   s=await state(ctx)
   result={'status':status,'originalId':original['id'],'returnedId':res.get('id'),'savedTexts':[r['snapshot']['text'] for r in s['requests']],'draftRequestedText':d['text'],'bug':len(s['requests'])==1 and res.get('id')==original['id']}
   await ctx.close();return result

  async def lost_response():
   ctx,page,d=await setup()
   d.update(key=str(uuid.uuid4()),company='Fictional retry QA',contact='Test Buyer',email='buyer@example.com',city='Prishtina',consent=True,text='ACK ORIGINAL')
   await seed_draft(page,d)
   captured=[]
   async def lost(route):
    if route.request.method=='POST':
     r=await route.fetch();captured.append(await r.json());await route.abort('failed')
    else:await route.continue_()
   await page.route('**/api/demo',lost)
   await page.get_by_role('button',name='Save design request',exact=True).click()
   await page.get_by_role('alert').wait_for()
   await page.unroute('**/api/demo',lost)
   unchanged=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   status,retry=await submit(page)
   records=(await state(ctx))['requests']
   result={'savedDespiteLostResponse':len(captured)==1,'keyPreserved':unchanged['key']==d['key'],'retrySameId':retry.get('id')==captured[0]['id'],'savedCount':len(records),'bug':len(records)!=1}
   await ctx.close();return result

  async def lost_response_edit():
   ctx,page,d=await setup()
   d.update(key=str(uuid.uuid4()),company='Fictional changed retry',contact='Test Buyer',email='buyer@example.com',city='Prishtina',consent=True,text='LOST ACK FIRST')
   await seed_draft(page,d)
   async def lost(route):
    if route.request.method=='POST':await route.fetch();await route.abort('failed')
    else:await route.continue_()
   await page.route('**/api/demo',lost);await page.get_by_role('button',name='Save design request',exact=True).click();await page.get_by_role('alert').wait_for();await page.unroute('**/api/demo',lost)
   await studio(page,'LOST ACK SECOND')
   await page.get_by_role('link',name='Get a quote for this bag',exact=True).click();await page.wait_for_url('**/quote');await page.wait_for_load_state('networkidle')
   status,res=await submit(page)
   records=(await state(ctx))['requests']
   result={'status':status,'savedTexts':[r['snapshot']['text'] for r in records],'bug':not any(r['snapshot']['text']=='LOST ACK SECOND' for r in records)}
   await ctx.close();return result

  async def multitab():
   ctx,page,d=await setup()
   page2=await ctx.new_page();page2.set_default_timeout(20000)
   await page.goto(BASE+'/quote',wait_until='networkidle')
   await page2.goto(BASE+'/quote',wait_until='networkidle')
   await page.locator('#q-customDimensions').fill('44 x 55 cm')
   first=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   await page2.locator('#q-customDimensions').input_value()
   # A change to another field from the still-open second tab should preserve dimensions.
   await page2.get_by_role('combobox',name='Intended use',exact=True).click()
   await page2.get_by_role('option',name='Gift packaging',exact=True).click()
   second=await page2.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   result={'dimensionsAfterTab1':first['customDimensions'],'dimensionsAfterTab2':second['customDimensions'],'purposeAfterTab2':second['purpose'],'bug':second['customDimensions']!=first['customDimensions']}
   await ctx.close();return result

  async def blocked_storage():
   ctx,page,d=await setup()
   await ctx.add_init_script("const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='kobags-design-v1')throw new DOMException('Quota exceeded','QuotaExceededError');return original.call(this,k,v)}")
   await studio(page,'STORAGE UNSAVED BRAND')
   visible_before=await page.get_by_label('Brand name or message',exact=True).input_value()
   await page.get_by_role('link',name='Get a quote for this bag',exact=True).click();await page.wait_for_url('**/quote');await page.wait_for_load_state('networkidle')
   await page.get_by_role('button',name='Continue',exact=True).click()
   artwork=await page.locator('.quote-artwork-review').inner_text()
   result={'enteredText':visible_before,'reviewText':artwork,'bug':'STORAGE UNSAVED BRAND' not in artwork,'warningText':await page.locator('main').inner_text() if await page.get_by_role('alert').count() else ''}
   await ctx.close();return result

  async def failed_upload():
   ctx,page,d=await setup()
   await studio(page,'KEEP TEXT ON FAILURE')
   await page.get_by_role('group',name='Select artwork layer').get_by_role('button',name='Logo',exact=True).click()
   before=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   await page.locator('input[type=file]').set_input_files({'name':'corrupt.png','mimeType':'image/png','buffer':b'not a png'})
   await page.get_by_text('This image could not be read. Try a smaller PNG or JPG.',exact=True).wait_for()
   after=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   result={'existingTextPreserved':after['text']==before['text'],'logoPreserved':after['logo']==before['logo'],'quoteReady':await page.get_by_role('link',name='Get a quote for this bag',exact=True).is_visible(),'bug':after['text']!=before['text'] or after['logo']!=before['logo']}
   await ctx.close();return result

  async def both_storage_unavailable():
   ctx,page,d=await setup()
   await ctx.add_init_script("const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('kobags-design-'))throw new DOMException('Quota exceeded','QuotaExceededError');return original.call(this,k,v)}")
   await studio(page,'KEEP THIS OPEN')
   warning=await page.locator('.draft-storage-notice').inner_text()
   assert 'cannot save this design' in warning
   dialogs=[]
   async def keep_open(dialog):
    dialogs.append(dialog.type)
    await dialog.dismiss()
   page.on('dialog',keep_open)
   await page.get_by_role('link',name='Get a quote for this bag',exact=True).click(no_wait_after=True)
   assert dialogs==['beforeunload']
   assert await page.get_by_label('Brand name or message',exact=True).input_value()=='KEEP THIS OPEN'
   await ctx.close()
   return {'warningVisible':True,'leaveWarningShown':True,'dismissPreservesEdits':True,'bug':False}

  async def unavailable():
   ctx,page,d=await setup()
   d.update(key=str(uuid.uuid4()),company='Fictional unavailable QA',contact='Test Buyer',email='buyer@example.com',city='Prishtina',consent=True,text='RETAIN AFTER 503')
   await seed_draft(page,d)
   async def offline(route):await route.fulfill(status=503,content_type='application/json',body='{"error":"STORAGE_UNAVAILABLE"}')
   await page.route('**/api/demo',offline)
   await page.get_by_role('button',name='Save design request',exact=True).click();await page.get_by_role('alert').wait_for()
   retained=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   await page.unroute('**/api/demo',offline)
   status,res=await submit(page)
   result={'draftPreserved':retained==d,'retryStatus':status,'savedText':res.get('state',{}).get('requests',[{}])[0].get('snapshot',{}).get('text'),'bug':status!=200 or retained!=d}
   await ctx.close();return result

  await report('predeployment draft key collision',legacy)
  await report('lost response identical retry',lost_response)
  await report('lost response then edit artwork',lost_response_edit)
  await report('multitab unrelated field preservation',multitab)
  await report('browser storage full',blocked_storage)
  await report('both browser stores unavailable',both_storage_unavailable)
  await report('corrupt upload preserves existing draft',failed_upload)
  await report('server storage outage then retry',unavailable)
  await browser.close()
 print('Evidence',OUT,flush=True)

asyncio.run(main())
assert all(not row.get('bug') and not row.get('diagnostic_error') for row in json.loads(OUT.read_text())), 'Buyer edge regression; see report'
