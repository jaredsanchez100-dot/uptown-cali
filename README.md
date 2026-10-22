# Uptown Cali — Website

A static storefront built with HTML, CSS and JavaScript. No installation or build step is required to run the site. The October 17 update package has been integrated with the repository and checked in Chromium on desktop and mobile layouts. Checkout remains disabled.

## Run locally

Open `index.html` in a browser, or serve this folder for more realistic testing:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Keep `data.js`, `script.js`, `styles.css`, `images/` and `video/` beside `index.html`.

## Browser tests

Tests use Node.js 18+ and Python 3. These development dependencies are optional; the storefront itself has no runtime dependencies.

```bash
npm ci
npx playwright install chromium
npm run test:syntax
npm test
```

The test runner starts the local static server. To use an installed Chromium instead of downloading one, run `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test`.

The suite covers desktop and mobile browsing, saved designs, preview carts, concept restrictions, keyboard focus, video, storage failures and responsive layout. See [QA notes and screenshots](docs/qa/README.md).

## What visitors can do

- Browse all 20 designs, search, filter by department and garment type, and sort.
- Save favorites on their current browser/device; no account is created.
- Inspect galleries, design details, related pieces and the existing video.
- Build a preview cart for non-concept pieces. Ordering is disabled.
- Explore all nine NorCal Lights concepts, including three swim sets with owner-supplied model previews and galleries. These cannot enter the cart.

Saved favorites and cart selections use browser storage. They do not reserve inventory or create orders, and may be cleared with browser data.

## Change content in `data.js`

`BRAND` controls the headline, story and contact links. `STOREFRONT` controls featured products and preview notices. `PRODUCTS` holds the catalog. `LOOKBOOK` holds the editorial tiles.

To change a product, edit its existing object. Preserve `id` when renaming a design so saved links still work. Each product needs a unique ID, department, name, category, numeric price, image, sizes and colors. Copy an existing product as a template. `gallery` accepts image paths or objects with `image` and `alt` fields.

All remaining products retain their original preview prices, not approved launch prices. The nine concepts show “Price at launch”; their source prices remain in the data for the owner to review. Confirm names, prices, available options, materials and measurements before enabling orders.

Do not remove `comingSoon: true` from a concept until it is an actual release with confirmed details and fulfillment.

## Images and brand copy

The existing logo, product visuals, lookbook, concept boards and video are preserved. The store labels imagery as design previews. The supplied handoff described some images as generated or upscaled; do not present them as evidence of actual fabric, fit, manufacture or customer purchases.

All three swim sets use cropped, owner-supplied nighttime AI model previews. Each product gallery also displays its standalone clothing design board as the second image, followed by alternate nighttime poses. These remain concepts, not verified product or fit photography.

Replace image files using the same names to retain their links, or update paths in `data.js`. Use actual product photos and verified measurements as they become available.

No Instagram account has been connected. `BRAND.socials` is empty, and the placeholder email was removed. Add only an account you control and an inbox you monitor. Example social entry after account creation:

```js
socials: [{ label: "Instagram", url: "https://www.instagram.com/YOUR_ACTUAL_HANDLE/" }],
```

## Email updates

Email signup is disabled because no collection service is connected. Visitors are told that signup is coming and can save designs locally instead. The previous form's false success message has been removed.

A developer can connect an owned HTTPS endpoint through `NEWSLETTER.endpoint`. It must save the subscription and return the response described in `README-DEVELOPER.md`. Do not paste a provider's generic form URL without adapting and testing the integration.

## Orders and launch

`CHECKOUT.mode` remains `"demo"`. No money is collected. Existing Stripe and Shopify adapters are retained for future work, but neither is configured or verified end to end.

Before launch, confirm products and prices, provide shipping/return policies and a real contact address, connect the chosen provider, and test payment and fulfillment. Keep all three concept-product guards intact.

## Publishing these changes

The supplied handoff identifies GitHub repository `jaredsanchez100-dot/uptown-cali` and Vercel project `uptown-cali`, with production on `main`. Treat a push to that branch as a production change. The hosting and DNS configuration has not been changed in this update.

A developer should compare these files with the latest repository, review the changes on a branch, and check a preview on mobile and desktop before publishing. See `CHANGES.md` for the exact scope and verification limits. The earlier `dj-jas/` site is unchanged.

## File map

| File | Purpose |
|---|---|
| `index.html` | Page structure, metadata and font references |
| `data.js` | Catalog, brand copy and integration configuration |
| `script.js` | Routing, filtering, saved designs, cart and forms |
| `styles.css` | Theme and responsive layouts |
| `images/`, `video/` | Existing visual assets |
| `README-DEVELOPER.md` | Technical handoff and release checks |
| `CHANGES.md` | This update and completed verification |
| `tests/`, `playwright.config.cjs` | Repeatable desktop and mobile browser checks |
| `docs/qa/` | Visual review evidence and verification limits |
| `dj-jas/` | Earlier site, preserved unchanged |
