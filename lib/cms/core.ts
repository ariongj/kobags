import { env } from "cloudflare:workers";
import { permissions, type Staff } from "./types";
export class CmsError extends Error { constructor(public status: number, message: string) { super(message); } }
export function db() { if (!env.DB) throw new CmsError(503, "Storage is temporarily unavailable."); return env.DB; }
export function bucket() { if (!env.BUCKET) throw new CmsError(503, "File storage is not configured."); return env.BUCKET; }
export const now = () => new Date().toISOString();
export const id = (prefix = "") => prefix + crypto.randomUUID();
export async function hash(value: string | ArrayBuffer) { return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", typeof value === "string" ? new TextEncoder().encode(value) : value))).map(x => x.toString(16).padStart(2,"0")).join(""); }
export function token() { return Array.from(crypto.getRandomValues(new Uint8Array(32))).map(x => x.toString(16).padStart(2,"0")).join(""); }
export function response(data: unknown, status = 200, extra?: HeadersInit) { return Response.json(data, { status, headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow", "X-Content-Type-Options": "nosniff", ...extra } }); }
export function failure(error: unknown) { if(error instanceof Error&&error.name==='ZodError')return response({error:"Some fields are invalid. Check the entered values."},422); if (error instanceof CmsError) return response({error:error.message},error.status); console.error("CMS operation failed", error instanceof Error ? error.name : "unknown"); return response({error:"The operation could not be completed. Your changes have not been discarded; please retry."},503); }
export function originGuard(req: Request) { if (req.headers.get("origin") !== new URL(req.url).origin) throw new CmsError(403,"This request must originate from this website."); }
export async function body(req: Request, limit = 400000) { originGuard(req); if (req.headers.get("content-type")?.split(";")[0] !== "application/json") throw new CmsError(415,"Expected JSON."); const input = await req.text(); if (input.length > limit) throw new CmsError(413,"Request is too large."); try { return JSON.parse(input); } catch { throw new CmsError(400,"Invalid request."); } }
export async function staff(req: Request, permission?: string): Promise<Staff> {
  const user = req.headers.get("oai-authenticated-user-id"); if (!user) throw new CmsError(401,"Sign in to access the CMS.");
  const member = await db().prepare("SELECT id,user_id,email,name,role,active FROM cms_staff WHERE user_id=? AND active=1").bind(user).first<Staff>();
  if (!member) throw new CmsError(403,"Your account does not have CMS access.");
  if (permission && !permissions[member.role]?.includes(permission)) throw new CmsError(403,"Your role does not allow this action.");
  return member;
}
export function audit(entity: string, actor: string, action: string, detail = "") { return db().prepare("INSERT INTO cms_events(id,entity_id,actor,action,detail,created_at) VALUES(?,?,?,?,?,?)").bind(id(),entity,actor,action,detail,now()); }
export async function rateLimit(req: Request, scope: string, maximum = 20) {
  const identity = req.headers.get("cf-connecting-ip") || req.headers.get("oai-authenticated-user-id") || "anonymous";
  const slot = Math.floor(Date.now()/3600000); const key = await hash(scope+":"+identity+":"+slot);
  const result = await db().prepare("INSERT INTO cms_rate_limits(id,count,expires_at) VALUES(?,1,?) ON CONFLICT(id) DO UPDATE SET count=count+1 WHERE count<? RETURNING count").bind(key,(slot+1)*3600000,maximum).first();
  if (!result) throw new CmsError(429,"Too many requests. Please try again later.");
}
export function parseData<T>(row: Record<string, unknown>, key = "data"): T { return {...row,[key]:JSON.parse(String(row[key]))} as T; }
