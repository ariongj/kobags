import test from 'node:test';
import assert from 'node:assert/strict';
import { parseByteRange, matchesIfRange, matchesIfNoneMatch } from '../lib/http-byte-range.ts';

test('video byte probes, open ranges and suffixes return exact storage offsets', () => {
  assert.deepEqual(parseByteRange('bytes=0-1', 100), { offset: 0, length: 2 });
  assert.deepEqual(parseByteRange('bytes=40-', 100), { offset: 40, length: 60 });
  assert.deepEqual(parseByteRange('bytes=-16', 100), { offset: 84, length: 16 });
  assert.deepEqual(parseByteRange('bytes=99-99', 100), { offset: 99, length: 1 });
});
test('ranges extending beyond EOF are clipped without reading extra data', () => {
  assert.deepEqual(parseByteRange('bytes=10-999', 100), { offset: 10, length: 90 });
  assert.deepEqual(parseByteRange('bytes=-999', 100), { offset: 0, length: 100 });
  assert.equal(parseByteRange(null, 100), null);
});
test('invalid, multiple, overflow and empty-file ranges cannot reach storage', () => {
  for (const value of ['bytes=100-', 'bytes=50-40', 'bytes=-0', 'bytes=-', 'bytes=0-1,4-5', 'bytes=1e2-', 'bytes=0-9007199254740993', 'bytes=9007199254740993-', 'items=0-1']) {
    assert.equal(parseByteRange(value, 100), 'unsatisfiable', value);
  }
  assert.equal(parseByteRange('bytes=0-1', 0), 'unsatisfiable');
});
test('If-Range allows only matching strong ETags or exact Last-Modified dates', () => {
  const uploaded = new Date('2026-10-14T10:20:30.450Z');
  assert.equal(matchesIfRange(null, '"current"', uploaded), true);
  assert.equal(matchesIfRange('"current"', '"current"', uploaded), true);
  assert.equal(matchesIfRange(uploaded.toUTCString(), '"current"', uploaded), true);
  for (const value of ['W/"current"', '"stale"', 'invalid', 'Wed, 14 Oct 2026 10:20:29 GMT']) assert.equal(matchesIfRange(value, '"current"', uploaded), false);
});
test('cache revalidation supports wildcard, weak and listed ETags without false matches', () => {
  for (const value of ['*', '"current"', 'W/"current"', '"old", W/"current"']) assert.equal(matchesIfNoneMatch(value, '"current"'), true);
  for (const value of [null, '"stale"', '"current-longer"']) assert.equal(matchesIfNoneMatch(value, '"current"'), false);
});
