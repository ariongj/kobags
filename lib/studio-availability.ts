/**
 * The studio stays on the development machine while real bag scans are prepared.
 * This is compiled into both client and server bundles. Production builds cannot
 * enable it through a URL, cookie, request header or runtime hosting setting.
 */
export const studioEnabled = process.env.NODE_ENV === "development";

export function isStudioPath(href: string) {
  try {
    const url = new URL(href, "https://kobags.itdks.tech");
    if (!["kobags.itdks.tech", "kobags-group.com", "www.kobags-group.com", "kobags-bag-studio.ariongj.chatgpt.site"].includes(url.hostname)) return false;
    return /^\/(?:sq\/)?design(?:\/|$)/i.test(decodeURIComponent(url.pathname));
  } catch {
    return false;
  }
}
