"use client";
import { useRef, useState } from "react";
import Link from "@/components/site-link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  Upload,
  Move,
  RotateCcw,
  Maximize2,
  Package,
  ShieldCheck,
  Info,
  ImagePlus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  SlidersHorizontal,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Eraser,
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
import { sideArtwork, artworkFonts } from "@/lib/studio-artwork";
import { artworkSides, inkContrast, readableInk, clearWhiteBackground } from "@/lib/studio-checks";
import { useDemo } from "./demo-store";
import {
  products,
  colors,
  Design,
  getProduct,
  initialDesign,
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
      <Select value={value} onValueChange={onChange}>
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
  const { design, update, t } = useKobags();
  const p = getProduct(design.product);
  const v = p.variants.find((v) => v.name === design.size) || p.variants[0];
  const [tab, setTab] = useState("bag");
  const [error, setError] = useState("");
  const [full, setFull] = useState(false);
  const [downloaded, setDownloaded] = useState("");
  const [exporting, setExporting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [guides, setGuides] = useState(true);
  const art = sideArtwork(design);
  const sides = artworkSides(design);
  const fabric = colors.find((c) => c.name === design.color) || colors[0];
  const lowContrast = !art.logo && !!art.text.trim() && inkContrast(art.ink, fabric.hex) < 3;
  const [backgroundBusy, setBackgroundBusy] = useState(false);
  const [backgroundEdits, setBackgroundEdits] = useState<Partial<Record<Design["side"], { original: string; cleaned: string }>>>({});
  const [backgroundNotice, setBackgroundNotice] = useState<{ source: string; message: "unchanged" | "empty" } | null>(null);
  const latestDesign = useRef(design);
  latestDesign.current = design;
  const backgroundEdit = backgroundEdits[design.side];
  const canRestoreBackground = backgroundEdit?.cleaned === art.logo && !!art.logo;
  const { state } = useDemo();
  const minimum = state?.settings.moq || 5000;
  const setArtworkPosition = (axis: "x" | "y", value: number) => {
    if (!Number.isFinite(value)) return;
    const clamped = Math.max(
      axis === "x" ? 24 : 33,
      Math.min(axis === "x" ? 76 : 80, value),
    );
    update(
      art.back
        ? axis === "x"
          ? { backX: clamped }
          : { backY: clamped }
        : axis === "x"
          ? { x: clamped }
          : { y: clamped },
    );
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
      update(
        uploadToBack
          ? {
              backLogo: image,
              backText: "",
              backLogoName: file.name.slice(0, 150),
            }
          : { logo: image, text: "", logoName: file.name.slice(0, 150) },
      );
      setTab("artwork");
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
      if (!image.naturalWidth || image.naturalWidth > 1024 || image.naturalHeight > 1024)
        throw Error("IMAGE_TOO_LARGE");
      const output = document.createElement("canvas");
      output.width = image.naturalWidth;
      output.height = image.naturalHeight;
      const ctx = output.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(image, 0, 0);
      const pixels = ctx.getImageData(0, 0, output.width, output.height);
      const removed = clearWhiteBackground(pixels.data, output.width, output.height);
      let visible = false;
      for (let i = 3; i < pixels.data.length; i += 4)
        if (pixels.data[i] > 0) { visible = true; break; }
      // Do not replace artwork changed while the image was being decoded.
      if ((side === "back" ? latestDesign.current.backLogo : latestDesign.current.logo) !== source) return;
      if (!removed || !visible) {
        setBackgroundNotice({ source, message: visible ? "unchanged" : "empty" });
        return;
      }
      ctx.putImageData(pixels, 0, 0);
      let cleaned = output.toDataURL("image/png");
      if (cleaned.length > 100000) cleaned = output.toDataURL("image/webp", 0.94);
      if (cleaned.length > 100000) throw Error("IMAGE_TOO_LARGE");
      setBackgroundEdits((previous) => ({ ...previous, [side]: { original: source, cleaned } }));
      update(side === "back" ? { backLogo: cleaned } : { logo: cleaned });
    } catch {
      setError(t(
        "The background could not be removed. Your original logo is unchanged.",
        "Sfondi nuk mund të hiqej. Logoja origjinale nuk u ndryshua.",
      ));
    } finally {
      setBackgroundBusy(false);
    }
  };
  const contrastHint = lowContrast ? (
    <div className="studio-contrast-hint" role="status">
      <AlertTriangle size={18} />
      <div>
        <strong>{t("Your text may be hard to see", "Teksti mund të jetë i vështirë për t’u parë")}</strong>
        <p>{t(
          back ? "The back text is close to the bag color." : "The front text is close to the bag color.",
          back ? "Teksti prapa është i ngjashëm me ngjyrën e çantës." : "Teksti përpara është i ngjashëm me ngjyrën e çantës.",
        )}</p>
        <button type="button" className="text-button" onClick={() => {
          const ink = readableInk(fabric.hex);
          update(back ? { backInk: ink } : { ink });
        }}>
          {t("Use a clearer text color", "Përdorni një ngjyrë më të qartë")}
        </button>
      </div>
    </div>
  ) : null;
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
      ctx.fillText("KOBAGS / YOUR DESIGN CONCEPT", 65, 1635);
      ctx.font = "24px Arial";
      ctx.fillText(
        `${p.name} · ${design.size} · ${design.color} · ${back ? "Back" : "Front"}`,
        65,
        1685,
      );
      ctx.fillStyle = "#62717b";
      ctx.font = "22px Arial";
      ctx.fillText(`${v.dimensions} · ${v.gsm} GSM · Non-woven PP`, 65, 1725);
      ctx.font = "20px Arial";
      ctx.fillText(
        "Illustrative preview. Final shape, color and print placement require production approval.",
        65,
        1780,
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
  return (
    <section className="studio-section studio-v4">
      <div className="studio-heading">
        <div>
          <p className="eyebrow">
            <span className="tiny-rule" />
            {t("THE KOBAGS BAG STUDIO", "STUDIOJA E ÇANTAVE KOBAGS")}
          </p>
          <h1>
            {t("Your brand.", "Marka juaj.")}{" "}
            <span>{t("Your bag.", "Çanta juaj.")}</span>
          </h1>
          <p>
            {t(
              "Choose your bag, add your artwork and make every detail yours.",
              "Zgjidhni çantën, shtoni dizajnin dhe personalizoni çdo detaj.",
            )}
          </p>
        </div>
        <div className="studio-heading-note">
          <span className="pill">
            {t("WHOLESALE FROM ", "ME SHUMICË NGA ") + minimum.toLocaleString() + t(" BAGS", " ÇANTA")}
          </span>
          <span>
            {t("Made in Lipjan, Kosovo", "Prodhuar në Lipjan, Kosovë")}
          </span>
        </div>
      </div>
      <div className="studio-brief" aria-label={t("Before you design", "Para se të dizajnoni")}>
        <span><Package size={17} />{t("5 bag shapes · 15 sizes", "5 forma çantash · 15 madhësi")}</span>
        <span>{t("Flexographic print · up to 4 colors", "Shtyp fleksografik · deri në 4 ngjyra")}</span>
        <Link href="/samples">{t("Feel the material: request samples", "Prekni materialin: kërkoni mostra")}<ArrowUpRight size={15} /></Link>
      </div>
      <div className="studio">
        <div className="preview-column">
          <div className="bag-picker">
            {products.map((b) => (
              <button
                key={b.slug}
                className={b.slug === p.slug ? "bag-pick selected" : "bag-pick"}
                onClick={() =>
                  update({ product: b.slug, size: b.variants[0].name })
                }
                aria-pressed={b.slug === p.slug}
                aria-label={b.name.replace(" Bag", "")}
              >
                <BagPreview design={pickerDesigns[b.slug]} compact />
                <span>{b.name.replace(" Bag", "")}</span>
                {b.slug === p.slug && <Check size={12} />}
              </button>
            ))}
          </div>
          <div className="preview-stage">
            <div className="stage-top">
              <span>
                {p.name} <span className="subtle">/ {design.size}</span>
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
            <BagPreview
              design={design}
              onChange={update}
              canvasRef={canvas}
              guides={guides && tab === "artwork"}
              onReady={setPreviewReady}
            />
            <div className="stage-artwork-side">
              {t(
                back ? "BACK ARTWORK" : "FRONT ARTWORK",
                back ? "DIZAJNI PRAPA" : "DIZAJNI PËRPARA",
              )}
            </div>
            <div className="stage-label">
              <span>NON-WOVEN PP</span>
              <span>
                {v.gsm} GSM · {v.dimensions}
              </span>
            </div>
            <div className="stage-bottom">
              <Tabs
                value={design.side}
                onValueChange={(s) => update({ side: s as "front" | "back" })}
              >
                <TabsList className="side-switch">
                  <TabsTrigger value="front">
                    {t("Front", "Përpara")}
                    {sides.includes("front") && <Check size={13} aria-label={t("Artwork added", "Dizajni u shtua")} />}
                  </TabsTrigger>
                  <TabsTrigger value="back">
                    {t("Back", "Prapa")}
                    {sides.includes("back") && <Check size={13} aria-label={t("Artwork added", "Dizajni u shtua")} />}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <span className="drag-tip">
                <Move size={14} />
                {t(
                  "Drag your artwork to position",
                  "Lëvizni dizajnin për ta pozicionuar",
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
          <div className="studio-side-cards" aria-label={t("Artwork on each side", "Dizajni në secilën anë")}>
            {(["front", "back"] as const).map((side) => {
              const artwork = sideArtwork({ ...design, side });
              const hasArtwork = sides.includes(side);
              return (
                <button key={side} type="button" aria-pressed={design.side === side}
                  onClick={() => { update({ side }); setTab("artwork"); }}>
                  <span className="side-card-icon" aria-hidden="true">{hasArtwork ? <Check size={18} /> : <ImagePlus size={18} />}</span>
                  <span>
                    <strong>{t(side === "front" ? "Front" : "Back", side === "front" ? "Përpara" : "Prapa")}</strong>
                    <span>{hasArtwork
                      ? artwork.logo ? t("Logo added", "Logo e shtuar") : t("Brand text added", "Teksti i markës u shtua")
                      : t("Blank · add artwork", "Bosh · shtoni dizajnin")}</span>
                  </span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              );
            })}
          </div>
          <div className="preview-disclaimer">
            <Info size={14} />
            {t(
              "Visual concept only. Your final material, color and print placement are confirmed before production.",
              "Paraqitje ilustruese. Ngjyra, forma, shkalla dhe shtypi kërkojnë miratim.",
            )}
          </div>
        </div>
        <aside className="studio-controls">
          <div className="controls-heading">
            <span className="eyebrow">
              {t("LET’S MAKE IT YOURS", "TA PERSONALIZOJMË")}
            </span>
            <h2>{t("Make it your own.", "Personalizojeni sipas jush.")}</h2>
          </div>
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
                options={p.variants.map((v) => ({
                  value: v.name,
                  label: `${v.name} · ${v.dimensions}`,
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
                  {colors.map((c) => (
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
              {contrastHint}
              <div className="spec-mini">
                <div>
                  <Package size={17} />
                  <span>
                    {t("Material", "Materiali")}
                    <strong>Non-woven PP</strong>
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
              <button
                className="upload-zone"
                disabled={uploading || backgroundBusy}
                onClick={() => {
                  setTab("artwork");
                  fileRef.current?.click();
                }}
              >
                <span className="upload-icon">
                  <Upload size={21} />
                </span>
                <strong>
                  {uploading
                    ? t("Preparing your logo…", "Duke përgatitur logon…")
                    : art.logo
                      ? art.name || t("Your uploaded logo", "Logoja e ngarkuar")
                      : t("Add your logo", "Shtoni logon tuaj")}
                </strong>
                <span>
                  {t(
                    "PNG, JPG or WebP · up to 5 MB",
                    "PNG, JPG ose WebP · deri 5 MB",
                  )}
                </span>
              </button>
              <button
                className="text-button design-next"
                onClick={() => setTab("artwork")}
              >
                {t(
                  "Or start with your brand name",
                  "Ose filloni me emrin e markës",
                )}{" "}
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
                  <button type="button" className="text-button" disabled={uploading || backgroundBusy}
                    onClick={() => {
                      if (canRestoreBackground && backgroundEdit) {
                        update(back ? { backLogo: backgroundEdit.original } : { logo: backgroundEdit.original });
                        setBackgroundNotice(null);
                      } else void removeWhiteBackground();
                    }}>
                    {canRestoreBackground ? <RotateCcw size={16} /> : <Eraser size={16} />}
                    {backgroundBusy ? t("Removing background…", "Duke hequr sfondin…")
                      : canRestoreBackground ? t("Restore original background", "Rikthe sfondin origjinal")
                      : t("Remove white background", "Hiq sfondin e bardhë")}
                  </button>
                  <p>{t(
                    "For logos on a white background. Check light details after removal; you can undo it here.",
                    "Për logo me sfond të bardhë. Kontrolloni detajet e çelëta pas heqjes; këtu mund ta zhbëni.",
                  )}</p>
                  {backgroundNotice?.source === art.logo && <p role="status">{backgroundNotice.message === "empty"
                    ? t("This would remove the whole logo. Your original has been kept.", "Kjo do ta hiqte të gjithë logon. Origjinali u ruajt.")
                    : t("No white background was found at the edges. Your logo is unchanged.", "Nuk u gjet sfond i bardhë në skaje. Logoja nuk u ndryshua.")}</p>}
                </div>
              )}
              <div className="artwork-divider">
                <span>{t("OR ADD TEXT", "OSE SHTONI TEKST")}</span>
              </div>
              <div className="field">
                <label htmlFor="brand-text">
                  {t("Or type your brand name", "Ose shkruani emrin e markës")}
                </label>
                <textarea
                  id="brand-text"
                  rows={3}
                  maxLength={60}
                  value={art.text}
                  placeholder={t("Your brand name", "Emri i markës suaj")}
                  onChange={(e) => {
                    setError("");
                    update(
                      back
                        ? {
                            backText: e.target.value,
                            backLogo: "",
                            backLogoName: "",
                          }
                        : { text: e.target.value, logo: "", logoName: "" },
                    );
                  }}
                />
                <div className="text-field-help">
                  <span>
                    {t(
                      "Short and clear works best.",
                      "Teksti i shkurtër është më i qartë.",
                    )}
                  </span>
                  <span>{art.text.length}/60</span>
                </div>
              </div>
              {!art.logo && (
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
                          aria-label={"Align text " + align}
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
              {contrastHint}
              <div className="artwork-transform">
                <div className="transform-heading">
                  <h3>{t("Size & placement", "Madhësia dhe pozicioni")}</h3>
                  <button
                    className="text-button"
                    onClick={() =>
                      update(
                        back
                          ? { backX: 50, backY: 56, backRotation: 0 }
                          : { x: 50, y: 56, rotation: 0 },
                      )
                    }
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
                    onValueChange={([scale]) =>
                      update(back ? { backScale: scale } : { scale })
                    }
                  />
                </div>
                <div className="precision-grid">
                  <label>
                    {t("Horizontal", "Horizontalisht")}
                    <span>
                      <PrecisionInput
                        min={24}
                        max={76}
                        value={art.x}
                        label={t("Horizontal position", "Pozicioni horizontal")}
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
                        onChange={(rotation) =>
                          update(
                            back ? { backRotation: rotation } : { rotation },
                          )
                        }
                      />
                      <small>°</small>
                    </span>
                  </label>
                </div>
              </div>
              <div className="artwork-actions">
                <p>
                  {t(
                    "Drag your artwork or use the arrow keys.",
                    "Lëvizni dizajnin ose përdorni shigjetat.",
                  )}
                </p>
                <button
                  className="text-button remove-artwork"
                  onClick={() =>
                    update(
                      back
                        ? { backLogo: "", backText: "", backLogoName: "" }
                        : { logo: "", text: "", logoName: "" },
                    )
                  }
                >
                  <Trash2 size={15} />
                  {t("Remove", "Hiq")}
                </button>
              </div>
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
          <div className="studio-print-plan">
            <Choice
              id="studio-print-colors"
              label={t("Print colors to quote", "Ngjyrat e shtypit për ofertë")}
              value={String(design.printColors)}
              onChange={(value) => update({ printColors: Number(value) })}
              options={[1, 2, 3, 4].map((count) => ({
                value: String(count),
                label: `${count} ${t(count === 1 ? "color" : "colors", count === 1 ? "ngjyrë" : "ngjyra")}`,
              }))}
            />
            <p>{t(
              "Select the inks you expect to use, excluding the bag color. We’ll confirm the count and print area with your artwork.",
              "Zgjidhni ngjyrat e shtypit që prisni të përdorni, pa ngjyrën e çantës. Numri dhe zona e shtypit konfirmohen me dizajnin tuaj.",
            )}</p>
          </div>
          <div className="studio-quote">
            <div>
              <span>{t("Wholesale orders", "Porosi me shumicë")}</span>
              <strong>
                {t("From ", "Nga ") +
                  minimum.toLocaleString() +
                  t(" bags", " çanta")}
              </strong>
            </div>
            <Link href="/quote" className="button">
              {t("Get a quote for this bag", "Kërkoni ofertë për këtë çantë")}{" "}
              <ArrowUpRight size={18} />
            </Link>
            <p>
              {t(
                "No payment now. Your design goes with your request.",
                "Pa pagesë tani. Dizajni dërgohet me kërkesën.",
              )}
            </p>
          </div>
        </aside>
      </div>
      <div className="studio-benefits">
        <span>
          <Package size={18} />
          {t(
            "Five shapes. One distinctive brand.",
            "Pesë forma. Një markë e veçantë.",
          )}
        </span>
        <span>
          <ShieldCheck size={18} />
          {t(
            "Artwork approval before production",
            "Miratim i dizajnit para prodhimit",
          )}
        </span>
        <Link href="/samples">
          {t(
            "Want to feel the material? Request samples",
            "Dëshironi ta prekni materialin? Kërkoni mostra",
          )}{" "}
          <ArrowUpRight size={15} />
        </Link>
      </div>
      <Dialog open={full} onOpenChange={setFull}>
        <DialogContent
          className="preview-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            enlargeButton.current?.focus();
          }}
        >
          <DialogTitle>
            {p.name} · {design.color}
          </DialogTitle>
          <DialogDescription>
            {t(
              "Your design preview. Indicative only.",
              "Parapamja e dizajnit tuaj. Vetëm orientuese.",
            )}
          </DialogDescription>
          <BagPreview design={design} />
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
