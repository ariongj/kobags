"use client";
import { useCms } from "./cms/public-context";
import { CertificateShowcase } from "./certificate-showcase";
import Link from "@/components/site-link";
import {
  ArrowUpRight,
  Paintbrush,
  Smile,
} from "lucide-react";
import { useKobags } from "./kobags-context";
import { useDemo } from "./demo-store";
import { products, productMedia } from "@/lib/catalog";
import { productCopySq } from "@/lib/product-copy";
import BagShowcase from "./bag-showcase";

export default function HomePage() {
  const { t } = useKobags();
  const cms=useCms();
  const { state } = useDemo();
  const minimum = cms.settings?.moq || state?.settings.moq || 5000;
  return (
    <main className="brand-home brand-home-v5">
      <section className="industrial-hero">
        <img
          className="industrial-hero-photo"
          src="/assets/client-2026-09/factory-line-1600.webp"
          srcSet="/assets/client-2026-09/factory-line-640.webp 640w, /assets/client-2026-09/factory-line-960.webp 960w, /assets/client-2026-09/factory-line-1600.webp 1600w"
          sizes="100vw"
          alt={t(
            "Inside the Kobags production facility: machinery and rolls of non-woven material",
            "Brenda fabrikës Kobags: makineri dhe rula materiali jo të endur",
          )}
          width={1600}
          height={960}
          fetchPriority="high"
        />
        <div className="industrial-hero-copy">
          <p className="eyebrow">
            {t(
              "NON-WOVEN BAG MANUFACTURING",
              "PRODHIMI I ÇANTAVE JO TË ENDURA",
            )}
          </p>
          <h1>
            {t("Manufacturing bags.", "Prodhojmë çanta.")}
            <br />
            <em>{t("Helping Brands.", "Mbështesim markat.")}</em>
          </h1>
          <p className="industrial-lead">
            {t(
              "Custom non-woven bags for retail, events and everyday carry. Choose your specification, add your branding and plan your wholesale order.",
              "Çanta jo të endura për dyqane, evente dhe përdorim të përditshëm. Zgjidhni specifikimet, shtoni markën tuaj dhe planifikoni porosinë me shumicë.",
            )}
          </p>
          <div className="actions">
            <Link href="/manufacturing" className="button">
              {t("Explore our production", "Eksploroni prodhimin")}{" "}
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/design" className="button industrial-secondary">
              {t("Design your bag", "Dizajnoni çantën tuaj")}{" "}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section
        className="home-production home-section"
        aria-labelledby="production-heading"
      >
        <div className="home-production-copy">
          <p className="eyebrow">
            {t("Made in Kosova", "Prodhuar në Kosovë")}
          </p>
          <h2 id="production-heading">
            {t("Material. Print.", "Material. Shtyp.")}
            <br />
            {t("Finished to your specifications.", "Sipas specifikimeve tuaja.")}
          </h2>
          <p>
            {t(
              "Follow the three decisions that shape your bag: its construction, its print and its finished specification.",
              "Tri vendime përcaktojnë çantën tuaj: mënyra e punimit, shtypi dhe specifikimet përfundimtare.",
            )}
          </p>
          <ol className="production-stages">
            {[
              [
                t("Material & specification", "Materiali dhe specifikimet"),
                t(
                  "Non-woven PP, in the shape, size and fabric weight your application needs.",
                  "PP jo i endur, me formën, madhësinë dhe peshën e materialit që ju nevojitet.",
                ),
              ],
              [
                t("Your identity, in print", "Identiteti juaj në shtyp"),
                t(
                  "Custom flexographic printing, with artwork reviewed before production.",
                  "Shtyp fleksografik i personalizuar, me dizajn të miratuar para prodhimit.",
                ),
              ],
              [
                t("From production to dispatch", "Nga prodhimi te dërgimi"),
                t(
                  "Confirm the finished specification, production timing and destination with our team.",
                  "Konfirmoni specifikimet përfundimtare, afatin e prodhimit dhe destinacionin me ekipin tonë.",
                ),
              ],
            ].map(([title, body], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/manufacturing" className="text-button">
            {t("Get to know our manufacturing", "Njihuni me prodhimin tonë")}{" "}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <figure className="home-production-film">
          <div className="production-film-heading">
            <span>{t("FLEXOGRAPHIC PRINTING", "SHTYP FLEKSOGRAFIK")}</span>
            <span>{t("FACTORY FILM", "VIDEO NGA FABRIKA")}</span>
          </div>
          <video
            controls
            playsInline
            preload="none"
            poster="/assets/client-2026-09/home-film-poster-640.webp"
            width={1000}
            height={750}
            aria-label={t(
              "Watch the Kobags printing process",
              "Shikoni procesin e shtypit në Kobags",
            )}
          >
            <source src="/assets/printing-process.mp4" type="video/mp4" />
            {t(
              "Your browser does not support video playback.",
              "Shfletuesi juaj nuk e mbështet videon.",
            )}
          </video>
          <figcaption>
            <Paintbrush size={20} />
            <div>
              <strong>
                {t("Your artwork, on the material.", "Dizajni juaj, mbi material.")}
              </strong>
              <p>
                {t(
                  "Watch the material move through the printing equipment.",
                  "Shikoni si kalon materiali nëpër makineritë e shtypit.",
                )}
              </p>
            </div>
          </figcaption>
        </figure>
      </section>
      <BagShowcase />
      <section className="home-collection home-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {t("FIND YOUR FORMAT", "ZGJIDHNI FORMËN")}
            </p>
            <h2>
              {t("Five bag families.", "Pesë lloje çantash.")}
              <br />
              {t("Different ways to carry.", "Mënyra të ndryshme bartjeje.")}
            </h2>
          </div>
          <Link href="/products" className="text-button">
            {t("View the whole collection", "Shikoni të gjithë koleksionin")}{" "}
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="home-collection-categories" aria-label={t("Collection categories", "Kategoritë e koleksionit")}>
          <Link href="/quote?collection=thank-you" className="collection-category">
            <span className="collection-mark collection-thanks" aria-hidden="true">Thank<br />you.</span>
            <span><small>{t("COLLECTION", "KOLEKSIONI")}</small><strong>{t("Thank you bags", "Çanta Thank you")}</strong></span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
          <Link href="/quote?collection=smiley" className="collection-category">
            <span className="collection-mark" aria-hidden="true"><Smile size={42} strokeWidth={1.4} /></span>
            <span><small>{t("COLLECTION", "KOLEKSIONI")}</small><strong>{t("Smiley bags", "Çanta Smiley")}</strong></span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <div className="home-product-row">
          {products.map((p, i) => (
            <Link
              className="home-product"
              key={p.slug}
              href={"/products/" + p.slug}
            >
              <div>
                <span>
                  0{i + 1} / {t(p.handle, productCopySq[p.slug]?.handle).toUpperCase()}
                </span>
                <img
                  src={productMedia[p.slug].home.replace(".jpg", "-640.webp")}
                  srcSet={[320, 640].map(width => `${productMedia[p.slug].home.replace(".jpg", `-${width}.webp`)} ${width}w`).join(", ")}
                  sizes="(max-width: 767px) 44vw, (max-width: 1024px) 28vw, 18vw"
                  alt={p.name}
                  width={220}
                  height={275}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3>
                {p.name}
                <ArrowUpRight size={17} />
              </h3>
              <p>
                {t(p.use, productCopySq[p.slug]?.use)}
                <span className="product-size-count">
                  3 {t("sizes", "madhësi")}
                </span>
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {t(
                "THE ORDERING PROCESS",
                "PROCESI I POROSISË",
              )}
            </p>
            <h2>
              {t(
                "From design to dispatch.",
                "Nga dizajni te dërgimi.",
              )}
            </h2>
          </div>
        </div>
        <div className="home-process">
          {[
            [
              t("Choose & design", "Zgjidhni dhe dizajnoni"),
              t(
                "Find the right shape, color and branding for your business.",
                "Gjeni formën, ngjyrën dhe markimin për biznesin tuaj.",
              ),
            ],
            [
              t("Review the quotation", "Shqyrtoni ofertën"),
              t(
                "Confirm quantity, destination, price and commercial details.",
                "Konfirmoni sasinë, destinacionin, çmimin dhe kushtet.",
              ),
            ],
            [
              t("Approve your artwork", "Miratoni dizajnin"),
              t(
                "Review the specific proof before production is released.",
                "Shqyrtoni versionin e caktuar para fillimit të prodhimit.",
              ),
            ],
            [
              t("Production & dispatch", "Prodhimi dhe dërgimi"),
              t(
                "Production follows approval. Dispatch and delivery are confirmed separately.",
                "Prodhimi vijon pas miratimit. Dërgimi dhe dorëzimi konfirmohen veçmas.",
              ),
            ],
          ].map(([h, p], i) => (
            <article key={h}>
              <span>0{i + 1}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="home-section home-buyer-grid">
        <article>
          <p className="eyebrow">
            {t("USES & INDUSTRIES", "PËRDORIME DHE SEKTORË")}
          </p>
          <h2>{t("A bag for what you do.", "Një çantë për punën tuaj.")}</h2>
          <p>
            {t(
              "Retail, events or everyday shopping: start with what your customer carries.",
              "Shitje me pakicë, evente apo blerje të përditshme: filloni me nevojat e klientit.",
            )}
          </p>
          <Link href="/industries" className="text-button">
            {t("Explore uses & industries", "Eksploroni përdorimet")}{" "}
            <ArrowUpRight size={16} />
          </Link>
        </article>
        <article>
          <p className="eyebrow">
            {t("MATERIALS & RESPONSIBILITY", "MATERIALET DHE PËRGJEGJËSIA")}
          </p>
          <h2>
            {t(
              "Clear facts. Better choices.",
              "Fakte të qarta. Zgjedhje më të mira.",
            )}
          </h2>
          <p>
            {t(
              "Understand non-woven PP, care and reuse. Check the evidence behind product and environmental claims.",
              "Kuptoni PP-në jo të endur, kujdesin dhe ripërdorimin. Kontrolloni provat pas pretendimeve.",
            )}
          </p>
          <Link href="/sustainability" className="text-button">
            {t("Know your material", "Njihni materialin")}{" "}
            <ArrowUpRight size={16} />
          </Link>
        </article>
      </section>
      <section className="kosovo-home-strip content-width">
        <div><p className="eyebrow">{t("FOR BUSINESSES ACROSS KOSOVO", "PËR BIZNESE NË TËRË KOSOVËN")}</p>
          <h2>{t("Local production. Nationwide possibilities.", "Prodhim vendor. Mundësi në tërë vendin.")}</h2>
          <p>{t("Branded bags for shops, supermarkets and events, from Prishtina and Lipjan to Prizren, Peja, Gjilan, Ferizaj and beyond.", "Qese dhe çanta me logo për dyqane, supermarkete dhe evente, nga Prishtina e Lipjani në Prizren, Pejë, Gjilan, Ferizaj dhe më gjerë.")}</p>
        </div>
        <Link href="/bags-kosovo" className="text-button">{t("Explore all municipalities", "Shikoni të gjitha komunat")} <ArrowUpRight size={16} /></Link>
      </section>
      <CertificateShowcase />
      <section className="faq-section">
        <div>
          <p className="eyebrow">
            {t("BUYER QUESTIONS", "PYETJE NGA BLERËSIT")}
          </p>
          <h2>
            {t("Ordering", "Detajet")}
            <br />
            {t("essentials.", "e porosisë.")}
          </h2>
          <Link href="/resources" className="text-button">
            {t("Buying guides", "Udhëzues për blerësit")}{" "}
            <ArrowUpRight size={15} />
          </Link>
        </div>
        <div>
          {[
            [
              t(
                "What is the minimum wholesale order?",
                "Cila është porosia minimale?",
              ),
              t(
                `The published minimum is ${minimum.toLocaleString()} bags. Its application across designs, sizes and colors is confirmed with your quote.`,
                `Minimumi është ${minimum.toLocaleString()} çanta. Zbatimi sipas dizajnit, madhësisë dhe ngjyrës konfirmohet me ofertën.`,
              ),
            ],
            [
              t("Can I add my own logo?", "A mund të shtoj logon time?"),
              t(
                "Yes. Use the design studio to upload a PNG, JPG or WebP, then place, resize and rotate it. The preview is a concept; production artwork still needs approval.",
                "Po. Ngarkoni PNG, JPG ose WebP në studio, pastaj vendoseni, ndryshoni madhësinë dhe rrotullojeni. Dizajni për prodhim kërkon miratim.",
              ),
            ],
            [
              t("How long does production take?", "Sa zgjat prodhimi?"),
              t(
                cms.settings?.leadTime || state?.settings.leadTime ||
                  "Published guidance indicates dispatch 2–4 weeks after artwork approval, subject to production confirmation. Transport time is additional.",
                "Udhëzimi tregon dërgimin 2–4 javë pas miratimit, sipas konfirmimit të prodhimit. Transporti kërkon kohë shtesë.",
              ),
            ],
            [
              t(
                "Can I request samples first?",
                "A mund të kërkoj fillimisht mostra?",
              ),
              t(
                "Yes. Samples have a separate inquiry route. Availability, sample costs and shipping terms require confirmation.",
                "Po. Mostrat kanë kërkesë të veçantë. Disponueshmëria, kostot dhe transporti kërkojnë konfirmim.",
              ),
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
