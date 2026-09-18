# Contributing to Avero

Avero is a bidirectional React component library. Everything in it is built from the design tokens
in `@averoui/tokens` and works in Persian (RTL) and English (LTR) from the same code. These rules
exist to keep that true as the library grows.

Read [`docs/avero-conventions.md`](docs/avero-conventions.md) before your first change. It is the
detailed reference; this file is the workflow.

## Getting set up

```bash
pnpm install
pnpm packages-build     # the docs app consumes the built packages
```

| Command              | What it does                                                                   |
| -------------------- | ------------------------------------------------------------------------------ |
| `pnpm storybook-dev` | Component workbench. Resolves packages to source, so no watch build is needed. |
| `pnpm docs-dev`      | Documentation site. Run `pnpm packages-build` first.                           |
| `pnpm lint`          | ESLint, including Avero's own rules. Zero warnings allowed.                    |
| `pnpm typecheck`     | `tsc` in every project.                                                        |
| `pnpm test`          | Vitest unit, SSR and axe tests.                                                |
| `pnpm format-check`  | Prettier.                                                                      |
| `pnpm size`          | Per-component size budgets.                                                    |

**Use pnpm only.** npm or yarn create a second lockfile and break the workspace links.

## Before you build a component

A component is only built once it has a row in the inventory in [`Avero-plan.md`](Avero-plan.md)
(§5), with its purpose and variants. Add the row first. The plan is the scope: it is how the
library stays a coherent set rather than a pile of components.

Design the component from the existing tokens. If you find yourself needing a value that no token
provides, that is a signal to discuss the token, not to write a raw value.

## The rules that are enforced

Three lint rules block a merge, and they are the ones most easily broken by habit:

- **`avero/no-raw-color`** — no hex, `rgb()`, `hsl()` or `oklch()` in component source. Use an Avero
  token or a Tailwind palette class.
- **`avero/no-physical-direction`** — no `pl-`, `pr-`, `ml-`, `mr-`, `left-`, `right-`, `border-l`,
  `border-r`, `rounded-l*`, `rounded-r*`, `text-left` or `text-right`. Use the logical equivalents:
  `ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`, `border-s`, `border-e`, `rounded-s*`, `rounded-e*`,
  `text-start`, `text-end`.
- **`no-console`** — nothing logs.

Transforms (`translate-x-*`) are physical by nature. Pair them with `rtl:` and `ltr:` variants
wherever direction matters.

Design in Persian first: in an RTL layout, "right" is the inline **start**. Then check it in English.

## Component checklist

A component is done when all of this holds — the same list the plan calls the Global Definition of
Done:

- [ ] One folder: `src/components/<name>/` with `<Name>.tsx`, `<name>.variants.ts` (if it has
      variants), `<name>.test.tsx`, `<Name>.stories.tsx` and `index.ts`.
- [ ] Fully typed props, no `any` without a `// BOUNDARY:` comment explaining it.
- [ ] Accepts `className` (merged with `cn()`), spreads the rest onto its root, forwards its ref,
      sets `displayName`, and marks its root `data-slot="<name>"`.
- [ ] Props the component adds are a separate exported `<Name>OwnProps` type, and **every one has a
      TSDoc description** — the docs props table is generated from it, and CI fails on an
      undocumented prop.
- [ ] Variants use `class-variance-authority`, and the variant function is exported.
- [ ] Stateful components work controlled and uncontrolled (`value` / `defaultValue` /
      `onValueChange`), via `useControllableState`.
- [ ] No user-facing string literals. Defaults come from the `fa` and `en` dictionaries and can be
      overridden with props.
- [ ] `"use client"` only where it is genuinely needed.
- [ ] Tests cover render, every variant, interaction, keyboard and the edge cases (empty, long text,
      disabled, loading), and include an axe check and a `renderToString` SSR smoke test.
- [ ] A docs page with all twelve template sections — `pnpm --filter @averoui/docs run check-sections`
      is the gate.
- [ ] A changeset.

## Documentation

Docs live in `apps/docs/content/docs`. Live examples are real `.tsx` files under `apps/docs/demos/`,
registered in `demos/registry.ts` and rendered with `<ComponentPreview name="…" />`, which reads the
demo file for the Code tab — so a snippet can never drift from what it renders.

Three checks run in CI and are worth running locally before pushing:

```bash
pnpm --filter @averoui/docs run check-sections   # the twelve-section page template
pnpm --filter @averoui/docs run check-props      # every documented prop has a description
pnpm --filter @averoui/docs run check-links      # every internal link and anchor resolves
```

Props tables are generated from TypeScript source. Never write one by hand.

## Commits and branches

- Work on `dev`, or on a branch cut from `dev`. `main` only moves by merging `dev`.
- Commit format: `type(Scope): Title-Style Description`, e.g. `feat(Button): Add Loading State`.
  The type matches the change, not the file — a typo fix in a feature file is `fix`.
- Commit in reviewable chunks rather than one commit per feature.
- Commits use your own git identity and carry no AI attribution.

## Changesets

Any PR touching a published package adds one:

```bash
pnpm changeset
```

The summary goes into the changelog verbatim, so write it for a consumer. What counts as major,
minor or patch is documented on the [Changelog page](apps/docs/content/docs/getting-started/changelog.mdx).

Remember that Avero's output is CSS classes as much as it is markup: a change that makes a
documented override stop applying is breaking even if the props are untouched.

## Known debts

If you have to leave something unfinished, add it to [`docs/known-debts.md`](docs/known-debts.md)
with its impact and a resolution plan, in the same change. Remove the entry in the change that
resolves it.
