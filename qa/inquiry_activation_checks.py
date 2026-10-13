"""Exercise the shipped launch-activation SQL with isolated SQLite fixtures only."""
from concurrent.futures import ThreadPoolExecutor
import json
import os
from pathlib import Path
import sqlite3
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
node = os.environ.get('NODE_BINARY', '/home/codex/.local/share/node-v22.23.1/bin/node')
statements = json.loads(subprocess.check_output([
    node, '--experimental-strip-types', '--input-type=module', '-e',
    "import {inquiryActivationStatements} from './lib/cms/launch-activation.ts'; console.log(JSON.stringify(inquiryActivationStatements));",
], cwd=ROOT, text=True))

def database(path=':memory:'):
    db = sqlite3.connect(path)
    for migration in sorted((ROOT / 'drizzle').glob('*.sql')):
        db.executescript(migration.read_text())
    return db

def settings(db, published=True, archived=False, enabled=False):
    draft = {'title': {'en': 'Unpublished draft title'}, 'settings': {'liveInquiries': enabled, 'email': 'draft@example.test', 'moq': 7123, 'social': {'linkedin': 'https://www.linkedin.com/company/example/'}}}
    live = {'title': {'en': 'Published title'}, 'settings': {'liveInquiries': enabled, 'email': 'live@example.test', 'moq': 5000}}
    db.execute('INSERT INTO cms_records(id,kind,slug,draft,published,revision,archived,mutation,updated_at) VALUES(?,?,?,?,?,7,?,?,?)',
               ('global-settings', 'settings', 'global-settings', json.dumps(draft), json.dumps(live) if published else None, int(archived), 'fixture', '2026-10-01'))
    db.commit()
    return draft, live

def activate(db):
    db.execute('BEGIN IMMEDIATE')
    try:
        for statement in statements:
            db.execute(statement)
        db.commit()
    except Exception:
        db.rollback()
        raise

def state(db):
    row = db.execute("SELECT draft,published,revision,mutation FROM cms_records WHERE id='global-settings'").fetchone()
    return (json.loads(row[0]), json.loads(row[1]) if row[1] else None, row[2], row[3]) if row else None

checks = []
db = database()
activate(db)
assert state(db) is None and db.execute('SELECT COUNT(*) FROM cms_events').fetchone()[0] == 0
original_draft, original_live = settings(db)
activate(db)
draft, live, revision, mutation = state(db)
assert draft == {**original_draft, 'settings': {**original_draft['settings'], 'liveInquiries': True}}
assert live == {**original_live, 'settings': {**original_live['settings'], 'liveInquiries': True}}
assert revision == 8
snapshots = db.execute("SELECT data FROM cms_versions WHERE record_id='global-settings' ORDER BY action").fetchall()
assert {json.dumps(json.loads(row[0]), sort_keys=True) for row in snapshots} == {json.dumps(original_draft, sort_keys=True), json.dumps(original_live, sort_keys=True)}
assert db.execute("SELECT COUNT(*) FROM cms_events WHERE action='live-inquiries-activated'").fetchone()[0] == 1
checks.append('Only the approved flag changes; draft/public differences, custom settings, prior snapshots and revision history are preserved')
activate(db)
assert state(db)[2] == 8 and db.execute("SELECT COUNT(*) FROM cms_versions WHERE record_id='global-settings'").fetchone()[0] == 2
db.execute("UPDATE cms_records SET draft=json_set(draft,'$.settings.liveInquiries',json('false')),published=json_set(published,'$.settings.liveInquiries',json('false')),revision=revision+1")
db.commit()
activate(db)
assert state(db)[0]['settings']['liveInquiries'] is False and state(db)[1]['settings']['liveInquiries'] is False and state(db)[2] == 9
checks.append('Repeated activation is idempotent and never overrides a later CMS disable action')

for published, archived in [(False, False), (True, True)]:
    isolated = database()
    settings(isolated, published=published, archived=archived)
    before = state(isolated)
    activate(isolated)
    assert state(isolated) == before
    assert isolated.execute("SELECT COUNT(*) FROM cms_versions WHERE record_id='global-settings'").fetchone()[0] == 0
    assert isolated.execute('SELECT COUNT(*) FROM cms_events').fetchone()[0] == 0
checks.append('Missing, unpublished and archived settings are not published, recreated or activated')

enabled = database()
settings(enabled, enabled=True)
activate(enabled)
assert state(enabled)[2] == 7 and enabled.execute("SELECT COUNT(*) FROM cms_versions WHERE record_id='global-settings'").fetchone()[0] == 0
assert enabled.execute('SELECT COUNT(*) FROM cms_events').fetchone()[0] == 1
checks.append('An already enabled site receives the one-time marker without unnecessary content revisions')

with tempfile.TemporaryDirectory(prefix='kobags-activation-') as folder:
    path = Path(folder) / 'concurrent.sqlite'
    concurrent = database(path)
    settings(concurrent)
    concurrent.close()
    def worker(_):
        connection = sqlite3.connect(path, timeout=10)
        try: activate(connection)
        finally: connection.close()
    with ThreadPoolExecutor(max_workers=2) as pool:
        list(pool.map(worker, range(2)))
    concurrent = sqlite3.connect(path)
    assert state(concurrent)[2] == 8
    assert concurrent.execute('SELECT COUNT(*) FROM cms_events').fetchone()[0] == 1
    assert concurrent.execute("SELECT COUNT(*) FROM cms_versions WHERE record_id='global-settings'").fetchone()[0] == 2
checks.append('Concurrent transactions produce one activation, one revision increment and one pair of original snapshots')

(ROOT / 'evidence/inquiry-activation-checks.json').write_text(json.dumps({'status': 'passed', 'scope': 'isolated local SQLite; shipped activation SQL; no production records touched', 'checks': checks}, indent=2))
print('PASS inquiry activation:', len(checks), 'acceptance groups')
