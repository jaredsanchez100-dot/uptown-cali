const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const source = fs.readFileSync(require.resolve('../data.js'), 'utf8');

async function configure(page, code) {
  await page.route('**/data.js', route => route.fulfill({contentType:'text/javascript',body:source+'\n'+code}));
  await page.route('https://fonts.googleapis.com/**', route => route.fulfill({body:'',contentType:'text/css'}));
  await page.addInitScript(() => localStorage.setItem('cart:uptown-cali',JSON.stringify([
    {id:'tee-heritage-script',size:'M',color:'Black',qty:2},
    {id:'hoodie-utc-heavyweight',size:'L',color:'Black',qty:1}
  ])));
}
const ready = `
CHECKOUT.mode='shopify';CHECKOUT.liveApproved=true;CHECKOUT.liveHosts=['127.0.0.1'];
CHECKOUT.shopifyDomain='example.myshopify.com';BRAND.email='support@example.com';
Object.keys(CHECKOUT.readiness).forEach(k=>CHECKOUT.readiness[k]=true);
Object.keys(CHECKOUT.policies).forEach(k=>CHECKOUT.policies[k]='https://example.com/'+k);
PRODUCTS.filter(p=>['tee-heritage-script','hoodie-utc-heavyweight'].includes(p.id)).forEach(p=>p.release={approved:true,fulfillmentVerified:true,priceVerified:true});
PRODUCTS.find(p=>p.id==='tee-heritage-script').variantIds={'M / Black':'123'};
PRODUCTS.find(p=>p.id==='hoodie-utc-heavyweight').variantIds={'L / Black':'789'};
`;
test('changing only the provider leaves product and saved-cart checkout blocked', async ({page})=>{
  await configure(page, "CHECKOUT.mode='shopify';CHECKOUT.shopifyDomain='example.myshopify.com';");
  await page.goto('/#/product/tee-heritage-script');
  await expect(page.locator('#addBtn')).toHaveCount(0);
  await page.getByRole('button',{name:'Open cart'}).click();
  await expect(page.locator('#checkoutBtn')).toBeDisabled();
  await expect(page.locator('.line__pay')).toHaveCount(0);
});
test('verified fixture hands off the complete cart to a mocked Shopify destination', async ({page})=>{
  await configure(page,ready);
  let destination='';
  await page.route('https://example.myshopify.com/**', route=>{destination=route.request().url();return route.fulfill({body:'Mock checkout; no payment',contentType:'text/html'});});
  await page.goto('/');await page.getByRole('button',{name:'Open cart'}).click();
  await expect(page.locator('#checkoutBtn')).toBeEnabled();await page.locator('#checkoutBtn').click();
  await expect(page).toHaveURL('https://example.myshopify.com/cart/123:2,789:1');
  expect(destination).toBe('https://example.myshopify.com/cart/123:2,789:1');
});
test('one unmapped saved-cart line disables the entire checkout', async ({page})=>{
  await configure(page,ready+"PRODUCTS.find(p=>p.id==='hoodie-utc-heavyweight').variantIds={default:'789'};");
  await page.goto('/');await page.getByRole('button',{name:'Open cart'}).click();
  await expect(page.locator('#checkoutBtn')).toBeDisabled();
  await expect(page.locator('#cartNote')).toContainText('not available');
});
