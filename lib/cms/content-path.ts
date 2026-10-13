/** CMS-managed pages must remain within unreserved public website routes. */
export function validContentPath(value: string): boolean {
  if (!value) return true;
  if (!/^\/(?!\/)[a-z0-9/-]*$/.test(value) || value.includes('//')) return false;
  return !/^\/(api|cms|request|demo|design|quote|sq|signin-with-chatgpt|signout-with-chatgpt|callback|assets|documents|handoff)(\/|$)/.test(value);
}
