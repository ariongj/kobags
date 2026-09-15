# Kobags Group — design handoff

Revision: 15 September 2026. Private concept, prepared from the supplied audit and the original Kobags website. The user's latest brief calls for a complete brand homepage, a working bag designer and a reusable handoff.

## 1. Creative direction

**Your brand. Your bag.** A clear manufacturing brand with a tangible, hands-on buying experience. Keep the original Kobags identity and real product/factory evidence. Use generous white space, navy typography and green actions. The new homepage is an editorial brand entry point; the dedicated `/design` page exposes the working designer immediately.

The original logo is retained. This is an extension of Kobags' navy/green identity, not a replacement brand. No new logo, fictional client endorsement or production certification is implied.

## 2. Design tokens

The source of truth is `app/globals.css`.

| Token / role | Value | Use |
| --- | --- | --- |
| Navy | `#193b67` | Headings, secondary action, top utility bar |
| Green | `#087a36` | Primary action, links, focus outline |
| Body ink | `#213632` | Main copy |
| Soft canvas | `#f6f7f3` | Product and editorial backgrounds |
| Border | `#dce3dd` | Inputs, cards, separators |
| Destructive | `#b83333` | Validation and destructive controls |
| Body type | Arial, Helvetica, sans-serif | Local system stack; no remote font dependency |
| Main body | 16px, 1.55 line height | Readable prose |
| H1 | `clamp(36px, 4.1vw, 60px)` | Main page title; homepage has a larger custom composition |
| H2 / H3 | 38px / 19px base | Section and card headings; route-specific responsive sizing |
| Primary button | 14px semibold, 15px × 23px padding | Solid green, white text |
| Radius | 7–14px in main surfaces | Small controls and restrained rounded panels |
| Focus | 3px green outline, 4px offset | Keyboard-visible action focus |

Use the existing CSS variables and UI primitives when extending the site. Utility metadata is smaller than body copy and should not carry essential instructions. A full accessibility conformance audit remains future work.

## 3. Page compositions

### Brand homepage — `/`

Product photographs form an overlapping hero composition beside the headline and two direct actions. Follow with factory/branding/approval context, a five-bag collection row, a studio introduction, a four-step ordering explanation, original factory imagery, industry/material content, certificate references, FAQs, buying guidance, partner entry and footer.

### Design landing page — `/design`

Lead with “Your brand. Your bag.” The main work area pairs bag selection and a large interactive preview with material/artwork controls. Keep the quote action next to the current specification. Put context below the working surface. Front and back artwork remain separate while switching views.

### Catalog and detail

The catalog shows the five original product families with source photographs, handle/use filters and up to three comparison columns. Detail pages contain Small, Medium and Large published sizes, GSM and a direct design action. Do not label inferred width/height/gusset order until a client drawing establishes it.

### Quote request

Four explicit steps: bag, branding, quantity/destination, company/contact. A persistent summary keeps the selected bag visible. Preserve user input on validation/network errors. The final confirmation appears only after a successful server save.

### Company and guidance

Manufacturing uses original photographs and controlled video playback. Material information separates PP composition, reuse, recycled content and local recycling. Certificates show original scans with verification status. Journal articles use practical buyer guidance and preserve the original six slugs; all rewrites need editorial sign-off.

### Customer / sales workspaces

These are functional private demo personas. Request detail uses consistent tabs for specification, quotation, artwork and timeline. Show version numbers and approval state close to the corresponding proof. Sales also has inquiry review, content drafts/publishing, unsent notifications and activity/export/reset.

## 4. Responsive behavior

Desktop uses side-by-side working panels and multi-column editorial sections. Tablet reduces cards and spacing; small screens stack content and use the header menu. Tables may scroll inside their own wrapper. The page itself should never scroll horizontally. Maintain a usable logo-upload area, visible errors and reachable quote actions on a 390px viewport.

Existing breakpoints are in `app/globals.css`. Extend the relevant component's rules instead of introducing another global breakpoint system. Respect the existing reduced-motion styling.

## 5. Assets and provenance

| Asset | Source / treatment |
| --- | --- |
| `public/assets/logo.png`, `favicon.png` | Original Kobags identity; preserve proportions |
| Five `*-bag.webp` photos | Original Kobags product photographs; existing printed brand text is part of the photo |
| `factory.webp`, `factory-printing.webp` | Original public manufacturing evidence |
| `printing-process.mp4` | Original printing video; controls, no autoplay, preload none |
| `certificate-iso*.webp` | Original certificate scans; scope/issuer/validity need verification |
| `studio-bag-atlas.png` | AI-generated blank-bag illustration, tinted and composited at runtime; never label as an actual manufactured sample |
| `docs/asset-sources.json` | Asset source manifest |
| `docs/source-catalog.json` | Original catalog snapshot with 15 variants |

The atlas is a 2D concept preview. Both sides reuse the same indicative shape; the bag does not change physical proportions for each size. It is not a dieline, a 3D model, a color sample or a guarantee of printable area. Production work should substitute approved per-variant templates or approved 3D assets. Preview downloads carry a concept label.

Kobags assets remain subject to their owner's rights. The archive is a handoff for this project; it does not grant trademark, photo or video rights for unrelated brands. Replace brand assets when using the architecture for another business.

## 6. Component map

| Area | Main implementation |
| --- | --- |
| Shell/navigation/footer | `components/site-shell.tsx` |
| Brand homepage | `components/home-page.tsx` |
| Bag canvas, controls and export | `components/bag-studio.tsx` |
| Locale and browser draft | `components/kobags-context.tsx` |
| Catalog and detail | `components/product-catalog.tsx` |
| Quote steps | `components/quote-flow.tsx` |
| Sales/customer views | `components/demo-workspace.tsx` |
| Inquiry form | `components/inquiry-form.tsx` |
| Editorial layouts | `app/[...slug]/page.tsx`, `app/blog/` |
| Handoff and page map | `app/handoff/page.tsx`, `lib/site-outline.ts` |
| Reusable primitives | `components/ui/` |

## 7. Content and interaction rules

- Use one H1, specific link labels, visible form labels and clear error messages.
- Keep real product specifications separate from proposed copy.
- Use 5,000 as the published starting MOQ, subject to confirmed scope. Sample inquiries are separate.
- Express dispatch timing as conditional and separate it from delivery arrival.
- Use clear language around fictional prices, no outgoing messages and private demo records.
- EN/SQ covers the homepage and core studio/quote journey. Supporting editorial and most sales copy are English; human Albanian review and full locale coverage remain outstanding.
- Avoid unsupported recycled-content, plastic-free, carbon-impact, food-contact or durability claims.

## 8. Next design deliverables

Before production: approved product dimension drawings and print zones for all 15 variants; material/ink color references; production artwork/file requirements; copy and evidence sign-off; full language coverage; accessibility review including screen-reader and 200% text use; original-asset rights confirmation. These are concrete inputs for the next designer, not represented as completed by this demo.
