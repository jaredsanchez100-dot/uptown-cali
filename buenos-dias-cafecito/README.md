# Buenos Días Cafecito — website

A website for **Buenos Días Cafecito**, 512 San Benito St, downtown Hollister.
Modern Mexican breakfast and lunch, open every day 7 AM – 2 PM.

Plain HTML, CSS and JavaScript. No build step, nothing to install. Open
`index.html` in a browser and it runs; edit a file, refresh, and the change is
there. It's fully bilingual (English / Spanish toggle in the header) and reads
its hours, menu, prices and photos from one file: **`data.js`**.

---

## Why this site makes the cafe money

Everything on the page was chosen because it moves a number the cafe cares
about. In order of impact:

1. **They have no working website today.** `buenosdiascafecito.com` has served
   a hosting-company "under development" placeholder since March 2022, the
   GoDaddy site the Chamber listing points at returns a 404, and Apple Maps and
   Google fall back to their Facebook page. A cafe with 4.5★ on Yelp (160+
   reviews), 5.0 on Tripadvisor and "Neighborhood Favorite" on Nextdoor is
   invisible to anyone who searches "breakfast Hollister" and clicks *Website*.
   This fixes that, with proper search-engine data (`Restaurant` + full `Menu`
   schema, hours, geo, order link) so Google can show hours, the menu and an
   *Order online* button straight in the results.

2. **It makes the phone the order channel, and the phone costs nothing.**
   The owners want phone orders and want to drop ChowNow. The numbers back
   them up: ChowNow's cheapest plan is $249 a month *plus* 2.95% + 29¢ on every
   order, so "about $300 a month" is a floor, not the bill. A phone order paid
   at the counter costs the cafe zero in platform fees and the lowest card rate
   there is (tap at the counter runs about 2.6% + 15¢; a card keyed in over the
   phone runs about 3.5% + 15¢, so take payment at pickup, not over the phone).
   Every button on the site that used to say "Order online" now says **Call to
   order** and dials the cafe in one tap. The menu carries item numbers so a
   phone order is "a number 4 with eggs over easy" instead of a spelling
   contest. And for people who won't call, there's **Text your order**: tap
   Add beside dishes, the phone opens a text with the order written out, the
   cafe texts back to confirm. No platform, no fee, a written ticket.
   DoorDash stays as a delivery option only, with its fees explained.

3. **Catering and large orders finally have a front door.** Yelp and Apple
   list "catering" as an amenity, but nothing online tells anyone how to ask.
   The catering form works with zero backend: it composes a text message to the
   cafe's phone (one tap on a phone), or emails the cafe once
   `cateringEndpoint` in `data.js` is filled in. Office breakfasts, job-site
   burritos by the dozen and quinceañera brunches are the highest-ticket
   orders a breakfast place gets.

4. **It speaks Spanish.** Hollister is about 69% Hispanic or Latino. The
   toggle switches every word on the page, including the menu, and the site
   opens in Spanish automatically for phones set to Spanish.

5. **It's built for the days downtown is packed.** The Wednesday farmers'
   market (April–October) sets up on San Benito between Fifth and Seventh, with
   the cafe in the middle of it; the Independence Rally and the Street Festival
   & Car Show close the street. The events section and the "Heading to
   Pinnacles?" note capture the searches visitors make on those days.

6. **It turns happy customers into rankings.** Review count and recency are a
   big part of how Google ranks local businesses. The reviews section ends with
   one-tap *Review us on Google / Yelp* buttons.

7. **It's fast and it's phone-first.** Most restaurant traffic is a phone
   at 7:40 AM. The page is under 150KB before fonts, has no frameworks, shows
   live open/closed status, and keeps *Order online* and *Call* pinned to the
   bottom of the screen on phones.

Bonus: the **Print menu** button prints a clean two-column menu on one sheet,
straight from the same data the website uses. No more paying for menu reprints
when a price changes.

---

## Launch checklist

