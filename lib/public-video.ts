/** Refresh previously cached, non-seekable static video responses once. */
export function publicVideoSource(source: string) {
  return /^\/assets\/[^?#]+\.mp4$/i.test(source)
    ? `${source}?v=20261020-seek`
    : source;
}
