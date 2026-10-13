"""Repair the supplied coffee test scan; not a generic scan-reconstruction pipeline.
Usage: python scripts/repair-test-scan.py Test.zip public/assets/models/coffee-test.glb evidence/coffee-repair.json
Offline dependencies: numpy, scipy, trimesh, Pillow. No application dependencies.
Retains the cup's photographic UVs, smooths capture noise, trims the table,
seals the cup and rebuilds the saucer/underside from a fitted radial profile.
Uncaptured surfaces are inferred ceramic, not measured original detail.
"""
import sys,zipfile,hashlib
import numpy as np,trimesh,io,json,struct
from pathlib import Path
from PIL import Image
from scipy.spatial import cKDTree
source,output,report_path=map(Path,sys.argv[1:4])
with zipfile.ZipFile(source) as archive:
 mesh=trimesh.load(io.BytesIO(archive.read('Test.obj')),file_type='obj',force='mesh',process=False,skip_materials=True)
 texture=Image.open(io.BytesIO(archive.read('tex_u1_v1_diffuse.jpg'))).convert('RGB')
V=mesh.vertices;F=mesh.faces;UV=mesh.visual.uv
tex=np.asarray(texture);y=np.clip(((1-UV[:,1])*tex.shape[0]).astype(int),0,tex.shape[0]-1);x=np.clip((UV[:,0]*tex.shape[1]).astype(int),0,tex.shape[1]-1);C=tex[y,x];cx,cy=-.003,.023
# Work in an upright frame fitted to the scan's saucer plane.
P=V.copy();P[:,2]+= .15*P[:,0];r=np.linalg.norm(P[:,:2]-[cx,cy],axis=1)
unique,inverse=np.unique(np.round(P,9),axis=0,return_inverse=True)
g=trimesh.Trimesh(vertices=unique,faces=inverse[F],process=False);trimesh.smoothing.filter_taubin(g,lamb=.5,nu=.5,iterations=700)
S=g.vertices[inverse].copy();S[P[:,2]<.012]=P[P[:,2]<.012]
keep=(P[F,:,][...,2].mean(axis=1)>.008)&((r[F].max(axis=1)<.082)|(P[F,:,][...,2].min(axis=1)>.044))
verts=[];uvs=[];faces=[];lookup={};cut=.012
# Exact clipping interpolates UVs; geometry repair does not alter the source photograph.
def vertex(p,uv):
 key=tuple(np.round(np.r_[p,uv],9))
 if key not in lookup:lookup[key]=len(verts);verts.append(p);uvs.append(uv)
 return lookup[key]
for face in F[keep]:
 poly=[(S[i],UV[i]) for i in face];clipped=[]
 for i,(p,uv) in enumerate(poly):
  q,qv=poly[(i+1)%3];a=p[2]>=cut;b=q[2]>=cut
  if a:clipped.append((p,uv))
  if a!=b:
   t=(cut-p[2])/(q[2]-p[2]);clipped.append((p+t*(q-p),uv+t*(qv-uv)))
 if len(clipped)>=3:
  idx=[vertex(*e) for e in clipped]
  for i in range(1,len(idx)-1):faces.append([idx[0],idx[i],idx[i+1]])
verts=np.array(verts);faces=np.array(faces);uvs=np.array(uvs)
# Seal every crop boundary with a ceramic patch using the exact shared boundary positions.
geo=trimesh.Trimesh(vertices=verts,faces=faces,process=True);edges=geo.edges_sorted;edges,count=np.unique(edges,axis=0,return_counts=True);boundary=edges[count==1]
adj={}
for a,b in boundary:adj.setdefault(a,[]).append(b);adj.setdefault(b,[]).append(a)
print('cup',len(faces),'boundary',len(boundary),'degrees',np.unique([len(v) for v in adj.values()],return_counts=True))
loops=[];remaining=set(map(tuple,boundary))
while remaining:
 a,b=next(iter(remaining));loop=[a];prev=a;cur=b;remaining.discard(tuple(sorted((a,b))))
 for _ in range(len(boundary)+2):
  if cur==a:break
  loop.append(cur);options=[n for n in adj[cur] if tuple(sorted((cur,n))) in remaining]
  if not options:break
  nxt=options[0];remaining.discard(tuple(sorted((cur,nxt))));prev,cur=cur,nxt
 if cur==a and len(loop)>=3:loops.append(loop)
 else:raise ValueError('Open boundary chain')
capverts=[];capfaces=[]
for loop in loops:
 ring=geo.vertices[loop];start=len(capverts);capverts.extend(ring);capverts.append(ring.mean(axis=0));center=start+len(ring)
 for i in range(len(ring)):capfaces.append([center,start+i,start+(i+1)%len(ring)])
