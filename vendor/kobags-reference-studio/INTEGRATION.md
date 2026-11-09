# Owner-supplied studio integration

Source: https://github.com/ariongj/mo at b23cd8fb92cded92b01bef683a96d449da808dca.
The upstream index.html and README are preserved unchanged. The six bag types, 20 actual samples, fabric maps, GTAO lighting, fonts and base geometry come from that source. The website applies the explicit refinements listed below. The README's older sample count says 19; the current array contains 20.

`npm run build` bundles this source with its exact Three.js 0.169.0 and QR-generator 1.4.4 versions. Fonts, code and artwork are served from the same website origin. Font licenses and provenance are retained here; published notices are in `/documents/`.

Delivery changes are separate from the upstream file:

- `scripts/build-reference-studio.mjs`: bundles dependencies, emits hashed assets and the same-origin HTML document; catches startup failures with a reload message. It corrects `setAnimationLoop(render)` to `setAnimationLoop(() => render())` because Three's timestamp was being interpreted as the source's `force` argument. The supplied lighting is retained; explicit geometry refinements are isolated in `realism-patch.mjs`. The canvas reserves a 56px strip for front/back controls so they cannot cover the bag base.
- `site-bridge.js`: essential browser draft persistence, restoration of uploaded artwork and handle settings, origin-checked parent messages, and bounded front/back artwork plus 3D preview images for the existing quote flow. No analytics, upload service or external data connection is added.
- The parent and viewer exchange a ready-state handshake after hydration and iframe loading. Cached reloads do not depend on a one-time message. The existing cookie settings clear the studio draft too, including other open studio tabs; restored upload IDs remain unique.
- `/design`: site navigation and a quote button around the original studio.
- `/design/viewer`: the original full-screen document; `?preview=1` uses the same renderer without the control panel for the homepage.
- Host checks permit studio routes only on `kobags.itdks.tech` (and local development). The main domain continues to redirect studio paths to its product catalogue.

Quotes retain the selected studio dimensions and exact 3D previews. The source's six-type / XS–XL specification is mapped to the existing five-type catalogue as a custom specification request; Bottle uses the die-cut catalogue family, with Bottle named explicitly. Exact colour hex values and handle settings are preserved in the notes. Published stock rules and quotation minimums are not replaced by the reference configurator's sample specifications. Staff still review final production feasibility.

These are the supplied procedural models, not newly created calibrated scans. Physical scan accuracy is not claimed. Native studio controls retain the supplied English wording; the surrounding website and quote routes retain their existing English/Albanian localization.

9 November 2026 refinements:

- `realism-patch.mjs`: guarded transformations for rounded, subtly asymmetric handles, actual surface attachments, a fine shared fibre map and sub-millimetre tension relief. Existing seam boundaries and all six product families remain intact.
- `usability.js` / `.css`: persistent front/back design buttons, an artwork picker, duplicate/nudge/size controls, protected copy-to-other-side, accessible logo activation and keyboard tabs. Mobile keeps the 3D preview above a scrollable property panel; the compact artwork row provides selection, Move and Add.
- `reference-gallery.js` / `.css`: on-demand approved production photographs with an accessible dialog, matched to the selected family. No unrelated Bottle photograph is substituted.
- Validation: `node qa/reference_studio_geometry.mjs`; `qa/reference_studio_usability.py --width 393` or `--live --width 320` with the configured browser runtime. These remain procedural previews, not calibrated scans.

Client-review refinement, 9 November 2026:

- T-shirt side gussets now open through the body and mouth, tapering only through the upper vest handles. The shell stays hollow, within its selected depth, with continuous side seams and the original cut-out/tab masks. Shallow vertical pull folds add fabric relief.
- All six families offer Opened (default) and Folded / flat. The T-shirt folded view retains the original flat-tube profile, with the hand openings described below. This presentation setting persists with the essential local draft and is identified in quote notes without changing dimensions or artwork.
- Loop handles have softer shoulders and subtly offset crowns while both ends remain attached to the actual body surface.
- Mobile design controls reuse the existing artwork selector in a compact dock. Add opens logo/text/QR actions; selected-item settings appear directly in the scrolling pane. Move opens the placement workspace with the existing nudge and size buttons. Front and back remember their selection independently. Controls move back to their original positions on desktop.
- Move (Expand canvas on desktop) opens the shared artwork canvas, side selector and adjustment controls. On phones it fills the available iframe and measures the remaining canvas space after the controls. The duplicate inline canvas is hidden on mobile. Small-item resize hit areas leave their centres draggable.
- `qa/reference_studio_client.py` exercises both native T-shirt views and the both-side mobile artwork journey through the quote handoff, with no customer request submission. `qa/reference_studio_all_views.py` covers the presentation switch across all families, responsive layouts and saved-draft migration. Geometry QA checks both modes without replacing native browser visual review.

