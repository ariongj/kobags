/** Keep the website backdrop white without changing the bags' tone mapping. */
export function whiteStudioBackdrop(source) {
  const replace = (before, after, label) => {
    if (!source.includes(before) || source.indexOf(before) !== source.lastIndexOf(before))
      throw new Error(`Studio white backdrop patch did not match once: ${label}`);
    source = source.replace(before, after);
  };
  replace('new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })', 'new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, premultipliedAlpha: false })', 'unpremultiplied white clear');
  replace("scene.background = new THREE.Color(cssVar('--stage') || '#e9e7e3').lerp(new THREE.Color(0xffffff), 0.12);", `// Preserve white RGB in transmission renders, but retain coverage alpha so
  // the final pass can composite the backdrop after material tone mapping.
  scene.background = null;
  renderer.setClearColor(0xffffff, 0);`, 'white coverage backdrop');
  replace("outerMat.customProgramCacheKey = () => 'bag-outer-bump';", `const originalWebsiteFabricShader = outerMat.onBeforeCompile;
outerMat.onBeforeCompile = shader => {
  originalWebsiteFabricShader(shader);
  // Transmission changes RGB lighting, not whether a surviving fabric fragment
  // covers the backdrop. Keep cut-out discard and all physical lighting intact.
  shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>', '#include <opaque_fragment>\\ngl_FragColor.a = 1.0;');
};
outerMat.customProgramCacheKey = () => 'bag-outer-bump-white-coverage';`, 'fabric coverage independent of transmission');
  replace('composer.addPass(new OutputPass());', `const websiteOutput = new OutputPass();
websiteOutput.material.fragmentShader = websiteOutput.material.fragmentShader
  .replace('gl_FragColor = texture2D( tDiffuse, vUv );', \`gl_FragColor = texture2D( tDiffuse, vUv );
    // Opaque fabric keeps its original linear colour. For transparent floor
    // shadows, include GTAO darkening in the black-shadow coverage first.
    float websiteCoverage = clamp(max(gl_FragColor.a, 1.0 - min(min(gl_FragColor.r, gl_FragColor.g), gl_FragColor.b)), 0.0, 1.0);
    gl_FragColor.rgb = max(vec3(0.0), (gl_FragColor.rgb - vec3(1.0 - websiteCoverage)) / max(websiteCoverage, 0.00001));\`)
  .replace('// color space', \`// Composite a true white backdrop after tone mapping, also for downloads.
    gl_FragColor.rgb = mix(vec3(1.0), gl_FragColor.rgb, websiteCoverage);
    gl_FragColor.a = 1.0;
    // color space\`);
composer.addPass(websiteOutput);`, 'white output composition');
  return source;
}
