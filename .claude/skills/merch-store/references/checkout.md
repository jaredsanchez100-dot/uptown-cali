# Wiring up checkout

Set `CHECKOUT.mode` in `data.js` to one of `"demo"`, `"stripe"`, or
`"shopify"`. The engine handles the rest.

Pick based on where the brand actually is, not on what sounds most complete:

| Situation | Mode |
|---|---|
| Not selling yet, want the site up | `demo` |
| A handful of products, no inventory tracking, wants money today | `stripe` |
| Real inventory, variants, shipping rates, discount codes | `shopify` |

You cannot set any of these up on the owner's behalf — they all require signing
into an account that only they control. What you *can* do is build the store so
that switching modes later is a few lines in `data.js`, and tell them exactly
which values to send you.

---

## Demo mode

Nothing to configure. The cart works, quantities work, and checkout shows a
friendly "no payment is processed" message. The footer says the same thing.

Keep that disclaimer visible. A store that looks like it takes orders but
silently doesn't will produce customers who think they bought something.

---

## Stripe Payment Links

Best for a small catalog. No backend, no API keys in the page, no server.

**What the owner does** (once per product, in their Stripe dashboard):
1. Stripe Dashboard → Product catalogue → **+ Add product**
2. Name it, set the price, save.
3. On the product, **Create payment link**.
4. Copy the link — it looks like `https://buy.stripe.com/aEU00i2Ck9Xy4qkcMM`.

**What you do:**
```js
const CHECKOUT = { mode: "stripe", currency: "$" };

// ...on each product:
buyUrl: "https://buy.stripe.com/aEU00i2Ck9Xy4qkcMM",
```

**The honest limitation:** one Payment Link sells one product. There's no way
to send a multi-item cart to a Payment Link without a backend. So in Stripe
mode the cart drawer gives each line its own **Pay** button rather than
pretending a single combined checkout exists.

If someone wants a true multi-item cart on Stripe, that needs a small server
endpoint creating a Checkout Session — at which point Shopify is usually less
work for the same result. Say so plainly rather than building a fake flow.

**Sizes and colors:** Payment Links don't know about the variant chosen on the
site. Either create a separate link per variant (fine for a few SKUs), or turn
on **"Collect customers' addresses"** plus a custom field in the Payment Link
settings so the buyer states their size at checkout. Mention this tradeoff —
mismatched size orders are a real support headache.

---

## Shopify

Best once there's real inventory. Shopify handles stock, variants, shipping,
taxes, discount codes, and order emails; the site stays a static storefront.

The neat part: **cart permalinks**. A plain static page can hand off an entire
multi-item cart with no SDK and no backend, just a URL:

```
https://your-shop.myshopify.com/cart/44123456789:2,44123456790:1
                                    ^variant id ^qty
```

**What the owner does:**
1. Add each product in Shopify Admin with its real sizes/colors as variants.
2. For each variant, get the numeric **variant ID**. Easiest route: Admin →
   Products → click the variant; the URL ends in
   `/variants/44123456789` — that trailing number is it.
3. Send you the shop domain and the ID for each variant.

**What you do:**
```js
const CHECKOUT = {
  mode: "shopify",
  shopifyDomain: "uptown-cali.myshopify.com",
  currency: "$",
};

// ...on each product, keyed exactly "<size> / <color>":
variantIds: {
  "S / Black":  "44123456789",
  "M / Black":  "44123456790",
  "M / Bone":   "44123456791",
},
```

The key format matters — the engine builds it from the selected size and color
as `size + " / " + color`. For a product with sizes but no color choice, key on
the size alone (`"M": "441..."`). For one-size items, `"One Size"` or
`"default"` both work.

Any line without a matching ID is skipped at checkout and the shopper is told,
rather than silently dropped.

**Storefront domain vs. myshopify domain:** if the shop has a custom domain,
either works for cart permalinks. The `.myshopify.com` one always works, so
prefer it unless the owner asks otherwise.

---

## Things worth telling the owner

**Prices in `data.js` are display-only.** The amount actually charged comes
from Stripe or Shopify. That's a feature — a typo in this file can't undercharge
them — but it does mean prices live in two places, so they should update both
when they change.

**Test with a real card before announcing.** Stripe has test mode; Shopify has
a bogus gateway. One end-to-end test order catches the broken-link problems
that a visual check never will.

**Legal pages.** Selling physical goods to the public usually means the store
needs a returns/refund policy, shipping info, and contact details — both
because customers look for them and because payment processors ask. Shopify
generates these; on Stripe they'll need to write them. Flag it; don't invent
policy text and present it as theirs.
