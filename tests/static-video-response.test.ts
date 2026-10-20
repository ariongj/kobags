import test from "node:test";
import assert from "node:assert/strict";
import { staticVideoResponse } from "../lib/static-video-response";

const url = "https://kobags.itdks.tech/assets/test.mp4";
function fixture() {
  let reads = 0, cancelled = false;
  const body = new ReadableStream<Uint8Array>({
    pull(c) {
      const start = reads++ * 4;
      if (start >= 20) c.close();
      else c.enqueue(Uint8Array.from([start, start + 1, start + 2, start + 3]));
    },
    cancel() { cancelled = true; },
  }, { highWaterMark: 0 });
  return {
    response: new Response(body, { headers: { "Content-Length": "20", "Content-Type": "video/mp4", ETag: '"current"' } }),
    reads: () => reads, cancelled: () => cancelled,
  };
}
test("an origin ignoring Range still serves exact cross-chunk, open and suffix bytes", async () => {
  for (const [range, bytes, contentRange] of [
    ["bytes=3-6", [3,4,5,6], "bytes 3-6/20"],
    ["bytes=17-", [17,18,19], "bytes 17-19/20"],
    ["bytes=-3", [17,18,19], "bytes 17-19/20"],
  ] as const) {
    const source = fixture();
    const result = await staticVideoResponse(new Request(url, { headers: { Range: range } }), source.response);
    assert.equal(result.status, 206);
    assert.equal(result.headers.get("Content-Range"), contentRange);
    assert.equal(result.headers.get("Accept-Ranges"), "bytes");
    assert.equal(Number(result.headers.get("Content-Length")), bytes.length);
    assert.deepEqual([...new Uint8Array(await result.arrayBuffer())], bytes);
    assert.equal(source.cancelled(), true);
    if (range === "bytes=3-6") assert.equal(source.reads(), 2, "stop reading as soon as the requested bytes are delivered");
  }
});
test("invalid ranges return 416 without consuming the upstream movie", async () => {
  for (const range of ["bytes=20-", "bytes=-0", "bytes=0-1,3-4"]) {
    const source = fixture();
    const result = await staticVideoResponse(new Request(url, { headers: { Range: range } }), source.response);
    assert.equal(result.status, 416);
    assert.equal(result.headers.get("Content-Range"), "bytes */20");
    assert.equal(source.reads(), 0);
    assert.equal(source.cancelled(), true);
  }
});
test("stale or weak If-Range returns the full representation; a matching strong tag permits a range", async () => {
  for (const tag of ['"old"', 'W/"current"', '"current"']) {
    const result = await staticVideoResponse(new Request(url, { headers: { Range: "bytes=0-1", "If-Range": tag } }), fixture().response);
    assert.equal(result.status, tag === '"current"' ? 206 : 200);
    assert.equal((await result.arrayBuffer()).byteLength, tag === '"current"' ? 2 : 20);
  }
});
test("native partial responses and unknown or encoded sizes are preserved; HEAD reports full metadata", async () => {
  const request = new Request(url, { headers: { Range: "bytes=0-1" } });
  for (const source of [
    new Response(new Uint8Array([0,1]), { status: 206, headers: { "Content-Range": "bytes 0-1/20" } }),
    new Response(null, { status: 304 }),
    new Response("unknown length"),
    new Response("compressed", { headers: { "Content-Encoding": "gzip", "Content-Length": "10" } }),
  ]) assert.equal(await staticVideoResponse(request, source), source);
  const head = await staticVideoResponse(new Request(url, { method: "HEAD", headers: { Range: "bytes=0-1" } }), new Response(null), 20);
  assert.equal(head.status, 200);
  assert.equal(head.headers.get("Content-Length"), "20");
  assert.equal(head.body, null);
});
test("the compiled size enables seeking when the asset binding omits length metadata", async () => {
  const source = fixture();
  source.response.headers.delete("Content-Length");
  const result = await staticVideoResponse(new Request(url, { headers: { Range: "bytes=3-6" } }), source.response, 20);
  assert.equal(result.status, 206);
  assert.equal(result.headers.get("Content-Range"), "bytes 3-6/20");
  assert.deepEqual([...new Uint8Array(await result.arrayBuffer())], [3,4,5,6]);
});
test("client cancellation stops the upstream stream and a truncated source fails explicitly", async () => {
  const source = fixture();
  const result = await staticVideoResponse(new Request(url, { headers: { Range: "bytes=0-18" } }), source.response);
  const reader = result.body!.getReader();
  await reader.read();
  await reader.cancel("viewer moved away");
  assert.equal(source.cancelled(), true);
  assert.ok(source.reads() < 5);
  const truncated = new Response(new Uint8Array([0,1]), { headers: { "Content-Length": "20" } });
  const partial = await staticVideoResponse(new Request(url, { headers: { Range: "bytes=0-10" } }), truncated);
  await assert.rejects(partial.arrayBuffer(), /ended before/);
});
