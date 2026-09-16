"""Mobile-first navigation, responsive pages and touch interaction, local only."""
import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE,launch
ROOT=Path(__file__).resolve().parents[1]
async def main():
 async with async_playwright() as p:
  browser=await launch(p);ctx=await browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=1);page=await ctx.new_page();page.set_default_timeout(45000);errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  async def go(path):
   response=await page.goto(BASE+path,wait_until='networkidle');assert response.status==200,(path,response.status)
   assert await page.evaluate("getComputedStyle(document.body).getPropertyValue('--navy').trim()")== '#123442','Stylesheet did not load'
  async def fits(path,width):
   assert not await page.evaluate('document.documentElement.scrollWidth>document.documentElement.clientWidth'),(path,width,await page.evaluate("Array.from(document.querySelectorAll('main *')).filter(e=>e.getBoundingClientRect().right>innerWidth+2).slice(0,8).map(e=>e.className)"))
   assert await page.locator('h1').count()==1,path
  await go('/handoff');paths=await page.locator('.outline-group a').evaluate_all('(els)=>els.map(a=>a.getAttribute("href"))');assert len(paths)==32
  results=[]
  captures={'/':'home','/products':'catalog','/manufacturing':'manufacturing','/certifications':'certificates','/quote':'quote','/contact':'contact'}
  for path in paths:
   await go(path);await fits(path,390);results.append([path,390])
   if path in captures:await page.screenshot(path=str(ROOT/'evidence'/('compact-mobile-'+captures[path]+'.jpg')),type='jpeg',quality=80,full_page=True)
  for width in [320,768]:
   await page.set_viewport_size({'width':width,'height':844})
   for path in ['/','/products','/products/box-bag','/design','/manufacturing','/certifications','/quote','/samples','/partners/apply','/demo/customer','/demo/admin']:
    await go(path);await fits(path,width);results.append([path,width])
  await page.set_viewport_size({'width':390,'height':844});await go('/')
  menu=page.get_by_role('button',name='Toggle menu',exact=True);await menu.tap();await page.locator('.nav.open').wait_for()
  assert await menu.get_attribute('aria-controls')=='site-navigation'
  for link in await page.locator('.nav.open a').all():
   box=await link.bounding_box();assert box['height']>=44 and box['x']>=0 and box['x']+box['width']<=390
  await page.keyboard.press('Escape');assert await menu.get_attribute('aria-expanded')=='false'
  await menu.tap();await page.locator('.nav.open').get_by_role('link',name='Request a quote',exact=True).tap();await page.wait_for_url('**/quote')
  for path in ['/quote','/contact','/samples','/partners/apply']:
   await go(path)
   fields=page.locator('main input:visible:not([type=checkbox]):not([type=range]):not([type=hidden]),main textarea:visible')
   for field in await fields.all():assert await field.evaluate('(e)=>parseFloat(getComputedStyle(e).fontSize)')>=16,(path,await field.get_attribute('id'))
  # Enter the designer through the real mobile homepage and rotate with touch.
  await go('/');await page.get_by_role('link',name='Design your bag',exact=True).tap();await page.wait_for_url('**/design');await page.locator('.studio-3d[data-status=ready]').wait_for()
  host=page.locator('.preview-stage .studio-3d-host');canvas=host.locator('canvas');await canvas.scroll_into_view_if_needed();box=await canvas.bounding_box();angle=float(await host.get_attribute('data-angle'))
  session=await ctx.new_cdp_session(page);x=box['x']+box['width']*.12;y=box['y']+box['height']*.5
  await session.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
  for offset in [20,40,60,80]:await session.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+offset,'y':y}]})
  await session.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
  await page.wait_for_function("Math.abs(Number(document.querySelector('.preview-stage .studio-3d-host').dataset.angle)-"+str(angle)+")>.15")
  await page.get_by_role('tab',name='02 Your design',exact=True).tap();await page.get_by_role('group',name='Select artwork layer').get_by_role('button',name='Text',exact=True).tap();await page.get_by_label('Brand name or message').fill('MOBILE STUDIO')
  await page.evaluate('document.activeElement?.blur();window.scrollTo(0,0)');await page.screenshot(path=str(ROOT/'evidence/compact-mobile-designer.jpg'),type='jpeg',quality=82,full_page=True)
  for width,height in [(844,390),(1024,768)]:
   await page.set_viewport_size({'width':width,'height':height});await page.wait_for_timeout(200);await fits('/design',width);await page.get_by_role('link',name='Get a quote for this bag',exact=True).scroll_into_view_if_needed()
  assert not errors,errors
  (ROOT/'evidence/mobile-site-checks.json').write_text(json.dumps({'status':'passed','routeWidthPairs':results,'mobileMenuTouchTargets':True,'mobileForms16px':True,'touchRotation':True,'shortLandscapeDesigner':True,'browserErrors':errors},indent=2));print('PASS',len(results),'mobile route/width checks, touch rotation and menu');await browser.close()
asyncio.run(main())
