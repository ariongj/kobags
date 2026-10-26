"""Read-only live regression checks; POSTs are allowed only for Cloudflare checks.

The public site currently has no optional analytics or consent-controlled embeds.
Verify the absence of tracking, actual essential storage and policy enforcement.
"""
import asyncio, json, sys
from pathlib import Path
from urllib.parse import urlsplit
from playwright.async_api import async_playwright, expect
from browser_support import launch

ROOT = Path(__file__).resolve().parents[1]
LIVE = '--live' in sys.argv
BASE = 'https://kobags-group.com' if LIVE else 'http://127.0.0.1:8787'
OUT = ROOT / 'deliverables/handoff/security-20261026'
PREFIX = 'live' if LIVE else 'local'
checks, samples, errors = [], [], []

async def main():
 OUT.mkdir(parents=True, exist_ok=True)
 async with async_playwright() as p:
  browser = await launch(p)
  async def context(width=393, blocked=False):
   ctx = await browser.new_context(viewport={'width':width,'height':900 if width>500 else 852}, is_mobile=width<500, has_touch=width<500, reduced_motion='reduce', extra_http_headers={'Cache-Control':'no-cache'})
   await ctx.add_init_script("window.__policyViolations=[];document.addEventListener('securitypolicyviolation',e=>window.__policyViolations.push({directive:e.effectiveDirective,blocked:e.blockedURI}));")
   if blocked:
    await ctx.add_init_script("for(const k of ['localStorage','sessionStorage'])Object.defineProperty(window,k,{get(){throw new DOMException('Storage blocked for QA','SecurityError')}});")
   async def guard(route):
    req=route.request; u=urlsplit(req.url)
    if req.method not in ['GET','HEAD','OPTIONS'] and not u.path.startswith('/cdn-cgi/challenge-platform/'):
     errors.append('Unexpected write blocked: '+u.path); await route.abort(); return
    await route.continue_()
   await ctx.route('**/*',guard)
   return ctx
  for width in [1440,393,320]:
   ctx=await context(width); page=await ctx.new_page(); page.set_default_timeout(20000)
   page.on('pageerror',lambda e:errors.append(str(e)))
   requests=[];page.on('request',lambda r:requests.append({'url':r.url,'type':r.resource_type,'method':r.method}))
   page.on('response',lambda r:errors.append('Failed asset: '+r.url) if r.status>=400 and r.request.resource_type in ['script','stylesheet','image','font','media'] else None)
   routes=['/','/manufacturing','/products','/contact','/quote','/cookies','/sq','/privacy','/sustainability','/resources','/certifications','/quote?collection=thank-you','/not-a-real-kobags-page']
   for path in routes:
    if width==320 and path not in ['/','/contact','/quote','/sq']: continue
    requests.clear(); response=await page.goto(BASE+path,wait_until='networkidle',timeout=60000)
    assert response.status==(404 if path.startswith('/not-') else 200),(path,response.status)
    assert await page.locator('h1').count()==1,(path,'one h1')
    assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),(path,width,'overflow')
    assert not await page.evaluate('window.__policyViolations'),(path,await page.evaluate('window.__policyViolations'))
    assert not any('/api/demo' in r['url'] for r in requests),(path,'unnecessary session')
    outside=[r for r in requests if urlsplit(r['url']).scheme in ['http','https'] and urlsplit(r['url']).netloc!=urlsplit(BASE).netloc]
    assert not outside,(path,'third-party connections',outside)
    state=await page.evaluate("({local:Object.keys(localStorage),session:Object.keys(sessionStorage),images:[...document.images].map(i=>({src:i.currentSrc,width:i.width,height:i.height,natural:i.naturalWidth,loading:i.loading})),violations:window.__policyViolations})")
    cookie_names=[c['name'] for c in await ctx.cookies()]
    assert not any('kobags' in c for c in cookie_names),(path,cookie_names)
    if path=='/':
     assert not state['local'] and not state['session'],state
     assert not any(r['type']=='media' for r in requests),'Video must wait for playback'
     nonce=response.headers.get('content-security-policy','')
     assert "'nonce-" in nonce and "script-src-attr 'none'" in nonce and "unsafe-eval" not in nonce,nonce
     assert await page.evaluate("[...document.scripts].filter(s=>!s.src&&s.textContent.trim()).every(s=>Boolean(s.nonce))"),'Inline scripts need nonces'
    if width!=320 and path in ['/','/manufacturing','/products','/contact','/quote','/cookies','/sq']:
     await page.screenshot(path=str(OUT/f'{PREFIX}-{width}-{path.strip("/") or "home"}.png'),full_page=True)
    samples.append({'width':width,'path':path,'status':response.status,'cookies':cookie_names,'storage':state,'requests':requests.copy()})
   if width==393:
    await page.goto(BASE+'/products',wait_until='networkidle')
    menu=page.get_by_role('button',name='Toggle menu',exact=True)
    await menu.click();await expect(menu).to_have_attribute('aria-expanded','true')
    await page.keyboard.press('Escape');await expect(menu).to_have_attribute('aria-expanded','false')
    assert await menu.evaluate('(e)=>document.activeElement===e')
    await page.locator('a.language').click();await page.wait_for_url('**/sq/products');assert await page.locator('html').get_attribute('lang')=='sq'
    await page.locator('a.language').click();await page.wait_for_url('**/products');assert await page.locator('html').get_attribute('lang')=='en'
    await page.goto(BASE+'/certifications#iso-9001',wait_until='networkidle');await page.wait_for_timeout(300)
    assert await page.evaluate('scrollY')>0,'Anchor must reach certificate'
    y=await page.evaluate('scrollY');await page.reload(wait_until='networkidle');assert abs(await page.evaluate('scrollY')-y)<150,'Reload must retain anchor'
    await page.locator('.certificate-scan').first.click();await page.get_by_role('dialog').wait_for()
    await page.keyboard.press('Escape');await page.get_by_role('dialog').wait_for(state='hidden')
    await page.goto(BASE+'/manufacturing',wait_until='networkidle');await page.evaluate('window.scrollTo(0,650)');await page.wait_for_timeout(100)
    y=await page.evaluate('scrollY');await page.reload(wait_until='networkidle');assert abs(await page.evaluate('scrollY')-y)<150,'Refresh must not reset scroll'
    await page.goto(BASE+'/contact',wait_until='networkidle');await page.go_back(wait_until='networkidle');assert abs(await page.evaluate('scrollY')-y)<150,'Back must restore scroll'
    checks.append('Mobile menu opens, Escape restores focus; EN/SQ switching; anchors, reload and back preserve scroll')
   await ctx.close()
   checks.append(f'{width}px: public routes, navigation, layouts, same-origin resources, no background video/analytics, no application cookie')
  ctx=await context();page=await ctx.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
  await page.goto(BASE+'/quote',wait_until='networkidle')
  await page.evaluate("localStorage.setItem('kobags-quote-step','3');localStorage.setItem('qa-unrelated','keep')")
  await page.reload(wait_until='networkidle')
  await page.locator('#q-company').fill('QA preserved draft')
  other=await ctx.new_page();await other.goto(BASE+'/quote',wait_until='networkidle')
  assert await other.locator('#q-company').input_value()=='QA preserved draft'
  await page.locator('#q-company').fill('QA cross-tab update')
  await other.wait_for_function("document.querySelector('#q-company')?.value==='QA cross-tab update'")
  await page.reload(wait_until='networkidle');assert await page.locator('#q-company').input_value()=='QA cross-tab update'
  await page.goto(BASE+'/cookies',wait_until='networkidle');await page.get_by_role('button',name='Clear this browser’s design draft',exact=True).click()
  await page.get_by_role('status').wait_for();assert await page.evaluate("localStorage.getItem('qa-unrelated')")=='keep'
  assert await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1')).company")!='QA cross-tab update'
  await other.wait_for_function("document.querySelector('#q-company')?.value!== 'QA cross-tab update'")
  checks.append('Draft survives reload; edits and explicit clearing synchronize across tabs; unrelated storage preserved')
  await page.goto(BASE+'/',wait_until='networkidle')
  await page.evaluate("()=>{const s=document.createElement('script');s.textContent='window.__untrustedScriptRan=true';document.head.appendChild(s);const b=document.createElement('button');b.setAttribute('onclick','window.__untrustedHandlerRan=true');document.body.appendChild(b);b.click();b.remove();}")
  assert not await page.evaluate('Boolean(window.__untrustedScriptRan||window.__untrustedHandlerRan)')
  checks.append('Browser blocks nonced-policy violations: injected inline script and event handler do not execute')
  await ctx.close()
  ctx=await context(blocked=True);page=await ctx.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
  await page.goto(BASE+'/contact',wait_until='networkidle')
  await page.locator('#inquiry-company').fill('QA storage blocked');assert await page.locator('#inquiry-company').input_value()=='QA storage blocked'
  await page.get_by_role('button',name='Save inquiry',exact=True).click()
  assert await page.locator('#inquiry-contact').evaluate('(e)=>!e.validity.valid'),'Empty form remains validated'
  await page.locator('a.language').click();await page.wait_for_url('**/sq/contact');assert await page.locator('html').get_attribute('lang')=='sq'
  assert not await page.evaluate('window.__policyViolations')
  await page.goto(BASE+'/quote',wait_until='networkidle')
  await page.get_by_role('button',name='Continue',exact=True).click()
  await page.get_by_role('button',name='Continue',exact=True).click()
  await page.locator('#q-city').fill('Prishtina')
  await page.get_by_role('button',name='Continue',exact=True).click()
  await page.locator('#q-company').fill('QA memory-only quote')
  assert await page.locator('#q-company').input_value()=='QA memory-only quote'
  checks.append('Blocked local/session storage: form typing, required validation and language switch remain usable')
  await ctx.close();await browser.close()
 assert not errors,errors
 (OUT/f'{PREFIX}-privacy-browser.json').write_text(json.dumps({'status':'passed','scope':BASE,'checks':checks,'samples':samples,'browserErrors':errors,'consent':'No optional analytics, tracking widgets or statistics are deployed. Accept/reject/expiry/withdrawal for optional tracking are not applicable; no dummy consent banner added.'},indent=2))
 print(json.dumps({'status':'passed','scope':BASE,'checks':checks},indent=2),flush=True)

asyncio.run(main())
