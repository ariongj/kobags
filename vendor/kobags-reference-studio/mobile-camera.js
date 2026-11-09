// Fit the visible mesh bounds, rather than nominal dimensions, on phone stages.
// The scene, geometry, materials, and desktop camera calculation stay untouched.
function fitMobileBagCamera(meshPoints, direction, width, height, obstacles = []) {
  const points = meshPoints.flat();
  if (!points.length || width <= 0 || height <= 0) return null;
  const centre = new THREE.Box3().setFromPoints(points).getCenter(new THREE.Vector3());
  const outward = direction.clone().normalize();
  const right = new THREE.Vector3().crossVectors(camera.up, outward);
  if (right.lengthSq() < 1e-10) right.set(1, 0, 0);
  right.normalize();
  const up = new THREE.Vector3().crossVectors(outward, right).normalize();
  const tanY = Math.tan(THREE.MathUtils.degToRad(camera.getEffectiveFOV() / 2));
  const tanX = tanY * camera.aspect;
  const relative = points.map(point => {
    const p = point.clone().sub(centre);
    return { x: p.dot(right), y: p.dot(up), z: p.dot(outward) };
  });
  const padX = Math.max(10, width * .1), padY = Math.max(10, height * .1);
  const frame = { left: padX, right: width - padX, top: padY, bottom: height - padY };
  function fit(rect) {
    const xMin = rect.left / width * 2 - 1, xMax = rect.right / width * 2 - 1;
    const yMin = 1 - rect.bottom / height * 2, yMax = 1 - rect.top / height * 2;
    const cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2;
    const halfX = (xMax - xMin) / 2, halfY = (yMax - yMin) / 2;
    let distance = controls.minDistance;
    for (const p of relative) {
      distance = Math.max(distance,
        p.z + Math.abs(p.x / tanX + cx * p.z) / halfX,
        p.z + Math.abs(p.y / tanY + cy * p.z) / halfY,
        p.z + camera.near * 2);
    }
    distance *= 1.005;
    // Move the optical centre when a toolbar needs space above the product.
    // This retains the preset/orbit direction instead of tilting the bag away.
    const target = centre.clone()
      .addScaledVector(right, -cx * distance * tanX)
      .addScaledVector(up, -cy * distance * tanY);
    return { target, pos: target.clone().addScaledVector(outward, distance) };
  }
  function measure(fitted) {
    const boxes = meshPoints.map(mesh => {
      const projected = mesh.map(point => {
        const p = point.clone().sub(fitted.pos), depth = -p.dot(outward);
        return { x: (p.dot(right) / (depth * tanX) + 1) * width / 2,
          y: (1 - p.dot(up) / (depth * tanY)) * height / 2 };
      });
      return { left: Math.min(...projected.map(p => p.x)), right: Math.max(...projected.map(p => p.x)),
        top: Math.min(...projected.map(p => p.y)), bottom: Math.max(...projected.map(p => p.y)) };
    });
    const blocked = boxes.some(box => box.left < 0 || box.right > width || box.top < 0 || box.bottom > height ||
      obstacles.some(rect => box.left < rect.right + 5 && box.right > rect.left - 5 && box.top < rect.bottom + 5 && box.bottom > rect.top - 5));
    const area = (Math.max(...boxes.map(box => box.right)) - Math.min(...boxes.map(box => box.left))) *
      (Math.max(...boxes.map(box => box.bottom)) - Math.min(...boxes.map(box => box.top)));
    return { blocked, area };
  }
  const fitted = fit(frame);
  if (!measure(fitted).blocked) return fitted;
  const belowToolbar = { ...frame,
    top: Math.min(frame.bottom - 20, Math.max(frame.top, ...obstacles.map(rect => rect.bottom + 8))) };
  let best = fit(belowToolbar), bestMeasure = measure(best);
  // A short phone stage can still show a tall bag between Camera and Save.
  // Compare that clear corridor with the row below, rather than reserving the
  // entire toolbar height for every model. Wide inside views keep the wider row.
  const corridors = [];
  let left = frame.left;
  for (const obstacle of [...obstacles].sort((a, b) => a.left - b.left)) {
    const end = Math.min(frame.right, obstacle.left - 8);
    if (end - left >= 20) corridors.push({ ...frame, left, right: end });
    left = Math.max(left, obstacle.right + 8);
  }
  if (frame.right - left >= 20) corridors.push({ ...frame, left });
  for (const corridor of corridors) {
    const candidate = fit(corridor), result = measure(candidate);
    if (!result.blocked && (bestMeasure.blocked || result.area > bestMeasure.area)) {
      best = candidate; bestMeasure = result;
    }
  }
  return best;
}

