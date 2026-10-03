"use client";
import { useLiveInquiry, LiveReceipt } from "./cms/live-inquiry";
import { useState } from "react";
import Link from "@/components/site-link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useKobags } from "./kobags-context";
import { Choice } from "./bag-studio";
import { useDemo, errors } from "./demo-store";
import { requestFieldLimits } from "@/lib/design-validation";
export default function InquiryForm({
  kind,
}: {
  kind: "sample" | "partner" | "contact";
}) {
  const { t, lang, design } = useKobags();
  const { act, busy:demoBusy, error:demoError } = useDemo();
  const live=useLiveInquiry();
  const busy=demoBusy||live.busy;
  const error=live.error||demoError;
  const [done, setDone] = useState("");
  const [key, setKey] = useState(() =>
    typeof crypto !== "undefined" ? crypto.randomUUID() : "",
  );
  const [consent, setConsent] = useState(false);
  const [model, setModel] = useState("Sales partner");
  const [invalid, setInvalid] = useState("");
  const [data, setData] = useState({
    company: "",
    contact: "",
    email: "",
    country: "Kosovo",
    website: "",
    message: "",
  });
  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));
  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setInvalid(
        t(
          "Please acknowledge how this inquiry is saved.",
          "Ju lutemi pranoni njoftimin e privatësisë.",
        ),
      );
      return;
    }
    setInvalid("");
    try {
      const action = {
        type: "inquiry",
        data: {
          kind,
          key,
          company: data.company,
          contact: data.contact,
          email: data.email,
          country: data.country,
          model: kind === "partner" ? model : "",
          message:
            (kind === "sample"
              ? "Sample interest: " +
                design.product +
                " / " +
                design.size +
                ". "
              : "") +
            (data.website ? "Website: " + data.website + "\n" : "") +
            data.message,
          consent,
        },
      };
      let id: string | undefined;
      try {
        id = live.enabled ? await live.send({kind,data:action.data}) : await act(action);
      } catch (cause) {
        if (!(cause instanceof Error) || cause.message !== "REQUEST_KEY_CONFLICT") throw cause;
        const nextKey = crypto.randomUUID();
        setKey(nextKey);
        id = live.enabled ? await live.send({kind,data:{...action.data,key:nextKey}}) : await act({ ...action, data: { ...action.data, key: nextKey } });
      }
      if (id) setDone(id);
    } catch {}
  };
  if(live.enabled&&(live.reference||live.checking))return <LiveReceipt heading="h2" reference={live.reference} checking={live.checking}/>;
  if (done)
    return (
      <div className="section-card success-inquiry">
        <CheckCircle2 size={35} />
        <h2>{t("Your inquiry is saved.", "Kërkesa juaj u ruajt.")}</h2>
        <p>
          {t("Reference:", "Referenca:")} {done}
        </p>
        <p>
          {t(
            "Your inquiry is saved in this website workspace. No message has been sent to Kobags.",
            "Kërkesa juaj është ruajtur në këtë hapësirë të faqes. Asnjë mesazh nuk është dërguar te Kobags.",
          )}
        </p>
      </div>
    );
  return (
    <form onSubmit={send} className="section-card inquiry-form">
      <h2>
        {kind === "sample"
          ? t("Let’s talk samples.", "Le të flasim për mostrat.")
          : kind === "partner"
            ? t("Introduce your business.", "Prezantoni biznesin tuaj.")
            : t("What can we help with?", "Si mund t’ju ndihmojmë?")}
      </h2>
      <div className="form-grid">
        {[
          ["company", t("Company", "Kompania"), "text"],
          ["contact", t("Contact name", "Emri i kontaktit"), "text"],
          ["email", t("Business email", "Emaili i biznesit"), "email"],
          [
            "country",
            t("Country / target market", "Shteti / tregu i synuar"),
            "text",
          ],
        ].map(([k, label, type]) => (
          <div className="field" key={k}>
            <label htmlFor={"inquiry-" + k}>{label} *</label>
            <input
              id={"inquiry-" + k}
              type={type}
              required
              minLength={2}
              maxLength={requestFieldLimits[k] || 150}
              value={data[k as keyof typeof data]}
              onChange={(e) => set(k, e.target.value)}
            />
          </div>
        ))}
        {kind === "partner" && (
          <>
            <Choice
              id="partner-model"
              label={t("Partner model", "Modeli i partneritetit")}
              value={model}
              onChange={setModel}
              options={[
                "Country representative",
                "Sales partner",
                "Affiliate",
              ].map((s) => ({ value: s, label: t(s, ({ "Country representative": "Përfaqësues për një vend", "Sales partner": "Partner shitjesh", Affiliate: "Partner referimi" } as Record<string, string>)[s]) }))}
            />
            <div className="field">
              <label htmlFor="website">{t("Website (optional)", "Faqja e internetit (opsionale)")}</label>
              <input
                id="website"
                type="url"
                value={data.website}
                maxLength={200}
                onChange={(e) => set("website", e.target.value)}
              />
            </div>
          </>
        )}
        <div className="field full">
          <label htmlFor="inquiry-message">
            {kind === "partner"
              ? t("Relevant experience and markets", "Përvoja dhe tregjet")
              : kind === "sample"
                ? t(
                    "Bag interest, quantity and destination",
                    "Lloji i çantës, sasia dhe destinacioni",
                  )
                : t("Your question", "Pyetja juaj")}{" "}
            *
          </label>
          <textarea
            id="inquiry-message"
            required
            minLength={5}
            maxLength={2500}
            rows={4}
            value={data.message}
            onChange={(e) => set("message", e.target.value)}
          />
        </div>
        <label className="check-label full">
          <Checkbox
            checked={consent}
            onCheckedChange={(v) => setConsent(v === true)}
          />
          <span>
            {t(
              live.enabled ? "I agree that Kobags may store my contact details to respond to this inquiry." : "I understand my inquiry is saved in this website workspace and no email is sent to Kobags.",
              live.enabled ? "Pajtohem që Kobags t’i ruajë të dhënat e kontaktit për t’iu përgjigjur kësaj kërkese." : "E kuptoj se kërkesa ruhet në këtë faqe dhe nuk dërgohet email te Kobags.",
            )}{" "}
            <Link href="/privacy">{t("Privacy notice", "Privatësia")}</Link>
          </span>
        </label>
      </div>
      {(error || invalid) && (
        <p className="error" role="alert">
          {invalid ||
            (errors[error] || errors.SAVE_FAILED)[lang === "sq" ? 1 : 0]}
        </p>
      )}
      <button className="button" type="submit" disabled={busy}>
        {busy
          ? t("Saving…", "Duke ruajtur…")
          : t("Save inquiry", "Ruaj kërkesën")}{" "}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