cap=trimesh.Trimesh(vertices=capverts,faces=capfaces,process=False)
combined=trimesh.util.concatenate([geo,cap]);combined.merge_vertices();trimesh.repair.fix_normals(combined,multibody=True)
print('sealed cup watertight',combined.is_watertight,'components',combined.body_count)
assert combined.is_watertight
# Reconstruct the entire saucer as a closed smooth shell, rather than retaining background shards.
# Profile goes from the upper center, over the rolled rim, down to the foot and back to the lower center.
profile=np.array([[0,.012],[.02,.012],[.043,.012],[.055,.011],[.075,.008],[.095,.011],[.12,.018],[.143,.025],[.149,.0255],[.152,.0235],[.1525,.021],[.1505,.018],[.143,.016],[.125,.010],[.10,.003],[.08,-.003],[.064,-.005],[.061,-.007],[.061,-.010],[.057,-.012],[.052,-.011],[.051,-.007],[.040,-.005],[.02,-.005],[0,-.005]])
from scipy.interpolate import CubicSpline
step=np.r_[0,np.cumsum(np.linalg.norm(np.diff(profile,axis=0),axis=1))];cs=CubicSpline(step,profile,bc_type='natural');pr=cs(np.linspace(0,step[-1],160));pr[:,0]=np.maximum(pr[:,0],0);pr[0]=profile[0];pr[-1]=profile[-1]
segments=256;pv=[];pf=[]
for radius,h in pr:
 for angle in np.linspace(0,2*np.pi,segments,endpoint=False):pv.append([cx+radius*np.cos(angle),cy+radius*np.sin(angle),h])
for i in range(len(pr)-1):
 for j in range(segments):
  a=i*segments+j;b=i*segments+(j+1)%segments;c=(i+1)*segments+j;d=(i+1)*segments+(j+1)%segments;pf.extend([[a,b,c],[b,d,c]])
pv=np.array(pv);pf=np.array(pf)
plate=trimesh.Trimesh(vertices=pv,faces=pf,process=True);plate.update_faces(plate.nondegenerate_faces());plate.remove_unreferenced_vertices();plate.merge_vertices();trimesh.repair.fix_normals(plate)
assert plate.is_watertight
# Add a closed ceramic lining behind reconstructed side-wall voids. The outer
# photographic shell remains; this prevents seeing through failed scan patches.
lining_profile=np.array([[0,.056],[.027,.056],[.038,.060],[.045,.075],[.052,.095],[.060,.115],[.068,.135],[.071,.143],[.074,.143],[.077,.140],[.069,.12],[.061,.10],[.055,.08],[.050,.06],[.047,.04],[.045,.013],[0,.013]])
lining=trimesh.creation.revolve(lining_profile,sections=128);lining.apply_translation([cx,cy,0]);trimesh.repair.fix_normals(lining)
assert lining.is_watertight and lining.volume>0 and lining.is_winding_consistent
# Transfer the scan's saucer colors; reconstruct unknown underside as warm ceramic.
valid=(r>.075)&(r<.152)&(P[:,2]<.045)&(P[:,2]>-.018)&(C[:,2]>75)&((C[:,0].astype(int)-C[:,2])<75)
tree=cKDTree(P[valid]);dist,near=tree.query(plate.vertices,k=5);w=1/np.maximum(dist,.001)**2;colors=(C[valid][near]*w[:,:,None]).sum(axis=1)/w.sum(axis=1)[:,None]
blend=np.clip((np.linalg.norm(plate.vertices[:,:2]-[cx,cy],axis=1)-.04)/.045,0,1)*np.clip(plate.vertex_normals[:,2]*3,0,1);colors=np.array([222,218,207])+(colors-np.array([222,218,207]))*blend[:,None]*.30;colors=np.clip(colors/255,0,1);colors=np.where(colors<=.04045,colors/12.92,((colors+.055)/1.055)**2.4)
# Blend local photograph samples onto the inferred lining so filled patches do
# not appear as blank white cutouts against the photographed ceramic.
lining_tree=cKDTree(P);ld,li=lining_tree.query(lining.vertices,k=8);lw=1/np.maximum(ld,.002)**2
lining_colors=(C[li]*lw[:,:,None]).sum(axis=1)/lw.sum(axis=1)[:,None]/255
lining_colors=np.where(lining_colors<=.04045,lining_colors/12.92,((lining_colors+.055)/1.055)**2.4)
# Original cup keeps its UV atlas, with smoothed geometric normals and no noisy normal-map overlay.
orig=trimesh.Trimesh(vertices=verts,faces=faces,process=False)
# Share smooth normals across atlas seams.
normtree=cKDTree(geo.vertices);_,nidx=normtree.query(verts);normals=geo.vertex_normals[nidx]
texture.thumbnail((2048,2048),Image.Resampling.LANCZOS);buf=io.BytesIO();texture.save(buf,'JPEG',quality=94,optimize=True)
bin=bytearray();views=[];access=[]
def add(data,target=None):
 while len(bin)%4:bin.append(0)
 d={'buffer':0,'byteOffset':len(bin),'byteLength':len(data)}
 if target:d['target']=target
 views.append(d);bin.extend(data);return len(views)-1

