# Complete nighttime swim galleries — October 21, 2026

The owner supplied `IMG_1356.jpeg` for Golden Hour Triangle and explicitly requested that standalone clothing imagery remain displayed, with a screenshot identifying the original design boards.

Golden Hour uses two native-resolution crops from the 1199 × 1008 source: front `586x1008+0+0`, seated `586x1008+604+0`. New `07-golden-hour-triangle-night-model-*.webp` files use quality 86 with metadata stripped. No regeneration or garment changes were performed.

All three swim products now use nighttime model photos for cards and the lookbook. Their galleries show the main model pose, the matching standalone clothing board, then alternate nighttime poses. The original full-resolution board assets were reused, rather than cropped out of the supplied screenshot. No daytime model photos remain referenced in swim galleries.

All non-image product fields and payment configuration are unchanged. Concepts remain Coming Soon and checkout remains in demo mode. All 24 desktop/mobile Playwright cases passed, including every standalone board and nighttime pose. Syntax and whitespace checks passed; desktop and mobile previews were visually reviewed.

---

## Previous nighttime update (gallery rules superseded above)

# Current nighttime swim imagery — October 21, 2026

The owner requested the newly supplied nighttime images to match the dark storefront theme. Two attachments show Cali Sport Scoop; neither is Golden Hour Triangle.

| Source | Use |
|---|---|
| IMG_1359.jpeg | Alternate exposure of Cali Sport Scoop; not used |
| IMG_1360.jpeg | Cali Sport Scoop front and seated poses; selected for clearer garment visibility |
| IMG_1361.jpeg | Midnight Chrome Bandeau front, seated and side poses |

Crops: front `586x1008+0+0`, seated `586x1008+604+0`, bandeau side `585x1008+1207+0`. Exported as WebP at quality 86 with metadata stripped, no resizing or generation. New paths contain `-night-model-` to avoid stale cached daytime photos.

Only these nighttime photos are referenced for Midnight Chrome and Cali Sport: cards, product main images, alternate galleries, lookbook, and Midnight Chrome collection hero. Their previous daytime images and product boards are no longer shown. Original files are retained for rollback. Golden Hour Triangle is unchanged pending its matching nighttime source; no other garment image is substituted for it.

All concepts remain Coming Soon and checkout remains in demo mode. All 24 desktop/mobile Playwright cases and syntax checks passed. Payment configuration and non-image product fields match the base commit.

---

## Previous daytime release (superseded for Midnight Chrome and Cali Sport)

# Swim model imagery — 2026-10-22

Owner supplied three AI-generated triptychs and authorized selecting, cropping and publishing their model previews. No new image generation or garment alteration was performed.

| Source attachment | Design | Asset prefix |
|---|---|---|
| IMG_1342.jpeg | Golden Hour Triangle Swim Set | 07-golden-hour-triangle |
| IMG_1343.jpeg | Midnight Chrome Bandeau Swim Set | 08-midnight-chrome-bandeau |
| IMG_1344.jpeg | Cali Sport Scoop Swim Set | 09-cali-sport-scoop |

Each 1792 × 1008 source was cropped without resizing: front `586x1008+0+0`, seated `586x1008+604+0`, side `585x1008+1207+0`. These bounds exclude the white panel dividers. Assets live in `images/norcal-lights/` with `-model-front.webp`, `-model-seated.webp` and `-model-side.webp` suffixes, exported with ImageMagick at quality 86 with metadata stripped.

The front pose presents each full design most clearly and is used across browsing and the lookbook. Product galleries contain all three poses followed by the existing product-only board. The collection hero uses the Midnight Chrome front pose. Full-frame `contain` rendering preserves faces and garments.

These are design previews, not evidence of manufacturing, fit or fulfillment. All nine concepts retain `comingSoon: true`; no product IDs, prices, sizes, purchase restrictions or payment configuration changed. Checkout remains in demo mode.

Verification: the existing swim browser check covers every card, all four gallery images per set, the lookbook/lightbox and the collection hero on desktop and mobile. The existing concept and cart checks enforce purchase restrictions. All 24 Playwright cases passed on desktop and mobile Chromium, along with JavaScript syntax and whitespace checks. Desktop and mobile screenshots were visually reviewed. Payment configuration and all non-image product fields were compared against the base commit and are unchanged. See the PR for deployment status.
