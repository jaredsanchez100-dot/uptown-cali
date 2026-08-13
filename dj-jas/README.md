# DJ Jas — Official Merch Website

A clean, modern, single-page merch store for **DJ Jas**. Built as a static site
(plain HTML/CSS/JS) so it can be hosted anywhere — including free on GitHub Pages.

## Features

- 🎨 Bold neon dark theme with animated hero
- 🛒 Working cart drawer (add / remove items, live total)
- 🧢 Product grid (tees, hoodies, caps, vinyl, accessories)
- 📅 Tour date list
- 📧 Newsletter signup + social links
- 📱 Fully responsive

> **Note:** This is a demo storefront. Checkout and newsletter signup are not
> connected to real payment or email backends.

## Run locally

No build step. Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Push this branch to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Set the source to your branch (root folder) and save.
4. Your site goes live at `https://<user>.github.io/<repo>/`.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure & content |
| `styles.css` | All styling and responsive layout |
| `script.js`  | Products, tour data, cart logic |

## Customize

- **Products** — edit the `PRODUCTS` array in `script.js`.
- **Tour dates** — edit the `TOUR` array in `script.js`.
- **Colors** — tweak the CSS variables at the top of `styles.css`.
- **Real images** — swap the gradient `.card__img` blocks for `<img>` tags.