0. **Put the new phone number in `data.js`** (`phone` and `phoneHref`), and
   the old one in `oldPhone` so the site shows a "new number" bar for a few
   months. Then work the list in *Changing the phone number everywhere* below.
1. **Connect the domain.** The cafe already owns `buenosdiascafecito.com`. Point
   it at wherever this folder is hosted (GitHub Pages, Netlify, Cloudflare
   Pages are all free for a static site). The canonical URL and the link-preview
   image in `index.html` already assume that domain. If it launches somewhere
   else first, change the four `https://buenosdiascafecito.com/` URLs in the
   `<head>` and the `url` in `data.js`.
2. **Google Business Profile.** Set the primary phone to the new number
   (Google will call or text it with a code), add the website URL, and
   remove the ChowNow *Order* link once that account is closed. This is the
   single highest-traffic listing the cafe has, and Google shows the phone
   number and a Call button right in the map result.
3. **Yelp, Apple Maps, Tripadvisor, Nextdoor, the Chamber listing.** Update
   the website field on each (the Chamber one currently points at the dead
   GoDaddy page).
4. **Instagram bio and Facebook.** Link in bio → the site. Facebook's *Order
   Food* button → ChowNow.
5. **Catering emails.** Sign up for a free form endpoint (Formspree, Basin,
   Netlify Forms), paste the URL into `cateringEndpoint` in `data.js`. Until
   then the form hands customers a ready-made text message, which works fine.
6. **Photos.** Six of the seven slots are filled with real photos (see
   *Photos and the logo* below). Still wanted: the patio, the three owners, and
   the French toast. Shot list in `images/README.md`.

---

## Things to confirm with the owners before launch

The site was built from public listings, the ChowNow menu and the owners'
2024 BenitoLink interview. A few facts differ between sources:

- **Hours.** Apple Maps, Instagram, Nextdoor and the Chamber directory all say
  every day 7–2. One Yelp summary said Monday–Friday. The site says every day;
  `exceptions` in `data.js` handles a closed day in one line.
- **Prices.** Taken from the online-ordering menu in September 2026. Worth a
  two-minute read-through against the printed menu.
- **Drinks.** Micheladas and mimosas appear in reviews but not on the online
  menu, so the site says "ask your server" rather than listing prices.
- **Orange and apple juice** show no price online; the site shows "Ask".
- **Ordering platforms.** ChowNow is being cancelled: once it is, delete the
  ChowNow "Order" links on Google, Facebook and Instagram so nobody lands on
  a dead page. If the owners ever want online ordering back without a
  monthly fee, DoorDash's own online ordering (formerly Storefront) is $0 a
  month and 0% commission, only card processing (about 3.3% + 30¢); put its
  link in `ordering.online` and the "Order online" buttons reappear. There is
  also a Toast page for the address; if the cafe is on Toast's point of sale,
  online ordering may already be included in the plan they pay for.
- **Reservations for groups.** Apple lists reservations; the site says "call
  ahead" for big groups, which is safe either way.

---

## Photos and the logo

**The logo** is the cafe's real one. It was pulled from the large "Now open
for pick up" graphic on the cafe's Facebook page, cleaned up with an
upscaler and traced to vector, so it's crisp at any size:

- `images/logo.svg` — full logo on light backgrounds (header, print menu)
- `images/logo-reverse.svg` — same artwork with the navy swapped for cream, for the footer
- `images/flower.svg` — just the flower ornament (above the hero headline)
- `images/icon.svg` + the PNG icons — the flower head, for the browser tab and home screen

If the owners have the original vector file (AI, EPS or SVG), drop it in as
`images/logo.svg` and everything picks it up. The site's colors (navy, pink,
gold) are sampled from the logo and live at the top of `styles.css`.

**The photos** came from two places, and the difference matters for launch:

