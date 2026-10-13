import type { DemoState } from "@/lib/demo-domain";
import type { Design } from "@/lib/catalog";
import type { CmsRecord } from "./types";

/** Prepare a new offline request from the same catalogue shown to the buyer. */
export function withPublishedQuoteCatalog(state: DemoState, input: unknown, records: Pick<CmsRecord, "kind" | "published">[]): DemoState {
  const settings = records.find(record => record.kind === "settings")?.published?.settings;
  if (!settings) return state;
  if (!input || typeof input !== "object") throw Error("INVALID_VARIANT");
  const design = input as Partial<Design>;
  // applyAction checks an existing key against its immutable saved payload.
  // Catalogue edits must not prevent recovery of an already accepted request.
  if (state.requests.some(request => request.key === design.key)) return state;
  const products = records.filter(record => record.kind === "product" && record.published?.product);
  const selected = products.find(record => record.published?.product?.slug === design.product)?.published;
  if (!selected || (selected.activeSizes && !selected.activeSizes.includes(String(design.size)))) throw Error("INVALID_VARIANT");
  if (selected.colors && !selected.colors.includes(String(design.color))) throw Error("INVALID_COLOR");
  if (Number(design.printColors) > (selected.printColors || 4)) throw Error("INVALID_PRINT_COLORS");
  return {
    ...state,
    catalog: products.map(record => record.published!.product!),
    settings: { ...state.settings, moq: selected.moq || settings.moq || 5000 },
  };
}
