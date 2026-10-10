# Kobags — client review audit

10 October 2026 · Review address: https://kobags.itdks.tech/

## Review focus

The website should introduce Kobags as a manufacturer, make the range easy to compare, and let a buyer move from a bag design to a clear quotation request. The approved homepage direction has been retained: darker green, simpler factory hero, **Manufacturing bags. Helping Brands.**, level printing video, and the two requested collection categories.

## Improvements applied

| Area | Finding | Applied improvement |
| --- | --- | --- |
| Catalogue accuracy | Homepage cards could retain products removed in the CMS and always claimed three sizes. | Cards now follow published products, available sizes, bilingual product copy and changed product photos. The original curated photos remain when no replacement is published. |
| Product specifications | Comparison and detail pages always advertised four print colors; comparisons could use a disabled size. | Published printing limits and the first available size now determine the displayed specification. |
| Production timing | Different pages and languages could show inconsistent timing guidance. | English and Albanian production guidance can be published in Business settings and is used across the homepage, product details and quote form. |
| Collection discovery | Thank you and Smiley collections were accessible only from the homepage. | The same compact collection choices now appear in the catalogue and lead directly to their quotation request. |
| Quote continuity | A collection request returned to the first step after refresh or language changes. | Each collection retains its step, resets after submission, and avoids adding a second collection heading to saved notes. |
| Social profiles | There was no publishing control for official social links. | CMS fields now support Facebook, Instagram, LinkedIn and YouTube. Completed, validated HTTPS profiles appear in the footer; empty fields stay hidden. |
| Unavailable products | An empty published catalogue could fall back to old products. | Archived products remain hidden. The empty catalogue directs visitors to contact the team. |

## Suggested client review — about 10 minutes

1. Open the homepage on a phone: approve the headline, green shade, factory photo and production section.
2. Open **Our bags**: check the five bag families, dimensions, materials, fabric weights and print-color limits. Review the Thank you and Smiley categories.
3. Use **Design studio**: select a bag, add a logo and text, move the artwork, rotate the bag and inspect both sides.
4. Continue to a quotation request: review the required company, quantity and delivery information.
5. Review Manufacturing, Our responsibility, certificates and contact details in English and Albanian.
6. Send feedback grouped by page, with the replacement wording or a screenshot of the requested change.

## Inputs still needed from the client

- **Official social-profile URLs** for the footer.
- **Thank you and Smiley product photographs or final artwork**. Their current category marks identify the collection; they are not photographs of an approved finished product.
- **Confirmed commercial specifications:** sizes, fabric weights, colors, minimum quantities, production guidance, sample costs and delivery terms.
- **Final contact and order ownership:** who receives inquiries, who prepares quotations, and who approves artwork and production.
- **Approval of EN/SQ wording, policies and certificate scope/validity.**

## Before commercial launch

Configure and verify the transactional email sender, assign staff responsibilities, confirm inquiry handling, and agree backup/retention ownership. The current hosting configuration has administrator and notification settings, but no email-provider key or sender configured. Client review can proceed before these operational steps are completed.

Confirm the long-term company domain and Search Console / Google Business Profile ownership before search-launch activities. Technical SEO checks do not guarantee Google indexing or rankings.

## Next quality improvement for the 3D studio

The current studio uses interactive volumetric bag models with textures derived from supplied photographs. It is not a measured scan. For a material improvement in realism, supply one physical sample per family or consistent front, back, both sides, base and open-top photographs, together with measurements and fabric close-ups. Those references allow more accurate handles, seams, gussets and rear textures. Approve the resulting model against the physical sample before treating it as a manufacturing reference.

## Verification record

Passed: 55 mobile layout checks, 48 EN/SQ SEO URLs, 50 marketing copy/media checks, 13 accessibility page/state scans, 11 3D interaction/recovery checks, 7 buyer-journey groups, 10 homepage checks and 5 focused CMS/collection regression groups. TypeScript and the production build also passed. No automated accessibility violations or browser errors were reported in the completed suites.

See `evidence/VERIFICATION.md` and the companion JSON reports for this release. Browser checks use a compiled local build and synthetic records; they do not submit customer requests or send external email. Responsive Chromium checks are useful evidence, but are not a substitute for a final client check on actual iPhone and Android devices.
