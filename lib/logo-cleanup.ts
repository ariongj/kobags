/** Conservative, local background cleanup. Only a uniform edge-connected
 * backdrop is removed. Transparent artwork and enclosed details are preserved. */
export function clearFlatBackground(pixels: Uint8ClampedArray, width: number, height: number) {
  if (pixels.length !== width * height * 4 || width < 1 || height < 1) throw Error("INVALID_IMAGE_SIZE");
  const border: number[] = [];
  for (let x = 0; x < width; x++) border.push(x, (height - 1) * width + x);
  for (let y = 1; y < height - 1; y++) border.push(y * width, y * width + width - 1);
  // Already transparent logos should keep all their white lettering/details.
  if (border.filter(i => pixels[i * 4 + 3] < 240).length > border.length * .08) return 0;
  const median = (c: number) => border.map(i => pixels[i * 4 + c]).sort((a, b) => a - b)[Math.floor(border.length / 2)];
  const bg = [median(0), median(1), median(2)];
  const distance = (i: number) => Math.max(...bg.map((v, c) => Math.abs(pixels[i * 4 + c] - v)));
  if (border.filter(i => distance(i) <= 16).length < border.length * .92) return 0;
  const visited = new Uint8Array(width * height), queue = new Uint32Array(width * height);
  let head = 0, tail = 0;
  const visit = (i: number) => {
    if (visited[i]) return;
    visited[i] = 1;
    if (distance(i) <= 36) queue[tail++] = i;
  };
  border.forEach(visit);
  while (head < tail) {
    const i = queue[head++], x = i % width, y = Math.floor(i / width);
    if (x) visit(i - 1);
    if (x < width - 1) visit(i + 1);
    if (y) visit(i - width);
    if (y < height - 1) visit(i + width);
  }
  // Never erase a blank/light logo completely or nibble at a photograph's edge.
  if (tail > width * height * .995 || tail < width * height * .03) return 0;
  for (let k = 0; k < tail; k++) {
    const i = queue[k], alpha = Math.max(0, (distance(i) - 16) / 20);
    pixels[i * 4 + 3] = Math.round(pixels[i * 4 + 3] * alpha);
  }
  return tail;
}

export async function prepareLogo(file: File, limit: number) {
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width > 8000 || bitmap.height > 8000) throw Error("IMAGE_TOO_LARGE");
    for (const edge of [1024, 768, 512, 320, 192]) {
      const canvas = document.createElement("canvas"), fit = Math.min(1, edge / Math.max(bitmap.width, bitmap.height));
      canvas.width = Math.max(1, Math.round(bitmap.width * fit));
      canvas.height = Math.max(1, Math.round(bitmap.height * fit));
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const original = canvas.toDataURL("image/webp", .94);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const removed = clearFlatBackground(pixels.data, canvas.width, canvas.height);
      if (removed) ctx.putImageData(pixels, 0, 0);
      let image = canvas.toDataURL("image/png");
      if (image.length > limit) image = canvas.toDataURL("image/webp", .94);
      if (image.length <= limit && original.length <= limit) return { image, original, cleaned: !!removed };
    }
    throw Error("IMAGE_TOO_LARGE");
  } finally { bitmap.close(); }
}
