import { colors, type Design, type ArtworkPlacement, type ArtworkElement } from "./catalog";
import { inkContrast, readableInk } from "./studio-checks";
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
export type ArtworkLayer = "logo" | "text" | `element:${string}`;
export const MAX_ARTWORK_PER_SIDE = 4;

export function artworkLayers(d: Design): ArtworkLayer[] {
  const a = sideArtwork(d);
  const base: ArtworkLayer[] = a.logo ? (d.layeredArtwork && a.text.trim() ? ["logo", "text"] : ["logo"]) : a.text.trim() ? ["text"] : [];
  return [...base, ...(d.elements || []).filter(e => e.side === d.side).map(e => `element:${e.id}` as const)];
}

export function artworkSummary(d: Design) {
  return artworkLayers(d).map(layer => {
    const a = sideArtwork(d, layer);
    return a.kind === "qr" ? `QR: ${a.qrValue}` : a.kind === "text" ? a.text : a.name || "Logo";
  }).join(" · ");
}

export function artworkPatch(d: Design, layer: ArtworkLayer, patch: Partial<Pick<ArtworkElement, "logo" | "name" | "text" | "ink" | "font" | "align" | "qrValue">>): Partial<Design> {
  if (layer.startsWith("element:")) return { elements: (d.elements || []).map(e => e.id === layer.slice(8) && e.side === d.side ? { ...e, ...patch } : e) };
  const keys = { logo: "logo", name: "logoName", text: "text", ink: "ink", font: "textFont", align: "textAlign" } as const;
  return Object.fromEntries(Object.entries(patch).filter(([key]) => key in keys).map(([key, value]) => {
    const name = keys[key as keyof typeof keys];
    return [d.side === "back" ? "back" + name[0].toUpperCase() + name.slice(1) : name, value];
  }));
}

export function removeArtwork(d: Design, layer: ArtworkLayer): Partial<Design> {
  return layer.startsWith("element:") ? { elements: (d.elements || []).filter(e => !(e.id === layer.slice(8) && e.side === d.side)) } : artworkPatch(d, layer, layer === "logo" ? { logo: "", name: "" } : { text: "" });
}

export function newArtwork(d: Design, kind: ArtworkElement["kind"], content: Partial<ArtworkElement> = {}): { patch: Partial<Design>; layer: ArtworkLayer } | null {
  const layers = artworkLayers(d);
  if (layers.length >= MAX_ARTWORK_PER_SIDE) return null;
  const id = crypto.randomUUID();
  const ink = d.side === "back" ? d.backInk || d.ink : d.ink;
  const fabric = colors.find(c => c.name === d.color)?.hex || colors[0].hex;
  const element: ArtworkElement = { id, side: d.side, kind, logo: "", name: "", text: kind === "text" ? "Your text" : "", ink: inkContrast(ink, fabric) < 3 ? readableInk(fabric) : ink, font: "sans", align: "center", x: layers.length === 2 ? 64 : layers.length >= 3 ? 36 : 50, y: layers.length ? 70 : 56, scale: kind === "qr" ? 18 : layers.length >= 2 ? 20 : 25, rotation: 0, ...content };
  return { patch: { elements: [...(d.elements || []), element] }, layer: `element:${id}` };
}
export type ArtworkBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  layer?: ArtworkLayer;
};
export type ArtworkTexture = {
  canvas: HTMLCanvasElement;
  bounds: ArtworkBounds[];
};

// Nearby artwork can overlap a logo's transparent padding. Prefer the element
// whose centre was tapped; keep the current selection when centres coincide so
// the element picker can still target stacked artwork deliberately.
export function pickArtwork(bounds: ArtworkBounds[], x: number, y: number, selected?: ArtworkLayer, padding = 18) {
  return [...bounds].reverse().filter(box => {
    const angle = -box.rotation * Math.PI / 180, dx = x - box.x, dy = y - box.y;
    return Math.abs(dx * Math.cos(angle) - dy * Math.sin(angle)) <= box.width / 2 + padding &&
      Math.abs(dx * Math.sin(angle) + dy * Math.cos(angle)) <= box.height / 2 + padding;
  }).sort((a, b) => {
    const distance = Math.hypot(x - a.x, y - a.y) - Math.hypot(x - b.x, y - b.y);
    return Math.abs(distance) > 1 ? distance : Number(b.layer === selected) - Number(a.layer === selected);
  })[0];
}

export function sideArtwork(d: Design, layer?: ArtworkLayer) {
  const back = d.side === "back";
  const extra = layer?.startsWith("element:") ? d.elements?.find(e => e.id === layer.slice(8) && e.side === d.side) : undefined;
  if (extra) return { ...extra, back, qrValue: extra.qrValue || "" };
  const placement =
    layer === "text" && d.layeredArtwork
      ? back
        ? d.backTextPlacement
        : d.textPlacement
      : undefined;
  return {
    kind: (layer === "logo" ? "logo" : "text") as ArtworkElement["kind"],
    qrValue: "",
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
  if (layer.startsWith("element:")) return { elements: (d.elements || []).map(e => e.id === layer.slice(8) && e.side === d.side ? { ...e, ...patch } : e) };
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
  const elements = (d.elements || []).filter(e => e.side === d.side);
  const copies = elements.map(e => ({ ...e, id: crypto.randomUUID(), side: (a.back ? "front" : "back") as Design["side"] }));
  return { elements: [...elements, ...copies], ...(a.back
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
      }) };
}
// Blank product mockups were edited from Kobags' supplied product photography.
// The editable artwork is composited separately; the actual client photos remain
// available beside the studio for comparison.
export const studioMockups: Record<string, string> = {
  "d-cut-bag": "/assets/studio-real-d-cut.webp",
  "handle-bag": "/assets/studio-real-handle.webp",
  "box-bag": "/assets/studio-real-box.webp",
  "t-shirt-bag": "/assets/studio-real-t-shirt.webp",
  "string-bag": "/assets/studio-real-string.webp",
};
// Bounds of the visible silhouette at alpha > 128; ignore transparent padding.
export const studioBounds: Record<string, [number, number, number, number]> = {
  "d-cut-bag": [169, 84, 1090, 1170],
  "handle-bag": [326, 28, 980, 1225],
  "box-bag": [119, 76, 1039, 1361],
  "t-shirt-bag": [292, 73, 971, 1184],
  "string-bag": [114, 25, 1138, 1205],
};
