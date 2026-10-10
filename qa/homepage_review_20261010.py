"""Client homepage revisions and collection-to-quote checks; local synthetic data only."""
import asyncio,json,sys
from pathlib import Path
from browser_support import BASE,launch
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
async def main():
 checks=[];errors=[]
 async with async_playwright() as p:
  browser=await launch(p);ctx=await browser.new_context();page=await ctx.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
  for lang in ['en','sq']:
   for width in [320,390,768,1440]:
    await page.set_viewport_size({'width':width,'height':900});r=await page.goto(BASE+('/sq' if lang=='sq' else '/'),wait_until='networkidle');assert r.status==200
    assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),(lang,width)
    assert await page.locator('h1').count()==1
    assert await page.locator('.hero-factory-stamp,.industrial-location,.industrial-proof-strip,.hero-showroom-link,.industrial-quote-link').count()==0
    assert ('Helping Brands.' if lang=='en' else 'Mbështesim markat.') in await page.locator('h1').inner_text()
    assert await page.locator('.home-production-film').evaluate('(e)=>getComputedStyle(e).transform')=='none'
    assert await page.locator('.home-collection-categories a').count()==2
    assert await page.locator('.industrial-hero-photo').evaluate('(e)=>e.complete&&e.naturalWidth>0')
    assert await page.locator('h1 em').evaluate('(e)=>getComputedStyle(e).color')=='rgb(166, 209, 122)'
    assert await page.locator('.header .brand-wordmark').evaluate('(e)=>getComputedStyle(e,"::after").backgroundColor')=='rgb(166, 209, 122)'
    if lang=='en' and width in [390,1440]:
     await page.screenshot(path=str(ROOT/f'evidence/home-review-20261010-{width}.jpg'),type='jpeg',quality=85)
     await page.locator('.home-collection').scroll_into_view_if_needed();await page.screenshot(path=str(ROOT/f'evidence/home-collections-20261010-{width}.jpg'),type='jpeg',quality=85)
    checks.append(f'{lang} homepage {width}px: clean hero, copy, accent, level video and no overflow')
  for lang,slug,name in [('en','thank-you','Thank you bags'),('sq','smiley','Smiley bags')]:
   await page.goto(BASE+('/sq' if lang=='sq' else '/'),wait_until='networkidle')
   await page.locator('a[href$="collection='+slug+'"]').click();await page.wait_for_load_state('networkidle')
   assert name in await page.locator('.quote-collection-note').inner_text()
   for _ in range(3):
    if await page.locator('#q-city').is_visible():await page.locator('#q-city').fill('Prishtina')
    await page.get_by_role('button',name='Vazhdo' if lang=='sq' else 'Continue',exact=True).click()
   await page.locator('#q-company').fill('Homepage QA Only');await page.locator('#q-contact').fill('Test Buyer');await page.locator('#q-email').fill('buyer@example.test');await page.locator('#q-note').fill('Keep my delivery note.');await page.get_by_role('checkbox').check()
   async with page.expect_response(lambda r:r.url.endswith('/api/demo') and r.request.method=='POST') as resp:
    await page.get_by_role('button',name='Ruaj kërkesën e dizajnit' if lang=='sq' else 'Save design request',exact=True).click()
   response=await resp.value;assert response.status==200,(await response.text())[:400];saved=(await response.json())['id']
   state=await (await ctx.request.get(BASE+'/api/demo')).json();request=next(r for r in state['state']['requests'] if r['id']==saved)
   assert request['snapshot']['note']=='Collection: '+name+'\n\nKeep my delivery note.'
   checks.append(name+': link and localized quote submission preserve selected collection and customer notes')
  assert not errors,errors
  (ROOT/'evidence/home-review-20261010.json').write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors,'scope':'local compiled Worker; synthetic requests only'},indent=2))
  print('PASS',len(checks),'homepage and collection checks');await browser.close()
asyncio.run(main())
