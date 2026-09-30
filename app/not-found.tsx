"use client";

import Link from "@/components/site-link";
import { useKobags } from "@/components/kobags-context";

export default function NotFound() {
  const { t } = useKobags();
  return (
    <main className="success-page content-width">
      <p className="eyebrow">{t("404 / PAGE NOT FOUND", "404 / FAQJA NUK U GJET")}</p>
      <h1>{t("This page isn’t in the bag.", "Kjo faqe nuk u gjet.")}</h1>
      <p>{t("Explore the collection or open the studio to create your bag.", "Shikoni koleksionin ose hapni studion për të krijuar çantën tuaj.")}</p>
      <div className="actions">
        <Link href="/" className="button">{t("Back to home", "Kthehu në ballinë")}</Link>
        <Link href="/design" className="button secondary">{t("Open bag studio", "Hap studion e çantave")}</Link>
      </div>
    </main>
  );
}
