/** Photo-guided material tuning; dimensions, artwork UVs and openings stay intact. */
export function refineFabricAppearance(source) {
  const replace=(before,after)=>{
    if(!source.includes(before)||source.indexOf(before)!==source.lastIndexOf(before))throw new Error('Appearance patch mismatch: '+before);
    source=source.replace(before,after);
  };
  // PP fabric scatters light; glass-like refraction makes the opposite print
  // appear on the front. Keep diffuse backlighting and a faint inside print.
  replace('outerMat.transmission = through > 0.2 ? 0.45 : through > 0.1 ? 0.26 : 0.06;', 'outerMat.transmission = through > 0.2 ? 0.08 : through > 0.1 ? 0.035 : 0.01;');
  replace('backLight.value = through > 0.2 ? 0.55 : through > 0.1 ? 0.32 : 0.08;', 'backLight.value = through > 0.2 ? 0.32 : through > 0.1 ? 0.20 : 0.07;');
  replace("r.fillStyle = 'rgb(214,214,214)'", "r.fillStyle = 'rgb(239,239,239)'");
  replace("r.strokeStyle = 'rgb(150,150,150)'", "r.strokeStyle = 'rgb(209,209,209)'");
  replace("design.front, '#a6a6a6'", "design.front, '#d4d4d4'");
  replace("design.back, '#a6a6a6'", "design.back, '#d4d4d4'");
  // Repeatable fine embossing, avoiding sparkling random pixel noise.
  replace('h[y * S + x] = v + (Math.random() - 0.5) * 0.35;', 'h[y * S + x] = v + 0.12 * Math.sin(x * 1.73 + y * 2.31) * Math.sin(y * 0.81 - x * 0.37);');
  replace("tile(fibres, PX / 40, 'soft-light', 0.55);", "tile(fibres, PX / 40, 'soft-light', 0.72);");
  replace('handleTension -= 0.045', 'handleTension -= 0.048');
  replace('const cup = (fabric ? 0.045 : 0.025)', 'const cup = (fabric ? 0.075 : 0.035)');
  // A filtered shadow looks like a studio softbox rather than a jagged cutout.
  // Keep the existing 2048 map, so mobile texture memory does not increase.
  replace('renderer.shadowMap.type = THREE.PCFSoftShadowMap;', 'renderer.shadowMap.type = THREE.PCFShadowMap;');
  replace('key.shadow.mapSize.set(2048, 2048);', 'key.shadow.mapSize.set(2048, 2048);\nkey.shadow.radius = 3.5;');
  replace('new THREE.ShadowMaterial({ opacity: 0.2 })', 'new THREE.ShadowMaterial({ opacity: 0.14 })');
  return source;
}
