# KoBags technical audit response — 29 September 2026

The supplied three-page audit was treated as a list of findings and unverified checks. The changes below were reproduced and checked against the compiled local site before publication.

| Audit item | Resolution and evidence |
| --- | --- |
| P2: brand text exceeds 60 characters | Fixed in the textarea, editor update, persisted draft and server schema. Old browser drafts are trimmed on load. Tests covered 59, 60, 61 and 80 characters, both faces, refresh and quote carry-through. |
| P3: partial Albanian studio labels | Size, color and material now read consistently in the studio and quote summary; the 3D canvas instruction and downloaded concept sheets follow EN/SQ. The color remains visible in the phone preview specification. |
| Downloads not confirmed | The single-face and two-face downloads completed as readable PNGs of 1600 × 1820 and 2000 × 1400 pixels. The two-face image contains distinct front and back content. Export after logo upload passed. |
| Request save and customer/sales journey not tested in the audit | The full anonymous mobile flow passed through request save, customer review, sales view, fictional quotation, artwork approval, simulated order and reorder. Visitor isolation and a saved reference were checked. |
| Logo files and advanced controls not tested in the audit | PNG, JPG and WebP uploads passed. SVG and a file over 5 MB were rejected without replacing the saved logo. The five-family 3D suite passed rotation, artwork editing, front/back, exports and fallback behavior. |

The browser tests ran against an isolated compiled local Worker with fictional data. The public site remains a demo: it does not send a real email, payment or manufacturing order. These checks do not certify security, performance or physical-device compatibility.
