# Kobags website — verification record

## Video-seeking fix found during the live approval audit — 20 October 2026

The extended live browser audit found that the factory videos played but could not seek: the full movie was buffered, yet `seekable` reported `[0,0]` and setting the time returned to the start. Reproduced independently of browser request interception and on the compiled local Worker. The underlying static asset service ignored Range and did not expose Content-Length internally; the external full response acquired length only later.

Added build-derived MP4 sizes and a streaming range adapter limited to static video paths. Single-range, open-ended and suffix requests return exact 206 bytes; invalid/multipart requests return 416 without reading the movie; stale/weak If-Range returns the full representation. Native responses and encoded/unknown representations are preserved. Client cancellation stops upstream reads; truncated sources fail explicitly. Refreshed public static video URLs invalidate previously cached responses.

Validation: six focused response test groups and five existing range-parser groups passed; TypeScript/build/whitespace checks passed. The final local Worker returns `206 bytes 0-1/13165322` for the printing video's two-byte probe. All three factory videos played and sought successfully in Chromium phone emulation. Live verification after deployment is saved in the private client-review audit folder. No production inquiry or email was sent during these checks.


## Client approval audit and decorative numbering removal — 20 October 2026

- Public read-only audit before the change: 56 routes, 46 unique sitemap URLs and 51 image/poster URLs resolve. Studio bookmarks redirect to the catalogue; intake reports enabled; anonymous CMS inquiry access returns 401; private source/handoff downloads return 404. The initial audit incorrectly expected a canonical on the noindex CMS login page; corrected the audit expectation, without changing the intentionally private login SEO behavior.
- Removed decorative leading-zero labels from all public marketing/product sections, and compacted headings where the removed numbers had left top spacing. Functional quotation steps, stock counts and ISO identifiers are preserved. The locally retained builder remains disabled on production.
- Responsive audit: 42 EN/SQ home, manufacturing, responsibility, certification, partner, journal and Kosovo-guide layouts at 320px, 393px and 1440px passed with no overflow, decorative numerals or browser errors. Six catalogue layouts passed after removing its image counters. Screenshots were visually inspected.
- Existing studio-isolation/quote suite passed all six groups: redirects, sitemap, 22 phone pages, desktop/narrow layouts, two language quote submissions, MOQ validation, lost-response retry and durable local inbox receipt reload. Additional local checks saved/reloaded eight synthetic contact/sample/partner/stock inquiries across EN/SQ. No production customer submissions, accounts or emails were created.
- TypeScript, production build and whitespace checks passed. Browser coverage uses Chromium emulation rather than physical phone hardware. Local audit reports and captures are in the private `deliverables/handoff/client-review-audit-20261020/` folder. The public HTTP audit is repeated after publication and stored there.


## Public studio paused; local testing retained — 20 October 2026

Client launch decision: keep the builder local while the physical bags are scanned. The shared development-only gate removes the public showroom, navigation, product customization and browser design tools. Direct EN/SQ studio and scan URLs temporarily redirect to the catalogue with noindex/no-store; neither URL parameters, cookies nor forwarded host headers enable the production builder. The sitemap excludes it. Product, manufacturing, stock and inquiry functionality stays available.

Public quotation requests show product photos and specifications, explain how printing is agreed with staff, and omit hidden/sample editor artwork from submissions. Browser drafts and historical CMS inquiries remain intact. Buyer guidance, errors, EN/SQ metadata, policies and downloadable checklists were aligned with this phase. Shared select fields no longer import the entire builder.

Validation on the final compiled Worker:

- `qa/studio_local_only_checks.py`: six groups passed. Direct links and scan URLs redirect; sitemap excludes the studio; 22 EN/SQ phone pages contain no studio links/promotions or document overflow; 320px and desktop home/product/quote layouts fit. Both language product-to-quote journeys retain the selected product, enforce MOQ, save durable synthetic inquiries in the isolated local D1 inbox, recover the same request after a lost response, and reload their receipts. No sample artwork is submitted. No captured browser errors.
- `qa/studio_development_checks.py`: four groups passed on `npm run dev`. EN/SQ builder and navigation remain available, five bags render in 3D with Natural default, mobile QR creation/selection/resizing works, and the coffee scan viewer reaches ready state. No captured browser errors.
- TypeScript, the official production build and `git diff --check` passed. Phone screenshots were inspected. Reports/captures: `evidence/studio-local-only-20261020/`.
- Browser tests used Chromium touch emulation and software WebGL, not physical phone hardware. An outdated studio reference in resources was caught and corrected before the final pass. The copied QA settings initially had intake disabled; it was enabled only in `/tmp/kobags-studio-hidden-state` for the live-inbox-path test. Production data/settings were not changed or used for test submissions. Existing public audience, domain, CMS access and intake authorization remain unchanged.


## Phone experience release — 20 October 2026

- Replaced the fixed-height mobile studio and nested settings scrollbar with natural page scrolling. The preview is 272–330px high, with full-width framing; all five real-photo silhouettes measure approximately 231px tall at 393×750. Opening the artwork step brings the preview, selection/resize and three add actions into view. Focus mode provides more editing room. Undo/redo, photo/3D switching, front/back and fullscreen remain beside the bag.
- Short viewports and focused text inputs release the pinned preview. At 320px and 200% EN/SQ text, preview controls wrap without overlap, add actions remain reachable and QR dialogs remain editable. When a fourth element disables Add, closing the QR dialog returns focus to the visible mobile selector.
- Homepage: shorter introductory copy, paired phone actions and the factory film directly after the production heading, before the explanatory steps. The approved headline/green accent, manufacturer emphasis, original media and desktop two-column production layout remain.
- `qa/phone_layout_checks.py`: six acceptance groups, 12 EN/SQ homepage layouts from 320–1440px, all five photo families, immediate add-button reachability, Focus/fullscreen focus restoration, short-view QR entry and fourth-element focus return passed with no browser errors.
- `qa/phone_experience_checks.py`: six touch groups passed on the final build: independent logo/QR selection, movement and sizing in 3D, automatic background cleanup, pause-and-undo slider behavior, seven layout sizes, QR-only photo/fallback dragging, two-sided export, Albanian and short-view QR entry. No captured browser errors or automated accessibility violations. The undo assertion waits for asynchronous draft persistence instead of reading storage in the same event turn. ZXing independently decoded the exported QR.
- `qa/phone_accessibility_checks.py`: EN/SQ QR dialogs, keyboard focus, 200% text and non-overlapping preview actions at 320px passed. `qa/phone_home_text_checks.py`: both homepages retained readable, non-overflowing actions at 320px/200% text. `qa/final_studio_regressions.py`: all ten existing artwork, undo, storage, fullscreen, quote carry-through and fallback groups passed before the final button-wrapping refinement.
- TypeScript, the production build and whitespace checks passed. Design/developer handoffs updated. Earlier checks were rerun after restarting the local server to serve matching build assets. All browser evidence uses Chromium touch emulation/software WebGL on an isolated local Worker, not physical iPhone/Safari or Android hardware. No production customer request, message, payment or order was created. Domain, public audience, CMS access and inquiry settings are unchanged.


## Mobile logo and QR review — 19 October 2026

