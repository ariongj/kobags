import { db,bucket,id,now,hash,audit,CmsError,originGuard } from './core';
import { permissions,type Staff } from './types';
import { readRequestBytes } from '../request-body';
export async function upload(req:Request,member:Staff){
 originGuard(req);
 const contentType=req.headers.get('content-type')||'';
 if(!contentType.toLowerCase().startsWith('multipart/form-data;'))throw new CmsError(415,'Expected a file upload.');
 const uploadBytes=await readRequestBytes(req,22*1024*1024);
 let form:FormData;
 try{form=await new Response(uploadBytes.buffer as ArrayBuffer,{headers:{'Content-Type':contentType}}).formData();}catch{throw new CmsError(400,'Invalid file upload.');}
 const file=form.get('file');if(!(file instanceof File)||file.size>20*1024*1024||!file.size)throw new CmsError(422,'Choose a PNG, JPG, WebP, MP4 or PDF below 20 MB.');
 const visibility=form.get('visibility')==='private'?'private':'public',inquiryId=String(form.get('inquiryId')||'');
 if(visibility==='private'&&!permissions[member.role].includes('artwork'))throw new CmsError(403,'Your role cannot upload private artwork.');
 if(visibility==='private'&&!(await db().prepare('SELECT id FROM cms_inquiries WHERE id=?').bind(inquiryId).first()))throw new CmsError(422,'Select an existing inquiry for private artwork.');
 const bytes=await file.arrayBuffer(),b=new Uint8Array(bytes),header=String.fromCharCode(...b.slice(0,16));
 const type=header.startsWith('\x89PNG\r\n\x1a\n')?'image/png':b[0]===255&&b[1]===216&&b[2]===255?'image/jpeg':header.startsWith('RIFF')&&header.slice(8,12)==='WEBP'?'image/webp':header.startsWith('%PDF-')?'application/pdf':header.slice(4,8)==='ftyp'?'video/mp4':null;
 if(!type||type!==file.type)throw new CmsError(422,'The file contents do not match an accepted format.');
 const altEn=String(form.get('altEn')||'').slice(0,250),altSq=String(form.get('altSq')||'').slice(0,250);
 if(visibility==='public'&&(!altEn.trim()||!altSq.trim()))throw new CmsError(422,'Add English and Albanian descriptions for public media.');
 const mediaId=id(),key=visibility+'/'+mediaId,digest=await hash(bytes);const duplicate=await db().prepare('SELECT id FROM cms_media WHERE hash=? AND visibility=? AND COALESCE(inquiry_id,\'\')=?').bind(digest,visibility,visibility==='private'?inquiryId:'').first<{id:string}>();if(duplicate)return {id:duplicate.id,url:'/api/media/'+duplicate.id,reused:true};
 await bucket().put(key,bytes,{httpMetadata:{contentType:type}});
 try{await db().batch([db().prepare('INSERT INTO cms_media(id,object_key,filename,type,size,hash,visibility,alt_en,alt_sq,inquiry_id,created_by,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').bind(mediaId,key,file.name.replace(/[^a-zA-Z0-9._ -]/g,'_').slice(0,150),type,file.size,digest,visibility,altEn,altSq,visibility==='private'?inquiryId:null,member.id,now()),audit(mediaId,member.id,'media-upload',visibility)]);}catch(e){await bucket().delete(key);throw e;}return {id:mediaId,url:'/api/media/'+mediaId};
}
export async function describeMedia(input:Record<string,unknown>,member:Staff){
 const row=await db().prepare('SELECT * FROM cms_media WHERE id=?').bind(String(input.id)).first();
 if(!row)throw new CmsError(404,'Media not found.');
 if(row.visibility==='private'&&!permissions[member.role].includes('artwork'))throw new CmsError(403,'Your role cannot edit private artwork.');
 const en=String(input.altEn||'').trim(),sq=String(input.altSq||'').trim();
 if(en.length>250||sq.length>250||row.visibility==='public'&&(!en||!sq))throw new CmsError(422,'Add both descriptions, each below 250 characters.');
 await db().batch([db().prepare('UPDATE cms_media SET alt_en=?,alt_sq=? WHERE id=?').bind(en,sq,String(input.id)),audit(String(input.id),member.id,'media-description-updated')]);return {};
}
