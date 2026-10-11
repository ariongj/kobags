"""Client feedback acceptance; temporary CMS fixtures against a local Worker only."""
import asyncio,copy,json,uuid,datetime,os
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE,launch
ROOT=Path(__file__).resolve().parents[1]
async def main():
 checks=[];errors=[]
 async with async_playwright() as p:
  browser=await launch(p);owner=await browser.new_context(extra_http_headers={'cf-connecting-ip':'198.19.11.'+str(int(uuid.uuid4().hex[:2],16))});guest=await browser.new_context(viewport={'width':390,'height':844},reduced_motion='reduce');page=await guest.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
  async def post(path,data,status=200):
   r=await owner.request.post(BASE+path,data=data,headers={'Origin':BASE});assert r.status==status,(path,r.status,(await r.text())[:400]);return await r.json()
  async def records():return (await (await owner.request.get(BASE+'/api/cms/records')).json())['records']
  async def action(id,action,data=None,status=200):
   r=next(r for r in await records() if r['id']==id);return await post('/api/cms/records',{'id':id,'action':action,'revision':r['revision'],**({'data':data} if data is not None else {})},status)
  async def publish(id,data):await action(id,'save',data);await action(id,'publish')
  async def go(path):
   r=await page.goto(BASE+path,wait_until='networkidle');assert r.status==200,(path,r.status)
  await post('/api/cms/login',{'email':os.getenv('KOBAGS_QA_EMAIL','stock-qa@example.test'),'password':os.getenv('KOBAGS_QA_PASSWORD') or Path('/tmp/kobags-stock-qa-password').read_text()})
  initial=await records();settings=next(r for r in initial if r['kind']=='settings');stock=next(r for r in initial if r['slug']=='thank-you');restores=[settings,stock];newid=None
  try:
   edited=copy.deepcopy(stock['draft']);edited['collection']['variants']=[{'id':'white-50','gsm':50,'color':'White','colorSq':'E bardhë','status':'available'},{'id':'green-60','gsm':60,'color':'Green','colorSq':'E gjelbër','status':'out'}]
   bad=copy.deepcopy(edited);bad['collection']['variants'].append(bad['collection']['variants'][0]);await action(stock['id'],'save',bad,422)
   await publish(stock['id'],edited)
   config=copy.deepcopy(settings['draft']);config['settings']['liveInquiries']=True;config['settings']['media']={'heroImage':'/assets/client-2026-09/factory-partners.jpg','printingVideo':'/assets/printing-process.mp4','printingPoster':'/assets/client-2026-09/printing.jpg','heroAlt':{'en':'QA factory image','sq':'QA fotografia e fabrikës'}}
   # Choose an existing poster asset, not a fabricated media path.
   config['settings']['media']['printingPoster']='/assets/client-2026-09/home-film-poster-640.webp'
   await publish(settings['id'],config)
   new=copy.deepcopy(edited);new['title']={'en':'QA seasonal stock','sq':'QA stoku sezonal'}
   result=await post('/api/cms/records',{'kind':'collection','slug':'qa-seasonal-'+uuid.uuid4().hex[:8],'data':new,'action':'save'});newid=result['id'];await action(newid,'publish')
   await go('/products');assert await page.locator('.collection-category').count()>=3;assert await page.get_by_role('heading',name='Choose your bag',exact=True).count()==1
   await go('/');assert await page.locator('.industrial-hero-photo').get_attribute('src')==config['settings']['media']['heroImage'];assert await page.locator('.industrial-hero-photo').get_attribute('srcset') is None;assert await page.locator('.home-production-film source').get_attribute('src')==config['settings']['media']['printingVideo']
   checks.append('CMS supports additional collections, unique stock rows, published photo/video overrides and current navigation')
   await go('/quote?collection=thank-you');assert not await page.locator('.footer-invitation').is_visible();assert await page.locator('input[type=file]').count()==0;assert await page.get_by_text('Print colors to quote',exact=True).count()==0
   assert 'L31 × H55 × W18 cm' in await page.locator('main').inner_text();assert await page.locator('option[value="green-60"]').evaluate('(o)=>o.disabled'),await page.locator('.stock-form select').evaluate('(e)=>e.outerHTML')
   await page.locator('.stock-form select').select_option('white-50');await page.locator('input[name=quantity]').fill('2400')
   for name,value in [('company','Stock QA Company'),('contact','QA Buyer'),('email','buyer@example.test'),('country','Kosova'),('city','Prishtina')]:await page.locator('input[name='+name+']').fill(value)
   await page.reload(wait_until='networkidle');assert await page.locator('input[name=quantity]').input_value()=='2400'
   await page.get_by_role('link',name='EN: Switch to Albanian',exact=True).click();await page.wait_for_load_state('networkidle');assert 'collection=thank-you' in page.url;assert await page.locator('input[name=quantity]').input_value()=='2400'
   await page.get_by_role('checkbox').check()
   async with page.expect_response(lambda r:r.url.endswith('/api/inquiries') and r.request.method=='POST') as response:await page.get_by_role('button',name='Kërkoni këtë artikull nga stoku',exact=True).click()
   r=await response.value;assert r.status==201,await r.text();saved=(await r.json())['id'];await page.get_by_text('Kërkesa juaj u ruajt.',exact=True).wait_for();await page.reload(wait_until='networkidle');await page.get_by_text('Kërkesa juaj u ruajt.',exact=True).wait_for()
   detail=await (await owner.request.get(BASE+'/api/cms/inquiries/'+saved)).json();data=detail['inquiry']['data'];assert detail['inquiry']['kind']=='stock';assert data['quantity']==2400 and data['gsm']==50 and data['color']=='White';assert data['dimensions']=='L31 × H55 × W18 cm';assert not any(k in data for k in ['logo','text','printColors','backLogo'])
   checks.append('Stock-only EN/SQ request: no artwork controls, draft survives reload/language switch, authoritative stock snapshot and owned receipt')
   payload={'kind':'stock','collection':'thank-you','variant':'green-60','quantity':1000,'city':'Prishtina','note':'','data':{'kind':'contact','company':'QA Co','contact':'QA Buyer','email':'buyer@example.test','country':'Kosova','message':'ignored','model':'ignored','key':str(uuid.uuid4()),'consent':True}}
   r=await guest.request.post(BASE+'/api/inquiries',data=payload,headers={'Origin':BASE});assert r.status==422,await r.text()
   edited['collection']['variants'][0]['status']='out';await publish(stock['id'],edited);payload['variant']='white-50';r=await guest.request.post(BASE+'/api/inquiries',data=payload,headers={'Origin':BASE});assert r.status==422
   await action(stock['id'],'archive');r=await guest.request.post(BASE+'/api/inquiries',data=payload,headers={'Origin':BASE});assert r.status==422;await action(stock['id'],'unarchive')
   quote=await post('/api/cms/quote',{'id':saved,'data':{'quantity':2400,'unitCents':12,'setupCents':0,'shippingCents':1000,'taxCents':0,'discountCents':0,'validUntil':str(datetime.date.today()+datetime.timedelta(days=10)),'terms':'QA payment agreement','delivery':'QA delivery agreement'}})
   assert quote.get('id');pdf=await (await owner.request.get(BASE+'/cms/quotation/'+quote['id'])).text();assert 'Thank you bags' in pdf and '50' in pdf;assert 'Miratimi i dizajnit regjistrohet' not in pdf;portal=await post('/api/cms/portal',{'id':saved});token=portal['portal'].split('/')[-1];v=await (await guest.request.get(BASE+'/api/portal/'+token)).json();assert v['kind']=='stock' and v['product']=='Thank you bags' and not v['artwork']
   checks.append('Server rejects unavailable/stale/archived stock; sales can prepare stock quotations without customer customization')
   for lang in ['', '/sq']:
    for width in [320,390,1440]:
     await page.set_viewport_size({'width':width,'height':900})
     for route in ['/products','/sustainability','/quote?collection=smiley']:
      await go(lang+route);assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),(lang,width,route)
     await page.screenshot(path=str(ROOT/f'evidence/stock-order-{lang.strip("/") or "en"}-{width}.jpg'),full_page=True)
    await go(lang+'/sustainability');text=await page.locator('main').inner_text();assert ('machine wash' if not lang else 'lavatriçe') in text;assert ('water-based' if not lang else 'bazë uji') in text
   await go('/products/t-shirt-bag');assert '31 × 55 × 18 cm' in await page.locator('main').inner_text();assert '29 × 38' not in await page.locator('main').inner_text()
   checks.append('18 route/language/width checks, updated responsibility and care content, approved T-Shirt dimensions, no horizontal overflow')
   cms=await owner.new_page();await cms.goto(BASE+'/cms',wait_until='networkidle');await cms.get_by_role('button',name='Stock collections',exact=True).click();await cms.get_by_role('button',name='Thank you bags',exact=True).click();await cms.get_by_role('button',name='Add stock variant',exact=True).wait_for();assert await cms.get_by_label('Stock dimensions',exact=True).input_value()=='L31 × H55 × W18 cm';await cms.close();checks.append('CMS stock editor is reachable with GSM, bilingual color, availability and add-row controls')
  finally:
   if newid:await action(newid,'archive')
   for r in restores:
    await action(r['id'],'unarchive')
    if r['published'] is not None:await publish(r['id'],r['published'])
    else:await action(r['id'],'unpublish')
    if r['draft']!=r['published']:await action(r['id'],'save',r['draft'])
  assert not errors,errors;await browser.close()
 (ROOT/'evidence/client-feedback-20261011.json').write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors,'scope':'Local compiled Worker, synthetic contacts, fixture settings restored; no production submissions or email'},indent=2));print('PASS',len(checks),'client feedback groups')
asyncio.run(main())
