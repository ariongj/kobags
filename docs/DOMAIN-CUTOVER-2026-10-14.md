# Kobags production-domain cutover

Prepared 14 October 2026 (Europe/Tirane). Target: https://kobags-group.com/.

## Current state

**Deferred by owner decision:** keep the new site on `kobags.itdks.tech` for now. These records are prepared for a future authorized switch; do not apply them as part of the current release.

The updated application is hosted on OpenAI Sites. The review domain is `kobags.itdks.tech`. Both business hostnames have been registered with Sites, but DNS verification and TLS activation are pending. **The business domain has not been switched.**

The public DNS lookup shows Hostinger nameservers (`ns1.dns-parking.com` and `ns2.dns-parking.com`). Mail uses Zoho EU. No authenticated DNS-management connection is available in this session.

## Changes at the existing DNS provider

First export the existing zone and preserve the current website for rollback. Add the following ownership verification records. Names below are relative to `kobags-group.com`; do not append the domain twice if the provider does so automatically.

| Type | Name | Value |
| --- | --- | --- |
| TXT | `_openai-site-verification` | `openai-site-verification=aYqld2mcNpNPDeM67D63uSY8UOwKKxAihBsPayzX8iQ` |
| TXT | `_cf-custom-hostname` | `b8f00f93-f274-4580-887c-4a857c7dd8bd` |
| TXT | `_openai-site-verification.www` | `openai-site-verification=JXvrLZATaX5IZDHFMFIccN1pNfbzLtmzdHNOCfMEvR4` |
| TXT | `_cf-custom-hostname.www` | `6165c7a4-4184-4d1e-b80b-2a1c1630495a` |

Refresh Sites domain validation after these resolve. If Sites returns additional TLS validation records, add those exact returned records before cutover.

When the tested release is deployed and DNS/TLS checks permit routing, replace the **website** records with:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `162.159.143.30` |
| A | `@` | `172.66.3.26` |
| CNAME | `www` | `custom-domains.chatgpt.site.` |

Remove conflicting old apex website A/AAAA records and the old `www` website CNAME. Sites supplied IPv4 targets only; leaving the old website IPv6 records would send some visitors to the old server. Hostinger CDN settings may need to be disabled for these website hostnames before their DNS values can be changed.

**Preserve all MX, SPF, DKIM, DMARC and other email records. Do not change nameservers or the `api` subdomain as part of this cutover.** Existing mail exchange records found on 14 October: priority 10 `mx.zoho.eu.`, priority 20 `mx2.zoho.eu.`, priority 50 `mx3.zoho.eu.`. Export and retain all other mail records from the provider before making changes.

## After DNS and TLS are active

1. Confirm both business hostnames route to the new release and HTTPS works.
2. Set Sites runtime `PUBLIC_SITE_ORIGIN=https://kobags-group.com` and redeploy the verified saved version. Until then, canonical URLs remain on the working review domain to avoid declaring the old website as the new canonical.
3. Confirm canonical URLs, EN/SQ language links, social metadata, robots and sitemap all use the business domain. Confirm the noncanonical `www` and review hosts redirect their public pages to the selected domain.
4. Test a clearly identified launch inquiry end to end on the production domain and verify it in the authenticated CMS inbox. No real-data test has been fabricated by the local acceptance suites.
5. Verify the Domain property in Google Search Console using Google's actual DNS verification value; submit `https://kobags-group.com/sitemap.xml`. Inspect `/`, `/sq`, `/products/box-bag`, `/bags-kosovo` and `/sq/bags-kosovo` and monitor indexing. Technical checks do not guarantee indexing or rankings.
6. Ensure the client and assigned staff can sign in with their individual CMS accounts. Review the inbox manually; email notifications remain unconfigured.

## Rollback

Restore the exported **website** DNS records and previous Sites version if required. Leave mail records untouched. Reverting application source does not undo received inquiries; preserve database and file backups before data recovery. Changing hostnames does not transfer browser drafts or cookies: complete or export test drafts before cutover.
