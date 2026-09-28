# Photos

The site ships with drawings in every photo slot so it never looks broken.
Real photos will beat them. Drop files in this folder, then write the path
into `photos` in `../data.js`:

```js
photos: {
  hero: "images/hero.jpg",
  chilaquiles: "images/chilaquiles.jpg",
  ...
}
```

## Shot list (seven photos, one morning)

| Slot | What to shoot | Crop |
|------|---------------|------|
| `hero` | The counter or the patio with people in it, morning light, coffee on the table | 3:2, about 1800 × 1200 |
| `chilaquiles` | Plated, from a 45° angle, with the egg and avocado visible | 4:3, about 1200 × 900 |
| `arrachera` | Same angle, steak in focus, potatoes and toast in frame | 4:3 |
| `frenchToast` | The stack, powdered sugar and berries, pour the syrup mid-shot if you can | 4:3 |
| `cafeDeOlla` | The mug, steam if the light catches it, cinnamon stick in frame | 4:3 |
| `patio` | The San Benito Street patio, a dog under a table doesn't hurt | 16:9, about 1600 × 900 |
| `team` | David, Ricardo and Trino together, in the kitchen or out front | 4:3 |

Shoot near the front window in the morning, phone camera is fine, no flash.
Keep each file under about 300KB (Squoosh.app or TinyPNG will shrink them
with no visible loss); a fast page sells more breakfast than a slow one.

## Already here

- `icon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` — the sun-and-cup mark, used for the browser tab and home-screen icon.
- `og-image.jpg` — the 1200 × 630 picture that shows when the link is shared in a text, a DM or a post.
