"use client";

import { useKobags } from "./kobags-context";
import CookieControls from "./cookie-controls";

type PolicyKind = "privacy" | "terms" | "cookies";
type Copy = [string, string];
type Section = { title: Copy; paragraphs: Copy[] };
const policies: Record<PolicyKind, { intro?: Copy; sections: Section[] }> = {
  privacy: {
    intro: [
      "This public website demonstration is independent of Kobags’ production systems. Use fictional company and contact details.",
      "Ky demonstrim publik i faqes është i pavarur nga sistemet e prodhimit të Kobags. Përdorni të dhëna fiktive të kompanisë dhe kontaktit.",
    ],
    sections: [
      {
        title: ["What is stored", "Çfarë ruhet"],
        paragraphs: [
          ["Your design draft and language preference are stored in your browser. Submitted requests store the bag configuration, normalized logo preview, contact fields and consent acknowledgment in your demonstration workspace. Original full-resolution logo files are not retained.", "Dizajni i papërfunduar dhe gjuha e zgjedhur ruhen në shfletues. Kërkesat e dërguara ruajnë konfigurimin e çantës, pamjen e përpunuar të logos, të dhënat e kontaktit dhe konfirmimin e pëlqimit në hapësirën tuaj të demonstrimit. Skedarët origjinalë të logos me rezolucion të plotë nuk ruhen."],
          ["Requests, quotations, artwork revisions, approvals and simulated orders persist in a separate workspace for your session. An essential cookie connects anonymous visitors to their workspace for up to seven days. Signed-in visitors use their own account workspace. This is not a production customer-account system.", "Kërkesat, ofertat, versionet e dizajnit, miratimet dhe porositë e simuluara ruhen në një hapësirë të veçantë për sesionin tuaj. Një cookie e domosdoshme lidh vizitorët anonimë me këtë hapësirë për deri në shtatë ditë. Vizitorët e identifikuar përdorin hapësirën e llogarisë së tyre. Ky nuk është sistem llogarish për klientët e prodhimit."],
        ],
      },
      {
        title: ["How records are used", "Si përdoren të dhënat"],
        paragraphs: [["Records demonstrate the quotation and approval process. No real email, marketing message, payment or manufacturing order is sent. This implementation does not install advertising analytics or third-party tracking tags.", "Të dhënat shërbejnë për demonstrimin e procesit të ofertimit dhe miratimit. Nuk dërgohet email, mesazh marketingu, pagesë apo porosi reale për prodhim. Ky version nuk instalon analitikë reklamash ose mjete gjurmimi nga palë të treta."]],
      },
      {
        title: ["Your controls", "Kontrollet tuaja"],
        paragraphs: [["Clear your browser draft on the cookies page. The sales workspace offers export and reset controls for synthetic records. Reset removes active demo records; provider backup retention must be confirmed before collecting real data.", "Pastroni dizajnin e shfletuesit te faqja e cookies. Hapësira e shitjeve ofron eksport dhe rivendosje për të dhënat fiktive. Rivendosja heq të dhënat aktive të demonstrimit; ruajtja e kopjeve rezervë nga ofruesi duhet të konfirmohet para mbledhjes së të dhënave reale."]],
      },
      {
        title: ["Before commercial launch", "Para publikimit për përdorim tregtar"],
        paragraphs: [["The client must approve the legal entity, data controller, retention periods, processors, international transfers and contact process. This page describes the demonstration; it is not an approved production privacy policy.", "Klienti duhet të miratojë subjektin juridik, kontrolluesin e të dhënave, afatet e ruajtjes, përpunuesit, transferimet ndërkombëtare dhe mënyrën e kontaktit. Kjo faqe përshkruan demonstrimin; nuk është politikë e miratuar e privatësisë për përdorim tregtar."]],
      },
    ],
  },
  terms: {
    sections: [
      {
        title: ["Previews and quotations", "Pamjet paraprake dhe ofertat"],
        paragraphs: [["Studio previews are indicative. A preview or demonstration quotation is not a binding Kobags offer. Prices in the customer and sales workspaces are fictional, and no payment is collected.", "Pamjet në studio janë orientuese. Pamja paraprake apo oferta e demonstrimit nuk është ofertë detyruese e Kobags. Çmimet në hapësirat e klientit dhe shitjeve janë fiktive dhe nuk merret pagesë."]],
      },
      {
        title: ["Production requires confirmation", "Prodhimi kërkon konfirmim"],
        paragraphs: [["Material availability, dimensional drawings, printable area, print method, quantity rules, sample terms, prices, shipping, tax, payment and delivery commitments require client approval and a formal commercial agreement.", "Disponueshmëria e materialit, vizatimet teknike, zona dhe metoda e shtypit, rregullat e sasisë, kushtet e mostrave, çmimet, transporti, taksat, pagesa dhe afatet e dorëzimit kërkojnë miratim nga klienti dhe marrëveshje tregtare zyrtare."]],
      },
      {
        title: ["Artwork and branding", "Dizajni dhe marka"],
        paragraphs: [["Use artwork you are entitled to use. Final artwork approval must identify the exact revision and approved production template. The demonstration illustrates this process without authorizing manufacturing.", "Përdorni dizajne për të cilat keni të drejtë përdorimi. Miratimi përfundimtar duhet të përcaktojë versionin e saktë të dizajnit dhe modelin teknik të miratuar. Demonstrimi e paraqet këtë proces pa autorizuar prodhimin."]],
      },
      {
        title: ["Before launch", "Para publikimit"],
        paragraphs: [["The legal owner must approve production terms, entity details, jurisdiction, order acceptance, shipment and claims procedures. No legal registration or contractual terms are invented for this demonstration.", "Pronari juridik duhet të miratojë kushtet e prodhimit, të dhënat e subjektit, juridiksionin, pranimin e porosive, dërgesat dhe procedurat e ankesave. Për këtë demonstrim nuk janë shpikur regjistrime juridike ose kushte kontraktuale."]],
      },
    ],
  },
  cookies: {
    sections: [
      {
        title: ["Essential storage", "Ruajtja e domosdoshme"],
        paragraphs: [["This site keeps your design draft, quotation step and language preference in browser storage. An essential seven-day session cookie connects anonymous visitors to their saved demonstration records. Clearing the cookie or changing browsers starts a new workspace; expiry does not erase server records. Hosting may also use sign-in cookies. No advertising or analytics tags are installed.", "Faqja ruan në shfletues dizajnin e papërfunduar, hapin e ofertimit dhe gjuhën e zgjedhur. Një cookie e domosdoshme e sesionit, me afat shtatë ditë, lidh vizitorët anonimë me të dhënat e ruajtura të demonstrimit. Pastrimi i cookies ose ndërrimi i shfletuesit hap një hapësirë të re; skadimi nuk fshin të dhënat në server. Shërbimi i hostimit mund të përdorë edhe cookies për identifikim. Nuk instalohen mjete reklamash apo analitike."]],
      },
      {
        title: ["Clear your design draft", "Pastroni dizajnin e papërfunduar"],
        paragraphs: [["This resets the bag configuration in this browser. Submitted requests remain in your workspace. The sales workspace provides a separate reset action for synthetic server records.", "Ky veprim rivendos konfigurimin e çantës në këtë shfletues. Kërkesat e dërguara mbeten në hapësirën tuaj. Hapësira e shitjeve ka një veprim të veçantë për rivendosjen e të dhënave fiktive në server."]],
      },
    ],
  },
};

export default function PolicyContent({ kind }: { kind: PolicyKind }) {
  const { t } = useKobags();
  const policy = policies[kind];
  return (
    <article className="prose">
      {policy.intro && <p>{t(...policy.intro)}</p>}
      {policy.sections.map((section) => (
        <section key={section.title[0]}>
          <h2>{t(...section.title)}</h2>
          {section.paragraphs.map((copy) => <p key={copy[0]}>{t(...copy)}</p>)}
        </section>
      ))}
      {kind === "cookies" && <CookieControls />}
    </article>
  );
}
