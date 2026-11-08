import test from 'node:test';
import assert from 'node:assert/strict';
import { initialDesign } from '../lib/catalog';
import { applyAction, seed } from '../lib/demo-domain';

const png = 'data:image/png;base64,iVBORw0KGgo=';
const design = () => ({ ...initialDesign, company: 'Studio QA', contact: 'Test Buyer', email: 'qa@example.com', city: 'Prishtina', consent: true, key: crypto.randomUUID(), customDimensions: '40 × 38.5 × 17 cm', referenceStudio: { source: 'ariongj-mo-b23cd8f' as const, productName: 'Box bag', size: 'L', dimensions: '40 × 38.5 × 17 cm', fabric: '#efeee9', front: png, back: png } });

test('requests keep the supplied studio previews and its actual dimensions', () => {
  const d = design();
  const result = applyAction(seed(), { type: 'submit', design: d });
  assert.deepEqual(result.state.requests[0].snapshot.referenceStudio, d.referenceStudio);
  assert.equal(result.state.requests[0].snapshot.productName, 'Box bag');
  assert.equal(result.state.requests[0].snapshot.dimensions, d.customDimensions);
});
test('untrusted remote images, oversized payloads and invalid image bytes are rejected', () => {
  for (const front of ['https://example.com/tracker.png', 'data:image/svg+xml;base64,PHN2Zy8+', 'data:image/png;base64,YWJjZA==', png + 'a'.repeat(110001)]) {
    const d = design(); d.referenceStudio.front = front;
    assert.throws(() => applyAction(seed(), { type: 'submit', design: d }));
  }
});
test('standard quotes still use the published product dimensions without a studio preview', () => {
  const { referenceStudio, ...d } = design();
  const result = applyAction(seed(), { type: 'submit', design: d });
  assert.equal(result.state.requests[0].snapshot.referenceStudio, undefined);
  assert.notEqual(result.state.requests[0].snapshot.dimensions, referenceStudio.dimensions);
});
