import sys,asyncio,json
sys.path.insert(0,str(__import__('pathlib').Path(__file__).resolve().parent))
from browser_support import launch,BASE
from playwright.async_api import async_playwright
from pathlib import Path
async def main():
 r=[]
 async with async_playwright() as p:
  b=await launch(p);page=await b.new_page(viewport={'width':320,'height':844})
  for route in ['/','/sq']:
   await page.goto(BASE+route,wait_until='networkidle')
   await page.evaluate("()=>{const es=[...document.querySelectorAll('body *')].filter(e=>e instanceof HTMLElement&&!['SCRIPT','STYLE','SVG','PATH','CANVAS'].includes(e.tagName));const sizes=es.map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);for(const[e,n]of sizes)e.style.setProperty('font-size',2*n+'px','important')}")
   data=await page.evaluate("()=>({width:innerWidth,doc:document.documentElement.scrollWidth,buttons:[...document.querySelectorAll('.industrial-hero .actions a')].map(e=>({w:e.clientWidth,s:e.scrollWidth}))})")
   r.append({'route':route,**data});assert data['doc']==320,data
   assert all(e['s']<=e['w']+1 for e in data['buttons']),data
  await b.close()
 Path('evidence/phone-experience-20261020/home-text.json').write_text(json.dumps(r,indent=2));print(r)
asyncio.run(main())
