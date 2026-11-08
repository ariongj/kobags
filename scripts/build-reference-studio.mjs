import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';
import { refineStudioModule } from '../vendor/kobags-reference-studio/realism-patch.mjs';

// Preserve the owner's studio as the base. Guarded geometry refinements and
// mobile controls are kept separate from its pinned source and delivery bridge.
const root = process.cwd();
const original = await readFile(resolve(root, 'vendor/kobags-reference-studio/index.html'), 'utf8');
const css = original.match(/<style>([\s\S]*?)<\/style>/)[1];
const module = refineStudioModule(original.match(/<script type="module">([\s\S]*?)<\/script>/)[1]
  // Three passes a timestamp to its callback. The source calls this parameter
  // "force", accidentally rendering continuously even while the bag is idle.
  // Preserve its scene and transitions, but respect the existing dirty flag.
  .replace('renderer.setAnimationLoop(render);', 'renderer.setAnimationLoop(() => render());')
  .replace('const w = stage.clientWidth, h = stage.clientHeight;', "const w = stage.clientWidth, h = Math.max(120, stage.clientHeight - (document.documentElement.dataset.embed === 'preview' ? 0 : 56));")
  .replace('let s = avail / W; if (H * s > 340) s = 340 / H;', `const mobile = innerWidth <= 760, focused = document.documentElement.dataset.canvasFocus === 'true';
  const editorCap = mobile ? Math.max(120, Math.min(340, focused ? innerHeight - 270 : document.getElementById('panes').clientHeight - 24)) : 340;
  let s = avail / W; if (H * s > editorCap) s = editorCap / H;`)
  .replace("if (s) { const [w, h] = elementSize(s); if (Math.abs(x - (s.x + w / 2)) < tol && Math.abs(y - (s.y + h / 2)) < tol) return [s, 'resize']; }", "if (s) { const [w, h] = elementSize(s), reach = Math.min(tol, Math.min(w, h) * 0.4); if (Math.abs(x - (s.x + w / 2)) < reach && Math.abs(y - (s.y + h / 2)) < reach) return [s, 'resize']; }"));
const bridge = await readFile(resolve(root, 'vendor/kobags-reference-studio/site-bridge.js'), 'utf8');
const usability = await readFile(resolve(root, 'vendor/kobags-reference-studio/usability.js'), 'utf8');
const references = await readFile(resolve(root, 'vendor/kobags-reference-studio/reference-gallery.js'), 'utf8');
const mobileCamera = await readFile(resolve(root, 'vendor/kobags-reference-studio/mobile-camera.js'), 'utf8');
const refinementCss = await readFile(resolve(root, 'vendor/kobags-reference-studio/usability.css'), 'utf8') + await readFile(resolve(root, 'vendor/kobags-reference-studio/reference-gallery.css'), 'utf8') + await readFile(resolve(root, 'vendor/kobags-reference-studio/mobile-camera.css'), 'utf8');
const directory = resolve(root, 'public/assets/reference-studio');
await mkdir(directory, { recursive: true });
const bundled = await build({
  stdin: { contents: `import qrcode from 'qrcode-studio';\nwindow.qrcode=qrcode;\n${module}\n${bridge}\n${usability}\n${references}\n${mobileCamera}`, resolveDir: root, sourcefile: 'kobags-reference-studio.js' },
  bundle: true, write: false, format: 'esm', minify: true, target: ['es2022'], legalComments: 'inline',
  banner: { js: '/*! QR Code Generator for JavaScript: Copyright (c) 2009 Kazuhiko Arase. MIT license. Full notices: /documents/third-party-notices.txt */' },
  plugins: [{ name: 'original-three-version', setup(b) {
    b.onResolve({ filter: /^three(?:\/|$)/ }, args => ({ path: resolve(root, 'node_modules/three-studio', args.path === 'three' ? 'build/three.module.js' : args.path.replace('three/addons/', 'examples/jsm/')) }));
  } }],
});
const javascript = bundled.outputFiles[0].text;
const extraCss = refinementCss + `\nhtml[data-embed="preview"] #panel,html[data-embed="preview"] #views,html[data-embed="preview"] .light,html[data-embed="preview"] .hud{display:none}html[data-embed="preview"] #app,html[data-embed="preview"] #stage{height:100%;width:100%}\n`;
const digest = x => createHash('sha256').update(x).digest('hex').slice(0, 16);
const jsName = `studio-${digest(javascript)}.js`, cssName = `studio-${digest(css + extraCss)}.css`;
await writeFile(resolve(directory, jsName), javascript);
await writeFile(resolve(directory, cssName), css + extraCss);
const bootstrap = `window.addEventListener('message', event => {
  if(event.source===parent && event.origin===location.origin && event.data?.type==='kobags:studio-status' && document.documentElement.dataset.studioUnavailable==='true') parent.postMessage({type:'kobags:studio-unavailable'},location.origin);
});
import('./${jsName}').catch(() => {
  document.documentElement.dataset.studioUnavailable='true';
  const stage = document.getElementById('stage');
  const box = document.createElement('div'); box.setAttribute('role','alert'); box.style.cssText='position:absolute;inset:24px;display:grid;place-content:center;text-align:center;gap:16px';
  const message = document.createElement('p'); message.textContent='The 3D studio could not start. Please reload or try a browser with WebGL enabled.';
  const retry = document.createElement('button'); retry.textContent='Reload studio'; retry.onclick=()=>location.reload();
  box.append(message,retry);stage.replaceChildren(box);
  if(parent!==window) parent.postMessage({type:'kobags:studio-unavailable'},location.origin);
});`;
const bootName = `boot-${digest(bootstrap)}.js`;
await writeFile(resolve(directory, bootName), bootstrap);
const document = original
  .replace(/<link[^>]+href="https:\/\/fonts[^>]+>\s*/g, '')
  .replace(/<style>[\s\S]*?<\/style>/, `<link rel="stylesheet" href="/assets/reference-studio/fonts/fonts.css"><link rel="stylesheet" href="/assets/reference-studio/${cssName}">`)
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace('</body>', `<script type="module" src="/assets/reference-studio/${bootName}"></script></body>`);
await writeFile(resolve(root, 'lib/reference-studio-document.ts'), `// Generated from the owner-supplied studio by scripts/build-reference-studio.mjs.\nexport const referenceStudioDocument = ${JSON.stringify(document)};\n`);
console.log(`Prepared the original studio: ${jsName}, ${cssName}`);
