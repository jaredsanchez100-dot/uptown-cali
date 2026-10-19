# Storefront QA — 2026-10-19

Integrated the October 17 upload against `origin/main` at `9e6bee2`. All 21 product IDs and numeric prices, ten `comingSoon` flags, product options and image/gallery paths, and all 16 lookbook entries match that base. Existing assets, `/dj-jas/`, repository skills and the hosting workflow are unchanged.

## Browser checks

20 Playwright tests passed in local Chromium: ten scenarios run at both desktop (1440 × 1000) and mobile (390 × 844, touch enabled) settings. The suite checks:

- Search, department/subcategory filters, sorting, empty states and reset.
- Saved designs across cards, product pages, reloads and removal.
- Cart option validation, quantities, totals, persistence and disabled checkout, including a synthetic checkout click with no provider handoff.
- Modal focus trapping, Escape/scrim dismissal and focus return.
- Gallery controls, related products, sizing information and video playback with reduced motion.
- All ten concept pages and rejection of restored concept cart entries.
- Corrupt/invalid storage and blocked browser storage.
- Collection anchors after leaving the page and returning through browser history.
- Disabled newsletter forms, loaded catalog images and the legacy DJ Jas page.
- No document overflow or clipped main headings at 320, 390, 768, 1024 and 1440 CSS pixels.

Additional mobile browser checks passed for multi-color selection, the one-size accessory flow and the 20-per-line quantity limit. JavaScript syntax and referenced local asset checks also passed.

Visual review used the real Google Fonts at 320, 390, 768 and 1440 pixels on the homepage, Heritage Script product page and NorCal Lights collection. Images were fully loaded before capture. These pages produced no JavaScript errors, browser console errors or failed HTTP responses during that review. The automated functional suite stubs only the font stylesheet to avoid a CDN dependency.

## Screenshots

| View | Screenshot |
| --- | --- |
| Homepage, desktop | [1440 × 1000](home-desktop.png) |
| Homepage, mobile | [390 × 844](home-mobile.png) |
| Product detail, desktop | [1440 × 1000](product-desktop.png) |
| NorCal Lights, mobile | [390 × 844](collection-mobile.png) |

## Run again

From the repository root, with Node.js 18+ and Python 3:

```bash
npm ci
npx playwright install chromium
npm run test:syntax
npm test
```

For the preinstalled system browser used in this review:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

## Limits

These are local Chromium and emulated-mobile checks, not physical-device, Safari or screen-reader certification. Production deployment was not performed. Payment and email providers were not connected or tested live. `CHECKOUT.mode` remains `"demo"` and `NEWSLETTER.endpoint` remains empty.
