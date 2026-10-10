"use client";
import { ArrowUpRight, Smile } from "lucide-react";
import Link from "./site-link";
import { useKobags } from "./kobags-context";

export function CollectionCategories() {
  const { t } = useKobags();
  return <div className="home-collection-categories" aria-label={t("Collection categories", "Kategoritë e koleksionit")}>
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
  </div>;
}
