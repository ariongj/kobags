# Owner-supplied studio integration

Source: https://github.com/ariongj/mo at b23cd8fb92cded92b01bef683a96d449da808dca.
The upstream index.html and README are preserved unchanged. The shipped UI, six bag types, 20 actual samples, fabric maps, GTAO lighting, fonts and geometry come from that source. The README's older sample count says 19; the current array contains 20.

`npm run build` bundles this source with its exact Three.js 0.169.0 and QR-generator 1.4.4 versions. Fonts, code and artwork are served from the same website origin. Font licenses and provenance are retained here; published notices are in `/documents/`.

Delivery changes are separate from the upstream file:

- `scripts/build-reference-studio.mjs`: bundles dependencies, emits hashed assets and the same-origin HTML document; catches startup failures with a reload message. It corrects `setAnimationLoop(render)` to `setAnimationLoop(() => render())` because Three's timestamp was being interpreted as the source's `force` argument. Geometry and lighting are unchanged.
- `site-bridge.js`: essential browser draft persistence, restoration of uploaded artwork and handle settings, origin-checked parent messages, and bounded front/back artwork plus 3D preview images for the existing quote flow. No analytics, upload service or external data connection is added.
- `/design`: site navigation and a quote button around the original studio.
- `/design/viewer`: the original full-screen document; `?preview=1` uses the same renderer without the control panel for the homepage.
- Host checks permit studio routes only on `kobags.itdks.tech` (and local development). The main domain continues to redirect studio paths to its product catalogue.

Quotes retain the selected studio dimensions and exact 3D previews. The source's six-type / XS–XL specification is mapped to the existing five-type catalogue as a custom specification request; Bottle uses the die-cut catalogue family, with Bottle named explicitly. Exact colour hex values and handle settings are preserved in the notes. Published stock rules and quotation minimums are not replaced by the reference configurator's sample specifications. Staff still review final production feasibility.

These are the supplied procedural models, not newly created calibrated scans. Physical scan accuracy is not claimed. Native studio controls retain the supplied English wording; the surrounding website and quote routes retain their existing English/Albanian localization.