- Added a fixed mobile element selector and ±2-point size controls above the scrolling artwork settings. All three quick controls are at least 44px. The smaller artwork-mode preview keeps the quote action within the 390×844 workspace. Detailed sizing, placement and QR settings remain available below; the expanded editor retains the same draft.
- Reproduced and fixed a QR-only photo/fallback drag being blocked by empty legacy artwork (`mobile-artwork-20261019/before.json`). A direct 3D touch check also reproduced the selected logo intercepting the nearby QR through its transparent padding. Photo and 3D now share nearest-centre picking, with the selected layer winning at coincident centres. Selected overlapping artwork remains independently editable.
- Slider resizing now brackets one history gesture. A 950ms pause during a touch resize still undoes in one step. Quick-size taps create individual undo entries and cannot exceed 10–55%.
- `tests/artwork-elements.test.ts`: seven groups passed, including adjacent/coincident/rotated hit testing and existing element, cleanup, QR and submission validation. TypeScript, production build and whitespace checks passed.
- `qa/mobile_artwork_checks.py`: six groups passed with no captured browser errors. Covers Natural default, automatic logo cleanup, direct logo/QR taps, independent touch movement and resizing, camera stability, first resize tap after dragging, fixed controls while settings scroll, limits/undo, QR-only photo and no-WebGL editing, export, Albanian controls and QR entry at a simulated 390×420 short viewport. Layout checks passed at 320×568, 360×740, 390×844, 430×932, 768×1024, 844×390 and 1440×900. No document-width overflow. The Albanian editor had zero automated accessibility violations. ZXing independently decoded the resized QR from the exported 2000×1400 sheet.
- `qa/final_studio_regressions.py`: ten groups passed, including selected overlapping logo movement, fullscreen/photo touch, upload-to-quote handoff, storage and undo. `qa/artwork_accessibility_checks.py`: EN/SQ QR dialogs, focus return and reachable add controls passed at 320px and 200% text. `qa/text_resize_checks.py`: sixteen routes passed at 320px/200% text, with no document-width overflow and usable editor panel height.
- Design/developer handoffs updated. Tests use Chromium touch emulation and software WebGL on a local isolated Worker. They do not certify physical iOS/Android performance, native virtual keyboards or print-production QR readability. No production customer requests, messages or orders were created.

## Multi-element artwork release — 17 October 2026

- Added local automatic cleanup of uniform edge-connected logo backgrounds, with restore of the normalized original during the current editor session. Transparent borders and enclosed light details are preserved. No external image-processing service receives the upload.
- Buyers can combine up to four independent logo, text or QR elements on each side. Selection, touch dragging, quick horizontal/vertical placement, sizing, rotation, copy and undo share the existing photo/3D artwork coordinates. Additional elements survive reload, exports, quotation review and the shared CMS inquiry snapshot; the CMS displays the composed front/back previews.
- `tests/artwork-elements.test.ts`: six groups passed, covering independent elements/copy/removal, contrast defaults, backend limits, image cleanup and safe QR URLs. TypeScript, production build and whitespace checks passed. Production dependency audit found zero known vulnerabilities. The pinned QR encoder's MIT notice is preserved in the software notices and inventory.
- `qa/artwork_elements_checks.py`: four complete buyer/editor groups passed, including original restore, upload/remove undo, adding a second logo without replacing the first, independent touch movement, four-per-side limits, QR updates/undo, copying faces, reload and local live-request acceptance. ZXing independently decoded the original QR and both QR codes in the 2000px two-sided export. A read-only SQLite comparison confirmed the final saved inquiry retained every additional element and placement. No captured browser errors or automated violations in the Albanian artwork editor; no document overflow at 320/390/768/1440px.
- `qa/studio_3d_checks.py`: eight acceptance groups passed across all five bag shapes, front/back textures, camera controls, fullscreen, exports, quote carry-through, responsive widths, reduced motion and the no-WebGL fallback. No captured browser errors.
- `qa/final_studio_regressions.py`: ten artwork/undo/storage/quote/fallback groups passed, with no browser errors. `qa/text_resize_checks.py`: sixteen routes passed at 320px with 200% text. `qa/artwork_accessibility_checks.py`: EN/SQ QR dialogs had zero automated violations and returned keyboard focus correctly; enlarged-text add buttons remained reachable and opened the working URL dialog without horizontal overflow.
- Browser tests use isolated local Worker data and Chromium/software WebGL. A preliminary batch was interrupted; a screenshot-stability timeout occurred in that preliminary renderer. Results below are from the completed individual final-build runs. Physical iOS/Android performance and printed QR scanning require real-device/sample testing. Automatic cleanup targets plain backgrounds, not arbitrary photographic segmentation; restoration memory is not persisted across reload.

## Mobile workspace release — 14 October 2026

- Reworked <=800px studio into one workspace with an independently scrolling editor, persistent quote row, visible Front/Back and optional 44px camera controls. The editor can expand; product samples/specifications/exports live in a native disclosure below. Existing 3D/photo editing, dual-sided artwork and quote storage remain shared.
- Natural is first in the color palette and the default for fresh designs, homepage previews and renderer fallbacks. All five fresh shapes retained Natural; an explicit Forest green choice survived reload, then was switched back to Natural by the test.
- At 390×844, the quote button ends at 808.5px (previously 1367.3px). The homepage document decreased from 7541 to 6514px; the catalog from 3502 to 2350px. Full product descriptions remain available. These are measurements from the local Chromium layout, not field performance metrics.
- `qa/mobile_site_checks.py`: 54 route/width checks passed, including menu, input sizes, direct touch rotation and a first editor-tab tap after rotation. That last action reproduced a dropped compatibility mouse event; studio tabs now handle completed touch pointer events directly.
- `qa/mobile_workspace_checks.py`: six buyer/editing groups passed across 320×568, 360×740, 390×844, 430×932, 768×1024, 844×390 and 1440×900. Covers live touch text/logo movement, upload, undo/redo, copying both sides, camera tools, expanded editor, fullscreen/focus, original sample dialog, 2000px exports, quote handoff and Albanian. No browser errors in the successful run. An earlier software-WebGL run timed out waiting for an uploaded logo projection; the fresh-context repeat passed without changing the renderer or discarding the draft.
- `qa/text_resize_checks.py`: 16 routes including EN/SQ studio at 320px and 200% text had no document-width overflow; editor panels retained at least 120px of usable height. Horizontal family rows intentionally scroll inside their containers. A visual review also identified and fixed the previously fixed-offset skip link revealing long Albanian text over the header.
- `qa/accessibility_checks.py`: zero automated violations in 13 page/dialog/editor states. `qa/studio_3d_checks.py` passed all five models, pointer/keyboard/camera controls, dual-sided texture changes, fullscreen, export, responsive layouts, reduced motion and the no-WebGL fallback. `qa/final_studio_regressions.py` passed ten artwork/undo/storage/quote/fallback groups.
- Production build, TypeScript and whitespace checks passed; lint reports 0 errors and the existing 44 warnings. Design/developer handoffs describe the final layout. Existing custom domain, public audience, CMS access and live inquiry settings are preserved.
- Tests use a local isolated Worker and Chromium with software WebGL. They do not certify physical iOS/Safari, Android hardware performance, assistive-technology behavior or every virtual keyboard. No live customer inquiry, email, payment or production order was created.


## Launch audit — 14 October 2026 (Europe/Tirane)

This entry supersedes earlier notes saying intake is deferred, source ZIPs are public or the coffee test appears in the regular bag picker. The owner now explicitly approved shared CMS requests, then chose to keep `kobags.itdks.tech` for now. The prepared `kobags-group.com` switch is deferred. Email notifications and future business-domain DNS/TLS remain separate operational steps.

