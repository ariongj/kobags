# Focused bag-studio update — 16.09.26

The four supplied documents were used as reference material, not as instructions to rebuild the business platform. This update keeps the current brand, imagery, catalogue, 3D homepage showroom, storage and existing quote workflow.

## Backup

Created and verified before editing: `backups/16.09.26/Kobags-group.com.tar.gz`.
The archive includes source, Git history, build output and local application data. It excludes only reinstallable `node_modules` and the backup directory. `SHA256SUMS` and restoration notes sit alongside it. This is a local checkout backup, not a backup of the hosted database. Backups are excluded from Git and are not public downloads.

## Ideas adopted

- Move the existing wholesale minimum, printing limit and sample link into the studio introduction.
- Make front/back artwork status clear, with direct access to each side.
- Offer optional local white-background cleanup for logos, with restoration during the current studio visit. It removes near-white areas connected to the image boundary and preserves enclosed white details. It refuses an entirely empty result; users should check light edge details after cleanup.
- Warn when text blends into the selected fabric color and offer a clearer ink color. No color changes happen without the buyer choosing them. This is a screen-preview hint, not a color-accurate print proof.
- Let buyers select the existing 1–4 requested print colors in the studio. The value carries into the existing quote draft. Uploaded logos are not automatically counted or separated into production spot inks.
- Show both artwork faces in the quote's design-review step and list artwork sides in its summary, including a back-only design correctly.
- Provide English and Albanian copy for new controls and guidance.

## Scope kept small

No demo resets, database migration, operational workflow replacement, new integrations, pricing policy changes or publication. The screenshot paths in the supplied visual-evidence document were references; the screenshots themselves were not attached.

## Checks

- Production build and TypeScript check passed.
- Nine focused tests passed for front/back summaries, whitespace-only artwork, fabric contrast and background removal, including enclosed white details, transparent padding, colored backgrounds and edge-size inputs.
- Test command: `node --experimental-strip-types --test tests/studio-checks.test.mjs` (Node 22).
- Browser interaction and screenshot testing were not run.
