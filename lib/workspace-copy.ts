import { colors } from "./catalog";

const labels: Record<string, string> = {
  new: "E re", "needs information": "Kërkon informacion", qualified: "E kualifikuar", quoted: "Ofertuar", won: "Fitua", lost: "Humbur",
  issued: "Lëshuar", accepted: "Pranuar", "changes-requested": "Kërkohen ndryshime", review: "Në shqyrtim", approved: "Miratuar",
  "not-required": "Nuk kërkohet", pending: "Në pritje", confirmed: "Konfirmuar",
  "Production scheduled": "Prodhimi u planifikua", "In production": "Në prodhim", "Quality review": "Kontrolli i cilësisë", "Ready for dispatch": "Gati për dërgim", Dispatched: "Dërguar",
  Small: "E vogël", Medium: "Mesatare", Large: "E madhe",
  "Bag Studio": "Studioja e çantave", "Demo buyer": "Klient demo", "Demo sales": "Shitjet demo",
  "Request received. Configuration preserved.": "Kërkesa u pranua. Konfigurimi u ruajt.",
  "Marked fictional payment condition satisfied — no payment processed": "Kushti i pagesës fiktive u plotësua — nuk u përpunua pagesë.",
  "Fictional demonstration prices only. Shipping and tax excluded. This is not a Kobags offer. No payment is collected and no real order is sent.": "Çmime fiktive vetëm për demonstrim. Transporti dhe taksat nuk përfshihen. Kjo nuk është ofertë e Kobags. Nuk merret pagesë dhe nuk dërgohet porosi reale.",
  "FICTIONAL DEMO QUOTATION. Shipping and tax excluded; to be confirmed. This is not a Kobags offer. No payment is collected.": "OFERTË FIKTIVE DEMO. Transporti dhe taksat nuk përfshihen dhe duhen konfirmuar. Kjo nuk është ofertë e Kobags. Nuk merret pagesë.",
};

// Translate known system labels only. Preserve buyer names, custom terms and notes.
export function workspaceLabel(value: string, lang: "en" | "sq") {
  return lang === "sq"
    ? colors.find((color) => color.name === value)?.sq || labels[value] || value
    : value;
}

export function workspaceEvent(value: string, lang: "en" | "sq") {
  if (lang !== "sq") return value;
  if (labels[value]) return labels[value];
  const versionPatterns: [RegExp, string][] = [
    [/^Issued fictional quotation v(\d+)$/, "U lëshua oferta fiktive v"],
    [/^Accepted quotation v(\d+)$/, "U pranua oferta v"],
    [/^Issued artwork revision (\d+)$/, "U lëshua versioni i dizajnit "],
    [/^Approved artwork v(\d+)$/, "U miratua dizajni v"],
  ];
  for (const [pattern, prefix] of versionPatterns) {
    const match = value.match(pattern);
    if (match) return prefix + match[1];
  }
  const release = value.match(/^Released DEMO production handoff using quote v(\d+) and artwork v(\d+)$/);
  if (release) return `Porosia demo u regjistrua me ofertën v${release[1]} dhe dizajnin v${release[2]}.`;
  for (const [prefix, sq] of [
    ["Assigned to ", "Caktuar te "], ["Note: ", "Shënim: "],
    ["Requested quotation change: ", "Ndryshimi i kërkuar në ofertë: "],
    ["Requested artwork correction: ", "Korrigjimi i kërkuar në dizajn: "],
    ["Repeat request from ", "Kërkesë e përsëritur nga "],
  ]) if (value.startsWith(prefix)) return sq + value.slice(prefix.length);
  if (value.startsWith("Demo order: ")) return "Porosia demo: " + workspaceLabel(value.slice(12), lang);
  if (value.startsWith("Stage changed to ")) return "Statusi ndryshoi në " + workspaceLabel(value.slice(17), lang);
  return value;
}
