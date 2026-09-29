"use client";
import { useEffect, useState } from "react";
import Link from "@/components/site-link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  LockKeyhole,
  Pencil,
  Info,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Choice, BagPreview } from "./bag-studio";
import { useKobags } from "./kobags-context";
import { useDemo, errors } from "./demo-store";
import { products, getProduct, Design } from "@/lib/catalog";
import { sideArtwork } from "@/lib/studio-artwork";
import { artworkSides } from "@/lib/studio-checks";
export default function QuoteFlow() {
  const { t, lang, design, update, ready } = useKobags();
  const { state, error, busy, act } = useDemo();
  const [step, setStep] = useState(0);
  const [validation, setValidation] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const p = getProduct(design.product);
  const variant =
    p.variants.find((v) => v.name === design.size) || p.variants[0];
  const minimum = state?.settings.moq || 5000;
  const sides = artworkSides(design);
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
    try {
      setStep(
        Math.min(
          3,
          Math.max(0, Number(localStorage.getItem("kobags-quote-step")) || 0),
        ),
      );
    } catch {}
    setHydrated(true);
    const done = new URLSearchParams(location.search).get("submitted");
    if (done) setSubmitted(done);
  }, []);
  useEffect(() => {
    if (hydrated)
      try {
        localStorage.setItem("kobags-quote-step", String(step));
      } catch {}
  }, [step, hydrated]);
  useEffect(() => {
    if (ready && !design.key) update({ key: crypto.randomUUID() });
  }, [ready, design.key, update]);
  const set = (key: keyof Design, value: unknown) => update({ [key]: value });
  const validate = () => {
    if (step === 2) {
      if (!Number.isInteger(design.quantity) || design.quantity < minimum)
        return "quantity";
      if (!design.country.trim()) return "country";
      if (design.city.trim().length < 2) return "city";
      if (design.date && design.date < new Date().toISOString().slice(0, 10))
        return "date";
    }
    if (step === 3) {
      if (
        design.company.trim().length < 2 ||
        design.contact.trim().length < 2 ||
        !/^\S+@\S+\.\S+$/.test(design.email)
      )
        return "company";
      if (!design.consent) return "consent";
    }
    return "";
  };
  const messages: Record<string, [string, string]> = {
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
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    try {
      const id = await act({ type: "submit", design });
      if (id) {
        setSubmitted(id);
        history.replaceState(null, "", "/quote?submitted=" + id);
        localStorage.setItem("kobags-quote-step", "0");
        window.scrollTo(0, 0);
      }
    } catch {}
  };
  if (submitted)
    return (
      <main className="success-page content-width">
        <div className="success-icon">
          <CheckCircle2 size={36} />
        </div>
        <p className="eyebrow">
          {t("DESIGN SAVED", "DIZAJNI U RUAJT")}
        </p>
        <h1>{t("Your bag has a beginning.", "Çanta juaj ka një fillim.")}</h1>
        <p>
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
        </div>
        <button
          className="text-button"
          onClick={() => {
            setSubmitted("");
            setStep(0);
            update({ key: crypto.randomUUID() });
            history.replaceState(null, "", "/quote");
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
        type={type}
        required={required}
        value={String(design[key] ?? "")}
        onChange={(e) => set(key, e.target.value)}
        maxLength={key === "note" ? 3000 : 150}
      />
    </div>
  );
  return (
    <main>
      <div className="page-heading quote-heading">
        <Link href="/design" className="text-button">
          <ArrowLeft size={14} />
          {t("Back to the studio", "Kthehu në studio")}
        </Link>
        <p className="eyebrow">
          {t("FROM YOUR DESIGN TO A QUOTATION", "NGA DIZAJNI JUAJ TE OFERTA")}
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
        <div className="demo-details-helper">
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
        </div>
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
              disabled={i > step}
              onClick={() => {
                setStep(i);
                setValidation("");
              }}
            >
              <span>{i < step ? <Check size={15} /> : i + 1}</span>
              {s}
            </button>
          ))}
        </div>
        <div className="quote-grid">
          <section className="section-card quote-form">
            <div className="step-caption">
              {t("STEP", "HAPI")} {step + 1} / 4
            </div>
            <h2>
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
                <Choice
                  id="q-product"
                  label={t("Bag family", "Lloji i çantës")}
                  value={design.product}
                  onChange={(product) =>
                    update({
                      product,
                      size: getProduct(product).variants[0].name,
                    })
                  }
                  options={products.map((p) => ({
                    value: p.slug,
                    label: p.name,
                  }))}
                />
                <Choice
                  id="q-size"
                  label={t("Size", "Madhësia")}
                  value={design.size}
                  onChange={(size) => update({ size })}
                  options={p.variants.map((v) => ({
                    value: v.name,
                    label: v.name + " · " + v.dimensions,
                  }))}
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
                  ].map((s) => ({ value: s, label: s }))}
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
                    "Custom dimensions are a request for feasibility review. Published dimension strings are preserved; dimensional drawings must be approved before manufacturing.",
                    "Përmasat e veçanta kërkojnë shqyrtim. Vizatimet e përmasave duhet të miratohen para prodhimit.",
                  )}
                </p>
              </div>
            )}
            {step === 1 && (
              <div className="form-grid">
                <div className="full quote-artwork-review">
                  <div className="quote-artwork-pair">
                    {(["front", "back"] as const).map((side) => {
                      const artwork = sideArtwork({ ...design, side });
                      return (
                        <div key={side} className="quote-artwork-face">
                          <BagPreview design={{ ...design, side }} compact />
                          <h3>
                            {t(
                              side === "front" ? "Front" : "Back",
                              side === "front" ? "Përpara" : "Prapa",
                            )}
                          </h3>
                          <p>
                            {artwork.logo &&
                            artwork.text &&
                            design.layeredArtwork
                              ? `${artwork.name || t("Uploaded logo", "Logo e ngarkuar")} + ${artwork.text}`
                              : artwork.logo
                                ? artwork.name ||
                                  t("Uploaded logo", "Logo e ngarkuar")
                                : artwork.text.trim() ||
                                  t(
                                    "No artwork · blank side",
                                    "Pa dizajn · anë bosh",
                                  )}
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
                </div>
                <Choice
                  id="q-print"
                  label={t("Print colors", "Ngjyrat e shtypit")}
                  value={String(design.printColors)}
                  onChange={(v) => update({ printColors: Number(v) })}
                  options={[1, 2, 3, 4].map((n) => ({
                    value: String(n),
                    label: `${n} ${t(n === 1 ? "color" : "colors", "ngjyra")}`,
                  }))}
                />
                <div className="field">
                  <label>
                    {t(
                      "Published printing method",
                      "Metoda e publikuar e shtypit",
                    )}
                  </label>
                  <div className="readonly">
                    {t("Flexographic printing", "Shtyp fleksografik")}
                  </div>
                </div>
                <p className="notice full">
                  {t(
                    "The product pages describe flexographic printing with up to four colors. Your image is an indicative preview; the team will check color separations and the printable area.",
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
                      .filter((n, i, a) => a.indexOf(n) === i)
                      .map((n) => (
                        <button
                          key={n}
                          className={design.quantity === n ? "selected" : ""}
                          onClick={() => update({ quantity: n })}
                        >
                          {n.toLocaleString()}
                        </button>
                      ))}
                  </div>
                  <input
                    id="quantity"
                    type="number"
                    min={1}
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
                  ].map((s) => ({ value: s, label: s }))}
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
                    state?.settings.leadTime ||
                      "Indicative dispatch: 2–4 weeks after artwork approval, subject to production confirmation.",
                    "Dërgimi orientues: 2–4 javë pas miratimit të dizajnit, sipas konfirmimit të prodhimit.",
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
                    rows={3}
                    maxLength={3000}
                    value={design.note}
                    onChange={(e) => update({ note: e.target.value })}
                  />
                </div>
                <label className="check-label full">
                  <Checkbox
                    checked={design.consent}
                    onCheckedChange={(v) => update({ consent: v === true })}
                  />
                  <span>
                    {t(
                      "I understand this demo stores my request and normalized artwork preview for demonstration. No real order or message will be sent.",
                      "E kuptoj që ky demonstrim ruan kërkesën dhe parapamjen e dizajnit. Nuk dërgohet asnjë porosi ose mesazh real.",
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
                onClick={() => {
                  setStep(Math.max(0, step - 1));
                  setValidation("");
                }}
                disabled={step === 0 || busy}
              >
                <ArrowLeft size={16} />
                {t("Back", "Prapa")}
              </button>
              <button
                className="button"
                onClick={next}
                disabled={busy || !ready}
              >
                {busy
                  ? t("Saving…", "Duke ruajtur…")
                  : step === 3
                    ? t("Save design request", "Ruaj kërkesën e dizajnit")
                    : t("Continue", "Vazhdo")}
                <ArrowRight size={16} />
              </button>
            </div>
          </section>
          <aside className="quote-summary">
            <div className="summary-top">
              <h3>{t("Your bag, so far.", "Çanta juaj deri tani.")}</h3>
              <Link href="/design" aria-label={t("Edit bag", "Ndrysho çantën")}>
                <Pencil size={16} />
              </Link>
            </div>
            <BagPreview design={design} compact />
            <h2>{p.name}</h2>
            <dl>
              {[
                [
                  t("Size", "Madhësia"),
                  design.size + " · " + variant.dimensions,
                ],
                [
                  t("Material", "Materiali"),
                  "Non-woven PP · " + variant.gsm + " GSM",
                ],
                [t("Color", "Ngjyra"), design.color],
                [
                  t("Print", "Shtypi"),
                  design.printColors +
                    " " +
                    t("color(s) · flexographic", "ngjyra · fleksografik"),
                ],
                [t("Artwork sides", "Anët me dizajn"), artworkSummary],
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
            <button className="text-button" onClick={() => setStep(0)}>
              {t("Edit specifications", "Ndrysho specifikimet")}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
