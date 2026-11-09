"use client";
import { useRef, useState } from "react";
import Link from "@/components/site-link";
import { ArrowUpRight, ArrowLeft, Maximize2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from "lucide-react";
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
import { Choice } from "./choice";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { languageHref } from "@/lib/site-locale";
import { CollectionCategories } from "./collection-categories";
import { catalogSearch, catalogUses, type CatalogSelection } from "@/lib/catalog-selection";
import { responsiveImageProps } from "@/lib/responsive-media";
export function ProductCatalog({ initialSelection }: { initialSelection: CatalogSelection }) {
  const cms = useCms();
  const getProduct = cms.getProduct;
  const { t, lang } = useKobags();
  const [selection, setSelection] = useState(initialSelection);
  const { handle, use, compare } = selection;
  const comparisonHeading = useRef<HTMLHeadingElement>(null);
  const compareTray = useRef<HTMLElement>(null);
  const updateSelection = (patch: Partial<CatalogSelection>) => {
    const next = { ...selection, ...patch };
    setSelection(next);
    // Keep the shortlist shareable and intact through native navigation/back.
    const url = new URL(location.href);
    for (const key of ["handle", "use", "compare"]) url.searchParams.delete(key);
    new URLSearchParams(catalogSearch(next)).forEach((value, key) => url.searchParams.set(key, value));
    history.replaceState(history.state, "", url.pathname + url.search + url.hash);
  };
  const removeCompared = (slug: string) => {
    updateSelection({ compare: compare.filter(item => item !== slug) });
    requestAnimationFrame(() => {
      const target = compareTray.current?.querySelector<HTMLButtonElement>("button") || document.getElementById("handle-filter");
      target?.focus({ preventScroll: true });
    });
  };
  const productHref = (slug: string) => "/products/" + slug + catalogSearch(selection);
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
          <img src="/assets/d-cut-bag-320.webp" alt="" width={320} height={400} />
          <img src="/assets/box-bag-320.webp" alt="" width={320} height={400} />
          <img src="/assets/handle-bag-320.webp" alt="" width={320} height={400} />
        </div>
      </div>
      <div className="content-width">
        <CollectionCategories />
        <div className="catalog-toolbar">
          <span role="status" aria-live="polite" aria-atomic="true">
            {results.length} {t("bag families", "lloje çantash")}
          </span>
          <Choice
            id="handle-filter"
            label={t("Handle style", "Lloji i dorezës")}
            value={handle}
            onChange={handle => updateSelection({ handle })}
            options={["all", ...new Set(catalog.map(product => product.handle))].map((s) => ({
              value: s,
              label:
                s === "all"
                  ? t("All handles", "Të gjitha dorezat")
                  : lang === "sq"
                    ? localizeProduct(
                        catalog.find((product) => product.handle === s) || catalog[0],
                        lang,
                      ).handle
                    : s,
            }))}
          />
          <Choice
            id="use-filter"
            label={t("Use case", "Përdorimi")}
            value={use}
            onChange={use => updateSelection({ use })}
            options={["all", ...catalogUses].map((s) => ({
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
                updateSelection({ handle: "all", use: "all" });
              }}
            >
              {t("Reset filters", "Pastro filtrat")}
            </button>
          )}
        </div>
        {compare.length > 0 && (
          <aside className="catalog-compare-tray" ref={compareTray} aria-label={t("Your bag comparison", "Krahasimi i çantave tuaja")}>
            <span className="catalog-compare-count" role="status">{compare.length}/3 {t("selected", "të zgjedhura")}</span>
            <div className="catalog-compare-picks">
              {compare.map(slug => <button key={slug} type="button" onClick={() => removeCompared(slug)} aria-label={t(`Remove ${getProduct(slug).name} from comparison`, `Hiq ${localizeProduct(getProduct(slug), lang).name} nga krahasimi`)}>
                {localizeProduct(getProduct(slug), lang).name}<X size={14} aria-hidden="true" />
              </button>)}
            </div>
            <a href="#bag-comparison" className="button small" onClick={event => {
              event.preventDefault();
              comparisonHeading.current?.focus({ preventScroll: true });
              document.getElementById("bag-comparison")?.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
            }}>{t("Compare bags", "Krahasoni çantat")}<ArrowUpRight size={16} /></a>
          </aside>
        )}
        <div className="catalog-grid">
          {results.map((item, i) => {
            const p = localizeProduct(item, lang);
            const firstSize = p.variants.find(v => !cms.options(p.slug)?.activeSizes || cms.options(p.slug)!.activeSizes!.includes(v.name)) || p.variants[0];
            return (
            <article className="product-card" data-slug={p.slug} key={p.slug}>
              <Link href={productHref(p.slug)} className="product-photo">
                <img
                  alt={t(`${p.name} by Kobags`, `${p.name} nga Kobags`)}
                  width="400"
                  height="500"
                  {...responsiveImageProps(p.image, "(max-width: 800px) 25vw, (max-width: 1100px) 40vw, 28vw")}
                  loading={i > 2 ? "lazy" : "eager"}
                  decoding="async"
                />
                <span className="product-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </Link>
              <div className="product-copy">
                <p className="eyebrow">{p.use}</p>
                <h2>
                  <Link href={productHref(p.slug)}>{p.name}</Link>
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
                        updateSelection({ compare: v
                            ? [...compare, p.slug]
                            : compare.filter((s) => s !== p.slug) })
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
                updateSelection({ use: "all", handle: "all" });
              }}
            >
              {t("Reset filters", "Pastro filtrat")}
            </button> : <Link href="/contact" className="text-button">{t("Contact us", "Na kontaktoni")}</Link>}
          </div>
        )}
        {compare.length > 0 && (
          <section id="bag-comparison" className="section-card comparison" aria-labelledby="bag-comparison-heading">
            <div className="summary-top">
              <h2 id="bag-comparison-heading" ref={comparisonHeading} tabIndex={-1}>
                {t("The details, side by side.", "Detajet, krah për krah.")}
              </h2>
              <button className="text-button" onClick={() => { updateSelection({ compare: [] }); document.getElementById("handle-filter")?.focus(); }}>
                {t("Clear", "Pastro")}
              </button>
            </div>
            <p className="source-note">
              {t(
                "Compare up to three bag families. Confirm final dimensions with production.",
                "Krahasoni deri në tri lloje çantash. Konfirmoni përmasat përfundimtare me prodhimin.",
              )}
            </p>
            {compare.length > 1 && <p id="comparison-scroll-hint" className="comparison-scroll-hint">{t("Swipe across to see all selected bags.", "Rrëshqitni anash për të parë të gjitha çantat e zgjedhura.")}</p>}
            <Table style={{ minWidth: (compare.length + 1) * 116 }} containerProps={{ tabIndex: 0, role: "region", "aria-labelledby": "bag-comparison-heading", "aria-describedby": compare.length > 1 ? "comparison-scroll-hint" : undefined }}>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Specification", "Specifikimi")}</TableHead>
                  {compare.map((slug) => (
                    <TableHead key={slug}><Link href={productHref(slug)}>{localizeProduct(getProduct(slug), lang).name}</Link></TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  t("First available size", "Madhësia e parë në dispozicion"),
                  t("Fabric weight", "Pesha e materialit"),
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
                              (p.variants.find(v => !cms.options(slug)?.activeSizes || cms.options(slug)!.activeSizes!.includes(v.name)) || p.variants[0]).gsm + " g/m²",
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
export function ProductDetail({ product: original, returnTo = "/products" }: { product: Product; returnTo?: string }) {
  const cms = useCms();
  const { update, t, lang, studioEnabled } = useKobags();
  const p = localizeProduct(
    cms.records.some(r=>r.kind==='product') ? cms.getProduct(original.slug) : original,
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
    { src: productMedia[p.slug]?.home, label: t("Another view", "Pamje tjetër") },
  ].filter((item, index, all): item is { src: string; label: string } =>
    Boolean(item.src) && all.findIndex((other) => other.src === item.src) === index,
  );
  const activePhoto = photos[Math.min(photo, photos.length - 1)];
  return (
    <main className="product-detail content-width">
      <Link href={returnTo} className="text-button breadcrumb">
        <ArrowLeft size={15} />
        {t("Back to products", "Kthehu te çantat")}
      </Link>
      <div className="product-detail-grid">
        <div className="detail-gallery">
          <div className="detail-photo">
            <img
              alt={`${p.name} · ${activePhoto.label.toLowerCase()}`}
              width="600"
              height="750"
              {...responsiveImageProps(activePhoto.src, "(max-width: 800px) 85vw, 42vw")}
              fetchPriority="high"
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
                  <img {...responsiveImageProps(item.src, "(max-width: 800px) 43px, 57px")} alt="" loading="lazy" decoding="async" />
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
            {(cms.options(p.slug)?.moq || cms.settings?.moq || 5000).toLocaleString()} {t("bags. We’ll confirm the mix of sizes, colors and designs with your quotation.", "çanta. Kombinimin e madhësive, ngjyrave dhe dizajneve e konfirmojmë në ofertë.")}
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
                update({ product: p.slug, size, color: preferredBagColor(cms.options(p.slug)?.colors), printColors: 1, customDimensions: "", referenceStudio: undefined });
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
            {(lang === "en" ? cms.settings?.leadTime : cms.settings?.leadTimeSq) ||
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
            if (zoomPhoto && (event.target as HTMLElement).closest(".product-photo-viewer")) return;
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
