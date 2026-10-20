"use client";

import Link from "@/components/site-link";
import { useKobags } from "@/components/kobags-context";

export default function NotFound() {
  const { t } = useKobags();
  return (
    <main className="success-page content-width">
      <p className="eyebrow">{t("404 / PAGE NOT FOUND", "404 / FAQJA NUK U GJET")}</p>
      <h1>{t("This page isn’t in the bag.", "Kjo faqe nuk u gjet.")}</h1>
      <p>{t("Explore our bags or contact us about your next order.", "Shikoni çantat tona ose na kontaktoni për porosinë tuaj të radhës.")}</p>
      <div className="actions">
        <Link href="/" className="button">{t("Back to home", "Kthehu në ballinë")}</Link>
        <Link href="/products" className="button secondary">{t("Choose your bag", "Zgjidhni çantën tuaj")}</Link>
      </div>
    </main>
  );
}
