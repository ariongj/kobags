# Kobags Group — design handoff

## Studio testing subdomain — 26 October 2026

The studio is enabled only on `kobags.itdks.tech` (EN and SQ) and local development. The business domain and `www` keep the studio hidden and redirect editor bookmarks to the catalogue. The Worker and middleware derive availability from the actual request URL and overwrite internal headers; the server passes the result to client context. Forwarded headers, cookies and query parameters cannot enable it on the business domain. The review host stays separate from the canonical-domain redirect, sends noindex/no-store, disallows crawling and has an empty sitemap. Main-domain SEO and the customer CMS/inbox remain unchanged. No DNS or runtime settings are changed by this release. Earlier local-only notes below describe the previous launch phase.

## Collection photo and stock notice — 21 October 2026

The Thank you collection uses the client's original photograph of three white bags with green, orange and black prints. It appears in the homepage/catalogue collection card and on the stock request page. The original JPEG is unchanged; print colors and new stock combinations have not been inferred from it.

Smiley is temporarily out of stock. Its collection card carries an EN/SQ availability label; its request page presents an unavailable state and a link to other bags instead of an order form. All current Smiley variants are marked out in CMS. A one-time data migration records the prior draft/published versions, preserves unrelated content, and leaves subsequent staff restocking authoritative. The public studio remains hidden. Domain changes are handled by the owner.

## PDF bag references and production cards — 20 October 2026

The five homepage bag cards now use the original Kobags photographs shown in the client's “5 bag types.pdf”: black D-Cut, green Handle with red loops, black Box, white T-Shirt with integrated handles, and white String. The incorrect separate-handle T-Shirt cover and box-style Handle cover are removed from public use; the Handle gallery uses two verified views of its green/red bag. The catalogue retains its correctly classified client-photo variants, with the PDF photographs available in each gallery.

The factory hero has a lighter overlay and a small brightness adjustment, keeping darker shading behind the text. Manufacturing videos now use flush portrait cards, consistent caption bars, and a large play button. Native playback controls appear on activation and remain available without JavaScript. On phones the two cards share one row; the framed pale panel and dark side gutters are removed.

## Client media and contact update — 20 October 2026

The homepage factory film now uses the client's six-second Emona printing clip, with an exact-frame poster oriented to match the portrait video. The player keeps the full frame visible within a compact, height-limited layout. On Manufacturing, the Print photograph now shows black material with gold Fresh Food artwork, and the second reel has the single caption “Production Line” (“Linja e prodhimit” in Albanian).

The header shows the KOBAGS wordmark without the lower GROUP line, retaining the green KO and navy BAGS. A compact WhatsApp button links to the client-confirmed +383 43 877 753, with a labelled footer link as well. The floating button is omitted from the CMS, quotation/receipt routes and local studio so it does not obstruct those workspaces.

## Unnumbered public sections — 20 October 2026

Removed decorative 01/02/03/04 labels from homepage manufacturing and ordering sections, bag cards, catalogue photographs, manufacturing titles and video captions, responsibility cards, partner cards, certificates and journal cards. Compact heading spacing closes the space previously used by the numerals. The public studio remains hidden. Functional quotation progress, certificate identifiers, dimensions and stock quantities remain meaningful content.


## Client approval without the builder — 20 October 2026

The public website presents Kobags manufacturing, product photographs, the catalogue, stock collections and quotation requests. The interactive homepage showroom, design navigation and customization buttons are hidden until the real bag scans are ready. Previous studio links lead to the catalogue. Quotation summaries show a product example and the requested specifications; printing requirements are discussed with the team.

The complete mobile/desktop builder, logo and QR tools, 3D rotation and scan trial are retained in the local development environment. The following studio design notes remain relevant to that local work; they do not describe a publicly available feature during this launch phase.


## Phone experience — 20 October 2026

The phone studio now uses normal page scrolling, with a 272–330px preview instead of a fixed-height workspace and cramped inner settings panel. Opening **Your design** brings the preview and add controls together. The bag stays visible while settings scroll; **Focus** hides the preview for detailed work and **Preview** restores it. Short viewports and focused text inputs release the pinned preview to leave room for editing.

