# Kobags Group — code and setup handoff

## Phone layout implementation — 20 October 2026

`app/mobile.css` remains the final responsive layer. At ≤800px, `.studio` has natural height and the standard preview wrapper uses `display: contents`, allowing the full-width stage to stick within the complete studio. Explicit widths on the picker/history/stage are necessary because the outer flex container aligns to the start. `--phone-stage` controls both preview height and the selected-element toolbar offset. Settings no longer own an independent scrollbar.

`BagStudio.openEditorTab` scrolls to the preview only on an explicit transition to the artwork tab. Direct canvas selection still calls `selectArtwork` and never scrolls under the dragging pointer. A short viewport (≤620px height) or focused input/textarea releases the pinned stage; Focus mode hides it. Native front/back, undo/redo and photo/3D buttons stay touch-accessible. Duplicate desktop layer cards and history buttons are hidden on mobile. QR-dialog focus returns to the native element selector when the fourth addition disables its trigger and the desktop layer list is hidden.

Home production now uses named grid areas: intro + details on the left and the film on the right at desktop, intro → film → details on phones. DOM reading order matches the phone presentation. No new media assets, libraries, permissions or server settings were introduced.

Acceptance scripts: `qa/phone_experience_checks.py`, `qa/phone_layout_checks.py`, and existing accessibility/artwork regressions. Evidence lives under `evidence/phone-experience-20261020/`. Local Chromium touch emulation is not physical iPhone/Safari certification.

## Launch audit update — 14 October 2026

See `LAUNCH-READINESS-2026-10-14.md` for the current release status and verification. Earlier dated sections describe historical implementation, not current operating instructions. Owner handoff files now live in `deliverables/handoff/` and are not published at `/handoff` or `/documents/*.zip`. Production CMS intake activation is authorized; email delivery remains unconfigured and staff must check the inbox manually. The production-domain cutover is documented in `DOMAIN-CUTOVER-2026-10-14.md`; DNS access and Google Search Console verification remain external launch steps.

## Uploaded coffee scan trial — 13 October 2026

The studio has a separate **3D test** choice at `/design?model=coffee-test` (also `/sq/design?model=coffee-test`). It is deliberately absent from the product catalogue, CMS product list and quotation schema. Selection is URL/UI state; the saved bag, colors and artwork remain intact when entering or leaving the test. The test has no bag-customization or product-order controls.

`scripts/repair-test-scan.py` is the current asset pipeline. Run with the supplied `Test.zip`, output GLB path and JSON report path; requires offline Python numpy, scipy, trimesh and Pillow. Source ZIP SHA-256: `a3c0c90b6a4feb53e63580511b1ec62b8c9fbab924e1d7f61589e346be1b2fc2`. The original lossless-geometry conversion remains available in `scripts/convert-test-scan.py`, but its output is superseded.

The reconstruction replaces the damaged scan geometry with spline-lathed cup and saucer shells plus a rounded swept handle. Cup walls, inner bowl, lip and base form one closed ceramic solid. Handle roots stay in the outer wall. The current revision preserves every triangle position and smooth normal from version 46; only UV seam vertices are duplicated for mapping.

`scripts/scan_texture_projection.py` projects the original diffuse atlas onto separate cup (2048×1024), handle (512×512) and saucer (1024×512) charts. Candidate triangles are separated by surface and orientation; interpolated source UVs sample the original photograph without generated replacement imagery. The exterior envelope reduces inner-bowl bleed, and the handle projection is aligned to its scanned position. Interior depth is matched proportionally. No noisy original normal/displacement map is used, and there is no pale vertex-color multiplier. Unobserved underside regions remain inferred ceramic.

The self-contained GLB is 3,574,208 bytes / 109,056 triangles. `evidence/coffee-repair.json` records source/output hashes and geometry checks. `qa/coffee_texture_checks.py <version-46.glb>` checks exact per-triangle position/normal equality and nonempty photographic textures; results are in `evidence/coffee-texture-checks.json`. Source capture shadows and imperfect/missing photographic regions cannot be recovered exactly; projection does not claim a calibrated original scan or manufacturing CAD.

`lib/imported-scan-scene.ts` loads only when selected, changes Z-up to Y-up, centers/scales, awaits shader compilation and pauses rendering when hidden/offscreen. RoomEnvironment/PMREM supplies studio reflections; glTF clearcoat adds ceramic glaze. The directional light supplies self-shadowing and a soft generated contact-shadow plane grounds the saucer. Environment, shadow maps, generated texture, geometry and materials are disposed when the viewer unmounts. No external lighting download is needed. The asset URL is versioned to avoid showing the old cup from cache.

Orbit, zoom, keyboard, opt-in spin, preset views, loading/error/retry, reduced motion and fullscreen remain intact. Existing bag geometry and saved bag data are unchanged.

The existing `kobags-media.zip` companion now includes GLB files as well as videos; extract it with `kobags-source.zip` before rebuilding. The original source ZIP remains in the user attachment; it is not published as a second duplicate asset.

## Stock request recovery — 13 October 2026

`StockOrder` now uses the shared server field limits and preserves fallback confirmations through a `prepared` query parameter. That identifier is resolved only against the current browser's isolated inquiries; opening the URL in another browser does not expose the buyer's receipt. The email handoff uses the saved inquiry snapshot. Submitted drafts are cleared; a fresh request from an unavailable receipt retains its own draft.

A synchronous submission lock prevents duplicate handlers. A lost response can be retried with the existing idempotency key; an edited retry receives one new key only after `REQUEST_KEY_CONFLICT`. Removed or out-of-stock saved choices show recovery guidance. Coverage: `qa/stock_recovery_checks.py` (EN/SQ, response loss, edited retry, receipt reload, browser isolation and stale stock).

Live customer inquiry intake remains disabled at the user's request. Activation and email delivery setup are deferred; these changes do not activate either service.

## Confirmed collection stock — 12 October 2026

Migration `0005_confirmed_tshirt_stock` replaces only the untouched 50/60 GSM placeholder arrays on Smiley and Thank you, independently in draft/published content. It stores prior data in CMS history and preserves manual stock edits, other fields and archived/unpublished state. New variant IDs identify GSM/color pairs; historical inquiry snapshots remain unchanged. `tshirtStockVariants` supplies the same five combinations for fresh imports. Later CMS availability edits remain authoritative.

## String bag refinement — 11 October 2026

`traceStringBag` and `stringMouthY` in `lib/studio-projection.ts` define the shared mesh/artwork silhouette and gathered rim. String-only surface folds are symmetric at the side joins; the drawcord samples the cloth surface along each complete curve to maintain clearance. Keep the canonical artwork coordinates and saved design schema unchanged when replacing this illustrative mesh with an approved scan.

## Finished-stock collections — 11 October 2026

