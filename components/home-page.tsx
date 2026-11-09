"use client";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, Layers, Printer, Truck, Pause, Play } from "lucide-react";
import { useState } from "react";
import Link from "./site-link";
import { useKobags } from "./kobags-context";
import { useCms, usePublishedCertificates } from "./cms/public-context";
import { CollectionCategories } from "./collection-categories";
import { localizeProduct } from "@/lib/product-copy";
import { products } from "@/lib/catalog";
import RotatingBagShowcase from "./rotating-bag-showcase";
import { CmsContact } from "./cms/public-extras";

const media = {
 hero: '/assets/landing-2026-11/01-b006a67572a0192c.webp',
 print: '/assets/landing-2026-11/02-cfe4690026b3070e.mp4', printPoster: '/assets/landing-2026-11/03-0d855744f615e04d.webp',
 production: '/assets/landing-2026-11/06-baf211d15cbfee3f.mp4', productionPoster: '/assets/landing-2026-11/07-bc120db9f6513c8c.webp',
 studio: '/assets/landing-2026-11/08-56e39716a73a1ebb.webp',
 industry: '/assets/landing-2026-11/09-9b1678cd7c73e1c4.webp', material: '/assets/landing-2026-11/10-117ba9241eb1f5d9.webp', kosovo: '/assets/landing-2026-11/11-6f17e5b6c314a290.webp',
 closing: '/assets/landing-2026-11/14-21cf9f3379ba0e4c.webp',
};
const family: Record<string, [string,string]> = {
 'd-cut-bag':['dcut','15-6f2bd42d585aab5e.webp'], 'handle-bag':['handle','16-dcc065b9580219ff.webp'], 'box-bag':['box','17-abee1f9acaff6181.webp'], 't-shirt-bag':['tshirt','18-bc9f0b852804c605.webp'], 'string-bag':['string','19-cc2d3d33b7bde3a6.webp'],
};
function Reel({src,poster,label,hero=false}:{src:string;poster:string;label:string;hero?:boolean}) {
 const video=useRef<HTMLVideoElement>(null); const [playing,setPlaying]=useState(false); const {t}=useKobags();
 useEffect(()=>{
  const v=video.current;if(!v)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)'); let visible=false, manualPause=false;
  const sync=()=>{if(visible&&!document.hidden&&!motion.matches&&!manualPause){void v.play().catch(()=>{});}else v.pause();};
  const observer=new IntersectionObserver(es=>{visible=es[0].isIntersecting;sync();},{threshold:.15});observer.observe(v);
  const pause=()=>{if(!v.paused){manualPause=true;v.pause();}else{manualPause=false;void v.play().catch(()=>{});}};
  const button=v.parentElement?.querySelector('button');button?.addEventListener('click',pause);
  motion.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  return()=>{observer.disconnect();motion.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);button?.removeEventListener('click',pause);v.pause();};
 },[src]);
 return <div className="landing-reel-media"><video ref={video} src={src} poster={poster} muted loop playsInline preload={hero?'metadata':'none'} width={432} height={hero?768:774} aria-label={label} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/><button type="button" className="reel-toggle" aria-label={playing?t('Pause video','Ndalo videon'):t('Play video','Luaj videon')}>{playing?<Pause size={18}/>:<Play size={18}/>}</button></div>;
}
export default function HomePage(){
 const {t,lang,studioEnabled}=useKobags(),cms=useCms(),certificates=usePublishedCertificates();
 const stages=[
  [Layers,t('Material & specification','Materiali dhe specifikimet'),t('Non-woven PP, in the shape, size and fabric weight your application needs.','PP jo i endur, me formën, madhësinë dhe peshën e materialit që ju nevojitet.')],
  [Printer,t('Your identity, in print','Identiteti juaj në shtyp'),t('Custom flexographic printing, with artwork reviewed before production.','Shtyp fleksografik i personalizuar, me dizajn të miratuar para prodhimit.')],
  [Truck,t('From production to dispatch','Nga prodhimi te dërgimi'),t('Confirm the finished specification, production timing and destination with our team.','Konfirmoni specifikimet përfundimtare, afatin e prodhimit dhe destinacionin me ekipin tonë.')],
 ] as const;
 const journey=[
  [t('Choose your bag','Zgjidhni çantën tuaj'),t('Find the right shape, color and branding for your business.','Gjeni formën, ngjyrën dhe markimin për biznesin tuaj.')],
  [t('Review the quotation','Shqyrtoni ofertën'),t('Confirm quantity, destination, price and commercial details.','Konfirmoni sasinë, destinacionin, çmimin dhe kushtet.')],
  [t('Approve your artwork','Miratoni dizajnin'),t('Review the specific proof before production is released.','Shqyrtoni versionin e caktuar para fillimit të prodhimit.')],
  [t('Production & dispatch','Prodhimi dhe dërgimi'),t('Production follows approval. Dispatch and delivery are confirmed separately.','Prodhimi vijon pas miratimit. Dërgimi dhe dorëzimi konfirmohen veçmas.')],
 ];
 return <main className="kobags-landing">
  <div className="hero"><div className="bg"><img src={cms.settings?.media?.heroImage||media.hero} width={1600} height={960} alt={cms.settings?.media?.heroAlt?.[lang]||t('Machinery inside the Kobags factory','Makineri në fabrikën Kobags')} fetchPriority="high"/></div>
   <div className="wrap"><div className="copy"><span className="eyebrow">{t('Non-woven bag manufacturing · Kosova','Prodhimi i çantave jo të endura · Kosovë')}</span><h1>{t('Manufacturing bags.','Prodhojmë çanta.')} <em>{t('Helping brands.','Mbështesim markat.')}</em></h1><p>{t('Custom non-woven bags, made in Kosova. From your first idea to your wholesale order.','Çanta jo të endura, të prodhuara në Kosovë. Nga ideja juaj e parë te porosia me shumicë.')}</p><div className="ctas"><Link className="btn green" href="/products">{t('Choose your bag','Zgjidhni çantën tuaj')}<ArrowUpRight/></Link><Link className="btn ghost" href="/manufacturing">{t('Explore our production','Eksploroni prodhimin')}</Link></div></div>
   <figure className="reel hero-reel"><Reel hero src={cms.settings?.media?.printingVideo||media.print} poster={cms.settings?.media?.printingPoster||media.printPoster} label={t('Printing bags on the factory floor','Shtypja e çantave në fabrikë')}/><figcaption><span>{t('In print','Në shtyp')}</span><b>{t('Your brand, taking shape.','Marka juaj merr formë.')}</b>{t('A closer look at printing on our factory floor.','Shikoni nga afër shtypin në fabrikën tonë.')}</figcaption></figure></div>
  </div>
  <div className="wrap proof"><ul><li><b>{t('Made in Kosova','Prodhuar në Kosovë')}</b><span>{t('Our own factory and printing line','Fabrika dhe linja jonë e shtypit')}</span></li>{certificates.map(c=><li key={c.id}><Link href={'/certifications#iso-'+c.id}><b>{c.standard}</b></Link><span>{lang==='sq'?c.titleSq:c.title}</span></li>)}<li><b>{t('Artwork reviewed','Dizajn i shqyrtuar')}</b><span>{t('A proof before every production run','Miratim para çdo prodhimi')}</span></li></ul></div>
  <section id="bags" className="wrap"><div className="head"><div><span className="eyebrow">{t('Find your format','Zgjidhni formën')}</span><h2>{cms.products.length===5?t('Five bag families. Different ways to carry.','Pesë lloje çantash. Mënyra të ndryshme bartjeje.'):t('Find your bag.','Gjeni çantën tuaj.')}</h2></div><Link className="link" href="/products">{t('View the whole collection','Shikoni të gjithë koleksionin')}<ArrowUpRight size={16}/></Link></div>
   <div className="families" aria-label={t('Bag families','Llojet e çantave')} tabIndex={0}>{cms.products.map(item=>{const p=localizeProduct(item,lang),f=family[p.slug],original=products.find(v=>v.slug===p.slug),n=p.variants.filter(v=>!cms.options(p.slug)?.activeSizes||cms.options(p.slug)!.activeSizes!.includes(v.name)).length;const image=f&&p.image===original?.image?'/assets/landing-2026-11/'+f[1]:p.image;return <article className="bag" key={p.slug}><Link className="shot" href={'/products/'+p.slug}><img src={image} width={640} height={800} alt={p.name} loading="lazy" decoding="async"/></Link><div className="body"><span className="kind">{p.handle}</span><h3>{p.name}</h3><span className="use">{p.use} · {n} {t(n===1?'size':'sizes','madhësi')}</span><div className="acts"><Link href={'/products/'+p.slug}>{t('Details','Detajet')} ↗</Link>{studioEnabled&&f&&<Link href={'/design?bag='+f[0]}>{t('Design in 3D','Dizajno në 3D')}</Link>}</div></div></article>;})}</div><CollectionCategories/>
  </section>
  <section id="made" className="wrap"><div className="made"><div><span className="eyebrow">{t('Made in Kosova','Prodhuar në Kosovë')}</span><h2 className="made-title">{t('Material. Print. Finished to your specifications.','Material. Shtyp. Sipas specifikimeve tuaja.')}</h2><ul className="points">{stages.map(([Icon,title,body])=><li key={title}><Icon/><b>{title}</b><span>{body}</span></li>)}</ul><Link className="link" href="/manufacturing">{t('Get to know our manufacturing','Njihuni me prodhimin tonë')}<ArrowUpRight size={16}/></Link></div><div className="floor"><figure className="wide"><img src="/assets/optimized-2026-11/printing-line-fresh-food-640.webp" srcSet="/assets/optimized-2026-11/printing-line-fresh-food-320.webp 320w, /assets/optimized-2026-11/printing-line-fresh-food-640.webp 640w, /assets/optimized-2026-11/printing-line-fresh-food-960.webp 960w" sizes="(max-width:760px) 55vw, 28vw" width={1200} height={1600} alt={t('Printed black fabric running through the factory rollers','Material i zi i shtypur në rulët e fabrikës')} loading="lazy"/></figure><figure><div className="reel"><Reel src={media.production} poster={media.productionPoster} label={t('Bags being formed on the production line','Formimi i çantave në linjën e prodhimit')}/></div><figcaption className="below">{t('Production line','Linja e prodhimit')}</figcaption></figure></div></div></section>
  {studioEnabled&&<RotatingBagShowcase/>}
  <section className="wrap" id="process"><div className="head"><div><span className="eyebrow">{t('The ordering process','Procesi i porosisë')}</span><h2>{t('From design to dispatch.','Nga dizajni te dërgimi.')}</h2></div></div><ol className="process">{journey.map(([h,p])=><li key={h}><b>{h}</b><span>{p}</span></li>)}</ol></section>
  <section className="wrap"><div className="explore">{[
   ['/industries',media.industry,t('Uses & industries','Përdorime dhe sektorë'),t('A bag for what you do.','Një çantë për punën tuaj.'),t('Retail, events or everyday shopping: start with what your customer carries.','Shitje me pakicë, evente apo blerje të përditshme: filloni me nevojat e klientit.'),t('Explore uses & industries','Eksploroni përdorimet')],
   ['/sustainability',media.material,t('Materials & responsibility','Materialet dhe përgjegjësia'),t('Clear facts. Better choices.','Fakte të qarta. Zgjedhje më të mira.'),t('Understand non-woven PP, care and reuse. Check the evidence behind product and environmental claims.','Kuptoni PP-në jo të endur, kujdesin dhe ripërdorimin. Kontrolloni provat pas pretendimeve.'),t('Know your material','Njihni materialin')],
   ['/bags-kosovo',media.kosovo,t('For businesses across Kosovo','Për biznese në tërë Kosovën'),t('Local production. Nationwide possibilities.','Prodhim vendor. Mundësi në tërë vendin.'),t('Branded bags for shops, supermarkets and events, from Prishtina and Lipjan to Prizren, Peja, Gjilan, Ferizaj and beyond.','Çanta me logo për dyqane, supermarkete dhe evente, nga Prishtina e Lipjani në Prizren, Pejë, Gjilan, Ferizaj dhe më gjerë.'),t('Explore all municipalities','Eksploroni të gjitha komunat')],
  ].map(([href,img,eyebrow,title,copy,cta])=><Link className="card" href={href} key={href}><img src={img} width={900} height={675} alt="" loading="lazy"/><div><small>{eyebrow}</small><b>{title}</b><span>{copy}</span><em>{cta} ↗</em></div></Link>)}</div></section>
  <div className="proofband"><div className="wrap"><div className="copy"><span className="eyebrow">{t('Documented standards','Standarde të dokumentuara')}</span><h2>{t('Confidence, in the details.','Besimi qëndron në detaje.')}</h2><p className="lede">{t('Get closer to the standards behind the operation. Explore the published quality and environmental management certificates, with readable details and original documents.','Njihuni me standardet e punës sonë. Shikoni certifikatat e publikuara për menaxhimin e cilësisë dhe mjedisit, me detaje të lexueshme dhe dokumente origjinale.')}</p><div><Link className="btn outline" href="/certifications">{t('Explore our certificates','Shikoni certifikatat')}</Link></div><small>{t('Published management-system records. Current status is subject to issuer verification.','Dokumente të publikuara të sistemeve të menaxhimit. Statusi aktual verifikohet nga lëshuesi.')}</small></div><div className="certs">{certificates.map((c,i)=><Link className="cert" href={'/certifications#iso-'+c.id} key={c.id}><img src={c.image||'/assets/landing-2026-11/'+(i===0?'12-ffd4d05e4d47257d.webp':'13-193164682ae727d1.webp')} width={480} height={678} alt={c.standard} loading="lazy"/><b>{c.standard}</b><span>{lang==='sq'?c.titleSq:c.title}</span></Link>)}</div></div></div>
  <section className="wrap"><div className="faq"><div className="copy"><span className="eyebrow">{t('Buyer questions','Pyetje të blerësve')}</span><h2>{t('Ordering essentials.','Gjithçka për porosinë.')}</h2><Link className="link" href="/resources">{t('Buying guides','Udhëzues për blerësit')}<ArrowUpRight size={16}/></Link></div><div>{[
   [t('What is the minimum wholesale order?','Cila është porosia minimale me shumicë?'),t(`The published minimum is ${(cms.settings?.moq||5000).toLocaleString('en-US')} bags. Its application across designs, sizes and colors is confirmed with your quote.`,`Minimumi i publikuar është ${(cms.settings?.moq||5000).toLocaleString('en-US')} çanta. Zbatimi sipas dizajnit, madhësisë dhe ngjyrës konfirmohet në ofertë.`)],
   [t('Can I add my own logo?','A mund të shtoj logon time?'),t('Yes. Tell us about your logo and printing requirements when requesting a quote. Our team will confirm artwork, colors and placement with you before production.','Po. Na tregoni për logon dhe kërkesat e shtypit kur kërkoni ofertë. Ekipi ynë konfirmon dizajnin, ngjyrat dhe pozicionin para prodhimit.')],
   [t('How long does production take?','Sa zgjat prodhimi?'),t('Timing is confirmed with your quotation.','Afati konfirmohet me ofertën tuaj.')],
   [t('Can I request samples first?','A mund të kërkoj mostra fillimisht?'),t('Yes. Samples have a separate inquiry route. Availability, sample costs and shipping terms require confirmation.','Po. Mostrat kanë formular të veçantë kërkese. Disponueshmëria, kostot dhe kushtet e dërgimit kërkojnë konfirmim.')],
  ].map(([q,a],i)=><details key={q} open={i===0}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>
  <div className="close"><img src={media.closing} width={1200} height={1600} alt="" loading="lazy"/><div className="wrap"><span className="eyebrow">{t("Let’s plan your order",'Le të planifikojmë porosinë tuaj')}</span><h2>{t('Put your brand','Vendosni markën tuaj')} <em>{t('on the bag.','mbi çantë.')}</em></h2><div className="ctas"><Link className="btn green" href="/quote">{t('Request a quote','Kërkoni ofertë')}<ArrowUpRight/></Link><Link className="btn ghost" href="/samples">{t('Request samples','Kërkoni mostra')}</Link></div><div className="contact"><a href="https://wa.me/38343877753">WhatsApp · +383 43 877 753</a><CmsContact part="email"/><Link href="/contact">{t('General inquiries','Pyetje të përgjithshme')}</Link></div></div></div>
 </main>;
}
