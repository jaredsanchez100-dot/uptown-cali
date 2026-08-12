# Theming a store

The goal is that two stores built from this template don't look like siblings.
Structure can be shared; the *feel* can't be, or the brand isn't a brand.

The whole theme lives in the `:root` block at the top of `styles.css`. Change
those values first, then adjust layout only where the brand actually calls for
something different.

## What carries the most identity

In rough order of impact per unit of effort:

1. **The display typeface.** More than any other single choice, this is what
   makes a store feel like streetwear vs. luxury vs. outdoors. Body text can
   stay a neutral system font almost every time.
2. **Background lightness.** Dark backgrounds read as nightlife, street,
   music, hype. Light backgrounds read as premium, clean, considered,
   outdoorsy. Getting this one wrong makes everything else fight uphill.
3. **Accent color.** One saturated color used sparingly beats three used
   evenly.
4. **Corner radius.** `4px` reads sharp and technical, `10px` reads modern
   neutral, `20px+` reads soft and friendly.
5. **Letter-spacing and case.** Wide-tracked uppercase reads institutional and
   expensive; tight lowercase reads casual and young.

## Loading fonts

Add the Google Fonts link in `<head>` before `styles.css`, then set
`--font-display`. Always keep a real fallback in the stack so the page still
renders if the font request fails:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet">
```

```css
--font-display: "Archivo Black", Impact, system-ui, sans-serif;
```

## Starting points

These are calibrated, not exhaustive — pick the closest one and move it toward
the brand rather than using it as-is. Every set below passes contrast on body
text, which matters because a store people can't read is a store people
don't buy from.

### Streetwear / West Coast
Warm, sun-bleached, slightly retro. Good for California-rooted brands.
```css
--font-display: "Archivo Black", Impact, sans-serif;
--display-transform: uppercase;
--bg: #14110c;  --bg-alt: #1e1a13;  --card: #221d16;
--ink: #f7f2e6;  --muted: #ab9f8c;
--accent: #e08a3c;  --accent-ink: #14110c;  --line: #352e23;
--radius: 8px;
```

### Clean minimal / premium
Light, quiet, lets product photography carry the page.
```css
--font-display: "Instrument Serif", Georgia, serif;
--display-tracking: -0.01em;
--bg: #faf9f7;  --bg-alt: #f2efea;  --card: #ffffff;
--ink: #17150f;  --muted: #6d675c;
--accent: #1f1d17;  --accent-ink: #faf9f7;  --line: #e0dbd2;
--radius: 4px;
```
With a light background, soften `.hero__bg` — the default radial glows are
tuned for dark. Reducing the accent mix to ~12% usually does it.

### Skate / hardcore
High contrast, loud, a little aggressive.
```css
--font-display: "Anton", Impact, sans-serif;
--display-transform: uppercase;
--bg: #0a0a0a;  --bg-alt: #131313;  --card: #171717;
--ink: #ffffff;  --muted: #8f8f8f;
--accent: #e8ff45;  --accent-ink: #0a0a0a;  --line: #262626;
--radius: 2px;
```

### Vintage / workwear
Muted, earthy, built-to-last.
```css
--font-display: "Bitter", Georgia, serif;
--bg: #201d18;  --bg-alt: #2a251e;  --card: #2f2921;
--ink: #ece4d6;  --muted: #a2988a;
--accent: #b3703a;  --accent-ink: #f7f2e8;  --line: #3d362c;
--radius: 6px;
```

### Y2K / hyperpop
Saturated, playful, high-energy.
```css
--font-display: "Bungee", Impact, sans-serif;
--display-transform: uppercase;
--bg: #10061c;  --bg-alt: #1a0a2b;  --card: #1f0d33;
--ink: #fdf4ff;  --muted: #a893c4;
--accent: #ff2f9e;  --accent-ink: #ffffff;  --line: #33184d;
--radius: 18px;
```

### Outdoor / technical
Cool, calm, functional.
```css
--font-display: "Barlow Condensed", "Arial Narrow", sans-serif;
--display-transform: uppercase;
--bg: #0f1512;  --bg-alt: #161e1a;  --card: #1a231e;
--ink: #eaf1ec;  --muted: #93a39a;
--accent: #4fb286;  --accent-ink: #0f1512;  --line: #26332c;
--radius: 6px;
```

## Rules that keep it from breaking

**Contrast is not optional.** `--ink` on `--bg` needs a ratio of at least 4.5:1,
and `--accent-ink` on `--accent` the same. A gorgeous palette nobody can read
costs real sales, and it locks out anyone with low vision. If you invent a
palette, check it — WebAIM's contrast checker takes ten seconds.

**`--accent-ink` has to actually sit on `--accent`.** This is the one people get
wrong. A light accent like `#e8ff45` needs dark `--accent-ink`; a deep accent
like `#1f1d17` needs light. Check the primary button and the cart badge after
any accent change.

**Don't let the accent become the background.** It's for buttons, prices, the
active filter, and the cart badge. Once it's everywhere it stops signaling
anything, and "add to cart" no longer stands out.

**Placeholder tints should sit in the brand's family.** The `tint` values in
`data.js` are what the store looks like before real photos exist, so pick
shades adjacent to the palette rather than random colors — otherwise the grid
looks like a bug.

## Going further than tokens

When a brand needs more than a recolor, these are the highest-leverage moves
and none of them fight the template:

- **Hero treatment.** Replace `.hero__bg`'s gradients with a full-bleed photo
  (`background: url(...) center/cover`) plus a dark overlay for text contrast.
  This alone transforms the page.
- **Grid density.** `minmax(250px, 1fr)` is neutral. Go to `minmax(320px, 1fr)`
  for a slower, more premium browse; `minmax(190px, 1fr)` for a dense
  drop-list feel.
- **Card aspect ratio.** `4/5` suits apparel on a body. Use `1/1` for flat-lays
  and accessories, `3/4` for full-length shots.
- **Section rhythm.** Reorder sections in `index.html` freely. A brand whose
  story is the hook should put About above Shop; a drop should lead with the
  grid.
