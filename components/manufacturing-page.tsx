"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { responsiveImageProps } from "@/lib/responsive-media";
import { FactoryVideo } from "./factory-video";
import { useKobags } from "./kobags-context";
import Link from "./site-link";

export default function ManufacturingPage() {
  const { t } = useKobags();
  const stages = [
    {
      key: "material",
      image: "/assets/client-2026-09/material-rolls.jpg",
      alt: t("Rolls of bag material at the Kobags factory", "Rula materiali për çanta në fabrikën Kobags"),
      caption: t("Non-woven PP", "PP jo i endur"),
      title: t("Material", "Materiali"),
      body: t("Define the non-woven PP material, GSM, bag shape and color for your application.", "Përcaktoni materialin PP jo të endur, peshën në GSM, formën dhe ngjyrën e çantës sipas nevojës suaj."),
    },
    {
      key: "printing",
      image: "/assets/client-2026-10/printing-line-fresh-food.jpg",
      alt: t("Black bag material with gold printing passing through the Kobags production rollers", "Material i zi për çanta me shtyp të artë duke kaluar nëpër rulët e prodhimit Kobags"),
      caption: t("Your identity, in print", "Identiteti juaj në shtyp"),
      title: t("Printing", "Shtypi"),
      body: t("Choose up to four print colors and share your artwork. We’ll confirm the print method and usable area for your selected bag.", "Zgjidhni deri në katër ngjyra shtypi dhe na dërgoni dizajnin tuaj. Metodën e shtypit dhe sipërfaqen e përdorshme i konfirmojmë për çantën e zgjedhur."),
    },
    {
      key: "finished",
      image: "/assets/client-2026-09/finished-stack-rail.jpg",
      alt: t("Stacks of finished bags at the Kobags factory", "Stiva çantash të përfunduara në fabrikën Kobags"),
      caption: t("Finished bags", "Çantat e përfunduara"),
      title: t("Approval & dispatch", "Miratimi dhe dërgimi"),
      body: t("Review the quotation and artwork proof before production. Confirm dispatch timing and destination-dependent transport.", "Shqyrtoni ofertën dhe provën e dizajnit para prodhimit. Konfirmoni afatin e nisjes dhe transportin sipas destinacionit."),
    },
  ];

  return (
    <main className="manufacture-page">
      <header className="manufacture-hero">
        <img
          className="manufacture-hero-photo"
          {...responsiveImageProps("/assets/client-2026-09/manufacturing-bag-forming.webp", "100vw")}
          alt={t("Printed bag material moving through the forming line at the Kobags factory", "Material i shtypur për çanta në linjën e formimit në fabrikën Kobags")}
          fetchPriority="high"
        />
        <div className="manufacture-container manufacture-hero-inner">
          <div className="manufacture-hero-copy">
            <p className="manufacture-label">{t("KOBAGS / MANUFACTURING", "KOBAGS / PRODHIMI")}</p>
            <h1>{t("From raw material", "Nga materiali")}<span>{t("to finished bags.", "te çanta e përfunduar.")}</span></h1>
            <p className="manufacture-hero-intro">{t("See bag forming, finishing and the specifications agreed before manufacturing in Kosova.", "Shikoni formimin, përfundimin dhe specifikimet që dakordohen para prodhimit në Kosovë.")}</p>
            <Link href="#manufacturing-process" className="manufacture-explore">
              {t("Explore the process", "Eksploroni procesin")}<ArrowDown size={17} aria-hidden="true" />
            </Link>
          </div>
          <p className="manufacture-origin"><span aria-hidden="true" />{t("MADE IN KOSOVA", "PRODHUAR NË KOSOVË")}</p>
        </div>
      </header>

      <section id="manufacturing-process" className="manufacture-container manufacture-process" aria-labelledby="manufacture-process-heading">
        <div className="manufacture-section-heading">
          <div>
            <p className="manufacture-label">{t("MATERIAL. PRINT. FINISHED BAG.", "MATERIALI. SHTYPI. ÇANTA.")}</p>
            <h2 id="manufacture-process-heading">{t("Where your bag", "Këtu merr formë")}<br /><span>{t("takes shape.", "çanta juaj.")}</span></h2>
          </div>
          <p>{t("Non-woven PP, in the shape, size and fabric weight your application needs.", "PP jo i endur, me formën, madhësinë dhe peshën e materialit që ju nevojitet.")}</p>
        </div>
        <div className="manufacture-stages">
          {stages.map((stage) => (
            <article className={`manufacture-stage manufacture-stage-${stage.key}`} key={stage.key}>
              <figure>
                <img
                  {...responsiveImageProps(stage.image, "(max-width: 680px) calc(44vw - 22px), (max-width: 800px) calc(33.333vw - 22px), (max-width: 1455px) calc(30vw - 16px), 421px")}
                  alt={stage.alt}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{stage.caption}</figcaption>
              </figure>
              <div className="manufacture-stage-copy">
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="manufacture-motion" aria-labelledby="manufacture-motion-heading">
        <div className="manufacture-container manufacture-motion-inner">
          <div className="manufacture-motion-copy">
            <p className="manufacture-label">{t("FACTORY MOTION / KOSOVA", "LINJA E PRODHIMIT / KOSOVË")}</p>
            <h2 id="manufacture-motion-heading">{t("Inside", "Brenda")}<br /><span>{t("production.", "prodhimit.")}</span></h2>
            <p>{t("See our bags take shape on the factory floor.", "Shihni si marrin formë çantat në fabrikën tonë.")}</p>
            <span className="manufacture-motion-note">{t("A closer look at forming and finishing.", "Një vështrim më nga afër te formimi dhe përfundimi.")}</span>
          </div>
          <FactoryVideo
            className="manufacture-film"
            source="/assets/client-2026-09/bag-forming-reel.mp4"
            poster={responsiveImageProps("/assets/client-2026-09/bag-forming-poster.jpg", "220px").src}
            width={464}
            height={832}
            title="Bag Forming"
            titleSq="Formimi i çantave"
          />
          <FactoryVideo
            className="manufacture-film"
            source="/assets/client-2026-09/bag-stacking-reel.mp4"
            poster={responsiveImageProps("/assets/client-2026-09/bag-stacking-poster.jpg", "220px").src}
            width={480}
            height={848}
            title="Production Line"
            titleSq="Linja e prodhimit"
          />
        </div>
      </section>

      <section className="manufacture-container manufacture-brief" aria-labelledby="manufacture-brief-heading">
        <div>
          <p className="manufacture-label">{t("YOUR NEXT ORDER", "POROSIA JUAJ E ARDHSHME")}</p>
          <h2 id="manufacture-brief-heading">{t("Start with your bag specification.", "Filloni me specifikimet e çantës suaj.")}</h2>
          <p>{t("Choose your bag shape, size, fabric weight and printing requirements. Confirm the details with our team before production.", "Zgjidhni formën, madhësinë, peshën e materialit dhe kërkesat e shtypit. Konfirmoni detajet me ekipin tonë para prodhimit.")}</p>
        </div>
        <div className="manufacture-brief-actions">
          <Link href="/quote" className="button">{t("Request a quotation", "Kërkoni një ofertë")}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          <Link href="/products" className="manufacture-collection-link">{t("Choose your bag", "Zgjidhni çantën tuaj")}<ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
