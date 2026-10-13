# Launch audit: dependencies, software notices, assets and search

Checked 14 October 2026. This is technical evidence and an ownership checklist, not a guarantee of legal clearance, security, indexing or rankings. Deployment and domain state are recorded in the main launch report.

## Dependencies: fixed and remaining

The initial npm advisory check reported 30 affected package records: 1 critical, 21 high, 7 moderate and 1 low. After the security patch pass, the production-only audit reports **zero known findings**. The complete development tree reports **8 high package records caused by one unresolved upstream advisory**. Counts include affected parent packages; they are not eight independent application exploits.

Implemented changes:

| Component | Before | After | Reason |
| --- | --- | --- | --- |
| Next / ESLint configuration | 16.3.4 | 16.3.8 | Current 16.3 security fixes, including the ImageResponse advisory |
| React / React DOM / RSC | 19.2.6 | 19.2.8 | Server Function denial-of-service fixes |
| Vite RSC plugin | 0.5.26 | 0.5.34 | The plugin also vendors React: verified its embedded runtime changed from 19.2.6 to 19.2.8 |
| Vite | 8.0.13 | 8.0.16 | Development-server path disclosure fixes |
| sharp | 0.35.4 | 0.35.5 | Patched native image-library dependency |
| image-size | 2.0.2 | 2.0.3 | Malformed image parser loops |
| undici / ws | 7.24.8 / 8.18.0 | 7.29.1 / 8.21.0 | HTTP/WebSocket fixes |
| esbuild | 0.18.20 / 0.27.3 / 0.28.0 | 0.25.12 / 0.28.1 | Compatible build-tool patches |
| Compatible transitive packages | Previous lock | Updated lock | Babel, source-map-js, browser maps, brace-expansion, YAML, URI and ZIP parser fixes |

No automatic forced framework downgrade was applied. Vinext and the Cloudflare plugin remain on the established framework versions; explicit overrides pin the patched transitive packages. The Sites dependency installer completed successfully. TypeScript passed after installation; the main audit records the subsequent build/browser checks.

The critical [Next advisory](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j) requires attacker-controlled SVG in Node ImageResponse. No `next/og` or `ImageResponse` import was found in application source, and the deployed application uses Workers. A public exploit path was not established, but the package was patched. The [React advisory](https://github.com/react/react/security/advisories/GHSA-wx67-qw84-cm4g) also justified updating the embedded RSC runtime, which the npm dependency audit does not inventory separately.

### Residual upstream finding

`braces@3.0.3`, [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), can exhaust the stack on deeply nested glob patterns. The registry's latest published release checked during this audit remains 3.0.3. Its affected parents are lint/build dependencies (`micromatch`, `fast-glob`, Next ESLint and Vinext's CommonJS import plugin). The public website does not accept user-supplied build/glob patterns. Development servers bind to localhost. No production request path was established. Keep development services private, build trusted source only, and recheck the upstream patch before accepting untrusted build inputs.