- See `docs/LAUNCH-READINESS-2026-10-14.md` for scope, fixes, measured results and unresolved launch requirements. `docs/LAUNCH-LICENSES-SEO-2026-10-14.md` records dependencies/notices/provenance; `docs/DOMAIN-CUTOVER-2026-10-14.md` contains exact DNS records and rollback.
- Source/unit checks: 25 core direct assertions/groups plus five media range/validator groups; five SQLite one-time-activation groups; four backup recovery groups; nine stock/specification migration fixtures. TypeScript and production build passed. Lint: zero errors, 44 advisory warnings.
- CMS: eight password-access and 12 business-workflow groups passed; five client-stock feedback groups passed. Backup recovery was tested in a clean local SQLite database with real uploaded-object checksums, not in a hosted disaster-recovery incident.
- Buyers: EN/SQ mobile live-request journeys passed using synthetic local records, including two-sided artwork, quantity validation, lost-response retries, snapshot integrity and receipt reload. Six contact/sample/partner retries and five stock-recovery groups passed. Eight fallback email/receipt groups passed, with no automated receipt accessibility violations.
- Layout/accessibility: 54 mobile route/width combinations; 14 pages at 320px with 200% text; zero automated violations in 13 core and four additional states. Manual image contrast items and assistive technology testing remain separate.
- 3D: all five bag families, selected artwork dragging/undo, camera controls, fullscreen, render pausing and lost-WebGL-context recovery passed. Box, String and T-Shirt captures were reviewed at 390 and 1440px. Coffee scan stays available via its explicit test URL; bag meshes remain illustrative pending physical scans.
- Delivery: 48 sitemap pages, 64 internal destinations, 52 anchors; media MIME/cache/conditional/range handling and mobile video playback/seeking passed. Internal handoff/source links and their asset aliases return 404. Owner source/media ZIPs now live under ignored `deliverables/handoff/`.
- SEO: 48 English/Albanian URLs passed in both review-domain and business-domain runtime configurations. Canonical redirect regression covers 54 alias/method/path cases plus three exclusions, including hostile separator paths and private-link cache/referrer controls. This is not Search Console ownership, submission or ranking evidence.
- Production-only npm audit: zero known findings. Build/development audit: eight affected package records from one unpatched upstream braces advisory, with no public runtime path established. 863 lock records / 689 installed records inventoried; 365 publisher notices preserved. Three development-only notice reviews remain documented.
- Direct compiled Worker security checks: five oversized streaming rejections (413) and five immediate recovery responses (200), plus missing/foreign Origin rejection (403), passed. The source helper independently passed five pairs. Local Wrangler proxy early-upload errors are separately documented in the launch report; no unbounded draining workaround was introduced.
- Final proxy regressions passed their four explicit groups while recording three known local forwarding 503s, each followed by successful recovery and unchanged CMS data. Seven public/private media range/cache/HEAD/validator/revoked-link groups passed. Five additional uploaded-MP4 browser groups passed, including mobile playback and seeking; the original missing-range behavior was reproduced before the fix. See `launch-security-http-checks.json` and `media-cache-checks.json` for the precise assertions and limitation.
- Post-deployment read-only checks passed on `https://kobags.itdks.tech`: real intake enabled, protected application cookie alongside the hosting cookie, HTTPS/HSTS and security headers, 48 sitemap URLs, inaccessible internal bundles (404), anonymous CMS rejection (401), and available/noindex software notices. No production inquiry was submitted. Detailed result stays private under `deliverables/handoff/live-verification.json`.
- The managed Codex Security scan service was unavailable; findings came from manual source review and local tests. Browser work used Chromium with software WebGL and a disposable local state copy. No outgoing email, payment or real production order was created by QA. Post-deployment status is recorded privately in `deliverables/handoff/release-receipt.json`.

## Original scan texture on smooth geometry — 13 October 2026

- Replaced the pale vertex-color treatment with photographic UV charts projected from the original `Test.zip` diffuse atlas. Cup: 2048×1024, handle: 512×512, saucer: 1024×512. No generated replacement imagery, original dented normals or displacement is applied.
- Exterior, interior, rim, handle and saucer projections are separated. The outer envelope limits interior-color bleed, the handle is aligned to its scanned orientation, and pole/seam UVs are split without changing the surface. Unobserved undersides retain inferred ceramic. Some source lighting/capture imperfections remain in the photograph.
- `qa/coffee_texture_checks.py`: exact per-triangle positions and normals match the accepted version 46 on all three components. Each chart has nonempty high-contrast image content. `coffee-texture-checks.json` contains comparison hashes; `coffee-repair.json` records original ZIP provenance, projection sizes and output hash. Geometry remains 109,056 triangles; GLB is 3,574,208 bytes.
- Production build, TypeScript and whitespace checks passed. Six imported-scan browser acceptance groups passed, covering seven viewpoints, visible renders, pointer/keyboard/touch rotation, zoom/reset/spin, fullscreen, reduced motion, EN/SQ, 320/390/768px layouts, saved-design isolation, normal bag quotation return, asset retry and unavailable WebGL. No captured main-journey browser errors.
- Reviewed lettering on the back, front/side material detail, rim/bowl/saucer from above, underside and mobile screenshot. Browser checks use local Chromium/software WebGL. Existing bag meshes, CMS and inquiry activation are unchanged.

## Smooth ceramic reconstruction — 13 October 2026 (version 46)

- Replaced the remaining dented scan geometry with a spline-lathed cup and saucer, rounded lip, continuous interior/base and swept handle. Handle roots stay in the outer wall. The former damaged shell and patch lining are removed.
- Source colors are lightly sampled to avoid reintroducing baked scan dents. This is a visual reconstruction from the scan's proportions/tone, not an exact preserved scan. GLB: 3,275,492 bytes / 109,056 triangles, approximately 34% smaller than version 45.
- Added studio environment reflections, ceramic clearcoat, self-shadowing and soft contact shadow. Generated lighting/shadow resources are disposed on unmount. Existing bag geometry, artwork and order flows remain unchanged.
- Mesh checks: cup, handle and saucer each watertight, consistent winding, positive volume, finite coordinates and no degenerate triangles. Source and output hashes are in `coffee-repair.json`.
- TypeScript, production build and whitespace checks passed. Six browser acceptance groups passed, covering seven angles, rendering, pointer/touch/keyboard rotation, zoom/reset/spin, fullscreen, reduced motion, EN/SQ, 320/390/768px, saved-design preservation, bag quotation return, failed-asset retry and unavailable WebGL. No captured main-journey browser errors. Final mobile surface label shortened and prevented from wrapping mid-word.
- Reviewed seven angle captures and the mobile full-page capture. Browser validation uses local Chromium/software WebGL; physical device testing is not claimed. Model hash is recorded in `imported-scan-checks.json`.

## Previous coffee scan repair — 13 October 2026 (version 45)

- Removed captured table fragments, smoothed the cup/handle geometry, closed the cut cup base, added an inner lining behind side-wall defects, and reconstructed the saucer rim and underside. Missing surfaces are inferred; photographed cup texture and some capture imperfections remain.
- Reproducible offline pipeline: `scripts/repair-test-scan.py`. `coffee-repair.json` records source/output hashes, closed cup and saucer, positive volumes, consistent winding, finite coordinates and no degenerate triangles.
- Added compact front/back/top/underneath/three-quarter presets with English and Albanian labels; dynamic triangle count and a versioned model URL to avoid stale browser assets.
- TypeScript, production build and whitespace checks passed. `qa/imported_scan_checks.py`: six acceptance groups, including visible renders, preset polar angles, pointer/keyboard/touch rotation, mobile widths 320/390/768, fullscreen, reduced motion, load failure/retry, saved bag preservation and return to quotation. Final photograph-blended lining was additionally inspected from seven angles and at 390/320px; asset SHA is recorded in `imported-scan-checks.json`.
- Validation uses local Chromium software WebGL. This repairs the coffee test only; physical bag scans and deferred customer inquiry activation remain outstanding.

## Original coffee scan import — 13 October 2026 (superseded by later revisions)

