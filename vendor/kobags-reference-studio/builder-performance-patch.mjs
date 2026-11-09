// Keep every vertex and full-resolution fabric/artwork texture. Save work that
// does not change the image; defer only screen-space AO during phone gestures.
export function builderPerformance(source) {
  const replace=(from,to)=>{
    if(!source.includes(from)||source.indexOf(from)!==source.lastIndexOf(from))
      throw new Error(`Builder performance anchor mismatch: ${from}`);
    source=source.replace(from,to);
  };
  replace('let PXa = 40;', 'let PXa = 40, structureAtlasKey = "";');
  replace('  // relief: mid grey is the fabric surface', `  const nextStructureKey=JSON.stringify([wpx,hpx,state]);
  const refreshStructure=structureAtlasKey!==nextStructureKey;
  structureAtlasKey=nextStructureKey;
  if(refreshStructure){
  // relief: mid grey is the fabric surface`);
  replace('  bumpTex.needsUpdate = true;', '  bumpTex.needsUpdate = true;\n  }');
  replace('  alphaC.width = roughC.width;', '  if(refreshStructure){\n  alphaC.width = roughC.width;');
  replace('  alphaTex.needsUpdate = true;', '  alphaTex.needsUpdate = true;\n  }');
  // The compact studio hides its flat canvas. It is redrawn by the existing
  // dialog/open/resize handlers when visible, not on every 3D drag behind it.
  replace('function drawEditor() {', 'function drawEditor() {\n  if(!ed.getClientRects().length)return;');
  replace('function render(force = false) {', `const mobileRenderQuery=matchMedia('(max-width:760px), (max-width:1000px) and (max-height:500px)');
let interactionUntil=0, settleTimer=0, lastMotionFrame=false, shadowKey='';
const builderPerformanceStats={motionFrames:0,detailFrames:0,shadowRefreshes:0};
function markStudioInteraction(){
  if(!mobileRenderQuery.matches||showcasePreviewMode)return;
  interactionUntil=performance.now()+160;
  clearTimeout(settleTimer);settleTimer=setTimeout(()=>{dirty=true;},180);
}
for(const name of ['pointerdown','pointermove','pointerup','pointercancel','wheel'])
  stage.addEventListener(name,e=>{if(name!=='pointermove'||e.buttons)markStudioInteraction();},{capture:true,passive:true});
controls.addEventListener('start',markStudioInteraction);
controls.addEventListener('end',markStudioInteraction);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)dirty=true;});
function drawStudioFrame(force,moved){
  const motion=mobileRenderQuery.matches&&!force&&(!!tween||moved||performance.now()<interactionUntil);
  const settle=lastMotionFrame&&!motion;
  if(!(moved||dirty||force||settle))return;
  // Orbiting a stationary bag does not alter its light-space shadow.
  const nextShadowKey=[outer.geometry.uuid,alphaTex.version,...bag.matrixWorld.elements,
    ...key.position.toArray(),...key.target.position.toArray()].join('|');
  renderer.shadowMap.autoUpdate=false;
  if(nextShadowKey!==shadowKey||force){renderer.shadowMap.needsUpdate=true;shadowKey=nextShadowKey;builderPerformanceStats.shadowRefreshes++;}
  const ao=gtao.enabled;
  try{gtao.enabled=ao&&!motion;composer.render();}
  finally{gtao.enabled=ao;}
  lastMotionFrame=motion;
  builderPerformanceStats[motion?'motionFrames':'detailFrames']++;
  dirty=false;
}
window.__builderPerformance={stats:builderPerformanceStats,get motion(){return lastMotionFrame;},get mobile(){return mobileRenderQuery.matches;}};
function render(force = false) {
  if(document.hidden&&!force)return;`);
  replace('if (moved || dirty || force) { composer.render(); dirty = false; }', 'drawStudioFrame(force,moved);');
  return source;
}
