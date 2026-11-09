"""Focused browser checks for the website polish; never submits a valid request."""
import argparse
import asyncio
import base64
import json
from pathlib import Path
from urllib.parse import urlparse, urlunparse

from browser_support import launch
from playwright.async_api import async_playwright

ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser()
parser.add_argument('--base',default='http://localhost:8787')
parser.add_argument('--phase',default='after-local')
args=parser.parse_args()
assert urlparse(args.base).hostname in ('localhost','127.0.0.1','kobags.itdks.tech','kobags-group.com','www.kobags-group.com')
OUT=ROOT/'deliverables/handoff/website-polish-20261109'/args.phase
OUT.mkdir(parents=True,exist_ok=True)

async def main():
 result={'base':args.base,'checks':[],'blockedWrites':[],'mockedSubmissions':[],'errors':[]}
 capture_submission=False
 def check(name,passed,detail=None):
  row={'name':name,'passed':bool(passed),'detail':detail};result['checks'].append(row);print(json.dumps(row),flush=True)
 async with async_playwright() as p:
  browser=await launch(p)
  ctx=await browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=1,reduced_motion='reduce',service_workers='block')
  async def guard(route):
   path=urlparse(route.request.url).path
   if capture_submission and path=='/api/demo' and route.request.method=='GET':
    await route.fulfill(status=200,content_type='application/json',body=json.dumps({'state':{'requests':[],'inquiries':[],'settings':{'moq':5000}}}));return
   if route.request.method not in ('GET','HEAD'):
    if capture_submission and path in ('/api/demo','/api/inquiries') and route.request.method=='POST':
     result['mockedSubmissions'].append({'url':route.request.url,'payload':route.request.post_data_json})
     await route.fulfill(status=503,content_type='application/json',body='{"error":"QA_CAPTURED_WITHOUT_SERVER_WRITE"}');return
    result['blockedWrites'].append({'method':route.request.method,'url':route.request.url});await route.abort('blockedbyclient')
   else:await route.continue_()
  await ctx.route('**/*',guard)
  page=await ctx.new_page();page.set_default_timeout(20000)
  page.on('pageerror',lambda e:result['errors'].append(str(e)))
  async def go(route):
   r=await page.goto(args.base+route,wait_until='networkidle');assert r.status==200,(route,r.status)
  async def shot(name):
   await page.evaluate('document.activeElement?.blur();window.scrollTo(0,0)')
   await page.screenshot(path=str(OUT/(name+'.jpg')),type='jpeg',quality=82,full_page=True)
  async def nav():
   await go('/')
   await page.keyboard.press('Tab')
   check('Keyboard first stop is skip link',await page.evaluate("document.activeElement?.getAttribute('href')==='#main-content'"),await page.evaluate("document.activeElement?.outerHTML"))
   menu=page.locator('.mobile-toggle');await menu.click()
   check('Mobile menu opens and focuses navigation',await menu.get_attribute('aria-expanded')=='true' and await page.evaluate("!!document.activeElement?.closest('#site-navigation')"))
   await page.keyboard.press('Escape')
   check('Escape closes menu and restores opener',await menu.get_attribute('aria-expanded')=='false' and await menu.evaluate('(e)=>e===document.activeElement'))
   await menu.click();await page.locator('.nav.open a[href$="/products"]').click();await page.wait_for_load_state('networkidle')
   check('Menu navigation closes',await menu.get_attribute('aria-expanded')=='false' and '/products' in page.url)
  async def catalog():
   await go('/products')
   await page.locator('#handle-filter').click();await page.get_by_role('option',name='Short handles',exact=True).click()
   count=await page.locator('.catalog-grid article').count();check('Handle filter narrows to two families',count==2,count)
   await page.locator('.catalog-grid article').nth(0).get_by_role('checkbox').check()
   await page.locator('.catalog-grid article').nth(1).get_by_role('checkbox').check()
   check('Filter and comparison appear in URL','handle=' in page.url and 'compare=' in page.url,page.url)
   table=page.locator('.comparison [data-slot="table-container"]');await table.scroll_into_view_if_needed();await table.focus()
   before=await table.evaluate('(e)=>e.scrollLeft');await page.keyboard.press('ArrowRight');await page.wait_for_timeout(150)
   scroll=await table.evaluate('(e)=>({x:e.scrollLeft,width:e.clientWidth,scrollWidth:e.scrollWidth})')
   check('Comparison has keyboard scrolling and visible swipe hint',scroll['x']>before and await page.locator('.comparison-scroll-hint').is_visible(),scroll)
   check('Comparison fabric weights include units','g/m²' in await table.inner_text())
   await table.evaluate('(e)=>e.scrollLeft=0')
   bounds=await table.bounding_box();cdp=await ctx.new_cdp_session(page)
   x=bounds['x']+bounds['width']*.8;y=bounds['y']+50
   await cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
   for dx in [25,50,75,100]:await cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x-dx,'y':y}]})
   await cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});await page.wait_for_timeout(150)
   check('Comparison responds to touch swipe',await table.evaluate('(e)=>e.scrollLeft')>0)
   await cdp.detach()
   await shot('mobile-catalog-comparison')
   await page.locator('.catalog-grid article .product-photo').first.click();await page.wait_for_load_state('networkidle')
   await page.go_back(wait_until='networkidle')
   check('Browser Back restores filter and comparison',await page.locator('.catalog-grid article').count()==2 and await page.get_by_role('checkbox',checked=True).count()==2,page.url)
   await page.locator('.catalog-grid article .product-photo').first.click();await page.wait_for_load_state('networkidle')
   await page.locator('.breadcrumb').click();await page.wait_for_load_state('networkidle')
   check('Product breadcrumb restores filter and comparison',await page.locator('.catalog-grid article').count()==2 and await page.get_by_role('checkbox',checked=True).count()==2,page.url)
   await page.reload(wait_until='networkidle')
   check('Reload preserves catalog selection',await page.locator('.catalog-grid article').count()==2 and await page.get_by_role('checkbox',checked=True).count()==2)
   await page.evaluate("history.replaceState(null,'',location.pathname+location.search+'#comparison')")
   lang=page.locator('a.language');await lang.focus()
   href=await lang.get_attribute('href')
   check('Locale link preserves current query and hash','handle=' in href and 'compare=' in href and href.endswith('#comparison'),href)
   await lang.click();await page.wait_for_load_state('networkidle')
   check('Albanian switch preserves filters and comparison',await page.locator('html').get_attribute('lang')=='sq' and await page.locator('.catalog-grid article').count()==2 and await page.get_by_role('checkbox',checked=True).count()==2,page.url)
   headers=await page.locator('.comparison th').all_text_contents()
   titles=await page.locator('.catalog-grid article h2').all_text_contents()
   check('Albanian comparison headers match localized product names',bool(headers) and headers[0]=='Specifikimi' and headers[1:]==titles,{'headers':headers,'cardTitles':titles})
   await shot('mobile-sq-catalog-comparison')
  async def gallery():
   await go('/products/box-bag');await page.get_by_role('button',name='Inspect photo',exact=True).click()
   viewer=page.locator('.product-photo-viewer');counter=page.locator('.product-photo-dialog-footer > span')
   await viewer.focus();before=await counter.inner_text();await page.keyboard.press('ArrowRight')
   check('Unzoomed arrow advances photo',await counter.inner_text()!=before)
   await page.get_by_role('button',name='Zoom in',exact=True).click();await viewer.focus()
   before=await counter.inner_text();scroll=await viewer.evaluate('(e)=>({x:e.scrollLeft,width:e.clientWidth,scrollWidth:e.scrollWidth})')
   await page.keyboard.press('ArrowRight');await page.wait_for_timeout(150)
   after=await viewer.evaluate('(e)=>e.scrollLeft')
   check('Zoomed arrow pans without changing photo',before==await counter.inner_text() and (scroll['scrollWidth']<=scroll['width'] or after>scroll['x']),{'before':scroll,'after':after,'photo':await counter.inner_text()})
   await shot('mobile-product-zoom')
   await page.keyboard.press('Escape')
   check('Gallery Escape restores Inspect photo focus',await page.get_by_role('button',name='Inspect photo',exact=True).evaluate('(e)=>e===document.activeElement'))
  async def quote():
   await go('/quote');await page.evaluate("localStorage.removeItem('kobags-design-v1');localStorage.setItem('kobags-quote-step','0')");await page.reload(wait_until='networkidle')
   families=[('D-Cut Bag','30 × 31 × 5 cm',60),('Handle Bag','30 × 30 × 5 cm',60),('Box Bag','33 × 25 × 12 cm',80),('T-Shirt Bag','31 × 55 × 18 cm',50),('String Bag','30 × 40 cm',50)]
   check('Quote offers all five visual bag families',await page.locator('#q-product button').count()==5)
   for name,dimensions,gsm in families:
    button=page.locator('#q-product').get_by_role('button',name=name,exact=True);await button.click()
    summary=await page.locator('.quote-summary').inner_text()
    check('Quote specifications match '+name,dimensions in summary and str(gsm)+' GSM' in summary and await button.get_attribute('aria-pressed')=='true',{'dimensions':dimensions,'gsm':gsm})
    await page.locator('.quote-product-photo img').evaluate('(e)=>e.decode().catch(()=>{})')
    check('Quote shows a loaded product photo for '+name,await page.locator('.quote-product-photo img').evaluate('(e)=>e.complete&&e.naturalWidth>0'))
   await page.locator('#q-customDimensions').fill('42 × 36 × 12 cm')
   check('Custom dimensions appear in quote summary','42 × 36 × 12 cm' in await page.locator('.quote-summary').inner_text())
   check('Custom dimensions leave fabric weight for confirmation','GSM to confirm' in await page.locator('.quote-summary').inner_text())
   await page.locator('#q-customDimensions').fill('')
   await shot('mobile-quote-bag-picker')
   next_button=page.get_by_role('button',name='Continue',exact=True)
   await next_button.click()
   check('Continue focuses the next step heading',await page.evaluate("document.activeElement?.tagName==='H2'"),await page.evaluate('document.activeElement?.textContent'))
   check('Quote exposes one current step',await page.locator('[aria-current="step"]').count()==1)
   await page.locator('#q-color').click();await page.get_by_role('option',name='Black',exact=True).click()
   check('Selected bag color appears in summary','Black' in await page.locator('.quote-summary').inner_text())
   await page.get_by_role('button',name='Back',exact=True).click()
   check('Back focuses the previous step heading',await page.evaluate("document.activeElement?.tagName==='H2'"))
   await next_button.click();await next_button.click();await page.locator('#quantity').fill('4999');await next_button.click()
   check('Quote rejects below minimum without submission',await page.get_by_role('alert').count()>0)
   await page.locator('#quantity').fill('5000');await page.locator('#q-city').fill('Prishtina');await next_button.click()
   check('Company fields expose autocomplete',await page.locator('#q-company').get_attribute('autocomplete')=='organization' and await page.locator('#q-email').get_attribute('autocomplete')=='email')
   await shot('mobile-quote-company')
   await page.locator('a.language').click();await page.wait_for_load_state('networkidle')
   check('Albanian quote keeps current step and quantity',await page.locator('html').get_attribute('lang')=='sq' and await page.locator('#q-company').count()==1)
  async def studio_reference():
   if urlparse(args.base).hostname in ('localhost','127.0.0.1'):
    await ctx.set_extra_http_headers({'Host':'kobags.itdks.tech'})
   await go('/quote')
   original=await page.evaluate("localStorage.getItem('kobags-design-v1')")
   fixture=json.loads(original)
   preview='data:image/webp;base64,'+base64.b64encode((ROOT/'public/assets/box-bag-320.webp').read_bytes()).decode()
   reference={'source':'ariongj-mo-b23cd8f','productName':'Box bag','size':'L','dimensions':'40 × 38 × 17 cm','fabric':'#efeee9','front':preview,'back':preview}
   fixture.update({'product':'box-bag','size':'Small','color':'Natural','quantity':5000,'customDimensions':reference['dimensions'],'referenceStudio':reference,'logo':preview,'backLogo':preview,'logoName':'Studio front artwork','backLogoName':'Studio back artwork','note':'QA customer note.\n\n[3D studio]\nQA preserved reference\n[/3D studio]'})
   await page.evaluate("(draft)=>{localStorage.setItem('kobags-design-v1',JSON.stringify(draft));localStorage.setItem('kobags-quote-step','2')}",fixture)
   await page.reload(wait_until='networkidle')
   summary=await page.locator('.quote-summary').inner_text()
   check('Restored studio reference keeps exact dimensions and unconfirmed GSM',reference['dimensions'] in summary and 'GSM to confirm' in summary)
   check('Restored studio reference shows exact fabric color',reference['fabric'].upper() in summary)
   await page.locator('#quantity').fill('10000')
   draft=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   check('Quantity edit preserves studio handoff and both previews',draft.get('referenceStudio')==reference and draft['logo']==preview and draft['backLogo']==preview)
   await page.locator('.quote-progress button').nth(1).click()
   check('Bag color picker retains studio color',reference['fabric'].upper() in await page.locator('#q-color').inner_text())
   await page.locator('#q-color').click();await page.get_by_role('option',name='Black',exact=True).click()
   draft=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   check('Explicit palette color invalidates obsolete studio reference',not draft.get('referenceStudio') and draft['color']=='Black')
   await page.evaluate("(draft)=>{localStorage.setItem('kobags-design-v1',JSON.stringify(draft));localStorage.setItem('kobags-quote-step','0')}",fixture)
   await page.reload(wait_until='networkidle')
   await page.get_by_role('button',name='Edit specifications',exact=True).click()
   await page.locator('#q-product').get_by_role('button',name='Handle Bag',exact=True).click()
   draft=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   check('Changing family removes obsolete studio reference but keeps customer note',not draft.get('referenceStudio') and not draft['logo'] and not draft['backLogo'] and draft['note']=='QA customer note.' and not draft['customDimensions'])
   await page.evaluate("(draft)=>{localStorage.setItem('kobags-design-v1',draft);localStorage.setItem('kobags-quote-step','0')}",original)
  async def stock():
   await go('/quote?collection=thank-you')
   check('Thank you collection has stock choices',await page.locator('.stock-form select option:not([value=""])').count()==5)
   check('Finished stock has no custom bag picker',await page.locator('#q-product,.quote-bag-options').count()==0)
   await page.locator('.stock-form select').select_option('gsm-60-black');await page.reload(wait_until='networkidle')
   check('Stock selection survives refresh',await page.locator('.stock-form select').input_value()=='gsm-60-black')
   await go('/quote?collection=smiley')
   check('Unavailable collection cannot be ordered',await page.locator('.stock-form').count()==0 and await page.get_by_role('heading',name='Temporarily out of stock',exact=True).count()==1)
  async def standard_handoff():
   if urlparse(args.base).hostname in ('localhost','127.0.0.1'):await ctx.set_extra_http_headers({'Host':'kobags.itdks.tech'})
   await go('/quote');draft=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   preview='data:image/webp;base64,'+base64.b64encode((ROOT/'public/assets/box-bag-320.webp').read_bytes()).decode()
   draft.update({'product':'box-bag','size':'Small','customDimensions':'40 × 38 × 17 cm','referenceStudio':{'source':'ariongj-mo-b23cd8f','productName':'Old box','size':'L','dimensions':'40 × 38 × 17 cm','fabric':'#efeee9','front':preview,'back':preview},'logo':preview,'backLogo':preview,'text':'','backText':'','elements':[]})
   await page.evaluate("(d)=>{localStorage.setItem('kobags-design-v1',JSON.stringify(d));localStorage.setItem('kobags-quote-step','0')}",draft)
   await go('/products/box-bag');await page.locator('#detail-size').click();await page.get_by_role('option',name='Large · 40 × 40 × 20 cm',exact=True).click()
   await page.locator('.product-detail-copy').get_by_role('button',name='Request a quote',exact=True).click();await page.wait_for_load_state('networkidle')
   current=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   check('Standard product CTA replaces prior custom/studio dimensions',current['product']=='box-bag' and current['size']=='Large' and not current.get('referenceStudio') and not current['customDimensions'] and '40 × 40 × 20 cm' in await page.locator('.quote-summary').inner_text())
  async def quote_payload():
   nonlocal capture_submission
   capture_submission=True
   if urlparse(args.base).hostname in ('localhost','127.0.0.1'):await ctx.set_extra_http_headers({'Host':'kobags.itdks.tech'})
   await go('/quote');draft=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   draft.update({'product':'handle-bag','size':'Small','customDimensions':'','referenceStudio':None,'logo':'','backLogo':'','text':'YOUR\nBRAND','backText':'','elements':[{'id':'qa-default','kind':'text','side':'front','text':'YOUR\nBRAND','x':50,'y':50,'scale':1,'rotation':0}],'company':'Fictional QA company','contact':'QA reviewer','email':'qa@example.test','city':'Prishtina','country':'Kosovo','quantity':5000,'consent':True,'note':'Intercepted browser acceptance check; no server write.'})
   await page.evaluate("(d)=>{localStorage.setItem('kobags-design-v1',JSON.stringify(d));localStorage.setItem('kobags-quote-step','3')}",draft)
   await page.reload(wait_until='networkidle')
   async with page.expect_response(lambda r:r.request.method=='POST' and urlparse(r.url).path in ('/api/demo','/api/inquiries')):
    await page.get_by_role('button',name='Send quote request',exact=True).click()
   payload=result['mockedSubmissions'][-1]['payload'];sent=payload.get('design',{})
   check('Intercepted quote omits placeholder text and text layers',sent.get('text')=='' and not any(e.get('text','').strip()=='YOUR\nBRAND' for e in sent.get('elements',[])),{'text':sent.get('text'),'elements':sent.get('elements')})
   current=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
   check('Quote representation leaves original browser draft intact',current['text']=='YOUR\nBRAND' and any(e.get('id')=='qa-default' for e in current.get('elements',[])))
   capture_submission=False
  async def narrow():
   await page.set_viewport_size({'width':320,'height':700})
   for route in ['/','/products','/products/box-bag','/quote','/quote?collection=thank-you','/contact','/sq/contact']:
    await go(route)
    data=await page.evaluate('({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})')
    check('320px page fits '+route,data['width']==data['scrollWidth'],data)
   await page.set_viewport_size({'width':390,'height':844})
  async def media():
   for route in ['/','/manufacturing']:
    await go(route)
    for i in range(await page.locator('.factory-reel').count()):
     reel=page.locator('.factory-reel').nth(i);video=reel.locator('video')
     await reel.locator('button.factory-reel-play').click()
     try:await page.wait_for_function('(i)=>{const v=document.querySelectorAll(".factory-reel video")[i];return v.currentTime>.1||v.error}',arg=i,timeout=15000)
     except Exception:pass
     data=await video.evaluate('(v)=>({source:v.currentSrc,time:v.currentTime,readyState:v.readyState,width:v.videoWidth,height:v.videoHeight,error:v.error?.message||null})')
     check('Video plays '+route+' '+str(i),data['time']>.1 and not data['error'],data)
     ratio=await video.evaluate('(v)=>({css:v.clientWidth/v.clientHeight,native:v.videoWidth/v.videoHeight,fit:getComputedStyle(v).objectFit})')
     if route=='/manufacturing':check('Video keeps its native aspect '+route+' '+str(i),abs(ratio['css']-ratio['native'])<.04 or ratio['fit']=='contain',ratio)
     await video.evaluate('(v)=>v.pause()')
  async def guides():
   for route in ['/manufacturing','/sq/manufacturing','/sustainability','/sq/sustainability']:
    await go(route)
    anchors=await page.locator('main a[href^="#"]').evaluate_all('(els)=>els.map(e=>({href:e.getAttribute("href"),target:!!document.getElementById(e.getAttribute("href").slice(1))}))')
    check('Page guide anchors resolve '+route,bool(anchors) and all(a['target'] for a in anchors),anchors)
    if 'sustainability' in route:
     details=page.locator('.responsibility-questions details');await details.first.locator('summary').click()
     check('Responsibility guidance expands '+route,await details.first.get_attribute('open') is not None)
  for name,fn in [('navigation',nav),('catalog',catalog),('gallery',gallery),('quote',quote),('studio reference',studio_reference),('standard handoff',standard_handoff),('quote payload',quote_payload),('stock',stock),('narrow',narrow),('media',media),('guides',guides)]:
   try:await fn()
   except Exception as e:check(name+' journey completes',False,str(e))
   finally:
    if name in ('studio reference','standard handoff','quote payload'):await ctx.set_extra_http_headers({})
    if name=='quote payload':capture_submission=False
   (OUT/'journey-results.json').write_text(json.dumps(result,indent=2))
  application_writes=[r for r in result['blockedWrites'] if '/cdn-cgi/' not in r['url']]
  check('No application writes attempted',not application_writes,{'applicationWrites':application_writes,'blockedInfrastructurePosts':len(result['blockedWrites'])-len(application_writes)})
  check('No browser runtime errors',not result['errors'],result['errors'])
  previous=ROOT/'deliverables/handoff/website-polish-20261109/before/audit-results.json'
  if previous.exists():
   before_data=json.loads(previous.read_text())
   before_host=urlparse(before_data['base']).hostname
   paths=set()
   for row in before_data['pages']:
    for link in row.get('links',[]):
     parsed=urlparse(link['href'])
     if parsed.hostname in ('kobags.itdks.tech','kobags-group.com','www.kobags-group.com'):
      paths.add(urlunparse(('','',parsed.path,parsed.params,parsed.query,'')) if parsed.hostname==before_host else urlunparse((parsed.scheme,parsed.netloc,parsed.path,parsed.params,parsed.query,'')))
   limiter=asyncio.Semaphore(4)
   async def get_link(path):
    async with limiter:
     try:
      response=await ctx.request.get(path if path.startswith('https://') else args.base+path,timeout=30000)
      return {'path':path,'status':response.status,'url':response.url}
     except Exception as e:return {'path':path,'error':str(e)}
   links=await asyncio.gather(*(get_link(path) for path in sorted(paths)))
   (OUT/'link-results.json').write_text(json.dumps(links,indent=2))
   bad=[row for row in links if row.get('status',599)>=400]
   check('Discovered internal links resolve',not bad,{'count':len(links),'failures':bad})
   if urlparse(args.base).hostname not in ('localhost','127.0.0.1'):
    response=await ctx.request.get('https://kobags-group.com/',timeout=30000)
    check('Primary custom domain responds',response.status==200,{'status':response.status,'url':response.url})
  (OUT/'journey-results.json').write_text(json.dumps(result,indent=2))
  await browser.close()

asyncio.run(main())
