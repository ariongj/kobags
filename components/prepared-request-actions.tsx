"use client";
import { useState } from "react";
import { useKobags } from "./kobags-context";
import { useCms } from "./cms/public-context";
import { company } from "@/lib/company";
import type { Design } from "@/lib/catalog";

/** An explicit email handoff while shared-inbox intake is disabled. */
export default function PreparedRequestActions({ reference, subject, details, design }: {
  reference: string; subject: string; details: string; design?: Design;
}) {
  const { t } = useKobags();
  const { settings } = useCms();
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  const email = settings?.email || company.email;
  const download = async () => {
    if (!design || busy) return;
    setBusy(true); setError("");
    try {
      const { renderBagDesign } = await import("./bag-preview");
      const output = document.createElement("canvas"); output.width = 2000; output.height = 1220;
      const ctx = output.getContext("2d"); if (!ctx) throw Error("CANVAS_UNAVAILABLE");
      ctx.fillStyle = "#f6f8f9"; ctx.fillRect(0, 0, output.width, output.height);
      for (const [index, side] of (["front", "back"] as const).entries()) {
        const canvas = document.createElement("canvas");
        await renderBagDesign(canvas, { ...design, side }, { resolution: 1200 });
        ctx.drawImage(canvas, index * 1000 + 40, 110, 920, 920);
        ctx.fillStyle = "#123442"; ctx.font = "28px Arial"; ctx.textAlign = "center";
        ctx.fillText(index ? t("BACK", "PRAPA") : t("FRONT", "PËRPARA"), index * 1000 + 500, 1065);
      }
      ctx.textAlign = "left"; ctx.font = "600 32px Arial";
      ctx.fillText("KOBAGS / " + reference, 60, 70);
      ctx.font = "24px Arial";
      ctx.fillText(t("Saved design preview. Final production artwork requires approval.", "Parapamja e dizajnit të ruajtur. Dizajni për prodhim kërkon miratim."), 60, 1140, 1880);
      const link = document.createElement("a"); link.download = reference + "-design.png";
      link.href = output.toDataURL("image/png"); link.click();
    } catch { setError(t("The design could not be downloaded. Please try again.", "Dizajni nuk u shkarkua. Provoni përsëri.")); }
    finally { setBusy(false); }
  };
  return <div className="prepared-request-actions">
    <p>{t("Open your email app and send the prepared details to Kobags. Nothing has been sent automatically.", "Hapni aplikacionin e emailit dhe dërgojini të dhënat Kobags. Asgjë nuk është dërguar automatikisht.")}</p>
    <div className="actions">
      <a className="button" href={"mailto:" + email + "?subject=" + encodeURIComponent(subject + " — " + reference) + "&body=" + encodeURIComponent(details)}>{t("Open email to send", "Hapni emailin për dërgim")}</a>
      {design && <button className="button secondary" type="button" disabled={busy} onClick={download}>{busy ? t("Preparing…", "Duke përgatitur…") : t("Download saved design", "Shkarkoni dizajnin e ruajtur")}</button>}
    </div>
    {design && <p>{t("Attach the downloaded design and your original logo files to your email.", "Bashkëngjitni në email dizajnin e shkarkuar dhe skedarët origjinalë të logos.")}</p>}
    <details><summary>{t("Email not opening? Copy your request details", "Emaili nuk hapet? Kopjoni të dhënat e kërkesës")}</summary>
      <p>{t("Send to", "Dërgoni te")}: <a href={"mailto:" + email}>{email}</a></p>
      <label>{t("Request details", "Detajet e kërkesës")}<textarea readOnly rows={9} value={details} onFocus={event => event.currentTarget.select()} style={{ width: "100%", maxWidth: "100%" }}/></label>
    </details>
    {error && <p role="alert">{error}</p>}
  </div>;
}
