# Kobags website — verification record

Updated 16 September 2026. This record supersedes the earlier incomplete v1 check. Tests ran against the compiled local Worker at `http://localhost:8787` with synthetic data. No live Kobags forms, customer records or production systems were used.

## Latest revision — layered studio and certificate library

The source-backed certificate presentation and layered artwork editor were reviewed on desktop and mobile. No live business submissions or issuer-verification requests were sent.

- `qa/studio_layers_certificates.py` passed against the compiled local Worker: simultaneous logo/text, independent coordinates/rotation, pointer layer selection, keyboard movement, optional-property undo/redo, individual removal, side copying, background cleanup and a 2000 × 1400 two-sided export.
- Custom dimensions and requested print colors survive refresh, quote review, saved RFQ and artwork proof. The server rejects out-of-range layer coordinates. Sales caption revisions retain the logo and layer placement.
- The layered design completed quote acceptance, artwork approval, a simulated order and reorder on mobile, preserving both faces.
- Certificate search, empty state, original-image downloads, inspect/zoom, Escape/focus return and both printed validity dates passed. Download bytes match the retained originals.
- Responsive checks passed at 1440, 1024, 768, 390 and 320px for the studio, and 1440, 768, 390 and 320px for certificates. Zoom scroll remains inside its viewer. No captured browser JavaScript errors.
- The existing polished-studio suite passed with the updated simultaneous-layer expectations; the full anonymous guest/order/reorder suite also passed.
- Site-wide checks passed: 32 pages, 43 internal destinations/downloads and 11 legacy redirects, including secondary inquiries and release gates.
- All nine background-cleanup/contrast/side-summary unit tests passed. TypeScript and the application build passed. Targeted lint on the new certificate components, artwork helpers and preview passed with three advisory `img` warnings; optimized WebP previews and unchanged original downloads are intentional. Full-repository lint was not rerun.

Evidence: `studio-layers-certificates.json`, `studio-v4-checks.json`, `guest-journey.json`, `site-checks.json`, `studio-layered-*.jpg`, `certificates-*.jpg` and `layered-design-sheet.png`. The source ZIP excludes large QA PNGs and includes the tests that regenerate them. A fresh dependency installation and issuer verification were not performed. The prior 3D checks remain applicable to the unchanged 3D implementation.

## Previous revision — public guest journey through demo ordering

The public demo now gives each anonymous browser a separate session and saved workspace. Visitors can use example contact details, submit their design, prepare a fictional quote/artwork pair, approve each and explicitly place a simulated order. The sales view remains available for revisions and production-stage demonstrations. No payment, outgoing message or real production order is created.

`qa/guest_journey.py` passed with no authenticated-user header on the compiled local Worker, including a full mobile reorder:

- Design, color and branding preserved through submission and artwork.
- Example contact details, specific missing-city validation and filename-based download feedback.
- Failed submission retains entered details; retry saves successfully.
- Quote/artwork preparation and final order confirmation are idempotent.
- Order creation remains blocked before the required approvals.
- Refresh and switching between customer/sales views preserve the guest session and order.
- A second guest and a separate account cannot read or edit the first guest's records.
- Anonymous writes require the initialized session cookie.
- Contact, sample and partner inquiries save in the visitor's workspace.
- Mobile reorder receives fresh quote/artwork approvals and completes another simulated order.
- Albanian mobile menu label and no horizontal overflow in the checked customer views.
- Zero captured browser JavaScript errors.

`guest-journey.json` records the completed anonymous request/order. `demo-order-desktop.jpg` and `demo-order-mobile.jpg` show the customer confirmation. Direct helper checks also verified HTTPS Secure/HttpOnly/SameSite cookie flags, continuity, replacement of malformed cookies and account identity precedence; this is not a claim of live cross-browser cookie testing.

The existing signed-in buyer/sales/artwork-correction/reorder journey passed again (`qa-results.json`). The full route suite passed: **32 pages, 43 internal destinations/downloads and 11 legacy redirects** (`site-checks.json`), including ownership/concurrency and production gates. TypeScript and the final application build passed. The isolated 3D suite remains the prior revision's evidence; no scene behavior changed in this revision. Full repository lint and the extracted-source build were not rerun.

The design/code handoff and source ZIP were refreshed and integrity-checked. Test records and session cookies are excluded. Guest continuity lasts up to seven days in the same browser; losing the cookie starts a new workspace and does not delete old rows. Customer/sales are demo personas sharing only that visitor's records. Production customer/staff authorization, storage retention and payments remain separate implementation work.

## Previous revision — full website redesign and 3D showroom


Edition 05 reworks the manufacturing-led homepage, catalog, detailed designer, supporting editorial pages, forms, customer/sales workspaces and shared navigation/footer. Original manufacturing imagery, product specifications and connected workflows remain in place.

`qa/showcase_checks.py` passed on the compiled local Worker:

