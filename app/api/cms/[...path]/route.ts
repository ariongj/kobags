import { backupData,backupArchive } from "@/lib/cms/backup";
import { reports } from "@/lib/cms/reporting";
import { env } from 'cloudflare:workers';
import { db,staff,body,response,failure,CmsError,audit } from '@/lib/cms/core';
import { permissions } from '@/lib/cms/types';
import { record,saveRecord,seedCms } from '@/lib/cms/records';
import { inviteStaff,changeStaff,resetStaffPassword } from '@/lib/cms/members';
import { login,logout,acceptInvitation,changePassword } from '@/lib/cms/auth';
import { inquiryDetail,portalFor } from '@/lib/cms/inquiries';
import { updateInquiry,addQuote,issueQuote,addArtwork,decide,release,progressOrder,reviseRelease } from '@/lib/cms/workflow';
import { upload,describeMedia } from '@/lib/cms/media';
import { sendQueued,queueQuote } from '@/lib/cms/mail';
export const dynamic='force-dynamic';
export async function GET(req:Request,{params}:{params:Promise<{path:string[]}>}){try{
 const path=(await params).path;
 if(path[0]==='session'){
  let member=null;try{member=await staff(req);}catch(e){if(!(e instanceof CmsError)||![401,403].includes(e.status))throw e;}
  return response({signedIn:!!member,member,permissions:member?permissions[member.role]:[],emailReady:!!member&&!!(env.CMS_EMAIL_API_KEY&&env.CMS_EMAIL_FROM),storageReady:!!member&&!!env.BUCKET});
 }
 const member=await staff(req);
 if(path[0]==='records'){await staff(req,'content');const rows=await db().prepare('SELECT * FROM cms_records ORDER BY kind,slug').all();return response({records:rows.results.map(record)});}
 if(path[0]==='versions'){await staff(req,'content');return response(await db().prepare('SELECT * FROM cms_versions WHERE record_id=? ORDER BY revision DESC LIMIT 100').bind(path[1]).all());}
 if(path[0]==='inquiries'){await staff(req,'inquiries');if(path[1])return response(await inquiryDetail(path[1]));return response(await db().prepare('SELECT id,kind,data,status,assignee,priority,due_at,revision,created_at,updated_at,company_id FROM cms_inquiries ORDER BY created_at DESC LIMIT 500').all());}
 if(path[0]==='companies'){await staff(req,'inquiries');return response(await db().prepare('SELECT * FROM cms_companies ORDER BY name LIMIT 500').all());}
 if(path[0]==='staff'){await staff(req,'staff');return response(await db().prepare('SELECT s.id,s.email,s.name,s.role,s.active,s.expires_at,c.staff_id AS user_id FROM cms_staff s LEFT JOIN cms_credentials c ON c.staff_id=s.id ORDER BY s.created_at').all());}
 if(path[0]==='team'){if(!permissions[member.role].includes('inquiries'))throw new CmsError(403,'Not permitted.');return response(await db().prepare('SELECT id,name,role FROM cms_staff WHERE active=1').all());}
 if(path[0]==='media'){await staff(req,'media');const privateAllowed=permissions[member.role].includes('artwork');return response(await db().prepare('SELECT id,filename,type,size,visibility,alt_en,alt_sq,inquiry_id,created_at FROM cms_media WHERE visibility=\'public\' OR ?=1 ORDER BY created_at DESC LIMIT 500').bind(privateAllowed?1:0).all());}
 if(path[0]==='orders'){await staff(req,'production');return response(await db().prepare('SELECT o.*,a.media_id FROM cms_orders o JOIN cms_artwork a ON a.id=o.artwork_id ORDER BY o.created_at DESC LIMIT 500').all());}
 if(path[0]==='outbox'){await staff(req,'quotes');return response(await db().prepare('SELECT * FROM cms_outbox ORDER BY created_at DESC LIMIT 100').all());}
 if(path[0]==='reports'){await staff(req,'export');return response(await reports());}
 if(path[0]==='audit'){await staff(req,'export');return response(await db().prepare('SELECT * FROM cms_events ORDER BY created_at DESC LIMIT 500').all());}
 if(path[0]==='backup-archive'){await staff(req,'staff');return await backupArchive(member.id);}
 if(path[0]==='backup'){
  await staff(req,'staff');const result=await backupData(member.id);
  return response(result,200,{'Content-Disposition':'attachment; filename="kobags-cms-backup.json"'});
 }
 throw new CmsError(404,'CMS endpoint not found.');
}catch(e){return failure(e);}}
export async function POST(req:Request,{params}:{params:Promise<{path:string[]}>}){try{
 const path=(await params).path[0];
 if(path==='media'){const member=await staff(req,'media');return response(await upload(req,member),201);}
 const input=await body(req,['login','logout','claim','password'].includes(path)?4096:400000);
 if(['login','logout','claim','password'].includes(path)){
  const setCookie=path==='login'?await login(req,input):path==='logout'?await logout(req):path==='claim'?await acceptInvitation(req,input):await changePassword(req,input);
  return response({ok:true},200,{'Set-Cookie':setCookie});
 }
 const required:Record<string,string>={'reset-password':'staff','media-description':'media',records:'content',import:'content',invite:'staff',staff:'staff',inquiries:'inquiries',note:'inquiries',quote:'quotes','issue-quote':'approve',artwork:'artwork',decision:'approve',release:'production','revise-release':'approve',order:'production',portal:'inquiries','queue-quote':'quotes','send-email':'quotes'};
 if(!required[path])throw new CmsError(404,'CMS action not found.');const member=await staff(req,required[path]);let result:unknown={};
 if(path==='records'){
  if(input.action&&input.action!=='save'&&input.action!=='rollback')await staff(req,'publish');
  const prior=input.id?await db().prepare('SELECT kind FROM cms_records WHERE id=?').bind(String(input.id)).first<{kind:string}>():null;
  if(prior?.kind==='settings'||input.kind==='settings')await staff(req,'settings');
  if(!['save','publish','unpublish','archive','unarchive','rollback'].includes(input.action||'save'))throw new CmsError(422,'Unknown content action.');
  result=await saveRecord(input,member);
 }else if(path==='media-description')result=await describeMedia(input,member);
 else if(path==='import'){await seedCms(member.id);}
 else if(path==='invite')result=await inviteStaff(input,member);
 else if(path==='staff')result=await changeStaff(input,member);
 else if(path==='reset-password')result=await resetStaffPassword(input,member);
 else if(path==='inquiries')result=await updateInquiry(input,member);
 else if(path==='note'){const note=String(input.note||'').trim();if(!note||note.length>3000)throw new CmsError(422,'Write a note below 3,000 characters.');const found=await db().prepare('SELECT id FROM cms_inquiries WHERE id=?').bind(String(input.id)).first();if(!found)throw new CmsError(404,'Inquiry not found.');await audit(String(input.id),member.id,'private-note',note).run();}
 else if(path==='quote')result=await addQuote(input,member);
 else if(path==='issue-quote')result=await issueQuote(input,member);
 else if(path==='artwork')result=await addArtwork(input,member);
 else if(path==='decision')result=await decide(input,member.name);
 else if(path==='release')result=await release(input,member);
 else if(path==='revise-release')result=await reviseRelease(input,member);
 else if(path==='order')result=await progressOrder(input,member);
 else if(path==='portal')result=await portalFor(String(input.id),member.id);
 else if(path==='queue-quote')result=await queueQuote(String(input.id),member.id);
 else if(path==='send-email'){if(input.confirm!==true)throw new CmsError(422,'Confirm the recipient before sending.');result=await sendQueued(String(input.id),member.id);}
 return response({ok:true,...result as object});
}catch(e){return failure(e);}}
