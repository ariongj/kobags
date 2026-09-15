# Studio image provenance

## Current designer mockups

Five individual blank bag illustrations were generated with the built-in `image_gen` tool in September 2026, one output per shape: D-cut, Handle, Box, T-shirt and String. The original Kobags product photographs informed the geometry brief; the tool generated new assets from written descriptions after local reference-file transport failed before generation. There was no quality-retry generation loop.

Each original is a 1254 × 1254 RGBA PNG with genuine transparency. The application serves optimized WebP versions at quality 94 with full alpha quality from `public/assets/studio-v4/`. Together these assets are about 1.58 MB. Runtime silhouette bounds normalize spacing, low-alpha fringe pixels are omitted, and canvas tinting preserves fabric shading. Tiny generated edge irregularities remain; these are illustrative mockups rather than production templates.

Exact prompts, original generated paths and shipped asset paths are in [studio-v4-prompts.json](studio-v4-prompts.json). The mode was built-in image generation, not an external API. The requested image size was 1536px or best available; the actual output size was 1254px.

The interface renders at 1600 × 1600; downloadable concept sheets are 1600 × 1820 with a specification footer. Enlarging the render does not create additional source-photo detail. Both sides reuse the same illustrative silhouette. Size selection updates specifications, not the physical shape of the mockup.

## Earlier mockup

`public/assets/studio-bag-atlas.png` is the original generated 1983 × 793 atlas. Saved design snapshots without `previewVersion: "v4"` continue using its bag geometry. Current drafts use the individual mockups. Keep the atlas while historic artwork snapshots can reference it.

## Original brand evidence

Original Kobags product photos retain their existing printed branding and appear in the catalog. Factory images, original product photographs, certificate scans and manufacturing video come from Kobags' public site; see `asset-sources.json`.

The studio does not present generated illustrations as photographs of manufactured samples. The interface and exported preview require approval of actual shape, material, color and print placement. These assets are not exact dielines, 3D models, material samples or a guarantee of printable area.
