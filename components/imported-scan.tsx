"use client";
import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,Minus,Plus,RotateCcw,Play,Pause,Maximize2,LoaderCircle} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {useKobags} from './kobags-context';
import type {ImportedScanScene} from '@/lib/imported-scan-scene';

function ScanCanvas(){
 const {t}=useKobags();const host=useRef<HTMLDivElement>(null),scene=useRef<ImportedScanScene|null>(null);
 const [status,setStatus]=useState<'loading'|'ready'|'error'>('loading'),[spinning,setSpinning]=useState(false),[reduced,setReduced]=useState(false),[attempt,setAttempt]=useState(0),[view,setView]=useState('angle');
 const label=t('Coffee scan in 3D. Drag to rotate, pinch or use plus and minus to zoom. Arrow keys rotate; Home resets.','Skanimi i kafesë në 3D. Tërhiqeni për rrotullim; zmadhoni me dy gishta ose me plus dhe minus. Shigjetat rrotullojnë; Home rivendos pamjen.');
 useEffect(()=>{let disposed=false;setStatus('loading');setSpinning(false);setView('angle');const motion=matchMedia('(prefers-reduced-motion: reduce)');const changed=()=>{setReduced(motion.matches);if(motion.matches){scene.current?.spin(false);setSpinning(false);}};changed();motion.addEventListener('change',changed);
 import('@/lib/imported-scan-scene').then(({createImportedScanScene})=>{if(disposed)return;scene.current=createImportedScanScene(host.current!,label,{ready:()=>{if(!disposed){setStatus('ready');setView('angle');}},error:()=>{if(!disposed){setStatus('error');setSpinning(false);}},interact:()=>{if(!disposed){setSpinning(false);setView('');}}});}).catch(()=>{if(!disposed)setStatus('error');});
 return()=>{disposed=true;motion.removeEventListener('change',changed);scene.current?.dispose();scene.current=null;};},[attempt,label]);
 return <div className="scan-viewer" data-status={status}>
  <div className="scan-host" ref={host}/>
  {status!=='ready'&&<div className="scan-message" role={status==='error'?'alert':'status'}>{status==='loading'?<><LoaderCircle className="scan-loading" size={26}/><strong>{t('Loading your 3D scan…','Duke ngarkuar skanimin tuaj 3D…')}</strong><span>{t('Smooth model with original scan texture','Model i lëmuar me teksturën origjinale')}</span></>:<><strong>{t('The 3D scan could not load.','Skanimi 3D nuk mund të ngarkohej.')}</strong><span>{t('Check your connection and WebGL support, then try again.','Kontrolloni lidhjen dhe mbështetjen për WebGL, pastaj provoni përsëri.')}</span><button type="button" className="button small" onClick={()=>setAttempt(n=>n+1)}>{t('Try again','Provoni përsëri')}</button></>}</div>}
  <label className="scan-view-select"><span>{t('View','Pamja')}</span><select aria-label={t('Scan viewpoint','Këndi i skanimit')} disabled={status!=='ready'} value={view} onChange={e=>{const next=e.target.value as 'angle'|'front'|'back'|'top'|'bottom';scene.current?.view(next);setView(next);}}><option value="" disabled>{t('Custom','E lirë')}</option><option value="angle">{t('Three-quarter','Në kënd')}</option><option value="front">{t('Front','Përpara')}</option><option value="back">{t('Back','Prapa')}</option><option value="top">{t('Top','Sipër')}</option><option value="bottom">{t('Underneath','Poshtë')}</option></select></label>
  <div className="scan-toolbar" role="group" aria-label={t('3D scan controls','Kontrollet e skanimit 3D')}>
   <button type="button" disabled={status!=='ready'} aria-label={t('Rotate scan left','Rrotullo skanimin majtas')} onClick={()=>scene.current?.rotate(-1)}><ArrowLeft size={17}/></button>
   <button type="button" disabled={status!=='ready'} aria-label={t('Rotate scan right','Rrotullo skanimin djathtas')} onClick={()=>scene.current?.rotate(1)}><ArrowRight size={17}/></button>
   <button type="button" disabled={status!=='ready'} aria-label={t('Zoom out scan','Zvogëlo skanimin')} onClick={()=>scene.current?.zoom(-1)}><Minus size={17}/></button>
   <button type="button" disabled={status!=='ready'} aria-label={t('Zoom in scan','Zmadho skanimin')} onClick={()=>scene.current?.zoom(1)}><Plus size={17}/></button>
   <button type="button" disabled={status!=='ready'} aria-label={t('Reset scan view','Rivendos pamjen e skanimit')} onClick={()=>{scene.current?.reset();setView('angle');}}><RotateCcw size={17}/></button>
   <button type="button" disabled={status!=='ready'||reduced} aria-pressed={spinning} aria-label={spinning?t('Pause scan rotation','Ndalo rrotullimin e skanimit'):t('Auto rotate scan','Rrotullo skanimin automatikisht')} onClick={()=>{scene.current?.spin(!spinning);setSpinning(!spinning);}}>{spinning?<Pause size={17}/>:<Play size={17}/>}</button>
  </div>
 </div>;
}
export default function ImportedScan(){
 const {t}=useKobags();const [full,setFull]=useState(false);
 return <section className="imported-scan" aria-label={t('Coffee scan test viewer','Pamja testuese e skanimit të kafesë')}>
  <div className="scan-title"><span><strong>{t('Coffee scan','Skanimi i kafesë')}</strong><small>{t('3D TEST','TEST 3D')}</small></span><button className="icon-button" type="button" aria-label={t('Enlarge scan','Zmadho pamjen e skanimit')} onClick={()=>setFull(true)}><Maximize2 size={18}/></button></div>
  {full?<div className="scan-placeholder"/>:<ScanCanvas/>}
  <div className="scan-caption">{t('Drag to explore · Pinch to zoom','Tërhiqeni për ta eksploruar · Zmadhoni me dy gishta')}</div>
  <Dialog open={full} onOpenChange={setFull}><DialogContent className="scan-dialog"><DialogTitle>{t('Coffee scan · 3D test','Skanimi i kafesë · Test 3D')}</DialogTitle><DialogDescription>{t('Explore the uploaded model from every angle.','Eksploroni modelin e ngarkuar nga çdo kënd.')}</DialogDescription>{full&&<ScanCanvas/>}</DialogContent></Dialog>
 </section>;
}
