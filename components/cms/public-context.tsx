"use client";
import { createContext,useContext,type ReactNode } from 'react';
import { products as sourceProducts, type Product } from '@/lib/catalog';
import { certificates as sourceCertificates, type Certificate } from '@/lib/certificates';
import { stockDefaults } from '@/lib/stock-collections';
import type { Content } from '@/lib/cms/types';
export type PublishedRecord={id:string;kind:string;slug:string;revision:number;content:Content};
const Context=createContext<PublishedRecord[]>([]);
export function CmsPublicProvider({records,children}:{records:PublishedRecord[];children:ReactNode}){return <Context.Provider value={records}>{children}</Context.Provider>;}
export function useCms(){
 const records=useContext(Context);const entries=records.filter(r=>r.kind==='product'&&r.content.product);
 const products:Product[]=records.some(r=>r.kind==='settings')?entries.map(r=>({...r.content.product!,copySq:r.content.productSq})):sourceProducts;
 const settings=records.find(r=>r.kind==='settings')?.content.settings;
 const collections=records.some(r=>r.kind==='settings')?records.filter(r=>r.kind==='collection'&&r.content.collection):stockDefaults.map(c=>({id:'collection-'+c.slug,kind:'collection',slug:c.slug,revision:1,content:{title:c.title,description:c.description,image:c.image,sections:[],path:'',seoTitle:{en:'',sq:''},seoDescription:{en:'',sq:''},collection:c.collection}}));
 return {records,products,collections,settings,enabled:settings?.liveInquiries===true,options:(slug:string)=>entries.find(r=>r.slug===slug)?.content,getProduct:(slug:string)=>products.find(p=>p.slug===slug)||sourceProducts.find(p=>p.slug===slug)||sourceProducts[0]};
}

export function usePublishedCertificates():Certificate[]{
 const {records}=useCms();return sourceCertificates.map(original=>{const c=records.find(r=>r.id==='certificate-'+original.id)?.content;return c?{...original,standard:c.title.en,title:c.description.en,titleSq:c.description.sq,number:c.registration||original.number,source:c.source||original.source,image:c.image,issued:c.issued,expires:c.expires}:original;});
}
