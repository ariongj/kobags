"use client";
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
  const { lang } = useKobags();
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
              <p>{translation && c.body === original?.body ? translation.body : c.body}</p>
            </article>
          );
        })}
    </div>
  );
}
