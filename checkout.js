/* Checkout handoff validation. Provider checkout remains authoritative for
   price, availability, taxes and payment. These public flags prevent accidental
   release; they are NOT authentication or a substitute for provider controls. */
(function (root) {
  'use strict';
  var requiredChecks = ['merchant', 'shipping', 'taxes', 'policies', 'fulfillment', 'testOrder'];
  var requiredPolicies = ['shipping', 'returns', 'privacy', 'terms'];
  function blocked(code, message) { return { ok: false, code: code, message: message }; }
  function httpsUrl(value) {
    try {
      var url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password && !url.port ? url : null;
    } catch (e) { return null; }
  }
  function storeReady(config, brand, hostname) {
    if (!config || config.mode === 'demo') return blocked('preview', 'Ordering opens soon. No payment is taken.');
    if (!['shopify', 'stripe'].includes(config.mode)) return blocked('provider', 'Checkout is unavailable.');
    if (config.liveApproved !== true) return blocked('approval', 'Ordering opens soon.');
    if (!Array.isArray(config.liveHosts) || !config.liveHosts.includes(hostname)) return blocked('host', 'Checkout is unavailable on this preview.');
    if (requiredChecks.some(function (key) { return !config.readiness || config.readiness[key] !== true; })) return blocked('readiness', 'Ordering opens soon.');
    if (!brand || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(brand.email || '')) return blocked('contact', 'Ordering opens soon.');
    if (requiredPolicies.some(function (key) { return !config.policies || !httpsUrl(config.policies[key]); })) return blocked('policies', 'Ordering opens soon.');
    if (config.mode === 'shopify' && !/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(config.shopifyDomain || '')) return blocked('domain', 'Checkout is unavailable.');
    return { ok: true };
  }
  function productReady(product) {
    return !!(product && !product.comingSoon && product.release &&
      product.release.approved === true && product.release.fulfillmentVerified === true &&
      product.release.priceVerified === true && Number.isFinite(product.price) && product.price > 0);
  }
  function variantKey(line) { return [line.size, line.color].join(' / '); }
  function validLine(line, product) {
    return !!(line && product && !product.comingSoon &&
      Array.isArray(product.sizes) && product.sizes.includes(line.size) &&
      Array.isArray(product.colors) && product.colors.includes(line.color) &&
      Number.isInteger(line.qty) && line.qty >= 1 && line.qty <= 20);
  }
  function plan(config, brand, products, lines, hostname) {
    var ready = storeReady(config, brand, hostname);
    if (!ready.ok) return ready;
    if (!Array.isArray(lines) || !lines.length) return blocked('empty', 'Your cart is empty.');
    var parts = [], seen = new Set(), stripe = null;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var product = line && products.find(function (p) { return p.id === line.id; });
      if (!validLine(line, product) || !productReady(product)) return blocked('product', 'Some selections are not available for ordering. Remove them before checkout.');
      var key = variantKey(line);
      if (config.mode === 'shopify') {
        var id = product.variantIds && product.variantIds[key];
        // No size-only or default fallback: it can silently select a wrong color.
        if (typeof id !== 'string' || !/^[1-9]\d*$/.test(id)) return blocked('variant', 'Some selections are not available for ordering.');
        if (seen.has(id)) return blocked('duplicate', 'Some selections are not available for ordering.');
        // One provider variant must identify exactly one offered product/option.
        var mappings = products.reduce(function (count, p) {
          return count + Object.values(p.variantIds || {}).filter(function (v) { return v === id; }).length;
        }, 0);
        if (mappings !== 1) return blocked('duplicate', 'Some selections are not available for ordering.');
        seen.add(id);
        parts.push(id + ':' + line.qty);
      } else {
        if (lines.length !== 1 || line.qty !== 1) return blocked('stripe-quantity', 'This checkout supports one item at a time.');
        // The legacy buyUrl/client_reference_id flow cannot enforce a variant.
        stripe = httpsUrl(product.stripeLinks && product.stripeLinks[key]);
        if (!stripe || stripe.hostname !== 'buy.stripe.com' || !/^\/[A-Za-z0-9_]+$/.test(stripe.pathname) || stripe.search || stripe.hash) return blocked('stripe-link', 'This selection is not available for ordering.');
        var linkCount = products.reduce(function (count, p) {
          return count + Object.values(p.stripeLinks || {}).filter(function (v) { return v === stripe.href; }).length;
        }, 0);
        if (linkCount !== 1) return blocked('duplicate', 'This selection is not available for ordering.');
      }
    }
    return { ok: true, url: config.mode === 'shopify'
      ? 'https://' + config.shopifyDomain + '/cart/' + parts.join(',')
      : stripe.href };
  }
  var api = { storeReady: storeReady, productReady: productReady, validLine: validLine, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CheckoutGuard = api;
})(typeof window !== 'undefined' ? window : this);
