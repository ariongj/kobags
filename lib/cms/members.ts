import { env } from "cloudflare:workers";
import { z } from "zod";
import { db,id,now,hash,token,audit,CmsError } from "./core";
import { roles, type Staff } from "./types";
import { seedCms } from "./records";
export async function claim(req: Request, invite?: string) {
 const user=req.headers.get('oai-authenticated-user-id'),email=req.headers.get('oai-authenticated-user-email')?.trim().toLowerCase();
 if(!user||!email)throw new CmsError(401,"Sign in before accepting access.");
 if(invite) {
  const result=await db().prepare("UPDATE cms_staff SET user_id=?,invite_hash=NULL,expires_at=NULL WHERE invite_hash=? AND email=? AND expires_at>? AND user_id IS NULL AND active=1").bind(user,await hash(invite),email,now()).run();
  if(!result.meta.changes)throw new CmsError(403,"This invitation is invalid, expired or belongs to another email address.");
  await audit(user,user,"staff-joined").run();return;
 }
 if(!env.CMS_BOOTSTRAP_EMAIL || email!==env.CMS_BOOTSTRAP_EMAIL.trim().toLowerCase())throw new CmsError(403,"This account is not the configured first administrator.");
 await db().batch([db().prepare("INSERT OR IGNORE INTO cms_staff(id,user_id,email,name,role,active,created_at) VALUES('owner',?,?,?,'administrator',1,?)").bind(user,email,email,now()),db().prepare("INSERT INTO cms_events(id,entity_id,actor,action,detail,created_at) SELECT ?,'owner','owner','administrator-initialized','',? WHERE changes()=1").bind(id(),now())]);
 const owner=await db().prepare("SELECT user_id FROM cms_staff WHERE id='owner' AND active=1").first<{user_id:string}>();if(owner?.user_id!==user)throw new CmsError(403,"Administrator setup has already been completed.");await seedCms('owner');
}
export async function inviteStaff(input:Record<string,unknown>,member:Staff) {
 const p=z.object({email:z.string().email().max(150),name:z.string().min(1).max(100),role:z.enum(roles)}).safeParse(input);if(!p.success)throw new CmsError(422,"Complete the staff name, email and role.");
 const email=p.data.email.toLowerCase();const duplicate=await db().prepare("SELECT id FROM cms_staff WHERE email=? AND active=1").bind(email).first();if(duplicate)throw new CmsError(409,"This email already has an active membership or invitation.");
 const secret=token(),staffId=id('staff-');await db().batch([db().prepare("INSERT INTO cms_staff(id,email,name,role,active,invite_hash,expires_at,created_at) VALUES(?,?,?,?,1,?,?,?)").bind(staffId,email,p.data.name,p.data.role,await hash(secret),new Date(Date.now()+7*86400000).toISOString(),now()),audit(staffId,member.id,'staff-invited',p.data.role)]);return {invitation:'/cms?invite='+secret};
}
export async function changeStaff(input:Record<string,unknown>,member:Staff) {
 if(input.id==='owner')throw new CmsError(422,"The first administrator cannot be disabled here.");
 if(input.id===member.id)throw new CmsError(422,"Ask another administrator to change your access.");
 if(!roles.includes(input.role as typeof roles[number]))throw new CmsError(422,"Choose a valid role.");
 await db().batch([db().prepare("UPDATE cms_staff SET role=?,active=? WHERE id=?").bind(String(input.role),input.active?1:0,String(input.id)),audit(String(input.id),member.id,'staff-updated',String(input.role))]);return {};
}
