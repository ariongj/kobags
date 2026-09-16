import type { Design, ArtworkPlacement } from "./catalog";
export const artworkFonts = [
  {
    value: "sans",
    label: "Modern sans",
    family: "Arial, Helvetica, sans-serif",
    weight: 600,
  },
  {
    value: "serif",
    label: "Editorial serif",
    family: "Georgia, Times New Roman, serif",
    weight: 400,
  },
  {
    value: "mono",
    label: "Monospace",
    family: "Courier New, monospace",
    weight: 600,
  },
] as const;
export type ArtworkFont = (typeof artworkFonts)[number]["value"];
export type ArtworkAlignment = "left" | "center" | "right";
export type ArtworkLayer = "logo" | "text";
export function sideArtwork(d: Design, layer?: ArtworkLayer) {
  const back = d.side === "back";
  const placement =
    layer === "text" && d.layeredArtwork
      ? back
        ? d.backTextPlacement
        : d.textPlacement
      : undefined;
  return {
    back,
    logo: back ? d.backLogo : d.logo,
    name: back ? d.backLogoName || "" : d.logoName,
    text: back ? d.backText : d.text,
    x: placement?.x ?? (back ? d.backX : d.x),
    y: placement?.y ?? (back ? d.backY : d.y),
    scale: placement?.scale ?? (back ? d.backScale : d.scale),
    rotation: placement?.rotation ?? (back ? d.backRotation : d.rotation),
    font: back ? d.backTextFont || "sans" : d.textFont || "sans",
    align: back ? d.backTextAlign || "center" : d.textAlign || "center",
    ink: back ? d.backInk || d.ink : d.ink,
  };
}
export function placementPatch(
  d: Design,
  layer: ArtworkLayer,
  patch: Partial<ArtworkPlacement>,
): Partial<Design> {
  const back = d.side === "back";
  const separate =
    d.layeredArtwork &&
    layer === "text" &&
    Boolean(back ? d.backTextPlacement : d.textPlacement);
  if (separate) {
    const a = sideArtwork(d, "text");
    return {
      [back ? "backTextPlacement" : "textPlacement"]: {
        x: a.x,
        y: a.y,
        scale: a.scale,
        rotation: a.rotation,
        ...patch,
      },
    };
  }
  return Object.fromEntries(
    Object.entries(patch).map(([key, value]) => [
      back ? "back" + key[0].toUpperCase() + key.slice(1) : key,
      value,
    ]),
  );
}
// Allocate the text's own placement only when a second layer is first introduced.
export function enableLayers(d: Design): Partial<Design> {
  const a = sideArtwork(d);
  const old = a.back ? d.backTextPlacement : d.textPlacement;
  return {
    layeredArtwork: true,
    [a.back ? "backTextPlacement" : "textPlacement"]: old || {
      x: a.x,
      y: a.logo ? 72 : a.y,
      scale: a.logo ? 22 : a.scale,
      rotation: a.logo ? 0 : a.rotation,
    },
  };
}
export function copyArtworkToOtherSide(d: Design): Partial<Design> {
  const a = sideArtwork(d);
  const placement = a.back ? d.backTextPlacement : d.textPlacement;
  return a.back
    ? {
        logo: a.logo,
        logoName: a.name,
        text: a.text,
        ink: a.ink,
        x: d.backX,
        y: d.backY,
        scale: d.backScale,
        rotation: d.backRotation,
        textFont: a.font,
        textAlign: a.align,
        textPlacement: placement,
      }
    : {
        backLogo: a.logo,
        backLogoName: a.name,
        backText: a.text,
        backInk: a.ink,
        backX: d.x,
        backY: d.y,
        backScale: d.scale,
        backRotation: d.rotation,
        backTextFont: a.font,
        backTextAlign: a.align,
        backTextPlacement: placement,
      };
}
// Individually generated neutral mockups. Legacy artwork keeps the original atlas.
export const studioMockups: Record<string, string> = {
  "d-cut-bag": "/assets/studio-v4/d-cut.webp",
  "handle-bag": "/assets/studio-v4/handle.webp",
  "box-bag": "/assets/studio-v4/box.webp",
  "t-shirt-bag": "/assets/studio-v4/t-shirt.webp",
  "string-bag": "/assets/studio-v4/string.webp",
};
// Bounds of the visible silhouette at alpha > 128; ignore transparent padding.
export const studioBounds: Record<string, [number, number, number, number]> = {
  "d-cut-bag": [221, 147, 1035, 1145],
  "handle-bag": [207, 71, 1056, 1183],
  "box-bag": [148, 54, 1117, 1193],
  "t-shirt-bag": [236, 60, 1033, 1190],
  "string-bag": [55, 157, 1199, 1125],
};
