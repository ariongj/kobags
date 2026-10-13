"""Convert the supplied coffee OBJ scan to a self-contained web GLB.
Usage: python convert-test-scan.py Test.zip public/assets/models/coffee-test.glb
Keeps every triangle and supplied normals/UVs. Resamples texture atlases to 2K.
Requires Pillow; no network, reconstruction or generated geometry.
"""
import io,json,struct,sys,zipfile,hashlib
from array import array
from pathlib import Path
from PIL import Image
source,output=map(Path,sys.argv[1:3]);positions=[];normals=[];uvs=[];verts=[];ns=[];ts=[];indices=[];lookup={}
with zipfile.ZipFile(source) as z:
 for line in z.read('Test.obj').decode().splitlines():
  t=line.split()
  if not t:continue
  if t[0]=='v':positions.append(tuple(map(float,t[1:4])))
  elif t[0]=='vn':normals.append(tuple(map(float,t[1:4])))
  elif t[0]=='vt':uvs.append(tuple(map(float,t[1:3])))
  elif t[0]=='f':
   face=[]
   for token in t[1:]:
    key=tuple(map(int,token.split('/')))
    if key not in lookup:
     v,uv,n=key;lookup[key]=len(lookup);verts.extend(positions[v-1]);ns.extend(normals[n-1]);u,w=uvs[uv-1];ts.extend((u,1-w))
    face.append(lookup[key])
   for i in range(1,len(face)-1):indices.extend((face[0],face[i],face[i+1]))
 textures=[]
 for name in ['tex_u1_v1_diffuse.jpg','tex_u1_v1_normal.jpg']:
  im=Image.open(io.BytesIO(z.read(name))).convert('RGB');im.thumbnail((2048,2048),Image.Resampling.LANCZOS);buf=io.BytesIO();im.save(buf,'JPEG',quality=92,optimize=True);textures.append(buf.getvalue())
binary=bytearray();views=[]
def add(data,target=None):
 while len(binary)%4:binary.append(0)
 v={'buffer':0,'byteOffset':len(binary),'byteLength':len(data)}
 if target:v['target']=target
 views.append(v);binary.extend(data);return len(views)-1

def floats(values):
 a=array('f',values)
 if sys.byteorder!='little':a.byteswap()
 return a.tobytes()
mins=[min(verts[i::3]) for i in range(3)];maxs=[max(verts[i::3]) for i in range(3)]
accessors=[{'bufferView':add(floats(verts),34962),'componentType':5126,'count':len(verts)//3,'type':'VEC3','min':mins,'max':maxs}, {'bufferView':add(floats(ns),34962),'componentType':5126,'count':len(ns)//3,'type':'VEC3'}, {'bufferView':add(floats(ts),34962),'componentType':5126,'count':len(ts)//2,'type':'VEC2'}, {'bufferView':add(struct.pack('<%sI'%len(indices),*indices),34963),'componentType':5125,'count':len(indices),'type':'SCALAR'}]
images=[{'bufferView':add(t),'mimeType':'image/jpeg'} for t in textures]
while len(binary)%4:binary.append(0)
gltf={'asset':{'version':'2.0','generator':'Kobags supplied scan conversion'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0,'name':'Coffee scan — test only'}],'meshes':[{'primitives':[{'attributes':{'POSITION':0,'NORMAL':1,'TEXCOORD_0':2},'indices':3,'material':0}]}],'materials':[{'name':'Original scan texture','pbrMetallicRoughness':{'baseColorTexture':{'index':0},'metallicFactor':0,'roughnessFactor':0.8},'normalTexture':{'index':1,'scale':0.45},'doubleSided':True}],'textures':[{'source':0},{'source':1}],'images':images,'accessors':accessors,'bufferViews':views,'buffers':[{'byteLength':len(binary)}]}
j=json.dumps(gltf,separators=(',',':')).encode();j+=b' '*((-len(j))%4)
output.parent.mkdir(parents=True,exist_ok=True);output.write_bytes(struct.pack('<III',0x46546c67,2,28+len(j)+len(binary))+struct.pack('<II',len(j),0x4e4f534a)+j+struct.pack('<II',len(binary),0x004e4942)+binary)
print(json.dumps({'triangles':len(indices)//3,'vertices':len(verts)//3,'bytes':output.stat().st_size,'textures':'2048 x 2048','sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest()}))
