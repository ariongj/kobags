import { db,bucket,staff,failure,CmsError,audit,hash,now } from '@/lib/cms/core';
import { permissions } from '@/lib/cms/types';
export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){
 try{
  const {id}=await params;const row=await db().prepare('SELECT * FROM cms_media WHERE id=?').bind(id).first();if(!row)throw new CmsError(404,'File not found.');
  if(row.visibility==='private'){
   const portal=new URL(req.url).searchParams.get('portal');
   if(portal){const grant=await db().prepare("SELECT i.id FROM cms_inquiries i JOIN cms_artwork a ON a.inquiry_id=i.id WHERE i.portal_hash=? AND i.portal_expires>? AND a.media_id=?").bind(await hash(portal),now(),id).first();if(!grant)throw new CmsError(403,'File access is not available.');}
   else {const member=await staff(req);if(!permissions[member.role].some(p=>['artwork','approve','production'].includes(p)))throw new CmsError(403,'Your role cannot access private artwork.');if(member.role==='production'&&!await db().prepare('SELECT o.id FROM cms_orders o JOIN cms_artwork a ON a.id=o.artwork_id WHERE a.media_id=?').bind(id).first())throw new CmsError(403,'Production access is limited to released artwork.');await audit(String(row.inquiry_id),member.id,'private-file-opened',id).run();}
  }
  if(String(row.object_key).startsWith('asset:')){const path=String(row.object_key).slice(6);return Response.redirect(new URL(path,req.url),302);}
  const object=await bucket().get(String(row.object_key));if(!object)throw new CmsError(404,'File is unavailable.');
  return new Response(object.body,{headers:{'Content-Type':String(row.type),'Content-Length':String(row.size),'Content-Disposition':(String(row.type).startsWith('image/')?'inline':'attachment')+'; filename="'+String(row.filename).replace(/["\\\r\n]/g,'_')+'"','Cache-Control':row.visibility==='private'?'private, no-store':'public, max-age=86400','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'none'; sandbox"}});
 }catch(e){return failure(e);}
}
