"""Read-only launch checks on the owner's approved current public domain.

Run after Sites confirms successful publication. Creates no inquiry or email.
The result stays in the private handoff directory, outside deployed assets.
"""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

BASE = 'https://kobags.itdks.tech'
ROOT = Path(__file__).resolve().parents[1]


def fetch(path):
    request = Request(BASE + path, headers={'User-Agent': 'Mozilla/5.0 Kobags launch verification'})
    try:
        response = urlopen(request, timeout=40)
    except HTTPError as error:
        response = error
    with response:
        return response.status, {key.lower(): value for key, value in response.headers.items()}, response.read()


class Canonical(HTMLParser):
    value = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.value = attrs.get('href')


checks = []
status, headers, body = fetch('/')
assert status == 200, ('home', status)
canonical = Canonical()
canonical.feed(body.decode())
assert canonical.value and canonical.value.rstrip('/') == BASE, canonical.value
assert headers.get('x-content-type-options') == 'nosniff', headers
assert headers.get('strict-transport-security', '').startswith('max-age='), headers
assert "object-src 'none'" in headers.get('content-security-policy', ''), headers
checks.append({'home': status, 'canonical': canonical.value, 'HTTPSAndSecurityHeaders': 'passed'})

status, headers, body = fetch('/api/inquiries')
assert status == 200 and json.loads(body).get('enabled') is True, ('intake', status, body[:150])
assert 'no-store' in headers.get('cache-control', '')
cookie = headers.get('set-cookie', '')
assert all(flag in cookie for flag in ['__Host-kobags-demo=', 'HttpOnly', 'SameSite=Lax', 'Secure'])
checks.append({'realInquiriesEnabled': True, 'browserCookieProtection': 'passed', 'testInquiryCreated': False})

status, _, body = fetch('/sitemap.xml')
assert status == 200
urls = [entry.text for entry in ET.fromstring(body).findall('{*}url/{*}loc')]
assert len(urls) == 48 and len(set(urls)) == 48 and all(url.startswith(BASE + '/') or url == BASE for url in urls)
checks.append({'sitemap': status, 'uniqueCurrentDomainURLs': len(urls)})

for path in ['/handoff', '/documents/kobags-source.zip', '/documents/kobags-media.zip', '/__kobags_static/documents/kobags-source.zip']:
    status, _, _ = fetch(path)
    assert status == 404, (path, status)
    checks.append({'privateOwnerArtifact': path, 'status': status})

status, headers, _ = fetch('/api/cms/inquiries')
assert status == 401 and 'no-store' in headers.get('cache-control', ''), ('anonymous CMS', status)
checks.append({'anonymousCmsAccess': status, 'privateCachePolicy': 'passed'})

status, headers, body = fetch('/documents/third-party-notices.txt')
assert status == 200 and b'KOBAGS WEBSITE' in body
assert 'noindex' in headers.get('x-robots-tag', '')
checks.append({'softwareNotices': status, 'searchExclusion': 'passed'})

result = {'status': 'passed', 'domain': BASE, 'scope': 'read-only production checks after successful Sites deployment', 'checks': checks}
output = ROOT / 'deliverables/handoff/live-verification.json'
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps(result, indent=2))
