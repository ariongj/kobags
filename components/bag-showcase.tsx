"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  MoveHorizontal,
  Pause,
  Play,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Check,
  Layers,
} from "lucide-react";
import Link from "./site-link";
import { useKobags } from "./kobags-context";
import { colors, initialDesign } from "@/lib/catalog";
import { BagPreview } from "./bag-preview";
import type { BagScene } from "@/lib/bag-scene";

export default function BagShowcase() {
  const { t, update } = useKobags();
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<BagScene | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">(
    "loading",
  );
  const [playing, setPlaying] = useState(true);
  const [construction, setConstruction] = useState(false);
  const [color, setColor] = useState("Natural");
  const [text, setText] = useState("YOUR\nBRAND");
  const ink = color === "Natural" || color === "White" ? "#12313b" : "#ffffff";
  const values = useRef({ color, text });
  useEffect(() => {
    values.current = { color, text };
    scene.current?.color(colors.find((c) => c.name === color)!.hex);
    scene.current?.text(text);
  }, [color, text]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false,
      started = false;
    const observer = new IntersectionObserver(
      async (entries) => {
        const visible = entries[0].isIntersecting;
        scene.current?.visible(visible);
        if (!visible || started) return;
        started = true;
        try {
          const { createBagScene } = await import("@/lib/bag-scene");
          if (disposed) return;
          scene.current = createBagScene(element, () => setPlaying(false));
          scene.current.color(
            colors.find((c) => c.name === values.current.color)!.hex,
          );
          scene.current.text(values.current.text);
          setStatus("ready");
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            setPlaying(false);
        } catch {
          if (!disposed) setStatus("fallback");
        }
      },
      { rootMargin: "250px" },
    );
    observer.observe(element);
    const context = () => setStatus("fallback");
    const restored = () => setStatus("ready");
    element.addEventListener("webglcontextlost", context, true);
    element.addEventListener("webglcontextrestored", restored, true);
    return () => {
      disposed = true;
      observer.disconnect();
      element.removeEventListener("webglcontextlost", context, true);
      element.removeEventListener("webglcontextrestored", restored, true);
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);
  const pause = () => {
    setPlaying(false);
    scene.current?.playing(false);
  };
  return (
    <section
      className="bag-showcase"
      id="bag-showcase"
      aria-labelledby="showcase-heading"
    >
      <div className="showcase-overline">
        <span>
          {t(
            "KOBAGS / THE INTERACTIVE STUDIO",
            "KOBAGS / STUDIOJA INTERAKTIVE",
          )}
        </span>
        <span>
          {t("FROM AN IDEA. TO SOMETHING REAL.", "NGA IDEJA. NË REALITET.")}
        </span>
      </div>
      <div className="showcase-layout">
        <div className="showcase-copy">
          <p className="eyebrow">
            {t("MEET YOUR NEXT BAG", "NJOHUNI ME ÇANTËN TUAJ TË ARDHSHME")}
          </p>
          <h2 id="showcase-heading">
            {t("Imagine it.", "Imagjinojeni.")}
            <br />
            <em>{t("Make it yours.", "Personalizojeni.")}</em>
          </h2>
          <p>
            {t(
              "An idea you can turn around. Explore the details, find your color and put your name on it. Then let our production bring it to life.",
              "Një ide që mund ta shihni nga çdo anë. Eksploroni detajet, zgjidhni ngjyrën dhe vendosni emrin tuaj. Pastaj ia besoni prodhimit tonë.",
            )}
          </p>
          <div className="showcase-personalize">
            <label htmlFor="showcase-brand">
              {t("YOUR BRAND NAME", "EMRI I MARKËS SUAJ")}
            </label>
            <input
              id="showcase-brand"
              value={text.replace(/\n/g, " ")}
              maxLength={28}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("Your brand name", "Emri i markës suaj")}
            />
            <div className="showcase-color-label">
              <span>{t("MAKE IT YOUR COLOR", "ZGJIDHNI NGJYRËN TUAJ")}</span>
              <span>{t(color, colors.find((c) => c.name === color)!.sq)}</span>
            </div>
            <div
              className="showcase-swatches"
              role="group"
              aria-label={t("3D bag color", "Ngjyra e çantës 3D")}
            >
              {colors.map((c) => (
                <button
                  key={c.name}
                  aria-label={c.name + " 3D bag"}
                  aria-pressed={c.name === color}
                  style={{ background: c.hex }}
                  onClick={() => setColor(c.name)}
                >
                  {color === c.name && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>
          <Link
            href="/design"
            className="button showcase-cta"
            onClick={() =>
              update({
                product: "handle-bag",
                size: "Small",
                color,
                text,
                logo: "",
                logoName: "",
                side: "front",
                previewVersion: "v4",
                x: 50,
                y: 56,
                rotation: 0,
                scale: 34,
                textFont: "sans",
                textAlign: "center",
                ink,
              })
            }
          >
            {t(
              "Continue in the design studio",
              "Vazhdoni në studion e dizajnit",
            )}
            <ArrowUpRight size={20} />
          </Link>
          <p className="showcase-note">
            {t(
              "Add your logo. Explore all five shapes. Request your quote.",
              "Shtoni logon. Eksploroni pesë format. Kërkoni ofertën.",
            )}
          </p>
        </div>
        <div className="showcase-stage">
          <div className="showcase-watermark" aria-hidden="true">
            YOUR
            <br />
            BRAND.
          </div>
          <div className="showcase-model-caption">
            <span>01 / HANDLE BAG</span>
            <span>{t("NON-WOVEN PP", "PP JO I ENDUR")}</span>
          </div>
          <button
            className="showcase-construction"
            disabled={status !== "ready"}
            aria-pressed={construction}
            onClick={() => {
              const next = !construction;
              setConstruction(next);
              scene.current?.construction(next);
            }}
          >
            <Layers size={16} />
            {construction
              ? t("Back to the finished bag", "Çanta e përfunduar")
              : t("Explore the construction", "Eksploroni ndërtimin")}
          </button>
          <div
            ref={host}
            className="showcase-canvas"
            data-status={status}
            data-color={color}
            role="group"
            aria-label={t(
              "Interactive 3D bag. Drag to rotate, or use the arrow keys.",
              "Çantë interaktive 3D. Tërhiqeni për rrotullim ose përdorni shigjetat.",
            )}
            tabIndex={status === "ready" ? 0 : undefined}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault();
                pause();
                scene.current?.rotate(e.key === "ArrowLeft" ? -1 : 1);
              }
            }}
          />
          {status !== "ready" && (
            <div className="showcase-fallback">
              {status === "fallback" ? (
                <BagPreview design={{ ...initialDesign, color, text, ink }} />
              ) : (
                <img
                  src="/assets/studio-v4/handle.webp"
                  alt={t(
                    "Illustrative blank handle bag",
                    "Çantë ilustruese me doreza",
                  )}
                />
              )}
              <span>
                {status === "loading"
                  ? t("Preparing your 3D view…", "Duke përgatitur pamjen 3D…")
                  : t(
                      "Explore colors and personalize in the design studio.",
                      "Eksploroni ngjyrat në studion e dizajnit.",
                    )}
              </span>
            </div>
          )}
          <div className="showcase-drag-hint" aria-hidden={status !== "ready"}>
            <MoveHorizontal size={18} />
            {t(
              "Drag to discover every angle",
              "Tërhiqeni për ta parë nga çdo kënd",
            )}
          </div>
          <div className="showcase-view-controls" aria-label="3D view controls">
            <button
              disabled={status !== "ready"}
              onClick={() => {
                pause();
                scene.current?.rotate(-1);
              }}
              aria-label="Rotate bag left"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              disabled={status !== "ready"}
              onClick={() => {
                pause();
                scene.current?.view("front");
              }}
            >
              {t("Front", "Përpara")}
            </button>
            <button
              disabled={status !== "ready"}
              onClick={() => {
                pause();
                scene.current?.view("back");
              }}
            >
              {t("Back", "Prapa")}
            </button>
            <button
              disabled={status !== "ready"}
              onClick={() => {
                pause();
                scene.current?.rotate(1);
              }}
              aria-label="Rotate bag right"
            >
              <ArrowRight size={17} />
            </button>
            <span />
            <button
              disabled={status !== "ready"}
              onClick={() => {
                pause();
                scene.current?.view("angle");
              }}
              aria-label="Reset 3D view"
            >
              <RotateCcw size={17} />
            </button>
            <button
              disabled={status !== "ready"}
              aria-label={
                playing ? "Pause bag animation" : "Play bag animation"
              }
              aria-pressed={playing}
              onClick={() => {
                const next = !playing;
                setPlaying(next);
                scene.current?.playing(next);
              }}
            >
              {playing ? <Pause size={17} /> : <Play size={17} />}
            </button>
          </div>
          <p className="showcase-stage-note">
            {t(
              "Interactive concept · Final shape, color and print require approval.",
              "Koncept interaktiv · Forma, ngjyra dhe shtypi kërkojnë miratim.",
            )}
          </p>
        </div>
      </div>
      <div className="showcase-bottom">
        <span>{t("YOUR IDEA", "IDEJA JUAJ")}</span>
        <i />
        <span>{t("OUR CRAFT", "PUNA JONË")}</span>
        <i />
        <span>
          {t("YOUR NEXT BRAND MOMENT", "MOMENTI I ARDHSHËM I MARKËS SUAJ")}
        </span>
      </div>
    </section>
  );
}
