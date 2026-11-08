import asyncio,json,sys
from pathlib import Path
from urllib.parse import urlsplit
from datetime import datetime,timezone
from playwright.async_api import async_playwright
sys.path.insert(0,str(Path(__file__).resolve().parent))
from browser_support import launch
LIVE='--live' in sys.argv
MODE='exact-live' if LIVE else 'exact-local'
OUT=Path(__file__).resolve().parents[1]/'deliverables/handoff/studio-20261108'
OUT.mkdir(parents=True,exist_ok=True)
async def main():
 async with async_playwright() as p:
  b=await launch(p);c=await b.new_context(viewport={'width':320,'height':852},extra_http_headers={'Cache-Control':'no-cache'});page=await c.new_page();checks=[]
  fail_studio=False
  async def route(r):
   u=urlsplit(r.request.url)
   if fail_studio and '/assets/reference-studio/studio-' in u.path and u.path.endswith('.js'):return await r.abort()
   if r.request.method not in ['GET','HEAD','OPTIONS'] and not u.path.startswith('/cdn-cgi/challenge-platform/'):raise Exception('Unexpected application write '+u.path)
   if LIVE:return await r.continue_()
   x=await r.fetch(url='http://127.0.0.1:8787'+u.path+('?' +u.query if u.query else ''),headers={**r.request.headers,'Host':u.netloc},max_redirects=0);await r.fulfill(response=x)
  await c.route('**/*',route)
  await page.goto('https://kobags.itdks.tech/cookies')
  await page.evaluate('() => {localStorage.setItem("kobags-reference-studio-v1","test");localStorage.setItem("qa-unrelated","keep")}')
  await page.get_by_role('button',name='Clear this browser’s design draft',exact=True).click()
  assert await page.evaluate('() => localStorage.getItem("kobags-reference-studio-v1")') is None
  assert await page.evaluate('() => localStorage.getItem("qa-unrelated")')=='keep'
  checks.append('Clear-draft removes reference-studio artwork without clearing unrelated storage')
  for path in ['/design','/design/viewer','/sq/design/viewer?preview=1']:
   await page.goto('https://kobags-group.com'+path);assert '/products' in page.url
  await page.goto('https://kobags-group.com/')
  assert await page.locator('.reference-showcase-frame').count()==0
  assert await page.locator('a[href="/design"]').count()==0
  assert not await page.evaluate('() => document.documentElement.scrollWidth>innerWidth')
  checks.append('Main domain excludes studio navigation, homepage preview, direct EN/SQ viewer paths; 320px has no page overflow')
  fail_studio=True
  await page.goto('https://kobags.itdks.tech/design')
  await page.get_by_role('button',name='Studio unavailable',exact=True).wait_for(timeout=30000)
  await page.frame_locator('.reference-studio-frame').get_by_role('button',name='Reload studio',exact=True).wait_for()
  checks.append('Failed 3D-module startup displays accessible recovery instead of an endless loading button')
  await page.screenshot(path=str(OUT/f'{MODE}-fallback-320.png'),full_page=True)
  await c.close();await b.close()
  result={'status':'pass','mode':MODE,'date':datetime.now(timezone.utc).isoformat(),'checks':checks,'submittedInquiries':0}
  (OUT/f'{MODE}-safety.json').write_text(json.dumps(result,indent=2));print(json.dumps(result),flush=True)
asyncio.run(main())
