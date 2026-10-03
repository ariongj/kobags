import { failure,response,db,CmsError } from '@/lib/cms/core';
import { submitInquiry,liveConfiguration } from '@/lib/cms/inquiries';
import { demoSession } from '@/lib/demo-session';
export async function GET(req:Request){try{
 const configuration=await liveConfiguration();const session=await demoSession(req);const id=new URL(req.url).searchParams.get('id');
 if(id){const item=await db().prepare('SELECT id,kind,status,created_at FROM cms_inquiries WHERE id=? AND owner=?').bind(id,session.owner).first();if(!item)throw new CmsError(404,'Request not found in this browser.');return response({request:item});}
 return response({enabled:configuration.enabled},200,session.cookie?{'Set-Cookie':session.cookie}:undefined);
}catch(e){return failure(e);}}
export async function POST(req:Request){try{return await submitInquiry(req);}catch(e){return failure(e);}}
