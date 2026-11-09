import {
  ArrowUpRight, Check, Droplets, Layers, Leaf, PackageCheck,
  Paintbrush, Recycle, Repeat2, Ruler, ShoppingBag, Sprout,
} from "lucide-react";
import Link from "@/components/site-link";
import { LocalizedCopy as L } from "@/components/localized-copy";

const materialQuestions = [
  {
    title: "What is it made of?",
    icon: Layers,
    titleSq: "Nga çfarë përbëhet?",
    body: "Our non-woven bags are made entirely from polypropylene (PP). Every component, including the fabric, handles, and stitching, is made from the same material, creating a strong, lightweight, durable, and fully recyclable product. We use water-based printing inks to support responsible manufacturing.",
    bodySq: "Çantat tona jo të endura prodhohen tërësisht nga polipropileni (PP). Çdo pjesë, përfshirë materialin, dorezat dhe qepjet, prodhohet nga i njëjti material, duke krijuar një produkt të fortë, të lehtë, të qëndrueshëm dhe plotësisht të riciklueshëm. Përdorim bojëra shtypi me bazë uji për të mbështetur prodhimin e përgjegjshëm.",
  },
  {
    title: "Can it be recycled?",
    icon: Recycle,
    titleSq: "A mund të riciklohet?",
    body: "Yes! Our bags are made from 100% recyclable polypropylene (PP). By using one material throughout all bag components, we simplify the recycling process and support efficient material recovery and reuse.",
    bodySq: "Po! Çantat tona prodhohen nga polipropileni (PP), i cili është 100% i riciklueshëm. Duke përdorur të njëjtin material për të gjitha pjesët e çantës, thjeshtojmë procesin e riciklimit dhe mbështesim rikuperimin dhe ripërdorimin efikas të materialit.",
  },
  {
    title: "How should I care for it?",
    icon: Droplets,
    titleSq: "Si duhet të kujdesem për të?",
    body: "Our bags are easy to maintain. Simply wipe clean or machine wash on a gentle, low-temperature cycle. Air dry and avoid high heat to preserve their quality and durability.",
    bodySq: "Çantat tona mirëmbahen lehtë. Pastrojini me leckë ose lajini në lavatriçe me program delikat dhe temperaturë të ulët. Thajini në ajër dhe shmangni nxehtësinë e lartë për të ruajtur cilësinë dhe qëndrueshmërinë.",
  },
];

const habits = [
  {
    icon: ShoppingBag,
    title: "Keep it within reach.", titleSq: "Mbajeni pranë.",
    body: "Fold your empty bag and keep it with the things you take when you leave. After unpacking, put it back in the same place for the next trip.",
    bodySq: "Paloseni çantën bosh dhe mbajeni pranë gjërave që merrni kur dilni. Pasi ta zbrazni, kthejeni në të njëjtin vend për daljen e radhës.",
  },
  {
    icon: Repeat2,
    title: "Give it another outing.", titleSq: "Merreni sërish me vete.",
    body: "Use the bag for shopping, everyday essentials or organising your belongings. Check the handles and seams before loading it, and choose contents that suit its size and condition.",
    bodySq: "Përdoreni çantën për blerje, sende të përditshme ose organizimin e gjërave tuaja. Kontrolloni dorezat dhe qepjet para mbushjes dhe zgjidhni përmbajtje që i përshtatet madhësisë dhe gjendjes së saj.",
  },
  {
    icon: Droplets,
    title: "Clean. Dry. Ready.", titleSq: "Pastrojeni. Thajeni. Përgatiteni.",
    body: "Empty the bag before cleaning and follow the care guidance above. Let it air dry completely before folding or putting it away, ready for its next use.",
    bodySq: "Zbrazeni çantën para pastrimit dhe ndiqni udhëzimet e mirëmbajtjes më lart. Lëreni të thahet plotësisht në ajër para se ta palosni ose ta ruani për përdorimin tjetër.",
  },
];

