// Edit the existing centimetre-based artwork on the actual 3D mesh. Nothing is
// baked into the model: exports, drafts, both sides and the flat editor share it.
if (!isWebsitePreview) {
  const canvas=renderer.domElement, ray=new THREE.Raycaster(), pointer=new THREE.Vector2();
  const ns='http://www.w3.org/2000/svg';
  const outline=document.createElementNS(ns,'svg');outline.id='direct-artwork-outline';outline.setAttribute('aria-hidden','true');
  const polygon=document.createElementNS(ns,'polygon');outline.append(polygon);
  const handle=document.createElement('button');handle.id='direct-artwork-resize';handle.type='button';handle.textContent='↘';handle.setAttribute('aria-label','Resize selected artwork. Drag or use arrow keys.');
  const dock=document.createElement('div');dock.id='direct-artwork-tools';dock.setAttribute('role','group');dock.setAttribute('aria-label','Edit artwork on the bag');
  const picker=document.createElement('select');picker.id='direct-artwork-picker';picker.setAttribute('aria-label','Select artwork on the bag');
  const width=document.createElement('output');width.id='direct-artwork-width';width.setAttribute('aria-label','Artwork width');
  const hint=document.createElement('p');hint.id='direct-artwork-hint';hint.textContent='Tap artwork to edit · drag an empty area to rotate';
  const button=(label,text,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=text;b.setAttribute('aria-label',label);b.addEventListener('click',fn);return b;};
  const adjust=amount=>{const item=selected();if(!item)return;item.w=Math.max(minWidth(item),item.w+amount);clampEl(item);syncProps();changed();};
  const smaller=button('Shrink selected artwork','−',()=>adjust(-.5));
  const larger=button('Enlarge selected artwork','+',()=>adjust(.5));
  const done=button('Finish editing artwork','Done',()=>{select(null);canvas.focus({preventScroll:true});});
  dock.append(picker,smaller,width,larger,done);stage.append(outline,handle,dock,hint);
  canvas.tabIndex=0;canvas.setAttribute('aria-label','3D bag. Tap artwork to select and drag it. Drag an empty area to rotate.');
  let gesture=null, cachedKey='', listKey='', active=false;
  const contacts=new Map();
  const label=item=>item.kind==='logo'?(assets.get(item.asset)?.name||'Logo'):item.kind==='text'?(item.text||'Text'):item.kind==='qr'?'QR code':'Artwork';

  function surfaceAt(clientX,clientY) {
    const r=canvas.getBoundingClientRect();
    pointer.set((clientX-r.left)/r.width*2-1,1-(clientY-r.top)/r.height*2);
    camera.updateMatrixWorld();bag.updateMatrixWorld(true);ray.setFromCamera(pointer,camera);
    // The nearest piece must be the printed exterior, never a far face through
    // a handle, the bag interior or a gusset.
    const hit=ray.intersectObjects(bag.children.filter(o=>o.visible),false)[0];
    if(!hit||hit.object!==outer||!hit.uv)return null;
    const x=hit.uv.x*L.AW,y=(1-hit.uv.y)*L.AH;
    for(const which of ['front','back']){
      const [ox,oy,w,h]=L[which];
      if(x>=ox&&x<=ox+w&&y>=oy&&y<=oy+h)return{which,x:x-ox,y:y-oy};
    }
    return null;
  }

  // Invert the atlas UVs on the real triangles. This keeps the selection frame
  // attached to folds in both opened and folded geometry, including T-shirts.
  function projected(which,x,y) {
    const g=outer.geometry,uv=g.getAttribute('uv'),pos=g.getAttribute('position'),idx=g.index;
    const u=(L[which][0]+x)/L.AW,v=1-(L[which][1]+y)/L.AH;
    const count=idx?idx.count:pos.count;
    for(let i=0;i<count;i+=3){
      const a=idx?idx.getX(i):i,b=idx?idx.getX(i+1):i+1,c=idx?idx.getX(i+2):i+2;
      const ax=uv.getX(a),ay=uv.getY(a),bx=uv.getX(b),by=uv.getY(b),cx=uv.getX(c),cy=uv.getY(c);
      if(u<Math.min(ax,bx,cx)-1e-7||u>Math.max(ax,bx,cx)+1e-7||v<Math.min(ay,by,cy)-1e-7||v>Math.max(ay,by,cy)+1e-7)continue;
      const den=(by-cy)*(ax-cx)+(cx-bx)*(ay-cy);if(Math.abs(den)<1e-12)continue;
      const wa=((by-cy)*(u-cx)+(cx-bx)*(v-cy))/den,wb=((cy-ay)*(u-cx)+(ax-cx)*(v-cy))/den,wc=1-wa-wb;
      if(Math.min(wa,wb,wc)<-1e-5)continue;
      const point=new THREE.Vector3(pos.getX(a)*wa+pos.getX(b)*wb+pos.getX(c)*wc,pos.getY(a)*wa+pos.getY(b)*wb+pos.getY(c)*wc,pos.getZ(a)*wa+pos.getZ(b)*wb+pos.getZ(c)*wc);
      point.applyMatrix4(outer.matrixWorld).project(camera);
      const r=canvas.getBoundingClientRect();
      return{x:r.left+(point.x+1)*r.width/2,y:r.top+(1-point.y)*r.height/2,z:point.z};
    }
    return null;
  }

  function selectOnBag(which,id){
    if(side!==which){side=which;syncSideUI();}
    select(id);queueStudioSave();
  }
  picker.addEventListener('change',()=>{
    selectOnBag(side,picker.value?Number(picker.value):null);
    if(selected())setView(side,false);
    update(true);
  });
  function update(force=false){
    const item=selected(), r=canvas.getBoundingClientRect(), sr=stage.getBoundingClientRect();
    const inDialog=!!document.querySelector('#artwork-canvas-dialog[open]');
    const key=[outer.geometry.uuid,side,selId,item?.x,item?.y,item?.w,r.width,r.height,inDialog,...camera.matrixWorld.elements].join('|');
    const nextList=side+'|'+design[side].map(el=>el.id+':'+label(el)).join('|');
    if(!force&&key===cachedKey&&nextList===listKey)return;cachedKey=key;
    if(nextList!==listKey){
      picker.replaceChildren(new Option('Select artwork…',''));
      design[side].forEach((el,i)=>picker.add(new Option(`${i+1}. ${label(el).replace(/\s+/g,' ').slice(0,36)}`,String(el.id))));listKey=nextList;
    }
    picker.value=String(selId??'');picker.disabled=!design[side].length;
    smaller.disabled=larger.disabled=done.disabled=!item;
    width.textContent=item?`${fmt(item.w)} cm`:'';
    dock.hidden=inDialog||(!item&&document.documentElement.classList.contains('studio-organized'));hint.hidden=inDialog;
    hint.textContent=item?'Drag artwork · use ↘ or +/− to resize':'Tap artwork to edit · drag an empty area to rotate';
    outline.setAttribute('hidden','');handle.hidden=true;active=false;
    if(!item||inDialog)return;
    bag.updateMatrixWorld(true);camera.updateMatrixWorld();
    const [w,h]=elementSize(item),centre=projected(side,item.x,item.y);
    if(!centre||centre.z< -1||centre.z>1)return;
    const face=surfaceAt(centre.x,centre.y);if(!face||face.which!==side)return;
    const corners=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,y])=>projected(side,item.x+x*w/2,item.y+y*h/2));
    if(corners.some(p=>!p||p.z< -1||p.z>1))return;
    polygon.setAttribute('points',corners.map(p=>`${p.x-sr.left},${p.y-sr.top}`).join(' '));
    outline.dataset.selectedId=String(item.id);outline.dataset.side=side;
    outline.removeAttribute('hidden');handle.hidden=false;active=true;
    // Keep the finger-sized handle outside small logos, where it cannot steal
    // the touch intended to move them.
    const dx=corners[2].x-centre.x,dy=corners[2].y-centre.y,length=Math.max(1,Math.hypot(dx,dy));
    handle.style.left=`${Math.max(24,Math.min(sr.width-24,corners[2].x-sr.left+dx/length*26))}px`;
    handle.style.top=`${Math.max(24,Math.min(r.height-24,corners[2].y-sr.top+dy/length*26))}px`;
  }
  function begin(e,item,mode,point){
    // Stop orbit inertia before an artwork drag so the fabric stays under the
    // finger. Flush the pending orbit delta without moving the current view.
    tween=null;
    const position=camera.position.clone(),target=controls.target.clone(),damping=controls.enableDamping;
    controls.enableDamping=false;controls.update();camera.position.copy(position);controls.target.copy(target);controls.update();controls.enableDamping=damping;controls.enabled=false;
    selectOnBag(point.which,item.id);
    const centre=projected(side,item.x,item.y),px=projected(side,item.x+.2,item.y),py=projected(side,item.x,item.y+.2);
    if(!centre||!px||!py){controls.enabled=true;return;}
    gesture={item,which:side,mode,start:{x:e.clientX,y:e.clientY},x:item.x,y:item.y,w:item.w,point,centre,bx:{x:(px.x-centre.x)/.2,y:(px.y-centre.y)/.2},by:{x:(py.x-centre.x)/.2,y:(py.y-centre.y)/.2},radius:Math.max(12,Math.hypot(e.clientX-centre.x,e.clientY-centre.y))};
    contacts.set(e.pointerId,{x:e.clientX,y:e.clientY});canvas.setPointerCapture(e.pointerId);
    e.preventDefault();e.stopImmediatePropagation();canvas.focus({preventScroll:true});
  }
  function pointerDown(e){
    if(e.button!==0)return;
    if(gesture){
      contacts.set(e.pointerId,{x:e.clientX,y:e.clientY});canvas.setPointerCapture(e.pointerId);
      const points=[...contacts.values()];
      if(points.length===2){gesture.pinch=Math.max(8,Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y));gesture.pinchWidth=gesture.item.w;}
      e.preventDefault();e.stopImmediatePropagation();return;
    }
    const point=surfaceAt(e.clientX,e.clientY);
    if(point){
      const items=design[point.which];
      for(let i=items.length-1;i>=0;i--){const el=items[i],[w,h]=elementSize(el);if(Math.abs(point.x-el.x)<=w/2&&Math.abs(point.y-el.y)<=h/2){begin(e,el,'move',point);return;}}
    }
    select(null);update(true); // OrbitControls still receives empty-space drags.
  }
  function move(e){
    if(!gesture||!contacts.has(e.pointerId))return;
    e.preventDefault();e.stopImmediatePropagation();contacts.set(e.pointerId,{x:e.clientX,y:e.clientY});
    const g=gesture,el=g.item;
    if(side!==g.which||!design[side].includes(el)){finish();return;}
    if(contacts.size>1&&g.pinch){
      const p=[...contacts.values()];el.w=Math.max(minWidth(el),g.pinchWidth*Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)/g.pinch);
    }else if(g.mode==='resize'){
      el.w=Math.max(minWidth(el),g.w*Math.hypot(e.clientX-g.centre.x,e.clientY-g.centre.y)/g.radius);
    }else{
      const point=surfaceAt(e.clientX,e.clientY);
      if(point&&point.which===g.which){el.x=g.x+point.x-g.point.x;el.y=g.y+point.y-g.point.y;}
      else{
        const dx=e.clientX-g.start.x,dy=e.clientY-g.start.y,det=g.bx.x*g.by.y-g.bx.y*g.by.x;
        if(Math.abs(det)>1e-5){el.x=g.x+(dx*g.by.y-dy*g.by.x)/det;el.y=g.y+(dy*g.bx.x-dx*g.bx.y)/det;}
      }
    }
    clampEl(el);syncProps();changed();
  }
  function finish(){
    const ids=[...contacts.keys()];contacts.clear();gesture=null;controls.enabled=true;
    for(const id of ids)if(canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);
    queueStudioSave();update(true);
  }
  function end(e){
    if(!contacts.has(e.pointerId))return;
    e.preventDefault();e.stopImmediatePropagation();
    if(contacts.size>1&&e.type==='pointerup'){
      contacts.delete(e.pointerId);if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
      // Keep the remaining finger stationary after a pinch, without a jump.
      const p=[...contacts.values()][0],g=gesture,hit=surfaceAt(p.x,p.y);
      g.pinch=null;g.mode='move';g.start=p;g.x=g.item.x;g.y=g.item.y;g.w=g.item.w;
      g.point=hit&&hit.which===g.which?hit:{which:g.which,x:g.item.x,y:g.item.y};return;
    }
    finish();
  }
  canvas.addEventListener('pointerdown',pointerDown,{capture:true});
  canvas.addEventListener('pointermove',move,{capture:true});
  canvas.addEventListener('pointerup',end,{capture:true});canvas.addEventListener('pointercancel',end,{capture:true});
  canvas.addEventListener('lostpointercapture',e=>{if(contacts.has(e.pointerId))finish();});
  handle.addEventListener('pointerdown',e=>{if(e.button===0&&selected()&&active)begin(e,selected(),'resize',{which:side,x:selected().x,y:selected().y});});
  const keys=e=>{
    const item=selected();if(!item)return;
    const delta=e.shiftKey?1:.2,moves={ArrowLeft:[-delta,0],ArrowRight:[delta,0],ArrowUp:[0,-delta],ArrowDown:[0,delta]};
    if(moves[e.key]){item.x+=moves[e.key][0];item.y+=moves[e.key][1];}
    else if(e.key==='+'||e.key==='=')item.w+=.5;
    else if(e.key==='-')item.w=Math.max(minWidth(item),item.w-.5);
    else if(e.key==='Escape'){select(null);update(true);e.preventDefault();return;}else return;
    e.preventDefault();clampEl(item);syncProps();changed();
  };
  canvas.addEventListener('keydown',keys);
  handle.addEventListener('keydown',e=>{
    if(['ArrowRight','ArrowUp','+','=','Enter',' '].includes(e.key)){e.preventDefault();adjust(.5);}
    else if(['ArrowLeft','ArrowDown','-'].includes(e.key)){e.preventDefault();adjust(-.5);}
    else keys(e);
  });
  window.addEventListener('blur',()=>{if(gesture)finish();});
  window.addEventListener('resize',()=>{if(gesture)finish();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&gesture)finish();});
  canvas.addEventListener('webglcontextlost',()=>{if(gesture)finish();});
  const priorProps=syncProps;syncProps=function(){priorProps();update(true);};
  const priorRender=render;render=function(force=false){priorRender(force);update();};
  new ResizeObserver(()=>{if(gesture)finish();update(true);}).observe(stage);
  update(true);
}
