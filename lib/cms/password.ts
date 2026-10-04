// CMS accounts use their own passwords; platform identity headers grant no CMS access.
const encoder = new TextEncoder();
const hex = (bytes: Uint8Array) => Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
const unhex = (value: string) => Uint8Array.from(value.match(/../g) || [], b => parseInt(b, 16));
export async function passwordHash(password: string, salt = hex(crypto.getRandomValues(new Uint8Array(32)))) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:unhex(salt),iterations:100000}, key, 256);
  return `pbkdf2-sha256$100000$${salt}$${hex(new Uint8Array(bits))}`;
}
export async function verifyPassword(password: string, stored: string) {
  if (!/^pbkdf2-sha256\$100000\$[a-f0-9]{64}\$[a-f0-9]{64}$/.test(stored)) return false;
  const candidate = await passwordHash(password, stored.split('$')[2]);
  let difference = 0;
  for (let i = 0; i < candidate.length; i++) difference |= candidate.charCodeAt(i) ^ stored.charCodeAt(i);
  return difference === 0;
}
export const sessionCookie = 'kobags-cms-session';
export function sessionToken(req: Request) {
  const value = req.headers.get('cookie')?.split(';').map(v => v.trim()).find(v => v.startsWith(sessionCookie+'='))?.slice(sessionCookie.length+1);
  return value && /^[a-f0-9]{64}$/.test(value) ? value : null;
}
export function cookie(req: Request, value: string, maxAge = 28800) {
  return `${sessionCookie}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${new URL(req.url).protocol === 'https:' ? '; Secure' : ''}`;
}
