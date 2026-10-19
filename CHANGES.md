# Storefront update — integrated 2026-10-19

## Purpose

Apply the supplied October 17 website update to the current repository: lead with recognizable products and brand imagery, make departments easy to explore, and improve product discovery while keeping ordering disabled.

## Changes

- Product-led home section with two featured designs and direct department links.
- Search, category filters, featured/price/name sorting, counts and clear empty states.
- Browser-local saved designs, available from cards and product pages.
- Related products and clearer fit, shipping and return information on product pages.
- Stronger dark, cream and red presentation using Uptown Cali's supplied logo and assets.
- NorCal Lights editorial feature and explicit concept/design-preview labeling.
- Removed dead social links, placeholder contact/story content and unsupported material/fit claims.
- Replaced false newsletter success with a disabled state until a real endpoint is connected.
- Sanitized restored cart data, preserved all three concept restrictions, improved modal/focus handling, and added guards against partial Shopify carts or incorrect Stripe quantities.
- Fixed keyboard focus after un-saving cards, changing gallery shots and editing cart quantities; fixed collection anchors when returning through browser history.
- Replaced decorative arrow glyphs with CSS arrows after browser review exposed missing glyphs.
- Added repeatable Playwright tests and desktop/mobile review screenshots.

## Preserved

All 21 product IDs and numeric prices; all ten `comingSoon` flags; all 16 lookbook entries; existing images/video; `/dj-jas/`; hosting workflow. Ordering remains disabled. No Instagram account was created or linked. No email backend or payment service was connected.

## Files to review

`index.html`, `data.js`, `script.js`, `styles.css`, and the documentation carry the supplied changes. `tests/`, `playwright.config.cjs`, the npm development manifest/lockfile, `.gitignore` and `docs/qa/` support repeatable verification. The site still needs no installation or build step to run.

## Validation and limits

Local Chromium testing covers desktop and mobile interaction and layouts from 320 to 1440 CSS pixels. Real-font screenshots were reviewed for the homepage, product detail and collection. JavaScript syntax and catalog/asset preservation checks passed. See [QA notes](docs/qa/README.md) for the exact checks and limits.

Checkout remains in demo mode, email signup remains disabled, and all concept restrictions remain intact. Production publication and live payment/email integrations are not part of this pull request.
