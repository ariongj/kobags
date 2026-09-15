# Kobags Group — redesign research and demo scope

Reviewed 15 September 2026. The supplied audit and implementation brief are reference inputs; the user explicitly selected a working demo and emphasized a buyer-facing bag designer with logo placement and product preview.

## Direction

The full brand homepage opens at `/`; the dedicated interactive design landing page is at `/design`. It connects product choice, logo placement and an indicative preview to a structured quote request. The original Kobags logo, navy/green identity, product photographs, manufacturing photographs, printing video and certificate scans are retained.

The studio uses a separately generated, unprinted bag illustration so the buyer's logo does not overlap lettering in the original catalog photography. It is explicitly labeled illustrative; real shape, colors, dimensions and print area require production approval. It is not presented as a Kobags product photograph or approved dieline.

## What the public review confirmed

- The public HTML is an application shell with an empty root. Its title is `Kobags-Group`; its description refers to `KoBagShop`.
- The public JavaScript confirms the FAQ minimum of 5,000 bags.
- Public catalog data and product image URLs expose the five bag families and specification variants used here.
- Existing factory photographs, video and certificate scans are available. They have been retained rather than replaced with invented manufacturing evidence.
- The attached audit documents lost D-Cut selections, a looping `/shop-catalog` CTA, generic metadata and a sitemap returning HTML. The demo fixes the affected journey through explicit catalog redirects and preserved configuration. The original site's backend and live form delivery were not tested.

## Relevant industry patterns

- [Paolo Sandro non-woven bags](https://paolosandro.de/en/taschen/non-woven-bag-without-lamination/) presents minimum quantity, material and delivery guidance close to a quote request.
- [Dinilu product configuration](https://dinilu.de/en/sacks-and-bags/non-woven-bags/pp-non-woven-bag-41x30x9cm) combines print options, quantity and destination in the buying flow. Its pricing is specific to its own business and was not reused.
- [VYGR non-woven manufacturing](https://vygrbags.com/non-woven-bags-production) organizes the buyer brief around shape, material, printing and quantity.

These are useful interface patterns, not evidence of conversion performance or Kobags capabilities.

## Implemented

- Full brand homepage and dedicated `/design` landing page.
- Five-family catalog with all 15 source-backed size variants, filtering and three-product comparison.
- Six rewritten journal articles retaining the original slugs, complete legacy URL map and downloadable design/code handoff.
- Live front/back bag illustration, colors, text, PNG/JPG/WebP logo upload, logo drag, keyboard movement, resizing, rotation, centering, and downloadable concept image.
- Four-step RFQ with local draft preservation, English/Albanian studio and quote labels, translated key validation errors, quantity guidance and destination/company capture.
- Server-validated RFQs with immutable configuration snapshots, stable IDs, idempotency and atomic updates.
- Persistent private demo records in Cloudflare D1, scoped to the authenticated hosting user. Local preview has a loopback-only demo identity fallback.
- Sales request filtering/search, assignment, notes, stages, business-hour overdue filter, fictional quote revisions, artwork revisions, guarded production handoff and sequential simulated production updates.
- Customer quotation acceptance/change requests, artwork correction/approval, version history and repeat RFQs requiring fresh commercial terms.
- Sample, partner and contact inquiries; partner model and target market capture.
- Demo catalog description drafts/publishing, commercial display rules, evidence/guide wording drafts/publishing, activity log, export and synthetic reset.
- Original factory evidence and user-controlled video; readable scoped certificate references with scan downloads.
- Meaningful supporting industry, resource, material and demo policy pages; real 404s; legacy product/contact/partner redirects; demo-wide noindex and blocked crawling.
- Optional browser WebMCP hooks to inspect and configure an unsent design draft; gracefully absent in unsupported browsers.

## Deliberately simulated or limited

- Bag images in the designer are illustrative renderings, not physical color samples or manufacturing templates. Both sides use the same indicative shape.
- Prices, payment conditions, production and dispatch statuses are fictional demonstration data. No real payment is handled.
- Notifications are saved to a preview outbox; no email, WhatsApp or other message is sent.
- Customer and sales persona switching demonstrates one private owner workspace. It is not production employee/customer authorization or a multi-company portal.
- The database persists demonstration records. The draft remains browser-local. Up to 12 RFQs and 30 secondary inquiries are supported per demo workspace, with a bounded total payload.
- Logo uploads are normalized into small raster previews. Full-resolution original files, scanning, private artwork object storage and signed download links remain production work.
- Catalog editing demonstrates descriptions and publishing. Full SKU/image/SEO editing and certificate administration are not a production CMS replacement.
- Business hours are Monday–Friday 09:00–17:00 UTC; the response target is configurable. No public response-time promise is made.
- Core buyer flow is bilingual; secondary editorial pages and most administration copy remain English. Human review of Albanian is still needed.
- The database is a compact typed aggregate per owner with revision-based concurrency control; production relational entity migration is a separate implementation decision.

## Not connected

Live Kobags forms/systems, CRM, ERP, Kraken.os, production scheduling, shipping/carrier APIs, inventory, accounting, analytics and advertising tags. No production authentication/tenant onboarding, real offers, real order fulfillment, real email delivery, or certificate issuer verification is claimed.

## Client decisions before launch

1. Approved production bag images, dimensions, shape drawings and print templates.
2. MOQ scope and exceptions; color and print capabilities per product.
3. Prices, setup/tax/shipping, payment terms, samples and dispatch capacity.
4. Legal entity, policies, processors, retention and customer-data ownership.
5. Certificate issuer/entity/scope/dates, verification links and approved downloads.
6. Material/recycled content declarations, environmental evidence and customer-logo permissions.
7. Target languages/markets and human copy review.
8. Existing sales/production systems and available integrations.
9. Production roles, customer isolation, rate limits, file scanning, backups and restore validation.
10. Preferred production host, client review of the rewritten six-article journal and retained original slugs, indexable metadata, canonical XML sitemap and monitoring. This private demo intentionally blocks indexing; no production SEO results are claimed.
