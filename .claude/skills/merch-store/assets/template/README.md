# BRAND NAME — Online Store

A fast, no-build storefront. Plain HTML, CSS, and JavaScript — no npm, no
frameworks, no server. Open it in a browser and it works.

## Editing the store

**`data.js` is the only file you need.** Everything visible on the site comes
from it:

| What you want to change | Where |
|---|---|
| Brand name, tagline, hero text | `BRAND` at the top |
| Your story, stats, socials | `BRAND.story`, `BRAND.stats`, `BRAND.socials` |
| Products, prices, sizes, colors | `PRODUCTS` |
| Lookbook photos | `LOOKBOOK` |
| How checkout works | `CHECKOUT.mode` |

Colors and fonts live in the `:root` block at the very top of `styles.css`.
Change those values and the whole site changes with them.

`script.js` is the engine that renders everything — you can leave it alone.

## Adding a product

Copy an existing block in `PRODUCTS` and change the values. The `id` must be
unique (it becomes the product's link, like `#/product/tee-classic`).

```js
{
  id: "crewneck-heavy",
  name: "Heavyweight Crewneck",
  category: "Fleece",
  price: 68,
  image: "images/crewneck.jpg",   // leave "" for a placeholder
  sizes: ["S", "M", "L", "XL"],
  colors: ["Black", "Cream"],
  description: "What it is and how it fits.",
  details: ["400gsm fleece", "Boxy fit"],
}
```

For one-size items use `sizes: ["One Size"]` — the size picker hides itself.

## Adding real photos

1. Put image files in an `images/` folder next to `index.html`.
2. Set `image: "images/your-photo.jpg"` on the product.
3. For extra angles, add `gallery: ["images/back.jpg", "images/detail.jpg"]`.

Until then, styled placeholders are drawn automatically, so the site always
looks finished. Aim for a 4:5 portrait crop and keep files under ~300KB so
pages stay fast.

## Running it locally

Open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing it

The site is static files, so almost any host works. See `DEPLOY.md` for the
step-by-step, or in short:

- **GitHub Pages** — push this folder, then Settings → Pages → pick the branch.
- **Netlify** — drag the folder onto app.netlify.com/drop.

## Taking real payments

`CHECKOUT.mode` in `data.js` controls this:

- `"demo"` — cart works, checkout shows a placeholder. Good before launch.
- `"stripe"` — each product carries a Stripe Payment Link in `buyUrl`.
- `"shopify"` — each variant carries a Shopify variant ID in `variantIds`,
  and the cart hands off to Shopify's checkout with everything in it.

Prices in `data.js` are display-only. The real price is whatever Stripe or
Shopify has on record, so editing this file can't change what a customer is
actually charged.
