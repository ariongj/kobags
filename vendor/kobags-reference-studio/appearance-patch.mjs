/** Photo-guided material tuning; dimensions, artwork UVs and openings stay intact. */
export function refineFabricAppearance(source) {
  const replace=(before,after)=>{
    if(!source.includes(before)||source.indexOf(before)!==source.lastIndexOf(before))throw new Error('Appearance patch mismatch: '+before);
    source=source.replace(before,after);
  };
  // PP fabric scatters light; glass-like refraction makes the opposite print
  // appear on the front. Keep diffuse backlighting and a faint inside print.
  replace('outerMat.transmission = through > 0.2 ? 0.45 : through > 0.1 ? 0.26 : 0.06;', "outerMat.transmission = through > 0.2 ? (state.type === 'tshirt' ? 0.30 : 0.23) : through > 0.1 ? 0.07 : 0.012;");
  replace('backLight.value = through > 0.2 ? 0.55 : through > 0.1 ? 0.32 : 0.08;', 'backLight.value = through > 0.2 ? 0.46 : through > 0.1 ? 0.24 : 0.07;');
  replace('showThrough.value = through;', "showThrough.value = through > 0.2 ? (state.type === 'tshirt' ? 0.46 : 0.39) : through;");
  // Scatter transmitted light more broadly; printed ink remains more opaque
  // than the unprinted fabric rather than becoming a translucent decal.
  replace("THREE.ShaderChunk.transmission_fragment.replace('n, v, material.roughness, material.diffuseColor', 'n, v, material.roughness * 0.5, material.diffuseColor')", "'#ifdef USE_TRANSMISSION\\nmaterial.transmission *= clamp(dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722)) * 1.4, 0.08, 1.0);\\n#endif\\n' + THREE.ShaderChunk.transmission_fragment.replace('n, v, material.roughness, material.diffuseColor', 'n, v, material.roughness * 0.78, material.diffuseColor')");
  replace('map: atlasTex, normalMap: fabN, normalScale: new THREE.Vector2(0.36, 0.36)', 'map: atlasTex, normalMap: fabN, normalScale: new THREE.Vector2(0.60, 0.60)');
  replace('color: 0xffffff, vertexColors: true, map: atlasTex, normalMap: fabN, normalScale: new THREE.Vector2(0.45, 0.45)', 'color: 0xffffff, vertexColors: true, map: atlasTex, normalMap: fabN, normalScale: new THREE.Vector2(0.56, 0.56)');
  replace('map: strapFibreMap, normalMap: fabN, normalScale: new THREE.Vector2(0.36, 0.36)', 'map: strapFibreMap, normalMap: fabN, normalScale: new THREE.Vector2(0.52, 0.52)');
  replace("r.fillStyle = 'rgb(214,214,214)'", "r.fillStyle = 'rgb(239,239,239)'");
  replace("r.strokeStyle = 'rgb(150,150,150)'", "r.strokeStyle = 'rgb(209,209,209)'");
  replace("design.front, '#a6a6a6'", "design.front, '#d4d4d4'");
  replace("design.back, '#a6a6a6'", "design.back, '#d4d4d4'");
  // Repeatable fine embossing, avoiding sparkling random pixel noise.
  replace('h[y * S + x] = v + (Math.random() - 0.5) * 0.35;', 'h[y * S + x] = v + 0.12 * Math.sin(x * 1.73 + y * 2.31) * Math.sin(y * 0.81 - x * 0.37);');
  replace("tile(fibres, PX / 40, 'soft-light', 0.55);", "tile(fibres, PX / 40, 'soft-light', 0.72);");
  // Bake restrained emboss contrast into the existing colour atlas. The pitch
  // matches the normal map (about 1.5 mm); no extra GPU map or render pass.
  replace('const t = new THREE.CanvasTexture(normalFromHeight(h, S, S, 1.6));', `const emboss=document.createElement('canvas');emboss.width=emboss.height=S;
  const ex=emboss.getContext('2d'),pixels=ex.createImageData(S,S);
  for(let i=0;i<h.length;i++){const tone=255-18*Math.min(1,Math.max(0,-h[i]));pixels.data[i*4]=pixels.data[i*4+1]=pixels.data[i*4+2]=tone;pixels.data[i*4+3]=255;}
  ex.putImageData(pixels,0,0);
  const t = new THREE.CanvasTexture(normalFromHeight(h, S, S, 1.6));
  t.userData.emboss=emboss;`);
  replace("tile(mottle, PX / 40, 'soft-light', 0.16);", "tile(mottle, PX / 40, 'soft-light', 0.16);\n  tile(fabN.userData.emboss, PX * FAB_TILE / 256, 'multiply', 0.55);");
  replace('handleTension -= 0.045', 'handleTension -= 0.048');
  replace('const cup = (fabric ? 0.045 : 0.025)', 'const cup = (fabric ? 0.075 : 0.035)');
  // A filtered shadow looks like a studio softbox rather than a jagged cutout.
  // Keep the existing 2048 map, so mobile texture memory does not increase.
  replace('renderer.shadowMap.type = THREE.PCFSoftShadowMap;', 'renderer.shadowMap.type = THREE.PCFShadowMap;');
  replace('key.shadow.mapSize.set(2048, 2048);', 'key.shadow.mapSize.set(2048, 2048);\nkey.shadow.radius = 3.5;');
  replace('new THREE.ShadowMaterial({ opacity: 0.2 })', 'new THREE.ShadowMaterial({ opacity: 0.14 })');
  return source;
}
