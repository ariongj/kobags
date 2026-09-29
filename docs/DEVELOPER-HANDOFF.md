# Kobags Group — code and setup handoff

Revision: 29 September 2026. This is a public demonstration with a persistent, visitor-isolated data flow. It is not connected to Kobags production systems.

## Quick start

Requires Node 22.13+ and npm. The included lockfile preserves the installed package versions.

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

Existing demo records, credentials, provider configuration, Git history, installed dependencies and compiled output are excluded from the ZIP. Lossless PNG test captures and generated concept-download PNGs are omitted to keep the source download compact; the included checks regenerate them. Latest JPEG review images and all result manifests are included. The source bundle contains a small `SOURCE-MANIFEST.json` describing these omissions. Proprietary brand assets are not licensed for unrelated projects.

## Stack and source map

- TypeScript / React 19, Next-compatible App Router through Vinext.
- Cloudflare Worker for rendering and `/api/demo`.
- Cloudflare D1 through logical binding `DB`.
- Drizzle schema/migration; prepared D1 queries at runtime.
- Canvas 2D for precise artwork placement, shared artwork textures and PNG export.
- Three.js for the lazily loaded homepage showroom and the five-family 3D designer.
- Local storage for unfinished design, quote step and locale.
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
app/api/demo/route.ts     Owner lookup, persistence, concurrency, errors
components/demo-store.tsx Client read/write hook and translated core errors
components/kobags-context.tsx Browser draft, locale, optional WebMCP
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

The browser accepts PNG/JPG/WebP up to 5MB and 8000px per dimension. It tries WebP preview edges of 1024, 768, 512 and 320 at quality 0.94, retaining the largest candidate at or below 100,000 data-URL characters. Original files are not retained. Each side keeps its own logo/name, text, font, alignment, color, position, scale and rotation.

`components/bag-preview.tsx` waits for all required images before composing an offscreen buffer. Only the latest render writes to the visible canvas, preventing overlapping asynchronous draws. Image and tinted-layer caches are bounded. The main canvas renders at 1600px square; selector tiles use 320px. The five neutral WebP images and alpha silhouette bounds are mapped in `lib/studio-artwork.ts`. Runtime tinting keeps luminance and alpha detail. Text fits proportionally, and logos retain their aspect ratio. The artwork overlay is clipped to the illustrative bag silhouette, not an approved print zone.

Pointer movement retains the initial grab offset; arrow keys move by 1% (Shift: 5%). Editable numeric fields accept incomplete input and clamp on blur. Selection guides remain editor-only. Exports render a separate clean canvas and add a specification footer, yielding a 1600 × 1820 PNG.

`previewVersion: "v4"`, typeface/alignment fields, `backLogoName` and `backInk` are optional validated JSON fields. New browser drafts use v4; saved snapshots lacking that version use the original atlas geometry. No D1 schema migration is required. Existing saved snapshots remain unchanged. Preserve the old atlas until historic snapshots no longer need it. See `docs/studio-asset-note.md` and the exact prompt manifest for provenance.

Use approved per-variant print templates, original-file storage, file validation/scanning and controlled downloads before taking production artwork. Do not derive millimetre-accurate placement from the current percentage-based illustration.

### Compact five-family 3D designer

`components/studio-3d.tsx` lazy-loads `lib/studio-scene.ts` when the 3D view mounts. The 3D view opens by default. Each of the five families has separate front and back meshes/materials, fabric-textured side gussets and base, and handle or closure geometry. D-Cut and T-Shirt have physical handle openings with shaped inner edges; the drawstring body narrows toward its closure. The String photo crop is cleaned inside the runtime material painter so its photographed cord does not compete with the modelled cord. Shaped faces are tessellated before deformation so they bulge across the panel rather than only at the outline. Handle and Box have recessed mouths with inner walls and floor. The front material uses a crop of the matching supplied product photograph; the back uses a different unprinted crop with edge shading because no clean rear photos were supplied. A nearby fabric crop textures the sides and handles. Artwork is mapped to both curved face meshes. This is a rotatable, volumetric illustration based on a single photo per family, not a scanned object or production CAD. Catalogue size selection updates the specification, not approved physical geometry. The scene has no additional dependency beyond the existing Three.js install.

`renderArtworkTexture` in `components/bag-preview.tsx` shares the artwork painter with the flat renderer. It returns a transparent 1024px canvas plus logical artwork bounds for each face, preserving independent text/logo placement, rotation, ink, alignment and image aspect ratios. `renderBlankBagTexture` supplies the colorized source photograph. The 3D scene crops its front panel, rear material sample and a smaller cloth patch from that canvas; keep all crop coordinates in `lib/studio-scene.ts` aligned if replacing an asset. Natural T-Shirt uses `studio-real-t-shirt-natural.png` directly; natural Handle and Box retain their source photo colors. Other colors use the runtime tint and remain indicative. Revision tokens discard stale asynchronous results. Only a family change reconstructs the scene; editing updates material colors and existing textures. The established draft/RFQ/proof contracts and PNG exports are unchanged. Both 3D and the flat **Photo + artwork** view support direct placement. `docs/studio-real-photo-sources.json` maps each blank cutout to its source.

