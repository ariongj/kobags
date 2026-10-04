"""Local-only regression of CMS password access. Never use production credentials."""
import asyncio,json,os,uuid
from pathlib import Path
from playwright.async_api import async_playwright
from browser_support import BASE,launch
ROOT=Path(__file__).resolve().parents[1]

async def main():
 assert BASE.startswith(('http://127.0.0.1:', 'http://localhost:')), 'Local Worker required'
 password=os.environ['KOBAGS_QA_PASSWORD'];suffix=uuid.uuid4().hex[:10];checks=[];errors=[]
 async with async_playwright() as p:
  browser=await launch(p)
  async def context():
   return await browser.new_context(extra_http_headers={'cf-connecting-ip':'qa-'+str(uuid.uuid4())})
  async def post(ctx,endpoint,data,status=200,origin=BASE):
   r=await ctx.request.post(BASE+'/api/cms/'+endpoint,data=data,headers={'Origin':origin})
   assert r.status==status,(endpoint,r.status,(await r.text())[:300])
   return await r.json()
  async def member(ctx):return (await (await ctx.request.get(BASE+'/api/cms/session')).json())['member']
  owner=await context();guest=await context();page=await owner.new_page()
  page.on('pageerror',lambda e:errors.append(str(e)))
  await page.goto(BASE+'/cms',wait_until='networkidle')
  assert not await page.locator('a[href*="signin-with-chatgpt"]').count()
  await page.get_by_label('Email address',exact=True).fill('info@itdks.tech')
  await page.get_by_label('Password',exact=True).fill(password)
  await page.get_by_role('button',name='Sign in',exact=True).click()
  await page.get_by_role('heading',name='Overview',exact=True).wait_for()
  assert (await member(owner))['role']=='administrator'
  cookies=await owner.cookies();session=next(c for c in cookies if c['name']=='kobags-cms-session')
  assert session['httpOnly'] and session['sameSite']=='Strict' and len(session['value'])==64
  await page.reload(wait_until='networkidle');await page.get_by_role('heading',name='Overview',exact=True).wait_for()
  checks.append('Email/password browser sign-in, HttpOnly SameSite cookie and reload persistence without ChatGPT')
  await post(guest,'login',{'email':'info@itdks.tech','password':'incorrect-password'},401)
  wrong=await post(guest,'login',{'email':'absent@example.test','password':'incorrect-password'},401)
  assert wrong['error']=='Email or password is incorrect.'
  await post(guest,'login',{'email':'info@itdks.tech','password':password},403,origin='https://untrusted.example')
  forged=await context();await forged.set_extra_http_headers({'oai-authenticated-user-id':'cms-qa-owner','oai-authenticated-user-email':'info@itdks.tech'})
  assert await member(forged) is None
  assert (await forged.request.get(BASE+'/api/cms/backup')).status==401
  assert (await guest.request.get(BASE+'/api/cms/inquiries')).status==401
  checks.append('Wrong and unknown passwords rejected identically; cross-origin login and forged platform identity rejected')
  email='auth-'+suffix+'@example.test'
  invite=await post(owner,'invite',{'name':'Password QA','email':email,'role':'editor'})
  token=invite['invitation'].split('invite=')[1];editor=await context();second=await context()
  await post(editor,'claim',{'email':email,'password':'short','invite':token},422)
  activation=await editor.new_page();await activation.goto(BASE+invite['invitation'],wait_until='networkidle')
  await activation.get_by_label('Email address',exact=True).fill(email)
  await activation.get_by_label('Password',exact=True).fill(password)
  await activation.get_by_label('Confirm password',exact=True).fill(password)
  await activation.get_by_role('button',name='Activate account',exact=True).click()
  await activation.get_by_role('heading',name='Overview',exact=True).wait_for()
  assert '?' not in activation.url
  editor_id=(await member(editor))['id']
  await post(second,'claim',{'email':email,'password':password,'invite':token},403)
  await post(second,'login',{'email':email,'password':password})
  assert (await second.request.get(BASE+'/api/cms/staff')).status==403
  await post(second,'reset-password',{'id':'owner'},403)
  await activation.get_by_role('button',name='My account',exact=True).click()
  new_password='Changed-local-credential-'+suffix
  await activation.get_by_label('Current password',exact=True).fill(password)
  await activation.get_by_label('New password',exact=True).fill(new_password)
  await activation.get_by_label('Confirm new password',exact=True).fill(new_password)
  await activation.get_by_role('button',name='Change password and sign out',exact=True).click()
  await activation.get_by_role('button',name='Sign in',exact=True).wait_for()
  assert await member(second) is None and await member(editor) is None
  await post(second,'login',{'email':email,'password':password},401)
  await post(second,'login',{'email':email,'password':new_password})
  checks.append('Invitation activation UI, single use, role permissions and password change revoke all previous sessions')
  await post(owner,'staff',{'id':editor_id,'role':'editor','active':False})
  assert await member(second) is None
  await post(second,'login',{'email':email,'password':new_password},401)
  await post(owner,'staff',{'id':editor_id,'role':'editor','active':True})
  assert await member(second) is None
  await post(second,'login',{'email':email,'password':new_password})
  reset=await post(owner,'reset-password',{'id':editor_id})
  assert await member(second) is None
  await post(second,'login',{'email':email,'password':new_password},401)
  await post(second,'claim',{'email':email,'password':new_password,'invite':reset['invitation'].split('invite=')[1]})
  await post(owner,'reset-password',{'id':'owner'},422)
  checks.append('Disabled accounts cannot sign in; re-enabling does not revive sessions; administrator reset revokes old password')
  backup=await (await owner.request.get(BASE+'/api/cms/backup')).json()
  assert not any(k in json.dumps(backup) for k in ['password_hash','credential_tag','token_hash','cms_credentials','cms_sessions'])
  saved_cookie=next(c for c in await owner.cookies() if c['name']=='kobags-cms-session')
  await page.get_by_role('button',name='Sign out',exact=True).click()
  await page.get_by_role('button',name='Sign in',exact=True).wait_for()
  await owner.add_cookies([saved_cookie]);assert await member(owner) is None
  checks.append('Sign-out invalidates copied cookies on the server; exports omit credentials and sessions')
  for width in [320,390,768,1440]:
   await page.set_viewport_size({'width':width,'height':844});await page.reload(wait_until='networkidle')
   await page.get_by_role('button',name='Sign in',exact=True).wait_for()
   assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth'),width
   if width in [390,1440]:await page.screenshot(path=str(ROOT/f'evidence/cms-password-login-{width}.jpg'),type='jpeg',quality=85,full_page=True)
  checks.append('Login layout fits 320/390/768/1440px; no captured JavaScript errors')
  limited=await context()
  for i in range(15):await post(limited,'login',{'email':'nobody@example.test','password':'bad-password'},401)
  await post(limited,'login',{'email':'nobody@example.test','password':'bad-password'},429)
  checks.append('Password guessing rate limit enforced before authentication work')
  assert not errors,errors
  (ROOT/'evidence/cms-password-checks.json').write_text(json.dumps({'status':'passed','checks':checks,'browserErrors':errors,'scope':'isolated local Worker; synthetic accounts and passwords only'},indent=2))
  print('PASS CMS passwords:',len(checks),'acceptance groups')
  await browser.close()
if __name__=='__main__':asyncio.run(main())
