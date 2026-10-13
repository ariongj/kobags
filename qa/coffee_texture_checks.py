"""Check original-photo texture payloads and exact preservation of v46 geometry."""
import hashlib,io,json,struct,sys
from pathlib import Path
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]

def load(path):
 data=Path(path).read_bytes();length=struct.unpack_from('<I',data,12)[0];g=json.loads(data[20:20+length]);binary=data[28+length:]
 def read(index):
  a=g['accessors'][index];v=g['bufferViews'][a['bufferView']];offset=v.get('byteOffset',0)+a.get('byteOffset',0);dtype={5126:'<f4',5125:'<u4'}[a['componentType']];size={'VEC3':3,'VEC2':2,'SCALAR':1}[a['type']]
  return np.frombuffer(binary,dtype=dtype,count=a['count']*size,offset=offset).reshape(a['count'],size)
 return g,binary,read
before,_,old=load(sys.argv[1]);after,binary,new=load(ROOT/'public/assets/models/coffee-test.glb')
checks=[]
assert len(before['meshes'][0]['primitives'])==len(after['meshes'][0]['primitives'])==3
for index,(a,b) in enumerate(zip(before['meshes'][0]['primitives'],after['meshes'][0]['primitives'])):
 ai,bi=old(a['indices']).ravel(),new(b['indices']).ravel()
 hashes={}
 for attribute in ['POSITION','NORMAL']:
  original=old(a['attributes'][attribute])[ai];current=new(b['attributes'][attribute])[bi]
  assert np.array_equal(original,current),(index,attribute,'changed')
  hashes[attribute]=hashlib.sha256(current.tobytes()).hexdigest()
 uv=new(b['attributes']['TEXCOORD_0']);assert np.isfinite(uv).all()
 material=after['materials'][b['material']];assert 'normalTexture' not in material
 assert 'baseColorTexture' in material['pbrMetallicRoughness'] and 'COLOR_0' not in b['attributes']
 checks.append({'component':index,'positionsIdentical':True,'normalsIdentical':True,'positionSHA256':hashes['POSITION'],'normalSHA256':hashes['NORMAL']})
images=[]
for item in after['images']:
 view=after['bufferViews'][item['bufferView']];data=binary[view.get('byteOffset',0):view.get('byteOffset',0)+view['byteLength']];image=Image.open(io.BytesIO(data));pixels=np.asarray(image).astype(float);contrast=float(np.std(pixels))
 assert contrast>12,('Washed-out or empty texture',contrast)
 images.append({'width':image.width,'height':image.height,'bytes':len(data),'pixelStandardDeviation':round(contrast,2)})
report={'status':'passed','geometryBaseline':'version 46','components':checks,'textures':images,'noDentedNormalsOrDisplacement':True}
(ROOT/'evidence/coffee-texture-checks.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
