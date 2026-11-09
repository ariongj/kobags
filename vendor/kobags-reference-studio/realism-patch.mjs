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

  // Opened is the default for every bag; retain the old T-shirt draft field
  // only when a canonical bagView has not been supplied.
  replace("  type: 'box', size: 'XS',", "  type: 'box', size: 'XS', bagView: 'open',", 'default bag presentation');

  replace('function profile(y) {', `function foldedBag() {
  return (state.bagView ?? (state.type === 'tshirt' ? state.vestView : 'open')) === 'flat';
}
function profile(y) {`, 'shared bag presentation');
  replace("  if (T.gusset === 'bottom') return { d: g * (1 - smooth(0, gussetTop(), y)), s: 0 };", `  if (foldedBag() && T.handles !== 'tshirt') {
    // A folded pack still has several layers of fabric, not a zero-depth plane.
    const d = Math.min(g, 0.18);
    if (T.gusset === 'bottom') return { d: d * (1 - smooth(0, gussetTop(), y)), s: 0 };
    // The two halves of a side gusset tuck in while keeping their fabric width.
    return { d, s: Math.sqrt(Math.max(g * g - d * d, 0)) };
  }
  if (T.gusset === 'bottom') return { d: g * (1 - smooth(0, gussetTop(), y)), s: 0 };`, 'flat gusset profiles');

  // The factory photographs show the vest bag opened for use. Keep the
  // original folded-tube construction and width/depth; unfold its gussets
  // through the body and mouth, then taper only the upper handle region.
  // Front, back and both gusset halves consume this one profile so they meet.
  replace(`    // a T-shirt bag is a flat folded tube: sealed flat across the bottom, a little open in the body, flat in the handles
    const yb = tshirtCut().yb, open = (0.5 + 3 * state.full) * smooth(0, H * 0.18, y) * (1 - smooth(H * 0.3, yb - 1, y));
    const d = 0.12 + Math.min(open, g * 0.9);`, `    if (foldedBag()) {
      // Retain the supplied folded presentation, including its original relief.
      const yb = tshirtCut().yb, open = (0.5 + 3 * state.full) * smooth(0, H * 0.18, y) * (1 - smooth(H * 0.3, yb - 1, y));
      const d = 0.12 + Math.min(open, g * 0.9);
      return { d, s: Math.sqrt(Math.max(g * g - d * d, 0)) };
    }
    // Expanded side gussets leave usable space inside the open fabric shell.
    // There is no cap or solid fill; the original U-cut, tab and artwork stay.
    const yb = tshirtCut().yb;
    const base = smooth(0, H * 0.14, y);
    const shoulder = 1 - 0.1 * smooth(H * 0.5, yb, y);
    const handles = 1 - smooth(yb + 0.4, H - 0.8, y);
    const expansion = 0.72 + 0.26 * Math.min(1, Math.max(0, state.full));
    const d = 0.12 + Math.max(0, g - 0.12) * expansion * base * shoulder * handles;`, 'expanded vest gussets');

  replace('  return profile(y).d + bulge + buckle + pressed + ((T.handles', `  if (T.handles === 'tshirt' && !foldedBag()) {
    const g = state.D / 2, yb = tshirtCut().yb;
    let fold = 0;
    // Shallow vertical pull folds emerge from the welded lower corners.
    // They fade at all shared edges and below the print-safe handle cut-out.
    for (const sx of [-1, 1]) {
      const line = x - sx * (W / 2 - g * 0.55 - 0.025 * y);
      fold -= 0.13 * Math.exp(-((line / 0.65) ** 2))
        * Math.sin(Math.PI * Math.min(1, y / yb)) * flat * edge;
    }
    // The cut-out transfers load into the two handle roots. Broad paired
    // ridges fade down the shoulder; their unequal strength avoids mirrored
    // grooves while leaving the print panel and shared seams undisturbed.
    const { c, hw } = tshirtCut(), down = yb - y, reach = yb * 0.62;
    if (down > 0 && down < reach) {
      const fade = Math.pow(Math.sin(Math.PI * down / reach), 1.3) * edge;
      for (const sx of [-1, 1]) {
        const line = x - sx * (c + hw * 0.22 + down * 0.10);
        const width = 0.7 + down * 0.025;
        const weight = (0.85 + sx * (seed === 1 ? 0.15 : -0.15)) * (1 - 0.35 * full);
        fold += weight * fade * (-0.34 * Math.exp(-((line / width) ** 2))
          + 0.16 * Math.exp(-(((line - sx * 1.2) / (width * 1.4)) ** 2)));
      }
    }
    // Vest handles are continuous folded fabric, not perfectly flat boards.
    // A shallow crosswise cup rounds each free strip, fading to zero at the
    // welded crown and outer seam. Front and back retain separate surfaces.
    const strip = Math.max(0, Math.min(1, (Math.abs(x) - c) / hw));
    const rise = Math.max(0, Math.min(1, (y - yb + 2.5) / (H - yb + 2.5)));
    const handleCup = 0.42 * Math.sin(Math.PI * strip) * Math.sin(Math.PI * rise)
      * (0.88 + 0.12 * Math.sin(x * 0.28 + seed)) * edge;
    // Fabric relief must stay inside the selected nominal bag depth.
    return Math.max(0.12, Math.min(g, profile(y).d + bulge + buckle + fold + handleCup));
  }
  return profile(y).d + bulge + buckle + pressed + ((T.handles`, 'vest fabric folds and depth bounds');

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

  replace("  if (T.gusset === 'bottom') {\n    // the base holds the panel out", `  if (foldedBag() && T.handles !== 'tshirt') {
    const seam = profile(y).d;
    const padding = T.gusset === 'bottom' ? 0.18 * Math.pow(Math.max(ex, 0), 0.6) * smooth(0, 2.5, y) : 0;
    const relief = (0.018 + 0.008 * fbm(x * 0.15, y * 0.07, seed)) * Math.max(ex, 0) * ey;
    // Modest pressed-fabric relief keeps separate front/back layers and closes
    // every original side seam. Do not change the artwork's panel coordinates.
    return seam + padding + relief + hemStep * edge * (T.handles === 'string' ? 1 : 0.5);
  }
  if (T.gusset === 'bottom') {
    // the base holds the panel out`, 'folded panel relief');
  replace("const bz = TYPES[state.type].handles === 'tshirt' ? profile(0).d : g;", "const bz = TYPES[state.type].handles === 'tshirt' || foldedBag() ? profile(0).d : g;", 'folded base thickness');
  replace('p: [-W / 2 + u * W, 0, bz - v * 2 * bz]', `p: [(-W / 2 + u * W) * (foldedBag() && TYPES[state.type].handles !== 'tshirt' && TYPES[state.type].gusset === 'side' ? 1 - 2 * profile(0).s * (1 - Math.abs(1 - 2 * v)) / W : 1), 0, bz - v * 2 * bz]`, 'base follows tucked gusset boundary');
  replace('Math.max(state.D, 2) * CM / 0.69 * 1.1', "(foldedBag() ? (state.type === 'tshirt' ? 2 : 0.9) : Math.max(state.D, 2)) * CM / 0.69 * 1.1", 'folded contact shadow');

  // The folded tube's upper gusset is open between the two handle plies. Cut
  // that hand space from the real mesh; keep the welded crown and lower gusset.
  replace('function buildBody() {', `function cutVestHandleOpenings(geometry) {
    const columns = 81, rows = 111, panels = 2 * columns * rows;
    const gussetSize = 17 * rows, gussetEnd = panels + 4 * gussetSize;
    const top = state.H - 0.9, bottom = tshirtCut().yb + 0.45;
    const left = 0.14, right = 1.86, rx = 0.14, ry = Math.min(0.75, (top - bottom) / 4);
    // A rounded rectangle in the unfolded side-gusset coordinates (0..2).
    // Its two halves meet at the existing centre fold, without a central web.
    const opening = [];
    for (const [cx, cy, start] of [[right-rx,bottom+ry,-90],[right-rx,top-ry,0],[left+rx,top-ry,90],[left+rx,bottom+ry,180]])
      for (let k = 0; k <= 4; k++) {
        const a = (start + k * 22.5) * Math.PI / 180;
        opening.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
      }
    const channels = Object.fromEntries(Object.entries(geometry.attributes).map(([name,a]) => [name,{ size:a.itemSize, values:Array.from(a.array) }]));
    const indices = [], intersections = new Map();
    const point = (index, piece) => {
      const local = index - panels - piece * gussetSize;
      const u = (local % 17) / 16;
      return { index, x: piece % 2 ? 2-u : u, y: channels.position.values[index*3+1] / CM };
    };
    const intersection = (a,b,t,piece) => {
      if(t < 1e-10)return a;if(t > 1-1e-10)return b;
      const x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t;
      const key=piece+':'+x.toFixed(9)+':'+y.toFixed(9);
      if(intersections.has(key))return intersections.get(key);
      const index=channels.position.values.length/3;
      for(const [name,{size,values}] of Object.entries(channels)){
        const value=[];for(let k=0;k<size;k++)value.push(values[a.index*size+k]+(values[b.index*size+k]-values[a.index*size+k])*t);
        if(name==='normal'){const length=Math.hypot(...value)||1;for(let k=0;k<size;k++)value[k]/=length;}
        values.push(...value);
      }
      const result={index,x,y};intersections.set(key,result);return result;
    };
    const clip = (polygon,A,B,inside,piece) => {
      const out=[],distance=p=>(B[0]-A[0])*(p.y-A[1])-(B[1]-A[1])*(p.x-A[0]);
      for(let i=0;i<polygon.length;i++){
        const a=polygon[i],b=polygon[(i+1)%polygon.length],da=distance(a),db=distance(b);
        const keepA=inside?da>=0:da<=0,keepB=inside?db>=0:db<=0;
        if(keepA)out.push(a);
        if(keepA!==keepB)out.push(intersection(a,b,da/(da-db),piece));
      }
      return out;
    };
    const emit = polygon => {
      for(let i=1;i+1<polygon.length;i++){
        const a=polygon[0],b=polygon[i],c=polygon[i+1];
        if(Math.abs((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x))>1e-10)indices.push(a.index,b.index,c.index);
      }
    };
    const original=geometry.index.array;
    for(let i=0;i<original.length;i+=3){
      const triangle=[original[i],original[i+1],original[i+2]];
      const first=Math.min(...triangle),last=Math.max(...triangle);
      if(first<panels||last>=gussetEnd){indices.push(...triangle);continue;}
      const piece=Math.floor((first-panels)/gussetSize);
      let remaining=triangle.map(index=>point(index,piece));
      if(remaining.every(p=>p.y<=bottom)||remaining.every(p=>p.y>=top)){indices.push(...triangle);continue;}
      // Subtract the convex opening by emitting each outside fragment and
      // carrying its inside remainder to the next edge. Border vertices share
      // interpolated UVs/normals; no coarse stair-step cut or extra solid cap.
      for(let edge=0;edge<opening.length&&remaining.length;edge++){
        const A=opening[edge],B=opening[(edge+1)%opening.length];
        emit(clip(remaining,A,B,false,piece));remaining=clip(remaining,A,B,true,piece);
      }
    }
    for(const [name,{size,values}] of Object.entries(channels))geometry.setAttribute(name,new THREE.Float32BufferAttribute(values,size));
    geometry.setIndex(indices);return geometry;
  }
function buildBody() {`, 'physical vest handle openings');
  replace('  return mergeGeometries(parts);', `  const geometry = mergeGeometries(parts);
  return TYPES[state.type].handles === 'tshirt' ? cutVestHandleOpenings(geometry) : geometry;`, 'cut upper vest gussets');

  // A shallow travelling crease softens the expanded side gusset. All four
  // gusset boundaries stay fixed, including the hand-opening rails.
  replace('      const p = [sx * (W / 2 - s * u + bow), y,', `      const vestDrape = TYPES[state.type].handles === 'tshirt' && !foldedBag()
        ? 0.16 * Math.sin(Math.PI * u) * Math.sin(Math.PI * y / H)
          * Math.sin(y / H * Math.PI * 2.2 + sx * 0.7 + (half === 'f' ? 0 : 0.5))
          * (1 - smooth(tshirtCut().yb - 1.5, tshirtCut().yb + 0.4, y)) : 0;
      const p = [sx * (W / 2 - s * u + bow + vestDrape), y,`, 'vest side-gusset drape');

  // Keep the real two-layer strap width and thickness. Attach its buried ends
  // to the actual panel surface, rather than a box-depth approximation.
  replace("const tilt = state.pose === 'relaxed' ? (side > 0 ? 0.62 : 0.85) : 0.1;", "const tilt = foldedBag() ? (side > 0 ? 0.004 : 0.008) : state.pose === 'relaxed' ? (side > 0 ? 0.62 : 0.85) : (side > 0 ? 0.12 : 0.18);", 'handle fall');
  replace('const zIn = y => side * (profile(Math.min(y, H)).d - 0.2);', 'const zIn = (y, x = 0) => side * (panelZ(x, Math.min(y, H), side > 0 ? 1 : 2) - 0.09);', 'handle attachment surface');
  replace('if (y <= H) return new THREE.Vector3(x, y, zIn(y));', 'if (y <= H) return new THREE.Vector3(x, y, zIn(y, x));', 'embedded handle ends');
  replace('return new THREE.Vector3(x, H + h * Math.cos(f), zIn(H) + side * h * Math.sin(f));', `const drift = (foldedBag() ? 0.12 : 0.42) * Math.sin(Math.PI * Math.min(1, h / drop)) * Math.sin(x / a * 0.8 + side);
    return new THREE.Vector3(x + drift, H + h * Math.cos(f), zIn(H, x) + side * h * Math.sin(f));`, 'handle asymmetry');
  replace("const out = state.pose === 'relaxed' ? 0.6 : 0, sh = state.pose === 'relaxed' ? 0.74 : 0.88;", "const out = state.pose === 'relaxed' ? 0.6 : 0.22, sh = state.pose === 'relaxed' ? 0.74 : 0.88;", 'soft handle shoulders');
  replace('P(-a * sh, H + 0.84 * drop), P(0, H + drop),', 'P(-a * sh, H + (foldedBag() ? 0.84 : 0.80) * drop), P(side * (foldedBag() ? 0.28 : 0.65), H + drop * (side > 0 ? 1 : 0.975)),', 'offset handle crown');
  replace('const N = 200, pts = curve.getSpacedPoints(N), K = 14;', 'const N = 200, pts = curve.getSpacedPoints(N), K = 20;', 'rounder handle edges');
  replace('    for (const [rx, ry] of ring) {\n      pos.push((p.x + Wv.x * rx * sw / 2 + Nn.x * ry * ht) * CM, (p.y + Wv.y * rx * sw / 2 + Nn.y * ry * ht) * CM, (p.z + Wv.z * rx * sw / 2 + Nn.z * ry * ht) * CM);', `    const free = smooth(H, H + 2, p.y);
    for (const [rx, ry] of ring) {
      // Both faces follow the same soft crosswise cup, preserving thickness.
      // It fades to flat at the welded ends and never becomes a sharp fold.
      const cup = (fabric ? 0.045 : 0.025) * free * (1 - rx * rx) * Math.sin(Math.PI * i / N);
      const depth = ry * ht + cup;
      pos.push((p.x + Wv.x * rx * sw / 2 + Nn.x * depth) * CM, (p.y + Wv.y * rx * sw / 2 + Nn.y * depth) * CM, (p.z + Wv.z * rx * sw / 2 + Nn.z * depth) * CM);`, 'soft strap cross-section');

  replace('const th = 0.2 * Math.sin(out * 0.32 + side * 1.7)', 'const th = (foldedBag() ? 0.035 : 0.32) * Math.sin(out * 0.26 + side * 1.7)', 'folded handle twist');
  replace('[sx * (W / 2 + 1.9), H * 0.62, -1.2]', '[sx * (W / 2 + 1.9), H * 0.62, foldedBag() ? -0.25 : -1.2]', 'folded upper cord');
  replace('[sx * (W / 2 + 1.5), H * 0.3, -1.9]', '[sx * (W / 2 + 1.5), H * 0.3, foldedBag() ? -0.3 : -1.9]', 'folded lower cord');
  replace('[sx * (W / 2 - 0.3), 2.4, az - 0.7]', '[sx * (W / 2 - 0.3), 2.4, az - (foldedBag() ? 0.2 : 0.7)]', 'folded cord return');

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
