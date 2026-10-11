import { db,hash,now,response,failure,CmsError,body,rateLimit } from '@/lib/cms/core';
import { decide } from '@/lib/cms/workflow';
async function resolve(token:string){if(!/^[a-f0-9]{64}$/.test(token))throw new CmsError(404,'This link is not available.');const row=await db().prepare('SELECT id,data FROM cms_inquiries WHERE portal_hash=? AND portal_expires>?').bind(await hash(token),now()).first<{id:string;data:string}>();if(!row)throw new CmsError(404,'This link has expired or been replaced. Please request a new link.');return row;}
export async function GET(req:Request,{params}:{params:Promise<{token:string}>}){try{
 const row=await resolve((await params).token);const [quotes,artwork,orders]=await Promise.all([db().prepare("SELECT id,version,data,hash,status FROM cms_quotes WHERE inquiry_id=? AND status!='draft' ORDER BY version DESC").bind(row.id).all(),db().prepare('SELECT id,version,media_id,hash,note,status FROM cms_artwork WHERE inquiry_id=? ORDER BY version DESC').bind(row.id).all(),db().prepare('SELECT id,status,created_at FROM cms_orders WHERE inquiry_id=?').bind(row.id).all()]);
 const data=JSON.parse(row.data);return response({reference:row.id,company:data.company,kind:data.kind,product:data.collectionName||data.productName,quantity:data.quantity,quotes:quotes.results.map(q=>({...q,data:JSON.parse(String(q.data))})),artwork:artwork.results,orders:orders.results},200,{'Referrer-Policy':'no-referrer'});
}catch(e){return failure(e);}}
export async function POST(req:Request,{params}:{params:Promise<{token:string}>}){try{
 const row=await resolve((await params).token),input=await body(req);await rateLimit(req,'portal',30);if(input.confirm!==true)throw new CmsError(422,'Confirm that you reviewed this exact revision.');
 const name=String(input.name||'').trim();if(name.length<2||name.length>100)throw new CmsError(422,'Enter the approving person’s name.');return response(await decide(input,'Customer: '+name,row.id));
}catch(e){return failure(e);}}
