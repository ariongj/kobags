import { ProductCatalog } from "@/components/product-catalog";
import { pageMetadata, requestLanguage } from "@/lib/seo";
import { publicProducts } from "@/lib/cms/public";
import { absolutePage } from "@/lib/seo-config";
import StructuredData from "@/components/structured-data";
import { readCatalogSelection, type CatalogQuery } from "@/lib/catalog-selection";
import { localizeProduct } from "@/lib/product-copy";
export const generateMetadata = () => pageMetadata("/products");
export default async function Page({ searchParams }: { searchParams: Promise<CatalogQuery> }) {
  const lang = await requestLanguage();
  const products = await publicProducts();
  const selection = readCatalogSelection(await searchParams, products);
  return <><StructuredData data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: localizeProduct(p, lang).name, url: absolutePage("/products/" + p.slug, lang) })) }} /><ProductCatalog initialSelection={selection} /></>;
}
