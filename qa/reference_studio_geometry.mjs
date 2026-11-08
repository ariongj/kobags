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
const evidence = resolve(root, 'deliverables/handoff/studio-20261109/geometry.json');
const html = await readFile(resolve(root, 'vendor/kobags-reference-studio/index.html'), 'utf8');
const patch = await readFile(resolve(root, 'vendor/kobags-reference-studio/realism-patch.mjs'), 'utf8');
const original = html.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
assert.ok(original, 'The pinned source must contain its module');
const refined = refineStudioModule(original);
await transform(refined, { format: 'esm', target: 'es2022' });

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
      body:buildBody, strap:buildStrap, panelZ, handleSpan };
  `);
  return factory(THREE, mergeGeometries);
}
const before = kernel(original), after = kernel(refined);
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

const bodies = [], handles = [];
let maxPanelChangeCm = 0, maxAttachmentErrorCm = 0;
for (const [type, def] of Object.entries(after.TYPES)) {
  for (const [size, W, H, D] of def.sizes) for (const pose of ['upright', 'relaxed']) for (const full of [0.05, 0.6]) {
    const config = { type, size, W, H, D, hem: def.hem, pose, full, strap: 'fabric', drop: Math.min(30, Math.max(10, H * .46)) };
    before.configure(config); after.configure(config);
    const label = `${type}/${size}/${pose}/fullness=${full}`;
    const body = after.body(); validateGeometry(body, label);
    assert.ok(body.boundingBox.min.y >= -1e-6 && body.boundingBox.max.y <= H / 100 + 1e-6, `${label}: body stays within its specified height`);
    // The added handle relief must not open seams or move the mouth/base.
    for (const seed of [1, 2]) for (let n = 0; n <= 20; n++) {
      const y = H * n / 20, x = -W / 2 + W * n / 20;
      for (const [px, py] of [[-W / 2, y], [W / 2, y], [x, 0], [x, H]])
        assert.ok(Math.abs(after.panelZ(px, py, seed) - before.panelZ(px, py, seed)) < 1e-9, `${label}: seam boundary unchanged`);
      for (let i = 0; i <= 20; i++) {
        const xx = -W / 2 + W * i / 20;
        const change = Math.abs(after.panelZ(xx, y, seed) - before.panelZ(xx, y, seed));
        maxPanelChangeCm = Math.max(maxPanelChangeCm, change);
        assert.ok(change <= .05, `${label}: attachment relief stays below half a millimetre`);
      }
    }
    bodies.push({ type, size, pose, fullness: full, vertices: body.getAttribute('position').count });
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
const result = {
  status: 'pass', timestampUTC: new Date().toISOString(), timezone: 'Europe/Tirane',
  node: process.version, threeRevision: THREE.REVISION,
  sourceSha256: createHash('sha256').update(html).digest('hex'),
  realismPatchSha256: createHash('sha256').update(patch).digest('hex'),
  checks: ['Guarded source refinements and full transformed-module syntax', 'Finite positions, normals and both UV channels', 'Valid triangle indices and body/handle bounds', 'Unchanged body seam, mouth and base boundaries', 'Sub-millimetre handle-attachment relief', 'Both handle ends follow the actual front/back panel surface'],
  bodyConfigurations: bodies.length, handleConfigurations: handles.length,
  maxPanelChangeCm, maxAttachmentErrorCm,
  limitation: 'Geometry-only test. Does not measure real fabric accuracy, GPU performance or verify rendered materials/shadows/cut-outs; browser visual review is separate.',
  bodies, handles,
};
await mkdir(dirname(evidence), { recursive: true });
await writeFile(evidence, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ status: result.status, bodyConfigurations: result.bodyConfigurations, handleConfigurations: result.handleConfigurations, maxPanelChangeCm, maxAttachmentErrorCm, evidence }, null, 2));
