# @averoui/charts

## 1.0.1

### Patch Changes

- 049bbd1: Publish the type declarations through a top-level `types` field as well as the `exports` map. TypeScript only reads `exports` under `moduleResolution: "bundler"`, `"node16"` or `"nodenext"`; a project still on the legacy `"node"` setting — which is also what an editor assumes for a file with no tsconfig — ignored it, found no `main` or `types` to fall back to, and typed every import as `any`, so no props were suggested and no mistake was reported. Those projects now get the component prop types.

  `moduleResolution: "bundler"` is still the setting to be on: under the legacy one, prop types that come from `class-variance-authority` (`variant`, `tone`, `size`, `radius`) stay `any`, because that package reaches its own types only through its `exports` map.

- Updated dependencies [049bbd1]
  - @averoui/react@1.0.1
  - @averoui/tokens@1.0.1

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

- Updated dependencies [b921f6e]
- Updated dependencies
- Updated dependencies [9e2430a]
- Updated dependencies [53edd1a]
- Updated dependencies [b482fd4]
- Updated dependencies [2ae572f]
- Updated dependencies [76dcb4c]
- Updated dependencies [82ad692]
- Updated dependencies [f7544ee]
- Updated dependencies [fd6969c]
- Updated dependencies [07ca132]
- Updated dependencies [17d55b8]
- Updated dependencies [26fa419]
- Updated dependencies [30c298d]
- Updated dependencies [fd50244]
- Updated dependencies [dcf0cb9]
- Updated dependencies [331ecb5]
- Updated dependencies [39c4ce7]
- Updated dependencies [761b74a]
- Updated dependencies [195eb7b]
- Updated dependencies [359a424]
- Updated dependencies [1b6724d]
- Updated dependencies [eccfcdf]
- Updated dependencies [f0b1606]
- Updated dependencies [ebdc948]
- Updated dependencies [2bcd63b]
- Updated dependencies [fb4cf08]
- Updated dependencies [9ab5791]
  - @averoui/react@1.0.0
  - @averoui/tokens@1.0.0
