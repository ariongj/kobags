import type { Design } from "./catalog";
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
export function sideArtwork(d: Design) {
  const back = d.side === "back";
  return {
    back,
    logo: back ? d.backLogo : d.logo,
    name: back ? d.backLogoName || "" : d.logoName,
    text: back ? d.backText : d.text,
    x: back ? d.backX : d.x,
    y: back ? d.backY : d.y,
    scale: back ? d.backScale : d.scale,
    rotation: back ? d.backRotation : d.rotation,
    font: back ? d.backTextFont || "sans" : d.textFont || "sans",
    align: back ? d.backTextAlign || "center" : d.textAlign || "center",
    ink: back ? d.backInk || d.ink : d.ink,
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
