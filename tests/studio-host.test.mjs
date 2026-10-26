import test from "node:test";
import assert from "node:assert/strict";
import { studioEnabledForHost, isStudioPreviewHost, isStudioPath } from "../lib/studio-availability.ts";

test("production studio is limited to the exact review subdomain", () => {
  assert.equal(studioEnabledForHost("kobags.itdks.tech", "production"), true);
  for (const host of ["kobags-group.com", "www.kobags-group.com", "kobags-bag-studio.ariongj.chatgpt.site", "kobags.idks.tech", "localhost", "127.0.0.1", "kobags.itdks.tech.evil.example", "evil.kobags.itdks.tech", "kobags.itdks.tech@evil.example", ""]) {
    assert.equal(studioEnabledForHost(host, "production"), false, host);
  }
});
test("development enables loopback without enabling the customer domain", () => {
  for (const host of ["localhost", "127.0.0.1", "[::1]"]) assert.equal(studioEnabledForHost(host, "development"), true);
  assert.equal(studioEnabledForHost("kobags-group.com", "development"), false);
  assert.equal(isStudioPreviewHost("KOBAGS.ITDKS.TECH"), true);
});
test("localized, encoded and scan editor bookmarks remain guarded", () => {
  for (const path of ["/design", "/sq/design", "/%64esign?preview=1", "/design?model=coffee-test", "/sq/design/extra", "https://kobags-group.com/design"]) assert.equal(isStudioPath(path), true, path);
  assert.equal(isStudioPath("/products"), false);
});
