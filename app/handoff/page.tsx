import Link from "@/components/site-link";
import {
  ArrowUpRight,
  Download,
  Check,
  Palette,
  Code2,
  Map,
} from "lucide-react";
import { PageHeading } from "@/components/site-shell";
import { siteSections } from "@/lib/site-outline";
export const metadata = {
  title: "Site outline & project handoff",
  description:
    "Clickable site structure, review walkthrough and complete design and code handoff.",
};
export default function Handoff() {
  return (
    <main className="handoff-page">
      <PageHeading
        eyebrow="KOBAGS / PROJECT HANDOFF"
        title="The whole picture. Ready to build on."
      >
        A working website, a complete page outline and a clear starting point
        for the next design or development team.
      </PageHeading>
      <div className="content-width">
        <div className="handoff-downloads">
          {[
            [
              Map,
              "Site outline",
              "A clickable route map and review sequence.",
              "#outline",
              "Explore the outline",
            ],
            [
              Palette,
              "Design handoff",
              "Identity, full-site layouts, 3D showroom, components and assets.",
              "/documents/design-handoff.md",
              "Download design notes",
            ],
            [
              Code2,
              "Code & setup",
              "Source, setup guide, data flow and verification.",
              "/documents/kobags-source.zip",
              "Download complete source",
            ],
          ].map(([Icon, title, desc, href, label]) => {
            const I = Icon as typeof Map;
            return (
              <article className="section-card" key={String(title)}>
                <I size={27} />
                <h2>{String(title)}</h2>
                <p>{String(desc)}</p>
                <a
                  className="text-button"
                  href={String(href)}
                  download={String(href).startsWith("/documents/") || undefined}
                >
                  {String(label)}
                  {String(href).startsWith("#") ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <Download size={16} />
                  )}
                </a>
              </article>
            );
          })}
        </div>
        <div className="handoff-status">
          <Check size={19} />
          <p>
            <strong>A connected demonstration.</strong> Design → request → quote
            → artwork revision → approval → production handoff → repeat request.
            Each visitor can complete the journey in their own demo workspace,
            without signing in.
          </p>
        </div>
        <section id="outline" className="handoff-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE SITE STRUCTURE</p>
              <h2>Every page has a place.</h2>
            </div>
            <a
              href="/documents/site-outline.md"
              download
              className="text-button"
            >
              Download page outline <Download size={16} />
            </a>
          </div>
          <div className="outline-grid">
            {siteSections.map((group) => (
              <article className="outline-group" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.pages.map(([href, label]) => (
                    <li key={href}>
                      <Link href={href}>
                        <span>
                          {label}
                          <small>{href}</small>
                        </span>
                        <ArrowUpRight size={16} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section className="handoff-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">REVIEW IT IN ORDER</p>
              <h2>One bag. The complete journey.</h2>
            </div>
          </div>
          <ol className="handoff-steps">
            {[
              [
                "Explore the homepage",
                "Review the factory and production process. Rotate the 3D bag, explore its construction, change the color and name, then continue into the designer.",
              ],
              [
                "Make a design",
                "Choose a shape and size, rotate it in 3D, add your logo and text, then use Place artwork for precise positioning. Inspect both sides and download the design sheet.",
              ],
              [
                "Request a quote",
                "Complete the four steps with 5,000 bags and fictional contact details. The same request appears in both workspaces.",
              ],
              [
                "Review as sales and buyer",
                "The customer can prepare an example quotation and artwork proof, accept the quote and approve the latest proof. The sales view remains available for revisions.",
              ],
              [
                "Release and repeat",
                "The customer places a simulated order after the required approvals. Sales can advance the demonstration production stages. A repeat request starts with a new reference and fresh commercial terms.",
              ],
              [
                "Review content and operations",
                "Try samples, partner and contact forms; check the inquiry inbox, content drafts, unsent notifications and activity export in Sales.",
              ],
            ].map(([h, p]) => (
              <li key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="handoff-documents">
          <div>
            <p className="eyebrow">FOR THE NEXT TEAM</p>
            <h2>
              Take the thinking
              <br />
              with the source.
            </h2>
            <p>
              The source download includes all application code, the original
              and illustrative assets, the database migration, route mapping,
              design notes and repeatable local checks. Existing demo records
              and credentials are excluded.
            </p>
          </div>
          <ul>
            {[
              ["developer-handoff.md", "Architecture, setup & extension guide"],
              ["design-handoff.md", "Design system & page composition"],
              ["migration-map.md", "Original-to-new URL migration map"],
              ["verification.md", "What was tested & remaining limits"],
              ["site-outline.md", "Complete website outline"],
            ].map(([file, label]) => (
              <li key={file}>
                <a href={"/documents/" + file} download>
                  {label}
                  <Download size={17} />
                </a>
              </li>
            ))}
          </ul>
        </section>
        <div className="notice">
          <strong>Before using this as a live sales platform:</strong> approve
          production artwork templates, catalog facts and copy; connect real
          customer and staff access, private original-file storage, messaging
          and business systems. Quote prices, payment states and manufacturing
          statuses in this demo are fictional. The studio preview is
          illustrative.
        </div>
      </div>
    </main>
  );
}