- Added a separate **3D test** picker entry and shareable `/design?model=coffee-test` URL, including Albanian. The uploaded coffee scan is not a catalogue product and cannot enter the bag quotation schema. Existing bag drafts/artwork are preserved.
- Converted the supplied OBJ plus diffuse/normal atlases to a self-contained 4.6 MB GLB: all 122,842 triangles retained, texture atlases reduced from 8192 to 2048px. Corrected display orientation only; captured table geometry and scan imperfections remain. Provenance and conversion details are in the developer handoff.
- TypeScript, production build and whitespace checks passed. `qa/imported_scan_checks.py`: **5 acceptance groups passed**, covering a genuinely textured first render, pointer/keyboard rotation, zoom/reset/spin, fullscreen, link/reload state, saved-design isolation, normal T-Shirt return and quote availability, EN/SQ, 320/390/768px layouts, touch rotation, reduced motion, failed-asset retry and WebGL-unavailable messaging. No captured browser errors on the successful main journey.
- An initial visual check exposed a blank first frame before shader compilation; the viewer now waits for compilation. The first acceptance run exposed narrow picker labels wrapping; compact nonwrapping labels fixed it and the rerun passed. Renderer work is paused offscreen/when the document is hidden.
- A separate final pixel/screenshot check confirmed the actual textured model at 768, 390 and 320px after bringing the canvas into view. This matters because offscreen resize clears the canvas while rendering is intentionally paused. Reviewed final desktop/mobile captures.
- Tests use local Chromium with software WebGL. No new bag scans, scan repairs, production requests or email delivery were created. Screenshots: `coffee-scan-desktop.jpg` and `coffee-scan-mobile.jpg`.

## Functional audit — 13 October 2026

- Reproduced and fixed stock prepared-confirmation loss on refresh, field-length mismatch with server validation, poor recovery from an edited retry after a lost response, and missing guidance for removed stock choices. Receipts use saved snapshots and remain browser-owned; fresh forms from unavailable receipt links retain their own draft. Details: `docs/AUDIT-2026-10-13.md`.
- `qa/stock_recovery_checks.py`: **5 final-build checks passed**, including EN/SQ unchanged and edited retries after an intentionally lost response, receipt refresh, immutable email details, browser ownership, fresh-draft persistence from an unavailable receipt, and removed stock choices. No browser errors. Final TypeScript, production build and whitespace checks passed.
- `qa/mobile_site_checks.py`: **55 route/width checks passed**, including menu targets, 16px input text, touch rotation and short landscape. No captured browser errors or horizontal overflow.
- `qa/seo_checks.py`: **48 EN/SQ sitemap URLs passed**, including crawler HTML, metadata, canonical/hreflang, structured data, private-route exclusions, all 38 Kosovo municipalities and mobile language handoff. These checks do not establish rankings or indexing.
- `qa/client_feedback_20261011.py`: **5 acceptance groups passed**, covering CMS stock/category/media editing, live-request draft and receipt behavior, unavailable/archived stock rejection and quotations/private review, including **18 route/language/width checks**. Temporary local CMS fixtures were restored.
- `qa/stock_accessibility_checks.py`: **4 scans**, no automated A/AA/best-practice violations on the two stock-language flows, responsibility and catalogue. This does not establish complete accessibility conformance.
- `qa/studio_3d_checks.py`: **8 acceptance groups passed** across five families, including pointer/keyboard rotation, zoom/reset, front/back artwork, precision placement, fullscreen, two-sided export, quote handoff, 320–1440px layouts, reduced motion and unavailable-WebGL fallback. No browser errors. The inspected String capture and mobile homepage remain consistent with the current visual design. Local software-rendered tests do not establish physical-device performance or scan accuracy.
- `qa/confirmed_stock_checks.py`: **6 migration cases passed**; `qa/stock_migration_checks.py`: **3 cases passed**. Studio unit checks also passed.
- Live production intake was read-only checked and remains **disabled**, as requested. A reminder was scheduled for 14 October at 10:00 Europe/Tirane; email delivery remains a separate setup task. No production inquiries or outgoing emails were created. Actual collection photography and physical 3D scans remain outstanding.
- Optional external CodeRabbit review did not run: automatic approval review rejected uploading the source diff to that service. No code was sent and no external code-review result is claimed.

## Confirmed finished stock — 12 October 2026

- `qa/confirmed_stock_checks.py`: six in-memory migration cases passed (default, manually edited, independent draft/published edits, unpublished, archived), with history preservation and repeat no-op checks. The three prior specification migration cases also passed.
- `evidence/confirmed-stock-browser-checks.json`: four local EN/SQ Smiley/Thank you pages each expose exactly five available choices: 50 GSM White and 60 GSM White/Beige/Black/Red. All selectable, no mobile overflow or customization controls. No browser errors or inquiry submissions.
- TypeScript, production build and whitespace checks passed. No inventory quantity, stock reservation or physical 3D scan was created.

## Natural default — 11 October 2026

TypeScript and production build passed. Four local browser color-state checks passed: fresh Natural with dark text, Natural retained across three bag-family switches, selected Navy retained across family switch/reload, and product-page entry starting Natural. Checks used the 2D fallback to isolate state behavior; no 3D geometry changed. Results: `evidence/natural-default-checks.json`.

## String bag refinement — 11 October 2026

- Shared String silhouette now drives the mesh and artwork clipping. Fuller cloth volume, a gathered rim and surface-following drawcord replace the narrower neck and loose floating cord. The front UV crop excludes the photographed silhouette to remove hard-looking corner shadows.
- TypeScript and production build passed. `qa/studio_shaped_artwork_checks.py` with `KOBAGS_QA_FAMILIES=String`: **4 checks passed**, covering logo/text selection, dragging and undo on front/back. An earlier concurrent software-rendered run timed out; the isolated final-build run passed with no browser errors.
- `qa/studio_shaped_quality_checks.py` with `KOBAGS_QA_FAMILIES=String`: **10 final-build visual/responsive checks passed**. Reviewed Natural/Forest front, angled, interior and rear captures; White at 320/390px remains compact with reachable rotation controls and no horizontal overflow. No browser errors.
- This is an illustrative photo-informed model, not a physical scan. Canonical artwork coordinates and saved design schema remain unchanged.

## Client feedback and finished stock — 11 October 2026

- `qa/client_feedback_20261011.py`: **5 acceptance groups passed**. Created/published/restored temporary stock and homepage-media records; checked stock row validation, additional categories, no artwork controls or branding footer prompt, draft continuity across reload/language switch, owned receipt, authoritative stock specifications, stale/out-of-stock/archived rejection, stock quotations/PDF content and CMS editor access. Included **18 EN/SQ route/width checks** at 320/390/1440px. Fixed the native consent checkbox width causing Albanian overflow. No browser errors.
- `qa/stock_migration_checks.py`: **3 in-memory migration fixtures passed**. Default dimensions update to the approved T-Shirt size while retaining edited GSM; customized dimensions and mixed draft/published edits are protected; old specifications are recorded in CMS history; repeated migration is a no-op.
- `qa/stock_accessibility_checks.py`: **4 page scans**, no automated WCAG A/AA/best-practice violations. Checked both stock languages, responsibility and catalogue. Automated checks do not establish complete conformance.
- `qa/seo_checks.py`: **48 EN/SQ URLs passed**, including crawler content, canonical/hreflang, metadata, structured data, private-route exclusions and mobile language handoff. Updated its former three-size assumption to match the single client-confirmed T-Shirt size. Indexing/rankings are not guaranteed by these checks.
- Final TypeScript, production build and whitespace checks passed. Supplied responsibility claims are client-approved copy, not independently certified in this work. No production inquiry, outbound email, real stock reservation or physical scan was created. Local CMS fixtures were restored after checks. Screenshots: `stock-order-en-*` and `stock-order-sq-*`.

