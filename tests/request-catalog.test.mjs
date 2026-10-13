import test from 'node:test';
import assert from 'node:assert/strict';
import { withPublishedQuoteCatalog } from '../lib/cms/request-catalog.ts';

const original = {catalog:[{slug:'box-bag',variants:[{name:'Small',gsm:80,dimensions:'Old'}]}],settings:{moq:5000},requests:[]};
const product = {slug:'box-bag',name:'Published box',variants:[{name:'Medium',gsm:95,dimensions:'44 × 40 × 16 cm'}]};
const records = [{kind:'settings',published:{settings:{moq:5500}}},{kind:'product',published:{product,activeSizes:['Medium'],colors:['Natural'],printColors:2,moq:6000}}];
const design = {key:'new-request',product:'box-bag',size:'Medium',color:'Natural',printColors:2};

test('offline requests use published dimensions, weight and per-product minimum without changing old state',()=>{
  const updated=withPublishedQuoteCatalog(original,design,records);
  assert.equal(updated.catalog[0],product);
  assert.equal(updated.settings.moq,6000);
  assert.equal(original.catalog[0].variants[0].gsm,80);
  assert.equal(original.settings.moq,5000);
});
test('unavailable products, sizes, fabric and printing choices cannot form new offline requests',()=>{
  for(const patch of [{product:'archived-bag'},{size:'Small'},{color:'Red'},{printColors:3}])assert.throws(()=>withPublishedQuoteCatalog(original,{...design,...patch},records));
  assert.throws(()=>withPublishedQuoteCatalog(original,design,records.slice(0,1)),/INVALID_VARIANT/);
});
test('saved requests retain their snapshots and remain recoverable after catalogue changes',()=>{
  const old={...original,requests:[{key:design.key,snapshot:{gsm:80}}]};
  assert.equal(withPublishedQuoteCatalog(old,design,records.slice(0,1)),old);
  assert.equal(old.requests[0].snapshot.gsm,80);
});
test('source catalogue remains the fallback before CMS initialization',()=>{
  assert.equal(withPublishedQuoteCatalog(original,design,[]),original);
});
