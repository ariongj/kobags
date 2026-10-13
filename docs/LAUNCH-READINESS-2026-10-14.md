# Kobags launch readiness — 14 October 2026

Audit date: 14 October 2026, Europe/Tirane. Launch requested for the next day. Current launch domain: https://kobags.itdks.tech/. The owner explicitly deferred switching https://kobags-group.com/ during this audit.

## Release decision

**Application release verified for kobags.itdks.tech; operational and client sign-off items remain open.** The owner chose to keep this domain for now. Business-domain cutover is prepared and deferred, not a blocker to publishing the current site. This report distinguishes tested software from external account, business and legal requirements. It does not certify perfect security or guarantee search rankings.

The owner approved enabling real customer requests in the shared CMS inbox. Staff will check the inbox manually; transactional email delivery is not connected. The publication tool result and read-only verification of production intake are recorded in the owner-only `deliverables/handoff/release-receipt.json` after deployment. This report does not claim that DNS has been switched.

## Fixes in this release

- Patched Next, React/RSC (including the runtime embedded by the Vite plugin), Vite and compatible vulnerable transitive dependencies. The production dependency audit reports no known findings. One unfixed build-time glob-parser advisory remains; see the dependency report.
- Bound request bodies while streaming, so oversized JSON and staff uploads are rejected before the whole request is buffered. Required same-origin writes for the legacy fallback API.
- Removed customer receipt ownership derived from platform identity headers; saved requests use a protected, random browser cookie.
- Added strict validation of staff account IDs and activation booleans, preventing malformed authenticated requests from bypassing owner-account protections. CMS page paths now reject protocol-relative paths and protected asset/handoff routes.
- Added a one-time, operator-controlled intake activation with transactional history and an audit marker. It preserves unpublished settings and respects later CMS changes.
- Added baseline anti-framing, content-type, object-embedding and browser-permission response headers while preserving stricter private-file policies.
- Moved source bundles and internal handoff/operations notes out of public assets. Public and internal asset aliases no longer expose those files; owner deliverables remain local.
- Replaced the old demo-only privacy/cookie/terms copy with technical disclosures matching the actual storage and submission behavior, in English and Albanian. Business/legal approval remains required.
- Kept the coffee scan accessible by its explicit test link, outside the normal bag picker.
- Fixed fallback request confirmations: custom bags, contact, samples and partners provide an explicit email handoff and recoverable saved details. Custom bags include downloadable saved front/back artwork. Current published catalogue specifications now govern new fallback requests, while historical snapshots remain unchanged.
- Prepared runtime canonical-domain configuration, matching sitemap/hreflang/social metadata and a conditional redirect to the verified business domain.
- Preserved third-party software notices and recorded dependency/asset provenance.
- Fixed videos uploaded through CMS: inline MP4 delivery, streamed byte ranges, HEAD, ETags and conditional requests. Authorization runs before private-file metadata, partial data and 304 responses; revoked customer links cannot bypass it.
- Fixed full backup recovery to handle historical seeded collection rows and reject incomplete backups before creating a recovery database.
- Improved receipt text contrast to meet the automated accessibility check. Corrected the scan viewer’s loading/retry and reduced-motion subscriptions; lint has zero errors (44 advisory warnings). Public CMS media keeps its intended cache policy while private artwork remains uncached.

## Verification

Completed evidence before final publication:

| Area | Verified result |
| --- | --- |
| Request parsing, catalogue, studio state, activation and safe CMS paths | 25 direct Node assertions/groups passed; 5 additional media-range/validator groups passed |
| One-time intake activation | 5 isolated SQLite groups passed, including concurrent/repeated activation and preservation of unpublished settings |
| Backup recovery | 4 rejection/recovery groups passed; clean local SQLite integrity and uploaded-object SHA-256 verified |
| CMS password access | 8 groups passed |
| CMS roles and business workflow | 12 groups passed, including private proofs, version-bound approvals, production gates and backup exports |
| Client stock requirements | 5 browser groups plus 9 stock/specification migration fixtures passed |
| Real-request path | English and Albanian mobile quotation journeys passed with synthetic local buyers, persisted artwork, quantity checks, retry recovery and immutable CMS records |
| Recovery | 6 inquiry retry cases and 5 stock recovery groups passed |
| Mobile | 54 route/width combinations passed; 14 pages fit at 320px with 200% text |
| Accessibility | Zero automated violations in 13 core page/dialog states and 4 additional stock/responsibility/catalogue states; manual-review items and physical assistive technology remain outside this result |
| 3D | Five bag families, camera controls, artwork dragging/undo, loss-of-context recovery, coffee test isolation and unavailable-WebGL fallback passed; six final desktop/mobile visual captures were reviewed |
| Delivery | 48 sitemap pages, 64 internal destinations, 52 anchors, static media delivery and playback passed. Uploaded videos additionally passed 5 mobile HTTP/playback/seek groups and 7 public/private range, validator, HEAD and revoked-link groups. |
| SEO | All 48 public EN/SQ routes passed under both review and business-origin configurations; 54 canonical alias/method/path cases and 3 redirect exclusions passed |
| Public/private HTTP boundaries | 13 compiled response-header, internal-download and policy groups passed |