Logo, text and QR actions appear together. The selected-element dropdown replaces duplicate layer cards on phones; its 44px minus/plus buttons resize only that element. Undo, redo, photo/3D switching, front/back and fullscreen are beside the preview. Rotation/zoom controls open from **View**. The compact quote bar includes the design and preserves the wholesale minimum. Specifications, original samples and exports remain in **Details, real samples & downloads**.

The homepage keeps the approved manufacturing headline and green accent, with shorter introductory copy and paired phone actions. The factory film now follows the production heading before the three explanation steps. Desktop keeps the two-column manufacturing section.

Natural remains the fresh-design default; saved colors and artwork remain intact. Photo and 3D share the existing placement coordinates. The underlying illustrative bag models and real-photo assets are unchanged by this layout release.

## Launch audit update — 14 October 2026

See `LAUNCH-READINESS-2026-10-14.md` for the current release status and verification. Earlier dated sections describe historical implementation, not current operating instructions. Owner handoff files now live in `deliverables/handoff/` and are not published at `/handoff` or `/documents/*.zip`. Production CMS intake activation is authorized; email delivery remains unconfigured and staff must check the inbox manually. The production-domain cutover is documented in `DOMAIN-CUTOVER-2026-10-14.md`; DNS access and Google Search Console verification remain external launch steps.

## Uploaded scan test — 13 October 2026

A **3D test** choice sits alongside the five bags in one compact row. The coffee reference now uses reconstructed smooth ceramic: tapered walls, a rounded continuous lip, a real inner bowl, a closed base, a rounded handle with roots outside the inner bowl, and a complete saucer/underside. Damaged scan triangles and the patch lining from version 45 are removed. The original scan photograph is projected onto the smooth model at full strength, restoring the lettering, color variation, rim and interior detail. Geometry and surface normals match the accepted smooth version exactly. Uncaptured undersides retain inferred ceramic. Photo lighting and capture imperfections remain in the source texture; this is a visual reconstruction, not exact archival geometry or manufacturing CAD.

Studio reflections, ceramic clearcoat, self-shadowing and a soft contact shadow make the volume readable as it rotates. Front, back, top, underneath and three-quarter views, rotation, zoom, fullscreen and EN/SQ controls remain available. Existing bag drafts are preserved, and the coffee test is not an orderable product.

## Stock request recovery — 13 October 2026

Prepared stock requests retain their confirmation and saved specifications after refreshing. A request link opened in another browser explains that the receipt is unavailable and offers a fresh form. Saved stock choices that have been removed or become unavailable now ask the buyer to choose another option while retaining their contact details. Live intake remains off; the prepared-request screen continues to offer an explicit email handoff.

## Confirmed collection stock — 12 October 2026

Smiley and Thank you T-Shirt stock now offers 50 GSM in White only, and 60 GSM in White, Beige, Black and Red. These five client-confirmed combinations are marked available and remain editable in CMS. Custom studio colors are separate from finished-stock availability. Collection photographs and physical bag scans remain pending.

## Default color — 11 October 2026

Fresh designs and product-page starts use Natural with dark default text. Switching bag families retains the selected color when available, otherwise prefers Natural before the first configured color. Existing saved designs retain their chosen color.

## String bag refinement — 11 October 2026

The drawstring model has a fuller soft body, rounded lower corners, a wider gathered mouth and folds that fan out from the casing into the printable panel. The two drawcord strands follow the surface, with a small knot and separate loose ends. The mesh and artwork clipping now share one silhouette. This remains an illustrative, photo-informed model pending the physical product scan.

## Client feedback — 11 October 2026

Navigation and catalogue heading now say **Choose your bag**. Thank you and Smiley are finished-stock collections, with a separate request form for an existing GSM/color option, quantity and contact/delivery details. Collection pages have no artwork uploads, print controls or branding call-to-action. Custom bag design remains a separate journey. Mobile consent controls and the compact stock form were checked at 320/390px.

T-Shirt dimensions are **31 × 55 × 18 cm** (L × H × W); the previous three default sizes are replaced by the one client-confirmed size. Finished collections show **L31 × H55 × W18 cm**, with 50/60 GSM options initially marked for availability confirmation. No colors or in-stock status have been invented. Responsibility content now uses the client's supplied material, water-based ink, recycling and machine-wash care copy, translated into Albanian. These claims are client-provided copy, not newly obtained independent certification.

Pending client assets: finished collection photographs and physical bag scans/models to replace illustrative studio geometry. GSM/color stock combinations were confirmed on 12 October (see above). The existing 3D studio remains illustrative until scans are received and integrated.