## String and T-Shirt rework — 10 October 2026

- `qa/studio_shaped_quality_checks.py`: **20 visual/responsive checks passed**: both models in Natural and Forest green from front, three-quarter, high opening and rear views, plus White at 320/390px. Captures were inspected for open mouths, folded handles, soft pouch depth and continuous cord geometry. No browser errors or horizontal overflow.
- `qa/studio_shaped_artwork_checks.py`: **8 interaction checks passed**: independent logo/text selection, surface dragging and undo on both faces of both models. No browser errors. Saved coordinate and photo-export formats are unchanged.
- `qa/studio_3d_checks.py`: **8 acceptance groups passed** on the final build, including all five families, mouse/keyboard rotation, zoom/reset, independent artwork, fullscreen, two-sided export, quote carry-through, reduced motion, fallback and 320–1440px layouts. An earlier local run was interrupted; the final rerun completed with no browser errors.
- TypeScript and the compiled production build passed. Browser tests use local Chromium/SwiftShader; they do not establish scan accuracy or physical-phone performance.

## 3D opening and fabric refinement — 10 October 2026

- `qa/studio_visual_quality_checks.py`: **22 rendering checks passed**: Box/Handle in Natural and Forest green from front, three-quarter and high opening views; all five families in White at 320/390px. No browser errors or horizontal overflow. Original and final matching-angle captures are `visual-before-*` and `visual-final-*`; mobile captures are `visual-mobile-*`.
- Visual inspection confirmed the detached rectangular interior and thick rails are replaced with connected fabric surfaces and thin hems. The underside now follows the side folds; seams share the fabric color. Reduced bump strength and cached self-shadows improve the material depth. The original soft contact shadow is retained.
- `qa/studio_view_recovery_checks.py`: **11 checks passed**, including front/back recovery on all five models, rotation/pause state, idle/offscreen rendering, and simulated WebGL loss during artwork dragging with retained draft and undo.
- `qa/studio_3d_checks.py`: **8 acceptance groups passed**, covering five distinct models, pointer/keyboard rotation, zoom/reset, front/back logo and text, precision placement, two-sided export, fullscreen, quote handoff, 320–1440px layouts, reduced motion and unavailable-WebGL fallback. No browser errors.
- TypeScript, production build and whitespace checks passed. Tests use local Chromium/SwiftShader; physical phone performance and dimensional fidelity to a real sample are not established by these checks. Saved artwork coordinates and photo exports use the existing canonical registration.


## Client-review audit — 10 October 2026

- `qa/client_review_20261010.py`: **5 regression groups passed** using temporary CMS fixtures, restored after testing. Verified bilingual homepage product names, changed imagery, enabled-size counts, print limits, comparison GSM, EN/SQ timing, validated footer social URLs, fully archived catalogue behavior and both collection quote flows through refresh/language switch/submission without duplicate note prefixes.
- `qa/homepage_review_20261010.py`: **10 checks passed** at 320/390/768/1440px in EN/SQ. The approved darker green, simple hero, production wording, level video and both collection links remain intact.
- `qa/mobile_site_checks.py`: **55 route/width checks passed**, including menu touch targets, 16px form text, actual touch rotation and short-landscape designer layouts. No captured browser errors or page-level horizontal overflow. The route-count assertion now accommodates the expanded, unique site outline rather than assuming the older 32-route count.
- `qa/presentation_copy_checks.py`: **50 EN/SQ marketing-page checks passed**, including unique editorial blocks/headings/descriptions, available images and video responses, resource translations and downloadable handoff files. An interrupted local browser run was rerun successfully on the final compiled code.
- `qa/seo_checks.py`: **48 EN/SQ sitemap URLs passed**, covering crawler HTML, unique metadata, canonical/hreflang, structured data, private-route exclusions and mobile language handoff. This verifies technical implementation, not indexing or rankings.
- `qa/accessibility_checks.py`: **13 page/state scans**, no automated WCAG A/AA or best-practice violations and no browser errors. Reduced-motion behavior was also checked. Automated checks do not establish complete accessibility conformance.
- `qa/final_buyer_regressions.py`: **7 groups passed**, including consecutive requests, owned receipts, Albanian receipt persistence, date validation, stale-quote blocking, both artwork faces and repeat-order approvals.
- `qa/studio_view_recovery_checks.py`: **11 checks passed** across all five families, front/back camera recovery, auto-rotation/pause, idle/offscreen rendering and simulated WebGL loss without losing artwork.
- Reviewed desktop and mobile homepage captures and mobile catalogue output. A final catalogue adjustment preserves the original family order and numbering when products come from CMS records; a separate desktop/390px browser check passed on the rebuilt output. Captures: `client-review-catalog-1440.jpg` and `client-review-catalog-390.jpg`.
- Hosting environment inspection confirmed revision 2 contains bootstrap credentials and a notification address; no email-provider key or sender is configured. No environment changes, customer submissions or outbound emails were made for this audit.
- TypeScript, production build and `git diff --check` passed. Existing framework middleware-deprecation and large-chunk advisories remain; the 3D renderer is loaded dynamically.
- Client review scope and outstanding inputs are documented in `docs/CLIENT-REVIEW-2026-10-10.md`. Actual-device Safari/Android review, client approvals and operational launch setup remain separate from local Chromium verification.


## Homepage client revision — 10 October 2026

- **10 checks passed** in `qa/homepage_review_20261010.py`: EN/SQ homepage at 320/390/768/1440px, updated heading/accent/logo, removed annotations/proof strip/360 link, level printing video, loaded hero and no horizontal overflow.
- Both collection links reached their localized quote flow and saved the selected collection with the buyer's original notes in isolated local requests. No external email or customer request was sent.
- No captured browser JavaScript errors. Desktop/mobile hero and collection screenshots are `home-review-20261010-*` and `home-collections-20261010-*`; results are in `home-review-20261010.json`.

## CMS email/password access — 4 October 2026

- `qa/cms_checks.py`: all **12 acceptance groups passed again using password accounts**, including content publication, inquiry-to-production, private-file permissions, clean quotation printing, mobile CMS layouts and backup recovery.
- `qa/cms_password_checks.py`: **7 focused groups passed**: browser login/reload, single-use invitation activation, password change and revocation of all sessions, disabled-account and reset handling, server-side logout, forged identity/cross-origin rejection, credential-free backups, rate limiting, and login layouts at 320/390/768/1440px. No captured JavaScript errors.
- CMS authentication no longer uses ChatGPT sign-in. Accounts have durable email/password credentials; sessions expire after eight hours. Password hashes and server-side token hashes are isolated from public exports. New administrator credentials are configured separately as a runtime secret; no live plaintext password is in source or evidence.
- Screenshots `cms-password-login-390.jpg` and `cms-password-login-1440.jpg` show the empty login form. All tests used local synthetic accounts and data; no customer email was sent.

Updated 3 October 2026. Tests ran against the compiled local Worker at `http://localhost:8787` with synthetic data. No live Kobags forms, customer records or production systems were used.

## Shared CMS release — 3 October

