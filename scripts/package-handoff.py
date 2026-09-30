"""Create a clean reusable source ZIP. No runtime data, credentials or Site identity."""
from pathlib import Path
import json, zipfile, shutil
ROOT=Path(__file__).resolve().parents[1]
PUBLIC=ROOT/'public/documents';PUBLIC.mkdir(parents=True,exist_ok=True)
for src,dst in [('docs/DESIGN-HANDOFF.md','design-handoff.md'),('docs/DEVELOPER-HANDOFF.md','developer-handoff.md'),('docs/MIGRATION-MAP.md','migration-map.md'),('docs/SITE-OUTLINE.md','site-outline.md'),('evidence/VERIFICATION.md','verification.md'),('docs/studio-asset-note.md','studio-asset-note.md'),('docs/studio-v4-prompts.json','studio-v4-prompts.json')]:
 shutil.copyfile(ROOT/src,PUBLIC/dst)
folders=['app','components','lib','db','drizzle','build','hooks','scripts','vendor','docs','qa','tests','evidence','public']
files=['README.md','package.json','package-lock.json','tsconfig.json','next.config.ts','middleware.ts','postcss.config.mjs','vite.config.ts','drizzle.config.ts','eslint.config.mjs','components.json','cloudflare-env.d.ts','.gitignore']
paths=[ROOT/f for f in files]
for d in folders:paths.extend(p for p in (ROOT/d).rglob('*') if p.is_file())
videos=[p for p in (ROOT/'public/assets').rglob('*.mp4') if p.is_file()]
with zipfile.ZipFile(PUBLIC/'kobags-media.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(videos):z.write(p,'kobags-website/'+str(p.relative_to(ROOT)))
with zipfile.ZipFile(PUBLIC/'kobags-source.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(set(paths)):
  relative=p.relative_to(ROOT)
  if relative.parts[0]=='evidence' and p.suffix.lower() in ['.png','.jpg','.jpeg'] and not p.name.startswith(('presentation-','completion-','seo-')):continue
  if p in videos:continue
  if p.suffix in ['.zip','.pyc'] or '__pycache__' in p.parts or any(part.startswith('.env') for part in relative.parts):continue
  z.write(p,'kobags-website/'+str(relative))
 z.writestr('kobags-website/.openai/hosting.json',json.dumps({'d1':'DB','r2':None},indent=2)+'\n')
 z.writestr('kobags-website/SOURCE-MANIFEST.json',json.dumps({'name':'Kobags website handoff','date':'2026-09-30','type':'reusable source, not a deploy artifact','companion':'Extract kobags-media.zip into the same parent directory to merge its public/assets videos into kobags-website before building.','omitted':['existing Site project ID','credentials and secrets','runtime and customer/demo records','Git history','installed dependencies','build output','nested ZIP files','older QA captures and concept exports (regenerable); current presentation JPEGs and reports included','factory videos: supplied unchanged in companion kobags-media.zip'],'verification':'See evidence/VERIFICATION.md and JSON result manifests.','assetRights':'Kobags identity and original media remain subject to their owner’s rights.'},indent=2)+'\n')
for name in ['kobags-source.zip','kobags-media.zip']:
 assert (PUBLIC/name).stat().st_size < 25*1024*1024, f'{name} exceeds the hosting asset limit'
print('Created source bundle:',(PUBLIC/'kobags-source.zip').stat().st_size,'bytes')
print('Created companion video bundle:',(PUBLIC/'kobags-media.zip').stat().st_size,'bytes')
