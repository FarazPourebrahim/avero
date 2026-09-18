# @averoui/font

The **Lahzeh** typeface packaged for [Avero](https://github.com/FarazPourebrahim/avero): nine
weights as `@font-face` declarations plus the font files. Optional — Avero's `--font-sans` token
falls back to a system stack without it.

## Install

```bash
pnpm add @averoui/font
```

```css
@import "tailwindcss";
@import "@averoui/tokens/theme.css";
@import "@averoui/font/lahzeh.css";
```

One import declares all nine weights (100 Thin to 900 Black). `font-display: swap` keeps text
visible while they load, and `woff2` is listed first so modern browsers never fetch the larger
`woff`.

**500 Medium is Avero's default UI weight**: Persian text at 400 reads lighter than Latin text at
the same weight, so the body default is one step up.

## Using a different face

Skip this package and override the token instead:

```css
@theme {
  --font-sans: "Vazirmatn", system-ui, sans-serif;
}
```

## Licence

The packaging is MIT. **The Lahzeh font files carry their own licence**, which permits
redistribution; the terms are recorded in `files/README.md` and travel with the files.
