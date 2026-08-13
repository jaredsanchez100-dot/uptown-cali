# Uptown Cali — Store

Northern Cali Style. Built Different.

This is your storefront. It's plain HTML, CSS and JavaScript — no build step,
no `npm install`, nothing to compile. Open `index.html` in a browser and it
runs. Edit a file, refresh, and the change is there.

---

## The one file you'll actually edit: `data.js`

Everything you'd want to change day to day lives in **`data.js`** — products,
prices, sizes, colors, the story, the shipping note. Open it in any text
editor. It's commented in plain English.

### Add a product

Copy one of the blocks inside `PRODUCTS` and change the values. Every product
needs a unique `id` (that becomes its web address), a `name`, a `price`, and at
least one size.

```js
{
  id: "tee-nor-cal-varsity",          // unique — no spaces, becomes the URL
  name: "Nor Cal Varsity Tee",
  category: "T-Shirts",               // groups it under the filter buttons
  price: 45,
  image: "",                          // "images/varsity-front.jpg" once you have one
  gallery: [],                        // extra angles: ["images/a.jpg","images/b.jpg"]
  placeholder: { emoji: "★", tint: "linear-gradient(150deg,#2a0d0d,#0b0b0b 62%)" },
  sizes: ["S", "M", "L", "XL", "2XL"],
  colors: ["Black", "Vintage Black"],
  description: "What it is and how it fits.",
  details: ["280 GSM cotton", "Oversized fit", "Screen printed"],
  badge: "New",                       // small tag on the card; "" for none
  buyUrl: "",                         // only used in Stripe mode
  variantIds: {},                     // only used in Shopify mode
},
```

**Sizes matter.** Apparel gets `["S","M","L","XL","2XL"]`. Hats, stickers and
patches get `["One Size"]` — the size picker then hides itself automatically.

**Categories drive the filter row.** The Shop / T-Shirts / Fleece / Headwear /
Accessories buttons are built from whatever `category` values you use. Add a
new one and a new button appears. Drop down to a single category and the row
hides itself.

### Change a price

Find the product in `data.js`, change `price: 45` to whatever it should be.
That's it.

---

## Your photos

The six tees from your lookbook are wired up with real photos, and the lookbook
section uses six of the on-location shots. Everything lives in **`images/`**.

Each tee follows this naming pattern, so you can tell at a glance what a file is:

```
tee-heritage-script-model-front.jpg   <- what shows on the product card
tee-heritage-script-front.jpg         <- flat, front
tee-heritage-script-back.jpg          <- flat, back
tee-heritage-script-model-back.jpg    <- on-body, back
```

The card image is the **on-body front** shot, so the grid reads like a real
store rather than a row of flat-lays. The flats are one tap away as thumbnails
on the product page. If you'd rather lead with the flat, swap `image` and the
first `gallery` entry in `data.js` — a two-line change per product.

### Two things I corrected from the lookbook PDF

- **Heritage Script Tee** — the PDF labels page 4 "model front" and page 5
  "model back", but they're the other way round. I've used them as the photos
  actually show, so the front of the shirt is what a shopper sees first.
- **UTC Core Tee** — the PDF's "model back" for this concept is byte-for-byte
  the same file as the Nor Cal Standard one, and it shows the Nor Cal Standard
  back print, not the UTC back. I left it out rather than show a customer a
  back view that isn't this shirt's back. When you have a real one, save it as
  `images/tee-utc-core-model-back.jpg` and add it to that product's `gallery`.

### Still waiting on photos

The hoodie, crewneck, snapback, sticker pack and patch all show styled
placeholder tiles. To swap one in:

```js
image: "images/hoodie-front.jpg",
gallery: ["images/hoodie-back.jpg"],
```

**Crop 4:5** for products (about 1200 × 1500 px) and **3:4** for lookbook tiles,
and keep each file under ~300KB. Squoosh.app or TinyPNG will shrink them
without visible quality loss.

### One quality note

Concepts 4, 5 and 6 (Bay Area Luxury, Heritage Script Varsity, Collegiate Nor
Cal) came out of the PDF at 695 × 555 — noticeably smaller than the first three,
which were 1122 × 1402. They look fine on the product cards, but they're a bit
soft blown up on the product page. If you can re-export those three at full
resolution, send them over and they'll drop straight in under the same
filenames.

### The hero photo

The homepage banner uses `images/hero.jpg` (the Bay Area neon shot). To change
it, replace that one file — the dark gradient over it is CSS, so any reasonably
wide photo will work.

