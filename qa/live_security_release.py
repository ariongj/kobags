"""Read-only production release checks. No authentication or business writes."""
import json,re,ssl,http.client,datetime
from pathlib import Path
from urllib.parse import urlsplit,urljoin

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'deliverables/handoff/security-20261026'
results=[]
def fetch(url,headers=None,method='GET'):
 u=urlsplit(url);conn=(http.client.HTTPSConnection(u.netloc,context=ssl.create_default_context(),timeout=40) if u.scheme=='https' else http.client.HTTPConnection(u.netloc,timeout=40))
 conn.request(method,u.path+('?' +u.query if u.query else ''),headers={'User-Agent':'Mozilla/5.0 KobagsReleaseVerification','Cache-Control':'no-cache','Accept-Encoding':'gzip',**(headers or {})})
 r=conn.getresponse();data=r.read();result={'url':url,'status':r.status,'headers':dict((k.lower(),v) for k,v in r.getheaders()),'body':data};conn.close();return result

for host in ['kobags-group.com','www.kobags-group.com','kobags.itdks.tech']:
 for scheme in ['http','https']:
  url=f'{scheme}://{host}/sq/products?audit=release';chain=[]
  for _ in range(5):
   r=fetch(url);chain.append({'url':url,'status':r['status'],'location':r['headers'].get('location')})
   if r['status'] not in [301,302,303,307,308]:break
   url=urljoin(url,r['headers']['location'])
  assert r['status']==200,(host,scheme,chain)
  assert urlsplit(url).scheme=='https'
  expected='kobags.itdks.tech' if host=='kobags.itdks.tech' else 'kobags-group.com'
  assert urlsplit(url).hostname==expected and urlsplit(url).path=='/sq/products' and urlsplit(url).query=='audit=release',chain
  results.append({'redirectChain':chain})
for route,expected in [('/',200),('/sq',200),('/contact',200),('/quote',200),('/cms',200),('/privacy',200),('/cookies',200),('/api/cms/inquiries',401),('/api/cms/backup',401),('/api/media/missing-audit-file',404),('/api/portal/invalid',404),('/.env',404),('/.git/config',404),('/handoff',404),('/documents/kobags-source.zip',404),('/not-a-real-kobags-page',404)]:
 r=fetch('https://kobags-group.com'+route);h=r['headers'];assert r['status']==expected,(route,r['status'])
 assert h.get('x-content-type-options')=='nosniff' and h.get('x-frame-options')=='SAMEORIGIN',(route,h)
 assert h.get('strict-transport-security')=='max-age=15552000',(route,h)
 assert "script-src-attr 'none'" in h.get('content-security-policy','') and "object-src 'none'" in h.get('content-security-policy',''),(route,h)
 assert 'usb=()' in h.get('permissions-policy','')
 if route.startswith(('/cms','/api/')):assert 'no-store' in h.get('cache-control',''),(route,h)
 results.append({'route':route,'status':r['status'],'headers':{k:v for k,v in h.items() if k in ['content-security-policy','strict-transport-security','permissions-policy','referrer-policy','x-content-type-options','x-frame-options','cache-control','content-encoding','content-type']}})
a=fetch('https://kobags-group.com/');b=fetch('https://kobags-group.com/',{'x-kobags-nonce':'visitor-nonce','Content-Security-Policy':"script-src 'unsafe-inline'"})
def nonce(r):return re.search("'nonce-([^']+)'",r['headers']['content-security-policy']).group(1)
assert nonce(a)!=nonce(b) and nonce(b)!='visitor-nonce'
assert 'unsafe-eval' not in b['headers']['content-security-policy']
import gzip
html=(gzip.decompress(a['body']) if a['headers'].get('content-encoding')=='gzip' else a['body']).decode()
assert 'includeSubDomains' not in a['headers']['strict-transport-security'] and 'preload' not in a['headers']['strict-transport-security']
for src in list(dict.fromkeys(re.findall(r'(?:src|href)="([^"<>]+\.(?:js|css))"',html)))[:8]:
 r=fetch(urljoin('https://kobags-group.com',src));assert r['status']==200,(src,r['status'])
 assert 'immutable' in r['headers'].get('cache-control',''),src
 assert r['headers'].get('content-encoding') in ['gzip','br'],(src,r['headers'])
 results.append({'asset':src,'status':r['status'],'cache':r['headers']['cache-control'],'compression':r['headers']['content-encoding'],'bytes':len(r['body'])})
for url in ['/assets/client-2026-10/thank-you-stock-192.webp','/assets/certificate-iso9001-240.webp','/assets/certificate-iso14001-480.webp']:
 r=fetch('https://kobags-group.com'+url);assert r['status']==200 and r['headers'].get('content-type','').startswith('image/webp')
 results.append({'responsiveImage':url,'status':200,'bytes':len(r['body'])})
(OUT/'live-http-security.json').write_text(json.dumps({'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'passed','checks':results,'nonce':'Unique per response; visitor-supplied policy/nonce ignored','productionWrites':0},indent=2))
print('PASS live HTTP:',len(results),'redirect/header/asset cases; nonce uniqueness; no production writes')
