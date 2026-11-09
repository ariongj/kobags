/**
 * Geometry-only acceptance checks for the supplied studio and its realism patch.
 * Run: node qa/reference_studio_geometry.mjs [--appearance]
 * This uses the actual Three.js geometry builders, without a browser or GPU.
 * It does not substitute for visual review of materials, shadows or cut-outs.
 */
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import * as THREE from 'three-studio';
import { mergeGeometries } from 'three-studio/examples/jsm/utils/BufferGeometryUtils.js';
import { transform } from 'esbuild';
import { refineFabricAppearance } from '../vendor/kobags-reference-studio/appearance-patch.mjs';
import { refineStudioModule } from '../vendor/kobags-reference-studio/realism-patch.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const appearance = process.argv.includes('--appearance');
const evidence = resolve(root, appearance ? 'deliverables/handoff/studio-handle-folds-20261109/geometry.json' : 'deliverables/handoff/studio-all-bags-20261109/geometry.json');
const html = await readFile(resolve(root, 'vendor/kobags-reference-studio/index.html'), 'utf8');
const patch = await readFile(resolve(root, 'vendor/kobags-reference-studio/realism-patch.mjs'), 'utf8');
const original = html.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
assert.ok(original, 'The pinned source must contain its module');
const refined = appearance ? refineFabricAppearance(refineStudioModule(original)) : refineStudioModule(original);
await transform(refined, { format: 'esm', target: 'es2022' });
const cutouts = source => source.slice(source.indexOf('function cutPath('), source.indexOf('function redrawAtlas('));
assert.equal(cutouts(refined), cutouts(original), 'The approved handle cut-out and centre-tab masks remain unchanged');

function kernel(source) {
  const types = source.match(/const TYPES = \{[\s\S]*?\n\};/)?.[0];
  const state = source.match(/const state = \{[\s\S]*?\n\};/)?.[0];
  const mathsStart = source.indexOf('const smooth =');
  const mathsEnd = source.indexOf('// ---------------- flat layout');
  const geometryStart = source.indexOf('function layout()');
  const geometryEnd = source.indexOf('// ---------------- procedural textures');
  assert.ok(types && state && mathsStart >= 0 && mathsEnd > mathsStart && geometryStart >= 0 && geometryEnd > geometryStart, 'Geometry extraction markers must match the pinned source');
  // Evaluate only trusted, local, pinned source functions. No browser code,
  // network calls, private application state or user artwork enters this test.
  const factory = new Function('THREE', 'mergeGeometries', `
    const CM=.01,FAB_TILE=1.04;
    ${types}\n${state}
    ${source.slice(mathsStart, mathsEnd)}
    ${source.slice(geometryStart, geometryEnd)}
    return { TYPES, state, configure(config) { Object.assign(state, config); L=layout(); },
      body:buildBody, strap:buildStrap, rim:buildRim, cord:buildCord, panelZ, handleSpan, profile, tshirtCut, gussetTop };
  `);
  return factory(THREE, mergeGeometries);
}
const before = kernel(original), after = kernel(refined);
assert.equal(after.state.bagView, 'open', 'A new studio session starts with Opened selected');
function validateGeometry(g, label, channels = ['position', 'normal', 'uv', 'uv1'], indexed = true) {
  for (const key of channels) {
    const attribute = g.getAttribute(key);
    assert.ok(attribute, `${label}: ${key} attribute exists`);
    for (const value of attribute.array) assert.ok(Number.isFinite(value), `${label}: finite ${key}`);
  }
  const count = g.getAttribute('position').count;
  if (indexed) assert.ok(g.index?.count > 0 && g.index.count % 3 === 0, `${label}: indexed triangles`);
  for (const index of g.index?.array || []) assert.ok(index >= 0 && index < count, `${label}: triangle references a valid vertex`);
  g.computeBoundingBox();
  for (const point of [g.boundingBox.min, g.boundingBox.max]) assert.ok([point.x, point.y, point.z].every(Number.isFinite), `${label}: finite bounds`);
}

