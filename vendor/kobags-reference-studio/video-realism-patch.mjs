/** Refinements from the owner's 22 November-8 clips, reviewed November 9.
 * Keep the existing construction, dimensions, atlas UVs and editing model.
 * Values below are visual estimates, not measurements or a reconstructed scan.
 */
export function refineVideoRealism(source) {
  const replace=(before,after,label)=>{
    if(!source.includes(before)||source.indexOf(before)!==source.lastIndexOf(before))throw new Error('Video refinement mismatch: '+label);
    source=source.replace(before,after);
  };
  // Clips 1, 5, 7, 10 and 12 show a thin doubled ribbon, not a rubber handle.
  replace('const sw = 2.5, ht = fabric ? 0.075 : 0.06;', 'const sw = 2.5, ht = fabric ? 0.028 : 0.045;', 'strap thickness');
  replace("sh = state.pose === 'relaxed' ? 0.74 : 0.88;", "sh = state.pose === 'relaxed' ? 0.64 : 0.72;", 'tapered handle shoulders');
  replace('P(side * (foldedBag() ? 0.28 : 0.65), H + drop * (side > 0 ? 1 : 0.975)),', `P(-a * 0.19 + side * 0.35, H + drop * (side > 0 ? 0.99 : 0.965)),
    P(a * 0.15 + side * 0.35, H + drop * (side > 0 ? 1 : 0.975)),`, 'soft handle crown');
  replace('const cup = (fabric ? 0.075 : 0.035)', 'const cup = (fabric ? 0.045 : 0.025)', 'flat ribbon faces');
  replace('normalScale: new THREE.Vector2(0.75, 0.75),\n  roughness: 0.72, sheen: 0.35,', 'normalScale: new THREE.Vector2(0.4, 0.4),\n  roughness: 0.88, sheen: 0.22,', 'matte woven handles');
  replace('const c = (0.78 + 0.22 * v) * 255', 'const c = (0.92 + 0.08 * v) * 255', 'subtle webbing ribs');
  // Broad, restrained pressure folds keep the panels fabric-like. Every new
  // relief term still fades to zero at the common side/base seam vertices.
  replace('const bulge = (0.12 + 1.3 * full)', 'const bulge = (0.08 + 0.85 * full)', 'empty-bag panel fullness');
  replace('handleTension -= 0.048 * Math.exp(-((line / 0.55) ** 2))', 'handleTension -= 0.16 * Math.exp(-((line / 0.95) ** 2))', 'broad handle-root pull folds');
  // Three.js view positions are metres. Keep emboss relief in millimetres;
  // the source's scale of 2.2 creates deep false ridges around thin welds.
  replace('bumpMap: bumpTex, bumpScale: 2.2,', 'bumpMap: bumpTex, bumpScale: 0.0012,', 'restrained ultrasonic weld relief');
  replace("tile(mottle, PX / 40, 'soft-light', 0.16);", "tile(mottle, PX / 40, 'soft-light', 0.08);", 'cleaner fabric variation');
  // Clips 2–4: the flat vest is a folded stack; the opened vest has a real
  // cavity and a broad soft crease below each shoulder, not tubular handles.
  replace('const yb = tshirtCut().yb, open = (0.5 + 3 * state.full)', 'const yb = tshirtCut().yb, open = (0.06 + 0.25 * state.full)', 'thin folded vest');
  replace("  if (T.handles === 'tshirt' && !foldedBag()) {", "  if (T.handles === 'tshirt' && foldedBag()) return profile(y).d + 0.035 * Math.max(0, ex) * ey * flat;\n  if (T.handles === 'tshirt' && !foldedBag()) {", 'pressed vest panels');
  replace('fold -= 0.13 * Math.exp(-((line / 0.65) ** 2))', 'fold -= 0.18 * Math.exp(-((line / 1.05) ** 2))', 'soft vest lower folds');
  replace('const width = 0.7 + down * 0.025;', 'const width = 1.05 + down * 0.035;', 'broad vest shoulder folds');
  replace('(-0.34 * Math.exp(-((line / width) ** 2))', '(-0.26 * Math.exp(-((line / width) ** 2))', 'vest shoulder depth');
  replace('const handleCup = 0.42 *', 'const handleCup = 0.24 *', 'flat vest handle fabric');
  // Clips 19, 21 and 22: small gathers live immediately below the drawcord
  // channel. They fade downward and at the seams, leaving a clear print panel.
  replace('return (gw + (g - gw) * exs + open) * closing + 0.1 * exs * smooth(0, 3, y) + buckle + (hemStep + handleTension) * edge;', `const gather = T.handles === 'string' ? 0.24 * ex * edge
      * Math.exp(-(((H - hem - y) / Math.max(2.2, H * 0.17)) ** 2))
      * (Math.sin(x * 1.28 + seed * 0.7) + 0.32 * Math.sin(x * 2.1 + y * 0.18)) : 0;
    return Math.max(0, (gw + (g - gw) * exs + open) * closing + 0.1 * exs * smooth(0, 3, y) + buckle + gather + (hemStep + handleTension) * edge);`, 'drawcord channel gathers');
  replace('new THREE.TubeGeometry(curve, 180, 0.22 * CM, 10, false)', 'new THREE.TubeGeometry(curve, 180, 0.12 * CM, 10, false)', 'slender drawcord');
  replace('const knot = new THREE.SphereGeometry(0.42 * CM, 16, 12); knot.translate(ax * CM, ay * CM, (az - 0.2) * CM);', `const knotCurve = new THREE.CatmullRomCurve3([
    [0,0,0.15], [-0.2,0.25,0], [0.18,0.1,-0.12], [0.17,-0.2,0.1], [-0.15,-0.26,0.12], [-0.2,0.08,-0.08], [0.08,0.3,0], [0.1,-0.48,0.12]
  ].map(([x,y,z])=>new THREE.Vector3((ax+x)*CM,(ay+y)*CM,(az-0.15+z)*CM)));
  const knot = new THREE.TubeGeometry(knotCurve,32,0.115*CM,8,false);`, 'corded knot instead of bead');
  return source;
}
