"""Public caching and private-file isolation on the disposable local launch fixture."""
import http.cookiejar
import json
import os
from pathlib import Path
import sqlite3
import struct
import zlib
import urllib.error
import urllib.parse
import urllib.request

BASE = os.environ.get('KOBAGS_BASE_URL', 'http://127.0.0.1:8787')
target = urllib.parse.urlparse(BASE)
assert target.scheme == 'http' and target.hostname in ['127.0.0.1', 'localhost'], 'Local preview only'
ROOT = Path(__file__).resolve().parents[1]
fixture = Path(os.environ.get('KOBAGS_QA_STATE', '/tmp/kobags-launch-state-20261014'))
database = next(p for p in fixture.glob('v3/d1/**/*.sqlite') if p.name != 'metadata.sqlite')
with sqlite3.connect('file:' + str(database) + '?mode=ro', uri=True) as db:
    rows = {visibility: db.execute("SELECT id,inquiry_id FROM cms_media WHERE visibility=? AND object_key NOT LIKE 'asset:%' AND (visibility='public' OR EXISTS(SELECT 1 FROM cms_artwork WHERE media_id=cms_media.id)) ORDER BY created_at DESC LIMIT 1", (visibility,)).fetchone() for visibility in ['public', 'private']}
    ids = {visibility: row[0] if row else None for visibility, row in rows.items()}
    private_inquiry = rows['private'][1]

guest = urllib.request.build_opener()
owner = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))

def request(client, path, data=None, extra_headers=None, method=None):
    headers = {'Origin': BASE, 'Content-Type': 'application/json', 'cf-connecting-ip': '198.19.147.82'}
    headers.update(extra_headers or {})
    encoded = json.dumps(data).encode() if data is not None else None
    try:
        with client.open(urllib.request.Request(BASE + path, data=encoded, headers=headers, method=method), timeout=20) as response:
            return response.status, dict(response.headers), response.read()
    except urllib.error.HTTPError as response:
        return response.code, dict(response.headers), response.read()

def header(headers, name):
    return next((v for k, v in headers.items() if k.lower() == name), None)

def ranges_and_validators(client, url, full, cache):
    size = len(full[2])
    etag = header(full[1], 'etag')
    assert etag and header(full[1], 'accept-ranges') == 'bytes'
    for value, start, end in [('bytes=0-1', 0, 1), ('bytes=-3', size - 3, size - 1), ('bytes=2-', 2, size - 1), ('bytes=1-' + str(size + 999), 1, size - 1)]:
        partial = request(client, url, extra_headers={'Range': value})
        assert partial[0] == 206, (value, partial[0])
        assert partial[2] == full[2][start:end + 1]
        assert header(partial[1], 'content-range') == f'bytes {start}-{end}/{size}'
        # Wrangler may transfer the streamed response with chunked framing.
        # Either framing is valid; the exact payload and Content-Range are mandatory.
        length = header(partial[1], 'content-length')
        assert length == str(end - start + 1) if length is not None else header(partial[1], 'transfer-encoding') == 'chunked'
        assert header(partial[1], 'cache-control') == cache
        assert header(partial[1], 'referrer-policy') == 'no-referrer'
    for value in ['bytes=' + str(size) + '-', 'bytes=-0', 'bytes=3-1', 'bytes=0-1,4-5']:
        invalid = request(client, url, extra_headers={'Range': value})
        assert invalid[0] == 416 and not invalid[2]
        assert header(invalid[1], 'content-range') == 'bytes */' + str(size)
        assert header(invalid[1], 'cache-control') == 'private, no-store'
    head = request(client, url, method='HEAD', extra_headers={'Range': 'bytes=0-1'})
    assert head[0] == 200 and not head[2]
    assert header(head[1], 'content-length') == str(size)
    assert header(head[1], 'content-range') is None
    assert header(head[1], 'etag') == etag and header(head[1], 'cache-control') == cache
    cached = request(client, url, extra_headers={'If-None-Match': etag, 'Range': 'bytes=0-1'})
    assert cached[0] == 304 and not cached[2]
    assert header(cached[1], 'cache-control') == cache
    current = request(client, url, extra_headers={'Range': 'bytes=0-1', 'If-Range': etag})
    assert current[0] == 206 and current[2] == full[2][:2]
    for validator in ['"stale"', 'W/' + etag]:
        stale = request(client, url, extra_headers={'Range': 'bytes=0-1', 'If-Range': validator})
        assert stale[0] == 200 and stale[2] == full[2]

