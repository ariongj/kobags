import manifest from "../public/assets/optimized-2026-11/manifest.json";

type ResponsiveMedia = {
  width: number;
  height: number;
  base: string;
  widths: number[];
  fallbackWidth: number;
};

const media: Record<string, ResponsiveMedia> = manifest;

/** Only registered local originals have generated copies; CMS uploads keep their URL. */
export function responsiveImageProps(src: string, sizes: string): {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
} {
  const image = Object.hasOwn(media, src) ? media[src] : undefined;
  if (!image) return { src };
  return {
    src: `${image.base}-${image.fallbackWidth}.webp`,
    srcSet: image.widths.map((width) => `${image.base}-${width}.webp ${width}w`).join(", "),
    sizes,
    width: image.width,
    height: image.height,
  };
}
