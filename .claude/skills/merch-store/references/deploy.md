# Publishing the store

The site is static files, so hosting is free and fast almost anywhere. Pick
based on what the owner already has.

## GitHub Pages

Best when the site already lives in a GitHub repo.

1. Commit and push the store files to a branch.
2. Repo → **Settings** → **Pages**.
3. Under "Build and deployment", set Source to **Deploy from a branch**, pick
   the branch and `/ (root)`, then Save.
4. Wait ~60 seconds. The URL appears at the top of that Pages settings screen —
   `https://<user>.github.io/<repo>/`.

**Watch out:** the site must be at the repo root (or in `/docs`, which Pages
also offers). If `index.html` is nested in a subfolder, either move it up or
point Pages at `/docs`.

Only the owner can flip this switch — it's in their repo settings and there's
no way to do it from here. Give them the four steps and the URL to expect.

## Netlify drop

Fastest path, no git required: go to `app.netlify.com/drop` and drag the folder
onto the page. Live in seconds on a random subdomain, renameable in settings.

## Cloudflare Pages / Vercel

Both connect to a git repo and deploy on push. Framework preset: **None**.
Build command: leave empty. Output directory: `/`.

## Custom domain

Once the store is live on any of the above:

1. Buy the domain (Namecheap, Cloudflare, Porkbun — all fine).
2. In the host's dashboard, add the custom domain.
3. At the registrar, add the DNS records the host shows you — usually a
   `CNAME` for `www` and either an `A` record or `ALIAS` for the bare domain.
4. Wait for DNS to propagate (minutes to a few hours) and enable HTTPS, which
   every host above does automatically and for free.

For GitHub Pages specifically, adding the domain in Settings → Pages creates a
`CNAME` file in the repo. Leave it there — deleting it unsets the domain.

## Making the newsletter form real

The template's form confirms to the visitor but doesn't store anything, because
a static site has nowhere to put it. To actually collect addresses, point the
form at a service that accepts posts:

- **Formspree** — change the form to
  `<form action="https://formspree.io/f/YOURID" method="POST">` and remove the
  `e.preventDefault()` handler in `script.js`.
- **Mailchimp / Buttondown / ConvertKit** — each gives an embed snippet with
  its own form action; paste it in place of the `<form>` block.

All of these require the owner's account, so hand them the choice rather than
guessing.

## Before announcing it

Worth a real pass, because these are the things that actually lose sales:

- Open it on a phone, not just a narrow browser window.
- Add to cart, refresh the page, confirm the cart survived.
- Click every product; make sure sizes and colors select cleanly.
- If checkout is live, place one real test order end to end.
- Check the page title and description — they're what shows up in Google and
  when the link is pasted into Instagram or a group chat.
- Confirm every social link goes where it should.