- The Three.js module loads near the showroom, rather than at initial homepage load.
- Real WebGL bag geometry renders; front/back/reset, keyboard rotation and pointer dragging work.
- The construction control separates and reassembles the bag components.
- Live name/color selections carry into the detailed designer with matching ink and product settings.
- Rendering pauses while the showroom is offscreen. Reduced-motion preference starts the bag still.
- A browser with WebGL disabled receives a working 2D preview, color/name controls and designer handoff.
- All 56 combinations of 14 representative routes and 1440, 1024, 390 and 320px viewport widths have no horizontal overflow.
- Zero captured JavaScript errors in the main browser session. Desktop and mobile captures were visually reviewed.

The complete buyer → quotation → artwork correction → approval → production handoff → repeat-request journey was rerun and passed (`qa-results.json`, fictional request `KBG-C78D39F8`). The full website suite was also rerun: all 32 mapped pages, 41 internal destinations/downloads and 11 legacy redirects passed (`site-checks.json`), alongside inquiry persistence, catalog variants, ownership isolation and production approval gates. The final application build and TypeScript check passed. Focused lint on the new 3D modules has zero errors and one deliberate raster-image warning; repository-wide lint still has the six pre-existing React effect/purity errors described below.

`v5-showcase-checks.json` records the focused results. `v5-home.jpg`, `v5-showcase.jpg`, `v5-construction.jpg`, `v5-products.jpg`, `v5-manufacturing.jpg`, `v5-design.jpg`, `v5-demo-admin.jpg`, `v5-mobile-home.jpg` and `v5-mobile-showcase.jpg` capture the new direction. Automated WebGL checks use Chromium software rendering in a local container; they do not measure real-device GPU performance. The lazy scene chunk is approximately 574 KB uncompressed / 141 KB gzip. It remains separate from the initial homepage load.

A rotated factory-video frame initially extended beyond the desktop viewport. Restoring the shared section gutters corrected the source of the overflow; the complete 56-layout check passed afterward.

The reusable source ZIP was refreshed and integrity-checked for this revision. It includes current code, assets, documentation, JPEG review captures and result manifests. Regenerable lossless PNG captures and concept exports are excluded to keep the download compact. The earlier extracted-source build below was not repeated for edition 05; the final working checkout was built and tested.

## Previous studio revision — polished bag designer

The studio now uses five individually generated transparent mockups, larger matching shape tiles, two responsive workspace cards and precise artwork controls. `qa/studio_checks.py` passed on the compiled local Worker:

- All five distinct models and selector previews render successfully.
- Text typeface/alignment, front/back color and upload filenames remain independent.
- Incomplete numeric entry, negative rotation, centering and pointer grab-offset behavior work.
- A simple 1400px uploaded logo retains a 1024px normalized preview within the saved-data budget.
- Fullscreen opens and returns keyboard focus to its trigger.
- PNG downloads are 1600 × 1820 and are byte-identical with editing guides on or off.
- Rapid draft/color changes settle on the latest preview; quote navigation preserves the design.
- Server snapshots retain new optional artwork fields; invalid typefaces are rejected.
- No horizontal page overflow at 1440, 1024, 800, 390 or 320px.
- Zero captured JavaScript errors. Desktop controls, bag rendering and clean export were visually reviewed.

The full buyer → quotation → artwork correction → approval → production handoff → repeat-request browser journey was rerun and passed for this studio revision (`qa-results.json`). TypeScript and the application build passed. Lint on changed studio/domain modules reports zero errors and three warnings (a deliberate inline raster preview plus two existing unused imports). Repository-wide lint remains non-clean due to six existing React effect/purity errors in other modules and general warnings; it is not represented as passing.

`studio-v4-checks.json`, `studio-v4-bag.png`, `studio-v4-editor.png`, `studio-v4-mobile.png` and `studio-v4-download.png` record the focused checks. The original all-page/redirect and extracted-source checks below remain the earlier baseline; they were not all repeated for this visual revision. The source bundle was refreshed and integrity-checked with the new assets, code, documentation, UI screenshots and result manifests. The two large generated concept-download PNGs remain in the working checkout and are regenerated by QA; they are omitted from the compact source ZIP.

## Previous homepage revision — manufacturing and buyer experience

The homepage now opens with original factory imagery and the manufacturing story, then shows the production process/video before the collection and designer. A focused check on the compiled local Worker passed:

- Factory image loads; production content precedes the collection and studio.
- English/Albanian headings work.
- The video does not fetch before user action, then plays successfully when selected.
- Both hero destinations work, including the designer action on mobile.
- No page overflow at 1440, 1024, 390 or 320px widths; desktop/mobile screenshots reviewed.
- Zero captured browser JavaScript errors. TypeScript and the compiled build passed.

`homepage-checks.json` records this focused revision. `desktop-home.png` and `mobile-home.png` show the revised manufacturing-led homepage. The wider workflow and source-extraction checks below were completed for the preceding full-site baseline; their application flows are unchanged by this homepage revision.

