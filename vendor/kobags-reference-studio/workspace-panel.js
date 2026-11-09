// Reuse the actual editor controls in a top toolbar and collapsible right panel.
// Geometry, draft state and artwork handlers remain owned by the supplied studio.
if (!isWebsitePreview) {
  const root=document.documentElement, app=document.getElementById('app');
  const panel=document.getElementById('panel'), tabs=document.getElementById('tabs');
  const sides=document.querySelector('.studio-side-tools'), save=document.getElementById('shot');
  const cameraSelect=document.getElementById('mobile-camera-view');
  const query=matchMedia('(max-width:760px), (max-width:1000px) and (max-height:500px)');
  root.classList.add('studio-workspace');
  const toolbar=document.createElement('div');toolbar.id='studio-toolbar';
  const nav=document.createElement('div');nav.className='studio-toolbar-nav';
  const viewTools=document.createElement('div');viewTools.className='studio-toolbar-view';
  const toggle=document.createElement('button');toggle.type='button';toggle.id='studio-panel-toggle';
  toggle.setAttribute('aria-controls','panel');
  nav.append(tabs,toggle);toolbar.append(nav,viewTools);app.prepend(toolbar);
  const panelHead=document.createElement('div');panelHead.className='studio-panel-heading';
  const title=document.createElement('strong');title.id='studio-panel-title';title.textContent='Products';
  const close=document.createElement('button');close.type='button';close.id='studio-panel-close';close.textContent='Hide →';close.setAttribute('aria-label','Hide editing panel');
  panelHead.append(title,close);panel.prepend(panelHead);panel.setAttribute('aria-labelledby',title.id);
  let opened=!query.matches, opener=toggle;
  function placeControls(){
    const canvasDialog=document.getElementById('artwork-canvas-dialog');
    if(!canvasDialog.open)viewTools.append(cameraSelect,sides,save);
    const bagPane=document.querySelector('[data-pane=bag]');
    bagPane.prepend(document.getElementById('bag-view'));
    bagPane.append(document.getElementById('lightBox'),document.getElementById('product-references'));
    root.style.setProperty('--studio-toolbar-height',`${toolbar.offsetHeight}px`);
  }
  function setPanel(value,restoreFocus=false){
    opened=value;root.dataset.panelOpen=String(value);panel.inert=!value;
    panel.setAttribute('aria-hidden',String(!value));toggle.setAttribute('aria-expanded',String(value));
    toggle.setAttribute('aria-label',value?'Hide editing panel':'Show editing panel');
    toggle.textContent=value?'Hide →':'Edit ☰';
    for(const b of tabs.querySelectorAll('button'))b.setAttribute('aria-expanded',String(value&&b.classList.contains('on')));
    title.textContent=tabs.querySelector('button.on')?.textContent||'Your design';
    if(!value&&restoreFocus)(opener?.isConnected?opener:toggle).focus({preventScroll:true});
  }
  toggle.addEventListener('click',()=>{opener=toggle;setPanel(!opened);});
  close.addEventListener('click',()=>setPanel(false,true));
  tabs.addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;opener=b;setPanel(true);});
  tabs.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){opener=document.activeElement;setPanel(true);}});
  const previousPanelTab=showTab;showTab=function(tab){previousPanelTab(tab);setPanel(opened);};
  document.addEventListener('keydown',event=>{
    if(event.key!=='Escape'||!opened||document.querySelector('dialog[open]')||event.defaultPrevented)return;
    event.preventDefault();setPanel(false,true);
  });
  // A selected sample is immediately revealed at full size on a phone.
  document.getElementById('samples').addEventListener('click',event=>{
    if(query.matches&&event.target.closest('.sample'))setPanel(false,true);
  });
  stage.addEventListener('pointerdown',()=>{if(query.matches&&opened)setPanel(false);});
  document.getElementById('artwork-canvas-dialog').addEventListener('close',placeControls);
  query.addEventListener('change',()=>{placeControls();setPanel(!query.matches);});
  new ResizeObserver(()=>root.style.setProperty('--studio-toolbar-height',`${toolbar.offsetHeight}px`)).observe(toolbar);
  placeControls();setPanel(opened);
}
