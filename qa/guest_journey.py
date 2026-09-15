"""Public demo acceptance: no identity header, separate visitor cookies, real UI order flow."""
import asyncio, json, re, uuid
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE, launch
ROOT=Path(__file__).resolve().parents[1]
async def main():
 async with async_playwright() as p:
  browser=await launch(p)
  context=await browser.new_context(viewport={'width':1440,'height':1000})
  page=await context.new_page();page.set_default_timeout(45000);errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  async def go(path):
   res=await page.goto(BASE+path,wait_until='networkidle');assert res.status==200
  async def state(ctx=context):return (await (await ctx.request.get(BASE+'/api/demo')).json())['state']
  async def post(action,expected=200,ctx=context):
   res=await ctx.request.post(BASE+'/api/demo',data=action);data=await res.json();assert res.status==expected,(action['type'],res.status,data.get('error'));return data
  await go('/demo/customer');await page.get_by_role('button',name='Create fictional example').wait_for()
  assert (await state())['requests']==[]
  cookies=await context.cookies();session=next(c for c in cookies if c['name']=='kobags-demo');assert session['httpOnly'] and session['sameSite']=='Lax'
  assert 'kobags-demo' not in await page.evaluate('document.cookie')
  await go('/design');await page.get_by_role('button',name='Box',exact=True).click();await page.get_by_role('button',name='Natural',exact=True).click()
  await page.get_by_role('tab',name='02 Your design').click();await page.get_by_label('Or type your brand name').fill('NOVA STUDIO')
  assert await page.locator('input[type=file]').get_attribute('accept')=='image/png,image/jpeg,image/webp'
  async with page.expect_download():await page.get_by_role('button',name='Download design preview',exact=True).click()
  await page.get_by_role('status').filter(has_text='kobags-box-bag-front-concept.png').wait_for()
  await page.get_by_role('link',name='Get a quote for this bag').click();await page.wait_for_url('**/quote')
  await page.get_by_role('button',name='Use demo details',exact=True).click()
  await page.get_by_role('button',name='Continue',exact=True).click();await page.get_by_role('button',name='Continue',exact=True).click()
  await page.locator('#q-city').fill('');await page.get_by_role('button',name='Continue',exact=True).click();assert await page.get_by_role('alert').inner_text()=='Add your delivery city.'
  await page.locator('#q-city').fill('Prishtina');await page.get_by_role('button',name='Continue',exact=True).click()
  assert await page.locator('#q-email').input_value()=='buyer@example.com'
  await page.get_by_role('checkbox').check()
  async def fail_post(route):
   if route.request.method=='POST':await route.fulfill(status=503,content_type='application/json',body='{"error":"STORAGE_UNAVAILABLE"}')
   else:await route.continue_()
  await page.route('**/api/demo',fail_post);await page.get_by_role('button',name='Submit demo request').click();await page.get_by_role('alert').wait_for()
  assert await page.locator('#q-email').input_value()=='buyer@example.com';await page.unroute('**/api/demo',fail_post)
  await page.get_by_role('button',name='Submit demo request').click();await page.get_by_role('link',name='Continue to demo order').wait_for()
  s=await state();assert len(s['requests'])==1;r=s['requests'][0];rid=r['id'];assert r['snapshot']['text']=='NOVA STUDIO' and r['snapshot']['product']=='box-bag'
  await page.get_by_role('link',name='Continue to demo order').click();await page.wait_for_url('**/demo/customer?id='+rid)
  await page.get_by_role('button',name='Prepare my demo quote',exact=True).click();await page.get_by_text('DEMO QUOTATION · V1',exact=True).wait_for()
  s=await state();r=s['requests'][0];assert len(r['quotes'])==1 and len(r['artworks'])==1 and r['artworks'][0]['design']['text']=='NOVA STUDIO'
  data=await post({'type':'prepare-demo','id':rid});assert len(data['state']['requests'][0]['quotes'])==1 and len(data['state']['requests'][0]['artworks'])==1
  await post({'type':'release','id':rid},400)
  await page.get_by_role('button',name='Accept demo quotation',exact=True).click();await page.get_by_role('button',name='Accepted',exact=True).wait_for()
  await page.get_by_role('button',name='Review my artwork',exact=True).click();await page.get_by_role('button',name='Approve this revision',exact=True).click();await page.get_by_role('button',name='Artwork approved',exact=True).wait_for()
  await page.get_by_role('button',name='Review & place demo order',exact=True).click();await page.get_by_role('button',name='Place demo order',exact=True).click()
  await page.get_by_role('heading',name='Your demo order is placed.',exact=True).wait_for();s=await state();order=s['requests'][0]['order'];assert order['quoteVersion']==1 and order['artworkVersion']==1
  again=await post({'type':'release','id':rid});assert again['state']['requests'][0]['order']['id']==order['id']
  await page.reload(wait_until='networkidle');await page.get_by_role('heading',name='Your demo order is placed.').wait_for()
  await page.evaluate('document.activeElement?.blur(); window.scrollTo({top:0,behavior:"instant"})');await page.wait_for_timeout(150)
  await page.screenshot(path=str(ROOT/'evidence/demo-order-desktop.jpg'),type='jpeg',quality=86,full_page=True)
  await page.get_by_role('link',name='Switch to sales demo').click();await page.wait_for_url('**/demo/admin?id='+rid);await page.get_by_role('tab',name='Timeline',exact=True).click()
  async with page.expect_response(lambda res: res.url.endswith('/api/demo') and res.request.method=='POST') as advanced:
   await page.get_by_role('button',name='Advance demo production status',exact=True).click()
  assert (await (await advanced.value).json())['state']['requests'][0]['order']['status']=='In production'
  # Another anonymous browser and a signed-in browser cannot read or mutate this guest's records.
  other=await browser.new_context();assert (await state(other))['requests']==[]
  await post({'type':'prepare-demo','id':rid},400,other)
  await post({'type':'assign','id':rid,'owner':'Wrong visitor'},400,other)
  signed=await browser.new_context(extra_http_headers={'oai-authenticated-user-id':'guest-isolation-'+str(uuid.uuid4())});assert (await state(signed))['requests']==[]
  await post({'type':'release','id':rid},400,signed);await signed.close();await other.close()
  # An uninitialized visitor must establish a cookie before writing.
  fresh=await browser.new_context();missing=await post({'type':'reset'},400,fresh);assert missing['error']=='DEMO_SESSION_REQUIRED';await fresh.close()
  # Contact/sample/partner saves use the same guest workspace.
  for path,kind in [('/samples','sample'),('/contact','contact'),('/partners/apply','partner')]:
   await go(path)
   for k,v in {'company':'Fictional visitor','contact':'Demo Buyer','email':'buyer@example.com','country':'Kosovo'}.items():await page.locator('#inquiry-'+k).fill(v)
   await page.locator('#inquiry-message').fill('Fictional inquiry to test the public demonstration.');await page.get_by_role('checkbox').check();await page.get_by_role('button',name='Submit demo inquiry').click();await page.get_by_role('heading',name='Your inquiry is saved.').wait_for()
  assert {i['kind'] for i in (await state())['inquiries']}=={'sample','contact','partner'}
  # Mobile completion and repeat ordering retain the original design, but no previous approvals.
  await page.set_viewport_size({'width':390,'height':844});await go('/demo/customer?id='+rid)
  assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')
  await page.screenshot(path=str(ROOT/'evidence/demo-order-mobile.jpg'),type='jpeg',quality=86,full_page=True)
  await page.get_by_role('button',name='View order details',exact=True).click();await page.get_by_role('button',name='Request these bags again',exact=True).click();await page.wait_for_url('**/quote')
  await page.get_by_role('button',name='Continue',exact=True).click();await page.get_by_role('checkbox').check();await page.get_by_role('button',name='Submit demo request').click();await page.get_by_role('link',name='Continue to demo order').wait_for()
  s=await state();assert len(s['requests'])==2 and s['requests'][0]['quotes']==[] and s['requests'][0]['snapshot']['reorderOf']==rid
  await page.get_by_role('link',name='Continue to demo order').click();await page.get_by_role('button',name='Prepare my demo quote',exact=True).click();await page.get_by_role('button',name='Accept demo quotation',exact=True).click();await page.get_by_role('button',name='Review my artwork',exact=True).click();await page.get_by_role('button',name='Approve this revision',exact=True).click();await page.get_by_role('button',name='Review & place demo order',exact=True).click();await page.get_by_role('button',name='Place demo order',exact=True).click();await page.get_by_role('heading',name='Your demo order is placed.',exact=True).wait_for()
  assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')
  await page.get_by_role('button',name='Switch to Albanian').click();await page.get_by_role('button',name='Hap ose mbyll menynë',exact=True).click();assert await page.locator('.nav.open').is_visible()
  assert not errors,errors
  (ROOT/'evidence/guest-journey.json').write_text(json.dumps({'status':'passed','request':rid,'order':order['id'],'checks':['anonymous design to quote to artwork approval to simulated order','guest cookie continuity across refresh and sales/customer views','guest and account records isolated; foreign IDs rejected','cookie required for anonymous writes','idempotent prepare and order actions','approval gates preserved','failed submit preserves details','specific city validation, example details and download feedback','contact, sample and partner inquiries save anonymously','mobile complete reorder with fresh approvals','Albanian mobile menu label'],'browserErrors':errors},indent=2))
  print('PASS anonymous demo order journey',order['id']);await browser.close()
asyncio.run(main())
