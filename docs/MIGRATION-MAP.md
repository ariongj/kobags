# Original-to-demo URL migration map

Reviewed 15 September 2026 from the original public frontend routes and public article index. This is the demo implementation map; a production launch still needs a complete crawl and analytics/search-console review. The live Kobags domain has not been changed.

| Original route | New route / behavior |
| --- | --- |
| `/` | Full brand homepage, with direct studio and collection actions |
| `/products` | Catalog with comparison and all 15 source-backed size variants |
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
| `/privacy-policy` | Permanent redirect to `/privacy`, explicit demo notice |
| `/terms-conditions` | Permanent redirect to `/terms`, explicit demo terms |
| `/thank-you` | Temporary redirect to `/quote`; does not falsely claim an inquiry was submitted |

Five supported product slugs: `d-cut-bag`, `handle-bag`, `box-bag`, `t-shirt-bag`, `string-bag`. Unknown product/article slugs return a real 404. If the production crawl reveals other numeric or retired IDs, add explicit mappings; do not redirect every missing product to the homepage.

## Preserved article addresses

| Original slug | Proposed new title |
| --- | --- |
| `kobagsjourney` | From Lipjan to your next brand moment. |
| `whyswitchtokobags` | Is a reusable bag the right fit for your business? |
| `kobagsmission` | Make your packaging feel like your brand. |
| `sciencebehindkobags` | Non-woven PP, explained clearly. |
| `benefitsofkobags` | Five details to settle before ordering branded bags. |
| `helpingbusinesseskobags` | Introduce a new bag without the guesswork. |

The original article text contains broad environmental/recycled-material language that is not substantiated by the catalog snapshot. The demo preserves URLs and subject areas with proposed practical copy; it does not invent company history, molecular processes or measured impact. Get client editorial approval before migration to the real domain.

## New destinations

`/design`, `/quote`, `/samples`, `/manufacturing`, `/industries`, `/industries/retail`, `/resources`, `/demo/customer`, `/demo/admin`, `/cookies`, `/handoff`.

## Homepage outline

Original identity and business scope remain visible: collection, manufacturing, material information, certificates, partners, contact and journal. The new bag designer is an additional conversion path. The root page is the full brand homepage; the designer is its own landing page.

## Indexing

This is a private demo. Metadata, response headers and `robots.txt` deliberately block indexing. No public XML sitemap or production canonical domain has been asserted. Before a real launch, implement canonical metadata, XML sitemap, approved redirects and monitoring on the actual domain, then remove demo restrictions deliberately.

Sources: [Original website](https://kobags-group.com/), [catalog](https://kobags-group.com/products), [public article index](https://api.kobags-group.com/blogs), supplied audit, `docs/source-catalog.json` and `docs/asset-sources.json`.