`collection` CMS records store translated title/description, an optional image and `collection: { dimensions, variants: [{ id, gsm, color, colorSq, status }] }`. Status is `available`, `out` or `check`. New categories and stock rows can be created, revised, published and archived in **Stock collections**. Variant IDs are stable and unique; public inquiry submission rechecks the published record and rejects archived/unavailable options. Submitted snapshots retain the exact collection revision, GSM, color, dimensions and quantity. No inventory reservation or automatic stock deduction is implied.

`/quote?collection=<slug>` renders `StockOrder`, independent of the saved custom design. Draft contact/stock choices use a collection-specific sessionStorage key; consent is not retained across reload. Live stock inquiries share the existing inbox and quotation/private-review workflow without customer artwork controls. When live inquiries are disabled, the existing isolated store prepares a request and offers an explicit email handoff; it does not claim the team received it. Stock fulfillment remains a team-managed stock/delivery agreement, separate from the custom production-file release workflow.

Migration `0004_client_stock_collections.sql` adds the two client-approved categories without overwriting existing records. It updates only the old default T-Shirt dimensions, preserving any edited GSM and saving both previous draft/published specifications in CMS history. Other editor-modified dimensions are preserved. Product validation now accepts 1–3 distinct size variants. Historical customer snapshots remain immutable.

Optional `settings.media` keys `heroImage`, `printingVideo`, `printingPoster` and bilingual `heroAlt` allow homepage media replacement without code edits. Uploaded references must be public; replacement hero descriptions are required in both languages. Empty paths retain existing media. Other product/collection images use their record image field.

Acceptance: `qa/client_feedback_20261011.py`, `qa/stock_accessibility_checks.py`, `qa/seo_checks.py`. Production stock status and asset approvals must be entered by the client; fixture changes are local only.

## Shaped bag construction — 10 October 2026

`lib/studio-scene.ts` branches surface depth by family for T-Shirt drape and String pouch volume/gathers. The T-Shirt U-cut is open; only its tips bridge front to back, and gussets run the full height. Both models get inset cloth linings and contoured floors/undersides. String drawcord/casing/hem are actual mesh geometry. Canonical XY artwork coordinates, saved draft structure and photo-export registration are unchanged.

`qa/studio_shaped_quality_checks.py` records front, three-quarter, opening and rear views in two colors plus 320/390px layouts. `qa/studio_shaped_artwork_checks.py` exercises raycast selection, dragging and undo for logo/text on both faces of both changed families. Run against the compiled local Worker and inspect the captures; automated rendering checks do not assess photorealism or physical-device performance.

## Studio visual refinement — 10 October 2026

`lib/studio-scene.ts` replaces detached Box/Handle cavity boxes with inward-offset copies of the rendered front/back and gusset meshes. `rimY` and `gussetFold` keep hem, face and base geometry aligned. Interior vertex color supplies smooth depth shading, with the same photo-derived cloth map on interiors and seams. The original family coordinate/UV system is retained for artwork. Handle thickness and bump strength are reduced. Directional PCF self-shadows use one cached 1024px map per model, explicitly disposed with the scene. Color/artwork changes do not invalidate this static geometry shadow. No dependencies, schema or saved-design migration is required.

`qa/studio_visual_quality_checks.py` captures 12 desktop color/angle combinations and all five families at 320/390px. Existing 3D interaction and view-recovery suites cover control and rendering behavior. Screenshots are visual QA evidence, not dimensional validation against a physical sample.


## Client-review consistency pass — 10 October 2026

Homepage and catalogue use published CMS products, including the empty-catalogue case. Home cards retain source ordering and curated optimized imagery unless a different product image is published. Available-size counts, first-active-size comparison values and print-color limits follow the same records. Optional `settings.leadTimeSq` supplies Albanian production guidance alongside `leadTime`; homepage, detail and quote views consume them.

`components/collection-categories.tsx` shares the two approved collection cards. Collection quote progress uses `kobags-quote-step:<collection>`; the generic request retains its existing key. Refresh/language switches preserve the step. Successful requests clear the relevant step and recognized existing collection prefixes are not duplicated.

Optional `settings.social` stores Facebook, Instagram, LinkedIn and YouTube profile URLs. `lib/social-profiles.ts` validates the expected HTTPS host and profile path; CMS validation rejects invalid values and the footer renders only populated valid profiles. These optional JSON settings need no database migration. No official profile URLs have been invented or published.

`qa/client_review_20261010.py` tests publication with temporary local settings/products and restores original records in a `finally` block. The review audit and remaining client inputs are in `docs/CLIENT-REVIEW-2026-10-10.md`.

## Homepage revision — 10 October 2026

`components/home-page.tsx` removes hero annotations, the repeated 360 link, quotation prompt and immediate proof strip, updates the headline/production copy and introduces two compact printed-collection inquiry links. `components/quote-flow.tsx` accepts only `collection=thank-you` or `collection=smiley`; it shows the selection and includes it in submitted notes for both live and isolated requests, including key-conflict retries. The existing design draft is preserved, note length includes the collection prefix, and starting another request clears the selection. Shared lime accents are `#a6d17a`; the printing-film transform is removed. `qa/homepage_review_20261010.py` covers EN/SQ responsive output and both collection requests with synthetic local data.

## CMS password access — 4 October 2026

The CMS uses email/password accounts exclusively. `/api/cms/login`, `logout`, `claim` and `password` manage login, server-side session revocation, single-use staff activation and password changes. `/api/cms/reset-password` is restricted to administrators for other staff accounts. `lib/cms/auth.ts` owns the flows; `password.ts` owns hashing and cookies; `core.ts` checks each session and staff permission. Migration 0003 adds credential and session tables. No platform identity header or ChatGPT account grants CMS access. Existing business records remain unchanged. See CMS operations for setup and recovery; actual credentials are provided privately, never embedded in the handoff.

## Shared CMS release — 3 October 2026

The new authenticated `/cms` is separate from the original isolated `/demo` workflows described below. See [CMS operations](CMS-OPERATIONS.md) for the authoritative current setup, permissions, publishing model, inquiry/quote/artwork/production flow, email status and backup/recovery instructions. `lib/cms`, `components/cms`, `/api/cms`, `/api/inquiries`, `/api/portal` and `/api/media` implement the shared backend. Drizzle migrations 0001–0002 add explicit tables and indexes; the existing demo table is retained. Logical bindings are now `DB` and `BUCKET`.

Published product variants, colors, MOQ and bilingual copy feed the catalogue and studio, while historical inquiry snapshots are immutable. The old description-only demo editor remains limited to its isolated records. Staff/customer identities and private artwork are not included in the downloadable source. Full authenticated backups include uploaded bytes separately. The source ZIP has no existing project ID, but now declares both logical bindings.

