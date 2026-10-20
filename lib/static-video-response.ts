import { matchesIfRange, parseByteRange } from "./http-byte-range";

/**
 * Some asset providers return the whole MP4 even when Range is forwarded.
 * Supply a single range without buffering the movie in Worker memory. Native
 * partial responses, conditional responses and errors are left untouched.
 */
export async function staticVideoResponse(request: Request, response: Response, buildSize?: number): Promise<Response> {
  if (!["GET", "HEAD"].includes(request.method) || response.status !== 200) return response;
  const size = response.headers.has("Content-Length") ? Number(response.headers.get("Content-Length")) : buildSize || 0;
  const encoding = response.headers.get("Content-Encoding");
  if (!Number.isSafeInteger(size) || size <= 0 || (encoding && encoding !== "identity")) return response;

  const headers = new Headers(response.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Content-Length", String(size));
  if (request.method === "HEAD") return new Response(null, { status: 200, headers });
  if (!response.body) return response;
  const validator = request.headers.get("If-Range");
  const matches = !validator?.startsWith("W/") && matchesIfRange(
    validator, headers.get("ETag") || "", new Date(headers.get("Last-Modified") || ""),
  );
  const range = matches ? parseByteRange(request.headers.get("Range"), size) : null;
  if (range === null) return new Response(response.body, { status: 200, headers });
  if (range === "unsatisfiable") {
    await response.body.cancel();
    headers.set("Content-Range", `bytes */${size}`);
    headers.set("Content-Length", "0");
    headers.set("Cache-Control", "private, no-store");
    return new Response(null, { status: 416, headers });
  }

  const reader = response.body.getReader();
  let position = 0;
  let remaining = range.length;
  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        while (remaining > 0) {
          const { done, value } = await reader.read();
          if (done) throw new Error("Video asset ended before the requested range.");
          const start = Math.max(0, range.offset - position);
          position += value.byteLength;
          if (start >= value.byteLength) continue;
          const length = Math.min(value.byteLength - start, remaining);
          controller.enqueue(value.subarray(start, start + length));
          remaining -= length;
          if (remaining === 0) {
            controller.close();
            await reader.cancel();
            reader.releaseLock();
          }
          return;
        }
      } catch (error) {
        controller.error(error);
        await reader.cancel(error).catch(() => {});
      }
    },
    async cancel(reason) {
      await reader.cancel(reason);
      reader.releaseLock();
    },
  });
  headers.set("Content-Range", `bytes ${range.offset}-${range.offset + range.length - 1}/${size}`);
  headers.set("Content-Length", String(range.length));
  return new Response(body, { status: 206, headers });
}
