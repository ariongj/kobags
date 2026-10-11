"use client";
import { ArrowUpRight, Smile, Package } from "lucide-react";
import Link from "./site-link";
import { useKobags } from "./kobags-context";
import { useCms } from "./cms/public-context";
export function CollectionCategories() {
 const {t,lang}=useKobags();const {collections}=useCms();
 return <div className="home-collection-categories" aria-label={t('Ready-to-order collections','Koleksione të gatshme për porosi')}>
 {collections.map(c=><Link key={c.id} href={'/quote?collection='+encodeURIComponent(c.slug)} className="collection-category">
 <span className={'collection-mark'+(c.slug==='thank-you'?' collection-thanks':'')} aria-hidden="true">{c.content.image?<img src={c.content.image} alt=""/>:c.slug==='thank-you'?<>Thank<br/>you.</>:c.slug==='smiley'?<Smile size={42} strokeWidth={1.4}/>:<Package size={38}/>}</span>
 <span><small>{t('READY-TO-ORDER STOCK','STOK I GATSHËM PËR POROSI')}</small><strong>{c.content.title[lang]||c.content.title.en}</strong></span><ArrowUpRight size={20} aria-hidden="true"/>
 </Link>)}
 </div>;
}
