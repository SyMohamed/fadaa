# FADAA — Handcrafted Crochet Bags

A creative, dynamic showcase website for **FADAA**, a crochet bag brand.
Bags for everyone — totes, hangbags, crossbody, clutches and accessories,
crafted stitch by stitch.

> FADAA · <span dir="rtl">فضاء</span> · meaning *space*.

## ✨ Features

- **Animated preloader** with a stitching "yarn" loader
- **Custom cursor**, magnetic buttons and 3D tilt cards (auto-disabled on touch / reduced-motion)
- **Scroll-reveal** animations, scroll progress bar and active-section nav
- **Filterable collections** grid (Totes / Hangbags / Crossbody / Clutches / Accessories)
- **"Worn by everyone"** unisex section with rotating word animation
- **Craft / process**, **lookbook**, testimonial and newsletter sections
- Fully **responsive** with an animated mobile menu
- **No build step, no dependencies** — just open `index.html`

## 🗂 Structure

```
.
├── index.html          # markup
├── css/styles.css      # all styling + animations
├── js/
│   ├── products.js     # product catalogue (edit me)
│   └── main.js         # interactions
└── assets/
    ├── logo.svg
    ├── favicon.svg
    └── images/         # drop your photos here (see images/README.md)
```

## 🚀 Run it

It's a static site — no install needed.

```bash
# option 1: just open the file
open index.html

# option 2: serve locally (nicer for relative paths)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🖼 Adding your photos

The site ships with textured placeholders so it looks complete out of the box.
See [`assets/images/README.md`](assets/images/README.md) for exactly which
files to add and how to wire them up. To edit products (names, prices, types,
photos), edit [`js/products.js`](js/products.js).

## 🎨 Customising the look

Brand colours and fonts live as CSS variables at the top of
[`css/styles.css`](css/styles.css) (`:root`). Adjust `--clay`, `--espresso`,
`--cream`, etc. to retheme the whole site.
