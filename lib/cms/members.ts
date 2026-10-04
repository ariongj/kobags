import { z } from "zod";
import { db,id,now,hash,token,audit,CmsError } from "./core";
import { roles, type Staff } from "./types";
export async function inviteStaff(input:Record<string,unknown>,member:Staff) {
 const p=z.object({email:z.string().email().max(150),name:z.string().min(1).max(100),role:z.enum(roles)}).safeParse(input);if(!p.success)throw new CmsError(422,"Complete the staff name, email and role.");
 const email=p.data.email.toLowerCase();const duplicate=await db().prepare("SELECT id FROM cms_staff WHERE email=? AND active=1").bind(email).first();if(duplicate)throw new CmsError(409,"This email already has an active membership or invitation.");
 const secret=token(),staffId=id('staff-');await db().batch([db().prepare("INSERT INTO cms_staff(id,email,name,role,active,invite_hash,expires_at,created_at) VALUES(?,?,?,?,1,?,?,?)").bind(staffId,email,p.data.name,p.data.role,await hash(secret),new Date(Date.now()+7*86400000).toISOString(),now()),audit(staffId,member.id,'staff-invited',p.data.role)]);return {invitation:'/cms?invite='+secret};
}
export async function changeStaff(input:Record<string,unknown>,member:Staff) {
 if(input.id==='owner')throw new CmsError(422,"The first administrator cannot be disabled here.");
 if(input.id===member.id)throw new CmsError(422,"Ask another administrator to change your access.");
 if(!roles.includes(input.role as typeof roles[number]))throw new CmsError(422,"Choose a valid role.");
 await db().batch([db().prepare("UPDATE cms_staff SET role=?,active=? WHERE id=?").bind(String(input.role),input.active?1:0,String(input.id)),db().prepare('DELETE FROM cms_sessions WHERE staff_id=?').bind(String(input.id)),audit(String(input.id),member.id,'staff-updated',String(input.role))]);return {};
}
export async function resetStaffPassword(input:Record<string,unknown>,member:Staff) {
 if(input.id==='owner'||input.id===member.id)throw new CmsError(422,'Use My account to change your own password.');
 const target=await db().prepare('SELECT id FROM cms_staff WHERE id=? AND active=1').bind(String(input.id)).first<{id:string}>();
 if(!target)throw new CmsError(404,'Active staff account not found.');
 const secret=token();
 await db().batch([
  db().prepare('UPDATE cms_staff SET invite_hash=?,expires_at=? WHERE id=?').bind(await hash(secret),new Date(Date.now()+7*86400000).toISOString(),target.id),
  db().prepare('DELETE FROM cms_credentials WHERE staff_id=?').bind(target.id),
  db().prepare('DELETE FROM cms_sessions WHERE staff_id=?').bind(target.id),
  audit(target.id,member.id,'password-reset-invited'),
 ]);
 return {invitation:'/cms?invite='+secret};
}
