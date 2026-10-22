const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const guard = require('../checkout');

function fixture() {
  return {
    config: { mode: 'shopify', liveApproved: true, liveHosts: ['test.invalid'], shopifyDomain: 'example.myshopify.com',
      readiness: { merchant: true, shipping: true, taxes: true, policies: true, fulfillment: true, testOrder: true },
      policies: Object.fromEntries(['shipping','returns','privacy','terms'].map(k => [k, 'https://example.com/' + k])) },
    brand: { email: 'support@example.com' },
    products: [
      { id: 'tee', price: 45, sizes: ['M', 'L'], colors: ['Black', 'Red'], release: { approved: true, fulfillmentVerified: true, priceVerified: true }, variantIds: { 'M / Black': '123', 'L / Black': '456' }, stripeLinks: { 'M / Black': 'https://buy.stripe.com/test_example' } },
      { id: 'hoodie', price: 85, sizes: ['L'], colors: ['Black'], release: { approved: true, fulfillmentVerified: true, priceVerified: true }, variantIds: { 'L / Black': '789' } }
    ],
    lines: [{ id: 'tee', size: 'M', color: 'Black', qty: 2 }, { id: 'hoodie', size: 'L', color: 'Black', qty: 1 }]
  };
}
function plan(f, host = 'test.invalid') { return guard.plan(f.config, f.brand, f.products, f.lines, host); }

test('whole cart retains exact variants and quantities; no client prices in URL', () => {
  assert.deepEqual(plan(fixture()), { ok: true, url: 'https://example.myshopify.com/cart/123:2,789:1' });
});
test('mode alone never enables checkout; approvals and each release check fail closed', () => {
  for (const change of [f=>f.config.mode='demo', f=>f.config.mode='unknown', f=>delete f.config.liveApproved,
    f=>f.config.liveApproved='true', f=>f.config.liveHosts=[], f=>f.brand.email='', f=>f.config.policies.returns='javascript:alert(1)',
    ...Object.keys(fixture().config.readiness).map(k=>f=>f.config.readiness[k]=false)]) {
    const f=fixture(); change(f); assert.equal(plan(f).ok,false);
  }
  assert.equal(plan(fixture(),'preview.example.com').ok,false);
});
test('blocked, stale, invalid and concept cart entries prevent the entire handoff', () => {
  for (const change of [f=>f.products[1].comingSoon=true, f=>delete f.products[1].release,
    f=>f.products[1].release.approved=false, f=>f.products[1].release.fulfillmentVerified=false,
    f=>f.products[1].release.priceVerified=false, f=>f.lines[1].id='retired', f=>f.lines[1].size='XL',
    f=>f.lines[1].color='Forest', f=>f.lines[1].qty=0, f=>f.lines[1].qty=21, f=>f.lines[1].qty=1.5,
    f=>f.lines[1].qty='1', f=>f.lines[1]=null, f=>f.products[1].price=0]) {
    const f=fixture(); change(f); assert.equal(plan(f).ok,false);
  }
});
test('missing mapping cannot fall back to size/default or checkout partial cart', () => {
  const f=fixture(); f.products[1].variantIds={'L':'789',default:'789'};
  assert.equal(plan(f).code,'variant'); assert.equal(plan(f).url,undefined);
});
test('Shopify IDs/domains cannot inject paths, quantities or other destinations', () => {
  for (const domain of ['example.com','https://example.myshopify.com','example.myshopify.com.evil.test','example.myshopify.com/path','user@example.myshopify.com']) {
    const f=fixture(); f.config.shopifyDomain=domain; assert.equal(plan(f).ok,false);
  }
  for (const id of [123,'123:20','123,999','0','1.5','gid://shopify/ProductVariant/123']) {
    const f=fixture();f.products[0].variantIds['M / Black']=id;assert.equal(plan(f).ok,false);
  }
});
test('duplicate provider mappings and duplicate lines fail closed', () => {
  const f=fixture(); f.products[0].variantIds['L / Black']='123'; assert.equal(plan(f).code,'duplicate');
  const g=fixture(); g.lines.push({...g.lines[0]}); assert.equal(plan(g).code,'duplicate');
});
test('Stripe permits only a dedicated, verified variant link and one total item', () => {
  const f=fixture(); f.config.mode='stripe'; assert.equal(plan(f).code,'stripe-quantity');
  f.lines=[{...f.lines[0],qty:1}]; assert.equal(plan(f).url,'https://buy.stripe.com/test_example');
  delete f.products[0].stripeLinks;f.products[0].buyUrl='https://buy.stripe.com/test_example';assert.equal(plan(f).ok,false);
  for (const url of ['javascript:alert(1)','https://buy.stripe.com.evil.test/a','https://user@buy.stripe.com/a','https://buy.stripe.com/a?quantity=5','https://buy.stripe.com/a#fragment']) {
    f.products[0].stripeLinks={'M / Black':url};assert.equal(plan(f).ok,false);
  }
});
test('committed catalog stays preview-only, all 20 designs unapproved, all nine concepts guarded', () => {
  const context=vm.createContext({});
  vm.runInContext(fs.readFileSync(require.resolve('../data.js'),'utf8')+';this.data={CHECKOUT,BRAND,PRODUCTS};',context);
  const {CHECKOUT,BRAND,PRODUCTS}=context.data;
  assert.equal(CHECKOUT.mode,'demo');assert.equal(CHECKOUT.liveApproved,false);
  assert.equal(PRODUCTS.length,20);assert.equal(PRODUCTS.filter(p=>p.comingSoon).length,9);
  assert.equal(PRODUCTS.filter(guard.productReady).length,0);
  for (const p of PRODUCTS) assert.equal(guard.plan(CHECKOUT,BRAND,PRODUCTS,[{id:p.id,size:p.sizes[0],color:p.colors[0],qty:1}],'www.uptowncali.com').ok,false);
});
