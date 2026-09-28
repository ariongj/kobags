"use client";
import { CertificateShowcase } from "./certificates";
import Link from "@/components/site-link";
import {
  ArrowUpRight,
  ArrowRight,
  Package,
  Paintbrush,
  Factory,
  ShieldCheck,
} from "lucide-react";
import { useKobags } from "./kobags-context";
import { useDemo } from "./demo-store";
import { products, productMedia } from "@/lib/catalog";
import BagShowcase from "./bag-showcase";

export default function HomePage() {
  const { t } = useKobags();
  const { state } = useDemo();
  const minimum = state?.settings.moq || 5000;
  return (
    <main className="brand-home brand-home-v5">
      <section className="industrial-hero">
        <img
          className="industrial-hero-photo"
          src="/assets/client-2026-09/factory-line.jpg"
          alt={t(
            "Inside the Kobags production facility: machinery and rolls of non-woven material",
            "Brenda fabrikës Kobags: makineri dhe rula materiali jo të endur",
          )}
          width={1400}
          height={1000}
          fetchPriority="high"
        />
        <div className="industrial-hero-copy">
          <p className="eyebrow">
            {t(
              "NON-WOVEN BAG MANUFACTURING / KOSOVA",
              "PRODHIMI I ÇANTAVE JO TË ENDURA / KOSOVË",
            )}
          </p>
          <h1>
            {t("Manufacturing bags.", "Prodhojmë çanta.")}
            <br />
            <em>{t("Building brands.", "Ndërtojmë marka.")}</em>
          </h1>
          <p className="industrial-lead">
            {t(
              "From material and printing to the finished bag. Kobags brings production in Kosova together with custom packaging for your business.",
              "Nga materiali dhe shtypi deri te çanta e përfunduar. Kobags bashkon prodhimin në Kosovë me paketimin e personalizuar për biznesin tuaj.",
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
          <a className="hero-showroom-link" href="#bag-showcase">
            <span>360°</span>
            {t("Explore your bag in 3D", "Eksploroni çantën në 3D")}
            <ArrowRight size={17} />
          </a>
          <p className="industrial-quote-link">
            {t(
              "Planning your next wholesale order?",
              "Po planifikoni porosinë e radhës?",
            )}{" "}
            <Link href="/quote">
              {t("Talk to us", "Na kontaktoni")} <ArrowRight size={15} />
            </Link>
          </p>
        </div>
        <div className="hero-factory-stamp">
          <Factory size={23} />
          <span>
            {t("FROM THE FACTORY FLOOR", "NGA LINJA E PRODHIMIT")}
            <strong>{t("Made in Kosova.", "Prodhuar në Kosovë.")}</strong>
          </span>
        </div>
        <div className="industrial-location">
          <span>01 / KOBAGS GROUP</span>
          <p>
            {t("Inside our production facility", "Brenda fabrikës sonë")}
            <strong> Kosova</strong>
          </p>
        </div>
      </section>
      <div className="home-proof-strip industrial-proof-strip">
        <span>
          <Factory size={20} />
          {t("Made in Kosova", "Prodhuar në Kosovë")}
        </span>
        <span>
          <Paintbrush size={20} />
          {t(
            "Custom flexographic printing",
            "Shtyp fleksografik i personalizuar",
          )}
        </span>
        <span>
          <Package size={20} />
          {t(
            "Wholesale from",
            "Me shumicë nga",
          )} {minimum.toLocaleString()} {t("bags", "çanta")}
        </span>
      </div>
      <section
        className="home-production home-section"
        aria-labelledby="production-heading"
      >
        <div className="home-production-copy">
          <p className="eyebrow">
            {t("THE PRODUCTION BEHIND THE PRODUCT", "PRODHIMI PAS PRODUKTIT")}
          </p>
          <h2 id="production-heading">
            {t("It starts on", "Fillon në")}
            <br />
            {t("the factory floor.", "linjën e prodhimit.")}
          </h2>
          <p>
            {t(
              "The bag is the finished result. Behind it are the material, the machinery and the print process that bring your brief to life.",
              "Çanta është rezultati përfundimtar. Pas saj janë materiali, makineritë dhe procesi i shtypit që realizojnë kërkesën tuaj.",
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
            <span>{t("ON THE PRODUCTION LINE", "NË LINJËN E PRODHIMIT")}</span>
            <span>MADE IN KOSOVA</span>
          </div>
          <video
            controls
            playsInline
            preload="none"
            poster="/assets/client-2026-09/home-film-poster.jpg"
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
                {t("See the process in motion.", "Shihni procesin në lëvizje.")}
              </strong>
              <p>
                {t(
                  "A closer look at printing inside Kobags.",
                  "Një vështrim më i afërt i shtypit në Kobags.",
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
              {t("FROM OUR PRODUCTION LINE", "NGA LINJA JONË E PRODHIMIT")}
            </p>
            <h2>
              {t("Five bag families.", "Pesë lloje çantash.")}
              <br />
              {t("Made for your business.", "Për biznesin tuaj.")}
            </h2>
          </div>
          <Link href="/products" className="text-button">
            {t("View the whole collection", "Shikoni të gjithë koleksionin")}{" "}
            <ArrowUpRight size={16} />
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
                  0{i + 1} / {p.handle.toUpperCase()}
                </span>
                <img
                  src={productMedia[p.slug]?.home ?? p.image}
                  alt={p.name}
                  width={220}
                  height={275}
                  loading="lazy"
                />
              </div>
              <h3>
                {p.name}
                <ArrowUpRight size={17} />
              </h3>
              <p>
                {p.use}
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
                "FROM YOUR IDEA TO EVERYDAY USE",
                "NGA IDEJA NË PËRDORIM TË PËRDITSHËM",
              )}
            </p>
            <h2>
              {t(
                "A clear path to your next bag.",
                "Një rrugë e qartë drejt çantës suaj.",
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
            {t("MADE FOR YOUR BUSINESS", "PËR BIZNESIN TUAJ")}
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
      <CertificateShowcase />
      <section className="faq-section">
        <div>
          <p className="eyebrow">
            {t("A FEW THINGS TO KNOW", "DISA GJËRA QË DUHET TË DINI")}
          </p>
          <h2>
            {t("Before we", "Para se ta")}
            <br />
            {t("make it yours.", "personalizojmë.")}
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
                state?.settings.leadTime ||
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
