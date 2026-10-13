"use client";
import { useEffect, useState, useCallback } from "react";
import { DemoState } from "@/lib/demo-domain";
export const errors: Record<string, [string, string]> = {
  RATE_LIMIT: ["Too many requests were made from this connection. Please wait and retry; your design has been kept.", "Janë bërë shumë kërkesa nga kjo lidhje. Ju lutemi prisni dhe provoni përsëri; dizajni juaj është ruajtur."],
  INVALID_VARIANT: ["This bag or size is no longer available. Return to the studio and choose an available option.", "Kjo çantë ose madhësi nuk është më e disponueshme. Kthehuni në studio dhe zgjidhni një opsion të disponueshëm."],
  INVALID_COLOR: ["This bag color is no longer available. Choose another color in the studio.", "Kjo ngjyrë e çantës nuk është më e disponueshme. Zgjidhni një ngjyrë tjetër në studio."],
  INVALID_PRINT_COLORS: ["The print-color limit has changed. Review your design in the studio.", "Kufiri i ngjyrave të shtypit ka ndryshuar. Shqyrtoni dizajnin në studio."],
  REQUEST_KEY_CONFLICT: [
    "An earlier version of this request is already saved. Please retry to save your updated design separately.",
    "Një version i mëparshëm i kërkesës është ruajtur. Provoni përsëri për ta ruajtur veçmas dizajnin e përditësuar.",
  ],
  MINIMUM: [
    "This quantity is below the wholesale minimum. Please request samples or an exception.",
    "Sasia është nën minimumin. Kërkoni mostra ose përjashtim.",
  ],
  DATE: [
    "Choose a valid future date.",
    "Zgjidhni një datë të vlefshme në të ardhmen.",
  ],
  DEMO_SESSION_REQUIRED: [
    "Allow essential cookies and try again. Your current entries have been kept.",
    "Lejoni cookies e domosdoshme dhe provoni përsëri. Të dhënat aktuale janë ruajtur.",
  ],
  AUTH_REQUIRED: [
    "Sign in to open your demo workspace.",
    "Identifikohuni për të hapur demonstrimin privat.",
  ],
  STORAGE_UNAVAILABLE: [
    "Request storage is temporarily unavailable. Your current entries are still on this page. Please retry.",
    "Ruajtja e kërkesave përkohësisht nuk është e disponueshme. Të dhënat aktuale mbeten në këtë faqe. Provoni përsëri.",
  ],
  RELEASE_GATES: [
    "Accept the latest quote, approve the latest artwork and satisfy its payment condition before release.",
    "Pranoni ofertën e fundit, miratoni dizajnin e fundit dhe plotësoni kushtin e pagesës.",
  ],
  STALE_ARTWORK: [
    "This proof has changed or requires a new revision. Refresh and review the latest artwork.",
    "Prova ka ndryshuar ose kërkon version të ri. Rifreskoni dhe shqyrtoni dizajnin e fundit.",
  ],
  STALE_QUOTE: [
    "The quotation has changed or expired. Review the latest version.",
    "Oferta ka ndryshuar ose ka skaduar. Shqyrtoni versionin e fundit.",
  ],
  EVIDENCE_REVIEW: [
    "Assign a confirmed approval owner and review date before publishing this evidence.",
    "Caktoni përgjegjësin dhe datën e rishikimit para publikimit.",
  ],
  DEMO_LIMIT: [
    "This browser’s saved request limit has been reached. Please contact Kobags using the email address below.",
    "Është arritur kufiri i kërkesave të ruajtura nga ky shfletues. Ju lutemi kontaktoni Kobags përmes emailit më poshtë.",
  ],
  SAVE_FAILED: [
    "The request could not be saved. Check your entries and retry; your design has been kept.",
    "Kërkesa nuk u ruajt. Kontrolloni të dhënat dhe provoni përsëri; dizajni është ruajtur.",
  ],
};
// Share the initial request so parallel consumers establish one guest cookie.
let pendingRead: Promise<DemoState> | null = null;
function loadDemo() {
  if (!pendingRead)
    pendingRead = (async () => {
      const res = await fetch("/api/demo");
      const data = (await res.json()) as { state: DemoState; error?: string };
      if (!res.ok) throw Error(data.error || "STORAGE_UNAVAILABLE");
      return data.state;
    })().finally(() => {
      pendingRead = null;
    });
  return pendingRead;
}
export function useDemo() {
  const [state, setState] = useState<DemoState | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const refresh = useCallback(async () => {
    try {
      setState(await loadDemo());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "STORAGE_UNAVAILABLE");
    }
  }, []);
  useEffect(() => {
    let mounted = true;
    loadDemo().then((value) => {
      if (mounted) { setState(value); setError(""); }
    }).catch((cause) => {
      if (mounted) setError(cause instanceof Error ? cause.message : "STORAGE_UNAVAILABLE");
    });
    const f = () => refresh();
    window.addEventListener("focus", f);
    window.addEventListener("kobags-change", f);
    return () => {
      mounted = false;
      window.removeEventListener("focus", f);
      window.removeEventListener("kobags-change", f);
    };
  }, [refresh]);
  const act = async (a: Record<string, unknown>) => {
    setBusy(true);
    setError("");
    try {
      await loadDemo();
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(a),
      });
      const d = (await res.json()) as {
        state: DemoState;
        error?: string;
        id?: string;
      };
      if (!res.ok) throw Error(d.error || "SAVE_FAILED");
      setState(d.state);
      window.dispatchEvent(new Event("kobags-change"));
      return d.id as string | undefined;
    } catch (e) {
      setError(e instanceof Error ? e.message : "SAVE_FAILED");
      throw e;
    } finally {
      setBusy(false);
    }
  };
  return { state, error, busy, act, refresh };
}