## String and T-Shirt revision — 10 October 2026

The T-Shirt has an open mouth, thin joined handle tips, full-height folded sides and a contoured base. The String has a soft rounded body, gathered opening, pinched seams and a loose continuous cord with a knot. Both include interior cloth and retain their existing artwork editing, colors and rotation controls. Reference renders and responsive checks are recorded in `evidence/VERIFICATION.md`.

## Studio visual refinement — 10 October 2026

The Box and Handle bag openings have connected fabric interiors, contoured bases, thin folded hems and finer seams. Shared material crops and subtle interior shading replace flat dark inserts. Handle and surface self-shadows give the model depth while the floor shadow stays soft. The body texture has gentler relief, and the handle straps are thinner. Client-derived reference photos, artwork placement, colors and front/back controls remain in use. See `studio-asset-note.md` for the precise modeling boundary.


## Homepage client revisions — 10 October 2026

The current headline is **Manufacturing bags. Helping Brands.** Lime accents, including the original logo mask, use the slightly darker `#a6d17a`. The hero contains its introduction and two primary links; corner captions, the right-hand factory stamp, extra quotation prompt, 360 link and the proof strip beneath the photograph are removed. The hero height and bottom spacing are reduced for desktop and mobile. Made in Kosova appears with the production section instead.

Production copy reads **Material. Print. Finished to your specifications.** The printing-video frame is level. The homepage and catalogue include compact **Thank you bags** and **Smiley bags** category cards above the physical bag families. These use editorial marks, since matching supplied product photographs are unavailable, and link to quote requests with the chosen collection recorded alongside the buyer's notes. Existing product photographs and the interactive studio remain available.

Revision: 3 October 2026. Website demonstration, prepared from the supplied audit and the original Kobags website. Edition 05 combines original factory imagery, an interactive 3D showroom, a consistent product collection and a compact bag studio. The final audit refines mobile layouts, enlarged text, accessible controls and the complete design-to-simulated-order journey.

The final pass aligns photo artwork and PNG exports with the same saved positions used in 3D, including near the fabric edges. Selected overlapping layers remain independently draggable, paused drags undo as one action, and fullscreen/photo fallback stay editable. Original production galleries now use only verified supplied photographs; the D-Cut family has two distinct originals rather than an illustrative third image.

Quote requests retain explicit colors and the selected bag. Customers can inspect both artwork faces before approval and reorder the exact approved revision. Browser storage failures produce useful recovery guidance, and edits in another tab are preserved. Mobile view controls flow below the bag at enlarged text sizes; labels, selectors, summaries and footer links wrap. Secondary text has stronger contrast, and the real editor tabs remain distinct from the preview/side toggle buttons.

The 29 September technical audit follow-up keeps the 60-character brand-text limit visible on phones and enforces it in the editor and saved draft. Studio and quote size/color summaries, the 3D canvas instruction, and downloaded concept sheets now follow the selected EN/SQ language. The compact preview retains its color label on phones.

The 30 September presentation pass gives production, collection, 3D exploration and ordering distinct copy. Origin is stated once in the first-screen proof strip on desktop and mobile. Repeated brand-moment slogans and generic page descriptions were replaced with page-specific guidance. Resource downloads follow the chosen language, and the reusable source bundle includes this revision.

The completion pass carries EN/SQ through the buyer's specifications, quotation, artwork approval and order timeline, including known system statuses and certificate dates. Privacy, terms, browser-storage controls and missing-page recovery now follow the selected language. Custom commercial terms and buyer notes retain their original wording.

The SEO revision renders English at existing URLs and Albanian at `/sq` URLs, with language-specific titles, descriptions, canonical links and social previews. Public marketing pages are indexable; synthetic order/workspace and handoff pages remain excluded. Language switching preserves the design draft. The existing hero photograph and logo now have smaller delivery copies; original supplied assets remain in the handoff.

The final delivery pass keeps the same layouts and source photography, with responsive bag thumbnails, a smaller factory-film poster and a lighter showroom loading image. Secondary labels have stronger contrast, and the language switch includes its visible language code in its accessible name. Mobile Lighthouse evidence and its limits are recorded in `evidence/VERIFICATION.md`; automated full marks are not a claim of complete accessibility conformance.

## 1. Creative direction

