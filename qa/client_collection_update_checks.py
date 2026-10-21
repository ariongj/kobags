"""Verify client stock/photo changes without touching a live database."""
import copy
import json
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sql = (ROOT / 'drizzle/0006_client_collection_update.sql').read_text()
checks = []
for mode in ['published', 'customized', 'unpublished', 'archived']:
    c = sqlite3.connect(':memory:')
    for p in sorted((ROOT / 'drizzle').glob('*.sql')):
        if p.name < '0006_':
            c.executescript(p.read_text())
    before = {}
    for slug in ['smiley', 'thank-you']:
        key = 'collection-' + slug
        data = json.loads(c.execute('SELECT draft FROM cms_records WHERE id=?', (key,)).fetchone()[0])
        data['description']['en'] = 'Preserve the editor wording'
        data['image'] = '/assets/earlier-client-photo.jpg'
        if mode == 'customized':
            data['collection']['variants'].append(dict(id='custom', gsm=70, color='Blue', colorSq='Blu', status='check'))
        published = None if mode == 'unpublished' else copy.deepcopy(data)
        c.execute('UPDATE cms_records SET draft=?,published=?,revision=12,archived=? WHERE id=?',
                  (json.dumps(data), json.dumps(published) if published else None, int(mode == 'archived'), key))
        before[key] = [data, published]
    c.executescript(sql)
    for key, original in before.items():
        d, p, revision = c.execute('SELECT draft,published,revision FROM cms_records WHERE id=?', (key,)).fetchone()
        for old, new in zip(original, [json.loads(d), json.loads(p) if p else None]):
            if old is None:
                assert new is None
                continue
            expected = copy.deepcopy(old)
            if mode != 'archived':
                if key == 'collection-smiley':
                    for variant in expected['collection']['variants']:
                        variant['status'] = 'out'
                else:
                    expected['image'] = '/assets/client-2026-10/thank-you-stock.jpg'
            assert new == expected, (mode, key, new)
        assert revision == (12 if mode == 'archived' else 13)
        backups = c.execute("SELECT data FROM cms_versions WHERE record_id=? AND id LIKE 'collections-20261021-%' ORDER BY id", (key,)).fetchall()
        assert len(backups) == (0 if mode == 'archived' else 1 if mode == 'unpublished' else 2)
        if backups:
            assert json.loads(backups[0][0]) == original[0]
    rows = c.execute('SELECT * FROM cms_records ORDER BY id').fetchall()
    history = c.execute('SELECT * FROM cms_versions ORDER BY id').fetchall()
    c.executescript(sql)
    assert rows == c.execute('SELECT * FROM cms_records ORDER BY id').fetchall()
    assert history == c.execute('SELECT * FROM cms_versions ORDER BY id').fetchall()
    if mode not in ['archived', 'unpublished']:
        # Future staff restocking and replacement photos must remain authoritative.
        c.execute("UPDATE cms_records SET published=json_set(published,'$.collection.variants[0].status','available'),revision=revision+1,mutation='staff-restock' WHERE id='collection-smiley'")
        c.execute("UPDATE cms_records SET published=json_set(published,'$.image','/assets/future-approved.jpg'),revision=revision+1,mutation='staff-photo' WHERE id='collection-thank-you'")
        rows = c.execute('SELECT * FROM cms_records ORDER BY id').fetchall()
        c.executescript(sql)
        assert rows == c.execute('SELECT * FROM cms_records ORDER BY id').fetchall()
    checks.append(mode + ': stock/photo changed only as requested, history preserved, repeat safe')
    c.close()
(ROOT / 'evidence/client-collection-update-checks.json').write_text(json.dumps({'status':'passed','checks':checks},indent=2)+'\n')
print('PASS', len(checks), 'client collection migration fixtures')
