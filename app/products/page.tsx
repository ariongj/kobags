import { ProductCatalog } from "@/components/product-catalog";
import { pageMetadata, requestLanguage } from "@/lib/seo";
import { publicProducts } from "@/lib/cms/public";
import { absolutePage } from "@/lib/seo-config";
import StructuredData from "@/components/structured-data";
export const generateMetadata = () => pageMetadata("/products");
export default async function Page() {
  const lang = await requestLanguage();
  const products = await publicProducts();
  return <><StructuredData data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: absolutePage("/products/" + p.slug, lang) })) }} /><ProductCatalog /></>;
}
