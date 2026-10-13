"""Reconstruct the coffee trial as smooth ceramic using the supplied scan as reference.
Usage: python scripts/repair-test-scan.py Test.zip output.glb report.json
Offline dependencies: numpy, scipy, trimesh, Pillow.
The scan supplies scale/proportions and its original photograph. Smooth cup, rim,
handle and saucer replace damaged geometry; this is inferred, not measured CAD.
"""
import hashlib, io, json, struct, sys, zipfile
from pathlib import Path
import numpy as np
import trimesh
from PIL import Image
from scipy.interpolate import CubicSpline
from scipy.spatial import cKDTree

source, output, report_path = map(Path, sys.argv[1:4])
with zipfile.ZipFile(source) as archive:
    scan = trimesh.load(io.BytesIO(archive.read('Test.obj')), file_type='obj', force='mesh', process=False, skip_materials=True)
    photo = np.asarray(Image.open(io.BytesIO(archive.read('tex_u1_v1_diffuse.jpg'))).convert('RGB'))
points = scan.vertices.copy()
points[:, 2] += .15 * points[:, 0]
uv = scan.visual.uv
cx, cy = -.003, .023


def lathe(profile, rows=144, segments=192):
    """A closed solid section with an open bowl, rounded lip and real thickness."""
    profile = np.asarray(profile)
    distance = np.r_[0, np.cumsum(np.linalg.norm(np.diff(profile, axis=0), axis=1))]
    curve = CubicSpline(distance, profile, bc_type='natural')(np.linspace(0, distance[-1], rows))
    curve[:, 0] = np.maximum(curve[:, 0], 0)
    curve[0] = profile[0]
    curve[-1] = profile[-1]
    angles = np.arange(segments) * 2 * np.pi / segments
    vertices = np.stack([cx + curve[:, 0, None] * np.cos(angles), cy + curve[:, 0, None] * np.sin(angles), np.broadcast_to(curve[:, 1, None], (rows, segments))], axis=-1).reshape(-1, 3)
    faces = []
    for i in range(rows - 1):
        for j in range(segments):
            a, b = i * segments + j, i * segments + (j + 1) % segments
            c, d = a + segments, b + segments
            faces.extend([[a, b, c], [b, d, c]])
    mesh = trimesh.Trimesh(vertices=vertices, faces=faces, process=True)
    mesh.update_faces(mesh.nondegenerate_faces())
    mesh.remove_unreferenced_vertices()
    mesh.merge_vertices()
    trimesh.repair.fix_normals(mesh)
    mesh.metadata["texture_grid"] = vertices.reshape(rows, segments, 3).tolist()
    return mesh


cup = lathe([
    [0,.013],[.029,.013],[.041,.013],[.044,.015],[.045,.021],
    [.047,.034],[.053,.055],[.061,.080],[.070,.107],[.080,.134],
    [.0855,.150],[.087,.155],[.0865,.1575],[.0845,.1585],
    [.0823,.1575],[.081,.154],[.075,.136],[.065,.109],
    [.056,.083],[.047,.058],[.039,.039],[.031,.030],[.021,.027],[0,.027]
])
saucer = lathe([
    [0,.012],[.023,.012],[.044,.012],[.060,.010],[.076,.008],
    [.097,.012],[.120,.019],[.141,.025],[.149,.0255],
    [.152,.0235],[.1525,.021],[.1505,.018],[.141,.015],
    [.120,.009],[.094,.001],[.068,-.005],[.061,-.007],
    [.061,-.010],[.057,-.012],[.052,-.011],[.051,-.007],
    [.040,-.005],[.020,-.005],[0,-.005]
], rows=120)

# Rounded C handle: both capped roots are embedded in the cup wall. The viewer
# never sees open tube ends, table shards or a separate floating lining.
control = np.array([[.057,.062],[.080,.061],[.110,.067],[.126,.094],[.115,.120],[.095,.133],[.079,.130]])
d = np.r_[0, np.cumsum(np.linalg.norm(np.diff(control, axis=0), axis=1))]
t = np.linspace(0, d[-1], 144)
curve = CubicSpline(d, control, bc_type='natural')
centers, tangent = curve(t), curve(t, 1)
tangent /= np.linalg.norm(tangent, axis=1)[:, None]
vertices, faces = [], []
sections = 32
for i, (x, z) in enumerate(centers):
    root = np.exp(-min(i, len(t)-1-i) / 10)
    thickness = .0075 + .0025 * root
    for a in np.arange(sections) * 2 * np.pi / sections:
        vertices.append([cx+x-tangent[i,1]*np.cos(a)*thickness, cy+np.sin(a)*thickness*.85, z+tangent[i,0]*np.cos(a)*thickness])
for i in range(len(t)-1):
    for j in range(sections):
        a,b=i*sections+j,i*sections+(j+1)%sections
        faces.extend([[a,b,a+sections],[b,b+sections,a+sections]])
for end in [0,len(t)-1]:
    center=len(vertices);vertices.append([cx+centers[end,0],cy,centers[end,1]])
    for j in range(sections):faces.append([center,end*sections+j,end*sections+(j+1)%sections])
