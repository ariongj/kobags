# Kobags Group — code and setup handoff

Revision: 15 September 2026. This is a complete private demo with a real persistent data flow. It is not connected to Kobags production systems.

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

The downloadable ZIP deliberately contains `.openai/hosting.json` with logical `DB` only and **no existing project ID**. Start in a new folder and repository. Replace brand content/assets and register a new Site only when you intend to publish the new project. The original working checkout remains linked to the existing Kobags private Site; it should continue updating that Site, not create duplicates.

Existing demo records, credentials, provider configuration, Git history, installed dependencies and compiled output are excluded from the ZIP. The source bundle contains a small `SOURCE-MANIFEST.json` describing these omissions. Proprietary brand assets are not licensed for unrelated projects.

## Stack and source map

- TypeScript / React 19, Next-compatible App Router through Vinext.
- Cloudflare Worker for rendering and `/api/demo`.
- Cloudflare D1 through logical binding `DB`.
- Drizzle schema/migration; prepared D1 queries at runtime.
- Canvas 2D for the illustrative bag preview and PNG export.
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
app/api/demo/route.ts     Owner lookup, persistence, concurrency, errors
components/demo-store.tsx Client read/write hook and translated core errors
components/kobags-context.tsx Browser draft, locale, optional WebMCP
app/globals.css          Design tokens, component and responsive styling
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

Important responses include 400 for domain/input rejection, 401 for missing hosted identity, 403 for a mismatched supplied Origin, 409 after concurrent-update retry exhaustion, 413 for an oversized request, 415 for non-JSON and 503 for unavailable storage on reads. UI displays translated core errors and preserves browser drafts on a failed submission.

### Ownership and concurrency

Hosted identity comes from `oai-authenticated-user-id`, supplied by private Sites hosting. Local loopback URLs have a `local-demo` fallback; QA uses random synthetic owner values against localhost only. This header must be trusted only behind an authenticating proxy that removes/replaces caller-supplied identity. Do not expose the Worker on an arbitrary public host and treat an unverified incoming header as authentication.

Customer and sales personas share one signed-in owner's demo records. They are **not** separate authorization roles. Before live use, implement verified sessions, organization membership and server-enforced customer/staff permissions.

Updates compare the stored revision and retry at most three times. A second edit rereads the latest state before replaying its action. The server does not silently replace another owner's row. Requests are limited to 12 per workspace, inquiries to 30 and total serialized state to 1.8 million characters. POST bodies are limited to 350,000 characters.

### Navigation compatibility

`components/site-link.tsx` uses standard anchor navigation. The installed Vinext production Link chunk loaded a missing dynamic `navigateClientSide` export, causing clicks to fail while development navigation worked. Standard document links remove that dependency. Product/reorder actions use `window.location.assign`; the context synchronously saves the draft before navigating. This preserves selections and native new-tab/download behavior. A future framework update can restore client transitions only after testing the compiled journey, not just the dev server.

### Artwork

The browser accepts PNG/JPG/WebP up to 5MB, normalizes uploads to small raster previews and saves those previews. Original files are not retained. The canvas uses `studio-bag-atlas.png`, separate transform parameters for each side, approximate tinting and logo/text overlays. Keyboard arrows can move artwork. The downloadable PNG is a concept proof.

Use approved per-variant print templates, original-file storage, file validation/scanning and controlled downloads before taking production artwork. Do not derive millimetre-accurate placement from the current percentage-based illustration.

### Content and integration boundaries

No real messages, payments, ERP/CRM actions or manufacturing jobs are sent. Notifications live in a preview outbox. The only site API is the isolated demo API. Certificate entries can demonstrate review state; changing a demo approval field does not verify an issuer or validate a real claim. Six journal articles are proposed rewrites of the original structure, not migrated editorial approval.

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
```

For browser checks, run `npm run start -- --port 8787` after the build and local migration. This serves the compiled Worker at `http://localhost:8787`. The development server intentionally strips custom identity headers and uses a shared local demo; do not use it for isolated multi-owner QA. The tests reject non-loopback URLs and require an empty synthetic owner before any writes. `KOBAGS_BASE_URL` changes the compiled local preview port. `CHROME_PATH` can point to an existing Chromium binary. `CHROME_LIBS` and `FONTCONFIG_FILE` are optional environment-specific overrides. Use `CHROME_NO_SANDBOX=1` only when your local container requires it. Tests create random isolated demo owners; do not run against customer records.

`qa/browser_journey.py` exercises the full buyer/sales/approval/reorder journey. `qa/site_checks.py` verifies forms, comparison, all pages/downloads, original redirects, owner isolation, concurrent edits, additional release gates and mobile layouts. Result manifests and screenshots are in `evidence/`. Read `evidence/VERIFICATION.md` for the actual completed checks and remaining limits.

## How to extend

1. **Another visual direction:** retain flow/data contracts, change tokens and page components; replace identity assets. Use `docs/DESIGN-HANDOFF.md` as the design brief.
2. **Another product family:** update `catalog.ts`, product validation, preview/template assets, direct detail page behavior and QA. The current canvas atlas is five-family-specific.
3. **Production backend:** replace the aggregate with explicit organization, user, RFQ, quote, artwork, approval and order entities. Keep snapshots and version checks. Add authenticated roles before real data.
4. **Real artwork:** add private object storage and original file handling, enforce allowed formats/limits, scan files, generate approved-template previews and use authorized signed downloads.
5. **Messages and integrations:** replace outbox previews with queued/idempotent provider delivery and a delivery log. Connect only after client authorization and sandbox testing.
6. **Production publication:** approve content/policies, verify evidence, configure real customer access and operational services, implement translations and accessibility fixes, create canonicals and an XML sitemap, then deliberately remove private-demo noindex/robots restrictions.

No production SEO, legal approval, certificate verification, load testing, backup/restore testing or real delivery integration is represented as completed.