Real inquiry handling is initially off. Administrator bootstrap is configured for `info@itdks.tech`; that person must sign in to claim access. Email sending requires a verified Resend sender/key; automatic delivery, malware scanning, scheduled backups and client-approved policy content are not configured. The original demo restrictions below apply to `/demo`, not the new CMS.


Revision: 3 October 2026. This is a public demonstration with a persistent, visitor-isolated data flow. It is not connected to Kobags production systems.

## 3D interaction and material refinement — 3 October

Explicit front/back controls increment a separate `viewKey`, so reselecting a face resets the camera even when the edited side has not changed. This signal is separate from layer selection: selecting visible back artwork through raycasting still preserves the camera angle. Explicit auto-rotation now works while the artwork editor is open; switching faces or starting a drag pauses it and synchronizes the button state.

The Handle and Box interiors extend to the bag base. The D-Cut neck compresses toward its punched handle. Printed artwork uses a rough, lit material with the shared fine fabric bump, following the surrounding panel's lighting. Artwork coordinates, proportions, source mockups and flat/export contracts are unchanged.

Rendering is demand-driven: a static visible bag draws on changes, while orbit damping and requested rotation continue drawing. Hidden/offscreen canvases pause. Drag completion is shared by pointer release, lost pointer capture, visibility loss, context loss and disposal. A WebGL interruption retains the draft, ends the undo transaction and exposes the editable photo fallback; reopening 3D creates a new canvas.

`qa/studio_view_recovery_checks.py` covers face reselection across all five families, motion/button agreement, idle/offscreen rendering and actual `WEBGL_lose_context` during a gesture with undo and reopening. The existing five-family and direct-drag suites cover rotation, artwork, fullscreen, touch, export and fallback. `evidence/presentation-3d-multi-view.jpg` records front, angle, side and rear visual review. These are Chromium/software-WebGL checks; the meshes remain illustrative rather than approved CAD or variant-specific physical models.

## Final audit fixes — 3 October

Quote submission preserves the selected bag inside the native form, validates real calendar dates, aligns browser/server field limits and supports Enter to continue. A successful save rotates the browser draft key. The API returns an existing request only when its normalized design is identical; a changed design with an old key returns `REQUEST_KEY_CONFLICT`. The quote flow generates a new key and retries once only for that confirmed conflict. Network failures retain the original key, preventing duplicate records after a lost response. Contact, sample and partner inquiries apply the same unchanged-retry/edited-retry rule. Success URLs verify that the current visitor owns the referenced request and preserve `/sq`.

`lib/draft-storage.ts` merges ordinary edits with the latest local draft, synchronizes other tabs and falls back to session storage when local storage is full. A visible status explains that the fallback lasts only for the current tab. If both stores fail, the page warns before leaving so the user can retain or download the design. Reorders and browser-draft resets replace the whole draft: optional font, layer and back-side fields from an unrelated bag cannot leak into it. Reorders use the exact artwork version attached to the simulated order.

Artwork approval offers both front and back views. Quotes requiring changes cannot be accepted until a new version is issued. Uploaded artwork must finish processing before the studio quote action becomes available. Explicit ink choices survive reload, language changes and quote navigation. A paused flat-canvas drag remains one undo gesture; fullscreen and unavailable-WebGL views retain editing.

`lib/studio-projection.ts` shares family proportions with the 3D scene and registers its canonical artwork coordinates onto the front panel of each photographed mockup. The flat renderer and PNG export place each layer at its registered center with a uniform scale and panel tilt, preserving logo/text proportions. They share shaped-face clipping; pointer hit testing uses the inverse transform and respects CSS letterboxing. Saved coordinates and the legacy atlas remain unchanged. The panel registration is illustrative, not a measured print template. Replacing a photograph requires recalibrating its panel points and rerunning edge/export tests.

The compact layout accommodates enlarged text, wrapping selections, narrow quote summaries and long Albanian labels. Preview-mode and side controls are labelled button groups; actual editor tabs retain associated panels. The slider's focusable thumb carries its accessible label. Shared muted text is darker. React lifecycle and history bookkeeping pass repository lint error checks without suppressing them. Sales description/settings drafts no longer reset merely because a background refresh arrives.

Current acceptance results and practical limits are in `evidence/VERIFICATION.md`. New repeatable checks cover request collisions/recovery, studio interaction, accessibility and enlarged text under `qa/`.

The 29 September technical audit follow-up centralizes the 60-character brand-text limit in `lib/catalog.ts`. `components/bag-studio.tsx` constrains even scripted overlength input, and `components/kobags-context.tsx` trims older local drafts and all design updates before persistence. `lib/demo-domain.ts` enforces the same limit at the API boundary. Studio/quote display labels and concept-sheet text follow EN/SQ without changing stored catalog values. The 3D canvas updates its accessible instruction when the language changes. `qa/technical_audit_2026_09_29.py` checks these boundaries, image formats, readable PNG exports and quote carry-through on a compiled local Worker.

The 30 September presentation pass adds `qa/presentation_copy_checks.py`: 48 rendered EN/SQ marketing-route checks, unique page headings and metadata descriptions, repeated editorial-block detection, media resolution, localized resources and downloads, published-copy override preservation and mobile captures. Supporting page metadata now uses its own introduction. Default resource translations apply only while the text matches its source record, preserving separately published edits. Product dispatch guidance and homepage 3D control labels also follow the selected language.

The final completion pass adds EN/SQ footer policies in `components/policy-content.tsx` and buyer display translations in `lib/workspace-copy.ts`. Translations map known catalog values, system events and default quotation terms; custom terms, names and notes remain intact. Canonical stored values and API payloads are unchanged. Albanian timeline dates use explicit month names to remain readable in browsers without Albanian locale data. Browser-draft reset leaves submitted records untouched. The 404 links now lead to their correctly labelled destinations.

## SEO and language URLs — 30 September

At the user's request, public marketing pages are now crawlable and indexable on `https://kobags.itdks.tech`. English uses the existing addresses; Albanian uses `/sq`, `/sq/products`, `/sq/manufacturing`, etc. `middleware.ts` rewrites Albanian routes and sets the server language; the first HTML response contains translated content and `html[lang]`. `components/site-link.tsx` preserves the URL language on page links while leaving APIs, original downloads and external links alone. The header language link is crawlable without JavaScript. Switching language preserves query parameters and the synchronous browser design draft. Browser language storage no longer overrides an explicit URL's language.

`lib/seo-config.ts` owns the current canonical origin, searchable paths and page-specific EN/SQ copy. `lib/seo.ts` produces absolute canonicals, reciprocal `en`/`sq`/`x-default` alternatives, Open Graph/Twitter previews and page robots metadata. `/robots.txt` and `/sitemap.xml` are regular Worker routes: the sitemap contains 46 addresses for 23 public pages in two languages. It omits unknown routes, form-only sample/partnership inquiries, quote flow, buyer/sales demos, handoff and demo policies. Those pages retain noindex metadata and response headers. `/api/` is disallowed; `/documents/*` downloads receive a noindex response header through `build/worker.ts`. `public/_headers` retains equivalent rules for hosts that support that format, but Sites does not apply that file to its asset responses. Noindex is not access control; visitor isolation remains the API's responsibility.

