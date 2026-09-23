# @averoui/tokens

## 2.1.0

### Minor Changes

- 5d92a48: Adds `CheckboxCard`, a checkbox presented as a bordered option with a `title`, an optional `description` and an optional `aside` such as a price. The whole card toggles the checkbox, and it takes a soft blue border and tint while checked. It accepts every `Checkbox` prop and forwards its ref to the checkbox, so it works in forms, with `Controller` and inside `FieldControl` like `Checkbox` does; the title is the checkbox's accessible name and the description its accessible description.

  `Checkbox` is restyled onto the library's soft palette. The box is now 24px (was 20px) with a 2px `gray-300` outline that darkens to `gray-400` on hover, and a checked or mixed box is a `blue-50` tint with a `blue-200` outline and a `blue-600` tick instead of a solid primary fill. Checking pops the box and draws the tick in, pressing shrinks it slightly, and the focus ring turns red while `aria-invalid`. `base.css` settles the animations at once under reduced motion. The larger box can shift layouts that aligned text to the old 20px size. The unchecked outline is below the 3:1 contrast WCAG asks of control boundaries; where that matters, `className="border-gray-500/80"` restores it. Props and markup are unchanged.

  `@averoui/tokens` adds the two animations behind it: `--animate-check-pop` and `--animate-check-draw`.

- 536ca2b: `Spinner` gains four variants next to `ring` and `glow`: `track`, an arc turning on a faint full circle; `dots`, three pulsing dots; `bars`, four bars rising and falling; and `spokes`, eight spokes fading in turn. All six follow the same sizes and tones, draw with the current colour (except `glow`), and stay decorative unless `labelled`. `ring` is still the default, so existing spinners and `Button`'s loading state render exactly as before. The root now also carries `data-variant`, and the parts of the new variants carry `data-slot="spinner-part"`.

  `@averoui/tokens` adds the animations behind them: `--animate-spinner-dot`, `--animate-spinner-bar` and `--animate-spinner-spoke`.

## 1.0.1

### Patch Changes

- 049bbd1: Publish the type declarations through a top-level `types` field as well as the `exports` map. TypeScript only reads `exports` under `moduleResolution: "bundler"`, `"node16"` or `"nodenext"`; a project still on the legacy `"node"` setting — which is also what an editor assumes for a file with no tsconfig — ignored it, found no `main` or `types` to fall back to, and typed every import as `any`, so no props were suggested and no mistake was reported. Those projects now get the component prop types.

  `moduleResolution: "bundler"` is still the setting to be on: under the legacy one, prop types that come from `class-variance-authority` (`variant`, `tone`, `size`, `radius`) stay `any`, because that package reaches its own types only through its `exports` map.

## 1.0.0

### Major Changes

- Avero 1.0.0 — the first public release.

  A bidirectional React component library for products that speak Persian (RTL) and English (LTR),
  built on Radix UI primitives and styled with Tailwind CSS v4 design tokens. Persian is the default:
  right-to-left layout, Persian digits and Jalali dates through `Intl` alone, with no date library in
  the core. English works from the same code, because every component uses logical CSS properties and
  direction-aware keyboard handling.

  The release covers the primitives, the form controls, navigation and disclosure, overlays and
  feedback, the data-display family, 25 composed blocks and the site, dashboard, article, listing,
  detail and profile layout shells, plus optional Recharts and Tiptap packages.

  Behaviour comes from Radix, so focus management, keyboard support and ARIA semantics are not
  reimplemented; every component test runs axe and a browser suite runs axe over every story in both
  directions. Colours, radii, shadows, motion and type come from `@averoui/tokens`, so a theme is a set
  of CSS custom properties rather than a fork.

### Patch Changes

- eccfcdf: `base.css`: pages no longer shift sideways while a dialog, drawer or other overlay locks scrolling, in either direction. While scrolling is locked, the viewport keeps the space of the hidden scrollbar on whichever side the browser draws it, instead of the library's right-hand margin, which moved right-to-left pages in browsers that put their scrollbar on the left.
