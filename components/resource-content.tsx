"use client";
import { studioEnabled } from "@/lib/studio-availability";
import { useDemo } from "./demo-store";
import { useKobags } from "./kobags-context";
import { seed } from "@/lib/demo-domain";

const originalRecords = seed().content;
const translations: Record<string, { title: string; body: string }> = {
  artwork: {
    title: "Përgatitja e dizajnit për shtyp",
    body: "Filloni me një logo të qartë dhe ngjyrat e dëshiruara. Studioja pranon PNG, JPG dhe WebP. Formati i skedarit për prodhim, përmasat e shtypit dhe përputhja e ngjyrave dakordohen gjatë ofertimit. Miratoni provën e fundit para prodhimit.",
  },
  minimum: {
    title: "Cila është porosia minimale?",
    body: "Minimumi i publikuar është 5.000 çanta. Ndarja mes dizajneve, ngjyrave dhe madhësive konfirmohet në ofertë. Kërkoni mostra veçmas.",
  },
};
export default function ResourceContent() {
  const { state } = useDemo();
  const { lang, t } = useKobags();
  return (
    <div className="resource-guides">
      {state?.content
        .filter(
          (c) => ["guide", "faq"].includes(c.type) && c.status === "published",
        )
        .map((c) => {
          const original = originalRecords.find((record) => record.id === c.id);
          const translation = lang === "sq" ? translations[c.id] : undefined;
          return (
            <article key={c.id} className="section-card">
              <h3>{translation && c.title === original?.title ? translation.title : c.title}</h3>
              <p>{!studioEnabled && c.id === "artwork" ? t("Start with a clear logo and your intended colors. Our team will confirm production artwork formats, printable dimensions and color matching during quotation. Approve the latest proof before production.", "Filloni me një logo të qartë dhe ngjyrat e dëshiruara. Ekipi ynë konfirmon formatin për prodhim, përmasat e shtypit dhe përputhjen e ngjyrave gjatë ofertimit. Miratoni provën e fundit para prodhimit.") : translation && c.body === original?.body ? translation.body : c.body}</p>
            </article>
          );
        })}
    </div>
  );
}
