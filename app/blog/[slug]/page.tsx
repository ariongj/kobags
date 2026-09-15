import Link from "@/components/site-link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/journal";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return {
    title: a ? a.title : "Article not found",
    description: a?.intro,
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <main className="journal-article content-width">
      <Link href="/blog" className="text-button">
        <ArrowLeft size={16} />
        Back to the journal
      </Link>
      <header>
        <p className="eyebrow">{a.category}</p>
        <h1>{a.title}</h1>
        <p className="intro">{a.intro}</p>
      </header>
      <div className="journal-article-body">
        <article className="prose">
          {a.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          <p className="source-note">
            Proposed editorial rewrite for this private demo. Product references
            come from the{" "}
            <a
              href="https://kobags-group.com/products"
              target="_blank"
              rel="noreferrer"
            >
              Kobags public catalog
            </a>
            . This page retains the{" "}
            <a
              href={"https://kobags-group.com/blog/" + a.slug}
              target="_blank"
              rel="noreferrer"
            >
              original article address
            </a>
            . Company, production and material claims require client approval.
          </p>
        </article>
        <aside className="journal-aside">
          <p className="eyebrow">MAKE IT YOURS</p>
          <h2>
            Your next bag
            <br />
            starts here.
          </h2>
          <p>Choose a shape and see your brand on it.</p>
          <Link href="/design" className="button">
            Open the studio <ArrowUpRight size={17} />
          </Link>
          <Link href="/samples" className="text-button">
            Ask about samples ↗
          </Link>
        </aside>
      </div>
    </main>
  );
}
