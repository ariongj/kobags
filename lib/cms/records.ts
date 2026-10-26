import { stockDefaults } from "@/lib/stock-collections";
import { cache } from "react";
import mediaSeed from "./seed-media.json";
import copySeed from "./seed-copy.json";
import pageSeed from "./seed-pages.json";
import { articles } from "@/lib/journal";
import { localizeArticle } from "@/lib/journal-sq";
import { certificates } from "@/lib/certificates";
import { db, now, id, audit, CmsError } from "./core";
import { content } from "./validation";
import { recordKinds, type CmsRecord, type Content, type Staff } from "./types";
import { products, colors } from "@/lib/catalog";
import { productCopySq } from "@/lib/product-copy";
import { seoPages } from "@/lib/seo-config";
import { company, kosovoMunicipalities } from "@/lib/company";
import { env } from 'cloudflare:workers';
import { activateInquiriesForLaunch } from './launch-activation';
export function emptyContent(title = ""): Content { return {title:{en:title,sq:""},description:{en:"",sq:""},image:"",sections:[],seoTitle:{en:"",sq:""},seoDescription:{en:"",sq:""},path:""}; }
export function record(row: Record<string, unknown>): CmsRecord { return {...row,draft:JSON.parse(String(row.draft)),published:row.published?JSON.parse(String(row.published)):null} as CmsRecord; }
// React memoization lasts only for this server render; staff publications are
// visible on the next request, with no cross-visitor or cross-host cache.
export const publishedRecords = cache(async function publishedRecords() {
 try { await activateInquiriesForLaunch(db(),env.CMS_ACTIVATE_INQUIRIES); const rows=await db().prepare("SELECT * FROM cms_records WHERE archived=0 AND published IS NOT NULL ORDER BY slug").all(); return rows.results.map(record).filter(r=>!r.published?.start||r.published.start<=now()).filter(r=>!r.published?.end||r.published.end>now()); }
 catch { return []; } // The source-owned site remains available before migration/initial import.
});
export async function seedCms(actor: string) {
 const seeds:{id:string;kind:string;slug:string;data:Content;published:boolean}[]=[];
 for(const c of stockDefaults)seeds.push({id:'collection-'+c.slug,kind:'collection',slug:c.slug,data:{...emptyContent(),title:c.title,description:c.description,image:c.image,collection:c.collection},published:true});
 for(const p of products)seeds.push({id:"product-"+p.slug,kind:"product",slug:p.slug,data:{...emptyContent(p.name),title:{en:p.name,sq:p.name},description:{en:p.description,sq:productCopySq[p.slug].description},product:p,productSq:{name:p.name,...productCopySq[p.slug]},image:p.image,path:"/products/"+p.slug,colors:colors.map(c=>c.name),activeSizes:p.variants.map(v=>v.name),moq:5000,printColors:4},published:true});
 for(const [path,seo] of Object.entries(seoPages).filter(([p])=>!p.startsWith('/demo')&&p!=='/handoff'&&p!=='/quote'&&p!=='/design'))seeds.push({id:"page-"+(path==='/'?'home':path.slice(1).replaceAll('/','-')),kind:"page",slug:path==='/'?'home':path.slice(1).replaceAll('/','-'),data:{...emptyContent(),preserveLayout:true,sections:(pageSeed as Record<string,{sections:Content['sections']}>)[path]?.sections||[],path,title:{en:seo.title[0],sq:seo.title[1]},description:{en:seo.description[0],sq:seo.description[1]},seoTitle:{en:seo.title[0],sq:seo.title[1]},seoDescription:{en:seo.description[0],sq:seo.description[1]}},published:false});
 for(let i=0;i<copySeed.length;i+=25){const group=copySeed.slice(i,i+25);seeds.push({id:'copy-'+i,kind:'copy',slug:'website-wording-'+i,data:{...emptyContent(),title:{en:'Website wording / '+(i+1)+'–'+(i+group.length),sq:'Tekstet e faqes / '+(i+1)+'–'+(i+group.length)},description:{en:'Edit existing wording while preserving the website design.',sq:'Redaktoni tekstet duke ruajtur dizajnin e faqes.'},sections:group.map((pair,index)=>({id:'copy-'+(i+index),title:{en:pair.source,sq:pair.source},body:{en:pair.en,sq:pair.sq},original:{en:pair.en,sq:pair.sq},image:'',alt:{en:'',sq:''},link:'',linkLabel:{en:'',sq:''},visible:true}))},published:false});}
 for(const a of articles){const sq=localizeArticle(a,'sq');seeds.push({id:'article-'+a.slug,kind:'article',slug:a.slug,data:{...emptyContent(),path:'/blog/'+a.slug,title:{en:a.title,sq:sq.title},description:{en:a.intro,sq:sq.intro},sections:a.sections.map((section,i)=>({id:'article-section-'+i,title:{en:section.title,sq:sq.sections[i]?.title||''},body:{en:section.body,sq:sq.sections[i]?.body||''},image:'',alt:{en:'',sq:''},link:'',linkLabel:{en:'',sq:''},visible:true}))},published:false});}
 for(const c of certificates)seeds.push({id:'certificate-'+c.id,kind:'certificate',slug:'certificate-'+c.id,data:{...emptyContent(),title:{en:c.standard,sq:c.standard},description:{en:c.title,sq:c.titleSq},registration:c.number,source:c.source},published:false});
 seeds.push({id:"global-settings",kind:"settings",slug:"global-settings",data:{...emptyContent(),title:{en:"Business settings",sq:"Konfigurimet e biznesit"},description:{en:"Shared contact and quotation rules.",sq:"Kontaktet dhe rregullat e ofertave."},settings:{moq:5000,leadTime:"Timing is confirmed with your quotation.",phone:company.telephone,email:company.email,address:company.streetAddress,liveInquiries:true}},published:true});
 for(const name of kosovoMunicipalities)seeds.push({id:"municipality-"+name,kind:"municipality",slug:"municipality-"+name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-'),data:{...emptyContent(),title:{en:name,sq:name},description:{en:"Wholesale bag inquiries from businesses in "+name+". Transport terms are confirmed with the quotation.",sq:"Kërkesa për çanta me shumicë nga bizneset në "+name+". Kushtet e transportit konfirmohen në ofertë."}},published:false});
 // Import is repeatable and never overwrites an editor's existing records.
 for(let start=0;start<seeds.length;start+=25)await db().batch(seeds.slice(start,start+25).map(s=>db().prepare("INSERT OR IGNORE INTO cms_records(id,kind,slug,draft,published,revision,archived,mutation,updated_at) VALUES(?,?,?,?,?,1,0,?,?)").bind(s.id,s.kind,s.slug,JSON.stringify(s.data),s.published?JSON.stringify(s.data):null,id(),now())));
 for(let start=0;start<mediaSeed.length;start+=25)await db().batch(mediaSeed.slice(start,start+25).map(m=>db().prepare("INSERT OR IGNORE INTO cms_media(id,object_key,filename,type,size,hash,visibility,alt_en,alt_sq,created_by,created_at) VALUES(?,?,?,?,?,?,'public',?,?,?,?)").bind(m.id,'asset:'+m.path,m.filename,m.type,m.size,m.hash,m.filename,m.filename,actor,now())));
 await audit("cms",actor,"import","Source catalogue, page metadata, municipality directory and settings imported without overwriting existing records.").run();
}
export async function saveRecord(input: Record<string, unknown>, member: Staff) {
 const action=String(input.action||"save");const recordId=String(input.id||id("record-"));
 const existing=await db().prepare("SELECT * FROM cms_records WHERE id=?").bind(recordId).first();
 if(!existing && action!=="save")throw new CmsError(404,"Record not found.");
 const old=existing?record(existing):null;
 const kind=old?.kind||String(input.kind);if(!recordKinds.includes(kind as typeof recordKinds[number]))throw new CmsError(422,"Choose a valid record type.");
 const slug=old?.slug||String(input.slug||"");if(!/^[a-z0-9][a-z0-9-]{0,150}$/.test(slug))throw new CmsError(422,"Use a short lowercase slug with hyphens.");
 if(old && Number(input.revision)!==old.revision)throw new CmsError(409,"Someone updated this record. Reload it before saving your changes.");
 let next=action==='save'?content(input.data):old!.draft;
 if(action==='rollback') { const v=await db().prepare("SELECT data FROM cms_versions WHERE id=? AND record_id=?").bind(String(input.versionId),recordId).first<{data:string}>();if(!v)throw new CmsError(404,"Version not found.");next=content(JSON.parse(v.data)); }
 if(kind==='collection'&&!next.collection)throw new CmsError(422,'Add the collection stock specification.');
 if(kind==='product' && (!next.product||next.product.slug!==slug))throw new CmsError(422,"Keep the product linked to its original studio family.");
 if(action==='publish') { next=content(next,true);
  for(const source of [next.image,next.product?.image,next.source,next.settings?.media?.heroImage,next.settings?.media?.printingVideo,next.settings?.media?.printingPoster,...next.sections.map(section=>section.image)].filter(Boolean)){
   if(source!.startsWith('/api/media/')){const mediaId=source!.slice('/api/media/'.length);const media=await db().prepare("SELECT id FROM cms_media WHERE id=? AND visibility='public'").bind(mediaId).first();if(!media)throw new CmsError(422,'Public content can only reference public media.');}
  }
  if(next.path){const duplicate=await db().prepare("SELECT id FROM cms_records WHERE id!=? AND archived=0 AND json_extract(published,'$.path')=?").bind(recordId,next.path).first();if(duplicate)throw new CmsError(409,'Another published record uses this path.');}
if(kind==='page' && !next.preserveLayout && next.sections.length===0)throw new CmsError(422,"Add translated sections before replacing the existing page."); }
 const published=action==='publish'?JSON.stringify(next):action==='unpublish'?null:old?.published?JSON.stringify(old.published):null;
 const mutation=id();const revision=(old?.revision||0)+1;const timestamp=now();
 const statement=old?db().prepare("UPDATE cms_records SET draft=?,published=?,revision=?,archived=?,mutation=?,updated_at=? WHERE id=? AND revision=?").bind(JSON.stringify(next),published,revision,action==='archive'?1:0,mutation,timestamp,recordId,old.revision):db().prepare("INSERT INTO cms_records(id,kind,slug,draft,published,revision,archived,mutation,updated_at) VALUES(?,?,?,?,?,1,0,?,?)").bind(recordId,kind,slug,JSON.stringify(next),published,mutation,timestamp);
 const statements=[statement,db().prepare("INSERT INTO cms_versions(id,record_id,revision,data,actor,action,created_at) SELECT ?,id,revision,draft,?,?,? FROM cms_records WHERE id=? AND mutation=?").bind(id(),member.id,action,timestamp,recordId,mutation),db().prepare("INSERT INTO cms_events(id,entity_id,actor,action,detail,created_at) SELECT ?,id,?,?,?,? FROM cms_records WHERE id=? AND mutation=?").bind(id(),member.id,action,kind,timestamp,recordId,mutation)];
 if(action==='publish'&&old?.published?.path&&next.path&&old.published.path!==next.path){
  const oldPath=old.published.path;
  if(next.path===oldPath)throw new CmsError(422,'Choose a different path.');
  statements.push(db().prepare("INSERT INTO cms_redirects(path,destination) SELECT ?,? WHERE EXISTS(SELECT 1 FROM cms_records WHERE id=? AND mutation=?) ON CONFLICT(path) DO UPDATE SET destination=excluded.destination").bind(oldPath,next.path,recordId,mutation));
  statements.push(db().prepare("UPDATE cms_redirects SET destination=? WHERE destination=? AND EXISTS(SELECT 1 FROM cms_records WHERE id=? AND mutation=?)").bind(next.path,oldPath,recordId,mutation));
  statements.push(db().prepare("DELETE FROM cms_redirects WHERE path=? AND EXISTS(SELECT 1 FROM cms_records WHERE id=? AND mutation=?)").bind(next.path,recordId,mutation));
 }
 const result=await db().batch(statements);
 if(!result[0].meta.changes)throw new CmsError(409,"This record changed. Reload before saving.");return {id:recordId};
}
