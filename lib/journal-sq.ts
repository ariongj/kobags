import type { Article } from "./journal";

type JournalTranslation = Omit<Article, "slug">;

const translations: Record<string, JournalTranslation> = {
  kobagsjourney: {
    category: "Brenda Kobags",
    title: "Brenda Kobags: nga kërkesa te prodhimi.",
    intro: "Si kthehen zgjedhjet tuaja në specifikime për fabrikën.",
    sections: [
      {
        title: "Filloni me produktin",
        body: "Koleksioni publik i Kobags përfshin çanta D-Cut, Handle, Box, T-Shirt dhe String prej polipropileni jo të endur. Secila formë i shërben një nevoje tjetër. Krahasoni përmasat e publikuara me produktet që planifikoni të vendosni në çantë.",
      },
      {
        title: "Përgatitni një kërkesë të qartë për fabrikën",
        body: "Një kërkesë e dobishme bashkon formën dhe madhësinë, ngjyrën e materialit, numrin e ngjyrave të shtypit, sasinë dhe destinacionin. Studioja i kthen këto zgjedhje në një pikënisje vizuale të përbashkët.",
      },
      {
        title: "Miratoni hollësitë së bashku",
        body: "Pamja paraprake e nis bisedën. Para prodhimit, konfirmoni modelin teknik, disponueshmërinë e materialit, kushtet tregtare dhe versionin e saktë të dizajnit. Fotografitë e fabrikës dhe videon e shtypit mund t'i shihni te faqja e prodhimit.",
      },
    ],
  },
  whyswitchtokobags: {
    category: "Udhëzues për blerësit",
    title: "A është çanta për ripërdorim zgjedhja e duhur për biznesin tuaj?",
    intro: "Vendosni duke marrë parasysh produktet, klientët dhe hollësitë që mund t'i verifikoni.",
    sections: [
      {
        title: "Përshtateni çantën me blerjen",
        body: "Shikoni madhësinë e një blerjeje tipike dhe mënyrën si e bartin klientët. Vlerësoni dorezat, bazën dhe hapjen. Kërkoni mostra kur përshtatja, ndjesia e materialit ose mënyra e punimit ndikojnë në vendimin tuaj.",
      },
      {
        title: "Planifikoni përdorimin e përsëritur",
        body: "Një çantë e menduar për ripërdorim duhet të jetë e dobishme edhe pas përdorimit të parë. Udhëzimet për kujdes, ngarkesën dhe punimin duhet të konfirmohen për produktin konkret me prodhuesin. Vetëm emri i materialit nuk tregon sa zgjat një çantë e përfunduar.",
      },
      {
        title: "Krahasoni ofertën e plotë",
        body: "Në diskutimin tregtar përfshini sasinë për çdo dizajn, përgatitjen e shtypit, transportin, taksat kur zbatohen dhe afatet. FAQ publike përmend minimumin prej 5.000 çantash; ndarja e tij sipas madhësive dhe ngjyrave kërkon konfirmim.",
      },
    ],
  },
  kobagsmission: {
    category: "Marka dhe paketimi",
    title: "Bëjeni paketimin pjesë të identitetit të markës suaj.",
    intro: "Një logo e qartë, ngjyrë e menduar dhe formë e duhur e bëjnë çantën të duket e qëllimshme.",
    sections: [
      {
        title: "Mbajeni mesazhin të qartë",
        body: "Vendosni çfarë duhet të shihet e para: emri i markës, simboli apo një mesazh i shkurtër. Lini hapësirë rreth dizajnit që të mbetet i lexueshëm në madhësinë e çantës.",
      },
      {
        title: "Përdorni pamjen paraprake për të provuar ide",
        body: "Ngarkoni një logo PNG, JPG ose WebP në studio, pastaj lëvizeni, ndryshoni madhësinë ose rrotullojeni. Ana e përparme dhe ajo e pasme mund të kenë dizajne të ndryshme. Shkarkoni një koncept për ta ndarë me kolegët para se të kërkoni ofertë.",
      },
      {
        title: "Vendosni sipas provës së miratuar",
        body: "Pamja në internet është orientuese. Dizajni për prodhim kërkon përmasa të miratuara të zonës së shtypit, referenca të ngjyrave dhe një version të caktuar. Prova përfundimtare është vendi ku blerësi dhe prodhuesi konfirmojnë çfarë do të prodhohet.",
      },
    ],
  },
  sciencebehindkobags: {
    category: "Bazat e materialit",
    title: "PP jo i endur, i shpjeguar qartë.",
    intro: "Përbërja, përmbajtja e ricikluar dhe riciklueshmëria janë pyetje të ndryshme.",
    sections: [
      {
        title: "Kuptoni çfarë thotë specifikimi",
        body: "Specifikimet e publikuara të Kobags shënojnë PP jo të endur dhe një vlerë GSM. PP do të thotë polipropilen. GSM tregon masën për metër katror; vetëm kjo vlerë nuk provon kapacitetin mbajtës ose qëndrueshmërinë e çantës së përfunduar.",
      },
      {
        title: "Pyesni veçmas për përmbajtjen e ricikluar",
        body: "Lloji i materialit mund të jetë polipropilen pa nënkuptuar një përqindje të ricikluar. Nëse kjo është e rëndësishme për blerjen tuaj, kërkoni deklaratë për përbërjen e produktit konkret.",
      },
      {
        title: "Kontrolloni pranimin për riciklim në vendin tuaj",
        body: "Destinacioni, sistemi i grumbullimit dhe çanta e përfunduar kanë rëndësi. Mos supozoni se një çantë pranohet lokalisht vetëm sepse materiali mund të riciklohet diku tjetër. Përfshini shtypin dhe pjesët e tjera në vlerësim.",
      },
    ],
  },
  benefitsofkobags: {
    category: "Listë për blerje",
    title: "Pesë hollësi që duhen sqaruar para porosisë së çantave me markë.",
    intro: "Një listë e shkurtër e bën kërkesën tuaj për ofertë më të qartë dhe më të lehtë për krahasim.",
    sections: [
      {
        title: "1. Forma dhe përmasat",
        body: "Zgjidhni formën sipas produkteve që do të bartni. Koleksioni ka nga tri madhësi të publikuara për secilën nga pesë familjet. Renditja e përmasave dhe tolerancat duhen konfirmuar me vizatim teknik të prodhimit.",
      },
      {
        title: "2. Materiali dhe ngjyra",
        body: "Shënoni gramazhin GSM, ngjyrën e çantës dhe kërkesat për materialin. Ngjyrat në ekran janë orientuese; kërkoni një referencë materiali kur përputhja e afërt është e rëndësishme.",
      },
      {
        title: "3. Dizajni dhe shtypi",
        body: "Përcaktoni dizajnin për të dyja anët dhe numrin e ngjyrave të shtypit. Detajet publike përmendin shtyp fleksografik deri në katër ngjyra; konfirmoni zonën e shtypshme dhe kërkesat për skedarin e prodhimit.",
      },
      {
        title: "4. Sasia dhe destinacioni",
        body: "Jepni sasinë e kërkuar, qytetin dhe shtetin e destinacionit. Sqaroni nëse sasia ndahet mes dizajneve, ngjyrave ose madhësive dhe cilat kosto përfshin oferta.",
      },
      {
        title: "5. Miratimi dhe afatet",
        body: "Tregoni datën kur ju duhen çantat dhe llogaritni kohën për miratim. Afati orientues i publikuar për dërgim është 2–4 javë pas miratimit të dizajnit, me kusht konfirmimin. Koha e mbërritjes varet edhe nga transporti dhe destinacioni.",
      },
    ],
  },
  helpingbusinesseskobags: {
    category: "Planifikimi i porosisë",
    title: "Prezantoni një çantë të re pa hamendësime.",
    intro: "Përdorni një mostër, kërkesë të përbashkët dhe proces rishikimi që ndryshimi të jetë më i lehtë për ekipin.",
    sections: [
      {
        title: "Përfshini njerëzit e duhur në kërkesë",
        body: "Ekipet e markës, blerjes dhe dyqaneve mund të kërkojnë gjëra të ndryshme nga një çantë. Pajtohuni për përdorimin, pamjen, sasinë dhe nevojat e dërgesës para se të ngushtoni zgjedhjet.",
      },
      {
        title: "Shikoni një mostër kur ka rëndësi",
        body: "Një mostër fizike ndihmon për të vlerësuar ndjesinë dhe përshtatjen e materialit. Pyesni për disponueshmërinë, koston dhe dërgesën e mostrave. Kërkesa për mostër është e ndarë nga oferta me shumicë.",
      },
      {
        title: "Mbani një version të miratuar",
        body: "Mblidhni komentet mbi të njëjtin version të dizajnit. Pasi të pranohen oferta dhe dizajni më i fundit, konfirmoni kushtin e pagesës dhe planin e prodhimit. Edhe porositë e përsëritura kërkojnë ofertë të re dhe disponueshmëri aktuale.",
      },
    ],
  },
};

export function localizeArticle(article: Article, lang: "en" | "sq"): Article {
  if (lang !== "sq") return article;
  const translated = translations[article.slug];
  return translated ? { ...article, ...translated } : article;
}
