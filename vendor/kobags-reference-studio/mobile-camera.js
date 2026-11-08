// Compact camera choices leave the top of the actual bag visible on phones.
if (!isWebsitePreview) {
  const viewSelect=document.createElement('select');
  viewSelect.id='mobile-camera-view';viewSelect.setAttribute('aria-label','Camera view');
  const free=new Option('Free view','');free.disabled=true;viewSelect.add(free);
  for(const [value,label] of [['34','3/4 view'],['front','Front'],['back','Back'],['side','Side'],['top','Inside']])viewSelect.add(new Option(label,value));
  viewSelect.addEventListener('change',()=>setView(viewSelect.value));
  document.getElementById('stage').append(viewSelect);
  viewSelect.value=document.querySelector('#views button.on')?.dataset.view||'34';
  const previousCameraView=setView;
  setView=function(name,animate=true){previousCameraView(name,animate);viewSelect.value=name;};
  window.__api.setView=setView;
  controls.addEventListener('start',()=>{viewSelect.value='';});
  // The editor is fitted to its available pane, including after Add expands or
  // the phone rotates. Its own draw function updates pointer coordinates too.
  let editorResizeFrame;
  new ResizeObserver(()=>{cancelAnimationFrame(editorResizeFrame);editorResizeFrame=requestAnimationFrame(()=>drawEditor());}).observe(document.getElementById('panes'));
}
