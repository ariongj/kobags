import type { Group, Mesh, CanvasTexture, Vector2, Vector3, WebGLRenderer } from 'three';
import type { Design } from './catalog';
export type NonwovenModel = {
  group: Group;
  outer: Mesh;
  inner: Mesh;
  alphaTex: CanvasTexture;
  update(slug:string,dimensions:[number,number,number],colour:string,front:HTMLCanvasElement,back:HTMLCanvasElement):string;
  getDimensions():{width:number;height:number;depth:number;bodyHeight:number};
  point(x:number,y:number,side:Design['side']):Vector3;
  fromPoint(point:Vector3,side:Design['side']):{x:number;y:number};
  hit(uv:Vector2):{side:Design['side'];x:number;y:number}|null;
  dispose():void;
};
export function createNonwovenModel(renderer:WebGLRenderer):NonwovenModel;
