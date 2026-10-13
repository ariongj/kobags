export type ByteRange = { offset: number; length: number };

/** Support one byte range without buffering the object or accepting multipart ranges. */
export function parseByteRange(value: string | null, size: number): ByteRange | null | 'unsatisfiable' {
  if (value === null) return null;
  if (!Number.isSafeInteger(size) || size <= 0) return 'unsatisfiable';
  const match = /^bytes=(\d*)-(\d*)$/i.exec(value.trim());
  if (!match || (!match[1] && !match[2])) return 'unsatisfiable';
  const first = match[1] ? Number(match[1]) : null;
  const last = match[2] ? Number(match[2]) : null;
  if ((first !== null && !Number.isSafeInteger(first)) || (last !== null && !Number.isSafeInteger(last))) return 'unsatisfiable';
  if (first === null) {
    if (!last) return 'unsatisfiable';
    const length = Math.min(last, size);
    return { offset: size - length, length };
  }
  if (first >= size || (last !== null && last < first)) return 'unsatisfiable';
  return { offset: first, length: Math.min(last ?? size - 1, size - 1) - first + 1 };
}

/** If-Range requires a strong validator; stale/weak validators request the whole file. */
export function matchesIfRange(value: string | null, etag: string, uploaded: Date): boolean {
  if (value === null) return true;
  const validator = value.trim();
  if (validator.startsWith('"') || validator.startsWith('W/')) return validator === etag;
  const timestamp = Date.parse(validator);
  return Number.isFinite(timestamp) && timestamp === Math.floor(uploaded.getTime() / 1000) * 1000;
}

export function matchesIfNoneMatch(value: string | null, etag: string): boolean {
  return value !== null && value.split(',').some(part => part.trim() === '*' || part.trim().replace(/^W\//, '') === etag);
}