- Added a separate shared CMS with explicit D1 entities, R2 upload storage, six server-enforced staff roles, first-administrator bootstrap restricted to `info@itdks.tech`, expiring single-use staff invitations and per-operation authorization. No local synthetic identities or test records are deployed.
- Catalogue publishing controls bilingual copy, technical variants, allowed sizes/colors, MOQ and print-color limits. Pages, 221 source wording pairs, journal, documents/certificates, FAQs, campaigns and all 38 municipalities have draft/publish/version workflows. Archived product routes leave the sitemap; restoration returns them. Contact settings update public contact surfaces and Organization metadata. Existing certificate cards are updated in place.
- `qa/cms_checks.py`: **12 acceptance groups passed**, including anonymous/non-member restrictions, editor permissions, single-use invited-email binding, production-file access limited to released artwork, draft isolation, translated publication, stale-write rejection, sitemap/301 changes, published technical options, archive/restore, four inquiry types, idempotency, browser receipt privacy and immutable specification snapshots.
- The same suite verified integer-cent quotations, private file signatures and access, hashed expiring customer links, exact-version quote/artwork approvals, production release gates, sequential stages, blocked stale documents, explicit audited re-release, clean quotation print output, actual reporting, truthful unconfigured-mail failures and a real public contact-form submission/receipt reload. No external email was sent.
- Full TAR backup and database JSON restored into new temporary local targets. SQLite integrity, record counts and SHA-256 hashes of every uploaded file passed. Access-link hashes, invitations and live staff credentials are excluded. Backups remain manual; scheduled external retention is not configured.
- CMS layouts checked at desktop and **320/390/768 px**; no page-level horizontal overflow or captured browser errors. Screenshots: `cms-desktop-overview.jpg`, `cms-desktop-editor.jpg`, `cms-mobile-editor.jpg`. Wide technical tables retain their own horizontal scroll on narrow screens.
- Regression suites passed: **48 EN/SQ SEO URLs**, **50 marketing copy/media checks**, **11 3D camera/render/recovery checks**, and **7 buyer-journey regression checks**. TypeScript and production build passed; lint has **0 errors and 42 advisory warnings**. `git diff --check` passed.
- Operational activation is separate: first administrator sign-in, client-approved policies/terms, staff assignment and enabling real inquiries remain required. Runtime bootstrap/notification addresses are configured; verified email sender/API key, automatic mail delivery, malware scanning and scheduled backup retention are not connected. See `docs/CMS-OPERATIONS.md` for setup, exact boundaries and recovery instructions. No claims of guaranteed search ranking or manufacturing-grade CAD are made.

## Nationwide SEO coverage — 3 October

- Added English `/bags-kosovo` and Albanian `/sq/bags-kosovo`: national wholesale buying guidance, contact information and all 38 municipalities, including smaller towns and villages in their coverage. Home, contact and footer links expose the guide; no repeated city doorway pages or invented offices were added.
- Verified address/phone/email against the original company website and municipality names against Kosovo Agency of Statistics geo02. Organization and Service structured data reflect the visible identity and nationwide inquiry coverage. Homepage metadata includes natural English custom-bag and Albanian qese/çanta-with-logo search wording.
- `qa/seo_checks.py` passed all **48 EN/SQ sitemap URLs**, crawler HTML, unique metadata, canonical/hreflang, structured data and private-route exclusions. Added checks validate all 38 municipalities, schema/content agreement, ordering links and keyboard-operated municipality disclosure at **320/390px in EN/SQ**. Mobile designer-language handoff still passes without browser errors or failed assets.
- `qa/presentation_copy_checks.py` passed **50 EN/SQ marketing-page checks**, including unique headings/descriptions, duplicate copy checks, original media and translated resources. TypeScript and production build passed. Lint: **0 errors, 34 existing advisory warnings**. Whitespace check passed. Desktop and mobile screenshots are `seo-kosovo-*`; mobile screenshots record the expanded list, which is collapsed by default for compact browsing.
- These checks establish site readiness, not Google indexing or ranking. Search Console and Google Business Profile verification/submission were not performed. Current canonical remains the authorized custom domain; final company-domain migration and business-account launch actions are documented in the developer handoff.

## 3D controls, material and recovery refinement — 3 October

- Fixed repeated front/back selection: the camera resets even when that editing side is already active. Explicit rotation works while the design panel is open, and selecting a face or starting an artwork gesture synchronizes the paused state.
- Handle/Box cavity walls and floor now extend to the base. The D-Cut grip compresses toward its top, giving the folded material a slimmer side profile. Printed artwork uses the same rough, lit fabric treatment as its surrounding panel. Original client-derived mockups, saved placement coordinates and clean flat exports stay compatible.
- Static visible scenes draw on demand; camera damping and requested rotation continue drawing. Hidden/offscreen scenes pause. Drag transactions finish on pointer release/cancel, capture loss, visibility loss, WebGL loss and disposal, preserving undo and draft recovery.
- `qa/studio_view_recovery_checks.py` passed **11 focused checks**: both face resets across five families, rotation in the editor, correct button state, visible-idle/offscreen rendering, actual `WEBGL_lose_context` during a drag, undo/editing in the fallback and reopening 3D. The direct 3D drag suite passed mouse/touch selection, independent layers/faces, paused undo/redo, keyboard controls, back-face selection without camera snap, clean exports, fullscreen and narrow layouts.
- The full five-family 3D suite passed again: rotation/zoom, live front/back artwork, clean export, fullscreen, quote carry-through, 320/390/768/1024/1440px layouts, reduced motion and unavailable-WebGL recovery. No captured browser JavaScript errors in these suites. TypeScript, build and whitespace checks passed; lint has zero errors and 34 existing advisory warnings.
- `presentation-3d-multi-view.jpg` records front, angled, side and rear review of all five Natural models. `studio-view-recovery-checks.json`, `studio-direct-drag.json` and `studio-3d-checks.json` retain the functional results. Checks use local Chromium with software WebGL; they do not establish physical-device GPU performance or Safari compatibility. Meshes remain family illustrations, with reconstructed rear fabric; approved CAD and per-size physical models are separate inputs.

## Final functional and accessibility audit — 3 October

- Buyer fixes cover consecutive requests with changed designs, retries after a lost save response, invalid/foreign success references, real calendar dates, front/back proof review, quote change/version gates and reorders using the exact approved artwork. Unrelated optional draft layers are replaced on reorder. Browser/server input limits now agree, and Enter continues the quote form without clearing its selected bag.
- Six contact/sample/partner lost-response checks passed: an unchanged retry returns the saved inquiry once; an edited retry saves the changed inquiry with a new reference.
- Draft recovery checks cover another open tab, full local storage with session fallback, both storage mechanisms unavailable, corrupted logo uploads and server errors. Storage warnings explain the actual recovery limit. No outgoing messages, payments or real orders were created.
- Photo artwork now follows the visible bag panel while preserving the original logo/text aspect ratio. All five families passed center/right-edge PNG checks at 1600 × 1820; a rotated square also preserved proportions. Direct visible-pixel dragging, paused-gesture undo, fullscreen and 390px touch passed. Family outlines intentionally clip artwork beyond their edges. This is illustrative registration, not an approved print template or an exact physical simulation.
- The focused studio regression checks cover explicit ink persistence, overlapping layer selection, upload readiness, undo, fullscreen and unavailable-WebGL editing. The five-family 3D suite also passed rotation, zoom, front/back controls, live artwork, reduced motion and exports. Source D-Cut reference photos were corrected.
- Automated axe checks found **zero violations in 13 tested page/dialog states**; some contrast on images remains marked for manual review by the tool. Labels, button-group semantics, heading levels, muted text and keyboard navigation were corrected. **14 marketing routes at 320px with 200% text** and **54 mobile route/width combinations** had no horizontal overflow. These results do not establish complete WCAG conformance or physical-device compatibility.
- Broader checks passed: **46 EN/SQ sitemap pages**, **32 website pages / 76 internal destinations / 11 legacy redirects**, delivery headers and links, plus the English and Albanian buyer-to-simulated-order journeys. SEO evidence covers HTML, metadata, canonicals, hreflang, structured data and exclusions; actual indexing/ranking and Search Console access remain unverified.
- Repeatable evidence: `final-buyer-regressions.json`, `final-buyer-edge-checks.json`, `inquiry-retry-checks.json`, `final-studio-regressions.json`, `studio-aspect-check/report.json`, `accessibility-checks.json`, `text-resize-checks.json`, `mobile-site-checks.json`, `site-checks.json` and the existing SEO/delivery/journey reports. Tests ran in isolated local Chromium sessions, using software WebGL where required.

