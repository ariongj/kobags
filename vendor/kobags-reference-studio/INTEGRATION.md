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
- `usability.js` / `.css`: persistent front/back design buttons, an artwork picker, duplicate/nudge/size controls, protected copy-to-other-side, accessible logo activation and keyboard tabs. Mobile keeps the 3D preview above a scrollable control panel; add actions are above the print canvas.
- `reference-gallery.js` / `.css`: on-demand approved production photographs with an accessible dialog, matched to the selected family. No unrelated Bottle photograph is substituted.
- Validation: `node qa/reference_studio_geometry.mjs`; `qa/reference_studio_usability.py --width 393` or `--live --width 320` with the configured browser runtime. These remain procedural previews, not calibrated scans.

Client-review refinement, 9 November 2026:

- T-shirt side gussets now open through the body and mouth, tapering only through the upper vest handles. The shell stays hollow, within its selected depth, with continuous side seams and the original cut-out/tab masks. Shallow vertical pull folds add fabric relief.
- The T-shirt preview offers Opened (default) and Folded / flat. The folded view uses the original flat-tube geometry. This presentation setting persists with the essential local draft and is identified in quote notes without changing dimensions or artwork.
- Loop handles have softer shoulders and subtly offset crowns while both ends remain attached to the actual body surface.
- Mobile design controls reuse the existing artwork selector and adjustment buttons in a compact dock. Add opens logo/text/QR actions; Edit goes to the selected item's settings. Front and back remember their selection independently. Controls move back to their original positions on desktop.
- Expand canvas provides a larger touch workspace with the same artwork, side selector and adjustment controls. The regular canvas fits the available phone panel, and small-item resize hit areas leave their centres draggable. A compact camera menu keeps the bag's handles clear of the view controls.
- `qa/reference_studio_client.py` exercises both native T-shirt views and the both-side mobile artwork journey through the quote handoff, with no customer request submission. Geometry QA separately validates 162 body and 240 handle configurations, exact original geometry in Folded mode and an open T-shirt cavity in Opened mode.
