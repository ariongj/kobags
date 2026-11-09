// Progressive disclosure around the original controls, with one place for each
// task. Reparent real elements so upload, drafts and the precise editor stay shared.
if (!isWebsitePreview) {
  const root=document.documentElement;
  root.classList.add('studio-organized');
  const tabs=document.getElementById('tabs'), bagPane=document.querySelector('[data-pane=bag]');
  const designSection=document.getElementById('designSec');
  const panel=document.getElementById('panel');
  const camera=document.getElementById('mobile-camera-view'), save=document.getElementById('shot');
  const sides=document.querySelector('.studio-side-tools');
  const add=document.getElementById('studio-add-artwork');
  const layers=document.querySelector('.studio-artwork-picker');
  const precise=document.getElementById('expand-artwork-canvas');
  const dialog=document.getElementById('artwork-canvas-dialog');
  const bagTab=tabs.querySelector('[data-tab=bag]'), designTab=tabs.querySelector('[data-tab=design]'), templates=tabs.querySelector('[data-tab=samples]');
  bagTab.textContent='Bag';designTab.textContent='Design';templates.textContent='Templates';
  tabs.append(bagTab,designTab,templates);tabs.setAttribute('aria-label','Studio tools');
  document.querySelector('[data-pane=samples] .lead').textContent='Optional starting designs. Choose one to replace the current design.';
  const details=(label,id)=>{const d=document.createElement('details');d.className='studio-options';d.id=id;const s=document.createElement('summary');s.textContent=label;d.append(s);return d;};
  const view=details('View, lighting & references','studio-view-options');bagPane.append(view);
  const viewRow=document.createElement('div');viewRow.className='studio-view-options-row';view.append(viewRow);
  const handles=document.getElementById('handlesSec');
  const handlesDetail=details('Handle options','studio-handle-options');
  const handleHeading=document.getElementById('handlesTitle');
  handlesDetail.querySelector('summary').replaceChildren(handleHeading);
  handlesDetail.append(...Array.from(handles.childNodes).filter(n=>n!==handleHeading));handles.append(handlesDetail);
  const designIntro=document.createElement('p');designIntro.className='studio-design-intro';designIntro.textContent='Add your artwork. Move and resize it directly on the bag.';
  const extras=document.createElement('div');extras.className='studio-design-extras';
  designSection.prepend(designIntro);designSection.append(extras);
  const idle=document.createElement('div');idle.id='studio-add-dock';idle.setAttribute('role','group');idle.setAttribute('aria-label','Add to this side');
  for(const [label,id] of [['+ Logo','addLogo'],['+ Text','addText'],['+ QR','addQr']]){
    const button=document.createElement('button');button.type='button';button.textContent=label;
    button.addEventListener('click',()=>{
      if(id==='addLogo'){document.getElementById(id).click();return;}
      designTab.click();document.getElementById(id).click();
    });idle.append(button);
  }
  stage.append(idle);
  function place(){
    if(dialog.open)return;
    viewRow.append(camera,save);
    view.append(document.getElementById('bag-view'),document.getElementById('lightBox'),document.getElementById('product-references'));
    document.querySelector('.studio-toolbar-view').append(sides);
    designIntro.after(add,layers,props);
    extras.append(precise,document.getElementById('sideSeg'));
    precise.textContent='Precise placement';
    add.hidden=false;
  }
  function sync(){
    add.hidden=false;
    idle.hidden=!!selected()||dialog.open;
    // No disabled editing toolbar on an unselected bag; show simple add actions.
    document.getElementById('direct-artwork-tools').hidden=!selected()||dialog.open;
    root.dataset.artworkSelected=String(!!selected());
  }
  const oldSync=syncProps;syncProps=function(){oldSync();sync();};
  const oldTab=showTab;showTab=function(tab){oldTab(tab);sync();};
  // Other wrappers can hide the add row after adding; restore only its visibility.
  new MutationObserver(()=>{if(add.hidden)add.hidden=false;}).observe(add,{attributes:true,attributeFilter:['hidden']});
  dialog.addEventListener('close',()=>{place();sync();});
  dialog.addEventListener('toggle',sync);
  matchMedia('(max-width:760px), (max-width:1000px) and (max-height:500px)').addEventListener('change',()=>{place();sync();});
  // Capture original next-step actions too, keeping drawer heading/state coherent.
  panel.addEventListener('click',event=>{const next=event.target.closest('[data-go]');if(next)tabs.querySelector(`[data-tab="${next.dataset.go}"]`)?.click();});
  place();showTab('bag');sync();
}
