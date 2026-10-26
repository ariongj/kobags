import framework from "vinext/server/fetch-handler";
import { studioEnabledForHost, isStudioPreviewHost } from "../lib/studio-availability";
import { staticVideoResponse } from "../lib/static-video-response";
declare const __KOBAGS_VIDEO_SIZES__: Record<string, number>;

const assetTypes: Record<string, string> = {
  webp: "image/webp", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg",
  svg: "image/svg+xml", mp4: "video/mp4", zip: "application/zip",
  txt: "text/plain; charset=utf-8", md: "text/plain; charset=utf-8",
  json: "application/json", js: "text/javascript; charset=utf-8",
  css: "text/css; charset=utf-8", woff2: "font/woff2",
};

export default {
  async fetch(request: Request, env: Cloudflare.Env, context: ExecutionContext) {
    const requestUrl = new URL(request.url);
    const path = requestUrl.pathname;
    const studioPreview = isStudioPreviewHost(requestUrl.hostname);
    // Enable the canonical redirect only after the operator verifies business
    // DNS/TLS and switches the runtime origin. Local previews stay local.
    if (env.PUBLIC_SITE_ORIGIN?.replace(/\/$/, "") === "https://kobags-group.com"
      && ["www.kobags-group.com", "kobags-bag-studio.ariongj.chatgpt.site"].includes(requestUrl.hostname)
      && ["GET", "HEAD"].includes(request.method) && !path.startsWith("/api/")) {
      const destination = new URL("https://kobags-group.com");
      destination.pathname = path;
      destination.search = requestUrl.search;
      return new Response(null, { status: 308, headers: {
        Location: destination.href,
        "Cache-Control": /^\/(?:sq\/)?(?:cms|request)(?:\/|$)/.test(path) ? "private, no-store" : "public, max-age=300",
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff", "X-Frame-Options": "SAMEORIGIN",
        "Content-Security-Policy": "base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
        ...(requestUrl.protocol === "https:" ? { "Strict-Transport-Security": "max-age=15552000" } : {}),
      } });
    }
    const asset = /^\/(assets|documents|_next\/static)\//.test(path);
    // Hashed framework files are not page routes. Resolve them directly while
    // retaining the original Range / If-None-Match headers and HEAD method.
    let response: Response;
    if (asset && env.ASSETS && ["GET", "HEAD"].includes(request.method)) {
      const storedUrl = new URL(request.url);
      storedUrl.pathname = "/__kobags_static" + path;
      response = await env.ASSETS.fetch(new Request(storedUrl, request));
      // Development servers serve the original public tree; compiled builds
      // move it out of the dispatcher's direct path so our headers can apply.
      if (response.status === 404) {
        await response.body?.cancel();
        response = await env.ASSETS.fetch(request);
      }
    } else {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-kobags-studio-enabled", studioEnabledForHost(requestUrl.hostname) ? "1" : "0");
      requestHeaders.set("x-kobags-studio-preview", studioPreview ? "1" : "0");
      response = await framework.fetch(new Request(request, { headers: requestHeaders }), env, context);
    }
    if (asset && path.toLowerCase().endsWith(".mp4")) {
      response = await staticVideoResponse(request, response, __KOBAGS_VIDEO_SIZES__[path]);
    }
    // Sites serves assets through the Worker; its dispatcher does not apply
    // Cloudflare's _headers file. Keep these rules on the final response.
    const headers = new Headers(response.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("X-Frame-Options", "SAMEORIGIN");
    if (!headers.has("Content-Security-Policy")) headers.set("Content-Security-Policy", "base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'");
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
    if (new URL(request.url).protocol === "https:") headers.set("Strict-Transport-Security", "max-age=15552000");
    // Approval URLs and account pages can contain access tokens. Never leak
    // those through navigation or download referrers, including API errors.
    if (/^\/(?:sq\/)?(?:cms|request)(?:\/|$)/.test(path) || /^\/api\/(?:cms|portal|media)(?:\/|$)/.test(path)) {
      headers.set("Referrer-Policy", "no-referrer");
      // The media route explicitly distinguishes published assets from private
      // artwork. Preserve its public caching only for successful public files.
      const publicMedia = path.startsWith("/api/media/") && [200, 206, 304].includes(response.status)
        && /^public(?:,|$)/i.test(headers.get("Cache-Control") ?? "") && !headers.has("set-cookie");
      if (!publicMedia) headers.set("Cache-Control", "private, no-store");
    }
    if (!asset && studioPreview) {
      headers.set("X-Robots-Tag", "noindex, nofollow");
      headers.set("Cache-Control", "private, no-store");
    }
    if (!asset) return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    if (path.startsWith("/documents/")) headers.set("X-Robots-Tag", "noindex, nofollow");
    if ([200, 206, 304].includes(response.status) && ["GET", "HEAD"].includes(request.method) && !headers.has("set-cookie")) {
      headers.set("Cache-Control", path.startsWith("/_next/static/")
        ? "public, max-age=31536000, immutable"
        : path.startsWith("/assets/") ? "public, max-age=86400" : "public, max-age=0, must-revalidate");
      const type = assetTypes[path.split(".").pop()?.toLowerCase() ?? ""];
      if (type && response.status !== 304) headers.set("Content-Type", type);
    } else {
      headers.set("Cache-Control", "private, no-store");
    }
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
