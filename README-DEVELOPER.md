> Checkout preparation updated October 21, 2026. No production deployment or live payment activation. Swim model imagery remains outstanding after image-service rejection.

# Uptown Cali — Developer Handoff

Updated 2026-10-20. The original storefront integration was merged in PR #3. This update replaces the three remaining swim images with the approved realistic concept previews and removes Coast After Dark, based on `main` at `5403091`. Checkout and email signup remain disabled.

## Runtime and hosting

Plain HTML/CSS/JavaScript with no runtime dependencies or build step. Serve the root using any static server. Hash routes need no server rewrites. npm and Playwright are used only for development tests. The existing `/dj-jas/` folder remains byte-for-byte unchanged.

The supplied handoff identifies:

- Production: `https://www.uptowncali.com`
- GitHub: `jaredsanchez100-dot/uptown-cali`
- Vercel project: `uptown-cali`, production branch `main`
- Cloudflare DNS with proxy disabled

The hosting details above come from the supplied handoff. This integration fetched `origin/main` and compared the archive against the current repository before applying its changes. The recent dark storefront photos, nested departments, Accessories navigation and Heritage Script video are preserved. No hosting or DNS configuration was changed.

`.github/workflows/pages.yml` is preserved. The previous handoff described it as a legacy workflow on a nonproduction branch; this update does not alter or rely on it.

## Configuration

| Object | Purpose |
|---|---|
| `BRAND` | Name, story, contact address, social links |
| `STOREFRONT` | Featured IDs and design-preview/fulfillment notices |
| `NEWSLETTER` | Optional owned signup endpoint; blank by default |
| `CHECKOUT` | Demo mode and optional provider configuration |
| `PRODUCTS` | 20 products; retained products keep their IDs and prices |
| `LOOKBOOK` | 15 tiles, including three updated swim previews |

Public social links are rendered only for HTTPS URLs. No Instagram handle or contact address is invented. The apparent fabric weights, construction specifications and sizing recommendations removed in the original storefront integration were unverified. Imagery remains publicly described as design previews.

The approved swim images are full-frame 1024 × 1536 WebP assets. Fresh `.webp` paths replace the old `.jpg` paths in products, the lookbook and the collection hero. The three old swim boards and the retired Coast After Dark image were removed; Git history retains them. The retired product and lookbook entry are absent, and existing unknown-product and storage guards handle old links, saved IDs and cart entries.

## Routes and state

- `#/product/<id>`: product detail
- `#/shop/men`, `#/shop/women`, `#/shop/swim`, `#/shop/accessories`: department views
- `#/collections/norcal-lights`: editorial collection
- `#/saved`: saved designs
- `#shop`, `#lookbook`, `#about`, `#contact`: home sections
- `#nl-apparel`, `#nl-swim`: collection sections, including direct entry and browser history

Saved IDs use localStorage key `saved:uptown-cali`; cart lines use `cart:uptown-cali`. These are browser-local preferences, not accounts, inventory reservations or orders. Storage inputs are sanitized. Search/filter/sort state is transient.

## Preserve the concept guards

All nine NorCal Lights products remain `comingSoon: true`. They show “Price at launch,” have no Add to Cart control, and are rejected both by `addToCart()` and `loadCart()`. Do not remove these guards casually.

Concept copy and source prices came from an earlier supplied specification, according to the original handoff. They are not owner-approved production specifications. Men/accessory prices also remain provisional until the owner confirms them.

## Payments remain off

See [checkout launch plan](docs/checkout-launch.md) for current adapter behavior, merchant setup, fulfillment and release acceptance requirements.

`CHECKOUT.mode` remains `demo`; `liveApproved` and all product release flags are false. `checkout.js` validates the provider, approved hostnames, operational checks, policy/contact configuration, every cart item and every exact variant mapping before producing a checkout URL. `script.js` uses the same validation for the button and immediately before navigating. Policy links appear once release checks pass.

Shopify supports a complete multi-item cart; size-only/default fallback is no longer accepted. Stripe now requires dedicated per-variant links (`stripeLinks`) and only one total unit; the old `buyUrl` is unused, and separate per-line Pay links were removed. A URL reference string cannot prove inventory or payment. Provider-side product publication and fulfillment checks are still required. Public JavaScript release flags are not security controls.

Run `npm run audit:checkout` for a local, read-only configuration inventory and `npm run test:checkout` for pure checkout guard tests. Playwright specs use intercepted, mocked provider destinations and never place a paid order.

## Newsletter integration contract

`NEWSLETTER.endpoint` defaults to an empty string, keeping both signup forms hidden. The fallback explains that email signup is not open. No visitor email is written to localStorage.

A configured endpoint must be HTTPS and accept:

```json
{"email":"customer@example.com","interest":"general","consent":true}
```

The collection form supplies its own interest value. Return HTTP success and `{"subscribed":true}` only after the signup has been durably accepted by the intended system. The frontend shows success only for that exact boolean acknowledgment. Validation/server errors, non-JSON responses, failures and the 12-second timeout show a failure message and retain the input.

A generic form-action URL is not automatically compatible. Implement provider credentials on the server, input validation, appropriate CORS, abuse controls and the intended consent/subscription lifecycle. If a provider requires confirmation by email, adapt the response and customer message to that lifecycle rather than treating a pending request as a completed subscription. Test with the actual integration before exposing the form.

## Verification

See [QA notes](docs/qa/README.md) for browser coverage, screenshots and remaining limits. The Playwright suite is included in `tests/storefront.spec.cjs`; run it using the instructions in `README.md`.

Integration QA corrected focus loss when saved cards, gallery thumbnails and cart controls are rebuilt, and restored hidden collection sections when returning through browser history. Decorative arrows use CSS so missing system glyphs cannot render empty boxes.

The October 19 integration preserved the original 21 products and 16 lookbook entries. The October 20 update deliberately removes one product and one lookbook entry and replaces three swim images; retained product IDs, prices, options and concept guards remain unchanged. Existing apparel and men's imagery, videos, `/dj-jas/` and the hosting workflow remain unchanged. No runtime dependency was added.

Real device/Safari testing, screen-reader testing and live provider transactions are outside the local Chromium checks. The existing GitHub-to-Vercel deployment process publishes `main`. Keep checkout and newsletter disabled; neither integration is connected by this change.
