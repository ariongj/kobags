// Lower only the homepage preview's GPU workload; the editing studio retains
// its full-resolution geometry, shadows, transmission and export buffer.
export function previewPerformance(source) {
  const replace = (from, to) => {
    if (!source.includes(from)) throw new Error(`Preview performance anchor missing: ${from}`);
    source = source.replaceAll(from, to);
  };
  replace('const stage = document.getElementById(\'stage\');', `const showcasePreviewMode = document.documentElement.dataset.embed === 'preview';
const stage = document.getElementById('stage');`);
  replace('preserveDrawingBuffer: true', 'preserveDrawingBuffer: !showcasePreviewMode');
  replace('renderer.shadowMap.enabled = true;', 'renderer.shadowMap.enabled = !showcasePreviewMode;');
  replace('NV = 110;', 'NV = showcasePreviewMode ? 55 : 110;');
  replace('grid(80,', 'grid(showcasePreviewMode ? 40 : 80,');
  replace('grid(16, NG,', 'grid(showcasePreviewMode ? 8 : 16, NG,');
  replace("TYPES[state.type].handles === 'tshirt' ? 2 : 32", "TYPES[state.type].handles === 'tshirt' ? 2 : (showcasePreviewMode ? 16 : 32)");
  replace('const N = 200, pts = curve.getSpacedPoints(N), K = 20;', 'const N = showcasePreviewMode ? 100 : 200, pts = curve.getSpacedPoints(N), K = showcasePreviewMode ? 10 : 20;');
  replace('composer.setPixelRatio(renderer.getPixelRatio()); composer.setSize(w, h);', 'if (!showcasePreviewMode) { composer.setPixelRatio(renderer.getPixelRatio()); composer.setSize(w, h); }');
  replace('function render(force = false) {', 'function render(force = false) {\n  if (showcasePreviewMode) return;');
  return source;
}
