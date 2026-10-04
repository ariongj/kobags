import { env } from 'cloudflare:workers';
import { db,hash,token,now,audit,CmsError,rateLimit,staff } from './core';
import { cookie,sessionToken,passwordHash,verifyPassword } from './password';
import { seedCms } from './records';

function credentials(input: Record<string,unknown>, creating = false) {
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
  const password = typeof input.password === 'string' ? input.password : '';
  if (!email || email.length>150 || !password || password.length>128 || (creating && password.length<14))
    throw new CmsError(422,creating?'Enter your email and a password of 14–128 characters.':'Enter your email and password.');
  return {email,password};
}
async function issueSession(req: Request, staffId: string, encoded: string) {
  const secret=token(), time=now();
  await db().batch([
    db().prepare('DELETE FROM cms_sessions WHERE expires_at<=?').bind(time),
    db().prepare('INSERT INTO cms_sessions(token_hash,staff_id,credential_tag,expires_at,created_at) VALUES(?,?,?,?,?)')
      .bind(await hash(secret),staffId,await hash(encoded),new Date(Date.now()+8*3600000).toISOString(),time),
    audit(staffId,staffId,'signed-in'),
  ]);
  return cookie(req,secret);
}
export async function login(req: Request, input: Record<string,unknown>) {
  await rateLimit(req,'cms-password-login',15);
  const {email,password}=credentials(input);
  // First password setup preserves an existing owner's records and role.
  // Once stored, the database credential is authoritative, including after password changes.
  if (email===env.CMS_BOOTSTRAP_EMAIL?.trim().toLowerCase() && env.CMS_BOOTSTRAP_PASSWORD_HASH) {
    const existing=await db().prepare("SELECT staff_id FROM cms_credentials WHERE staff_id='owner'").first();
    if (!existing && await verifyPassword(password,env.CMS_BOOTSTRAP_PASSWORD_HASH)) {
      await db().batch([
        db().prepare("INSERT OR IGNORE INTO cms_staff(id,email,name,role,active,created_at) VALUES('owner',?,?,'administrator',1,?)").bind(email,email,now()),
        db().prepare("INSERT OR IGNORE INTO cms_credentials(staff_id,password_hash,updated_at) SELECT id,?,? FROM cms_staff WHERE id='owner' AND lower(email)=? AND active=1")
          .bind(env.CMS_BOOTSTRAP_PASSWORD_HASH,now(),email),
      ]);
      const settings=await db().prepare("SELECT id FROM cms_records WHERE kind='settings' LIMIT 1").first();
      if(!settings) await seedCms('owner');
    }
  }
  const row=await db().prepare('SELECT s.id,s.active,c.password_hash FROM cms_staff s JOIN cms_credentials c ON c.staff_id=s.id WHERE lower(s.email)=? AND s.active=1 ORDER BY s.created_at LIMIT 1')
    .bind(email).first<{id:string;active:number;password_hash:string}>();
  // Do equivalent password work for unknown accounts without revealing membership.
  const encoded=row?.password_hash || env.CMS_BOOTSTRAP_PASSWORD_HASH || 'pbkdf2-sha256$100000$'+'0'.repeat(64)+'$'+'0'.repeat(64);
  const valid=await verifyPassword(password,encoded);
  if(!row || !valid)throw new CmsError(401,'Email or password is incorrect.');
  return issueSession(req,row.id,row.password_hash);
}
export async function logout(req: Request) {
  const secret=sessionToken(req);
  if(secret)await db().prepare('DELETE FROM cms_sessions WHERE token_hash=?').bind(await hash(secret)).run();
  return cookie(req,'',0);
}
export async function acceptInvitation(req: Request, input: Record<string,unknown>) {
  await rateLimit(req,'cms-password-invitation',10);
  const {email,password}=credentials(input,true);
  if(typeof input.invite!=='string'||!/^[a-f0-9]{64}$/.test(input.invite))throw new CmsError(403,'This invitation is invalid or expired.');
  const inviteHash=await hash(input.invite),encoded=await passwordHash(password),time=now();
  const member=await db().prepare('SELECT id FROM cms_staff WHERE invite_hash=? AND lower(email)=? AND expires_at>? AND active=1')
    .bind(inviteHash,email,time).first<{id:string}>();
  if(!member)throw new CmsError(403,'This invitation is invalid, expired or belongs to another email address.');
  const results=await db().batch([
    db().prepare('INSERT INTO cms_credentials(staff_id,password_hash,updated_at) SELECT id,?,? FROM cms_staff WHERE id=? AND invite_hash=? AND expires_at>? AND active=1 ON CONFLICT(staff_id) DO UPDATE SET password_hash=excluded.password_hash,updated_at=excluded.updated_at')
      .bind(encoded,time,member.id,inviteHash,time),
    db().prepare("UPDATE cms_staff SET user_id='password:'||id,invite_hash=NULL,expires_at=NULL WHERE id=? AND invite_hash=? AND expires_at>? AND active=1")
      .bind(member.id,inviteHash,time),
  ]);
  if(!results[0].meta.changes)throw new CmsError(403,'This invitation has already been used.');
  await audit(member.id,member.id,'password-activated').run();
  return issueSession(req,member.id,encoded);
}
export async function changePassword(req: Request,input: Record<string,unknown>) {
  const member=await staff(req);
  await rateLimit(req,'cms-password-change',10);
  const {password}=credentials({email:member.email,password:input.password},true);
  if(typeof input.currentPassword!=='string'||input.currentPassword.length>128)throw new CmsError(422,'Enter your current password.');
  const current=await db().prepare('SELECT password_hash FROM cms_credentials WHERE staff_id=?').bind(member.id).first<{password_hash:string}>();
  if(!current || !await verifyPassword(input.currentPassword,current.password_hash))throw new CmsError(401,'Your current password is incorrect.');
  const encoded=await passwordHash(password);
  const changed=await db().prepare('UPDATE cms_credentials SET password_hash=?,updated_at=? WHERE staff_id=? AND password_hash=?')
    .bind(encoded,now(),member.id,current.password_hash).run();
  if(!changed.meta.changes)throw new CmsError(409,'Your password changed in another session. Sign in again.');
  await db().batch([db().prepare('DELETE FROM cms_sessions WHERE staff_id=?').bind(member.id),audit(member.id,member.id,'password-changed')]);
  return cookie(req,'',0);
}
