"use client";
import { useEffect, useRef, useState } from "react";
import { products, colors, Design, getProduct } from "@/lib/catalog";
import {
  artworkFonts,
  placementPatch,
  type ArtworkLayer,
  sideArtwork,
  studioMockups,
  studioBounds,
} from "@/lib/studio-artwork";

const imageCache = new Map<string, Promise<HTMLImageElement>>();
const layerCache = new Map<string, Promise<HTMLCanvasElement>>();
const LOGICAL = 800;
const LAYER = 1440;
function loadImage(src: string) {
  const cached = imageCache.get(src);
  if (cached) return cached;
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => {
      imageCache.delete(src);
      reject(Error("PREVIEW_IMAGE_UNAVAILABLE"));
    };
    image.src = src;
  });
  // Logo previews can change frequently; retain a small, bounded cache.
  if (imageCache.size >= 14) imageCache.delete(imageCache.keys().next().value!);
  imageCache.set(src, promise);
  return promise;
}
async function tintedBag(design: Design) {
  const slug = getProduct(design.product).slug;
  const modern = design.previewVersion === "v4" && Boolean(studioMockups[slug]);
  const photographedNatural =
    modern &&
    design.color === "Natural" &&
    ["t-shirt-bag", "handle-bag", "box-bag"].includes(slug);
  const source = photographedNatural && slug === "t-shirt-bag"
    ? "/assets/studio-real-t-shirt-natural.png"
    : modern
      ? studioMockups[slug]
      : "/assets/studio-bag-atlas.png";
  const key = source + ":" + slug + ":" + design.color;
  const old = layerCache.get(key);
  if (old) return old;
  const promise = (async () => {
    const im = await loadImage(source);
    const layer = document.createElement("canvas");
    layer.width = LAYER;
    layer.height = LAYER;
    const ctx = layer.getContext("2d", { willReadFrequently: true })!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    if (modern) {
      const [left, top, right, bottom] = studioBounds[slug];
      const sourceWidth = right - left,
        sourceHeight = bottom - top;
      const fit =
        Math.min(680 / sourceWidth, 690 / sourceHeight) * (LAYER / LOGICAL);
      const width = sourceWidth * fit,
        height = sourceHeight * fit;
      ctx.drawImage(
        im,
        left,
        top,
        sourceWidth,
        sourceHeight,
        (LAYER - width) / 2,
        (LAYER - height) / 2,
        width,
        height,
      );
    } else {
      const [left, right] = [
        [0, 386],
        [396, 780],
        [780, 1190],
        [1200, 1565],
        [1568, 1983],
      ][products.findIndex((p) => p.slug === slug)];
      const fit = Math.min(680 / (right - left), 690 / 640) * (LAYER / LOGICAL);
      const w = (right - left) * fit,
        h = 640 * fit;
      ctx.drawImage(
        im,
        left,
        60,
        right - left,
        640,
        (LAYER - w) / 2,
        (LAYER - h) / 2,
        w,
        h,
      );
    }
    // Natural-bag source photos already have the requested fabric color.
    // Drawing them unchanged preserves their folds, texture and highlights.
    if (photographedNatural) return layer;
    const image = ctx.getImageData(0, 0, LAYER, LAYER);
    const data = image.data;
    const hex = (colors.find((c) => c.name === design.color) || colors[0]).hex;
    const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    let totalLight = 0;
    let opaquePixels = 0;
    if (modern) {
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 160) continue;
        totalLight +=
          0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        opaquePixels++;
      }
    }
    const referenceLight = opaquePixels ? totalLight / opaquePixels : 200;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < (modern ? 64 : 24)) {
        data[i + 3] = 0;
        continue;
      }
      const luminance =
        0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      if (!modern && luminance > 237) {
        data[i + 3] = 0;
        continue;
      }
      // Preserve fabric shading and antialiased alpha. Highlights add neutral light.
      const shade = modern
        ? Math.max(0.56, Math.min(1.34, 1 + (luminance - referenceLight) / 115))
        : Math.min(1.12, 0.4 + luminance / 260);
      for (let channel = 0; channel < 3; channel++)
        data[i + channel] = Math.min(
          255,
          shade <= 1
            ? rgb[channel] * shade
            : rgb[channel] + (255 - rgb[channel]) * (shade - 1) * (modern ? 0.72 : 0.38),
        );
    }
    ctx.putImageData(image, 0, 0);
    return layer;
  })().catch((e) => {
    layerCache.delete(key);
    throw e;
  });
  if (layerCache.size >= 6) layerCache.delete(layerCache.keys().next().value!);
  layerCache.set(key, promise);
  return promise;
}
// The photographic shell in the 3D viewer uses the same blank, colorized bag
// as the flat editor, so the two modes do not disagree about the product.
export async function renderBlankBagTexture(design: Design) {
  return tintedBag(design);
}
export type { ArtworkBounds } from "@/lib/studio-artwork";
import type { ArtworkBounds } from "@/lib/studio-artwork";
async function paintArtwork(
  ctx: CanvasRenderingContext2D,
  design: Design,
  composite: GlobalCompositeOperation = "source-over",
) {
  const primary = sideArtwork(design);
  const logo = primary.logo ? await loadImage(primary.logo) : null;
  const boxes: ArtworkBounds[] = [];
  const layers: ArtworkLayer[] = logo
    ? design.layeredArtwork && primary.text
      ? ["logo", "text"]
      : ["logo"]
    : primary.text
      ? ["text"]
      : [];
  for (const layer of layers) {
    const art = sideArtwork(design, layer);
    let width = 0,
      height = 0;
    const maxWidth = art.scale * 8;
    ctx.save();
    ctx.globalCompositeOperation = composite;
    ctx.translate(art.x * 8, art.y * 8);
    ctx.rotate((art.rotation * Math.PI) / 180);
    if (layer === "logo" && logo) {
      const fit = Math.min(
        maxWidth / logo.naturalWidth,
        Math.min(320, art.scale * 10) / logo.naturalHeight,
      );
      width = logo.naturalWidth * fit;
      height = logo.naturalHeight * fit;
      ctx.drawImage(logo, -width / 2, -height / 2, width, height);
    } else if (art.text) {
      const family =
        artworkFonts.find((f) => f.value === art.font) || artworkFonts[0];
      const lines = art.text.split("\n");
      let fontSize = art.scale * 1.9;
      ctx.font = `${family.weight} ${fontSize}px ${family.family}`;
      const measured = Math.max(
        ...lines.map((line) => ctx.measureText(line).width),
        1,
      );
      fontSize *= Math.min(
        1,
        maxWidth / measured,
        Math.min(320, art.scale * 10) / (fontSize * 1.22 * lines.length),
      );
      const lineHeight = fontSize * 1.22;
      ctx.font = `${family.weight} ${fontSize}px ${family.family}`;
      width = Math.max(...lines.map((line) => ctx.measureText(line).width), 1);
      height = lineHeight * lines.length;
      ctx.fillStyle = art.ink;
      ctx.textBaseline = "middle";
      ctx.textAlign = art.align as CanvasTextAlign;
      const alignX =
        art.align === "left"
          ? -width / 2
          : art.align === "right"
            ? width / 2
            : 0;
      lines.forEach((line, i) =>
        ctx.fillText(line, alignX, (i - (lines.length - 1) / 2) * lineHeight),
      );
    }
    ctx.restore();
    boxes.push({
      x: art.x * 8,
      y: art.y * 8,
      width,
      height,
      rotation: art.rotation,
      layer,
    });
  }
  return boxes;
}
// The same artwork composition drives flat exports and both faces of the 3D model.
export async function renderArtworkTexture(
  design: Design,
  selected?: ArtworkLayer,
) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(1024 / LOGICAL, 1024 / LOGICAL);
  const bounds = await paintArtwork(ctx, design);
  const box = bounds.find((b) => b.layer === selected);
  if (box) {
    ctx.save();
    ctx.translate(box.x, box.y);
    ctx.rotate((box.rotation * Math.PI) / 180);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(
      -box.width / 2 - 12,
      -box.height / 2 - 10,
      box.width + 24,
      box.height + 20,
    );
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#087a36";
    ctx.setLineDash([9, 5]);
    ctx.strokeRect(
      -box.width / 2 - 12,
      -box.height / 2 - 10,
      box.width + 24,
      box.height + 20,
    );
    ctx.restore();
  }
  return { canvas, bounds };
}
export async function renderBagDesign(
  target: HTMLCanvasElement,
  design: Design,
  {
    guides = false,
    resolution = 1600,
    activeLayer,
  }: { guides?: boolean; resolution?: number; activeLayer?: ArtworkLayer } = {},
) {
  const base = await tintedBag(design);
  const work = document.createElement("canvas");
  work.width = resolution;
  work.height = resolution;
  const ctx = work.getContext("2d")!;
  ctx.scale(resolution / LOGICAL, resolution / LOGICAL);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(base, 0, 0, LOGICAL, LOGICAL);
  const boxes = await paintArtwork(ctx, design, "source-atop");
  const defaultLayer = sideArtwork(design).logo ? "logo" : "text";
  const guideBox = boxes.find(
    (box) => box.layer === (activeLayer || defaultLayer),
  );
  if (guides && guideBox) {
    const art = sideArtwork(design, guideBox.layer),
      { width, height } = guideBox;

    ctx.save();
    ctx.translate(art.x * 8, art.y * 8);
    ctx.rotate((art.rotation * Math.PI) / 180);
    ctx.strokeStyle = "#178447";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 5]);
    ctx.strokeRect(-width / 2 - 12, -height / 2 - 10, width + 24, height + 20);
    ctx.setLineDash([]);
    for (const x of [-width / 2 - 12, width / 2 + 12])
      for (const y of [-height / 2 - 10, height / 2 + 10]) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(x - 4, y - 4, 8, 8);
        ctx.strokeRect(x - 4, y - 4, 8, 8);
      }
    ctx.restore();
    if (Math.abs(art.x - 50) < 0.5) {
      ctx.save();
      ctx.strokeStyle = "#17844750";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 7]);
      ctx.beginPath();
      ctx.moveTo(400, 200);
      ctx.lineTo(400, 715);
      ctx.stroke();
      ctx.restore();
    }
  }
  target.width = resolution;
  target.height = resolution;
  target.getContext("2d")!.drawImage(work, 0, 0);
  const selected = boxes.find((b) => b.layer === activeLayer) || boxes[0];
  return {
    ...(selected || { x: 400, y: 448, width: 0, height: 0, rotation: 0 }),
    layers: boxes,
  };
}
export function BagPreview({
  design,
  onChange,
  canvasRef,
  compact = false,
  guides = false,
  onReady,
  activeLayer,
  onSelectLayer,
}: {
  design: Design;
  onChange?: (p: Partial<Design>) => void;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
  compact?: boolean;
  guides?: boolean;
  onReady?: (ready: boolean) => void;
  activeLayer?: ArtworkLayer;
  onSelectLayer?: (layer: ArtworkLayer) => void;
}) {
  const ownRef = useRef<HTMLCanvasElement>(null);
  const ref = canvasRef || ownRef;
  const [failed, setFailed] = useState(false);
  const bounds = useRef<(ArtworkBounds & { layers: ArtworkBounds[] }) | null>(
    null,
  );
  const drag = useRef<{ dx: number; dy: number; layer: ArtworkLayer } | null>(
    null,
  );
  const art = sideArtwork(design, activeLayer);
  const p = getProduct(design.product);
  const interactive = Boolean(onChange);
  useEffect(() => {
    let current = true;
    onReady?.(false);
    if (ref.current) ref.current.dataset.ready = "false";
    const buffer = document.createElement("canvas");
    renderBagDesign(buffer, design, {
      guides: guides && interactive,
      activeLayer,
      resolution: compact ? 320 : 1600,
    })
      .then((box) => {
        if (!current || !ref.current) return;
        setFailed(false);
        ref.current.width = buffer.width;
        ref.current.height = buffer.height;
        ref.current.getContext("2d")!.drawImage(buffer, 0, 0);
        ref.current.dataset.ready = "true";
        bounds.current = box;
        onReady?.(true);
      })
      .catch(() => {
        if (current) {
          setFailed(true);
          onReady?.(false);
        }
      });
    return () => {
      current = false;
    };
  }, [design, guides, compact, ref, interactive, onReady, activeLayer]);
  const position = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * 800,
      y: ((event.clientY - rect.top) / rect.height) * 800,
    };
  };
  const change = (
    x: number,
    y: number,
    layer = activeLayer || (art.logo ? "logo" : "text"),
  ) =>
    onChange?.(
      placementPatch(design, layer, {
        x: Math.max(24, Math.min(76, x)),
        y: Math.max(33, Math.min(80, y)),
      }),
    );
  return (
    <>
      {failed ? (
        <div className="preview-load-error" role="status">
          Preview unavailable. Your design is saved; reload to try again.
        </div>
      ) : null}
      <canvas
        ref={ref}
        width={compact ? 320 : 1600}
        height={compact ? 320 : 1600}
        className={"bag-canvas " + (compact ? "compact" : "")}
        role="img"
        aria-label={`${p.name}, ${design.color}, ${art.back ? "back" : "front"} branding preview. Illustrative concept.`}
        tabIndex={onChange ? 0 : undefined}
        style={{
          cursor: onChange ? "grab" : "default",
          touchAction: onChange ? "none" : "auto",
        }}
        onPointerDown={(e) => {
          if (!onChange || !bounds.current || (!art.logo && !art.text)) return;
          const pos = position(e);
          const b = [...bounds.current.layers].reverse().find((box) => {
            const angle = (-box.rotation * Math.PI) / 180,
              dx = pos.x - box.x,
              dy = pos.y - box.y;
            return (
              Math.abs(dx * Math.cos(angle) - dy * Math.sin(angle)) <=
                box.width / 2 + 20 &&
              Math.abs(dx * Math.sin(angle) + dy * Math.cos(angle)) <=
                box.height / 2 + 20
            );
          });
          if (!b?.layer) return;
          onSelectLayer?.(b.layer);
          drag.current = { dx: pos.x - b.x, dy: pos.y - b.y, layer: b.layer };
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.style.cursor = "grabbing";
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const pos = position(e);
          change(
            (pos.x - drag.current.dx) / 8,
            (pos.y - drag.current.dy) / 8,
            drag.current.layer,
          );
        }}
        onPointerUp={(e) => {
          drag.current = null;
          e.currentTarget.style.cursor = "grab";
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onKeyDown={(e) => {
          if (!onChange) return;
          const amount = e.shiftKey ? 5 : 1;
          const x =
              e.key === "ArrowLeft"
                ? -amount
                : e.key === "ArrowRight"
                  ? amount
                  : 0,
            y =
              e.key === "ArrowUp"
                ? -amount
                : e.key === "ArrowDown"
                  ? amount
                  : 0;
          if (x || y) {
            e.preventDefault();
            change(art.x + x, art.y + y);
          }
        }}
      />
    </>
  );
}
