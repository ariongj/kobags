"use client";
import { useRef, useState } from "react";
import Link from "./site-link";
import {
  ArrowUpRight,
  Download,
  FileText,
  Search,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { certificates, type Certificate } from "@/lib/certificates";
import { useKobags } from "./kobags-context";
export function CertificateShowcase() {
  const { t } = useKobags();
  return (
    <section className="certificate-showcase">
      <div className="certificate-intro">
        <p className="eyebrow">
          <ShieldCheck size={17} />
          {t("DOCUMENTED STANDARDS", "STANDARDE TË DOKUMENTUARA")}
        </p>
        <h2>
          {t("Confidence,", "Besim,")}
          <br />
          <span>{t("in the details.", "në çdo detaj.")}</span>
        </h2>
        <p>
          {t(
            "Get closer to the standards behind the operation. Explore the published quality and environmental management certificates, with readable details and original documents.",
            "Shqyrtoni standardet e veprimtarisë. Certifikatat e publikuara për cilësinë dhe menaxhimin mjedisor, me detaje të lexueshme dhe dokumentet origjinale.",
          )}
        </p>
        <Link href="/certifications" className="button">
          {t("Explore our certificates", "Shqyrtoni certifikatat")}
          <ArrowUpRight size={18} />
        </Link>
        <small>
          {t(
            "Published management-system records. Current status is subject to issuer verification.",
            "Dokumente të publikuara të sistemit të menaxhimit. Statusi aktual kërkon verifikim nga lëshuesi.",
          )}
        </small>
      </div>
      <div className="certificate-duo">
        {certificates.map((c, i) => (
          <Link
            href={`/certifications#iso-${c.id}`}
            className="certificate-mini"
            key={c.id}
          >
            <div className="certificate-mini-top">
              <span>
                0{i + 1} / {t("CERTIFICATE", "CERTIFIKATË")}
              </span>
              <ArrowUpRight size={17} />
            </div>
            <div className="certificate-mini-paper">
              <img
                src={`/assets/certificate-iso${c.id}.webp`}
                width={390}
                height={550}
                alt={`${c.standard} — ${t("published certificate scan", "certifikatë e publikuar")}`}
                loading="lazy"
              />
            </div>
            <h3>{c.standard}</h3>
            <p>{t(c.title, c.titleSq)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
export default function Certificates() {
  const { t } = useKobags();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [zoom, setZoom] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);
  const filtered = certificates.filter((c) =>
    `${c.standard} ${c.title} ${c.titleSq} ${c.number} Eco Bag Solution Certi W Kosovo Lipjan`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <div className="certificate-library">
      <div className="certificate-library-bar">
        <div>
          <p className="eyebrow">
            {t("THE DOCUMENT LIBRARY", "BIBLIOTEKA E DOKUMENTEVE")}
          </p>
          <p>
            {t(
              "Original records. Every detail in view.",
              "Dokumente origjinale. Çdo detaj i dukshëm.",
            )}
          </p>
        </div>
        <label className="certificate-search">
          <Search size={18} />
          <input
            type="search"
            aria-label={t("Search certificates", "Kërko certifikatat")}
            placeholder={t(
              "Search standard or certificate…",
              "Kërko standardin ose certifikatën…",
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <p className="sr-only" role="status">
        {filtered.length} {t("certificates found", "certifikata të gjetura")}
      </p>
      {filtered.map((c, i) => (
        <article className="certificate-record" id={`iso-${c.id}`} key={c.id}>
          <div className="certificate-document">
            <span className="certificate-document-label">
              <FileText size={15} />
              {t("PUBLISHED DOCUMENT", "DOKUMENT I PUBLIKUAR")}
            </span>
            <button
              type="button"
              className="certificate-scan"
              aria-label={`${t("Inspect", "Shqyrto")} ${c.standard}`}
              onClick={(e) => {
                opener.current = e.currentTarget;
                setSelected(c);
                setZoom(false);
              }}
            >
              <img
                src={`/assets/certificate-iso${c.id}.webp`}
                alt={`${c.standard}, ${c.number}, Eco Bag Solution L.L.C. — ${t("original scan", "skanimi origjinal")}`}
                width={770}
                height={1087}
              />
              <span>
                <ZoomIn size={16} />
                {t("Inspect document", "Shqyrto dokumentin")}
              </span>
            </button>
          </div>
          <div className="certificate-record-details">
            <p className="eyebrow">
              0{i + 1} / {t(c.title, c.titleSq)}
            </p>
            <h2>
              ISO {c.id}
              <span>:2015</span>
            </h2>
            <p className="certificate-record-lead">
              {t(
                c.id === "9001"
                  ? "A framework for consistent quality."
                  : "A framework for environmental management.",
                c.id === "9001"
                  ? "Një kuadër për cilësi të qëndrueshme."
                  : "Një kuadër për menaxhimin mjedisor.",
              )}
            </p>
            <dl className="certificate-metadata">
              <div>
                <dt>{t("Certified entity", "Subjekti i certifikuar")}</dt>
                <dd>Eco Bag Solution L.L.C.</dd>
              </div>
              <div>
                <dt>{t("Certification body", "Organi certifikues")}</dt>
                <dd>Certi W</dd>
              </div>
              <div className="wide">
                <dt>{t("Certificate number", "Numri i certifikatës")}</dt>
                <dd>{c.number}</dd>
              </div>
              <div className="wide">
                <dt>{t("Location on document", "Adresa në dokument")}</dt>
                <dd>Magjistralja Prishtinë–Ferizaj, Lipjan, Kosovo</dd>
              </div>
              <div className="wide">
                <dt>{t("Published scope", "Fusha e publikuar")}</dt>
                <dd>
                  {t(
                    "Production and sale of PP bags, described as “eco-friendly” in the certificate.",
                    "Prodhimi dhe shitja e çantave PP, të përshkruara si “eco-friendly” në certifikatë.",
                  )}
                </dd>
              </div>
              <div>
                <dt>
                  {t(
                    "Registered / latest issue",
                    "Regjistrimi / lëshimi i fundit",
                  )}
                </dt>
                <dd>27 January 2026</dd>
              </div>
              <div>
                <dt>{t("Expiry field", "Afati i skadimit")}</dt>
                <dd>26 January 2029</dd>
              </div>
              <div className="wide certificate-validity">
                <dt>
                  {t(
                    "Additional validity condition",
                    "Kushti shtesë i vlefshmërisë",
                  )}
                </dt>
                <dd>
                  {t(
                    "The scan also states 26 January 2027, subject to successful continuing assessment and annual fees. Confirm current status with the issuer.",
                    "Skanimi shënon gjithashtu 26 janar 2027, me kusht vlerësimin e vazhdueshëm dhe tarifat vjetore. Konfirmoni statusin aktual me lëshuesin.",
                  )}
                </dd>
              </div>
            </dl>
            <div className="certificate-actions">
              <a
                className="button"
                href={`/documents/iso-${c.id}-original.png`}
                download
              >
                <Download size={17} />
                {t("Download original", "Shkarko origjinalin")}
              </a>
              <a
                className="text-button"
                href={c.source}
                target="_blank"
                rel="noreferrer"
              >
                {t("View source", "Shiko burimin")}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </article>
      ))}
      {!filtered.length && (
        <div className="certificate-empty">
          <Search size={28} />
          <h2>{t("No matching certificates", "Nuk u gjetën certifikata")}</h2>
          <p>
            {t(
              "Try “9001”, “14001” or “quality”.",
              "Provoni “9001”, “14001” ose “cilësi”.",
            )}
          </p>
          <button className="text-button" onClick={() => setQuery("")}>
            {t("Show all certificates", "Shfaq të gjitha certifikatat")}
          </button>
        </div>
      )}
      <div className="certificate-verification">
        <ShieldCheck size={27} />
        <div>
          <h2>
            {t("Know what you’re verifying.", "Dijeni çfarë po verifikoni.")}
          </h2>
          <p>
            {t(
              "Details above are transcribed from the scans published by Kobags. These are management-system certificates, not product environmental certifications. ISO develops standards; certification bodies issue certificates. The current status and relationship of the named entity to Kobags require confirmation before procurement.",
              "Detajet janë transkriptuar nga skanimet e publikuara nga Kobags. Janë certifikata të sistemit të menaxhimit, jo certifikata mjedisore të produktit. ISO harton standardet; organet certifikuese lëshojnë certifikatat. Konfirmoni statusin aktual dhe lidhjen e subjektit me Kobags para prokurimit.",
            )}
          </p>
          <div>
            <Link href="/contact" className="text-button">
              {t(
                "Request verification details",
                "Kërkoni detajet e verifikimit",
              )}
              <ArrowUpRight size={16} />
            </Link>
            <a
              href="https://www.iso.org/certification.html"
              target="_blank"
              rel="noreferrer"
              className="text-button"
            >
              {t("ISO certification guidance", "Udhëzime nga ISO")}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          className="certificate-dialog"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            opener.current?.focus();
          }}
        >
          <DialogTitle>
            {selected?.standard} ·{" "}
            {t("Original document", "Dokumenti origjinal")}
          </DialogTitle>
          <DialogDescription>
            {selected?.number} · Eco Bag Solution L.L.C.
          </DialogDescription>
          <div className="certificate-dialog-tools">
            <button className="text-button" onClick={() => setZoom(!zoom)}>
              {zoom ? <ZoomOut size={17} /> : <ZoomIn size={17} />}
              {zoom
                ? t("Fit document", "Përshtat dokumentin")
                : t("Zoom in", "Zmadho")}
            </button>
            <a
              className="text-button"
              href={`/documents/iso-${selected?.id}-original.png`}
              download
            >
              <Download size={16} />
              {t("Download original", "Shkarko origjinalin")}
            </a>
          </div>
          <div
            className={`certificate-viewer ${zoom ? "zoomed" : ""}`}
            tabIndex={0}
            aria-label={t(
              "Certificate document; scroll to inspect",
              "Dokumenti i certifikatës; lëvizni për ta shqyrtuar",
            )}
          >
            {selected && (
              <img
                src={`/documents/iso-${selected.id}-original.png`}
                alt={`${selected.standard} certificate ${selected.number}`}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
