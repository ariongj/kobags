# Original-to-current URL migration map

Original route inventory reviewed 15 September 2026; launch update 14 October 2026. Known route patterns are preserved below. The business domain still points to the previous Hostinger site until the DNS cutover in `DOMAIN-CUTOVER-2026-10-14.md` is completed. Search Console export is still needed to identify any additional indexed legacy URLs; no unknown URLs have been invented. A fresh public check found the old `/robots.txt` permits crawling, while old `/sitemap.xml` returns the HTML app shell rather than an XML sitemap. The new release has a validated 48-URL EN/SQ XML sitemap.

| Original route | New route / behavior |
| --- | --- |
| `/` | Full brand homepage, with direct studio and collection actions |
| `/products` | Catalog with comparison and the currently published size variants |
| `/shop` | Permanent redirect to `/products` |
| `/shop-catalog` | Permanent redirect to `/products` |
| `/shop-catalog/:slug` | Permanent redirect to `/products/:slug` |
| `/kobags-bagsdetails/:slug` | Permanent redirect to `/products/:slug` |
| `/contact-us` | Permanent redirect to `/contact` |
| `/partner` | Permanent redirect to `/partners` |
| `/become-partner` | Permanent redirect to `/partners/apply` |
| `/sustainability` | Retained, with qualified material guidance |
| `/certifications` | Retained, with original scans and verification status |
| `/blog` | Retained as the journal / buying-guide index |
| `/blog-home` | Permanent redirect to `/blog` |
| `/blog/:slug` | Six original slugs retained, proposed copy rewritten for factual buying guidance |
| `/privacy-policy` | Permanent redirect to `/privacy`, current data-handling notice |
| `/terms-conditions` | Permanent redirect to `/terms`, current website/quotation terms |
| `/thank-you` | Temporary redirect to `/quote`; does not falsely claim an inquiry was submitted |

Five supported product slugs: `d-cut-bag`, `handle-bag`, `box-bag`, `t-shirt-bag`, `string-bag`. Unknown product/article slugs return a real 404. If the production crawl reveals other numeric or retired IDs, add explicit mappings; do not redirect every missing product to the homepage.

## Preserved article addresses

| Original slug | Proposed new title |
| --- | --- |
| `kobagsjourney` | Inside Kobags: from brief to production. |
| `whyswitchtokobags` | Is a reusable bag the right fit for your business? |
| `kobagsmission` | Make your packaging feel like your brand. |
| `sciencebehindkobags` | Non-woven PP, explained clearly. |
| `benefitsofkobags` | Five details to settle before ordering branded bags. |
| `helpingbusinesseskobags` | Introduce a new bag without the guesswork. |

The original article text contains broad environmental/recycled-material language that is not substantiated by the catalog snapshot. The demo preserves URLs and subject areas with proposed practical copy; it does not invent company history, molecular processes or measured impact. Get client editorial approval before migration to the real domain.

## New destinations

`/design`, `/quote`, `/samples`, `/manufacturing`, `/industries`, `/industries/retail`, `/resources`, `/demo/customer`, `/demo/admin`, `/cookies`, `/handoff`.

## Homepage outline

Original identity and business scope remain visible: collection, manufacturing, material information, certificates, partners, contact and journal. The homepage leads with real production imagery and the factory process. The new bag designer is an additional conversion path. The root page is the full brand homepage; the designer is its own landing page.

## Indexing

The 30 September SEO request replaces the previous blanket crawl block with indexable marketing pages. English retains existing addresses; Albanian has server-rendered `/sq` addresses, reciprocal language alternatives and matching metadata. `/sitemap.xml` lists 46 public EN/SQ addresses and `/robots.txt` permits public crawling. Quote/inquiry forms, demo workspaces, demo policies and handoff/downloads stay noindex; the API is disallowed. Canonicals currently use `https://kobags.itdks.tech`. Change `SITE_ORIGIN` in `lib/seo-config.ts` when the approved final domain is connected. Preserve legacy redirects and verify/submit the sitemap in Search Console; actual search rankings have not been measured.

Sources: [Original website](https://kobags-group.com/), [catalog](https://kobags-group.com/products), [public article index](https://api.kobags-group.com/blogs), supplied audit, `docs/source-catalog.json` and `docs/asset-sources.json`.
