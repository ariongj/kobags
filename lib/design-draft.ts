import type { Design, Variant } from "./catalog";

const specificationKeys = ["product", "size", "color", "customDimensions"] as const;
const defaultArtworkText = "YOUR\nBRAND";

/** One view of the requested artwork for previews, submission and saved exports. */
export function quoteRepresentation(design: Design, studioEnabled: boolean): Design {
  if (!studioEnabled)
    return { ...design, referenceStudio: undefined, logo: "", logoName: "", text: "", backLogo: "", backLogoName: "", backText: "", elements: [] };
  return {
    ...design,
    text: design.text.trim() === defaultArtworkText ? "" : design.text,
    ...(design.elements ? { elements: design.elements.filter(element => element.kind !== "text" || element.text.trim() !== defaultArtworkText) } : {}),
  };
}

/** Keep current summaries and saved handoffs aligned without rewriting snapshots. */
export function quoteSpecification(design: Design, published: Pick<Variant, "dimensions" | "gsm">) {
  const studio = design.referenceStudio;
  const custom = design.customDimensions.trim();
  return {
    size: studio?.size || (custom ? "" : design.size),
    dimensions: studio?.dimensions || custom || published.dimensions,
    gsm: studio || custom ? undefined : published.gsm,
    color: studio?.fabric || design.color,
    studio: Boolean(studio),
  };
}

export const quoteDownloadLayout = { width: 2000, height: 1220, imageSize: 920, imageTop: 110, imageLeft: 40, faceOffset: 1000 };

/** Saved captures are local data images; never fetch a URL supplied in a draft. */
export function savedQuotePreview(design: Design, side: "front" | "back"): string | undefined {
  if (!design.referenceStudio) return undefined;
  const source = design.referenceStudio[side];
  if (!/^data:image\/(?:png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(source) || source.length > 110000)
    throw Error("INVALID_STUDIO_PREVIEW");
  return source;
}

export function fitQuotePreview(width: number, height: number) {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0)
    throw Error("INVALID_PREVIEW_SIZE");
  const size = quoteDownloadLayout.imageSize;
  const fittedWidth = width >= height ? size : size * (width / height);
  const fittedHeight = height >= width ? size : size * (height / width);
  return { width: fittedWidth, height: fittedHeight, x: (quoteDownloadLayout.imageSize - fittedWidth) / 2, y: (quoteDownloadLayout.imageSize - fittedHeight) / 2 };
}

/** Merge an edit without carrying an obsolete studio scene into the logo fields. */
export function mergeDesignDraft(base: Design, patch: Partial<Design>): Design {
  const next = { ...base, ...patch };
  if (!patch.referenceStudio && specificationKeys.some(key => key in patch && patch[key] !== base[key]))
    next.referenceStudio = undefined;

  const previousStudio = base.referenceStudio;
  if (previousStudio && !next.referenceStudio) {
    next.note = next.note.replace(/\[3D studio\][\s\S]*?\[\/3D studio\]/g, "").trim();
    // A studio print export is genuine artwork and normally differs from its
    // scene preview. Only exact preview copies are stale; explicit uploads win.
    if (previousStudio.front && next.logo === previousStudio.front && !Object.hasOwn(patch, "logo")) {
      next.logo = "";
      if (!Object.hasOwn(patch, "logoName")) next.logoName = "";
    }
    if (previousStudio.back && next.backLogo === previousStudio.back && !Object.hasOwn(patch, "backLogo")) {
      next.backLogo = "";
      if (!Object.hasOwn(patch, "backLogoName")) next.backLogoName = "";
    }
  }
  return next;
}
