// Four actual studio models, rendered through one WebGL context. This preview
// never restores/saves customer artwork and runs only while the host can see it.
if (isWebsitePreview) {
  const start = setInterval(() => {
    if (!bridgeReady) return;
    clearInterval(start);
    renderer.setAnimationLoop(null);
    controls.enabled = false;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.35));
    renderer.setClearColor(0xf3f6f1, 1);
    scene.background = new THREE.Color(0xf3f6f1);
    const models=[];
    const samples=[SAMPLES.findIndex(s=>s.type==='tshirt'),0,2,SAMPLES.findIndex(s=>s.type==='bottle')];
    for (const sample of samples) {
      loadSample(Math.max(0,sample));
      const textures=new Map(), materials=new Map();
      const snapshot=texture=>{
        if(!texture || ![atlasTex,alphaTex,bumpTex,roughTex].includes(texture)) return texture;
        if(textures.has(texture))return textures.get(texture);
        const original=texture.image, copy=document.createElement('canvas');
        const scale=Math.min(1,1024/Math.max(original.width,original.height));
        copy.width=Math.max(1,Math.round(original.width*scale));copy.height=Math.max(1,Math.round(original.height*scale));
        copy.getContext('2d').drawImage(original,0,0,copy.width,copy.height);
        const result=texture.clone();result.source=new THREE.Source(copy);result.needsUpdate=true;textures.set(texture,result);return result;
      };
      const material=m=>{
        if(materials.has(m))return materials.get(m);
        const copy=m.clone();copy.onBeforeCompile=m.onBeforeCompile;copy.customProgramCacheKey=m.customProgramCacheKey;
        for(const k of ['map','alphaMap','bumpMap','roughnessMap','normalMap'])copy[k]=snapshot(m[k]);
        materials.set(m,copy);return copy;
      };
      const model=bag.clone(true);
      model.traverse(n=>{if(n.isMesh){n.geometry=n.geometry.clone();n.material=material(n.material);if(n.customDepthMaterial)n.customDepthMaterial=material(n.customDepthMaterial);}});
      const bounds=new THREE.Box3().setFromObject(model), size=bounds.getSize(new THREE.Vector3()), centre=bounds.getCenter(new THREE.Vector3());
      const scale=.53/Math.max(size.y,size.x*1.15);
      model.scale.setScalar(scale);model.position.set(-centre.x*scale,.055-bounds.min.y*scale,-centre.z*scale);
      const turn=new THREE.Group();turn.add(model);scene.add(turn);turn.visible=false;models.push(turn);
    }
    bag.visible=false;contact.visible=false;
    const pedestal=new THREE.Mesh(new THREE.CylinderGeometry(.205,.22,.05,64),new THREE.MeshStandardMaterial({color:0xe4eadd,roughness:.95}));
    pedestal.position.y=.025;pedestal.receiveShadow=true;pedestal.castShadow=true;scene.add(pedestal);
    ground.material.opacity=.13;
    Object.assign(key.shadow.camera,{left:-.7,right:.7,top:1,bottom:-.4,near:.1,far:4});key.shadow.camera.updateProjectionMatrix();key.shadow.mapSize.set(1024,1024);key.shadow.map?.dispose();key.shadow.map=null;
    key.position.set(-.6,1.3,1);key.target.position.set(0,.25,0);
    tween=null;
    let visible=false, paused=false, last=0, angle=.35, raf=0, redraw=true;
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    let lastWidth=0,lastHeight=0;
    const viewport=()=>{const w=stage.clientWidth,h=stage.clientHeight;if(w!==lastWidth||h!==lastHeight){renderer.setSize(w,h,false);lastWidth=w;lastHeight=h;}return {w,h,cols:parent.innerWidth<=760?2:4};};
    function draw(){
      const {w,h,cols}=viewport(),rows=4/cols,cw=w/cols,ch=h/rows;
      // Clear the whole canvas, including the reserved caption strips.
      renderer.setScissorTest(false);renderer.setViewport(0,0,w,h);renderer.clear();
      renderer.setScissorTest(true);
      camera.aspect=cw/(ch-44);camera.fov=30;
      const distance=Math.max(.76/Math.tan(Math.PI/12)/2,.52/Math.tan(Math.PI/12)/2/camera.aspect);
      camera.position.set(0,.34+distance*.15,distance);camera.lookAt(0,.30,0);camera.updateProjectionMatrix();
      models.forEach((m,i)=>{
        m.visible=true;m.rotation.y=angle+i*.12;
        const x=Math.round(i%cols*cw), y=Math.round((rows-1-Math.floor(i/cols))*ch);
        renderer.setViewport(x,y+44,Math.ceil(cw),Math.ceil(ch-44));renderer.setScissor(x,y+44,Math.ceil(cw),Math.ceil(ch-44));renderer.render(scene,camera);m.visible=false;
      });
      renderer.setScissorTest(false);redraw=false;
    }
    function tick(time){
      raf=0;if(!visible||document.hidden)return;
      if(redraw||(!paused&&!motion.matches&&time-last>66)){
        if(!paused&&!motion.matches&&last)angle+=Math.min(.15,(time-last)/1000)*.30;
        draw();last=time;
      }
      if(!paused&&!motion.matches)raf=requestAnimationFrame(tick);
    }
    const schedule=()=>{redraw=true;last=0;if(raf)cancelAnimationFrame(raf);raf=requestAnimationFrame(tick);};
    window.addEventListener('message',event=>{
      if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='kobags:showcase')return;
      visible=event.data.visible===true;paused=event.data.paused===true;schedule();
    });
    document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',schedule);
    new ResizeObserver(schedule).observe(stage);
    window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);renderer.setAnimationLoop(null);});
    window.__showcase={models,renderer,get angle(){return angle;},get paused(){return paused||motion.matches;},get visible(){return visible;}};
    draw();parent.postMessage({type:'kobags:showcase-ready'},location.origin);
  },80);
}
