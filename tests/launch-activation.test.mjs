import test from 'node:test';
import assert from 'node:assert/strict';

const load = () => import('../lib/cms/launch-activation.ts?case=' + crypto.randomUUID());

function fixture({ eligible = true, fail = false } = {}) {
  let marker = false, reads = 0, batches = 0;
  return {
    state: { eligible, fail },
    prepare() { return { bind() { return this; }, async first() { reads++; return marker ? { id: 'marker' } : null; } }; },
    async batch(statements) {
      batches++;
      assert.equal(statements.length, 4);
      if (this.state.fail) throw Error('Local fixture storage failure');
      await new Promise(resolve => setTimeout(resolve, 1));
      if (this.state.eligible) marker = true;
    },
    counts: () => ({ reads, batches }),
  };
}

test('activation requires the exact operator flag and performs no database work otherwise', async () => {
  const { activateInquiriesForLaunch } = await load();
  const db = fixture();
  for (const flag of [undefined, '', 'true', '2026-10-15']) await activateInquiriesForLaunch(db, flag);
  assert.deepEqual(db.counts(), { reads: 0, batches: 0 });
});

test('simultaneous requests share the activation and later requests reuse its persisted result', async () => {
  const { activateInquiriesForLaunch, inquiryActivationFlag } = await load();
  const db = fixture();
  await Promise.all([activateInquiriesForLaunch(db, inquiryActivationFlag), activateInquiriesForLaunch(db, inquiryActivationFlag)]);
  assert.deepEqual(db.counts(), { reads: 2, batches: 1 });
  await activateInquiriesForLaunch(db, inquiryActivationFlag);
  assert.deepEqual(db.counts(), { reads: 2, batches: 1 });
});

test('storage failures are surfaced and retried on the next request', async () => {
  const { activateInquiriesForLaunch, inquiryActivationFlag } = await load();
  const db = fixture({ fail: true });
  await assert.rejects(activateInquiriesForLaunch(db, inquiryActivationFlag), /storage failure/);
  db.state.fail = false;
  await activateInquiriesForLaunch(db, inquiryActivationFlag);
  assert.equal(db.counts().batches, 2);
});

test('a fresh CMS can be activated after its settings become eligible', async () => {
  const { activateInquiriesForLaunch, inquiryActivationFlag } = await load();
  const db = fixture({ eligible: false });
  await activateInquiriesForLaunch(db, inquiryActivationFlag);
  db.state.eligible = true;
  await activateInquiriesForLaunch(db, inquiryActivationFlag);
  assert.equal(db.counts().batches, 2);
});