The responsibility page has a dedicated forest-green opening, lime textile-style tag reading “Use. Reuse. Repeat.” (localized in Albanian), lightly drifting leaf outlines and mint material/care panels. The tag expresses an everyday reuse habit, not a certification or a quantified environmental claim. The original material-roll photograph and evidence guidance remain. Small-screen tags become a compact horizontal format; leaf motion stops when reduced motion is preferred.

**Manufacturing bags. Helping Brands.** The homepage leads with Kobags as a manufacturer: real equipment, material and production footage. The collection shows what the factory produces, and **Your brand. Your bag.** introduces the new customization experience. Preserve the original identity, navy/green palette and factory evidence. The dedicated `/design` page still opens directly into the working designer.

The original logo is retained. This is an extension of Kobags' navy/green identity, not a replacement brand. No new logo, fictional client endorsement or production certification is implied.

## 2. Design tokens

The base is `app/globals.css`; `app/brand-refresh.css` defines the brand direction and `app/compact.css` defines the shared compact/responsive layer. `app/responsibility.css` follows it and stays scoped to the responsibility page. Keep visual refinements scoped to their component; shared responsive refinements belong in `app/compact.css`.

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

Lead with “Build your bag.” Desktop retains the two-column working surface and internally scrolling controls. `app/mobile.css`, imported last, defines the mobile workspace described above; keep `app/compact.css` and the earlier `.studio-compact` rules as the desktop/base layer. The mobile preview is 210–285px tall at normal text size and expands with enlarged text. The quote action occupies its own row, outside the scrolled controls. Preserve the short studio footer and the expandable product resources.

**3D view** opens by default with a visible 360° control and slow automatic rotation of an untouched default design. Interaction stops the spin so buyers can place artwork without the bag moving. The five volumetric models use photographed fabric on the front, a distinct rear surface made from unprinted fabric in the same client photo, and separately modelled gussets, openings and closures. No clean rear-view photo was supplied, so the back is a visual reconstruction rather than a scanned product model. All five families retain independent front/back logo and text, direct logo/text selection and dragging, empty-space drag rotation, keyboard arrows, rotation buttons, zoom and reset. Reduced-motion users start with a still view. Fullscreen keeps the same controls; devices without WebGL receive the flat preview. The natural T-Shirt photo is used directly without recoloring; natural Handle and Box photos also keep their source fabric detail. Other selected colors remain visual approximations. The expandable resources section opens two or three distinct client-supplied photos of the selected bag family for material and construction reference.

The bag tab contains size, color, material, print-color count and an optional custom-dimension request. “Next: add your design” opens the artwork tab. Logo, Text and QR add independent elements, up to four on each side. A compact two-column element picker selects existing artwork and shows only its controls. Uploads automatically clean a uniform edge-connected background; existing transparency and enclosed details are preserved. Restore original is available during the editing session. Text includes a short field, three typefaces, alignment and ink color. QR accepts a website/page URL and keeps a four-module white border. Left/center/right and top/middle/bottom buttons provide quick placement. Artwork size is immediately available; coordinates and rotation sit inside the expandable **Position & rotation** section. Undo/redo, Center artwork, remove and copy-to-other-side remain available. Additional logos and text blocks are supported. A second logo never replaces the first unless Replace logo is selected. The String model now has one coherent drawstring and a more clearly folded mouth; T-Shirt and D-Cut handle openings have thicker inner edges.

In **3D view**, click or tap a logo, text or QR element to select it. Drag it in any direction within the artwork placement limits; a dashed outline follows the selected layer. Drag empty fabric/background to rotate the bag. Selecting visible back artwork switches the editing side without snapping the camera. Arrow keys nudge selected artwork (Shift: larger steps); Escape deselects it. A complete drag is one undo step, even with a pause. Fullscreen and mobile touch use the same editing behavior.

**Photo + artwork** is the alternate flat canvas, based on blank cutouts edited from the supplied product photos. Buyers can drag artwork directly and use keyboard placement. Both views use the same saved design. Dragging preserves the initial grab offset; keyboard arrows move by 1% (Shift: 5%). Guides can be hidden and never appear in exports. The clean downloads remain a single-face concept and a two-sided specification sheet. Keep controls readable; achieve compactness by removing duplicate information and revealing advanced tools on demand.

### Catalog and detail

