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
  controls.autoRotateSpeed = 2.2;
  const model = new THREE.Group();
  scene.add(model);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x718177, 2.15));
  const key = new THREE.DirectionalLight(0xfff7e8, 3.5);
  key.position.set(-4, 7, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xd6e7ef, 1.65);
  fill.position.set(5, 3, -4);
  scene.add(fill);
  const rearKey = new THREE.DirectionalLight(0xfff8ec, 2.15);
  rearKey.position.set(-3, 5, -7);
  scene.add(rearKey);
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
  function depthAt(y: number) {
    if (product !== "string-bag" && product !== "t-shirt-bag") return depth;
    // Gather the drawstring neck and bring the T-shirt handles together. Both
    // retain their full body depth; thin handle material should not become
    // two free-standing spikes when seen edge-on.
    const start = product === "t-shirt-bag" ? 0.54 : 0.35;
    const compression = product === "t-shirt-bag" ? 0.82 : 0.66;
    const t = THREE.MathUtils.clamp((y - start) / (top - start), 0, 1);
    const gathered = t * t * (3 - 2 * t);
    return depth * (1 - compression * gathered);
  }
  function zAt(x: number, y: number) {
    const t = (y - bottom) / (top - bottom);
    const flat = product === "box-bag" ? 0.029 : 0.105;
    const edge = Math.pow(Math.abs(x / half), 4);
    const lowerFold = 0.035 * Math.sin(Math.PI * Math.min(1, t * 2.4));
    const gatheredFold = product === "string-bag"
      ? 0.043 * Math.pow(THREE.MathUtils.clamp((y - 0.12) / (top - 0.12), 0, 1), 1.25)
        * Math.sin(11 * x + 1.5 * y) * (1 - edge * 0.55)
      : 0;
    return (
      depthAt(y) / 2 +
      flat * Math.cos(((x / half) * Math.PI) / 2) * Math.sin(t * Math.PI) +
      lowerFold * (1 - edge) +
      gatheredFold +
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
    } else if (product === "string-bag") {
      s.moveTo(-half + 0.12, bottom);
      s.lineTo(half - 0.12, bottom);
      s.quadraticCurveTo(half, bottom, half, bottom + 0.13);
      s.lineTo(half, 0.18);
      s.quadraticCurveTo(half, 0.65, 0.75, 1.0);
      s.quadraticCurveTo(0.51, top - 0.06, 0.4, top);
      s.quadraticCurveTo(0, top - 0.1, -0.4, top);
      s.quadraticCurveTo(-0.51, top - 0.06, -0.75, 1.0);
      s.quadraticCurveTo(-half, 0.65, -half, 0.18);
      s.lineTo(-half, bottom + 0.13);
      s.quadraticCurveTo(-half, bottom, -half + 0.12, bottom);
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
  const shaped = product === "d-cut-bag" || product === "t-shirt-bag" || product === "string-bag";
  // The product photograph becomes the fabric on a real bag mesh. Side
  // gussets, the base, mouth and handles are modelled separately.
  const photoShell = false;
  const photoPlaneSize = 4;
  const photoPlaneCenterY = 0.18;
  const photoFaceZ = depth / 2 + 0.03;
  const photoCanvas = document.createElement("canvas");
  photoCanvas.width = photoCanvas.height = 1440;
  const photoTexture = new THREE.CanvasTexture(photoCanvas);
  const rearCanvas = document.createElement("canvas");
  rearCanvas.width = rearCanvas.height = 1440;
  const rearTexture = new THREE.CanvasTexture(rearCanvas);
  // The client photo includes a long white cord across the face. That cord
  // cannot rotate with the bag, so the upper fabric is repaired from a clean
  // area of the same photograph before we add the cord as actual geometry.
  const cleanStringCanvas = product === "string-bag"
    ? document.createElement("canvas")
    : null;
  if (cleanStringCanvas) {
    // The restored material is displayed at a few hundred CSS pixels. Keep
    // this scratch texture smaller than the final face for quick color edits.
    cleanStringCanvas.width = 720;
    cleanStringCanvas.height = Math.ceil(720 * 0.61);
  }
  const clothCanvas = document.createElement("canvas");
  clothCanvas.width = clothCanvas.height = 256;
  const clothTexture = new THREE.CanvasTexture(clothCanvas);
  clothTexture.colorSpace = THREE.SRGBColorSpace;
  clothTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  textures.add(clothTexture);
  // Both photographed faces share a subdivided surface. The image supplies
  // fabric detail; the mesh supplies the small bulge of a filled bag.
  const photoFaceGeometry = photoShell
    ? new THREE.PlaneGeometry(photoPlaneSize, photoPlaneSize, 72, 72)
    : null;
  if (photoTexture) {
    photoTexture.colorSpace = THREE.SRGBColorSpace;
    photoTexture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    textures.add(photoTexture);
  }
  rearTexture.colorSpace = THREE.SRGBColorSpace;
  rearTexture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  textures.add(rearTexture);
  const photographedFabric = new THREE.MeshStandardMaterial({
    map: photoTexture,
    bumpMap: bump,
    bumpScale: 0.012,
    roughness: 0.92,
    metalness: 0,
    side: THREE.FrontSide,
  });
  materials.add(photographedFabric);
  const rearFabric = photographedFabric.clone();
  rearFabric.map = rearTexture;
  materials.add(rearFabric);
  if (spec.handles && !photoShell) {
    // A recessed floor and four inner walls leave a visible opening when the
    // customer tilts the bag, rather than a solid lid across the top.
    // Gussets fold inward near the mouth, so the cavity walls sit inside
    // that fold instead of showing as dark squares on the outside.
    const openingWidth = width - 0.42;
    const openingDepth = depth - 0.14;
    const cavity = add(
      new THREE.BoxGeometry(openingWidth, 0.012, openingDepth),
      innerMat,
    );
    cavity.position.y = top - 0.27;
    for (const face of [-1, 1]) {
      const wall = add(
        new THREE.BoxGeometry(openingWidth, 0.27, 0.014),
        innerMat,
      );
      wall.position.set(0, top - 0.135, face * openingDepth / 2);
      const lip = add(new THREE.BoxGeometry(width, 0.025, 0.052));
      lip.position.set(0, top - 0.006, face * (depth / 2 - 0.026));
    }
    for (const side of [-1, 1]) {
      const wall = add(
        new THREE.BoxGeometry(0.014, 0.27, openingDepth),
        innerMat,
      );
      wall.position.set(side * openingWidth / 2, top - 0.135, 0);
      const lip = add(new THREE.BoxGeometry(0.052, 0.025, depth));
      lip.position.set(side * (half - 0.026), top - 0.006, 0);
    }
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
  function subdivideShape(geometry: THREE.BufferGeometry, divisions = 10) {
    const source = geometry.index ? geometry.toNonIndexed() : geometry;
    const original = source.getAttribute("position");
    const vertices: number[] = [];
    const indices: number[] = [];
    const keys = new Map<string, number>();
    function vertex(x: number, y: number) {
      const key = `${x.toFixed(5)}:${y.toFixed(5)}`;
      const found = keys.get(key);
      if (found !== undefined) return found;
      const index = vertices.length / 3;
      vertices.push(x, y, 0);
      keys.set(key, index);
      return index;
    }
    for (let triangle = 0; triangle < original.count; triangle += 3) {
      const ax = original.getX(triangle), ay = original.getY(triangle);
      const bx = original.getX(triangle + 1), by = original.getY(triangle + 1);
      const cx = original.getX(triangle + 2), cy = original.getY(triangle + 2);
      const point = (i: number, j: number) =>
        vertex(
          ax + ((bx - ax) * i + (cx - ax) * j) / divisions,
          ay + ((by - ay) * i + (cy - ay) * j) / divisions,
        );
      for (let i = 0; i < divisions; i++)
        for (let j = 0; j < divisions - i; j++) {
          const a = point(i, j), b = point(i + 1, j), c = point(i, j + 1);
          indices.push(a, b, c);
          if (j < divisions - i - 1)
            indices.push(b, point(i + 1, j + 1), c);
        }
    }
    if (source !== geometry) source.dispose();
    geometry.dispose();
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    result.setIndex(indices);
    return result;
  }
  function faceGeometry(forPhoto = false) {
    const geometry = shaped
      ? subdivideShape(new THREE.ShapeGeometry(outline(), 40))
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
      uv[i * 2] = forPhoto ? (xx + half) / width : (400 + xx * scale) / 800;
      uv[i * 2 + 1] = forPhoto
        ? (y - bottom) / (top - bottom)
        : 1 - (400 - (y - centerY) * scale) / 800;
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
          photoFaceGeometry!,
          new THREE.MeshBasicMaterial({
            map: face > 0 ? photoTexture : rearTexture,
            transparent: true,
            alphaTest: 0.08,
            toneMapped: false,
            side: THREE.FrontSide,
          }),
        )
      : add(faceGeometry(true), face > 0 ? photographedFabric : rearFabric);
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
    const ink = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
      toneMapped: false,
      side: THREE.FrontSide,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    });
    const print = add(
      photoShell
        ? photoFaceGeometry!
        : faceGeometry(),
      ink,
    );
    if (photoShell)
      print.position.set(0, photoPlaneCenterY, face * (photoFaceZ + 0.008));
    else print.position.z = face * 0.006;
    if (face < 0) print.rotation.y = Math.PI;
    faceSides.set(print, face > 0 ? "front" : "back");
    if (photoShell) continue;
    for (const x of product === "string-bag" ? [] : [-half + 0.022, half - 0.022]) {
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
    if (spec.handles) {
      const positions: number[] = [],
        uv: number[] = [],
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
        for (const thickness of [-1, 1])
          for (const edge of [-1, 1]) {
            const px = x - ((edge * dy) / length) * 0.1,
              py = y + ((edge * dx) / length) * 0.1;
            // A thin enclosed webbing strap catches light on its edge as the
            // bag rotates, unlike a single infinitely thin ribbon plane.
            positions.push(
              px,
              py,
              z + face * (thickness * 0.012 + 0.006 * Math.sin(t * 5)),
            );
            uv.push((edge + 1) / 2, (i / 60) * 0.95);
          }
        for (const edge of [-1, 1]) {
          const px = x - ((edge * dy) / length) * 0.1,
            py = y + ((edge * dx) / length) * 0.1;
          edges[(edge + 1) / 2].push(
            new THREE.Vector3(px, py, z + face * 0.015),
          );
        }
        if (i < 60) {
          const n = i * 4;
          // Both broad surfaces and both slim edges form a closed strap.
          for (const [a, b, c, d] of [
            [0, 1, 4, 5],
            [2, 3, 6, 7],
            [0, 2, 4, 6],
            [1, 3, 5, 7],
          ]) {
            indices.push(n + a, n + b, n + c, n + b, n + d, n + c);
          }
        }
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      g.setIndex(indices);
      g.computeVertexNormals();
      add(g);
      edges.forEach((points) => seam(points, 0.004));
      for (const x of [-0.61, 0.61]) {
        const patch = add(new THREE.BoxGeometry(0.19, 0.22, 0.014));
        patch.position.set(x, top - 0.1, face * (zAt(x, top - 0.1) + 0.017));
        const stitchZ = face * (zAt(x, top - 0.1) + 0.027);
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
  let lastPhoto: HTMLCanvasElement | null = null;
  const outerContour = shaped ? outline().extractPoints(40).shape : [];
  if (product === "t-shirt-bag" && !photoShell) {
    // A T-shirt bag is one folded sheet. Bridge the two faces along the carry
    // opening and handle tips; otherwise they look like detached paper edges
    // when viewed from above or at three quarters.
    const vertices: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const minY = 0.64;
    for (let i = 0; i < outerContour.length; i++) {
      const first = outerContour[i];
      const last = outerContour[(i + 1) % outerContour.length];
      if (first.y < minY && last.y < minY) continue;
      const start = first.y < minY
        ? first.clone().lerp(last, (minY - first.y) / (last.y - first.y))
        : first;
      const end = last.y < minY
        ? first.clone().lerp(last, (minY - first.y) / (last.y - first.y))
        : last;
      if (start.distanceToSquared(end) < 0.000001) continue;
      const offset = vertices.length / 3;
      for (const point of [start, end]) {
        const x = xAt(point.x, point.y);
        const z = zAt(point.x, point.y);
        vertices.push(x, point.y, z, x, point.y, -z);
        uvs.push(0, point.y / 3, 1, point.y / 3);
      }
      indices.push(
        offset, offset + 1, offset + 2,
        offset + 2, offset + 1, offset + 3,
      );
    }
    const bridge = new THREE.BufferGeometry();
    bridge.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    bridge.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    bridge.setIndex(indices);
    bridge.computeVertexNormals();
    add(bridge);
  }
  function outerRightAt(y: number) {
    if (!shaped) return Math.abs(xAt(half, y));
    // The drawstring mouth ends in two points. The center between them is
    // lower, so a horizontal section at the exact top has no outer crossing.
    // Use the actual shoulder there instead of the full body width.
    if (product === "string-bag" && y >= top - 0.001)
      return Math.abs(xAt(0.4, top));
    let right = 0;
    for (let i = 0; i < outerContour.length; i++) {
      const a = outerContour[i], b = outerContour[(i + 1) % outerContour.length];
      if (Math.abs(a.y - b.y) < 0.00001) {
        if (Math.abs(y - a.y) < 0.00001) right = Math.max(right, a.x, b.x);
      } else if (y >= Math.min(a.y, b.y) && y <= Math.max(a.y, b.y)) {
        const t = (y - a.y) / (b.y - a.y);
        right = Math.max(right, a.x + (b.x - a.x) * t);
      }
    }
    return Math.abs(xAt(right || half, y));
  }
  // Side gussets have their own mesh; they carry the fabric crop around the bag.
  const sideTop = product === "t-shirt-bag" ? 0.72 : top;
  if (!photoShell) for (const side of [-1, 1]) {
    const g = new THREE.PlaneGeometry(depth, sideTop - bottom, 16, 40),
      pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getX(i),
        y = pos.getY(i) + (sideTop + bottom) / 2;
      const fold = Math.sin((z / depth + 0.5) * Math.PI) *
        (product === "box-bag" ? 0.14 : product === "t-shirt-bag" ? 0.16 : 0.075);
      const outerX = outerRightAt(y);
      // outerRightAt returns the warped silhouette coordinate. zAt expects
      // the unwarped coordinate used by the front/back mesh; using the warped
      // value left a light crack at the joined edges when the bag rotated.
      const t = (y - bottom) / (top - bottom);
      const warp = product === "string-bag"
        ? 1 - 0.2 * Math.pow(t, 6)
        : 1 + 0.012 * (t - 0.5);
      const edgeZ = zAt(outerX / warp, y);
      pos.setXYZ(
        i,
        side * (outerX - fold),
        y,
        (z / (depth / 2)) * edgeZ,
      );
    }
    // PlaneGeometry faces -X after mapping its horizontal coordinate to Z.
    // Flip the right gusset so both exterior surfaces use outward normals.
    if (side === 1) {
      const index = g.getIndex()!;
      for (let i = 0; i < index.count; i += 3) {
        const b = index.getX(i + 1);
        index.setX(i + 1, index.getX(i + 2));
        index.setX(i + 2, b);
      }
    }
    g.computeVertexNormals();
    add(g);
  }
  if (!photoShell) {
    const baseWidth = shaped ? 2 * outerRightAt(bottom + 0.025) : width - 0.01;
    const base = add(
      new THREE.BoxGeometry(baseWidth, 0.025, depth),
      product === "string-bag" ? seamMat : fabric,
    );
    base.position.y = bottom + 0.012;
  }
  if (product === "d-cut-bag" && !photoShell) {
    // Show the material thickness inside the punched grip, not two floating
    // ellipses from the front and back sheets.
    const vertices: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const x = 0.43 * Math.cos(a);
      const y = top - 0.4 + 0.14 * Math.sin(a);
      const z = zAt(x, y);
      vertices.push(xAt(x, y), y, z, xAt(x, y), y, -z);
      uvs.push(i / 48, 0, i / 48, 1);
      if (i < 48) {
        const n = i * 2;
        indices.push(n, n + 1, n + 2, n + 2, n + 1, n + 3);
      }
    }
    const gripWall = new THREE.BufferGeometry();
    gripWall.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    gripWall.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    gripWall.setIndex(indices);
    gripWall.computeVertexNormals();
    add(gripWall, innerMat);
    for (const face of [-1, 1]) {
      const grip: THREE.Vector3[] = [];
      for (let i = 0; i <= 48; i++) {
        const a = (i / 48) * Math.PI * 2;
        const x = 0.43 * Math.cos(a);
        const y = top - 0.4 + 0.14 * Math.sin(a);
        grip.push(new THREE.Vector3(xAt(x, y), y, face * (zAt(x, y) + 0.01)));
      }
      seam(grip, 0.009);
    }
  }
  if ((product === "t-shirt-bag" || product === "string-bag") && !photoShell)
    for (const face of [-1, 1])
      for (const side of [-1, 1]) {
        const edge: THREE.Vector3[] = [];
        for (let i = 0; i <= 36; i++) {
          const y = bottom + 0.035 + ((sideTop - bottom - 0.065) * i) / 36;
          const x = side * outerRightAt(y);
          const t = (y - bottom) / (top - bottom);
          const warp = product === "string-bag"
            ? 1 - 0.2 * Math.pow(t, 6)
            : 1 + 0.012 * (t - 0.5);
          edge.push(new THREE.Vector3(x, y, face * (zAt(x / warp, y) + 0.008)));
        }
        seam(edge, 0.008);
      }
  if (product === "t-shirt-bag" && !photoShell)
    for (const face of [-1, 1]) {
      const rimPoint = (x: number, y: number) =>
        new THREE.Vector3(xAt(x, y), y, face * (zAt(x, y) + 0.009));
      // The photographed bag has a folded, stitched edge around its carry
      // opening. Follow that edge on both faces so the cutout holds up in 3D.
      const opening: THREE.Vector3[] = [];
      for (let i = 0; i <= 24; i++) {
        const t = i / 24;
        const x = (1 - t) ** 2 * 0.52 + 2 * (1 - t) * t * 0.5;
        const y = (1 - t) ** 2 * 1.07 + 2 * (1 - t) * t * 0.7 + t * t * 0.68;
        opening.push(rimPoint(x, y));
      }
      for (let i = 1; i <= 24; i++) {
        const t = i / 24;
        const x = -(2 * (1 - t) * t * 0.5 + t * t * 0.52);
        const y = (1 - t) ** 2 * 0.68 + 2 * (1 - t) * t * 0.7 + t * t * 1.07;
        opening.push(rimPoint(x, y));
      }
      seam(opening, 0.006);
      for (const side of [-1, 1])
        seam(
          [
            rimPoint(side * 0.52, 1.07),
            rimPoint(side * 0.55, top),
            rimPoint(side * 1.02, top),
            rimPoint(side * 1.04, 1.07),
          ],
          0.006,
        );
    }
  if (product === "box-bag" && !photoShell) {
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
  if (product === "string-bag" && !photoShell)
    for (const face of [-1, 1]) {
      const cordPoint = (x: number, y: number, lift: number) =>
        new THREE.Vector3(xAt(x, y), y, face * (zAt(x, y) + lift));
      seam(
        [
          cordPoint(-0.38, top - 0.05, 0.015),
          cordPoint(0, top - 0.18, 0.04),
          cordPoint(0.38, top - 0.05, 0.015),
        ],
        0.015,
        cordMat,
      );
      seam(
        [
          cordPoint(0.12, top - 0.16, 0.05),
          cordPoint(0.25, top - 0.42, 0.08),
          cordPoint(0.22, top - 0.7, 0.07),
        ],
        0.012,
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
      fabric.color.set(0xffffff);
      seamMat.color.set(hex).multiplyScalar(0.84);
      innerMat.color.set(hex).multiplyScalar(0.48);
      if (photo && photo !== lastPhoto) {
          // Crop the actual photographed front panel into the UV space of the
          // volumetric face. The side and rear use unprinted fabric from the
          // same client sample; no clean rear product photo was supplied.
          const crop: Record<string, [number, number, number, number]> = {
            "box-bag": [0.33, 0.31, 0.81, 0.93],
            "handle-bag": [0.30, 0.43, 0.72, 0.93],
            "t-shirt-bag": [0.35, 0.08, 0.77, 0.93],
            "d-cut-bag": [0.14, 0.02, 0.86, 0.93],
            "string-bag": [0.13, 0.07, 0.87, 0.93],
          };
          const [l, t, r, b] = crop[product] || crop["box-bag"];
          const source = photo.getContext("2d", { willReadFrequently: true })!;
          const sample = source.getImageData(
            Math.floor(photo.width * (l + r) / 2),
            Math.floor(photo.height * (t * 0.2 + b * 0.8)),
            1,
            1,
          ).data;
          const ground = `rgb(${sample[0]},${sample[1]},${sample[2]})`;
          const face = photoCanvas.getContext("2d")!;
          face.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
          face.fillStyle = ground;
          face.fillRect(0, 0, photoCanvas.width, photoCanvas.height);
          face.drawImage(
            photo,
            l * photo.width,
            t * photo.height,
            (r - l) * photo.width,
            (b - t) * photo.height,
            0,
            0,
            photoCanvas.width,
            photoCanvas.height,
          );
          if (cleanStringCanvas) {
            const clean = cleanStringCanvas.getContext("2d")!;
            const w = cleanStringCanvas.width;
            const h = cleanStringCanvas.height;
            clean.clearRect(0, 0, w, h);
            clean.drawImage(
              photoCanvas,
              0,
              Math.round(photoCanvas.height * 0.57),
              photoCanvas.width,
              Math.round(photoCanvas.height * 0.31),
              0,
              0,
              w,
              h,
            );
            const repaired = clean.getImageData(0, 0, w, h);
            for (let y = 0; y < h; y++) {
              const progress = (y / h) * 0.61;
              const fade = THREE.MathUtils.clamp((0.61 - progress) / 0.15, 0, 1);
              const opacity = fade * fade * (3 - 2 * fade);
              const gather = Math.pow(1 - y / h, 1.6);
              for (let x = 0; x < w; x++) {
                const pixel = (y * w + x) * 4;
                // Broad, low-contrast gathers preserve the photographed
                // textile without drawing a second, flat drawstring onto it.
                const shade = 1 - gather * (
                  0.028 * Math.sin(x / 70 + y / 160) +
                  0.014 * Math.sin(x / 31 - y / 220)
                );
                for (let channel = 0; channel < 3; channel++)
                  repaired.data[pixel + channel] *= shade;
                repaired.data[pixel + 3] = Math.round(opacity * 255);
              }
            }
            clean.putImageData(repaired, 0, 0);
            face.drawImage(
              cleanStringCanvas,
              0,
              0,
              photoCanvas.width,
              photoCanvas.height * 0.61,
            );
          }
          if (product === "d-cut-bag") {
            // Use the unprinted fabric in the supplied image across the face.
            // The grip opening belongs to the mesh, so the photographed hole
            // must not appear a second time at another position.
            face.drawImage(
              photo,
              photo.width * 0.3,
              photo.height * 0.3,
              photo.width * 0.4,
              photo.height * 0.52,
              0,
              0,
              photoCanvas.width,
              photoCanvas.height,
            );
          }
          const rearCrop: Record<string, [number, number, number, number]> = {
            "box-bag": [0.43, 0.51, 0.68, 0.80],
            "handle-bag": [0.39, 0.57, 0.64, 0.83],
            "t-shirt-bag": [0.44, 0.45, 0.64, 0.78],
            "d-cut-bag": [0.31, 0.38, 0.69, 0.81],
            "string-bag": [0.32, 0.34, 0.68, 0.77],
          };
          const [rl, rt, rr, rb] = rearCrop[product] || rearCrop["box-bag"];
          const rear = rearCanvas.getContext("2d")!;
          rear.clearRect(0, 0, rearCanvas.width, rearCanvas.height);
          rear.fillStyle = ground;
          rear.fillRect(0, 0, rearCanvas.width, rearCanvas.height);
          rear.drawImage(
            photo,
            rl * photo.width,
            rt * photo.height,
            (rr - rl) * photo.width,
            (rb - rt) * photo.height,
            0,
            0,
            rearCanvas.width,
            rearCanvas.height,
          );
          // A little edge falloff suggests the rear panel's turn into the
          // gussets without baking front-facing folds into the opposite side.
          const falloff = rear.createLinearGradient(0, 0, rearCanvas.width, 0);
          falloff.addColorStop(0, "#0000001c");
          falloff.addColorStop(0.12, "#00000000");
          falloff.addColorStop(0.88, "#00000000");
          falloff.addColorStop(1, "#00000020");
          rear.fillStyle = falloff;
          rear.fillRect(0, 0, rearCanvas.width, rearCanvas.height);
          const cloth = clothCanvas.getContext("2d")!;
          cloth.clearRect(0, 0, 256, 256);
          cloth.fillStyle = ground;
          cloth.fillRect(0, 0, 256, 256);
          if (product === "t-shirt-bag")
            cloth.drawImage(
              photo,
              photo.width * 0.25,
              photo.height * 0.32,
              photo.width * 0.19,
              photo.height * 0.59,
              0,
              0,
              256,
              256,
            );
          else if (product === "string-bag")
            cloth.drawImage(
              photo,
              photo.width * 0.51 - 48,
              photo.height * 0.77 - 48,
              96,
              96,
              0,
              0,
              256,
              256,
            );
          else
            cloth.drawImage(
              photo,
              photo.width * (l + r) / 2 - 110,
              photo.height * (t * 0.22 + b * 0.78) - 110,
              220,
              220,
              0,
              0,
              256,
              256,
            );
          if (product === "string-bag") {
            // The source swatch carries a broad photograph shadow. Soften it
            // before tiling the gusset; otherwise it turns into dark stripes
            // running down the narrow side panel.
            const swatch = cloth.getImageData(0, 0, 256, 256);
            const average = [0, 0, 0];
            for (let i = 0; i < swatch.data.length; i += 4)
              for (let channel = 0; channel < 3; channel++)
                average[channel] += swatch.data[i + channel];
            for (let channel = 0; channel < 3; channel++)
              average[channel] /= 256 * 256;
            for (let i = 0; i < swatch.data.length; i += 4)
              for (let channel = 0; channel < 3; channel++)
                swatch.data[i + channel] =
                  average[channel] * 0.78 + swatch.data[i + channel] * 0.22;
            cloth.putImageData(swatch, 0, 0);
            clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
            clothTexture.repeat.set(2, 3);
          }
          clothTexture.needsUpdate = true;
          fabric.map = clothTexture;
          fabric.needsUpdate = true;
        photoTexture.needsUpdate = true;
        rearTexture.needsUpdate = true;
        lastPhoto = photo;
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