`next.config.ts` disables streamed metadata using `htmlLimitedBots: /.*/`: descriptions, robots, canonical and language alternatives arrive inside the initial `<head>` for both browsers and crawlers. The generated metadata only reads local copy and the request language. Hashed CSS stays as a cacheable stylesheet so repeat navigation can reuse it.

The Worker resolves public media/documents and hashed build files through `ASSETS` before applying their final delivery headers. Hashed `/_next/static/*` files are immutable for one year; mutable `/assets/*` files cache for one day; downloads revalidate and remain noindex. Correct WebP/video/document MIME types are explicit. Unknown files remain uncached 404s, and page/API/session responses retain their framework behavior.

Sites dispatches a matching physical static file before the Worker and does not honor Wrangler's `run_worker_first` in its publication path. The final step of `npm run build`, `scripts/route-static-assets.mjs`, moves generated client `assets`, `documents` and `_next` trees beneath `dist/client/__kobags_static`. The Worker maps the unchanged public URLs to those storage keys so header rules actually run on Sites. The generated server modules and source `public` tree stay unchanged. Storage-key URLs are unlinked, excluded from the sitemap and disallowed in robots; they are public asset storage, not a private-data boundary. `vite.config.ts` also sets `run_worker_first` for compiled local previews. Do not omit the post-build step when packaging. Development can fall back to the original public-tree keys.

Conditional image requests retain ETags; video requests may return a full 200 response when the hosting asset binding ignores Range. Mobile playback and seeking are checked; partial-streaming delivery is not claimed.

Organization/WebSite JSON-LD uses published identity/contact fields. Product pages add source-backed Product and BreadcrumbList data; the collection adds ItemList, and articles add BlogPosting/BreadcrumbList. No fictional prices, ratings, product identifiers, author names or publication dates were invented. Product rich-result eligibility is not claimed without real supported offers/reviews. Tracking queries use the clean page canonical. Both ordinary and Albanian legacy links preserve their correct destinations.

Responsive WebP copies of the original factory hero are 45/76/150 KB at 640/960/1600px. The 344px displayed logo is 9 KB; the original 1600px PNG and factory JPEG remain unchanged for reuse and social metadata. Homepage bag photographs now use 320/640px responsive delivery copies (4–6 KB / 14–23 KB), the factory-film poster is 64 KB and the showroom loading image is 37 KB. High-resolution studio/export sources are unchanged. `scripts/optimize-seo-media.mjs` reproduces delivery copies. The homepage imports the lightweight `certificate-showcase.tsx` separately from the certificate library/dialog. Existing deferred 3D loading, manual-play videos and dimensioned images remain in place.

For the final business-domain launch, change `SITE_ORIGIN`, configure that domain's hosting/DNS, retain approved legacy redirects and verify the property in Google Search Console. Submit `/sitemap.xml`, inspect representative EN/SQ URLs and monitor real-user Core Web Vitals. No Search Console account, actual Google index inclusion, ranking position or field-performance score is represented as verified by the local acceptance checks.

## Quick start

Requires Node 22.13+ and npm. The included lockfile preserves the installed package versions.

Download `kobags-source.zip` and its companion `kobags-media.zip` from `/handoff`. Extract both into the same parent folder, merging the shared `kobags-website` directory. The companion contains the three unchanged factory videos; this keeps each public download within the host’s 25 MiB asset limit.

```sh
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_burly_prodigy.sql
npm run dev
```

Apply the initial migration only once to a fresh local database. If the table already exists, do not rerun the CREATE migration; retain the database. `npm run dev` normally serves `http://localhost:5173`. `npm run start` previews the compiled local Worker. No API key is needed for the demo.

To change the schema, edit `db/schema.ts`, run `npm run db:generate`, inspect the new migration and apply it to the correct local database. Never point QA at a live system.

### Reuse for another project

The downloadable ZIP deliberately contains `.openai/hosting.json` with logical `DB` only and **no existing project ID**. Start in a new folder and repository. Replace brand content/assets and register a new Site only when you intend to publish the new project. The original working checkout remains linked to the existing Kobags public demo Site; it should continue updating that Site, not create duplicates.

Existing demo records, credentials, provider configuration, Git history, installed dependencies and compiled output are excluded from the ZIP. Older test captures and generated concept PNGs are omitted to keep the source download compact; the included checks regenerate them. Current presentation JPEGs and all result manifests are included. The source bundle contains a small `SOURCE-MANIFEST.json` describing these omissions. Proprietary brand assets are not licensed for unrelated projects.

## Stack and source map

- TypeScript / React 19, Next-compatible App Router through Vinext.
- Cloudflare Worker for rendering and `/api/demo`.
- Cloudflare D1 through logical binding `DB`.
- Drizzle schema/migration; prepared D1 queries at runtime.
- Canvas 2D for precise artwork placement, shared artwork textures and PNG export.
- Three.js for the lazily loaded homepage showroom and the five-family 3D designer.
- Local storage for unfinished design and quote step; URL-driven server-rendered language.
- Existing accessible UI primitives for dialogs, tabs, selects, tables and checkboxes.

`package.json` and `package-lock.json` are authoritative for exact dependencies. This starter includes more UI primitives than the demo currently uses; dependencies were preserved for reuse.

```text
app/                     Pages, layouts, content routes, API
components/              Home, studio, quote, catalog, inquiry, workspaces
components/ui/           Installed reusable interface primitives
lib/catalog.ts           Five families, fifteen verified variants, draft type
lib/demo-domain.ts       Validation, state transitions, seed content
lib/site-outline.ts      Canonical clickable page outline
lib/journal.ts           Six proposed articles retaining original slugs
lib/journal-sq.ts        Albanian article translations, keyed by those slugs
lib/workspace-copy.ts    Known system labels/events; preserves authored copy
lib/site-locale.ts       EN/SQ page links; preserves file/API addresses
lib/seo-config.ts        Canonical origin, public paths and search copy
lib/seo.ts               Server metadata and request language
middleware.ts           Albanian rewrites, language headers and exclusions
app/robots.txt/route.ts  Crawl rules and canonical sitemap address
app/sitemap.xml/route.ts 46 public EN/SQ addresses with reciprocal alternatives
app/api/demo/route.ts     Owner lookup, persistence, concurrency, errors
components/demo-store.tsx Client read/write hook and translated core errors
components/kobags-context.tsx Browser draft, locale, optional WebMCP
components/policy-content.tsx EN/SQ demo privacy, terms and browser storage
app/globals.css          Base design tokens and component styling
app/brand-refresh.css    Edition 05 site-wide visual system
components/bag-showcase.tsx 3D showroom UI and designer handoff
lib/bag-scene.ts          Three.js geometry, lighting, controls and lifecycle
db/schema.ts             D1 table schema
drizzle/                 Included migration and generation metadata
build/, scripts/         Framework/hosting compatibility helpers
public/assets/           Original and illustrative assets
public/documents/        Buyer checklist and handoff downloads
docs/                    Handoff, source evidence and migration mapping
qa/                      Repeatable local browser checks
evidence/                Screenshots, result manifests, verification record
```

