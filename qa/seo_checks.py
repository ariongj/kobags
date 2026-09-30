"""SEO acceptance against an isolated compiled Worker; no production writes."""
import asyncio, json, re, xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from playwright.async_api import async_playwright
from browser_support import BASE, launch
ROOT=Path(__file__).resolve().parents[1]
ORIGIN='https://kobags.itdks.tech'

class Document(HTMLParser):
 def __init__(self, source):
  super().__init__();self.lang='';self.meta={};self.links=[];self.schemas=[];self.h1=[];self.titles=[];self.images=[];self.anchors=[];self.text='';self.capture=None;self.script='';self.ld=False;self.svg=0;self.feed(source)
 def handle_starttag(self, tag, attrs):
  a=dict(attrs)
  if tag=='svg':self.svg+=1
  if tag=='html':self.lang=a.get('lang')
  if tag=='meta':self.meta.setdefault(a.get('name') or a.get('property'),[]).append(a.get('content',''))
  if tag=='link':self.links.append(a)
  if tag=='a':self.anchors.append(a.get('href',''))
  if tag=='img':self.images.append(a)
  if tag=='h1' or (tag=='title' and not self.svg):self.capture=tag;self.text=''
  if tag=='script' and a.get('type')=='application/ld+json':self.ld=True;self.script=''
 def handle_data(self, text):
  if self.capture:self.text+=text
  if self.ld:self.script+=text
 def handle_endtag(self, tag):
  if tag=='svg':self.svg-=1
  if self.capture==tag:
   (self.h1 if tag=='h1' else self.titles).append(self.text.strip());self.capture=None
  if tag=='script' and self.ld:self.schemas.append(json.loads(self.script));self.ld=False
 def meta_one(self, name):
  assert len(self.meta.get(name,[]))==1,(name,self.meta.get(name));return self.meta[name][0]
 def canonical(self):
  links=[x['href'] for x in self.links if x.get('rel')=='canonical'];assert len(links)==1,links;return links[0]

