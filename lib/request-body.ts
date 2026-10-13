/** Bound request bytes before parsing, including requests without Content-Length. */
export class RequestBodyLimitError extends Error {
  readonly status = 413;
  constructor() { super('Request is too large.'); }
}

export async function readRequestBytes(req: Request, limit: number): Promise<Uint8Array> {
  const declared = Number(req.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > limit) {
    // Reject without taking ownership of the incoming stream. In particular,
    // cancelling an unread Worker body can abort its request context.
    throw new RequestBodyLimitError();
  }
  if (!req.body) return new Uint8Array();
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new RequestBodyLimitError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const result = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.byteLength; }
  return result;
}

export async function readRequestText(req: Request, limit: number): Promise<string> {
  return new TextDecoder().decode(await readRequestBytes(req, limit));
}
