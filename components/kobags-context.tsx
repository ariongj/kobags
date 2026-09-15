"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import { Design, initialDesign, products, colors } from "@/lib/catalog";
type Context = {
  lang: "en" | "sq";
  setLang: (v: "en" | "sq") => void;
  t: (en: string, sq?: string) => string;
  design: Design;
  update: (v: Partial<Design>) => void;
  ready: boolean;
};
const C = createContext<Context>(null!);
export function KobagsProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<"en" | "sq">("en");
  const [design, setDesign] = useState<Design>(initialDesign);
  const [ready, setReady] = useState(false);
  const draftRef = useRef<Design>(initialDesign);
  const updateDraft = (patch: Partial<Design>) => {
    const next = { ...draftRef.current, ...patch };
    draftRef.current = next;
    // Product and reorder buttons navigate immediately after this call.
    try {
      localStorage.setItem("kobags-design-v1", JSON.stringify(next));
    } catch {}
    setDesign(next);
  };
  useEffect(() => {
    try {
      const d = localStorage.getItem("kobags-design-v1");
      if (d) {
        draftRef.current = { ...initialDesign, ...JSON.parse(d) };
        setDesign(draftRef.current);
      }
      const l = localStorage.getItem("kobags-language");
      if (l === "sq") setLang(l);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("kobags-design-v1", JSON.stringify(design));
        localStorage.setItem("kobags-language", lang);
      } catch {}
    }
    document.documentElement.lang = lang;
  }, [design, lang, ready]);
  useEffect(() => {
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (t: unknown, o: unknown) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context?.registerTool || !ready) return;
    const lifecycle = new AbortController();
    const tools = [
      {
        name: "read_bag_design",
        title: "Read current bag design",
        description:
          "Read the current bag configuration and visual placement. Does not submit a quotation.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true, untrustedContentHint: true },
        execute: () => ({
          product: design.product,
          size: design.size,
          color: design.color,
          quantity: design.quantity,
          artwork: {
            side: design.side,
            x: design.x,
            y: design.y,
            scale: design.scale,
            hasLogo: !!design.logo,
          },
          indicative: true,
        }),
      },
      {
        name: "configure_bag_draft",
        title: "Configure bag draft",
        description:
          "Update the visible bag design draft. Does not submit, order or send anything.",
        inputSchema: {
          type: "object",
          properties: {
            product: { type: "string", enum: products.map((p) => p.slug) },
            color: { type: "string", enum: colors.map((c) => c.name) },
            text: { type: "string", maxLength: 60 },
          },
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute: (input: unknown) => {
          if (!input || typeof input !== "object")
            throw Error("Invalid bag configuration");
          const v = input as Record<string, unknown>;
          if (
            Object.keys(v).some(
              (k) => !["product", "color", "text"].includes(k),
            )
          )
            throw Error("Unsupported field");
          if (v.product && !products.some((p) => p.slug === v.product))
            throw Error("Unknown product");
          if (v.color && !colors.some((c) => c.name === v.color))
            throw Error("Unknown color");
          if (
            v.text !== undefined &&
            (typeof v.text !== "string" || v.text.length > 60)
          )
            throw Error("Invalid brand text");
          const patch: Partial<Design> = {};
          if (v.product) {
            patch.product = String(v.product);
            patch.size = products.find(
              (p) => p.slug === v.product,
            )!.variants[0].name;
          }
          if (v.color) patch.color = String(v.color);
          if (v.text !== undefined) {
            patch.text = String(v.text);
            patch.logo = "";
          }
          updateDraft(patch);
          return { updated: patch, submitted: false };
        },
      },
    ];
    for (const tool of tools)
      try {
        Promise.resolve(
          context.registerTool(tool, { signal: lifecycle.signal }),
        ).catch(() => {});
      } catch {}
    return () => lifecycle.abort();
  }, [design, ready]);
  return (
    <C.Provider
      value={{
        lang,
        setLang,
        t: (en, sq) => (lang === "sq" ? sq || en : en),
        design,
        update: updateDraft,
        ready,
      }}
    >
      {children}
    </C.Provider>
  );
}
export const useKobags = () => useContext(C);
