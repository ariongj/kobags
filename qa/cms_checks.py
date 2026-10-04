"""Production CMS acceptance using isolated local data and synthetic password accounts only."""
import asyncio,json,uuid,io,sys,tempfile,importlib.util,os
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright
from browser_support import BASE,launch
ROOT=Path(__file__).resolve().parents[1]
async def main():
 suffix=uuid.uuid4().hex[:8];checks=[]
 async with async_playwright() as p:
  browser=await launch(p)
  assert BASE.startswith(('http://127.0.0.1:', 'http://localhost:')), 'Run only against a local Worker'
  password=os.environ['KOBAGS_QA_PASSWORD']
  owner=await browser.new_context(extra_http_headers={'cf-connecting-ip':'198.19.'+str(int(suffix[:2],16))+'.'+str(int(suffix[2:4],16))},viewport={'width':1440,'height':1000})
  guest=await browser.new_context(extra_http_headers={'cf-connecting-ip':'198.18.'+str(int(suffix[:2],16))+'.'+str(int(suffix[2:4],16))})
  stranger=await browser.new_context(extra_http_headers={'oai-authenticated-user-id':'cms-qa-stranger','oai-authenticated-user-email':'outsider@example.test'})
  async def get(ctx,path,status=200):
   r=await ctx.request.get(BASE+path);assert r.status==status,(path,r.status,(await r.text())[:500]);return await r.json()
  async def post(ctx,path,data,status=200):
   r=await ctx.request.post(BASE+path,data=data,headers={'Origin':BASE});assert r.status==status,(path,r.status,(await r.text())[:700]);return await r.json()
  await get(guest,'/api/cms/inquiries',401);await get(stranger,'/api/cms/records',401)
  await post(owner,'/api/cms/login',{'email':'info@itdks.tech','password':password})
  session=await get(owner,'/api/cms/session');assert session['member']['role']=='administrator'
  records=(await get(owner,'/api/cms/records'))['records'];assert len([r for r in records if r['kind']=='product'])==5
  checks.append('Email/password administrator access; anonymous and platform-header-only API access rejected')
  invitation=await post(owner,'/api/cms/invite',{'name':'QA editor','email':'editor-'+suffix+'@example.test','role':'editor'})
  token=invitation['invitation'].split('invite=')[1]
  await post(stranger,'/api/cms/claim',{'invite':token,'email':'outsider@example.test','password':password},403)
  editor=await browser.new_context(extra_http_headers={'oai-authenticated-user-id':'cms-qa-editor-'+suffix,'oai-authenticated-user-email':'editor-'+suffix+'@example.test'})
  await post(editor,'/api/cms/claim',{'invite':token,'email':'editor-'+suffix+'@example.test','password':password});await post(editor,'/api/cms/claim',{'invite':token,'email':'editor-'+suffix+'@example.test','password':password},403)
  for endpoint in ['staff','inquiries','outbox','backup','orders']:
   await get(editor,'/api/cms/'+endpoint,403)
  checks.append('Invitation binds the intended email once; editor blocked from staff, inquiries, quotes, backup and production')
  record=next(r for r in records if r['kind']=='settings');original_settings=json.loads(json.dumps(record['draft']))
  await post(editor,'/api/cms/records',{'id':record['id'],'kind':'page','action':'save','revision':record['revision'],'data':record['draft']},403)
  # One translated page through draft, publication, stale-save rejection, rename and history.
  path='/qa-cms-'+suffix
  data={'title':{'en':'QA buyer guide '+suffix,'sq':'Udhëzues prove '+suffix},'description':{'en':'A synthetic local-only guide for CMS publication acceptance.','sq':'Udhëzues sintetik lokal për provën e publikimit në CMS.'},'image':'','path':path,'seoTitle':{'en':'','sq':''},'seoDescription':{'en':'','sq':''},'sections':[{'id':'one','title':{'en':'Choose your bag','sq':'Zgjidhni çantën'},'body':{'en':'Check dimensions and requested quantities.','sq':'Kontrolloni përmasat dhe sasitë e kërkuara.'},'image':'','alt':{'en':'','sq':''},'link':'/products','linkLabel':{'en':'Bags','sq':'Çanta'},'visible':True}]}
  page_record=await post(editor,'/api/cms/records',{'kind':'page','slug':'qa-'+suffix,'data':data});record_id=page_record['id']
  assert (await guest.request.get(BASE+path)).status==404
  await post(editor,'/api/cms/records',{'id':record_id,'action':'publish','revision':1})
  published=await guest.request.get(BASE+'/sq'+path);assert published.status==200 and 'Zgjidhni çantën' in await published.text()
  assert 'noindex' not in published.headers.get('x-robots-tag','')
  sitemap=await (await guest.request.get(BASE+'/sitemap.xml')).text();assert path in sitemap
  await post(editor,'/api/cms/records',{'id':record_id,'action':'save','revision':1,'data':data},409)
  data['path']=path+'-renamed'
  await post(editor,'/api/cms/records',{'id':record_id,'action':'save','revision':2,'data':data})
  await post(editor,'/api/cms/records',{'id':record_id,'action':'publish','revision':3})
  redirect=await guest.request.get(BASE+path,max_redirects=0);assert redirect.status==301 and redirect.headers['location'].endswith(data['path'])
  assert len((await get(editor,'/api/cms/versions/'+record_id))['results'])==4
  await post(editor,'/api/cms/records',{'id':record_id,'action':'archive','revision':4})
  checks.append('Draft isolation, translated publication, sitemap, optimistic locking, version history and 301 rename')
  # Publishing changes catalogue options; restoring them preserves draft history.
  product=next(r for r in records if r['id']=='product-box-bag');original_product=json.loads(json.dumps(product['draft']));original_product.update({'activeSizes':['Small','Medium','Large'],'colors':['Forest green','Navy blue','Natural','White','Black','Red','Royal blue'],'printColors':4,'moq':5000});original_product['product']['variants'][1]['gsm']=80
  restricted=json.loads(json.dumps(original_product));restricted.update({'activeSizes':['Medium'],'colors':['Navy blue'],'printColors':2,'moq':6000});restricted['product']['variants'][1]['gsm']=95
  await post(owner,'/api/cms/records',{'id':product['id'],'action':'save','revision':product['revision'],'data':restricted})
  await post(owner,'/api/cms/records',{'id':product['id'],'action':'publish','revision':product['revision']+1})
  catalog_page=await guest.new_page();await catalog_page.goto(BASE+'/products/box-bag',wait_until='networkidle')
  assert '6,000' in await catalog_page.inner_text('body') and '95' in await catalog_page.inner_text('body'),(await catalog_page.inner_text('body'))[:5000]
  await post(owner,'/api/cms/records',{'id':product['id'],'action':'save','revision':product['revision']+2,'data':original_product})
  await post(owner,'/api/cms/records',{'id':product['id'],'action':'publish','revision':product['revision']+3})
  await post(owner,'/api/cms/records',{'id':product['id'],'action':'archive','revision':product['revision']+4})
  assert (await guest.request.get(BASE+'/products/box-bag')).status==404
  assert '/products/box-bag' not in await (await guest.request.get(BASE+'/sitemap.xml')).text()
  await post(owner,'/api/cms/records',{'id':product['id'],'action':'unarchive','revision':product['revision']+5})
  assert (await guest.request.get(BASE+'/products/box-bag')).status==200
  await catalog_page.close()
  checks.append('Published catalogue MOQ, active size and GSM reach the public product page; historical drafts retained')
  # Enable live handling locally only; public deployment keeps its own independent settings.
  record['draft']['settings']['liveInquiries']=True
  await post(owner,'/api/cms/records',{'id':record['id'],'action':'save','revision':record['revision'],'data':record['draft']})
  await post(owner,'/api/cms/records',{'id':record['id'],'action':'publish','revision':record['revision']+1})
  await get(guest,'/api/inquiries')
  page=await guest.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  await page.goto(BASE+'/design',wait_until='networkidle')
  design=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  design.update({'company':'QA Factory '+suffix,'contact':'QA Buyer','email':'buyer-'+suffix+'@example.test','country':'Kosovo','city':'Prishtina','quantity':5000,'date':'','consent':True,'key':str(uuid.uuid4()),'text':'QA FRONT','backText':'QA BACK','note':'Synthetic acceptance request','customDimensions':'','purpose':'Retail'})
  saved=await post(guest,'/api/inquiries',{'kind':'quote','design':design,'language':'sq'},201);ref=saved['id']
  duplicate=await post(guest,'/api/inquiries',{'kind':'quote','design':design,'language':'sq'});assert duplicate['id']==ref
  changed={**design,'quantity':6000};await post(guest,'/api/inquiries',{'kind':'quote','design':changed,'language':'sq'},409)
  await get(stranger,'/api/inquiries?id='+ref,404)
  detail=await get(owner,'/api/cms/inquiries/'+ref);assert detail['inquiry']['data']['text']=='QA FRONT' and detail['inquiry']['data']['backText']=='QA BACK'
  assert detail['inquiry']['data']['consentVersion']=='cms-inquiry-v1'
  for kind in ['sample','contact','partner']:
   payload={'kind':kind,'key':str(uuid.uuid4()),'company':'QA '+suffix,'contact':'QA Buyer','email':'buyer@example.test','country':'Kosovo','model':'Sales partner' if kind=='partner' else '','message':'Local acceptance test inquiry','consent':True}
   await post(guest,'/api/inquiries',{'kind':kind,'data':payload,'language':'en'},201)
  checks.append('Four real inquiry types persist in shared inbox; exact front/back snapshots, consent, duplicate protection and browser isolation')
  quote={'quantity':5000,'unitCents':30,'setupCents':10000,'shippingCents':5000,'taxCents':0,'discountCents':1000,'validUntil':'2030-12-31','terms':'QA payment terms: bank transfer after agreement.','delivery':'Date and transport confirmed in writing.'}
  q=await post(owner,'/api/cms/quote',{'id':ref,'data':quote});qid=q['id']
  await post(owner,'/api/cms/issue-quote',{'id':qid})
  detail=await get(owner,'/api/cms/inquiries/'+ref);qrow=detail['quotes'][0];assert qrow['data']['totalCents']==164000
  await post(owner,'/api/cms/release',{'id':ref,'paymentEvidence':'QA payment condition reference'},409)
  prod_invite=await post(owner,'/api/cms/invite',{'name':'QA production','email':'production-'+suffix+'@example.test','role':'production'})
  production=await browser.new_context(extra_http_headers={'oai-authenticated-user-id':'cms-qa-production-'+suffix,'oai-authenticated-user-email':'production-'+suffix+'@example.test'})
  await post(production,'/api/cms/claim',{'invite':prod_invite['invitation'].split('invite=')[1],'email':'production-'+suffix+'@example.test','password':password})
  await get(production,'/api/cms/inquiries',403)
  # Private bytes cannot be obtained by public visitors or editors.
  output=io.BytesIO();Image.new('RGB',(200,100),'green').save(output,format='PNG')
  upload=await owner.request.post(BASE+'/api/cms/media',headers={'Origin':BASE},multipart={'file':{'name':'qa-artwork.png','mimeType':'image/png','buffer':output.getvalue()},'visibility':'private','inquiryId':ref,'altEn':'QA artwork','altSq':'Dizajn prove'})
  assert upload.status==201,(upload.status,await upload.text());media=(await upload.json())['id']
  assert (await guest.request.get(BASE+'/api/media/'+media)).status==401
  assert (await editor.request.get(BASE+'/api/media/'+media)).status==403
  assert (await production.request.get(BASE+'/api/media/'+media)).status==403
  await post(owner,'/api/cms/artwork',{'id':ref,'mediaId':media,'note':'QA template 20 × 10 cm; both faces checked.'})
  link=await post(owner,'/api/cms/portal',{'id':ref});portal=link['portal'].split('/')[-1]
  public_review=await get(guest,'/api/portal/'+portal);serialized=json.dumps(public_review);assert 'private-note' not in serialized and 'owner' not in public_review
  artwork=public_review['artwork'][0]
  assert (await guest.request.get(BASE+'/api/media/'+media+'?portal='+portal)).status==200
  await post(guest,'/api/portal/'+portal,{'kind':'quote','id':qid,'hash':'wrong','decision':'approved','name':'QA Buyer','evidence':'Reviewed QA quote','confirm':True},409)
  await post(guest,'/api/portal/'+portal,{'kind':'quote','id':qid,'hash':qrow['hash'],'decision':'approved','name':'QA Buyer','evidence':'Reviewed QA quote','confirm':True})
  await post(guest,'/api/portal/'+portal,{'kind':'artwork','id':artwork['id'],'hash':artwork['hash'],'decision':'approved','name':'QA Buyer','evidence':'Reviewed exact QA print file','confirm':True})
  released=await post(owner,'/api/cms/release',{'id':ref,'paymentEvidence':'QA bank transfer evidence 123'});assert released['id']
  await post(owner,'/api/cms/release',{'id':ref,'paymentEvidence':'QA bank transfer evidence 123'},409)
  assert (await production.request.get(BASE+'/api/media/'+media)).status==200
  checks.append('Integer-cent quotation, private files, expiring customer links, exact revision/hash approval and gated single production release')
  await post(owner,'/api/cms/order',{'id':released['id'],'revision':1,'status':'closed','note':'QA skip'},409)
  await post(owner,'/api/cms/order',{'id':released['id'],'revision':1,'status':'production','note':'QA production started'})
  q2=await post(owner,'/api/cms/quote',{'id':ref,'data':quote})
  await post(owner,'/api/cms/order',{'id':released['id'],'revision':2,'status':'quality','note':'QA stale revision'},409)
  await post(owner,'/api/cms/portal',{'id':ref});await get(guest,'/api/portal/'+portal,404)
  await post(owner,'/api/cms/revise-release',{'id':released['id'],'revision':2,'paymentEvidence':'QA production stopped and payment rechecked'},409)
  await post(owner,'/api/cms/issue-quote',{'id':q2['id']})
  latest_quote=(await get(owner,'/api/cms/inquiries/'+ref))['quotes'][0]
  await post(owner,'/api/cms/decision',{'kind':'quote','id':q2['id'],'hash':latest_quote['hash'],'decision':'approved','evidence':'QA revised terms confirmed in writing'})
  await post(owner,'/api/cms/revise-release',{'id':released['id'],'revision':2,'paymentEvidence':'QA production stopped and payment rechecked'})
  order=next(r for r in (await get(owner,'/api/cms/orders'))['results'] if r['id']==released['id']);assert order['status']=='ready' and order['quote_id']==q2['id'] and order['revision']==3
  assert any(e['action']=='production-release-revised' and qid in e['detail'] for e in (await get(owner,'/api/cms/inquiries/'+ref))['events'])
  checks.append('Sequential production stages, new-revision lock, audited re-release after approval and customer-link revocation')
  reports=await get(owner,'/api/cms/reports');assert any(row['label']=='quote' for row in reports['byKind'])
  await post(owner,'/api/cms/queue-quote',{'id':q2['id']},422)
  assert not session['emailReady']
  outbox=(await get(owner,'/api/cms/outbox'))['results'];assert outbox
  await post(owner,'/api/cms/send-email',{'id':outbox[0]['id'],'confirm':True},503)
  printable=await owner.request.get(BASE+'/cms/quotation/'+qid);assert printable.status==200
  printed=await printable.text();assert 'Oferta tregtare' in printed and 'QA bank transfer evidence' not in printed
  bad_upload=await owner.request.post(BASE+'/api/cms/media',headers={'Origin':BASE},multipart={'file':{'name':'fake.png','mimeType':'image/png','buffer':b'<script>invalid</script>'},'visibility':'public','altEn':'Invalid','altSq':'Jo valide'})
  assert bad_upload.status==422
  checks.append('Real reporting, clean quotation print view, unconfigured email fails truthfully, and invalid image signatures rejected')
  # Exercise the public form and saved receipt after reload, not only API submissions.
  contact_page=await guest.new_page();await contact_page.goto(BASE+'/contact',wait_until='networkidle')
  await contact_page.locator('#inquiry-company').fill('QA browser '+suffix)
  await contact_page.locator('#inquiry-contact').fill('QA Buyer')
  await contact_page.locator('#inquiry-email').fill('browser@example.test')
  await contact_page.locator('textarea').fill('Synthetic public form acceptance check')
  await contact_page.get_by_role('checkbox').check()
  await contact_page.get_by_role('button',name='Save inquiry',exact=True).click()
  await contact_page.get_by_role('heading',name='Your request is saved.').wait_for()
  await contact_page.reload(wait_until='networkidle');await contact_page.get_by_role('heading',name='Your request is saved.').wait_for()
  assert await contact_page.locator('h1').count()==1
  await contact_page.close()
  checks.append('Public contact form submits to shared inbox and preserves its private receipt on reload')
  # Tablet/mobile navigation and editor layout; only synthetic records are shown.
  staff_page=await owner.new_page();staff_page.on('pageerror',lambda e:errors.append(str(e)))
  await staff_page.goto(BASE+'/cms',wait_until='networkidle');await staff_page.get_by_role('heading',name='Overview',exact=True).wait_for()
  await staff_page.screenshot(path=str(ROOT/'evidence/cms-desktop-overview.jpg'),type='jpeg',quality=85,full_page=True)
  await staff_page.get_by_role('button',name='Bag catalogue',exact=True).click();await staff_page.get_by_role('button',name='Box Bag',exact=True).click();await staff_page.get_by_label('Product name',exact=True).wait_for()
  await staff_page.screenshot(path=str(ROOT/'evidence/cms-desktop-editor.jpg'),type='jpeg',quality=85,full_page=True)
  for width in [320,390,768]:
   await staff_page.set_viewport_size({'width':width,'height':844});assert not await staff_page.evaluate('document.documentElement.scrollWidth>innerWidth'),width
  await staff_page.set_viewport_size({'width':390,'height':844});await staff_page.screenshot(path=str(ROOT/'evidence/cms-mobile-editor.jpg'),type='jpeg',quality=85,full_page=True)
  assert not errors,errors
  checks.append('Desktop and 320/390/768px CMS editor layouts; no captured browser errors')
  latest=(await get(owner,'/api/cms/records'))['records'];settings=next(r for r in latest if r['id']=='global-settings')
  await post(owner,'/api/cms/records',{'id':settings['id'],'action':'save','revision':settings['revision'],'data':original_settings})
  await post(owner,'/api/cms/records',{'id':settings['id'],'action':'publish','revision':settings['revision']+1})
  backup=await get(owner,'/api/cms/backup');assert backup['format']=='kobags-cms-backup-v1';assert 'portal_hash' not in json.dumps(backup)
  with tempfile.TemporaryDirectory(prefix='kobags-cms-restore-') as folder:
   source=Path(folder)/'backup.json';source.write_text(json.dumps(backup))
   spec=importlib.util.spec_from_file_location('cms_restore',ROOT/'scripts/restore-cms-backup.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
   counts=module.restore(source,Path(folder)/'restored.sqlite')
   assert counts['cms_inquiries']==len(backup['cms_inquiries']) and counts['cms_quotes']==len(backup['cms_quotes']) and counts['cms_records']==len(backup['cms_records'])
  archive=await owner.request.get(BASE+'/api/cms/backup-archive');assert archive.status==200
  with tempfile.TemporaryDirectory(prefix='kobags-full-restore-') as folder:
   archive_path=Path(folder)/'full.tar';archive_path.write_bytes(await archive.body())
   recovered=module.restore_archive(archive_path,Path(folder)/'full.sqlite',Path(folder)/'objects')
   assert recovered['verifiedFiles']>=1 and recovered['tables']['cms_inquiries']==len(backup['cms_inquiries'])
  checks.append('Full backup restores uploaded objects and verifies their SHA-256 checksums')
  checks.append('Authorized data backup excludes access-link hashes; clean SQLite restore and integrity check preserve records and revision counts')
  (ROOT/'evidence/cms-checks.json').write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors,'scope':'isolated local Worker; synthetic users and data; no external email sent'},indent=2))
  print('PASS CMS:',len(checks),'acceptance groups')
  await browser.close()
if __name__=='__main__':asyncio.run(main())