Evidence: `evidence/dependency-audit-2026-10-14.json`, exact versions/integrity in `package-lock.json`. An npm audit checks known registry advisories, not all possible defects; [npm documents this scope](https://docs.npmjs.com/cli/v11/commands/npm-audit/).

## Software licenses and notices

- `docs/dependency-license-inventory.json` inventories **863 locked package records**, including **689 installed records**. Every locked record has a declared license; the report distinguishes installed packages from optional platform packages.
- `public/documents/third-party-notices.txt` preserves **365 distinct publisher notices/texts**, including embedded vendor notices, the Sites integration notice and shadcn CSS notice. Runtime package notice coverage is present. The text file is served as a document, not an indexed marketing page.
- Missing texts were recovered from official source commits, release tags or the installed upstream project's license. `vendor/dependency-licenses/sources.json` records the URL, SHA-256 and provenance basis. A current upstream snapshot is explicitly distinguished from an exact published source commit.
- Three initial gaps were closed using the license links in the exact installed publisher READMEs: `language-subtag-registry@0.3.23` (official CC0 text), `language-tags@1.0.9` and `natural-compare@1.4.0` (author-hosted MIT texts). Original README attribution and the provenance of retrieved snapshots are preserved.
- Three **development-only** packages still need notice review before redistributing an installed development environment: `css-box-shadow@1.0.0-3`, `drizzle-kit@0.31.10`, `stable-hash@0.0.5`. The first and last declare MIT but supply no full license text located by this audit. Drizzle Kit has a specific discrepancy: its exact 0.31.10 release package declares MIT, while the repository-root license at that same tag is Apache-2.0; no kit-specific full license was found. The release-root text is preserved without treating it as proof of MIT clearance. Their declarations, source references and review reasons remain in the inventory. No copyright holder or license grant was invented.
- The native sharp/libvips packages include LGPL and other component terms. Their Apache wrapper license does not cover all bundled native libraries; their publisher README is also retained. Native binaries and `node_modules` are not included in the website or source handoff. Review the complete native-library obligations if distributing an installed development environment later.
- System fonts are used (Arial, Helvetica and platform fallbacks). No downloadable font assets or remote Google Fonts dependency were found.

Regenerate after dependency changes: `python3 scripts/generate-license-notices.py`. Do not describe declared-license inventory as legal sign-off for every use or redistribution.

## Photography, videos, logo, scans and claims

The 37 client-original assets listed in `docs/client-media-2026-09-28.json` and all six published journal images match their recorded SHA-256 values. Source attribution is retained in that manifest, `docs/asset-sources.json`, `docs/journal-article-media-sources.json`, `docs/studio-real-photo-sources.json` and the studio provenance notes.

Client archive supply authorizes the requested website work; it does not prove photographer, music, third-party trademark or person-release rights. The owner should confirm rights for the supplied logo, photos, videos, recognizable people, printed customer brands and any recorded soundtrack before commercial publication. Earlier AI-generated bag illustrations and photo edits are identified as illustrations. The coffee test is a supplied scan reconstruction; it is separate from orderable bags. These assets are not an open-source license grant for unrelated projects.

The ISO library publishes original scans for Eco Bag Solution L.L.C. and explains the conditional assessment date (26 January 2027) and expiry field (26 January 2029). It does not claim issuer verification. Confirm current certification status and the relationship of the named entity to Kobags. Material/recycling/ink statements originate in client-provided copy; supporting supplier/production evidence remains the client's responsibility. These are management-system certificates, not product environmental certificates.

## SEO implementation and external launch steps

`PUBLIC_SITE_ORIGIN` now controls the canonical domain at runtime. It accepts a clean HTTPS origin, never a request Host header; missing/invalid configuration preserves `https://kobags.itdks.tech`. Activate `https://kobags-group.com` only after its DNS and TLS serve the new website. The same origin feeds sitemap, canonicals, language alternatives, social metadata and structured data.

The compiled review-domain HTTP crawl passed all 48 public English/Albanian addresses: crawler-visible unique metadata within each language, head canonicals, reciprocal sitemap/HTML language alternatives, schemas, private exclusions, unknown-page status, query cleanup and the accessible/noindex license notice. The same 48-route crawl also passed in isolated business-origin mode (`https://kobags-group.com`) on local port 8788. Evidence: `evidence/seo-http-review-2026-10-14.json` and `evidence/seo-http-business-2026-10-14.json`. This verifies runtime canonical configuration, not public DNS/TLS or Google indexing. The final compiled canonical redirect checks passed 54 GET/HEAD cases across the three aliases plus three exclusions, including double-slash/encoded-separator paths, private-page cache suppression, CSP and permissions headers; results are recorded in `evidence/canonical-redirect-checks-2026-10-14.json`. HSTS needs HTTPS transport verification; an HTTP local preview cannot establish its presence on the public domain.

The source SEO registry contains 48 public addresses in English and Albanian. `/bags-kosovo` and `/sq/bags-kosovo` cover all 38 municipalities in visible text and Service schema without pretending to have 38 branches or generating duplicate city doorway pages. Private flows, policies, CMS and former public handoff are excluded from search. The main launch verification records the actual compiled crawl result.

The owner explicitly chose to keep `kobags.itdks.tech` for this release. Verify its URL-prefix Search Console property and submit `https://kobags.itdks.tech/sitemap.xml` now; the business-domain steps below are deferred until a later approved migration.

For the eventual business-domain migration, the owner/operator must complete:

1. Connect and validate the approved business domain; check both apex and `www`, HTTPS and representative legacy redirects. Set `PUBLIC_SITE_ORIGIN` after the new domain is ready.
2. Verify ownership of the final domain in Google Search Console. Submit `https://kobags-group.com/sitemap.xml`; inspect `/`, `/sq`, `/bags-kosovo`, `/sq/bags-kosovo` and representative product URLs.
3. Confirm Google Business Profile ownership, accurate factory address/pin, phone, website, business category and opening hours. Add approved original photos. Use one real location; do not create fictional city branches.
4. Monitor Search Console indexing/security reports and real-user Core Web Vitals after launch. Request indexing for important URLs as appropriate and review crawl errors following migration.

Search Console ownership and sitemap submission were not verified in this code audit. [Google's Search Console guidance](https://developers.google.com/search/docs/monitor-debug/search-console-start) explains verification and monitoring. A [sitemap helps discovery but does not guarantee indexing](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview). Rankings for every city/query cannot be promised.