| File | What | Source | Who owns it |
|------|------|--------|-------------|
| `pancakes.jpg`, `menu-pancakes.jpg` | Pancakes with powdered sugar | Cafe's Facebook page | The cafe |
| `menu-skillet.jpg` | Skillet with eggs and potatoes | Cafe's Facebook page | The cafe |
| `menu-chicken-fried-steak.jpg` | Chicken fried steak and gravy | Cafe's Facebook page | The cafe |
| `hero.jpg`, `cafe-de-olla.jpg`, `menu-cafe-de-olla.jpg` | Patio table: skillet, café de olla mug, arrachera plate | Yelp, via Apple Maps | A Yelp reviewer |
| `chilaquiles.jpg` | Chilaquiles rojos, top down | Yelp, via Apple Maps | A Yelp reviewer |
| `menu-chilaquiles.jpg` | Chilaquiles with a fried egg | Yelp, via Apple Maps | A Yelp reviewer |
| `arrachera.jpg`, `menu-arrachera.jpg` | Arrachera over chilaquiles | Yelp, via Apple Maps | A Yelp reviewer |
| `table.jpg` | Pancakes, chilaquiles and a mug on the patio | Yelp, via Apple Maps | A Yelp reviewer |

The Facebook photos are the cafe's own, so they're fine to use. The Yelp
photos belong to whoever took them. They're great for showing the owners what
the site looks like, but before the site goes public either get a quick OK
from the reviewers through Yelp, or shoot replacements (a phone and one
morning of good light is all it takes, see `images/README.md`). Swapping a
photo is a one-line change in `data.js`.

**What was done to them.** Nothing that changes the food. The four Facebook
photos were only 414 px wide, so they were upscaled 4x with Real-ESRGAN, and
the hero photo 2x, so they stay sharp on phone screens. Every photo then got a
gentle white balance (indoor shots ran orange), a levels stretch, a soft
contrast curve, about 8% more saturation and a light sharpen, then a crop to
its slot. The originals are not in the repo.

---

## Changing the phone number everywhere

The old number keeps showing because every listing stores its own copy, and
the small aggregator sites copy from the big ones. Fix the sources in this
order and the rest follow within a few weeks.

**First, keep the old number alive.** Old printed menus, saved contacts and
cached listings will keep ringing it for months, and every one of those is a
phone order. If the old number was a cell number, port it to Google Voice
(a one-time $20) and forward it to the new line. If it was a landline or VoIP
line, ask the carrier for remote call forwarding, or port it to a cheap
number-parking service and forward from there (a few dollars a month). Keep it
forwarding for at least a year, then let it go.

**Then update, in this order:**

| Where | How | Why it matters |
|-------|-----|----------------|
| Google Business Profile | business.google.com → Edit profile → Contact → phone. Google calls or texts the new number with a code. | The map result and its Call button. If the change keeps reverting, remove extra managers and third-party apps connected to the profile. |
| Yelp for Business | biz.yelp.com → Business Information → phone | Apple Maps copies business details from Yelp, so Yelp has to be right first. |
| Apple Business Connect | businessconnect.apple.com → Locations → Edit | Apple Maps, Siri, CarPlay. |
| Facebook page and Instagram bio | Page → About → Contact; Instagram → Edit profile → Contact options | Still the most-clicked listing for the cafe today. |
| DoorDash merchant portal | Store settings → phone | The number Dashers and customers call about an order. |
| Nextdoor business page | nextdoor.com/pages → Edit | "Neighborhood Favorite" page. |
| San Benito County Chamber | Ask the Chamber office to update the member listing (it also links to a dead GoDaddy site). | Local directory other sites scrape. |
| Tripadvisor | Owner center → Business details | 5.0 rating page. |
| Bing Places | bingplaces.com | Feeds Bing, DuckDuckGo, Alexa and some car navigation. |
| This website | `phone` and `phoneHref` in `data.js` | Every tap-to-call link, the print menu, the contact card and the search data update together. |
| Printed menus, receipts, the door, the sandwich board | Reprint from the site's Print menu button | The physical copies are what regulars photograph. |

Scraper sites (Restaurant Guru, Restaurantji, MenuPix, Wheree and the like)
refresh from Google and Yelp on their own. Don't chase them.

