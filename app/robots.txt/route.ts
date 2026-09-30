import { SITE_ORIGIN } from "@/lib/seo-config";

export function GET() {
  return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /__kobags_static/\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
