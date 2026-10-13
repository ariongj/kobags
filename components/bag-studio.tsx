"use client";
import { useCms } from "./cms/public-context";
import Studio3D from "./studio-3d";
import ImportedScan from "./imported-scan";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "@/components/site-link";
import {
  Coffee,
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  Move,
  RotateCcw,
  Maximize2,
  Package,
  ShieldCheck,
  ImagePlus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  SlidersHorizontal,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle2,
  Eraser,
  Box,
  Undo2,
  Redo2,
  Copy,
  Type,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { BagPreview, renderBagDesign } from "./bag-preview";
export { BagPreview } from "./bag-preview";
import {
  sideArtwork,
  artworkFonts,
  placementPatch,
  enableLayers,
  copyArtworkToOtherSide,
  type ArtworkLayer,
} from "@/lib/studio-artwork";
import {
  artworkSides,
  clearWhiteBackground,
} from "@/lib/studio-checks";
import { useDemo } from "./demo-store";
import {
  products,
  colors,
  Design,
  initialDesign,
  preferredBagColor,
  productMedia,
  MAX_BRAND_TEXT_LENGTH,
} from "@/lib/catalog";
import { useKobags } from "./kobags-context";
export function Choice({
  id,
  value,
  onChange,
  options,
  label,
}: {
  id: string;
  value: string;
  onChange: (s: string) => void;
  options: { value: string; label: string }[];
  label: string;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Select value={value} onValueChange={(next) => {
        // Form integration may emit an empty initialization value. Only a real option changes the draft.
        if (options.some((option) => option.value === next)) onChange(next);
      }}>
        <SelectTrigger id={id} className="choice">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem value={o.value} key={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
const pickerDesigns = Object.fromEntries(
  products.map((product) => [
    product.slug,
    {
      ...initialDesign,
      product: product.slug,
      text: "",
      logo: "",
      color: "Natural",
    },
  ]),
);
function PrecisionInput({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  label: string;
}) {
  const [entry, setEntry] = useState({
    value,
    text: String(Math.round(value)),
  });
  if (entry.value !== value)
    setEntry({ value, text: String(Math.round(value)) });
  const draft = entry.value === value ? entry.text : String(Math.round(value));
  const setDraft = (text: string) => setEntry({ value, text });
  return (
    <input
      type="number"
      min={min}
      max={max}
      step={1}
      aria-label={label}
      value={draft}
      onChange={(event) => {
        setDraft(event.target.value);
        const n = event.target.valueAsNumber;
        if (Number.isFinite(n) && n >= min && n <= max) onChange(n);
      }}
      onBlur={() => {
        const n = Number(draft);
        const next =
          draft.trim() && Number.isFinite(n)
            ? Math.max(min, Math.min(max, n))
            : value;
        setDraft(String(Math.round(next)));
        onChange(next);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") event.currentTarget.blur();
      }}
    />
  );
}
export default function BagStudio() {
  const { design, update: saveDesign, t } = useKobags();
  const [testScan, setTestScan] = useState(false);
  useEffect(() => {
    const sync = () => setTestScan(new URLSearchParams(location.search).get("model") === "coffee-test");
    sync(); window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const chooseTestScan = (selected: boolean) => {
    setTestScan(selected);
    const url = new URL(location.href);
    if (selected) url.searchParams.set("model", "coffee-test"); else url.searchParams.delete("model");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  };
  const history = useRef<{
    past: Design[];
    future: Design[];
    key: string;
    time: number;
  }>({ past: [], future: [], key: "", time: 0 });
  const [historyAvailable, setHistoryAvailable] = useState({ undo: false, redo: false });
  const currentDesign = useRef(design);
  useLayoutEffect(() => { currentDesign.current = design; }, [design]);
  const draggingArtwork = useRef(false);
  const [selectionKey, setSelectionKey] = useState(0);
  const [viewKey, setViewKey] = useState(0);
  const [activeLayer, setActiveLayer] = useState<ArtworkLayer>("text");
  const update = useCallback((patch: Partial<Design>) => {
    const current = currentDesign.current;
    if (
      Object.entries(patch).every(
        ([key, value]) =>
          JSON.stringify(current[key as keyof Design]) ===
          JSON.stringify(value),
      )
    )
      return;
    if (!(Object.keys(patch).length === 1 && patch.side)) {
      const h = history.current,
        key = current.side + activeLayer + Object.keys(patch).sort().join(","),
        now = Date.now();
      if (h.key !== key || (!draggingArtwork.current && now - h.time > 650))
        h.past = [...h.past.slice(-19), current];
      h.future = [];
      h.key = key;
      h.time = now;
    }
    currentDesign.current = { ...current, ...patch };
    saveDesign(patch);
    setHistoryAvailable({ undo: !!history.current.past.length, redo: !!history.current.future.length });
  }, [activeLayer, saveDesign]);
  const travel = (direction: "past" | "future") => {
    const h = history.current,
      next = h[direction].pop();
    if (!next) return;
    h[direction === "past" ? "future" : "past"].push(currentDesign.current);
    h.key = "";
    h.time = 0;
    const restored = {
      ...Object.fromEntries(
        Object.keys(currentDesign.current).map((key) => [key, undefined]),
      ),
      ...next,
    } as Design;
    currentDesign.current = restored;
    saveDesign(restored);
    setHistoryAvailable({ undo: !!h.past.length, redo: !!h.future.length });
  };
  const cms = useCms();
  const p = cms.getProduct(design.product);
  const available = cms.options(design.product);
  const v = p.variants.find((v) => v.name === design.size) || p.variants[0];
  const sizeSq: Record<string, string> = { Small: "E vogël", Medium: "Mesatare", Large: "E madhe" };
  const displaySize = t(design.size, sizeSq[design.size]);
  const displayColor = t(design.color, colors.find((color) => color.name === design.color)?.sq);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState("bag");
  const [viewMode, setViewMode] = useState("3d");
  const [samplePhoto, setSamplePhoto] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [textLimitNotice, setTextLimitNotice] = useState(false);
  const [full, setFull] = useState(false);
  const [downloaded, setDownloaded] = useState("");
  const [exporting, setExporting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [guides, setGuides] = useState(true);
  const selectArtwork = (
    layer: ArtworkLayer,
    side: Design["side"] = design.side,
  ) => {
    setTextLimitNotice(false);
    setActiveLayer(layer);
    setTab("artwork");
    setSelectionKey((key) => key + 1);
    if (side !== design.side) update({ side });
  };
  const artworkDrag = (active: boolean) => {
    draggingArtwork.current = active;
    history.current.key = "";
    history.current.time = 0;
  };
  const studioEditing = {
    onChange: update,
    onSelectLayer: selectArtwork,
    activeLayer,
    editing: tab === "artwork",
    selectionKey,
    viewKey,
    guides,
    onDragChange: artworkDrag,
  };
  const art = sideArtwork(design, activeLayer);
  const transform = (patch: Parameters<typeof placementPatch>[2]) =>
    update(placementPatch(design, activeLayer, patch));
  const sides = artworkSides(design);
  const [backgroundBusy, setBackgroundBusy] = useState(false);
  const [backgroundEdits, setBackgroundEdits] = useState<
    Partial<Record<Design["side"], { original: string; cleaned: string }>>
  >({});
  const [backgroundNotice, setBackgroundNotice] = useState<{
    source: string;
    message: "unchanged" | "empty";
  } | null>(null);
  const latestDesign = currentDesign;
  const backgroundEdit = backgroundEdits[design.side];
  const canRestoreBackground =
    backgroundEdit?.cleaned === art.logo && !!art.logo;
  const { state } = useDemo();
  const minimum = available?.moq || cms.settings?.moq || state?.settings.moq || 5000;
  const setArtworkPosition = (axis: "x" | "y", value: number) => {
    if (!Number.isFinite(value)) return;
    const clamped = Math.max(
      axis === "x" ? 24 : 33,
      Math.min(axis === "x" ? 76 : 80, value),
    );
    transform({ [axis]: clamped });
  };
  const canvas = useRef<HTMLCanvasElement>(null);
  const enlargeButton = useRef<HTMLButtonElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const back = design.side === "back";
  const upload = async (file?: File) => {
    if (!file || uploading || backgroundBusy) return;
    setError("");
    if (
      !["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      setError(
        t(
          "Choose a PNG, JPG or WebP image under 5 MB.",
          "Zgjidhni PNG, JPG ose WebP nën 5 MB.",
        ),
      );
      return;
    }
    setUploading(true);
    const uploadToBack = back;
    let bitmap: ImageBitmap | undefined;
    try {
      bitmap = await createImageBitmap(file);
      if (bitmap.width > 8000 || bitmap.height > 8000) throw Error();
      let image = "";
      for (const edge of [1024, 768, 512, 320]) {
        const c = document.createElement("canvas");
        const fit = Math.min(1, edge / Math.max(bitmap.width, bitmap.height));
        c.width = Math.max(1, Math.round(bitmap.width * fit));
        c.height = Math.max(1, Math.round(bitmap.height * fit));
        const ctx = c.getContext("2d")!;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(bitmap, 0, 0, c.width, c.height);
        image = c.toDataURL("image/webp", 0.94);
        if (image.length <= 100000) break;
      }
      if (image.length > 100000) throw Error();
      const target = {
        ...currentDesign.current,
        side: uploadToBack ? ("back" as const) : ("front" as const),
      };
      const existing = sideArtwork(target);
      const keepText = existing.text.trim() && existing.text !== "YOUR\nBRAND";
      const layers = keepText ? enableLayers(target) : { layeredArtwork: true };
      update({
        ...layers,
        ...(uploadToBack
          ? {
              backLogo: image,
              backText: keepText ? existing.text : "",
              backLogoName: file.name.slice(0, 150),
              ...(!existing.logo && keepText
                ? { backY: 44, backScale: 26 }
                : {}),
            }
          : {
              logo: image,
              text: keepText ? existing.text : "",
              logoName: file.name.slice(0, 150),
              ...(!existing.logo && keepText ? { y: 44, scale: 26 } : {}),
            }),
      });
      selectArtwork("logo");
    } catch {
      setError(
        t(
          "This image could not be read. Try a smaller PNG or JPG.",
          "Imazhi nuk u lexua. Provoni një PNG ose JPG më të vogël.",
        ),
      );
    } finally {
      bitmap?.close();
      setUploading(false);
    }
  };
  const removeWhiteBackground = async () => {
    if (backgroundBusy || uploading || !art.logo) return;
    const source = art.logo;
    const side = design.side;
    setBackgroundBusy(true);
    setBackgroundNotice(null);
    setError("");
    try {
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = reject;
        image.src = source;
      });
      if (
        !image.naturalWidth ||
        image.naturalWidth > 1024 ||
        image.naturalHeight > 1024
      )
        throw Error("IMAGE_TOO_LARGE");
      const output = document.createElement("canvas");
      output.width = image.naturalWidth;
      output.height = image.naturalHeight;
      const ctx = output.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(image, 0, 0);
      const pixels = ctx.getImageData(0, 0, output.width, output.height);
      const removed = clearWhiteBackground(
        pixels.data,
        output.width,
        output.height,
      );
      let visible = false;
      for (let i = 3; i < pixels.data.length; i += 4)
        if (pixels.data[i] > 0) {
          visible = true;
          break;
        }
      // Do not replace artwork changed while the image was being decoded.
      if (
        (side === "back"
          ? latestDesign.current.backLogo
          : latestDesign.current.logo) !== source
      )
        return;
      if (!removed || !visible) {
        setBackgroundNotice({
          source,
          message: visible ? "unchanged" : "empty",
        });
        return;
      }
      ctx.putImageData(pixels, 0, 0);
      let cleaned = output.toDataURL("image/png");
      if (cleaned.length > 100000)
        cleaned = output.toDataURL("image/webp", 0.94);
      if (cleaned.length > 100000) throw Error("IMAGE_TOO_LARGE");
      setBackgroundEdits((previous) => ({
        ...previous,
        [side]: { original: source, cleaned },
      }));
      update(side === "back" ? { backLogo: cleaned } : { logo: cleaned });
    } catch {
      setError(
        t(
          "The background could not be removed. Your original logo is unchanged.",
          "Sfondi nuk mund të hiqej. Logoja origjinale nuk u ndryshua.",
        ),
      );
    } finally {
      setBackgroundBusy(false);
    }
  };
  const download = async () => {
    if (exporting || !previewReady) return;
    setExporting(true);
    setError("");
    try {
      const clean = document.createElement("canvas");
      await renderBagDesign(clean, design, { resolution: 1600 });
      const output = document.createElement("canvas");
      output.width = 1600;
      output.height = 1820;
      const ctx = output.getContext("2d")!;
      ctx.fillStyle = "#f6f8f9";
      ctx.fillRect(0, 0, 1600, 1820);
      ctx.drawImage(clean, 0, 0);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 1580, 1600, 240);
      ctx.strokeStyle = "#dbe3e8";
      ctx.beginPath();
      ctx.moveTo(65, 1580);
      ctx.lineTo(1535, 1580);
      ctx.stroke();
      ctx.fillStyle = "#193b67";
      ctx.font = "600 30px Arial";
      ctx.fillText(t("KOBAGS / YOUR DESIGN CONCEPT", "KOBAGS / KONCEPTI I DIZAJNIT"), 65, 1635);
      ctx.font = "24px Arial";
      ctx.fillText(
        `${p.name} · ${displaySize} · ${displayColor} · ${t(back ? "Back" : "Front", back ? "Prapa" : "Përpara")}`,
        65,
        1685,
      );
      ctx.fillStyle = "#62717b";
      ctx.font = "22px Arial";
      ctx.fillText(`${v.dimensions} · ${v.gsm} GSM · ${t("Non-woven PP", "PP jo i endur")}`, 65, 1725);
      ctx.font = "20px Arial";
      ctx.fillText(
        t("Illustrative preview. Final shape, color and print placement require production approval.", "Pamje orientuese. Forma, ngjyra dhe shtypi miratohen para prodhimit."),
        65,
        1780,
        1470,
      );
      const a = document.createElement("a");
      a.href = output.toDataURL("image/png");
      a.download = `kobags-${p.slug}-${design.side}-concept.png`;
      a.click();
      setDownloaded(a.download);
    } catch {
      setError(
        t(
          "The preview could not be exported. Please try again.",
          "Parapamja nuk u eksportua. Provoni përsëri.",
        ),
      );
    } finally {
      setExporting(false);
    }
  };
  const downloadSheet = async () => {
    if (exporting || !previewReady) return;
    setExporting(true);
    setError("");
    try {
      const faces = await Promise.all(
        (["front", "back"] as const).map(async (side) => {
          const c = document.createElement("canvas");
          await renderBagDesign(c, { ...design, side }, { resolution: 1600 });
          return c;
        }),
      );
      const output = document.createElement("canvas");
      output.width = 2000;
      output.height = 1400;
      const ctx = output.getContext("2d")!;
      ctx.fillStyle = "#f1f4f2";
      ctx.fillRect(0, 0, 2000, 1400);
      ctx.fillStyle = "#193b67";
      ctx.font = "600 40px Arial";
      ctx.fillText(t("KOBAGS / DESIGN SHEET", "KOBAGS / FLETA E DIZAJNIT"), 70, 90);
      ctx.font = "22px Arial";
      ctx.fillStyle = "#62717b";
      ctx.fillText(t("Two sides. One design concept.", "Dy anë. Një koncept dizajni."), 70, 132);
      faces.forEach((face, index) => {
        ctx.drawImage(face, 80 + index * 1000, 175, 840, 840);
        ctx.fillStyle = "#193b67";
        ctx.font = "600 22px Arial";
        ctx.textAlign = "center";
        ctx.fillText(index ? t("BACK", "PRAPA") : t("FRONT", "PËRPARA"), 500 + index * 1000, 1030);
      });
      ctx.textAlign = "left";
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 1090, 2000, 310);
      ctx.fillStyle = "#193b67";
      ctx.font = "600 28px Arial";
      ctx.fillText(`${p.name} · ${displaySize} · ${displayColor}`, 70, 1145);
      ctx.font = "24px Arial";
      ctx.fillText(
        `${v.dimensions} · ${v.gsm} GSM · ${t("Non-woven PP", "PP jo i endur")} · ${design.printColors} ${t(design.printColors === 1 ? "requested print color" : "requested print colors", design.printColors === 1 ? "ngjyrë shtypi e kërkuar" : "ngjyra shtypi të kërkuara")}`,
        70,
        1190,
        1860,
      );
      ctx.fillStyle = "#62717b";
      ctx.font = "22px Arial";
      if (design.customDimensions)
        ctx.fillText(
          t(`Custom size request: ${design.customDimensions} — subject to feasibility review.`, `Përmasa e kërkuar: ${design.customDimensions} — në shqyrtim teknik.`),
          70,
          1235,
          1860,
        );
      ctx.fillText(
        t("Illustrative shape preview. Selected dimensions are listed above.", "Parapamje ilustruese e formës. Përmasat e zgjedhura janë shënuar më sipër."),
        70,
        1300,
      );
      ctx.fillText(
        t("Final material, color and print placement require approval before production. No order is placed by this download.", "Materiali, ngjyra dhe shtypi miratohen para prodhimit. Shkarkimi nuk krijon porosi."),
        70,
        1340,
        1860,
      );
      const link = document.createElement("a");
      link.href = output.toDataURL("image/png");
      link.download = `kobags-${p.slug}-both-sides-concept.png`;
      link.click();
      setDownloaded(link.download);
    } catch {
      setError(
        t(
          "The design sheet could not be exported. Please try again.",
          "Fleta e dizajnit nuk u eksportua. Provoni përsëri.",
        ),
      );
    } finally {
      setExporting(false);
    }
  };
  return (
    <section className="studio-section studio-v4 studio-compact">
      <div className="studio-heading">
        <div>
          <h1>{testScan ? t("Explore your scan.", "Eksploroni skanimin tuaj.") : t("Build your bag.", "Krijoni çantën tuaj.")}</h1>
          <p>
            {t(
              testScan ? "Your uploaded model. Rotate, zoom and explore." : "Choose a shape. Drag your artwork. Turn it around.",
              testScan ? "Modeli juaj i ngarkuar. Rrotullojeni, zmadhojeni dhe eksplorojeni." : "Zgjidhni formën. Lëvizni dizajnin. Rrotullojeni.",
            )}
          </p>
        </div>
        {!testScan && <div className="studio-heading-note">
          <span className="pill">
            {t("WHOLESALE FROM ", "ME SHUMICË NGA ") +
              minimum.toLocaleString() +
              t(" BAGS", " ÇANTA")}
          </span>
          <span>
            {t("Made in Kosova", "Prodhuar në Kosovë")}
          </span>
        </div>}
      </div>
      {!cms.products.some(p=>p.slug===design.product)&&<p role="status" className="notice">{t("This bag is currently unavailable. Choose another shape below; your artwork is kept.","Kjo çantë aktualisht nuk është e disponueshme. Zgjidhni një formë tjetër; dizajni juaj ruhet.")}</p>}
      <div className="studio">
        <div className="preview-column">
          <div className="bag-picker">
            {cms.products.map((b) => (
              <button
                key={b.slug}
                className={!testScan && b.slug === p.slug ? "bag-pick selected" : "bag-pick"}
                onClick={() => {
                  chooseTestScan(false);
                  update({ product: b.slug, size: cms.options(b.slug)?.activeSizes?.[0] || b.variants[0].name, color: preferredBagColor(cms.options(b.slug)?.colors, design.color), printColors: Math.min(design.printColors, cms.options(b.slug)?.printColors || 4) });
                }}
                aria-pressed={!testScan && b.slug === p.slug}
                aria-label={b.name.replace(" Bag", "")}
              >
                <BagPreview design={pickerDesigns[b.slug]} compact />
                <span>{b.name.replace(" Bag", "")}</span>
                {!testScan && b.slug === p.slug && <Check size={12} />}
              </button>
            ))}
            <button type="button" className={testScan ? "bag-pick scan-pick selected" : "bag-pick scan-pick"} aria-pressed={testScan} aria-label={t("3D test — coffee scan", "Test 3D — skanimi i kafesë")} onClick={() => chooseTestScan(true)}>
              <span className="scan-pick-icon"><Coffee size={26}/></span><span>{t("3D test", "Test 3D")}</span>{testScan && <Check size={12}/>}
            </button>
          </div>
          {testScan ? <ImportedScan/> : <>
          <div className="studio-history">
              <div role="group"
                className="view-mode-tabs"
                aria-label={t("Preview mode", "Pamja e parapamjes")}
              >
                <button type="button" aria-pressed={viewMode === "3d"} data-state={viewMode === "3d" ? "active" : "inactive"} onClick={() => setViewMode("3d")}>
                  <Box size={15} />
                  {t("3D view", "Pamja 3D")}
                </button>
                <button type="button" aria-pressed={viewMode === "edit"} data-state={viewMode === "edit" ? "active" : "inactive"} onClick={() => setViewMode("edit")}>
                  <Move size={15} />
                  {t("Photo + artwork", "Foto + dizajn")}
                </button>
              </div>
            <div>
              <button
                type="button"
                disabled={
                  !historyAvailable.undo || uploading || backgroundBusy
                }
                onClick={() => travel("past")}
                aria-label={t("Undo change", "Zhbëj ndryshimin")}
              >
                <Undo2 size={16} />
                {t("Undo", "Zhbëj")}
              </button>
              <button
                type="button"
                disabled={
                  !historyAvailable.redo || uploading || backgroundBusy
                }
                onClick={() => travel("future")}
                aria-label={t("Redo change", "Ribëj ndryshimin")}
              >
                <Redo2 size={16} />
                {t("Redo", "Ribëj")}
              </button>
            </div>
          </div>
          <div className="preview-stage">
            <div className="stage-top">
              <span>
                {p.name} <span className="subtle">/ {displaySize}</span>
              </span>
              <button
                className="icon-button"
                ref={enlargeButton}
                onClick={() => setFull(true)}
                aria-label={t("Enlarge preview", "Zmadho pamjen")}
              >
                <Maximize2 size={18} />
              </button>
            </div>
            {viewMode === "3d" ? (
              <Studio3D
                key={design.product}
                design={design}
                onReady={setPreviewReady}
                {...studioEditing}
              />
            ) : (
              <BagPreview
                design={design}
                onChange={update}
                activeLayer={activeLayer}
                onSelectLayer={selectArtwork}
                onDragChange={artworkDrag}
                canvasRef={canvas}
                guides={guides && tab === "artwork"}
                onReady={setPreviewReady}
              />
            )}
            <div className="stage-bottom">
                <div role="group" className="side-switch" aria-label={t("Bag side", "Ana e çantës")}>
                  <button type="button" aria-pressed={design.side === "front"} data-state={design.side === "front" ? "active" : "inactive"} onClick={() => { setTextLimitNotice(false); update({ side: "front" }); setViewKey((key) => key + 1); }}>
                    {t("Front", "Përpara")}
                    {sides.includes("front") && (
                      <Check size={13} aria-hidden="true" />
                    )}
                  </button>
                  <button type="button" aria-pressed={design.side === "back"} data-state={design.side === "back" ? "active" : "inactive"} onClick={() => { setTextLimitNotice(false); update({ side: "back" }); setViewKey((key) => key + 1); }}>
                    {t("Back", "Prapa")}
                    {sides.includes("back") && (
                      <Check size={13} aria-hidden="true" />
                    )}
                  </button>
                </div>
              <span className="drag-tip">
                <Move size={14} />
                {t(
                  viewMode === "3d"
                    ? "Drag artwork to move · drag bag to rotate"
                    : "Drag artwork to position",
                  viewMode === "3d"
                    ? "Lëvizni dizajnin · tërhiqni çantën për rrotullim"
                    : "Lëvizni dizajnin për ta pozicionuar",
                )}
              </span>
              <button
                className="studio-download"
                onClick={download}
                disabled={!previewReady || exporting}
                aria-label={t("Download design preview", "Shkarko parapamjen")}
              >
                {downloaded ? <Check size={17} /> : <Download size={17} />}
                <span>
                  {exporting
                    ? t("Preparing…", "Duke përgatitur…")
                    : downloaded
                      ? t("Downloaded", "U shkarkua")
                      : t("Download", "Shkarko")}
                </span>
              </button>
            </div>
          </div>
          {downloaded && (
            <p className="saved-feedback" role="status">
              {t("Preview download started:", "Shkarkimi i parapamjes filloi:")}{" "}
              {downloaded}
            </p>
          )}
          <div className="studio-spec-line">
            <span>
              {v.dimensions} · {v.gsm} GSM · {t("Non-woven PP", "PP jo i endur")}
            </span>
            <span>{displayColor}</span>
          </div>
          <div className="studio-real-samples">
            <div className="studio-real-samples-copy">
              <strong>{t("Real bags from our production", "Çanta reale nga prodhimi ynë")}</strong>
              <span>{t("See material, stitching and shape", "Shihni materialin, qepjet dhe formën")}</span>
            </div>
            <div className="studio-real-samples-images">
              {[p.image, productMedia[p.slug].home, ...(p.slug === "d-cut-bag" ? [] : [productMedia[p.slug].detail])].map((src, index) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setSamplePhoto(src)}
                  aria-label={t(`View real ${p.name} sample ${index + 1}`, `Shihni mostrën reale ${index + 1} të ${p.name}`)}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
          <Dialog open={Boolean(samplePhoto)} onOpenChange={(open) => !open && setSamplePhoto(null)}>
            <DialogContent className="studio-sample-dialog">
              <DialogTitle>{t("A real bag made by Kobags", "Çantë reale e prodhuar nga Kobags")}</DialogTitle>
              <DialogDescription>
                {t("Explore the material, stitching and shape of a bag made by Kobags.", "Shihni materialin, qepjet dhe formën e një çante të prodhuar nga Kobags.")}
              </DialogDescription>
              {samplePhoto && <img src={samplePhoto} alt={t(`Real ${p.name} product sample`, `Mostër reale e ${p.name}`)} />}
            </DialogContent>
          </Dialog>
          <button
            type="button"
            className="studio-sheet-download"
            onClick={downloadSheet}
            disabled={!previewReady || exporting}
          >
            <Download size={16} />
            <span>
              {exporting
                ? t("Preparing…", "Duke përgatitur…")
                : t(
                    "Download both sides + specifications",
                    "Shkarko të dyja anët + specifikimet",
                  )}
            </span>
            <ArrowUpRight size={15} />
          </button>
          </>}
        </div>
        {testScan ? <aside className="scan-info section-card">
          <p className="eyebrow">{t("UPLOADED 3D MODEL", "MODEL 3D I NGARKUAR")}</p>
          <h2>{t("Your scan. Every angle.", "Skanimi juaj. Nga çdo kënd.")}</h2>
          <p>{t("A coffee scan, added here to test how real scanned products look in the studio.", "Një skanim kafeje, i shtuar për të testuar pamjen e produkteve të skanuara në studio.")}</p>
          <dl><div><dt>{t("Surface", "Sipërfaqja")}</dt><dd>{t("Scanned texture · repaired shape", "Teksturë skanimi · formë e riparuar")}</dd></div><div><dt>{t("Explore", "Eksploroni")}</dt><dd>360°</dd></div></dl>
          <p className="micro">{t("Test model only. Choose a bag above to continue designing and request a quote.", "Vetëm model testues. Zgjidhni një çantë sipër për të vazhduar dizajnin dhe për të kërkuar ofertë.")}</p>
          <button type="button" className="button" onClick={() => chooseTestScan(false)}>{t("Back to your bag", "Kthehu te çanta juaj")}<ArrowRight size={16}/></button>
        </aside> : <section className="studio-controls" aria-label={t("Customize your bag", "Personalizoni çantën")}>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="editor-tabs">
              <TabsTrigger value="bag">
                01 <span>{t("The bag", "Çanta")}</span>
              </TabsTrigger>
              <TabsTrigger value="artwork">
                02 <span>{t("Your design", "Dizajni juaj")}</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bag" className="editor-body">
              <Choice
                id="bag-size"
                label={t("Bag size", "Madhësia e çantës")}
                value={design.size}
                onChange={(size) => update({ size })}
                options={p.variants.filter(v=>!available?.activeSizes||available.activeSizes.includes(v.name)).map((v) => ({
                  value: v.name,
                  label: `${t(v.name, sizeSq[v.name])} · ${v.dimensions}`,
                }))}
              />
              <div className="field">
                <div className="field-title">
                  <label>{t("Bag color", "Ngjyra e çantës")}</label>
                  <span>
                    {t(
                      design.color,
                      colors.find((c) => c.name === design.color)?.sq,
                    )}
                  </span>
                </div>
                <div
                  className="swatches"
                  role="group"
                  aria-label={t("Bag color", "Ngjyra e çantës")}
                >
                  {colors.filter(c=>!available?.colors||available.colors.includes(c.name)).map((c) => (
                    <button
                      key={c.name}
                      className={
                        design.color === c.name ? "swatch selected" : "swatch"
                      }
                      style={{ background: c.hex }}
                      aria-label={t(c.name, c.sq)}
                      aria-pressed={design.color === c.name}
                      title={t(c.name, c.sq)}
                      onClick={() => update({ color: c.name })}
                    >
                      {design.color === c.name && (
                        <Check
                          size={16}
                          color={
                            ["Natural", "White"].includes(c.name)
                              ? "#193b67"
                              : "white"
                          }
                        />
                      )}
                    </button>
                  ))}
                </div>
                <small>
                  {t(
                    "Color options are indicative; availability is confirmed with your quote.",
                    "Ngjyrat janë orientuese; disponueshmëria konfirmohet me ofertën.",
                  )}
                </small>
              </div>
              <div className="spec-mini">
                <div>
                  <Package size={17} />
                  <span>
                    {t("Material", "Materiali")}
                    <strong>{t("Non-woven PP", "PP jo i endur")}</strong>
                  </span>
                </div>
                <div>
                  <ShieldCheck size={17} />
                  <span>
                    {t("Fabric weight", "Pesha e materialit")}
                    <strong>{v.gsm} g/m²</strong>
                  </span>
                </div>
              </div>
              <div className="studio-print-plan">
                <Choice
                  id="studio-print-colors"
                  label={t(
                    "Print colors to quote",
                    "Ngjyrat e shtypit për ofertë",
                  )}
                  value={String(design.printColors)}
                  onChange={(value) => update({ printColors: Number(value) })}
                  options={[1, 2, 3, 4].filter(n => n <= (available?.printColors || 4)).map((count) => ({
                    value: String(count),
                    label: `${count} ${t(count === 1 ? "color" : "colors", count === 1 ? "ngjyrë" : "ngjyra")}`,
                  }))}
                />
                <p>
                  {t(
                    "Up to 4 print colors. The bag color doesn’t count.",
                    "Zgjidhni ngjyrat e shtypit që prisni të përdorni, pa ngjyrën e çantës. Numri dhe zona e shtypit konfirmohen me dizajnin tuaj.",
                  )}
                </p>
              </div>
              <details className="studio-custom-request">
                <summary>
                  {t(
                    "Need a custom size?",
                    "Ju duhet madhësi e personalizuar?",
                  )}
                </summary>
                <label htmlFor="studio-custom-size">
                  {t("Requested dimensions", "Përmasat e kërkuara")}
                </label>
                <input
                  id="studio-custom-size"
                  maxLength={100}
                  value={design.customDimensions}
                  placeholder="e.g. 40 × 35 × 12 cm"
                  onChange={(e) => update({ customDimensions: e.target.value })}
                />
                <p>
                  {t(
                    "We’ll review feasibility with your quote. The preview illustrates the bag shape; selected dimensions are listed below it.",
                    "Realizueshmëria shqyrtohet me ofertën. Parapamja ilustron formën e çantës; përmasat e zgjedhura shënohen poshtë saj.",
                  )}
                </p>
              </details>
              <button
                className="button design-next"
                onClick={() => setTab("artwork")}
              >
                {t("Next: add your design", "Vazhdoni: shtoni dizajnin")}{" "}
                <ArrowRight size={15} />
              </button>
            </TabsContent>
            <TabsContent value="artwork" className="editor-body artwork-editor">
              <div className="editing-side">
                <span>
                  <SlidersHorizontal size={16} />
                  {t(
                    back ? "Editing the back" : "Editing the front",
                    back
                      ? "Duke ndryshuar pjesën prapa"
                      : "Duke ndryshuar pjesën përpara",
                  )}
                </span>
                <button
                  type="button"
                  className="text-button flip-edit-side"
                  onClick={() => {
                    setTextLimitNotice(false);
                    update({ side: back ? "front" : "back" });
                  }}
                >
                  {t(
                    back ? "Edit front" : "Edit back",
                    back ? "Ndrysho përpara" : "Ndrysho prapa",
                  )}
                  <ArrowRight size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setGuides(!guides)}
                  className="guide-toggle"
                  aria-label={t(
                    "Toggle artwork guides",
                    "Aktivizo udhëzuesit e dizajnit",
                  )}
                  aria-pressed={guides}
                >
                  {guides ? <Eye size={17} /> : <EyeOff size={17} />}
                </button>
              </div>
              <div
                className="layer-selector"
                role="group"
                aria-label={t(
                  "Select artwork layer",
                  "Zgjidhni shtresën e dizajnit",
                )}
              >
                <button
                  type="button"
                  aria-pressed={activeLayer === "logo"}
                  onClick={() => selectArtwork("logo")}
                >
                  <ImagePlus size={17} />
                  <span>
                    {t("Logo", "Logo")}
                    <small>
                      {art.logo
                        ? t("Select & position", "Zgjidhni dhe poziciononi")
                        : t("Add an image", "Shtoni një imazh")}
                    </small>
                  </span>
                </button>
                <button
                  type="button"
                  aria-pressed={activeLayer === "text"}
                  onClick={() => selectArtwork("text")}
                >
                  <Type size={17} />
                  <span>
                    {t("Text", "Tekst")}
                    <small>
                      {t("Your name or message", "Emri ose mesazhi juaj")}
                    </small>
                  </span>
                </button>
              </div>
              {activeLayer === "logo" && (
                <>
                  {art.logo ? (
                    <div className="artwork-file">
                      <div className="artwork-file-thumb">
                        <img
                          src={art.logo}
                          alt={t("Your uploaded artwork", "Dizajni i ngarkuar")}
                        />
                      </div>
                      <div>
                        <strong>
                          {art.name || t("Uploaded logo", "Logo e ngarkuar")}
                        </strong>
                        <span>
                          <CheckCircle2 size={13} />
                          {t("Ready to place", "Gati për pozicionim")}
                        </span>
                        <button
                          className="text-button"
                          onClick={() => fileRef.current?.click()}
                          disabled={uploading || backgroundBusy}
                        >
                          {t("Replace logo", "Zëvendëso logon")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="upload-zone short artwork-upload"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading || backgroundBusy}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        upload(e.dataTransfer.files[0]);
                      }}
                    >
                      <ImagePlus size={25} />
                      <strong>
                        {uploading
                          ? t("Preparing your logo…", "Duke përgatitur logon…")
                          : t(
                              "Upload or drop your logo",
                              "Ngarkoni ose hidhni logon",
                            )}
                      </strong>
                      <span>PNG, JPG, WebP · 5 MB</span>
                    </button>
                  )}
                  {art.logo && (
                    <div className="studio-logo-cleanup">
                      <button
                        type="button"
                        className="text-button"
                        disabled={uploading || backgroundBusy}
                        onClick={() => {
                          if (canRestoreBackground && backgroundEdit) {
                            update(
                              back
                                ? { backLogo: backgroundEdit.original }
                                : { logo: backgroundEdit.original },
                            );
                            setBackgroundNotice(null);
                          } else void removeWhiteBackground();
                        }}
                      >
                        {canRestoreBackground ? (
                          <RotateCcw size={16} />
                        ) : (
                          <Eraser size={16} />
                        )}
                        {backgroundBusy
                          ? t("Removing background…", "Duke hequr sfondin…")
                          : canRestoreBackground
                            ? t(
                                "Restore original background",
                                "Rikthe sfondin origjinal",
                              )
                            : t(
                                "Remove white background",
                                "Hiq sfondin e bardhë",
                              )}
                      </button>
                      <p>
                        {t(
                          "For logos on a white background. Check light details after removal; you can undo it here.",
                          "Për logo me sfond të bardhë. Kontrolloni detajet e çelëta pas heqjes; këtu mund ta zhbëni.",
                        )}
                      </p>
                      {backgroundNotice?.source === art.logo && (
                        <p role="status">
                          {backgroundNotice.message === "empty"
                            ? t(
                                "This would remove the whole logo. Your original has been kept.",
                                "Kjo do ta hiqte të gjithë logon. Origjinali u ruajt.",
                              )
                            : t(
                                "No white background was found at the edges. Your logo is unchanged.",
                                "Nuk u gjet sfond i bardhë në skaje. Logoja nuk u ndryshua.",
                              )}
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
              {activeLayer === "text" && (
                <>
                  <div className="field">
                    <label htmlFor="brand-text">
                      {t("Brand name or message", "Emri i markës ose mesazhi")}
                    </label>
                    <textarea
                      id="brand-text"
                      rows={2}
                      maxLength={MAX_BRAND_TEXT_LENGTH}
                      value={art.text}
                      placeholder={t("Your brand name", "Emri i markës suaj")}
                      onChange={(e) => {
                        const limitedText = e.currentTarget.value.slice(0, MAX_BRAND_TEXT_LENGTH);
                        setTextLimitNotice(e.currentTarget.value.length > MAX_BRAND_TEXT_LENGTH);
                        if (e.currentTarget.value !== limitedText) e.currentTarget.value = limitedText;
                        setError("");
                        setActiveLayer("text");
                        update({
                          ...(art.logo ? enableLayers(design) : {}),
                          ...(back
                            ? { backText: limitedText }
                            : { text: limitedText }),
                        });
                      }}
                    />
                    <div className="text-field-help">
                      <span>
                        {t(
                          "60-character limit",
                          "Maksimumi 60 karaktere",
                        )}
                      </span>
                      <span>{art.text.length}/{MAX_BRAND_TEXT_LENGTH}</span>
                    </div>
                    {textLimitNotice && (
                      <p className="text-limit-warning" role="status">
                        {t("Extra text was removed.", "Teksti shtesë u hoq.")}
                      </p>
                    )}
                  </div>
                </>
              )}
              {activeLayer === "text" && (
                <>
                  <Choice
                    id="artwork-font"
                    label={t("Typeface", "Shkronjat")}
                    value={art.font}
                    onChange={(value) =>
                      update(
                        back
                          ? { backTextFont: value as Design["backTextFont"] }
                          : { textFont: value as Design["textFont"] },
                      )
                    }
                    options={artworkFonts.map((f) => ({
                      value: f.value,
                      label: f.label,
                    }))}
                  />
                  <div className="text-format-row">
                    <div
                      className="text-align-buttons"
                      role="group"
                      aria-label={t("Text alignment", "Rreshtimi i tekstit")}
                    >
                      {(
                        [
                          ["left", AlignLeft],
                          ["center", AlignCenter],
                          ["right", AlignRight],
                        ] as const
                      ).map(([align, Icon]) => (
                        <button
                          key={align}
                          aria-label={t("Align text " + align, "Rreshto tekstin " + ({ left: "majtas", center: "në qendër", right: "djathtas" } as const)[align])}
                          aria-pressed={art.align === align}
                          onClick={() =>
                            update(
                              back
                                ? { backTextAlign: align }
                                : { textAlign: align },
                            )
                          }
                        >
                          <Icon size={18} />
                        </button>
                      ))}
                    </div>
                    <label className="ink-control" htmlFor="ink">
                      <span>{t("Text color", "Ngjyra e tekstit")}</span>
                      <input
                        type="color"
                        id="ink"
                        value={art.ink}
                        onChange={(e) =>
                          update(
                            back
                              ? { backInk: e.target.value }
                              : { ink: e.target.value },
                          )
                        }
                      />
                    </label>
                  </div>
                </>
              )}
              <div className="artwork-transform">
                <div className="transform-heading">
                  <h2>
                    {activeLayer === "logo"
                      ? t("Logo placement", "Pozicioni i logos")
                      : t("Text placement", "Pozicioni i tekstit")}
                  </h2>
                  <button
                    className="text-button"
                    onClick={() => transform({ x: 50, y: 56, rotation: 0 })}
                  >
                    <RotateCcw size={14} />
                    {t("Center artwork", "Qendro dizajnin")}
                  </button>
                </div>
                <div className="range-field">
                  <div className="field-title">
                    <label id="scale-label">
                      {t("Artwork size", "Madhësia e dizajnit")}
                    </label>
                    <span>{art.scale}%</span>
                  </div>
                  <Slider
                    aria-labelledby="scale-label"
                    min={10}
                    max={55}
                    step={1}
                    value={[art.scale]}
                    onValueChange={([scale]) => transform({ scale })}
                  />
                </div>
                <details className="precision-details">
                  <summary>
                    {t("Position & rotation", "Pozicioni dhe rrotullimi")}
                  </summary>
                  <div className="precision-grid">
                    <label>
                      {t("Horizontal", "Horizontalisht")}
                      <span>
                        <PrecisionInput
                          min={24}
                          max={76}
                          value={art.x}
                          label={t(
                            "Horizontal position",
                            "Pozicioni horizontal",
                          )}
                          onChange={(n) => setArtworkPosition("x", n)}
                        />
                        <small>%</small>
                      </span>
                    </label>
                    <label>
                      {t("Vertical", "Vertikalisht")}
                      <span>
                        <PrecisionInput
                          min={33}
                          max={80}
                          value={art.y}
                          label={t("Vertical position", "Pozicioni vertikal")}
                          onChange={(n) => setArtworkPosition("y", n)}
                        />
                        <small>%</small>
                      </span>
                    </label>
                    <label>
                      {t("Rotation", "Rrotullimi")}
                      <span>
                        <PrecisionInput
                          min={-45}
                          max={45}
                          value={art.rotation}
                          label={t("Artwork rotation", "Rrotullimi i dizajnit")}
                          onChange={(rotation) => transform({ rotation })}
                        />
                        <small>°</small>
                      </span>
                    </label>
                  </div>
                </details>
              </div>
              <div className="artwork-actions">
                <p>
                  {t(
                    "Select your logo or text on the bag, then drag to move it.",
                    "Zgjidhni logon ose tekstin në çantë, pastaj tërhiqeni për ta lëvizur.",
                  )}
                </p>
                <button
                  className="text-button remove-artwork"
                  onClick={() =>
                    update(
                      activeLayer === "logo"
                        ? back
                          ? { backLogo: "", backLogoName: "" }
                          : { logo: "", logoName: "" }
                        : back
                          ? { backText: "" }
                          : { text: "" },
                    )
                  }
                >
                  <Trash2 size={15} />
                  {t("Remove selected", "Hiq të zgjedhurën")}
                </button>
              </div>
              <button
                type="button"
                className="copy-artwork"
                disabled={!art.logo && !art.text.trim()}
                onClick={() => {
                  update(copyArtworkToOtherSide(design));
                  setCopied(true);
                }}
              >
                <Copy size={16} />
                {t(
                  back ? "Copy design to front" : "Copy design to back",
                  back ? "Kopjo dizajnin përpara" : "Kopjo dizajnin prapa",
                )}
              </button>
              <p className="micro">
                {t(
                  "Replaces the other side’s artwork. Undo is available.",
                  "Zëvendëson dizajnin në anën tjetër. Mund ta zhbëni.",
                )}
              </p>
              {copied && (
                <p role="status" className="micro">
                  {t(
                    "Artwork copied to the other side.",
                    "Dizajni u kopjua në anën tjetër.",
                  )}
                </p>
              )}
            </TabsContent>
          </Tabs>
          <input
            ref={fileRef}
            type="file"
            className="sr-only"
            accept="image/png,image/jpeg,image/webp"
            aria-label={t("Upload logo", "Ngarko logon")}
            disabled={uploading || backgroundBusy}
            onChange={(e) => {
              upload(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <div className="studio-quote">
            <div>
              <span>{t("Wholesale orders", "Porosi me shumicë")}</span>
              <strong>
                {t("From ", "Nga ") +
                  minimum.toLocaleString() +
                  t(" bags", " çanta")}
              </strong>
            </div>
            {uploading || backgroundBusy ? <button className="button" disabled aria-busy="true">{t("Preparing artwork…", "Duke përgatitur dizajnin…")}</button> : <Link href="/quote" className="button">
              {t("Get a quote for this bag", "Kërkoni ofertë për këtë çantë")}{" "}
              <ArrowUpRight size={18} />
            </Link>}
            <p>
              {t(
                "No payment now. Your design goes with your request.",
                "Pa pagesë tani. Dizajni dërgohet me kërkesën.",
              )}
            </p>
          </div>
        </section>}
      </div>
      {!testScan && <div className="studio-footnote">
        <span>
          <ShieldCheck size={15} />
          {t(
            "Artwork approval before production",
            "Miratim i dizajnit para prodhimit",
          )}
        </span>
        <Link href="/samples">
          {t("Request material samples", "Kërkoni mostra materiali")}
          <ArrowUpRight size={14} />
        </Link>
      </div>}
      <Dialog open={full} onOpenChange={setFull}>
        <DialogContent
          className="preview-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            enlargeButton.current?.focus();
          }}
        >
          <DialogTitle>
            {p.name} · {displayColor}
          </DialogTitle>
          <DialogDescription>
            {t(
              "Your design preview. Indicative only.",
              "Parapamja e dizajnit tuaj. Vetëm orientuese.",
            )}
          </DialogDescription>
          <div className="fullscreen-studio-view">
            {viewMode === "3d" ? (
              <Studio3D key={design.product} design={design} {...studioEditing} />
            ) : (
              <BagPreview design={design} onChange={update} activeLayer={activeLayer} onSelectLayer={selectArtwork} onDragChange={artworkDrag} guides={guides && tab === "artwork"} />
            )}
          </div>
          <button
            className="button"
            onClick={download}
            disabled={exporting || !previewReady}
          >
            {downloaded ? <Check size={16} /> : <Download size={16} />}{" "}
            {exporting
              ? t("Preparing…", "Duke përgatitur…")
              : t("Download preview", "Shkarko parapamjen")}
          </button>
          {downloaded && (
            <p className="micro" role="status">
              {t("Preview download started:", "Shkarkimi i parapamjes filloi:")}{" "}
              {downloaded}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
