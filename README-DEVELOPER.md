# Uptown Cali — Developer Handoff

Updated October 21, 2026 (Pacific). This image-only update replaces the Midnight Chrome Bandeau and Cali Sport Scoop previews with owner-supplied nighttime photos, based on `main` at `bbc0167`. Golden Hour Triangle awaits a matching nighttime source. Checkout and email signup remain disabled.

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

Midnight Chrome Bandeau and Cali Sport Scoop now use only the owner-supplied nighttime model photos in cards, galleries and the lookbook; the collection hero also uses the Midnight Chrome night photo. Golden Hour Triangle retains its previous images because no matching nighttime image was supplied. Native-resolution WebP crops remove white panel dividers and retain full-frame `contain` rendering. Previous files remain in the repository for rollback but are no longer referenced by the two updated designs. See `docs/swim-model-images.md` for source mapping and crop bounds.

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

`CHECKOUT.mode === "demo"` disables checkout and labels the cart as a preview. No provider configuration or secret was added.

The inherited adapters are retained, with two protections added: Shopify refuses to send a cart if any line lacks a variant mapping; Stripe's current link flow refuses quantities other than one because its URL does not transmit quantity.

Stripe remains a separate-payment-per-line flow, not a unified cart. A reference string is appended to identify the selected options; this is not server-side price, inventory or variant validation. Provider-specific configuration, prices, quantity behavior and fulfillment must be verified before use. Do not assume changing the mode or adding links completes launch.

For Shopify, variant keys follow `"M / Black"`; all offered combinations need valid provider mappings. Validate the entire order, including quantity, price, size/color, shipping and tax, through the chosen provider. No real provider transaction was tested here.

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