// Compact camera choices leave the top of the actual bag visible on phones.
if (!isWebsitePreview) {
  const viewSelect=document.createElement('select');
  viewSelect.id='mobile-camera-view';viewSelect.setAttribute('aria-label','Camera view');
  const free=new Option('Free view','');free.disabled=true;viewSelect.add(free);
  for(const [value,label] of [['34','3/4 view'],['front','Front'],['back','Back'],['side','Side'],['top','Inside']])viewSelect.add(new Option(label,value));
  viewSelect.addEventListener('change',()=>setView(viewSelect.value));
  document.getElementById('stage').append(viewSelect);
  viewSelect.value=document.querySelector('#views button.on')?.dataset.view||'34';
  const mobileCameraQuery=matchMedia('(max-width:760px), (max-width:1000px) and (max-height:500px)');
  const originalViewTarget=viewTarget;
  function mobileBagTarget(direction) {
    const canvas=renderer.domElement, frame=canvas.getBoundingClientRect();
    if(!frame.width||!frame.height)return null;
    bag.updateMatrixWorld(true);
    const meshes=[];
    bag.traverseVisible(object=>{
      if(!object.isMesh||!object.geometry.getAttribute('position')?.count)return;
      const geometry=object.geometry;
      if(!geometry.boundingBox)geometry.computeBoundingBox();
      const box=geometry.boundingBox;
      if(!box||box.isEmpty())return;
      const points=[];
      for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z])
        points.push(new THREE.Vector3(x,y,z).applyMatrix4(object.matrixWorld));
      meshes.push(points);
    });
    const obstacles=[viewSelect,document.getElementById('shot')].filter(Boolean).flatMap(element=>{
      if(!element.getClientRects().length)return [];
      const rect=element.getBoundingClientRect();
      if(rect.bottom<=frame.top||rect.top>=frame.top+frame.height||rect.right<=frame.left||rect.left>=frame.left+frame.width)return [];
      return [{left:rect.left-frame.left,right:rect.right-frame.left,top:rect.top-frame.top,bottom:rect.bottom-frame.top}];
    });
    return fitMobileBagCamera(meshes,direction,frame.width,frame.height,obstacles);
  }
  viewTarget=function(name){
    if(!mobileCameraQuery.matches)return originalViewTarget(name);
    return mobileBagTarget(new THREE.Vector3(...VIEWS[name].dir))||originalViewTarget(name);
  };
  const previousCameraView=setView;
  setView=function(name,animate=true){previousCameraView(name,animate);viewSelect.value=name;dirty=true;};
  window.__api.setView=setView;
  controls.addEventListener('start',()=>{viewSelect.value='';});
  let framingFrame;
  function refreshMobileFraming(){
    if(!mobileCameraQuery.matches)return;
    const preset=viewSelect.value;
    const direction=preset?new THREE.Vector3(...VIEWS[preset].dir):camera.position.clone().sub(controls.target);
    const to=mobileBagTarget(direction);
    if(!to)return;
    // Keep any existing view transition; only update its destination to fit the
    // latest stage dimensions. Free rotation keeps its current orientation.
    if(tween&&preset)tween.to=to;
    else{camera.position.copy(to.pos);controls.target.copy(to.target);controls.update();}
    dirty=true;
  }
  function scheduleMobileFraming(){
    if(!mobileCameraQuery.matches)return;
    cancelAnimationFrame(framingFrame);framingFrame=requestAnimationFrame(refreshMobileFraming);
  }
  const previousCameraRebuild=rebuild;
  rebuild=function(){previousCameraRebuild();scheduleMobileFraming();};
  window.__api.rebuild=rebuild;
  new ResizeObserver(scheduleMobileFraming).observe(stage);
  mobileCameraQuery.addEventListener('change',()=>{
    if(mobileCameraQuery.matches)scheduleMobileFraming();
    else if(viewSelect.value)setView(viewSelect.value,false);
  });
  scheduleMobileFraming();
  // The editor is fitted to its available pane, including after Add expands or
  // the phone rotates. Its own draw function updates pointer coordinates too.
  let editorResizeFrame;
  new ResizeObserver(()=>{cancelAnimationFrame(editorResizeFrame);editorResizeFrame=requestAnimationFrame(()=>drawEditor());}).observe(document.getElementById('panes'));
}
