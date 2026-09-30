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

for (const bag of ["d-cut", "handle", "box", "t-shirt", "string"]) {
  const source = `public/assets/client-2026-09/home-${bag}`;
  for (const width of [320, 640]) {
    const path = `${source}-${width}.webp`;
    await sharp(source + ".jpg").resize({ width, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toFile(path);
    console.log(path, (await stat(path)).size);
  }
}
for (const width of [640]) {
  const path = `public/assets/client-2026-09/home-film-poster-${width}.webp`;
  await sharp("public/assets/client-2026-09/home-film-poster.jpg").resize({ width, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toFile(path);
  console.log(path, (await stat(path)).size);
}
const fallback = "public/assets/studio-v4/handle-showcase.webp";
await sharp("public/assets/studio-v4/handle.webp").resize({ width: 640 }).webp({ quality: 84, effort: 6 }).toFile(fallback);
console.log(fallback, (await stat(fallback)).size);
