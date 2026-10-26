/** Public launch stays unchanged; studio testing belongs to this exact host. */
export const STUDIO_PREVIEW_HOST = "kobags.itdks.tech";
export const STUDIO_PREVIEW_ORIGIN = `https://${STUDIO_PREVIEW_HOST}`;
// Only used by the private, static handoff outline. Rendered UI uses request context.
export const studioEnabled = process.env.NODE_ENV === "development";

export function isStudioPreviewHost(hostname: string) {
  return hostname.toLowerCase() === STUDIO_PREVIEW_HOST;
}

export function studioEnabledForHost(hostname: string, environment = process.env.NODE_ENV) {
  return isStudioPreviewHost(hostname) || (environment === "development"
    && ["localhost", "127.0.0.1", "::1", "[::1]"].includes(hostname.toLowerCase()));
}

export function isStudioPath(href: string) {
  try {
    const url = new URL(href, "https://kobags.itdks.tech");
    if (!["kobags.itdks.tech", "kobags-group.com", "www.kobags-group.com", "kobags-bag-studio.ariongj.chatgpt.site"].includes(url.hostname)) return false;
    return /^\/(?:sq\/)?design(?:\/|$)/i.test(decodeURIComponent(url.pathname));
  } catch {
    return false;
  }
}
