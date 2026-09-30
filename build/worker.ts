import framework from "vinext/server/fetch-handler";

const assetTypes: Record<string, string> = {
  webp: "image/webp", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg",
  svg: "image/svg+xml", mp4: "video/mp4", zip: "application/zip",
  txt: "text/plain; charset=utf-8", md: "text/plain; charset=utf-8",
  json: "application/json", js: "text/javascript; charset=utf-8",
  css: "text/css; charset=utf-8", woff2: "font/woff2",
};

export default {
  async fetch(request: Request, env: Cloudflare.Env, context: ExecutionContext) {
    const path = new URL(request.url).pathname;
    const asset = /^\/(assets|documents|_next\/static)\//.test(path);
    // Hashed framework files are not page routes. Resolve them directly while
    // retaining the original Range / If-None-Match headers and HEAD method.
    const response: Response = asset && env.ASSETS && ["GET", "HEAD"].includes(request.method)
      ? await env.ASSETS.fetch(request)
      : await framework.fetch(request, env, context);
    if (!asset) return response;

    // Sites serves assets through the Worker; its dispatcher does not apply
    // Cloudflare's _headers file. Keep these rules on the final response.
    const headers = new Headers(response.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("X-Frame-Options", "SAMEORIGIN");
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
