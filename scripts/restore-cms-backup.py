"""Restore a CMS database backup into an EMPTY local SQLite database for recovery testing.

Usage: python3 scripts/restore-cms-backup.py backup.json new-local-database.sqlite
The target must not already exist. Staff identities, live email credentials and portal
access links are intentionally not restored. Keep the matching R2 objects separately.
Never point this at a running application's database.
"""
import json,sqlite3,sys,tarfile,hashlib,tempfile
from pathlib import Path
TABLES=['cms_records','cms_versions','cms_companies','cms_inquiries','cms_quotes','cms_media','cms_artwork','cms_approvals','cms_orders','cms_events','cms_outbox','cms_redirects']
def restore(source,target):
 source,target=Path(source),Path(target)
 if target.exists():raise ValueError('Target already exists. Choose a new local database file.')
 backup=json.loads(source.read_text())
 if backup.get('format')!='kobags-cms-backup-v1':raise ValueError('Unrecognized backup format.')
 root=Path(__file__).resolve().parents[1]
 connection=sqlite3.connect(target)
 try:
  for migration in sorted((root/'drizzle').glob('*.sql')):connection.executescript(migration.read_text())
  connection.execute('BEGIN')
  for table in TABLES:
   fields={row[1] for row in connection.execute(f'PRAGMA table_info("{table}")')}
   for row in backup.get(table,[]):
    if not isinstance(row,dict) or not set(row)<=fields:raise ValueError('Invalid fields in '+table)
    keys=list(row)
    # Email is never replayed automatically after a restore.
    if table=='cms_outbox' and row.get('status')!='sent':row['status']='pending';row['error']='Restored: verify provider delivery before resending.'
    columns=','.join('"'+key+'"' for key in keys)
    connection.execute(f'INSERT INTO "{table}" ({columns}) VALUES ({",".join("?" for _ in keys)})',[row[key] for key in keys])
  assert connection.execute('PRAGMA integrity_check').fetchone()[0]=='ok'
  connection.commit()
  return {table:connection.execute(f'SELECT count(*) FROM "{table}"').fetchone()[0] for table in TABLES}
 except Exception:
  connection.rollback();connection.close();target.unlink(missing_ok=True);raise
 finally:connection.close()
def restore_archive(source,target,files_target):
 target,files_target=Path(target),Path(files_target)
 if target.exists() or files_target.exists():raise ValueError('Recovery targets must not already exist.')
 # Only declared object keys are written; never extract arbitrary archive paths.
 with tarfile.open(source,'r:') as archive:
  metadata=archive.extractfile('backup.json')
  if metadata is None:raise ValueError('Missing backup.json')
  data=json.load(metadata)
  expected=[row for row in data.get('cms_media',[]) if not row['object_key'].startswith('asset:')]
  import re,shutil
  try:
   files_target.mkdir(parents=True)
   for row in expected:
    key=row['object_key']
    if not re.fullmatch(r'(public|private)/[a-f0-9-]+',key):raise ValueError('Invalid object key')
    member=archive.getmember('files/'+key)
    if not member.isfile() or member.size!=row['size']:raise ValueError('Missing or invalid object: '+key)
    stream=archive.extractfile(member);destination=files_target/key;destination.parent.mkdir(exist_ok=True)
    digest=hashlib.sha256()
    with destination.open('xb') as output:
     while chunk:=stream.read(1024*1024):output.write(chunk);digest.update(chunk)
    if digest.hexdigest()!=row['hash']:raise ValueError('Checksum mismatch: '+key)
   with tempfile.TemporaryDirectory(prefix='kobags-restore-metadata-') as folder:
    metadata_path=Path(folder)/'backup.json';metadata_path.write_text(json.dumps(data));counts=restore(metadata_path,target)
   return {'tables':counts,'verifiedFiles':len(expected)}
  except Exception:
   shutil.rmtree(files_target);raise
if __name__=='__main__':
 if len(sys.argv)==4:result=restore_archive(sys.argv[1],sys.argv[2],sys.argv[3])
 elif len(sys.argv)==3:result=restore(sys.argv[1],sys.argv[2])
 else:raise SystemExit(__doc__+'\nFull archive: python3 scripts/restore-cms-backup.py full-backup.tar new.sqlite new-files-folder')
 print(json.dumps(result,indent=2))
