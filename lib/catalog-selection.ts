import type { Product } from "./catalog";

export const catalogUses = ["retail", "grocery", "events", "gifting", "boutiques"];
export type CatalogSelection = { handle: string; use: string; compare: string[] };
export type CatalogQuery = Record<string, string | string[] | undefined>;

export function readCatalogSelection(query: CatalogQuery, products: Product[]): CatalogSelection {
  const value = (key: string) => typeof query[key] === "string" ? query[key] as string : "";
  return {
    handle: products.some(product => product.handle === value("handle")) ? value("handle") : "all",
    use: catalogUses.includes(value("use")) ? value("use") : "all",
    compare: [...new Set(value("compare").split(","))].filter(slug => products.some(product => product.slug === slug)).slice(0, 3),
  };
}

export function catalogSearch(selection: CatalogSelection) {
  const params = new URLSearchParams();
  if (selection.handle !== "all") params.set("handle", selection.handle);
  if (selection.use !== "all") params.set("use", selection.use);
  if (selection.compare.length) params.set("compare", selection.compare.join(","));
  return params.size ? "?" + params.toString() : "";
}
