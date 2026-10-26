import { z } from "../schema";
import { env } from "cloudflare:workers";
import { applyAction, seed } from "@/lib/demo-domain";
import { demoSession } from "@/lib/demo-session";
import { db,id,now,hash,token,audit,CmsError,body,rateLimit,response } from "./core";
import { publishedRecords } from "./records";
import type { Content } from "./types";
export async function liveConfiguration() {
 const records=await publishedRecords();const config=records.find(r=>r.kind==='settings')?.published?.settings;
 return {records,enabled:config?.liveInquiries===true,settings:config};
}
export async function submitInquiry(req:Request) {
 const configuration=await liveConfiguration();if(!configuration.enabled)throw new CmsError(503,"Online inquiry handling has not been activated. Please contact the team directly.");
 const session=await demoSession(req);if(session.cookie)return response({error:"Please retry to establish your private request session."},409,{"Set-Cookie":session.cookie});
 const input=await body(req);if(input.websiteTrap)throw new CmsError(422,"The request could not be accepted.");
 const state=seed();const catalog=configuration.records.filter(r=>r.kind==='product'&&r.published?.product);
 if(configuration.settings)state.catalog=catalog.map(r=>r.published!.product!);
 state.settings.moq=configuration.settings?.moq||5000;
 let snapshot:Record<string,unknown>,kind:string,key:string;
 try {
  if(input.kind==='stock'){
   const request=z.object({collection:z.string().max(150),variant:z.string().max(80),quantity:z.number().int().min(1).max(10000000),city:z.string().trim().min(2).max(150),note:z.string().max(1200)}).parse(input);
   const collection=configuration.records.find(r=>r.kind==='collection'&&r.slug===request.collection);
   const selected=collection?.published?.collection?.variants.find(v=>v.id===request.variant);
   if(!collection||!selected||selected.status==='out')throw new Error('This stock option is no longer available. Refresh and choose another option.');
   const c=collection.published!;
   const message=`Stock collection: ${c.title.en}\n${c.collection!.dimensions}\n${selected.gsm} GSM / ${selected.color}\nQuantity: ${request.quantity}\nDelivery: ${request.city}\n${request.note}`;
   const result=applyAction(state,{type:'inquiry',data:{...input.data,kind:'contact',model:'Finished stock',message}});
   snapshot={...result.state.inquiries[0],kind:'stock',collection:collection.slug,collectionName:c.title.en,productName:c.title.en,collectionRevision:collection.revision,dimensions:c.collection!.dimensions,gsm:selected.gsm,color:selected.color,variant:selected.id,availability:selected.status,quantity:request.quantity,city:request.city,note:request.note};
   kind='stock';key=String(input.data.key);
  }else if(input.kind==='quote'){
   const selected=catalog.find(r=>r.published?.product?.slug===input.design?.product)?.published as Content|undefined;
   if(configuration.settings&&!selected)throw new Error('This bag is not currently accepting new requests.');
   if(selected && ((selected.activeSizes&&!selected.activeSizes.includes(input.design.size))||(selected.colors&&!selected.colors.includes(input.design.color))||input.design.printColors>(selected.printColors||4)))throw new Error('This combination is no longer available. Review your bag options.');
   state.settings.moq=selected?.moq||state.settings.moq;
   const result=applyAction(state,{type:'submit',design:input.design});snapshot=result.state.requests[0].snapshot as unknown as Record<string,unknown>;kind='quote';key=String(snapshot.key);
   snapshot={...snapshot,catalogRevision:catalog.find(r=>r.published?.product?.slug===snapshot.product)?.revision||1,studioVersion:'v4'};
  }else { const result=applyAction(state,{type:'inquiry',data:input.data});snapshot={...result.state.inquiries[0]};kind=String(snapshot.kind);key=String(input.data.key); }
 }catch(e){throw new CmsError(422,e instanceof Error&&!(e.name==='ZodError')?e.message:'Check your contact information, consent and bag specifications.');}
 const payload=JSON.stringify({kind,snapshot:{...snapshot,createdAt:undefined,id:undefined},language:input.language==='sq'?'sq':'en'});const digest=await hash(payload);const requestKey=await hash(session.owner+':'+key);
 const existing=await db().prepare("SELECT id,payload_hash FROM cms_inquiries WHERE request_key=?").bind(requestKey).first<{id:string;payload_hash:string}>();
 if(existing){if(existing.payload_hash!==digest)throw new CmsError(409,'REQUEST_KEY_CONFLICT');return response({id:existing.id,saved:true});}
 await rateLimit(req,'inquiries',12);
 const inquiryId=id('KBG-'),companyId=id('company-'),timestamp=now();
 const data=JSON.stringify({...snapshot,language:input.language==='sq'?'sq':'en',consent:true,consentVersion:'cms-inquiry-v1',consentAt:timestamp,source:input.kind==='quote'?'/quote':'/'+kind});
 const statements=[db().prepare("INSERT INTO cms_companies(id,name,contact,email,phone,created_at) VALUES(?,?,?,?,?,?)").bind(companyId,String(snapshot.company),String(snapshot.contact),String(snapshot.email),String(snapshot.phone||''),timestamp),db().prepare("INSERT INTO cms_inquiries(id,owner,request_key,payload_hash,kind,company_id,data,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?)").bind(inquiryId,session.owner,requestKey,digest,kind,companyId,data,timestamp,timestamp),audit(inquiryId,'customer','inquiry-received',kind)];
 if(env.CMS_NOTIFY_EMAIL)statements.push(db().prepare("INSERT INTO cms_outbox(id,inquiry_id,recipient,subject,body,status,created_at) VALUES(?,?,?,?,?,'pending',?)").bind(id(),inquiryId,env.CMS_NOTIFY_EMAIL,'New Kobags inquiry '+inquiryId,'A new '+kind+' inquiry is saved in the Kobags CMS. Sign in to review its specification and contact details.',timestamp));
 try {await db().batch(statements);}catch(e){const retry=await db().prepare("SELECT id,payload_hash FROM cms_inquiries WHERE request_key=?").bind(requestKey).first<{id:string;payload_hash:string}>();if(retry?.payload_hash===digest)return response({id:retry.id,saved:true});throw e;}
 return response({id:inquiryId,saved:true},201);
}
export async function inquiryDetail(inquiryId:string) {
 const row=await db().prepare("SELECT * FROM cms_inquiries WHERE id=?").bind(inquiryId).first();if(!row)throw new CmsError(404,'Inquiry not found.');
 const [quotes,artwork,approvals,events,orders]=await Promise.all(['cms_quotes','cms_artwork','cms_approvals','cms_events','cms_orders'].map(table=>db().prepare(`SELECT * FROM ${table} WHERE ${table==='cms_events'?'entity_id':'inquiry_id'}=? ORDER BY created_at DESC LIMIT 100`).bind(inquiryId).all()));
 return {inquiry:{...row,data:JSON.parse(String(row.data)),owner:undefined,portal_hash:undefined,request_key:undefined,payload_hash:undefined},quotes:quotes.results.map(q=>({...q,data:JSON.parse(String(q.data))})),artwork:artwork.results,approvals:approvals.results,events:events.results,orders:orders.results};
}
export async function portalFor(inquiryId:string,actor:string){const secret=token();const r=await db().prepare("UPDATE cms_inquiries SET portal_hash=?,portal_expires=? WHERE id=?").bind(await hash(secret),new Date(Date.now()+14*86400000).toISOString(),inquiryId).run();if(!r.meta.changes)throw new CmsError(404,'Inquiry not found.');await audit(inquiryId,actor,'portal-link-created','Previous link revoked; new link expires in 14 days.').run();return {portal:'/request/'+secret};}
