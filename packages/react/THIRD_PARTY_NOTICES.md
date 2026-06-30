# Third-party notices

`@avero/react` redistributes the following third-party assets.

## Font Awesome Free 5 icons

The icons in `src/icons/referenceIcons.generated.tsx` whose source says "Font Awesome Free 5" reproduce Font Awesome Free glyphs, as used by the reference design.

- Copyright: Fonticons, Inc. (https://fontawesome.com)
- Licence: Creative Commons Attribution 4.0 International (CC BY 4.0), https://creativecommons.org/licenses/by/4.0/
- Changes: path data wrapped in React components; no changes to the glyph shapes.

## Heroicons v1

`ChartBarOutlineIcon` reproduces the Heroicons v1 "chart-bar" outline icon.

- Copyright: Tailwind Labs, Inc. (https://heroicons.com)
- Licence: MIT

## Lucide

`src/icons/internalIcons.tsx` vendors a few Lucide glyphs (arrow and chevron icons, the close icon) that Avero components render internally, so `lucide-react` stays an optional peer dependency.

- Copyright: Lucide Contributors (https://lucide.dev)
- Licence: ISC

## Pending verification

- `InstagramIcon`: the glyph comes from the reference site's icon library, and its source icon set has not been identified yet. Its licence must be verified before release (tracked in `docs/known-debts.md`, KD-05).
