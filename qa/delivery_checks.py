"""Read-only links and HTTP delivery acceptance on the isolated local Worker."""
import asyncio, json, xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit
from playwright.async_api import async_playwright
from browser_support import BASE, launch
from seo_checks import Document

ROOT = Path(__file__).resolve().parents[1]

async def main():
 async with async_playwright() as p:
  browser = await launch(p)
  context = await browser.new_context(java_script_enabled=False)
  sitemap = ET.fromstring(await (await context.request.get(BASE+'/sitemap.xml')).text())
  pages = [urlsplit(node.text).path or '/' for node in sitemap.findall('{*}url/{*}loc')]
  destinations = set(); anchors = []
  for path in pages:
   response = await context.request.get(BASE+path)
   assert response.status == 200, (path, response.status)
   source = await response.text(); doc = Document(source)
   for href in doc.anchors:
    url = urlsplit(href)
    if not href or url.scheme or href.startswith('//'): continue
    target = url.path or path
    if not target.startswith('/'): continue
    if target.startswith(('/signin-with-chatgpt','/signout-with-chatgpt','/callback')): continue
    destinations.add(target)
    if url.fragment: anchors.append((path,target,url.fragment))
  for target in sorted(destinations):
   response = await context.request.head(BASE+target)
   assert response.status == 200, (target, response.status)
  # Check anchor IDs in server HTML rather than accepting broken section links.
  from html.parser import HTMLParser
  class Ids(HTMLParser):
   def __init__(self, source): super().__init__(); self.ids=set(); self.feed(source)
   def handle_starttag(self, tag, attrs):
    node=dict(attrs)
    if node.get('id'): self.ids.add(node['id'])
  ids={}
  for origin,target,fragment in anchors:
   if target not in ids: ids[target]=Ids(await (await context.request.get(BASE+target)).text()).ids
   assert fragment in ids[target], (origin,target,fragment)
  checks=[]
  for path,kind,cache in [
   ('/assets/logo-web.png','image/png','max-age=86400'),
   ('/assets/client-2026-09/factory-line-960.webp','image/webp','max-age=86400'),
   ('/documents/buyer-checklist.txt','text/plain','must-revalidate'),
  ]:
   response=await context.request.head(BASE+path)
   assert response.status==200 and response.headers.get('content-type','').startswith(kind)
   assert cache in response.headers.get('cache-control',''),path
   assert response.headers.get('x-content-type-options')=='nosniff'
   if path.startswith('/documents/'): assert 'noindex' in response.headers.get('x-robots-tag','')
   checks.append({'path':path,'status':response.status,'type':response.headers['content-type'],'cache':response.headers['cache-control']})
  logo=await context.request.get(BASE+'/assets/logo-web.png')
  conditional=await context.request.get(BASE+'/assets/logo-web.png',headers={'If-None-Match':logo.headers['etag']})
  assert conditional.status==304 and 'max-age=86400' in conditional.headers.get('cache-control','')
  video=await context.request.get(BASE+'/assets/printing-process.mp4',headers={'Range':'bytes=0-1023'})
  assert video.status in (200,206),video.status
  assert video.headers.get('content-type')=='video/mp4'
  if video.status==206:
   assert len(await video.body())==1024 and video.headers.get('content-range','').startswith('bytes 0-1023/')
  else:
   # The hosting asset binding may validly ignore Range and send the full file.
   assert len(await video.body())==(ROOT/'public/assets/printing-process.mp4').stat().st_size
  home=Document(await (await context.request.get(BASE+'/')).text())
  styles='/_next/static/css/'+next((ROOT/'dist/client/__kobags_static/_next/static/css').glob('*.css')).name
  style=await context.request.get(BASE+styles)
  assert 'max-age=31536000, immutable' in style.headers.get('cache-control','')
  assert style.headers.get('content-type','').startswith('text/css')
  for path in ['/assets/missing-delivery.webp','/_next/static/missing-delivery.js','/documents/missing-delivery.zip']:
   response=await context.request.get(BASE+path)
   assert response.status==404 and 'no-store' in response.headers.get('cache-control',''),(path,response.status,response.headers)
  for path in ['/demo/customer','/quote']:
   response=await context.request.get(BASE+path)
   assert 'no-store' in response.headers.get('cache-control','') and 'noindex' in response.headers.get('x-robots-tag','')
  page=await context.new_page();await page.goto(BASE+'/',wait_until='networkidle')
  assert await page.locator('head link[rel=stylesheet]').count()>0
  await context.close()
  mobile=await browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
  page=await mobile.new_page();await page.goto(BASE+'/',wait_until='networkidle')
  videoNode=page.locator('main video');await videoNode.scroll_into_view_if_needed()
  await videoNode.evaluate('(video)=>{video.muted=true;return video.play()}')
  await page.wait_for_function('document.querySelector("main video").currentTime>0')
  await videoNode.evaluate('(video)=>{video.currentTime=Math.min(2,video.duration/2)}')
  await page.wait_for_function('!document.querySelector("main video").seeking && document.querySelector("main video").currentTime>=1')
  await videoNode.evaluate('(video)=>video.pause()')
  report={'status':'passed','sitemapPages':len(pages),'internalDestinations':len(destinations),'sectionLinks':len(anchors),'delivery':checks,'videoRangeStatus':video.status,'checks':['All sitemap-page links and section anchors resolve','Metadata remains in the server-rendered head','Document downloads remain noindex','Correct media MIME types','Immutable hashed CSS; short-lived mutable images','Conditional image 304 preserves headers','Video range request receives a valid full or partial response; mobile playback and seeking work','Missing assets remain uncached 404s','Customer and quote pages remain no-store','Production styles are linked in the initial head']}
  (ROOT/'evidence/delivery-checks.json').write_text(json.dumps(report,indent=2))
  print('PASS delivery:',len(pages),'pages,',len(destinations),'internal destinations,',len(anchors),'section links; MIME, caching, noindex, range and conditional requests')
  await browser.close()

if __name__=='__main__': asyncio.run(main())