The catalog opens with a large two-line title and layered blank-bag imagery. Refined product cards keep the five original product families with source photographs, handle/use filters and up to three comparison columns. Each detail page starts with the matching catalog photo and a gallery of two or three distinct product/print examples. Buyers can open a focused photo viewer, step through the gallery, and zoom in without losing their place. It also contains Small, Medium and Large published sizes, GSM and direct design/quote actions. Alternate photographs can show different colors or prints; label them as examples. Do not label inferred width/height/gusset order until a client drawing establishes it.

### Quote request

Four explicit steps: bag, branding, quantity/destination, company/contact. A persistent summary keeps the selected bag visible. Preserve user input on validation/network errors. The public form omits the internal example-details helper; it is available only with `?demo=1` for testing. The final confirmation appears only after a successful server save.

### Company and guidance

Supporting pages share an editorial header, restrained geometric background, generous spacing and stronger headings. Manufacturing uses original photographs and controlled video playback. Partner, resource and journal cards share the new borders, spacing and hover treatment. Material information separates PP composition, reuse, recycled content and local recycling. Certificates show original scans with verification status. Each of the six journal articles has a distinct client photograph that differs from its index card, plus English and Albanian buyer guidance. All editorial rewrites and translations need client review.

### Customer / sales workspaces

These are functional visitor-specific demo personas with the refreshed heading, tab, card and document treatment. Request detail uses consistent tabs for specification, quotation, artwork and timeline. Show version numbers and approval state close to the corresponding proof. Sales also has inquiry review, content drafts/publishing, unsent notifications and activity/export/reset.

## 4. Responsive behavior

Desktop uses side-by-side working panels and multi-column editorial sections. Tablet reduces cards and spacing; small screens stack content and use the header menu. Tables may scroll inside their own wrapper. The page itself should never scroll horizontally. Maintain a usable logo-upload area, visible errors and reachable quote actions on a 390px viewport.

The final responsive layer is `app/mobile.css`, loaded after the base, brand, compact, CMS and responsibility styles. Desktop section spacing remains 56px; mobile section spacing is 28px, with 16px card padding and a 56px header. Mobile page headings use 30px text. Preserve readable body text and the 44px primary controls; reduce repeated space before reducing type size.

Mobile is a primary review surface. Keep 44px main actions/menu rows, readable 16px text-entry fields, no horizontal page scrolling, and a scrollable menu in landscape. Decorative catalog-heading bags are hidden on mobile so filters and products appear sooner. Product imagery is shorter, footer spacing is reduced, and working controls remain readable. Check 320px, 390px and 768px widths plus short landscape screens after any layout change. Preserve the original manufacturing-led story and reduced-motion behavior.

## 5. Assets and provenance

| Asset | Source / treatment |
| --- | --- |
| `public/assets/logo.png`, `favicon.png` | Original Kobags identity; preserve proportions |
| `public/assets/client-2026-09/*-bag.jpg`, `home-*.jpg`, `detail-*.jpg` | Distinct client-supplied product photos for catalog, home, and detail; printed brand text is part of the original image |
| `public/assets/client-2026-09/factory-*.jpg`, material and process photographs | Client-supplied factory evidence across home, manufacturing, partners, resources, and journal; selection and source hashes in `docs/client-media-2026-09-28.json` |
| `printing-process.mp4` and `client-2026-09/*-reel.mp4` | One original horizontal film on home and two different client-supplied portrait reels on manufacturing; controls, no autoplay, preload none |
| `certificate-iso*.webp`, `public/documents/iso-*-original.png` | Display derivatives and original scans; readable transcription with current issuer verification still required |
| `studio-real-*.webp` | Five blank cutouts edited from client-supplied product photos for the editable flat preview and downloads; tint and artwork are composited at runtime. See `docs/studio-real-photo-sources.json` for source mapping |
| `studio-v4/*.webp` | Earlier blank mockups retained for reference |
| `studio-bag-atlas.png` | Earlier mockup geometry retained for historic artwork snapshots |
| `docs/asset-sources.json`, `docs/client-media-2026-09-28.json`, `docs/journal-article-media-sources.json` | Original asset sources, supplied archive selection and six article-photo hashes |
| `docs/source-catalog.json` | Original catalog snapshot with 15 variants |

