import type { Design } from "./catalog";

export function artworkSides(design: Design): ("front" | "back")[] {
  const sides: ("front" | "back")[] = [];
  if (design.logo || design.text.trim() || design.elements?.some(e => e.side === "front" && (e.logo || e.text.trim()))) sides.push("front");
  if (design.backLogo || design.backText.trim() || design.elements?.some(e => e.side === "back" && (e.logo || e.text.trim()))) sides.push("back");
  return sides;
}

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((offset) => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

// Screen contrast is a preview hint, not a print-production guarantee.
export function inkContrast(ink: string, fabric: string) {
  const a = luminance(ink), b = luminance(fabric);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function readableInk(fabric: string) {
  return inkContrast("#ffffff", fabric) >= inkContrast("#123442", fabric)
    ? "#ffffff"
    : "#123442";
}

/** Remove near-white pixels connected to an image edge.
 * Enclosed white details stay intact; existing transparency is traversable.
 * Mutates the supplied RGBA buffer and returns the count of cleared pixels.
 */
export function clearWhiteBackground(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
) {
  if (!Number.isInteger(width) || !Number.isInteger(height) ||
      width < 1 || height < 1 || pixels.length !== width * height * 4)
    throw new Error("INVALID_IMAGE_SIZE");
  const visited = new Uint8Array(width * height);
  const queue = new Uint32Array(width * height);
  let head = 0, tail = 0, removed = 0;
  const visit = (pixel: number) => {
    if (visited[pixel]) return;
    visited[pixel] = 1;
    const offset = pixel * 4;
    const r = pixels[offset], g = pixels[offset + 1], b = pixels[offset + 2];
    if (pixels[offset + 3] > 0 &&
        (Math.min(r, g, b) < 240 || Math.max(r, g, b) - Math.min(r, g, b) > 14))
      return;
    if (pixels[offset + 3] > 0) removed++;
    pixels[offset + 3] = 0;
    queue[tail++] = pixel;
  };
  for (let x = 0; x < width; x++) {
    visit(x);
    visit((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    visit(y * width);
    visit(y * width + width - 1);
  }
  while (head < tail) {
    const pixel = queue[head++];
    const x = pixel % width, y = Math.floor(pixel / width);
    if (x > 0) visit(pixel - 1);
    if (x < width - 1) visit(pixel + 1);
    if (y > 0) visit(pixel - width);
    if (y < height - 1) visit(pixel + width);
  }
  return removed;
}
