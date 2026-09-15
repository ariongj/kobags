import Link from "@/components/site-link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  ArrowRight,
  FileText,
  Layers,
  Paintbrush,
  PackageCheck,
  Factory,
  Leaf,
  Download,
} from "lucide-react";
import { PageHeading } from "@/components/site-shell";
import InquiryForm from "@/components/inquiry-form";
import ResourceContent from "@/components/resource-content";
import CookieControls from "@/components/cookie-controls";
const titles: Record<string, string> = {
  manufacturing: "Made in Kosovo. Carried everywhere.",
  sustainability: "Better questions. Clearer choices.",
  certifications: "Evidence you can look closer at.",
  partners: "Let’s build the next connection.",
  "partners/apply": "A partnership starts with a conversation.",
  resources: "A little knowledge goes a long way.",
  industries: "The right bag for your kind of business.",
  "industries/retail": "Turn every purchase into a brand moment.",
  samples: "See it. Feel it. Then decide.",
  contact: "Let’s talk about your next bag.",
  privacy: "Privacy in this demonstration.",
  terms: "Clear expectations, from the start.",
  cookies: "Your privacy preferences.",
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const path = (await params).slug.join("/");
  return {
    title: titles[path] || "Page not found",
    description: titles[path]
      ? titles[path] + " Kobags Group website demonstration."
      : undefined,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const path = (await params).slug.join("/");
  if (!titles[path]) notFound();
  return (
    <main>
      <PageHeading
        eyebrow={"KOBAGS / " + path.split("/")[0].toUpperCase()}
        title={titles[path]}
      >
        {
          (
            {
              manufacturing:
                "A closer look at the people, material and process behind your bags.",
              sustainability:
                "Useful material information starts with precise claims and the evidence behind them.",
              partners: "Three ways to introduce Kobags to the right buyers.",
              resources:
                "Practical guidance for choosing, designing and ordering your bags.",
              industries:
                "Start with what you carry, where it goes and how your brand should feel.",
              samples:
                "Explore a sample inquiry before committing to a wholesale order.",
              contact:
                "General questions have their own place. For a bag quotation, start with your design.",
            } as Record<string, string>
          )[path]
        }
      </PageHeading>
      <div className="content-width">
        {path === "manufacturing" && (
          <>
            <div className="manufacturing-hero">
              <img
                src="/assets/factory.webp"
                alt="Original Kobags factory machinery and material rolls"
                width="1200"
                height="600"
              />
              <div>
                <p className="eyebrow">LIPJAN, KOSOVO</p>
                <h2>
                  Where your bag
                  <br />
                  takes shape.
                </h2>
              </div>
            </div>
            <div className="manufacturing-grid">
              {[
                [
                  Layers,
                  "01 / Material",
                  "Define the non-woven PP material, GSM, bag shape and color for your application.",
                ],
                [
                  Paintbrush,
                  "02 / Printing",
                  "Published product details describe flexographic printing in up to four colors. Confirm capabilities for your selected product.",
                ],
                [
                  PackageCheck,
                  "03 / Approval & dispatch",
                  "Review the quotation and artwork proof before production. Confirm dispatch timing and destination-dependent transport.",
                ],
              ].map(([Icon, h, p]) => {
                const I = Icon as typeof Layers;
                return (
                  <article className="section-card" key={String(h)}>
                    <I size={24} />
                    <h3>{String(h)}</h3>
                    <p>{String(p)}</p>
                  </article>
                );
              })}
            </div>
            <section className="grid-two video-section">
              <div>
                <p className="eyebrow">A LOOK INSIDE</p>
                <h2>
                  The print process,
                  <br />
                  in motion.
                </h2>
                <p>
                  Original video from Kobags’ public website. Playback starts
                  when you choose.
                </p>
                <p className="source-note">
                  The general catalog also mentions screen printing and heat
                  transfer. Their availability by product needs production
                  confirmation.
                </p>
              </div>
              <video
                controls
                preload="none"
                poster="/assets/factory-printing.webp"
                width="900"
                height="600"
              >
                <source src="/assets/printing-process.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </section>
            <p className="source-note">
              Original photographs and video:{" "}
              <a
                href="https://kobags-group.com/"
                target="_blank"
                rel="noreferrer"
              >
                Kobags Group
              </a>
              .
            </p>
          </>
        )}
        {path === "sustainability" && (
          <>
            <div className="material-feature">
              <span>PP</span>
              <div>
                <p className="eyebrow">KNOW YOUR MATERIAL</p>
                <h2>
                  Reusable starts with
                  <br />
                  how you use it.
                </h2>
                <p>
                  Non-woven polypropylene is a plastic material. It can be
                  designed for repeated use, but recycled content, recyclability
                  and reuse are different questions.
                </p>
              </div>
            </div>
            <div className="manufacturing-grid">
              {[
                [
                  "What is it made of?",
                  "The published specifications describe non-woven PP. Ask for a product-specific declaration of material composition; do not infer recycled content from the material name.",
                ],
                [
                  "Can it be recycled?",
                  "Collection and processing options depend on your destination. Check local acceptance for the actual finished bag, including print and other components.",
                ],
                [
                  "How should I care for it?",
                  "The current FAQ recommends wiping with a damp cloth or gentle hand washing, avoiding machine washing and high heat. Confirm care instructions for the finished product.",
                ],
              ].map(([h, p]) => (
                <article className="section-card" key={h}>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </article>
              ))}
            </div>
            <section className="prose">
              <h2>Evidence before broad claims.</h2>
              <p>
                Figures for environmental impact, product lifetime, recycled
                percentage and food contact require product-specific evidence
                and clear scope. This demonstration does not publish unsupported
                impact totals.
              </p>
              <p>
                Management-system certificates describe the certified
                organization and scope. They do not by themselves establish a
                bag’s environmental performance.
              </p>
              <Link href="/certifications">
                Review the certificate references →
              </Link>
            </section>
          </>
        )}
        {path === "certifications" && (
          <>
            <p className="notice">
              Existing certificate scans are retained as public-site evidence.
              Approved files, issuer verification, certified entity, scope and
              validity dates still need client confirmation.
            </p>
            <div className="certificate-grid">
              {[
                ["9001", "Quality management", "ISO 9001:2015"],
                ["14001", "Environmental management", "ISO 14001:2015"],
              ].map(([n, desc, title]) => (
                <article className="section-card" key={n}>
                  <a
                    href={"/assets/certificate-iso" + n + ".webp"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={"/assets/certificate-iso" + n + ".webp"}
                      alt={
                        "Existing " +
                        title +
                        " certificate scan from the Kobags public website; details require verification"
                      }
                      width="400"
                      height="560"
                    />
                  </a>
                  <p className="eyebrow">{desc}</p>
                  <h2>{title}</h2>
                  <p>
                    Management-system reference. Current scope and verification
                    pending client confirmation.
                  </p>
                  <a
                    className="text-button"
                    href={"/assets/certificate-iso" + n + ".webp"}
                    download
                  >
                    Download existing scan <Download size={15} />
                  </a>
                </article>
              ))}
            </div>
            <p className="source-note">
              Source:{" "}
              <a
                href="https://kobags-group.com/certifications"
                target="_blank"
                rel="noreferrer"
              >
                Kobags certifications
              </a>
              . Guidance:{" "}
              <a
                href="https://www.iso.org/certification.html"
                target="_blank"
                rel="noreferrer"
              >
                ISO certification information
              </a>
              .
            </p>
          </>
        )}
        {path === "partners" && (
          <>
            <div className="partner-grid">
              {[
                [
                  "01",
                  "Country representative",
                  "Develop a market and introduce suitable wholesale customers. Territory, responsibilities and exclusivity require an agreed partner arrangement.",
                ],
                [
                  "02",
                  "Sales partner",
                  "Bring relevant customer requirements into a structured quote process. Sales responsibilities and commercial terms are agreed directly.",
                ],
                [
                  "03",
                  "Affiliate",
                  "Introduce potential buyers through an agreed referral model. Eligibility, attribution and commission terms need confirmation.",
                ],
              ].map(([n, h, p]) => (
                <article className="section-card" key={n}>
                  <span className="partner-number">{n}</span>
                  <h2>{h}</h2>
                  <p>{p}</p>
                  <Link className="text-button" href="/partners/apply">
                    Apply as a partner <ArrowUpRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
            <div className="notice">
              These models are described on Kobags’ existing partner page. The
              demo does not imply that an affiliate platform, commission
              integration or live partner account is connected.
            </div>
          </>
        )}
        {path === "partners/apply" && (
          <div className="inquiry-layout">
            <InquiryForm kind="partner" />
            <aside className="inquiry-aside">
              <h2>A useful introduction.</h2>
              <p>
                Tell us which partner model fits, the country you work in and
                the buyers you can support.
              </p>
              <p>
                Applications appear in the sales demo for review. No partner
                agreement is created.
              </p>
              <Link href="/partners" className="text-button">
                Review partner models ↗
              </Link>
            </aside>
          </div>
        )}
        {path === "samples" && (
          <div className="inquiry-layout">
            <InquiryForm kind="sample" />
            <aside className="inquiry-aside">
              <h2>
                Get a feel
                <br />
                for the details.
              </h2>
              <p>
                Tell us the bag styles and material details you would like to
                review.
              </p>
              <ul>
                <li>Sample availability requires confirmation.</li>
                <li>Sample and shipping costs are not yet specified.</li>
                <li>
                  Samples are separate from the published 5,000-bag wholesale
                  minimum.
                </li>
              </ul>
              <Link href="/products" className="text-button">
                Explore the five bag families ↗
              </Link>
            </aside>
          </div>
        )}
        {path === "contact" && (
          <div className="inquiry-layout">
            <InquiryForm kind="contact" />
            <aside className="inquiry-aside">
              <h2>
                Find Kobags
                <br />
                in Lipjan.
              </h2>
              <p>Lipjan, Kosovo</p>
              <p>
                Published contact details:
                <br />
                info@kobags-group.com
                <br />
                +383 43 877 753
              </p>
              <p>
                Demo forms save isolated records. These contact details are
                shown for reference.
              </p>
              <Link href="/quote" className="text-button">
                Looking for a quotation? Start here ↗
              </Link>
            </aside>
          </div>
        )}
        {path === "industries" && (
          <>
            <div className="industry-feature">
              <div>
                <p className="eyebrow">RETAIL & BOUTIQUES</p>
                <h2>
                  Let your packaging
                  <br />
                  do the talking.
                </h2>
                <p>
                  Choose a shape for your merchandise, give your brand room to
                  breathe and plan the quantity you need.
                </p>
                <Link href="/industries/retail" className="button">
                  Explore retail bags <ArrowUpRight size={17} />
                </Link>
              </div>
              <img
                src="/assets/handle-bag.webp"
                alt="Kobags Handle Bag for retail"
                width="400"
                height="500"
              />
            </div>
            <div className="grid-two product-notes">
              <article className="section-card">
                <h3>Events & promotions</h3>
                <p>
                  Explore lightweight D-Cut and String bags for printed
                  giveaways and event materials.
                </p>
                <Link href="/products/d-cut-bag" className="text-button">
                  View D-Cut specifications ↗
                </Link>
              </article>
              <article className="section-card">
                <h3>Grocery & everyday carry</h3>
                <p>
                  Compare the Box and T-Shirt profiles against the size and
                  weight of the items your customers carry.
                </p>
                <Link href="/products/box-bag" className="text-button">
                  View Box Bag specifications ↗
                </Link>
              </article>
            </div>
          </>
        )}
        {path === "industries/retail" && (
          <>
            <div className="industry-feature">
              <div>
                <p className="eyebrow">PACKAGING FOR RETAIL</p>
                <h2>
                  A good fit for
                  <br />
                  what’s inside.
                </h2>
                <p>
                  Start with your largest typical purchase, how customers carry
                  it and how much room your logo needs. Review dimensions and a
                  material sample before committing to production.
                </p>
                <Link href="/design" className="button">
                  Design your retail bag <ArrowUpRight size={17} />
                </Link>
              </div>
              <img
                src="/assets/d-cut-bag.webp"
                alt="Kobags D-Cut bag"
                width="400"
                height="500"
              />
            </div>
            <div className="grid-two product-notes">
              <article className="section-card">
                <h3>D-Cut: a compact choice</h3>
                <p>
                  Published sizes include Small at 30 × 31 × 5 cm / 60 GSM and
                  Large at 50 × 47.5 × 12 cm / 80 GSM.
                </p>
                <Link href="/products/d-cut-bag" className="text-button">
                  Review D-Cut ↗
                </Link>
              </article>
              <article className="section-card">
                <h3>Handle: a familiar carry</h3>
                <p>
                  The published Small variant is 30 × 30 × 5 cm / 60 GSM, with
                  short handles.
                </p>
                <Link href="/products/handle-bag" className="text-button">
                  Review Handle Bag ↗
                </Link>
              </article>
            </div>
            <div className="notice">
              Wholesale planning: confirm quantity per design, material color,
              final print artwork, destination and desired date. All timing and
              pricing require quotation.
            </div>
          </>
        )}
        {path === "resources" && (
          <>
            <div className="resource-download">
              <FileText size={34} />
              <div>
                <h2>Your bag specification checklist.</h2>
                <p>
                  A practical list of the details to prepare before requesting a
                  quotation.
                </p>
              </div>
              <a
                href="/documents/buyer-checklist.txt"
                className="button secondary"
                download
              >
                <Download size={16} />
                Download checklist
              </a>
            </div>
            <ResourceContent />
            <Link className="text-button" href="/blog">
              Explore the journal & buying guides ↗
            </Link>
            <div className="grid-two product-notes">
              <article className="section-card">
                <h3>From concept to approved artwork</h3>
                <p>
                  Use the studio to explore placement. Production still needs
                  approved printable dimensions, a color reference and a
                  specific artwork revision before release.
                </p>
                <Link href="/design" className="text-button">
                  Try the bag studio ↗
                </Link>
              </article>
              <article className="section-card">
                <h3>Dispatch and delivery are different</h3>
                <p>
                  Dispatch is when finished bags leave the production location.
                  Arrival depends on transport, destination and any applicable
                  customs process. Request a date; confirm it with the
                  quotation.
                </p>
                <Link href="/quote" className="text-button">
                  Prepare a quotation request ↗
                </Link>
              </article>
            </div>
          </>
        )}
        {path === "privacy" && (
          <article className="prose">
            <p>
              This is a public website demonstration, independent of Kobags’
              production systems. Use fictional company and contact details.
            </p>
            <h2>What this demonstration stores</h2>
            <p>
              Your draft design and language preference are stored in your
              browser. When you submit, your demo workspace stores your
              configuration, normalized logo preview, contact fields and consent
              acknowledgment. Original full-resolution logo files are not
              retained by this demo.
            </p>
            <p>
              Demo requests, quotations, artwork revisions and recorded
              approvals and simulated orders persist in a separate workspace for
              your demo session. An essential cookie keeps anonymous visitors in
              their own workspace for up to seven days. Signed-in visitors use
              their own account workspace. This is not a production customer
              account system.
            </p>
            <h2>How the information is used</h2>
            <p>
              Records support the demonstration of quotation and approval
              workflows. No real email, marketing message, payment or
              manufacturing order is sent. No advertising analytics or
              third-party tracking tags are installed in this implementation.
            </p>
            <h2>Controls and limits</h2>
            <p>
              You can clear the browser draft on the cookies page. The sales
              demo provides export and reset actions for its synthetic records.
              Reset removes the active demo records; provider-level backup
              retention must be confirmed before collecting real data.
            </p>
            <h2>Before commercial launch</h2>
            <p>
              The client must approve the legal entity, data controller,
              retention periods, processors, international transfers and contact
              process. This page describes the demonstration; it is not an
              approved production privacy policy.
            </p>
          </article>
        )}
        {path === "terms" && (
          <article className="prose">
            <h2>A demonstration, not an offer</h2>
            <p>
              Studio previews are indicative. Neither a preview nor a demo
              quotation is a binding Kobags offer. Prices in the customer and
              sales workspaces are explicitly fictional, and no payment is
              collected.
            </p>
            <h2>Production requires confirmation</h2>
            <p>
              Material availability, dimensional drawings, printable area, print
              method, quantity rules, sample terms, prices, shipping, tax,
              payment and delivery commitments require client approval and a
              formal commercial agreement.
            </p>
            <h2>Artwork and branding</h2>
            <p>
              Use artwork you are entitled to use. A final artwork approval must
              identify a specific revision and approved production template. The
              demo illustrates this process without authorizing manufacturing.
            </p>
            <h2>Before launch</h2>
            <p>
              The legal owner must approve production terms, entity details,
              jurisdiction, order acceptance, shipment and claims procedures. No
              legal registration or contractual terms are invented for this
              demonstration.
            </p>
          </article>
        )}
        {path === "cookies" && (
          <article className="prose">
            <h2>Only what the demo needs</h2>
            <p>
              This implementation keeps a design draft, quote step and language
              preference in browser storage. An essential, seven-day session
              cookie connects anonymous visitors to their own saved demo
              records. Clearing it or changing browsers starts a new demo
              workspace; cookie expiry does not erase server records. Hosting
              may also use sign-in cookies for signed-in visitors. The site does
              not install advertising or analytics tags.
            </p>
            <h2>Clear your design draft</h2>
            <p>
              This clears your local bag configuration. It does not delete
              already submitted requests. Use the sales demo’s reset action for
              synthetic server records.
            </p>
            <CookieControls />
          </article>
        )}
        {![
          "privacy",
          "terms",
          "cookies",
          "samples",
          "contact",
          "partners/apply",
        ].includes(path) && (
          <div className="catalog-end">
            <div>
              <p className="eyebrow">READY WHEN YOU ARE</p>
              <h2>Let’s make your bag.</h2>
            </div>
            <Link href="/design" className="button">
              Design your bag <ArrowUpRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