## Data flow

```text
Buyer browser draft
  → validated POST /api/demo { type: 'submit', design }
  → owner-scoped D1 aggregate + immutable RFQ snapshot
  → customer and sales views read the same request
  → issued quote version + artwork revision
  → buyer acceptance + latest artwork approval + payment condition
  → simulated production handoff with exact version references
  → sequential simulated statuses
  → repeat request with a new key and no inherited commercial terms
```

### Model

The `demo_workspaces` table has an owner primary key, a revision integer, a JSON data field and an updated timestamp. `DemoState` holds requests, inquiries, preview outbox, catalog descriptions/drafts, evidence/guidance records, settings and audit events. This compact aggregate is adequate for the bounded demonstration. A production portal needs explicit entities, indexes and per-organization membership.

An RFQ snapshot retains bag, size, dimensions, GSM, description, normalized front/back artwork, contact fields and request context. Published descriptions or catalog additions do not rewrite historic RFQs. Original specification variants are source-owned and overlaid on database reads, allowing existing private demo owners to see all 15 sizes without a destructive reset. CMS currently edits descriptions, not variant dimensions.

### API

`GET /api/demo` returns `{ state }`. `POST /api/demo` takes a JSON action and returns `{ state, id? }` on success or `{ error }` on failure. The domain module is the source of truth for action fields and validation.

| Actions | Purpose |
| --- | --- |
| `submit` | Save an RFQ once using its design key |
| `inquiry`, `inquiry-stage` | Save/review sample, partner and general inquiries |
| `prepare-demo` | Idempotently create missing fictional quotation and artwork, without approving either |
| `assign`, `note`, `stage` | Sales ownership, notes, pipeline stage |
| `issue-quote`, `accept-quote`, `quote-change` | Versioned fictional offers and buyer response |
| `issue-artwork`, `approve-artwork`, `artwork-change` | Versioned proofs and correction/approval |
| `payment` | Mark a fictional payment condition fulfilled; no money handled |
| `release`, `order-stage` | Guarded simulated production and sequential status |
| `save-product`, `publish-product` | Description drafts and publishing |
| `content-save`, `content-publish` | Evidence / guidance editing and review gate |
| `settings` | Demo MOQ, lead-time copy, response-hours target |
| `reset` | Reset only this owner's synthetic workspace |

Validation covers supported product/size pairs, print colors, quantity, required contact fields, consent, image format/signature, stage sequences and approval versions. Stable submission keys make retries idempotent. Prices are integer EUR cents. No production checkout endpoint exists.

Important responses include 400 for domain/input rejection, 400 with `DEMO_SESSION_REQUIRED` when a guest POST has no session cookie, 403 for a mismatched supplied Origin, 409 after concurrent-update retry exhaustion, 413 for an oversized request, 415 for non-JSON and 503 for unavailable storage on reads. UI displays translated core errors and preserves browser drafts on a failed submission.

### Ownership and concurrency

`lib/demo-session.ts` preserves account workspaces when Sites forwards `oai-authenticated-user-id`. Anonymous visitors receive a server-generated 256-bit opaque session cookie. HTTPS uses `__Host-kobags-demo` with Secure, HttpOnly, SameSite=Lax and Path=/; local HTTP uses `kobags-demo`. The seven-day cookie is hashed with SHA-256 to form a separate `guest:` owner key; account keys remain `user:`. Guest cookies cannot select account records. No shared anonymous fallback exists.

The client shares overlapping initial reads to establish one cookie and initializes the session before writes. GET returns seed data without inserting an empty workspace; the first write creates the row. A guest POST without a cookie returns an actionable session error. Cookies are essential to anonymous continuity: clearing or expiring one starts a new workspace and does not delete the old database row. Server retention/pruning remains a production requirement. Existing signed-in records are not migrated to a guest session.

Customer and sales are two demonstration views of the same visitor workspace, **not** separate authorization roles. Every visitor may simulate both roles for their own records. Before live use, implement verified sessions, organization membership and server-enforced customer/staff permissions. Trust the forwarded account header only behind Sites dispatch, which removes/replaces caller-supplied identity; do not expose the Worker on an arbitrary host and trust that header.

Updates compare the stored revision and retry at most three times. A second edit rereads the latest state before replaying its action. The server does not silently replace another owner's row. Requests are limited to 12 per workspace, inquiries to 30 and total serialized state to 1.8 million characters. POST bodies are limited to 350,000 characters.


### Guided demo ordering

The RFQ success page leads directly to the customer journey (`components/demo-journey.tsx`). `prepare-demo` composes the existing issue-quote and issue-artwork transitions in one optimistic update. Its example price is EUR 0.45 per bag plus EUR 120 setup, explicitly fictional. Missing artifacts are created once; existing revisions/approvals are preserved. The buyer reviews and accepts the quotation, reviews and approves artwork, then explicitly selects **Place demo order**. The existing release gates and immutable version references still apply. No charge, outgoing message or manufacturing job is created. The sales view can revise artifacts and advance simulated production stages. Reorders remain new requests requiring fresh approvals.

The quote form offers fictional contact details through `?demo=1` for automated/internal checks only; the normal public form asks buyers to enter their own details. Consent is never checked automatically. Missing delivery-country and city feedback is specific. Download feedback persists with its filename, including fullscreen, and the mobile menu label is translated.

### Navigation compatibility

`components/site-link.tsx` uses standard anchor navigation. The installed Vinext production Link chunk loaded a missing dynamic `navigateClientSide` export, causing clicks to fail while development navigation worked. Standard document links remove that dependency. Catalog detail actions save the selected bag and size, then use router navigation to enter the studio or quote flow; repeat-order actions use document navigation. The context synchronously saves the draft before navigating. Test the compiled journey, not just the dev server, after any framework or routing change.

### Artwork

The browser accepts PNG/JPG/WebP up to 5MB and 8000px per dimension. `lib/logo-cleanup.ts` examines border uniformity, then removes only edge-connected matching pixels. Existing transparent logos, nonuniform borders and nearly blank output remain unchanged. It tries preview edges of 1024, 768, 512, 320 and 192, preferring PNG and falling back to WebP at quality 0.94. Primary legacy logos keep the 100,000-character data-URL limit; additional images and generated QR PNGs are capped at 20,000. This keeps eight elements within the existing request-body limits. A normalized original is held in component memory for Restore original; original full-resolution files are not retained, and restoration memory does not survive reload.

