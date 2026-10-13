"""Read-only SEO crawl; can run alongside isolated browser checks without WebGL."""
import json
import os
from pathlib import Path
import sys
from urllib.parse import urlparse
from urllib.request import urlopen, Request
from urllib.error import HTTPError
import xml.etree.ElementTree as ET
from seo_checks import Document

BASE = os.environ.get('KOBAGS_BASE_URL', 'http://127.0.0.1:8787').rstrip('/')
ORIGIN = os.environ.get('KOBAGS_CANONICAL_ORIGIN', 'https://kobags.itdks.tech').rstrip('/')
ROOT = Path(__file__).resolve().parents[1]

def get(path):
    try:
        with urlopen(Request(BASE + path, headers={'User-Agent': 'Kobags launch SEO QA'}), timeout=25) as r:
            return r.status, dict(r.headers), r.read().decode('utf-8')
    except HTTPError as e:
        return e.code, dict(e.headers), e.read().decode('utf-8')

status, headers, xml = get('/sitemap.xml')
assert status == 200 and 'xml' in headers.get('Content-Type', ''), (status, headers)
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'x': 'http://www.w3.org/1999/xhtml'}
entries = ET.fromstring(xml).findall('s:url', ns)
urls = [e.find('s:loc', ns).text for e in entries]
assert len(urls) >= 48 and len(urls) == len(set(urls))
status, headers, robots = get('/robots.txt')
assert status == 200 and 'Sitemap: ' + ORIGIN + '/sitemap.xml' in robots and 'Disallow: /\n' not in robots
pages = []
titles, descriptions = {'en': set(), 'sq': set()}, {'en': set(), 'sq': set()}
for entry, url in zip(entries, urls):
    assert url == ORIGIN or url.startswith(ORIGIN + '/'), url
    path = urlparse(url).path or '/'
    lang = 'sq' if path == '/sq' or path.startswith('/sq/') else 'en'
    status, headers, source = get(path)
    assert status == 200, (path, status)
    doc, head = Document(source), Document(source.split('</head>', 1)[0])
    assert doc.lang == lang and len(doc.h1) == 1 and len(doc.titles) == 1, path
    assert doc.meta_one('robots') == 'index, follow' and 'noindex' not in headers.get('X-Robots-Tag', ''), path
    assert doc.canonical() == url and head.canonical() == url, path
    assert doc.meta_one('description') == head.meta_one('description'), path
    assert doc.titles[0] not in titles[lang], (path, 'duplicate title')
    assert doc.meta_one('description') not in descriptions[lang], (path, 'duplicate description')
    titles[lang].add(doc.titles[0]); descriptions[lang].add(doc.meta_one('description'))
    alternates = {x['hreflang']: x['href'] for x in doc.links if x.get('rel') == 'alternate' and x.get('hreflang')}
    xml_alternates = {x.attrib['hreflang']: x.attrib['href'] for x in entry.findall('x:link', ns)}
    assert alternates == xml_alternates and alternates[lang] == url, path
    assert set(alternates) == {'en', 'sq', 'x-default'} and all(v in urls for v in alternates.values())
    assert doc.meta_one('og:url') == url and doc.meta_one('twitter:card') == 'summary_large_image'
    image = doc.meta_one('og:image'); assert image.startswith(ORIGIN + '/'), image
    nodes = [n for data in doc.schemas for n in data.get('@graph', [data])]
    org = next(n for n in nodes if n.get('@type') == 'Organization')
    assert org['@id'] == ORIGIN + '/#organization' and org['url'] == ORIGIN + '/'
    assert any(n.get('@type') == 'WebSite' for n in nodes)
    if path.endswith('/bags-kosovo'):
        service = next(n for n in nodes if n.get('@type') == 'Service')
        places = service['areaServed']['containsPlace']
        assert len(places) == 38 and len({p['name'] for p in places}) == 38
        assert all(p['name'] in source for p in places)
        assert service['provider']['@id'] == org['@id']
    if '/products/' in path:
        product = next(n for n in nodes if n.get('@type') == 'Product')
        assert not any(key in product for key in ['offers', 'aggregateRating', 'review'])
    pages.append({'path': path, 'title': doc.titles[0], 'language': lang})
for path in ['/quote', '/privacy', '/terms', '/cookies', '/cms']:
    status, headers, source = get(path)
    assert status == 200 and 'noindex' in Document(source).meta_one('robots'), (path, status)
    assert ORIGIN + path not in urls
for path in ['/handoff', '/sq/handoff', '/missing-launch-page', '/products/missing-bag']:
    status, headers, source = get(path)
    assert status == 404, (path, status)
for path in ['/products/box-bag?utm_source=launch', '/design?model=coffee-test']:
    status, headers, source = get(path)
    assert status == 200 and Document(source).canonical() == ORIGIN + path.split('?')[0]
status, headers, notice = get('/documents/third-party-notices.txt')
assert status == 200 and 'text/plain' in headers.get('Content-Type', '')
assert 'noindex' in headers.get('X-Robots-Tag', '') and 'THIRD-PARTY SOFTWARE NOTICES' in notice
report = {'status': 'passed', 'base': BASE, 'canonicalOrigin': ORIGIN, 'sitemapUrls': len(urls), 'pages': pages,
          'checks': ['crawler-visible unique titles and descriptions', 'canonical/hreflang/sitemap consistency', 'source-backed structured data and all 38 municipalities', 'private pages excluded', 'former handoff/unknown pages return404', 'query URLs canonicalize', 'third-party software notices accessible and noindex']}
output = ROOT / ('evidence/seo-http-' + ('business' if ORIGIN == 'https://kobags-group.com' else 'review') + '-2026-10-14.json')
output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + '\n')
print('PASS HTTP SEO:', len(urls), 'URLs; canonical:', ORIGIN)
