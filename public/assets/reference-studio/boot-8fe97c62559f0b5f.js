window.addEventListener('message', event => {
  if(event.source===parent && event.origin===location.origin && event.data?.type==='kobags:studio-status' && document.documentElement.dataset.studioUnavailable==='true') parent.postMessage({type:'kobags:studio-unavailable'},location.origin);
});
import('./studio-c9aad7180fa87a44.js').catch(() => {
  document.documentElement.dataset.studioUnavailable='true';
  const stage = document.getElementById('stage');
  const box = document.createElement('div'); box.setAttribute('role','alert'); box.style.cssText='position:absolute;inset:24px;display:grid;place-content:center;text-align:center;gap:16px';
  const message = document.createElement('p'); message.textContent='The 3D studio could not start. Please reload or try a browser with WebGL enabled.';
  const retry = document.createElement('button'); retry.textContent='Reload studio'; retry.onclick=()=>location.reload();
  box.append(message,retry);stage.replaceChildren(box);
  if(parent!==window) parent.postMessage({type:'kobags:studio-unavailable'},location.origin);
});