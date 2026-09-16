# Bag studio and certificate library — 16 September 2026

## Ideas adopted from the supplied brief and audit

The reference documents inform the demo; the user's request keeps the manufacturing-led homepage, public test access and a complete buyer-to-demo-order journey.

- **Build a complete design:** logo and text can coexist on each face, with independent position, rotation and size. Select a layer in the editor or directly on the canvas. Font, alignment and ink apply to the text layer.
- **Make iteration forgiving:** undo/redo retains up to 20 editing steps during the studio visit, coalescing rapid typing and drag updates. Copy the current face to the other side; replacement is clearly labelled and undoable. Removing a layer preserves the other layer.
- **Give procurement something useful:** export a 2000 × 1400 PNG sheet showing both faces and the catalogue specifications, requested print-color count and custom-size request. The existing individual-face export remains available.
- **Expose request details early:** custom dimensions can be entered in the studio, alongside the previous 1–4 print-color selector, wholesale minimum and sample link. Custom dimensions are a feasibility request, not a deformation of the illustrative mockup.
- **Preserve the full journey:** both layers, placements and request details persist in the draft, immutable RFQ and prepared artwork revision. Demo order and reorder still require separate approvals. No real order, email or payment is created.
- **Present actual evidence well:** the homepage now shows the original certificate documents. The certificate library provides readable metadata, search, keyboard-accessible inspection/zoom, byte-identical original PNG downloads and links to the original source.

## Certificate transcription

Source files: the Kobags-published `Certifikimi 1.png` and `Certifikimi 2.png`. Copies are retained in `public/documents/iso-9001-original.png` and `iso-14001-original.png`; the smaller WebP images remain display derivatives.

| Field | Quality | Environmental management |
| --- | --- | --- |
| Standard printed | ISO 9001:2015 | ISO 14001:2015 |
| Certificate number | SB.26.0004.00.QMS | SB.26.0005.00.EMS |
| Named entity | Eco Bag Solution L.L.C. | Eco Bag Solution L.L.C. |
| Certification body shown | Certi W | Certi W |
| Registered / latest issue | 27 January 2026 | 27 January 2026 |
| Expiry field | 26 January 2029 | 26 January 2029 |
| Additional date in validity condition | 26 January 2027 | 26 January 2027 |

The scope describes production and sale of PP bags using the term “eco-friendly”. The page attributes that wording to the document. Both scans also condition validity on continuing assessment and annual fees. Both date fields are presented, with no claim of independently verified current validity. The relationship between the named entity and Kobags needs confirmation before procurement. These are management-system documents, not product environmental certifications. No certificate or official ISO badge has been generated or redrawn.

## Code contract

`Design.layeredArtwork` opts into simultaneous image/text rendering. Optional `textPlacement` and `backTextPlacement` contain bounded x/y/scale/rotation values. Existing primary placement fields continue to control the logo, or a legacy text-only design. Unflagged historical snapshots retain their previous logo-over-text rendering. The server validates and retains the optional fields; no database migration is needed. Sales proof-caption edits retain the logo for layered designs; historical unflagged proofs preserve their original text-replacement behavior.

`lib/studio-artwork.ts` owns layer placement and copying. `components/bag-preview.tsx` composes the layers before selection guides and hit-tests in reverse paint order. Guides are not a production print boundary and never enter exports. `components/bag-studio.tsx` owns session history and the design-sheet download. `lib/certificates.ts` and `components/certificates.tsx` own the source-backed records and their presentation.

## Validation

See `evidence/VERIFICATION.md` and `evidence/studio-layers-certificates.json` for current checks. QA runs only against local previews with fictional data. Issuer verification, real production artwork preparation and a production integration remain outside this demonstration.
