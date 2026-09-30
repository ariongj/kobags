"use client";
import { useState } from "react";
import { useKobags } from "./kobags-context";
import { initialDesign } from "@/lib/catalog";
export default function CookieControls() {
  const { update, t } = useKobags();
  const [done, setDone] = useState(false);
  return (
    <div>
      <button
        className="button secondary"
        onClick={() => {
          update({ ...initialDesign, key: crypto.randomUUID() });
          localStorage.removeItem("kobags-quote-step");
          setDone(true);
        }}
      >
        {t("Clear this browser’s design draft", "Pastroni dizajnin në këtë shfletues")}
      </button>
      {done && (
        <p role="status">
          {t("The local design draft has been cleared. Submitted demo records remain in your demo workspace.", "Dizajni i shfletuesit u pastrua. Kërkesat e dërguara mbeten në hapësirën tuaj të demonstrimit.")}
        </p>
      )}
    </div>
  );
}
