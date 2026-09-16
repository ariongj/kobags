import test from "node:test";
import assert from "node:assert/strict";
import { artworkSides, inkContrast, readableInk, clearWhiteBackground } from "../lib/studio-checks.ts";

const blank = { logo: "", text: "", backLogo: "", backText: "" };

test("the quote identifies back-only artwork independently of the selected preview side", () => {
  assert.deepEqual(artworkSides({ ...blank, side: "front", backLogo: "data:image/png;base64,test" }), ["back"]);
  assert.deepEqual(artworkSides({ ...blank, side: "back", text: "ACME", backText: "THANK YOU" }), ["front", "back"]);
});

test("whitespace does not count as printed artwork", () => {
  assert.deepEqual(artworkSides({ ...blank, text: " \n ", backText: "\t" }), []);
});

test("contrast is symmetric and has the expected light/dark extremes", () => {
  assert.equal(inkContrast("#ffffff", "#ffffff"), 1);
  assert.equal(inkContrast("#000000", "#ffffff"), 21);
  assert.equal(inkContrast("#b3413d", "#ffffff"), inkContrast("#ffffff", "#b3413d"));
});

test("the suggested text ink is readable on every current fabric color", () => {
  for (const fabric of ["#276344", "#193b67", "#d9cba6", "#f1f0e8", "#2a2d30", "#b3413d", "#3864a7"])
    assert.ok(inkContrast(readableInk(fabric), fabric) >= 4.5, fabric);
});

function pixels(rows) {
  const colors = { W: [255,255,255,255], K: [0,0,0,255], T: [0,0,0,0], R: [240,40,40,255], A: [250,250,250,128] };
  return new Uint8ClampedArray(rows.flatMap((row) => [...row].flatMap((char) => colors[char])));
}

test("background cleanup preserves enclosed white logo details and colored pixels", () => {
  const data = pixels(["WWWWW", "WKKKW", "WKWKW", "WKRKW", "WWWWW"]);
  assert.equal(clearWhiteBackground(data, 5, 5), 16);
  assert.equal(data[(2 * 5 + 2) * 4 + 3], 255);
  assert.deepEqual([...data.slice((3 * 5 + 2) * 4, (3 * 5 + 2) * 4 + 4)], [240,40,40,255]);
  assert.equal(data[3], 0);
});

test("cleanup crosses transparent padding and clears near-white partially transparent edges", () => {
  const data = pixels(["TTTTT", "TAAAT", "TAKAT", "TAAAT", "TTTTT"]);
  assert.equal(clearWhiteBackground(data, 5, 5), 8);
  assert.equal(data[(2 * 5 + 2) * 4 + 3], 255);
});

test("cleanup leaves colored backgrounds unchanged and does not wrap across rows", () => {
  const data = pixels(["RRRRR", "RRRRR", "WRWRR", "RRRRR", "RRRRR"]);
  assert.equal(clearWhiteBackground(data, 5, 5), 1);
  assert.equal(data[(2 * 5 + 2) * 4 + 3], 255);
  assert.deepEqual([...data.slice(0,4)], [240,40,40,255]);
});

test("one-pixel-wide images and transparent input are safe", () => {
  const data = pixels(["W", "K", "W"]);
  assert.equal(clearWhiteBackground(data, 1, 3), 2);
  assert.equal(data[7], 255);
  assert.equal(clearWhiteBackground(pixels(["T"]), 1, 1), 0);
});

test("invalid image buffers are refused", () => {
  assert.throws(() => clearWhiteBackground(new Uint8ClampedArray(4), 2, 2), /INVALID_IMAGE_SIZE/);
  assert.throws(() => clearWhiteBackground(new Uint8ClampedArray(), 0, 0), /INVALID_IMAGE_SIZE/);
});
