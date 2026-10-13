"""Bake original scan photographs onto existing smooth mesh UV charts.
This transfers color only; never modifies target positions, normals or topology.
"""
import io
import numpy as np
import trimesh
from PIL import Image
from scipy.spatial import cKDTree


def project_textures(scan_points, faces, scan_uv, photograph, meshes, center):
    cx, cy = center
    triangles = scan_points[faces]
    centers = triangles.mean(axis=1)
    normals = trimesh.triangles.normals(triangles)[0]
    radial = centers[:, :2] - [cx, cy]
    radius = np.linalg.norm(radial, axis=1)
    radial /= np.maximum(radius[:, None], 1e-9)
    facing = (normals[:, :2] * radial).sum(axis=1)
    height = centers[:, 2]
    outer_envelope=np.interp(height,[.019,.034,.055,.080,.107,.134,.155],[.045,.047,.053,.061,.070,.080,.087])
    handle_reference=(centers[:,0]>.108)&(height>.055)&(height<.145)
    handle_center=np.median(centers[handle_reference,:2],axis=0)-[cx,cy]
    handle_angle=np.arctan2(handle_center[1],handle_center[0])
    masks = {
        'outside': (height > .012) & (radius < .108) & (radius > outer_envelope-.003) & (facing > .25),
        'inside': (height > .035) & (radius < .079) & ((facing < -.15) | (normals[:, 2] > .45)),
        'rim': (height > .135) & (radius < .108),
        'saucer': (radius > .071) & (radius < .155) & (height > -.012) & (height < .044) & (normals[:, 2] > .25),
        'handle': (centers[:, 0] > .07) & (height > .040) & (height < .153),
    }
    sources = {name: (np.flatnonzero(mask), cKDTree(centers[mask])) for name, mask in masks.items()}
    dimensions = {'cup': (2048, 1024), 'saucer': (1024, 512), 'handle': (512, 512)}
    results = {}

    def sample(query, target_normals, group):
        indices, tree = sources[group]
        _, near = tree.query(query, k=12)
        chosen = indices[near]
        shape = chosen.shape
        candidate_triangles = triangles[chosen.ravel()]
        repeated = np.repeat(query, shape[1], axis=0)
        closest = trimesh.triangles.closest_point(candidate_triangles, repeated)
        distances = ((closest - repeated) ** 2).sum(axis=1).reshape(shape)
        alignment = (normals[chosen] * target_normals[:, None, :]).sum(axis=2)
        scores = distances + (.012 * (1 - np.clip(alignment, 0, 1))) ** 2
        best = np.argmin(scores, axis=1)
        flat = np.arange(len(query)) * shape[1] + best
        picked_faces = chosen[np.arange(len(query)), best]
        bary = trimesh.triangles.points_to_barycentric(triangles[picked_faces], closest[flat])
        bary = np.clip(bary, 0, 1)
        bary /= bary.sum(axis=1)[:, None]
        texture_uv = (scan_uv[faces[picked_faces]] * bary[:, :, None]).sum(axis=1)
        # Sample the supplied original atlas with bilinear interpolation. UV
        # discontinuities stay inside their source triangle, never across islands.
        x = np.clip(texture_uv[:, 0] * photograph.shape[1] - .5, 0, photograph.shape[1] - 1)
        y = np.clip((1 - texture_uv[:, 1]) * photograph.shape[0] - .5, 0, photograph.shape[0] - 1)
        x0, y0 = x.astype(int), y.astype(int)
        x1, y1 = np.minimum(x0 + 1, photograph.shape[1] - 1), np.minimum(y0 + 1, photograph.shape[0] - 1)
        dx, dy = (x - x0)[:, None], (y - y0)[:, None]
        return photograph[y0, x0] * (1-dx)*(1-dy) + photograph[y0, x1]*dx*(1-dy) + photograph[y1, x0]*(1-dx)*dy + photograph[y1, x1]*dx*dy

    for name, mesh in meshes.items():
        width, height_px = dimensions[name]
        grid = np.asarray(mesh.metadata['texture_grid'])
        rows, segments = grid.shape[:2]
        _, nearest = cKDTree(mesh.vertices).query(grid.reshape(-1, 3))
        grid_normals = mesh.vertex_normals[nearest].reshape(grid.shape)
        atlas = np.empty((height_px * width, 3), dtype=np.uint8)
        coverage = {}
        for start in range(0, len(atlas), 4096):
            ids = np.arange(start, min(start+4096, len(atlas)))
            u, v = (ids % width + .5)/width, (ids // width + .5)/height_px
            a = u * segments
            b = v * (rows-1)
            x0 = np.floor(a).astype(int) % segments
            x1 = (x0+1) % segments
            y0 = np.floor(b).astype(int)
            y1 = np.minimum(y0+1, rows-1)
            dx, dy = (a-np.floor(a))[:, None], (b-y0)[:, None]
            def interpolate(values):
                return values[y0,x0]*(1-dx)*(1-dy)+values[y0,x1]*dx*(1-dy)+values[y1,x0]*(1-dx)*dy+values[y1,x1]*dx*dy
            query, target_normals = interpolate(grid), interpolate(grid_normals)
            target_normals /= np.maximum(np.linalg.norm(target_normals,axis=1)[:,None],1e-9)
            color = np.broadcast_to([233.,228.,218.], query.shape).copy()
            if name == 'cup':
                radial = query[:,:2]-[cx,cy]
                radial /= np.maximum(np.linalg.norm(radial,axis=1)[:,None],1e-9)
                facing_target=(radial*target_normals[:,:2]).sum(axis=1)
                inside=(facing_target<-.2)|((query[:,2]<.055)&(target_normals[:,2]>.3))
                rim=(query[:,2]>.150)&~inside
                outside=~inside&~rim&(query[:,2]>.019)
                groups={'outside':outside,'inside':inside,'rim':rim}
                # The scan's captured inner floor lies higher than the rebuilt
                # bowl. Match relative bowl depth without altering geometry.
                query[inside,2]=.064+(query[inside,2]-.027)/(.1585-.027)*(.1585-.064)
            elif name == 'saucer':
                groups={'saucer':target_normals[:,2]>.2}
            else:
                relative=query[:,:2]-[cx,cy]
                c,s=np.cos(handle_angle),np.sin(handle_angle)
                query[:,:2]=relative@np.array([[c,s],[-s,c]])+[cx,cy]
                target_normals[:,:2]=target_normals[:,:2]@np.array([[c,s],[-s,c]])
                groups={'handle':np.ones(len(query),dtype=bool)}
            for group, selected in groups.items():
                if selected.any():
                    color[selected]=sample(query[selected],target_normals[selected],group)
                    coverage[group]=coverage.get(group,0)+int(selected.sum())
            atlas[ids]=np.clip(color,0,255).astype(np.uint8)
        image=Image.fromarray(atlas.reshape(height_px,width,3))
        encoded=io.BytesIO();image.save(encoded,'JPEG',quality=95,subsampling=0,optimize=True)
        # Assign the chart to unchanged mesh vertices and split only the UV seam.
        flat_grid=grid.reshape(-1,3)
        _, closest_grid=cKDTree(flat_grid).query(mesh.vertices)
        vertex_uv=np.c_[(closest_grid%segments)/segments,(closest_grid//segments)/(rows-1)]
        ids=[];uvs=[];new_faces=[];lookup={}
        for face in mesh.faces:
            face_uv=vertex_uv[face].copy()
            if np.ptp(face_uv[:,0])>.5:face_uv[face_uv[:,0]<.5,0]+=1
            if name!='handle':
                poles=np.linalg.norm(mesh.vertices[face,:2]-[cx,cy],axis=1)<1e-8
                if poles.any() and (~poles).any():face_uv[poles,0]=face_uv[~poles,0].mean()
            exported=[]
            for index, coord in zip(face,face_uv):
                key=(int(index),round(float(coord[0]),7),round(float(coord[1]),7))
                if key not in lookup:
                    lookup[key]=len(ids);ids.append(index);uvs.append(coord)
                exported.append(lookup[key])
            new_faces.append(exported)
        results[name]={'vertices':mesh.vertices[ids],'normals':mesh.vertex_normals[ids],'faces':np.asarray(new_faces),'uv':np.asarray(uvs),'jpeg':encoded.getvalue(),'width':width,'height':height_px,'projectedTexels':coverage}
        print('Baked',name,dimensions[name],len(encoded.getvalue()),'bytes',flush=True)
    return results
