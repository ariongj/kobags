import type { Metadata } from "next";
import { headers } from "next/headers";
import { absolutePage, DEFAULT_SOCIAL_IMAGE, indexablePath, seoPages, SITE_NAME, SITE_ORIGIN } from "./seo-config";
import type { SiteLanguage } from "./site-locale";

export async function requestLanguage(): Promise<SiteLanguage> {
  return (await headers()).get("x-kobags-language") === "sq" ? "sq" : "en";
}

export async function pageMetadata(path: string, override?: { title: string; description: string; image?: string; article?: boolean }): Promise<Metadata> {
  const lang = await requestLanguage();
  const record = seoPages[path];
  const title = override?.title ?? record?.title[lang === "sq" ? 1 : 0] ?? (lang === "sq" ? "Faqja nuk u gjet" : "Page not found");
  const description = override?.description ?? record?.description[lang === "sq" ? 1 : 0] ?? "";
  const index = indexablePath(path);
  const canonical = absolutePage(path, lang);
  const image = SITE_ORIGIN + (override?.image ?? DEFAULT_SOCIAL_IMAGE);
  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: {
      canonical,
      ...(index ? { languages: { en: absolutePage(path), sq: absolutePage(path, "sq"), "x-default": absolutePage(path) } } : {}),
    },
    robots: { index, follow: index, ...(index ? { googleBot: { index: true, follow: true, "max-image-preview": "large" } } : {}) },
    openGraph: {
      title, description, url: canonical, siteName: SITE_NAME,
      type: override?.article ? "article" : "website",
      locale: lang === "sq" ? "sq_AL" : "en_GB", alternateLocale: lang === "sq" ? "en_GB" : "sq_AL",
      images: [{ url: image, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