- TypeScript, compiled builds and all nine studio helper tests passed. Repository lint reports zero errors and 34 advisory warnings, mainly the intentional raster-image elements. Source/media ZIP integrity checks passed and each remains below 25 MiB. A fresh extracted handoff passed `npm ci`, build and the initial local D1 migration without reusing the working checkout’s installed dependencies.

## Responsibility visual revision — 30 September

- The page now has a forest-green hero, localized lime reuse tag, decorative leaf motion, mint material panels and numbered material/recycling/care cards. Existing source material information and certificate guidance stay intact; the tag is editorial, not a certification.
- Local Chromium checks passed EN/SQ at 320, 390, 600, 768 and 1440px: no horizontal overflow or clipped content, visible compact tag, loaded original photograph, one H1, existing canonicals and localized certificate navigation. Reduced motion disables leaf animation. The manufacturing page retains its original three cards. No JavaScript errors or failed media/script/style/font requests were captured. This is responsive browser evidence, not a physical-device test.
- `responsibility-checks.json` records the focused checks; `presentation-responsibility-*.jpg` shows desktop/mobile layouts. TypeScript, compiled build and whitespace checks passed.

## Delivery and mobile performance completion — 30 September

- A read-only live header check found that Sites did not apply `public/_headers` or Wrangler's worker-first setting: image cache rules and download noindex were missing, and WebP files arrived as generic binary content. `scripts/route-static-assets.mjs` moves generated static trees beneath unlinked storage keys after the framework build; `build/worker.ts` resolves the unchanged public URLs and applies the policy to the final asset response. It preserves conditional requests, HEAD and hosting responses; missing files remain uncached 404s. Hashed JS/CSS cache for one year, mutable images for one day, and documents revalidate with noindex. The source media tree and page/session/API behavior remain separate.
- Small local asynchronous metadata had been streamed into the body. `htmlLimitedBots: /.*/` keeps descriptions, robots, canonicals and language alternatives in the initial head for every user agent. The SEO check now requires their correct head placement before and after browser hydration.
- `qa/seo_checks.py` passed all 46 EN/SQ sitemap pages and mobile language/design handoff. `qa/delivery_checks.py` checked 62 internal destinations and 52 section links from those pages, media/document MIME and cache headers, noindex downloads, conditional image 304s, uncached missing files and private-page headers. The mobile browser played and sought the supplied factory video. The asset binding returned a full 200 for the requested video range, which is permitted; partial video delivery is not represented as implemented.
- Homepage product photos use 320/640px WebP copies, the factory-film poster is smaller and the loading image avoids the full-resolution studio file. Original client photographs and high-resolution design/export sources remain intact. The certificate showcase no longer pulls the full document viewer/dialog into the initial homepage bundle. Secondary-label contrast and the language-switch accessible name were corrected.
- Retained mobile Lighthouse lab runs show **performance 69 → 84**, **accessibility 96 → 100**, **best practices 100 → 100** and **SEO 92 → 100**. Simulated largest-contentful paint improved from about 7.1 to 4.0 seconds; total blocking time from about 120 to 20 ms; layout shift remained zero. Full raw reports and settings are retained as `lighthouse-mobile-before.json`, `lighthouse-mobile-after.json` and `performance-checks.json`. These are single local Chromium runs, not public PageSpeed results, physical-device measurements, complete accessibility conformance or field Core Web Vitals. Styles remain external and cacheable for repeat navigation.
- The Albanian completion suite and English mobile guest/order/reorder suite passed again, including approval gates, isolation and recovery. No live customer requests or outgoing messages were created. Search Console verification/submission still needs access to the owning account; index inclusion and rankings are not claimed.

## SEO revision — 30 September

- Replaced blanket noindex/crawl blocking with indexable public marketing routes. English keeps its existing URLs; Albanian now has server-rendered `/sq` URLs and a crawlable language switch. Quote/inquiry forms, demo workspaces, policies, handoff and source downloads remain excluded from search; API/session isolation is unchanged.
- `qa/seo_checks.py` passed 46 sitemap addresses (23 EN/SQ pairs): meaningful crawler HTML without JavaScript, single H1/title, unique titles/descriptions, absolute canonicals, reciprocal hreflang and matching sitemap alternatives, valid social images, source-backed JSON-LD, private/404 exclusions, query canonicalization, localized redirects and protected server language selection. The check also preserved the design through a mobile language switch and quote navigation, with no captured JavaScript errors or failed assets.
- Organization/WebSite, Product, ItemList, BlogPosting and BreadcrumbList data use existing source content. No fictional offers, ratings, publication dates or authors were added. This verifies syntax and source consistency; it does not assert product rich-result eligibility without real commercial/review data.
- The hero uses responsive copies of the original photograph. The tested 390px/2x browser selected the 960px WebP (76,222 bytes versus the original 246,220); the displayed 344px PNG logo is 8,537 bytes versus the original 104,458. Original source media is retained. Mobile visual review passed.
- `qa/completion_checks.py` and mobile `qa/guest_journey.py` passed again after URL-language changes: both buyer/order flows, approvals, visitor isolation, draft preservation and recovery. `qa/presentation_copy_checks.py` passed all 48 EN/SQ presentation routes, copy/media checks and downloads. TypeScript, compiled build and whitespace checks passed.
- Canonicals currently name `https://kobags.itdks.tech`. Search Console ownership, actual index inclusion/rankings and real-user Core Web Vitals have not been verified. The handoff documents the final-domain change, sitemap submission and post-launch monitoring; no ranking or field-performance guarantee is made.

## Final completion — 30 September buyer presentation

- Buyer specifications, quotations, artwork revisions, approval states and order timelines now follow EN/SQ. Known system text is translated; stored designs, custom terms and buyer notes are preserved. Privacy, terms, browser-storage controls, certificate dates, the skip link and missing-page recovery also follow the selected language.
- `qa/completion_checks.py` passed the Albanian quotation → artwork approval → simulated order journey at 390px. It checked default terms, quote download, retained stored designs/custom terms, Albanian timeline dates even without browser locale support, draft reset without deleting submitted requests, certificate dates, and HTTP 404 links. Customer/policy/recovery pages passed 320/390/768px checks without horizontal overflow or captured JavaScript errors.
- `qa/guest_journey.py` passed again with `KOBAGS_MOBILE_FIRST=1`: English design → saved request → quotation → artwork approval → simulated order → reorder, failed-save recovery, inquiry saves, visitor/account isolation and approval gates. The subsequent date-format fix changes only Albanian display; the Albanian journey was rerun after that change.
- `qa/premium_polish.py` passed product-photo inspection and dialog focus return, Albanian journal navigation, and 320px designer/photo controls. TypeScript, compiled build and whitespace checks passed. Handoff documents and companion source/media downloads include the final revision.
- This is a complete client demo with simulated ordering. Real email, payment, manufacturing integration and client approval of commercial/legal content remain production work; no real order was placed during testing.

## Latest revision — 30 September client presentation

