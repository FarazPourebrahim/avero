# Known Debts

Every known gap, shortcut or mismatch lives here until it is resolved. Each entry states its impact and the plan to resolve it.
Remove an entry in the same change that resolves it.

| Area | Debt | Impact | Resolution plan |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| Toolchain | Local Node is 22.16; jsdom 30 and size-limit 13 need Node ≥ 22.18/22.22, so they are pinned one major back. | None functionally; slightly older test tooling. | Upgrade local Node to the latest 22.x or 24 LTS, then bump jsdom and size-limit. |
| Toolchain | TypeScript is pinned to 6.0.x because typescript-eslint doesn't support TypeScript 7 yet. | We can't use the native TypeScript 7 compiler. | Bump when typescript-eslint's peer range includes 7.x. |
| Overlays | `Dialog` and `ConfirmDialog` return focus only to their own Radix trigger. Opened in controlled mode without one, such as a `ConfirmDialog` started from a `DropdownMenuItem`, focus falls to the page body on close. `Lightbox` already remembers and restores the element that had focus. | Keyboard and screen reader users lose their place after confirming or cancelling a dialog started from a menu. | Apply the `Lightbox` focus-return handling to `DialogContent` and `ConfirmDialog`, with a controlled-mode test for each. |
| Contrast | 27 of 63 text/background pairings in the default palette are below WCAG AA (`packages/tokens/reports/contrast-report.md`). Reviewed under O-04 on 2026-09-10 and kept; see [Contrast review](#contrast-review-o-04) below for the override per pairing. The browser axe suite reports them as warnings instead of failing (D-19) and Lighthouse skips `color-contrast` for the same reason (D-28). | Small muted, chrome and soft-tone text is hard to read for low-vision users. 13 pairings can be fixed by a consumer overriding a token; the other 14 are Tailwind palette classes inside components and need a code change. | Keep O-04 for 1.0 and ship the override guide below. Revisit for 2.0: move the 14 hardcoded pairings onto semantic tokens so every failing pairing becomes themeable, then make `color-contrast` blocking in both the axe suite and Lighthouse. |
| Packaging | `@averoui/react` ships no precompiled stylesheet. Plan §6.3 promises `@averoui/react/styles.css` (with a no-preflight option) for consumers who are not on Tailwind v4, but no build step produces it and no export references it. | Avero can only be consumed by Tailwind v4 projects. The Installation page documents the Tailwind path only and says so. | Add a Tailwind CLI step to `@averoui/react`'s build that compiles the classes used by `dist` into `styles.css` plus a no-preflight variant, add the exports and a size budget, then document the second path. Decided 2026-09-10 to keep this out of Phase 11. |
| Testing | The browser matrix runs one version per engine. Playwright ships a single build of Chromium, Firefox and WebKit, so "the latest two versions of each" cannot be expressed, and WebKit is not Safari proper. | A regression specific to a Safari point release, or to the previous major of a browser, would be missed. | Accept for 1.0. If it matters later, add a hosted device-lab run (BrowserStack or similar) to the nightly `Browser matrix` workflow. |

## Contrast review (O-04)

Decision O-04 keeps Avero's default palette as designed and exposes the tokens so a consumer who
needs strict AA can darken them. This is the review Phase 12 asks for: every failing pairing, what
causes it, and what to do about it.

**The catch worth knowing before you rely on O-04:** only 13 of the 27 failing pairings come from an
Avero token. The other 14 are Tailwind palette classes written directly into components, so a theme
cannot reach them — fixing those needs a change to Avero itself, not a `@theme` block.

### Overridable by a token (13)

Redefine these after importing `@averoui/tokens/theme.css` and every listed pairing moves with them.

Every override below was measured against the same sRGB conversion the contrast report uses; the
last column is the ratio it produces at the worst of that token's pairings.

| Token                   | Failing pairings                                                                                  | Worst ratio | Suggested override       | Becomes   |
| ----------------------- | ------------------------------------------------------------------------------------------------- | ----------- | ------------------------ | --------- |
| `--color-text-muted`    | Muted meta on white, on the page background, on `surface-glass`, on `gray-50`, on `surface-muted` | 2.37        | `var(--color-gray-600)`  | 6.87–7.56 |
| `--color-text-chrome`   | Footer link chips, footer accordions, inline price tag, glass listing card price                  | 2.95        | `var(--color-slate-600)` | 6.90–7.58 |
| `--color-icon-muted`    | Footer social icons, resting (non-text, needs 3:1)                                                | 1.69        | `var(--color-gray-500)`  | 4.63      |
| `--color-accent-social` | Footer social icons, hover (non-text, needs 3:1)                                                  | 2.09        | `#b36400`                | 4.24      |
| `--color-secondary`     | Secondary (orange) button, white on the fill                                                      | 3.39        | `#c2410c`                | 5.18      |
| `--color-warning`       | Warning button, white on the fill                                                                 | 2.15        | `#b45309`                | 5.02      |

```css
/* Strict-AA theme: drop this after the Avero imports. */
@theme {
  --color-text-muted: var(--color-gray-600);
  --color-text-chrome: var(--color-slate-600);
  --color-icon-muted: var(--color-gray-500);
  --color-accent-social: #b36400;
  --color-secondary: #c2410c;
  --color-warning: #b45309;
}
```

Overriding `--color-secondary` and `--color-warning` changes the brand, so treat those two as a
deliberate trade rather than a fix to apply by default.

### Needs a change to Avero (14)

These are palette classes in component source. A consumer cannot theme them; they are listed so the
gap is not mistaken for something a `@theme` block covers.

| Where | Pairing | Ratio | Fix when O-04 is revisited |
| ----------------------------------------------------- | ---------------------------------------------- | --------- | -------------------------------------------------------------------------------- | --- |
| Soft buttons: Telegram, WhatsApp, report, like, amber | `{tone}-600` on `{tone}-50` | 3.08–4.46 | Move soft-button text to the `-700` shade (4.87–5.96) |
| Profile meta, mini report action, mini stat labels | `slate-400` on white / background / `slate-50` | 2.39–2.63 | Use `slate-600` (6.90–7.58) |
| Liked reaction pill, sidebar danger item | `red-500` on `red-50` / background | 3.46–3.48 | Use `red-700` (5.93–5.96) |
| Solid danger badge | white on `red-500` | 3.81 | Use `red-600` as the fill (4.87) |
| Empty state secondary text | `gray-300` on white | 1.47 | Use `gray-500` (4.84); this is the worst pairing in the library |
| Meta text on the page background | `gray-500` on `background` | 4.40 | Use `gray-600` (6.87) — it already passes on white, so only the tinted background fails |

`Alert`'s tinted variants and `SegmentedControl`'s idle segments were already moved onto darker
shades for exactly this reason, so the pattern is established.
