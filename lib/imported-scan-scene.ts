import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type ImportedScanScene = {
  view: (preset: 'angle'|'front'|'back'|'top'|'bottom') => void;
  rotate: (direction: number) => void;
  zoom: (direction: number) => void;
  reset: () => void;
  spin: (enabled: boolean) => void;
  dispose: () => void;
};
export function createImportedScanScene(host: HTMLDivElement, label: string, callbacks: {ready:()=>void;error:()=>void;interact:()=>void}): ImportedScanScene {
  const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.NeutralToneMapping;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute('role','img');canvas.setAttribute('aria-label',label);host.appendChild(canvas);
  const scene=new THREE.Scene();
  const room=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer);
  const environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;scene.environmentIntensity=.8;room.dispose();pmrem.dispose();
  const camera=new THREE.PerspectiveCamera(35,1,.01,100);
  const controls=new OrbitControls(camera,canvas);
  controls.enablePan=false;controls.enableDamping=true;controls.dampingFactor=.12;controls.rotateSpeed=.65;controls.autoRotateSpeed=1.4;controls.minDistance=2;controls.maxDistance=10;
  scene.add(new THREE.HemisphereLight(0xffffff,0xc6c9c5,.65));
  const light=new THREE.DirectionalLight(0xffffff,1.1);light.position.set(3,5,4);light.castShadow=true;light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-2;light.shadow.camera.right=2;light.shadow.camera.top=2;light.shadow.camera.bottom=-2;light.shadow.camera.near=.1;light.shadow.camera.far=15;light.shadow.bias=-.0001;light.shadow.normalBias=.008;scene.add(light);
  const fill=new THREE.DirectionalLight(0xe8f1ff,.7);fill.position.set(-3,2,-4);scene.add(fill);
  let disposed=false,visible=true,frame=0,loaded=false;
  const abort=new AbortController();
  const draw=()=>{
    frame=0;if(disposed||!visible||document.hidden)return;
    controls.update();renderer.render(scene,camera);
    host.dataset.angle=String(controls.getAzimuthalAngle());host.dataset.polar=String(controls.getPolarAngle());host.dataset.distance=String(camera.position.distanceTo(controls.target));
    if(controls.autoRotate)schedule();
  };
  const schedule=()=>{if(!frame&&!disposed&&visible&&!document.hidden)frame=requestAnimationFrame(draw);};
  const stopSpin=()=>{controls.autoRotate=false;callbacks.interact();schedule();};
  controls.addEventListener('change',schedule);controls.addEventListener('start',stopSpin);
  const reset=()=>{stopSpin();controls.target.set(0,0,0);camera.position.set(2.8,2.7,5.4);controls.update();schedule();};
  reset();
  const resize=new ResizeObserver(()=>{const {width,height}=host.getBoundingClientRect();if(width&&height){camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height);schedule();}});resize.observe(host);
  const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)schedule();else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:'80px'});intersection.observe(host);
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();};document.addEventListener('visibilitychange',visibility);
  const disposeModel=(object:THREE.Object3D)=>{const textures=new Set<THREE.Texture>();const materials=new Set<THREE.Material>();object.traverse(child=>{if(child instanceof THREE.Mesh){child.geometry.dispose();for(const material of Array.isArray(child.material)?child.material:[child.material])materials.add(material);}});for(const material of materials){for(const value of Object.values(material))if(value instanceof THREE.Texture)textures.add(value);material.dispose();}for(const texture of textures){texture.dispose();if(typeof ImageBitmap!=='undefined'&&texture.image instanceof ImageBitmap)texture.image.close();}};
  const failed=()=>{if(!disposed){loaded=false;controls.autoRotate=false;callbacks.error();}};
  const contextLost=(event:Event)=>{event.preventDefault();failed();};canvas.addEventListener('webglcontextlost',contextLost);
  fetch('/assets/models/coffee-test.glb?v=20261013-smooth-scan-texture',{signal:abort.signal}).then(response=>{if(!response.ok)throw Error('MODEL_LOAD_FAILED');return response.arrayBuffer();}).then(buffer=>{if(disposed)return;return new GLTFLoader().parseAsync(buffer,'');}).then(async gltf=>{
    if(!gltf)return;if(disposed){disposeModel(gltf.scene);return;}
    const model=gltf.scene;
    // This supplied scan is Z-up. Present the cup upright without changing its mesh.
    model.rotation.x=-Math.PI/2;
    const bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
    const scale=2.6/Math.max(size.x,size.y,size.z);model.scale.setScalar(scale);model.position.copy(center).multiplyScalar(-scale);
    model.traverse(child=>{if(child instanceof THREE.Mesh){child.castShadow=true;child.receiveShadow=true;for(const mat of Array.isArray(child.material)?child.material:[child.material])if(mat instanceof THREE.MeshStandardMaterial&&mat.map)mat.map.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());}});
    scene.add(model);
    const shadowPixels=new Uint8Array(64*64*4);
    for(let y=0;y<64;y++)for(let x=0;x<64;x++){const i=(y*64+x)*4,r=((x-31.5)/31.5)**2+((y-31.5)/31.5)**2;shadowPixels[i]=shadowPixels[i+1]=shadowPixels[i+2]=255;shadowPixels[i+3]=Math.round(42*Math.exp(-r*5)*Math.max(0,1-r));}
    const shadowTexture=new THREE.DataTexture(shadowPixels,64,64);shadowTexture.magFilter=shadowTexture.minFilter=THREE.LinearFilter;shadowTexture.needsUpdate=true;
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(3.6,3.6),new THREE.MeshBasicMaterial({color:0x26382c,map:shadowTexture,transparent:true,depthWrite:false}));ground.rotation.x=-Math.PI/2;ground.position.y=-size.y*scale/2-.008;scene.add(ground);
    let triangles=0;model.traverse(child=>{if(child instanceof THREE.Mesh)triangles+=(child.geometry.index?.count||child.geometry.attributes.position.count)/3;});host.dataset.triangles=String(triangles);
    // Wait for async shader compilation before exposing a ready but blank canvas.
    await renderer.compileAsync(scene,camera);
    if(disposed)return;loaded=true;schedule();callbacks.ready();
  }).catch(error=>{if(error?.name!=='AbortError')failed();});
  const view=(preset:'angle'|'front'|'back'|'top'|'bottom')=>{
    stopSpin();controls.target.set(0,0,0);
    const positions={angle:[2.8,2.7,5.4],front:[0,.2,6.2],back:[0,.2,-6.2],top:[0,6.2,.001],bottom:[0,-6.2,.001]};
    camera.position.fromArray(positions[preset]);controls.update();schedule();
  };
  const rotate=(direction:number)=>{stopSpin();const offset=camera.position.clone().sub(controls.target);offset.applyAxisAngle(new THREE.Vector3(0,1,0),direction*Math.PI/8);camera.position.copy(controls.target).add(offset);controls.update();schedule();};
  const zoom=(direction:number)=>{stopSpin();const offset=camera.position.clone().sub(controls.target);offset.setLength(THREE.MathUtils.clamp(offset.length()*(direction>0?.82:1.22),controls.minDistance,controls.maxDistance));camera.position.copy(controls.target).add(offset);controls.update();schedule();};
  const keydown=(event:KeyboardEvent)=>{if(!loaded)return;if(['ArrowLeft','ArrowRight','+','=','-','Home'].includes(event.key)){event.preventDefault();if(event.key==='Home')reset();else if(event.key==='ArrowLeft'||event.key==='ArrowRight')rotate(event.key==='ArrowLeft'?-1:1);else zoom(event.key==='-'?-1:1);}};canvas.addEventListener('keydown',keydown);
  return {view,rotate,zoom,reset,spin(value){controls.autoRotate=value;schedule();},dispose(){disposed=true;abort.abort();cancelAnimationFrame(frame);resize.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',visibility);canvas.removeEventListener('keydown',keydown);canvas.removeEventListener('webglcontextlost',contextLost);controls.dispose();disposeModel(scene);environment.dispose();light.shadow.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();}};
}
