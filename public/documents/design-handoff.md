# Kobags Group — design handoff

Revision: 16 September 2026. Website demonstration, prepared from the supplied audit and the original Kobags website. Edition 05 reworks the full website around industrial precision and a brand studio: cinematic original factory imagery, a real interactive 3D showroom, stronger typography, a consistent product collection, editorial openings and a shared dark footer.

## 1. Creative direction

**Manufacturing bags. Building brands.** The homepage leads with Kobags as a manufacturer: real equipment, material and production footage. The collection shows what the factory produces, and **Your brand. Your bag.** introduces the new customization experience. Preserve the original identity, navy/green palette and factory evidence. The dedicated `/design` page still opens directly into the working designer.

The original logo is retained. This is an extension of Kobags' navy/green identity, not a replacement brand. No new logo, fictional client endorsement or production certification is implied.

## 2. Design tokens

The base is `app/globals.css`; the current visual direction is `app/brand-refresh.css`, imported after it. Use the edition stylesheet for new visual refinements rather than adding competing global overrides.

| Token / role | Value | Use |
| --- | --- | --- |
| Navy | `#123442` / `#0c2833` | Headings, secondary action, top utility bar |
| Green | `#087a36` | Primary action, links, focus outline |
| Light green | `#c6eb9d` | Hero/showroom actions and dark-surface highlights |
| Body ink | `#213632` | Main copy |
| Soft canvas | `#f6f7f3` | Product and editorial backgrounds |
| Border | `#dce3dd` | Inputs, cards, separators |
| Destructive | `#b83333` | Validation and destructive controls |
| Body type | Arial, Helvetica, sans-serif | Local system stack; no remote font dependency |
| Main body | 16px, 1.55–1.85 line height | Readable prose |
| H1 | 42–76px, weight 600, tight tracking | Editorial page titles; factory hero scales to 102px |
| H2 / H3 | 38px / 19px base | Section and card headings; route-specific responsive sizing |
| Primary button | 14px semibold, 15px × 23px padding | Solid green, white text |
| Radius | 7–14px in main surfaces | Small controls and restrained rounded panels |
| Focus | 3px green outline, 4px offset | Keyboard-visible action focus |

Use the existing CSS variables and UI primitives when extending the site. Utility metadata is smaller than body copy and should not carry essential instructions. A full accessibility conformance audit remains future work.

## 3. Page compositions

### Brand homepage — `/`

A cinematic original factory photograph fills the opening with larger navy/white/light-green typography. The photograph stays behind the copy on mobile with a stronger readability overlay. The actions lead to manufacturing and the bag designer; a 360° link jumps to the showroom. Keep the photo/manual-play production film genuine.

The page order is factory hero → manufacturing proof → production process/video → interactive 3D showroom → five-family collection → ordering steps → industry/material content → evidence → FAQs → shared footer. Product cards use original branded photos; the catalog introduction uses the existing blank illustrative mockups. A dark shared footer provides the final design invitation across every route.

### Interactive 3D showroom — `/#bag-showcase`

A large dark stage pairs an orbitable Handle Bag concept with live name and color controls. The tote has volumetric panels, ribbon handles, seam detail and procedural fabric shading. Its construction control separates the panels/handles and then reassembles them. Front/back buttons, rotation arrows, keyboard controls, reset and pause/play complement drag rotation. The 3D model repeats the name on both faces; the dedicated designer supports independent front/back artwork.

The showroom is an illustrative presentation, not approved manufacturing geometry or a measured exploded engineering drawing. It shows one representative tote. All five families remain available in the dedicated studio. Selection carries the front text, bag color and matching ink/typeface into that studio. The scene starts still for reduced-motion users and retains a working 2D fallback when WebGL is unavailable.

The intended balance is manufacturer first, products and customization next. Do not replace factory evidence with generated industrial imagery or invent capacity, employee, export-market or throughput statistics. Use future client-approved scale figures only when the source and scope are documented.

### Design landing page — `/design`

Lead with “Your brand. Your bag.” Use two restrained white cards on desktop: a sticky preview workspace and a controls panel. The five larger shape tiles use the same blank models as the main canvas. A cool pale stage, subtle shadow and visible front/back and download controls keep attention on the bag. At 800px and below, the cards stack.

The bag tab contains size, color, material, logo entry and an optional custom-dimension request. The artwork tab supports a logo and text together, selected as independent layers. It includes an upload thumbnail/name, optional white-background cleanup, a three-line text field, three typefaces, alignment, text color, and independent layer size, position and rotation. Undo/redo and copy-to-other-side support iteration. Front and back preserve separate settings and upload names. Dashed artwork guides help placement and can be hidden; they never appear in exports. Dragging retains the point grabbed, keyboard arrows move by 1% (Shift: 5%), and Center artwork resets position/rotation. Keep the quote action beside the current specification.