## Full-site baseline result

- **Passed:** complete buyer → quotation → artwork correction → approval → production handoff → repeat-request journey.
- **Passed:** all 32 mapped pages, 41 internal destinations/downloads and 11 legacy redirects.
- **Passed:** TypeScript checks and complete application builds.
- **Passed:** extracted handoff source type-check and build, with the original Site identity removed. Existing locked dependencies were reused for this validation; a separate fresh network install was not tested.
- **Passed:** source archive integrity and required-file checks; runtime state, credentials, installed dependencies and Git history excluded.

## Buyer and sales workflow

`qa/browser_journey.py` verified:

- Homepage-to-designer navigation; D-Cut Large and color selection.
- Keyboard logo movement; rejection of SVG; normalized raster logo upload and PNG preview download.
- Design/size preservation into the quotation form.
- Below-minimum quantity rejection and translated Albanian feedback.
- Quote draft persistence after refresh.
- Failed submission keeps the entered details; retry saves once.
- Server-side minimum validation and idempotent repeat submission.
- Sales owner assignment, notes and issuing a fictional quotation.
- First artwork proof retains the buyer's uploaded logo.
- Customer quote acceptance, artwork correction request, stale-proof rejection and latest-revision approval.
- Production release uses the approved quotation/artwork versions and rejects post-release artwork changes.
- Published catalog description changes leave existing RFQ snapshots intact.
- Repeat request gets a fresh ID/key and no inherited quotation or artwork approvals.
- Mobile designer/catalog navigation and no horizontal page overflow.

## Full website and additional gates

`qa/site_checks.py` verified:

- EN/SQ homepage text switching.
- Sample, partner and contact form consent, successful save and inquiry review status.
- Catalog filtering, three-product comparison and disabled fourth selection.
- All 15 published variants are present. Handle Medium travels from the detail page into the designer and a server-saved RFQ with correct dimensions.
- Latest quotation, latest artwork and fictional payment condition independently gate release.
- Production statuses must advance in sequence.
- Concurrent assignment and note updates both persist.
- Separate synthetic owner identities receive separate records; a different owner cannot edit the first owner's request.
- Content drafts/publishing and the certificate/claim review gate.
- All mapped pages return successfully and each has one H1. Internal links and downloads resolve.
- Original catalog, product, contact, partner, policy and blog-index redirects work.
- Unknown content, product and article routes return 404.
- Mobile homepage, journal, sales workspace and handoff have no horizontal page overflow.
- Both suites completed with **zero captured browser JavaScript errors**.

## Issues found and repaired

1. The hidden file input's width caused mobile overflow. Its screen-reader-only clipping and dimensions were corrected; mobile checks now pass.
2. The installed Vinext production Link chunk tried to call an absent dynamic navigation export. Links now use native document navigation. Product/reorder actions save drafts synchronously before changing the page. The complete compiled journey passed after this fix.
3. Development mock authentication deliberately removes custom identity headers, causing local tests to share one workspace. QA now targets the compiled local Worker, verifies a fresh synthetic workspace before writing, and rejects non-loopback URLs. Authentication code was not weakened to make tests pass.
4. The first catalog seed omitted some original size variants. The catalog now contains all 15 source-backed variants, with existing-owner reads upgraded without rewriting historic request snapshots.

## Evidence

- `qa-results.json` — completed connected journey; fictional request reference.
- `site-checks.json` — exact route list, link/redirect counts and additional checks.
- `desktop-home.png`, `desktop-studio.png`, `desktop-handoff.png`.
- `customer-artwork.png`, `downloaded-design.png`.
- `mobile-home.png`, `mobile-studio.png`, `mobile-catalog.png`, `mobile-handoff.png`, `mobile-journal.png`, `mobile-sales.png`.

Desktop screenshots use 1440px-wide views; mobile screenshots use 390 × 844 viewports. The homepage and handoff received visual inspection in addition to the assertions. Screenshots use fictional demonstration data or original public brand assets.

## Practical limits

These checks establish the demonstrated local workflows, not universal correctness or production readiness. They do not constitute a full accessibility, cross-browser, load, penetration or legal audit. Safari/Firefox, screen-reader use, 200% text enlargement, hosted sign-in enforcement, external messaging, payment processing, private original-file storage, backup restoration and live ERP/CRM integration were not tested. Local owner-isolation checks use synthetic trusted-header values; production identity must come from verified hosting authentication.

WebMCP is feature-detected but no supporting browser was available for protocol-level verification. The detailed designer remains a 2D illustration with approximate colors/shape, not an approved print template. The new 3D showroom is one representative Handle tote concept; it is not production CAD or a verified model of every size/family. Original certificate validity and production/product claims still require client approval. EN/SQ covers the homepage and core buying flow; secondary editorial and most administration remain English.
