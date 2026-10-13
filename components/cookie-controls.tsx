"use client";
import { useState } from "react";
import { useKobags } from "./kobags-context";
import { initialDesign } from "@/lib/catalog";
import { clearStoredDraft } from "@/lib/draft-storage";
export default function CookieControls() {
  const { replace, t } = useKobags();
  const [done, setDone] = useState(false);
  return (
    <div>
      <button
        className="button secondary"
        onClick={() => {
          clearStoredDraft();
          replace({ ...initialDesign, key: crypto.randomUUID() });
          try { localStorage.removeItem("kobags-quote-step"); } catch {}
          setDone(true);
        }}
      >
        {t("Clear this browser’s design draft", "Pastroni dizajnin në këtë shfletues")}
      </button>
      {done && (
        <p role="status">
          {t("The local design draft has been cleared. This does not delete requests already saved on the server.", "Dizajni i shfletuesit u pastrua. Kjo nuk i fshin kërkesat e ruajtura tashmë në server.")}
        </p>
      )}
    </div>
  );
}
