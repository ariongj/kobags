"""Launch surface checks using read-only requests against the isolated Worker."""
import json, os, urllib.request, urllib.error
from pathlib import Path
from urllib.parse import urlparse
BASE=os.getenv('KOBAGS_BASE_URL','http://127.0.0.1:8787').rstrip('/')
assert urlparse(BASE).hostname in ('127.0.0.1','localhost'), 'Local QA only'
ROOT=Path(__file__).resolve().parents[1]
checks=[]
def fetch(path):
 try:
  with urllib.request.urlopen(BASE+path,timeout=20) as r:return r.status,dict(r.headers),r.read().decode('utf-8','replace')
 except urllib.error.HTTPError as r:return r.code,dict(r.headers),r.read().decode('utf-8','replace')
for path in ['/','/sq','/privacy','/sq/privacy','/cms','/api/inquiries','/api/cms/session','/api/portal/invalid-link','/api/media/missing-file','/assets/logo-web.png']:
 status,headers,body=fetch(path);headers={k.lower():v for k,v in headers.items()}
 assert status in [200,404],(path,status)
 assert headers.get('x-content-type-options')=='nosniff',path
 assert headers.get('x-frame-options')=='SAMEORIGIN',path
 assert "object-src 'none'" in headers.get('content-security-policy',''),path
 assert 'camera=()' in headers.get('permissions-policy',''),path
 if path.startswith(('/cms','/api/cms','/api/portal','/api/media')):
  assert headers.get('referrer-policy')=='no-referrer',path
  assert 'no-store' in headers.get('cache-control',''),path
 checks.append({'path':path,'status':status,'headers':'passed'})
for path in ['/handoff','/sq/handoff','/documents/kobags-source.zip','/documents/kobags-media.zip','/documents/cms-operations.md','/__kobags_static/documents/kobags-source.zip','/__kobags_static/documents/cms-operations.md']:
 assert fetch(path)[0]==404,path
checks.append({'privateHandoff':'Public and internal asset aliases return 404'})
status,headers,body=fetch('/documents/third-party-notices.txt')
assert status==200 and 'KOBAGS WEBSITE' in body and 'MIT' in body
checks.append({'thirdPartyNotices':'Public notice document available'})
for prefix in ['','/sq']:
 for name in ['privacy','terms','cookies']:
  status,headers,body=fetch(prefix+'/'+name)
  assert status==200
  assert 'Use fictional company' not in body and 'demonstration privacy' not in body
  assert 'info@kobags-group.com' in body or name=='cookies'
checks.append({'policyPages':'EN/SQ technical disclosures and contact details resolve'})
result={'status':'passed','scope':'read-only isolated compiled Worker','checks':checks}
(ROOT/'evidence/launch-http-checks.json').write_text(json.dumps(result,indent=2)+'\n')
print('PASS launch HTTP:',len(checks),'groups')
