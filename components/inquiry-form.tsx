"use client";
import { useState } from "react";
import Link from "@/components/site-link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useKobags } from "./kobags-context";
import { Choice } from "./bag-studio";
import { useDemo, errors } from "./demo-store";
export default function InquiryForm({
  kind,
}: {
  kind: "sample" | "partner" | "contact";
}) {
  const { t, lang, design } = useKobags();
  const { act, busy, error } = useDemo();
  const [done, setDone] = useState("");
  const [key] = useState(() =>
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
          "Please acknowledge the demo privacy notice.",
          "Ju lutemi pranoni njoftimin e privatësisë.",
        ),
      );
      return;
    }
    setInvalid("");
    try {
      const id = await act({
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
      });
      if (id) setDone(id);
    } catch {}
  };
  if (done)
    return (
      <div className="section-card success-inquiry">
        <CheckCircle2 size={35} />
        <h2>{t("Your inquiry is saved.", "Kërkesa juaj u ruajt.")}</h2>
        <p>
          {t("Demo reference:", "Referenca demo:")} {done}
        </p>
        <p>
          {t(
            "The sales demo has the same record. No message has been sent to Kobags.",
            "Demo e shitjeve ka të njëjtën kërkesë. Asnjë mesazh nuk është dërguar te Kobags.",
          )}
        </p>
        <Link className="button" href="/demo/admin">
          Open sales demo <ArrowRight size={16} />
        </Link>
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
      <div className="notice">
        {t(
          "Demo only. Please use fictional contact details. No message will be sent.",
          "Vetëm demo. Përdorni të dhëna fiktive. Asnjë mesazh nuk dërgohet.",
        )}
      </div>
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
              maxLength={150}
              value={data[k as keyof typeof data]}
              onChange={(e) => set(k, e.target.value)}
            />
          </div>
        ))}
        {kind === "partner" && (
          <>
            <Choice
              id="partner-model"
              label="Partner model"
              value={model}
              onChange={setModel}
              options={[
                "Country representative",
                "Sales partner",
                "Affiliate",
              ].map((s) => ({ value: s, label: s }))}
            />
            <div className="field">
              <label htmlFor="website">Website (optional)</label>
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
              "I understand this is a website demonstration and my inquiry will be stored for review.",
              "E kuptoj se ky është demonstrim privat dhe kërkesa ruhet për shqyrtim.",
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
          : t("Submit demo inquiry", "Dërgo kërkesën demo")}{" "}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
