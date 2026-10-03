# Kobags CMS — operation and handoff

Updated 3 October 2026. This document describes the shared CMS added alongside the existing visitor demonstration. The two databases/workflows remain separate. Local acceptance uses synthetic records only; those records are not deployed.

## First administrator

Open `/cms` and sign in with the ChatGPT account whose email is `info@itdks.tech`. Select **Set up administrator workspace**. The server binds the first administrator to that authenticated user ID and imports the existing catalogue and content without overwriting subsequent edits. A different email cannot claim this account. No invitation or email has been sent automatically.

The deployment has `CMS_BOOTSTRAP_EMAIL` and `CMS_NOTIFY_EMAIL` configured to this address. Staff invitations are single-use links, expire after seven days, and must be accepted with the invited email. After acceptance, authorization uses the authenticated user ID. Only administrators manage staff. Disable membership to revoke API access. The owner cannot disable themselves through the interface.

## Publishing and content

- **Bag catalogue:** five existing studio families; English/Albanian names and descriptions, dimensions, GSM, enabled sizes, colors, minimum order and maximum print colors. Save a draft, then Publish. The catalogue, designer choices and live request validation share published values. Submitted requests retain the original specification.
- **Website pages:** imported sections and metadata. Keep the existing website layout enabled to preserve the designed page. This publishes search metadata; edit existing visible text through Website wording. Disabling that option replaces the page with its translated structured sections. Interactive studio/quote/private routes are reserved.
- **Website wording:** 221 original bilingual text pairs grouped into nine records. Edit the text while keeping its original mapping. Publishing changes the matching existing copy without replacing its layout.
- **Journal, resources, FAQs and certificates:** translated drafts, public publication, history and rollback. Existing certificate records update their original cards. Verify issuer information and scans before changing certificate claims. New certificate entries appear separately. Structured guides can have their own public path or link to a document.
- **Municipalities:** all 38 source municipalities are retained. Publishing a record adds its localized buying guidance to that municipality in `/bags-kosovo`; this does not invent a physical branch or generate near-identical city pages.
- **Campaigns:** translated message and optional link, page targeting and start/end times. Dates are normalized to UTC. Campaigns do not appear in the designer, quotation, private review or CMS surfaces.
- **Media:** 68 supplied/source assets indexed, uploads with format and size checks, English/Albanian descriptions, and duplicate detection. Public images/documents/videos use `/api/media/{id}`. Published structured sections render images, MP4 players and PDF links according to their stored format. Private artwork is linked to an inquiry and checked on every read. Stored files and historical references are retained; destructive media cleanup is deliberately not exposed in this version.
- **SEO:** page titles/descriptions, canonical and language alternates, dynamic sitemap inclusion, and 301 redirects when a published page path changes. Source-backed routes remain available when their CMS override is unpublished. Google ranking, indexing and Search Console verification are external actions, not guaranteed by these controls.

The structured preview shows draft text and images; verify video playback on its published page. It is not a full unpublished rendering of the original custom layout. Save/Publish is explicit, and stale revisions are rejected to avoid overwriting another editor. Leaving an edited content record prompts about unsaved changes. Original source-backed page content is retained when overrides are unpublished.

## Receiving real inquiries

Real shared-inbox handling is **off by default**. Before enabling it:

1. Confirm the client's approved catalogue, contact details, privacy notice, retention responsibilities and commercial terms. Existing public policy text still describes the demonstration until the client publishes its replacement through Website pages.
2. Invite the people who will handle inquiries and verify their access.
3. In Business settings, enable **Accept real inquiries in the shared inbox**, save the draft and publish.

The same public quote, sample, contact and partner forms then write to the shared inbox. Without activation, existing isolated demonstration behavior is preserved. A receipt says the request is saved; it does not claim an email, payment or production order was sent. Customer details, front/back designs, specification, language and consent acknowledgement are captured. Browser-owned receipts remain private. The session cookie is not a general customer account.

Original high-resolution artwork is uploaded separately by authorized staff as a private file. Browser studio logo previews are normalized images, not production originals. File signatures, MIME and size are checked; malware scanning is not connected. The 3D model remains an illustrative, photo-textured geometry; approved physical print templates and materials remain factory inputs.

## Inquiry to production