OrbitControls supports drag and keyboard rotation. Dedicated controls provide rotation, zoom, reset and spin. Front/back changes align the view. The untouched default bag starts a slow spin to show that the view rotates; selecting artwork, dragging, using a control, or entering editing mode stops it. Saved designs do not auto-spin, and reduced-motion users receive a still view. Pixel ratio is capped at 1.8; rendering settles after interaction and pauses offscreen or when the document is hidden. Cleanup disposes controls, geometry, materials, textures, observers, listeners and renderer. WebGL initialization/context failure exposes a usable flat fallback without discarding the draft.

The compact rules live at the end of `app/brand-refresh.css`, scoped to `.kobags-v5 .studio-compact` so earlier brand rules cannot reintroduce large headings and padding. Desktop controls scroll internally with the quote action below; mobile stacks the canvas and controls with no sticky element over the form. Only the selected Logo/Text controls are shown; precision coordinates are expandable. This compactness convention should guide future extensions.

`qa/studio_3d_checks.py` exercises distinct families, real camera movement, live artwork on both faces, mode switching, downloads, fullscreen, responsive layouts, reduced motion and the no-WebGL fallback. Use `CHROME_SOFTWARE_GL=1` for headless environments without a GPU. This does not measure performance on a physical phone.

### Homepage 3D showroom

`components/bag-showcase.tsx` uses IntersectionObserver with a 250px margin to import `lib/bag-scene.ts` near the viewport. That separate chunk contains Three.js and OrbitControls. It creates no server-side WebGL context. The model is authored as geometry in code: curved front/back panels, side folds, base, ribbon handles, reinforcement patches and seams. A deterministic canvas bump texture provides fine fabric detail; another canvas texture applies the current brand text. A soft procedural contact shadow avoids expensive shadow-map passes.

The scene exposes color, text, rotation, front/back/reset, pause/play and construction controls. Construction interpolates the relative component positions and overall scale; reduced-motion users receive the end state without the transition. Auto-rotation starts disabled for reduced-motion users, while explicit Play remains available. Pointer interaction pauses automatic rotation. Vertical touch panning remains available for page scrolling.

The renderer caps pixel ratio at 1.75 and stops its animation loop when the section is out of view or the document is hidden. It releases geometries, materials, textures, observers, event listeners and the renderer on cleanup. Context loss and initialization failure expose the existing 2D renderer as a functional fallback. Rotation controls are disabled in that fallback; color/name selection and continuation still work.

The showroom is a local presentation state until the visitor chooses Continue. That action writes the selected Handle Small, color, text, ink, sans typeface and centered placement into the existing synchronous browser draft, then navigates normally to `/design`. It does not create an RFQ or perform a server write.

