# Kobags Group — complete website and bag studio

A private B2B website demo with the original Kobags identity, cinematic manufacturing homepage, interactive 3D showroom, detailed bag designer, all five product families / 15 sizes, inquiries and connected customer/sales workspaces.

## Start here

- `docs/SITE-OUTLINE.md` — complete structure and pages.
- `docs/DESIGN-HANDOFF.md` — design direction, tokens, page compositions and asset provenance.
- `docs/DEVELOPER-HANDOFF.md` — setup, architecture, API, data rules and extension guide.
- `docs/MIGRATION-MAP.md` — original addresses and new destinations.
- `docs/RESEARCH-AND-DEMO.md` — audit/research context and boundaries.
- `evidence/VERIFICATION.md` — completed checks and remaining limits.
- `/handoff` in the running site — clickable outline, review sequence and downloads.

## Run locally

Requires Node 22.13+. Run `npm ci`, then `npm run build`. For a fresh local database, apply the included migration once:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_burly_prodigy.sql
npm run dev
```

Open the local URL printed by the server, normally `http://localhost:5173`. The complete setup and test instructions are in `docs/DEVELOPER-HANDOFF.md`.

## Review sequence

Homepage → collection → design a bag → quote request → sales quotation and artwork proof → customer approval / correction → sales production handoff → repeat request. Use fictional contact details. Sample, partner and contact inquiries have their own forms and appear in the sales workspace.

The site persists isolated demo records. No real messages, payments or manufacturing orders are sent. The bag preview is an illustration, not a production template. The source download omits the original hosting project ID and all saved records so it can serve as a clean starting point; replace Kobags assets before adapting it for another brand.
