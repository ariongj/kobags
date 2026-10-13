"""Read-only canonical redirect checks against a business-origin local Worker.

Never follows redirects, including the hostile-path regression probes.
"""
import json
import os
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

BASE = os.environ.get('KOBAGS_BASE_URL', 'http://127.0.0.1:8788').rstrip('/')
assert urlparse(BASE).hostname in ('127.0.0.1', 'localhost'), 'Local QA only'
ORIGIN = 'https://kobags-group.com'
ROOT = Path(__file__).resolve().parents[1]

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = build_opener(NoRedirect)

def request(path, host, method='GET'):
    # Wrangler's local gateway uses this header in its own unstable_dev fetch
    # helper to represent the remote request URL; no request leaves localhost.
    # The production application does not read or trust this header.
    req = Request(BASE + path, headers={
        'Host': host,
        'MF-Original-URL': 'https://' + host + path,
        'User-Agent': 'Kobags canonical redirect QA',
    }, method=method)
    try:
        with opener.open(req, timeout=20) as r:
            return r.status, {k.lower(): v for k, v in r.headers.items()}
    except HTTPError as e:
        return e.code, {k.lower(): v for k, v in e.headers.items()}

checks = []
for host in ['kobags.itdks.tech', 'www.kobags-group.com', 'kobags-bag-studio.ariongj.chatgpt.site']:
    for method in ['GET', 'HEAD']:
        for path in ['/', '/sq/products/box-bag?utm_source=launch', '//outside.invalid/path?x=1', '/%2f%2foutside.invalid/path', '/%5coutside.invalid/path', '/request/qa-placeholder?from=launch', '/sq/request/qa-placeholder', '/cms', '/sq/cms']:
            status, headers = request(path, host, method)
            assert status == 308, (host, method, path, status)
            location = headers.get('location', '')
            url = urlparse(location)
            assert url.scheme == 'https' and url.netloc == 'kobags-group.com', (path, location)
            assert url.path == urlparse(BASE + path).path and url.query == urlparse(BASE + path).query, (path, location)
            assert headers.get('referrer-policy') == 'no-referrer'
            assert headers.get('x-content-type-options') == 'nosniff'
            assert headers.get('x-frame-options') == 'SAMEORIGIN'
            assert "object-src 'none'" in headers.get('content-security-policy', '')
            assert 'camera=()' in headers.get('permissions-policy', '')
            # Miniflare keeps the transport protocol even when its original-URL
            # header changes the hostname. HTTP previews cannot verify HSTS.
            if urlparse(BASE).scheme == 'https':
                assert headers.get('strict-transport-security') == 'max-age=15552000'
            if url.path.startswith(('/request/', '/sq/request/', '/cms', '/sq/cms')):
                assert headers.get('cache-control') == 'private, no-store', (path, headers.get('cache-control'))
            checks.append({'host': host, 'method': method, 'path': path, 'location': location})
for path, host in [('/', 'kobags-group.com'), ('/', '127.0.0.1:8788'), ('/api/unknown-launch-probe', 'kobags.itdks.tech')]:
    status, headers = request(path, host)
    assert status not in [301, 302, 303, 307, 308], (host, path, status, headers.get('location'))
report = {'status': 'passed', 'base': BASE, 'canonicalOrigin': ORIGIN, 'redirectChecks': checks,
          'hstsVerified': urlparse(BASE).scheme == 'https',
          'checks': ['known aliases redirect to pinned business origin', 'GET/HEAD retain path and query', 'double-slash and encoded separator paths cannot redirect off-site', 'private-link referrer suppressed and private routes are not cached', 'canonical host/local preview/API routes do not redirect']}
(ROOT / 'evidence/canonical-redirect-checks-2026-10-14.json').write_text(json.dumps(report, indent=2) + '\n')
print('PASS canonical redirects:', len(checks), 'alias/method/path cases and three exclusions')