checks = []
password = Path(os.environ.get('KOBAGS_QA_PASSWORD_FILE', '/tmp/kobags-stock-qa-password')).read_text().strip()
login = request(owner, '/api/cms/login', {'email': os.environ.get('KOBAGS_QA_EMAIL', 'info@itdks.tech'), 'password': password})
assert login[0] == 200, login[0]
if not ids['public']:
    # A generated one-pixel PNG in the disposable fixture, containing no customer content.
    def png_chunk(kind, data):
        return struct.pack('>I', len(data)) + kind + data + struct.pack('>I', zlib.crc32(kind + data) & 0xffffffff)
    png = b'\x89PNG\r\n\x1a\n' + png_chunk(b'IHDR', struct.pack('>IIBBBBB', 1, 1, 8, 2, 0, 0, 0)) + png_chunk(b'IDAT', zlib.compress(b'\x00\x00\x80\x00')) + png_chunk(b'IEND', b'')
    boundary = 'kobags-launch-cache-qa'
    parts = []
    for key, value in {'visibility': 'public', 'altEn': 'Local cache test', 'altSq': 'Provë lokale e ruajtjes'}.items():
        parts.append(('--' + boundary + '\r\nContent-Disposition: form-data; name="' + key + '"\r\n\r\n' + value + '\r\n').encode())
    parts.append(('--' + boundary + '\r\nContent-Disposition: form-data; name="file"; filename="qa-public-cache.png"\r\nContent-Type: image/png\r\n\r\n').encode() + png + ('\r\n--' + boundary + '--\r\n').encode())
    upload_request = urllib.request.Request(BASE + '/api/cms/media', data=b''.join(parts), headers={'Origin': BASE, 'Content-Type': 'multipart/form-data; boundary=' + boundary})
    with owner.open(upload_request, timeout=20) as uploaded:
        assert uploaded.status == 201
        ids['public'] = json.loads(uploaded.read())['id']
public = request(guest, '/api/media/' + ids['public'])
assert public[0] == 200 and public[2]
assert header(public[1], 'cache-control') == 'public, max-age=86400'
assert header(public[1], 'referrer-policy') == 'no-referrer'
assert header(public[1], 'content-security-policy') == "default-src 'none'; sandbox"
assert header(public[1], 'set-cookie') is None
checks.append('Successful public CMS media keeps its explicit one-day public cache policy, no cookies and restrictive media CSP')
ranges_and_validators(guest, '/api/media/' + ids['public'], public, 'public, max-age=86400')
if header(public[1], 'content-type').startswith('video/'):
    assert header(public[1], 'content-disposition').startswith('inline;')
checks.append('Public media returns exact single ranges, suffixes and open ranges; invalid ranges return 416; HEAD and conditional requests preserve validators and cache rules')

for url, status in [('/api/media/' + ids['private'], 401), ('/api/media/' + ids['private'] + '?portal=' + 'b' * 64, 403), ('/api/media/not-a-real-file', 404)]:
    response = request(guest, url)
    assert response[0] == status, response[0]
    assert header(response[1], 'cache-control') == 'private, no-store'
    assert header(response[1], 'referrer-policy') == 'no-referrer'
checks.append('Unauthenticated private files, invalid review grants and missing files are blocked and never cached')

try:
    private = request(owner, '/api/media/' + ids['private'])
    assert private[0] == 200 and private[2]
    assert header(private[1], 'cache-control') == 'private, no-store'
    assert header(private[1], 'referrer-policy') == 'no-referrer'
    assert header(private[1], 'content-security-policy') == "default-src 'none'; sandbox"
    checks.append('Authorized private artwork downloads remain no-store and no-referrer with their stricter CSP intact')
    ranges_and_validators(owner, '/api/media/' + ids['private'], private, 'private, no-store')
    checks.append('Private Range, HEAD and conditional responses work after authorization and remain no-store')
    for method in ['GET', 'HEAD']:
        for extra in [{'Range': 'bytes=0-1'}, {'Range': 'bytes=999999999-'}, {'If-None-Match': header(private[1], 'etag')}]:
            denied = request(guest, '/api/media/' + ids['private'], extra_headers=extra, method=method)
            assert denied[0] == 401
            assert header(denied[1], 'etag') is None and header(denied[1], 'content-range') is None
            assert header(denied[1], 'cache-control') == 'private, no-store'
            if method == 'HEAD': assert not denied[2]
    checks.append('Anonymous private Range, HEAD and known-ETag requests cannot disclose metadata, bypass authorization or receive 304/416')
    grant = request(owner, '/api/cms/portal', {'id': private_inquiry})
    assert grant[0] == 200
    token = json.loads(grant[2])['portal'].split('/')[-1]
    portal_url = '/api/media/' + ids['private'] + '?portal=' + urllib.parse.quote(token)
    portal_file = request(guest, portal_url)
    assert portal_file[0] == 200 and portal_file[2] == private[2]
    ranges_and_validators(guest, portal_url, portal_file, 'private, no-store')
    assert request(owner, '/api/cms/portal', {'id': private_inquiry})[0] == 200
    for method in ['GET', 'HEAD']:
        revoked = request(guest, portal_url, extra_headers={'Range': 'bytes=0-1', 'If-None-Match': header(private[1], 'etag')}, method=method)
        assert revoked[0] == 403
        assert header(revoked[1], 'etag') is None and header(revoked[1], 'content-range') is None
        assert header(revoked[1], 'cache-control') == 'private, no-store'
    checks.append('Valid customer review grants support private Range/HEAD/revalidation; rotating the grant revokes access before ETag or range processing')
finally:
    assert request(owner, '/api/cms/logout', {})[0] == 200

(ROOT / 'evidence/media-cache-checks.json').write_text(json.dumps({'status': 'passed', 'scope': 'Final compiled local Worker; existing synthetic public/private R2 fixtures; temporary local staff session', 'checks': checks}, indent=2))
print('PASS media cache:', len(checks), 'acceptance groups')
