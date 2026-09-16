import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { colors, type Design } from "./catalog";

export type StudioScene = {
  update: (
    design: Design,
    front: HTMLCanvasElement,
    back: HTMLCanvasElement,
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
  "t-shirt-bag": { width: 2.4, bottom: -1.4, top: 1.8, depth: 0.55 },
  "string-bag": { width: 2.35, bottom: -1.4, top: 1.55, depth: 0.45 },
};
export function createStudioScene(
  host: HTMLDivElement,
  product: string,
  onInteract: () => void,
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
    "3D bag. Drag or use arrow keys to rotate. Plus and minus to zoom.",
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
  scene.add(new THREE.HemisphereLight(0xffffff, 0x59736a, 2.6));
  const key = new THREE.DirectionalLight(0xfff9ed, 3.2);
  key.position.set(-3, 6, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xcde4f1, 1.3);
  fill.position.set(4, 2, -4);
  scene.add(fill);
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const weave = document.createElement("canvas");
  weave.width = weave.height = 128;
  const wc = weave.getContext("2d")!;
  wc.fillStyle = "#929292";
  wc.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += 4)
    for (let x = 0; x < 128; x += 4) {
      wc.fillStyle = (x + y) % 8 ? "#b4b4b4" : "#777777";
      wc.fillRect(x, y, 2, 3);
    }
  const bump = new THREE.CanvasTexture(weave);
  bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
  bump.repeat.set(12, 12);
  textures.add(bump);
  const fabric = new THREE.MeshStandardMaterial({
    color: colors[0].hex,
    roughness: 0.96,
    bumpMap: bump,
    bumpScale: 0.012,
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
    const flat = product === "box-bag" ? 0.016 : 0.055;
    return (
      depth / 2 +
      flat * Math.cos(((x / half) * Math.PI) / 2) * Math.sin(t * Math.PI) +
      0.012 * Math.sin(x * 14 + y * 4) * Math.pow(Math.abs(x / half), 6)
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
  const faceMaterials: THREE.MeshStandardMaterial[] = [];
  const printTextures: THREE.CanvasTexture[] = [];
  for (const face of [1, -1]) {
    const panel = add(faceGeometry());
    if (face < 0) panel.rotation.y = Math.PI;
    const texture = new THREE.CanvasTexture(document.createElement("canvas"));
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
    faceMaterials.push(ink);
    const print = add(faceGeometry(), ink);
    print.position.z = face * 0.006;
    if (face < 0) print.rotation.y = Math.PI;
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
          x = -0.61 * Math.cos(t),
          y = top - 0.12 + 1.2 * Math.sin(t),
          z = face * (depth / 2 + 0.04 * Math.sin(t));
        const dx = 0.61 * Math.sin(t),
          dy = 1.2 * Math.cos(t),
          length = Math.hypot(dx, dy);
        for (const edge of [-1, 1]) {
          const px = x - ((edge * dy) / length) * 0.082,
            py = y + ((edge * dx) / length) * 0.082;
          positions.push(px, py, z);
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
        seam(
          [
            new THREE.Vector3(x - 0.06, top - 0.17, face * (depth / 2 + 0.023)),
            new THREE.Vector3(x + 0.06, top - 0.03, face * (depth / 2 + 0.023)),
          ],
          0.003,
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
      const fold = Math.sin((z / depth + 0.5) * Math.PI) * 0.065;
      pos.setXYZ(i, side * (Math.abs(xAt(half, y)) - fold), y, z);
    }
    g.computeVertexNormals();
    add(g);
  }
  const base = add(new THREE.BoxGeometry(width - 0.01, 0.025, depth));
  base.position.y = bottom + 0.012;
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
  floor.position.y = bottom - 0.06;
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
  const keyboard = (e: KeyboardEvent) => {
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
    update(design, front, back) {
      const hex = (colors.find((c) => c.name === design.color) || colors[0])
        .hex;
      fabric.color.set(hex);
      seamMat.color.set(hex).multiplyScalar(0.84);
      [front, back].forEach((image, i) => {
        printTextures[i].image = image;
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
      controls.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      canvas.remove();
    },
  };
}