def attr(a,typ):
 a=np.array(a,dtype='<f4');i=len(access);access.append({'bufferView':add(a.tobytes(),34962),'componentType':5126,'count':len(a),'type':typ,'min':a.min(axis=0).tolist(),'max':a.max(axis=0).tolist()});return i

def primitive(v,f,n,material,uv=None,color=None):
 at={'POSITION':attr(v,'VEC3'),'NORMAL':attr(n,'VEC3')}
 if uv is not None:at['TEXCOORD_0']=attr(uv,'VEC2')
 if color is not None:at['COLOR_0']=attr(color,'VEC3')
 i=len(access);idx=np.array(f,dtype='<u4').reshape(-1);access.append({'bufferView':add(idx.tobytes(),34963),'componentType':5125,'count':len(idx),'type':'SCALAR'})
 return {'attributes':at,'indices':i,'material':material}
uvs[:,1]=1-uvs[:,1]
# Reflect cap winding to agree with adjacent retained cup before export.
center_tree=cKDTree(combined.triangles_center);_,ci=center_tree.query(cap.triangles_center);wrong=(cap.face_normals*combined.face_normals[ci]).sum(axis=1)<0;cap.faces[wrong]=cap.faces[wrong][:,::-1]
primitives=[primitive(verts,faces,normals,0,uv=uvs),primitive(cap.vertices,cap.faces,cap.vertex_normals,1),primitive(plate.vertices,plate.faces,plate.vertex_normals,2,color=colors),primitive(lining.vertices,lining.faces,lining.vertex_normals,2,color=lining_colors)]
imageview=add(buf.getvalue());
while len(bin)%4:bin.append(0)
gltf={'asset':{'version':'2.0','generator':'Kobags scan cleanup: retained cup plus reconstructed saucer and closures'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0,'name':'Repaired coffee scan'}],'meshes':[{'primitives':primitives}],'materials':[{'name':'Smoothed scanned cup','pbrMetallicRoughness':{'baseColorTexture':{'index':0},'metallicFactor':0,'roughnessFactor':.48}}, {'name':'Reconstructed ceramic patches','pbrMetallicRoughness':{'baseColorFactor':[.80,.76,.69,1],'metallicFactor':0,'roughnessFactor':.5}}, {'name':'Reconstructed saucer with transferred scan colors','pbrMetallicRoughness':{'metallicFactor':0,'roughnessFactor':.48}}],'textures':[{'source':0}],'images':[{'bufferView':imageview,'mimeType':'image/jpeg'}],'accessors':access,'bufferViews':views,'buffers':[{'byteLength':len(bin)}]}
j=json.dumps(gltf,separators=(',',':')).encode();j+=b' '*((-len(j))%4);out=output;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(struct.pack('<III',0x46546c67,2,28+len(j)+len(bin))+struct.pack('<II',len(j),0x4e4f534a)+j+struct.pack('<II',len(bin),0x004e4942)+bin)
assert combined.is_winding_consistent and plate.is_winding_consistent
assert combined.volume>0 and plate.volume>0
assert np.isfinite(verts).all() and np.isfinite(uvs).all()
assert combined.area_faces.min()>1e-15 and plate.area_faces.min()>1e-15
report={'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'outputSHA256':hashlib.sha256(out.read_bytes()).hexdigest(),'consistentWinding':True,'positiveVolumes':True,'finiteCoordinates':True,'degenerateTriangles':0,'inferredSurfaces':['cup closure','saucer','underside','inner lining behind scan voids'],'triangles':len(faces)+len(cap.faces)+len(plate.faces)+len(lining.faces),'closedLining':bool(lining.is_watertight),'retainedCupTriangles':len(faces),'patchTriangles':len(cap.faces),'saucerTriangles':len(plate.faces),'closedCup':bool(combined.is_watertight),'closedSaucer':bool(plate.is_watertight),'boundaryLoopsRepaired':len(loops),'bytes':out.stat().st_size}
print(json.dumps(report));report_path.parent.mkdir(parents=True,exist_ok=True);report_path.write_text(json.dumps(report,indent=2)+'\n')
