"""Run the data migration against in-memory fixtures; no site/database access."""
import copy,json,sqlite3
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def database(draft,published):
 c=sqlite3.connect(':memory:')
 for p in sorted((ROOT/'drizzle').glob('*.sql')):
  if p.name >= '0004_':continue
  c.executescript(p.read_text())
 c.execute("INSERT INTO cms_records(id,kind,slug,draft,published,revision,archived,mutation,updated_at) VALUES('product-t-shirt-bag','product','t-shirt-bag',?,?,7,0,'qa','2026-10-01')",(json.dumps(draft),json.dumps(published)))
 return c
old={'product':{'variants':[{'name':'Small','dimensions':'29 × 38 × 10 cm','gsm':90},{'name':'Medium','dimensions':'37 × 45 × 12 cm','gsm':50},{'name':'Large','dimensions':'44 × 58 × 14 cm','gsm':50}]},'activeSizes':['Small','Medium','Large']}
custom=copy.deepcopy(old);custom['product']['variants'][0]['dimensions']='32 × 56 × 19 cm'
sql=(ROOT/'drizzle/0004_client_stock_collections.sql').read_text()
checks=[]
for mode,draft,published in [('defaults',old,old),('editor-customized',custom,custom),('draft-only-edit',custom,old)]:
 c=database(draft,published);c.executescript(sql)
 d,p,revision=c.execute("SELECT draft,published,revision FROM cms_records WHERE id='product-t-shirt-bag'").fetchone();d,p=json.loads(d),json.loads(p)
 if mode=='defaults':
  assert d['product']['variants']==[{'name':'Small','dimensions':'31 × 55 × 18 cm','gsm':90}];assert d==p;assert revision==8;assert c.execute('SELECT count(*) FROM cms_versions').fetchone()[0]==2
 if mode=='editor-customized':assert d==custom and p==custom and revision==7
 if mode=='draft-only-edit':assert d==custom and p['product']['variants'][0]['dimensions']=='31 × 55 × 18 cm' and revision==8
 snapshot=c.execute('SELECT id,draft,published,revision FROM cms_records ORDER BY id').fetchall();c.executescript(sql);assert snapshot==c.execute('SELECT id,draft,published,revision FROM cms_records ORDER BY id').fetchall()
 assert c.execute("SELECT count(*) FROM cms_records WHERE kind='collection'").fetchone()[0]==2
 checks.append(mode+': existing edits/GSM protected; stock seed and specification update are repeatable');c.close()
(ROOT/'evidence/stock-migration-checks.json').write_text(json.dumps({'status':'passed','checks':checks},indent=2));print('PASS',len(checks),'migration fixtures')