- Repeated factory/origin wording and generic brand-moment headlines were tightened across the homepage, collection, journal and supporting pages. Each marketing page has a distinct H1 and metadata description. Standard specifications, navigation labels and shared actions remain consistent.
- `qa/presentation_copy_checks.py` passed 48 EN/SQ marketing route checks with no duplicate visible editorial blocks within a page. Photos and video sources resolved; both resource checklist downloads and default Albanian resource cards passed. Published editorial overrides stayed intact. Product dispatch guidance and showroom control labels passed Albanian checks.
- `qa/site_checks.py` passed all 32 routes, 44 internal links and 11 legacy redirects, catalog controls, inquiries, isolation, and the full fictional quotation/artwork/order release gates. `qa/mobile_site_checks.py` passed 54 route/width checks, touch rotation, menu and forms. No browser JavaScript errors were captured.
- Desktop (1440px) and mobile (390px/320px) home captures received visual review. Build, TypeScript and whitespace checks passed. Current handoff documents and the reusable source bundle were refreshed. Code/images and unchanged factory videos are delivered as two companion ZIPs, both below the 25 MiB hosting limit; mobile links and both downloads passed.
- This establishes readiness for a client demonstration, not production integration or physical-device certification. Existing external messaging, real payment/order and approved manufacturing-template requirements remain as documented.

## Latest revision — 29 September technical audit closure

- The 60-character brand-text limit is enforced by the textarea, editor change handler, persisted browser draft and server schema. Overlong saved drafts are trimmed on load. The visible limit and correction notice remain readable on mobile.
- Studio and quote size/color/material labels, the 3D canvas instruction and exported concept-sheet copy follow the selected Albanian or English language.
- `qa/technical_audit_2026_09_29.py` passed at 390px: 59/60/61/80-character cases, old overlong drafts, separate front/back text, Albanian labels, readable 1600 × 1820 single-face and 2000 × 1400 two-face PNGs, distinct front/back content, valid PNG/JPG/WebP logos, rejected SVG and over-5MB files, export after logo upload and design carry-through to the quote.
- `qa/guest_journey.py` passed with `KOBAGS_MOBILE_FIRST=1`: saved request, customer and sales views, fictional quotation, artwork approval, simulated order, reorder and visitor isolation. `qa/studio_3d_checks.py` passed across five bag models and 320–1440px widths. `qa/mobile_site_checks.py` passed 54 route/width checks, touch rotation and menu behavior.
- TypeScript and the compiled build passed. These are browser and functional checks, not a security, performance, physical-device or real-order integration certification. The demo still does not send a real order or email.

## Latest revision — direct 3D artwork placement and lime wordmark

The header applies the requested `#c6eb9d` to KO and GROUP while preserving navy BAGS and the original silhouette. In the designer, logos and text can be selected and dragged directly on either visible 3D face, including fullscreen and mobile touch. Empty-space dragging continues to rotate the bag.

- The final compiled build and TypeScript check passed.
- `qa/studio_direct_drag.py` passed: rotated logo/text hit tests, independent layer/face coordinates, offset-preserving drag, a paused gesture as one undo/redo step, keyboard nudges, Escape, sidebar reselection, background orbit, and selection of visible back artwork without a camera snap.
- Touch dragging passed at 390px, and 320/390/768/1440px layouts had no horizontal overflow. Fullscreen edits update the same draft. Downloads are byte-identical with guides shown or hidden.
- Visual inspection found an existing asynchronous-image texture allocation issue: a saved uploaded logo could leave the 3D bag blank. Both face textures now start at their final 1024 × 1024 dimensions before WebGL's first render. The final acceptance suite samples actual rendered pixels to verify logo/text visibility after saved-draft loading and fullscreen, rather than checking metadata alone.
- The five-family 3D regression suite also passed, including rotation, zoom, reduced motion, no-WebGL fallback, shared flat/3D artwork, exports and quote carry-through. Its rotation gesture now starts on empty space, matching the new interaction contract.
- Desktop/mobile header and designer screenshots were visually reviewed. No captured browser JavaScript errors in either suite. This revision did not repeat all route or database journey checks; the prior recorded coverage is retained below.

Evidence: `studio-direct-drag.json`, `studio-direct-drag-desktop.jpg`, `studio-direct-drag-mobile.jpg`, `header-lime-desktop.jpg`, `header-lime-mobile.jpg` and the updated `studio-3d-*` evidence. Software WebGL and emulated touch do not establish physical-device performance or Safari compatibility.

## Previous revision — compact website and five-family 3D designer

The designer now defaults to a real orbitable 3D model for each of the five bag families. The flat **Place artwork** view, independent front/back layers, existing exports and saved request/proof contracts remain available. The site-wide compact layer reduces oversized openings, duplicate gutters, section/card spacing and footer height. Mobile retains readable form text, larger interaction targets and an accessible quote link in the menu.

- TypeScript and the complete Sites build passed.
- `qa/studio_3d_checks.py` passed: all five volumetric families; drag, keyboard and button rotation; zoom, reset, front/back alignment and optional spin; live logo/text textures on both faces; shared state across 3D/flat views; fullscreen, two-sided export and quote carry-through. Desktop quote action is visible without page scrolling at 1440 × 900. Layout checks covered 1440, 1024, 768, 390 and 320px widths. Reduced motion and a forced no-WebGL fallback passed. No captured browser JavaScript errors.
- The layered artwork/certificate regression passed, including independent positioning, undo/redo, white-background cleanup, two-sided sheet, saved proof and mobile approval/order/reorder.
- The anonymous guest journey passed in desktop and mobile-first 390px touch-enabled contexts: design, preview export, quotation request, fictional quote acceptance, separate artwork approval, simulated order and reorder. Guest isolation, retry preservation, validation and inquiry saves passed. No captured browser JavaScript errors.

- `qa/mobile_site_checks.py` passed **54 route/width combinations**: all 32 mapped pages at 390px plus core buying/manufacturing/certificate/workspace routes at 320px and 768px. The mobile menu and quote link work with touch, text-entry fields remain at least 16px, real touch drag rotates the 3D bag, and short landscape layouts keep the quote action reachable. No horizontal overflow or captured browser JavaScript errors.
- `qa/site_checks.py` passed again: **32 pages, 43 internal destinations/downloads and 11 legacy redirects**, plus catalog filters/comparison, all 15 variants, secondary inquiries, ownership isolation, concurrent edits and quotation/artwork release gates.
- Visual review covered desktop 3D/flat workspaces, mobile designer, homepage, catalog and quotation. Earlier nested gutters and mobile hero layering were corrected. Explicit front/back/reset actions now clear residual drag inertia.

New evidence: `mobile-site-checks.json`, `site-checks.json`, `studio-3d-checks.json`, `studio-3d-*.jpg`, `guest-journey-mobile-first.json`, and `compact-mobile-*.jpg`. Tests use an isolated compiled local Worker. Software WebGL demonstrates interaction behavior, not physical-device performance. Physical iOS/Safari and Android hardware have not been verified. The 3D geometry is illustrative by family; it does not change to approved per-size dimensions. Downloads remain clean flat concepts with specifications.

## Previous revision — layered studio and certificate library

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

These checks establish the demonstrated local workflows, not universal correctness or production readiness. They do not constitute a full accessibility, cross-browser, load, penetration or legal audit. Physical Safari/Firefox devices, screen-reader use, hosted sign-in enforcement, external messaging, payment processing, private original-file storage, backup restoration and live ERP/CRM integration were not tested. Local owner-isolation checks use synthetic trusted-header values; production identity must come from verified hosting authentication.

WebMCP is feature-detected but no supporting browser was available for protocol-level verification. The detailed designer now offers five illustrative 3D family models and a flat artwork view with approximate colors/shape. Neither is an approved print template or per-variant production CAD. The homepage showroom remains one representative Handle tote concept. Original certificate validity and production/product claims still require client approval. EN/SQ covers public marketing, resources, journal, policies and the buyer journey. Some internal sales/admin controls remain English.
