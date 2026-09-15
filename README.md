# Kobags Group — Bag Studio

A private, persistent B2B sales demonstration built with the supplied audit and the original Kobags brand assets.

## Run locally

Requires Node 22.13 or newer. Install the locked dependencies with `npm ci`.

1. Run `npm run db:generate` only when changing the database schema. The initial migration is already included.
2. Run `npm run build` to create the local Worker configuration.
3. Apply the included migration once:
   `node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_burly_prodigy.sql`
4. Run `npm run dev`; use the URL printed by the server, normally `http://localhost:5173`.

`npm run start` previews the compiled Worker. Private Sites hosting uses the project identity in `.openai/hosting.json` and applies the generated migration during deployment.

## Demonstration walkthrough

1. In the studio, choose D-Cut → Large, pick a color and add a logo or brand text. Move/resize the design and download the preview.
2. Choose **Get a quote for this bag**. Follow the four steps with 5,000 bags, Kosovo/Prishtina and fictional company details.
3. Submit. The resulting request ID identifies the same immutable configuration in both workspaces.
4. Open **Sales demo**, assign an owner and add a note. In **Quotation**, issue a fictional quote.
5. In **Artwork**, issue a proof from the buyer's design.
6. Open **Customer demo**, accept the quotation and request an artwork correction.
7. Return to Sales, issue a revised proof, then approve that specific revision in Customer.
8. Sales → **Timeline** → create the production handoff. The server requires accepted quotation, latest artwork approval and any payment condition.
9. Customer → **Timeline** → request the same bags again. The new RFQ keeps specifications but starts without previous commercial terms.
10. Sales → **Catalog & content** demonstrates description publishing without changing past request snapshots. **Preview outbox** shows unsent notifications; **Activity** offers export/reset.

## Verification

`npx tsc --noEmit` checks types. `qa/browser_journey.py` uses Python Playwright and a Chromium installation to exercise the connected journey in a unique isolated test owner. Configure `CHROME_PATH`, `CHROME_LIBS`, `FONTCONFIG_FILE`, and `KOBAGS_BASE_URL` as needed. The test writes visual evidence and a result manifest into `evidence/`.

See `docs/RESEARCH-AND-DEMO.md` for sources, limitations and client decisions. The design preview is illustrative and the demo is not production-ready. No real messages, payments or manufacturing orders are sent.
