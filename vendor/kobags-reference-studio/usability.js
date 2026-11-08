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
  const chooseSide = which => {side=which;selId=null;syncSideUI();syncProps();showTab('design');setView(which);drawEditor();queueStudioSave();};
  for(const which of ['front','back']) {
    const b=action(which==='front'?'Front':'Back',()=>chooseSide(which),'studio-side-button'); b.id='edit-'+which;b.setAttribute('aria-label','Design the '+which);sideActions[which]=b;sideTools.append(b);
  }
  document.getElementById('stage').append(sideTools);
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
  for(const [label,symbol,amount] of [['Make artwork smaller','−',-0.5],['Make artwork larger','+',0.5]]){
    const b=action(symbol,()=>{const item=selected();if(!item)return;item.w+=amount;clampEl(item);syncProps();changed();});b.setAttribute('aria-label',label);sizeRow.append(b);
  }
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
    const summary=document.getElementById('designNote');summary.textContent=items.length?'Select an item above, drag it on the canvas, or use the move and size controls.':'This side is blank. Add your logo, a message or a QR code.';
    document.documentElement.dataset.editingSide=side;
  }
  const previousProps=syncProps;syncProps=function(){previousProps();syncFriendlyControls();};
  const previousChanged=changed;changed=function(){previousChanged();syncFriendlyControls();};
  const previousSide=syncSideUI;syncSideUI=function(){previousSide();confirmation.hidden=true;syncFriendlyControls();};
  document.getElementById('tabs').addEventListener('keydown',event=>{
    const buttons=[...document.querySelectorAll('#tabs button')],index=buttons.indexOf(document.activeElement);if(index<0)return;
    let next;if(event.key==='ArrowRight')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft')next=(index+buttons.length-1)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;
    event.preventDefault();buttons[next].focus();showTab(buttons[next].dataset.tab);
  });
  syncFriendlyControls();
}
