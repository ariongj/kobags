import { absolutePage, publicPaths } from "@/lib/seo-config";

export function GET() {
  const entries = publicPaths().flatMap(path => (["en", "sq"] as const).map(lang => `<url><loc>${absolutePage(path, lang)}</loc><xhtml:link rel="alternate" hreflang="en" href="${absolutePage(path)}"/><xhtml:link rel="alternate" hreflang="sq" href="${absolutePage(path, "sq")}"/><xhtml:link rel="alternate" hreflang="x-default" href="${absolutePage(path)}"/></url>`));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
