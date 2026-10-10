# Studio image provenance

## Open-top and material refinement — 10 October 2026

The Box and Handle interiors now follow the actual curved front/back panels and folded gussets. Their floors and undersides share the fold profile; the earlier rectangular insert, thick rim rails and protruding rectangular base are removed. Thin fabric hems and inset seams follow the mouth. Small edge relaxation and gusset variation soften the otherwise rigid outline.

Interior surfaces use the client-derived fabric crop with gradual corner/depth shading. Seam color comes from that same crop. Reduced bump relief avoids an exaggerated textured-plastic appearance. A cached 1024px directional shadow adds handle/cloth self-shadowing while the existing soft floor contact shadow remains. The static light shadow is computed once per model and its resources are disposed when switching bags; idle/offscreen rendering behavior remains part of verification. These refinements do not turn the illustrative model into a measured scan or change its saved artwork coordinate system.


## Current photo-based designer

The current `studio-real-*` blank mockups are derived from the client's supplied product photographs in `CoBag-20260928T203801Z-1-001.zip`. Image generation removed printed artwork while retaining a photographic reference for each bag family. The T-Shirt Natural variant recolors that blank fabric to a warm natural shade. These are edited illustrative previews, not untouched photos of a finished order.

[studio-real-photo-sources.json](studio-real-photo-sources.json) maps each source photograph to its shipped blank asset. `lib/studio-artwork.ts` selects the current assets and their alpha bounds. Natural Handle, Box and T-Shirt keep their supplied blank-asset colors; other colors use a luminance-preserving canvas tint. Unedited production photographs appear separately in the catalog and studio reference gallery.

The five Three.js models use volumetric front/back panels, gussets, bases, handles or closures. Front fabric comes from the corresponding edited photograph. No clean rear photograph was supplied, so the back is reconstructed from an unprinted fabric crop. This is not a photogrammetry scan or approved production CAD.

`lib/studio-projection.ts` registers the canonical 3D artwork coordinates onto each photographed front-panel quadrilateral. The same projection drives the flat editor and PNG export; the inverse drives pointer placement. It excludes the photographed side gusset and clips shaped handle openings. Registration points must be reviewed if a source asset changes. They describe an illustrative surface, not an approved print area or measurement.

Single-face exports are 1600 × 1820 pixels with a specification footer; two-sided sheets are 2000 × 1400. Render dimensions do not add source-photo detail. Size selection changes the quoted specification; geometry is illustrative by family. Production still requires approved dimensions, colors, materials and print placement.

## Retained earlier assets

`public/assets/studio-v4/` contains five previously generated blank illustrations (1254 × 1254 transparent source PNGs and optimized WebP copies). The original Kobags photos informed their written geometry brief; they were generated without attached reference files after local reference transport failed. Exact prompts and provenance remain in [studio-v4-prompts.json](studio-v4-prompts.json). These assets are retained for reuse/history and are not the current designer's selected mockups.

`public/assets/studio-bag-atlas.png` is the earlier generated 1983 × 793 atlas. Saved snapshots without `previewVersion: "v4"` retain the original atlas renderer and identity artwork mapping. Keep the atlas while historic snapshots can reference it.

## Original brand evidence

The original client product photographs, factory images/videos and certificate scans retain their source content. See `asset-sources.json`, `studio-real-photo-sources.json` and the supplied-media manifests. An edited studio mockup must not be relabelled as an untouched photograph of production or a verified manufacturing proof.

The 3 October registration places artwork centers on the photographed panel with a uniform scale and local tilt. Logos retain their aspect ratio; the projection does not stretch an entire artwork plane to the photo. `qa/studio_aspect_checks.py` verifies center/edge exports for all five families, rotated artwork and visible-pixel dragging. Panel coordinates are illustrative and must be recalibrated when replacing a mockup.
