---
name: merch-store
description: Build a complete, ready-to-ship online store for a clothing or merch brand — product grid, product detail pages with size and color pickers, persistent cart, lookbook, brand story, and checkout wired to Stripe, Shopify, or demo mode. Use this whenever someone wants a storefront, merch site, online shop, clothing brand website, drop page, or a site to sell apparel, hats, hoodies, tees, prints, vinyl, or any physical product — including when they just name a brand and say "make me a website for it" without using the word "store". Also use when adding products, restyling, or wiring real checkout into a store that was built this way.
---

# Building a merch store

You're building a real storefront someone will hand to customers — not a
demo. It ships as plain HTML, CSS, and JavaScript with no build step, because
the people who own these brands need to edit a price at midnight from their
phone without running `npm install`, and because static files host free
anywhere and load instantly on a bad connection at a show.

A working template lives in `assets/template/`. Start from it. It already
handles the parts that are tedious to get right — variant selection, a cart
that survives a refresh, hash-routed product pages, checkout handoff — so your
attention goes to the brand instead of re-deriving a cart.

## The shape of what you deliver

```
store/
├── index.html    — page shell and section order
├── styles.css    — theme tokens at the top, structure below
├── data.js       — brand, products, lookbook, checkout config
├── script.js     — the engine; rarely needs editing
├── README.md     — how the owner edits it
└── images/       — real photos, once they exist
```

The split matters: `data.js` is the file the owner will actually touch. Keep
everything they'd plausibly want to change in it, and keep it readable —
comments in plain language, not jargon.

## Step 1 — Get just enough to start

The failure mode here is interrogation. Brand owners have a clear picture in
their head and low patience for twenty questions; every round of back-and-forth
before they see anything makes the process feel worse than it is.

So: **ask one short round, then build something complete.** A real page they
can react to gets you better direction in one message than five rounds of
hypotheticals.

Ask at most four things, and only ones you genuinely can't infer:

- **What they sell and roughly what it costs** — you can't invent a catalog.
- **The vibe**, if the name doesn't already tell you. Offer concrete options
  ("sun-bleached West Coast streetwear" / "clean premium minimal" / "loud skate
  graphics") rather than asking them to describe it cold.
- **Checkout** — demo for now, Stripe, or Shopify. See
  `references/checkout.md`.
- **Photos** — do they have any yet, or should you use placeholders.

Infer the rest. A brand called "Uptown Cali" tells you plenty about palette and
tone; you don't need to ask whether it should feel Californian. If they've
already said something in the conversation, don't ask it again — that's exactly
the repetition this skill exists to eliminate.

If they gave you a full brief up front, skip the questions entirely and build.

### Never invent brand facts

Founding year, founder names, factory locations, fabric weights, charity
partnerships, customer counts — these end up on a public page that customers
and payment processors read. Making them up creates claims the owner didn't
make and might not be able to stand behind.

Use obvious placeholders they'll want to replace (`"Founded 20XX"`,
`"Tell your story here — where the brand started"`) and tell them what to fill
in. Copy tone, product descriptions, and section headings are yours to write;
facts about the business are not.

## Step 2 — Copy the template

```bash
cp -r <skill-dir>/assets/template/ <destination>/
```

Copy first and edit in place. Retyping the template from scratch is slower and
reliably loses a detail — the escaping helper, the reduced-motion block, the
cart-persistence guard.

## Step 3 — Fill in `data.js`

This is most of the job. Work through `BRAND`, then `CHECKOUT`, then
`PRODUCTS`, then `LOOKBOOK`.

**Products.** Give every product a stable `id` (it becomes the URL), a real
`category` so filtering means something, honest `sizes`, and a `description`
that says what it is and how it fits. Two or three `details` bullets — fabric
weight, fit, print method — do more for conversion than a paragraph of
adjectives, because they answer the question the shopper actually has.

Ship 4–8 products. One or two looks unfinished; twenty invented SKUs is a
catalog the owner now has to delete.

**Sizes.** Apparel gets `["S","M","L","XL","2XL"]`. Hats, stickers, prints, and
one-size goods get `["One Size"]` and the picker hides itself. Getting this
wrong is the most common bug in these stores — a shopper who can't state a size
either abandons the cart or orders the wrong thing.