---

## Right now this is a demo store

The cart works completely — add items, change quantity, remove, refresh the
page and it's all still there. But **checkout doesn't take money yet.** The
footer says so on purpose, so nobody thinks they placed an order that never
happened.

### Turning on real payments

When you're ready to actually ship orders, pick one:

**Stripe** — simplest if you just want to take card payments.

1. Create a Stripe account and add each product as a Payment Link
   (Stripe dashboard → Payment Links → New).
2. In `data.js`, paste each link into that product's `buyUrl`.
3. Change `mode: "demo"` to `mode: "stripe"` in the `CHECKOUT` block.

**Shopify** — better if you already run inventory there.

1. In `data.js` set `mode: "shopify"` and fill in
   `shopifyDomain: "your-store.myshopify.com"`.
2. For each product, add its Shopify variant IDs keyed by the option combo:
   `variantIds: { "M / Black": "43215678901234", "L / Black": "..." }`.

Either way, **delete the demo disclaimer** once money is real — it's the
`footerNote` logic in `script.js`, and it switches over automatically when
`mode` is no longer `"demo"`.

One caution: don't flip this on until you can actually fulfill orders. A live
store taking money you're not ready to ship against is a real problem, not a
cosmetic one.

---

## Things to fill in before you launch

These are placeholders I couldn't invent for you — search `data.js` for `TODO`:

- **Your real email** — currently `hello@uptowncali.com` in `BRAND.email`.
- **Your Instagram and TikTok links** — currently `#` in `BRAND.socials`.
- **The third paragraph of your story** — currently a prompt telling you to
  write it. The first two paragraphs use your own brand copy; the origin story
  is yours to tell.
- **Confirm the tee prices.** Your lookbook has six tees but we'd only agreed a
  band for three, so I put concepts 1–3 at $45 and 4–6 at $48. Those are my
  numbers, not yours — set them before you take a single order.
- **Confirm the fabric specs.** The lookbook doesn't state weights, so the
  "280 GSM / ribbed collar / twin needle" lines carry over from your earlier
  mockup sheets and are applied to all six tees. Make sure that matches what
  your supplier is actually producing.
- **Check the product names.** I named the six tees from your lookbook's own
  concept labels (Heritage Script, UTC Core, Nor Cal Standard, Bay Area Luxury,
  Heritage Script Varsity, Collegiate Nor Cal). Rename any that should read
  differently on the storefront.

---

## Changing the look

The whole theme is the `:root` block at the very top of **`styles.css`** —
about 25 lines. The Uptown Cali palette is already in there:

```css
--accent: #b22222;   /* red */
--green:  #1b3d34;   /* forest green */
--ink:    #f2f2e2;   /* off white */
--bg:     #0b0b0b;   /* black */
```

Change those values and the whole site changes with them. Two rules if you do:

- Keep body text readable against the background — that's `--ink` on `--bg`.
- `--accent-ink` is the text that sits **on top of** the red (the Add to Cart
  button, the cart badge). If you make the red lighter, that text needs to go
  darker.

The fonts are loaded in `index.html` (Alfa Slab One for headings, Yesteryear
for the script lines) and named in `styles.css` as `--font-display` and
`--font-script`. Change both places together.

---

## Putting it online

It's static files, so it hosts free almost anywhere. The quickest route:

**GitHub Pages**

1. Push this folder to a GitHub repository.
2. Repo → **Settings** → **Pages**.
3. Under "Build and deployment", set Source to **Deploy from a branch**, pick
   your branch and the folder containing `index.html`, then Save.
4. Wait a minute or two. Your site appears at
   `https://<your-username>.github.io/<repo-name>/`.

**Netlify** is even faster if you don't want to think about git: go to
netlify.com, drag this folder onto the drop zone, done.

Either one lets you connect a custom domain (like `uptowncali.com`) from their
settings once you've bought it — you'll need to be logged into your own
account for that part.

---

## File map

| File | What it's for |
|---|---|
| `data.js` | **Products, prices, story, checkout.** The file you edit. |
| `index.html` | Page structure, SEO title/description, font links. |
| `styles.css` | The theme (top ~25 lines) and all the layout below it. |
| `script.js` | The engine — cart, product pages, filters. Leave it alone. |
| `images/` | Your photos go here. |

---

## The newsletter form

Right now it just says "thanks" — it doesn't store addresses anywhere. To
actually collect them, point the form at a free service like Formspree,
Buttondown or Mailchimp: they each give you a form action URL to paste into
`index.html`.
