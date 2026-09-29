import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { colors, type Design } from "./catalog";
import {
  sideArtwork,
  type ArtworkBounds,
  type ArtworkLayer,
  type ArtworkTexture,
} from "./studio-artwork";
export type StudioSelection = { side: Design["side"]; layer: ArtworkLayer };
export type StudioEditing = {
  select: (selection: StudioSelection | null) => void;
  move: (
    selection: StudioSelection,
    position: { x: number; y: number },
  ) => void;
  drag: (active: boolean) => void;
};

export type StudioScene = {
  update: (
    design: Design,
    front: ArtworkTexture,
    back: ArtworkTexture,
    selection: StudioSelection | null,
    photo?: HTMLCanvasElement,
  ) => void;
  view: (side: "front" | "back" | "angle") => void;
  rotate: (direction: number) => void;
  zoom: (direction: number) => void;
  spin: (value: boolean) => void;
  visible: (value: boolean) => void;
  dispose: () => void;
};
// Family proportions are illustrative, not a dimensional drawing or approved print zone.
const families: Record<
  string,
  {
    width: number;
    bottom: number;
    top: number;
    depth: number;
    handles?: boolean;
  }
> = {
  "handle-bag": {
    width: 2.5,
    bottom: -1.25,
    top: 1.05,
    depth: 0.55,
    handles: true,
  },
  "box-bag": { width: 2.8, bottom: -1.2, top: 0.95, depth: 1.0, handles: true },
  "d-cut-bag": { width: 2.45, bottom: -1.4, top: 1.6, depth: 0.3 },
  "t-shirt-bag": { width: 2.1, bottom: -1.4, top: 1.8, depth: 0.34 },
  "string-bag": { width: 2.35, bottom: -1.4, top: 1.55, depth: 0.45 },
};
export function createStudioScene(
  host: HTMLDivElement,
  product: string,
  onInteract: () => void,
  editing?: StudioEditing,
): StudioScene {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.8));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute("role", "img");
  canvas.setAttribute(
    "aria-label",
    "3D bag. Select and drag logo or text to move it. Drag empty space to rotate. Arrow keys move selected artwork; Escape deselects. Plus and minus zoom.",
  );
  host.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 40);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0.4, 0);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.12;
  controls.rotateSpeed = 0.65;
  controls.minPolarAngle = 0.48;
  controls.maxPolarAngle = 2.1;
  controls.autoRotateSpeed = 0.8;
  const model = new THREE.Group();
  scene.add(model);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x718177, 2.15));
  const key = new THREE.DirectionalLight(0xfff7e8, 3.5);
  key.position.set(-4, 7, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xd6e7ef, 1.65);
  fill.position.set(5, 3, -4);
  scene.add(fill);
  const faceFill = new THREE.DirectionalLight(0xffffff, 0.45);
  faceFill.position.set(3, 1, 7);
  scene.add(faceFill);
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const weave = document.createElement("canvas");
  weave.width = weave.height = 256;
  const wc = weave.getContext("2d")!;
  wc.fillStyle = "#ededed";
  wc.fillRect(0, 0, 256, 256);
  // A fine, irregular cross-laid fiber is closer to the supplied non-woven
  // product photos than a regular checkerboard fabric pattern.
  for (let y = 0; y < 256; y += 3)
    for (let x = 0; x < 256; x += 3) {
      const noise = (x * 37 + y * 73 + x * y * 11) % 17;
      wc.fillStyle = `rgb(${207 + noise * 2},${207 + noise * 2},${207 + noise * 2})`;
      wc.fillRect(x, y, 2, 1);
      wc.fillStyle = `rgb(${223 + noise * 2},${223 + noise * 2},${223 + noise * 2})`;
      wc.fillRect(x + 1, y + 1, 1, 2);
    }
  const bump = new THREE.CanvasTexture(weave);
  bump.colorSpace = THREE.SRGBColorSpace;
  bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
  bump.repeat.set(8, 8);
  bump.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  textures.add(bump);
  const fabric = new THREE.MeshStandardMaterial({
    color: colors[0].hex,
    roughness: 0.88,
    map: bump,
    bumpMap: bump,
    bumpScale: 0.024,
    side: THREE.DoubleSide,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: colors[0].hex,
    roughness: 1,
  });
  const cordMat = new THREE.MeshStandardMaterial({
    color: "#e3d9be",
    roughness: 1,
  });
  materials.add(fabric);
  materials.add(seamMat);
  materials.add(cordMat);
  const innerMat = new THREE.MeshStandardMaterial({
    color: colors[0].hex,
    roughness: 0.98,
    side: THREE.DoubleSide,
  });
  materials.add(innerMat);
  const spec = families[product] || families["handle-bag"];
  const { width, bottom, top, depth } = spec;
  const half = width / 2;
  function xAt(x: number, y: number) {
    const t = (y - bottom) / (top - bottom);
    return product === "string-bag"
      ? x * (1 - 0.2 * Math.pow(t, 6))
      : x * (1 + 0.012 * (t - 0.5));
  }
  function zAt(x: number, y: number) {
    const t = (y - bottom) / (top - bottom);
    const flat = product === "box-bag" ? 0.029 : 0.105;
    const edge = Math.pow(Math.abs(x / half), 4);
    const lowerFold = 0.035 * Math.sin(Math.PI * Math.min(1, t * 2.4));
    return (
      depth / 2 +
      flat * Math.cos(((x / half) * Math.PI) / 2) * Math.sin(t * Math.PI) +
      lowerFold * (1 - edge) +
      0.018 * Math.sin(x * 15 + y * 3) * edge
    );
  }
  function add(
    g: THREE.BufferGeometry,
    material: THREE.Material = fabric,
    parent: THREE.Object3D = model,
  ) {
    geometries.add(g);
    materials.add(material);
    const m = new THREE.Mesh(g, material);
    parent.add(m);
    return m;
  }
  function seam(points: THREE.Vector3[], radius = 0.006, mat = seamMat) {
    return add(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        Math.max(20, points.length * 3),
        radius,
        5,
        false,
      ),
      mat,
    );
  }
  function outline() {
    const s = new THREE.Shape();
    if (product === "t-shirt-bag") {
      s.moveTo(-half, bottom + 0.1);
      s.quadraticCurveTo(-half, bottom, -half + 0.1, bottom);
      s.lineTo(half - 0.1, bottom);
      s.quadraticCurveTo(half, bottom, half, bottom + 0.1);
      s.lineTo(half, 0.65);
      s.quadraticCurveTo(half, 0.95, 1.04, 1.07);
      s.lineTo(1.02, top);
      s.lineTo(0.55, top);
      s.lineTo(0.52, 1.07);
      s.quadraticCurveTo(0.5, 0.7, 0, 0.68);
      s.quadraticCurveTo(-0.5, 0.7, -0.52, 1.07);
      s.lineTo(-0.55, top);
      s.lineTo(-1.02, top);
      s.lineTo(-1.04, 1.07);
      s.quadraticCurveTo(-half, 0.95, -half, 0.65);
      s.closePath();
    } else {
      s.moveTo(-half, bottom);
      s.lineTo(half, bottom);
      s.lineTo(half, top);
      s.lineTo(-half, top);
      s.closePath();
      const hole = new THREE.Path();
      hole.absellipse(0, top - 0.4, 0.43, 0.14, 0, Math.PI * 2, true);
      s.holes.push(hole);
    }
    return s;
  }
  const shaped = product === "d-cut-bag" || product === "t-shirt-bag";
  const photoShell = product === "t-shirt-bag";
  const photoPlaneSize = 4;
  const photoPlaneCenterY = 0.18;
  const photoFaceZ = depth / 2 + 0.03;
  const photoCanvas = document.createElement("canvas");
  photoCanvas.width = photoCanvas.height = 1440;
  const photoTexture = photoShell ? new THREE.CanvasTexture(photoCanvas) : null;
  if (photoTexture) {
    photoTexture.colorSpace = THREE.SRGBColorSpace;
    photoTexture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    textures.add(photoTexture);
  }
  if (spec.handles) {
    // The narrow dark opening and rolled upper lip make the bag read as an
    // open, sewn object instead of two flat printed planes.
    const mouth = add(
      new THREE.PlaneGeometry(width - 0.045, depth - 0.035),
      innerMat,
    );
    mouth.rotation.x = -Math.PI / 2;
    mouth.position.y = top - 0.025;
    for (const face of [-1, 1])
      seam(
        [
          new THREE.Vector3(-half + 0.025, top - 0.012, face * depth / 2),
          new THREE.Vector3(0, top - 0.024, face * (depth / 2 + 0.012)),
          new THREE.Vector3(half - 0.025, top - 0.012, face * depth / 2),
        ],
        0.013,
      );
  }
  function faceGeometry() {
    const geometry = shaped
      ? new THREE.ShapeGeometry(outline(), 40)
      : new THREE.PlaneGeometry(width, top - bottom, 56, 56);
    const pos = geometry.attributes.position;
    const uv = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i),
        y = pos.getY(i) + (shaped ? 0 : (top + bottom) / 2);
      const xx = xAt(x, y);
      pos.setXYZ(i, xx, y, zAt(x, y));
      // Register both faces in the same normalized canvas space as the 2D editor.
      const fullTop = spec.handles ? top + 1.1 : top;
      const fullHeight = fullTop - bottom;
      const scale = Math.min(650 / width, 690 / fullHeight);
      const centerY = (fullTop + bottom) / 2;
      uv[i * 2] = (400 + xx * scale) / 800;
      uv[i * 2 + 1] = 1 - (400 - (y - centerY) * scale) / 800;
    }
    geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geometry.computeVertexNormals();
    return geometry;
  }
  const faceSides = new Map<THREE.Object3D, Design["side"]>();
  const printTextures: THREE.CanvasTexture[] = [];
  for (const face of [1, -1]) {
    const panel = photoShell
      ? add(
          new THREE.PlaneGeometry(photoPlaneSize, photoPlaneSize),
          new THREE.MeshStandardMaterial({
            map: photoTexture,
            transparent: true,
            alphaTest: 0.08,
            roughness: 0.94,
            side: THREE.FrontSide,
          }),
        )
      : add(faceGeometry());
    if (photoShell) panel.position.set(0, photoPlaneCenterY, face * photoFaceZ);
    if (face < 0) panel.rotation.y = Math.PI;
    faceSides.set(panel, face > 0 ? "front" : "back");
    // Allocate the final size before the first frame. Uploaded logos load
    // asynchronously; WebGL texture storage cannot resize after initial use.
    const artworkCanvas = document.createElement("canvas");
    artworkCanvas.width = artworkCanvas.height = 1024;
    const texture = new THREE.CanvasTexture(artworkCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    textures.add(texture);
    printTextures.push(texture);
    const ink = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
      roughness: 0.96,
      side: THREE.FrontSide,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    });
    const print = add(
      photoShell
        ? new THREE.PlaneGeometry(photoPlaneSize, photoPlaneSize)
        : faceGeometry(),
      ink,
    );
    if (photoShell)
      print.position.set(0, photoPlaneCenterY, face * (photoFaceZ + 0.008));
    else print.position.z = face * 0.006;
    if (face < 0) print.rotation.y = Math.PI;
    faceSides.set(print, face > 0 ? "front" : "back");
    if (photoShell) continue;
    for (const x of [-half + 0.022, half - 0.022]) {
      const pts: THREE.Vector3[] = [];
      const seamTop = product === "t-shirt-bag" ? 0.65 : top - 0.03;
      for (let i = 0; i <= 30; i++) {
        const y = bottom + 0.035 + ((seamTop - bottom - 0.035) * i) / 30;
        pts.push(new THREE.Vector3(xAt(x, y), y, face * (zAt(x, y) + 0.008)));
      }
      seam(pts);
    }
    if (!shaped)
      for (const y of [bottom + 0.04, top - 0.045]) {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 36; i++) {
          const x = -half + 0.03 + ((width - 0.06) * i) / 36;
          pts.push(new THREE.Vector3(xAt(x, y), y, face * (zAt(x, y) + 0.008)));
        }
        seam(pts);
      }
    if (product === "d-cut-bag") {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const t = (i / 64) * Math.PI * 2,
          x = 0.447 * Math.cos(t),
          y = top - 0.4 + 0.158 * Math.sin(t);
        pts.push(new THREE.Vector3(xAt(x, y), y, face * (zAt(x, y) + 0.008)));
      }
      seam(pts, 0.005);
    }
    if (spec.handles) {
      const positions: number[] = [],
        indices: number[] = [],
        edges: THREE.Vector3[][] = [[], []];
      for (let i = 0; i <= 60; i++) {
        const t = (i / 60) * Math.PI,
          x = -0.61 * Math.cos(t) + 0.018 * Math.sin(t * 3),
          y = top - 0.12 + 1.18 * Math.sin(t),
          z = face * (depth / 2 + 0.09 * Math.sin(t));
        const dx = 0.61 * Math.sin(t),
          dy = 1.2 * Math.cos(t),
          length = Math.hypot(dx, dy);
        for (const edge of [-1, 1]) {
          const px = x - ((edge * dy) / length) * 0.082,
            py = y + ((edge * dx) / length) * 0.082;
          positions.push(px, py, z + face * 0.013 * Math.sin(t * 5));
          edges[(edge + 1) / 2].push(
            new THREE.Vector3(px, py, z + face * 0.004),
          );
        }
        if (i < 60) {
          const n = i * 2;
          indices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
        }
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      g.setIndex(indices);
      g.computeVertexNormals();
      add(g);
      edges.forEach((points) => seam(points, 0.003));
      for (const x of [-0.61, 0.61]) {
        const patch = add(new THREE.BoxGeometry(0.19, 0.22, 0.014));
        patch.position.set(x, top - 0.1, face * (depth / 2 + 0.012));
        const stitchZ = face * (depth / 2 + 0.023);
        for (const diagonal of [-1, 1])
          seam(
            [
              new THREE.Vector3(x - 0.062, top - 0.17, stitchZ),
              new THREE.Vector3(x + 0.062, top - 0.03, stitchZ),
            ].map((v) =>
              diagonal === 1
                ? v
                : new THREE.Vector3(2 * x - v.x, v.y, v.z),
            ),
            0.0025,
          );
      }
    }
  }
  // Side gussets stop at the shoulders for integrated-handle bags.
  const sideTop = product === "t-shirt-bag" ? 0.72 : top;
  for (const side of [-1, 1]) {
    const g = new THREE.PlaneGeometry(depth, sideTop - bottom, 16, 40),
      pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getX(i),
        y = pos.getY(i) + (sideTop + bottom) / 2;
      const fold = Math.sin((z / depth + 0.5) * Math.PI) *
        (product === "box-bag" ? 0.14 : 0.075);
      pos.setXYZ(
        i,
        side * (Math.abs(xAt(half, y)) - fold - (photoShell ? 0.22 : 0)),
        y,
        z,
      );
    }
    g.computeVertexNormals();
    add(g);
  }
  const base = add(
    new THREE.BoxGeometry(photoShell ? width - 0.45 : width - 0.01, 0.025, depth),
  );
  base.position.y = bottom + (photoShell ? 0.12 : 0.012);
  if (product === "box-bag") {
    for (const face of [-1, 1])
      for (const side of [-1, 1])
        seam(
          [
            new THREE.Vector3(side * half, bottom + 0.04, face * depth / 2),
            new THREE.Vector3(side * (half - 0.18), bottom + 0.26, face * (depth / 2 + 0.006)),
            new THREE.Vector3(side * (half - 0.23), bottom + 0.43, face * (depth / 2 + 0.015)),
          ],
          0.004,
        );
  }
  if (product === "string-bag")
    for (const side of [-1, 1]) {
      seam(
        [
          new THREE.Vector3(side * 0.78, top - 0.08, 0.24),
          new THREE.Vector3(side * 1.28, top - 0.25, 0.17),
          new THREE.Vector3(side * 1.52, -0.4, 0.05),
          new THREE.Vector3(side * 1.15, bottom + 0.03, 0.1),
          new THREE.Vector3(side * 1.3, -0.25, 0.23),
          new THREE.Vector3(side * 0.7, top - 0.13, 0.3),
        ],
        0.018,
        cordMat,
      );
      seam(
        [
          new THREE.Vector3(-0.88, top - 0.12, 0.25),
          new THREE.Vector3(0, top - 0.14, 0.27),
          new THREE.Vector3(0.88, top - 0.12, 0.25),
        ],
        0.014,
        cordMat,
      );
    }
  const shadow = document.createElement("canvas");
  shadow.width = shadow.height = 128;
  const sc = shadow.getContext("2d")!;
  const gradient = sc.createRadialGradient(64, 64, 8, 64, 64, 64);
  gradient.addColorStop(0, "#15382b38");
  gradient.addColorStop(1, "#15382b00");
  sc.fillStyle = gradient;
  sc.fillRect(0, 0, 128, 128);
  const shadowTexture = new THREE.CanvasTexture(shadow);
  textures.add(shadowTexture);
  const floor = add(
    new THREE.PlaneGeometry(4.3, 3),
    new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    }),
    scene,
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = bottom - (photoShell ? 0.22 : 0.06);
  let alive = true,
    visible = true,
    raf = 0,
    drawing = false,
    settling = 0,
    frame = 0;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  function draw() {
    raf = 0;
    if (!alive || !visible || document.hidden) return;
    drawing = true;
    controls.update();
    renderer.render(scene, camera);
    publishArtworkTargets();
    drawing = false;
    host.dataset.angle = controls.getAzimuthalAngle().toFixed(3);
    host.dataset.frame = String(++frame);
    host.dataset.distance = camera.position
      .distanceTo(controls.target)
      .toFixed(2);
    if (controls.autoRotate || settling-- > 0)
      raf = requestAnimationFrame(draw);
  }
  function wake() {
    if (drawing) return;
    settling = 20;
    if (alive && visible && !document.hidden && !raf)
      raf = requestAnimationFrame(draw);
  }
  function setView(side: "front" | "back" | "angle") {
    // Consume drag inertia before an explicit face/reset action.
    controls.autoRotate = false;
    controls.enableDamping = false;
    controls.update();
    controls.enableDamping = true;
    const distance = 7.3;
    camera.position
      .copy(controls.target)
      .add(
        side === "angle"
          ? new THREE.Vector3(3, 1.3, 6.5).normalize().multiplyScalar(distance)
          : new THREE.Vector3(0, 0.55, side === "back" ? -distance : distance),
      );
    controls.update();
    wake();
  }
  function rotate(direction: number) {
    const offset = camera.position.clone().sub(controls.target);
    offset.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      (direction * Math.PI) / 8,
    );
    camera.position.copy(controls.target).add(offset);
    controls.update();
    wake();
  }
  function zoom(direction: number) {
    const offset = camera.position.clone().sub(controls.target);
    offset.setLength(
      THREE.MathUtils.clamp(offset.length() - direction * 0.65, 4.8, 9.5),
    );
    camera.position.copy(controls.target).add(offset);
    controls.update();
    wake();
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
  const fullTop = spec.handles ? top + 1.1 : top;
  const artworkScale = photoShell
    ? 800 / photoPlaneSize
    : Math.min(650 / width, 690 / (fullTop - bottom));
  const artworkCenter = photoShell ? photoPlaneCenterY : (fullTop + bottom) / 2;
  const faceSign = (side: Design["side"]) => (side === "front" ? 1 : -1);
  function artworkPoint(x: number, y: number, side: Design["side"]) {
    const xx = (x - 400) / artworkScale;
    const yy = artworkCenter + (400 - y) / artworkScale;
    if (photoShell)
      return new THREE.Vector3(
        faceSign(side) * xx,
        yy,
        faceSign(side) * (photoFaceZ + 0.008),
      );
    const t = (yy - bottom) / (top - bottom);
    const warp =
      product === "string-bag"
        ? 1 - 0.2 * Math.pow(t, 6)
        : 1 + 0.012 * (t - 0.5);
    return new THREE.Vector3(
      faceSign(side) * xx,
      yy,
      faceSign(side) * (zAt(xx / warp, yy) + 0.006),
    );
  }
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
            visible: (camera.position.z - world.z) * faceSign(side) > 0.1,
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
    model.updateMatrixWorld(true);
    raycaster.setFromCamera(pointer, camera);
  }
  function pick(event: PointerEvent) {
    setRay(event);
    const hit = raycaster.intersectObjects(model.children, false)[0];
    if (!hit?.uv) return null;
    const side = faceSides.get(hit.object);
    if (!side) return null;
    const x = hit.uv.x * 800,
      y = (1 - hit.uv.y) * 800;
    const boxes = [...faceBounds[side]].reverse();
    // The sidebar can select an overlapping layer before it is dragged.
    if (selection?.side === side)
      boxes.sort(
        (a, b) =>
          Number(b.layer === selection?.layer) -
          Number(a.layer === selection?.layer),
      );
    const box = boxes.find((b) => {
      const angle = (-b.rotation * Math.PI) / 180,
        dx = x - b.x,
        dy = y - b.y;
      return (
        Math.abs(dx * Math.cos(angle) - dy * Math.sin(angle)) <=
          b.width / 2 + 18 &&
        Math.abs(dx * Math.sin(angle) + dy * Math.cos(angle)) <=
          b.height / 2 + 18
      );
    });
    return box?.layer ? { box, side, x, y, point: hit.point } : null;
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
      const x = 400 + point.x * faceSign(drag.selection.side) * artworkScale;
      const y = 400 - (point.y - artworkCenter) * artworkScale;
      moveArtwork(drag.selection, (x - drag.dx) / 8, (y - drag.dy) / 8);
    } else canvas.style.cursor = pick(event) ? "move" : "grab";
  }
  function pointerUp(event: PointerEvent) {
    if (!drag || event.pointerId !== drag.pointer) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    drag = null;
    controls.enabled = true;
    canvas.style.cursor = "move";
    host.dataset.dragging = "false";
    if (canvas.hasPointerCapture(event.pointerId))
      canvas.releasePointerCapture(event.pointerId);
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
          0.48,
          2.1,
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
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    wake();
  });
  resize.observe(host);
  const visibility = () => {
    if (document.hidden) {
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
    cancelAnimationFrame(raf);
    raf = 0;
    host.dataset.ready = "fallback";
  };
  canvas.addEventListener("webglcontextlost", lost);
  setView("angle");
  host.dataset.model = product;
  host.dataset.ready = "true";
  return {
    update(design, front, back, selected, photo) {
      currentDesign = design;
      selection = selected;
      const hex = (colors.find((c) => c.name === design.color) || colors[0])
        .hex;
      fabric.color.set(hex);
      seamMat.color.set(hex).multiplyScalar(0.84);
      innerMat.color.set(hex).multiplyScalar(0.48);
      if (photoTexture && photo) {
        photoTexture.image = photo;
        photoTexture.needsUpdate = true;
      }
      [front, back].forEach((artwork, i) => {
        faceBounds[i === 0 ? "front" : "back"] = artwork.bounds;
        printTextures[i].image = artwork.canvas;
        printTextures[i].needsUpdate = true;
      });
      host.dataset.frontArtwork = String(
        Boolean(design.logo || design.text.trim()),
      );
      host.dataset.backArtwork = String(
        Boolean(design.backLogo || design.backText.trim()),
      );
      wake();
    },
    view: setView,
    rotate,
    zoom,
    spin(value) {
      controls.autoRotate = value && !reduced.matches;
      wake();
    },
    visible(value) {
      visible = value;
      if (value) wake();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    dispose() {
      alive = false;
      cancelAnimationFrame(raf);
      resize.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", motion);
      canvas.removeEventListener("keydown", keyboard);
      canvas.removeEventListener("webglcontextlost", lost);
      controls.removeEventListener("start", interacted);
      controls.removeEventListener("change", wake);
      canvas.removeEventListener("pointerdown", pointerDown, true);
      canvas.removeEventListener("pointermove", pointerMove, true);
      canvas.removeEventListener("pointerup", pointerUp, true);
      canvas.removeEventListener("pointercancel", pointerUp, true);
      canvas.removeEventListener("lostpointercapture", pointerUp, true);
      if (drag) editing?.drag(false);
      controls.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      canvas.remove();
    },
  };
}