async def main():
 async with async_playwright() as p:
  browser=await launch(p);context=await browser.new_context(java_script_enabled=False)
  sitemap=await context.request.get(BASE+'/sitemap.xml');assert sitemap.status==200
  assert 'xml' in sitemap.headers.get('content-type','')
  tree=ET.fromstring(await sitemap.text());ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9','x':'http://www.w3.org/1999/xhtml'}
  entries=tree.findall('s:url',ns);urls=[e.find('s:loc',ns).text for e in entries]
  assert len(urls)>=40 and len(set(urls))==len(urls)
  robots=await context.request.get(BASE+'/robots.txt');robot_text=await robots.text()
  assert robots.status==200 and 'Disallow: /\n' not in robot_text and 'Sitemap: '+ORIGIN+'/sitemap.xml' in robot_text
  results=[];titles={'en':set(),'sq':set()};descriptions={'en':set(),'sq':set()}
  for entry,url in zip(entries,urls):
   assert url==ORIGIN or url.startswith(ORIGIN+'/')
   path=urlparse(url).path or '/';lang='sq' if path=='/sq' or path.startswith('/sq/') else 'en'
   r=await context.request.get(BASE+path);assert r.status==200,(path,r.status)
   doc=Document(await r.text());assert doc.lang==lang,(path,doc.lang)
   assert r.headers.get('content-language')==lang
   assert len(doc.h1)==1 and len(doc.titles)==1,(path,doc.h1,doc.titles)
   assert doc.canonical()==url,(path,doc.canonical())
   assert doc.meta_one('robots')=='index, follow'
   assert 'noindex' not in r.headers.get('x-robots-tag','')
   desc=doc.meta_one('description');assert len(desc)>=40 and len(desc)<=220,(path,len(desc))
   title=doc.titles[0];assert title not in titles[lang],(path,title);titles[lang].add(title)
   assert desc not in descriptions[lang],(path,desc);descriptions[lang].add(desc)
   assert doc.meta_one('og:url')==url and doc.meta_one('og:locale')==('sq_AL' if lang=='sq' else 'en_GB')
   assert doc.meta_one('twitter:card')=='summary_large_image'
   image=doc.meta_one('og:image');assert image.startswith(ORIGIN+'/assets/')
   media=await context.request.get(BASE+urlparse(image).path);assert media.status==200
   html_alternates={x['hreflang']:x['href'] for x in doc.links if x.get('rel')=='alternate' and 'hreflang' in x}
   xml_alternates={x.attrib['hreflang']:x.attrib['href'] for x in entry.findall('x:link',ns)}
   assert html_alternates==xml_alternates and html_alternates[lang]==url
   assert set(html_alternates)=={'en','sq','x-default'} and all(x in urls for x in html_alternates.values())
   nodes=[node for data in doc.schemas for node in data.get('@graph',[data])]
   assert any(n.get('@type')=='Organization' for n in nodes) and any(n.get('@type')=='WebSite' for n in nodes)
   if '/products/' in path:
    product=next(n for n in nodes if n.get('@type')=='Product');assert product['name']==doc.h1[0]
    assert 'offers' not in product and 'aggregateRating' not in product and 'review' not in product
    assert len(product['additionalProperty'])==3
    assert any(n.get('@type')=='BreadcrumbList' for n in nodes)
   if '/blog/' in path:
    article=next(n for n in nodes if n.get('@type')=='BlogPosting');assert article['headline']==doc.h1[0] and article['inLanguage']==lang
    assert 'datePublished' not in article
   assert all('alt' in image for image in doc.images),path
   for href in doc.anchors:
    if lang=='sq' and href.startswith('/') and not re.match(r'^/(assets|documents|api|_next)/',href):assert href=='/sq' or href.startswith('/sq/') or href==(path[3:] or '/'),(path,href)
   results.append({'path':path,'language':lang,'title':title,'description':desc,'h1':doc.h1[0]})
  excluded=['/demo/customer','/demo/admin','/quote','/handoff','/privacy','/terms','/cookies','/samples','/partners/apply']
  for lang in ['en','sq']:
   for path in excluded:
    path=('/sq'+path) if lang=='sq' else path
    r=await context.request.get(BASE+path);assert r.status==200
    doc=Document(await r.text());assert 'noindex' in doc.meta_one('robots') and 'noindex' in r.headers.get('x-robots-tag','')
    assert ORIGIN+path not in urls
   for path in ['/missing-seo-page','/products/unknown-bag','/blog/unknown-article']:
    r=await context.request.get(BASE+('/sq' if lang=='sq' else '')+path);assert r.status==404,(path,r.status)
    assert 'noindex' in r.headers.get('x-robots-tag','')
  for old,new in [('/sq/','/sq'),('/sq/shop','/sq/products'),('/sq/shop-catalog/box-bag','/sq/products/box-bag'),('/sq/contact-us','/sq/contact')]:
   r=await context.request.get(BASE+old,max_redirects=0);assert r.status in [301,308] and urlparse(r.headers['location']).path==new,(old,r.status,r.headers)
  r=await context.request.get(BASE+'/products/box-bag?utm_source=seo-check');assert Document(await r.text()).canonical()==ORIGIN+'/products/box-bag'
  r=await context.request.get(BASE+'/manufacturing',headers={'x-kobags-language':'sq'});assert Document(await r.text()).lang=='en'
  # Rendering remains useful without JavaScript: translated copy is in the first response.
  page=await context.new_page()
  await page.goto(BASE+'/sq/manufacturing',wait_until='networkidle')
  assert 'Nga materiali' in await page.locator('h1').inner_text()
  assert await page.locator('html').get_attribute('lang')=='sq'
  assert await page.get_by_role('link',name='Kalo në anglisht').get_attribute('href')=='/manufacturing'
  await context.close()
  mobile=await browser.new_context(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)
  page=await mobile.new_page();errors=[];failed=[]
  page.on('pageerror',lambda error:errors.append(str(error)))
  page.on('response',lambda r:failed.append(r.url) if r.status>=400 and r.request.resource_type in ['stylesheet','script','image','font'] else None)
  await page.goto(BASE+'/',wait_until='networkidle');hero=page.locator('.industrial-hero-photo')
  await hero.evaluate('(image)=>image.decode()')
  chosen=await hero.evaluate('(image)=>image.currentSrc');assert re.search(r'factory-line-(640|960|1600)\.webp$',chosen),chosen
  assert await page.locator('.header .brand img').get_attribute('src')=='/assets/logo-web.png'
  await page.screenshot(path=str(ROOT/'evidence/seo-mobile-home.jpg'),type='jpeg',quality=84)
  await page.goto(BASE+'/design',wait_until='networkidle')
  await page.get_by_role('tab',name='02 Your design').click();await page.get_by_label('Brand name or message').fill('SEO DRAFT')
  saved=await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")
  await page.get_by_role('link',name='Switch to Albanian').click()
  await page.wait_for_url('**/sq/design');await page.get_by_role('tab',name='02 Dizajni juaj').wait_for()
  assert await page.evaluate("JSON.parse(localStorage.getItem('kobags-design-v1'))")==saved
  assert await page.locator('link[rel=canonical]').get_attribute('href')==ORIGIN+'/sq/design'
  await page.locator('.studio-controls a[href="/sq/quote"]').click();await page.wait_for_url('**/sq/quote')
  assert await page.locator('html').get_attribute('lang')=='sq'
  assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
  assert not errors and not failed,(errors,failed)
  report={'status':'passed','sitemapUrls':len(urls),'pages':results,'checks':['crawler-visible EN/SQ content without JavaScript','unique titles/descriptions, absolute canonicals, reciprocal hreflang and social images','sitemap excludes synthetic and private-flow pages','robots allow public crawling; private routes and 404s remain noindex','valid source-backed product/article/organization/breadcrumb JSON-LD without fictional offers or ratings','tracking queries canonicalized and language override ignored','localized legacy redirects','mobile responsive hero and compact logo delivery','design preserved through language switch and quote navigation'],'mobileHero':chosen,'browserErrors':errors,'failedAssets':failed}
  (ROOT/'evidence/seo-checks.json').write_text(json.dumps(report,indent=2,ensure_ascii=False));print('PASS SEO:',len(urls),'EN/SQ sitemap URLs, crawler HTML, metadata, schemas, private exclusions and mobile language handoff');await browser.close()
asyncio.run(main())
