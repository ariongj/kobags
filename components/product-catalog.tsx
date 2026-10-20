"use client";
import { studioEnabled } from "@/lib/studio-availability";
import { useRef, useState } from "react";
import Link from "@/components/site-link";
import { ArrowUpRight, ArrowLeft, Maximize2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useKobags } from "./kobags-context";
import { products, productMedia, Product, getProduct, preferredBagColor } from "@/lib/catalog";
import { localizeProduct } from "@/lib/product-copy";
import { useCms } from "./cms/public-context";
import { useDemo } from "./demo-store";
import { Choice } from "./choice";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { languageHref } from "@/lib/site-locale";
import { CollectionCategories } from "./collection-categories";
export function ProductCatalog() {
  const cms = useCms();
  const getProduct = cms.getProduct;
  const { t, lang } = useKobags();
  const [handle, setHandle] = useState("all");
  const [use, setUse] = useState("all");
  const [compare, setCompare] = useState<string[]>([]);
  const catalog = [...cms.products].sort((a,b) => products.findIndex(p=>p.slug===a.slug)-products.findIndex(p=>p.slug===b.slug));
  const results = catalog.filter(
    (p) =>
      (handle === "all" || p.handle === handle) &&
      (use === "all" || p.use.toLowerCase().includes(use.toLowerCase())),
  );
  return (
    <main className="catalog-page-v5">
      <div className="page-heading catalog-heading-v5">
        <p className="eyebrow">
          {t(
            "THE BAG COLLECTION",
            "KOLEKSIONI I ÇANTAVE",
          )}
        </p>
        <h1>
          {t("Choose your bag", "Zgjidhni çantën tuaj")}
        </h1>
        <p className="intro">
          {t(
            "Compare handle styles, dimensions and fabric weights. Select a bag to inspect its photos and prepare a quotation request.",
            "Krahasoni dorezat, përmasat dhe peshën e materialit. Zgjidhni një çantë për të parë fotografitë dhe për të përgatitur kërkesën për ofertë.",
          )}
        </p>
        <div className="catalog-heading-bags" aria-hidden="true">
          <img src="/assets/studio-v4/d-cut.webp" alt="" />
          <img src="/assets/studio-v4/box.webp" alt="" />
          <img src="/assets/studio-v4/handle.webp" alt="" />
        </div>
      </div>
      <div className="content-width">
        <CollectionCategories />
        <div className="catalog-toolbar">
          <span>
            {results.length} {t("bag families", "lloje çantash")}
          </span>
          <Choice
            id="handle-filter"
            label={t("Handle style", "Lloji i dorezës")}
            value={handle}
            onChange={setHandle}
            options={[
              "all",
              "Die-cut",
              "Short handles",
              "T-shirt handles",
              "String",
            ].map((s) => ({
              value: s,
              label:
                s === "all"
                  ? t("All handles", "Të gjitha dorezat")
                  : lang === "sq"
                    ? localizeProduct(
                        products.find((product) => product.handle === s) ||
                          products[0],
                        lang,
                      ).handle
                    : s,
            }))}
          />
          <Choice
            id="use-filter"
            label={t("Use case", "Përdorimi")}
            value={use}
            onChange={setUse}
            options={[
              "all",
              "retail",
              "grocery",
              "events",
              "gifting",
              "boutiques",
            ].map((s) => ({
              value: s,
              label:
                s === "all"
                  ? t("All uses", "Të gjitha përdorimet")
                  : t(
                      s[0].toUpperCase() + s.slice(1),
                      ({
                        retail: "Shitje me pakicë",
                        grocery: "Ushqimore",
                        events: "Evente",
                        gifting: "Dhurata",
                        boutiques: "Butiqe",
                      } as Record<string, string>)[s],
                    ),
            }))}
          />
          {(handle !== "all" || use !== "all") && (
            <button
              className="text-button"
              onClick={() => {
                setHandle("all");
                setUse("all");
              }}
            >
              {t("Reset filters", "Pastro filtrat")}
            </button>
          )}
        </div>
        <div className="catalog-grid">
          {results.map((item, i) => {
            const p = localizeProduct(item, lang);
            const firstSize = p.variants.find(v => !cms.options(p.slug)?.activeSizes || cms.options(p.slug)!.activeSizes!.includes(v.name)) || p.variants[0];
            return (
            <article className="product-card" data-slug={p.slug} key={p.slug}>
              <Link href={"/products/" + p.slug} className="product-photo">
                <img
                  src={p.image}
                  alt={t(`${p.name} by Kobags`, `${p.name} nga Kobags`)}
                  width="400"
                  height="500"
                  loading={i > 2 ? "lazy" : "eager"}
                />
                <span className="product-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </Link>
              <div className="product-copy">
                <p className="eyebrow">{p.use}</p>
                <h2>
                  <Link href={"/products/" + p.slug}>{p.name}</Link>
                </h2>
                <p>{p.description}</p>
                <div className="product-foot">
                  <span>
                    {firstSize.gsm} GSM · {t("Non-woven PP", "PP jo i endur")}
                  </span>
                  <label>
                    <Checkbox
                      checked={compare.includes(p.slug)}
                      disabled={
                        !compare.includes(p.slug) && compare.length >= 3
                      }
                      onCheckedChange={(v) =>
                        setCompare(
                          v
                            ? [...compare, p.slug]
                            : compare.filter((s) => s !== p.slug),
                        )
                      }
                    />
                    {t("Compare", "Krahaso")}
                  </label>
                </div>
              </div>
            </article>
            );
          })}
        </div>
        {!results.length && (
          <div className="empty">
            {catalog.length ? t("No bags match these filters.", "Asnjë çantë nuk përputhet me këta filtra.") : t("Contact our team for available bag options.", "Kontaktoni ekipin tonë për çantat në dispozicion.")}{" "}
            {catalog.length ? <button
              className="text-button"
              onClick={() => {
                setUse("all");
                setHandle("all");
              }}
            >
              {t("Reset filters", "Pastro filtrat")}
            </button> : <Link href="/contact" className="text-button">{t("Contact us", "Na kontaktoni")}</Link>}
          </div>
        )}
        {compare.length > 0 && (
          <section className="section-card comparison">
            <div className="summary-top">
              <h2>
                {t("The details, side by side.", "Detajet, krah për krah.")}
              </h2>
              <button className="text-button" onClick={() => setCompare([])}>
                {t("Clear", "Pastro")}
              </button>
            </div>
            <p className="source-note">
              {t(
                "Compare up to three bag families. Confirm final dimensions with production.",
                "Krahasoni deri në tri lloje çantash. Konfirmoni përmasat përfundimtare me prodhimin.",
              )}
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Specification", "Specifikimi")}</TableHead>
                  {compare.map((slug) => (
                    <TableHead key={slug}>{getProduct(slug).name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  t("Dimensions (Small)", "Përmasat (Small)"),
                  t("GSM (Small)", "GSM (Small)"),
                  t("Handle", "Doreza"),
                  t("Material", "Materiali"),
                  t("Printing", "Shtypi"),
                ].map((key, i) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    {compare.map((slug) => {
                      const p = localizeProduct(getProduct(slug), lang);
                      return (
                        <TableCell key={slug}>
                          {
                            [
                              (p.variants.find(v => !cms.options(slug)?.activeSizes || cms.options(slug)!.activeSizes!.includes(v.name)) || p.variants[0]).dimensions,
                              (p.variants.find(v => !cms.options(slug)?.activeSizes || cms.options(slug)!.activeSizes!.includes(v.name)) || p.variants[0]).gsm,
                              p.handle,
                              t("Non-woven PP", "PP jo i endur"),
                              t(
                                `Flexographic, up to ${cms.options(slug)?.printColors || 4} colors`,
                                `Fleksografik, deri në ${cms.options(slug)?.printColors || 4} ngjyra`,
                              ),
                            ][i]
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        )}
      </div>
    </main>
  );
}
export function ProductDetail({ product: original }: { product: Product }) {
  const { state } = useDemo();
  const cms = useCms();
  const { update, t, lang } = useKobags();
  const p = localizeProduct(
    cms.records.some(r=>r.kind==='product') ? cms.getProduct(original.slug) : state?.catalog.find((x) => x.slug === original.slug) || original,
    lang,
  );
  const [size, setSize] = useState(cms.options(p.slug)?.activeSizes?.[0] || p.variants[0].name);
  const [photo, setPhoto] = useState(0);
  const [viewingPhoto, setViewingPhoto] = useState(false);
  const [zoomPhoto, setZoomPhoto] = useState(false);
  const photoOpener = useRef<HTMLButtonElement | null>(null);
  const v = p.variants.find((v) => v.name === size)!;
  const photos = [
    { src: p.image, label: t("Bag", "Çanta") },
    { src: productMedia[p.slug]?.detail, label: t("Print example", "Shembull shtypi") },
    { src: productMedia[p.slug]?.home, label: t("Another finish", "Ngjyrë tjetër") },
  ].filter((item, index, all): item is { src: string; label: string } =>
    Boolean(item.src) && all.findIndex((other) => other.src === item.src) === index,
  );
  const activePhoto = photos[Math.min(photo, photos.length - 1)];
  return (
    <main className="product-detail content-width">
      <Link href="/products" className="text-button breadcrumb">
        <ArrowLeft size={15} />
        {t("Back to products", "Kthehu te çantat")}
      </Link>
      <div className="product-detail-grid">
        <div className="detail-gallery">
          <div className="detail-photo">
            <img
              src={activePhoto.src}
              alt={`${p.name} · ${activePhoto.label.toLowerCase()}`}
              width="600"
              height="750"
            />
            <button
              type="button"
              className="detail-photo-open"
              ref={photoOpener}
              onClick={() => setViewingPhoto(true)}
            >
              <Maximize2 size={16} />
              {t("Inspect photo", "Shihni foton")}
            </button>
          </div>
          {photos.length > 1 && (
            <div className="detail-thumbnails" aria-label={t("Product images", "Fotografitë e çantës")}>
              {photos.map((item, index) => (
                <button
                  type="button"
                  key={item.src}
                  aria-label={t(`Show ${item.label.toLowerCase()}`, `Shfaq ${item.label.toLowerCase()}`)}
                  aria-pressed={index === photo}
                  onClick={() => setPhoto(index)}
                >
                  <img src={item.src} alt="" loading="lazy" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
          <p className="detail-gallery-caption">
            {t(
              "Made in Kosova · Product examples may show different colors and prints.",
              "Prodhuar në Kosovë · Shembujt mund të kenë ngjyra dhe shtyp të ndryshëm.",
            )}
          </p>
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">{p.use}</p>
          <h1>{p.name}</h1>
          <p className="intro">{p.description}</p>
          <Choice
            id="detail-size"
            label={t("Choose a size", "Zgjidhni madhësinë")}
            value={size}
            onChange={setSize}
            options={p.variants.filter(v=>!cms.options(p.slug)?.activeSizes || cms.options(p.slug)!.activeSizes!.includes(v.name)).map((v) => ({
              value: v.name,
              label: t(v.name, ({ Small: "E vogël", Medium: "Mesatare", Large: "E madhe" } as Record<string, string>)[v.name]) + " · " + v.dimensions,
            }))}
          />
          <dl>
            {[
              [t("Dimensions", "Përmasat"), v.dimensions],
              [t("Fabric weight", "Pesha e materialit"), v.gsm + " g/m²"],
              [t("Material", "Materiali"), t("Non-woven polypropylene (PP)", "Polipropilen jo i endur (PP)")],
              [t("Handle", "Doreza"), p.handle],
              [t("Printing", "Shtypi"), t(`Flexographic · up to ${cms.options(p.slug)?.printColors || 4} colors`, `Fleksografik · deri në ${cms.options(p.slug)?.printColors || 4} ngjyra`)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="notice">
            {t("Wholesale orders from", "Porosi me shumicë nga")} {" "}
            {(cms.options(p.slug)?.moq || cms.settings?.moq || state?.settings.moq || 5000).toLocaleString()} {t("bags. We’ll confirm the mix of sizes, colors and designs with your quotation.", "çanta. Kombinimin e madhësive, ngjyrave dhe dizajneve e konfirmojmë në ofertë.")}
          </p>
          <div className="actions">
            {studioEnabled && <button
              className="button"
              onClick={() => {
                update({ product: p.slug, size, color: preferredBagColor(cms.options(p.slug)?.colors), printColors: 1 });
                window.location.assign(languageHref("/design", lang));
              }}
            >
              {t("Design this bag", "Dizajnoni këtë çantë")}{" "}
              <ArrowUpRight size={17} />
            </button>}
            <button
              className={studioEnabled ? "button secondary" : "button"}
              onClick={() => {
                update({ product: p.slug, size, color: preferredBagColor(cms.options(p.slug)?.colors), printColors: 1 });
                window.location.assign(languageHref("/quote", lang));
              }}
            >
              {t("Request a quote", "Kërkoni ofertë")}
            </button>
          </div>
          <Link href="/samples" className="text-button">
            {t("Request a material sample", "Kërkoni mostër materiali")} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="grid-two product-notes">
        <div className="section-card">
          <h2>{t("Plan your production", "Planifikoni prodhimin")}</h2>
          <p>
            {(lang === "en" ? cms.settings?.leadTime || state?.settings.leadTime : cms.settings?.leadTimeSq) ||
              t("Timing is confirmed with your quotation.", "Afati konfirmohet me ofertën tuaj.")}{" "}
            {t("Transport time depends on your destination. Custom dimensions are reviewed for feasibility.", "Koha e transportit varet nga destinacioni. Përmasat e veçanta vlerësohen për realizueshmëri.")}
          </p>
        </div>
        <div className="section-card">
          <h2>{t("Material, care & artwork", "Materiali dhe dizajni")}</h2>
          <p>
            {t("PP is a plastic material; composition does not establish recycled content. Ask for product-specific declarations and local collection guidance. Final print area and dimension drawings require production approval.", "PP është material plastik; përbërja nuk dëshmon përmbajtje të ricikluar. Kërkoni deklarata për produktin dhe udhëzime lokale për grumbullimin. Zona përfundimtare e shtypit dhe vizatimet e përmasave kërkojnë miratim nga prodhimi.")}
          </p>
          <Link href="/sustainability" className="text-button">
            {t("Read the material guidance", "Lexoni udhëzuesin e materialit")} ↗
          </Link>
        </div>
      </div>
      <Dialog
        open={viewingPhoto}
        onOpenChange={(open) => {
          setViewingPhoto(open);
          if (!open) setZoomPhoto(false);
        }}
      >
        <DialogContent
          className="product-photo-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            photoOpener.current?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              setPhoto((index) => (index + photos.length - 1) % photos.length);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              setPhoto((index) => (index + 1) % photos.length);
            }
          }}
        >
          <div className="product-photo-dialog-heading">
            <div>
              <DialogTitle>{p.name}</DialogTitle>
              <DialogDescription>{activePhoto.label} · {t("Made in Kosova", "Prodhuar në Kosovë")}</DialogDescription>
            </div>
            <button
              type="button"
              className="text-button"
              onClick={() => setZoomPhoto((value) => !value)}
            >
              {zoomPhoto ? <ZoomOut size={17} /> : <ZoomIn size={17} />}
              {zoomPhoto ? t("Fit photo", "Përshtat foton") : t("Zoom in", "Zmadho")}
            </button>
          </div>
          <div className={`product-photo-viewer ${zoomPhoto ? "zoomed" : ""}`} tabIndex={0}>
            <img src={activePhoto.src} alt={`${p.name} · ${activePhoto.label.toLowerCase()}`} />
          </div>
          <div className="product-photo-dialog-footer">
            <span aria-live="polite">{photo + 1} / {photos.length}</span>
            <div>
              <button type="button" onClick={() => setPhoto((index) => (index + photos.length - 1) % photos.length)} aria-label={t("Previous photo", "Fotoja e mëparshme")}><ChevronLeft size={19} /></button>
              <button type="button" onClick={() => setPhoto((index) => (index + 1) % photos.length)} aria-label={t("Next photo", "Fotoja tjetër")}><ChevronRight size={19} /></button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
