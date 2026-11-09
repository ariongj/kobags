// Rebuild responsive delivery copies from the approved, unmodified photographs.
// Run from the repository root: node scripts/optimize-public-media.mjs
import sharp from "sharp";
import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const outputUrl = "/assets/optimized-2026-11";
const outputDirectory = resolve(root, "public" + outputUrl);
const products = ["d-cut-bag", "handle-bag", "box-bag", "t-shirt-bag", "string-bag"];
const sources = [
  ...products.map((bag) => ({ source: `/assets/client-2026-09/${bag}.jpg`, name: `product-${bag}` })),
  ...["box", "t-shirt", "string"].map((bag) => ({ source: `/assets/client-2026-09/detail-${bag}.jpg`, name: `detail-${bag}` })),
  ...products.map((bag) => ({ source: `/assets/${bag}.webp`, name: `gallery-${bag}` })),
  { source: "/assets/client-2026-09/manufacturing-bag-forming.webp", name: "manufacturing-bag-forming" },
  { source: "/assets/client-2026-09/material-rolls.jpg", name: "material-rolls" },
  { source: "/assets/client-2026-10/printing-line-fresh-food.jpg", name: "printing-line-fresh-food" },
  { source: "/assets/client-2026-09/finished-stack-rail.jpg", name: "finished-stack-rail" },
  { source: "/assets/client-2026-09/bag-forming-poster.jpg", name: "bag-forming-poster", poster: true },
  { source: "/assets/client-2026-09/bag-stacking-poster.jpg", name: "bag-stacking-poster", poster: true },
];

await mkdir(outputDirectory, { recursive: true });
const manifest = {};
for (const { source, name, poster } of sources) {
  const input = resolve(root, "public" + source);
  const metadata = await sharp(input).metadata();
  const { width, height } = metadata;
  if (!width || !height) throw new Error(`Missing dimensions for ${source}`);
  if (metadata.orientation && metadata.orientation !== 1) {
    throw new Error(`Review image orientation before adding ${source}`);
  }
  const widths = poster ? [width] : [...new Set([160, 320, 640, 960, width].filter((size) => size <= width))].sort((a, b) => a - b);
  const base = `${outputUrl}/${name}`;
  const measurements = [];
  for (const size of widths) {
    const output = resolve(root, `public${base}-${size}.webp`);
    if (source.endsWith(".webp") && size === width) {
      // The existing full-size WebP is already encoded; avoid another lossy pass.
      await copyFile(input, output);
    } else {
      await sharp(input)
        .resize({ width: size, withoutEnlargement: true })
        .webp({ quality: 84, alphaQuality: 100, effort: 6 })
        .toFile(output);
    }
    const generated = await sharp(output).metadata();
    // Sharp may round either direction after JPEG decoder shrink-on-load.
    if (generated.width !== size || Math.abs(generated.height - height * size / width) > 1 || generated.hasAlpha !== metadata.hasAlpha) {
      throw new Error(`Responsive copy changed dimensions or transparency: ${output}`);
    }
    measurements.push(`${size}w:${(await stat(output)).size}`);
  }
  manifest[source] = { width, height, base, widths, fallbackWidth: widths.includes(640) ? 640 : widths.at(-1) };
  console.log(`${source} original:${(await stat(input)).size} ${measurements.join(" ")}`);
}
await writeFile(resolve(outputDirectory, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
