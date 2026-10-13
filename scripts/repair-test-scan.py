"""Reconstruct the coffee trial as smooth ceramic using the supplied scan as reference.
Usage: python scripts/repair-test-scan.py Test.zip output.glb report.json
Offline dependencies: numpy, scipy, trimesh, Pillow.
The scan supplies scale/proportions and sampled surface colors. Smooth cup, rim,
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
px = np.clip((uv[:, 0] * photo.shape[1]).astype(int), 0, photo.shape[1] - 1)
py = np.clip(((1 - uv[:, 1]) * photo.shape[0]).astype(int), 0, photo.shape[0] - 1)
source_colors = photo[py, px].astype(float)
cx, cy = -.003, .023
radius = np.linalg.norm(points[:, :2] - [cx, cy], axis=1)
ceramic = np.array([233., 228., 218.])


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


def linear(rgb):
    rgb=np.clip(rgb/255,0,1)
    return np.where(rgb<=.04045,rgb/12.92,((rgb+.055)/1.055)**2.4)


def sampled(mesh, valid, strength):
    # Robust spatial sampling removes sharp baked scan shadows from dents, while
    # retaining the source ceramic tone and subdued printed/color detail.
    tree=cKDTree(points[valid])
    distance, near=tree.query(mesh.vertices,k=32)
    values=source_colors[valid][near]
    low,high=np.quantile(values,[.2,.8],axis=1)
    values=np.clip(values,low[:,None,:],high[:,None,:])
    weight=1/np.maximum(distance,.003)**2
    color=(values*weight[:,:,None]).sum(axis=1)/weight.sum(axis=1)[:,None]
    return ceramic+(color-ceramic)*strength


cup_colors=sampled(cup,(points[:,2]>.020)&(radius<.10),.04)
# Separate interior from exterior so dark coffee residue cannot be projected
# onto the outside of the cup through a bad scan wall.
radial=cup.vertices[:,:2]-[cx,cy]
radial/=np.maximum(np.linalg.norm(radial,axis=1)[:,None],1e-9)
inside=(cup.vertex_normals[:,:2]*radial).sum(axis=1)<-.25
interior=sampled(cup,(points[:,2]>.026)&(radius<.077),.08)
cup_colors[inside]=interior[inside]
# Keep a warm, continuous ceramic bowl bottom instead of malformed dark scan
# fragments; the source only partially captured the interior.
inner_floor=(cup.vertices[:,2]<.036)&(cup.vertex_normals[:,2]>.3)
cup_colors[inner_floor]=ceramic*.98
saucer_colors=sampled(saucer,(radius>.076)&(radius<.153)&(points[:,2]<.045)&(points[:,2]>-.018)&(source_colors[:,2]>90),.04)
handle_colors=sampled(handle,(points[:,0]>.060)&(points[:,2]>.045),.04)

# Export color-sampled glTF meshes with physically based ceramic glaze. No
# noisy displacement/normal texture: all lighting follows the clean geometry.
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

primitives=[];checks={}
for name,mesh,color in [('cup',cup,cup_colors),('handle',handle,handle_colors),('saucer',saucer,saucer_colors)]:
    assert mesh.is_watertight and mesh.is_winding_consistent and mesh.volume>0,name
    assert np.isfinite(mesh.vertices).all() and np.isfinite(mesh.vertex_normals).all(),name
    assert mesh.area_faces.min()>1e-15,name
    attributes={'POSITION':attribute(mesh.vertices,'VEC3'),'NORMAL':attribute(mesh.vertex_normals,'VEC3'),'COLOR_0':attribute(linear(color),'VEC3')}
    indices=len(accessors);faces=np.asarray(mesh.faces,dtype='<u4').reshape(-1)
    accessors.append({'bufferView':buffer(faces.tobytes(),34963),'componentType':5125,'count':len(faces),'type':'SCALAR'})
    primitives.append({'attributes':attributes,'indices':indices,'material':0})
    checks[name]={'closed':True,'positiveVolume':True,'consistentWinding':True,'triangles':len(mesh.faces)}
while len(binary)%4:binary.append(0)
gltf={'asset':{'version':'2.0','generator':'Kobags smooth ceramic reconstruction from supplied coffee scan'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0,'name':'Smooth coffee cup and saucer'}],'meshes':[{'primitives':primitives}],'materials':[{'name':'Glazed ivory ceramic with sampled scan color','pbrMetallicRoughness':{'metallicFactor':0,'roughnessFactor':.26},'extensions':{'KHR_materials_clearcoat':{'clearcoatFactor':.85,'clearcoatRoughnessFactor':.18}}}],'extensionsUsed':['KHR_materials_clearcoat'],'accessors':accessors,'bufferViews':views,'buffers':[{'byteLength':len(binary)}]}
encoded=json.dumps(gltf,separators=(',',':')).encode();encoded+=b' '*((-len(encoded))%4)
output.parent.mkdir(parents=True,exist_ok=True)
output.write_bytes(struct.pack('<III',0x46546c67,2,28+len(encoded)+len(binary))+struct.pack('<II',len(encoded),0x4e4f534a)+encoded+struct.pack('<II',len(binary),0x004e4942)+binary)
report={'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'outputSHA256':hashlib.sha256(output.read_bytes()).hexdigest(),'method':'Smooth reconstructed ceramic, source-sampled colors; original damaged triangles removed','components':checks,'triangles':sum(v['triangles'] for v in checks.values()),'bytes':output.stat().st_size,'finiteCoordinates':True,'degenerateTriangles':0,'inferredSurfaces':['cup walls and inner bowl','rounded rim','handle','saucer and underside'],'sourceGeometryRetained':False}
report_path.parent.mkdir(parents=True,exist_ok=True);report_path.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
