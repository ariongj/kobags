import { db,bucket,staff,failure,CmsError,audit,hash,now } from '@/lib/cms/core';
import { permissions } from '@/lib/cms/types';
import { parseByteRange,matchesIfRange,matchesIfNoneMatch } from '@/lib/http-byte-range';
type MediaContext = {params:Promise<{id:string}>};
async function serveMedia(req:Request,{params}:MediaContext){
 try{
  const {id}=await params;const row=await db().prepare('SELECT * FROM cms_media WHERE id=?').bind(id).first();if(!row)throw new CmsError(404,'File not found.');
  if(row.visibility==='private'){
   const portal=new URL(req.url).searchParams.get('portal');
   if(portal){const grant=await db().prepare("SELECT i.id FROM cms_inquiries i JOIN cms_artwork a ON a.inquiry_id=i.id WHERE i.portal_hash=? AND i.portal_expires>? AND a.media_id=?").bind(await hash(portal),now(),id).first();if(!grant)throw new CmsError(403,'File access is not available.');}
   else {const member=await staff(req);if(!permissions[member.role].some(p=>['artwork','approve','production'].includes(p)))throw new CmsError(403,'Your role cannot access private artwork.');if(member.role==='production'&&!await db().prepare('SELECT o.id FROM cms_orders o JOIN cms_artwork a ON a.id=o.artwork_id WHERE a.media_id=?').bind(id).first())throw new CmsError(403,'Production access is limited to released artwork.');await audit(String(row.inquiry_id),member.id,'private-file-opened',id).run();}
  }
  if(String(row.object_key).startsWith('asset:')){const path=String(row.object_key).slice(6);return Response.redirect(new URL(path,req.url),302);}
  // Authorize before exposing object metadata, validators or range errors.
  const key=String(row.object_key),storage=bucket(),metadata=await storage.head(key);
  if(!metadata)throw new CmsError(404,'File is unavailable.');
  const headers=new Headers({'Content-Type':String(row.type),'Content-Disposition':(/^(?:image|video)\//.test(String(row.type))?'inline':'attachment')+'; filename="'+String(row.filename).replace(/["\\\r\n]/g,'_')+'"','Cache-Control':row.visibility==='private'?'private, no-store':'public, max-age=86400','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'none'; sandbox",'Accept-Ranges':'bytes','ETag':metadata.httpEtag,'Last-Modified':metadata.uploaded.toUTCString()});
  if(matchesIfNoneMatch(req.headers.get('if-none-match'),metadata.httpEtag))return new Response(null,{status:304,headers});
  headers.set('Content-Length',String(metadata.size));
  // Range applies to GET. HEAD reports full representation metadata and reads no body.
  if(req.method==='HEAD')return new Response(null,{headers});
  const range=matchesIfRange(req.headers.get('if-range'),metadata.httpEtag,metadata.uploaded)?parseByteRange(req.headers.get('range'),metadata.size):null;
  if(range==='unsatisfiable'){
   headers.set('Content-Range','bytes */'+metadata.size);headers.set('Content-Length','0');headers.set('Cache-Control','private, no-store');
   return new Response(null,{status:416,headers});
  }
  const object=await storage.get(key,range?{range}:undefined);if(!object)throw new CmsError(404,'File is unavailable.');
  if(range){headers.set('Content-Length',String(range.length));headers.set('Content-Range',`bytes ${range.offset}-${range.offset+range.length-1}/${metadata.size}`);}
  return new Response(object.body,{status:range?206:200,headers});
 }catch(e){const response=failure(e);return req.method==='HEAD'?new Response(null,{status:response.status,headers:response.headers}):response;}
}
export const GET=serveMedia;
export const HEAD=serveMedia;
