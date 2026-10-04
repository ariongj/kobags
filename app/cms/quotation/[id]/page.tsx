import { headers } from 'next/headers';
import Link from 'next/link';
import { db,staff } from '@/lib/cms/core';
import { notFound } from 'next/navigation';
import type { QuoteData } from '@/lib/cms/types';
export const dynamic='force-dynamic';
export const metadata={title:'Private quotation | Kobags',robots:{index:false,follow:false}};
export default async function QuotationPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;return <PrivateQuotation id={id}/>;
}
async function PrivateQuotation({id}:{id:string}){
 const req=new Request('https://kobags.itdks.tech/cms',{headers:await headers()});
 try{await staff(req,'quotes');}catch{return <main className="cms-shell cms-access"><div><h1>This quotation requires sales access.</h1><Link href="/cms">Sign in to the CMS</Link></div></main>;}
 const row=await db().prepare('SELECT q.*,i.data AS inquiry_data FROM cms_quotes q JOIN cms_inquiries i ON i.id=q.inquiry_id WHERE q.id=?').bind(id).first();if(!row)notFound();const q=JSON.parse(String(row.data)) as QuoteData,d=JSON.parse(String(row.inquiry_data));const t=(en:string,sq:string)=>d.language==='sq'?sq:en;const eur=(c:number)=>'€'+(c/100).toFixed(2);
 return <main className="cms-shell cms-print-quotation"><header><strong>KOBAGS GROUP</strong><span>{t('Quotation','Oferta')} · V{String(row.version)} · {String(row.status)}</span></header><h1>{t('Commercial quotation','Oferta tregtare')}</h1><p>{String(row.inquiry_id)}</p><section><h2>{d.company}</h2><p>{d.contact} · {d.email}</p><p>{d.productName} / {d.size} · {d.dimensions} · {d.color}</p></section><table><thead><tr><th>{t('Item','Artikulli')}</th><th>{t('Quantity','Sasia')}</th><th>{t('Unit','Çmimi')}</th><th>{t('Amount','Shuma')}</th></tr></thead><tbody><tr><td>{d.productName}</td><td>{q.quantity.toLocaleString()}</td><td>{eur(q.unitCents)}</td><td>{eur(q.quantity*q.unitCents)}</td></tr>{[[t('Print setup','Përgatitja e shtypit'),q.setupCents],[t('Transport','Transporti'),q.shippingCents],[t('Tax','Taksa'),q.taxCents],[t('Discount','Zbritja'),-q.discountCents]].map(([label,cents])=><tr key={label}><td colSpan={3}>{label}</td><td>{eur(Number(cents))}</td></tr>)}<tr><th colSpan={3}>{t('Total','Gjithsej')} · EUR</th><th>{eur(q.totalCents)}</th></tr></tbody></table><h2>{t('Terms','Kushtet')}</h2><p>{q.terms}</p><h2>{t('Production & delivery','Prodhimi dhe dorëzimi')}</h2><p>{q.delivery}</p><p>{t('Valid until','Vlen deri më')} {q.validUntil}. {t('Artwork approval is recorded separately for the exact technical revision.','Miratimi i dizajnit regjistrohet veçmas për versionin e saktë teknik.')}</p><p className="cms-print-help">{t('Use your browser’s Print command to save this quotation as a PDF.','Përdorni komandën Print të shfletuesit për ta ruajtur ofertën si PDF.')}</p></main>;
}
