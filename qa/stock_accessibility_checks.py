import sys,asyncio,json
from pathlib import Path
PROJECT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(PROJECT/'qa'))
from browser_support import launch, BASE
from playwright.async_api import async_playwright
ROOT=BASE
OUT=PROJECT/'evidence/stock-accessibility-checks.json'
async def main():
 results=[]
 async with async_playwright() as p:
  b=await launch(p);c=await b.new_context(viewport={'width':390,'height':844},has_touch=True,reduced_motion='reduce');page=await c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  async def scan(label):
   await page.add_script_tag(path=str(PROJECT/'node_modules/axe-core/axe.min.js'))
   raw=await page.evaluate("""async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,help:v.help,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary}))})),incomplete:r.incomplete.filter(v=>v.id==='color-contrast').map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))}}""")
   results.append({'page':label,**raw});OUT.write_text(json.dumps(results,indent=2));print(json.dumps({'page':label,'violations':[(v['id'],len(v['nodes'])) for v in raw['violations']]}),flush=True)
  for route in ['/quote?collection=thank-you','/sq/quote?collection=smiley','/sustainability','/products']:
   await page.goto(ROOT+route,wait_until='networkidle');await scan(route)
   if route=='/design':
    await page.locator('.editor-tabs').get_by_role('tab').nth(1).click();await scan('/design-artwork')
   if route=='/quote':
    await page.evaluate("localStorage.setItem('kobags-quote-step','3')");await page.reload(wait_until='networkidle');await scan('/quote-company');await page.evaluate("localStorage.setItem('kobags-quote-step','0')")
   if route=='/certifications':
    await page.locator('.certificate-scan').first.click();await scan('/certifications-dialog');await page.keyboard.press('Escape')
   if route=='/sustainability':
    results.append({'reducedMotion':await page.locator('.responsibility-leaf').evaluate_all('(els)=>els.map(e=>getComputedStyle(e).animationName)')})
  results.append({'errors':errors});OUT.write_text(json.dumps(results,indent=2));await b.close()
asyncio.run(main())
assert all(not row.get('violations') and not row.get('errors') for row in json.loads(OUT.read_text())), 'Accessibility regression; see report'