vertices=np.asarray(vertices)
# Keep the roots inside the outer glaze, never protruding into the inner bowl.
outer_radius=np.interp(vertices[:,2],[.034,.055,.080,.107,.134,.150],[.047,.053,.061,.070,.080,.0855])
radial_handle=vertices[:,:2]-[cx,cy]
length=np.linalg.norm(radial_handle,axis=1)
root_radius=np.maximum(length,outer_radius-.001)
vertices[:,:2]=[cx,cy]+radial_handle*(root_radius/length)[:,None]
handle=trimesh.Trimesh(vertices=vertices,faces=faces,process=True)
trimesh.repair.fix_normals(handle)
handle.metadata["texture_grid"] = vertices[:len(t)*sections].reshape(len(t),sections,3).tolist()


from scan_texture_projection import project_textures
models={'cup':cup,'handle':handle,'saucer':saucer}
textures=project_textures(points,scan.faces,uv,photo,models,(cx,cy))
# Export the exact accepted geometry with original photograph projections.

binary=bytearray();views=[];accessors=[]
def buffer(data,target=None):
    while len(binary)%4:binary.append(0)
    entry={'buffer':0,'byteOffset':len(binary),'byteLength':len(data)}
    if target:entry['target']=target
    views.append(entry);binary.extend(data);return len(views)-1

def attribute(values,kind):
    values=np.asarray(values,dtype='<f4');index=len(accessors)
    accessors.append({'bufferView':buffer(values.tobytes(),34962),'componentType':5126,'count':len(values),'type':kind,'min':values.min(axis=0).tolist(),'max':values.max(axis=0).tolist()})
    return index

primitives=[];checks={};images=[];materials=[]
for name,mesh in models.items():
    assert mesh.is_watertight and mesh.is_winding_consistent and mesh.volume>0,name
    assert np.isfinite(mesh.vertices).all() and np.isfinite(mesh.vertex_normals).all(),name
    assert mesh.area_faces.min()>1e-15,name
    chart=textures[name]
    attributes={'POSITION':attribute(chart['vertices'],'VEC3'),'NORMAL':attribute(chart['normals'],'VEC3'),'TEXCOORD_0':attribute(chart['uv'],'VEC2')}
    indices=len(accessors);faces=np.asarray(chart['faces'],dtype='<u4').reshape(-1)
    accessors.append({'bufferView':buffer(faces.tobytes(),34963),'componentType':5125,'count':len(faces),'type':'SCALAR'})
    primitives.append({'attributes':attributes,'indices':indices,'material':len(materials)})
    images.append({'bufferView':buffer(chart['jpeg']),'mimeType':'image/jpeg'})
    materials.append({'name':name+' original photograph on smooth geometry','pbrMetallicRoughness':{'baseColorTexture':{'index':len(materials)},'metallicFactor':0,'roughnessFactor':.30},'extensions':{'KHR_materials_clearcoat':{'clearcoatFactor':.60,'clearcoatRoughnessFactor':.20}}})
    checks[name]={'closed':True,'positiveVolume':True,'consistentWinding':True,'triangles':len(mesh.faces)}
while len(binary)%4:binary.append(0)
gltf={'asset':{'version':'2.0','generator':'Kobags smooth ceramic reconstruction from supplied coffee scan'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0,'name':'Smooth coffee cup and saucer'}],'meshes':[{'primitives':primitives}],'materials':materials,'images':images,'textures':[{'source':i,'sampler':0} for i in range(len(images))],'samplers':[{'wrapS':10497,'wrapT':33071,'magFilter':9729,'minFilter':9987}],'extensionsUsed':['KHR_materials_clearcoat'],'accessors':accessors,'bufferViews':views,'buffers':[{'byteLength':len(binary)}]}
encoded=json.dumps(gltf,separators=(',',':')).encode();encoded+=b' '*((-len(encoded))%4)
output.parent.mkdir(parents=True,exist_ok=True)
output.write_bytes(struct.pack('<III',0x46546c67,2,28+len(encoded)+len(binary))+struct.pack('<II',len(encoded),0x4e4f534a)+encoded+struct.pack('<II',len(binary),0x004e4942)+binary)
report={'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'outputSHA256':hashlib.sha256(output.read_bytes()).hexdigest(),'method':'Original photograph projected onto unchanged smooth geometry; no displacement or dented normals','components':checks,'triangles':sum(v['triangles'] for v in checks.values()),'bytes':output.stat().st_size,'finiteCoordinates':True,'degenerateTriangles':0,'inferredSurfaces':['cup walls and inner bowl','rounded rim','handle','saucer and underside'],'sourceGeometryRetained':False,'textureSource':'Unmodified original diffuse atlas, projected by nearest source triangle and interpolated UV','textureCharts':{name:{'width':data['width'],'height':data['height'],'bytes':len(data['jpeg']),'projectedTexels':data['projectedTexels']} for name,data in textures.items()}}
report_path.parent.mkdir(parents=True,exist_ok=True);report_path.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