The 3D model is illustrative and independent of the v4 generated images. It is not a product-specific CAD asset or manufacturing instruction. Approved geometry, physical material references and all variant models remain production inputs. Three.js [documentation](https://threejs.org/docs/) is the API reference; `package-lock.json` records the installed version.

### Compact site and mobile navigation

`app/compact.css` is imported last in the root layout. It sets the shared spacing rhythm, smaller public-page openings, catalog/image heights, form gaps, mobile text-input sizes and compact footer treatment. It also retains the studio-specific density and increases mobile 3D tool hit areas. The phone preview is 350px tall and the decorative 360° badge is hidden at 320px so camera tools fit inside the stage. Tablet factory reels use two columns. The mobile menu includes a quote action, 44px navigation rows, viewport-constrained scrolling and Escape-to-close with focus returned to the opener.

`qa/mobile_site_checks.py` traverses the 32-page outline on a touch-enabled 390px browser and key routes at 320px/768px. It checks horizontal overflow, menu touch targets and quote navigation, text-input font size, touch rotation and the designer in short landscape views. `KOBAGS_MOBILE_FIRST=1` runs the existing guest journey from a 390px touch-enabled context, including the entire demo order and reorder. These emulate mobile browsers; they are not physical iOS/Safari or Android-device certification.

### Content and integration boundaries

No real messages, payments, ERP/CRM actions or manufacturing jobs are sent. Notifications live in a preview outbox. The only site API is the isolated demo API. Certificate entries can demonstrate review state; changing a demo approval field does not verify an issuer or validate a real claim. Six journal articles are proposed rewrites of the original structure, not migrated editorial approval. `components/journal-index.tsx` and `components/journal-article.tsx` render those articles with EN/SQ text from `lib/journal-sq.ts`; the language follows the shared browser preference. Each article has its own client photograph, with source hashes recorded in `docs/journal-article-media-sources.json`. `components/product-catalog.tsx` owns the detail gallery and its accessible close-up dialog; it preserves keyboard navigation, zoom state and return focus on close.

Feature-detected WebMCP draft tools are implemented in the context provider. Standard interaction works when the browser lacks the API. Protocol execution has not been verified in a supporting browser; do not advertise tool compatibility as certified.

## Verification

```sh
npx tsc --noEmit
npm run build
python3 -m venv .venv
.venv/bin/pip install playwright
.venv/bin/python -m playwright install chromium
.venv/bin/python qa/browser_journey.py
.venv/bin/python qa/site_checks.py
.venv/bin/python qa/studio_checks.py
.venv/bin/python qa/showcase_checks.py
```

For browser checks, run `npm run start -- --port 8787` after the build and local migration. This serves the compiled Worker at `http://localhost:8787`. The development server supplies mock sign-in identity; use the compiled Worker for real anonymous-session and synthetic-account isolation checks. The tests reject non-loopback URLs and require an empty synthetic owner before any writes. `KOBAGS_BASE_URL` changes the compiled local preview port. `CHROME_PATH` can point to an existing Chromium binary. `CHROME_LIBS` and `FONTCONFIG_FILE` are optional environment-specific overrides. Use `CHROME_NO_SANDBOX=1` only when your local container requires it. `CHROME_SOFTWARE_GL=1` enables the software WebGL renderer for headless 3D checks in a trusted local container. This is a testing option, not a hosted runtime setting or physical-device performance benchmark. Tests create random isolated demo owners; do not run against customer records.

`qa/guest_journey.py` exercises an anonymous browser from design through quote, artwork approval, simulated order and reorder, plus guest isolation and inquiry saves. `qa/browser_journey.py` exercises the full buyer/sales/approval/reorder journey. `qa/site_checks.py` verifies forms, comparison, all pages/downloads, original redirects, owner isolation, concurrent edits, additional release gates and mobile layouts. `qa/studio_checks.py` verifies all five new models, separate artwork styles, numeric entry, pointer movement, upload sharpness, clean exports, mobile layouts and server persistence of the new fields. `qa/showcase_checks.py` covers lazy loading, real rotation, construction mode, branding handoff, offscreen pause, reduced motion, the no-WebGL fallback and representative desktop/mobile page layouts. `qa/premium_polish.py` checks detail photo inspection, Albanian journal navigation and 320px designer controls. Result manifests and screenshots are in `evidence/`. Read `evidence/VERIFICATION.md` for the actual completed checks and remaining limits.

## How to extend

1. **Another visual direction:** retain flow/data contracts, change tokens and page components; replace identity assets. Use `docs/DESIGN-HANDOFF.md` as the design brief.
2. **Another product family:** update `catalog.ts`, product validation, preview/template assets, direct detail page behavior and QA. The current mockup map and legacy atlas are five-family-specific.
3. **Production backend:** replace the aggregate with explicit organization, user, RFQ, quote, artwork, approval and order entities. Keep snapshots and version checks. Add authenticated roles before real data.
4. **Real artwork:** add private object storage and original file handling, enforce allowed formats/limits, scan files, generate approved-template previews and use authorized signed downloads.
5. **Messages and integrations:** replace outbox previews with queued/idempotent provider delivery and a delivery log. Connect only after client authorization and sandbox testing.
6. **Production publication:** approve content/policies, verify evidence, configure real customer access and operational services, implement translations and accessibility fixes, create canonicals and an XML sitemap, then deliberately remove demo noindex/robots restrictions.

No production SEO, legal approval, certificate verification, load testing, backup/restore testing or real delivery integration is represented as completed.

## Layered studio and certificate library

See `docs/STUDIO-AND-CERTIFICATES-16.09.26.md` for the optional layered-artwork data contract, source transcriptions and adopted brief requirements. `qa/studio_layers_certificates.py` checks independent image/text editing, undo/redo, copying, both-face export, persistent request/proof snapshots, invalid coordinates, and certificate search/zoom/original downloads at desktop and mobile widths. Run it with the same local browser environment as the other QA scripts. The clean source ZIP now includes the `tests` directory.

### Direct 3D artwork editing — 16 September 2026

The scene raycasts the nearest visible mesh face and tests the pointer against rotated artwork bounds in its UV coordinate space. Artwork dragging captures the pointer, disables orbit controls and preserves the grab offset; empty space deselects artwork and remains available for orbit rotation. Mouse, pen and touch share this path. Front and back use mirrored surface mappings. Selecting a visible opposite face changes the editing side without snapping the camera. The existing x=24–76 / y=33–80 placement contract remains in force.

`Studio3D` bridges selection and movement through `placementPatch`; both normal and fullscreen scenes share the persisted draft. Callback refs avoid reconstructing the scene on each edit. Face textures allocate their final 1024 × 1024 size before the first render, so asynchronously loaded logos also display after a saved-draft refresh. WebGL texture dimensions must not change after initial allocation. Selection guides appear only in interactive textures; clean exports still use the unchanged artwork painter. A drag is one history transaction, including pauses. Keyboard arrows move the selected layer; Escape deselects it, then arrows rotate the camera. WebGL fallback passes the same editing callbacks to the flat preview.

`qa/studio_direct_drag.py` covers independent layers/faces, mouse and touch movement, gesture undo/redo, keyboard controls, back-face selection without a camera jump, fullscreen editing, guide-free exports, responsive widths and the client-requested lime header logo. Header recoloring uses the original transparent logo as a CSS mask clipped to KO and GROUP (`app/compact.css`), with BAGS kept navy.
