import { CmsExtras, CmsContact } from "@/components/cms/public-extras";
import { publicContent } from "@/lib/cms/public";
import CmsPublicPage from "@/components/cms/public-page";

import Certificates from "@/components/certificates";
import Link from "@/components/site-link";
import ManufacturingPage from "@/components/manufacturing-page";
import ResponsibilityPage from "@/components/responsibility-page";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
} from "lucide-react";
import { LocalizedCopy as L, LocalizedPageHeading, BuyerChecklistDownload } from "@/components/localized-copy";
import InquiryForm from "@/components/inquiry-form";
import ResourceContent from "@/components/resource-content";
import PolicyContent from "@/components/policy-content";
import { pageMetadata } from "@/lib/seo";
const titles: Record<string, string> = {
  manufacturing: "From raw material to finished bags.",
  sustainability: "Better questions. Clearer choices.",
  certifications: "Evidence you can look closer at.",
  partners: "Bring Kobags to your market.",
  "partners/apply": "A partnership starts with a conversation.",
  resources: "Prepare a better bag brief.",
  industries: "The right bag for your kind of business.",
  "industries/retail": "Packaging that fits your merchandise.",
  samples: "See it. Feel it. Then decide.",
  contact: "Talk to the Kobags team.",
  privacy: "Privacy & your data.",
  terms: "Clear expectations, from the start.",
  cookies: "Cookies & browser storage.",
};
const albanianTitles: Record<string, string> = {
  manufacturing: "Nga materiali te çanta e përfunduar.",
  sustainability: "Pyetje më të mira. Zgjedhje më të qarta.",
  certifications: "Dëshmi që mund t'i shihni nga afër.",
  partners: "Sillni Kobags në tregun tuaj.",
  "partners/apply": "Partneriteti fillon me një bisedë.",
  resources: "Përgatitni një kërkesë të plotë.",
  industries: "Çanta e duhur për biznesin tuaj.",
  "industries/retail": "Paketim që i përshtatet produktit tuaj.",
  samples: "Shikojeni. Prekeni. Pastaj vendosni.",
  contact: "Kontaktoni ekipin Kobags.",
  privacy: "Privatësia dhe të dhënat tuaja.",
  terms: "Kushte të qarta, që nga fillimi.",
  cookies: "Cookies dhe ruajtja në shfletues.",
};
const introductions: Record<string, [string, string]> = {
  manufacturing: [
    "See bag forming, finishing and the specifications agreed before manufacturing in Kosova.",
    "Shikoni formimin, përfundimin dhe specifikimet që dakordohen para prodhimit në Kosovë.",
  ],
  sustainability: [
    "Useful material information starts with precise claims and the evidence behind them.",
    "Informacioni i dobishëm për materialet mbështetet në fakte të sakta dhe dëshmi.",
  ],
  certifications: [
    "Inspect the published ISO 9001 and ISO 14001 scans, certificate details and issuer references.",
    "Shqyrtoni skanimet e publikuara ISO 9001 dhe ISO 14001, detajet e certifikatave dhe referencat e lëshuesit.",
  ],
  "partners/apply": [
    "Introduce your market, experience and preferred partnership model.",
    "Prezantoni tregun, përvojën dhe modelin e partneritetit që preferoni.",
  ],
  "industries/retail": [
    "Choose dimensions and handles around your customers’ purchases, then plan the print and quantity.",
    "Zgjidhni përmasat dhe dorezat sipas blerjeve të klientëve, pastaj planifikoni shtypin dhe sasinë.",
  ],
  partners: [
    "Three ways to introduce Kobags to the right buyers.",
    "Tri mënyra për ta prezantuar Kobags te blerësit e duhur.",
  ],
  resources: [
    "Practical guidance for choosing, designing and ordering your bags.",
    "Udhëzime praktike për zgjedhjen, dizajnimin dhe porositjen e çantave.",
  ],
  industries: [
    "Start with what you carry, where it goes and how your brand should feel.",
    "Filloni nga produkti që bartni, destinacioni i tij dhe përshtypja që doni të lërë marka juaj.",
  ],
  samples: [
    "Explore a sample inquiry before committing to a wholesale order.",
    "Kërkoni një mostër para se të vendosni për porosinë me shumicë.",
  ],
  contact: [
    "Ask about products, production or partnerships. Use the quote form for quantities, artwork and delivery requirements.",
    "Pyesni për produktet, prodhimin ose partneritetet. Përdorni formularin e ofertës për sasinë, dizajnin dhe kërkesat e dërgesës.",
  ],
};
const albanianEyebrows: Record<string, string> = {
  manufacturing: "KOBAGS / PRODHIMI",
  sustainability: "KOBAGS / PËRGJEGJËSIA",
  certifications: "KOBAGS / CERTIFIKATAT",
  partners: "KOBAGS / PARTNERËT",
  resources: "KOBAGS / UDHËZUESIT",
  industries: "KOBAGS / SEKTORËT",
  samples: "KOBAGS / MOSTRAT",
  contact: "KOBAGS / KONTAKTI",
  privacy: "KOBAGS / PRIVATËSIA",
  terms: "KOBAGS / KUSHTET",
  cookies: "KOBAGS / COOKIES",
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const path = (await params).slug.join("/");
  return pageMetadata("/" + path);
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const path = (await params).slug.join("/");
  const cms=await publicContent("/"+path);
  if(cms) return <CmsPublicPage content={cms}/>;
  if (!titles[path]) notFound();
  if (path === "manufacturing") return <ManufacturingPage />;
  if (path === "sustainability") return <ResponsibilityPage />;
  return (
    <main>
      <LocalizedPageHeading
        eyebrow={"KOBAGS / " + path.split("/")[0].toUpperCase()}
        eyebrowSq={albanianEyebrows[path.split("/")[0]]}
        title={titles[path]}
        titleSq={albanianTitles[path]}
        intro={introductions[path]?.[0]}
        introSq={introductions[path]?.[1]}
      />
      <div className="content-width">
        {path==='resources'&&<><CmsExtras kind="guide"/><CmsExtras kind="faq"/></>}
        {path==='certifications'&&<CmsExtras kind="certificate"/>}
        {path === "certifications" && <Certificates />}
        {path === "partners" && (
          <>
            <div className="partner-factory">
              <img src="/assets/client-2026-09/factory-partners.jpg" alt="Production floor at Kobags in Kosova" width="1200" height="800" loading="lazy" />
              <div><p className="eyebrow"><L en="MADE IN KOSOVA" sq="PRODHUAR NË KOSOVË" /></p><h2><L en="Partnership starts with a real production team." sq="Partneriteti fillon me një ekip të vërtetë prodhimi." /></h2></div>
            </div>
            <div className="partner-grid">
              {[
                {
                  title: "Country representative",
                  titleSq: "Përfaqësues për një vend",
                  body: "Develop a market and introduce suitable wholesale customers. Territory, responsibilities and exclusivity require an agreed partner arrangement.",
                  bodySq: "Zhvilloni një treg dhe prezantoni blerës të përshtatshëm me shumicë. Territori, përgjegjësitë dhe ekskluziviteti kërkojnë marrëveshje të veçantë partneriteti.",
                },
                {
                  title: "Sales partner",
                  titleSq: "Partner shitjesh",
                  body: "Bring relevant customer requirements into a structured quote process. Sales responsibilities and commercial terms are agreed directly.",
                  bodySq: "Sillni kërkesat e klientëve në një proces të qartë ofertimi. Përgjegjësitë e shitjes dhe kushtet tregtare dakordohen drejtpërdrejt.",
                },
                {
                  title: "Affiliate",
                  titleSq: "Partner referimi",
                  body: "Introduce potential buyers through an agreed referral model. Eligibility, attribution and commission terms need confirmation.",
                  bodySq: "Prezantoni blerës të mundshëm përmes një modeli referimi të dakorduar. Kushtet e pjesëmarrjes, atribuimit dhe komisionit duhet të konfirmohen.",
                },
              ].map(({ title, titleSq, body, bodySq }) => (
                <article className="section-card" key={title}>
                  <h2><L en={title} sq={titleSq} /></h2>
                  <p><L en={body} sq={bodySq} /></p>
                  <Link className="text-button" href="/partners/apply">
                    <L en="Apply as a partner" sq="Aplikoni si partner" /> <ArrowUpRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
        {path === "partners/apply" && (
          <div className="inquiry-layout">
            <InquiryForm kind="partner" />
            <aside className="inquiry-aside">
              <h2><L en="A useful introduction." sq="Një prezantim i vlefshëm." /></h2>
              <p>
                <L en="Tell us which partner model fits, the country you work in and the buyers you can support." sq="Na tregoni cili model partneriteti ju përshtatet, në cilin vend veproni dhe cilët blerës mund të mbështesni." />
              </p>
              <Link href="/partners" className="text-button">
                <L en="Review partner models" sq="Shikoni modelet e partneritetit" /> ↗
              </Link>
            </aside>
          </div>
        )}
        {path === "samples" && (
          <div className="inquiry-layout">
            <InquiryForm kind="sample" />
            <aside className="inquiry-aside">
              <img className="inquiry-photo" src="/assets/client-2026-09/sample-bag.jpg" alt="Printed sample bag from the Kobags collection" width="360" height="450" loading="lazy" />
              <h2>
                <L en="Get a feel" sq="Njihni nga afër" />
                <br />
                <L en="for the details." sq="detajet." />
              </h2>
              <p>
                <L en="Tell us the bag styles and material details you would like to review." sq="Na tregoni cilat forma çantash dhe cilat detaje të materialit doni të shqyrtoni." />
              </p>
              <ul>
                <li><L en="Ask which styles and materials are available." sq="Pyesni cilat forma dhe materiale janë të disponueshme." /></li>
                <li><L en="Request sample and shipping costs with your inquiry." sq="Kërkoni kostot e mostrës dhe transportit në kërkesën tuaj." /></li>
                <li>
                  <L en="Samples are separate from the 5,000-bag wholesale minimum." sq="Mostrat nuk përfshihen në minimumin prej 5,000 çantash për porosi me shumicë." />
                </li>
              </ul>
              <Link href="/products" className="text-button">
                <L en="Explore the five bag families" sq="Shikoni pesë llojet e çantave" /> ↗
              </Link>
            </aside>
          </div>
        )}
        {path === "contact" && (
          <div className="inquiry-layout">
            <InquiryForm kind="contact" />
            <aside className="inquiry-aside">
              <h2>
                <L en="Find Kobags" sq="Gjeni Kobags" />
                <br />
                <L en="in Kosova." sq="në Kosovë." />
              </h2>
              <p>
                <CmsContact part="address"/><br /><L en="Kosovo · Inquiries from every municipality" sq="Kosovë · Kërkesa nga çdo komunë" /><br /><br />
                <L en="Email or call us:" sq="Na shkruani ose na telefononi:" />
                <br />
                <CmsContact part="email"/>
                <br />
                <CmsContact part="phone"/>
              </p>
              <Link href="/bags-kosovo" className="text-button"><L en="Bags for your city" sq="Çanta për qytetin tuaj" /> ↗</Link>
              <Link href="/quote" className="text-button">
                <L en="Looking for a quotation? Start here" sq="Kërkoni ofertë? Filloni këtu" /> ↗
              </Link>
            </aside>
          </div>
        )}
        {path === "industries" && (
          <>
            <div className="industry-feature">
              <div>
                <p className="eyebrow"><L en="RETAIL & BOUTIQUES" sq="SHITJE ME PAKICË DHE BUTIQE" /></p>
                <h2>
                  <L en="Let your packaging" sq="Le të flasë paketimi" />
                  <br />
                  <L en="do the talking." sq="për markën tuaj." />
                </h2>
                <p>
                  <L en="Choose a shape for your merchandise, give your brand room to breathe and plan the quantity you need." sq="Zgjidhni formën për produktet tuaja, jepini hapësirë markës dhe planifikoni sasinë që ju nevojitet." />
                </p>
                <Link href="/industries/retail" className="button">
                  <L en="Explore retail bags" sq="Shikoni çantat për shitje" /> <ArrowUpRight size={17} />
                </Link>
              </div>
              <img
                src="/assets/client-2026-09/industry-bag.jpg"
                alt="Kobags Handle Bag for retail"
                width="400"
                height="500"
              />
            </div>
            <div className="grid-two product-notes">
              <article className="section-card">
                <h3><L en="Events & promotions" sq="Evente dhe promovime" /></h3>
                <p>
                  <L en="Explore lightweight D-Cut and String bags for printed giveaways and event materials." sq="Shikoni çantat e lehta D-Cut dhe String për dhurata promocionale dhe materiale eventesh." />
                </p>
                <Link href="/products/d-cut-bag" className="text-button">
                  <L en="View D-Cut specifications" sq="Shikoni specifikimet D-Cut" /> ↗
                </Link>
              </article>
              <article className="section-card">
                <h3><L en="Grocery & everyday carry" sq="Ushqimore dhe përdorim i përditshëm" /></h3>
                <p>
                  <L en="Compare the Box and T-Shirt profiles against the size and weight of the items your customers carry." sq="Krahasoni format Box dhe T-Shirt me madhësinë dhe peshën e artikujve që mbajnë klientët tuaj." />
                </p>
                <Link href="/products/box-bag" className="text-button">
                  <L en="View Box Bag specifications" sq="Shikoni specifikimet Box" /> ↗
                </Link>
              </article>
            </div>
          </>
        )}
        {path === "industries/retail" && (
          <>
            <div className="industry-feature">
              <div>
                <p className="eyebrow"><L en="PACKAGING FOR RETAIL" sq="PAKETIM PËR SHITJE ME PAKICË" /></p>
                <h2>
                  <L en="A good fit for" sq="Përshtatje e mirë" />
                  <br />
                  <L en="what’s inside." sq="për atë që mbart." />
                </h2>
                <p>
                  <L en="Start with your largest typical purchase, how customers carry it and how much room your logo needs. Review dimensions and a material sample before committing to production." sq="Filloni nga blerja më e madhe tipike, mënyra si e bart klienti dhe hapësira që i duhet logos suaj. Shqyrtoni përmasat dhe një mostër materiali para prodhimit." />
                </p>
                <Link href="/quote" className="button">
                  <L en="Discuss your retail bags" sq="Diskutoni çantat për dyqanin tuaj" /> <ArrowUpRight size={17} />
                </Link>
              </div>
              <img
                src="/assets/client-2026-09/retail-bag.jpg"
                alt="Kobags branded retail Handle Bag"
                width="400"
                height="500"
              />
            </div>
            <div className="grid-two product-notes">
              <article className="section-card">
                <h3><L en="D-Cut: a compact choice" sq="D-Cut: zgjedhje kompakte" /></h3>
                <p>
                  <L en="Sizes include Small at 30 × 31 × 5 cm / 60 GSM and Large at 50 × 47.5 × 12 cm / 80 GSM." sq="Madhësitë përfshijnë të voglën 30 × 31 × 5 cm / 60 GSM dhe të madhen 50 × 47.5 × 12 cm / 80 GSM." />
                </p>
                <Link href="/products/d-cut-bag" className="text-button">
                  <L en="Review D-Cut" sq="Shikoni D-Cut" /> ↗
                </Link>
              </article>
              <article className="section-card">
                <h3><L en="Handle: a familiar carry" sq="Handle: dorezë e njohur" /></h3>
                <p>
                  <L en="The Small variant is 30 × 30 × 5 cm / 60 GSM, with short handles." sq="Varianti i vogël është 30 × 30 × 5 cm / 60 GSM, me doreza të shkurtra." />
                </p>
                <Link href="/products/handle-bag" className="text-button">
                  <L en="Review Handle Bag" sq="Shikoni çantën Handle" /> ↗
                </Link>
              </article>
            </div>
            <div className="notice">
              <L en="Wholesale planning: confirm quantity per design, material color, final print artwork, destination and desired date. All timing and pricing require quotation." sq="Për porosi me shumicë, konfirmoni sasinë për secilin dizajn, ngjyrën e materialit, dizajnin final për shtyp, destinacionin dhe datën e dëshiruar. Afatet dhe çmimet përcaktohen në ofertë." />
            </div>
          </>
        )}
        {path === "resources" && (
          <>
            <div className="resource-download">
              <img className="resource-photo" src="/assets/client-2026-09/resource-bag-stacks.jpg" alt="Finished branded bags ready for order planning" width="240" height="160" loading="lazy" />
              <div>
                <h2><L en="Your bag specification checklist." sq="Lista e specifikimeve të çantës suaj." /></h2>
                <p>
                  <L en="A practical list of the details to prepare before requesting a quotation." sq="Një listë praktike e detajeve që duhen përgatitur para kërkesës për ofertë." />
                </p>
              </div>
              <BuyerChecklistDownload />
            </div>
            <ResourceContent />
            <Link className="text-button" href="/blog">
              <L en="Explore the journal & buying guides" sq="Shikoni artikujt dhe udhëzuesit" /> ↗
            </Link>
            <div className="grid-two product-notes">
              <article className="section-card">
                <h3><L en="From concept to approved artwork" sq="Nga ideja te dizajni i miratuar" /></h3>
                <p>
                  <L en="Share your logo and preferred placement with our team. We confirm printable dimensions, color references and the final artwork before production." sq="Ndani logon dhe vendosjen e dëshiruar me ekipin tonë. Konfirmojmë përmasat e shtypit, referencat e ngjyrave dhe dizajnin përfundimtar para prodhimit." />
                </p>
                <Link href="/quote" className="text-button">
                  <L en="Discuss your requirements" sq="Diskutoni kërkesat tuaja" /> ↗
                </Link>
              </article>
              <article className="section-card">
                <h3><L en="Dispatch and delivery are different" sq="Nisja dhe dorëzimi nuk janë e njëjta gjë" /></h3>
                <p>
                  <L en="Dispatch is when finished bags leave the production location. Arrival depends on transport, destination and any applicable customs process. Request a date; confirm it with the quotation." sq="Nisja ndodh kur çantat e përfunduara largohen nga vendi i prodhimit. Mbërritja varet nga transporti, destinacioni dhe procedurat doganore, nëse zbatohen. Kërkoni një datë dhe konfirmojeni në ofertë." />
                </p>
                <Link href="/quote" className="text-button">
                  <L en="Prepare a quotation request" sq="Përgatitni kërkesën për ofertë" /> ↗
                </Link>
              </article>
            </div>
          </>
        )}
        {(path === "privacy" || path === "terms" || path === "cookies") && (
          <PolicyContent kind={path} />
        )}
      </div>
    </main>
  );
}
