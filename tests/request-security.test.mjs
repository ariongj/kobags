import test from 'node:test';
import assert from 'node:assert/strict';
import { readRequestBytes, readRequestText, RequestBodyLimitError } from '../lib/request-body.ts';
import { demoSession } from '../lib/demo-session.ts';
import { cookie, passwordHash, verifyPassword } from '../lib/cms/password.ts';

function streamedRequest(parts, headers = {}) {
  let reads = 0;
  let cancelled = false;
  const request = new Request('https://example.test/api/cms/login', {
    method: 'POST', headers, duplex: 'half',
    body: new ReadableStream({
      pull(controller) {
        if (reads === parts.length) { controller.close(); return; }
        controller.enqueue(new TextEncoder().encode(parts[reads++]));
      },
      cancel() { cancelled = true; },
    }, { highWaterMark: 0 }),
  });
  return { request, reads: () => reads, cancelled: () => cancelled };
}

test('oversized chunked requests stop reading and cancel before the rest is buffered', async () => {
  const input = streamedRequest(['1234', '5678', 'never read']);
  await assert.rejects(readRequestBytes(input.request, 7), RequestBodyLimitError);
  assert.equal(input.reads(), 2);
  assert.equal(input.cancelled(), true);
});

test('declared oversized requests are rejected before consuming their body', async () => {
  const input = streamedRequest(['never read'], { 'Content-Length': '100000000' });
  await assert.rejects(readRequestBytes(input.request, 4096), RequestBodyLimitError);
  assert.equal(input.reads(), 0);
});

test('understated Content-Length cannot bypass the streaming byte limit', async () => {
  const input = streamedRequest(['1234', '5678'], { 'Content-Length': '1' });
  await assert.rejects(readRequestBytes(input.request, 7), RequestBodyLimitError);
});

test('limits count UTF-8 bytes while valid multibyte requests remain intact', async () => {
  await assert.rejects(readRequestText(streamedRequest(['ëëë']).request, 5), RequestBodyLimitError);
  assert.equal(await readRequestText(streamedRequest(['Për', 'shëndetje']).request, 100), 'Përshëndetje');
  assert.equal(await readRequestText(streamedRequest(['1234']).request, 4), '1234');
});

test('browser ownership cannot be selected using platform identity headers', async () => {
  const headers = { 'oai-authenticated-user-id': 'same-forged-identity' };
  const first = await demoSession(new Request('https://example.test/api/inquiries', { headers }));
  const second = await demoSession(new Request('https://example.test/api/inquiries', { headers }));
  assert.match(first.owner, /^guest:[a-f0-9]{64}$/);
  assert.notEqual(first.owner, second.owner);
  assert.match(first.cookie, /^__Host-kobags-demo=/);
  assert.match(first.cookie, /HttpOnly; SameSite=Lax; Max-Age=604800; Secure$/);
  const again = await demoSession(new Request('https://example.test/api/inquiries', {
    headers: { Cookie: first.cookie.split(';')[0], 'oai-authenticated-user-id': 'another-forged-identity' },
  }));
  assert.equal(again.owner, first.owner);
  assert.equal(again.cookie, undefined);
});

test('CMS credentials use salted hashes and HTTPS sessions are protected cookies', async () => {
  const password = crypto.randomUUID() + crypto.randomUUID();
  const first = await passwordHash(password);
  const second = await passwordHash(password);
  assert.notEqual(first, second);
  assert.equal(await verifyPassword(password, first), true);
  assert.equal(await verifyPassword(password + 'wrong', first), false);
  assert.equal(await verifyPassword(password, 'invalid'), false);
  assert.match(cookie(new Request('https://example.test/cms'), 'a'.repeat(64)), /HttpOnly; SameSite=Strict; Max-Age=28800; Secure$/);
});
