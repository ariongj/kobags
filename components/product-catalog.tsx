"use client";
import { useState } from "react";
import Link from "@/components/site-link";
import { ArrowUpRight, ArrowLeft, Check, X, Plus } from "lucide-react";
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
import { products, Product, getProduct } from "@/lib/catalog";
import { useDemo } from "./demo-store";
import { Choice } from "./bag-studio";
export function ProductCatalog() {
  const { state } = useDemo();
  const { t } = useKobags();
  const [handle, setHandle] = useState("all");
  const [use, setUse] = useState("all");
  const [compare, setCompare] = useState<string[]>([]);
  const catalog = state?.catalog || products;
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
            "FIVE SHAPES. ENDLESS POSSIBILITIES.",
            "PESË FORMA. SHUMË MUNDËSI.",
          )}
        </p>
        <h1>
          {t("Five shapes.", "Pesë forma.")}
          <br />
          <em>{t("Your signature.", "Identiteti juaj.")}</em>
        </h1>
        <p className="intro">
          {t(
            "Choose the shape that works for your business. We’ll help make it unmistakably yours.",
            "Zgjidhni formën për biznesin tuaj. Ne do ta personalizojmë për ju.",
          )}
        </p>
        <div className="catalog-heading-bags" aria-hidden="true">
          <img src="/assets/studio-v4/d-cut.webp" alt="" />
          <img src="/assets/studio-v4/box.webp" alt="" />
          <img src="/assets/studio-v4/handle.webp" alt="" />
        </div>
      </div>
      <div className="content-width">
        <div className="catalog-toolbar">
          <span>
            {results.length} {t("bag families", "lloje çantash")}
          </span>
          <Choice
            id="handle-filter"
            label="Handle style"
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
              label: s === "all" ? "All handles" : s,
            }))}
          />
          <Choice
            id="use-filter"
            label="Use case"
            value={use}
            onChange={setUse}
            options={[
              "all",
              "retail",
              "grocery",
              "events",
              "gifting",
              "boutiques",
            ].map((s) => ({ value: s, label: s === "all" ? "All uses" : s }))}
          />
          <button
            className="text-button"
            onClick={() => {
              setHandle("all");
              setUse("all");
            }}
          >
            Reset
          </button>
        </div>
        <div className="catalog-grid">
          {results.map((p, i) => (
            <article className="product-card" key={p.slug}>
              <Link href={"/products/" + p.slug} className="product-photo">
                <span className="product-number">
                  0{products.findIndex((x) => x.slug === p.slug) + 1}
                </span>
                <img
                  src={p.image}
                  alt={"Original Kobags " + p.name + " product photograph"}
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
                  <span>{p.variants[0].gsm} GSM · Non-woven PP</span>
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
          ))}
        </div>
        {!results.length && (
          <div className="empty">
            No bags match.{" "}
            <button
              className="text-button"
              onClick={() => {
                setUse("all");
                setHandle("all");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
        {compare.length > 0 && (
          <section className="section-card comparison">
            <div className="summary-top">
              <h2>
                {t("The details, side by side.", "Detajet, krah për krah.")}
              </h2>
              <button className="text-button" onClick={() => setCompare([])}>
                Clear
              </button>
            </div>
            <p className="source-note">
              Compare up to three product families. Dimensions are shown as
              published; confirm dimension order with production.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Specification</TableHead>
                  {compare.map((slug) => (
                    <TableHead key={slug}>{getProduct(slug).name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  "Dimensions (Small)",
                  "GSM (Small)",
                  "Handle",
                  "Material",
                  "Published printing",
                ].map((key, i) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    {compare.map((slug) => {
                      const p = getProduct(slug);
                      return (
                        <TableCell key={slug}>
                          {
                            [
                              p.variants[0].dimensions,
                              p.variants[0].gsm,
                              p.handle,
                              "Non-woven PP",
                              "Flexographic, up to 4 colors",
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
        <div className="catalog-end">
          <div>
            <h2>Make the next one yours.</h2>
            <p>
              Wholesale guidance: from{" "}
              {(state?.settings.moq || 5000).toLocaleString()} bags. Sample
              inquiries are separate.
            </p>
          </div>
          <Link className="button" href="/design">
            Open the bag studio <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}
export function ProductDetail({ product: original }: { product: Product }) {
  const { state } = useDemo();
  const { design, update, t } = useKobags();
  const p = state?.catalog.find((x) => x.slug === original.slug) || original;
  const [size, setSize] = useState(p.variants[0].name);
  const v = p.variants.find((v) => v.name === size)!;
  return (
    <main className="product-detail content-width">
      <Link href="/products" className="text-button breadcrumb">
        <ArrowLeft size={15} />
        Back to products
      </Link>
      <div className="product-detail-grid">
        <div className="detail-photo">
          <img
            src={p.image}
            alt={"Original Kobags " + p.name}
            width="600"
            height="750"
          />
          <span>Original Kobags product photograph</span>
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">{p.use}</p>
          <h1>{p.name}</h1>
          <p className="intro">{p.description}</p>
          <Choice
            id="detail-size"
            label="Choose a size"
            value={size}
            onChange={setSize}
            options={p.variants.map((v) => ({
              value: v.name,
              label: v.name + " · " + v.dimensions,
            }))}
          />
          <dl>
            {[
              ["Published dimensions", v.dimensions],
              ["Fabric weight", v.gsm + " g/m²"],
              ["Material", "Non-woven polypropylene (PP)"],
              ["Handle", p.handle],
              ["Printing", "Flexographic · up to 4 colors"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="notice">
            Wholesale orders from{" "}
            {(state?.settings.moq || 5000).toLocaleString()} bags. MOQ scope
            across sizes, colors and designs will be confirmed.
          </p>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                update({ product: p.slug, size });
                window.location.assign("/design");
              }}
            >
              {t("Design this bag", "Dizajnoni këtë çantë")}{" "}
              <ArrowUpRight size={17} />
            </button>
            <button
              className="button secondary"
              onClick={() => {
                update({ product: p.slug, size });
                window.location.assign("/quote");
              }}
            >
              Request a quote
            </button>
          </div>
          <Link href="/samples" className="text-button">
            Request a material sample <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="grid-two product-notes">
        <div className="section-card">
          <h3>Plan your production</h3>
          <p>
            {state?.settings.leadTime ||
              "Indicative dispatch 2–4 weeks after artwork approval, subject to production confirmation."}{" "}
            Transport time depends on your destination and is additional. Custom
            dimensions require feasibility review.
          </p>
        </div>
        <div className="section-card">
          <h3>Material, care & artwork</h3>
          <p>
            PP is a plastic material; composition does not establish recycled
            content. Ask for product-specific declarations and local collection
            guidance. Final print area and dimension drawings require production
            approval.
          </p>
          <Link href="/sustainability" className="text-button">
            Read the material guidance ↗
          </Link>
        </div>
      </div>
      <p className="source-note">
        Specification source:{" "}
        <a
          href={"https://kobags-group.com/kobags-bagsdetails/" + p.slug}
          target="_blank"
          rel="noreferrer"
        >
          Kobags original {p.name} page
        </a>
        . Rechecked 15 September 2026.
      </p>
    </main>
  );
}
