"""Verify the stock data upgrade in memory, including edits and repeat runs."""
import copy,json,sqlite3
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sql=(ROOT/'drizzle/0005_confirmed_tshirt_stock.sql').read_text()
expected=[(50,'White'),(60,'White'),(60,'Beige'),(60,'Black'),(60,'Red')]
checks=[]
for mode in ['default','custom','draft-edited','published-edited','unpublished','archived']:
 c=sqlite3.connect(':memory:')
 for p in sorted((ROOT/'drizzle').glob('*.sql')):
  if p.name<'0005_':c.executescript(p.read_text())
 old=json.loads(c.execute("SELECT draft FROM cms_records WHERE id='collection-smiley'").fetchone()[0])
 old['image']='/assets/client-approved-photo.webp'
 old['description']['en']='Client-edited description'
 custom=copy.deepcopy(old)
 custom['collection']['variants']=[dict(id='custom-row',gsm=60,color='Blue',colorSq='Blu',status='out')]
 draft=custom if mode in ['custom','draft-edited'] else old
 published=None if mode=='unpublished' else custom if mode in ['custom','published-edited'] else old
 c.execute("UPDATE cms_records SET draft=?,published=?,revision=9,archived=? WHERE id='collection-smiley'",(json.dumps(draft,ensure_ascii=False),json.dumps(published,ensure_ascii=False) if published else None,int(mode=='archived')))
 c.executescript(sql)
 d,p,revision=c.execute("SELECT draft,published,revision FROM cms_records WHERE id='collection-smiley'").fetchone()
 updated=[json.loads(d),json.loads(p) if p else None]
 count=0
 for before,after in zip([draft,published],updated):
  if before is None:assert after is None;continue
  if mode=='archived' or before==custom:assert after==before;continue
  assert [(v['gsm'],v['color']) for v in after['collection']['variants']]==expected
  assert all(v['status']=='available' and v['colorSq'] for v in after['collection']['variants'])
  assert len({v['id'] for v in after['collection']['variants']})==5
  preserved=copy.deepcopy(after);preserved['collection']['variants']=before['collection']['variants']
  assert preserved==before
  count+=1
 assert revision==9+bool(count)
 assert c.execute("SELECT count(*) FROM cms_versions WHERE record_id='collection-smiley'").fetchone()[0]==count
 for (data,) in c.execute("SELECT data FROM cms_versions WHERE record_id='collection-smiley'"):
  assert json.loads(data)==old
 # The second seeded collection is upgraded too.
 thank=json.loads(c.execute("SELECT published FROM cms_records WHERE id='collection-thank-you'").fetchone()[0])
 assert [(v['gsm'],v['color']) for v in thank['collection']['variants']]==expected
 snapshot=c.execute('SELECT * FROM cms_records ORDER BY id').fetchall()
 history=c.execute('SELECT * FROM cms_versions ORDER BY id').fetchall()
 c.executescript(sql)
 assert snapshot==c.execute('SELECT * FROM cms_records ORDER BY id').fetchall()
 assert history==c.execute('SELECT * FROM cms_versions ORDER BY id').fetchall()
 checks.append(mode+': correct GSM/color options, editorial data/history preserved, repeat is a no-op')
 c.close()
(ROOT/'evidence/confirmed-stock-migration-checks.json').write_text(json.dumps({'status':'passed','checks':checks},indent=2)+'\n')
print('PASS',len(checks),'confirmed-stock migration fixtures')
