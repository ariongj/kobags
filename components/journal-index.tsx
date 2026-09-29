"use client";

import Link from "@/components/site-link";
import { ArrowUpRight } from "lucide-react";
import { PageHeading } from "@/components/site-shell";
import { useKobags } from "./kobags-context";
import { articles } from "@/lib/journal";
import { localizeArticle } from "@/lib/journal-sq";

const journalPhotos: Record<string, { src: string; alt: string; altSq: string }> = {
  kobagsjourney: {
    src: "/assets/client-2026-09/journal-factory.jpg",
    alt: "Kobags production equipment",
    altSq: "Makineri prodhimi në Kobags",
  },
  whyswitchtokobags: {
    src: "/assets/client-2026-09/journal-reuse.jpg",
    alt: "Stacks of black branded handle bags",
    altSq: "Stiva çantash të zeza me doreza dhe markë",
  },
  kobagsmission: {
    src: "/assets/client-2026-09/journal-brand-red-print.webp",
    alt: "Close-up of a red Kobags handle bag with printed brand artwork",
    altSq: "Detaj i një çante të kuqe Kobags me shtyp të markës",
  },
  sciencebehindkobags: {
    src: "/assets/client-2026-09/journal-material.jpg",
    alt: "Material processing machinery",
    altSq: "Makineri për përpunimin e materialit",
  },
  benefitsofkobags: {
    src: "/assets/client-2026-09/journal-checklist-production.webp",
    alt: "Branded box bag showing its handles and side gusset inside the Kobags factory",
    altSq: "Çantë Box me markë, doreza dhe anë të dukshme në fabrikën Kobags",
  },
  helpingbusinesseskobags: {
    src: "/assets/client-2026-09/journal-orders-ready.webp",
    alt: "Stacks of printed bag panels prepared for assembly",
    altSq: "Stiva panelesh të shtypura të çantave, gati për montim",
  },
};

export default function JournalIndex() {
  const { lang, t } = useKobags();
  return (
    <main>
      <PageHeading
        eyebrow={t("THE KOBAGS JOURNAL", "REVISTA KOBAGS")}
        title={t("Good ideas, ready to carry.", "Ide të mira, gati për t'u bartur.")}
      >
        {t(
          "Useful questions, thoughtful details and a clearer path to your next bag.",
          "Pyetje të dobishme, hollësi të menduara dhe një rrugë më e qartë drejt çantës suaj të radhës.",
        )}
      </PageHeading>
      <div className="content-width">
        <div className="journal-grid">
          {articles.map((source, index) => {
            const article = localizeArticle(source, lang);
            const photo = journalPhotos[source.slug];
            return (
              <Link href={"/blog/" + source.slug} className="journal-card" key={source.slug}>
                <img
                  className="journal-photo"
                  src={photo.src}
                  alt={lang === "sq" ? photo.altSq : photo.alt}
                  width="600"
                  height="400"
                  loading={index > 2 ? "lazy" : "eager"}
                />
                <span className="journal-number">0{index + 1}</span>
                <p className="eyebrow">{article.category}</p>
                <h2>{article.title}</h2>
                <p>{article.intro}</p>
                <span className="text-button">
                  {t("Read the guide", "Lexoni udhëzuesin")} <ArrowUpRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
