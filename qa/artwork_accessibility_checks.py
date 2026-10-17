import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import launch,BASE
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'evidence/artwork-elements'
async def main():
 results=[]
 async with async_playwright() as p:
  b=await launch(p);ctx=await b.new_context(viewport={'width':320,'height':844},has_touch=True,reduced_motion='reduce')
  await ctx.add_init_script("(()=>{const old=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...a){return kind.includes('webgl')?null:old.call(this,kind,...a)}})()")
  page=await ctx.new_page()
  for route in ['/design','/sq/design']:
   await page.goto(BASE+route,wait_until='networkidle');await page.get_by_role('tab').nth(1).click()
   await page.locator('.artwork-add button').last.click();dialog=page.get_by_role('dialog');await dialog.wait_for()
   await page.add_script_tag(path=str(ROOT/'node_modules/axe-core/axe.min.js'))
   v=await page.evaluate("async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))")
   assert not v,v
   await page.screenshot(path=str(OUT/('qr-dialog-sq.jpg' if route.startswith('/sq') else 'qr-dialog-en.jpg')),full_page=True)
   await page.keyboard.press('Escape');await dialog.wait_for(state='hidden');assert await page.locator('.artwork-add button').last.evaluate('(e)=>document.activeElement===e')
   await page.evaluate("()=>{const els=[...document.querySelectorAll('body *')].filter(e=>e instanceof HTMLElement&&!['SCRIPT','STYLE','SVG','PATH','CANVAS'].includes(e.tagName));const sizes=els.map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);for(const[e,n]of sizes)e.style.setProperty('font-size',2*n+'px','important')}")
   # Enlarged text uses the editor's own scroll area; verify the actual add
   # controls remain reachable, not just their offscreen layout widths.
   await page.locator('.artwork-add').scroll_into_view_if_needed()
   data=await page.locator('.artwork-add button').evaluate_all('(buttons)=>buttons.map(e=>({text:e.innerText,width:e.clientWidth,scroll:e.scrollWidth}))')
   await page.screenshot(path=str(OUT/('tools-200-sq.jpg' if route.startswith('/sq') else 'tools-200-en.jpg')),full_page=True)
   results.append({'route':route,'buttons':data,'pageWidth':await page.evaluate('document.documentElement.scrollWidth'),'violations':v})
   (OUT/'accessibility.json').write_text(json.dumps(results,indent=2))
   assert all(e['scroll']<=e['width']+1 for e in data),data
   assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
   await page.locator('.artwork-add button').last.click()
   await dialog.wait_for()
   await page.get_by_label('Lidhja e faqes' if route.startswith('/sq') else 'Website or page link',exact=True).fill('example.com')
   await page.keyboard.press('Escape');await dialog.wait_for(state='hidden')
  await b.close();print('PASS EN/SQ QR dialogs, focus return and 200% text controls at 320px')
asyncio.run(main())