const specifications = [
  {
    icon: Ruler, title: "Use & dimensions", titleSq: "Përdorimi dhe përmasat",
    body: "Tell us what the bag will carry, the size of the contents and the typical load. Compare the bag dimensions and handle style with a sample.",
    bodySq: "Na tregoni çfarë do të mbajë çanta, përmasat e përmbajtjes dhe ngarkesën tipike. Krahasoni përmasat e çantës dhe llojin e dorezës me një mostër.",
  },
  {
    icon: Layers, title: "Material & fabric weight", titleSq: "Materiali dhe pesha e pëlhurës",
    body: "Confirm the material, GSM and bag colour for the selected size. Ask which specification suits your intended use before approving production.",
    bodySq: "Konfirmoni materialin, peshën në GSM dhe ngjyrën për madhësinë e zgjedhur. Pyesni cili specifikim i përshtatet përdorimit tuaj para miratimit të prodhimit.",
  },
  {
    icon: Paintbrush, title: "Print & placement", titleSq: "Shtypi dhe vendosja",
    body: "Prepare your logo, print colours, preferred sides and placement. Review the printable area and approve the final artwork proof with the team.",
    bodySq: "Përgatitni logon, ngjyrat e shtypit, anët dhe vendosjen e dëshiruar. Shqyrtoni sipërfaqen e shtypit dhe miratoni provën përfundimtare të dizajnit me ekipin.",
  },
  {
    icon: PackageCheck, title: "Quantity & delivery", titleSq: "Sasia dhe dërgesa",
    body: "Plan the quantity for each design and size. Include the destination and requested date so the quotation can address production and transport together.",
    bodySq: "Planifikoni sasinë për secilin dizajn dhe madhësi. Përfshini destinacionin dhe datën e dëshiruar që oferta të trajtojë së bashku prodhimin dhe transportin.",
  },
];

