"use client";
import { useLiveInquiry, LiveReceipt } from "./cms/live-inquiry";
import { useCms } from "./cms/public-context";
import { useEffect, useId, useRef, useState } from "react";
import Link from "@/components/site-link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  LockKeyhole,
  Pencil,
  ChevronDown,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Choice } from "./choice";
import { BagPreview } from "./bag-preview";
import { useKobags } from "./kobags-context";
import { useDemo, errors } from "./demo-store";
import { Design, colors, preferredBagColor } from "@/lib/catalog";
import { quoteRepresentation, quoteSpecification } from "@/lib/design-draft";
import { localizeProduct } from "@/lib/product-copy";
import { responsiveImageProps } from "@/lib/responsive-media";
import { artworkSummary as summarizeArtwork } from "@/lib/studio-artwork";
import { artworkSides } from "@/lib/studio-checks";
import { languageHref } from "@/lib/site-locale";
import { isCalendarDate, requestFieldLimits } from "@/lib/design-validation";
import PreparedRequestActions from "./prepared-request-actions";
export default function QuoteFlow() {
  const cms = useCms();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const summaryId = useId();
  const getProduct = cms.getProduct;
  const { t, lang, design, update, ready, studioEnabled } = useKobags();
  const { state, error:demoError, busy:demoBusy, act, refresh } = useDemo({ loadOnVisit: !cms.enabled });
  const live=useLiveInquiry();
  const busy=demoBusy||live.busy;
  const error=live.error||demoError;
  const [step, setStep] = useState(0);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const focusStepAfterChange = useRef(false);
  const [validation, setValidation] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [showExampleDetails, setShowExampleDetails] = useState(false);
  const savedRequest = state?.requests.find(request => request.id === submitted);
  const preparedDesign = savedRequest ? { ...savedRequest.snapshot, ...quoteRepresentation(savedRequest.snapshot, studioEnabled) } : undefined;
  const preparedSpecification = preparedDesign ? quoteSpecification(preparedDesign, preparedDesign) : undefined;
  const [collection, setCollection] = useState("");
  const collectionNames: Record<string,string> = {"thank-you":"Thank you bags",smiley:"Smiley bags"};
  const collectionName = collectionNames[collection] || "";
  const collectionPrefix = collectionName ? `Collection: ${collectionName}\n\n` : "";
  // Public requests contain specifications only while the studio is local-only.
  // Keep browser artwork untouched so local testing / existing drafts are retained.
  const quoteDesign = quoteRepresentation(design, studioEnabled);
  const requestDesign = collectionPrefix ? {...quoteDesign,note:collectionPrefix+design.note.replace(/^Collection: (?:Thank you bags|Smiley bags)\n\n/, "")} : quoteDesign;
  const p = localizeProduct(getProduct(design.product), lang);
  const variant =
    p.variants.find((v) => v.name === design.size) || p.variants[0];
  const studioSpecification = quoteDesign.referenceStudio;
  const specification = quoteSpecification(quoteDesign, variant);
  const sides = artworkSides(quoteDesign);
  const hasArtwork = Boolean(studioSpecification || sides.length);
  const chooseProduct = (product: string) => {
    if (product === design.product) return;
    update({ product, size: cms.options(product)?.activeSizes?.[0] || getProduct(product).variants[0].name,
      color: preferredBagColor(cms.options(product)?.colors, design.color),
      printColors: Math.min(design.printColors, cms.options(product)?.printColors || 4),
      ...(studioSpecification ? { customDimensions: "" } : {}),
    });
  };
  const sizeSq: Record<string, string> = { Small: "E vogël", Medium: "Mesatare", Large: "E madhe" };
  const displaySize = specification.size ? t(specification.size, sizeSq[specification.size]) : t("Custom request", "Kërkesë e veçantë");
  const displayColor = studioSpecification
    ? `${t("Studio color", "Ngjyra në studio")} · ${studioSpecification.fabric.toUpperCase()}`
    : t(design.color, colors.find((color) => color.name === design.color)?.sq);
  const minimum = cms.options(design.product)?.moq || cms.settings?.moq || state?.settings.moq || 5000;
  const artworkSummary = sides.length
    ? sides
        .map((side) =>
          t(
            side === "front" ? "Front" : "Back",
            side === "front" ? "Përpara" : "Prapa",
          ),
        )
        .join(" + ")
    : t("No artwork added", "Pa dizajn");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(location.search);
      const requested = params.get("collection");
      const requestedCollection = requested === "thank-you" || requested === "smiley" ? requested : "";
      setCollection(requestedCollection);
      try {
        setStep(
          Math.min(
            3,
            Math.max(0, Number(localStorage.getItem(requestedCollection ? `kobags-quote-step:${requestedCollection}` : "kobags-quote-step")) || 0),
          ),
        );
      } catch {}
      const done = params.get("submitted");
      if (done) setSubmitted(done);
      setShowExampleDetails(params.get("demo") === "1");
      setHydrated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (hydrated)
      try {
        localStorage.setItem(collection ? `kobags-quote-step:${collection}` : "kobags-quote-step", String(step));
      } catch {}
  }, [step, hydrated, collection]);
  useEffect(() => {
    if (ready && !design.key) update({ key: crypto.randomUUID() });
  }, [ready, design.key, update]);
  useEffect(() => {
    // Restoring a saved step must preserve the browser's focus and scroll position.
    if (!focusStepAfterChange.current) return;
    focusStepAfterChange.current = false;
    stepHeading.current?.focus();
  }, [step]);
  const goToStep = (nextStep: number) => {
    setValidation("");
    if (nextStep === step) {
      stepHeading.current?.focus();
      return;
    }
    focusStepAfterChange.current = true;
    setStep(nextStep);
  };
  const set = (key: keyof Design, value: unknown) => update({ [key]: value });
  const validate = () => {
    if (!cms.products.some(p=>p.slug===design.product)) return 'unavailable';
    if (!p.variants.some(variant => variant.name === design.size) || (cms.options(design.product)?.activeSizes && !cms.options(design.product)!.activeSizes!.includes(design.size))) return 'unavailable';
    if (step >= 1 && (cms.options(design.product)?.colors?.length && !cms.options(design.product)!.colors!.includes(design.color))) return 'color';
    if (step >= 1 && (!Number.isInteger(design.printColors) || design.printColors < 1 || design.printColors > (cms.options(design.product)?.printColors || 4))) return 'print';
    if (step === 2) {
      if (!Number.isInteger(design.quantity) || design.quantity < minimum || design.quantity > 10000000)
        return "quantity";
      if (!design.country.trim()) return "country";
      if (design.city.trim().length < 2) return "city";
      if (design.date && (!isCalendarDate(design.date) || design.date < new Date().toISOString().slice(0, 10)))
        return "date";
    }
    if (step === 3) {
      if(requestDesign.note.length>requestFieldLimits.note)return "note";
      if (
        design.company.trim().length < 2 ||
        design.contact.trim().length < 2 ||
        !/^\S+@\S+\.\S+$/.test(design.email.trim())
      )
        return "company";
      if (!design.consent) return "consent";
    }
    return "";
  };
  const messages: Record<string, [string, string]> = {
    note: ["Please shorten your additional notes to fit the collection request.","Ju lutemi shkurtoni shënimet shtesë për kërkesën e koleksionit."],
    unavailable: ['Choose an available bag and size to continue. Your artwork is kept.', 'Zgjidhni një çantë dhe madhësi të disponueshme. Dizajni juaj ruhet.'],
    color: ["Choose an available bag color in Material & print.", "Zgjidhni një ngjyrë të disponueshme te Materiali dhe shtypi."],
    print: ["Choose an available number of print colors in Material & print.", "Zgjidhni numrin e lejuar të ngjyrave te Materiali dhe shtypi."],
    quantity: [
      `The published wholesale minimum is ${minimum.toLocaleString()} bags. For a smaller request, use the sample inquiry.`,
      `Minimumi me shumicë është ${minimum.toLocaleString()} çanta. Për sasi më të vogël kërkoni mostra.`,
    ],
    country: [
      "Choose your destination country.",
      "Zgjidhni shtetin e destinacionit.",
    ],
    city: ["Add your delivery city.", "Shtoni qytetin e dërgesës."],
    date: [
      "Your requested date must be today or later.",
      "Data e kërkuar duhet të jetë sot ose më vonë.",
    ],
    company: [
      "Add a company, contact name and valid business email.",
      "Shtoni kompaninë, emrin e kontaktit dhe emailin e vlefshëm.",
    ],
    consent: [
      "Please acknowledge the privacy notice.",
      "Ju lutemi pranoni njoftimin e privatësisë.",
    ],
  };
  const next = async () => {
    const problem = validate();
    setValidation(problem);
    if (problem) return;
    if (step < 3) {
      goToStep(step + 1);
      return;
    }
    try {
      let id: string | undefined;
      try {
        id = live.enabled ? await live.send({kind:"quote",design:requestDesign}) : await act({ type: "submit", design:requestDesign });
      } catch (cause) {
        if (!(cause instanceof Error) || cause.message !== "REQUEST_KEY_CONFLICT") throw cause;
        // Only a confirmed key collision gets a fresh key; an uncertain network
        // result retains the original key so retrying cannot duplicate a save.
        const nextDesign = { ...requestDesign, key: crypto.randomUUID() };
        update({ key: nextDesign.key });
        id = live.enabled ? await live.send({kind:"quote",design:nextDesign}) : await act({ type: "submit", design: nextDesign });
      }
      if (id) {
        try { localStorage.setItem(collection ? `kobags-quote-step:${collection}` : "kobags-quote-step", "0"); } catch {}
        if(live.enabled){update({key:crypto.randomUUID(),consent:false});return;}
        setSubmitted(id);
        update({ key: crypto.randomUUID(), consent: false });
        history.replaceState(null, "", languageHref("/quote?submitted=" + encodeURIComponent(id) + (showExampleDetails ? "&demo=1" : ""), lang));
        try { localStorage.setItem("kobags-quote-step", "0"); } catch {}
        window.scrollTo(0, 0);
      }
    } catch {}
  };
  if(live.enabled && (live.reference||live.checking)) return <main className="content-width success-page"><LiveReceipt reference={live.reference} checking={live.checking}/></main>;
  if (submitted && !state?.requests.some((request) => request.id === submitted))
    return (
      <main className="success-page content-width">
        <h1>{!state && !error
          ? t("Checking your saved request…", "Duke kontrolluar kërkesën e ruajtur…")
          : t("We couldn’t open this request.", "Nuk mund ta hapnim këtë kërkesë.")}</h1>
        <p role="status">{!state && !error
          ? t("Please wait while we confirm the saved reference.", "Ju lutemi prisni derisa të konfirmojmë referencën e ruajtur.")
          : error
            ? (errors[error] || errors.STORAGE_UNAVAILABLE)[lang === "sq" ? 1 : 0]
            : t("This reference is not available in this browser’s workspace. Your current design is still available.", "Kjo referencë nuk gjendet në hapësirën e këtij shfletuesi. Dizajni juaj aktual është ende i disponueshëm.")}</p>
        <div className="actions">
          {error && <button className="button secondary" onClick={refresh}>{t("Try again", "Provoni përsëri")}</button>}
          <Link href="/quote" className="button">{t("Return to your request", "Kthehuni te kërkesa juaj")}</Link>
          {showExampleDetails && <Link href="/demo/customer" className="text-button">{t("View saved requests", "Shihni kërkesat e ruajtura")}</Link>}
        </div>
      </main>
    );
  if (submitted)
    return (
      <main className="success-page content-width">
        <div className="success-icon">
          <CheckCircle2 size={36} />
        </div>
        <p className="eyebrow">
          {t("DESIGN SAVED", "DIZAJNI U RUAJT")}
        </p>
        <h1>{showExampleDetails ? t("Your bag has a beginning.", "Çanta juaj ka një fillim.") : t("Your design request is prepared.", "Kërkesa e dizajnit është përgatitur.")}</h1>
        {showExampleDetails ? <><p>
          {t(
            "Your complete configuration is saved as",
            "Konfigurimi juaj i plotë u ruajt si",
          )}{" "}
          <strong>{submitted}</strong>.
        </p>
        <p>
          {t(
            "Explore the sample quote and artwork approval steps with your saved design.",
            "Shihni hapat e ofertës shembull dhe miratimit të dizajnit tuaj të ruajtur.",
          )}
        </p>
        <div className="actions">
          <Link href={"/demo/customer?id=" + submitted} className="button">
            {t("Explore next steps", "Shihni hapat vijues")}{" "}
            <ArrowRight size={17} />
          </Link>
        </div></> : savedRequest && preparedDesign && preparedSpecification && <PreparedRequestActions reference={savedRequest.id} subject={t("Bag quotation request", "Kërkesë për ofertë të çantave")}
          design={preparedDesign.referenceStudio || artworkSides(preparedDesign).length ? preparedDesign : undefined}
          details={[
            `${t("Reference", "Referenca")}: ${savedRequest.id}`,
            `${preparedDesign.productName} / ${preparedSpecification.size ? t(preparedSpecification.size, sizeSq[preparedSpecification.size]) : t("Custom request", "Kërkesë e veçantë")}`,
            `${preparedSpecification.dimensions} / ${preparedSpecification.gsm === undefined ? t("GSM to confirm", "GSM për konfirmim") : preparedSpecification.gsm + " GSM"} / ${preparedSpecification.studio ? t("Studio color", "Ngjyra në studio") + " · " + preparedSpecification.color.toUpperCase() : t(preparedSpecification.color, colors.find(color => color.name === preparedSpecification.color)?.sq)}`,
            `${t("Quantity", "Sasia")}: ${preparedDesign.quantity}`,
            `${t("Print colors", "Ngjyra shtypi")}: ${preparedDesign.printColors}`,
            `${t("Front artwork", "Dizajni përpara")}: ${summarizeArtwork({ ...preparedDesign, side: "front" }) || "—"}`,
            `${t("Back artwork", "Dizajni prapa")}: ${summarizeArtwork({ ...preparedDesign, side: "back" }) || "—"}`,
            `${t("Delivery", "Dërgesa")}: ${preparedDesign.city}, ${preparedDesign.country}`,
            `${t("Requested date", "Data e kërkuar")}: ${preparedDesign.date || "—"}`,
            `${preparedDesign.company} / ${preparedDesign.contact}`,
            preparedDesign.email,
            preparedDesign.phone || "",
            preparedDesign.note,
          ].filter(Boolean).join("\n")}/>}
        <button
          className="text-button"
          onClick={() => {
            setSubmitted("");
            setCollection("");
            setStep(0);
            update({ key: crypto.randomUUID() });
            history.replaceState(null, "", languageHref("/quote", lang));
          }}
        >
          {t("Start another request", "Filloni kërkesë tjetër")}
        </button>
      </main>
    );
  const fields = (
    key: keyof Design,
    label: string,
    type = "text",
    required = false,
  ) => (
    <div className="field" key={key}>
      <label htmlFor={"q-" + key}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={"q-" + key}
        name={key}
        type={type}
        autoComplete={({ company: "organization", contact: "name", email: "email", phone: "tel", city: "address-level2" } as Partial<Record<keyof Design, string>>)[key]}
        inputMode={type === "email" ? "email" : type === "tel" ? "tel" : undefined}
        required={required}
        value={String(design[key] ?? "")}
        onChange={(e) => set(key, e.target.value)}
        maxLength={requestFieldLimits[key] || 150}
        min={type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
      />
    </div>
  );
  return (
    <main>
      <div className="page-heading quote-heading">
        <Link href={studioEnabled ? "/design" : "/products"} className="text-button">
          <ArrowLeft size={14} />
          {studioEnabled ? t("Back to the studio", "Kthehu në studio") : t("Back to bags", "Kthehu te çantat")}
        </Link>
        <p className="eyebrow">
          {t("YOUR NEXT WHOLESALE ORDER", "POROSIA JUAJ E RADHËS ME SHUMICË")}
        </p>
        <h1>
          {t("Let’s get the details right.", "Le t’i saktësojmë detajet.")}
        </h1>
        <p className="intro">
          {t(
            "A few details help turn your bag into a clear, useful quotation.",
            "Disa detaje e shndërrojnë çantën tuaj në një ofertë të qartë.",
          )}
        </p>
      </div>
      <div className="content-width">
        {showExampleDetails && <div className="demo-details-helper">
          <span>
            {t(
              "Just exploring? Try the journey with example contact details.",
              "Po e provoni? Përdorni të dhëna kontakti shembull.",
            )}
          </span>
          <button
            className="text-button"
            onClick={() =>
              update({
                company: design.company || "Mira Market — demo",
                contact: design.contact || "Demo Buyer",
                email: design.email || "buyer@example.com",
                country: design.country || "Kosovo",
                city: design.city || "Prishtina",
              })
            }
          >
            {t("Use demo details", "Përdor të dhëna demo")}{" "}
            <ArrowRight size={15} />
          </button>
        </div>}
        {collectionName&&<div className="quote-collection-note"><strong>{collectionName}</strong><span>{t("Collection included in your quote request. Choose your bag specifications below.","Koleksioni përfshihet në kërkesën për ofertë. Zgjidhni specifikimet më poshtë.")}</span></div>}
        <div className="quote-progress">
          {[
            [t("Bag & purpose", "Çanta dhe qëllimi")],
            [t("Material & print", "Materiali dhe shtypi")],
            [t("Quantity & delivery", "Sasia dhe dërgesa")],
            [t("Company & review", "Kompania dhe rishikimi")],
          ].map(([s], i) => (
            <button
              key={i}
              className={i === step ? "current" : i < step ? "done" : ""}
              aria-current={i === step ? "step" : undefined}
              disabled={i > step}
              onClick={() => goToStep(i)}
            >
              <span>{i < step ? <Check size={15} /> : i + 1}</span>
              {s}
            </button>
          ))}
        </div>
        <div className="quote-grid">
          <form className="section-card quote-form" noValidate onSubmit={(event) => { event.preventDefault(); if (!busy && ready) void next(); }}>
            <div className="step-caption">
              {t("STEP", "HAPI")} {step + 1} / 4
            </div>
            <h2 ref={stepHeading} tabIndex={-1}>
              {
                [
                  t("Start with the right bag.", "Filloni me çantën e duhur."),
                  t("Give it your signature.", "Jepini stilin tuaj."),
                  t("How many, and where?", "Sa dhe ku?"),
                  t("Ready for a closer look.", "Gati për shqyrtim."),
                ][step]
              }
            </h2>
            {step === 0 && (
              <div className="form-grid">
                <div className="field full">
                  <span id="q-product-label" className="quote-field-label">{t("Choose your bag", "Zgjidhni çantën tuaj")}</span>
                  <div id="q-product" className="quote-bag-options" role="group" aria-labelledby="q-product-label">
                    {cms.products.map(product => <button key={product.slug} type="button" aria-pressed={design.product === product.slug} onClick={() => chooseProduct(product.slug)}>
                      <img {...responsiveImageProps(product.image, "(max-width: 800px) 45px, 72px")} alt="" decoding="async" />
                      <span>{localizeProduct(product, lang).name}</span>
                      {design.product === product.slug && <Check size={14} aria-hidden="true" />}
                    </button>)}
                  </div>
                </div>
                <Choice
                  id="q-size"
                  label={t("Size", "Madhësia")}
                  value={studioSpecification ? "reference-studio" : design.size}
                  onChange={(size) => { if (size !== "reference-studio") update({ size, ...(studioSpecification ? { customDimensions: "", referenceStudio: undefined } : {}) }); }}
                  options={[...(studioSpecification ? [{ value: "reference-studio", label: `${t("Studio", "Studio")} · ${studioSpecification.size} · ${studioSpecification.dimensions}` }] : []), ...p.variants.filter(v=>!cms.options(p.slug)?.activeSizes || cms.options(p.slug)!.activeSizes!.includes(v.name)).map((v) => ({
                    value: v.name,
                    label: t(v.name, sizeSq[v.name]) + " · " + v.dimensions,
                  }))]}
                />
                <Choice
                  id="q-purpose"
                  label={t("Intended use", "Përdorimi i synuar")}
                  value={design.purpose}
                  onChange={(purpose) => update({ purpose })}
                  options={[
                    "Retail packaging",
                    "Grocery",
                    "Events & promotions",
                    "Gift packaging",
                    "Distribution",
                  ].map((s) => ({
                    value: s,
                    label: t(s, ({
                      "Retail packaging": "Paketim për shitje me pakicë",
                      Grocery: "Ushqimore",
                      "Events & promotions": "Evente dhe promovime",
                      "Gift packaging": "Paketim dhuratash",
                      Distribution: "Shpërndarje",
                    } as Record<string, string>)[s]),
                  }))}
                />
                {fields(
                  "customDimensions",
                  t(
                    "Custom dimensions (optional)",
                    "Përmasa të veçanta (opsionale)",
                  ),
                )}
                <p className="notice full">
                  {t(
                    "Need a different size? Add the dimensions you need. We’ll confirm feasibility and the final drawing with your quotation.",
                    "Ju duhet madhësi tjetër? Shënoni përmasat që kërkoni. Mundësinë e realizimit dhe vizatimin përfundimtar i konfirmojmë në ofertë.",
                  )}
                </p>
              </div>
            )}
            {step === 1 && (
              <div className="form-grid">
                {studioEnabled && hasArtwork ? <div className="full quote-artwork-review">
                  <div className="quote-artwork-pair">
                    {(["front", "back"] as const).map((side) => {
                      return (
                        <div key={side} className="quote-artwork-face">
                          {studioSpecification ? <img className="reference-quote-image" src={studioSpecification[side]} alt={`${studioSpecification.productName} · ${side}`} width={800} height={800}/> : <BagPreview design={{ ...quoteDesign, side }} compact />}
                          <h3>
                            {t(
                              side === "front" ? "Front" : "Back",
                              side === "front" ? "Përpara" : "Prapa",
                            )}
                          </h3>
                          <p>
                            {summarizeArtwork({ ...quoteDesign, side }) || t("No artwork · blank side", "Pa dizajn · anë bosh")}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <Link href="/design" className="text-button">
                    <Pencil size={15} />
                    {t(
                      "Edit design in the studio",
                      "Ndrysho dizajnin në studio",
                    )}
                  </Link>
                </div> : <div className="full quote-print-intro">
                  <h2>{t("Tell us about your print", "Na tregoni për shtypin tuaj")}</h2>
                  <p>{t("Choose the number of print colors. Describe your logo and preferred placement in the notes at the last step; our team will arrange artwork and approval with you.", "Zgjidhni numrin e ngjyrave të shtypit. Përshkruani logon dhe vendosjen e dëshiruar te shënimet në hapin e fundit; ekipi ynë organizon dizajnin dhe miratimin me ju.")}</p>
                  {studioEnabled && <Link href="/design" className="text-button"><Pencil size={15}/>{t("Add your artwork in the studio", "Shtoni dizajnin tuaj në studio")}</Link>}
                </div>}
                <Choice id="q-color" label={t("Bag color", "Ngjyra e çantës")} value={studioSpecification ? "reference-studio" : design.color}
                  onChange={color => { if (color !== "reference-studio") update({ color, ...(studioSpecification ? { referenceStudio: undefined } : {}) }); }}
                  options={[...(studioSpecification ? [{ value: "reference-studio", label: displayColor }] : []), ...colors.filter(color => !cms.options(p.slug)?.colors?.length || cms.options(p.slug)!.colors!.includes(color.name)).map(color => ({ value: color.name, label: t(color.name, color.sq) }))]}/>
                <Choice
                  id="q-print"
                  label={t("Print colors", "Ngjyrat e shtypit")}
                  value={String(design.printColors)}
                  onChange={(v) => update({ printColors: Number(v) })}
                  options={[1, 2, 3, 4].filter(n => n <= (cms.options(p.slug)?.printColors || 4)).map((n) => ({
                    value: String(n),
                    label: `${n} ${t(n === 1 ? "color" : "colors", "ngjyra")}`,
                  }))}
                />
                <div className="field">
                  <label>
                    {t(
                      "Printing method",
                      "Metoda e shtypit",
                    )}
                  </label>
                  <div className="readonly">
                    {t("Flexographic printing", "Shtyp fleksografik")}
                  </div>
                </div>
                <p className="notice full">
                  {t(
                    "Flexographic printing supports up to four colors. Our team will confirm color separations, the printable area and final artwork before production.",
                    "Faqet e produkteve përshkruajnë shtyp fleksografik deri në katër ngjyra. Ekipi do të kontrollojë ngjyrat dhe zonën e shtypit.",
                  )}
                </p>
              </div>
            )}
            {step === 2 && (
              <div className="form-grid">
                <div className="field full">
                  <label htmlFor="quantity">
                    {t("Quantity of bags", "Sasia e çantave")} *
                  </label>
                  <div className="quantity-options">
                    {[minimum, 10000, 25000]
                      .filter((n, i, a) => n >= minimum && a.indexOf(n) === i)
                      .map((n) => (
                        <button
                          key={n}
                          type="button"
                          className={design.quantity === n ? "selected" : ""}
                          onClick={() => update({ quantity: n })}
                        >
                          {n.toLocaleString()}
                        </button>
                      ))}
                  </div>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    inputMode="numeric"
                    min={minimum}
                    max={10000000}
                    value={design.quantity || ""}
                    onChange={(e) =>
                      update({ quantity: Number(e.target.value) })
                    }
                  />
                  <small>
                    {t("Minimum wholesale quantity:", "Minimumi me shumicë:")}{" "}
                    {minimum.toLocaleString()} ·{" "}
                    <Link href="/samples">
                      {t("Request samples instead", "Kërkoni mostra")}
                    </Link>
                  </small>
                </div>
                <Choice
                  id="q-country"
                  label={t("Destination country *", "Shteti i destinacionit *")}
                  value={design.country}
                  onChange={(country) => update({ country })}
                  options={[
                    "Kosovo",
                    "Albania",
                    "Germany",
                    "Austria",
                    "Switzerland",
                    "North Macedonia",
                    "United Kingdom",
                    "Other / to discuss",
                  ].map((s) => ({ value: s, label: t(s, ({ Kosovo: "Kosovë", Albania: "Shqipëri", Germany: "Gjermani", Austria: "Austri", Switzerland: "Zvicër", "North Macedonia": "Maqedoni e Veriut", "United Kingdom": "Mbretëri e Bashkuar", "Other / to discuss": "Tjetër / për diskutim" } as Record<string, string>)[s]) }))}
                />
                {fields("city", t("City", "Qyteti"), "text", true)}
                {fields(
                  "date",
                  t(
                    "Desired arrival date (optional)",
                    "Data e dëshiruar e mbërritjes (opsionale)",
                  ),
                  "date",
                )}
                <div className="notice full">
                  {t(
                    "This is your requested date, not a delivery commitment.",
                    "Kjo është data e kërkuar, jo një zotim për dorëzim.",
                  )}{" "}
                  {t(
                    cms.settings?.leadTime || state?.settings.leadTime ||
                      "Timing is confirmed with your quotation.",
                    cms.settings?.leadTimeSq || "Afati konfirmohet me ofertën tuaj.",
                  )}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="form-grid">
                {fields("company", t("Company", "Kompania"), "text", true)}
                {fields("contact", t("Your name", "Emri juaj"), "text", true)}
                {fields(
                  "email",
                  t("Business email", "Emaili i biznesit"),
                  "email",
                  true,
                )}
                {fields(
                  "phone",
                  t("Phone (optional)", "Telefoni (opsional)"),
                  "tel",
                )}
                <div className="field full">
                  <label htmlFor="q-note">
                    {t(
                      "Anything else we should know?",
                      "Diçka tjetër që duhet të dimë?",
                    )}
                  </label>
                  <textarea
                    id="q-note"
                    name="note"
                    rows={3}
                    maxLength={requestFieldLimits.note-collectionPrefix.length}
                    value={design.note}
                    onChange={(e) => update({ note: e.target.value })}
                  />
                </div>
                <label className="check-label full">
                  <Checkbox
                    name="consent"
                    checked={design.consent}
                    onCheckedChange={(v) => update({ consent: v === true })}
                  />
                  <span>
                    {t(
                      live.enabled ? "I agree that Kobags may store my details and artwork to respond to this inquiry. This is a quotation request, not a confirmed order." : "I understand this saves my request and design preview so I can send them to Kobags from my email app. No order is confirmed.",
                      live.enabled ? "Pajtohem që Kobags t’i ruajë të dhënat dhe dizajnin për t’iu përgjigjur kërkesës. Kjo është kërkesë për ofertë, jo porosi e konfirmuar." : "E kuptoj se kërkesa dhe parapamja e dizajnit ruhen që t’i dërgoj te Kobags përmes emailit tim. Asnjë porosi nuk konfirmohet.",
                    )}{" "}
                    <Link href="/privacy">
                      {t("Privacy notice", "Njoftimi i privatësisë")}
                    </Link>
                  </span>
                </label>
              </div>
            )}
            {validation && (
              <div className="error" role="alert">
                {messages[validation]?.[lang === "sq" ? 1 : 0]}
              </div>
            )}
            {error && (
              <div className="error" role="alert">
                {(errors[error] || errors.SAVE_FAILED)[lang === "sq" ? 1 : 0]}
              </div>
            )}
            <div className="wizard-actions">
              <button
                className="text-button"
                type="button"
                onClick={() => goToStep(Math.max(0, step - 1))}
                disabled={step === 0 || busy}
              >
                <ArrowLeft size={16} />
                {t("Back", "Prapa")}
              </button>
              <button
                className="button"
                type="submit"
                disabled={busy || !ready}
              >
                {busy
                  ? t("Saving…", "Duke ruajtur…")
                  : step === 3
                    ? t("Send quote request", "Dërgo kërkesën për ofertë")
                    : t("Continue", "Vazhdo")}
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
          <aside className="quote-summary" data-expanded={summaryOpen}>
            <button type="button" className="quote-summary-toggle" aria-expanded={summaryOpen} aria-controls={summaryId} onClick={() => setSummaryOpen(open => !open)}>
              <span><strong>{t("Your bag summary", "Përmbledhja e çantës")}</strong><small>{studioSpecification?.productName || p.name} · {design.quantity.toLocaleString()}</small></span><ChevronDown size={20} aria-hidden="true" />
            </button>
            <div id={summaryId} className="quote-summary-content">
            <div className="summary-top">
              <h3>{t("Your bag, so far.", "Çanta juaj deri tani.")}</h3>
              {studioEnabled && <Link href="/design" aria-label={t("Edit bag", "Ndrysho çantën")}>
                <Pencil size={16} />
              </Link>}
            </div>
            {studioSpecification ? <img className="reference-quote-image" src={studioSpecification.front} alt={studioSpecification.productName} width={800} height={800}/> : hasArtwork ? <BagPreview design={quoteDesign} compact /> : <figure className="quote-product-photo">
              <img width={400} height={500} {...responsiveImageProps(p.image, "(max-width: 800px) 65vw, 300px")} alt={p.name} fetchPriority="high" />
              <figcaption>{t("Product example. Requested color and printing are confirmed with your quote.", "Shembull produkti. Ngjyra dhe shtypi i kërkuar konfirmohen në ofertë.")}</figcaption>
            </figure>}
            <h2>{studioEnabled && design.referenceStudio ? design.referenceStudio.productName : p.name}</h2>
            <dl>
              {[
                [
                  t("Size", "Madhësia"),
                  displaySize + " · " + specification.dimensions,
                ],
                [
                  t("Material", "Materiali"),
                  t("Non-woven PP", "PP jo i endur") + " · " + (specification.gsm === undefined ? t("GSM to confirm", "GSM për konfirmim") : specification.gsm + " GSM"),
                ],
                [t("Color", "Ngjyra"), displayColor],
                [
                  t("Print", "Shtypi"),
                  design.printColors +
                    " " +
                    t("color(s) · flexographic", "ngjyra · fleksografik"),
                ],
                ...(studioEnabled ? [[studioSpecification ? t("Preview sides", "Anët në parapamje") : t("Artwork sides", "Anët me dizajn"), artworkSummary]] : []),
                [t("Quantity", "Sasia"), design.quantity.toLocaleString()],
                [
                  t("Destination", "Destinacioni"),
                  [design.city, design.country].filter(Boolean).join(", "),
                ],
                [
                  t("Requested date", "Data e kërkuar"),
                  design.date || t("To discuss", "Për diskutim"),
                ],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="quote-required">
              <span>{t("Pricing", "Çmimi")}</span>
              <strong>{t("Quotation required", "Nevojitet ofertë")}</strong>
            </div>
            <p className="micro">
              <LockKeyhole size={13} />
              {t(
                "Your selections stay with your request.",
                "Zgjedhjet tuaja ruhen me kërkesën.",
              )}
            </p>
            <button className="text-button" onClick={() => goToStep(0)}>
              {t("Edit specifications", "Ndrysho specifikimet")}
            </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
