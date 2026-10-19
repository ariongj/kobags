import test from 'node:test';
import assert from 'node:assert/strict';
import { initialDesign } from '../lib/catalog';
import { artworkLayers, sideArtwork, newArtwork, placementPatch, artworkPatch, copyArtworkToOtherSide, removeArtwork, pickArtwork, type ArtworkBounds } from '../lib/studio-artwork';
import { clearFlatBackground } from '../lib/logo-cleanup';
import { normalizeQrUrl } from '../lib/qr-artwork';
import { seed, applyAction } from '../lib/demo-domain';

const valid = () => ({...initialDesign,company:'Artwork QA',contact:'Test Buyer',email:'qa@example.com',city:'Prishtina',consent:true,key:crypto.randomUUID()});
const png = 'data:image/png;base64,iVBORw0KGgo=';
test('touch picking selects a nearby QR through logo padding and preserves coincident layer selection',()=>{
  const logo: ArtworkBounds={x:400,y:448,width:256,height:256,rotation:0,layer:'logo'};
  const qr: ArtworkBounds={x:400,y:560,width:160,height:160,rotation:0,layer:'element:qr'};
  assert.equal(pickArtwork([logo,qr],400,560,'logo')?.layer,'element:qr');
  assert.equal(pickArtwork([logo,qr],400,448,'element:qr')?.layer,'logo');
  const text: ArtworkBounds={...logo,width:350,height:50,layer:'text'};
  assert.equal(pickArtwork([logo,text],400,448,'logo')?.layer,'logo');
  assert.equal(pickArtwork([logo,text],400,448,'text')?.layer,'text');
  assert.equal(pickArtwork([logo,qr],20,20,'logo'),undefined);
  const rotated: ArtworkBounds={x:100,y:100,width:100,height:10,rotation:90,layer:'text'};
  assert.equal(pickArtwork([rotated],100,145,undefined,0)?.layer,'text');
  assert.equal(pickArtwork([rotated],145,100,undefined,0),undefined);
});
function fixture() {
  let d=valid();
  for(const kind of ['logo','qr','text'] as const) {
    const next=newArtwork(d,kind,kind==='text'?{text:'Made for reuse'}:{logo:png,name:'sample',...(kind==='qr'?{qrValue:'https://example.com/'}:{})})!;
    d={...d,...next.patch};
  }
  return d;
}
test('four elements retain independent placements and content when copied to the other face',()=>{
  let d=fixture();assert.equal(artworkLayers(d).length,4);assert.equal(newArtwork(d,'text'),null);
  const qr=artworkLayers(d).find(l=>sideArtwork(d,l).kind==='qr')!;
  const old=structuredClone(d);
  d={...d,...placementPatch(d,qr,{x:61,y:63,rotation:12})};
  assert.equal(sideArtwork(d,qr).x,61);assert.equal(d.x,old.x);assert.deepEqual(d.elements?.[0],old.elements?.[0]);
  d={...d,...copyArtworkToOtherSide(d)};
  assert.equal(artworkLayers({...d,side:'back'}).length,4);
  assert.equal(new Set(d.elements?.map(e=>e.id)).size,6);
  const front=structuredClone(d.elements?.filter(e=>e.side==='front'));
  const backLayer=artworkLayers({...d,side:'back'})[3];
  d={...d,...artworkPatch({...d,side:'back'},backLayer,{text:'Back only'})};
  assert.deepEqual(d.elements?.filter(e=>e.side==='front'),front);
  d={...d,...removeArtwork(d,qr)};assert.equal(artworkLayers(d).length,3);
  assert.equal(artworkLayers({...d,side:'back'}).length,4);
});
test('new text is readable on a dark bag even when the previous text was removed',()=>{
 const next=newArtwork({...valid(),color:'Black',text:''},'text')!;
 assert.equal(next.patch.elements![0].ink,'#ffffff');
});
test('RFQ snapshots preserve extra artwork; malformed and excessive elements are rejected',()=>{
  const d=fixture();const result=applyAction(seed(),{type:'submit',design:d});
  assert.deepEqual(result.state.requests[0].snapshot.elements,d.elements);
  for(const patch of [{x:999},{logo:'https://example.com/remote.png'},{qrValue:'javascript:alert(1)'},{logo:png+'A'.repeat(20001)}]){
    const bad={...d,key:crypto.randomUUID(),elements:d.elements!.map((e,i)=>i===1?{...e,...patch}:e)};
    assert.throws(()=>applyAction(seed(),{type:'submit',design:bad}));
  }
  assert.throws(()=>applyAction(seed(),{type:'submit',design:{...d,elements:[...d.elements!,{...d.elements![0],id:'fifth'}]}}));
  assert.throws(()=>applyAction(seed(),{type:'submit',design:{...d,elements:[...d.elements!,d.elements![0]]}}));
});
function image(bg:number[],fg:number[]=[20,50,65,255]) {
 const width=40,height=40,data=new Uint8ClampedArray(width*height*4);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)data.set(x>=10&&x<30&&y>=10&&y<30?fg:bg,(y*width+x)*4);
 return {data,width,height};
}
test('automatic cleanup removes white and colored flat backgrounds, preserving enclosed details',()=>{
 for(const bg of [[255,255,255,255],[240,220,195,255],[0,90,180,255]]){
  const {data,width,height}=image(bg);data.set([255,255,255,255],(20*width+20)*4);
  assert.ok(clearFlatBackground(data,width,height)>0);assert.equal(data[3],0);
  assert.deepEqual([...data.slice((20*width+20)*4,(20*width+20)*4+4)],[255,255,255,255]);
  assert.equal(data[(12*width+12)*4+3],255);
 }
});
test('transparent logos, blank/light images and nonuniform photograph edges are preserved',()=>{
 for(const bg of [[255,255,255,0],[255,255,255,255]]) {
  const {data,width,height}=image(bg,[255,255,255,255]);const old=data.slice();
  assert.equal(clearFlatBackground(data,width,height),0);assert.deepEqual(data,old);
 }
 const {data,width,height}=image([255,255,255,255]);for(let x=0;x<width;x++)data.set([x*6,50,100,255],x*4);
 const old=data.slice();assert.equal(clearFlatBackground(data,width,height),0);assert.deepEqual(data,old);
});
test('QR input normalizes web URLs and refuses executable, credential-bearing and oversized input',()=>{
 assert.equal(normalizeQrUrl('example.com/menu'),'https://example.com/menu');
 assert.equal(normalizeQrUrl('https://example.com/çanta'),'https://example.com/%C3%A7anta');
 for(const value of ['javascript:alert(1)','data:text/html,hi','ftp://example.com','https://name:password@example.com','', 'https://example.com/'+ 'x'.repeat(500)])assert.throws(()=>normalizeQrUrl(value));
});