All-family presentation update, 9 November 2026:

- The shared `Bag view` control remains above the tabs on desktop and moves into the scrolling Bag & size pane on phones, alongside Light and real production references. Its buttons expose pressed state and support arrow/Home/End keys. Switching presentation preserves artwork selection, front/back contents and nominal product dimensions; mobile refits the geometry while retaining the viewing direction.
- The phone preview retains its height when Your design opens. Save moves into the stage toolbar, replacing the fixed summary footer. The parent iframe tracks the visual viewport, Safari toolbar and keyboard offset; focused input editing can temporarily hide the stage to preserve usable form space.
- `mobile-camera.js` fits the visible bag meshes for mobile presets and geometry/viewport changes, checking the Camera and Save control footprints. Desktop framing and homepage previews use the original camera path. The reserved 56px Front/Back strip is excluded from the render area. User orbit direction is retained across refitting; resize/presentation changes intentionally reset the zoom to fit.
- `bagView` is the canonical saved setting. Older T-shirt drafts migrate their `vestView` preference; older drafts of other families default to Opened even if they retained an inactive T-shirt preference. Invalid values fall back to Opened. No additional storage key or external service is introduced.
- Quote notes now identify the presentation for every bag family. Main-domain restrictions and the approved public website remain unchanged.
- The T-shirt upper side gussets have real rounded hand openings, retaining the narrow fabric rails, welded top bridge and intact lower gusset. These are mesh openings in both presentations; the original front/back print coordinates and U-cut/tab masks remain unchanged.
- The viewer explicitly uses the website's light theme: a white stage and panel, navy text and subtle green-tinted controls. The stage keeps its product/contact shadows. System dark mode no longer switches the embedded studio to a dark backdrop.
- `white-stage-patch.mjs` composites the white backdrop after material tone mapping, so saved images also have white corners. It preserves unpremultiplied white clear RGB for transmission, distinguishes opaque fabric coverage from its transmission lighting, and keeps the existing material tone mapping and floor-shadow contributions without another render pass.

Fabric appearance refinement, 9 November 2026:

- `appearance-patch.mjs` runs after the geometry patch. Light fabric retains subtle diffuse transmission, with much less glass-like refraction. Print and weld roughness stay matte; emboss noise is deterministic and fine fibre contrast is slightly stronger.
- A filtered PCF shadow with radius 3.5 and a lighter ground contribution replaces the sharp silhouette. The shadow map stays 2048px; no new texture assets or lighting dependencies are introduced.
- Handle attachment relief remains below half a millimetre; a subtle crosswise cup softens the free strap. Dimensions, print UVs and cut-outs remain unchanged. `node qa/reference_studio_geometry.mjs --appearance` checks the composed geometry against the existing construction constraints.
- These are photo-guided approximations, not measured scans or proof of a particular material specification.

Handle and vest drape refinement, 9 November 2026:

- Open T-shirt models add a shallow crosswise cup through each handle strip and unequal paired tension folds below the U-cut shoulders. A low-amplitude side-gusset crease fades before the hand-opening rails. Shared seams, welded crowns, cut-out masks and print UVs retain their construction coordinates; the folded T-shirt envelope is unchanged.
- Open loop handles have modest lateral drift, an offset crown and gradual ribbon rotation rather than identical arches. Buried ends still follow the actual panel surface. These refinements reuse the existing mesh resolution and material maps.
- `node qa/reference_studio_geometry.mjs --appearance` verifies the complete composed geometry. Browser evidence for this pass is under `deliverables/handoff/studio-handle-folds-20261109/` (local handoff output, not shipped customer content).
