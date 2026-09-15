"use client";
import Link from "@/components/site-link";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Package,
  Paintbrush,
  Factory,
  ShieldCheck,
} from "lucide-react";
import { useKobags } from "./kobags-context";
import { useDemo } from "./demo-store";
import { products, initialDesign } from "@/lib/catalog";
import { BagPreview } from "./bag-studio";

export default function HomePage() {
  const { t } = useKobags();
  const { state } = useDemo();
  const minimum = state?.settings.moq || 5000;
  return (
    <main className="brand-home">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">
            <span className="tiny-rule" />
            {t(
              "MADE IN KOSOVO. MADE FOR YOUR BUSINESS.",
              "PRODHUAR NË KOSOVË. PËR BIZNESIN TUAJ.",
            )}
          </p>
          <h1>
            {t("A better way", "Një mënyrë më e mirë")}
            <br />
            {t("to carry", "për të bartur")}
            <br />
            <em>{t("your brand.", "markën tuaj.")}</em>
          </h1>
          <p className="home-lead">
            {t(
              "Custom reusable bags, manufactured in Lipjan. Choose your shape, add your identity and make the everyday unmistakably yours.",
              "Çanta të personalizuara për ripërdorim, të prodhuara në Lipjan. Zgjidhni formën dhe shtoni identitetin tuaj.",
            )}
          </p>
          <div className="actions">
            <Link href="/design" className="button">
              {t("Design your bag", "Dizajnoni çantën tuaj")}{" "}
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/products" className="home-secondary">
              {t("Explore the collection", "Eksploroni koleksionin")}{" "}
              <ArrowRight size={17} />
            </Link>
          </div>
          <p className="home-minimum">
            {t("Wholesale from", "Me shumicë nga")}{" "}
            <strong>
              {minimum.toLocaleString()} {t("bags", "çanta")}
            </strong>
            <span>·</span>
            <Link href="/samples">
              {t(
                "Start with a sample inquiry",
                "Filloni me kërkesë për mostra",
              )}
            </Link>
          </p>
        </div>
        <div className="home-hero-visual">
          <span className="home-edition">KOBAGS / THE EVERYDAY COLLECTION</span>
          <img
            className="hero-box"
            src="/assets/box-bag.webp"
            alt="Original Kobags Box Bag photograph"
            width={440}
            height={550}
          />
          <img
            className="hero-handle"
            src="/assets/handle-bag.webp"
            alt="Original Kobags Handle Bag photograph"
            width={480}
            height={600}
          />
          <div className="hero-photo-caption">
            <span>01 / 05</span>
            <p>
              {t("Five shapes.", "Pesë forma.")}
              <br />
              <strong>
                {t("One unmistakable brand.", "Një markë e dallueshme.")}
              </strong>
            </p>
            <Link href="/products" aria-label="Explore all five bag families">
              <ArrowUpRight size={25} />
            </Link>
          </div>
        </div>
      </section>
      <div className="home-proof-strip">
        <span>
          <Factory size={19} />
          {t("Manufactured in Lipjan, Kosovo", "Prodhuar në Lipjan, Kosovë")}
        </span>
        <span>
          <Paintbrush size={19} />
          {t("Custom branding & print", "Personalizim dhe shtyp")}
        </span>
        <span>
          <ShieldCheck size={19} />
          {t(
            "Artwork approval before production",
            "Miratim i dizajnit para prodhimit",
          )}
        </span>
      </div>
      <section className="home-collection home-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("FIND YOUR FIT", "GJENI FORMËN TUAJ")}</p>
            <h2>
              {t("Different shapes.", "Forma të ndryshme.")}
              <br />
              {t(
                "The same attention to detail.",
                "E njëjta vëmendje ndaj detajeve.",
              )}
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
                <span>0{i + 1}</span>
                <img
                  src={p.image}
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
              <p>{p.use}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-studio-feature">
        <div className="studio-feature-copy">
          <p className="eyebrow">
            {t("MEET YOUR NEW DESIGN STUDIO", "NJOHUNI ME STUDION E DIZAJNIT")}
          </p>
          <h2>
            {t("Your brand.", "Marka juaj.")}
            <br />
            <em>{t("Your bag.", "Çanta juaj.")}</em>
          </h2>
          <p>
            {t(
              "You don’t have to imagine it. Choose a bag, upload your logo and see your idea take shape before you ask for a quote.",
              "Nuk keni nevojë ta imagjinoni. Zgjidhni çantën, ngarkoni logon dhe shihni idenë para se të kërkoni ofertë.",
            )}
          </p>
          <ul>
            {[
              [
                t(
                  "Place, resize and rotate your logo",
                  "Vendosni, zmadhoni dhe rrotulloni logon",
                ),
              ],
              [
                t(
                  "Explore colors and both sides",
                  "Eksploroni ngjyrat dhe të dyja anët",
                ),
              ],
              [
                t(
                  "Download a preview or request a quote",
                  "Shkarkoni parapamjen ose kërkoni ofertë",
                ),
              ],
            ].map(([x]) => (
              <li key={x}>
                <Check size={17} />
                {x}
              </li>
            ))}
          </ul>
          <Link href="/design" className="button">
            {t("Make it yours", "Personalizojeni")} <ArrowUpRight size={18} />
          </Link>
          <small>
            {t(
              "An illustrative preview. Final shape, color and print placement require approval.",
              "Parapamje ilustruese. Forma, ngjyra dhe pozicioni përfundimtar kërkojnë miratim.",
            )}
          </small>
        </div>
        <Link
          href="/design"
          className="studio-feature-preview"
          aria-label="Open the interactive bag designer"
        >
          <div className="feature-preview-top">
            <span>THE KOBAGS BAG STUDIO</span>
            <Paintbrush size={18} />
          </div>
          <div className="feature-bag-window">
            <BagPreview design={{ ...initialDesign, color: "Forest green" }} />
          </div>
          <div className="feature-preview-bottom">
            <span>{t("Start with your idea.", "Filloni me idenë tuaj.")}</span>
            <span className="feature-arrow">
              <ArrowUpRight size={23} />
            </span>
          </div>
        </Link>
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
      <section className="factory-section">
        <img
          src="/assets/factory.webp"
          alt="Original Kobags manufacturing facility photograph"
          width={1000}
          height={680}
          loading="lazy"
        />
        <div>
          <p className="eyebrow">
            {t("ROOTED IN KOSOVO", "ME RRËNJË NË KOSOVË")}
          </p>
          <h2>
            {t("Real people.", "Njerëz të vërtetë.")}
            <br />
            {t("Real production.", "Prodhim i vërtetë.")}
            <br />
            <em>{t("Your next bag.", "Çanta juaj e ardhshme.")}</em>
          </h2>
          <p>
            {t(
              "Get a closer look at the material, equipment and printing behind your bags, with original photographs and video from Kobags.",
              "Njihuni me materialin, pajisjet dhe shtypin përmes fotografive dhe videos origjinale të Kobags.",
            )}
          </p>
          <Link href="/manufacturing" className="button navy">
            {t("Inside Kobags", "Brenda Kobags")} <ArrowUpRight size={17} />
          </Link>
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
      <section className="home-evidence">
        <div>
          <ShieldCheck size={30} />
          <h2>{t("Trust starts with evidence.", "Besimi fillon me prova.")}</h2>
          <p>
            {t(
              "Explore the certificate scans published by Kobags and the details to confirm before procurement.",
              "Shqyrtoni certifikatat e publikuara nga Kobags dhe detajet që duhen konfirmuar.",
            )}
          </p>
        </div>
        <div className="standards">
          <span>
            ISO 9001:2015
            <small>
              {t(
                "Quality management reference",
                "Referencë e menaxhimit të cilësisë",
              )}
            </small>
          </span>
          <span>
            ISO 14001:2015
            <small>
              {t(
                "Environmental management reference",
                "Referencë e menaxhimit mjedisor",
              )}
            </small>
          </span>
          <Link href="/certifications" className="text-button">
            {t("View certificate evidence", "Shikoni provat e certifikatave")}{" "}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
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
      <section className="home-final">
        <p className="eyebrow">
          {t(
            "LET’S MAKE SOMETHING YOU’LL CARRY FORWARD",
            "LE TË KRIJOJMË DIÇKA PËR TË ARDHMEN",
          )}
        </p>
        <h2>
          {t(
            "Your next bag starts here.",
            "Çanta juaj e ardhshme fillon këtu.",
          )}
        </h2>
        <div className="actions">
          <Link href="/design" className="button">
            {t("Design your bag", "Dizajnoni çantën tuaj")}{" "}
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/partners" className="home-secondary">
            {t("Become a partner", "Bëhuni partner")} <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
