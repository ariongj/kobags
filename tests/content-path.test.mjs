import test from 'node:test';
import assert from 'node:assert/strict';
import { validContentPath } from '../lib/cms/content-path.ts';

test('CMS public paths include root and nested editorial/product routes', () => {
  for (const path of ['', '/', '/about', '/products/box-bag', '/blog/reusable-bags', '/handoff-guide'])
    assert.equal(validContentPath(path), true, path);
});

test('CMS pages cannot create external-looking or reserved internal routes', () => {
  for (const path of ['//outside', '///outside', '/about//team', 'https://outside.test', '/assets', '/assets/image', '/documents', '/documents/report', '/handoff', '/handoff/source', '/api/inquiries', '/cms', '/request/token', '/design', '/quote', '/sq/about', '/signin-with-chatgpt'])
    assert.equal(validContentPath(path), false, path);
});
