// Read-only local release report. Never contacts a payment or fulfillment API.
const fs = require('node:fs');
const vm = require('node:vm');
const guard = require('../checkout');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(require.resolve('../data.js'),'utf8')+';this.data={CHECKOUT,BRAND,PRODUCTS};',context);
const {CHECKOUT,BRAND,PRODUCTS} = context.data;
const host = process.argv[2] || 'www.uptowncali.com';
console.log('Mode:',CHECKOUT.mode,'| Owner launch approval:',CHECKOUT.liveApproved,'| Host:',host);
console.log('Store gate:',guard.storeReady(CHECKOUT,BRAND,host).code || 'ready');
console.table(PRODUCTS.map(p=>({
  product:p.id,concept:!!p.comingSoon,releaseApproved:guard.productReady(p),
  offeredVariants:p.sizes.length*p.colors.length,
  exactShopifyMappings:p.sizes.flatMap(size=>p.colors.map(color=>p.variantIds[size+' / '+color])).filter(v=>typeof v==='string'&&/^[1-9]\d*$/.test(v)).length
})));
console.log('Local flags do not verify merchant accounts, real inventory, prices, policies or fulfillment. Complete the provider-side launch checklist.');
