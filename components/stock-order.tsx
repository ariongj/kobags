"use client";
import { useEffect,useRef,useState } from 'react';
import Link from './site-link';
import { useCms } from './cms/public-context';
import { useKobags } from './kobags-context';
import { useLiveInquiry,LiveReceipt } from './cms/live-inquiry';
import { useDemo,errors } from './demo-store';
import { requestFieldLimits } from '@/lib/design-validation';
export default function StockOrder({slug}:{slug:string}) {
 const {collections,settings}=useCms();const {t,lang}=useKobags();const live=useLiveInquiry();const demo=useDemo();
 const item=collections.find(c=>c.slug===slug);const stock=item?.content.collection;
 const [form,setForm]=useState({variant:'',quantity:1000,company:'',contact:'',email:'',country:'Kosova',city:'',note:'',consent:false,key:''});
 const [ready,setReady]=useState(false),[prepared,setPrepared]=useState(''),[error,setError]=useState('');
 const sending=useRef(false);
 const storageKey='kobags-stock:'+slug;
 useEffect(()=>{setPrepared(new URLSearchParams(location.search).get('prepared')||'');try{const old=JSON.parse(sessionStorage.getItem(storageKey)||'null');if(old&&typeof old==='object')setForm(f=>({...f,...old,consent:false}));}catch{}setReady(true);},[storageKey]);
 useEffect(()=>{if(ready&&!live.reference&&(!prepared||(demo.state&&!demo.state.inquiries.some(i=>i.id===prepared&&i.model==='Finished stock'))))try{sessionStorage.setItem(storageKey,JSON.stringify(form));}catch{}},[form,ready,storageKey,prepared,live.reference,demo.state]);
 const set=(key:keyof typeof form,value:unknown)=>setForm(f=>({...f,[key]:value,key:key==='key'?String(value):f.key}));
 const chosen=stock?.variants.find(v=>v.id===form.variant);
 const preparedInquiry=demo.state?.inquiries.find(i=>i.id===prepared&&i.model==='Finished stock');
 const staleOption=!!form.variant&&(!chosen||chosen.status==='out');
 const missingReceipt=prepared&&demo.state&&!preparedInquiry?t('This prepared request is not available in this browser. You can create a new request below.','Kjo kërkesë e përgatitur nuk është e disponueshme në këtë shfletues. Mund të krijoni një kërkesë të re më poshtë.'):'';
 const errorCode=error||live.error||(prepared?demo.error:'');
 const shownError=errors[errorCode]?t(...errors[errorCode]):errorCode;
 if(live.reference||live.checking)return <main className="content-width stock-order"><LiveReceipt stock reference={live.reference} checking={live.checking}/></main>;
 if(prepared&&!demo.state&&!demo.error)return <main className="content-width stock-order"><section className="section-card" role="status"><h1>{t('Checking your request…','Duke kontrolluar kërkesën…')}</h1></section></main>;
 if(preparedInquiry)return <main className="content-width stock-order"><section className="section-card"><h1>{t('Your stock request is prepared.','Kërkesa për stokun është përgatitur.')}</h1><p>{t('Reference','Referenca')}: {preparedInquiry.id}</p><p>{t('Online order handling is not active yet. Send these details to the team to confirm stock and pricing.','Pranimi online i porosive ende nuk është aktiv. Dërgojani këto të dhëna ekipit për të konfirmuar stokun dhe çmimin.')}</p><p style={{whiteSpace:'pre-line',overflowWrap:'anywhere'}}>{preparedInquiry.message}</p><a className="button" href={'mailto:'+(settings?.email||'info@kobags-group.com')+'?subject='+encodeURIComponent('Stock request: '+preparedInquiry.id)+'&body='+encodeURIComponent(`${preparedInquiry.message}\n${preparedInquiry.company} / ${preparedInquiry.contact}\n${preparedInquiry.email}\n${preparedInquiry.country}`)}>{t('Send to Kobags','Dërgo te Kobags')}</a><Link className="text-button" href="/products">{t('Choose your bag','Zgjidhni çantën tuaj')}</Link></section></main>;
 if(!item||!stock)return <main className="content-width stock-order"><h1>{t('Collection unavailable','Koleksioni nuk është i disponueshëm')}</h1><Link href="/products">{t('Choose your bag','Zgjidhni çantën tuaj')}</Link></main>;
 const title=item.content.title[lang]||item.content.title.en;
 const status=(v:NonNullable<typeof chosen>)=>v.status==='available'?t('In stock','Në stok'):v.status==='out'?t('Out of stock','Jashtë stokut'):t('Confirm availability','Konfirmoni disponueshmërinë');
 return <main className="content-width stock-order"><div className="page-heading"><p className="eyebrow">{t('READY-TO-ORDER COLLECTION','KOLEKSION I GATSHËM PËR POROSI')}</p><h1>{title}</h1><p>{item.content.description[lang]}</p></div><div className="stock-order-grid"><section className="section-card stock-summary">{item.content.image&&<img src={item.content.image} alt={title}/>}<h2>{t('Stock details','Detajet e stokut')}</h2><p>{stock.dimensions}</p><p>{t('The team confirms availability, price and delivery before accepting your order.','Ekipi konfirmon disponueshmërinë, çmimin dhe dërgesën para pranimit të porosisë.')}</p></section>
 <form className="section-card stock-form" onSubmit={async e=>{
  e.preventDefault();if(sending.current||!chosen||chosen.status==='out')return;
  sending.current=true;setError('');const key=form.key||crypto.randomUUID();set('key',key);
  const message=`${t('Stock collection','Koleksioni në stok')}: ${title}\n${stock.dimensions}\n${chosen.gsm} GSM / ${lang==='sq'?chosen.colorSq:chosen.color}\n${t('Quantity','Sasia')}: ${form.quantity}\n${t('Delivery','Dërgesa')}: ${form.city}, ${form.country}\n${form.note}`;
  const send=(requestKey:string)=>{const data={...form,key:requestKey,kind:'contact',model:'Finished stock',message};return live.enabled?live.send({kind:'stock',collection:slug,variant:chosen.id,quantity:form.quantity,city:form.city,note:form.note,data}):demo.act({type:'inquiry',data});};
  try{
   let id:string|undefined;
   try{id=await send(key);}catch(cause){
    if(!(cause instanceof Error)||cause.message!=='REQUEST_KEY_CONFLICT')throw cause;
    const nextKey=crypto.randomUUID();set('key',nextKey);id=await send(nextKey);
   }
   if(!id)throw Error('SAVE_FAILED');
   const query=new URLSearchParams({collection:slug,[live.enabled?'received':'prepared']:id});
   history.replaceState(null,'',location.pathname+'?'+query.toString());
   if(!live.enabled)setPrepared(id);
   try{sessionStorage.removeItem(storageKey);}catch{}
   window.scrollTo(0,0);
  }catch(c){setError(c instanceof Error?c.message:t('Unable to save. Please retry.','Ruajtja dështoi. Provoni përsëri.'));}
  finally{sending.current=false;}
 }}>
 {missingReceipt&&<p role="alert">{missingReceipt}</p>}
 {staleOption&&<p role="status">{t('Your previous stock option is no longer available. Please choose an available option below.','Opsioni juaj i mëparshëm nuk është më i disponueshëm. Zgjidhni një opsion të disponueshëm më poshtë.')}</p>}
 <label>{t('Stock option — GSM / color','Opsioni në stok — GSM / ngjyra')}<select required value={form.variant} onChange={e=>set('variant',e.target.value)}><option value="">{t('Select a stock option','Zgjidhni opsionin në stok')}</option>{stock.variants.map(v=><option key={v.id} value={v.id} disabled={v.status==='out'}>{v.gsm} GSM · {lang==='sq'?v.colorSq:v.color} — {status(v)}</option>)}</select></label>
 <div className="stock-fields">{(['quantity','company','contact','email','country','city'] as const).map(k=><label key={k} className={k==='country'||k==='city'?'stock-half':'stock-full'}>{({quantity:t('Quantity','Sasia'),company:t('Company','Kompania'),contact:t('Contact name','Emri i kontaktit'),email:t('Email','Email'),country:t('Country','Shteti'),city:t('City','Qyteti')})[k]}<input required name={k} type={k==='quantity'?'number':k==='email'?'email':'text'} min={k==='quantity'?1:undefined} max={k==='quantity'?10000000:undefined} step={k==='quantity'?1:undefined} minLength={k==='quantity'||k==='email'?undefined:2} maxLength={requestFieldLimits[k]} value={form[k]} onChange={e=>set(k,k==='quantity'?Number(e.target.value):e.target.value)}/></label>)}</div>
 <label>{t('Delivery notes (optional)','Shënime për dërgesën (opsionale)')}<textarea maxLength={1200} rows={3} value={form.note} onChange={e=>set('note',e.target.value)}/></label>
 <label className="stock-consent"><input required type="checkbox" checked={form.consent} onChange={e=>set('consent',e.target.checked)}/><span>{t('I agree to be contacted about this request.','Pajtohem të kontaktohem lidhur me këtë kërkesë.')} <Link href="/privacy">{t('Privacy policy','Politika e privatësisë')}</Link></span></label>
 {shownError&&<p role="alert">{shownError}</p>}<button className="button" disabled={!ready||!chosen||chosen.status==='out'||live.busy||demo.busy}>{live.busy||demo.busy?t('Saving…','Duke ruajtur…'):chosen?.status==='available'?t('Request this stock item','Kërkoni këtë artikull nga stoku'):t('Request availability','Kërkoni disponueshmërinë')}</button><small>{t('No payment is taken at this step.','Në këtë hap nuk kryhet pagesë.')}</small>
 </form></div></main>;
}
