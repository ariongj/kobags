/**
 * Non-woven geometry/materials adapted from the owner's supplied studio:
 * https://ariongj.github.io/mo/ (retrieved 2026-11-08).
 * No remote scripts, fonts, sample brands or sample stock specifications are used.
 * The host supplies the catalogue dimensions and the existing canonical artwork.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { logicalFace } from './studio-projection';

export function createNonwovenModel(renderer) {
const CM = 0.01, FAB_TILE = 1.04;
const TYPES = {
  box: { gusset: 'side', handles: 'loop', hem: 3.2, fill: .28 },
  handle: { gusset: 'bottom', handles: 'loop', hem: 3, close: .35, fill: .12 },
  dcut: { gusset: 'bottom', handles: 'dcut', hem: 0, close: .85, fill: .08 },
  tshirt: { gusset: 'side', handles: 'tshirt', hem: 0, fill: .15 },
  string: { gusset: 'bottom', handles: 'string', hem: 2, close: .45, fill: .12 },
};
let state = { type: 'box', W: 33, H: 25, D: 12, hem: 3.2, drop: 12, full: .28, pose: 'upright', strap: 'fabric', bag: '#d9cba6', handle: 'match' };
let product = 'box-bag';
let dirty = true;
// Stable material detail across edits, snapshots and reloads.
let seed = 73471;
const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
const smooth = (e0, e1, x) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
function hash(x, y, s) { const h = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return h - Math.floor(h); }
function vnoise(x, y, s) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
  return (a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v) * 2 - 1;
}
const fbm = (x, y, s) => vnoise(x, y, s) * 0.6 + vnoise(x * 2.1, y * 2.1, s + 3) * 0.3 + vnoise(x * 4.3, y * 4.3, s + 7) * 0.1;

// ---------------- flat layout of the bag pieces (cm) ----------------
// One texture atlas holds every panel: [left gusset][front][right gusset][back] across, bottom under the front.
function layout() {
  const { W, H, D } = state, g = 2;
  const left = [g, g, D, H], front = [2 * g + D, g, W, H], right = [3 * g + D + W, g, D, H], back = [4 * g + 2 * D + W, g, W, H];
  const bottom = [front[0], 2 * g + H, W, D];
  return { left, front, right, back, bottom, AW: 5 * g + 2 * D + 2 * W, AH: 3 * g + H + D };
}
let L = layout();

// ---------------- bag body geometry ----------------
// The side gusset folds inward along its centre crease, more toward the top and less when the bag is full.
// Bottom-gusset bags (handle, D-cut, string) have no side gusset: the sides pinch into a welded seam above the base.
function profile(y) {
  const T = TYPES[state.type], g = state.D / 2, H = state.H;
  if (T.gusset === 'bottom') return { d: g * (1 - smooth(0, gussetTop(), y)), s: 0 };
  const y0 = Math.min(g, H * 0.45);
  let fold = (T.topFold ?? 0.82 - 0.6 * state.full) * Math.pow(smooth(y0, H, y), T.foldPow ?? 1.4);
  if (T.handles === 'tshirt') {
    // a T-shirt bag is a flat folded tube: sealed flat across the bottom, a little open in the body, flat in the handles
    const yb = tshirtCut().yb, open = (0.5 + 3 * state.full) * smooth(0, H * 0.18, y) * (1 - smooth(H * 0.3, yb - 1, y));
    const d = 0.12 + Math.min(open, g * 0.9);
    return { d, s: Math.sqrt(Math.max(g * g - d * d, 0)) };
  }
  const s = g * Math.min(fold, 1);
  return { d: Math.max(Math.sqrt(Math.max(g * g - s * s, 0)), 0.12), s };   // never closer than the fabric layers' thickness
}
// Height at which a bottom gusset has closed into the side seam.
function gussetTop() { return Math.min(state.H * 0.5, Math.max(state.D * 1.25, 2)); }
// T-shirt bag: the centre of the top is cut away, leaving a handle of width hw on each side.
function tshirtCut() {
  const { W, H, D } = state;
  const hw = Math.min(W * 0.4, Math.max(D / 2 + 0.8, W * 0.29)), c = W / 2 - hw;
  return { hw, c, yb: H * 0.73, r: Math.min(c * 0.35, 2.5) };   // cut: |x| < c above height yb, corners rounded with radius r
}
// D-cut bag: a rounded slot near the top of both panels, inside a welded reinforcement patch.
function dcutHole() {
  const { W } = state;
  if (state.type === 'bottle') return { w: W * 0.5, h: 2.4, top: 2.2, pad: 1 };   // the bottle bag's slot is small and close to the top
  return { w: Math.min(9, W * 0.62), h: 3, top: 2.6, pad: 1.4 };
}
function panelZ(x, y, seed) {
  const { W, H, hem, full } = state, T = TYPES[state.type];
  const ex = 1 - Math.pow(2 * x / W, 2), ey = Math.sin(Math.PI * Math.min(1, Math.max(0, y / H)));
  const edge = smooth(0, 1.4, W / 2 - Math.abs(x));             // keeps the seam with the gusset closed
  // T-shirt handles are flat strips: no bulge or buckle from the handle base up
  const flat = T.handles === 'tshirt' ? 1 - smooth(tshirtCut().yb - 5, tshirtCut().yb - 0.5, y) : 1;
  const bulge = (0.12 + 1.3 * full) * ex * Math.pow(ey, 0.8) * flat;
  // soft buckling: long, mostly vertical waves plus small surface wrinkles
  const buckle = ((0.3 - 0.18 * full) * fbm(x * 0.15, y * 0.07, seed) * ex * ey
               + 0.035 * fbm(x * 0.7, y * 0.5, seed + 20) * ex * ey) * flat;
  // bags ship folded flat: the bottom folds up at the gusset's half-depth and leaves a soft pressed line across the panel
  const fy = Math.min(state.D / 2, H * 0.45), pressed = T.gusset === 'side' && T.handles !== 'tshirt' ? -0.07 * Math.exp(-(((y - fy) / 0.3) ** 2)) * ex : 0;
  // the folded gusset drags the top corners in, leaving a diagonal crease on each side
  let crease = 0;
  const Lc = Math.min(H * 0.42, 11), dl = Math.hypot(0.5, 1);
  for (const sx of [-1, 1]) {
    const dx = -sx * 0.5 / dl, dy = -1 / dl, px = x - sx * W / 2, py = y - (H - 0.4);
    const t = px * dx + py * dy;
    if (t > 0 && t < Lc) { const perp = px * -dy + py * dx; crease -= 0.24 * (1 - 0.7 * full) * Math.exp(-((perp / 0.8) ** 2)) * Math.sin(Math.PI * t / Lc); }
  }
  // folded hem is two layers thick; on the string bag it is a cord channel, so it puffs out more
  const hemStep = hem > 0 ? (T.handles === 'string' ? 0.22 : 0.05) * smooth(H - hem - 0.06, H - hem + 0.06, y) : 0;
  if (T.gusset === 'bottom') {
    // the base holds the panel out across its width while the side edges pinch in; the mouth stays a little open
    const gw = profile(y).d, g = state.D / 2, exs = Math.pow(Math.max(ex, 0), 0.6);
    const open = (0.3 + 2 * full) * exs * smooth(0, 3, y) * (0.5 + 0.5 * ey);
    // D-cut and string bags close toward the top (held by the slot, cinched by the cord); handle bags only a little
    const closing = 1 - (T.close || 0) * (1 - 0.5 * full) * smooth(H * 0.45, H, y);
    return (gw + (g - gw) * exs + open) * closing + 0.1 * exs * smooth(0, 3, y) + buckle + hemStep * edge + (T.handles === 'string' ? .11 * Math.sin(x*2.7 + seed) * smooth(H-hem-2,H,y) * edge : 0);
  }
  return profile(y).d + bulge + buckle + pressed + ((T.handles === 'tshirt' ? 0 : crease) + hemStep) * edge;
}

function grid(nu, nv, f, hint) {
  const n = (nu + 1) * (nv + 1);
  const pos = new Float32Array(n * 3), uv = new Float32Array(n * 2), uv1 = new Float32Array(n * 2), col = new Float32Array(n * 3);
  let k = 0;
  for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++, k++) {
    const r = f(i / nu, j / nv);
    pos[k * 3] = r.p[0] * CM; pos[k * 3 + 1] = r.p[1] * CM; pos[k * 3 + 2] = r.p[2] * CM;
    uv[k * 2] = r.a[0] / L.AW; uv[k * 2 + 1] = 1 - r.a[1] / L.AH;
    uv1[k * 2] = r.a[0] / FAB_TILE; uv1[k * 2 + 1] = -r.a[1] / FAB_TILE;
    // fake occlusion for the inside of the bag: darker toward the bottom
    const ao = 0.5 + 0.5 * Math.pow(Math.min(1, Math.max(0, r.p[1] / state.H)), 0.75);
    col[k * 3] = col[k * 3 + 1] = col[k * 3 + 2] = ao;
  }
  const idx = [];
  const same = (p, q) => Math.abs(pos[p * 3] - pos[q * 3]) + Math.abs(pos[p * 3 + 1] - pos[q * 3 + 1]) + Math.abs(pos[p * 3 + 2] - pos[q * 3 + 2]) < 1e-9;
  const tri = (p, q, r) => { if (!same(p, q) && !same(q, r) && !same(r, p)) idx.push(p, q, r); };   // skip zero-area triangles where a gusset closes to a point
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1;
    tri(a, b, d); tri(a, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('uv1', new THREE.BufferAttribute(uv1, 2));
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  // make every piece face outward
  const nrm = g.getAttribute('normal'), ci = Math.floor(nv / 2) * (nu + 1) + Math.floor(nu / 2);
  if (nrm.getX(ci) * hint[0] + nrm.getY(ci) * hint[1] + nrm.getZ(ci) * hint[2] < 0) {
    for (let t = 0; t < idx.length; t += 3) { const tmp = idx[t + 1]; idx[t + 1] = idx[t + 2]; idx[t + 2] = tmp; }
    g.setIndex(idx); g.computeVertexNormals();
  }
  return g;
}

function buildBody() {
  const { W, H, D } = state, g = D / 2, NV = 80;
  const parts = [];
  parts.push(grid(80, NV, (u, v) => { const x = -W / 2 + u * W, y = v * H; return { p: [x, y, panelZ(x, y, 1)], a: [L.front[0] + u * W, L.front[1] + (1 - v) * H] }; }, [0, 0, 1]));
  parts.push(grid(80, NV, (u, v) => { const x = W / 2 - u * W, y = v * H; return { p: [x, y, -panelZ(x, y, 2)], a: [L.back[0] + u * W, L.back[1] + (1 - v) * H] }; }, [0, 0, -1]));
  // Every seam uses the same vertices on both sides (no T-junctions, so no hairline cracks):
  // gussets share the panels' rows, the base shares the panels' columns and the gussets' columns.
  // A bottom gusset stops on the first panel row where it has closed, instead of collapsing to zero width up to the top.
  const NG = TYPES[state.type].gusset === 'bottom' ? Math.min(NV, Math.ceil(gussetTop() / (H / NV))) : NV;
  if (D >= 0.5) for (const sx of [1, -1]) for (const half of ['f', 'b']) {
    const R = sx > 0 ? L.right : L.left;
    parts.push(grid(16, NG, (u, v) => {
      const y = v * NG * H / NV, { d, s } = profile(y);
      // u: panel edge -> crease; each half bows out a little and carries its own small wrinkles
      const bow = ((0.12 + 0.35 * state.full) * (1 - 0.6 * s / g) * Math.sin(Math.PI * u)
                + 0.06 * fbm(u * 3, y * 0.3, sx * 3 + (half === 'f' ? 1 : 2)) * Math.sin(Math.PI * u)) * (d / g) * smooth(0, 2.5, y);
      const p = [sx * (W / 2 - s * u + bow), y, (half === 'f' ? d : -d) * (1 - u)];
      const fromFront = half === 'f' ? u * g : D - u * g;
      return { p, a: [R[0] + (sx > 0 ? fromFront : D - fromFront), R[1] + H - y] };
    }, [sx, 0, 0]));
  }
  // the base: a box bottom, or for T-shirt bags just the thin sealed strip where front and back meet
  const bz = TYPES[state.type].handles === 'tshirt' ? profile(0).d : g;
  if (D >= 0.5) parts.push(grid(80, TYPES[state.type].handles === 'tshirt' ? 2 : 32, (u, v) => ({ p: [-W / 2 + u * W, 0, bz - v * 2 * bz], a: [L.bottom[0] + u * W, L.bottom[1] + v * D] }), [0, -1, 0]));
  return mergeAndDispose(parts);
}

// ---------------- handle (webbing strap) geometry ----------------
// The strap is welded flat inside the hem, rises, and twists a quarter turn so it lies flat across the top of the loop.
// Half the distance between the two ends of one handle: about 12 cm apart on the larger bags, as on the real ones.
function handleSpan() { return Math.min(0.28 * state.W, state.W / 2 - 2, 6.2); }
function buildStrap(side) {
  const { W, H, hem, drop } = state, a = handleSpan(), fabric = state.strap !== 'webbing';
  const sw = 2.5, ht = fabric ? 0.075 : 0.06;   // a folded non-woven strip is a little thicker than woven webbing
  // Relaxed: the strap bends where it leaves the hem and the loop falls outward, the back one a bit further.
  const tilt = state.pose === 'relaxed' ? (side > 0 ? 0.62 : 0.85) : 0.1;
  const zIn = y => side * (panelZ(a, Math.min(y, H), side > 0 ? 1 : 2) - 0.10);
  const P = (x, y) => {
    if (y <= H) return new THREE.Vector3(x, y, zIn(y));
    const h = y - H, f = tilt * Math.pow(Math.min(1, h / drop), 0.75);   // keeps bending along its length, like a soft strap
    return new THREE.Vector3(x, H + h * Math.cos(f), zIn(H) + side * h * Math.sin(f));
  };
  const yIn = H - hem + 0.45;
  // upright (as when the bag is picked up): legs rise nearly parallel into a rounded top; relaxed: the loop spreads a little as it falls
  const out = state.pose === 'relaxed' ? 0.6 : 0, sh = state.pose === 'relaxed' ? 0.74 : 0.88;
  const curve = new THREE.CatmullRomCurve3([
    P(-a, yIn), P(-a, H - 0.3), P(-a - out, H + 0.3 * drop), P(-a * sh, H + 0.84 * drop), P(0, H + drop),
    P(a * sh, H + 0.84 * drop), P(a + out, H + 0.3 * drop), P(a, H - 0.3), P(a, yIn),
  ], false, 'centripetal');
  const N = 200, pts = curve.getSpacedPoints(N), K = 14;
  const N0 = new THREE.Vector3(0, -Math.sin(tilt), side * Math.cos(tilt));
  // cross-section: a flat strip with rounded edges; the ring starts mid-face so its seam sits on a flat part
  const ring = [];
  for (let k = 0; k <= K; k++) {
    const t = Math.PI / 2 + k / K * Math.PI * 2, c = Math.cos(t), sn = Math.sin(t);
    ring.push([Math.sign(c) * Math.abs(c) ** 0.35, Math.sign(sn) * Math.abs(sn) ** 0.7]);
  }
  const pos = [], nor = [], uv = [], uv1 = [], idx = [];
  const T = new THREE.Vector3(), Pp = new THREE.Vector3(), Np = new THREE.Vector3(), Wv = new THREE.Vector3(), Nn = new THREE.Vector3();
  let len = 0;
  for (let i = 0; i <= N; i++) {
    const p = pts[i];
    T.subVectors(pts[Math.min(N, i + 1)], pts[Math.max(0, i - 1)]).normalize();
    if (i > 0) len += p.distanceTo(pts[i - 1]);
    Pp.crossVectors(N0, T).normalize();
    Np.copy(N0).addScaledVector(T, -N0.dot(T)).normalize();
    const out = p.y > H ? Math.hypot(p.y - H, p.z - zIn(H)) : 0;   // distance travelled since leaving the hem
    const th = 0.2 * Math.sin(out * 0.32 + side * 1.7) * smooth(0.08, 0.45, out / drop);   // a soft strap turns a little; it does not twist over
    Wv.copy(Pp).multiplyScalar(Math.cos(th)).addScaledVector(Np, Math.sin(th));
    Nn.crossVectors(T, Wv).normalize();
    for (const [rx, ry] of ring) {
      pos.push((p.x + Wv.x * rx * sw / 2 + Nn.x * ry * ht) * CM, (p.y + Wv.y * rx * sw / 2 + Nn.y * ry * ht) * CM, (p.z + Wv.z * rx * sw / 2 + Nn.z * ry * ht) * CM);
      uv.push(len, (rx + 1) / 2);
      uv1.push(len / FAB_TILE, (rx * sw / 2 + (ry < 0 ? sw : 0)) / FAB_TILE);
    }
    if (i < N) for (let k = 0; k < K; k++) { const b = i * (K + 1) + k, c = b + K + 1; idx.push(b, c, b + 1, b + 1, c, c + 1); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('uv1', new THREE.Float32BufferAttribute(uv1, 2));
  g.setIndex(idx);
  g.computeVertexNormals();   // normals follow the winding, so both sides light correctly with DoubleSide
  return g;
}

// ---------------- top rim ----------------
// The top edge is a fold of two fabric layers, so it gets a thin rounded rim instead of a zero-thickness edge.
function buildRim() {
  const { W, H, D } = state, T = TYPES[state.type];
  const yT = H - 0.02, { d, s } = profile(yT), side = T.gusset === 'side' && D >= 0.5;
  // one open tube per edge, so the sharp corners where edges meet stay sharp instead of looping
  const edges = [[], []];
  for (let i = 0; i <= 60; i++) { const x = -W / 2 + W * i / 60; edges[0].push([x, yT, panelZ(x, yT, 1)]); edges[1].push([x, yT, -panelZ(x, yT, 2)]); }
  if (side) for (const sx of [1, -1]) for (const zs of [1, -1]) {
    const e = []; for (let i = 0; i <= 8; i++) { const u = i / 8; e.push([sx * (W / 2 - s * u), yT, zs * d * (1 - u)]); }
    edges.push(e);
  }
  return mergeAndDispose(edges.map(e => {
    const c = new THREE.CatmullRomCurve3(e.map(([x, y, z]) => new THREE.Vector3(x * CM, y * CM, z * CM)), false, 'centripetal');
    return new THREE.TubeGeometry(c, e.length * 2, 0.065 * CM, 6, false);
  }));
}

// The supplied Nov 8 videos show a drawstring shopping pouch: thin loops exit
// the top channel, with no backpack straps or anchored bottom-corner knots.
function buildCord(sx) {
  const { W, H, hem } = state;
  const x = sx * (W / 2 - .35), y = H - hem * .55;
  const zf = panelZ(x, y, 1), zb = -panelZ(x, y, 2);
  const pts = [[x,y,zf],[sx*(W/2+1),H+1.2,zf+.1],[sx*(W/2+3.4),H+5.8,.45],
    [sx*(W/2+4.1),H+6.4,0],[sx*(W/2+3.2),H+5.3,-.4],[sx*(W/2+1),H+.8,zb-.1],[x,y,zb]];
  const curve = new THREE.CatmullRomCurve3(pts.map(([a,b,c])=>new THREE.Vector3(a*CM,b*CM,c*CM)),false,'centripetal');
  const geometry = new THREE.TubeGeometry(curve,100,.085*CM,8,false);
  const uv=geometry.getAttribute('uv'),length=curve.getLength()/CM;
  for(let i=0;i<uv.count;i++) uv.setX(i,uv.getX(i)*length);
  return geometry;
}

// ---------------- procedural textures ----------------
function normalFromHeight(h, w, hh, strength) {
  const c = document.createElement('canvas'); c.width = w; c.height = hh;
  const ctx = c.getContext('2d'), img = ctx.createImageData(w, hh);
  for (let y = 0; y < hh; y++) for (let x = 0; x < w; x++) {
    const dx = (h[y * w + (x + 1) % w] - h[y * w + (x - 1 + w) % w]) * strength;
    const dy = (h[((y + 1) % hh) * w + x] - h[((y - 1 + hh) % hh) * w + x]) * strength;
    const l = Math.hypot(dx, dy, 1), i = (y * w + x) * 4;
    img.data[i] = (-dx / l * 0.5 + 0.5) * 255; img.data[i + 1] = (dy / l * 0.5 + 0.5) * 255; img.data[i + 2] = (1 / l * 0.5 + 0.5) * 255; img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}
// Spunbond emboss: staggered oval dots on a ~1.3 mm pitch, plus fibre noise.
function fabricNormal() {
  // 7 x 8 staggered dots: row pitch / column pitch = 0.875, close to a true hexagonal grid, and an even row count tiles seamlessly
  const S = 256, h = new Float32Array(S * S), cols = 7, rows = 8, px = S / cols, py = S / rows;
  const rx = px * 0.26, ry = rx;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    let v = 0;
    for (let r = -1; r <= rows; r++) {
      const cy = (r + 0.5) * py, off = (r & 1) ? px / 2 : 0;
      if (Math.abs(y - cy) > py) continue;
      for (let q = -1; q <= cols; q++) {
        const cx = (q + 0.5) * px + off;
        const dx = (x - cx) / rx, dy = (y - cy) / ry;
        v -= Math.exp(-(dx * dx + dy * dy));
      }
    }
    h[y * S + x] = v + (random() - 0.5) * 0.35;
  }
  const t = new THREE.CanvasTexture(normalFromHeight(h, S, S, 1.6));
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.channel = 1; t.anisotropy = aniso;
  return t;
}
// Woven PP webbing: twill ribs, herringbone across the width, tighter selvedge at both edges.
function webbing() {
  const w = 64, hh = 160, h = new Float32Array(w * hh);
  const col = document.createElement('canvas'); col.width = w; col.height = hh;
  const ctx = col.getContext('2d'), img = ctx.createImageData(w, hh);
  for (let y = 0; y < hh; y++) for (let x = 0; x < w; x++) {
    const edge = y < 9 || y > hh - 10;
    const dir = y < hh / 2 ? 1 : -1;
    const v = edge ? 0.5 + 0.5 * Math.sin(2 * Math.PI * x / w * 12) : 0.5 + 0.5 * Math.sin(2 * Math.PI * (x / w * 7 + dir * y / hh * 14));
    h[y * w + x] = v + (random() - 0.5) * 0.15;
    const c = (0.78 + 0.22 * v) * 255, i = (y * w + x) * 4;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = c; img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const map = new THREE.CanvasTexture(col); map.colorSpace = THREE.SRGBColorSpace;
  const nm = new THREE.CanvasTexture(normalFromHeight(h, w, hh, 1.2));
  for (const t of [map, nm]) { t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.ClampToEdgeWrapping; t.anisotropy = aniso; }
  return { map, nm };
}
// Spunbond fabric is a web of fine continuous filaments: thousands of faint short strokes, tiled.
function fibreCanvas() {
  const S = 512, c = document.createElement('canvas'); c.width = c.height = S;
  const x = c.getContext('2d'); x.fillStyle = '#808080'; x.fillRect(0, 0, S, S);
  x.lineWidth = 1; x.lineCap = 'round';
  for (let i = 0; i < 9000; i++) {
    const px = random() * S, py = random() * S, a = random() * Math.PI * 2, l = 6 + random() * 26, bend = (random() - 0.5) * 0.9;
    x.strokeStyle = random() < 0.5 ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)';
    x.beginPath();
    for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]) {   // wrap so the tile repeats seamlessly
      x.moveTo(px + ox, py + oy);
      x.quadraticCurveTo(px + ox + Math.cos(a + bend) * l / 2, py + oy + Math.sin(a + bend) * l / 2, px + ox + Math.cos(a) * l, py + oy + Math.sin(a) * l);
    }
    x.stroke();
  }
  return c;
}
function mottleCanvas() {
  const S = 256, c = document.createElement('canvas'); c.width = c.height = S;
  const ctx = c.getContext('2d'), img = ctx.createImageData(S, S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const v = 128 + 70 * (vnoise(x / 16, y / 16, 11) * 0.5 + vnoise(x / 4, y / 4, 5) * 0.5), i = (y * S + x) * 4;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

// ---------------- artwork atlas ----------------
const atlas = document.createElement('canvas');
const atlasTex = new THREE.CanvasTexture(atlas);
atlasTex.colorSpace = THREE.SRGBColorSpace;
atlasTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
const mottle = mottleCanvas();

function weldColour(hex) {
  const c = new THREE.Color(hex), lum = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  const k = lum < 0.08 ? 1.7 : 0.78;
  const r = Math.min(1, c.r * k + (lum < 0.08 ? 0.03 : 0)), g = Math.min(1, c.g * k + (lum < 0.08 ? 0.03 : 0)), b = Math.min(1, c.b * k + (lum < 0.08 ? 0.03 : 0));
  return `rgb(${r * 255 | 0},${g * 255 | 0},${b * 255 | 0})`;
}

// Ultrasonic weld: a row of short ticks across the seam line.
function weldLine(ctx, PX, x1, y1, x2, y2) {
  const len = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / len, uy = (y2 - y1) / len, nx = -uy, ny = ux;
  const pitch = 0.19, tick = 0.3;
  ctx.beginPath();
  for (let s = pitch / 2; s < len; s += pitch) {
    const cx = x1 + ux * s, cy = y1 + uy * s;
    ctx.moveTo((cx - nx * tick / 2) * PX, (cy - ny * tick / 2) * PX);
    ctx.lineTo((cx + nx * tick / 2) * PX, (cy + ny * tick / 2) * PX);
  }
  ctx.lineWidth = 0.055 * PX; ctx.stroke();
  const ga = ctx.globalAlpha; ctx.globalAlpha = ga * 0.35; ctx.beginPath(); ctx.moveTo(x1 * PX, y1 * PX); ctx.lineTo(x2 * PX, y2 * PX); ctx.lineWidth = 0.03 * PX; ctx.stroke(); ctx.globalAlpha = ga;
}

// Handle weld square: sunburst border of ticks around an embossed flower.
function weldSquare(ctx, PX, cx, cy, size) {
  const h = size / 2, tl = size * 0.16;
  ctx.lineWidth = 0.05 * PX; ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const t = -h * 0.6 + i * (size * 0.6 / 5);
    for (const [sx, sy, dx, dy] of [[t, -h, 0, 1], [t, h, 0, -1], [-h, t, 1, 0], [h, t, -1, 0]]) {
      ctx.moveTo((cx + sx) * PX, (cy + sy) * PX); ctx.lineTo((cx + sx + dx * tl) * PX, (cy + sy + dy * tl) * PX);
    }
  }
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    ctx.moveTo((cx + sx * h) * PX, (cy + sy * h) * PX); ctx.lineTo((cx + sx * h * 0.72) * PX, (cy + sy * h * 0.72) * PX);
  }
  ctx.stroke();
  const r = size * 0.24;
  ctx.beginPath(); ctx.arc(cx * PX, cy * PX, r * PX, 0, Math.PI * 2); ctx.lineWidth = 0.04 * PX; ctx.stroke();
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = i * Math.PI * 2 / 5 - Math.PI / 2;
    ctx.ellipse((cx + Math.cos(a) * r * 0.45) * PX, (cy + Math.sin(a) * r * 0.45) * PX, r * 0.42 * PX, r * 0.2 * PX, a, 0, Math.PI * 2);
  }
  ctx.lineWidth = 0.03 * PX; ctx.stroke();
}


function mergeAndDispose(parts) {
  const result = mergeGeometries(parts);
  parts.forEach(g => g.dispose());
  return result;
}
// One uniform artwork scale keeps circles, logos and QR codes undistorted.
// Coordinates stay compatible with existing drafts, the photo editor and exports.
function printFrame() {
  const face = logicalFace(product), height = face.width * state.H / state.W;
  return { x: face.x, y: face.y + (face.height - height) / 2, width: face.width, height };
}
let frontArt = null, backArt = null;
const baseCanvas = document.createElement('canvas');
function paintPrint(ctx, PX, R, art) {
  if (!art) return;
  const f = printFrame(), scale = state.W * PX / f.width;
  ctx.save();
  ctx.beginPath(); ctx.rect(R[0] * PX, R[1] * PX, state.W * PX, state.H * PX); ctx.clip();
  ctx.drawImage(art, R[0] * PX - f.x * scale, R[1] * PX - f.y * scale, 800 * scale, 800 * scale);
  ctx.restore();
}
function updatePrint() {
  const ctx = atlas.getContext('2d');
  ctx.clearRect(0, 0, atlas.width, atlas.height);
  ctx.drawImage(baseCanvas, 0, 0);
  paintPrint(ctx, PXa, L.front, frontArt); paintPrint(ctx, PXa, L.back, backArt);
  atlasTex.needsUpdate = true;
}
const bumpC = document.createElement('canvas'), roughC = document.createElement('canvas'), alphaC = document.createElement('canvas');
const bumpTex = new THREE.CanvasTexture(bumpC), roughTex = new THREE.CanvasTexture(roughC), alphaTex = new THREE.CanvasTexture(alphaC);
let alphaPixels = null;
const fibres = fibreCanvas();
const KRAFT = '#bd9665';
// Kraft non-woven: recycled-look flecks and darker fibres over the base colour.
const kraftFlecks = (() => {
  const S = 512, c = document.createElement('canvas'); c.width = c.height = S; const x = c.getContext('2d');
  x.fillStyle = '#fff'; x.fillRect(0, 0, S, S);
  for (let i = 0; i < 2600; i++) {
    const px = random() * S, py = random() * S, r = 0.4 + random() ** 3 * 2.2, t = 120 + random() * 90;
    x.fillStyle = `rgba(${t * 0.75 | 0},${t * 0.55 | 0},${t * 0.35 | 0},${0.35 + random() * 0.5})`;
    for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]) { x.beginPath(); x.ellipse(px + ox, py + oy, r, r * (0.4 + random() * 0.6), random() * 3, 0, Math.PI * 2); x.fill(); }
  }
  x.lineWidth = 0.8; x.strokeStyle = 'rgba(120,80,45,0.25)';
  for (let i = 0; i < 700; i++) { const px = random() * S, py = random() * S, a = random() * 6.3, l = 6 + random() * 18; x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.cos(a) * l, py + Math.sin(a) * l); x.stroke(); }
  return c;
})();

function weldRect(ctx, PX, x, y, w, h) {
  weldLine(ctx, PX, x, y, x + w, y); weldLine(ctx, PX, x + w, y, x + w, y + h);
  weldLine(ctx, PX, x + w, y + h, x, y + h); weldLine(ctx, PX, x, y + h, x, y);
}
function drawWelds(ctx, PX) {
  const { W, H, D, hem } = state, T = TYPES[state.type];
  const a = handleSpan(), sq = Math.min(2.2, hem * 0.72);
  for (const R of [L.front, L.back]) {
    const [x, y] = R;
    if (hem > 0) weldLine(ctx, PX, x, y + hem, x + W, y + hem);
    if (T.handles === 'loop') for (const sx of [-1, 1]) weldSquare(ctx, PX, x + W / 2 + sx * a, y + hem * 0.52, sq);
    if (T.gusset === 'bottom') { weldLine(ctx, PX, x + 0.5, y, x + 0.5, y + H); weldLine(ctx, PX, x + W - 0.5, y, x + W - 0.5, y + H); }
    if (T.handles === 'tshirt') {
      const t = tshirtCut();
      weldLine(ctx, PX, x, y + H - 1.1, x + W, y + H - 1.1);                        // bottom seal
      weldLine(ctx, PX, x, y + 0.9, x + t.hw, y + 0.9); weldLine(ctx, PX, x + W - t.hw, y + 0.9, x + W, y + 0.9);   // handle tops
    }
  }
  if (D >= 0.5) for (const R of [L.left, L.right]) {
    const [x, y] = R;
    if (T.gusset === 'side' && T.handles === 'tshirt') {
      // a T-shirt bag is one folded tube: no seams down the sides, only the seals across the handle tops and the bottom
      weldLine(ctx, PX, x, y + 0.9, x + D, y + 0.9); weldLine(ctx, PX, x, y + H - 1.1, x + D, y + H - 1.1);
    } else if (T.gusset === 'side') {
      // box and bottle bags: the gusset is welded to the front and back along both corners; its centre is only a fold
      const apexY = y + H - Math.min(D / 2, H * 0.45);
      if (hem > 0) weldLine(ctx, PX, x, y + hem, x + D, y + hem);
      weldLine(ctx, PX, x + 0.15, y + hem, x + 0.15, y + H); weldLine(ctx, PX, x + D - 0.15, y + hem, x + D - 0.15, y + H);
      weldLine(ctx, PX, x, apexY, x + D, apexY);
      weldLine(ctx, PX, x + D / 2, apexY, x, y + H);
      weldLine(ctx, PX, x + D / 2, apexY, x + D, y + H);
    } else {
      const yT = Math.min(H * 0.5, Math.max(D * 1.25, 2));
      weldLine(ctx, PX, x + D / 2, y + H - yT, x + D / 2, y + H);
    }
  }
  if (D >= 0.5 && T.handles !== 'tshirt') { const [x, y] = L.bottom; weldLine(ctx, PX, x + 0.4, y, x + 0.4, y + D); weldLine(ctx, PX, x + W - 0.4, y, x + W - 0.4, y + D); }

}
// Cut-outs (D-cut slot, T-shirt vest top) as an alpha mask: white keeps fabric, black removes it.
// Outline of the parts cut out of one panel whose top-left corner is (x, y) cm; the caller fills it.
function cutPath(ctx, PX, x, y) {
  const T = TYPES[state.type], { W, H } = state;
  ctx.beginPath();
  if (T.handles === 'dcut') { const o = dcutHole(); ctx.roundRect((x + W / 2 - o.w / 2) * PX, (y + o.top) * PX, o.w * PX, o.h * PX, o.h / 2 * PX); }
  if (T.handles === 'tshirt') {
    // the cut-out leaves a small rounded tab standing up in the middle, as on the real KOBAGS T-shirt bags
    const t = tshirtCut(), cx = x + W / 2, by = y + H - t.yb;
    const tw = t.c * 0.9, th = Math.min(2.4, H * 0.06), tr = Math.min(tw / 2, th) * 0.92, f = 0.35;
    const P = (px, py) => [px * PX, py * PX];
    ctx.moveTo(...P(cx - t.c, y - 1));
    ctx.arcTo(...P(cx - t.c, by), ...P(cx - tw / 2, by), t.r * PX);
    ctx.arcTo(...P(cx - tw / 2, by), ...P(cx - tw / 2, by - th), f * PX);
    ctx.arcTo(...P(cx - tw / 2, by - th), ...P(cx, by - th), tr * PX);
    ctx.arcTo(...P(cx + tw / 2, by - th), ...P(cx + tw / 2, by), tr * PX);
    ctx.arcTo(...P(cx + tw / 2, by), ...P(cx + t.c, by), f * PX);
    ctx.arcTo(...P(cx + t.c, by), ...P(cx + t.c, y - 1), t.r * PX);
    ctx.lineTo(...P(cx + t.c, y - 1));
    ctx.closePath();
  }
}
function drawCutouts(ctx, PX) {
  ctx.fillStyle = '#000';
  for (const R of [L.front, L.back]) { cutPath(ctx, PX, R[0], R[1]); ctx.fill(); }
}

let PXa = 40;
function redrawAtlas() {
  L = layout();
  PXa = Math.min(40, 2048 / L.AW, 2048 / L.AH);
  const PX = PXa, wpx = Math.round(L.AW * PX), hpx = Math.round(L.AH * PX), { W, hem } = state;
  // a texture already on the GPU cannot change size in place, so release it and let three.js upload a fresh one
  if (atlas.width !== wpx || atlas.height !== hpx) for (const t of [atlasTex, bumpTex, roughTex, alphaTex]) t.dispose();

  // colour
  atlas.width = wpx; atlas.height = hpx;
  const ctx = atlas.getContext('2d');
  ctx.fillStyle = state.bag; ctx.fillRect(0, 0, wpx, hpx);
  const tile = (img, scale, op, alpha) => {
    const pat = ctx.createPattern(img, 'repeat'); pat.setTransform(new DOMMatrix().scale(scale));
    ctx.save(); ctx.globalCompositeOperation = op; ctx.globalAlpha = alpha; ctx.fillStyle = pat; ctx.fillRect(0, 0, wpx, hpx); ctx.restore();
  };
  tile(mottle, PX / 40, 'soft-light', 0.16);
  tile(fibres, PX / 40, 'soft-light', 0.55);
  if (state.bag === KRAFT) { tile(kraftFlecks, PX / 40, 'multiply', 0.3); tile(mottle, PX / 90, 'soft-light', 0.22); }
  if (TYPES[state.type].handles === 'dcut') {   // the reinforcement patch is a second layer, a touch denser in colour
    const o = dcutHole();
    ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.025)';   // barely visible: the patch is welded inside, with no seam showing outside
    for (const R of [L.front, L.back]) ctx.fillRect((R[0] + W / 2 - o.w / 2 - o.pad) * PX, (R[1] + o.top - o.pad) * PX, (o.w + 2 * o.pad) * PX, (o.h + 2 * o.pad) * PX);
    ctx.restore();
  }
  const lum = new THREE.Color(state.bag).getHSL({}).l;   // thin light fabric lets dark things behind it show through
  const through = lum > 0.75 ? 0.3 : lum > 0.45 ? 0.14 : 0.05;
  if (TYPES[state.type].handles === 'loop' && state.handle !== 'match' && through > 0.1) {
    // the strap ends welded inside the hem show through as soft squares under the weld marks
    const a = handleSpan(), sw = 2.5;
    ctx.save(); ctx.fillStyle = state.handle; ctx.globalAlpha = through * 1.25;
    for (const R of [L.front, L.back]) for (const sx of [-1, 1]) ctx.fillRect((R[0] + W / 2 + sx * a - sw / 2) * PX, R[1] * PX, sw * PX, (hem - 0.45) * PX);
    ctx.restore();
  }
  ctx.save(); ctx.strokeStyle = weldColour(state.bag); ctx.lineCap = 'butt'; ctx.globalAlpha = 0.6;
  drawWelds(ctx, PX); ctx.restore();
  baseCanvas.width = wpx; baseCanvas.height = hpx;
  baseCanvas.getContext('2d').drawImage(atlas, 0, 0);
  updatePrint();
  atlasTex.needsUpdate = true;

  // relief: mid grey is the fabric surface
  bumpC.width = wpx; bumpC.height = hpx;
  const b = bumpC.getContext('2d');
  b.fillStyle = '#808080'; b.fillRect(0, 0, wpx, hpx);
  b.fillStyle = '#8c8c8c';
  for (const R of [L.front, L.back]) b.fillRect(R[0] * PX, R[1] * PX, W * PX, hem * PX);
  for (const R of [L.left, L.right]) b.fillRect(R[0] * PX, R[1] * PX, state.D * PX, hem * PX);
  if (TYPES[state.type].handles === 'dcut') {
    const o = dcutHole();
    for (const R of [L.front, L.back]) b.fillRect((R[0] + W / 2 - o.w / 2 - o.pad) * PX, (R[1] + o.top - o.pad) * PX, (o.w + 2 * o.pad) * PX, (o.h + 2 * o.pad) * PX);
  }
  b.strokeStyle = '#3c3c3c'; b.lineCap = 'butt'; drawWelds(b, PX);
  bumpTex.needsUpdate = true;

  // gloss (roughness, read from the green channel): half resolution is plenty
  const hs = 0.5;
  roughC.width = Math.round(wpx * hs); roughC.height = Math.round(hpx * hs);
  const r = roughC.getContext('2d');
  r.fillStyle = 'rgb(214,214,214)'; r.fillRect(0, 0, roughC.width, roughC.height);
  r.strokeStyle = 'rgb(150,150,150)'; r.lineCap = 'butt'; drawWelds(r, PX * hs);

  roughTex.needsUpdate = true;

  alphaC.width = roughC.width; alphaC.height = roughC.height;
  const al = alphaC.getContext('2d');
  al.fillStyle = '#fff'; al.fillRect(0, 0, alphaC.width, alphaC.height);
  drawCutouts(al, PX * hs);
  alphaPixels = al.getImageData(0, 0, alphaC.width, alphaC.height).data;
  alphaTex.needsUpdate = true;

  showThrough.value = through;   // and the print shows faintly from inside
  // thin non-woven lets light through: the inside and the far panel show softly through it, tinted by the fabric
  // how see-through the fabric is, matched to the videos: white and light colours a little, dark colours hardly at all
  outerMat.transmission = 0; // Backlighting supplies the thin-fabric effect without a second render target.
  backLight.value = through > 0.2 ? 0.55 : through > 0.1 ? 0.32 : 0.08;
  innerMat.emissive.set(state.bag).multiplyScalar(through * 0.38);   // a bright room lights the inside through the walls
  dirty = true;
}

// ---------------- materials & meshes ----------------
const fabN = fabricNormal();
const web = webbing();
// Thin non-woven lets direct light through: a panel with the light behind it glows softly, tinted by the fabric.
// Added to three.js' direct lighting for the bag's outside and inside surfaces.
const backLight = { value: 0.3 };
function thinFabric(sh) {
  sh.uniforms.backLight = backLight;
  sh.fragmentShader = sh.fragmentShader.replace('#include <lights_physical_pars_fragment>', `#include <lights_physical_pars_fragment>
uniform float backLight;
void RE_Direct_Thin( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir,
    const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
  RE_Direct_Physical( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
  float through = saturate( dot( - geometryNormal, directLight.direction ) );
  reflectedLight.directDiffuse += through * directLight.color * material.diffuseColor * backLight;
}
#undef RE_Direct
#define RE_Direct RE_Direct_Thin`);
}
const outerMat = new THREE.MeshPhysicalMaterial({
  map: atlasTex, normalMap: fabN, normalScale: new THREE.Vector2(0.36, 0.36),
  bumpMap: bumpTex, bumpScale: 2.2, roughnessMap: roughTex, roughness: 1, alphaMap: alphaTex, alphaTest: 0.5,
  sheen: 0.18, sheenRoughness: 0.6, sheenColor: 0xffffff, side: THREE.FrontSide,
  transmission: 0, thickness: 0,   // see redrawAtlas: depends on how light the fabric is
});
// three.js uses either a normal map or a bump map; apply the weld relief on top of the fabric normal map.
outerMat.onBeforeCompile = sh => {
  thinFabric(sh);
  // light through thin fabric is diffused, but less than the surface's own matte finish would suggest
  sh.fragmentShader = sh.fragmentShader.replace('#include <transmission_fragment>',
    THREE.ShaderChunk.transmission_fragment.replace('n, v, material.roughness, material.diffuseColor', 'n, v, material.roughness * 0.5, material.diffuseColor'));
  sh.fragmentShader = sh.fragmentShader.replace('#include <normal_fragment_maps>',
    '#include <normal_fragment_maps>\n#if defined( USE_BUMPMAP ) && defined( USE_NORMALMAP_TANGENTSPACE )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif');
};
outerMat.customProgramCacheKey = () => 'bag-outer-bump';
const showThrough = { value: 0.05 };
const innerMat = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, vertexColors: true, map: atlasTex, normalMap: fabN, normalScale: new THREE.Vector2(0.45, 0.45),
  alphaMap: alphaTex, alphaTest: 0.5, roughness: 0.9, sheen: 0.3, sheenRoughness: 0.6, side: THREE.BackSide,
});
// Inside the bag, show only a faint, mirrored hint of the outside print (stronger on white fabric).
innerMat.onBeforeCompile = sh => {
  thinFabric(sh);
  sh.uniforms.showThrough = showThrough;
  sh.fragmentShader = 'uniform float showThrough;\n' + sh.fragmentShader.replace('#include <map_fragment>',
    '#ifdef USE_MAP\n\tdiffuseColor.rgb = mix( diffuseColor.rgb, texture2D( map, vMapUv ).rgb * 0.92, showThrough );\n#endif');
};
innerMat.customProgramCacheKey = () => 'bag-inner-through';
const strapMat = new THREE.MeshPhysicalMaterial({   // woven PP webbing
  map: web.map, normalMap: web.nm, normalScale: new THREE.Vector2(0.9, 0.9),
  roughness: 0.6, sheen: 0.45, sheenRoughness: 0.45, sheenColor: 0x8a8a8a, side: THREE.DoubleSide,
});
const strapFabMat = new THREE.MeshPhysicalMaterial({   // the usual KOBAGS handle: a strip of the same matte non-woven, folded in two
  normalMap: fabN, normalScale: new THREE.Vector2(0.45, 0.45), roughness: 0.9, sheen: 0.25, sheenRoughness: 0.6, side: THREE.DoubleSide,
});
const cordMat = new THREE.MeshPhysicalMaterial({
  map: web.map, normalMap: web.nm, normalScale: new THREE.Vector2(1.2, 1.2), roughness: 0.7, sheen: 0.5, sheenRoughness: 0.4,
});

const bag = new THREE.Group();
bag.position.y = 0.0004;   // 0.4 mm clear of the floor, so the base never flickers against it
const outer = new THREE.Mesh(new THREE.BufferGeometry(), outerMat);
const inner = new THREE.Mesh(new THREE.BufferGeometry(), innerMat);
const straps = [new THREE.Mesh(new THREE.BufferGeometry(), strapMat), new THREE.Mesh(new THREE.BufferGeometry(), strapMat)];
const cords = [new THREE.Mesh(new THREE.BufferGeometry(), cordMat), new THREE.Mesh(new THREE.BufferGeometry(), cordMat)];
const rimMat = new THREE.MeshPhysicalMaterial({ roughness: 0.82, sheen: 0.35, sheenRoughness: 0.5 });
const rim = new THREE.Mesh(new THREE.BufferGeometry(), rimMat);
outer.castShadow = outer.receiveShadow = true; inner.receiveShadow = true;
outer.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, alphaMap: alphaTex, alphaTest: 0.5 });   // shadows respect cut-outs
for (const s of [...straps, ...cords]) { s.castShadow = s.receiveShadow = true; }
bag.add(outer, inner, rim, ...straps, ...cords);

function applyColours() {
  innerMat.color.set(state.bag).multiplyScalar(0.92);
  rimMat.color.set(state.bag); rimMat.sheenColor.set(state.bag).lerp(new THREE.Color(0xffffff), 0.2);
  outerMat.sheenColor.set(state.bag).lerp(new THREE.Color(0xffffff), 0.2);
  const hc = state.handle === 'match' ? state.bag : state.handle;
  strapMat.color.set(hc); strapFabMat.color.set(hc); cordMat.color.set(hc);
  straps.forEach(s => { s.material = state.strap === 'webbing' ? strapMat : strapFabMat; });
  dirty = true;
}

function rebuild() {
  L = layout();
  const body = buildBody();
  outer.geometry.dispose(); if(inner.geometry !== outer.geometry) inner.geometry.dispose(); outer.geometry = body; inner.geometry = body;
  const T = TYPES[state.type];
  straps.forEach((s, i) => {
    s.visible = T.handles === 'loop';
    s.geometry.dispose(); s.geometry = s.visible ? buildStrap(i === 0 ? 1 : -1) : new THREE.BufferGeometry();
  });
  rim.visible = TYPES[state.type].handles !== 'tshirt';   // the T-shirt top is a plain cut edge
  rim.geometry.dispose(); rim.geometry = rim.visible ? buildRim() : new THREE.BufferGeometry();
  cords.forEach((c, i) => {
    c.visible = T.handles === 'string';
    c.geometry.dispose(); c.geometry = c.visible ? buildCord(i === 0 ? -1 : 1) : new THREE.BufferGeometry();
  });
  redrawAtlas();
}

let previousShape = '', previousColour = '';
const typeMap = { 'box-bag': 'box', 'handle-bag': 'handle', 'd-cut-bag': 'dcut', 't-shirt-bag': 'tshirt', 'string-bag': 'string' };
return {
  group: bag, outer, inner, alphaTex,
  update(slug, dimensions, colour, front, back) {
    product = slug;
    const type = typeMap[slug] || 'box', T = TYPES[type];
    const [W, H, D] = dimensions;
    const shape = `${type}:${W}:${H}:${D}`;
    Object.assign(state, { type, W, H, D, hem: T.hem, full: T.fill, drop: Math.min(22, Math.max(10, H * .42)), bag: colour, handle: type === 'string' ? '#d4d0be' : 'match' });
    frontArt = front; backArt = back;
    if (shape !== previousShape) { rebuild(); previousShape = shape; }
    else if (colour !== previousColour) redrawAtlas();
    else updatePrint();
    applyColours(); previousColour = colour;
    return shape;
  },
  getDimensions() { return { width: state.W * CM, height: (state.H + (TYPES[state.type].handles === 'loop' ? state.drop : TYPES[state.type].handles === 'string' ? 6.5 : 0)) * CM, depth: state.D * CM, bodyHeight: state.H * CM }; },
  point(x, y, side) {
    const f = printFrame(), xx = ((x - f.x) / f.width - .5) * state.W;
    const yy = (1 - (y - f.y) / f.height) * state.H;
    const sign = side === 'front' ? 1 : -1;
    return new THREE.Vector3(sign * xx * CM, yy * CM + bag.position.y, sign * panelZ(sign * xx, yy, side === 'front' ? 1 : 2) * CM);
  },
  fromPoint(point, side) {
    const f = printFrame(), sign = side === 'front' ? 1 : -1;
    return { x: f.x + (point.x / CM * sign / state.W + .5) * f.width, y: f.y + (1 - (point.y - bag.position.y) / CM / state.H) * f.height };
  },
  hit(uv) {
    const ax = uv.x * L.AW, ay = (1 - uv.y) * L.AH;
    const pixelX = Math.min(alphaC.width - 1, Math.max(0, Math.floor(uv.x * alphaC.width)));
    const pixelY = Math.min(alphaC.height - 1, Math.max(0, Math.floor((1 - uv.y) * alphaC.height)));
    if (!alphaPixels || alphaPixels[(pixelY * alphaC.width + pixelX) * 4 + 1] < 128) return null;
    const f = printFrame();
    for (const side of ['front','back']) {
      const R = L[side];
      if (ax >= R[0] && ax <= R[0] + state.W && ay >= R[1] && ay <= R[1] + state.H)
        return { side, x: f.x + (ax - R[0]) / state.W * f.width, y: f.y + (ay - R[1]) / state.H * f.height };
    }
    return null;
  },
  dispose() {
    const gs = new Set(), ms = new Set(), ts = new Set();
    bag.traverse(o => { if (o.isMesh) { gs.add(o.geometry); for (const m of Array.isArray(o.material) ? o.material : [o.material]) ms.add(m); if (o.customDepthMaterial) ms.add(o.customDepthMaterial); } });
    // The unused webbing material still owns textures and must also be released.
    for (const m of [outerMat, innerMat, strapMat, strapFabMat, cordMat, rimMat]) ms.add(m);
    for (const m of ms) for (const v of Object.values(m)) if (v?.isTexture) ts.add(v);
    gs.forEach(g => g.dispose()); ms.forEach(m => m.dispose()); ts.forEach(t => t.dispose());
    frontArt = backArt = null;
  }
};
}
