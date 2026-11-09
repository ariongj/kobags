import test from "node:test";
import assert from "node:assert/strict";
import { initialDesign } from "../lib/catalog.ts";
import { fitQuotePreview, mergeDesignDraft, quoteDownloadLayout, quoteRepresentation, quoteSpecification, savedQuotePreview } from "../lib/design-draft.ts";

const frontScene = "data:image/png;base64,front-scene";
const backScene = "data:image/png;base64,back-scene";
const frontArtwork = "data:image/png;base64,front-transparent-artwork";
const backArtwork = "data:image/png;base64,back-transparent-artwork";
const generatedNote = "[3D studio]\nStudio configuration: box · L\nCustom dimensions: 40 × 38 × 17 cm.\n[/3D studio]";
const studioDraft = () => ({
  ...initialDesign,
  product: "box-bag", size: "Small", color: "Natural", customDimensions: "40 × 38 × 17 cm",
  logo: frontScene, logoName: "Studio front artwork", backLogo: backScene, backLogoName: "Studio back artwork",
  note: `Please call before delivery.\n\n${generatedNote}`,
  referenceStudio: { source: "ariongj-mo-b23cd8f", productName: "Box bag", size: "L", dimensions: "40 × 38 × 17 cm", fabric: "#efeee9", front: frontScene, back: backScene },
});

test("each specification change removes the stale reference and exact scene copies without mutating the original", () => {
  for (const patch of [{ product: "handle-bag" }, { size: "Large" }, { color: "Black" }, { customDimensions: "30 × 30 × 10 cm" }]) {
    const original = studioDraft();
    const saved = structuredClone(original);
    const next = mergeDesignDraft(original, patch);
    assert.equal(next.referenceStudio, undefined);
    assert.equal(next.logo, "");
    assert.equal(next.backLogo, "");
    assert.equal(next.logoName, "");
    assert.equal(next.backLogoName, "");
    assert.equal(next.note, "Please call before delivery.");
    for (const [key, value] of Object.entries(patch)) assert.equal(next[key], value);
    assert.deepEqual(original, saved);
  }
});

test("quantity, customer details and unchanged specifications retain the studio reference and previews", () => {
  const original = studioDraft();
  for (const patch of [{ quantity: 10000 }, { company: "Example buyer" }, { product: original.product, size: original.size, color: original.color, customDimensions: original.customDimensions }]) {
    const next = mergeDesignDraft(original, patch);
    assert.equal(next.referenceStudio, original.referenceStudio);
    assert.equal(next.logo, frontScene);
    assert.equal(next.backLogo, backScene);
    assert.equal(next.note, original.note);
  }
});

test("genuine transparent studio artwork is preserved even with the standard studio filenames", () => {
  const original = { ...studioDraft(), logo: frontArtwork, backLogo: backArtwork };
  const next = mergeDesignDraft(original, { product: "handle-bag" });
  assert.equal(next.referenceStudio, undefined);
  assert.equal(next.logo, frontArtwork);
  assert.equal(next.backLogo, backArtwork);
  assert.equal(next.logoName, original.logoName);
  assert.equal(next.backLogoName, original.backLogoName);
  assert.equal(next.note, "Please call before delivery.");
});

test("explicit replacement uploads and names survive while the other stale scene is cleared", () => {
  const front = mergeDesignDraft(studioDraft(), { size: "Large", logo: frontArtwork, logoName: "new-front.png" });
  assert.equal(front.logo, frontArtwork);
  assert.equal(front.logoName, "new-front.png");
  assert.equal(front.backLogo, "");
  assert.equal(front.backLogoName, "");

  const back = mergeDesignDraft(studioDraft(), { color: "Black", backLogo: backArtwork, backLogoName: "new-back.png" });
  assert.equal(back.backLogo, backArtwork);
  assert.equal(back.backLogoName, "new-back.png");
  assert.equal(back.logo, "");
  assert.equal(back.logoName, "");
});

