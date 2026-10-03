import Link from '@/components/site-link';
import { LocalizedCopy as L,LocalizedPageHeading } from '@/components/localized-copy';
import InquiryForm from '@/components/inquiry-form';
import type { Content } from '@/lib/cms/types';
import { db } from '@/lib/cms/core';
import { requestLanguage } from '@/lib/seo';

async function PublishedMedia({src,alt,cover=false}:{src:string;alt:string;cover?:boolean}){
 let type=src.endsWith('.mp4')?'video/mp4':'';
 if(src.startsWith('/api/media/')){
  const media=await db().prepare("SELECT type FROM cms_media WHERE id=? AND visibility='public'").bind(src.slice('/api/media/'.length)).first<{type:string}>();
  if(!media)return null;type=media.type;
 }
 if(type==='video/mp4')return <video className={cover?'cms-published-cover':undefined} src={src} aria-label={alt} controls playsInline preload="metadata"/>;
 if(type==='application/pdf')return <a href={src}>{alt}</a>;
 return <img src={src} alt={alt} className={cover?'cms-published-cover':undefined} loading={cover?'eager':'lazy'}/>;
}
export default async function CmsPublicPage({content}:{content:Content}){
 const lang=await requestLanguage();
 return <main>
  <LocalizedPageHeading eyebrow="KOBAGS GROUP" eyebrowSq="KOBAGS GROUP" title={content.title.en} titleSq={content.title.sq} intro={content.description.en} introSq={content.description.sq}/>
  <div className="content-width cms-published-page">
   {content.image&&<PublishedMedia src={content.image} alt={content.title[lang]} cover/>}
   {content.sections.filter(s=>s.visible).map(s=><section key={s.id} className={'cms-published-section'+(s.image?' with-image':'')}>
    <div><h2><L en={s.title.en} sq={s.title.sq}/></h2><p style={{whiteSpace:'pre-wrap'}}><L en={s.body.en} sq={s.body.sq}/></p>{s.link&&<Link href={s.link} className="text-button"><L en={s.linkLabel.en} sq={s.linkLabel.sq}/></Link>}</div>
    {s.image&&<PublishedMedia src={s.image} alt={s.alt[lang]}/>}
   </section>)}
   {content.source&&<a href={content.source}><L en="Open original document" sq="Hapni dokumentin origjinal"/></a>}
   {content.path==='/contact'&&<InquiryForm kind="contact"/>}
   {content.path==='/samples'&&<InquiryForm kind="sample"/>}
   {content.path==='/partners/apply'&&<InquiryForm kind="partner"/>}
  </div>
 </main>;
}
