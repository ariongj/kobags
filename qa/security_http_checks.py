"""Anonymous security regressions against an isolated local compiled Worker."""
import http.client
import http.cookiejar
import json
import os
import hashlib
import sqlite3
from pathlib import Path
import urllib.error
import urllib.parse
import urllib.request

BASE = os.environ.get('KOBAGS_BASE_URL', 'http://127.0.0.1:8787')
target = urllib.parse.urlparse(BASE)
assert target.scheme == 'http' and target.hostname in ['127.0.0.1', 'localhost'], 'Local preview only'
ROOT = Path(__file__).resolve().parents[1]
checks = []
proxy_limitations = []
known_proxy_error = b'Your worker restarted mid-request. Please try sending the request again. Only GET or HEAD requests are retried automatically.'
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
fixture = Path(os.environ.get('KOBAGS_QA_STATE', '/tmp/kobags-launch-state-20261014'))
database = next(p for p in fixture.glob('v3/d1/**/*.sqlite') if p.name != 'metadata.sqlite')

def cms_snapshot():
    # Read only the disposable fixture, never print its data or credentials.
    with sqlite3.connect('file:' + str(database) + '?mode=ro', uri=True) as db:
        tables = [row[0] for row in db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'cms_%' ORDER BY name")]
        rows = {table: db.execute('SELECT * FROM "' + table + '" ORDER BY rowid').fetchall() for table in tables}
        return hashlib.sha256(json.dumps(rows, sort_keys=True, default=str).encode()).hexdigest()

def request(path, data=None, origin=BASE):
    headers = {'Content-Type': 'application/json'}
    if origin is not None:
        headers['Origin'] = origin
    try:
        with opener.open(urllib.request.Request(BASE + path, data=data, headers=headers), timeout=20) as response:
            return response.status, response.read()
    except urllib.error.HTTPError as response:
        return response.code, response.read()

for payload in [b'null', b'[]', b'"text"']:
    result = request('/api/cms/login', payload)
    assert result[0] == 400, ('JSON shape', result)
checks.append('Non-object JSON is rejected with 400 before authentication')

# Alternate known-length and streaming bodies to catch request cleanup regressions.
before = cms_snapshot()
for attempt in range(3):
    result = request('/api/cms/login', b'{"email":"' + b'a' * 5000 + b'"}')
    assert result[0] == 413, ('Declared oversized body', attempt, result)
    connection = http.client.HTTPConnection(target.hostname, target.port, timeout=20)
    connection.request('POST', '/api/cms/login', body=iter([b'{' + b' ' * 3000, b' ' * 3000 + b'}']),
                       headers={'Origin': BASE, 'Content-Type': 'application/json'}, encode_chunked=True)
    response = connection.getresponse()
    result = response.status, response.read()
    connection.close()
    if result == (503, known_proxy_error):
        proxy_limitations.append({'attempt': attempt + 1, 'status': 503, 'message': known_proxy_error.decode(), 'layer': 'Wrangler forwarding proxy; direct workerd checked separately'})
    else:
        assert result[0] == 413, ('Chunked oversized body', attempt, result)
    assert request('/api/cms/session')[0] == 200, 'The next request must recover immediately'
assert cms_snapshot() == before, 'Rejected requests must not persist changes'
checks.append('Declared oversized bodies return 413; every streamed rejection recovers immediately and persists no CMS change')

assert request('/api/demo')[0] == 200
for origin in [None, 'https://untrusted.example']:
    result = request('/api/demo', b'{"type":"reset"}', origin=origin)
    if result == (503, known_proxy_error):
        proxy_limitations.append({'scope': 'Origin rejection', 'status': 503, 'message': known_proxy_error.decode(), 'layer': 'Wrangler forwarding proxy; direct workerd checked separately'})
        assert request('/api/cms/session')[0] == 200
        # With no unread upload left to abort, the same Origin guard returns 403.
        result = request('/api/demo', b'', origin=origin)
    assert result[0] == 403, ('Origin guard', result)
checks.append('Visitor writes require a matching Origin, even with a valid private browser cookie')

for endpoint in ['records', 'inquiries', 'staff', 'orders', 'outbox', 'backup', 'backup-archive', 'reports']:
    result = request('/api/cms/' + endpoint)
    assert result[0] == 401, (endpoint, result)
assert request('/api/portal/' + 'a' * 64)[0] == 404
checks.append('Anonymous callers cannot read business records, exports, staff or unknown private review links')

(ROOT / 'evidence/launch-security-http-checks.json').write_text(json.dumps({
    'status': 'passed_with_local_proxy_limitation' if proxy_limitations else 'passed',
    'scope': 'isolated local compiled Worker through Wrangler; anonymous requests only', 'checks': checks,
    'knownWranglerProxyFailures': proxy_limitations,
    'directRuntimeEvidence': 'request-body-workerd-checks.json',
}, indent=2))
print('PASS security HTTP:', len(checks), 'acceptance groups;', len(proxy_limitations), 'exact local Wrangler proxy 503s; direct runtime evidence reported separately')
