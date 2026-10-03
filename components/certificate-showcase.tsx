"use client";
import { usePublishedCertificates } from "./cms/public-context";
import Link from "./site-link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

import { useKobags } from "./kobags-context";
export function CertificateShowcase() {
  const { t } = useKobags();
  const certificates=usePublishedCertificates();
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
                src={c.image || `/assets/certificate-iso${c.id}.webp`}
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
