import { SITE_ORIGIN } from "@/lib/seo-config";
import { isStudioPreviewHost } from "@/lib/studio-availability";

export function GET(request: Request) {
  if (isStudioPreviewHost(new URL(request.url).hostname)) return new Response("User-agent: *\nDisallow: /\n", { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } });
  return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /__kobags_static/\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
