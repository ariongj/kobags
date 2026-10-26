import test from 'node:test';
import assert from 'node:assert/strict';
import { scriptNonce, contentSecurityPolicy, hstsPolicy } from '../lib/security-policy.ts';

test('each response gets an unpredictable nonce and executable inline code requires it', () => {
  const first = scriptNonce(), second = scriptNonce();
  assert.notEqual(first, second);
  assert.equal(atob(first).length, 24);
  const policy = contentSecurityPolicy(first);
  const scripts = policy.split('; ').find(p => p.startsWith('script-src '));
  assert.equal(scripts, `script-src 'self' 'nonce-${first}'`);
  assert.doesNotMatch(scripts, /unsafe-inline|unsafe-eval|https:|\*/);
  assert.match(policy, /script-src-attr 'none'/);
  assert.match(policy, /connect-src 'self' blob:/);
  assert.match(policy, /form-action 'self'/);
});

test('local artwork remains usable while unapproved providers and framing are restricted', () => {
  const policy = contentSecurityPolicy(scriptNonce());
  assert.match(policy, /img-src 'self' data: blob:/);
  assert.match(policy, /worker-src 'self' blob:/);
  assert.match(policy, /frame-ancestors 'self'/);
  assert.match(policy, /object-src 'none'/);
  assert.doesNotMatch(policy, /google|facebook|cloudflareinsights/);
  assert.equal(hstsPolicy, 'max-age=15552000');
  assert.doesNotMatch(hstsPolicy, /includeSubDomains|preload/);
});
