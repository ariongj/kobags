"""Recovery regressions use complete synthetic snapshots and fresh local targets."""
import importlib.util
import json
from pathlib import Path
import sqlite3
import tempfile

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('cms_restore', ROOT / 'scripts/restore-cms-backup.py')
restore = importlib.util.module_from_spec(spec)
spec.loader.exec_module(restore)
checks = []

with tempfile.TemporaryDirectory(prefix='kobags-recovery-check-') as folder:
    folder = Path(folder)
    original = sqlite3.connect(':memory:')
    original.row_factory = sqlite3.Row
    for migration in sorted((ROOT / 'drizzle').glob('*.sql')):
        original.executescript(migration.read_text())
    snapshot = {table: [dict(row) for row in original.execute('SELECT * FROM ' + table)] for table in restore.TABLES}
    snapshot['format'] = 'kobags-cms-backup-v1'
    assert any(row['id'] == 'collection-smiley' for row in snapshot['cms_records'])
    source = folder / 'backup.json'
    source.write_text(json.dumps(snapshot))
    target = folder / 'recovered.sqlite'
    counts = restore.restore(source, target)
    assert counts == {table: len(snapshot[table]) for table in restore.TABLES}
    checks.append('Complete snapshots restore without colliding with collection rows seeded by historical migrations')

    before = target.read_bytes()
    try:
        restore.restore(source, target)
        raise AssertionError('Existing target was overwritten')
    except ValueError:
        assert target.read_bytes() == before
    checks.append('Existing databases cannot be overwritten')

    for name, malformed in [
        ('missing-table', {key: value for key, value in snapshot.items() if key != 'cms_inquiries'}),
        ('invalid-table', {**snapshot, 'cms_inquiries': None}),
        ('invalid-format', {**snapshot, 'format': 'other'}),
    ]:
        source.write_text(json.dumps(malformed))
        rejected_target = folder / (name + '.sqlite')
        try:
            restore.restore(source, rejected_target)
            raise AssertionError('Incomplete backup was accepted')
        except ValueError:
            assert not rejected_target.exists()
    checks.append('Missing or malformed table data is rejected before a recovery target is created')

    duplicate = {**snapshot, 'cms_records': [*snapshot['cms_records'], snapshot['cms_records'][0]]}
    source.write_text(json.dumps(duplicate))
    failed_target = folder / 'duplicate.sqlite'
    try:
        restore.restore(source, failed_target)
        raise AssertionError('Duplicate records were accepted')
    except sqlite3.IntegrityError:
        assert not failed_target.exists()
    checks.append('Invalid record sets fail atomically and remove the incomplete recovery target')

(ROOT / 'evidence/backup-recovery-checks.json').write_text(json.dumps({
    'status': 'passed', 'scope': 'synthetic local SQLite backups only', 'checks': checks,
}, indent=2))
print('PASS backup recovery:', len(checks), 'acceptance groups')
