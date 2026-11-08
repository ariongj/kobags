import test from 'node:test';
import assert from 'node:assert/strict';
import {bagDimensions} from '../lib/nonwoven-spec.ts';
import {products} from '../lib/catalog.ts';
test('models follow approved catalogue dimensions including decimal sizes and the T-shirt specification',()=>{
 for(const product of products) for(const variant of product.variants) {
  const actual=bagDimensions(variant.dimensions,product.slug);
  const expected=variant.dimensions.match(/\d+(?:\.\d+)?/g).map(Number);
  assert.deepEqual(actual.slice(0,expected.length),expected);
 }
 assert.deepEqual(bagDimensions('31 × 55 × 18 cm','t-shirt-bag'),[31,55,18]);
});
test('invalid or unreasonable dimensions fall back to a finite model without unbounded mesh generation',()=>{
 for(const value of ['', 'NaN × Infinity','999999 × 40 × 12','0 × 20 × 5','30 × 40 × 999','1 x 2 x 3 x 4']) {
  assert.deepEqual(bagDimensions(value,'box-bag'),[33,25,12]);
 }
 assert.deepEqual(bagDimensions('40 × 45 cm','string-bag'),[40,45,3]);
});