test("an explicit new studio export is authoritative despite simultaneous specification changes", () => {
  const original = studioDraft();
  const replacement = { ...original.referenceStudio, productName: "Handle bag", front: "new-front-scene", back: "new-back-scene" };
  const replacementNote = "Customer request.\n\n[3D studio]\nNew configuration: handle · L\n[/3D studio]";
  const next = mergeDesignDraft(original, { product: "handle-bag", referenceStudio: replacement, logo: frontArtwork, backLogo: backArtwork, note: replacementNote });
  assert.equal(next.referenceStudio, replacement);
  assert.equal(next.logo, frontArtwork);
  assert.equal(next.backLogo, backArtwork);
  assert.equal(next.note, replacementNote);
});

test("legacy artwork without a reference and unrelated text or layers are never cleared", () => {
  const original = { ...studioDraft(), referenceStudio: undefined, text: "Keep this text", backText: "Back text", elements: [{ id: "original-layer", logo: frontScene }] };
  const next = mergeDesignDraft(original, { customDimensions: "30 × 30 cm" });
  assert.equal(next.logo, original.logo);
  assert.equal(next.backLogo, original.backLogo);
  assert.equal(next.logoName, original.logoName);
  assert.equal(next.backLogoName, original.backLogoName);
  assert.equal(next.text, original.text);
  assert.equal(next.backText, original.backText);
  assert.equal(next.elements, original.elements);
  assert.equal(next.note, original.note);
});

test("explicit reference removal also clears only its scene copies", () => {
  const original = { ...studioDraft(), backLogo: backArtwork };
  const next = mergeDesignDraft(original, { referenceStudio: undefined });
  assert.equal(next.logo, "");
  assert.equal(next.backLogo, backArtwork);
  assert.equal(next.backLogoName, original.backLogoName);
});

test("removing generated studio notes preserves customer text before and after the block", () => {
  const original = { ...studioDraft(), note: `Customer instructions.\n\n${generatedNote}\n\nDelivery instructions.` };
  const next = mergeDesignDraft(original, { size: "Large" });
  assert.equal(next.note, "Customer instructions.\n\n\n\nDelivery instructions.");
  assert.equal(mergeDesignDraft(original, { size: "Large", note: "New customer instructions." }).note, "New customer instructions.");
  assert.equal(mergeDesignDraft({ ...original, note: "Customer wrote [3D studio] without a closing marker." }, { size: "Large" }).note, "Customer wrote [3D studio] without a closing marker.");
});

test("a new quote omits the default brand from the payload without changing the browser draft", () => {
  const original = structuredClone(initialDesign);
  const quote = quoteRepresentation(original, true);
  assert.equal(quote.text, "");
  assert.equal(quote.logo, "");
  assert.equal(quote.backText, "");
  assert.deepEqual(original, initialDesign);
  assert.notEqual(quote, original);
});

test("quote artwork drops only default text elements and preserves genuine text, logos and QR artwork", () => {
  const elements = [
    { id: "placeholder", kind: "text", side: "front", text: initialDesign.text },
    { id: "back-placeholder", kind: "text", side: "back", text: ` ${initialDesign.text} ` },
    { id: "customer-text", kind: "text", side: "front", text: "Your local shop" },
    { id: "logo", kind: "logo", side: "front", text: initialDesign.text, logo: frontArtwork },
    { id: "qr", kind: "qr", side: "back", text: "", logo: backArtwork, qrValue: "https://example.com" },
  ];
  const original = { ...initialDesign, text: "Our actual brand", backText: "Customer back text", logo: frontArtwork, elements };
  const quote = quoteRepresentation(original, true);
  assert.equal(quote.text, original.text);
  assert.equal(quote.backText, original.backText);
  assert.equal(quote.logo, original.logo);
  assert.deepEqual(quote.elements, elements.slice(2));
  assert.equal(original.elements.length, 5);
  assert.equal(quote.elements[0], elements[2]);
});

