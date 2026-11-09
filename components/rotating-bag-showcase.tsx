"use client";
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { useKobags } from './kobags-context';
import Link from './site-link';
import { languageHref } from '@/lib/site-locale';
const items=[
 {key:'tshirt',name:'T-Shirt bag',sq:'Çantë T-Shirt',image:'18-bc9f0b852804c605.webp',href:'/design?bag=tshirt'},
 {key:'blue',name:'Box · Blue handles',sq:'Box · Doreza blu',image:'16-dcc065b9580219ff.webp',href:'/design#enhance-your-brand'},
 {key:'olive',name:'Box · Olive & red',sq:'Box · Ulliri dhe e kuqe',image:'17-abee1f9acaff6181.webp',href:'/design#olive-red'},
 {key:'bottle',name:'Bottle bag',sq:'Çantë për shishe',image:'15-6f2bd42d585aab5e.webp',href:'/design?bag=bottle'},
];
export default function RotatingBagShowcase(){
 const {t,lang}=useKobags();const box=useRef<HTMLDivElement>(null),frame=useRef<HTMLIFrameElement>(null);
 const [active,setActive]=useState(false),[visible,setVisible]=useState(false),[ready,setReady]=useState(false),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(false);
 useEffect(()=>{const observer=new IntersectionObserver(([e])=>{setVisible(e.isIntersecting);if(e.isIntersecting)setActive(true);},{rootMargin:'80px'});if(box.current)observer.observe(box.current);const media=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduced(media.matches);sync();media.addEventListener('change',sync);return()=>{observer.disconnect();media.removeEventListener('change',sync);};},[]);
 useEffect(()=>{const receive=(event:MessageEvent)=>{if(event.source===frame.current?.contentWindow&&event.origin===location.origin&&event.data?.type==='kobags:showcase-ready')setReady(true);};window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive);},[]);
 useEffect(()=>{frame.current?.contentWindow?.postMessage({type:'kobags:showcase',visible,paused:paused||reduced},location.origin);},[visible,paused,reduced,ready]);
 return <section className="rotating-showcase" id="design" aria-labelledby="design-showcase-heading">
  <div className="wrap"><div className="rotating-showcase-heading"><div><span className="eyebrow">{t('Your brand. Your creation.','Marka juaj. Krijimi juaj.')}</span><h2 id="design-showcase-heading">{t('Design your bag.','Dizajnoni çantën tuaj.')}</h2><p>{t('Pick a bag. Add your logo. Make both sides yours.','Zgjidhni çantën. Shtoni logon. Personalizoni të dyja anët.')}</p></div><Link href="/design" className="btn showcase-primary">{t('Design your bag','Dizajnoni çantën tuaj')}<ArrowUpRight size={24}/></Link></div>
  <div className={'rotating-display'+(ready?' is-ready':'')} ref={box}>
   {!ready&&<div className="rotating-fallback" aria-hidden="true">{items.map((item,i)=><div key={item.key}><img style={{left:(-i*100)+'%'}} src='/assets/landing-2026-11/08-56e39716a73a1ebb.webp' alt="" width={640} height={800} loading="lazy"/></div>)}</div>}
   {active&&<iframe ref={frame} className="rotating-display-frame" src={languageHref('/design/viewer?preview=1',lang)} title={t('Four rotating Kobags designs on display','Katër modele rrotulluese Kobags')} tabIndex={-1}/>}
   <div className="rotating-labels">{items.map(item=><Link key={item.key} href={item.href}>{lang==='sq'?item.sq:item.name}<ArrowUpRight size={16}/></Link>)}</div>
  </div><div className="rotating-caption"><span>{t('Four ideas. Endless possibilities.','Katër ide. Mundësi pa fund.')}</span>{ready&&!reduced&&<button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?<Play size={15}/>:<Pause size={15}/>} {paused?t('Resume rotation','Vazhdo rrotullimin'):t('Pause rotation','Ndalo rrotullimin')}</button>}</div></div>
 </section>;
}
