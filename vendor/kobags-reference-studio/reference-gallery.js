// Approved production photographs already used by the Kobags catalogue.
// Full photos are requested only when the references are opened.
(() => {
  if (document.documentElement.dataset.embed === 'preview') return;
  const base = '/assets/client-2026-09/';
  const photos = {
    box: [
      { src: base + 'box-bag.jpg', label: 'Natural Box bag', detail: 'Loop handles, welded attachments and a folded side gusset.' },
      { src: base + 'detail-box.jpg', label: 'Red Box bag', detail: 'Fabric texture, the top hem and the finished base.' },
    ],
    handle: [
      { src: base + 'handle-bag.jpg', label: 'Olive Handle bag', detail: 'Soft loop handles and their attachment to the top hem.' },
      { src: base + 'detail-handle.jpg', label: 'Black Handle bag', detail: 'Front panel, handle shape and the non-woven finish.' },
    ],
    dcut: [
      { src: base + 'd-cut-bag.jpg', label: 'Black D-cut bag', detail: 'The integrated grip, fabric texture and finished edges.' },
    ],
    tshirt: [
      { src: base + 't-shirt-bag.jpg', label: 'T-shirt bag', detail: 'The centre tab, integrated handles and side folds.' },
      { src: '/assets/client-2026-10/thank-you-stock-640.webp', label: 'Thank you collection', detail: 'Finished T-shirt bags photographed on the production floor.' },
    ],
    string: [
      { src: base + 'string-bag.jpg', label: 'String bag, upright', detail: 'The gathered opening, cord and natural fabric folds.' },
      { src: base + 'detail-string.jpg', label: 'String bag, laid down', detail: 'The cord channel and the way the material rests.' },
    ],
    bottle: [], // No approved Bottle photo: do not label another shape as one.
  };
  const gallery = document.createElement('details');
  gallery.id = 'product-references';
  gallery.className = 'reference-gallery';
  const summary = document.createElement('summary');
  const title = document.createElement('span'); title.textContent = 'Real bag references';
  const count = document.createElement('span'); count.className = 'reference-gallery-count';
  summary.append(title, count);
  const grid = document.createElement('div'); grid.className = 'reference-gallery-grid';
  gallery.append(summary, grid);
  document.getElementById('tabs').after(gallery);

  const dialog = document.createElement('dialog');
  dialog.id = 'reference-photo-dialog';
  dialog.className = 'reference-photo-dialog';
  dialog.setAttribute('aria-labelledby', 'reference-photo-title');
  dialog.setAttribute('aria-describedby', 'reference-photo-description');
  const head = document.createElement('header'); head.className = 'reference-photo-head';
  const heading = document.createElement('h2'); heading.id = 'reference-photo-title';
  const close = document.createElement('button'); close.type = 'button'; close.textContent = 'Close';
  close.setAttribute('aria-label', 'Close product reference');
  head.append(heading, close);
  const img = document.createElement('img'); img.className = 'reference-photo-image'; img.decoding = 'async'; img.width = 1280; img.height = 1600;
  const description = document.createElement('p'); description.id = 'reference-photo-description';
  const controls = document.createElement('div'); controls.className = 'reference-photo-controls';
  const prev = document.createElement('button'); prev.type = 'button'; prev.textContent = 'Previous';
  const next = document.createElement('button'); next.type = 'button'; next.textContent = 'Next';
  const status = document.createElement('span'); status.setAttribute('aria-live', 'polite'); status.setAttribute('aria-atomic', 'true');
  controls.append(prev, status, next);
  dialog.append(head, img, description, controls);
  document.body.appendChild(dialog);
  let family = '', rows = [], index = 0, opener = null;
  function showPhoto(value) {
    if (!rows.length) return;
    index = (value + rows.length) % rows.length;
    const photo = rows[index];
    img.src = photo.src; img.alt = `Real Kobags ${photo.label.toLowerCase()}`;
    heading.textContent = photo.label;
    description.textContent = photo.detail;
    status.textContent = `${index + 1} of ${rows.length}`;
    prev.disabled = next.disabled = rows.length < 2;
  }
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    img.removeAttribute('src');
    (opener?.isConnected ? opener : summary).focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); showPhoto(index + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  prev.addEventListener('click', () => showPhoto(index - 1));
  next.addEventListener('click', () => showPhoto(index + 1));
  function drawGallery() {
    grid.replaceChildren();
    if (!gallery.open) return;
    rows.forEach((photo, i) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'reference-gallery-card';
      button.setAttribute('aria-label', `View ${photo.label.toLowerCase()} production photograph`);
      button.setAttribute('aria-haspopup', 'dialog');
      const image = document.createElement('img'); image.src = photo.src; image.alt = ''; image.width = 120; image.height = 90; image.loading = 'lazy'; image.decoding = 'async';
      const label = document.createElement('span'); label.textContent = photo.label;
      button.append(image, label);
      button.addEventListener('click', () => { opener = button; showPhoto(i); dialog.showModal(); close.focus(); });
      grid.appendChild(button);
    });
  }
  function updateReferenceGallery() {
    if (family === state.type) return;
    family = state.type; rows = photos[family] || [];
    gallery.hidden = !rows.length;
    gallery.dataset.product = family;
    count.textContent = `${rows.length} ${rows.length === 1 ? 'photo' : 'photos'}`;
    if (dialog.open) dialog.close();
    drawGallery();
  }
  gallery.addEventListener('toggle', drawGallery);
  // applyType updates this text for direct type changes, samples and saved drafts.
  new MutationObserver(updateReferenceGallery).observe(document.getElementById('typeSub'), { childList: true, characterData: true, subtree: true });
  window.updateReferenceGallery = updateReferenceGallery;
  updateReferenceGallery();
})();