test("studio snapshots and real print exports stay exact while public quotes carry no artwork", () => {
  const original = { ...studioDraft(), logo: frontArtwork, backLogo: backArtwork, text: "Actual text", elements: [{ id: "art", kind: "text", text: "Keep" }] };
  const saved = structuredClone(original);
  const studio = quoteRepresentation(original, true);
  assert.equal(studio.referenceStudio, original.referenceStudio);
  assert.equal(studio.logo, frontArtwork);
  assert.equal(studio.backLogo, backArtwork);
  const publicQuote = quoteRepresentation(original, false);
  for (const field of ["logo", "logoName", "text", "backLogo", "backLogoName", "backText"]) assert.equal(publicQuote[field], "");
  assert.equal(publicQuote.referenceStudio, undefined);
  assert.deepEqual(publicQuote.elements, []);
  assert.equal(publicQuote.customDimensions, original.customDimensions);
  assert.deepEqual(original, saved);
});

test("current and prepared specifications use requested dimensions and leave custom GSM for confirmation", () => {
  const published = { dimensions: "30 × 30 × 5 cm", gsm: 60 };
  assert.deepEqual(quoteSpecification(initialDesign, published), { size: "Small", dimensions: published.dimensions, gsm: 60, color: "Natural", studio: false });
  const custom = { ...initialDesign, customDimensions: " 40 × 40 × 15 cm ", ...published };
  const saved = structuredClone(custom);
  assert.deepEqual(quoteSpecification(custom, custom), { size: "", dimensions: "40 × 40 × 15 cm", gsm: undefined, color: "Natural", studio: false });
  assert.deepEqual(custom, saved);
  const studio = studioDraft();
  assert.deepEqual(quoteSpecification(studio, published), { size: "L", dimensions: studio.referenceStudio.dimensions, gsm: undefined, color: "#efeee9", studio: true });
});

test("saved preview export accepts only local PNG/WebP data and never remote or executable sources", () => {
  for (const source of ["data:image/png;base64,iVBORw0KGgo=", "data:image/webp;base64,UklGRgAAAABXRUJQ"]) {
    const original = studioDraft();
    original.referenceStudio.front = source;
    original.referenceStudio.back = source;
    assert.equal(savedQuotePreview(original, "front"), source);
    assert.equal(savedQuotePreview(original, "back"), source);
  }
  for (const source of ["https://example.com/preview.png", "//example.com/preview.png", "/private.png", "blob:https://example.com/id", "data:image/svg+xml;base64,PHN2Zy8+", "javascript:alert(1)", "", "data:image/png;base64," + "A".repeat(110001)]) {
    const original = studioDraft();
    original.referenceStudio.front = source;
    assert.throws(() => savedQuotePreview(original, "front"), /INVALID_STUDIO_PREVIEW/);
  }
  assert.equal(savedQuotePreview(initialDesign, "front"), undefined);
});

test("downloads retain the established canvas dimensions and fit landscape or portrait captures without stretching", () => {
  assert.equal(quoteDownloadLayout.width, 2000);
  assert.equal(quoteDownloadLayout.height, 1220);
  assert.deepEqual(fitQuotePreview(1200, 600), { x: 0, y: 230, width: 920, height: 460 });
  assert.deepEqual(fitQuotePreview(600, 1200), { x: 230, y: 0, width: 460, height: 920 });
  assert.deepEqual(fitQuotePreview(800, 800), { x: 0, y: 0, width: 920, height: 920 });
  for (const [width, height] of [[0, 800], [800, -1], [NaN, 800], [Infinity, 800]]) assert.throws(() => fitQuotePreview(width, height), /INVALID_PREVIEW_SIZE/);
  assert.ok(quoteDownloadLayout.faceOffset + quoteDownloadLayout.imageLeft + quoteDownloadLayout.imageSize < quoteDownloadLayout.width);
  assert.ok(quoteDownloadLayout.imageTop + quoteDownloadLayout.imageSize < quoteDownloadLayout.height);
});
