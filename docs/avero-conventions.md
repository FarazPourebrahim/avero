# Avero Conventions

Project rules for everyone working in this repository (humans and AI agents).
Read this file, `docs/known-debts.md`, `docs/SECURITY.md` and `Avero-plan.md` before starting work.
Where this file and `.claude/CLAUDE.md` differ, this file wins for Avero-specific topics.

## Source of truth

- `Avero-plan.md` is the scope, the phase DoDs and the progress tracker. Update its tracker in the same change that completes an item.
- A component is only built once it has a row in the plan's component inventory. Add the row first, with its purpose and API sketch.
- New components are designed from the token system in `@avero/tokens`, so they match the existing surfaces, radii, shadows and type scale.

## Workspace

| Path              | Package         | Purpose                                                              |
| ----------------- | --------------- | -------------------------------------------------------------------- |
| `packages/config` | `@avero/config` | Shared tsconfig bases, ESLint config and the `avero` ESLint plugin   |
| `packages/tokens` | `@avero/tokens` | Tailwind v4 `@theme` tokens, base styles, token data                 |
| `packages/react`  | `@avero/react`  | Core components, blocks, hooks, utilities                            |
| `packages/font`   | `@avero/font`   | Lahzeh `@font-face` + font files (the licence allows redistribution) |
| `packages/charts` | `@avero/charts` | Recharts wrappers (optional)                                         |
| `packages/editor` | `@avero/editor` | Tiptap editor (optional)                                             |
| `apps/storybook`  | private         | Internal stories, a11y and visual tests                              |
| `apps/docs`       | private         | Public documentation (Next.js + Fumadocs)                            |

- Package manager: **pnpm only**. Never run npm or yarn installs.
- Root scripts delegate into apps (`pnpm docs-dev`, `pnpm storybook-dev`). There is no bare `dev` script.
- Apps resolve workspace packages to their TypeScript source through the `@avero/source` export condition, so no watch build is needed in Storybook. The docs app (Next.js) consumes the built `dist`, so run `pnpm packages-build` before `pnpm docs-dev`.

## Toolchain versions

| Tool                      | Version                   | Why                                                                                                                       |
| ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Node.js                   | ≥ 22.12 (CI: latest 22.x) | Floor set by Vitest 5. Some newer majors (jsdom 30, size-limit 13) need ≥ 22.18/22.22, so they are pinned one major back. |
| pnpm                      | 9.15.9                    | `packageManager` field                                                                                                    |
| TypeScript                | ~6.0.3                    | typescript-eslint supports `<6.1.0`; TypeScript 7 (native) is not yet supported by the lint toolchain                     |
| Tailwind CSS              | ^4.3.3                    | The `@theme` token system needs Tailwind v4                                                                               |
| React                     | peer `>=18.2.0`; dev 19.x | React 18 stays supported for consumers that have not moved to 19                                                          |
| Vite / Vitest / Storybook | 8.x / 5.x / 10.x          | Current stable                                                                                                            |
| Next.js / Fumadocs        | 16.3.4 / 16.15.9          | Fumadocs requires Next 16 and React ≥ 19.2 (docs app only)                                                                |
| jsdom                     | ^28.1                     | Supports Node 22.12                                                                                                       |
| size-limit                | ^12.1                     | Supports Node 22.12                                                                                                       |

## Library build

`@avero/react` is compiled with the TypeScript compiler (`tsc -p tsconfig.build.json`) into per-file ES modules plus `.d.ts` files. No bundler is involved, so:

- module-level directives such as `"use client"` are preserved exactly (verified by `scripts/verify-build.mjs` after every build);
- consumers' bundlers tree-shake at file granularity;
- relative imports in library source **must** use the `.js` extension (`import { cn } from "../utils/cn.js"`), because the library compiles with `module: NodeNext`. The `@/` alias is for apps only; packages use relative imports.

## Components

- One folder per component: `src/components/<name>/` with `<Name>.tsx`, `<name>.variants.ts` (when variants exist), `<name>.test.tsx`, `<Name>.stories.tsx` and `index.ts`.
- Named function declarations, `type` over `interface`, no default exports, and no `any` without a `// BOUNDARY:` comment.
- Every component accepts `className` (merged with `cn()`), spreads remaining native props onto its root, forwards its ref (`forwardRef`, because React 18 is supported), sets `displayName`, and marks its root with `data-slot="<name>"`.
- Styling states are exposed as `data-*` attributes (`data-state`, `data-disabled`, `data-active`), not ad-hoc class toggles in consumers.
- Variants use `class-variance-authority`. Export the variant function (e.g. `buttonVariants`).
- Interactive behaviour comes from Radix primitives. Add `"use client"` only to modules that need it.
- Stateful components support controlled and uncontrolled use (`value` / `defaultValue` / `onValueChange`).
- No user-facing string literals inside components. Default strings come from the `AveroProvider` dictionaries (`fa`, `en`) and can be overridden with props.

## Styling rules (enforced by lint)

- **Tokens only.** No raw hex, `rgb()`, `hsl()`, `oklch()` etc. in UI source (`avero/no-raw-color`). Use Avero tokens or the Tailwind palette.
- **Logical direction only.** No `pl-`/`pr-`/`ml-`/`mr-`/`left-`/`right-`/`border-l`/`border-r`/`rounded-l*`/`rounded-r*`/`rounded-tl|tr|bl|br`/`text-left|right`/`float-left|right` (`avero/no-physical-direction`). Use `ps-`/`pe-`/`ms-`/`me-`/`start-`/`end-`/`border-s`/`border-e`/`rounded-s*`/`rounded-e*`/`rounded-ss|se|es|ee`/`text-start|end`.
- Transforms are physical (`translate-x-*`); pair them with `rtl:`/`ltr:` variants when direction matters (drawers, carousels, arrows).
- Design in Persian first: in an RTL layout "right" is inline-**start** and "left" is inline-**end**. Then check every component in English LTR.

## Testing

- Unit and interaction tests: Vitest + Testing Library in jsdom, co-located as `<name>.test.tsx`, written as Arrange / Act / Assert.
- Every component test includes an axe check (`expectNoAxeViolations` from `src/test/axe.ts`) and a `renderToString` SSR smoke test.
- Coverage thresholds per package: statements ≥ 90%, branches ≥ 85%.
- Visual and browser tests: Playwright against the static Storybook build (`apps/storybook/tests`).
- Never commit `.only` or `.skip` (lint rule).

## Versioning and releases

- Semantic versioning per package via Changesets. Any PR that changes a published package adds a changeset.
- **Breaking** (major): removing or renaming a component, prop, variant, token or CSS variable; changing a default that alters rendered output; raising a peer dependency floor.
- **Minor**: new components, props, variants or tokens.
- **Patch**: bug fixes and visual corrections.
- Packages are private until 1.0. The `avero` npm org must be reserved before the first publish.

## Git

- Work on `dev` (or branches cut from `dev`); `main` only moves by merging `dev`.
- Commit format: `type(Scope): Title-Style Description` (e.g. `feat(Button): Add Loading State`).
- Commits are authored with the machine's git identity and carry no AI attribution.
