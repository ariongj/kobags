import sys,asyncio,json
from pathlib import Path
PROJECT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(PROJECT/'qa'))
from browser_support import launch, BASE
from playwright.async_api import async_playwright
async def main():
 results=[]
 async with async_playwright() as p:
  b=await launch(p);c=await b.new_context(viewport={'width':320,'height':844},has_touch=True,reduced_motion='reduce');page=await c.new_page()
  for route in ['/','/sq','/products','/products/handle-bag','/manufacturing','/sustainability','/sq/sustainability','/certifications','/partners','/contact','/resources','/blog','/blog/kobagsjourney','/privacy','/design','/sq/design']:
   await page.goto(BASE+route,wait_until='networkidle')
   if route.endswith('/design'):
    await page.locator('.preview-stage .studio-3d[data-status=ready]').wait_for()
    await page.locator('.editor-tabs').get_by_role('tab').nth(1).click()
   await page.evaluate('''() => {const elements=[...document.querySelectorAll('body *')].filter(e=>e instanceof HTMLElement&&!['SCRIPT','STYLE','SVG','PATH','CANVAS'].includes(e.tagName));const sizes=elements.map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);for(const [e,s] of sizes)e.style.setProperty('font-size',s*2+'px','important')}''')
   skip=page.locator('.skip-link')
   assert await skip.evaluate('(e)=>e.getBoundingClientRect().bottom')<=0, 'Unfocused enlarged skip link covers the header'
   await skip.focus();assert await skip.evaluate('(e)=>e.getBoundingClientRect().top')>=0
   await page.keyboard.press('Tab');assert await skip.evaluate('(e)=>e.getBoundingClientRect().bottom')<=0
   r=await page.evaluate('''() => ({width:innerWidth,documentWidth:document.documentElement.scrollWidth,overflows:[...document.querySelectorAll('main *')].filter(e=>e instanceof HTMLElement&&e.offsetWidth&&e.getBoundingClientRect().right>innerWidth+2).slice(0,8).map(e=>({tag:e.tagName,cls:e.className,text:(e.innerText||'').slice(0,65),right:Math.round(e.getBoundingClientRect().right)}))})''')
   if route.endswith('/design'):
    assert await page.locator('.editor-body[data-state=active]').evaluate('(e)=>e.clientHeight')>=120, 'Enlarged-text controls must remain usable'
    await page.screenshot(path=str(PROJECT/'evidence/mobile-refresh'/('text-200-sq.jpg' if route.startswith('/sq') else 'text-200-en.jpg')),full_page=True,type='jpeg')
   results.append({'route':route,**r});print(json.dumps(results[-1]),flush=True);(PROJECT/'evidence/text-resize-checks.json').write_text(json.dumps(results,indent=2))
  await b.close()
asyncio.run(main())
assert all(row['documentWidth']<=row['width'] for row in json.loads((PROJECT/'evidence/text-resize-checks.json').read_text())), 'Enlarged-text overflow; see report'