`Design.elements` is an optional array of additional logo/text/QR records with stable IDs, side, content and independent placements. Existing primary logo/text fields retain their old meaning and are not migrated. `artworkLayers`, `sideArtwork`, `artworkPatch` and `placementPatch` resolve both formats. Each side supports four entries, including empty extra text being edited. Copying replaces the opposite face and allocates new IDs; removal/upload/copy create discrete undo entries. The schema and submit action enforce unique IDs, finite placement bounds, bounded raster data URLs, safe QR link schemes and per-side limits. Every element travels through draft, RFQ snapshot, photo/3D rendering, clean exports and the CMS inquiry preview. No database migration is required.

`MobileArtworkTools` keeps native element selection and bounded ±2-point resizing below the pinned preview while the page scrolls at widths <=800px. It uses the same active layer and placement patch as the main editor; each quick-size tap is a discrete undo entry. Slider pointer capture brackets the existing history gesture so pauses do not split a resize. Shared `pickArtwork` tests rotated bounds, then chooses the nearest centre; coincident centres prefer the selected layer. Both photo and 3D use this helper. Photo dragging checks rendered layer bounds rather than requiring nonempty legacy artwork. `qa/mobile_artwork_checks.py` covers touch selection, independent moves/sizes, fixed controls, resize undo, seven viewport sizes, QR-only fallback, EN/SQ and short-view QR entry. Its local fixtures create no real inquiry.

`lib/qr-artwork.ts` uses pinned `qrcode-generator@2.0.4` (MIT) locally, with automatic version selection, M error correction and a four-module white quiet zone. URLs are normalized before encoding; credentials and executable schemes are rejected. No QR or image-processing service receives the content. `qa/artwork_elements_checks.py` uses an independent ZXing decoder on the raw PNG and two-sided exported sheet. Physical printing, material distortion and final QR scan size still need production sampling. The exact release license is preserved in the dependency notice inventory.

`components/bag-preview.tsx` waits for all required images before composing an offscreen buffer. Only the latest render writes to the visible canvas, preventing overlapping asynchronous draws. Image and tinted-layer caches are bounded. The main canvas renders at 1600px square; selector tiles use 320px. The five neutral WebP images and alpha silhouette bounds are mapped in `lib/studio-artwork.ts`. Runtime tinting keeps luminance and alpha detail. Text fits proportionally, and logos retain their aspect ratio. The artwork overlay is clipped to the illustrative bag silhouette, not an approved print zone.

Pointer movement retains the initial grab offset; arrow keys move by 1% (Shift: 5%). Editable numeric fields accept incomplete input and clamp on blur. Selection guides remain editor-only. Exports render a separate clean canvas and add a specification footer, yielding a 1600 × 1820 PNG.

`previewVersion: "v4"`, typeface/alignment fields, `backLogoName` and `backInk` are optional validated JSON fields. New browser drafts use v4; saved snapshots lacking that version use the original atlas geometry. No D1 schema migration is required. Existing saved snapshots remain unchanged. Preserve the old atlas until historic snapshots no longer need it. See `docs/studio-asset-note.md` and the exact prompt manifest for provenance.

Use approved per-variant print templates, original-file storage, file validation/scanning and controlled downloads before taking production artwork. Do not derive millimetre-accurate placement from the current percentage-based illustration.

### Compact five-family 3D designer

`components/studio-3d.tsx` lazy-loads `lib/studio-scene.ts` when the 3D view mounts. The 3D view opens by default. Each of the five families has separate front and back meshes/materials, fabric-textured side gussets and base, and handle or closure geometry. D-Cut and T-Shirt have physical handle openings with shaped inner edges; the drawstring body narrows toward its closure. The String photo crop is cleaned inside the runtime material painter so its photographed cord does not compete with the modelled cord. Shaped faces are tessellated before deformation so they bulge across the panel rather than only at the outline. Handle and Box have recessed mouths with inner walls and floor. The front material uses a crop of the matching supplied product photograph; the back uses a different unprinted crop with edge shading because no clean rear photos were supplied. A nearby fabric crop textures the sides and handles. Artwork is mapped to both curved face meshes. This is a rotatable, volumetric illustration based on a single photo per family, not a scanned object or production CAD. Catalogue size selection updates the specification, not approved physical geometry. The scene has no additional dependency beyond the existing Three.js install.

`renderArtworkTexture` in `components/bag-preview.tsx` shares the artwork painter with the flat renderer. It returns a transparent 1024px canvas plus logical artwork bounds for each face, preserving independent text/logo placement, rotation, ink, alignment and image aspect ratios. `renderBlankBagTexture` supplies the colorized source photograph. The 3D scene crops its front panel, rear material sample and a smaller cloth patch from that canvas; keep all crop coordinates in `lib/studio-scene.ts` aligned if replacing an asset. Natural T-Shirt uses `studio-real-t-shirt-natural.png` directly; natural Handle and Box retain their source photo colors. Other colors use the runtime tint and remain indicative. Revision tokens discard stale asynchronous results. Only a family change reconstructs the scene; editing updates material colors and existing textures. The established draft/RFQ/proof contracts and PNG exports are unchanged. Both 3D and the flat **Photo + artwork** view support direct placement. `docs/studio-real-photo-sources.json` maps each blank cutout to its source.

OrbitControls supports drag and keyboard rotation. Dedicated controls provide rotation, zoom, reset and spin. Front/back changes align the view. The untouched default bag starts a slow spin to show that the view rotates; selecting artwork, dragging, using a control, or entering editing mode stops it. Saved designs do not auto-spin, and reduced-motion users receive a still view. Pixel ratio is capped at 1.8; rendering settles after interaction and pauses offscreen or when the document is hidden. Cleanup disposes controls, geometry, materials, textures, observers, listeners and renderer. WebGL initialization/context failure exposes a usable flat fallback without discarding the draft.

The desktop compact rules live in `app/brand-refresh.css` and `app/compact.css`. `app/mobile.css` is the final responsive layer. At <=800px the studio is a natural-height flex column. The preview and selected-element tools pin while the settings use normal page scrolling, with a compact sticky quote row. Below 620px height, and while typing in an input or textarea, the preview releases its sticky position. The editor-expand button hides the existing preview through CSS (no duplicate scene or draft), and ResizeObserver/IntersectionObserver restore rendering when it returns. Native details hold photos/specs/downloads outside the workspace. Do not move these resources back above the controls.

