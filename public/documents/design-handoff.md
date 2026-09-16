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

The page order is factory hero → manufacturing proof → production process/video → interactive 3D showroom → five-family collection → ordering steps → industry/material content → evidence → FAQs → shared footer. Product cards use original branded photos; the catalog introduction uses the existing blank illustrative mockups. A compact dark footer provides a design invitation on public information pages; the working designer uses a shorter footer.

### Interactive 3D showroom — `/#bag-showcase`

A large dark stage pairs an orbitable Handle Bag concept with live name and color controls. The tote has volumetric panels, ribbon handles, seam detail and procedural fabric shading. Its construction control separates the panels/handles and then reassembles them. Front/back buttons, rotation arrows, keyboard controls, reset and pause/play complement drag rotation. The 3D model repeats the name on both faces; the dedicated designer supports independent front/back artwork.

The showroom is an illustrative presentation, not approved manufacturing geometry or a measured exploded engineering drawing. It shows one representative tote. All five families remain available in the dedicated studio. Selection carries the front text, bag color and matching ink/typeface into that studio. The scene starts still for reduced-motion users and retains a working 2D fallback when WebGL is unavailable.

The intended balance is manufacturer first, products and customization next. Do not replace factory evidence with generated industrial imagery or invent capacity, employee, export-market or throughput statistics. Use future client-approved scale figures only when the source and scope are documented.

### Design landing page — `/design`

Lead with “Build your bag.” Keep the working surface compact: a 30px desktop title, 26px mobile title, 360px controls column (330/305px on smaller desktops/tablets), 38px fields and short shape tiles. Use the scoped `.studio-compact` rules at the end of `app/brand-refresh.css`; the older `.studio-v4` rules are the compatibility baseline. Cards stack below 700px, and the mobile preview is 310px tall. Desktop keeps the quote action visible while long editing controls scroll inside their panel. Mobile controls and the quote action stay in normal document flow so nothing covers the form. The designer has a short footer instead of the site's large promotional invitation.

**3D view** opens by default. All five families have distinct volumetric shapes, live bag color, independent front/back logo and text, direct logo/text selection and dragging, empty-space drag rotation, keyboard arrows, rotation buttons, zoom, reset and optional automatic rotation. Front/back actions select the matching view. Automatic motion starts off and remains disabled for reduced-motion users. Fullscreen keeps the same controls; devices without WebGL receive the existing flat preview.

The bag tab contains size, color, material, print-color count and an optional custom-dimension request. “Next: add your design” opens the artwork tab. Logo and Text select independent layers and show only the selected layer's controls. Logo includes upload, thumbnail/name and optional white-background cleanup; Text includes a short text field, three typefaces, alignment and ink color. Artwork size is immediately available; coordinates and rotation sit inside the expandable **Position & rotation** section. Undo/redo, Center artwork, remove and copy-to-other-side remain available.

In **3D view**, click or tap a logo/text layer to select it. Drag it in any direction within the artwork placement limits; a dashed outline follows the selected layer. Drag empty fabric/background to rotate the bag. Selecting visible back artwork switches the editing side without snapping the camera. Arrow keys nudge selected artwork (Shift: larger steps); Escape deselects it. A complete drag is one undo step, even with a pause. Fullscreen and mobile touch use the same editing behavior.

**Place artwork** remains an alternative flat canvas for precise dragging and keyboard placement. Both views use the same saved design. Dragging preserves the initial grab offset; keyboard arrows move by 1% (Shift: 5%). Guides can be hidden and never appear in exports. The clean downloads remain a single-face concept and a two-sided specification sheet. Keep controls readable; achieve compactness by removing duplicate information and revealing advanced tools on demand.

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

The final site-wide spacing layer is `app/compact.css`, loaded after the base and brand styles. Desktop section spacing is 56px and mobile spacing is 34px; cards use 22px/18px padding. The sticky header is 72px desktop and 64px mobile. Mobile page titles are 32px and body copy remains 15–16px. Compactness comes from less repeated space, not tiny text.

Mobile is a primary review surface. Keep 44px main actions/menu rows, readable 16px text-entry fields, no horizontal page scrolling, and a scrollable menu in landscape. Decorative catalog-heading bags are hidden on mobile so filters and products appear sooner. Product imagery is shorter, footer spacing is reduced, and working controls remain readable. Check 320px, 390px and 768px widths plus short landscape screens after any layout change. Preserve the original manufacturing-led story and reduced-motion behavior.

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

The designer offers illustrative 3D family models and flat artwork previews. Family geometry does not change physical proportions for each catalogue size. Neither view is an approved dieline, production CAD, color sample or guarantee of printable area. Production work should substitute approved per-variant templates or approved 3D assets. Preview downloads carry a concept label.

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
| Five-family 3D designer and lifecycle | `components/studio-3d.tsx`, `lib/studio-scene.ts` |
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

### Header wordmark color — 16 September 2026

The client requested the headline lime (`#c6eb9d`) on the header logo’s KO/bag symbol and GROUP. BAGS stays navy. `components/site-shell.tsx` and `app/compact.css` apply a clipped CSS mask using the original transparent logo, preserving its exact shapes and typography at every screen size. The original asset is unchanged; the footer retains its white treatment.
