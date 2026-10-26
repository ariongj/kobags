"use client";
import { ArrowUpRight, Smile, Package } from "lucide-react";
import Link from "./site-link";
import { useKobags } from "./kobags-context";
import { useCms } from "./cms/public-context";
import { collectionUnavailable } from "@/lib/stock-collections";
export function CollectionCategories() {
 const {t,lang}=useKobags();const {collections}=useCms();
 return <div className="home-collection-categories" aria-label={t('Ready-to-order collections','Koleksione të gatshme për porosi')}>
 {collections.map(c=><Link key={c.id} href={'/quote?collection='+encodeURIComponent(c.slug)} className="collection-category">
 <span className={'collection-mark'+(c.content.image?' collection-photo':c.slug==='thank-you'?' collection-thanks':'')} aria-hidden="true">{c.content.image?<img src={c.content.image} srcSet={c.content.image === "/assets/client-2026-10/thank-you-stock.jpg" ? "/assets/client-2026-10/thank-you-stock-192.webp 192w, /assets/client-2026-10/thank-you-stock-384.webp 384w" : undefined} sizes="(max-width: 767px) 88px, 120px" alt="" width={1280} height={1035} loading="lazy" decoding="async"/>:c.slug==='thank-you'?<>Thank<br/>you.</>:c.slug==='smiley'?<Smile size={42} strokeWidth={1.4}/>:<Package size={38}/>}</span>
 <span><small>{t('FINISHED COLLECTION','KOLEKSION I GATSHËM')}</small><strong>{c.content.title[lang]||c.content.title.en}</strong>{collectionUnavailable(c.content.collection)&&<span className="collection-stock-status">{t('Temporarily out of stock','Përkohësisht jashtë stokut')}</span>}</span><ArrowUpRight size={20} aria-hidden="true"/>
 </Link>)}
 </div>;
}
