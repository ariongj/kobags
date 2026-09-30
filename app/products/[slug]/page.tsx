import { ProductDetail } from "@/components/product-catalog";
import { products } from "@/lib/catalog";
import { notFound } from "next/navigation";
import { pageMetadata, requestLanguage } from "@/lib/seo";
import { localizeProduct } from "@/lib/product-copy";
import { absolutePage, SITE_ORIGIN } from "@/lib/seo-config";
import { breadcrumbs, organizationReference } from "@/lib/seo-schema";
import StructuredData from "@/components/structured-data";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  const lang = await requestLanguage();
  const product = localizeProduct(p, lang);
  return pageMetadata("/products/" + slug, { title: product.name + (lang === "sq" ? " — Çanta me markë" : " — Custom Non-Woven Bags"), description: product.description, image: product.image });
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  const lang = await requestLanguage();
  const product = localizeProduct(p, lang);
  return <>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "Product", "@id": absolutePage("/products/" + slug, lang) + "#product", url: absolutePage("/products/" + slug, lang), name: product.name, description: product.description, image: SITE_ORIGIN + product.image, brand: { "@type": "Brand", name: "Kobags Group" }, manufacturer: organizationReference, material: lang === "sq" ? "Polipropilen jo i endur (PP)" : "Non-woven polypropylene (PP)", additionalProperty: product.variants.map(v => ({ "@type": "PropertyValue", name: v.name, value: `${v.dimensions}; ${v.gsm} g/m²` })) }} />
    <StructuredData data={breadcrumbs([{ path: "/", name: lang === "sq" ? "Ballina" : "Home" }, { path: "/products", name: lang === "sq" ? "Çantat tona" : "Our bags" }, { path: "/products/" + slug, name: product.name }], lang)} />
    <ProductDetail product={p} />
  </>;
}