**Placeholders.** Leave `image: ""` and set a `placeholder.tint` drawn from the
brand palette. The grid then looks deliberate rather than broken while the
owner waits on their photoshoot, and swapping in a real photo later is one line
per product.

**Lookbook.** Four to six tiles. If the brand has no photos and the vibe doesn't
call for a gallery, delete the `LOOKBOOK` array — the section and its nav link
remove themselves. An empty gallery is worse than no gallery.

## Step 4 — Theme it

Read `references/theming.md` and edit the `:root` block at the top of
`styles.css`. That file has calibrated starting points for streetwear, clean
minimal, skate, vintage, Y2K, and outdoor — pick the nearest and move it toward
the brand.

Two stores built from this template must not look like the same store. Structure
is shared; identity isn't. If the result feels like the last one recolored, the
display typeface and the background lightness are the two levers that actually
change it — go there first.

Three things to verify after any palette change, because they're what breaks:

- `--ink` on `--bg` reaches 4.5:1 contrast. Unreadable text costs sales and
  locks out anyone with low vision.
- `--accent-ink` is legible **on** `--accent` — check the primary button and
  the cart badge. A light accent needs dark ink; a deep accent needs light.
- Placeholder tints sit in the palette's family, not off in a random hue.

## Step 5 — Check that it actually works

Open it. Every one of these has shipped broken in a store that looked fine in
the code:

- A product page loads at `#/product/<id>` and Back returns to the grid.
- Size and color select, and Add to Cart refuses politely until they're chosen.
- The cart survives a page refresh.
- Quantity up/down and Remove all behave, and the subtotal tracks.
- The category filter row appears only when there's more than one category.
- At 375px wide nothing overflows sideways.

If a browser is available, drive it — load the page, click a product, add to
cart, reload, confirm the cart is still there. A quick script check catches
syntax errors but not a selector typo, and the selector typo is what the owner
will find.

At minimum run `node -c script.js && node -c data.js` before handing it over.

## Step 6 — Ship it

Write the README so it speaks to the owner, not to a developer: name the file
they edit, show one product block they can copy, say where images go.

Then follow `references/deploy.md` for hosting. Publishing to GitHub Pages,
connecting a domain, and creating Stripe or Shopify accounts all require the
owner's own login — you can't do those from here. Give them the exact clicks
and the URL to expect rather than a vague "you can deploy this anywhere."

Commit the store. These sites live in a repo the owner comes back to, and
uncommitted work in a temporary workspace is work that disappears.

## Working on a store that already exists

**Adding products** — append to `PRODUCTS` in `data.js`. Nothing else changes.

**Restyling** — edit the `:root` tokens. Resist rewriting the structure; if the
owner wants a different *look*, they almost always mean color and type.

**Turning on real payments** — flip `CHECKOUT.mode` and fill in `buyUrl` or
`variantIds`. Remove the demo disclaimer from the footer once money is real,
and confirm with them before doing it: a live store that takes money the owner
isn't ready to fulfill is a genuine problem, not a cosmetic one.

**Real photos arriving** — set `image` per product and add `gallery` for extra
angles. Keep files under ~300KB and crop 4:5; a beautiful store that takes
eight seconds to load on hotel wifi doesn't convert.

## Judgment calls worth making well

**Say what's demo.** If checkout doesn't take money, the footer says so. Someone
who thinks they placed an order and didn't is a support problem and a trust
problem.

**Don't fabricate social proof.** No invented reviews, star ratings, "as seen
in" logos, or follower counts. It's the kind of thing that looks like a nice
touch and is actually a false claim on a commercial page.

**Real prices only.** Prices in `data.js` are display-only — Stripe and Shopify
hold the real ones — but they should still match what the owner told you.
Don't guess a price to fill a gap; ask.

**Accessibility is table stakes here.** The template ships with a skip link,
focus rings, labeled controls, alt text, and a reduced-motion block. Keep them.
A store is a commercial page anyone should be able to use, and stripping this
out to save a few lines trades a real customer for nothing.
