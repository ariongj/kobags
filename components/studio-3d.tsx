"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  RotateCcw,
  Play,
  Pause,
  LoaderCircle,
} from "lucide-react";
import type { Design } from "@/lib/catalog";
import type { StudioScene } from "@/lib/studio-scene";
import { BagPreview, renderArtworkTexture } from "./bag-preview";
import { useKobags } from "./kobags-context";
export default function Studio3D({
  design,
  onReady,
}: {
  design: Design;
  onReady?: (ready: boolean) => void;
}) {
  const { t } = useKobags();
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<StudioScene | null>(null);
  const latest = useRef(design);
  latest.current = design;
  const generation = useRef(0);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">(
    "loading",
  );
  const [spinning, setSpinning] = useState(false);
  const [reduced, setReduced] = useState(false);
  const sync = useRef<(d: Design) => void>(() => {});
  useEffect(() => {
    const element = host.current!;
    let disposed = false;
    setStatus("loading");
    setSpinning(false);
    onReady?.(false);
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const motionChange = () => {
      setReduced(motion.matches);
      if (motion.matches) setSpinning(false);
    };
    motionChange();
    motion.addEventListener("change", motionChange);
    const fail = () => {
      if (!disposed) {
        scene.current?.visible(false);
        setStatus("fallback");
        onReady?.(false);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => scene.current?.visible(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    observer.observe(element);
    element.addEventListener("webglcontextlost", fail, true);
    sync.current = (d) => {
      const ticket = ++generation.current,
        instance = scene.current;
      if (!instance) return;
      onReady?.(false);
      Promise.all(
        (["front", "back"] as const).map((side) =>
          renderArtworkTexture({ ...d, side }),
        ),
      )
        .then(([front, back]) => {
          if (
            disposed ||
            ticket !== generation.current ||
            scene.current !== instance
          )
            return;
          instance.update(d, front, back);
          setStatus("ready");
          onReady?.(true);
        })
        .catch(fail);
    };
    import("@/lib/studio-scene")
      .then(({ createStudioScene }) => {
        if (disposed) return;
        scene.current = createStudioScene(element, design.product, () =>
          setSpinning(false),
        );
        if (latest.current.side === "back") scene.current.view("back");
        sync.current(latest.current);
      })
      .catch(fail);
    return () => {
      disposed = true;
      ++generation.current;
      observer.disconnect();
      motion.removeEventListener("change", motionChange);
      element.removeEventListener("webglcontextlost", fail, true);
      scene.current?.dispose();
      scene.current = null;
    };
  }, [design.product, onReady]);
  useEffect(() => {
    sync.current(design);
  }, [design]);
  useEffect(() => {
    scene.current?.view(design.side);
    setSpinning(false);
    scene.current?.spin(false);
  }, [design.side]);
  const action = (fn: (s: StudioScene) => void) => {
    setSpinning(false);
    scene.current?.spin(false);
    if (scene.current) fn(scene.current);
  };
  return (
    <div className="studio-3d" data-status={status}>
      <div
        className="studio-3d-host"
        ref={host}
        aria-label={t("Interactive 3D bag", "Çanta interaktive 3D")}
      />
      {status === "loading" && (
        <div className="studio-3d-loading" role="status">
          <LoaderCircle size={22} />
          <span>
            {t("Preparing your 3D bag…", "Duke përgatitur çantën 3D…")}
          </span>
        </div>
      )}
      {status === "fallback" && (
        <>
          <BagPreview design={design} onReady={onReady} />
          <p className="studio-3d-fallback" role="status">
            {t(
              "3D is unavailable on this device. Your flat preview and design tools are still available.",
              "3D nuk është i disponueshëm në këtë pajisje. Parapamja dhe mjetet e dizajnit janë ende të disponueshme.",
            )}
          </p>
        </>
      )}
      {status === "ready" && (
        <div
          className="studio-3d-tools"
          role="group"
          aria-label={t("3D view controls", "Kontrollet e pamjes 3D")}
        >
          <button
            aria-label={t("Rotate bag left", "Rrotullo çantën majtas")}
            title={t("Rotate left", "Rrotullo majtas")}
            onClick={() => action((s) => s.rotate(-1))}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            aria-label={t("Rotate bag right", "Rrotullo çantën djathtas")}
            title={t("Rotate right", "Rrotullo djathtas")}
            onClick={() => action((s) => s.rotate(1))}
          >
            <ArrowRight size={16} />
          </button>
          <span />
          <button
            aria-label={t("Zoom out", "Zvogëlo")}
            onClick={() => action((s) => s.zoom(-1))}
          >
            <Minus size={16} />
          </button>
          <button
            aria-label={t("Zoom in", "Zmadho")}
            onClick={() => action((s) => s.zoom(1))}
          >
            <Plus size={16} />
          </button>
          <button
            aria-label={t("Reset 3D view", "Rivendos pamjen 3D")}
            title={t("Reset view", "Rivendos pamjen")}
            onClick={() => action((s) => s.view("angle"))}
          >
            <RotateCcw size={15} />
          </button>
          <button
            aria-label={
              spinning
                ? t("Pause rotation", "Ndalo rrotullimin")
                : t("Auto rotate bag", "Rrotullo automatikisht")
            }
            title={
              reduced
                ? t(
                    "Reduced motion is enabled",
                    "Lëvizja e reduktuar është aktive",
                  )
                : t("Auto rotate", "Rrotullo automatikisht")
            }
            disabled={reduced}
            aria-pressed={spinning}
            onClick={() => {
              scene.current?.spin(!spinning);
              setSpinning(!spinning);
            }}
          >
            {spinning ? <Pause size={15} /> : <Play size={15} />}
          </button>
        </div>
      )}
    </div>
  );
}