`qa/studio_3d_checks.py` exercises distinct families, real camera movement, live artwork on both faces, mode switching, downloads, fullscreen, responsive layouts, reduced motion and the no-WebGL fallback. Use `CHROME_SOFTWARE_GL=1` for headless environments without a GPU. This does not measure performance on a physical phone.

### Homepage 3D showroom

`components/bag-showcase.tsx` uses IntersectionObserver with a 250px margin to import `lib/bag-scene.ts` near the viewport. That separate chunk contains Three.js and OrbitControls. It creates no server-side WebGL context. The model is authored as geometry in code: curved front/back panels, side folds, base, ribbon handles, reinforcement patches and seams. A deterministic canvas bump texture provides fine fabric detail; another canvas texture applies the current brand text. A soft procedural contact shadow avoids expensive shadow-map passes.

The scene exposes color, text, rotation, front/back/reset, pause/play and construction controls. Construction interpolates the relative component positions and overall scale; reduced-motion users receive the end state without the transition. Auto-rotation starts disabled for reduced-motion users, while explicit Play remains available. Pointer interaction pauses automatic rotation. Vertical touch panning remains available for page scrolling.

The renderer caps pixel ratio at 1.75 and stops its animation loop when the section is out of view or the document is hidden. It releases geometries, materials, textures, observers, event listeners and the renderer on cleanup. Context loss and initialization failure expose the existing 2D renderer as a functional fallback. Rotation controls are disabled in that fallback; color/name selection and continuation still work.

The showroom is a local presentation state until the visitor chooses Continue. That action writes the selected Handle Small, color, text, ink, sans typeface and centered placement into the existing synchronous browser draft, then navigates normally to `/design`. It does not create an RFQ or perform a server write.

