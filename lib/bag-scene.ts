import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export type BagScene = {
  color: (hex: string) => void;
  text: (value: string) => void;
  playing: (value: boolean) => void;
  construction: (value: boolean) => void;
  view: (side: "front" | "back" | "angle") => void;
  rotate: (direction: number) => void;
  visible: (value: boolean) => void;
  dispose: () => void;
};

/** A deliberately illustrative, fully volumetric tote; not a production dieline. */
export function createBagScene(
  host: HTMLDivElement,
  onInteract: () => void,
): BagScene {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = false;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
  camera.position.set(3.4, 1.8, 7.5);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0.5, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minPolarAngle = 0.72;
  controls.maxPolarAngle = 1.7;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.65;
  controls.rotateSpeed = 0.65;
  const start = () => {
    controls.autoRotate = false;
    onInteract();
  };
  controls.addEventListener("start", start);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  controls.autoRotate = !reduced.matches;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x243f39, 2.5));
  const key = new THREE.DirectionalLight(0xfff8eb, 4.5);
  key.position.set(-3, 6, 5);
  key.castShadow = false;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -4;
  key.shadow.camera.right = 4;
  key.shadow.camera.top = 5;
  key.shadow.camera.bottom = -3;
  key.shadow.normalBias = 0.025;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xb4e6d3, 3);
  rim.position.set(4, 3, -4);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xa6caff, 1);
  fill.position.set(5, 1, 3);
  scene.add(fill);

  const bag = new THREE.Group();
  bag.position.y = -0.1;
  scene.add(bag);
  const grainCanvas = document.createElement("canvas");
  grainCanvas.width = grainCanvas.height = 256;
  const grain = grainCanvas.getContext("2d")!;
  grain.fillStyle = "#9b9b9b";
  grain.fillRect(0, 0, 256, 256);
  let seed = 173;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < 16000; i++) {
    const shade = Math.floor(105 + random() * 90);
    grain.fillStyle = `rgb(${shade},${shade},${shade})`;
    grain.fillRect(
      random() * 256,
      random() * 256,
      0.6 + random(),
      0.6 + random() * 2,
    );
  }
  grain.strokeStyle = "#a9a9a9";
  grain.lineWidth = 0.8;
  for (let y = 0; y < 256; y += 13)
    for (let x = 0; x < 256; x += 13) {
      grain.beginPath();
      grain.moveTo(x, y + 2);
      grain.lineTo(x + 3, y);
      grain.lineTo(x + 6, y + 2);
      grain.stroke();
    }
  const bump = new THREE.CanvasTexture(grainCanvas);
  bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
  bump.repeat.set(9, 10);
  bump.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  const material = new THREE.MeshStandardMaterial({
    color: "#d8c99f",
    roughness: 0.92,
    metalness: 0,
    bumpMap: bump,
    bumpScale: 0.016,
    side: THREE.DoubleSide,
  });
  const seamMaterial = new THREE.MeshStandardMaterial({
    color: "#b7aa86",
    roughness: 1,
  });
  const targetColor = new THREE.Color("#d8c99f");
  const targetSeam = new THREE.Color("#b7aa86");
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>([material, seamMaterial]);
  const textures = new Set<THREE.Texture>([bump]);
  function mesh(
    geometry: THREE.BufferGeometry,
    mat: THREE.Material = material,
  ) {
    geometries.add(geometry);
    materials.add(mat);
    const object = new THREE.Mesh(geometry, mat);
    object.castShadow = true;
    object.receiveShadow = true;
    bag.add(object);
    return object;
  }
  const depth = (x: number, y: number) =>
    0.36 +
    0.068 * Math.cos(x * 1.3) * Math.cos(y * 1.15) +
    0.018 * Math.sin(y * 8 + x * 3) * Math.pow(Math.abs(x) / 1.23, 5);
  function panel() {
    const geometry = new THREE.PlaneGeometry(2.46, 2.5, 60, 60);
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i),
        y = position.getY(i);
      position.setXYZ(
        i,
        x * (1 + 0.015 * (y / 1.25)),
        y - 0.035 * Math.cos(x * 1.22) * Math.pow(Math.max(0, y / 1.25), 6),
        depth(x, y),
      );
    }
    geometry.computeVertexNormals();
    return geometry;
  }
  mesh(panel());
  const back = mesh(panel());
  back.rotation.y = Math.PI;
  for (const side of [-1, 1]) {
    const geometry = new THREE.PlaneGeometry(0.72, 2.5, 16, 50);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getX(i),
        y = pos.getY(i);
      pos.setXYZ(
        i,
        side *
          (1.23 * (1 + (0.015 * y) / 1.25) -
            0.065 * Math.sin((z / 0.72 + 0.5) * Math.PI)),
        y,
        z,
      );
    }
    geometry.computeVertexNormals();
    mesh(geometry);
  }
  const base = mesh(new THREE.BoxGeometry(2.42, 0.03, 0.71));
  base.position.y = -1.24;
  function seam(points: THREE.Vector3[], radius = 0.005) {
    return mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        Math.max(16, points.length * 3),
        radius,
        5,
        false,
      ),
      seamMaterial,
    );
  }
  for (const face of [-1, 1]) {
    for (const x of [-1.205, 1.205]) {
      const pts = [];
      for (let j = 0; j <= 30; j++) {
        const y = -1.23 + (j * 2.46) / 30;
        pts.push(
          new THREE.Vector3(
            x * (1 + (0.015 * y) / 1.25),
            y,
            face * (depth(x, y) + 0.004),
          ),
        );
      }
      seam(pts);
    }
    for (const y of [-1.21, 1.2]) {
      const pts = [];
      for (let j = 0; j <= 32; j++) {
        const x = -1.21 + (j * 2.42) / 32;
        pts.push(
          new THREE.Vector3(
            x,
            y - 0.03 * Math.cos(x * 1.22) * (y > 0 ? 1 : 0),
            face * (depth(x, y) + 0.006),
          ),
        );
      }
      seam(pts);
    }
    // Wide fabric ribbons with a genuine opening between the handles.
    const positions: number[] = [],
      uvs: number[] = [],
      indices: number[] = [];
    const edges: THREE.Vector3[][] = [[], []];
    for (let i = 0; i <= 64; i++) {
      const t = (i / 64) * Math.PI;
      const x = -0.6 * Math.cos(t),
        y = 1.05 + 1.27 * Math.sin(t),
        z = face * (0.31 + 0.085 * Math.sin(t));
      const dx = 0.6 * Math.sin(t),
        dy = 1.27 * Math.cos(t),
        length = Math.hypot(dx, dy);
      for (const side of [-1, 1]) {
        const px = x + side * (-dy / length) * 0.085,
          py = y + side * (dx / length) * 0.085;
        positions.push(px, py, z);
        uvs.push((side + 1) / 2, i / 64);
        edges[(side + 1) / 2].push(new THREE.Vector3(px, py, z + face * 0.003));
      }
      if (i < 64) {
        const n = i * 2;
        indices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
      }
    }
    const handle = new THREE.BufferGeometry();
    handle.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    handle.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    handle.setIndex(indices);
    handle.computeVertexNormals();
    mesh(handle);
    edges.forEach((points) => seam(points, 0.0035));
    for (const x of [-0.6, 0.6]) {
      const patch = mesh(new THREE.BoxGeometry(0.19, 0.23, 0.012));
      patch.position.set(x, 1.025, face * (depth(x, 1.025) + 0.012));
      const z = face * (depth(x, 1.025) + 0.021);
      seam(
        [
          new THREE.Vector3(x - 0.07, 0.94, z),
          new THREE.Vector3(x + 0.07, 1.1, z),
        ],
        0.003,
      );
      seam(
        [
          new THREE.Vector3(x + 0.07, 0.94, z),
          new THREE.Vector3(x - 0.07, 1.1, z),
        ],
        0.003,
      );
    }
  }
  const printCanvas = document.createElement("canvas");
  printCanvas.width = printCanvas.height = 1024;
  const printTexture = new THREE.CanvasTexture(printCanvas);
  printTexture.colorSpace = THREE.SRGBColorSpace;
  textures.add(printTexture);
  const inkMaterial = new THREE.MeshStandardMaterial({
    map: printTexture,
    transparent: true,
    alphaTest: 0.04,
    depthWrite: false,
    roughness: 0.96,
    side: THREE.FrontSide,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
  materials.add(inkMaterial);
  for (const face of [-1, 1]) {
    const art = mesh(panel(), inkMaterial);
    art.rotation.y = face < 0 ? Math.PI : 0;
    art.position.z = face * 0.009;
    art.castShadow = false;
  }
  let brand = "YOUR\nBRAND",
    currentHex = "#d8c99f";
  function updatePrint() {
    const ctx = printCanvas.getContext("2d")!;
    ctx.clearRect(0, 0, 1024, 1024);
    const c = new THREE.Color(currentHex);
    const light = c.r * 0.2126 + c.g * 0.7152 + c.b * 0.0722;
    ctx.fillStyle = light > 0.35 ? "#12313b" : "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const lines = brand.trim().split("\n").slice(0, 3);
    ctx.font = "700 94px Arial, sans-serif";
    const max = Math.max(
      ...lines.map((line) => ctx.measureText(line).width),
      1,
    );
    const size = Math.min(94, (700 / max) * 94);
    ctx.font = `700 ${size}px Arial, sans-serif`;
    lines.forEach((line, index) =>
      ctx.fillText(
        line,
        512,
        500 + (index - (lines.length - 1) / 2) * size * 1.14,
      ),
    );
    printTexture.needsUpdate = true;
  }
  updatePrint();

  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 256;
  const shadowContext = shadowCanvas.getContext("2d")!;
  const shadowGradient = shadowContext.createRadialGradient(
    128,
    128,
    15,
    128,
    128,
    125,
  );
  shadowGradient.addColorStop(0, "rgba(0,0,0,.36)");
  shadowGradient.addColorStop(0.5, "rgba(0,0,0,.16)");
  shadowGradient.addColorStop(1, "rgba(0,0,0,0)");
  shadowContext.fillStyle = shadowGradient;
  shadowContext.fillRect(0, 0, 256, 256);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  textures.add(shadowTexture);
  const floorMaterial = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    depthWrite: false,
  });
  materials.add(floorMaterial);
  const floorGeo = new THREE.PlaneGeometry(4.8, 3.5);
  geometries.add(floorGeo);
  const floor = new THREE.Mesh(floorGeo, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.38;
  scene.add(floor);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x72a58e,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  });
  materials.add(ringMaterial);
  for (const radius of [1.75, 2.25]) {
    const geometry = new THREE.RingGeometry(radius, radius + 0.012, 100);
    geometries.add(geometry);
    const ring = new THREE.Mesh(geometry, ringMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -1.37;
    scene.add(ring);
  }
  const parts = bag.children
    .filter((object): object is THREE.Mesh => object instanceof THREE.Mesh)
    .map((object) => {
      object.geometry.computeBoundingBox();
      const center = object.geometry
        .boundingBox!.getCenter(new THREE.Vector3())
        .applyEuler(object.rotation)
        .add(object.position);
      const direction =
        center.y > 1.3
          ? new THREE.Vector3(0, 0.68, 0)
          : Math.abs(center.z) > 0.2
            ? new THREE.Vector3(0, 0, Math.sign(center.z) * 0.68)
            : center.y < -1.1
              ? new THREE.Vector3(0, -0.3, 0)
              : new THREE.Vector3(Math.sign(center.x) * 0.4, 0, 0);
      return { object, origin: object.position.clone(), direction };
    });
  let exploded = 0,
    explodeTarget = 0;
  let settling = 40,
    drawing = false;
  let alive = true,
    visible = true,
    frame = 0,
    last = 0,
    elapsed = 0,
    raf = 0;
  const clockMotion = () => !reduced.matches && controls.autoRotate;
  function draw(time: number) {
    raf = 0;
    if (!alive || !visible || document.hidden) return;
    const dt = Math.min((time - last) / 1000 || 0, 0.05);
    last = time;
    elapsed += dt;
    exploded += (explodeTarget - exploded) * (reduced.matches ? 1 : 0.075);
    parts.forEach(({ object, origin, direction }) =>
      object.position.copy(origin).addScaledVector(direction, exploded),
    );
    bag.scale.setScalar(1 - exploded * 0.14);
    host.dataset.construction = exploded > 0.5 ? "open" : "closed";
    material.color.lerp(targetColor, 0.11);
    seamMaterial.color.lerp(targetSeam, 0.11);
    bag.position.y =
      -0.1 + (clockMotion() ? Math.sin(elapsed * 0.7) * 0.035 : 0);
    drawing = true;
    controls.update(dt);
    renderer.render(scene, camera);
    drawing = false;
    host.dataset.frame = String(++frame);
    host.dataset.angle = controls.getAzimuthalAngle().toFixed(3);
    const colorPending =
      Math.abs(material.color.r - targetColor.r) +
        Math.abs(material.color.g - targetColor.g) +
        Math.abs(material.color.b - targetColor.b) >
      0.002;
    if (
      controls.autoRotate ||
      Math.abs(explodeTarget - exploded) > 0.001 ||
      colorPending ||
      settling-- > 0
    )
      raf = requestAnimationFrame(draw);
  }
  function wake() {
    if (drawing) return;
    settling = 40;
    if (alive && visible && !document.hidden && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(draw);
    }
  }
  controls.addEventListener("change", wake);
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
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
  const reducedChange = () => {
    if (reduced.matches) {
      controls.autoRotate = false;
      onInteract();
    }
    wake();
  };
  reduced.addEventListener("change", reducedChange);
  const lost = (event: Event) => {
    event.preventDefault();
    host.dataset.ready = "fallback";
    cancelAnimationFrame(raf);
    raf = 0;
    onInteract();
  };
  canvas.addEventListener("webglcontextlost", lost);
  const restore = () => {
    host.dataset.ready = "true";
    wake();
  };
  canvas.addEventListener("webglcontextrestored", restore);
  host.dataset.ready = "true";
  wake();
  return {
    color(hex) {
      currentHex = hex;
      targetColor.set(hex);
      targetSeam.set(hex).multiplyScalar(0.83);
      updatePrint();
      wake();
    },
    text(value) {
      brand = value;
      updatePrint();
      wake();
    },
    playing(value) {
      controls.autoRotate = value;
      wake();
    },
    construction(value) {
      explodeTarget = value ? 1 : 0;
      wake();
    },
    view(side) {
      controls.autoRotate = false;
      const pos =
        side === "front"
          ? [0, 1.15, 8.1]
          : side === "back"
            ? [0, 1.15, -8.1]
            : [3.4, 1.8, 7.5];
      camera.position.set(...(pos as [number, number, number]));
      controls.update();
      wake();
    },
    rotate(direction) {
      controls.autoRotate = false;
      camera.position
        .sub(controls.target)
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), (direction * Math.PI) / 8)
        .add(controls.target);
      controls.update();
      wake();
    },
    visible(value) {
      visible = value;
      if (!value) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else wake();
    },
    dispose() {
      alive = false;
      cancelAnimationFrame(raf);
      resize.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", reducedChange);
      canvas.removeEventListener("webglcontextlost", lost);
      canvas.removeEventListener("webglcontextrestored", restore);
      controls.removeEventListener("start", start);
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
