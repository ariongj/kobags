// Responsive delivery copies; retain the original supplied photograph and logo.
import sharp from "sharp";
import { stat } from "node:fs/promises";

const factory = "public/assets/client-2026-09/factory-line";
for (const width of [640, 960, 1600]) {
  const path = `${factory}-${width}.webp`;
  await sharp(factory + ".jpg").resize({ width, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toFile(path);
  console.log(path, (await stat(path)).size);
}
const logo = "public/assets/logo-web.png";
await sharp("public/assets/logo.png").resize({ width: 344 }).png({ compressionLevel: 9, effort: 10 }).toFile(logo);
console.log(logo, (await stat(logo)).size);