const bodies = [], handles = [], vestCavities = [], assemblies = [], vestHandOpenings = [];
let maxPanelChangeCm = 0, maxAttachmentErrorCm = 0, maxVestSeamErrorCm = 0, maxFoldedSeamErrorCm = 0;
function validateVestCavity(body, label, { W, H, D, full, size, pose, bagView }) {
  const positions = body.getAttribute('position'), columns = 81, rows = 111, panelSize = columns * rows, gussetSize = 17 * rows;
  const p = index => new THREE.Vector3().fromBufferAttribute(positions, index);
  // Compare the actual independently tessellated panel/gusset boundaries,
  // including the front/back folded centre line, at every one of 111 rows.
  for (let row = 0; row < rows; row++) for (let side = 0; side < 2; side++) {
    const gussetFront = 2 * panelSize + side * 2 * gussetSize + row * 17;
    const gussetBack = gussetFront + gussetSize;
    const frontEdge = row * columns + (side === 0 ? 80 : 0);
    const backEdge = panelSize + row * columns + (side === 0 ? 0 : 80);
    for (const [a, b] of [[frontEdge, gussetFront], [backEdge, gussetBack], [gussetFront + 16, gussetBack + 16]]) {
      const error = p(a).distanceTo(p(b)) * 100;
      maxVestSeamErrorCm = Math.max(maxVestSeamErrorCm, error);
      assert.ok(error < 1e-5, `${label}: actual vest gusset seam is continuous`);
    }
  }
  assert.ok(body.boundingBox.min.z >= -D / 200 - 1e-7 && body.boundingBox.max.z <= D / 200 + 1e-7, `${label}: all fabric stays within the selected nominal depth`);
  const { yb } = after.tshirtCut();
  const mouthGapCm = after.profile(yb).d * 2, torsoGapCm = after.profile(H * .45).d * 2;
  if (bagView === 'flat') {
    assert.ok(Math.abs(mouthGapCm - .24) < 1e-9, `${label}: folded mouth preserves the original flat presentation`);
  } else {
    assert.ok(mouthGapCm >= D * .6, `${label}: the U-cut mouth has usable open space`);
    assert.ok(torsoGapCm >= D * .7, `${label}: side gussets expand through the torso`);
  }
  for (let row = 0; row <= 110; row++) {
    const { d, s } = after.profile(H * row / 110);
    assert.ok(Math.abs(d * d + s * s - (D / 2) ** 2) < 1e-8, `${label}: folded gusset preserves its nominal fabric width`);
  }
  // An actual Three.js ray through the centre of the mouth must reach the
  // sealed base, rather than a hidden cap or a solid filler masquerading as volume.
  let rayFirstHitYCm = null;
  if (bagView !== 'flat') {
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(body, material); mesh.updateMatrixWorld(true);
    const ray = new THREE.Raycaster(new THREE.Vector3(0, (yb - .1) / 100, 0), new THREE.Vector3(0, -1, 0));
    const hits = ray.intersectObject(mesh);
    assert.ok(hits.length > 0 && Math.abs(hits[0].point.y) < 1e-8, `${label}: centre of open cavity reaches the base without an internal lid`);
    rayFirstHitYCm = hits[0].point.y * 100;
    material.dispose();
  }
  const holeMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const holeMesh = new THREE.Mesh(body,holeMaterial); holeMesh.updateMatrixWorld(true);
  const holeY = (yb + 0.45 + H - 0.9) / 2;
  const rays=[];
  for (const sx of [-1,1]) {
    for (const fraction of [-.35,0,.35]) {
      const z = after.profile(holeY).d * fraction;
      const ray = new THREE.Raycaster(new THREE.Vector3(sx*(W/2+3)/100,holeY/100,z/100),new THREE.Vector3(-sx,0,0));
      const hits=ray.intersectObject(holeMesh);
      assert.equal(hits.length,0,`${label}: a ray crosses the upper hand opening on both sides, including the centre fold`);
      rays.push({side:sx,zCm:z,hits:hits.length});
    }
    for (const [name,y] of [['top weld',H-.45],['lower gusset',yb-.4]]) {
      const z = after.profile(y).d * .35;
      const ray = new THREE.Raycaster(new THREE.Vector3(sx*(W/2+3)/100,y/100,z/100),new THREE.Vector3(-sx,0,0));
      assert.ok(ray.intersectObject(holeMesh).length>0,`${label}: ${name} stays solid outside the hand opening`);
    }
  }
  holeMaterial.dispose();
  vestHandOpenings.push({size,pose,bagView,fullness:full,openingBottomCm:yb+.45,openingTopCm:H-.9,rays});
  vestCavities.push({ size, pose, bagView, fullness: full, nominalDepthCm: D, mouthGapCm, torsoGapCm, rayFirstHitYCm });
}
function validateAssembly(body, label, config, def) {
  const { type, bagView, W, H, D } = config;
  const p = body.getAttribute('position'), cols = 81, rows = 111, panelSize = cols * rows;
  const point = i => new THREE.Vector3().fromBufferAttribute(p, i);
  const compare = (a, b, message) => {
    const error = point(a).distanceTo(point(b)) * 100;
    maxFoldedSeamErrorCm = Math.max(maxFoldedSeamErrorCm, error);
    assert.ok(error < 1e-5, `${label}: ${message}`);
  };
  if (bagView === 'flat' && type !== 'tshirt') {
    const depthCm = (body.boundingBox.max.z - body.boundingBox.min.z) * 100;
    assert.ok(depthCm > .1 && depthCm < 1, `${label}: folded body has fabric thickness without remaining inflated`);
    // Verify every actual body seam, including the degenerate D=0 flat pouch.
    const gussetRows = def.gusset === 'bottom' ? Math.min(110, Math.ceil(after.gussetTop() / (H / 110))) + 1 : 111;
    if (D >= .5) {
      const gussetSize = 17 * gussetRows;
      for (let row = 0; row < gussetRows; row++) for (let side = 0; side < 2; side++) {
        const front = 2 * panelSize + side * 2 * gussetSize + row * 17, back = front + gussetSize;
        compare(row * cols + (side === 0 ? 80 : 0), front, 'folded front/gusset seam joins');
        compare(panelSize + row * cols + (side === 0 ? 0 : 80), back, 'folded back/gusset seam joins');
        compare(front + 16, back + 16, 'two tucked gusset halves join');
      }
      const base = 2 * panelSize + 4 * gussetSize;
      for (let col = 0; col <= 80; col++) {
        compare(col, base + col, 'folded base joins front');
        compare(panelSize + (80 - col), base + 32 * cols + col, 'folded base joins back');
      }
      // Both edges of the folded base follow the actual tucked gusset cross-section.
      for (let v = 0; v <= 32; v++) for (const side of [0, 1]) {
        const half = v <= 16 ? 0 : 1, u = v <= 16 ? v : 32 - v;
        compare(base + v * cols + (side === 0 ? 80 : 0), 2 * panelSize + side * 2 * gussetSize + half * gussetSize + u, 'base edge joins tucked gusset');
      }
      if (def.gusset === 'bottom') for (let row = gussetRows - 1; row < rows; row++) for (const col of [0, 80])
        compare(row * cols + col, panelSize + row * cols + (80 - col), 'closed side seam above bottom gusset');
    } else {
      for (let row = 0; row < rows; row++) for (const col of [0, 80]) compare(row * cols + col, panelSize + row * cols + (80 - col), 'zero-gusset pouch side seam');
      for (let col = 0; col < cols; col++) compare(col, panelSize + (80-col), 'zero-gusset pouch sealed base');
    }
  }
  // Check components from the exact same source builders used by rebuild().
  if (def.handles !== 'tshirt') {
    const rim = after.rim(); validateGeometry(rim, label + '/rim', ['position','normal','uv']);
    if (bagView === 'flat') assert.ok(rim.boundingBox.max.z-rim.boundingBox.min.z < .012, `${label}: top rim follows the flat mouth`);
    rim.dispose();
  }
  if (def.handles === 'string') for (const side of [-1, 1]) {
    const cord = after.cord(side); validateGeometry(cord, label + '/cord', ['position','normal','uv'], false);
    if (bagView === 'flat') assert.ok(cord.boundingBox.max.z-cord.boundingBox.min.z < .02, `${label}: folded drawstrings lie with the flat bag`);
    cord.dispose();
  }
  assemblies.push({ type, size:config.size, pose:config.pose, bagView, depthCm: (body.boundingBox.max.z - body.boundingBox.min.z) * 100 });
}
for (const [type, def] of Object.entries(after.TYPES)) {
  for (const [size, W, H, D] of def.sizes) for (const pose of ['upright', 'relaxed']) for (const full of [...new Set([0.05, def.fill ?? .2, 0.6])]) for (const bagView of ['open', 'flat']) {
    const config = { type, size, W, H, D, hem: def.hem, pose, full, bagView, strap: 'fabric', drop: Math.min(30, Math.max(10, H * .46)) };
    before.configure(config); after.configure(config);
    const label = `${type}/${size}/${pose}/fullness=${full}/view=${bagView}`;
    const body = after.body(); validateGeometry(body, label);
    const originalBody = before.body();
    for (const channel of ['uv', 'uv1']) {
      const originalUV = originalBody.getAttribute(channel).array;
      assert.deepEqual(body.getAttribute(channel).array.slice(0, originalUV.length), originalUV, `${label}: original artwork and fabric UV coordinates are preserved`);
    }
    if (type === 'tshirt') {
      if (bagView === 'flat') assert.deepEqual(body.getAttribute('position').array.slice(0, originalBody.getAttribute('position').array.length), originalBody.getAttribute('position').array, `${label}: Folded retains the original envelope outside the physical openings`);
      assert.ok(body.index.count < originalBody.index.count, `${label}: physical side openings remove triangles, not just a painted mask`);
    }
    originalBody.dispose();
    assert.ok(body.boundingBox.min.y >= -1e-6 && body.boundingBox.max.y <= H / 100 + 1e-6, `${label}: body stays within its specified height`);
    // Loop-handle refinements preserve construction boundaries. The vest bag
    // intentionally unfolds, but its base/top and shared panel edges must match.
    for (const seed of [1, 2]) for (let n = 0; n <= 20; n++) {
      const y = H * n / 20, x = -W / 2 + W * n / 20;
      for (const [px, py] of (type === 'tshirt' ? [[x, 0], [x, H]] : bagView === 'open' ? [[-W / 2, y], [W / 2, y], [x, 0], [x, H]] : []))
        assert.ok(Math.abs(after.panelZ(px, py, seed) - before.panelZ(px, py, seed)) < 1e-9, `${label}: seam boundary unchanged`);
      if (type === 'tshirt') for (const edge of [-W / 2, W / 2])
        assert.ok(Math.abs(after.panelZ(edge, y, seed) - after.profile(y).d) < 1e-9, `${label}: vest edge follows the shared gusset profile`);
      for (let i = 0; i <= 20; i++) {
        const xx = -W / 2 + W * i / 20;
        const change = Math.abs(after.panelZ(xx, y, seed) - before.panelZ(xx, y, seed));
        if (type !== 'tshirt' && bagView === 'open') {
          maxPanelChangeCm = Math.max(maxPanelChangeCm, change);
          assert.ok(change <= .05, `${label}: attachment relief stays below half a millimetre`);
        }
      }
    }
    if (type === 'tshirt') validateVestCavity(body, label, config);
    bodies.push({ type, size, pose, bagView, fullness: full, vertices: body.getAttribute('position').count });
    validateAssembly(body, label, config, def);
    body.dispose();
    if (def.handles !== 'loop') continue;
    for (const side of [-1, 1]) for (const material of ['fabric', 'webbing']) {
      after.state.strap = material;
      const handle = after.strap(side), handleLabel = `${label}/${side > 0 ? 'front' : 'back'}/${material}`;
      validateGeometry(handle, handleLabel);
      assert.equal(handle.getAttribute('position').count, 4221, `${handleLabel}: rounded-edge topology`);
      if (bagView === 'flat') {
        assert.ok(handle.boundingBox.max.z - handle.boundingBox.min.z < .012, `${handleLabel}: handle stays flat without crushing the strap thickness`);
        assert.ok(side > 0 ? handle.boundingBox.min.z > 0 : handle.boundingBox.max.z < 0, `${handleLabel}: front and back folded handles remain on their own side`);
      }
      assert.ok(handle.boundingBox.min.y >= (H - def.hem - 2) / 100 && handle.boundingBox.max.y <= (H + config.drop + 2) / 100, `${handleLabel}: finite handle height around requested drop`);
      const positions = handle.getAttribute('position'), ringSize = 21;
      for (const [ring, x] of [[0, -after.handleSpan()], [200, after.handleSpan()]]) {
        const center = new THREE.Vector3();
        // Exclude the duplicated seam vertex when finding the ring centre.
        for (let k = 0; k < ringSize - 1; k++) center.add(new THREE.Vector3().fromBufferAttribute(positions, ring * ringSize + k));
        center.multiplyScalar(100 / (ringSize - 1));
        const y = H - def.hem + .45;
        const expectedZ = side * (after.panelZ(x, y, side > 0 ? 1 : 2) - .09);
        const error = center.distanceTo(new THREE.Vector3(x, y, expectedZ));
        maxAttachmentErrorCm = Math.max(maxAttachmentErrorCm, error);
        assert.ok(error < .0001, `${handleLabel}: handle end stays attached immediately inside its panel`);
      }
      handles.push({ type, size, pose, bagView, fullness: full, side: side > 0 ? 'front' : 'back', material, vertices: positions.count });
      handle.dispose();
    }
  }
}
// Old saved drafts omitted the new field. They must show the opened model,
// never inherit a previously selected Folded presentation from module state.
after.configure({ type: 'tshirt', W: 27, H: 40, D: 12, hem: 0, full: .15, bagView: 'open', vestView: undefined });
const opened = after.body();
after.configure({ bagView: undefined, vestView: undefined });
const legacyDraft = after.body();
assert.deepEqual(legacyDraft.getAttribute('position').array, opened.getAttribute('position').array, 'Missing presentation defaults to the identical Opened geometry');
opened.dispose(); legacyDraft.dispose();
after.configure({ bagView: 'flat', vestView: undefined });
const newFlat = after.body(); after.configure({ bagView: undefined, vestView: 'flat' });
const oldFlat = after.body();
assert.deepEqual(newFlat.getAttribute('position').array, oldFlat.getAttribute('position').array, 'Legacy T-shirt Folded geometry is preserved');
newFlat.dispose(); oldFlat.dispose();
after.configure({ type: 'box', bagView: 'open', vestView: 'flat' });
const boxOpen = after.body(); after.configure({ bagView: undefined });
const boxLegacy = after.body();
assert.deepEqual(boxOpen.getAttribute('position').array, boxLegacy.getAttribute('position').array, 'Legacy vestView cannot unexpectedly fold another bag type');
boxOpen.dispose(); boxLegacy.dispose();
const result = {
  status: 'pass', timestampUTC: new Date().toISOString(), timezone: 'Europe/Tirane',
  node: process.version, threeRevision: THREE.REVISION,
  sourceSha256: createHash('sha256').update(html).digest('hex'),
  realismPatchSha256: createHash('sha256').update(patch).digest('hex'),
  checks: ['Guarded source refinements and full transformed-module syntax', 'Finite positions, normals and both UV channels', 'Original artwork and fabric UV coordinates preserved exactly', 'Valid triangle indices and body/handle bounds', 'Unchanged non-vest boundaries and all sealed bases/handle tops', 'Actual vest panel/gusset seam continuity at all 111 mesh rows in both modes', 'Vest mouth/torso volume within nominal depth; conserved gusset fabric width', 'Ray through open vest cavity reaches the base without a lid', 'Folded T-shirt envelope retains original coordinates; hand gaps are real mesh openings', 'Every other folded body retains fabric thickness below 1cm; original UVs stay unchanged', 'Actual folded panel, gusset and base seams join, including zero-gusset pouches', 'Folded handles do not cross the centre plane; rims and drawstrings follow the flat body', 'Every type supports Opened/Folded; legacy T-shirt drafts migrate without affecting other types', 'Unchanged front/back U-cut, centre-tab and artwork mask functions', 'Side rays pass through each upper vest hand gap; top welded bridge and lower gussets remain solid', 'Sub-millimetre handle-attachment relief', 'Both handle ends follow the actual front/back panel surface'],
  appearancePatchSha256: appearance ? createHash('sha256').update(await readFile(resolve(root, 'vendor/kobags-reference-studio/appearance-patch.mjs'))).digest('hex') : null,
  bodyConfigurations: bodies.length, handleConfigurations: handles.length,
  maxPanelChangeCm, maxAttachmentErrorCm, maxVestSeamErrorCm, maxFoldedSeamErrorCm,
  limitation: 'Geometry-only test. Does not measure real fabric accuracy, GPU performance or verify rendered materials/shadows/cut-outs; browser visual review is separate.',
  bodies, handles, vestCavities, vestHandOpenings, assemblies,
};
await mkdir(dirname(evidence), { recursive: true });
await writeFile(evidence, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ status: result.status, bodyConfigurations: result.bodyConfigurations, handleConfigurations: result.handleConfigurations, maxPanelChangeCm, maxAttachmentErrorCm, maxVestSeamErrorCm, maxFoldedSeamErrorCm, defaultVestCavities: vestCavities.filter(v => v.fullness === after.TYPES.tshirt.fill && v.pose === 'upright'), evidence }, null, 2));
