"use client";
import { useEffect, useState, useCallback } from "react";
import { DemoState } from "@/lib/demo-domain";
export const errors: Record<string, [string, string]> = {
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
    "Allow cookies for this demo and try again. Your bag design is still saved.",
    "Lejoni cookies për demonstrimin dhe provoni përsëri. Dizajni është ruajtur.",
  ],
  AUTH_REQUIRED: [
    "Sign in to open your demo workspace.",
    "Identifikohuni për të hapur demonstrimin privat.",
  ],
  STORAGE_UNAVAILABLE: [
    "The demo storage is unavailable. Your design is still saved in this browser. Please retry.",
    "Ruajtja nuk është e disponueshme. Dizajni juaj ruhet në këtë shfletues. Provoni përsëri.",
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
    "This demo has reached its storage limit. Export useful records, then reset the synthetic demo.",
    "Demonstrimi ka arritur kufirin e ruajtjes. Eksportoni të dhënat, pastaj rivendoseni.",
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
