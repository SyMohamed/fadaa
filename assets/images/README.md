# FADAA images

Drop your real product & lifestyle photos here, then wire them up.
Until you do, the site shows nice textured placeholders automatically.

## Status

| Section            | File name                  | Suggested ratio | Status                                   |
|--------------------|----------------------------|-----------------|------------------------------------------|
| Hero               | `hero.jpg` / `.webp`       | 4:5 (portrait)  | ✅ live (coral 3-bag shot, optimized)     |
| Story / studio     | `studio.jpg` / `.webp`     | 3:4             | ⚠️ temporary crop of the hero (grey bag detail) — replace with a real studio/artisan photo when ready |
| For everyone (him) | `him.jpg`                  | 3:4             | ⬜ placeholder — add photo                 |
| For everyone (all) | `unisex.jpg`               | 3:4             | ⬜ placeholder — add photo                 |
| For everyone (her) | `her.jpg`                  | 3:4             | ⬜ placeholder — add photo                 |
| Lookbook           | `look-1.jpg` … `look-5.jpg`| mixed           | ⬜ placeholder — add photos                |

## Image optimization (important)

Camera originals are huge (the hero came in at ~13 MB). The web versions here
are resized + compressed to a few hundred KB and saved as both `.jpg` and
`.webp`. Please optimize before committing new photos. Quick recipe with
Pillow:

```python
from PIL import Image, ImageOps
im = ImageOps.exif_transpose(Image.open("ORIGINAL.jpg")).convert("RGB")
im.thumbnail((1400, 1400), Image.LANCZOS)
im.save("name.jpg", quality=82, optimize=True, progressive=True)
im.save("name.webp", quality=80, method=6)
```

Then add a `<source type="image/webp">` next to the `<img>` in `index.html`.

## Original files

Do **not** commit multi-MB camera originals to the repo — keep them in your own
storage. Only the optimized web versions belong here.

## Wiring up the hero / story / lookbook photos

These use placeholder boxes in `index.html`. To use a real photo, replace the
matching `<div class="ph ...">…</div>` with, e.g.:

```html
<img src="assets/images/hero.jpg" alt="FADAA hero bag" class="ph ph--hero" />
```

## Product photos

Edit `js/products.js` and set the `image` field for any product, e.g.:

```js
{ name: "Sahara Tote", ..., image: "assets/images/sahara-tote.jpg" }
```

When `image` is set, it replaces the placeholder automatically — no other
changes needed.
