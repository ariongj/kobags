import qrcode from "qrcode-generator";

export function normalizeQrUrl(value: string) {
  const raw = value.trim();
  if (!raw || raw.length > 500 || /\s/.test(raw)) throw Error("INVALID_QR_URL");
  const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : `https://${raw}`);
  if (!["https:", "http:"].includes(url.protocol) || !url.hostname.includes(".") || url.username || url.password || url.href.length > 500) throw Error("INVALID_QR_URL");
  return url.href;
}
export function qrMatrix(value: string) {
  const url = normalizeQrUrl(value);
  const qr = qrcode(0, "M");
  // URL serialisation uses ASCII/punycode and percent-encodes Unicode paths.
  qr.addData(url, "Byte");
  qr.make();
  return { url, qr };
}
export function createQrArtwork(value: string) {
  const { url, qr } = qrMatrix(value), count = qr.getModuleCount(), cell = 8, margin = 4;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = (count + margin * 2) * cell;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  for (let row = 0; row < count; row++) for (let col = 0; col < count; col++)
    if (qr.isDark(row, col)) ctx.fillRect((col + margin) * cell, (row + margin) * cell, cell, cell);
  const logo = canvas.toDataURL("image/png");
  if (logo.length > 20000) throw Error("QR_TOO_COMPLEX");
  return { logo, qrValue: url, name: new URL(url).hostname };
}
