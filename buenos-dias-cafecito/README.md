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

2. **It pushes orders to the commission-free channel.** The cafe already has
   its own ChowNow ordering page, which charges the restaurant a flat fee
   instead of a cut per order. DoorDash marketplace takes 15–30% and lists the
   cafe's menu at roughly a 12% markup (Chilaquiles: $21.25 on DoorDash vs
   $18.99 in-house). Every *Order online* button on this site (header, hero,
   the always-visible bar on phones, the Order section) goes to ChowNow first;
   DoorDash is offered second, with the markup explained. Each order that moves
   over is worth roughly $3–6 to the cafe on a $20 ticket.

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

1. **Connect the domain.** The cafe already owns `buenosdiascafecito.com`. Point
   it at wherever this folder is hosted (GitHub Pages, Netlify, Cloudflare
   Pages are all free for a static site). The canonical URL and the link-preview
   image in `index.html` already assume that domain. If it launches somewhere
   else first, change the four `https://buenosdiascafecito.com/` URLs in the
   `<head>` and the `url` in `data.js`.
2. **Google Business Profile.** Add the website URL, and set the *Order*
   link to the ChowNow URL. This is the single highest-traffic link the cafe has.
3. **Yelp, Apple Maps, Tripadvisor, Nextdoor, the Chamber listing.** Update
   the website field on each (the Chamber one currently points at the dead
   GoDaddy page).
4. **Instagram bio and Facebook.** Link in bio → the site. Facebook's *Order
   Food* button → ChowNow.
5. **Catering emails.** Sign up for a free form endpoint (Formspree, Basin,
   Netlify Forms), paste the URL into `cateringEndpoint` in `data.js`. Until
   then the form hands customers a ready-made text message, which works fine.
6. **Photos.** The biggest visual upgrade available. Seven photos, shot list
   in `images/README.md`, then fill in `photos` in `data.js`.

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
- **Ordering platforms.** ChowNow is live. There's also a Toast page for the
  address; if the cafe has moved to Toast online ordering, swap `links.order`.
- **Reservations for groups.** Apple lists reservations; the site says "call
  ahead" for big groups, which is safe either way.

---

## Editing the site (all in `data.js`)

| What | Where |
|------|-------|
| Hours | `SITE.hours`, and `SITE.exceptions` for a day that differs or is closed |
| Holiday closure banner | `SITE.notice` (English and Spanish) |
| Phone, address, map pin | `SITE.phone`, `SITE.address`, `SITE.geo` |
| Order / social / review links | `SITE.links` |
| Menu, prices, descriptions | `MENU` — each item has an `en` and `es` name and description, a `price` (or `null` to show "Ask") and `tags` (`popular`, `sellsOut`, `veg`, `weekend`, `kids`) |
| The four dishes on the front page | `SIGNATURES` |
| Ratings strip and review quotes | `RATINGS`, `REVIEWS` |
| Downtown events | `EVENTS` |
| The story and quotes | `STORY` |
| Photos | `SITE.photos` — a path per slot, empty string shows the drawing |
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
| `buenos-dias-cafecito.vcf` | The "Save our number" contact card |
| `images/` | Icons, link-preview image, and where the photos go |
