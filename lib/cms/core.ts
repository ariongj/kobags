import { env } from "cloudflare:workers";
import { permissions, type Staff } from "./types";
import { sessionToken } from "./password";
import { readRequestText, RequestBodyLimitError } from "../request-body";
export class CmsError extends Error { constructor(public status: number, message: string) { super(message); } }
export function db() { if (!env.DB) throw new CmsError(503, "Storage is temporarily unavailable."); return env.DB; }
export function bucket() { if (!env.BUCKET) throw new CmsError(503, "File storage is not configured."); return env.BUCKET; }
export const now = () => new Date().toISOString();
export const id = (prefix = "") => prefix + crypto.randomUUID();
export async function hash(value: string | ArrayBuffer) { return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", typeof value === "string" ? new TextEncoder().encode(value) : value))).map(x => x.toString(16).padStart(2,"0")).join(""); }
export function token() { return Array.from(crypto.getRandomValues(new Uint8Array(32))).map(x => x.toString(16).padStart(2,"0")).join(""); }
export function response(data: unknown, status = 200, extra?: HeadersInit) { return Response.json(data, { status, headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow", "X-Content-Type-Options": "nosniff", ...extra } }); }
export function failure(error: unknown) { if(error instanceof Error&&error.name==='ZodError')return response({error:"Some fields are invalid. Check the entered values."},422); if (error instanceof CmsError || error instanceof RequestBodyLimitError) return response({error:error.message},error.status); console.error("CMS operation failed", error instanceof Error ? error.name : "unknown"); return response({error:"The operation could not be completed. Your changes have not been discarded; please retry."},503); }
export function originGuard(req: Request) { if (req.headers.get("origin") !== new URL(req.url).origin) throw new CmsError(403,"This request must originate from this website."); }
export async function body(req: Request, limit = 400000) {
  originGuard(req);
  if (req.headers.get("content-type")?.split(";")[0] !== "application/json") throw new CmsError(415,"Expected JSON.");
  const input = await readRequestText(req, limit);
  try {
    const parsed = JSON.parse(input);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Expected an object');
    return parsed;
  } catch { throw new CmsError(400,"Invalid request."); }
}
export async function staff(req: Request, permission?: string): Promise<Staff> {
  const secret = sessionToken(req); if (!secret) throw new CmsError(401,"Sign in with your email and password.");
  const row = await db().prepare("SELECT s.id,s.user_id,s.email,s.name,s.role,s.active,c.password_hash,x.credential_tag FROM cms_sessions x JOIN cms_staff s ON s.id=x.staff_id JOIN cms_credentials c ON c.staff_id=s.id WHERE x.token_hash=? AND x.expires_at>? AND s.active=1").bind(await hash(secret),now()).first<Staff & {password_hash:string;credential_tag:string}>();
  if (!row || await hash(row.password_hash)!==row.credential_tag) throw new CmsError(401,"Your session has ended. Sign in again.");
  const member:Staff = {id:row.id,user_id:row.user_id,email:row.email,name:row.name,role:row.role,active:row.active};
  if (permission && !permissions[member.role]?.includes(permission)) throw new CmsError(403,"Your role does not allow this action.");
  return member;
}
export function audit(entity: string, actor: string, action: string, detail = "") { return db().prepare("INSERT INTO cms_events(id,entity_id,actor,action,detail,created_at) VALUES(?,?,?,?,?,?)").bind(id(),entity,actor,action,detail,now()); }
export async function rateLimit(req: Request, scope: string, maximum = 20) {
  const identity = req.headers.get("cf-connecting-ip") || "anonymous";
  const slot = Math.floor(Date.now()/3600000); const key = await hash(scope+":"+identity+":"+slot);
  const result = await db().prepare("INSERT INTO cms_rate_limits(id,count,expires_at) VALUES(?,1,?) ON CONFLICT(id) DO UPDATE SET count=count+1 WHERE count<? RETURNING count").bind(key,(slot+1)*3600000,maximum).first();
  if (!result) throw new CmsError(429,"Too many requests. Please try again later.");
}
export function parseData<T>(row: Record<string, unknown>, key = "data"): T { return {...row,[key]:JSON.parse(String(row[key]))} as T; }
