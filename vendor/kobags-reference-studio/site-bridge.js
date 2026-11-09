// Website integration only. The model, materials, lighting, samples and UI
// remain in the untouched upstream index.html beside this file.
const isWebsitePreview = document.documentElement.dataset.embed === 'preview';
const draftKey = 'kobags-reference-studio-v1';
let bridgeReady = false;
window.addEventListener('storage', event => {
  if (!isWebsitePreview && event.key === draftKey && event.newValue === null) {
    // Honour the website's explicit clear-draft action in every open studio.
    bridgeReady = false; clearTimeout(saveTimer); location.reload();
  }
});
function sendWebsite(type, payload = {}) {
  if (window.parent !== window) window.parent.postMessage({ type, ...payload }, location.origin);
}
function storeStudioDraft() {
  if (!bridgeReady || isWebsitePreview) return;
  try {
    const used = new Set([...design.front, ...design.back].filter(el => el.kind === 'logo').map(el => el.asset));
    const uploaded = [...assets.entries()].filter(([id]) => used.has(id)).map(([id, a]) => [id, { name: a.name, mask: a.mask.toDataURL(), color: a.color.toDataURL() }]);
    localStorage.setItem(draftKey, JSON.stringify({ version: 1, state, design, side, nextId, uploaded }));
  } catch { sendWebsite('kobags:storage-unavailable'); }
}
let saveTimer;
function queueStudioSave() {
  clearTimeout(saveTimer); saveTimer = setTimeout(storeStudioDraft, 350);
}
for (const name of ['input', 'change', 'click', 'pointerup']) document.addEventListener(name, queueStudioSave, { passive: true });
// Upload decoding finishes after the input event; save after the actual edit.
const originalChanged = changed;
changed = function() { originalChanged(); queueStudioSave(); };
function boundedImage(c) {
  let result = c.toDataURL('image/png');
  if (result.length <= 80000) return result;
  for (const quality of [0.9, 0.8, 0.65]) {
    result = c.toDataURL('image/webp', quality);
    if (result.length <= 80000) return result;
  }
  if (c.width <= 180) throw Error('IMAGE_TOO_LARGE');
  const smaller = document.createElement('canvas'); smaller.width = Math.round(c.width * 0.75); smaller.height = Math.round(c.height * 0.75);
  smaller.getContext('2d').drawImage(c, 0, 0, smaller.width, smaller.height);
  return boundedImage(smaller);
}
function printForQuote(which) {
  if (!design[which].length) return '';
  const c = document.createElement('canvas');
  c.width = 900; c.height = Math.round(900 * state.H / state.W);
  const x = c.getContext('2d'); drawSide(x, 900 / state.W, 0, 0, design[which]);
  return boundedImage(c);
}
function quotePreviews() {
  const position = camera.position.clone(), target = controls.target.clone();
  const cameraChoice = document.getElementById('mobile-camera-view')?.value;
  const shots = {};
  try {
    for (const which of ['front', 'back']) {
      setView(which, false); render(true);
      const c = document.createElement('canvas'), original = renderer.domElement;
      const ratio = Math.min(1, 800 / Math.max(original.width, original.height));
      c.width = Math.round(original.width * ratio); c.height = Math.round(original.height * ratio);
      c.getContext('2d').drawImage(original, 0, 0, c.width, c.height); shots[which] = boundedImage(c);
    }
  } finally { tween = null; camera.position.copy(position); controls.target.copy(target); controls.update(); dirty = true; if (cameraChoice !== undefined) document.getElementById('mobile-camera-view').value = cameraChoice; }
  return { source: 'ariongj-mo-b23cd8f', productName: TYPES[state.type].name, size: state.size, dimensions: `${state.W} × ${state.H} × ${state.D} cm`, fabric: state.bag, ...shots };
}
window.addEventListener('message', e => {
  if (e.source !== window.parent || e.origin !== location.origin || !bridgeReady) return;
  if (e.data?.type === 'kobags:studio-status') sendWebsite('kobags:studio-ready');
  if (e.data?.type === 'kobags:request-quote') {
    storeStudioDraft();
    try { sendWebsite('kobags:quote-design', { bag: { ...state }, front: printForQuote('front'), back: printForQuote('back'), referenceStudio: quotePreviews() }); }
    catch { sendWebsite('kobags:quote-error'); }
  }
});
async function restoreStudioDraft() {
  if (isWebsitePreview) return;
  try {
    const saved = JSON.parse(localStorage.getItem(draftKey) || 'null');
    if (saved?.version !== 1 || !Object.hasOwn(TYPES, saved.state?.type)) return;
    const s = saved.state;
    if (!TYPES[s.type].sizes.some(v => v[0] === s.size) || !/^#[\da-f]{6}$/i.test(s.bag)) return;
    if (!Array.isArray(saved.design?.front) || !Array.isArray(saved.design?.back) || saved.design.front.length + saved.design.back.length > 100) return;
    // Asset keys share the element counter. Preserve its high-water mark so a
    // later upload cannot replace an older logo after the draft is restored.
    if (Number.isSafeInteger(saved.nextId) && saved.nextId > 0 && saved.nextId < 1_000_000_000) nextId = Math.max(nextId, saved.nextId);
    for (const [id, a] of (saved.uploaded || []).slice(0, 32)) {
      if (typeof id !== 'string' || id.length > 100 || !a.mask?.startsWith('data:image/png;base64,') || !a.color?.startsWith('data:image/png;base64,') || a.mask.length + a.color.length > 8_000_000) continue;
      const [mask, color] = await Promise.all([loadImage(a.mask), loadImage(a.color)]);
      if ([mask, color].some(im => im.width > 4096 || im.height > 4096)) continue;
      const toCanvas = im => { const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; c.getContext('2d').drawImage(im, 0, 0); return c; };
      assets.set(id, { name: String(a.name || 'Logo').slice(0, 200), mask: toCanvas(mask), color: toCanvas(color) });
    }
    design.front = []; design.back = []; applyType(s.type); applySize(s.size);
    // Migrate the original T-shirt-only switch without making old drafts of
    // other bag types folded merely because they retained a vest preference.
    const bagView = s.bagView === 'flat' || (s.bagView == null && s.type === 'tshirt' && s.vestView === 'flat') ? 'flat' : 'open';
    Object.assign(state, { bag: s.bag, handle: s.handle === 'match' || /^#[\da-f]{6}$/i.test(s.handle) ? s.handle : 'match', strap: s.strap === 'webbing' ? 'webbing' : 'fabric', pose: s.pose === 'relaxed' ? 'relaxed' : 'upright', bagView });
    if (Number.isFinite(s.drop)) state.drop = Math.max(6, Math.min(35, s.drop));
    for (const k of ['front', 'back']) design[k] = saved.design[k].filter(el => ['text', 'logo', 'graphic', 'qr'].includes(el.kind) && [el.x, el.y, el.w].every(Number.isFinite) && /^#[\da-f]{6}$/i.test(el.ink) && (el.kind !== 'logo' || assets.has(el.asset)) && (el.kind !== 'graphic' || Object.hasOwn(graphics, el.graphic))).map(el => { const copy = { ...el, id: nextId++, text: String(el.text || '').slice(0, 2000), data: String(el.data || '').slice(0, 2000) }; clampEl(copy); return copy; });
    side = saved.side === 'back' ? 'back' : 'front'; selId = null;
    syncBag(); syncHandle(); syncStrap(); syncAll(); syncSideUI();
    document.querySelectorAll('#poseSeg button').forEach(b => b.classList.toggle('on', b.dataset.v === state.pose));
    applyColours(); rebuild(); redrawAtlas(); drawEditor(); syncProps(); clearSample(); setView(side === 'back' ? 'back' : '34', false);
  } catch { /* Corrupt/blocked storage cannot prevent the supplied studio opening. */ }
}
const startup = setInterval(async () => {
  if (!window.__ready) return;
  clearInterval(startup);
  // An explicit product/sample link takes precedence over a previously saved draft.
  if (!openFromHash()) await restoreStudioDraft();
  bridgeReady = true;
  document.documentElement.dataset.studioSource = 'ariongj-mo-b23cd8f';
  sendWebsite('kobags:studio-ready');
}, 50);
