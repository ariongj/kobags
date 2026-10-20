"use client";
import { useCms } from "./cms/public-context";

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
  const cms=useCms();
  const managed=cms.records.filter(r=>r.kind==='article'&&r.content.path);
  return (
    <main>
      <PageHeading
        eyebrow={t("THE KOBAGS JOURNAL", "REVISTA KOBAGS")}
        title={t("Good ideas, ready to carry.", "Ide të mira, gati për t'u bartur.")}
      >
        {t(
          "Six guides covering material, branding, specifications and wholesale planning.",
          "Gjashtë udhëzues për materialin, markën, specifikimet dhe planifikimin e porosive me shumicë.",
        )}
      </PageHeading>
      <div className="content-width">
        <div className="journal-grid">
          {managed.map(({id,content:c})=><Link href={c.path} className="journal-card" key={id}>{c.image&&<img className="journal-photo" src={c.image} alt={c.title[lang]} width="600" height="400" loading="lazy"/>}<p className="eyebrow">{t("BUYER GUIDE","UDHËZUES PËR BLERËSIT")}</p><h2>{c.title[lang]}</h2><p>{c.description[lang]}</p><span className="text-button">{t("Read the guide","Lexoni udhëzuesin")}</span></Link>)}
          {articles.filter(a=>!managed.some(r=>r.content.path==='/blog/'+a.slug)).map((source, index) => {
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
