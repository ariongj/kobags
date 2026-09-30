"use client";

import { useKobags } from "./kobags-context";
import { PageHeading } from "./site-shell";
import { Download } from "lucide-react";

export function BuyerChecklistDownload() {
  const { lang, t } = useKobags();
  return (
    <a
      href={`/documents/buyer-checklist${lang === "sq" ? "-sq" : ""}.txt`}
      className="button secondary"
      download
    >
      <Download size={16} />
      {t("Download checklist", "Shkarkoni listën")}
    </a>
  );
}

export function LocalizedCopy({ en, sq }: { en: string; sq: string }) {
  const { t } = useKobags();
  return <>{t(en, sq)}</>;
}

export function LocalizedPageHeading({
  eyebrow,
  eyebrowSq,
  title,
  titleSq,
  intro,
  introSq,
}: {
  eyebrow: string;
  eyebrowSq?: string;
  title: string;
  titleSq?: string;
  intro?: string;
  introSq?: string;
}) {
  const { t } = useKobags();
  return (
    <PageHeading eyebrow={t(eyebrow, eyebrowSq)} title={t(title, titleSq)}>
      {intro ? t(intro, introSq) : undefined}
    </PageHeading>
  );
}
