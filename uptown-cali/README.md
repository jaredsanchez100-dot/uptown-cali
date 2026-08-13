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

## Adding your photos

1. Drop the image files into the **`images/`** folder next to `index.html`.
2. In `data.js`, point the product at the file:

```js
image: "images/built-different-tee-front.jpg",
gallery: ["images/built-different-tee-back.jpg", "images/built-different-tee-detail.jpg"],
```

Until you do, each product shows a styled black/red/green placeholder tile, so
the store looks finished while you're waiting on the shoot.

**Two things worth getting right:**

- **Crop them 4:5** (e.g. 1200 × 1500 px). That's the shape of the product
  tiles, so a 4:5 photo fills the frame without getting cut off.
- **Keep each file under ~300KB.** A gorgeous store that takes eight seconds to
  load on hotel wifi doesn't sell anything. Squoosh.app or TinyPNG will shrink
  them without visible quality loss.

The lookbook tiles use the same setup — set `image` on entries in the
`LOOKBOOK` array (those are 3:4, so ~1200 × 1600 px).

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
- **Confirm the prices.** I used the numbers we agreed on, but check them
  against what you're actually charging.
- **Confirm the fabric specs.** The GSM weights and construction details came
  off your mockup sheets — make sure they match what your supplier is
  producing.

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