The designer offers rotatable 3D family models with photographed front fabric, a reconstructed rear fabric surface and matching cloth texture on modelled gussets, bases and handles, alongside flat artwork previews. The models are built from one supplied photo per family, so unseen surfaces are reconstructed, and geometry does not change physical proportions for each catalogue size. Neither view is an approved dieline, production CAD, color sample or guarantee of printable area. Production work should substitute approved per-variant templates or approved 3D assets. Preview downloads carry a concept label.

The 28 September 2026 client archive supplied 72 photos and 105 short portrait videos. Distinct original photographs, video-frame posters and two short clips were curated for placements across the site; the existing horizontal process film remains on the homepage. The latest pass added six unique article photographs beyond the journal index images. Kobags assets remain subject to their owner's rights. The archive is a handoff for this project; it does not grant trademark, photo or video rights for unrelated brands. Replace brand assets when using the architecture for another business.

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
- EN/SQ covers the homepage, catalog/product details, studio, quote journey, shared shell, journal index and six journal articles, main supporting-page copy, footer policies and buyer quotation/artwork/order views. Default resource guides and the downloadable buyer checklist follow EN/SQ. Buyer notes and separately edited resource entries or commercial terms retain their author's language. Technical downloads and internal sales editors remain primarily English; human Albanian review remains outstanding.
- Avoid unsupported recycled-content, plastic-free, carbon-impact, food-contact or durability claims.

## 8. Next design deliverables

Before production: approved product dimension drawings and print zones for all 15 variants; material/ink color references; production artwork/file requirements; copy and evidence sign-off; full language coverage; accessibility review including screen-reader and 200% text use; original-asset rights confirmation. These are concrete inputs for the next designer, not represented as completed by this demo.

## Studio and certificate follow-up

The studio also exports a two-sided design sheet with specifications. The certificate section now uses framed original documents on the homepage and an accessible document library with search, zoom, readable metadata and original-file downloads. Maintain both the expiry field and additional conditional date shown on the scans. See `STUDIO-AND-CERTIFICATES-16.09.26.md` for the exact record and implemented handout ideas.

### Header wordmark color — 16 September 2026

The client requested the headline lime (`#c6eb9d`) on the header logo’s KO/bag symbol and GROUP. BAGS stays navy. `components/site-shell.tsx` and `app/compact.css` apply a clipped CSS mask using the original transparent logo, preserving its exact shapes and typography at every screen size. The original asset is unchanged; the footer retains its white treatment.

## 3D refinement — 3 October

The explicit front/back controls now reset the view on every selection. Buyers can enable or pause rotation from the design panel; camera actions and artwork gestures keep the motion state synchronized. Handle/Box interiors extend to their base, the D-Cut grip has a compressed fabric profile, and printing follows the scene lighting. Static and offscreen models stop rendering. An interrupted WebGL context retains the design and provides an editable photo view. The four-angle family review is recorded in `evidence/presentation-3d-multi-view.jpg`; physical production templates and variant geometry remain separate inputs.


## National buying guide — 3 October 2026

The homepage has a compact nationwide introduction linking to `/bags-kosovo` (and `/sq/bags-kosovo`). The guide pairs buying advice with a pale-green manufacturer contact card, a native all-municipalities disclosure and three short order-preparation steps. All 38 names are available in the first HTML response; the disclosure keeps the initial mobile view short and supports keyboard activation. Four columns become two on mobile; the contact and steps stack. Footer and contact links provide alternate entry points. No new photography duplicates existing client imagery, and “Made in Kosova” remains the national brand line.

## Homepage factory film — 20 October 2026

The original client printing video now sits in a 9:16 frame with a short caption beside it. The pale card replaces the navy heading/caption bands and wide dark video gutters. On phones the card is approximately 225–308px tall, with a full-frame touch target for play. Playback uses native controls after activation and falls back to native controls without JavaScript; there is no autoplay. CMS video/poster overrides remain supported. Shared player implementation: `components/factory-video.tsx`; homepage composition: `components/home-page.tsx`; final responsive styles: `app/mobile.css`.

The clip remains uncropped and has not been re-encoded. Browser checks cover 320, 393, 430, 768, 1024 and 1440px in English and Albanian, touch/keyboard playback, seeking, desktop fullscreen and no-JavaScript controls. These are Chromium viewport checks, not a physical iPhone/Safari certification. Review captures and results are kept privately in `deliverables/handoff/home-film-review-20261020/`.
