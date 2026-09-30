import JournalArticle, { type JournalPhoto } from "@/components/journal-article";
import { notFound } from "next/navigation";
import { articles } from "@/lib/journal";
import { localizeArticle } from "@/lib/journal-sq";
import { pageMetadata, requestLanguage } from "@/lib/seo";
import { absolutePage, articleSearchTitles, SITE_ORIGIN } from "@/lib/seo-config";
import { breadcrumbs, organizationReference } from "@/lib/seo-schema";
import StructuredData from "@/components/structured-data";
const articlePhotos: Record<string, JournalPhoto> = {
  kobagsjourney: {
    src: "/assets/client-2026-09/journal-article-kobagsjourney.webp",
    alt: "Non-woven bag production line inside the Kobags factory",
    width: 1600,
    height: 1066,
    factory: true,
  },
  whyswitchtokobags: {
    src: "/assets/client-2026-09/journal-article-whyswitchtokobags.webp",
    alt: "White branded bag with green handles from the Kobags collection",
    width: 1280,
    height: 1600,
  },
  kobagsmission: {
    src: "/assets/client-2026-09/journal-article-kobagsmission.webp",
    alt: "Black handle bag with printed brand artwork",
    width: 1280,
    height: 1600,
  },
  sciencebehindkobags: {
    src: "/assets/client-2026-09/journal-article-sciencebehindkobags.webp",
    alt: "Printed material moving through factory rollers",
    width: 1200,
    height: 1600,
  },
  benefitsofkobags: {
    src: "/assets/client-2026-09/journal-article-benefitsofkobags.webp",
    alt: "Green branded bag showing its handle shape and print",
    width: 1280,
    height: 1600,
  },
  helpingbusinesseskobags: {
    src: "/assets/client-2026-09/journal-article-helpingbusinesseskobags.webp",
    alt: "Finished black branded bag in a customer setting",
    width: 1200,
    height: 1600,
  },
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const lang = await requestLanguage();
  const article = localizeArticle(a, lang);
  return pageMetadata("/blog/" + slug, { title: articleSearchTitles[slug][lang === "sq" ? 1 : 0], description: article.intro, image: articlePhotos[slug].src, article: true });
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const photo = articlePhotos[a.slug];
  const lang = await requestLanguage();
  const article = localizeArticle(a, lang);
  const url = absolutePage("/blog/" + slug, lang);
  return <>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: article.title, description: article.intro, image: SITE_ORIGIN + photo.src, mainEntityOfPage: url, url, inLanguage: lang, publisher: organizationReference }} />
    <StructuredData data={breadcrumbs([{ path: "/", name: lang === "sq" ? "Ballina" : "Home" }, { path: "/blog", name: lang === "sq" ? "Artikuj dhe udhëzues" : "Journal & guides" }, { path: "/blog/" + slug, name: article.title }], lang)} />
    <JournalArticle source={a} photo={photo} />
  </>;
}
