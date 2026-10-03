"use client";
import { useEffect,useState } from 'react';
import Link from '@/components/site-link';
import { useKobags } from '@/components/kobags-context';
import { useCms } from './public-context';
export function useLiveInquiry(){
 const cms=useCms(),{lang}=useKobags();const [reference,setReference]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState(''),[checking,setChecking]=useState(false);
 useEffect(()=>{if(!cms.enabled)return;const ref=new URLSearchParams(location.search).get('received');if(!ref)return;const controller=new AbortController();const frame=requestAnimationFrame(()=>setChecking(true));fetch('/api/inquiries?id='+encodeURIComponent(ref),{signal:controller.signal}).then(async r=>{const d=await r.json() as {error?:string;request?:{id:string}};if(!r.ok)throw Error(d.error);setReference(d.request!.id);}).catch(e=>{if(e.name!=='AbortError')setError(e.message);}).finally(()=>{cancelAnimationFrame(frame);setChecking(false);});return()=>{cancelAnimationFrame(frame);controller.abort();};},[cms.enabled]);
 const send=async(payload:Record<string,unknown>)=>{setBusy(true);setError('');try{
  const initial=await fetch('/api/inquiries');if(!initial.ok)throw Error('Inquiry storage is temporarily unavailable.');
  const r=await fetch('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload,language:lang})});const d=await r.json() as {id?:string;error?:string};if(!r.ok)throw Error(d.error||'Your request could not be saved.');
  setReference(d.id!);history.replaceState(null,'',location.pathname+'?received='+encodeURIComponent(d.id!));window.scrollTo(0,0);return d.id;
 }catch(e){setError(e instanceof Error?e.message:'Unable to save your request.');throw e;}finally{setBusy(false);}};
 return {enabled:cms.enabled,reference,busy,error,checking,send};
}
export function LiveReceipt({reference,checking=false,heading='h1'}:{reference:string;checking?:boolean;heading?:'h1'|'h2'}){const {t}=useKobags();const Heading=heading;return <section className="section-card success-inquiry"><Heading>{checking?t('Checking your request…','Duke kontrolluar kërkesën…'):t('Your request is saved.','Kërkesa juaj u ruajt.')}</Heading>{reference&&<><p>{t('Reference','Referenca')}: <strong>{reference}</strong></p><p>{t('The team can now review your details in its shared inbox. A quotation and artwork approval are separate steps; no payment has been taken.','Ekipi tani mund t’i shqyrtojë të dhënat në panelin e përbashkët. Oferta dhe miratimi i dizajnit janë hapa të veçantë; nuk është kryer pagesë.')}</p><Link href="/products" className="button">{t('Back to the collection','Kthehuni te koleksioni')}</Link></>}</section>;}
