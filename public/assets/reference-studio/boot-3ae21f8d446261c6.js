import('./studio-2b053008f173e86c.js').catch(() => {
  const stage = document.getElementById('stage');
  const box = document.createElement('div'); box.setAttribute('role','alert'); box.style.cssText='position:absolute;inset:24px;display:grid;place-content:center;text-align:center;gap:16px';
  const message = document.createElement('p'); message.textContent='The 3D studio could not start. Please reload or try a browser with WebGL enabled.';
  const retry = document.createElement('button'); retry.textContent='Reload studio'; retry.onclick=()=>location.reload();
  box.append(message,retry);stage.replaceChildren(box);
  if(parent!==window) parent.postMessage({type:'kobags:studio-unavailable'},location.origin);
});