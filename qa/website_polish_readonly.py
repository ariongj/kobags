"""Read-only public-site review. Every non-GET/HEAD request is blocked."""
import argparse
import asyncio
import json
from pathlib import Path
from urllib.parse import urlparse

from browser_support import launch
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--base', default='https://kobags.itdks.tech')
parser.add_argument('--phase', default='before')
parser.add_argument('--quick', action='store_true')
parser.add_argument('--route', action='append')
parser.add_argument('--device', choices=['both','desktop','mobile'], default='both')
parser.add_argument('--mobile-width', type=int, default=390)
args = parser.parse_args()
assert urlparse(args.base).hostname in ('kobags.itdks.tech', 'kobags-group.com', 'www.kobags-group.com', 'localhost', '127.0.0.1')
OUT = ROOT / 'deliverables/handoff/website-polish-20261109' / args.phase
OUT.mkdir(parents=True, exist_ok=True)

INSPECT = """() => {
 const visible=e=>!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length);
 const nav=performance.getEntriesByType('navigation')[0];
 const resources=performance.getEntriesByType('resource');
 return {
  title:document.title,lang:document.documentElement.lang,h1:[...document.querySelectorAll('h1')].map(e=>e.textContent),
  viewport:{width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth},
  overflow:[...document.querySelectorAll('main *')].filter(e=>visible(e)&&(e.getBoundingClientRect().right>innerWidth+2||e.getBoundingClientRect().left<-2)).slice(0,12).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,100)})),
  images:[...document.images].filter(e=>visible(e)&&(!e.complete||!e.naturalWidth)).map(e=>({src:e.currentSrc,alt:e.alt})),
  links:[...document.querySelectorAll('a[href]')].map(e=>({href:e.href,text:e.textContent.trim(),label:e.getAttribute('aria-label')})),
  perf:{ttfb:Math.round(nav.responseStart),domContentLoaded:Math.round(nav.domContentLoadedEventEnd),load:Math.round(nav.loadEventEnd),lcp:Math.round(window.__qaLcp||0),cls:window.__qaCls||0,requests:resources.length,transferBytes:resources.reduce((s,r)=>s+r.transferSize,0),decodedBytes:resources.reduce((s,r)=>s+r.decodedBodySize,0),largest:resources.map(r=>({url:r.name,bytes:r.decodedBodySize,ms:Math.round(r.duration),type:r.initiatorType})).sort((a,b)=>b.bytes-a.bytes).slice(0,8)},
  formControls:[...document.querySelectorAll('input,textarea,select')].filter(visible).map(e=>({id:e.id,type:e.type,fontSize:getComputedStyle(e).fontSize,label:e.labels?.[0]?.textContent||e.getAttribute('aria-label')})),
  studioLinks:[...document.querySelectorAll('a[href]')].filter(e=>/\\/(design|studio)([/?#]|$)/.test(e.getAttribute('href'))).map(e=>e.getAttribute('href'))
 };
}"""

async def main():
 report={'base':args.base,'phase':args.phase,'conditions':{'browser':'Chromium headless','network':'VPS connection, no throttling; browser HTTP cache disabled by request interception','gpu':'SwiftShader software rendering','mobile':f'{args.mobile_width} × 844 CSS pixels, touch emulation, DPR 1; not a physical iPhone'},'pages':[],'blockedWrites':[]}
 routes=['/','/products','/products/box-bag','/manufacturing','/sustainability','/partners','/quote','/contact','/quote?collection=thank-you','/quote?collection=smiley','/sq','/sq/products','/sq/quote','/sq/contact']
 if args.quick: routes=['/','/products','/quote','/contact']
 else: routes += ['/certifications','/samples','/partners/apply','/resources','/industries','/industries/retail','/bags-kosovo','/blog','/privacy','/terms','/cookies']
 if args.route: routes=args.route
 async with async_playwright() as p:
  browser=await launch(p)
  report['conditions']['version']=browser.version
  for label,width,height in [('desktop',1440,1000),('mobile',args.mobile_width,844)]:
   if args.device!='both' and args.device!=label:continue
   ctx=await browser.new_context(viewport={'width':width,'height':height},is_mobile=label=='mobile',has_touch=label=='mobile',device_scale_factor=1,reduced_motion='reduce',service_workers='block')
   async def guard(route):
    if route.request.method not in ('GET','HEAD'):
     report['blockedWrites'].append({'method':route.request.method,'url':route.request.url})
     await route.abort('blockedbyclient')
    else: await route.continue_()
   await ctx.route('**/*',guard)
   await ctx.add_init_script("""window.__qaLcp=0;window.__qaCls=0;new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__qaLcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__qaCls+=e.value})).observe({type:'layout-shift',buffered:true});""")
   page=await ctx.new_page();page.set_default_timeout(20000)
   for route in routes:
    errors=[];failed=[];http=[]
    def error(e):errors.append(str(e))
    def failure(r):failed.append({'url':r.url,'failure':r.failure})
    def response(r):
     if r.status>=400:http.append({'url':r.url,'status':r.status})
    page.on('pageerror',error);page.on('requestfailed',failure);page.on('response',response)
    try:
     res=await page.goto(args.base+route,wait_until='networkidle',timeout=45000)
     await page.wait_for_timeout(250)
     initial=await page.evaluate(INSPECT)
     # Scroll to load only the page's ordinary lazy images; never open studio.
     await page.evaluate('window.scrollTo(0,document.body.scrollHeight)')
     await page.wait_for_timeout(350)
     await page.evaluate('document.activeElement?.blur();window.scrollTo(0,0)')
     await page.wait_for_timeout(200)
     data=await page.evaluate(INSPECT)
     data['initialPerf']=initial['perf']
     if route in routes[:14] or args.quick:
      name=route.strip('/').replace('/','-').replace('?collection=','-') or 'home'
      shot=f'{label}-{name}.jpg'
      if not (OUT/shot).exists():
       await page.screenshot(path=str(OUT/shot),type='jpeg',quality=82,full_page=True)
      data['screenshot']=shot
     if not args.quick:
      await page.evaluate((ROOT/'node_modules/axe-core/axe.min.js').read_text())
      data['a11y']=await page.evaluate("""async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}});return r.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary}))}))}""")
     report['pages'].append({'device':label,'route':route,'status':res.status,'url':page.url,**data,'errors':errors,'failed':failed,'httpErrors':http})
     print(json.dumps({'device':label,'route':route,'status':res.status,'pageOverflow':data['viewport']['scrollWidth']>width,'brokenImages':len(data['images']),'a11y':[(v['id'],len(v['nodes'])) for v in data.get('a11y',[])],'errors':errors,'http':http,'lcpMs':initial['perf']['lcp'],'transferBytes':initial['perf']['transferBytes']}),flush=True)
    except Exception as e:
     report['pages'].append({'device':label,'route':route,'exception':str(e),'errors':errors,'httpErrors':http});print('ERROR',label,route,str(e),flush=True)
    finally:
     page.remove_listener('pageerror',error);page.remove_listener('requestfailed',failure);page.remove_listener('response',response)
     (OUT/('quick-results.json' if args.quick else 'audit-results.json')).write_text(json.dumps(report,indent=2))
   await ctx.close()
  await browser.close()

asyncio.run(main())