Scoped `.studio-v4` styling uses 16px card corners, 14px control labels, 46px fields, a 410px desktop controls column (365px at narrower desktop), larger shape tiles, and a 48px desktop title. Match those rules when extending this workspace.

### Catalog and detail

The catalog opens with a large two-line title and layered blank-bag imagery. Refined product cards keep the five original product families with source photographs, handle/use filters and up to three comparison columns. Detail pages contain Small, Medium and Large published sizes, GSM and a direct design action. Do not label inferred width/height/gusset order until a client drawing establishes it.

### Quote request

Four explicit steps: bag, branding, quantity/destination, company/contact. A persistent summary keeps the selected bag visible. Preserve user input on validation/network errors. The final confirmation appears only after a successful server save.

### Company and guidance

Supporting pages share an editorial header, restrained geometric background, generous spacing and stronger headings. Manufacturing uses original photographs and controlled video playback. Partner, resource and journal cards share the new borders, spacing and hover treatment. Material information separates PP composition, reuse, recycled content and local recycling. Certificates show original scans with verification status. Journal articles use practical buyer guidance and preserve the original six slugs; all rewrites need editorial sign-off.

### Customer / sales workspaces

These are functional visitor-specific demo personas with the refreshed heading, tab, card and document treatment. Request detail uses consistent tabs for specification, quotation, artwork and timeline. Show version numbers and approval state close to the corresponding proof. Sales also has inquiry review, content drafts/publishing, unsent notifications and activity/export/reset.

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
| `certificate-iso*.webp`, `public/documents/iso-*-original.png` | Display derivatives and original scans; readable transcription with current issuer verification still required |
| `studio-v4/*.webp` | Five individual transparent AI-generated blank-bag mockups, tinted at runtime; current designer |
| `studio-bag-atlas.png` | Earlier mockup geometry retained for historic artwork snapshots |
| `docs/asset-sources.json` | Asset source manifest |
| `docs/source-catalog.json` | Original catalog snapshot with 15 variants |

The designer is a 2D concept preview. Both sides reuse the same indicative shape; the bag does not change physical proportions for each size. It is not a dieline, a 3D model, a color sample or a guarantee of printable area. Production work should substitute approved per-variant templates or approved 3D assets. Preview downloads carry a concept label.

Kobags assets remain subject to their owner's rights. The archive is a handoff for this project; it does not grant trademark, photo or video rights for unrelated brands. Replace brand assets when using the architecture for another business.

### Guided visitor journey

Visitors need no sign-in to try the complete demo. The quote form can fill fictional contact details; consent remains explicit. After saving a request, the customer journey shows four steps: request saved → quotation → artwork → demo order. Each stage has one clear next action. The demo prepares a fictional quote and a proof using the saved design, then waits for separate buyer approvals. The final **Place demo order** action shows a simulated order reference and destination, with clear no-payment/no-real-order wording. Sales remains available for revisions and progress demonstrations. Different visitors have separate records; a guest returns through an essential seven-day cookie.

## 6. Component map

| Area | Main implementation |
| --- | --- |
| Shell/navigation/footer | `components/site-shell.tsx` |
| Brand homepage | `components/home-page.tsx` |
| 3D showroom UI | `components/bag-showcase.tsx` |
| Procedural 3D tote, controls and animation lifecycle | `lib/bag-scene.ts` |
| Site-wide edition 05 visual system | `app/brand-refresh.css` |
| Studio controls and concept export | `components/bag-studio.tsx` |
| Canvas composition and pointer/keyboard behavior | `components/bag-preview.tsx` |
| Mockup mapping, silhouette bounds, artwork fonts | `lib/studio-artwork.ts` |
| Locale and browser draft | `components/kobags-context.tsx` |
| Catalog and detail | `components/product-catalog.tsx` |
| Quote steps | `components/quote-flow.tsx` |
| Guided demo steps | `components/demo-journey.tsx` |
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
- Use clear language around fictional prices, no outgoing messages and isolated demo records.
- EN/SQ covers the homepage and core studio/quote journey. Supporting editorial and most sales copy are English; human Albanian review and full locale coverage remain outstanding.
- Avoid unsupported recycled-content, plastic-free, carbon-impact, food-contact or durability claims.

## 8. Next design deliverables

Before production: approved product dimension drawings and print zones for all 15 variants; material/ink color references; production artwork/file requirements; copy and evidence sign-off; full language coverage; accessibility review including screen-reader and 200% text use; original-asset rights confirmation. These are concrete inputs for the next designer, not represented as completed by this demo.

## Studio and certificate follow-up

The studio also exports a two-sided design sheet with specifications. The certificate section now uses framed original documents on the homepage and an accessible document library with search, zoom, readable metadata and original-file downloads. Maintain both the expiry field and additional conditional date shown on the scans. See `STUDIO-AND-CERTIFICATES-16.09.26.md` for the exact record and implemented handout ideas.
