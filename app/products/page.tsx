import { ProductCatalog } from "@/components/product-catalog";
import { pageMetadata, requestLanguage } from "@/lib/seo";
import { products } from "@/lib/catalog";
import { absolutePage } from "@/lib/seo-config";
import StructuredData from "@/components/structured-data";
export const generateMetadata = () => pageMetadata("/products");
export default async function Page() {
  const lang = await requestLanguage();
  return <><StructuredData data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: absolutePage("/products/" + p.slug, lang) })) }} /><ProductCatalog /></>;
}
