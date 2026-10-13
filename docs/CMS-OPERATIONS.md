# Kobags CMS — operation and handoff

## Launch audit update — 14 October 2026

See `LAUNCH-READINESS-2026-10-14.md` for the current release status and verification. Earlier dated sections describe historical implementation, not current operating instructions. Owner handoff files now live in `deliverables/handoff/` and are not published at `/handoff` or `/documents/*.zip`. Production CMS intake activation is authorized; email delivery remains unconfigured and staff must check the inbox manually. The production-domain cutover is documented in `DOMAIN-CUTOVER-2026-10-14.md`; DNS access and Google Search Console verification remain external launch steps.

## Stock collections and homepage media — 11 October 2026

Open **Stock collections** to edit Thank you / Smiley, or create another category. Complete English and Albanian titles/descriptions, dimensions and at least one stock row. Each row has a GSM, English/Albanian color and availability: In stock, Out of stock, or Confirm availability. Save the draft, then Publish. Out-of-stock rows cannot be ordered; the server also checks stock when a request is sent. Archive a category to remove it from the public collection list. Client-confirmed stock on 12 October: 50 GSM White only; 60 GSM White, Beige, Black and Red. Update availability here whenever stock changes.

Add supplied collection photos through **Media library**, then paste the public path into the collection image field. Under **Business settings → Homepage photos & video**, replace the hero image, printing MP4 or poster using public media paths. Add hero descriptions in both languages. Leave a field blank to retain the current source asset; save and publish changes normally.

Finished-stock requests appear as **stock** in Inquiries, with their immutable specification and quantity. Sales can create a quotation and a private approval link. They do not require customer logo upload or custom artwork approval. The team confirms pricing, availability and delivery; this feature does not reserve or decrement inventory. Real submissions follow the existing live-inquiry setting; no notification or email-delivery configuration has changed in this release.

Updated 4 October 2026. This document describes the shared CMS added alongside the existing visitor demonstration. The two databases/workflows remain separate. Local acceptance uses synthetic records only; those records are not deployed.

## First administrator

Open `/cms` and sign in with email `info@itdks.tech` and the administrator password delivered separately. No ChatGPT account is required. The first successful password login initializes the owner's password credential and imports initial content only if settings are absent. Existing records, ownership and permissions are preserved. The password is not included in source, downloads, logs or documentation.

The deployment has `CMS_BOOTSTRAP_EMAIL` and `CMS_NOTIFY_EMAIL` configured to this address, plus secret `CMS_BOOTSTRAP_PASSWORD_HASH`. The bootstrap secret contains a salted PBKDF2-SHA256 hash, never a plaintext password. Once initialized, the database credential is authoritative; changing the password does not reactivate the original bootstrap password. Passwords do not expire automatically. Sessions last eight hours and can be renewed by signing in again.

**My account** changes your password and signs out every current session. New passwords must contain 14–128 characters. **Staff & access** creates an invitation link that the administrator shares directly with the intended colleague. They enter the invited email and set their own password. Links expire after seven days and work once; accepted staff accounts have no invitation-based expiry. No invitation email is sent automatically. **Reset password** revokes a colleague's existing password and sessions and creates a replacement setup link. Disabling or changing a membership also revokes its sessions. Only administrators manage staff; the owner cannot be disabled or reset through the staff list.

Sessions use random opaque cookies, HttpOnly, SameSite=Strict and Secure over HTTPS. Only token hashes are stored server-side; every API request checks expiry, active membership, the current credential and permissions. Platform identity headers grant no CMS access. Password login and setup are rate-limited; mutations require a matching Origin. If the sole owner's password is lost, a trusted deployment operator must configure a new bootstrap hash and remove only that owner's credential and sessions through controlled database maintenance, then redeploy and sign in. Do not delete business records or expose a public recovery endpoint.

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

## Social profiles and production guidance

Business settings now includes an optional Albanian production-guidance field. Publish it with the English field so the homepage, product pages and quote form show consistent information. Blank Albanian guidance uses neutral wording that timing is confirmed with the quotation.

Official social-profile fields accept full HTTPS Facebook, Instagram, LinkedIn and YouTube profile URLs. Leave unused platforms blank. Saving a draft does not change the footer; publishing does. The footer hides blank or invalid links. No official profile addresses are pre-filled.

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

Logical bindings: `DB` (D1), `BUCKET` (R2). Apply Drizzle migrations in order, once per database; never execute runtime CREATE TABLE. Migration 0003 adds credentials and sessions without modifying business data. A copied project must provision its own bindings and bootstrap password hash, use HTTPS and trusted client-IP handling, and configure its own administrator. The local Wrangler port is for isolated development. The separate legacy demo may still use platform identity; that path does not authorize the CMS.

Acceptance: `qa/cms_checks.py` uses synthetic password accounts against a local compiled Worker only. It covers access, publishing, stale saves, redirects, all inquiry types, idempotency, immutable versions, private files, approval/release gates, mobile layouts, print output and backup recovery. `qa/cms_password_checks.py` covers the login/activation/change-password interfaces, session persistence and revocation, staff disable/reset, role boundaries, cross-origin requests, rejected platform headers, export exclusions, rate limits and responsive login layouts. Set `KOBAGS_QA_PASSWORD` to the local fixture password matching the local bootstrap hash; never use a live credential. Neither suite may run against the public customer site. Existing SEO, copy, buyer and 3D regression suites remain applicable.

## Explicit remaining operational work

Client-approved policies and commercial inputs; first administrator sign-in and team invitations; verified email service; activation of real inquiries; scheduled backup/retention arrangements; original-artwork malware scanning if required; final business-domain/Search Console and Google Business Profile access. Existing source media replacement throughout custom layouts and new physical bag geometry still require development. There is no ERP, inventory, payment checkout, automated shipping or machine integration.

### One-time launch activation

The Sites runtime flag `CMS_ACTIVATE_INQUIRIES=2026-10-14` runs the owner-approved settings action once, outside schema migrations. It preserves the previous draft and published settings separately, changes only `liveInquiries`, increments the record revision and writes the `launch-live-inquiries-20261014` audit marker. The first public read applies the bounded atomic batch. It does not publish missing, archived or unpublished settings and never overrides a later staff decision to turn inquiries off. Removing the environment flag does not undo activation; use Business settings to disable and publish if a rollback is needed. No email provider is enabled by this flag.

### Daily opening checklist

1. A named staff member signs in to `/cms` and reviews new/unassigned inquiries during business hours. Receipt references identify saved requests; they do not mean a payment or order was accepted.
2. Confirm product/collection availability in CMS before promising stock. Collection requests do not reserve or decrement inventory.
3. Review the latest quotation and artwork revision before release. Check payment conditions using the agreed external process.
4. Export a protected full backup at the agreed cadence and retain it in the operator's approved encrypted location. The source-code handoff is not a customer-data backup.
5. Keep account invitations and customer approval links private. Use individual staff roles, revoke unused accounts and sign out on shared devices.

Scheduled offsite backup, retention/deletion schedules, email delivery and client legal approval remain operator/client responsibilities recorded in the launch report.