The 3D model is illustrative and independent of the v4 generated images. It is not a product-specific CAD asset or manufacturing instruction. Approved geometry, physical material references and all variant models remain production inputs. Three.js [documentation](https://threejs.org/docs/) is the API reference; `package-lock.json` records the installed version.

### Compact site and mobile navigation

`app/mobile.css` is imported last in the root layout. It reduces phone spacing, uses a 56px header, turns homepage bag families into a keyboard-focusable horizontal region, and presents catalog photos beside the full product description. `app/compact.css` remains the shared desktop/base layer. Mobile studio controls have 44px primary touch targets, 16px fields, safe-area padding and optional camera controls with Escape/focus return. The same `Studio3D` component supports main and fullscreen views. Studio tabs complete touch activation on pointer-up: an immediate tap after an orbit must not depend on a browser-generated mouse event. Scrolling cancels the pointer, preserving normal page panning. The skip link moves offscreen by its own height, so enlarged Albanian text cannot cover the header. Natural is first in `colors`, so initial renderer/fallback colors match the Natural default; the showroom uses `initialDesign.color`. Explicit saved choices and finished-stock availability are unchanged.

The historical `qa/mobile_workspace_checks.py` covers the earlier fixed-height workspace; use the current phone scripts above for layout acceptance. It also covers fresh Natural designs across all five families, first-screen quote/front/back access, independently scrolling controls, text/logo touch dragging, undo/redo, upload/copy, camera tools, editor expansion, fullscreen/focus return, original photos, 2000px two-sided exports, quote handoff, Albanian and seven viewport sizes. `qa/text_resize_checks.py` includes EN/SQ artwork controls at 200% text. All browser QA uses an isolated local Worker; no customer requests are submitted by this layout suite.

`qa/mobile_site_checks.py` traverses the 32-page outline on a touch-enabled 390px browser and key routes at 320px/768px. It checks horizontal overflow, menu touch targets and quote navigation, text-input font size, touch rotation and the designer in short landscape views. `KOBAGS_MOBILE_FIRST=1` runs the existing guest journey from a 390px touch-enabled context, including the entire demo order and reorder. These emulate mobile browsers; they are not physical iOS/Safari or Android-device certification.

### Content and integration boundaries

No real messages, payments, ERP/CRM actions or manufacturing jobs are sent. Notifications live in a preview outbox. The isolated demo API stores synthetic records; the robots and sitemap routes serve public search directives. Certificate entries can demonstrate review state; changing a demo approval field does not verify an issuer or validate a real claim. Six journal articles are proposed rewrites of the original structure, not migrated editorial approval. `components/journal-index.tsx` and `components/journal-article.tsx` render those articles with EN/SQ text from `lib/journal-sq.ts`; the language follows the server-rendered URL. Each article has its own client photograph, with source hashes recorded in `docs/journal-article-media-sources.json`. `components/product-catalog.tsx` owns the detail gallery and its accessible close-up dialog; it preserves keyboard navigation, zoom state and return focus on close.

Feature-detected WebMCP draft tools are implemented in the context provider. Standard interaction works when the browser lacks the API. Protocol execution has not been verified in a supporting browser; do not advertise tool compatibility as certified.

## Verification

```sh
npx tsc --noEmit
npm run build
python3 -m venv .venv
.venv/bin/pip install playwright pillow
.venv/bin/python -m playwright install chromium
.venv/bin/python qa/browser_journey.py
.venv/bin/python qa/site_checks.py
.venv/bin/python qa/studio_checks.py
.venv/bin/python qa/showcase_checks.py
.venv/bin/python qa/final_buyer_regressions.py
.venv/bin/python qa/final_buyer_edge_checks.py
.venv/bin/python qa/inquiry_retry_checks.py
.venv/bin/python qa/final_studio_regressions.py
.venv/bin/python qa/studio_aspect_checks.py
.venv/bin/python qa/accessibility_checks.py
.venv/bin/python qa/text_resize_checks.py
```

For browser checks, run `npm run start -- --port 8787` after the build and local migration. This serves the compiled Worker at `http://localhost:8787`. The development server supplies mock sign-in identity; use the compiled Worker for real anonymous-session and synthetic-account isolation checks. The tests reject non-loopback URLs and require an empty synthetic owner before any writes. `KOBAGS_BASE_URL` changes the compiled local preview port. `CHROME_PATH` can point to an existing Chromium binary. `CHROME_LIBS` and `FONTCONFIG_FILE` are optional environment-specific overrides. Use `CHROME_NO_SANDBOX=1` only when your local container requires it. `CHROME_SOFTWARE_GL=1` enables the software WebGL renderer for headless 3D checks in a trusted local container. This is a testing option, not a hosted runtime setting or physical-device performance benchmark. Tests create random isolated demo owners; do not run against customer records.

`qa/guest_journey.py` exercises an anonymous browser from design through quote, artwork approval, simulated order and reorder, plus guest isolation and inquiry saves. `qa/browser_journey.py` exercises the full buyer/sales/approval/reorder journey. `qa/site_checks.py` verifies forms, comparison, all pages/downloads, original redirects, owner isolation, concurrent edits, additional release gates and mobile layouts. `qa/studio_checks.py` verifies all five new models, separate artwork styles, numeric entry, pointer movement, upload sharpness, clean exports, mobile layouts and server persistence of the new fields. `qa/showcase_checks.py` covers lazy loading, real rotation, construction mode, branding handoff, offscreen pause, reduced motion, the no-WebGL fallback and representative desktop/mobile page layouts. `qa/premium_polish.py` checks detail photo inspection, Albanian journal navigation and 320px designer controls. `qa/completion_checks.py` covers the complete Albanian buyer journey, unmodified stored designs/custom terms, footer policies, draft reset, certificate dates and real HTTP 404 recovery at 320/390/768px. Result manifests and screenshots are in `evidence/`. Read `evidence/VERIFICATION.md` for the actual completed checks and remaining limits.

## How to extend

1. **Another visual direction:** retain flow/data contracts, change tokens and page components; replace identity assets. Use `docs/DESIGN-HANDOFF.md` as the design brief.
2. **Another product family:** update `catalog.ts`, product validation, preview/template assets, direct detail page behavior and QA. The current mockup map and legacy atlas are five-family-specific.
3. **Production backend:** replace the aggregate with explicit organization, user, RFQ, quote, artwork, approval and order entities. Keep snapshots and version checks. Add authenticated roles before real data.
4. **Real artwork:** add private object storage and original file handling, enforce allowed formats/limits, scan files, generate approved-template previews and use authorized signed downloads.
5. **Messages and integrations:** replace outbox previews with queued/idempotent provider delivery and a delivery log. Connect only after client authorization and sandbox testing.
6. **Production publication:** approve content/policies, verify evidence, configure real customer access and operational services, finish human translation/accessibility review and configure the final canonical domain. Keep demo/order/handoff pages excluded from search. Submit the domain's sitemap in verified Search Console and monitor indexing and field performance.

Technical SEO has local acceptance coverage. Actual index inclusion, rankings, Search Console verification, legal approval, certificate verification, load testing, backup/restore testing and real delivery integration are not represented as completed.

## Layered studio and certificate library

See `docs/STUDIO-AND-CERTIFICATES-16.09.26.md` for the optional layered-artwork data contract, source transcriptions and adopted brief requirements. `qa/studio_layers_certificates.py` checks independent image/text editing, undo/redo, copying, both-face export, persistent request/proof snapshots, invalid coordinates, and certificate search/zoom/original downloads at desktop and mobile widths. Run it with the same local browser environment as the other QA scripts. The clean source ZIP now includes the `tests` directory.

### Direct 3D artwork editing — 16 September 2026

The scene raycasts the nearest visible mesh face and tests the pointer against rotated artwork bounds in its UV coordinate space. Artwork dragging captures the pointer, disables orbit controls and preserves the grab offset; empty space deselects artwork and remains available for orbit rotation. Mouse, pen and touch share this path. Front and back use mirrored surface mappings. Selecting a visible opposite face changes the editing side without snapping the camera. The existing x=24–76 / y=33–80 placement contract remains in force.

`Studio3D` bridges selection and movement through `placementPatch`; both normal and fullscreen scenes share the persisted draft. Callback refs avoid reconstructing the scene on each edit. Face textures allocate their final 1024 × 1024 size before the first render, so asynchronously loaded logos also display after a saved-draft refresh. WebGL texture dimensions must not change after initial allocation. Selection guides appear only in interactive textures; clean exports still use the unchanged artwork painter. A drag is one history transaction, including pauses. Keyboard arrows move the selected layer; Escape deselects it, then arrows rotate the camera. WebGL fallback passes the same editing callbacks to the flat preview.

`qa/studio_direct_drag.py` covers independent layers/faces, mouse and touch movement, gesture undo/redo, keyboard controls, back-face selection without a camera jump, fullscreen editing, guide-free exports, responsive widths and the client-requested lime header logo. Header recoloring uses the original transparent logo as a CSS mask clipped to KO and GROUP (`app/compact.css`), with BAGS kept navy.

## Nationwide search coverage — 3 October 2026

- `/bags-kosovo` and `/sq/bags-kosovo` provide a single substantive national buying guide: bag selection, artwork, minimum quantity and transport details, with all 38 municipalities in an accessible native disclosure. Towns and villages within each municipality are explicitly included. No duplicate city landing pages or fictional branches.
- Home and footer links make this guide discoverable; contact links connect it to the inquiry journey. Homepage metadata naturally covers custom bags in Kosovo and Albanian “qese dhe çanta me logo”. Keep the “Made in Kosova” brand line.
- `lib/company.ts` is the source for published business identity and municipality names. Contact address, phone and email were checked against https://kobags-group.com/ on 3 October 2026. The published street is Magjistrale Prishtinë–Ferizaj; no street number, postal code, coordinates, hours or visitor office has been invented.
- Municipality list checked against the Kosovo Agency of Statistics geo02 table: https://askdata.rks-gov.net/pxweb/en/ASKdata/ASKdata__Geographical%20data/geo02.px/ . Drenas is displayed alongside Gllogovc. National `Organization.areaServed` and the guide's `Service` coverage describe the business market, not a physical office in each city. The page invites inquiries and asks buyers to confirm transport terms.
- Sitemap now contains 48 EN/SQ URLs; self-canonicals and reciprocal language alternates come from the same SEO registry. No query-based or municipality-specific duplicates are indexed.

### Search launch actions requiring business account access

Technical readiness is not proof of Google indexing or ranking. Search Console ownership, URL inspection and Google Business Profile ownership were not available or verified in this work.

1. Launch the accepted website on the company's chosen long-term domain. Current canonical remains `https://kobags.itdks.tech`; do not silently canonicalize to the older company website. When the approved move happens, change `SITE_ORIGIN`, retain URL paths and 301 redirect old equivalents to the new canonical URLs.
2. Verify the final domain in Google Search Console, submit `/sitemap.xml`, inspect `/`, `/sq`, `/bags-kosovo` and `/sq/bags-kosovo`, then monitor indexing reports. Sitemap submission and indexing requests do not guarantee inclusion or rankings.
3. Claim/verify the real Kobags Google Business Profile. Use the accurate business category, address/map pin, phone, website, opening hours and original factory/product media. Do not create profiles for cities without actual eligible locations. Request honest customer reviews without incentives.
4. Measure impressions/clicks by query and landing page. Review Albanian searches such as “qese me logo”, “çanta me shumicë” and “prodhues qesesh”, plus Kosovo/city terms, and English custom/non-woven/wholesale bag searches. Use actual Search Console data to decide future content, not repeated keyword lists.

Google's local ranking guidance: https://support.google.com/business/answer/7091 . Local results depend on relevance, distance and prominence. No promise of first place or appearance for every city/query is made. The quote/order flow remains a demonstration; this SEO update does not connect manufacturing, payments or outgoing email.
