/**
 * Conservative refinements to the owner's original procedural bag models.
 * The untouched upstream HTML remains the provenance source. All changes are
 * applied explicitly at build time, so an upstream mismatch fails the build.
 */
export function refineStudioModule(source) {
  const replace = (before, after, label) => {
    if (!source.includes(before) || source.indexOf(before) !== source.lastIndexOf(before))
      throw new Error(`Studio realism patch did not match exactly once: ${label}`);
    source = source.replace(before, after);
  };

  // Pull lines under the welded handle pads are sub-millimetre relief, not
  // random dents. Their boundary fade preserves the shared gusset seams.
  replace('  // folded hem is two layers thick; on the string bag it is a cord channel, so it puffs out more', `  let handleTension = 0;
  if (T.handles === 'loop') {
    const down = H - hem - y, reach = Math.min(H * 0.28, 8);
    if (down > 0 && down < reach) {
      const fade = Math.sin(Math.PI * down / reach) * (1 - 0.45 * full);
      for (const sx of [-1, 1]) {
        const line = x - sx * (handleSpan() + down * 0.13);
        handleTension -= 0.045 * Math.exp(-((line / 0.55) ** 2)) * fade * ex;
      }
    }
  }
  // folded hem is two layers thick; on the string bag it is a cord channel, so it puffs out more`, 'handle attachment relief');
  replace(' + buckle + hemStep * edge;', ' + buckle + (hemStep + handleTension) * edge;', 'bottom-gusset attachment relief');
  replace("((T.handles === 'tshirt' ? 0 : crease) + hemStep) * edge;", "((T.handles === 'tshirt' ? 0 : crease) + hemStep + handleTension) * edge;", 'side-gusset attachment relief');

  // Keep the real two-layer strap width and thickness. Attach its buried ends
  // to the actual panel surface, rather than a box-depth approximation.
  replace("const tilt = state.pose === 'relaxed' ? (side > 0 ? 0.62 : 0.85) : 0.1;", "const tilt = state.pose === 'relaxed' ? (side > 0 ? 0.62 : 0.85) : (side > 0 ? 0.075 : 0.12);", 'handle fall');
  replace('const zIn = y => side * (profile(Math.min(y, H)).d - 0.2);', 'const zIn = (y, x = 0) => side * (panelZ(x, Math.min(y, H), side > 0 ? 1 : 2) - 0.09);', 'handle attachment surface');
  replace('if (y <= H) return new THREE.Vector3(x, y, zIn(y));', 'if (y <= H) return new THREE.Vector3(x, y, zIn(y, x));', 'embedded handle ends');
  replace('return new THREE.Vector3(x, H + h * Math.cos(f), zIn(H) + side * h * Math.sin(f));', `const drift = 0.12 * Math.sin(Math.PI * Math.min(1, h / drop)) * Math.sin(x / a * 0.8 + side);
    return new THREE.Vector3(x + drift, H + h * Math.cos(f), zIn(H, x) + side * h * Math.sin(f));`, 'handle asymmetry');
  replace('const N = 200, pts = curve.getSpacedPoints(N), K = 14;', 'const N = 200, pts = curve.getSpacedPoints(N), K = 20;', 'rounder handle edges');
  replace('    for (const [rx, ry] of ring) {\n      pos.push((p.x + Wv.x * rx * sw / 2 + Nn.x * ry * ht) * CM, (p.y + Wv.y * rx * sw / 2 + Nn.y * ry * ht) * CM, (p.z + Wv.z * rx * sw / 2 + Nn.z * ry * ht) * CM);', `    const free = smooth(H, H + 2, p.y);
    for (const [rx, ry] of ring) {
      // Both faces follow the same soft crosswise cup, preserving thickness.
      // It fades to flat at the welded ends and never becomes a sharp fold.
      const cup = (fabric ? 0.045 : 0.025) * free * (1 - rx * rx) * Math.sin(Math.PI * i / N);
      const depth = ry * ht + cup;
      pos.push((p.x + Wv.x * rx * sw / 2 + Nn.x * depth) * CM, (p.y + Wv.y * rx * sw / 2 + Nn.y * depth) * CM, (p.z + Wv.z * rx * sw / 2 + Nn.z * depth) * CM);`, 'soft strap cross-section');

  // A restrained, deterministic fibre variation prevents the unprinted handle
  // from reading as a flat plastic strip. Hue and source swatches stay intact.
  replace('const strapMat = new THREE.MeshPhysicalMaterial({   // woven PP webbing', `const strapFibreMap = (() => {
  const size = 256, c = document.createElement('canvas'); c.width = c.height = size;
  const x = c.getContext('2d'), image = x.createImageData(size, size);
  for (let y = 0; y < size; y++) for (let u = 0; u < size; u++) {
    const fibre = 251 + 3 * vnoise(u * 0.7, y * 0.16, 91) + 1.5 * Math.sin(u * 1.7 + y * 0.6);
    const i = (y * size + u) * 4;
    image.data[i] = image.data[i + 1] = image.data[i + 2] = fibre; image.data[i + 3] = 255;
  }
  x.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(c); texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.channel = 1;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return texture;
})();
const strapMat = new THREE.MeshPhysicalMaterial({   // woven PP webbing`, 'handle fibre map');
  replace('map: web.map, normalMap: web.nm, normalScale: new THREE.Vector2(0.9, 0.9),\n  roughness: 0.6, sheen: 0.45, sheenRoughness: 0.45, sheenColor: 0x8a8a8a, side: THREE.DoubleSide,', 'map: web.map, normalMap: web.nm, normalScale: new THREE.Vector2(0.75, 0.75),\n  roughness: 0.72, sheen: 0.35, sheenRoughness: 0.55, sheenColor: 0x8a8a8a, side: THREE.DoubleSide,', 'woven strap finish');
  replace('normalMap: fabN, normalScale: new THREE.Vector2(0.45, 0.45), roughness: 0.9, sheen: 0.25, sheenRoughness: 0.6, side: THREE.DoubleSide,', 'map: strapFibreMap, normalMap: fabN, normalScale: new THREE.Vector2(0.36, 0.36), roughness: 0.94, sheen: 0.2, sheenRoughness: 0.65, side: THREE.DoubleSide,', 'non-woven strap finish');
  return source;
}