export default function ResponsibilityPage() {
  return (
    <main className="responsibility-page">
      <header className="responsibility-hero">
        <div className="responsibility-hero-inner content-width">
          <div className="responsibility-hero-copy">
            <p className="responsibility-label"><Leaf size={16} aria-hidden="true" /><L en="OUR RESPONSIBILITY" sq="PËRGJEGJËSIA JONË" /></p>
            <h1><L en="Better questions." sq="Pyetje më të mira." />{" "}<span><L en="Clearer choices." sq="Zgjedhje më të qarta." /></span></h1>
            <p className="intro"><L en="A bag’s story continues after the first trip. Understand the material, care for it and make reuse part of the everyday." sq="Historia e çantës vazhdon pas përdorimit të parë. Njihni materialin, kujdesuni për të dhe bëjeni ripërdorimin pjesë të përditshmërisë." /></p>
            <p className="responsibility-origin"><span aria-hidden="true" /><L en="MADE IN KOSOVA · CARRIED EVERY DAY" sq="PRODHUAR NË KOSOVË · PËR ÇDO DITË" /></p>
          </div>
          <div className="responsibility-tag-scene">
            <Leaf className="responsibility-leaf responsibility-leaf-one" size={88} strokeWidth={1} aria-hidden="true" />
            <Sprout className="responsibility-leaf responsibility-leaf-two" size={100} strokeWidth={1} aria-hidden="true" />
            <div className="responsibility-tag">
              <span className="responsibility-tag-hole" aria-hidden="true" />
              <Leaf size={44} strokeWidth={1.4} aria-hidden="true" />
              <p><span><L en="USE." sq="PËRDOR." /></span><span><L en="REUSE." sq="RIPËRDOR." /></span><span><L en="REPEAT." sq="PËRSËRIT." /></span></p>
              <span className="responsibility-tag-caption"><L en="A SIMPLE EVERYDAY HABIT" sq="NJË ZAKON I PËRDITSHËM" /></span>
            </div>
          </div>
        </div>
      </header>

      <div className="content-width responsibility-content">
        <nav className="responsibility-page-links" aria-labelledby="responsibility-guide-label">
          <span id="responsibility-guide-label"><L en="IN THIS GUIDE" sq="NË KËTË UDHËZUES" /></span>
          <Link href="#material"><L en="The material" sq="Materiali" /></Link>
          <Link href="#reuse"><L en="Everyday reuse" sq="Ripërdorimi" /></Link>
          <Link href="#specification"><L en="Before ordering" sq="Para porosisë" /></Link>
          <Link href="#end-of-use"><L en="End of use" sq="Pas përdorimit" /></Link>
        </nav>

        <section id="material" className="responsibility-section" aria-labelledby="responsibility-material-heading">
          <div className="material-feature">
            <figure className="responsibility-material-photo">
              <img src="/assets/client-2026-09/material-printed-rolls.webp" alt="" width={640} height={425} loading="lazy" decoding="async" />
              <figcaption><L en="Printed non-woven material at the Kobags factory." sq="Material jo i endur, i shtypur në fabrikën Kobags." /></figcaption>
            </figure>
            <div>
              <p className="eyebrow"><L en="KNOW YOUR MATERIAL" sq="NJIHNI MATERIALIN" /></p>
              <h2 id="responsibility-material-heading"><L en="One material." sq="Një material." /><br /><L en="Many more uses." sq="Për shumë përdorime." /></h2>
              <p><L en="Designed for reuse. Made with one material. Recyclable by design." sq="Projektuar për ripërdorim. Prodhuar me një material. Të riciklueshme që në projektim." /></p>
            </div>
          </div>
          <div className="manufacturing-grid responsibility-principles">
            {materialQuestions.map(({ icon: Icon, title, titleSq, body, bodySq }) => (
              <article className="section-card" key={title}>
                <div className="responsibility-card-top"><Icon size={24} strokeWidth={1.6} aria-hidden="true" /></div>
                <h3><L en={title} sq={titleSq} /></h3>
                <p><L en={body} sq={bodySq} /></p>
              </article>
            ))}
          </div>
          <p className="responsibility-local-note"><Recycle size={19} aria-hidden="true" /><span><L en="Recycling depends on local collection and processing. Check whether the finished, printed PP bag is accepted where it will be used." sq="Riciklimi varet nga grumbullimi dhe përpunimi lokal. Kontrolloni nëse çanta PP e përfunduar dhe e shtypur pranohet aty ku do të përdoret." /></span></p>
        </section>

        <section id="reuse" className="responsibility-section responsibility-reuse" aria-labelledby="responsibility-reuse-heading">
          <div className="responsibility-section-heading">
            <p className="eyebrow"><L en="SMALL HABITS, EVERY DAY" sq="ZAKONE TË VOGLA, ÇDO DITË" /></p>
            <h2 id="responsibility-reuse-heading"><L en="Make the next use easy." sq="Bëjeni të lehtë përdorimin tjetër." /></h2>
            <p><L en="A reusable bag is most useful when it becomes part of your routine. Keep it ready, look after it and bring it along again." sq="Një çantë e ripërdorshme është më e dobishme kur bëhet pjesë e rutinës suaj. Mbajeni gati, kujdesuni për të dhe merreni sërish me vete." /></p>
          </div>
          <div className="responsibility-habits">
            {habits.map(({ icon: Icon, title, titleSq, body, bodySq }) => (
              <article key={title}>
                <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
                <h3><L en={title} sq={titleSq} /></h3>
                <p><L en={body} sq={bodySq} /></p>
              </article>
            ))}
          </div>
        </section>

        <section id="specification" className="responsibility-section responsibility-planning" aria-labelledby="responsibility-planning-heading">
          <div className="responsibility-section-heading">
            <p className="eyebrow"><L en="BEFORE YOU ORDER" sq="PARA SE TË POROSITNI" /></p>
            <h2 id="responsibility-planning-heading"><L en="Choose the bag around the job." sq="Zgjidhni çantën sipas përdorimit." /></h2>
            <p><L en="Start with what your customers will carry. A clear brief helps the team match the dimensions, handles, material and print to your actual needs." sq="Filloni me atë që do të mbajnë klientët tuaj. Një përshkrim i qartë e ndihmon ekipin t’i përshtatë përmasat, dorezat, materialin dhe shtypin me nevojat tuaja." /></p>
            <div className="responsibility-sample-note">
              <Check size={20} aria-hidden="true" />
              <div><h3><L en="See and feel it first." sq="Shikojeni dhe prekeni fillimisht." /></h3><p><L en="Ask which samples are available and review the material and construction before deciding on your order." sq="Pyesni cilat mostra janë të disponueshme dhe shqyrtoni materialin e punimin para se të vendosni për porosinë." /></p><Link href="/samples" className="text-button"><L en="Request a sample" sq="Kërkoni një mostër" /><ArrowUpRight size={16} aria-hidden="true" /></Link></div>
            </div>
          </div>
          <ul className="responsibility-specification-list">
            {specifications.map(({ icon: Icon, title, titleSq, body, bodySq }) => (
              <li key={title}><Icon size={23} strokeWidth={1.6} aria-hidden="true" /><div><h3><L en={title} sq={titleSq} /></h3><p><L en={body} sq={bodySq} /></p></div></li>
            ))}
          </ul>
        </section>

        <section id="end-of-use" className="responsibility-section responsibility-end-of-use" aria-labelledby="responsibility-end-heading">
          <div className="responsibility-section-heading">
            <p className="eyebrow"><L en="WHEN THE BAG HAS SERVED ITS PURPOSE" sq="KUR ÇANTA E KA KRYER FUNKSIONIN" /></p>
            <h2 id="responsibility-end-heading"><L en="Check the next destination." sq="Kontrolloni destinacionin e radhës." /></h2>
            <p><L en="Keep using a bag that is still suitable for the task. When it is no longer usable, ask your local collection service about the finished bag before choosing a disposal route." sq="Vazhdoni ta përdorni çantën nëse ende i përshtatet nevojës. Kur nuk mund të përdoret më, pyesni shërbimin lokal të grumbullimit për çantën e përfunduar para se të vendosni ku ta hidhni." /></p>
          </div>
          <div className="responsibility-questions">
            <details>
              <summary><L en="Can I put it in my local recycling bin?" sq="A mund ta vendos në koshin lokal të riciklimit?" /></summary>
              <p><L en="The destination, collection system and finished bag all matter. Do not assume a bag will be accepted locally because its material can be recycled in some settings. Review printing and other components as part of the question." sq="Destinacioni, sistemi i grumbullimit dhe çanta e përfunduar kanë rëndësi. Mos supozoni se një çantë pranohet lokalisht vetëm sepse materiali mund të riciklohet diku tjetër. Përfshini shtypin dhe pjesët e tjera në vlerësim." /></p>
              <p><L en="Describe it as a printed non-woven polypropylene bag and follow the collector’s preparation instructions. If it is not accepted, ask about the appropriate local disposal option." sq="Përshkruajeni si çantë të shtypur prej polipropileni jo të endur dhe ndiqni udhëzimet e grumbulluesit për përgatitjen. Nëse nuk pranohet, pyesni për mënyrën e përshtatshme lokale të hedhjes." /></p>
            </details>
            <details>
              <summary><L en="Does recyclable mean it contains recycled material?" sq="A do të thotë e riciklueshme se përmban material të ricikluar?" /></summary>
              <p><L en="Recyclability and recycled content describe different things. The PP material description does not establish a recycled percentage. Ask for a product-specific declaration if recycled content is part of your purchasing requirements." sq="Riciklueshmëria dhe përmbajtja e ricikluar janë gjëra të ndryshme. Përshkrimi i materialit PP nuk përcakton një përqindje të ricikluar. Kërkoni deklaratë për produktin konkret nëse përmbajtja e ricikluar është pjesë e kërkesave tuaja të blerjes." /></p>
            </details>
            <details>
              <summary><L en="What evidence should I request for my order?" sq="Çfarë dëshmish duhet të kërkoj për porosinë time?" /></summary>
              <p><L en="Figures for environmental impact, product lifetime, recycled percentage and food contact require product-specific evidence and clear scope. Ask for the relevant evidence for your bag." sq="Të dhënat për ndikimin mjedisor, jetëgjatësinë, përqindjen e materialit të ricikluar dhe kontaktin me ushqimin kërkojnë dëshmi për produktin konkret dhe fushë të qartë zbatimi. Kërkoni dëshmitë për çantën tuaj." /></p>
              <p><L en="Management-system certificates describe the certified organization and scope. They do not by themselves establish a bag’s environmental performance." sq="Certifikatat e sistemeve të menaxhimit përshkruajnë organizatën dhe fushën e certifikuar. Ato nuk provojnë vetë performancën mjedisore të një çante." /></p>
              <Link href="/certifications" className="text-button"><L en="Review the certificate references" sq="Shikoni certifikatat" /><ArrowUpRight size={16} aria-hidden="true" /></Link>
            </details>
          </div>
        </section>

        <div className="responsibility-next-step">
          <div><p className="eyebrow"><L en="A CLEAR BRIEF. A USEFUL BAG." sq="KËRKESË E QARTË. ÇANTË E DOBISHME." /></p><h2><L en="Plan your next bag with us." sq="Planifikoni me ne çantën tuaj të radhës." /></h2><p><L en="Bring your questions about material, print and everyday use into your quotation request." sq="Përfshini në kërkesën për ofertë pyetjet tuaja për materialin, shtypin dhe përdorimin e përditshëm." /></p></div>
          <Link href="/quote" className="button"><L en="Request a quote" sq="Kërkoni ofertë" /><ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </main>
  );
}
