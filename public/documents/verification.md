# Kobags website — verification record

Updated 30 September 2026. Tests ran against the compiled local Worker at `http://localhost:8787` with synthetic data. No live Kobags forms, customer records or production systems were used.

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

These checks establish the demonstrated local workflows, not universal correctness or production readiness. They do not constitute a full accessibility, cross-browser, load, penetration or legal audit. Safari/Firefox, screen-reader use, 200% text enlargement, hosted sign-in enforcement, external messaging, payment processing, private original-file storage, backup restoration and live ERP/CRM integration were not tested. Local owner-isolation checks use synthetic trusted-header values; production identity must come from verified hosting authentication.

WebMCP is feature-detected but no supporting browser was available for protocol-level verification. The detailed designer now offers five illustrative 3D family models and a flat artwork view with approximate colors/shape. Neither is an approved print template or per-variant production CAD. The homepage showroom remains one representative Handle tote concept. Original certificate validity and production/product claims still require client approval. EN/SQ covers the homepage and core buying flow; secondary editorial and most administration remain English.
