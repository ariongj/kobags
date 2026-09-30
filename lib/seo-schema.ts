import { absolutePage, SITE_ORIGIN } from "./seo-config";
import type { SiteLanguage } from "./site-locale";

export function breadcrumbs(items: { path: string; name: string }[], lang: SiteLanguage) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: absolutePage(item.path, lang) })) };
}
export const organizationReference = { "@id": SITE_ORIGIN + "/#organization" };