Final focused checks also passed: eight EN/SQ fallback request groups with accessible receipts, six updated coffee-scan groups including dynamic reduced motion, 13 public/private HTTP groups and 54 redirect cases plus three exclusions. TypeScript, production build and whitespace checks passed. Lint has zero errors and 44 advisory warnings. Publication status is recorded separately in the private release receipt. Production errors-only hosting query returned no events for the preceding 24 hours; this is an observed log result, not a claim of exhaustive monitoring. Browser evidence used local Chromium/software WebGL. It does not establish Safari or physical phone compatibility.

## Operating checklist before inviting live customers

| Item | Status and action | Owner |
| --- | --- | --- |
| Current / future domain | Keep `kobags.itdks.tech` by owner decision. Future `kobags-group.com` DNS/TLS remains pending; do not apply cutover records until requested. Business-origin configuration has passed local checks. | ITD / future DNS account holder |
| Customer inquiry intake | Approved. Enable through this verified release and confirm one identified launch request appears in CMS on the current launch domain. | ITD + assigned sales staff |
| Staff access and inbox duty | Existing username/password CMS retained; invite named staff with individual roles and confirm they can sign in. Assign a person to check the inbox during business hours. No shared passwords in this report. | Kobags / ITD |
| Privacy and commercial approval | Confirm legal entity/contact, retention/deletion arrangements, processors/transfers and commercial quotation/claim terms. Current copy describes implementation; it is not legal sign-off. | Client decision maker / adviser |
| Backup custody and retention | JSON and full file backup/recovery are tested locally. Take an authorized production backup and define where encrypted copies are retained, who can recover them and how often. No scheduled offsite backup is configured. | Operator |
| Media and claims | Confirm rights for supplied photos/videos/logos/customer brands and recorded sound; approve ISO entity/status and supporting material/ink claims. Provenance is documented, independent rights/issuer verification is not. | Client |
| Final physical-phone check | Check Safari/iPhone and Android touch rotation, logo upload, keyboard, forms and downloads on actual devices. Automated Chromium widths do not replace physical-device tests. | Client + ITD |

## Follow-up that must not be mistaken for completed integration

- Email: sender verification, provider credentials and delivery acceptance remain outstanding. CMS receipts say saved; they do not claim email delivery or payment.
- Google Search Console: verify the current property (`https://kobags.itdks.tech/`), submit its `/sitemap.xml`, and repeat for the business domain after migration and inspect representative EN/SQ pages. Ownership/submission/index inclusion and rankings are not verified in this audit. Connect the offered Search Console integration or complete these in Google's console.
- Google Business Profile: confirm ownership, real factory address/pin, phone, hours and production-domain link. All 38 municipalities are covered by visible site content without inventing branches.
- Physical bag scans and final client stock photography remain client inputs. Current bag geometry is illustrative; the coffee scan is a test. Do not sell preview dimensions/colors as manufacturing approval.
- Staff file uploads validate type/signature/size but do not run malware scanning. Only authorized staff can upload production originals.
- There is no payment checkout, ERP, automatic stock reservation, courier or machine integration; quotations, payments and production remain controlled business steps.

## Scope and limitations

The dedicated Codex Security desktop scan service was unavailable in this session. The security work is a manual source review plus local exploit-regression and CMS acceptance tests, not a completed managed Security scan or independent penetration test. The actual compiled Worker returned HTTP 413 for all five direct oversized-stream probes, with five immediate successful health recoveries; missing and foreign Origins returned 403. The source helper independently passed the same five rejection/recovery probes. Evidence: `evidence/request-body-workerd-checks.json`. In a local Worker-to-Worker forwarding proxy, early upload rejection can instead surface as an ECONNRESET/503; Wrangler labels this as a restart even when no application restart occurred. The regression records that exact local transport behavior separately and checks immediate recovery; arbitrary 503 responses are not accepted as a pass. The final proxy run recorded exactly three known early-upload 503 responses, with immediate recovery and unchanged CMS data. Seven final media HTTP groups passed: public files remain cacheable; private files and errors remain private/no-store, including ranged and conditional responses. A separate five-group browser suite verified an actual CMS-uploaded video; before the fix a two-byte probe fetched all 1,823,640 bytes, afterwards it returned precisely two bytes and mobile playback/seeking succeeded. Reproducible probes and results are in `qa/request_body_runtime_checks.mjs`, `qa/security_http_checks.py`, `qa/media_cache_checks.py` and the matching evidence JSON files. Draining unlimited excess data would defeat bounded ingestion and was not introduced.

No real customer records were created by local QA; tests used a disposable copy of local state and synthetic accounts. No outgoing email or production order was sent.

Dependency inventory covers 863 lockfile records / 689 installed packages and preserves 365 publisher notices. The production audit has zero known findings; the complete build/development tree retains eight parent-package findings from one unresolved braces advisory. Three development-only packages still need notice review: two lack complete located publisher text, and drizzle-kit has a package-versus-repository license declaration discrepancy. See LAUNCH-LICENSES-SEO-2026-10-14.md for exact versions, sources and qualifications.

## Related deliverables

- DOMAIN-CUTOVER-2026-10-14.md — exact DNS records, mail preservation, activation, Google steps and rollback.
- LAUNCH-LICENSES-SEO-2026-10-14.md — advisories, dependency licenses, asset provenance and SEO scope.
- CMS-OPERATIONS.md — staff roles, inquiry handling, private approvals, email and recovery.
- evidence/VERIFICATION.md — dated test evidence.
- deliverables/handoff/ — owner-only source/media bundles and design/code notes; excluded from deployed assets.