---

## Where the money is: a short list for the owners

**Cuts, in order of size**

1. **ChowNow.** $249 to $449 a month plus 2.95% + 29¢ per order. Cancelling
   saves $3,000 to $5,400 a year before per-order fees. Phone and text orders
   replace it at zero.
2. **DoorDash commission.** 15% to 30% of every marketplace order, on top of
   the ~12% price markup customers see there. The site steers everyone who
   can pick up to the phone instead; DoorDash stays for delivery-only
   customers.
3. **Card fees on phone orders.** Pay at the counter (tap, ~2.6% + 15¢), not
   by reading a card over the phone (~3.5% + 15¢, plus chargeback risk).
4. **Menu reprints.** The Print menu button prints the current menu, with the
   item numbers, on one sheet. A price change is a one-line edit, not a
   print run.
5. **Website costs.** Plain files on free hosting. Nothing to renew but the
   domain the cafe already owns.

**Revenue, in order of effort**

1. **Stop losing calls.** A forwarded old number plus the new number on every
   listing. Every missed call at 8 AM is a lost ticket.
2. **Item numbers and a 20-second phone script.** "Number 4, how do you want
   the eggs, want a café de olla with that?" A $4.99 coffee on a $19 plate is
   a 26% bigger ticket, and coffee is the easiest add-on in breakfast.
3. **Catering.** Office breakfasts and job-site burritos by the dozen are the
   biggest tickets a breakfast place sees. The form is live; mention it on
   the phone and on the counter.
4. **Price the sell-out.** The arrachera sells out most days at $26.99. A dish
   that sells out is underpriced; test a $1 to $2 increase on that one item
   and watch whether it still sells out.
5. **Reviews.** More and newer reviews move the cafe up the map. The site asks
   for them; a small card at the register with the Google review link does
   the rest.
6. **Rally and festival days.** Pre-orders by phone the day before, pickup at
   7 before the street closes.

---

## Editing the site (all in `data.js`)

| What | Where |
|------|-------|
| Hours | `SITE.hours`, and `SITE.exceptions` for a day that differs or is closed |
| Holiday closure banner | `SITE.notice` (English and Spanish) |
| Phone number (everywhere at once) | `SITE.phone` and `SITE.phoneHref`; `SITE.oldPhone` shows the "new number" bar |
| How people order | `SITE.ordering`: `phone`, `text` (the text-order builder), `online` (an ordering link, or empty), `delivery` (DoorDash page, or empty) |
| Item numbers on the menu | `SITE.menuNumbers` |
| Address, map pin | `SITE.address`, `SITE.geo` |
| Order / social / review links | `SITE.links` |
| Menu, prices, descriptions | `MENU` — each item has an `en` and `es` name and description, a `price` (or `null` to show "Ask") and `tags` (`popular`, `sellsOut`, `veg`, `weekend`, `kids`) |
| The four dishes on the front page | `SIGNATURES` |
| Ratings strip and review quotes | `RATINGS`, `REVIEWS` |
| Downtown events | `EVENTS` |
| The story and quotes | `STORY` |
| Photos | `SITE.photos` — a path per slot, empty string shows the drawing; `SITE.photoAlt` is the alt text |
| Photo next to a menu item | add `photo: "images/menu-something.jpg"` to the item (square, 480 px) |
| Every other word, both languages | `I18N` |
| "Menu and prices as of…" | `SITE.menuUpdated` |

Colors and fonts are the variables at the top of `styles.css`.

## Run it locally

```bash
cd buenos-dias-cafecito
python3 -m http.server 8000
# open http://localhost:8000
```

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure, the built-in dish drawings, search-engine data |
| `styles.css` | All styling, responsive layout, print stylesheet |
| `script.js` | Language toggle, menu rendering, open/closed status, catering form |
| `data.js` | **Everything you'd edit** |
| `images/` | Logo files, icons, link-preview image, and the photos |
