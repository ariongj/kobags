// Shared illustrative face coordinates. Saved designs retain their canonical
// positions; the flat photo registers that same artwork onto its fabric panel.
export type Point = { x: number; y: number };
export type Rect = { x: number; y: number; width: number; height: number };
export type Quad = [Point, Point, Point, Point]; // TL, TR, BR, BL
export const studioFamilies = {
  'handle-bag': { width: 2.5, bottom: -1.25, top: 1.05, depth: .55, handles: true },
  'box-bag': { width: 2.8, bottom: -1.2, top: .95, depth: 1, handles: true },
  'd-cut-bag': { width: 2.45, bottom: -1.4, top: 1.6, depth: .3, handles: false },
  't-shirt-bag': { width: 2.1, bottom: -1.4, top: 1.8, depth: .34, handles: false },
  'string-bag': { width: 2.35, bottom: -1.4, top: 1.55, depth: .45, handles: false },
} as const;
export function logicalFace(product: string): Rect {
  const spec = studioFamilies[product as keyof typeof studioFamilies] || studioFamilies['handle-bag'];
  const fullTop = spec.top + (spec.handles ? 1.1 : 0);
  const scale = Math.min(650 / spec.width, 690 / (fullTop - spec.bottom));
  const centerY = (fullTop + spec.bottom) / 2;
  return { x: 400 - spec.width * scale / 2, y: 400 - (spec.top - centerY) * scale, width: spec.width * scale, height: (spec.top - spec.bottom) * scale };
}
// Points follow the visible FRONT panel, not outer alpha bounds: this avoids
// placing front artwork onto box/T-shirt gussets. Coordinates refer to shipped
// source WebPs, before the current tintedBag bounds/fit. These are illustrative
// photo registration points, not production print limits.
export const rawPhotoPanels: Record<string, Quad> = {
  'handle-bag': [{x:408,y:334},{x:864,y:336},{x:964,y:1174},{x:341,y:1210}],
  'box-bag': [{x:337,y:441},{x:974,y:428},{x:1024,y:1275},{x:341,y:1338}],
  'd-cut-bag': [{x:185,y:98},{x:1060,y:98},{x:1076,y:1151},{x:180,y:1151}],
  't-shirt-bag': [{x:524,y:80},{x:923,y:102},{x:948,y:1108},{x:501,y:1168}],
  'string-bag': [{x:319,y:320},{x:1001,y:337},{x:1108,y:1136},{x:181,y:1108}],
};
export function fitPhotoPanel(product: string, bounds: [number,number,number,number]): Quad {
  const [left,top,right,bottom]=bounds;
  const scale=Math.min(680/(right-left),690/(bottom-top));
  const offsetX=(800-(right-left)*scale)/2, offsetY=(800-(bottom-top)*scale)/2;
  return rawPhotoPanels[product].map(point=>({x:offsetX+(point.x-left)*scale,y:offsetY+(point.y-top)*scale})) as Quad;
}
export function mapToPhoto(point: Point, source: Rect, quad: Quad): Point {
  const u=(point.x-source.x)/source.width, v=(point.y-source.y)/source.height;
  const [a,b,c,d]=quad;
  return {x:a.x*(1-u)*(1-v)+b.x*u*(1-v)+c.x*u*v+d.x*(1-u)*v,
    y:a.y*(1-u)*(1-v)+b.y*u*(1-v)+c.y*u*v+d.y*(1-u)*v};
}
export function mapFromPhoto(point: Point, source: Rect, quad: Quad): Point {
  const [a,b,c,d]=quad;
  const bx=b.x-a.x, by=b.y-a.y, dx=d.x-a.x, dy=d.y-a.y;
  const ex=a.x-b.x+c.x-d.x, ey=a.y-b.y+c.y-d.y;
  let u=.5,v=.5;
  for(let iteration=0;iteration<12;iteration++) {
    const fx=a.x+bx*u+dx*v+ex*u*v-point.x, fy=a.y+by*u+dy*v+ey*u*v-point.y;
    const ux=bx+ex*v, uy=by+ey*v, vx=dx+ex*u, vy=dy+ey*u;
    const determinant=ux*vy-uy*vx;
    if(Math.abs(determinant)<1e-9) break;
    const du=(fx*vy-fy*vx)/determinant, dv=(ux*fy-uy*fx)/determinant;
    u-=du;v-=dv;
    if(Math.abs(du)+Math.abs(dv)<1e-8) break;
  }
  return {x:source.x+u*source.width,y:source.y+v*source.height};
}
export function photoArtworkTransform(point: Point, source: Rect, quad: Quad) {
  const v = (point.y - source.y) / source.height;
  const [a, b, c, d] = quad;
  const dx = (b.x - a.x) * (1 - v) + (c.x - d.x) * v;
  const dy = (b.y - a.y) * (1 - v) + (c.y - d.y) * v;
  return { center: mapToPhoto(point, source, quad), scale: Math.hypot(dx, dy) / source.width, angle: Math.atan2(dy, dx) };
}
// Clip the logical artwork to the same illustrative family outline used by 3D.
export function clipCanonicalFace(ctx: CanvasRenderingContext2D, product: string) {
  const spec=studioFamilies[product as keyof typeof studioFamilies] || studioFamilies['handle-bag'];
  const {width,bottom,top}=spec,half=width/2;
  const fullTop=top+(spec.handles?1.1:0),scale=Math.min(650/width,690/(fullTop-bottom)),centerY=(fullTop+bottom)/2;
  let current:Point={x:0,y:0};
  const project=(x:number,y:number)=>{
    const t=(y-bottom)/(top-bottom);
    const warped=product==='string-bag'?x*(1-.2*Math.pow(t,6)):x*(1+.012*(t-.5));
    return {x:400+warped*scale,y:400-(y-centerY)*scale};
  };
  const move=(x:number,y:number)=>{current={x,y};const p=project(x,y);ctx.moveTo(p.x,p.y)};
  const line=(x:number,y:number)=>{const start=current;for(let i=1;i<=20;i++){const t=i/20,p=project(start.x+(x-start.x)*t,start.y+(y-start.y)*t);ctx.lineTo(p.x,p.y)}current={x,y}};
  const quadratic=(cx:number,cy:number,x:number,y:number)=>{const start=current;for(let i=1;i<=40;i++){const t=i/40,u=1-t,p=project(u*u*start.x+2*u*t*cx+t*t*x,u*u*start.y+2*u*t*cy+t*t*y);ctx.lineTo(p.x,p.y)}current={x,y}};
  ctx.beginPath();
  if(product==='t-shirt-bag') {
    move(-half,bottom+.1);quadratic(-half,bottom,-half+.1,bottom);line(half-.1,bottom);quadratic(half,bottom,half,bottom+.1);line(half,.65);quadratic(half,.95,1.04,1.07);line(1.02,top);line(.55,top);line(.52,1.07);quadratic(.5,.7,0,.68);quadratic(-.5,.7,-.52,1.07);line(-.55,top);line(-1.02,top);line(-1.04,1.07);quadratic(-half,.95,-half,.65);line(-half,bottom+.1);ctx.closePath();
  } else if(product==='string-bag') {
    move(-half+.12,bottom);line(half-.12,bottom);quadratic(half,bottom,half,bottom+.13);line(half,.18);quadratic(half,.65,.75,1);quadratic(.51,top-.06,.4,top);quadratic(0,top-.1,-.4,top);quadratic(-.51,top-.06,-.75,1);quadratic(-half,.65,-half,.18);line(-half,bottom+.13);quadratic(-half,bottom,-half+.12,bottom);ctx.closePath();
  } else {
    move(-half,bottom);line(half,bottom);line(half,top);line(-half,top);line(-half,bottom);ctx.closePath();
    if(product==='d-cut-bag') {
      for(let i=0;i<=80;i++){const a=i/80*Math.PI*2,p=project(.43*Math.cos(a),top-.4+.14*Math.sin(a));if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y)}ctx.closePath();
    }
  }
  ctx.clip('evenodd');
}
