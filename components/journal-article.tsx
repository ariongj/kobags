"use client";

import Link from "@/components/site-link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/journal";
import { localizeArticle } from "@/lib/journal-sq";
import { useKobags } from "./kobags-context";

export type JournalPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  factory?: boolean;
};

const photoAltSq: Record<string, string> = {
  kobagsjourney: "Linja e prodhimit të çantave jo të endura në fabrikën Kobags",
  whyswitchtokobags: "Çantë e bardhë me markë dhe doreza të gjelbra nga koleksioni Kobags",
  kobagsmission: "Çantë e zezë me doreza dhe shtyp të markës",
  sciencebehindkobags: "Material i shtypur që kalon nëpër rulat e fabrikës",
  benefitsofkobags: "Çantë e gjelbër me markë, dorezë dhe shtyp të dukshëm",
  helpingbusinesseskobags: "Çantë e përfunduar e zezë me markë në përdorim",
};

export default function JournalArticle({ source, photo }: { source: Article; photo: JournalPhoto }) {
  const { lang, t } = useKobags();
  const article = localizeArticle(source, lang);
  return (
    <main className="journal-article content-width">
      <Link href="/blog" className="text-button">
        <ArrowLeft size={16} />
        {t("Back to the journal", "Kthehu te artikujt")}
      </Link>
      <header className="journal-article-header-media">
        <div>
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="intro">{article.intro}</p>
        </div>
        <img
          className={photo.factory ? "journal-article-photo journal-article-photo-factory" : "journal-article-photo"}
          src={photo.src}
          alt={lang === "sq" ? photoAltSq[source.slug] ?? photo.alt : photo.alt}
          width={photo.width}
          height={photo.height}
          fetchPriority="high"
        />
      </header>
      <div className="journal-article-body">
        <article className="prose">
          {article.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </article>
        <aside className="journal-aside">
          <p className="eyebrow">{t("MAKE IT YOURS", "BËJENI TUAJËN")}</p>
          <h2>{t("Your next bag starts here.", "Çanta juaj e radhës fillon këtu.")}</h2>
          <p>{t("Compare bag shapes and discuss your printing requirements.", "Krahasoni format dhe diskutoni kërkesat tuaja të shtypit.")}</p>
          <Link href="/products" className="button">
            {t("Choose your bag", "Zgjidhni çantën tuaj")} <ArrowUpRight size={17} />
          </Link>
          <Link href="/samples" className="text-button">
            {t("Ask about samples", "Pyesni për mostra")} ↗
          </Link>
        </aside>
      </div>
    </main>
  );
}
