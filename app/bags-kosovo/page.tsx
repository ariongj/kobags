import { publishedRecords } from "@/lib/cms/records";
import { CmsContact } from "@/components/cms/public-extras";
import Link from "@/components/site-link";
import { LocalizedCopy as L, LocalizedPageHeading } from "@/components/localized-copy";
import StructuredData from "@/components/structured-data";
import { company, kosovoMunicipalities } from "@/lib/company";
import { pageMetadata, requestLanguage } from "@/lib/seo";
import { absolutePage } from "@/lib/seo-config";
import { breadcrumbs, organizationReference } from "@/lib/seo-schema";

export const generateMetadata = () => pageMetadata("/bags-kosovo");
export default async function KosovoBagsPage() {
  const lang = await requestLanguage();
  const places=(await publishedRecords()).filter(r=>r.kind==='municipality');
  return <main className="kosovo-page">
    <StructuredData data={breadcrumbs([{ path: "/", name: lang === "sq" ? "Ballina" : "Home" }, { path: "/bags-kosovo", name: lang === "sq" ? "Çanta në tërë Kosovën" : "Bags across Kosovo" }], lang)} />
    <StructuredData data={{ "@context": "https://schema.org", "@type": "Service", name: lang === "sq" ? "Prodhimi i qeseve dhe çantave me logo në Kosovë" : "Custom non-woven bag manufacturing across Kosovo", url: absolutePage("/bags-kosovo", lang), provider: organizationReference, serviceType: "Custom non-woven bag manufacturing and printing", areaServed: { "@type": "Country", name: "Kosovo", containsPlace: kosovoMunicipalities.map(name => ({ "@type": "AdministrativeArea", name })) } }} />
    <LocalizedPageHeading eyebrow="KOBAGS / ACROSS KOSOVO" eyebrowSq="KOBAGS / NË TËRË KOSOVËN" title="Your business. Your city. Your bag." titleSq="Biznesi juaj. Qyteti juaj. Çanta juaj." intro="Custom non-woven bags for businesses in every Kosovo municipality. Find the right shape, add your logo and prepare a wholesale request for your location." introSq="Qese dhe çanta jo të endura për biznese në çdo komunë të Kosovës. Zgjidhni formën, shtoni logon dhe përgatitni kërkesën me shumicë për vendndodhjen tuaj." />
    <div className="content-width kosovo-content">
      <section className="kosovo-overview" aria-labelledby="kosovo-buying">
        <div>
          <p className="eyebrow"><L en="MANUFACTURED IN KOSOVA" sq="PRODHIM VENDOR NË KOSOVË" /></p>
          <h2 id="kosovo-buying"><L en="Wholesale bags, close to your business." sq="Qese me logo, pranë biznesit tuaj." /></h2>
          <p><L en="From a boutique in Prishtina to a supermarket in Lipjan or an event in Prizren, the starting point is what your bag needs to carry. Kobags produces non-woven polypropylene bags with custom printing for retail, grocery, promotions and distribution." sq="Nga një butik në Prishtinë te një supermarket në Lipjan apo një event në Prizren, gjithçka fillon nga produkti që do të bartë çanta. Kobags prodhon qese dhe çanta nga polipropileni jo i endur, me shtyp të personalizuar për dyqane, ushqimore, promovime dhe shpërndarje." /></p>
          <div className="actions"><Link className="button" href="/products"><L en="Compare bag styles" sq="Krahasoni modelet" /> ↗</Link><Link className="button secondary" href="/design"><L en="Add your logo in 3D" sq="Shtoni logon në 3D" /> ↗</Link></div>
        </div>
        <aside className="kosovo-contact">
          <h2><L en="Speak with the manufacturer" sq="Flisni me prodhuesin" /></h2>
          <address>{company.name}<br /><CmsContact part="address"/><br /><L en="Kosovo" sq="Kosovë" /></address>
          <CmsContact part="phone"/>
          <CmsContact part="email"/>
          <Link href="/manufacturing" className="text-button"><L en="Inside our production" sq="Brenda prodhimit tonë" /> ↗</Link>
        </aside>
      </section>
      <section className="kosovo-coverage" aria-labelledby="coverage-title">
        <h2 id="coverage-title"><L en="Every city. All 38 municipalities." sq="Çdo qytet. Të 38 komunat." /></h2>
        <p><L en="We welcome wholesale inquiries from businesses across Kosovo, including towns and villages within each municipality. Include your exact delivery address so transport options, cost and timing can be confirmed in your quotation." sq="Mirëpresim kërkesa me shumicë nga bizneset në tërë Kosovën, përfshirë qytetet dhe fshatrat e çdo komune. Shënoni adresën e saktë të dorëzimit që mundësitë e transportit, kostoja dhe afati të konfirmohen në ofertë." /></p>
        <details className="kosovo-municipalities">
          <summary><L en="View all cities and municipalities" sq="Shikoni të gjitha qytetet dhe komunat" /><span aria-hidden="true">+</span></summary>
          <ul>{kosovoMunicipalities.map(name => <li key={name}>{name}{places.find(r=>r.id==='municipality-'+name)?.published?.description[lang]&&<p>{places.find(r=>r.id==='municipality-'+name)!.published!.description[lang]}</p>}</li>)}</ul>
        </details>
      </section>
      <section aria-labelledby="local-order-title">
        <h2 id="local-order-title"><L en="What to prepare for your local order" sq="Çfarë të përgatitni për porosinë tuaj" /></h2>
        <div className="kosovo-steps">
          <article><span className="eyebrow">01</span><h3><L en="Choose the format" sq="Zgjidhni formën" /></h3><p><L en="Compare D-Cut, Handle, Box, T-Shirt and String bags by dimensions and fabric weight. Match the format to the products your customers carry." sq="Krahasoni çantat D-Cut, Handle, Box, T-Shirt dhe String sipas përmasave dhe peshës së materialit. Përshtateni formën me produktet që bartin klientët tuaj." /></p><Link href="/products" className="text-button"><L en="Sizes and specifications" sq="Përmasat dhe specifikimet" /> ↗</Link></article>
          <article><span className="eyebrow">02</span><h3><L en="Plan quantity and print" sq="Planifikoni sasinë dhe shtypin" /></h3><p><L en="Prepare your logo, bag color and quantity per design. Wholesale starts from 5,000 bags; confirm how the minimum applies across sizes, colors and artwork with the team." sq="Përgatitni logon, ngjyrën e çantës dhe sasinë për secilin dizajn. Porositë me shumicë fillojnë nga 5,000 çanta; konfirmoni me ekipin si zbatohet minimumi sipas madhësive, ngjyrave dhe dizajnit." /></p><Link href="/resources" className="text-button"><L en="Prepare your bag brief" sq="Përgatitni kërkesën" /> ↗</Link></article>
          <article><span className="eyebrow">03</span><h3><L en="Tell us where and when" sq="Na tregoni ku dhe kur" /></h3><p><L en="Share your municipality, full delivery address and preferred date. Production and transport are planned separately, with final terms agreed in the quotation." sq="Shënoni komunën, adresën e plotë të dorëzimit dhe datën e dëshiruar. Prodhimi dhe transporti planifikohen veçmas, ndërsa kushtet përfundimtare dakordohen në ofertë." /></p><Link href="/quote" className="text-button"><L en="Start your quotation" sq="Filloni kërkesën për ofertë" /> ↗</Link></article>
        </div>
      </section>
    </div>
  </main>;
}
