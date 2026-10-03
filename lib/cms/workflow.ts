import { z } from 'zod';
import { db,id,now,hash,audit,CmsError } from './core';
import { quotation } from './validation';
import { inquiryStatuses,orderStatuses,type Staff } from './types';
import { isCalendarDate } from '@/lib/design-validation';
export async function updateInquiry(input:Record<string,unknown>,member:Staff){
 const status=z.enum(inquiryStatuses).parse(input.status),priority=z.enum(['normal','high','urgent']).parse(input.priority);
 const due=String(input.dueAt||'');if(due&&!isCalendarDate(due))throw new CmsError(422,'Choose a valid due date.');
 if(input.assignee){const assigned=await db().prepare("SELECT id FROM cms_staff WHERE id=? AND active=1 AND role IN ('administrator','sales','manager','designer')").bind(String(input.assignee)).first();if(!assigned)throw new CmsError(422,'Choose active staff for this inquiry.');}
 const result=await db().batch([db().prepare("UPDATE cms_inquiries SET status=?,priority=?,assignee=?,due_at=?,revision=revision+1,updated_at=? WHERE id=? AND revision=?").bind(status,priority,input.assignee?String(input.assignee):null,due||null,now(),String(input.id),Number(input.revision)),db().prepare("INSERT INTO cms_events(id,entity_id,actor,action,detail,created_at) SELECT ?,?,?, 'inquiry-updated',?,? WHERE changes()=1").bind(id(),String(input.id),member.id,status,now())]);
 if(!result[0].meta.changes)throw new CmsError(409,'Inquiry changed. Reload before saving.');return {};
}
export async function addQuote(input:Record<string,unknown>,member:Staff){
 const data=quotation(input.data),inquiryId=String(input.id);const exists=await db().prepare("SELECT id FROM cms_inquiries WHERE id=? AND kind='quote'").bind(inquiryId).first();if(!exists)throw new CmsError(404,'Quote inquiry not found.');
 const json=JSON.stringify(data),quoteId=id('quote-');await db().batch([db().prepare("INSERT INTO cms_quotes(id,inquiry_id,version,data,hash,status,created_by,created_at) SELECT ?,?,COALESCE(MAX(version),0)+1,?,?,'draft',?,? FROM cms_quotes WHERE inquiry_id=?").bind(quoteId,inquiryId,json,await hash(json),member.id,now(),inquiryId),audit(inquiryId,member.id,'quote-created',quoteId)]);return {id:quoteId};
}
export async function issueQuote(input:Record<string,unknown>,member:Staff){
 const q=await db().prepare("SELECT * FROM cms_quotes WHERE id=?").bind(String(input.id)).first();if(!q||q.status!=='draft')throw new CmsError(409,'Only a draft quote can be issued.');
 if(JSON.parse(String(q.data)).validUntil<now().slice(0,10))throw new CmsError(422,'This quote has expired. Create a new revision.');
 const r=await db().batch([db().prepare("UPDATE cms_quotes SET status='issued' WHERE id=? AND status='draft' AND version=(SELECT MAX(version) FROM cms_quotes WHERE inquiry_id=?)").bind(String(input.id),String(q.inquiry_id)),db().prepare("INSERT INTO cms_events(id,entity_id,actor,action,detail,created_at) SELECT ?,?,?,'quote-issued',?,? WHERE changes()=1").bind(id(),String(q.inquiry_id),member.id,String(q.id),now())]);if(!r[0].meta.changes)throw new CmsError(409,'A newer quote revision exists.');return {};
}
export async function addArtwork(input:Record<string,unknown>,member:Staff){
 const inquiryId=String(input.id),mediaId=String(input.mediaId),note=String(input.note||'').trim();if(note.length<5||note.length>2000)throw new CmsError(422,'Describe the print dimensions and technical checks for this revision.');
 const media=await db().prepare("SELECT hash FROM cms_media WHERE id=? AND visibility='private' AND inquiry_id=?").bind(mediaId,inquiryId).first<{hash:string}>();if(!media)throw new CmsError(422,'Select a private artwork file attached to this inquiry.');
 const artworkId=id('art-');await db().batch([db().prepare("INSERT INTO cms_artwork(id,inquiry_id,version,media_id,hash,note,status,created_by,created_at) SELECT ?,?,COALESCE(MAX(version),0)+1,?,?,?,'review',?,? FROM cms_artwork WHERE inquiry_id=?").bind(artworkId,inquiryId,mediaId,media.hash,note,member.id,now(),inquiryId),audit(inquiryId,member.id,'artwork-created',artworkId)]);return {id:artworkId};
}
export async function decide(input:Record<string,unknown>,actor:string,inquiryId?:string){
 const kind=z.enum(['quote','artwork']).parse(input.kind),decision=z.enum(['approved','changes-requested','rejected']).parse(input.decision);
 const evidence=String(input.evidence||'').trim();if(evidence.length<5||evidence.length>3000)throw new CmsError(422,'Record the approver and the approval evidence or requested changes.');
 const table=kind==='quote'?'cms_quotes':'cms_artwork';const row=await db().prepare(`SELECT * FROM ${table} WHERE id=?`).bind(String(input.id)).first();
 if(!row||(inquiryId&&row.inquiry_id!==inquiryId))throw new CmsError(404,'Revision not found.');
 if(row.hash!==input.hash)throw new CmsError(409,'The revision fingerprint does not match. Reload the document.');
 if(kind==='quote'&&JSON.parse(String(row.data)).validUntil<now().slice(0,10))throw new CmsError(409,'This quotation has expired.');
 const status=kind==='quote'?'issued':'review';const result=await db().batch([db().prepare(`UPDATE ${table} SET status=? WHERE id=? AND status=? AND version=(SELECT MAX(version) FROM ${table} WHERE inquiry_id=?)`).bind(decision,String(input.id),status,String(row.inquiry_id)),db().prepare("INSERT INTO cms_approvals(id,inquiry_id,target_id,target_hash,kind,decision,actor,evidence,created_at) SELECT ?,?,?,?,?,?,?,?,? WHERE changes()=1").bind(id(),String(row.inquiry_id),String(row.id),String(row.hash),kind,decision,actor,evidence,now())]);
 if(!result[0].meta.changes)throw new CmsError(409,'This revision is superseded or already decided.');await audit(String(row.inquiry_id),actor,kind+'-'+decision,String(row.id)).run();return {};
}
export async function release(input:Record<string,unknown>,member:Staff){
 const inquiryId=String(input.id),proof=String(input.paymentEvidence||'').trim();if(proof.length<5||proof.length>2000)throw new CmsError(422,'Record the agreed payment condition and supporting reference.');
 const result=await db().prepare(`INSERT INTO cms_orders(id,inquiry_id,quote_id,artwork_id,status,payment_evidence,note,created_at)
 SELECT ?,i.id,q.id,a.id,'ready',?,'',? FROM cms_inquiries i JOIN cms_quotes q ON q.inquiry_id=i.id JOIN cms_artwork a ON a.inquiry_id=i.id
 WHERE i.id=? AND q.status='approved' AND a.status='approved' AND q.version=(SELECT MAX(version) FROM cms_quotes WHERE inquiry_id=i.id) AND a.version=(SELECT MAX(version) FROM cms_artwork WHERE inquiry_id=i.id)
 AND json_extract(q.data,'$.validUntil')>=? AND NOT EXISTS(SELECT 1 FROM cms_orders WHERE inquiry_id=i.id) RETURNING id`).bind(id('order-'),proof,now(),inquiryId,now().slice(0,10)).first();
 if(!result)throw new CmsError(409,'Release requires the latest approved quote and artwork, a valid quotation and no previous release.');await audit(inquiryId,member.id,'production-released',JSON.stringify(result)).run();return result;
}
export async function progressOrder(input:Record<string,unknown>,member:Staff){
 const order=await db().prepare("SELECT * FROM cms_orders WHERE id=?").bind(String(input.id)).first();if(!order)throw new CmsError(404,'Order not found.');
 const next=orderStatuses[orderStatuses.indexOf(order.status as typeof orderStatuses[number])+1];if(input.status!==next)throw new CmsError(409,'Follow the next production stage.');
 const note=String(input.note||'').trim();if(note.length<3||note.length>2000)throw new CmsError(422,'Add a production or dispatch note.');
 const r=await db().prepare(`UPDATE cms_orders SET status=?,note=?,revision=revision+1 WHERE id=? AND revision=? AND quote_id=(SELECT id FROM cms_quotes WHERE inquiry_id=? ORDER BY version DESC LIMIT 1) AND artwork_id=(SELECT id FROM cms_artwork WHERE inquiry_id=? ORDER BY version DESC LIMIT 1)`).bind(String(next),note,String(input.id),Number(input.revision),String(order.inquiry_id),String(order.inquiry_id)).run();if(!r.meta.changes)throw new CmsError(409,'Order changed or new revisions require review.');await audit(String(order.inquiry_id),member.id,'order-'+next,note).run();return {};
}
export async function reviseRelease(input:Record<string,unknown>,member:Staff){
 const proof=String(input.paymentEvidence||'').trim();
 if(proof.length<10||proof.length>2000)throw new CmsError(422,'Record the payment terms and confirmation that production has stopped for this revision.');
 const order=await db().prepare('SELECT * FROM cms_orders WHERE id=?').bind(String(input.id)).first();
 if(!order)throw new CmsError(404,'Order not found.');
 const result=await db().batch([
  db().prepare(`UPDATE cms_orders SET quote_id=(SELECT id FROM cms_quotes WHERE inquiry_id=? ORDER BY version DESC LIMIT 1),artwork_id=(SELECT id FROM cms_artwork WHERE inquiry_id=? ORDER BY version DESC LIMIT 1),status='ready',payment_evidence=?,note=?,revision=revision+1 WHERE id=? AND revision=? AND status NOT IN ('dispatched','closed')
   AND EXISTS(SELECT 1 FROM cms_quotes q WHERE q.inquiry_id=? AND q.status='approved' AND q.version=(SELECT MAX(version) FROM cms_quotes WHERE inquiry_id=q.inquiry_id) AND json_extract(q.data,'$.validUntil')>=?)
   AND EXISTS(SELECT 1 FROM cms_artwork a WHERE a.inquiry_id=? AND a.status='approved' AND a.version=(SELECT MAX(version) FROM cms_artwork WHERE inquiry_id=a.inquiry_id))
   AND (quote_id!=(SELECT id FROM cms_quotes WHERE inquiry_id=? ORDER BY version DESC LIMIT 1) OR artwork_id!=(SELECT id FROM cms_artwork WHERE inquiry_id=? ORDER BY version DESC LIMIT 1))`)
   .bind(order.inquiry_id,order.inquiry_id,proof,'Revised release; restart from approved specification.',String(input.id),Number(input.revision),order.inquiry_id,now().slice(0,10),order.inquiry_id,order.inquiry_id,order.inquiry_id),
  db().prepare("INSERT INTO cms_events(id,entity_id,actor,action,detail,created_at) SELECT ?,?,?,'production-release-revised',?,? WHERE changes()=1")
   .bind(id(),String(order.inquiry_id),member.id,JSON.stringify({previousOrder:order,reason:proof}),now())
 ]);
 if(!result[0].meta.changes)throw new CmsError(409,'Reload the order. Revised release needs newer approved documents and an order that has not been dispatched.');
 return {};
}