1. Assign the inquiry, priority and follow-up date; add internal notes.
2. Sales creates a quotation revision with quantity, euro prices, terms, delivery and expiry. Values are stored as integer cents to avoid rounding drift. The server calculates the total. A manager/administrator issues it. Print / save PDF opens a clean quotation in the inquiry language without internal notes.
3. The designer uploads a private production file under Media, linked to the inquiry, then adds an artwork revision with its dimensions and technical review.
4. Create a private customer review link, valid for 14 days. Creating a replacement revokes the earlier link. The customer reviews and approves or requests changes against the exact quotation/artwork ID and fingerprint. Authorized staff can record externally received written approval with evidence.
5. Release requires the latest approved quotation and artwork, unexpired commercial terms, and a recorded payment condition/reference. This records an internal handoff; it does not collect money or start a factory machine.
6. Progress through Ready → Production → Quality → Dispatch-ready → Dispatched → Closed. New revisions block progression. A manager can explicitly release a newer approved specification after recording that production has stopped and payment terms were rechecked. The previous release stays in audit history; dispatched/closed orders cannot be re-released.

## Roles

| Role | Access |
| --- | --- |
| Administrator | All modules, settings, staff and full backups |
| Editor | Catalogue/content publication and public media |
| Sales | Inquiries, companies, quotation drafting and email outbox |
| Designer | Inquiries and private artwork/media |
| Manager | Inquiries, quotations/approvals, production and reports/audit |
| Production | Released files and production stages |

Every API operation checks membership and permissions independently of the interface. Customer links expose only their permitted documents and statuses, never internal notes. Production staff can download only released artwork through the private-file check.

## Email

The Resend adapter and outbox are implemented. Sending is **not connected** until an operator sets a verified `CMS_EMAIL_FROM` and secret `CMS_EMAIL_API_KEY` in Sites runtime configuration. No API key is included in source. Check domain verification, sender rights and delivery before using it with customers.

Notification messages are queued when inquiries arrive. Sales can prepare a quotation email in the customer's language. A staff member reviews the recipient/body and explicitly sends from the outbox. There is no automatic sending scheduler. Failed delivery does not lose the inquiry. Retries use the same idempotency key, are capped, and older uncertain messages require provider-log review. “Sent” means the provider accepted the request, not that the recipient read it. Bounce/webhook tracking is not configured.

## Backups and recovery

Administrator → Activity & backups offers:

- **Database JSON:** a transactionally consistent snapshot of content, inquiries, companies, versions, approvals, orders, media metadata, audit and outbox.
- **Full backup with uploads:** streamed TAR containing `backup.json` plus every uploaded R2 object referenced in that snapshot (up to 500 uploaded objects per download). Original `/assets/` media are included in the reusable website source/media bundles instead of duplicated inside each backup. Larger collections need an operator-managed bucket export.

Both exports exclude authentication credentials, staff invitations and customer access-link hashes. Protect downloaded backups as private business data. Backups are manual; no scheduled external backup or retention policy is configured.

Restore into **new, empty local paths**:

```sh
python3 scripts/restore-cms-backup.py backup.json recovered.sqlite
python3 scripts/restore-cms-backup.py kobags-cms-full-backup.tar recovered.sqlite recovered-files
```

The full restore verifies each object's size and SHA-256 checksum and checks SQLite integrity. It refuses existing targets and arbitrary archive paths. Source media, deployed source version and runtime configuration must be retained separately. Staff access must be re-established and private review links reissued after recovery. Outbox messages require delivery review; recovery does not send emails. Moving this verified recovery into the live D1/R2 deployment is an operator task, not an overwrite button.

## Runtime and verification

Logical bindings: `DB` (D1), `BUCKET` (R2). Apply Drizzle migrations in order, once per database; never execute runtime CREATE TABLE. New CMS migrations preserve `demo_workspaces`. A copied project must provision its own bindings and authenticate behind a trusted proxy that strips untrusted `oai-authenticated-*` headers. The local Wrangler port is for isolated development and must not be exposed publicly with synthetic authentication headers.

Acceptance: `qa/cms_checks.py` uses synthetic identities against a local compiled Worker only. It covers access, publishing, stale saves, redirects, all inquiry types, idempotency, immutable versions, private files, approval/release gates, mobile layouts, print output and backup recovery. It must not run against the public customer site. Existing SEO, copy, buyer and 3D regression suites remain applicable.

## Explicit remaining operational work

Client-approved policies and commercial inputs; first administrator sign-in and team invitations; verified email service; activation of real inquiries; scheduled backup/retention arrangements; original-artwork malware scanning if required; final business-domain/Search Console and Google Business Profile access. Existing source media replacement throughout custom layouts and new physical bag geometry still require development. There is no ERP, inventory, payment checkout, automated shipping or machine integration.
