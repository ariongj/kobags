// Website refinements around the supplied studio. Keep its rendering and artwork model.
if (!isWebsitePreview) {
  const make = (tag, cls, text) => { const node = document.createElement(tag); if (cls) node.className = cls; if (text) node.textContent = text; return node; };
  const action = (label, fn, cls='') => { const b=make('button',cls,label);b.type='button';b.addEventListener('click',fn);return b; };
  const heading=document.querySelector('#panel .head h1'); heading.textContent='Make it yours.';
  const tabNames={samples:'Products',bag:'Bag & size',design:'Your design'};
  for(const b of document.querySelectorAll('#tabs button')) { b.textContent=tabNames[b.dataset.tab]; b.id='studio-tab-'+b.dataset.tab;b.setAttribute('aria-controls','studio-pane-'+b.dataset.tab); }
  for(const panel of document.querySelectorAll('[data-pane]')) {panel.id='studio-pane-'+panel.dataset.pane;panel.setAttribute('aria-labelledby','studio-tab-'+panel.dataset.pane);}
  document.querySelector('[data-pane=samples] .lead').textContent='Choose a starting design, then make either side your own.';
  const sideTools=make('div','studio-side-tools'); sideTools.setAttribute('role','group');sideTools.setAttribute('aria-label','Design either side of your bag');
  const sideActions={};
  const sideSelection={front:null,back:null};
  const chooseSide = which => {if(selected())sideSelection[side]=selId;side=which;selId=design[side].find(item=>item.id===sideSelection[side])?.id??design[side][0]?.id??null;syncSideUI();syncProps();showTab('design');setView(which);drawEditor();queueStudioSave();};
  for(const which of ['front','back']) {
    const b=action(which==='front'?'Front':'Back',()=>chooseSide(which),'studio-side-button'); b.id='edit-'+which;b.setAttribute('aria-label','Design the '+which);sideActions[which]=b;sideTools.append(b);
  }
  document.getElementById('stage').append(sideTools);
  const bagView=make('div','studio-bag-view');bagView.id='bag-view';bagView.setAttribute('role','group');bagView.setAttribute('aria-label','Bag presentation');
  bagView.append(make('span','','Bag view'));
  const viewButtons=[];
  for(const [mode,label] of [['open','Opened'],['flat','Folded']]){
    const button=action(label,()=>{
      if(state.bagView===mode)return;
      // Presentation changes geometry only. Keep the current camera, side,
      // selected artwork and print dimensions exactly where the buyer left them.
      state.bagView=mode;rebuild();syncBagView();queueStudioSave();
    });
    button.dataset.v=mode;button.id='bag-view-'+mode;button.setAttribute('aria-label',mode==='open'?'Show bag opened':'Show bag folded flat');viewButtons.push(button);bagView.append(button);
  }
  document.getElementById('tabs').before(bagView);
  bagView.addEventListener('keydown',event=>{
    const index=viewButtons.indexOf(document.activeElement);if(index<0)return;
    let next;if(event.key==='ArrowRight'||event.key==='ArrowLeft')next=1-index;else if(event.key==='Home')next=0;else if(event.key==='End')next=1;else return;
    event.preventDefault();viewButtons[next].focus();viewButtons[next].click();
  });
  function syncBagView(){
    for(const button of viewButtons){const active=button.dataset.v===(state.bagView==='flat'?'flat':'open');button.classList.toggle('on',active);button.setAttribute('aria-pressed',String(active));}
  }
  const title=make('strong','studio-edit-title','Front artwork');document.getElementById('sideSeg').prepend(title);
  const help=make('p','note studio-edit-help','Tap an item to select it. Drag to move, or use the controls below.');document.querySelector('.editor').before(help);
  const layerField=make('label','studio-artwork-picker');layerField.htmlFor='artwork-picker';layerField.append(make('span','','Select artwork'));
  const layerSelect=make('select');layerSelect.id='artwork-picker';layerField.append(layerSelect);document.querySelector('.editor').after(layerField);
  layerSelect.addEventListener('change',()=>select(layerSelect.value?Number(layerSelect.value):null));
  const addTools=document.getElementById('addText').parentElement;addTools.classList.add('studio-add-tools');
  // Keep the main actions above the canvas so phone users do not have to hunt
  // below the print area just to add their first logo or message.
  document.querySelector('.editor').before(addTools,layerField);
  const upload=addTools.querySelector('.file');upload.tabIndex=0;upload.setAttribute('role','button');upload.setAttribute('aria-label','Add a logo');
  upload.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();document.getElementById('addLogo').click();}});
  document.getElementById('addText').textContent='+ Text';document.getElementById('addQr').textContent='+ QR code';
  for(const [id,input] of [['addText',pText],['addQr',pQr]]) document.getElementById(id).addEventListener('click',()=>{input.focus({preventScroll:true});input.scrollIntoView({block:'nearest',behavior:'auto'});});
  const duplicate=action('Duplicate',()=>{const item=selected();if(!item)return;addItem({...item,id:nextId++,x:item.x+0.8,y:item.y+0.8});},'ghost');duplicate.id='duplicate-artwork';document.querySelector('.propsHead').insertBefore(duplicate,document.getElementById('delItem'));
  const move=make('div','studio-move');move.setAttribute('role','group');move.setAttribute('aria-label','Move selected artwork');
  for(const [label,symbol,dx,dy] of [['Move left','←',-0.5,0],['Move up','↑',0,-0.5],['Move down','↓',0,0.5],['Move right','→',0.5,0]]){
    const b=action(symbol,()=>{const item=selected();if(!item)return;item.x+=dx;item.y+=dy;clampEl(item);syncProps();changed();});b.setAttribute('aria-label',label);move.append(b);
  }
  props.append(move);
  const sizeRow=pSize.parentElement;sizeRow.classList.add('studio-size-row');
  const sizeButtons=[];
  for(const [label,symbol,amount] of [['Make artwork smaller','−',-0.5],['Make artwork larger','+',0.5]]){
    const b=action(symbol,()=>{const item=selected();if(!item)return;item.w+=amount;clampEl(item);syncProps();changed();});b.setAttribute('aria-label',label);sizeRow.append(b);sizeButtons.push(b);
  }
  // One set of controls, moved into a compact fixed panel on phones. Keeping the
  // dock outside the scrolling pane leaves selection and adjustments within reach.
  const mobileQuery=matchMedia('(max-width:760px)');
  const panes=document.getElementById('panes');
  const mobileTools=make('div','studio-mobile-tools');mobileTools.id='studio-mobile-tools';mobileTools.hidden=true;mobileTools.setAttribute('role','region');mobileTools.setAttribute('aria-label','Artwork controls');panes.before(mobileTools);
  const mobileRow=make('div','studio-mobile-selection');
  const detailsButton=action('Edit',()=>{const item=selected();if(!item)return;const field=item.kind==='text'?pText:item.kind==='qr'?pQr:item.kind==='logo'?pMethod.querySelector('button'):pSize;field.focus({preventScroll:true});field.scrollIntoView({block:'nearest',behavior:'auto'});});detailsButton.id='studio-edit-artwork';detailsButton.setAttribute('aria-label','Edit selected artwork');
  const addToggle=action('+ Add',()=>setAddMenu(addTools.hidden));addToggle.id='studio-add-toggle';addToggle.setAttribute('aria-label','Add logo, text or QR code');addToggle.setAttribute('aria-controls','studio-add-artwork');addToggle.setAttribute('aria-expanded','false');
  addTools.id='studio-add-artwork';addTools.setAttribute('role','group');addTools.setAttribute('aria-label','Add artwork');
  const quickAdjust=make('div','studio-quick-adjust');
  const quickSize=make('div','studio-quick-size');quickSize.setAttribute('role','group');quickSize.setAttribute('aria-label','Resize selected artwork');
  const quickWidth=make('output','studio-quick-width');quickWidth.id='studio-quick-width';quickWidth.setAttribute('aria-label','Selected artwork width');
  mobileRow.append(detailsButton,addToggle);quickAdjust.append(quickSize);mobileTools.append(mobileRow,quickAdjust,quickWidth);
  function setAddMenu(open,returnFocus=false){
    if(!mobileQuery.matches)return;
    addTools.hidden=!open;addToggle.setAttribute('aria-expanded',String(open));
    if(returnFocus)addToggle.focus({preventScroll:true});
  }
  for(const id of ['addText','addQr'])document.getElementById(id).addEventListener('click',()=>setAddMenu(false));
  document.getElementById('addLogo').addEventListener('change',()=>setAddMenu(false,true));
  mobileTools.addEventListener('keydown',event=>{if(event.key==='Escape'&&!addTools.hidden){event.preventDefault();setAddMenu(false,true);}});
  const editorBox=document.querySelector('.editor');
  const canvasHeading=make('div','studio-canvas-heading');
  const expandCanvas=action('Expand canvas',openCanvas);expandCanvas.id='expand-artwork-canvas';expandCanvas.setAttribute('aria-haspopup','dialog');expandCanvas.setAttribute('aria-controls','artwork-canvas-dialog');
  canvasHeading.append(help,expandCanvas);editorBox.before(canvasHeading);
  const canvasDialog=make('dialog','studio-canvas-dialog');canvasDialog.id='artwork-canvas-dialog';canvasDialog.setAttribute('aria-labelledby','artwork-canvas-title');
  const canvasHeader=make('div','studio-canvas-header');
  const canvasTitle=make('h2','','Place your artwork');canvasTitle.id='artwork-canvas-title';
  const closeCanvas=action('Done',()=>canvasDialog.close());closeCanvas.id='close-artwork-canvas';
  canvasHeader.append(canvasTitle,closeCanvas);
  const canvasSides=make('div','studio-canvas-sides');
  const canvasTools=make('div','studio-canvas-tools');
  const canvasBody=make('div','studio-canvas-body');
  canvasDialog.append(canvasHeader,canvasSides,canvasTools,canvasBody);document.body.append(canvasDialog);
  let canvasOpener=null;
  function openCanvas(){
    if(canvasDialog.open)return;
    canvasOpener=document.activeElement;setAddMenu(false);
    document.documentElement.dataset.canvasFocus='true';
    canvasSides.append(sideTools);canvasTools.append(layerField,quickAdjust,quickWidth);quickAdjust.prepend(move);quickSize.append(...sizeButtons);canvasBody.append(editorBox);
    canvasDialog.showModal();drawEditor();ed.focus({preventScroll:true});
  }
  canvasDialog.addEventListener('close',()=>{
    delete document.documentElement.dataset.canvasFocus;
    document.getElementById('stage').append(sideTools);canvasHeading.after(editorBox);
    mobileTools.append(quickAdjust,quickWidth);layoutArtworkTools();drawEditor();
    const target=canvasOpener?.isConnected&&canvasOpener.getClientRects().length?canvasOpener:expandCanvas;target.focus({preventScroll:true});
  });
  function layoutArtworkTools(){
    // Rotation/resizing while the dialog is open must not pull its controls out.
    if(canvasDialog.open){syncDock();return;}
    const focused=document.activeElement;
    const focusInTools=mobileTools.contains(focused)||addTools.contains(focused)||layerField.contains(focused)||move.contains(focused)||sizeButtons.includes(focused);
    const mobile=mobileQuery.matches;
    if(mobile){mobileRow.prepend(layerField);mobileRow.after(addTools);quickAdjust.prepend(move);quickSize.append(...sizeButtons);setAddMenu(false);}
    else{document.querySelector('.editor').before(addTools,layerField);props.append(move);sizeRow.append(...sizeButtons);addTools.hidden=false;}
    syncDock();
    if(focusInTools){
      const target=focused.isConnected&&focused.getClientRects().length&&!focused.matches(':disabled')?focused:document.querySelector('#tabs button.on');
      target?.focus({preventScroll:true});
    }
  }
  function syncDock(){
    const active=document.querySelector('#tabs button.on')?.dataset.tab||'samples';
    document.documentElement.dataset.studioTab=active;
    mobileTools.hidden=!mobileQuery.matches||active!=='design';
    // Keep the adjustment row's height stable. Selecting artwork during a touch
    // drag must not move the canvas underneath the finger.
    const item=selected();detailsButton.disabled=!item;
    for(const button of [...move.querySelectorAll('button'),...sizeButtons])button.disabled=!item;
    quickWidth.textContent=item?`${fmt(item.w)} cm wide`:'Select artwork to move or resize';
    if(!mobileTools.hidden&&item)sideSelection[side]=item.id;
  }
  mobileQuery.addEventListener('change',layoutArtworkTools);
  const previousTab=showTab;showTab=function(tab){previousTab(tab);setAddMenu(false);syncDock();};
  const confirmation=make('div','studio-copy-confirm');confirmation.hidden=true;confirmation.setAttribute('role','group');confirmation.setAttribute('aria-label','Replace other side artwork');
  confirmation.append(make('span','','Replace the artwork on the other side?'));
  const originalCopy=copyBtn.onclick;
  const replaceCopy=action('Replace artwork',()=>{originalCopy();confirmation.hidden=true;syncFriendlyControls();copyBtn.focus();});replaceCopy.id='confirm-copy';
  confirmation.append(replaceCopy,action('Cancel',()=>{confirmation.hidden=true;copyBtn.focus();}));document.getElementById('sideSeg').after(confirmation);
  copyBtn.onclick=()=>{const other=side==='front'?'back':'front';if(design[other].length){confirmation.hidden=false;replaceCopy.focus();}else{originalCopy();syncFriendlyControls();}};
  function syncFriendlyControls(){
    const items=design[side]; const remembered=String(selId??'');
    const pickerFocused=document.activeElement===layerSelect;
    layerSelect.replaceChildren(new Option(items.length?'Choose an item…':'Add a logo, text or QR code',''));
    for(const [i,item] of items.entries()) {
      const label=item.kind==='text'?item.text:item.kind==='logo'?(assets.get(item.asset)?.name||'Logo'):item.kind==='qr'?'QR code':'Artwork';
      layerSelect.add(new Option(`${i+1}. ${String(label).replace(/\s+/g,' ').slice(0,48)}`,String(item.id)));
    }
    layerSelect.value=remembered;layerSelect.disabled=!items.length;if(pickerFocused)layerSelect.focus();
    for(const which of ['front','back']) {const button=sideActions[which];button.textContent=`${which==='front'?'Front':'Back'} · ${design[which].length}`;button.classList.toggle('on',which===side);button.setAttribute('aria-pressed',String(which===side));}
    title.textContent=side==='front'?'Front artwork':'Back artwork';copyBtn.textContent=side==='front'?'Copy to back':'Copy to front';
    layerSelect.setAttribute('aria-label',`Select ${side} artwork`);
    const summary=document.getElementById('designNote');summary.textContent=items.length?'Select an item above, drag it on the canvas, or use the move and size controls.':'This side is blank. Add your logo, a message or a QR code.';
    document.documentElement.dataset.editingSide=side;
    if(selected())sideSelection[side]=selId;
    syncBagView();
    syncDock();
  }
  const previousProps=syncProps;syncProps=function(){previousProps();syncFriendlyControls();};
  const previousChanged=changed;changed=function(){previousChanged();syncFriendlyControls();};
  const previousSide=syncSideUI;syncSideUI=function(){previousSide();confirmation.hidden=true;syncFriendlyControls();};
  document.getElementById('tabs').addEventListener('keydown',event=>{
    const buttons=[...document.querySelectorAll('#tabs button')],index=buttons.indexOf(document.activeElement);if(index<0)return;
    let next;if(event.key==='ArrowRight')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft')next=(index+buttons.length-1)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;
    event.preventDefault();buttons[next].focus();showTab(buttons[next].dataset.tab);
  });
  layoutArtworkTools();
  syncFriendlyControls();
}
