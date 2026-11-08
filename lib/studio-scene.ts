import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { colors, getProduct, type Design } from "./catalog";
import { createNonwovenModel } from "./nonwoven-model";
import { bagDimensions } from "./nonwoven-spec";
import { sideArtwork, pickArtwork, type ArtworkBounds, type ArtworkLayer, type ArtworkTexture } from "./studio-artwork";
export type StudioSelection = { side: Design["side"]; layer: ArtworkLayer };
export type StudioEditing = {
  select: (selection: StudioSelection | null) => void;
  move: (selection: StudioSelection, position: { x: number; y: number }) => void;
  drag: (active: boolean) => void;
};
export type StudioView = "front" | "back" | "angle" | "side" | "inside";
export type StudioScene = {
  update: (design: Design, front: ArtworkTexture, back: ArtworkTexture, selection: StudioSelection | null, dimensions?: string) => void;
  view: (side: StudioView) => void;
  rotate: (direction: number) => void;
  zoom: (direction: number) => void;
  light: (value: number) => void;
  snapshot: () => string;
  spin: (value: boolean) => void;
  visible: (value: boolean) => void;
  dispose: () => void;
};

/** The owner's supplied non-woven model, integrated with saved Kobags artwork. */
export function createStudioScene(host: HTMLDivElement, product: string, onInteract: () => void, editing?: StudioEditing): StudioScene {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, matchMedia("(max-width: 760px)").matches ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "3D bag. Drag artwork to move it or drag empty space to rotate. Arrow keys move selected artwork. Escape deselects. Plus and minus zoom.");
  host.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .01, 20);
  const controls = new OrbitControls(camera, canvas);
  controls.enablePan = false;
  // Wheel stays available for ordinary page scrolling; use pinch or the view buttons.
  controls.enableZoom = true;
  controls.enableDamping = true;
  controls.dampingFactor = .12;
  controls.rotateSpeed = .65;
  controls.minPolarAngle = .15;
  controls.maxPolarAngle = 2.45;
  controls.autoRotateSpeed = 1.3;
  const stopWheelZoom = (e: WheelEvent) => e.stopImmediatePropagation();
  canvas.addEventListener("wheel", stopWheelZoom, { capture: true, passive: true });
  const model = createNonwovenModel(renderer);
  scene.add(model.group);

  // Self-hosted, generated softboxes: no lighting image or third-party network request.
  const room = new THREE.Scene();
  const wall = new THREE.Mesh(new THREE.BoxGeometry(12,8,12), new THREE.MeshBasicMaterial({color:0xb4b4b8,side:THREE.BackSide}));
  wall.position.y = 3; room.add(wall);
  const panels = [[3.4,2.6,6,-2.6,2.8,2.6],[2.6,2.2,2.6,3.2,1.4,2.4],[.8,4.2,5,2.6,2,-2.8],[.8,4.2,4,-2.8,2,-2.4],[5,5,1.2,0,6.8,0]];
  for(const [w,h,k,x,y,z] of panels) {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(k,k,k),side:THREE.DoubleSide}));
    panel.position.set(x,y,z); panel.lookAt(0,.4,0);room.add(panel);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room,.02);
  scene.environment = environment.texture; scene.environmentIntensity = .7;
  room.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();(o.material as THREE.Material).dispose();}});
  pmrem.dispose();
  const key = new THREE.DirectionalLight(0xfff6ec,1.25);
  key.position.set(-.45,1.8,.9);key.target.position.set(0,.2,0);
  key.castShadow = true;
  key.shadow.mapSize.set(1024,1024);key.shadow.bias=-.0002;key.shadow.normalBias=.001;
  Object.assign(key.shadow.camera,{left:-.7,right:.7,top:.9,bottom:-.45,near:.05,far:3});
  key.shadow.autoUpdate=false;key.shadow.needsUpdate=true;
  scene.add(key,key.target);
  const fill = new THREE.DirectionalLight(0xe7eef1,.25);fill.position.set(.5,.5,-.8);scene.add(fill);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(6,6),new THREE.ShadowMaterial({opacity:.065}));
  floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
  const shadow = document.createElement("canvas");shadow.width=shadow.height=128;
  const ctx=shadow.getContext("2d")!;const gradient=ctx.createRadialGradient(64,64,12,64,64,62);
  gradient.addColorStop(0,"#132b2460");gradient.addColorStop(1,"#132b2400");ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
  const shadowTexture=new THREE.CanvasTexture(shadow);
  const contact=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false}));
  contact.rotation.x=-Math.PI/2;contact.position.y=.0001;scene.add(contact);
  let alive=true,visible=true,raf=0,drawing=false,frame=0,shapeKey="";
  let fitDistance=1.5,currentView: StudioView="angle";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  function draw() {
    raf = 0;
    if (!alive || !visible || document.hidden) return;
    drawing = true;
    const cameraChanged = controls.update();
    renderer.render(scene, camera);
    publishArtworkTargets();
    drawing = false;
    host.dataset.angle = controls.getAzimuthalAngle().toFixed(3);
    host.dataset.frame = String(++frame);
    host.dataset.distance = camera.position
      .distanceTo(controls.target)
      .toFixed(2);
    // Text/color edits need one new frame. Keep rendering only while the
    // camera is actually damping or the buyer explicitly enabled rotation.
    if (controls.autoRotate || cameraChanged)
      raf = requestAnimationFrame(draw);
  }
  function wake() {
    if (drawing) return;
    if (alive && visible && !document.hidden && !raf)
      raf = requestAnimationFrame(draw);
  }
  function fit() {
    const d=model.getDimensions();
    const size=Math.max(d.height,(d.width+d.depth*.65)/Math.max(camera.aspect,.35));
    fitDistance=size/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2)))*1.24;
    controls.minDistance=fitDistance*.6;controls.maxDistance=fitDistance*1.9;
    controls.target.set(0,d.height*.49,0);
  }
  function setView(side: StudioView) {
    controls.autoRotate=false;controls.enableDamping=false;controls.update();controls.enableDamping=true;
    currentView=side; fit();
    const dirs: Record<StudioView,[number,number,number]>={angle:[.62,.3,.85],front:[0,.08,1],back:[0,.08,-1],side:[1,.12,.04],inside:[.12,1.4,.55]};
    if(side==="inside") controls.target.y=model.getDimensions().bodyHeight*.55;
    camera.position.copy(controls.target).add(new THREE.Vector3(...dirs[side]).normalize().multiplyScalar(fitDistance));
    controls.update();host.dataset.view=side;wake();
  }
  function rotate(direction: number) {
    const offset=camera.position.clone().sub(controls.target);
    offset.applyAxisAngle(new THREE.Vector3(0,1,0),direction*Math.PI/8);
    camera.position.copy(controls.target).add(offset);controls.update();wake();
  }
  function zoom(direction: number) {
    const offset=camera.position.clone().sub(controls.target);
    offset.setLength(THREE.MathUtils.clamp(offset.length()-direction*fitDistance*.1,controls.minDistance,controls.maxDistance));
    camera.position.copy(controls.target).add(offset);controls.update();wake();
  }
  function interacted() {
    controls.autoRotate = false;
    onInteract();
    wake();
  }
  controls.addEventListener("start", interacted);
  controls.addEventListener("change", wake);
  // Raycast the actual visible face; empty fabric remains an orbit gesture.
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const faceBounds: Record<Design["side"], ArtworkBounds[]> = {
    front: [],
    back: [],
  };
  let currentDesign: Design | null = null;
  let selection: StudioSelection | null = null;
  let drag: {
    pointer: number;
    selection: StudioSelection;
    plane: THREE.Plane;
    dx: number;
    dy: number;
  } | null = null;
  const faceSign=(side: Design["side"])=>side==="front"?1:-1;
  function artworkPoint(x:number,y:number,side:Design["side"]) { return model.point(x,y,side); }
  function publishArtworkTargets() {
    host.dataset.selection = selection
      ? selection.side + ":" + selection.layer
      : "";
    host.dataset.artworkTargets = JSON.stringify(
      (["front", "back"] as const).flatMap((side) =>
        faceBounds[side].map((box) => {
          const world = artworkPoint(box.x, box.y, side);
          const screen = world.clone().project(camera);
          return {
            side,
            layer: box.layer,
            x: (screen.x + 1) / 2,
            y: (1 - screen.y) / 2,
            visible: (camera.position.z - world.z) * faceSign(side) > 0.002,
          };
        }),
      ),
    );
  }
  function setRay(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      1 - ((event.clientY - rect.top) / rect.height) * 2,
    );
    camera.updateMatrixWorld();
    model.group.updateMatrixWorld(true);
    raycaster.setFromCamera(pointer, camera);
  }
  function pick(event: PointerEvent) {
    setRay(event);
    for(const hit of raycaster.intersectObjects(model.group.children,false)) {
      if(hit.object!==model.outer || !hit.uv) return null;
      const face=model.hit(hit.uv);
      if(!face) continue; // cut-out handles have no fabric to select
      const side=face.side as Design["side"];
      const box=pickArtwork(faceBounds[side],face.x,face.y,selection?.side===side?selection.layer:undefined);
      return box?.layer ? {box,side,x:face.x,y:face.y,point:hit.point} : null;
    }
    return null;
  }
  function deselect() {
    selection = null;
    editing?.select(null);
    wake();
  }
  function pointerDown(event: PointerEvent) {
    if (!editing || event.button !== 0) return;
    if (drag) {
      event.stopImmediatePropagation();
      return;
    }
    const hit = pick(event);
    if (!hit) {
      deselect();
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    controls.autoRotate = false;
    // Freeze inertia during artwork movement so the grabbed point stays put.
    controls.enabled = false;
    controls.enableDamping = false;
    controls.update();
    controls.enableDamping = true;
    onInteract();
    selection = { side: hit.side, layer: hit.box.layer! };
    drag = {
      pointer: event.pointerId,
      selection,
      plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), -hit.point.z),
      dx: hit.x - hit.box.x,
      dy: hit.y - hit.box.y,
    };
    canvas.setPointerCapture(event.pointerId);
    canvas.focus({ preventScroll: true });
    canvas.style.cursor = "grabbing";
    host.dataset.dragging = "true";
    editing.select(selection);
    editing.drag(true);
    wake();
  }
  function moveArtwork(active: StudioSelection, x: number, y: number) {
    x = THREE.MathUtils.clamp(x, 24, 76);
    y = THREE.MathUtils.clamp(y, 33, 80);
    const box = faceBounds[active.side].find((b) => b.layer === active.layer);
    if (box) {
      box.x = x * 8;
      box.y = y * 8;
    }
    editing?.move(active, { x, y });
    wake();
  }
  function pointerMove(event: PointerEvent) {
    if (!editing) return;
    if (drag) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.pointerId !== drag.pointer) return;
      setRay(event);
      const point = raycaster.ray.intersectPlane(
        drag.plane,
        new THREE.Vector3(),
      );
      if (!point) return;
      const { x, y } = model.fromPoint(point, drag.selection.side);
      moveArtwork(drag.selection, (x - drag.dx) / 8, (y - drag.dy) / 8);
    } else canvas.style.cursor = pick(event) ? "move" : "grab";
  }
  function pointerUp(event: PointerEvent) {
    if (!drag || event.pointerId !== drag.pointer) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    finishDrag();
  }
  function finishDrag() {
    if (!drag) return;
    const pointerId = drag.pointer;
    drag = null;
    controls.enabled = true;
    canvas.style.cursor = "move";
    host.dataset.dragging = "false";
    if (canvas.hasPointerCapture(pointerId))
      canvas.releasePointerCapture(pointerId);
    editing?.drag(false);
    wake();
  }
  canvas.style.cursor = "grab";
  canvas.addEventListener("pointerdown", pointerDown, true);
  canvas.addEventListener("pointermove", pointerMove, true);
  canvas.addEventListener("pointerup", pointerUp, true);
  canvas.addEventListener("pointercancel", pointerUp, true);
  canvas.addEventListener("lostpointercapture", pointerUp, true);
  const keyboard = (e: KeyboardEvent) => {
    if (e.key === "Escape" && selection) {
      e.preventDefault();
      e.stopPropagation();
      deselect();
      return;
    }
    if (selection && currentDesign && editing && e.key.startsWith("Arrow")) {
      const art = sideArtwork(
        { ...currentDesign, side: selection.side },
        selection.layer,
      );
      const step = e.shiftKey ? 5 : 1;
      e.preventDefault();
      moveArtwork(
        selection,
        art.x +
          (e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0),
        art.y +
          (e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0),
      );
      return;
    }
    if (
      [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "+",
        "-",
        "=",
      ].includes(e.key)
    ) {
      e.preventDefault();
      interacted();
      if (e.key === "ArrowLeft" || e.key === "ArrowRight")
        rotate(e.key === "ArrowLeft" ? -1 : 1);
      else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        const spherical = new THREE.Spherical().setFromVector3(
          camera.position.clone().sub(controls.target),
        );
        spherical.phi = THREE.MathUtils.clamp(
          spherical.phi + (e.key === "ArrowUp" ? -0.15 : 0.15),
          .15,
          2.45,
        );
        camera.position
          .copy(controls.target)
          .add(new THREE.Vector3().setFromSpherical(spherical));
        controls.update();
        wake();
      } else zoom(e.key === "-" ? -1 : 1);
    }
  };
  canvas.addEventListener("keydown", keyboard);
  const resize = new ResizeObserver(() => {
    const { width: w, height: h } = host.getBoundingClientRect();
    if (!w || !h) return;
    renderer.setSize(w, h);
    const ratio=camera.position.distanceTo(controls.target)/fitDistance;
    const offset=camera.position.clone().sub(controls.target).normalize();
    camera.aspect = w / h;
    camera.updateProjectionMatrix();fit();
    camera.position.copy(controls.target).add(offset.multiplyScalar(fitDistance*ratio));
    controls.update();wake();
  });
  resize.observe(host);
  const visibility = () => {
    if (document.hidden) {
      finishDrag();
      cancelAnimationFrame(raf);
      raf = 0;
    } else wake();
  };
  document.addEventListener("visibilitychange", visibility);
  const motion = () => {
    if (reduced.matches) {
      controls.autoRotate = false;
      onInteract();
    }
    wake();
  };
  reduced.addEventListener("change", motion);
  const lost = (e: Event) => {
    e.preventDefault();
    finishDrag();
    cancelAnimationFrame(raf);
    raf = 0;
    visible=false;
    host.dataset.ready = "fallback";
  };
  canvas.addEventListener("webglcontextlost", lost);
  setView("angle");
  host.dataset.model = product;
  host.dataset.ready = "true";
  return {
    update(design,front,back,selected,dimensions) {
      currentDesign=design;selection=selected;
      const catalogue=getProduct(design.product);
      const spec=dimensions || (catalogue.variants.find(v=>v.name===design.size)||catalogue.variants[0]).dimensions;
      const changedShape=model.update(design.product,bagDimensions(spec,design.product),(colors.find(c=>c.name===design.color)||colors[0]).hex,front.canvas,back.canvas);
      faceBounds.front=front.bounds;faceBounds.back=back.bounds;
      if(shapeKey!==changedShape) {
        shapeKey=changedShape;setView(currentView);key.shadow.needsUpdate=true;
        const d=model.getDimensions();contact.scale.set(d.width*1.4,Math.max(d.depth,.035)*1.8,1);
      }
      host.dataset.model=design.product;
      host.dataset.geometry="nonwoven-20261108";
      host.dataset.dimensions=spec;
      host.dataset.frontArtwork=String(!!front.bounds.length);host.dataset.backArtwork=String(!!back.bounds.length);
      wake();
    },
    view:setView,rotate,zoom,
    light(value) { renderer.toneMappingExposure=THREE.MathUtils.clamp(value,.7,1.5);wake(); },
    snapshot() { renderer.render(scene,camera);return canvas.toDataURL("image/png"); },
    spin(value) { controls.autoRotate=value&&!reduced.matches;wake(); },
    visible(value) { visible=value;if(value)wake();else {finishDrag();cancelAnimationFrame(raf);raf=0;} },
    dispose() {
      alive=false;cancelAnimationFrame(raf);resize.disconnect();
      document.removeEventListener("visibilitychange",visibility);reduced.removeEventListener("change",motion);
      canvas.removeEventListener("keydown",keyboard);canvas.removeEventListener("webglcontextlost",lost);
      canvas.removeEventListener("wheel",stopWheelZoom,true);
      controls.removeEventListener("start",interacted);controls.removeEventListener("change",wake);
      canvas.removeEventListener("pointerdown",pointerDown,true);canvas.removeEventListener("pointermove",pointerMove,true);
      canvas.removeEventListener("pointerup",pointerUp,true);canvas.removeEventListener("pointercancel",pointerUp,true);canvas.removeEventListener("lostpointercapture",pointerUp,true);
      finishDrag();controls.dispose();model.dispose();environment.dispose();
      floor.geometry.dispose();floor.material.dispose();contact.geometry.dispose();contact.material.dispose();shadowTexture.dispose();key.shadow.dispose();
      renderer.dispose();canvas.remove();
    }
  };
}
