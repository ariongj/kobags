"use client";
import { useRef, useState } from "react";
import { ImagePlus, Type, QrCode, Plus, Check, AlignLeft, AlignCenter, AlignRight, AlignStartVertical, AlignCenterVertical, AlignEndVertical } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import type { Design, ArtworkPlacement } from "@/lib/catalog";
import { artworkLayers, sideArtwork, MAX_ARTWORK_PER_SIDE, type ArtworkLayer } from "@/lib/studio-artwork";
import { createQrArtwork } from "@/lib/qr-artwork";
type T = (en: string, sq?: string) => string;
type QrData = ReturnType<typeof createQrArtwork>;

export function QrEditor({ value = "", onSave, t, adding = false }: { value?: string; onSave: (data: QrData) => void; t: T; adding?: boolean }) {
  const [entry, setEntry] = useState({ value, text: value }), [error, setError] = useState("");
  if (entry.value !== value) setEntry({ value, text: value });
  const url = entry.value === value ? entry.text : value;
  const setUrl = (text: string) => setEntry({ value, text });
  return <div className="qr-editor">
    <label htmlFor={adding ? "qr-new-url" : "qr-url"}>{t("Website or page link", "Lidhja e faqes")}</label>
    <input id={adding ? "qr-new-url" : "qr-url"} type="url" inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck={false} maxLength={500} value={url} placeholder="https://yourbrand.com" onChange={e => { setUrl(e.target.value); setError(""); }} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); e.currentTarget.parentElement?.querySelector<HTMLButtonElement>("button")?.click(); } }} />
    <p className="micro">{t("A scannable QR with a white border. Keep it clear of other artwork.", "QR e skanueshme me bordurë të bardhë. Mbajeni larg elementeve të tjera.")}</p>
    <button type="button" className="button qr-save" disabled={!url.trim()} onClick={() => {
      try { onSave(createQrArtwork(url)); setError(""); }
      catch { setError(t("Enter a valid website link. For long links, use a shorter page URL.", "Vendosni një lidhje të vlefshme. Për lidhje të gjata, përdorni një adresë më të shkurtër.")); }
    }}><QrCode size={16}/>{adding ? t("Add QR code", "Shto kodin QR") : t("Update QR code", "Përditëso kodin QR")}</button>
    {error && <p className="error" role="alert">{error}</p>}
  </div>;
}

export function ArtworkPalette({ design, activeLayer, onSelect, onLogo, onText, onQr, busy, t }: { design: Design; activeLayer: ArtworkLayer; onSelect: (layer: ArtworkLayer) => void; onLogo: () => void; onText: () => void; onQr: (data: QrData) => void; busy: boolean; t: T }) {
  const [qrOpen, setQrOpen] = useState(false);
  const qrTrigger = useRef<HTMLButtonElement>(null);
  const layerList = useRef<HTMLDivElement>(null);
  const layers = artworkLayers(design), full = layers.length >= MAX_ARTWORK_PER_SIDE;
  const kindName = { logo: t("Logo", "Logo"), text: t("Text", "Tekst"), qr: "QR" };
  return <>
    <div className="artwork-add-heading"><span>{t("Add to your bag", "Shtoni në çantën tuaj")}</span><small>{layers.length}/{MAX_ARTWORK_PER_SIDE}</small></div>
    <div className="layer-selector artwork-add" role="group" aria-label={t("Add artwork", "Shto element dizajni")}>
      <button type="button" disabled={full || busy} onClick={onLogo}><ImagePlus size={17}/><span>{t("Logo", "Logo")}</span><Plus size={12}/></button>
      <button type="button" disabled={full || busy} onClick={onText}><Type size={17}/><span>{t("Text", "Tekst")}</span><Plus size={12}/></button>
      <button ref={qrTrigger} type="button" disabled={full || busy} onClick={() => setQrOpen(true)}><QrCode size={17}/><span>QR</span><Plus size={12}/></button>
    </div>
    {full && <p className="micro" role="status">{t("Four per side. Select an element to edit.", "Katër për anë. Zgjidhni një element për ta ndryshuar.")}</p>}
    {!!layers.length && <div ref={layerList} className="artwork-layer-list" role="group" aria-label={t("Your elements", "Elementet tuaja")}>
      {layers.map((layer, index) => { const a = sideArtwork(design, layer); const Icon = a.kind === "text" ? Type : a.kind === "qr" ? QrCode : ImagePlus; const label = a.kind === "text" ? a.text || t("Empty text", "Tekst bosh") : a.name || kindName[a.kind]; return <button type="button" key={layer} aria-label={`${t("Select", "Zgjidh")} ${kindName[a.kind]} ${index + 1}: ${label}`} aria-pressed={layer === activeLayer} onClick={() => onSelect(layer)} title={label}>
        <Icon size={14}/><span>{label}</span>{layer === activeLayer && <Check size={13}/>}
      </button>; })}
    </div>}
    <Dialog open={qrOpen} onOpenChange={setQrOpen}><DialogContent className="qr-dialog" onCloseAutoFocus={event => { event.preventDefault(); const target = qrTrigger.current?.disabled ? layerList.current?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]') : qrTrigger.current; target?.focus({ preventScroll: true }); }}><DialogTitle>{t("Add a QR code", "Shto një kod QR")}</DialogTitle><DialogDescription>{t("Give customers a direct link to your website, menu or contact page.", "Lidhni klientët drejtpërdrejt me faqen, menynë ose kontaktin tuaj.")}</DialogDescription><QrEditor adding t={t} onSave={data => { onQr(data); setQrOpen(false); }}/></DialogContent></Dialog>
  </>;
}

export function QuickPlacement({ scale, onChange, t }: { scale: number; onChange: (patch: Partial<ArtworkPlacement>) => void; t: T }) {
  const half = Math.min(20, scale / 2);
  return <div className="quick-placement" role="group" aria-label={t("Quick placement", "Pozicionim i shpejtë")}>
    {([
      ["Place left", "Vendos majtas", AlignLeft, { x: Math.min(50, 24 + half) }],
      ["Center horizontally", "Qendro horizontalisht", AlignCenter, { x: 50 }],
      ["Place right", "Vendos djathtas", AlignRight, { x: Math.max(50, 76 - half) }],
      ["Place top", "Vendos lart", AlignStartVertical, { y: 33 + half }],
      ["Center vertically", "Qendro vertikalisht", AlignCenterVertical, { y: 56 }],
      ["Place bottom", "Vendos poshtë", AlignEndVertical, { y: 80 - half }],
    ] as const).map(([en, sq, Icon, patch]) => <button type="button" key={en} title={t(en, sq)} aria-label={t(en, sq)} onClick={() => onChange(patch)}><Icon size={18}/></button>)}
  </div>;
}
