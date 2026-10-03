import { env } from 'cloudflare:workers';
import { db,audit,CmsError,now } from './core';
export async function sendQueued(messageId:string,actor:string){
 if(!env.CMS_EMAIL_API_KEY||!env.CMS_EMAIL_FROM)throw new CmsError(503,'Email delivery is not configured. The saved inquiry is safe in your inbox.');
 const m=await db().prepare("SELECT * FROM cms_outbox WHERE id=?").bind(messageId).first();if(!m)throw new CmsError(404,'Message not found.');
 if(m.status==='sent')return {sent:true};if(Number(m.attempts)>0&&Date.now()-Date.parse(String(m.created_at))>23*3600000)throw new CmsError(409,'Check the provider delivery log before attempting this older message again.');
 const lock=await db().prepare("UPDATE cms_outbox SET status='sending',attempts=attempts+1,error=NULL WHERE id=? AND status IN ('pending','failed') AND attempts<5").bind(messageId).run();if(!lock.meta.changes)throw new CmsError(409,'This message is already sending or needs manual review.');
 try {
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.CMS_EMAIL_API_KEY,'Content-Type':'application/json','Idempotency-Key':'kobags-'+messageId},body:JSON.stringify({from:env.CMS_EMAIL_FROM,to:[m.recipient],subject:m.subject,text:m.body}),signal:AbortSignal.timeout(15000)});
  if(!r.ok)throw new Error('Provider returned '+r.status);
  await db().batch([db().prepare("UPDATE cms_outbox SET status='sent',error=NULL WHERE id=?").bind(messageId),audit(String(m.inquiry_id),actor,'email-sent',messageId)]);return {sent:true};
 }catch{await db().prepare("UPDATE cms_outbox SET status='failed',error='Delivery was not confirmed; check provider logs before retrying.' WHERE id=?").bind(messageId).run();throw new CmsError(502,'Delivery was not confirmed. Your message is saved for review and retry.');}
}
export async function queueQuote(quoteId:string,actor:string){
 const q=await db().prepare("SELECT q.*,i.data AS inquiry_data FROM cms_quotes q JOIN cms_inquiries i ON i.id=q.inquiry_id WHERE q.id=? AND q.status='issued'").bind(quoteId).first();if(!q)throw new CmsError(422,'Issue the quotation before preparing delivery.');
 const data=JSON.parse(String(q.data)),contact=JSON.parse(String(q.inquiry_data));const messageId='quote-'+quoteId;
 const body=contact.language==='sq'?['Oferta e Kobags Group',String(q.inquiry_id),'Versioni '+q.version,'Sasia: '+data.quantity,'Gjithsej: EUR '+(data.totalCents/100).toFixed(2),'E vlefshme deri më: '+data.validUntil,'Kushtet: '+data.terms,'Dorëzimi: '+data.delivery,'Ju lutemi përgjigjuni për ta diskutuar ose konfirmuar ofertën. Dizajni kërkon miratim të veçantë.'].join('\n'):['Kobags Group quotation',String(q.inquiry_id),'Revision '+q.version,'Quantity: '+data.quantity,'Total: EUR '+(data.totalCents/100).toFixed(2),'Valid until: '+data.validUntil,'Terms: '+data.terms,'Delivery: '+data.delivery,'Please reply to discuss or confirm this quotation. Artwork requires separate approval.'].join('\n');
 await db().batch([db().prepare("INSERT OR IGNORE INTO cms_outbox(id,inquiry_id,recipient,subject,body,status,created_at) VALUES(?,?,?,?,?,'pending',?)").bind(messageId,String(q.inquiry_id),contact.email,'Kobags quotation '+q.inquiry_id+' / V'+q.version,body,now()),audit(String(q.inquiry_id),actor,'quote-email-prepared',quoteId)]);return {id:messageId};
}
