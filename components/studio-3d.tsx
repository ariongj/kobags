"use client";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  RotateCcw,
  Play,
  Pause,
  LoaderCircle,
  SlidersHorizontal,
  X,
  Download,
} from "lucide-react";
import type { Design } from "@/lib/catalog";
import { placementPatch, type ArtworkLayer } from "@/lib/studio-artwork";
import type { StudioSelection, StudioScene } from "@/lib/studio-scene";
import { BagPreview, renderArtworkTexture } from "./bag-preview";
import { useKobags } from "./kobags-context";
export default function Studio3D({
  design,
  dimensions,
  onReady,
  onChange,
  onSelectLayer,
  activeLayer = "text",
  editing = false,
  selectionKey = 0,
  viewKey = 0,
  guides = true,
  onDragChange,
}: {
  design: Design;
  dimensions?: string;
  onReady?: (ready: boolean) => void;
  onChange?: (patch: Partial<Design>) => void;
  onSelectLayer?: (layer: ArtworkLayer, side: Design["side"]) => void;
  activeLayer?: ArtworkLayer;
  editing?: boolean;
  selectionKey?: number;
  viewKey?: number;
  guides?: boolean;
  onDragChange?: (active: boolean) => void;
}) {
  const { t } = useKobags();
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<StudioScene | null>(null);
  const controlsId = useId();
  const [controlsOpen, setControlsOpen] = useState(false);
  const [brightness, setBrightness] = useState(1.1);
  const [snapshotBusy, setSnapshotBusy] = useState(false);
  const [snapshotError, setSnapshotError] = useState(false);
  const controlsToggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!controlsOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setControlsOpen(false);
        controlsToggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [controlsOpen]);
  const latest = useRef(design);
  const latestDimensions = useRef(dimensions);
  useLayoutEffect(() => { latestDimensions.current = dimensions; }, [dimensions]);
  useLayoutEffect(() => { latest.current = design; }, [design]);
  const [selected, setSelected] = useState(editing);
  const skipSideView = useRef<Design["side"] | null>(null);
  const settings = useRef({
    selected,
    activeLayer,
    guides,
    onChange,
    onSelectLayer,
    onDragChange,
  });
  useLayoutEffect(() => {
    settings.current = { selected, activeLayer, guides, onChange, onSelectLayer, onDragChange };
  }, [selected, activeLayer, guides, onChange, onSelectLayer, onDragChange]);
  const selectionContext = `${editing}:${activeLayer}:${design.side}:${selectionKey}`;
  const [previousSelectionContext, setPreviousSelectionContext] = useState(selectionContext);
  if (previousSelectionContext !== selectionContext) {
    setPreviousSelectionContext(selectionContext);
    setSelected(editing);
  }
  const generation = useRef(0);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">(
    "loading",
  );
  const canvasInstructions = t(
    "3D bag. Select and drag logo or text to move it. Drag empty space to rotate. Arrow keys move selected artwork; Escape deselects. Plus and minus zoom.",
    "Çantë 3D. Zgjidhni dhe tërhiqni logon ose tekstin për t'i lëvizur. Tërhiqni hapësirën bosh për ta rrotulluar çantën. Shigjetat lëvizin dizajnin e zgjedhur; Escape e çzgjedh. Plus dhe minus zmadhojnë ose zvogëlojnë pamjen.",
  );
  useEffect(() => {
    host.current?.querySelector("canvas")?.setAttribute("aria-label", canvasInstructions);
  }, [canvasInstructions, status]);
  const [spinning, setSpinning] = useState(false);
  const [previousView, setPreviousView] = useState({ side: design.side, editing, viewKey });
  if (previousView.side !== design.side || previousView.editing !== editing || previousView.viewKey !== viewKey) {
    setPreviousView({ side: design.side, editing, viewKey });
    setSpinning(false);
  }
  const [reduced, setReduced] = useState(false);
  const sync = useRef<(d: Design) => void>(() => {});
  useEffect(() => {
    const element = host.current!;
    let disposed = false;
    let unavailable = false;
    onReady?.(false);
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const motionChange = () => {
      setReduced(motion.matches);
      if (motion.matches) setSpinning(false);
    };
    motionChange();
    motion.addEventListener("change", motionChange);
    const fail = () => {
      unavailable = true;
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
      if (!instance || unavailable) return;
      onReady?.(false);
      const current = settings.current;
      const selection: StudioSelection | null = current.selected
        ? { side: d.side, layer: current.activeLayer }
        : null;
      Promise.all([
        renderArtworkTexture(
          { ...d, side: "front" },
          current.guides && selection?.side === "front"
            ? selection.layer
            : undefined,
        ),
        renderArtworkTexture(
          { ...d, side: "back" },
          current.guides && selection?.side === "back"
            ? selection.layer
            : undefined,
        ),
      ] as const)
        .then(([front, back]) => {
          if (
            disposed ||
            ticket !== generation.current ||
            scene.current !== instance
          )
            return;
          instance.update(d, front, back, selection, latestDimensions.current);
          setStatus("ready");
          onReady?.(true);

        })
        .catch(fail);
    };
    import("@/lib/studio-scene")
      .then(({ createStudioScene }) => {
        if (disposed) return;
        scene.current = createStudioScene(
          element,
          design.product,
          () => setSpinning(false),
          {
            select(selection) {
              setSelected(!!selection);
              if (selection) {
                if (selection.side !== latest.current.side)
                  skipSideView.current = selection.side;
                settings.current.onSelectLayer?.(
                  selection.layer,
                  selection.side,
                );
              }
            },
            move(selection, position) {
              settings.current.onChange?.(
                placementPatch(
                  { ...latest.current, side: selection.side },
                  selection.layer,
                  position,
                ),
              );
            },
            drag(active) {
              settings.current.onDragChange?.(active);
            },
          },
        );
        scene.current.light(brightness);
        if (latest.current.side === "back") scene.current.view("back");
        sync.current(latest.current);
      })
      .catch(fail);
    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener("change", motionChange);
      element.removeEventListener("webglcontextlost", fail, true);
      scene.current?.dispose();
      scene.current = null;
    };
  }, [onReady]);
  useEffect(() => {
    sync.current(design);
  }, [design, dimensions, selected, activeLayer, guides]);
  useEffect(() => {
    scene.current?.spin(spinning && !reduced);
  }, [spinning, reduced]);
  useEffect(() => {
    if (skipSideView.current === design.side) {
      skipSideView.current = null;
      return;
    }
    scene.current?.view(design.side);
    scene.current?.spin(false);
  }, [design.side, viewKey]);
  const action = (fn: (s: StudioScene) => void) => {
    setSpinning(false);
    scene.current?.spin(false);
    if (scene.current) fn(scene.current);
  };
  const download3D = async () => {
    const instance=scene.current;
    if (!instance || snapshotBusy) return;
    setSnapshotBusy(true);setSnapshotError(false);
    try {
      const d=latest.current;
      const [front,back]=await Promise.all([renderArtworkTexture({...d,side:"front"}),renderArtworkTexture({...d,side:"back"})]);
      if(scene.current!==instance) return;
      instance.update(d,front,back,null,latestDimensions.current);
      const link=document.createElement("a");link.href=instance.snapshot();link.download=`kobags-${d.product}-3d.png`;link.click();
      sync.current(latest.current);
    } catch { setSnapshotError(true); }
    finally { setSnapshotBusy(false); }
  };
  return (
    <div className="studio-3d" data-status={status} data-controls-open={controlsOpen}>
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
          <BagPreview
            design={design}
            onReady={onReady}
            onChange={onChange}
            activeLayer={activeLayer}
            onSelectLayer={(layer) => onSelectLayer?.(layer, design.side)}
            onDragChange={onDragChange}
            guides={guides && editing}
          />
          <p className="studio-3d-fallback" role="status">
            {t(
              "3D is unavailable on this device. Your flat preview and design tools are still available.",
              "3D nuk është i disponueshëm në këtë pajisje. Parapamja dhe mjetet e dizajnit janë ende të disponueshme.",
            )}
          </p>
        </>
      )}
      {snapshotError && <p className="studio-3d-fallback" role="status">{t("Could not save this view. Please try again.", "Pamja nuk u ruajt. Provoni përsëri.")}</p>}
      {status === "ready" && (
        <>
        <div className="studio-view-presets" role="group" aria-label={t("Inspect the bag", "Shikoni çantën")}>
          {([['angle','3/4','3/4'],['side','Side','Anash'],['inside','Inside','Brenda']] as const).map(([view,en,sq]) => <button type="button" key={view} onClick={()=>action(s=>s.view(view))} aria-label={t(`View ${en.toLowerCase()}`,`Pamja ${sq.toLowerCase()}`)}>{t(en,sq)}</button>)}
        </div>
        <button
          type="button"
          className="studio-view-toggle"
          ref={controlsToggle}
          aria-expanded={controlsOpen}
          aria-controls={controlsId}
          aria-label={t("3D view controls", "Kontrollet e pamjes 3D")}
          onClick={() => setControlsOpen((open) => !open)}
        >
          {controlsOpen ? <X size={17} /> : <SlidersHorizontal size={17} />}
          <span>{t("View", "Pamja")}</span>
        </button>
        <div
          id={controlsId}
          className="studio-3d-tools"
          data-open={controlsOpen}
          role="group"
          aria-label={t("3D view controls", "Kontrollet e pamjes 3D")}
        >
          <label className="studio-light-control">
            <span>{t("Light", "Drita")}</span>
            <input type="range" min="0.7" max="1.5" step="0.05" value={brightness} onChange={e=>{const value=Number(e.target.value);setBrightness(value);scene.current?.light(value);}} aria-label={t("Preview brightness", "Ndriçimi i parapamjes")}/>
          </label>
          <strong className="studio-3d-badge" aria-hidden="true">
            360°
          </strong>
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
          <button type="button" aria-label={t("Save 3D image", "Ruaj imazhin 3D")} title={t("Save this 3D view", "Ruaj këtë pamje 3D")} onClick={download3D} disabled={snapshotBusy}><Download size={16}/></button>
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
        </>
      )}
    </div>
  );
}
