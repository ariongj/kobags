/**
 * Geometry-only acceptance checks for the supplied studio and its realism patch.
 * Run from the application repository: node qa/reference_studio_geometry.mjs
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
import { refineStudioModule } from '../vendor/kobags-reference-studio/realism-patch.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const evidence = resolve(root, 'deliverables/handoff/studio-client-20261109/geometry.json');
const html = await readFile(resolve(root, 'vendor/kobags-reference-studio/index.html'), 'utf8');
const patch = await readFile(resolve(root, 'vendor/kobags-reference-studio/realism-patch.mjs'), 'utf8');
const original = html.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
assert.ok(original, 'The pinned source must contain its module');
const refined = refineStudioModule(original);
await transform(refined, { format: 'esm', target: 'es2022' });
const cutouts = source => source.slice(source.indexOf('function cutPath('), source.indexOf('function redrawAtlas('));
assert.equal(cutouts(refined), cutouts(original), 'The approved handle cut-out and centre-tab masks remain unchanged');

function kernel(source) {
  const types = source.match(/const TYPES = \{[\s\S]*?\n\};/)?.[0];
  const state = source.match(/const state = \{[\s\S]*?\n\};/)?.[0];
  const mathsStart = source.indexOf('const smooth =');
  const mathsEnd = source.indexOf('// ---------------- flat layout');
  const geometryStart = source.indexOf('function layout()');
  const geometryEnd = source.indexOf('// ---------------- top rim');
  assert.ok(types && state && mathsStart >= 0 && mathsEnd > mathsStart && geometryStart >= 0 && geometryEnd > geometryStart, 'Geometry extraction markers must match the pinned source');
  // Evaluate only trusted, local, pinned source functions. No browser code,
  // network calls, private application state or user artwork enters this test.
  const factory = new Function('THREE', 'mergeGeometries', `
    const CM=.01,FAB_TILE=1.04;
    ${types}\n${state}
    ${source.slice(mathsStart, mathsEnd)}
    ${source.slice(geometryStart, geometryEnd)}
    return { TYPES, state, configure(config) { Object.assign(state, config); L=layout(); },
      body:buildBody, strap:buildStrap, panelZ, handleSpan, profile, tshirtCut };
  `);
  return factory(THREE, mergeGeometries);
}
const before = kernel(original), after = kernel(refined);
assert.equal(after.state.vestView, 'open', 'A new studio session starts with Opened selected');
function validateGeometry(g, label) {
  for (const key of ['position', 'normal', 'uv', 'uv1']) {
    const attribute = g.getAttribute(key);
    assert.ok(attribute, `${label}: ${key} attribute exists`);
    for (const value of attribute.array) assert.ok(Number.isFinite(value), `${label}: finite ${key}`);
  }
  const count = g.getAttribute('position').count;
  assert.ok(g.index?.count > 0 && g.index.count % 3 === 0, `${label}: indexed triangles`);
  for (const index of g.index.array) assert.ok(index >= 0 && index < count, `${label}: triangle references a valid vertex`);
  g.computeBoundingBox();
  for (const point of [g.boundingBox.min, g.boundingBox.max]) assert.ok([point.x, point.y, point.z].every(Number.isFinite), `${label}: finite bounds`);
}

const bodies = [], handles = [], vestCavities = [];
let maxPanelChangeCm = 0, maxAttachmentErrorCm = 0, maxVestSeamErrorCm = 0;
function validateVestCavity(body, label, { W, H, D, full, size, pose, vestView }) {
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
  if (vestView === 'flat') {
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
  if (vestView !== 'flat') {
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(body, material); mesh.updateMatrixWorld(true);
    const ray = new THREE.Raycaster(new THREE.Vector3(0, (yb - .1) / 100, 0), new THREE.Vector3(0, -1, 0));
    const hits = ray.intersectObject(mesh);
    assert.ok(hits.length > 0 && Math.abs(hits[0].point.y) < 1e-8, `${label}: centre of open cavity reaches the base without an internal lid`);
    rayFirstHitYCm = hits[0].point.y * 100;
    material.dispose();
  }
  vestCavities.push({ size, pose, vestView, fullness: full, nominalDepthCm: D, mouthGapCm, torsoGapCm, rayFirstHitYCm });
}
for (const [type, def] of Object.entries(after.TYPES)) {
  for (const [size, W, H, D] of def.sizes) for (const pose of ['upright', 'relaxed']) for (const full of [...new Set([0.05, def.fill ?? .2, 0.6])]) for (const vestView of type === 'tshirt' ? ['open', 'flat'] : ['open']) {
    const config = { type, size, W, H, D, hem: def.hem, pose, full, vestView, strap: 'fabric', drop: Math.min(30, Math.max(10, H * .46)) };
    before.configure(config); after.configure(config);
    const label = `${type}/${size}/${pose}/fullness=${full}/vest=${vestView}`;
    const body = after.body(); validateGeometry(body, label);
    const originalBody = before.body();
    for (const channel of ['uv', 'uv1']) assert.deepEqual(body.getAttribute(channel).array, originalBody.getAttribute(channel).array, `${label}: original artwork and fabric UV coordinates are preserved`);
    if (type === 'tshirt' && vestView === 'flat') assert.deepEqual(body.getAttribute('position').array, originalBody.getAttribute('position').array, `${label}: Folded exactly preserves the original supplied shape`);
    originalBody.dispose();
    assert.ok(body.boundingBox.min.y >= -1e-6 && body.boundingBox.max.y <= H / 100 + 1e-6, `${label}: body stays within its specified height`);
    // Loop-handle refinements preserve construction boundaries. The vest bag
    // intentionally unfolds, but its base/top and shared panel edges must match.
    for (const seed of [1, 2]) for (let n = 0; n <= 20; n++) {
      const y = H * n / 20, x = -W / 2 + W * n / 20;
      for (const [px, py] of (type === 'tshirt' ? [[x, 0], [x, H]] : [[-W / 2, y], [W / 2, y], [x, 0], [x, H]]))
        assert.ok(Math.abs(after.panelZ(px, py, seed) - before.panelZ(px, py, seed)) < 1e-9, `${label}: seam boundary unchanged`);
      if (type === 'tshirt') for (const edge of [-W / 2, W / 2])
        assert.ok(Math.abs(after.panelZ(edge, y, seed) - after.profile(y).d) < 1e-9, `${label}: vest edge follows the shared gusset profile`);
      for (let i = 0; i <= 20; i++) {
        const xx = -W / 2 + W * i / 20;
        const change = Math.abs(after.panelZ(xx, y, seed) - before.panelZ(xx, y, seed));
        if (type !== 'tshirt') {
          maxPanelChangeCm = Math.max(maxPanelChangeCm, change);
          assert.ok(change <= .05, `${label}: attachment relief stays below half a millimetre`);
        }
      }
    }
    if (type === 'tshirt') validateVestCavity(body, label, config);
    bodies.push({ type, size, pose, vestView: type === 'tshirt' ? vestView : undefined, fullness: full, vertices: body.getAttribute('position').count });
    body.dispose();
    if (def.handles !== 'loop') continue;
    for (const side of [-1, 1]) for (const material of ['fabric', 'webbing']) {
      after.state.strap = material;
      const handle = after.strap(side), handleLabel = `${label}/${side > 0 ? 'front' : 'back'}/${material}`;
      validateGeometry(handle, handleLabel);
      assert.equal(handle.getAttribute('position').count, 4221, `${handleLabel}: rounded-edge topology`);
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
      handles.push({ type, size, pose, fullness: full, side: side > 0 ? 'front' : 'back', material, vertices: positions.count });
      handle.dispose();
    }
  }
}
// Old saved drafts omitted the new field. They must show the opened model,
// never inherit a previously selected Folded presentation from module state.
after.configure({ type: 'tshirt', W: 27, H: 40, D: 12, hem: 0, full: .15, vestView: 'open' });
const opened = after.body();
after.configure({ vestView: undefined });
const legacyDraft = after.body();
assert.deepEqual(legacyDraft.getAttribute('position').array, opened.getAttribute('position').array, 'Missing vestView defaults to the identical Opened geometry');
opened.dispose(); legacyDraft.dispose();
const result = {
  status: 'pass', timestampUTC: new Date().toISOString(), timezone: 'Europe/Tirane',
  node: process.version, threeRevision: THREE.REVISION,
  sourceSha256: createHash('sha256').update(html).digest('hex'),
  realismPatchSha256: createHash('sha256').update(patch).digest('hex'),
  checks: ['Guarded source refinements and full transformed-module syntax', 'Finite positions, normals and both UV channels', 'Original artwork and fabric UV coordinates preserved exactly', 'Valid triangle indices and body/handle bounds', 'Unchanged non-vest boundaries and all sealed bases/handle tops', 'Actual vest panel/gusset seam continuity at all 111 mesh rows in both modes', 'Vest mouth/torso volume within nominal depth; conserved gusset fabric width', 'Ray through open vest cavity reaches the base without a lid', 'Folded geometry exactly matches the original supplied source', 'New sessions and legacy drafts without vestView default to Opened', 'Unchanged U-cut, centre-tab and artwork mask functions', 'Sub-millimetre handle-attachment relief', 'Both handle ends follow the actual front/back panel surface'],
  bodyConfigurations: bodies.length, handleConfigurations: handles.length,
  maxPanelChangeCm, maxAttachmentErrorCm, maxVestSeamErrorCm,
  limitation: 'Geometry-only test. Does not measure real fabric accuracy, GPU performance or verify rendered materials/shadows/cut-outs; browser visual review is separate.',
  bodies, handles, vestCavities,
};
await mkdir(dirname(evidence), { recursive: true });
await writeFile(evidence, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ status: result.status, bodyConfigurations: result.bodyConfigurations, handleConfigurations: result.handleConfigurations, maxPanelChangeCm, maxAttachmentErrorCm, maxVestSeamErrorCm, defaultVestCavities: vestCavities.filter(v => v.fullness === after.TYPES.tshirt.fill && v.pose === 'upright'), evidence }, null, 2));
