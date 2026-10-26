"use client";

import { useKobags } from "./kobags-context";
import { useCms } from "./cms/public-context";
import { company } from "@/lib/company";
import CookieControls from "./cookie-controls";

type PolicyKind = "privacy" | "terms" | "cookies";
type Copy = [string, string];
type Section = { title: Copy; paragraphs: Copy[] };

export default function PolicyContent({ kind }: { kind: PolicyKind }) {
  const { t } = useKobags();
  const { settings, enabled } = useCms();
  const email = settings?.email || company.email;
  const policies: Record<PolicyKind, Section[]> = {
    privacy: [
      {
        title: ["Your information", "Të dhënat tuaja"],
        paragraphs: [
          ["Kobags Group uses the information you provide to review your bag requirements and respond to your inquiry. Contact details may include your name, company, email, telephone and delivery location. A request may also contain quantities, specifications, messages and artwork previews.", "Kobags Group i përdor të dhënat që jepni për të shqyrtuar kërkesat tuaja për çanta dhe për t’ju përgjigjur. Të dhënat mund të përfshijnë emrin, kompaninë, emailin, telefonin dhe vendin e dorëzimit. Kërkesa mund të përmbajë edhe sasi, specifikime, mesazhe dhe pamje paraprake të dizajnit."],
          enabled
            ? ["Requests submitted through this website are saved in the shared Kobags CMS inbox. Authorized staff can review them and prepare quotations, artwork revisions and production records. A saved request is not a payment or an accepted order.", "Kërkesat e dërguara përmes kësaj faqeje ruhen në kutinë e përbashkët të kërkesave në CMS të Kobags. Stafi i autorizuar mund t’i shqyrtojë dhe të përgatisë oferta, versione dizajni dhe të dhëna prodhimi. Ruajtja e kërkesës nuk është pagesë apo pranim i porosisë."]
            : ["Online inbox submission is currently unavailable. Prepared requests are saved separately for this browser and are not sent to the Kobags sales team automatically. Use the email action on the confirmation screen and send the message from your email application.", "Dërgimi në kutinë e kërkesave online aktualisht nuk është i aktivizuar. Kërkesat e përgatitura ruhen veçmas për këtë shfletues dhe nuk i dërgohen automatikisht ekipit të shitjeve të Kobags. Përdorni veprimin e emailit në ekranin e konfirmimit dhe dërgojeni mesazhin nga aplikacioni juaj i emailit."],
        ],
      },
      {
        title: ["Drafts and artwork", "Dizajnet dhe skedarët"],
        paragraphs: [
          ["Your quotation draft, including entered contact details, is saved in this browser. Stock-request drafts use session storage. Clear drafts before leaving a shared device. Previously uploaded logo previews may remain in your saved drafts; production originals must be provided separately when requested.", "Kërkesa e papërfunduar për ofertë, përfshirë të dhënat e kontaktit, ruhet në këtë shfletues. Kërkesat për produkte nga stoku përdorin ruajtjen e sesionit. Pastroni dizajnet para se të largoheni nga një pajisje e përbashkët. Pamjet e logove të ngarkuara më parë mund të mbeten në skicat e ruajtura; origjinalet për prodhim duhen dërguar veçmas kur kërkohen."],
          ["Private artwork and customer review links are limited to the staff or recipients who need them. Treat a private review link as confidential; anyone you share it with may be able to review and approve the linked quotation or artwork.", "Dizajnet private dhe lidhjet për shqyrtim u jepen stafit ose marrësve që kanë nevojë për to. Mbajeni konfidenciale lidhjen private; personat me të cilët e ndani mund të shqyrtojnë dhe miratojnë ofertën ose dizajnin përkatës."],
        ],
      },
      {
        title: ["Hosting and storage", "Hostimi dhe ruajtja"],
        paragraphs: [
          ["The website uses OpenAI Sites hosting with Cloudflare infrastructure for its application, database and uploaded files. Hosting and security services process technical information needed to deliver and protect the website. The application does not install advertising trackers or analytics tags. Cloudflare provides bot protection, including the __cf_bm and cf_clearance security cookies and browser checks. These are separate from advertising or audience measurement.", "Faqja përdor hostimin OpenAI Sites me infrastrukturë Cloudflare për aplikacionin, bazën e të dhënave dhe skedarët e ngarkuar. Shërbimet e hostimit dhe sigurisë përpunojnë të dhënat teknike të nevojshme për funksionimin dhe mbrojtjen e faqes. Aplikacioni nuk instalon gjurmues reklamash apo mjete analitike. Cloudflare siguron mbrojtjen nga botët, përfshirë cookies e sigurisë __cf_bm dhe cf_clearance dhe kontrollet e shfletuesit. Këto shërbejnë për siguri, jo për reklama apo matjen e audiencës."],
          ["Clearing browser storage or allowing a session cookie to expire does not delete records already saved on the server. Retention and removal of customer records and backups are managed by the website operator; contact the team for the arrangements applicable to your request.", "Pastrimi i shfletuesit ose skadimi i cookie-t të sesionit nuk i fshin të dhënat e ruajtura në server. Ruajtja dhe heqja e të dhënave të klientëve dhe kopjeve rezervë menaxhohen nga operatori i faqes; kontaktoni ekipin për kushtet që vlejnë për kërkesën tuaj."],
        ],
      },
      {
        title: ["Videos and external links", "Videot dhe lidhjet e jashtme"],
        paragraphs: [["Factory videos and product images are hosted with this website. Videos start when you press play. Fonts use your device’s installed fonts; no Google Fonts request is made. WhatsApp and social-profile links open the external provider only when you follow the link. WhatsApp is operated by Meta and processes your connection and any message under its own privacy terms. No social-media tracking widget is embedded here.", "Videot e fabrikës dhe fotografitë e produkteve hostohen bashkë me faqen. Videot fillojnë kur shtypni butonin për luajtje. Shkronjat përdorin fontet e instaluara në pajisjen tuaj; nuk bëhet kërkesë te Google Fonts. Lidhjet për WhatsApp dhe rrjetet sociale e hapin shërbimin e jashtëm vetëm kur i klikoni. WhatsApp operohet nga Meta dhe e përpunon lidhjen dhe mesazhet sipas kushteve të veta të privatësisë. Faqja nuk përfshin vegla gjurmuese të rrjeteve sociale."]],
      },
      {
        title: ["Contact and requests", "Kontakti dhe kërkesat"],
        paragraphs: [[`For questions about your information, or to request access, correction or deletion, contact ${email}. Include the request reference when available. Do not send sensitive personal information or payment-card details through the forms.`, `Për pyetje lidhur me të dhënat tuaja, ose për të kërkuar qasje, korrigjim apo fshirje, kontaktoni ${email}. Shënoni referencën e kërkesës nëse e keni. Mos dërgoni të dhëna personale të ndjeshme apo të kartelës së pagesës përmes formularëve.`]],
      },
    ],
    terms: [
      {
        title: ["Previews and requests", "Pamjet paraprake dhe kërkesat"],
        paragraphs: [["Colors, dimensions, material appearance and print placement require confirmation against the final production specification. Sending or saving a request does not accept an order, reserve stock or collect payment.", "Ngjyrat, përmasat, pamja e materialit dhe vendosja e shtypit duhen konfirmuar sipas specifikimit përfundimtar të prodhimit. Dërgimi ose ruajtja e kërkesës nuk pranon porosi, nuk rezervon stok dhe nuk merr pagesë."]],
      },
      {
        title: ["Commercial confirmation", "Konfirmimi tregtar"],
        paragraphs: [["Kobags confirms availability, quantity, price, taxes, delivery and payment terms in the quotation or commercial agreement. Finished collections are stock products; custom branding is offered through the custom-bag range. Production requires the agreed commercial terms and approval of the exact artwork revision.", "Kobags konfirmon disponueshmërinë, sasinë, çmimin, taksat, dorëzimin dhe kushtet e pagesës në ofertë ose marrëveshje tregtare. Koleksionet e gatshme janë produkte nga stoku; marka e personalizuar ofrohet për çantat e personalizuara. Prodhimi kërkon marrëveshjen tregtare dhe miratimin e versionit të saktë të dizajnit."]],
      },
      {
        title: ["Your artwork", "Dizajni juaj"],
        paragraphs: [["Upload only artwork and trademarks you are entitled to use. Check spelling, contact details and the final production file before approval. Website product images and design previews are not production-ready print files.", "Ngarkoni vetëm dizajne dhe marka për të cilat keni të drejtë përdorimi. Kontrolloni drejtshkrimin, të dhënat e kontaktit dhe skedarin përfundimtar para miratimit. Fotografitë e produkteve dhe parapamjet e dizajnit nuk janë skedarë të gatshëm për shtyp."]],
      },
      {
        title: ["Questions about an order", "Pyetje për porosinë"],
        paragraphs: [[`Contact ${email} about quotation changes, delivery or a product concern. Refer to your agreed quotation and request number so the team can review the correct specification.`, `Kontaktoni ${email} për ndryshime të ofertës, dorëzimin apo shqetësime rreth produktit. Shënoni ofertën e pranuar dhe numrin e kërkesës që ekipi të shqyrtojë specifikimin e duhur.`]],
      },
    ],
    cookies: [
      {
        title: ["Essential storage", "Ruajtja e domosdoshme"],
        paragraphs: [["When you use the quotation or design tools, the website stores your bag draft and quotation step in this browser. Your language choice is saved when you change language. Stock-request drafts are stored for the browser session. These entries remain until you clear them or your browser removes them. No advertising or analytics tags are installed by this application.", "Kur përdorni ofertimin ose mjetet e dizajnit, faqja ruan në këtë shfletues dizajnin e papërfunduar dhe hapin e ofertimit. Zgjedhja e gjuhës ruhet kur e ndryshoni gjuhën. Kërkesat e papërfunduara për stok ruhen për sesionin e shfletuesit. Këto të dhëna mbeten derisa t’i pastroni ose t’i heqë shfletuesi. Ky aplikacion nuk instalon mjete reklamash apo analitike."]],
      },
      {
        title: ["Session cookies", "Cookies e sesionit"],
        paragraphs: [["When you submit a request or open a saved receipt, an essential cookie connects this browser to its saved requests for up to seven days. Staff sign-in uses a separate, protected session cookie for up to eight hours. Clearing cookies or changing browsers can remove access to saved receipts; it does not erase server records. The hosting provider may also use cookies to deliver and secure the site.", "Kur dërgoni një kërkesë ose hapni një konfirmim të ruajtur, një cookie e domosdoshme e lidh shfletuesin me kërkesat e ruajtura për deri në shtatë ditë. Identifikimi i stafit përdor një cookie të veçantë dhe të mbrojtur për deri në tetë orë. Pastrimi i cookies ose ndërrimi i shfletuesit mund të heqë qasjen te konfirmimet e ruajtura; nuk i fshin të dhënat në server. Ofruesi i hostimit mund të përdorë gjithashtu cookies për funksionimin dhe sigurinë e faqes."]],
      },
      {
        title: ["Clear your design draft", "Pastroni dizajnin e papërfunduar"],
        paragraphs: [["The button below resets your bag design and quotation step in this browser. It does not delete submitted requests. To clear all local drafts and preferences, use your browser’s site-data controls. Contact Kobags for questions about records held on the server.", "Butoni më poshtë rivendos dizajnin e çantës dhe hapin e ofertimit në këtë shfletues. Nuk i fshin kërkesat e dërguara. Për të pastruar të gjitha dizajnet lokale dhe preferencat, përdorni kontrollet e shfletuesit për të dhënat e faqes. Kontaktoni Kobags për pyetje lidhur me të dhënat në server."]],
      },
    ],
  };
  return (
    <article className="prose">
      {policies[kind].map((section) => (
        <section key={section.title[0]}>
          <h2>{t(...section.title)}</h2>
          {section.paragraphs.map((copy) => <p key={copy[0]}>{t(...copy)}</p>)}
        </section>
      ))}
      {kind === "cookies" && <CookieControls />}
      {kind === "terms" && <p><a href="/documents/third-party-notices.txt">{t("Third-party software notices", "Njoftimet për softuerin e palëve të treta")}</a></p>}
    </article>
  );
}
