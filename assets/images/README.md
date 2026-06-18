# FADAA images

Drop your real product & lifestyle photos here, then wire them up.
Until you do, the site shows nice textured placeholders automatically.

## Recommended files (used by the homepage)

| Section            | File name                  | Suggested ratio | Notes                          |
|--------------------|----------------------------|-----------------|--------------------------------|
| Hero               | `hero.jpg`                 | 4:5 (portrait)  | The big bag shot on the right  |
| Story / studio     | `studio.jpg`               | 3:4             | Artisan / behind the scenes    |
| For everyone (him) | `him.jpg`                  | 3:4             | Bag styled on a man            |
| For everyone (all) | `unisex.jpg`               | 3:4             | Unisex styling                 |
| For everyone (her) | `her.jpg`                  | 3:4             | Bag styled on a woman          |
| Lookbook           | `look-1.jpg` … `look-5.jpg`| mixed           | Lifestyle / editorial shots    |

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
