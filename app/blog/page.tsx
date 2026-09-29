import Link from "@/components/site-link";
import { ArrowUpRight } from "lucide-react";
import { PageHeading } from "@/components/site-shell";
import { articles } from "@/lib/journal";
const journalPhotos: Record<string, { src: string; alt: string }> = {
  kobagsjourney: { src: "/assets/client-2026-09/journal-factory.jpg", alt: "Kobags production equipment" },
  whyswitchtokobags: { src: "/assets/client-2026-09/journal-reuse.jpg", alt: "Black reusable handle bag" },
  kobagsmission: { src: "/assets/client-2026-09/journal-brand-red-print.webp", alt: "Close-up of a red Kobags handle bag with printed brand artwork" },
  sciencebehindkobags: { src: "/assets/client-2026-09/journal-material.jpg", alt: "Material processing machinery" },
  benefitsofkobags: { src: "/assets/client-2026-09/journal-checklist-production.webp", alt: "Branded box bag showing its handles and side gusset inside the Kobags factory" },
  helpingbusinesseskobags: { src: "/assets/client-2026-09/journal-orders-ready.webp", alt: "Stacks of printed bag panels prepared for assembly" },
};
export const metadata = {
  title: "Journal & buying guides",
  description:
    "Practical guidance for choosing, branding and ordering reusable bags.",
};
export default function Journal() {
  return (
    <main>
      <PageHeading
        eyebrow="THE KOBAGS JOURNAL"
        title="Good ideas, ready to carry."
      >
        Useful questions, thoughtful details and a clearer path to your next
        bag.
      </PageHeading>
      <div className="content-width">
        <div className="journal-grid">
          {articles.map((a, i) => (
            <Link
              href={"/blog/" + a.slug}
              className="journal-card"
              key={a.slug}
            >
              <img className="journal-photo" src={journalPhotos[a.slug].src} alt={journalPhotos[a.slug].alt} width="600" height="400" loading={i > 2 ? "lazy" : "eager"} />
              <span className="journal-number">0{i + 1}</span>
              <p className="eyebrow">{a.category}</p>
              <h2>{a.title}</h2>
              <p>{a.intro}</p>
              <span className="text-button">
                Read the guide <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
