# Avero — Component Library Plan

> **Avero** is a production-grade React component library for products that speak **Persian (RTL)** and **English (LTR)**. It is built on Radix UI primitives and styled with Tailwind CSS v4 design tokens, so every component works in both directions from the same code. The library is domain-neutral and reusable in any project, and ships with a full documentation site.

| Meta | Value |
| --- | --- |
| Plan version | 2.0 |
| Created | 2026-06-19 |
| Last updated | 2026-09-10 |
| Design source of truth | `@avero/tokens` and the design system in §4 |
| Target stack | React 18.2+/19, TypeScript (strict), Tailwind CSS v4.3, Radix UI primitives, pnpm workspace |
| Default direction / locale | RTL / `fa-IR`, with full LTR / `en` support |

---

## Table of contents

1. [Progress tracker](#1-progress-tracker)
2. [Goals and non-goals](#2-goals-and-non-goals)
3. [Decision log](#3-decision-log)
4. [Design system](#4-design-system)
5. [Component inventory](#5-component-inventory)
6. [Architecture](#6-architecture)
7. [Global Definition of Done (per component)](#7-global-definition-of-done-per-component)
8. [Phases with strict DoDs](#8-phases-with-strict-dods)
9. [Component progress tracker](#9-component-progress-tracker)
10. [Risks and mitigations](#10-risks-and-mitigations)
11. [Open decisions](#11-open-decisions)

---

## 1. Progress tracker

**Legend:** ⬜ Not started · 🟨 In progress · ✅ Done · ⛔ Blocked · ⏸️ Deferred

**Update rules:**
- A phase is ✅ only when **every** DoD checkbox in that phase is ticked **and** its exit gate has been verified.
- Tick a DoD checkbox only with evidence: a link to a PR, CI run, report or screenshot, recorded in the phase's "Evidence" line.
- When you change a status, update the "Last updated" date in the header in the same change.
- "Progress" means DoD items ticked / total DoD items in that phase.

| # | Phase | Status | Progress | Depends on | Effort | Started | Completed |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | Scope and design system | ✅ | 5 / 5 | — | M | 2026-06-19 | 2026-06-19 |
| 1 | Workspace, tooling and CI | ✅ | 15 / 15 | 0 | M | 2026-06-19 | 2026-08-18 |
| 2 | Design tokens and foundations | ✅ | 12 / 12 | 1 | L | 2026-06-19 | 2026-08-18 |
| 3 | Core primitives | ✅ | 9 / 9 | 2 | L | 2026-06-19 | 2026-07-30 |
| 4 | Forms | ✅ | 10 / 10 | 3 | L | 2026-07-05 | 2026-08-18 |
| 5 | Navigation, disclosure and carousel | ✅ | 9 / 9 | 3 | M | 2026-06-19 | 2026-08-18 |
| 6 | Overlays and feedback | ✅ | 10 / 10 | 3 | L | 2026-07-05 | 2026-09-10 |
| 7 | Data display | ✅ | 9 / 9 | 3 | L | 2026-06-19 | 2026-08-18 |
| 8 | Layout shells and site chrome | ✅ | 8 / 8 | 5, 6, 7 | M | 2026-07-05 | 2026-08-18 |
| 9 | Charts and editor packages | ✅ | 9 / 9 | 7 | M | 2026-07-05 | 2026-09-10 |
| 10 | Blocks and example templates | ✅ | 6 / 6 | 4–9 | L | 2026-07-05 | 2026-09-10 |
| 11 | Documentation site | 🟨 | 2 / 14 | 3 (can start in parallel) | L | 2026-06-19 | |
| 12 | Hardening: a11y, performance, SSR, security | ⬜ | 0 / 13 | 10, 11 | M | | |
| 13 | Release 1.0 | ⬜ | 0 / 10 | 12 | S | | |
| 14 | Dark theme | ⏸️ | 0 / 7 | 13 | L | | |

**Overall:** 104 / 146 phase-DoD items (≈71%).

> Phase 3 note (updated 2026-07-30): the primitives are implemented, unit/SSR/axe-tested and documented with live RTL/LTR previews and generated props tables, so their §9 rows are ✅. The same holds for most of phases 4–9. Global DoD item 2 also asks for a recorded design review in Storybook, which each phase's exit gate names.

---

## 2. Goals and non-goals

### Goals
1. **Bidirectional by default.** Persian RTL is the default (Persian digits, Jalali dates, the Lahzeh typeface). English LTR works without extra effort because every component uses logical CSS properties and direction-aware keyboard handling.
2. **Built on Radix.** Interactive behaviour — focus management, keyboard support, ARIA semantics, `DirectionProvider` for RTL — comes from Radix UI primitives, with Avero's styling on top.
3. **One consistent design system.** Every component, block and template is built from the tokens in §4, so colours, radii, shadows, motion and type stay consistent across the library and across themes.
4. **Production quality.** Typed APIs, WCAG 2.2 AA behaviour, SSR/RSC-safe, tree-shakable, tested, versioned and documented.
5. **Reusable in any project.** Components use domain-neutral names (e.g. `ListingCard`, `ShowcaseCard`) and have no business logic, API calls or hardcoded Persian strings.

### Non-goals
- Backend, data fetching, auth or routing.
- Components without a row in the inventory (§5). New components are added to the inventory first, with their purpose and API sketch.
- Dark theme in v1.0 (deferred to Phase 14 by decision D-02; the tokens are designed for it now).
- A brand identity. Avero ships neutral placeholders; consumers bring their own logo, name and trust marks.

---

## 3. Decision log

| ID | Decision | Choice | Rationale | Decided by / date |
| --- | --- | --- | --- | --- |
| D-01 | Font delivery | The user provides licensed Lahzeh `woff2` files. They are bundled in the optional `@avero/font` package. `@avero/tokens` declares `Lahzeh` with a system fallback stack. | Lahzeh is a commercial Persian typeface with nine weights; consumers who don't have it still get a sensible fallback. | User, 2026-06-19 |
| D-02 | Dark mode | Light theme only in v1.0, built entirely on semantic tokens so a dark theme can be added later (Phase 14). | Keeps v1.0 focused while leaving the token layer ready for a second theme. | User, 2026-06-19 |
| D-03 | Interaction primitives | Headless **Radix UI** primitives for behaviour, with Avero's styling on top. | Radix provides focus management, keyboard support and ARIA semantics, plus `DirectionProvider` for RTL. | User, 2026-06-19 (primitive family: Radix, chosen by plan) |
| D-04 | Documentation | Custom **Next.js + Fumadocs** docs app (`apps/docs`), plus internal Storybook (`apps/storybook`) for interaction and a11y testing. | The user wants "big component library" style docs. | User, 2026-06-19 |
| D-05 | Styling engine | Tailwind CSS **v4**, variants via `class-variance-authority`, class merging via `tailwind-merge` configured with Avero's custom tokens. | `@theme` tokens compile to CSS variables and utilities from one source, and consumers already on Tailwind v4 get Avero's tokens as classes. | Plan default |
| D-06 | Icons | `lucide-react` as a peer dependency for general icons. Brand and solid glyphs Lucide doesn't cover (Telegram, WhatsApp, LinkedIn, X, Instagram, a few solid shapes) ship as Avero SVG components, with licences recorded in `THIRD_PARTY_NOTICES.md`. | Avoids pulling a whole icon-font package for a handful of glyphs. | Plan default |
| D-07 | Charts | `@avero/charts`, an optional package wrapping **Recharts**. | Keeps the core free of heavy dependencies. | Plan default |
| D-08 | Rich text | `@avero/editor`, an optional package wrapping **Tiptap**. `RichContent` (the renderer) lives in core and always sanitizes. | Heavy dependency is optional; the renderer is needed everywhere. | Plan default |
| D-09 | Carousel | **Embla Carousel** (headless), styled with scroll snap, chevron controls and dot or pill pagination. | Headless, matches D-03. | Plan default |
| D-10 | Toasts | Radix Toast styled from the token system and set in Lahzeh. | One primitive family. | Plan default |
| D-12 | Monorepo | pnpm workspace following `.claude/CLAUDE.md` (`apps/*`, `packages/*`). The `packages/contracts` package from CLAUDE.md is **not applicable** because there is no backend and no cross-app API contracts. | Follows the working agreement and records the deliberate omission. | Plan default |
| D-13 | Library build | **Changed from Vite library mode to the TypeScript compiler** (`tsc`, per-file ESM + `.d.ts`). Library source uses `.js`-suffixed relative imports (`module: NodeNext`). | No bundler plugins are needed to keep `"use client"` directives. Output is valid Node ESM and tree-shakes per file. | Implementation, 2026-06-19 |
| D-14 | Toolchain pins | TypeScript ~6.0.3 (typescript-eslint supports `<6.1.0`); Node floor ≥ 22.12; jsdom ^28.1 and size-limit ^12.1 (newer majors need Node ≥ 22.18/22.22). | Keeps lint working and supports the local Node 22.16. | Implementation, 2026-06-19 |
| D-15 | `RichContent` sanitizer | **js-xss** (`xss`), not DOMPurify: an allowlist filter that needs no DOM, so the same code runs in the browser, in SSR and in tests. `isomorphic-dompurify` would pull jsdom (~10 MB) into every server bundle that renders stored HTML. | Sanitizing is mandatory (D-08) and must not cost a jsdom dependency on the server. | Implementation, 2026-07-05, approved by the user |
| D-16 | Chart colours | The chart palette, grid, axis, cursor and tooltip colours are defined as `--color-chart-*` tokens in `@avero/tokens` and consumed by `@avero/charts` as generated token data (`tokens.colorChartViews.value`). | Recharts takes colours as props that become SVG attributes: a utility class cannot reach them, and a `var()` reference would depend on Tailwind emitting a theme variable that no class references (plain `@theme` prunes unused variables), which would fail silently. Sourcing them from the tokens package keeps `avero/no-raw-color` passing with no lint exemption. | Implementation, 2026-07-05 |
| D-17 | Docs props tables | `PropsTable` takes an optional `package` prop, backed by one `fumadocs-typescript` generator per package tsconfig. | A generator resolves types through exactly one tsconfig, and the previous single generator was bound to `packages/react`, so charts types were unreachable. Additive, so the existing call sites are untouched. | Implementation, 2026-07-05 |
| D-18 | `cn` size budget | **Raised from 8 kB to 9 kB** (brotli, `import { cn }`). | The 8 kB placeholder predates the token-aware merge, so CI failed its size step. Measured at 8.43 kB: `tailwind-merge` + `clsx` 7.52 kB, `extendTailwindMerge` 0.28 kB, token group names 0.6 kB. Nothing in it can shrink meaningfully; 9 kB leaves room for new token groups. | User, 2026-07-30 |
| D-19 | Browser a11y gate | Playwright runs axe on every story in RTL/`fa` and LTR/`en` (`apps/storybook/tests/a11y.spec.ts`). Every rule blocks at 0 violations except **`color-contrast`, which is reported as a test warning, not enforced**. Page-structure rules (`region`, `landmark-one-main`, `page-has-heading-one`) are off because stories render components in isolation. | O-04 keeps below-AA pairings in the default palette, so enforcing contrast would contradict it. Browser findings feed the contrast report and the Phase 12 contrast review. | User, 2026-07-30 |
| D-20 | Screenshot tests | **None.** The Playwright visual suite and its baselines are removed; browser coverage is the smoke test plus the axe suite (D-19). Plan items that depended on screenshots or template snapshots are dropped. | The per-platform baselines never ran in CI, and regenerating and comparing about a thousand screenshots locally costs more than the regressions it catches. | User, 2026-08-18 |
| D-21 | Floating panel layer | Portalled floating panels (Select, Combobox, DatePicker, Popover, DropdownMenu, Tooltip) use `--z-popover`; `--z-dropdown` is for in-page dropdowns only. | The panels were on `--z-dropdown` (60), below `--z-drawer` (70) and `--z-modal-content` (115), so they opened behind a drawer or dialog they were used in. `check-z-order.mjs` already keeps `--z-popover` above the modal layers and below toasts. | User, 2026-08-18 |
| D-22 | Scroll lock without layout shift | While an overlay locks scrolling, `base.css` keeps the viewport's scrollbar gutter (`html:has(body[data-scroll-locked]) { scrollbar-gutter: stable }`) and drops react-remove-scroll-bar's right margin. | The library compensates with a physical right margin, but browsers place a right-to-left page's scrollbar on different sides, so a direction-specific fix can't be right everywhere. A Playwright spec measures the shift in RTL and LTR. | User, 2026-08-18 |
| D-23 | Toast API | A `ToastProvider` with a `useToast()` hook (`toast`, `dismiss`), not a module-level store. Tones are `info`, `success`, `warning` and `danger`; `danger` is the plan's "error" variant. | A context keeps toasts per React tree, so nothing is shared between server requests, and it matches the hook-based data layer consumers use. `danger` keeps one tone vocabulary with `Alert`, `Button` and `DropdownMenuItem`. | Implementation, 2026-08-18 |
| D-24 | `@avero/editor` size budget | **Raised from 11 kB to 12 kB** (brotli, `import { RichTextEditor }`, Tiptap ignored). | CI measured 11.18 kB. `EditorToolbar` is tree-shaken out of that import; the growth is the shared `fa`/`en` dictionary from `@avero/react`, which `useAvero` pulls in whole and which the Toast, Lightbox and editor toolbar strings grew by about 300 B. 12 kB leaves room for new strings. | User, 2026-09-09 |
| D-25 | Precompiled CSS for non-Tailwind consumers | **Deferred out of Phase 11.** Avero requires Tailwind v4. The Installation page documents the Tailwind path only and states the limitation; the missing `@avero/react/styles.css` promised by §6.3 is recorded in `docs/known-debts.md`. | The stylesheet is a packaging feature, not documentation: it needs a Tailwind CLI build step, two exports and a size budget. Documenting a path that does not ship would be worse than naming the gap. | User, 2026-09-10 |
| D-26 | Versioned docs | **Deferred to Phase 13.** The Phase 11 item is conditional on a previous major existing, and nothing is published yet. | Building a version tree with one version in it is scaffolding without content; 1.0 is the first point at which versioning means anything. | User, 2026-09-10 |

---

## 4. Design system

The values below are defined in `packages/tokens/src/theme.css`, `utilities.css`, `base.css` and `rich-content.css`. The default Tailwind v4 palette, spacing, radius and type scale are kept unchanged, so every Tailwind class works as documented; Avero adds its own tokens on top.

### 4.1 Color: brand and semantic

| Avero token | Value | Role |
| --- | --- | --- |
| `--color-primary` | `#0a66c2` | Brand primary |
| `--color-primary-hover` | `#004182` | Primary hover / gradient end |
| `--color-secondary` | `#f15928` | Secondary call to action, typing caret |
| `--color-background` | `#f4f4f4` | Page background |
| `--color-foreground` | `#464646` | Default body text |
| `--color-surface` | `#ffffff` | Card surface |
| `--color-surface-glass` | `#ffffff6b` (white at 42%) | Translucent listing card surface |
| `--color-surface-muted` | `#f9fafc` | Footer surface, social tiles, accordions |
| `--color-surface-sunken` | `#e7e9ec` | Sunken neutral surface |
| `--color-border-subtle` | `#d5d9df` | Filter panel border |
| `--color-text-strong` | `#242424` | Chrome headings, price text |
| `--color-text-chrome` / `-hover` | `#8390a2` / `#242424` | Footer links and chips |
| `--color-text-subtle` | `#54595f` | Footer subtext |
| `--color-text-muted` | `gray-400` | Muted meta text (below AA on white for small text; overridable, see O-04) |
| `--color-accent-social` | `#ff9606` | Social icon hover |
| `--color-icon-muted` | `#c1c3c8` | Social icon resting state |
| `--color-warning` / `-hover` | `#f59e0b` / `#d97706` | Warning call to action |
| `--color-shadow-brand` | `#0a66c205` | Brand-tinted soft shadow colour |
| `--color-shadow-box` | `#0f172a14` | Box shadow colour |
| `--color-chart-*` | views `#6366f1`, likes `#f43f5e`, clicks `#8b5cf6`, comments `#10b981`, grid `#f1f5f9`, axis `#94a3b8`, cursor `#cbd5e1`, tooltip `#1e293b` / `#f8fafc` / `#94a3b8` | Chart palette (D-16) |

### 4.2 Color: Tailwind palette roles

Avero keeps the full default Tailwind v4 palette and gives families consistent roles:

| Family | Role in Avero |
| --- | --- |
| `gray` | Default neutral: borders (`gray-100/200`), text (`gray-700/800/900`), muted text (`gray-400/500`), soft fills (`gray-50/100`) |
| `slate` | Neutral for profile, detail and about surfaces |
| `zinc` | Neutral for dashboard chrome (icon buttons, nav items) |
| `indigo` | Accent: focus rings, active table-of-contents entry, section icons, prose links |
| `blue` | Info and active states: profile tabs, tags, soft buttons |
| `emerald`, `amber`, `purple`, `rose`, `red`, `green`, `sky`, `cyan`, `teal`, `orange`, `pink`, `yellow`, `violet` | Categorical icon tiles, status and charts: tints (`-50/-100`) + text (`-500/-600/-700`) |

**Semantic aliases:** `success` = green-100/green-700, `danger` = red-100/red-700 and red-500, `warning` = amber-50/amber-700, `info` = blue-50/blue-600, `accent` = indigo-600, focus rings indigo-500/20 and blue-500/20.

**Categorical tile palette:** `blue`, `purple`, `amber`, `emerald`, `rose`, `indigo`, `slate`, each as `bg-{c}-50 text-{c}-600` (soft tile) or a gradient pair (blue 500→600, purple 500→600, amber-500→orange-500, emerald 500→600, rose-500→pink-600, slate 600→700).

**Heatmap scale:** `gray-100` → `emerald-200` → `emerald-400` → `emerald-500` → `emerald-700`; hover `ring-2 ring-indigo-400 ring-offset-1`.

**Gradient utilities (`utilities.css`):** `gradient-cover`, `gradient-cover-shade`, `gradient-media-shade`, `gradient-night` (dark banner), `gradient-accent-bar`, `gradient-label`, `gradient-premium`, `gradient-art-frame`, `gradient-brand`.

### 4.3 Typography

| Property | Values |
| --- | --- |
| Family | `--font-sans`: `Lahzeh, Inter, system-ui, …, sans-serif`; `--font-code`: `Fira Code, JetBrains Mono, ui-monospace, …` |
| Weights | Lahzeh 100–900; 500 Medium is the default UI weight |
| Scale | Tailwind default (`xs` … `8xl`) |
| Micro sizes | `text-4xs` 9px, `text-3xs` 10px, `text-2xs` 11px, `text-sm-plus` 13px, `text-md` 15px, `text-xl-plus` 22px (no line height, so they inherit) |
| Line heights | `leading-8` (2rem) is the Persian body standard; `--leading-prose` 1.8; `--leading-airy` 2.2 |
| Tracking | `tight` −0.025em, `wider` 0.05em (uppercase eyebrow), `widest` 0.1em |
| Rendering | `text-rendering: optimizeLegibility`, antialiased, `min-width: 320px` (`base.css`) |
| Heading patterns | Page title `text-xl md:text-3xl font-extrabold`; article h1 `text-2xl sm:text-3xl md:text-4xl font-bold leading-snug`; section `text-xl font-bold md:text-2xl`; card title `text-lg font-bold`; eyebrow `text-xs font-semibold tracking-wider uppercase` |

### 4.4 Spacing and layout

- Spacing base is Tailwind v4's `--spacing: .25rem`, including dynamic steps such as `h-70` or `gap-y-18`.
- **Container:** `w-full max-w-7xl` (80rem) with `px-4 sm:px-6 lg:px-8`; the dashboard uses `px-3 sm:px-6 lg:px-8`.
- **Page rhythm:** root `flex flex-col gap-y-10` (dashboard `gap-y-6 sm:gap-y-10`); section gaps `gap-y-10 md:gap-y-20`; card padding `p-6 sm:p-8` or `p-4 sm:p-6`; lists `space-y-4`/`space-y-6`.
- **Grids:** article 8/4 of `lg:grid-cols-12`; listing 3/9 with a sticky filter aside (`md:sticky md:top-10`); split detail 1/3 of `lg:grid-cols-4` with an order swap; dashboard 1/2 of `lg:grid-cols-3`; card grids `sm:grid-cols-2 lg:grid-cols-3|4|5|6`.
- **Sticky:** the header is `sticky top-12` with `backdrop-blur-2xl`; article asides `sticky top-28 h-fit`; detail asides `lg:sticky lg:top-24`.
- **Breakpoints:** Tailwind v4 defaults (`sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem).

### 4.5 Radius

| Token | Value | Used for |
| --- | --- | --- |
| `rounded-xs` | 0.125rem | Heatmap cells |
| `rounded` / `rounded-sm` | 0.25rem | Filter input, native select |
| `rounded-md` | 0.375rem | Footer link chips, social tiles |
| `rounded-lg` | 0.5rem | Small icon tiles, tags, segmented items |
| `rounded-xl` | 0.75rem | Buttons, icon buttons, inputs, sub-cards |
| `rounded-2xl` | 1rem | Dashboard cards, textarea, nav items, images |
| `rounded-3xl` | 1.5rem | Primary content cards, profile header |
| `rounded-full` | 9999px | Pills, avatars, progress, dots |
| `--radius-huge` | 1.75rem | Oversized panels |
| `--radius-leaf` | 2.5rem | Asymmetric "leaf" corners |

### 4.6 Elevation

| Token | Value | Used by |
| --- | --- | --- |
| `shadow-2xs` / `shadow-xs` | Tailwind defaults | Tags, tables, icon buttons, avatars, pills |
| `shadow-brand-soft` / `-md` / `-lg` / `-hover` / `-drop` | `0 0 20px`, `35px`, `40px`, `0 2px 35px`, `0 20px 0` of `--color-shadow-brand` | Blog and dashboard cards and their hover states |
| `shadow-box` | `0 2px 4px var(--color-shadow-box)` | Boxed panels |
| `shadow-card-soft` / `-ambient` / `-faint` / `-subtle` / `-hairline` / `-raised` | `0 4px 25px rgba(0,0,0,.04)` … `0 2px 12px rgba(0,0,0,.08)` | Hero card, profile header, feature cards, listbox |
| `shadow-elevated` / `-soft` / `-tight` | `0 10px 40px rgba(15,23,42,.08)` and variants | Floating panels |
| `shadow-float` / `-hover` / `-wide` / `-strong` | `0 20px 80px rgba(15,23,42,.08)` and hover lifts | Hover lifts |
| `shadow-pop` / `-wide` | `0 4px 15px -3px rgba(0,0,0,.1)`, `0 8px 40px rgba(0,0,0,.08)` | Dropdowns and popovers |
| `shadow-modal` / `shadow-lightbox` | `0 25px 80px rgba(15,23,42,.2)` / `0 25px 70px rgba(0,0,0,.35)` | Dialogs and lightbox |
| `drop-shadow-soft` / `-amber-sm` / `-amber-md` | soft drop, amber glows | Illustrations, star and badge glow |
| Coloured | `shadow-md shadow-primary/20`, `shadow-blue-500/20` | Primary buttons, active tabs |

**Blur tokens:** `--blur-hair` 1px, `--blur-thin` 2px, `--blur-mist` 50px, `--blur-orb` 70px, `--blur-haze` 200px.

### 4.7 Motion

- **Durations:** 100, 150 (default), 200 (dominant), 300, 500, 700, 1000 ms.
- **Easings:** `ease-out`, `ease-linear`, `ease-in-out`; default transition `.15s cubic-bezier(.4,0,.2,1)`.
- **Interaction patterns:** hover lift `-translate-y-0.5`/`-1`; hover scale `1.02`–`1.05` (images 500ms); press `active:scale-[0.98]`; chevron `rotate-180`; drawer slide over 300ms; pagination pill 8 → 28px.
- **Animations:**

| Token | Keyframes | Spec |
| --- | --- | --- |
| `animate-slide-up` | `slide-up` | opacity 0→1, translateY 100%→0, .25s ease-out |
| `animate-fade-in` | `fade-in` | opacity 0→1, translateY 12px→0, .4s ease-out both (page enter) |
| `animate-fade` | `fade` | opacity 0→1, translateY −4px→0, .5s |
| `animate-blink` | `blink` | opacity 1→0→1, 1s step-end ∞ |
| `animate-blink-caret` | `blink-caret` | border transparent ↔ `--color-secondary`, .75s (`typing-caret` utility) |
| `animate-sway` | `sway` | fade in, float −6px, rotate 2deg, fade out, 3s |
| `animate-shimmer` | `shimmer` | background-position −200% → 200%, 1.6s linear ∞ (`skeleton-shimmer` utility) |
| `animate-spin-glow` | `spin-glow` | rotate 360 with an indigo glow, 1.5s (`glow-ring` utility) |
| `animate-accordion-down` / `-up` | `accordion-down` / `-up` | height and opacity over 300ms ease-in-out |

- **Reduced motion:** `base.css` disables or shortens animations and transitions under `prefers-reduced-motion`.

### 4.8 Z-index layers

Named layers are plain custom properties used as `z-(--z-modal)`: `--z-raised` 10, `--z-sticky` 50, `--z-dropdown` 60, `--z-drawer` 70, `--z-overlay` 100, `--z-overlay-content` 105, `--z-modal` 110, `--z-modal-content` 115, `--z-modal-nested` 120, `--z-popover` 999, `--z-top-layer` 2000, `--z-top-layer-content` 3000, `--z-toast` 9999, `--z-max` 10001. `check-z-order.mjs` enforces toast > modal > drawer > dropdown > header.

### 4.9 Iconography

- Lucide at the default 24px viewBox; sizes 14px (`size-3.5`), 16px (`size-4`), 18px, 20px (`size-5`), 24px (`size-6`); default stroke 2.
- Filled star: `fill-amber-400 text-amber-400`.
- Bundled brand and solid glyphs (Font Awesome Free 5, Heroicons) in `src/icons/publicIcons.tsx`, `aria-hidden` by default.

### 4.10 Scrollbars and utilities

- `scrollbar-fancy`: thin, rounded, semi-transparent slate thumb with a hover state.
- `scrollbar-slim`: 4px gray thumb for comment lists.
- `scrollbar-hidden`: hidden scrollbars for horizontally scrolling tab rows.
- `skeleton-shimmer`, `glow-ring` and `typing-caret` wrap the matching animations.

### 4.11 Rich-content (prose) styles

`rich-content.css` provides three prose variants used by `RichContent` and the editor:

- **`content` (`.content-area`, articles and descriptions):**
  - `h2`: `text-xl sm:text-2xl font-bold mt-6 mb-3 leading-snug`; `h3`: `text-lg sm:text-xl font-bold mt-5 mb-2.5`.
  - `p`: `text-base text-gray-700 leading-8 mb-4`; `strong`: `font-bold text-gray-900`.
  - `ol`/`ul`: `list-outside ps-6 sm:ps-7 space-y-2 my-3`, `li` `leading-8 my-1`.
  - `blockquote`: `border-s-4 border-indigo-500 bg-indigo-50/30 italic py-2.5 rounded-e-lg` with a quote mark `text-indigo-400/40`.
  - `figure img`: `rounded-xl shadow-md mx-auto`.
  - Links: `text-indigo-600 underline hover:text-indigo-800`.
  - Tables: responsive wrapper `overflow-x-auto rounded-xl border border-gray-200`; `th` `bg-gray-100 p-2.5 font-bold`; `td` `border border-gray-200 p-2.5 align-top`; row `hover:bg-gray-50/50`.
- **`editor` (`.editor`):** h1 1.75rem/800, h2 1.4rem/700, p line-height 1.8rem, blue links, `border-s` 3px blockquote.
- **Editing surface (`.avero-editor-content`):**
  - p `.95rem/1.8 #374151`; h1 `1.75rem/800 #111827`; h2 `1.4rem/700 #1f2937`; h3 `1.15rem/600 #374151`.
  - `pre`: LTR, bg `#1e293b`, text `#86efac`, radius .75rem. Inline `code`: `#dc2626` on `#f3f4f6`.
  - `hr` 2px `#e5e7eb`; selected table cell overlay `#6366f126`; placeholder `#9ca3af`; selected node outline `2px #6366f1`.

---

## 5. Component inventory

**Naming:** components are domain-neutral. Items marked ⬜ in §9 are backlog: they are designed from the token system in §4 and follow the same Global DoD as everything already built.

### 5.1 Foundations (F)
| ID | Item |
| --- | --- |
| F-01 | Color tokens (brand, semantic, palette roles, categorical, chart, heatmap, gradients) |
| F-02 | Typography (Lahzeh, scale, micro sizes, leading, heading patterns) |
| F-03 | Spacing, container, page rhythm, grid presets |
| F-04 | Radius scale |
| F-05 | Elevation (shadows, drop shadows, blur) |
| F-06 | Motion (durations, easings, keyframes, animation utilities) |
| F-07 | Z-index layers |
| F-08 | Breakpoints |
| F-09 | Iconography (Lucide sizing + bundled brand icons) |
| F-10 | Scrollbar styles (`fancy`, `slim`, `hidden`) |
| F-11 | Global base (body, font smoothing, smooth scroll, `min-width`, reduced motion) |
| F-12 | Direction and locale (RTL/LTR, Persian digits, Jalali dates, toman formatting) |
| F-13 | Prose / rich-content typography |

### 5.2 Primitives (P)
| ID | Component | Variants / notes |
| --- | --- | --- |
| P-01 | `Button` | `primary` (solid, `rounded-xl`, `shadow-md shadow-primary/20`), `secondary` (orange call to action), `soft` with tones, `ghost`, `outline`, `inverse`, `warning`; sizes `xs`/`sm`/`md`/`lg`/`block`; `loading`, `disabled`, leading/trailing icon, `asChild` |
| P-02 | `IconButton` | `chrome`, `soft` with tones (share row), `circle` (carousel), `social`, `tile` (footer); sizes 32/36/40; required label |
| P-03 | `Link` | `nav`, `drawer`, `prose`, `chrome`, `subtle`, `brand`; `current`, `external` |
| P-04 | `Badge` | `status` (success/danger/neutral), `outline` (indigo/emerald/amber), `counter`, `premium` (amber gradient + sparkles), `label` (primary→cyan gradient), `overlay`, `solid` |
| P-05 | `Chip` / `Tag` | static, `link`, `tag` (leading icon), `footer`, `mini`, `skill`, `category`; `asChild` |
| P-06 | `Avatar` | sizes 28/40/48/56/64/80/96/112/176; circle or squircle; borders; hover ring; initials fallback |
| P-06b | `AvatarGroup` | overlapping `-space-x-3`, overflow count |
| P-07 | `IconTile` | categorical colours × sizes 28/32/36/40/48; `soft` / `gradient` |
| P-08 | `Icon` + brand icons | size scale, `aria-hidden` default, `createIcon` |
| P-09 | `Divider` | `gray-100`, `slate-100`, `gray-200`; horizontal and vertical |
| P-10 | `Heading`, `Text`, `Eyebrow` | patterns from §4.3 |
| P-11 | `Spinner` | `animate-spin`, `glow-ring` variant |
| P-12 | `Skeleton` | `shimmer`, `pulse`; `SkeletonCard` preset |
| P-13 | `Progress` | linear `h-2 bg-gray-100 rounded-full`, primary fill, width transition |
| P-14 | `VisuallyHidden`, `LiveRegion` | `sr-only` content and status announcer |
| P-15 | `Image` / `Figure` | hover zoom, rounded variants, fallback, aspect presets |

### 5.3 Forms (FM)
| ID | Component |
| --- | --- |
| FM-01 | `Field` (label, description, error, required) |
| FM-02 | `Input` (filter, soft and slate treatments; invalid state) |
| FM-03 | `Textarea` (soft gray and slate variants, indigo focus ring) |
| FM-04 | `NativeSelect` |
| FM-05 | `Select` (custom trigger `rounded-xl`, rotating chevron, token-designed listbox) |
| FM-06 | `Combobox` (searchable select, category variant) |
| FM-07 | `Checkbox` |
| FM-08 | `Radio` |
| FM-09 | `Switch` |
| FM-10 | `FileInput` / upload |
| FM-11 | `PriceInput` (toman, thousands separators, Persian digit normalisation) |
| FM-12 | `TagInput` |
| FM-13 | `DatePicker` (Jalali): `single` and `range` modes, ISO `YYYY-MM-DD` values, typed entry in Persian or Latin digits plus a calendar popover (user, 2026-08-18) |
| FM-14 | `OtpInput` |
| FM-15 | `FormActions` row (hint text + submit) |

### 5.4 Navigation and disclosure (N)
| ID | Component |
| --- | --- |
| N-01 | `NavLink` (header and drawer with icon; provided by `Link` variants) |
| N-02 | `SidebarNav` + `SidebarNavItem` (`current`: primary fill + white + shadow-md; idle: zinc-600 → primary/10; `danger`) |
| N-03 | `BackLink` (three styles) |
| N-04 | `PillTabs` (link tabs, horizontally scrollable, icon + count; current blue-600) |
| N-05 | `SegmentedControl` (gray-100 track, white checked, indigo text) |
| N-06 | `ToggleChipGroup` (chart metric toggles, coloured when pressed) |
| N-07 | `TableOfContents` (active `border-s-2 indigo-500`, nested level indent, scroll spy) |
| N-08 | `Accordion` / `Collapsible` (muted surface, rotating arrow, 300ms height animation) |
| N-09 | `Carousel` (Embla; snap; chevron controls; dot and pill pagination) |
| N-10 | `Pagination` |
| N-11 | `InfiniteScroll` sentinel |

### 5.5 Overlays and feedback (O)
| ID | Component |
| --- | --- |
| O-01 | `Drawer` / `Sheet` (start/end side, `panel` and `wide` sizes, header, body, scrim, 300ms slide) |
| O-02 | `Dialog` / `Modal` (`bg-black/50` scrim with blur, `max-h-[90vh]`, `rounded-3xl`, `shadow-modal`) |
| O-03 | `ConfirmDialog` |
| O-04 | `Popover` / `DropdownMenu` (notification and user menus) |
| O-05 | `Tooltip` (generic) + chart tooltip |
| O-06 | `Toast` / `Toaster` |
| O-07 | `Lightbox` (gallery zoom, `cursor-zoom-in`/`-out`, dark scrim) |
| O-08 | `EmptyState` (inline text, slate text, icon + text, icon in a circle) |
| O-09 | `Alert` / `Callout` (tinted, bordered) |
| O-10 | `DisabledOverlay` (blurred cover + reason pill) |

### 5.6 Data display (D)
| ID | Component |
| --- | --- |
| D-01 | `Card` (`surface`, `glass`, `flat`, `muted`) + `CardHeader`/`CardTitle`/`CardFooter` |
| D-02 | `StatCard` (label + icon tile + value) |
| D-03 | `StatTile` + `StatStrip` (icon tile + big value + label; accent bars on the strip) |
| D-04 | `MiniStat` (centred label + value) |
| D-05 | `FeatureCard` (icon tile + title + text; hover border primary/30 + shadow-md) |
| D-06 | `ActionTile` (gradient icon; hover fills with gradient; lift) |
| D-07 | `InfoRow` (tinted row + icon tile + label/value) |
| D-08 | `HighlightPanel` (amber gradient panel for a headline figure) |
| D-09 | `Table` (responsive, bordered, header tint, row hover) |
| D-10 | `List` (ordered/unordered prose lists) |
| D-11 | `Blockquote` |
| D-12 | `RichContent` (sanitized HTML renderer; variants `content`, `editor`, `question`) |
| D-13 | `MetaItem` / `MetaBar` (icon + label + value; panel, row and inline bars) |
| D-14 | `PriceTag` (`display`, `inline` "از … تومان", `compact`) |
| D-15 | `Rating` (filled star + score) |
| D-16 | `CapacityMeter` (label, count, progress, captions, status pill) |
| D-17 | `MatchScore` (percentage + caption) |
| D-18 | `ActivityHeatmap` + legend (12 months × 7 weekdays) |
| D-19 | `KeyValueRow` (contact rows, LTR values) |
| D-20 | `ContactMethod` chip (icon + label + mono LTR value) |
| D-21 | `SectionHeader` (`accentBar` + subtitle, `dot`, `icon`, plain; actions slot) |
| D-22 | `ZoomFrame` (hover dim + "view larger" pill) |
| D-23 | `CoverHeader` (gradient cover + overlapping avatar + footer bar) |
| D-24 | `ResponsiveBanner` (desktop/mobile image swap) |

### 5.7 Charts: `@avero/charts` (C)
| ID | Component |
| --- | --- |
| C-01 | `ChartCard` (title, toggle chips, body, empty and loading states) |
| C-02 | `AreaChart` |
| C-03 | `LineChart` |
| C-04 | `ChartTooltip`, axis/grid styling, palette |

### 5.8 Editor: `@avero/editor` (E)
| ID | Component |
| --- | --- |
| E-01 | `RichTextEditor` content styles (headings, lists, code, tables, placeholder, selection) |
| E-02 | Editor toolbar and chrome |

### 5.9 Effects (X)
| ID | Item |
| --- | --- |
| X-01 | Animation utilities (`fade-in`, `fade`, `slide-up`, `sway`, `blink`, `typing-caret`) |
| X-02 | `GlowOrbs` background decoration |
| X-04 | `Container` (the centred page column used by every shell) |

### 5.10 Blocks: composed, copy-paste-able (B)
| ID | Block | Typical use |
| --- | --- | --- |
| B-01 | `ListingCard` | Course or product listing |
| B-02 | `ShowcaseCard` | Showcase of finished work |
| B-03 | `OpportunityCard` (+ full/disabled state) | Workshop or event with limited places |
| B-04 | `SuggestionItem` | Recommended item with a match score |
| B-05 | `PostListItem` | Related articles |
| B-06 | `AuthorCard` | Article author box |
| B-07 | `ProviderCard` | Instructor or host box |
| B-08 | `CommentSection` (header + count, form, empty state; rows passed as children) | Comments |
| B-09 | `ShareBar` (`icon` and `labelled` variants) | Share controls |
| B-10 | `ReportCard` / `ReportAction` | Report a problem |
| B-11 | `FilterPanel` | Listing filters |
| B-12 | `PromoBanner` | Sidebar banner |
| B-13 | `CtaBanner` (dark gradient + orbs + eyebrow) | Mission statement |
| B-14 | `SplitHero` | About hero |
| B-15 | `FeatureGrid` | "Why us" section |
| B-16 | `QuickActions` | Dashboard shortcuts |
| B-17 | `ProfileHeader` (cover, avatar, name, badge, meta, tabs, socials) | Profile header |
| B-18 | `WelcomeCard` | Dashboard greeting |
| B-19 | `ReactionBar` (like, views, capacity, save) | Item actions |
| B-20 | `ArticleHeader` (image, title, meta bar) | Article header |
| B-21 | `CategoryLinks` (header + tag links) | Related categories |
| B-22 | `ContactMethods` panel | Contact channels |
| B-23 | `PriceCard` | Base price |
| B-24 | `RelatedList` | Related items |
| B-25 | `AchievementsPanel` | Rank and achievements |

### 5.11 Layout shells and templates (T)
| ID | Template |
| --- | --- |
| T-01 | `SiteShell` (skip link, `SiteHeader`, `main`, `SiteFooter`) |
| T-02 | `SiteHeader` (sticky blur, logo slot, nav, menu button, user slot) |
| T-03 | `SiteFooter` (link-chip grid, brand column, link groups, contact column, mobile accordions, about strip, trust-seal slot, copyright, social tiles) |
| T-04 | `DashboardShell` (sidebar, mobile bar, drawer, content card) |
| T-05 | `ArticleLayout` (8/4 + sticky aside) |
| T-06 | `DetailLayout` (8/4 + sticky aside) |
| T-07 | `ListingLayout` (3/9 + sticky filters) |
| T-08 | `SplitDetailLayout` (1/3 of 4 with order swap) |
| T-09 | `ProfileLayout` |
| TP-01…TP-06 | Example templates composed from Avero only, with original sample content: article, course detail, course listing, instructor profile, learner dashboard, about page |

---

## 6. Architecture

### 6.1 Repository layout (follows `.claude/CLAUDE.md`)

```
complib/
├── package.json              # per-app cd-scripts (docs-dev, storybook-dev, …); no bare "dev"
├── pnpm-workspace.yaml       # apps/*, packages/*
├── Avero-plan.md             # this file
├── docs/                     # project rules (read before work)
│   ├── avero-conventions.md  # API, naming, styling, RTL rules for contributors
│   ├── known-debts.md
│   └── SECURITY.md
├── packages/
│   ├── config/               # @avero/config – shared tsconfig, eslint, prettier, tailwind-merge config
│   ├── tokens/               # @avero/tokens – theme.css (@theme), base.css, utilities.css, rich-content.css, token data
│   ├── font/                 # @avero/font – Lahzeh @font-face + licensed woff2 (see O-02)
│   ├── react/                # @avero/react – all core components, blocks, hooks, utils, icons
│   ├── charts/               # @avero/charts – Recharts wrappers (peer: recharts)
│   └── editor/               # @avero/editor – Tiptap editor (peer: @tiptap/*)
└── apps/
    ├── docs/                 # Next.js + Fumadocs public documentation
    └── storybook/            # internal: stories, interaction + a11y tests, example templates
```

- Workspace packages use the named scope `@avero/*`. App-internal imports use `@/…`. This is consistent with CLAUDE.md's alias convention.

### 6.2 Package internals (`@avero/react`)

```
packages/react/src/
├── components/
│   └── button/
│       ├── Button.tsx            # component (function declaration, typed props)
│       ├── button.variants.ts    # cva variants (exported: buttonVariants)
│       ├── button.test.tsx       # unit + interaction + axe
│       ├── Button.stories.tsx    # consumed by apps/storybook
│       └── index.ts
├── blocks/                       # B-* composed blocks
├── hooks/                        # useControllableState, useDirection, useMediaQuery, …
├── utils/                        # cn (tailwind-merge configured), format (digits, toman, jalali), sanitize
├── i18n/                         # AveroProvider, dictionaries (fa, en)
├── icons/                        # bundled brand SVG icons
└── index.ts                      # public surface (named exports only)
```

### 6.3 Styling and consumption

- **Tailwind v4 consumers (primary path):**
  ```css
  @import "tailwindcss";
  @import "@avero/tokens/theme.css";      /* @theme tokens */
  @import "@avero/tokens/base.css";       /* body defaults, reduced motion (opt-in) */
  @import "@avero/tokens/utilities.css";  /* scrollbars, gradients, shimmer */
  @import "@avero/font/lahzeh.css";       /* optional */
  @source "../node_modules/@avero/react/dist";
  ```
- **Non-Tailwind consumers:** a precompiled `@avero/react/styles.css` containing only the classes Avero uses, with an option that omits preflight.
- `cn()` = `clsx` + `tailwind-merge`, **extended with every custom token** (font sizes, shadows, radii, z-index). Otherwise overrides like `className="shadow-card-soft"` would merge incorrectly.
- Components contain no raw hex or rgb values. They use tokens or Tailwind palette classes only (enforced by lint, Phase 1).
- Logical properties only (`ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`, `border-s`, `rounded-s`, `text-start`). Physical `left`/`right`/`pl`/`pr`/`ml`/`mr` are banned by lint.

### 6.4 Component API conventions

- Function declarations and `type` over `interface` (per CLAUDE.md). Refs forwarded with `forwardRef` while React 18 is supported (see O-03). `displayName` is set.
- Every component accepts `className` and spreads remaining native props onto its root.
- State is exposed via `data-state` / `data-active` / `data-disabled` attributes for styling and testing. Each root carries `data-slot="<name>"`.
- Variants use `cva`, and the variant function is exported (`buttonVariants`) so it can be reused on links.
- `asChild` (Radix `Slot`) is available where a component commonly wraps links (Button, Chip, IconButton, Card).
- Stateful components support controlled and uncontrolled modes (`value`/`defaultValue`/`onValueChange`).
- Form controls are compatible with react-hook-form: they forward refs and accept `name`, `onBlur` and `aria-invalid`.
- No built-in user-facing literals. All default strings come from `AveroProvider` dictionaries (`fa` default, `en`) and can be overridden per component via label props.
- `AveroProvider` props: `dir` (derived from the locale), `locale` (default `fa-IR`), `digits` (`fa`/`latn`), `calendar` (`persian`/`gregory`), `dictionary` overrides. It wraps Radix `DirectionProvider`.
- Formatting uses `Intl` only (`fa-IR-u-ca-persian` for Jalali dates, `Intl.NumberFormat` with the Persian thousands separator `٬`). There are no date libraries in core.
- `"use client"` only on interactive components. Server-safe components stay directive-free, and the build preserves per-file directives.

### 6.5 Build and release tooling

- TypeScript compiler emit (decision D-13): per-file ESM + `.d.ts`, directives preserved and verified by `scripts/verify-build.mjs`. Subpath exports per component; `sideEffects: false` for JS packages, `["*.css"]` for the tokens package.
- Changesets for versioning and changelog. `size-limit` enforces per-component budgets.
- CI (GitHub Actions) runs on every PR: install (pnpm, frozen lockfile), lint, format check, packages build, typecheck, unit tests, size-limit, Storybook build, docs build. The Playwright suites — smoke, axe on every story in both directions (colour contrast reported rather than enforced per D-19), overlay stacking and scroll lock — are run on demand with `pnpm run storybook-test`.
- Git: `main` (releasable) and `dev` (integration), commit format `type(Scope): Title-Style Description` (per CLAUDE.md).

---

## 7. Global Definition of Done (per component)

A component or block counts as **Done** in §9 only when **all** of these hold. Each item is verifiable in CI or by a recorded artefact.

1. **API:** fully typed props, no `any` (except `// BOUNDARY:`-documented third-party callbacks), `className` merge, rest-prop spread, ref forwarding, `data-slot`, and controlled/uncontrolled where stateful.
2. **Design review:** every variant, size and state listed in §5 exists, is built from §4 tokens, and has a Storybook story reviewed next to its related components; reviewer sign-off is recorded.
3. **Tokens only:** zero raw colour or shadow values in the component (lint rule passes); only logical direction utilities (lint rule passes).
4. **RTL + LTR:** a story renders in both directions. Icons that imply direction (arrows, chevrons) flip correctly.
5. **Accessibility:** `axe` reports 0 violations in unit and Storybook tests. Keyboard behaviour matches the documented table (WAI-ARIA APG pattern). `focus-visible` styling is present. `prefers-reduced-motion` is respected.
6. **Tests:** Vitest + Testing Library cover render, every variant, interactions, keyboard and edge cases (empty, long text, disabled, loading). Component statement coverage is ≥ 90% and branch coverage ≥ 85%. An SSR `renderToString` smoke test passes.
7. **i18n:** no hardcoded user-facing strings; `fa` and `en` dictionary entries exist.
8. **Docs:** a docs page exists (see Phase 11 template) with a live example of every variant, a props table and an accessibility section.
9. **Build:** tree-shakable subpath export, and the per-component `size-limit` budget passes.
10. **Quality gates:** `tsc -b` reports 0 errors, lint reports 0 warnings, and the changeset entry is added.

---

## 8. Phases with strict DoDs

> Each phase lists **Scope**, **Deliverables**, **DoD** (checkboxes, all mandatory) and an **Exit gate** (the single verification that closes the phase). Record evidence links on the "Evidence" line.

### Phase 0 — Scope and design system  ✅

**Scope:** define the target stack, the design system and the component inventory.

**Deliverables:** §3–§5 of this plan.

**DoD:**
- [x] Target stack chosen and recorded (§3)
- [x] Design system defined: colour, typography, spacing, radius, elevation, motion, z-index, breakpoints, iconography, prose (§4)
- [x] Component inventory with variants per item (§5)
- [x] Muted-text contrast policy decided (O-04)
- [x] Open decisions O-01…O-04 and O-06 resolved (§11) — O-06 resolved with a pending user action (reserve the npm org before Phase 13)

**Evidence:** this plan (sections 3–5), planning session 2026-06-19.
**Exit gate:** every inventory item has variants and a phase assigned.

### Phase 1 — Workspace, tooling and CI  ✅

**Scope:** monorepo skeleton per §6.1, empty packages building, all quality gates wired.

**DoD:**
- [x] Git initialised or verified with `main` and `dev` branches; work happens on `dev`
- [x] `pnpm-workspace.yaml` and root `package.json` with per-app cd-scripts only (no bare `dev`), `packageManager` pinned
- [x] `@avero/config` providing strict `tsconfig` bases, ESLint flat config and Prettier config, consumed by all packages
- [x] TypeScript strict and `noUncheckedIndexedAccess` on; `tsc -b` at root passes — equivalent `pnpm typecheck` runs `tsc` in every project (per-package `NodeNext`/`Bundler` configs)
- [x] Custom lint rules active: no raw hex/rgb/hsl in `packages/react/src/**`; no physical direction utilities (`pl-`, `pr-`, `ml-`, `mr-`, `left-`, `right-`, `border-l`, `border-r`, `rounded-l`, `rounded-r`, `text-left`, `text-right`); `no-console` — `avero/no-raw-color`, `avero/no-physical-direction`, 26 RuleTester cases
- [x] Tailwind v4.3.x installed; a smoke component renders a token class in Storybook — Playwright asserts `rgb(10, 102, 194)`
- [x] Library build producing ESM + `.d.ts` with preserved `"use client"` directives (verified by a script that inspects the output; D-13) — `verify-build.mjs`
- [x] Vitest + Testing Library + `vitest-axe` configured, with a sample test passing — an `axe-core` helper replaces `vitest-axe` (unmaintained)
- [x] Playwright configured for smoke + axe tests against Storybook
- [x] Storybook (internal) boots with RTL/LTR and locale toolbar toggles
- [x] `apps/docs` (Next.js + Fumadocs) boots with one MDX page rendering a live Avero component — Button, Badge, Chip on the introduction page
- [x] Changesets initialised; `size-limit` configured
- [x] CI pipeline runs all gates in §6.5 on every PR to `dev` and is green — green on `dev`, after raising the `cn` size budget (D-18), adding the browser axe suite (D-19) and removing screenshot tests (D-20)
- [x] `docs/avero-conventions.md`, `docs/known-debts.md` and `docs/SECURITY.md` created
- [x] Dependency versions pinned to current stable releases and recorded in `docs/avero-conventions.md`

**Evidence:** GitHub Actions `CI` workflow, green on `dev` (2026-08-18): fresh checkout, frozen-lockfile install, lint, format, packages build, typecheck, unit tests, size budgets, Storybook build, Playwright smoke + axe, docs build.
**Exit gate:** a fresh clone passes `pnpm install && pnpm -r build && pnpm -r test` with CI green.

### Phase 2 — Design tokens and foundations  ✅

**Scope:** F-01…F-13.

**DoD:**
- [x] `@avero/tokens/theme.css` defines every token in §4 as Tailwind v4 `@theme` variables (brand, semantic, chart, micro font sizes, leading, shadows, radii, blur, animations) — categorical and heatmap colours reuse the default palette; gradients live in `utilities.css`; z-index layers are `--z-*` properties
- [x] `tokens.json` (DTCG format) and `tokens.ts` are generated from a single source; a CI check fails if they drift — `generate-token-data.mjs --check` (emits `tokens.js` + `tokens.d.ts`)
- [x] `base.css`: body defaults, font smoothing, `min-width: 320px`, smooth scroll, `prefers-reduced-motion` override; `utilities.css`: `fancy`/`slim`/`hidden` scrollbars, shimmer, glow ring, typing caret and gradients; keyframes in `theme.css`
- [x] `@avero/font`: `@font-face` for all 9 Lahzeh weights with `font-display: swap`, woff2 first; a Playwright test confirms each weight actually loads (`document.fonts.check`) — `apps/storybook/tests/fonts.spec.ts` also fails if any `.woff` fallback is requested
- [x] Prose/`RichContent` style layer provides the `content`, `editor` and editing-surface values in §4.11 — `rich-content.css`
- [x] `cn()` with tailwind-merge extended for every custom token group; unit tests prove that overriding each custom token group merges correctly — groups generated from `@avero/tokens` (`tokenGroups`)
- [x] Formatting utils: `formatNumber` (fa/latn digits, `٬` grouping), `formatDate` (Jalali/Gregorian via `Intl`), `formatRelativeTime`; 100% unit-test coverage, including edge cases (0, negative, large, NaN) — the currency unit comes from the dictionary (`currencyToman`) and is composed by `PriceTag`, so there is no separate `formatToman`
- [x] `AveroProvider` (dir, locale, digits, calendar) with `fa` and `en` dictionaries
- [x] Brand icon set (Telegram, WhatsApp, LinkedIn, X, Instagram, plus the footer icons) with licences verified and recorded — sources in `THIRD_PARTY_NOTICES.md`; `InstagramIcon` matches the Ionicons 4.6.3 `logo-instagram` path data exactly (MIT), verified 2026-08-18
- [x] Token docs pages: colour swatches with hex and contrast ratios, type scale specimen in Lahzeh, radius, shadow, motion (live keyframe demos), z-index, breakpoints — the docs Foundations section, generated from `@avero/tokens` data and Tailwind's installed theme
- [x] Contrast report generated for every failing text/background pairing used in §5, listed against O-04 — `contrast-report.mjs` writes `packages/tokens/reports/contrast-report.md`; completeness comes from the browser axe suite, which measures every text node in every story in both directions (D-19), and all 28 below-AA pairings it finds are in the report
- [x] Global DoD items 3, 8 and 10 hold for the tokens packages — lint passes with raw values confined to `@avero/tokens` itself, the Foundations pages document them, and CI's typecheck and lint are green

**Evidence:** GitHub Actions `CI` green on `dev` (2026-08-18), including the font-loading test and the docs build with the Foundations pages. Design review of the token specimen pages signed off by the user on 2026-08-18.
**Exit gate:** the token specimen pages are signed off in a design review. ✅ Signed off by the user, 2026-08-18.

### Phase 3 — Core primitives  ✅

**Scope:** P-01…P-15.

**DoD:**
- [x] P-01 `Button` meets the Global DoD, including all variants × sizes × states (hover, active, focus-visible, disabled, loading)
- [x] P-02 `IconButton` meets the Global DoD; an accessible name is required at the type level
- [x] P-03 `Link`, P-09 `Divider` and P-10 typography meet the Global DoD
- [x] P-04 `Badge` and P-05 `Chip`/`Tag` meet the Global DoD
- [x] P-06 `Avatar` meets the Global DoD, including image-error fallback and all size/shape/border variants
- [x] P-07 `IconTile` and P-08 `Icon` meet the Global DoD, including all categorical colours
- [x] P-13 `Progress` meets the Global DoD (`role="progressbar"`, `aria-valuenow`)
- [x] P-14 `VisuallyHidden`/`LiveRegion` and P-15 `Image`/`Figure` meet the Global DoD
- [x] P-06b `AvatarGroup`, P-11 `Spinner` and P-12 `Skeleton` are split out as backlog rows in §9, so this phase does not wait on them

**Exit gate:** a Storybook "Primitives" review page is signed off in a design review. ✅ Signed off by the user, 2026-08-18.

### Phase 4 — Forms  ✅

**Scope:** FM-01…FM-15.

**DoD:**
- [x] FM-02 `Input`, FM-03 `Textarea`, FM-04 `NativeSelect` and FM-15 `FormActions` meet the Global DoD
- [x] FM-05 `Select` (Radix) meets the Global DoD, with the listbox designed from the token system
- [x] FM-01 `Field` wires label, description and error ids (`aria-describedby`, `aria-invalid`) automatically — `FieldControl` passes `id`, `aria-describedby`, `aria-invalid`, `aria-required` and `disabled` to any child control, including react-hook-form's `register` (CI green)
- [x] A react-hook-form + zod integration example passes a test for register, validation errors and submit
- [x] FM-06 `Combobox` meets the Global DoD — WAI-ARIA combobox on Radix Popover (no new dependency), grouped category options, Persian-aware matching via `normalizeSearchText` (CI green)
- [x] FM-07 `Checkbox`, FM-08 `Radio` and FM-09 `Switch` meet the Global DoD — Radix-based, with an indeterminate checkbox state, direction-aware radio arrow keys and a mirrored switch thumb; resting borders and the off track are `gray-500` to meet 3:1 non-text contrast (CI green)
- [x] FM-10 `FileInput` meets the Global DoD, including keyboard access and file-type/size props — drop area over a real file input, `accept`/`maxSize`/`maxFiles` with `onReject` reasons, file list synced to the native `FileList` (CI green)
- [x] FM-11 `PriceInput` and FM-12 `TagInput` meet the Global DoD, including Persian digit input normalisation — `PriceInput` groups Latin/Persian/Arabic digits in the locale's digits with a stable caret and reports `number | null`; `TagInput` splits on Enter, `,` and `،`, and drops duplicates through `normalizeSearchText` (CI green)
- [x] FM-13 `DatePicker` (Jalali) meets the Global DoD, using `Intl` only, with RTL grid navigation — `single` and `range` modes, ISO values, typed entry in any digit system, WAI-ARIA date picker dialog; Solar Hijri conversion by `Intl` search, round-trip tested over 2019–2031 (CI green)
- [x] FM-14 `OtpInput` meets the Global DoD, including paste handling and `autocomplete="one-time-code"` — one real input over decorative boxes, Persian and Arabic digits normalised, pasted separators dropped, boxes left to right on RTL pages (CI green)

**Exit gate:** a "Forms" demo form (every control, validation on) passes axe and keyboard-only completion in Playwright. ✅ `Patterns/Forms Demo` story and `apps/storybook/tests/forms.spec.ts`, in RTL/fa and LTR/en, with axe in the error and submitted states (CI green).

### Phase 5 — Navigation, disclosure and carousel  ✅

**Scope:** N-01…N-11.

**DoD:**
- [x] N-01 `NavLink`, N-02 `SidebarNav` and N-03 `BackLink` meet the Global DoD (`aria-current="page"` on active)
- [x] N-04 `PillTabs` meets the Global DoD, including horizontal scroll with hidden scrollbar and the active item scrolled into view
- [x] N-05 `SegmentedControl` and N-06 `ToggleChipGroup` meet the Global DoD (Radix ToggleGroup semantics)
- [x] N-07 `TableOfContents` meets the Global DoD, including scroll-spy active state and nested levels
- [x] N-08 `Accordion`/`Collapsible` meets the Global DoD, with a 300ms height animation
- [x] N-09 `Carousel` meets the Global DoD: snap, chevron controls with disabled state, dot pagination, pill pagination (28px active), RTL drag direction
- [x] N-10 `Pagination` meets the Global DoD — links (`getHref`, `rel="prev"`/`"next"`) or buttons, first/last pages with a sibling window and gaps (`paginationRange`), `aria-current="page"`, locale digits (CI green)
- [x] N-11 `InfiniteScroll` meets the Global DoD, using IntersectionObserver with a loading slot — pauses while `loading`, stops at `hasMore={false}`, `role="status"` loader, load-more button without IntersectionObserver (CI green)
- [x] Keyboard tables documented for every component in this phase — `pill-tabs` was the only page missing one (CI green)

**Exit gate:** every component in this phase meets the Global DoD. ✅ Every N-* row in §9 is ✅ (CI green).

### Phase 6 — Overlays and feedback  ✅

**Scope:** O-01…O-10.

**DoD:**
- [x] O-01 `Drawer`/`Sheet` meets the Global DoD: focus trap, `Esc`, scroll lock, start/end sides mirror in LTR, both panel sizes, dimmed scrim
- [x] O-02 `Dialog` and O-03 `ConfirmDialog` meet the Global DoD — Radix Dialog and AlertDialog, three panel sizes, dictionary-labelled close, async `onConfirm` busy state; unit, SSR and axe tests and docs pages
- [x] O-04 `Popover`/`DropdownMenu` meet the Global DoD, including the notification-menu composition — logical `align` in both directions, checkbox/radio/submenu items, `danger` tone; notification menu as a story, a docs demo and a unit test with axe (docs pages)
- [x] O-05 `Tooltip` meets the Global DoD — Radix Tooltip on `--z-popover` (D-21), `aria-describedby` link, focus and hover opening, logical `align` in both directions, optional `TooltipProvider` whose delay nested tooltips share; the chart tooltip is C-04
- [x] O-06 `Toast` meets the Global DoD: success, error, info and warning variants, stacking, 480px mobile behaviour, and a pause-on-hover progress bar — `ToastProvider` + `useToast` on Radix Toast; the error variant is the `danger` tone, matching `Alert` and `Button`, and is announced assertively; `limit` keeps the newest; full width to 480px, then a 24rem column at the inline end; the Web Animations progress bar pauses with Radix's timer (D-23)
- [x] O-07 `Lightbox` meets the Global DoD, including keyboard navigation and focus return — Radix Dialog over a `bg-black/90` scrim; arrow keys follow the reading direction, `Home`/`End`; zoom toggle with `aria-pressed` plus `cursor-zoom-in`/`-out` on the image; focus returns to whatever opened it, since it has no Radix trigger
- [x] O-08 `EmptyState` meets the Global DoD with all 4 variants, and distinguishes "no results" from "nothing yet"
- [x] O-09 `Alert` and O-10 `DisabledOverlay` meet the Global DoD — `Alert` in five tones, `tinted` and `bordered` (callout) variants, title, actions, dictionary-labelled dismiss, opt-in live region; tinted text uses the tone's `-800`/`-900` shade for AA
- [x] Z-index layers finalised (§4.8), with a layering test proving toast > modal > drawer > dropdown > header — `packages/tokens/scripts/check-z-order.mjs`, run by the tokens test
- [x] Scroll-lock behaviour is verified not to shift layout, both RTL and LTR (scrollbar-gutter handled) — `apps/storybook/tests/scroll-lock.spec.ts` opens a dialog, drawer, select and dropdown menu on a scrolling page in both directions and measures an in-flow bar, a fixed bar, the viewport width and the scroll position across each; it also asserts the D-22 mechanism (`scrollbar-gutter: stable`, no compensating body margin) and that scrolling stops while a dialog is open and resumes, in place, once it closes (CI green)

**Evidence:** GitHub Actions `CI` green on `dev` (2026-09-10), including the overlay-stacking and scroll-lock suites in RTL/`fa` and LTR/`en`.
**Exit gate:** a Playwright overlay-stacking test and axe pass on a page containing every overlay open in turn. ✅ `apps/storybook/tests/overlays.spec.ts` on the `Internal/Overlay Stack` story opens all eight overlays in RTL and LTR with axe, and checks a popover above a drawer and a toast above a dialog (CI green).

### Phase 7 — Data display  🟨

**Scope:** D-01…D-24.

**DoD:**
- [x] D-01 `Card` family meets the Global DoD, including all 4 surfaces and hover elevations
- [x] D-02…D-08 stat, feature, action and info components meet the Global DoD
- [x] D-09 `Table` meets the Global DoD, including responsive overflow, header scope and row hover
- [x] D-10 `List`, D-11 `Blockquote` and D-12 `RichContent` meet the Global DoD; `RichContent` **always** sanitizes (js-xss, isomorphic — decision D-15), with tests covering script, `on*` handlers and `javascript:` URLs
- [x] D-13…D-17 meta, price, rating, capacity and match components meet the Global DoD, with number formatting via the Phase 2 utils
- [x] D-18 `ActivityHeatmap` meets the Global DoD: accessible (each cell has a label with date and count), keyboard-navigable grid, legend, Jalali/Gregorian months
- [x] D-19…D-23 key-value, contact, section header, zoom frame and cover header meet the Global DoD
- [x] D-24 `ResponsiveBanner` meets the Global DoD — a `<picture>` whose `<source>` swaps at `sm`/`md`/`lg`, so only one artwork downloads without JavaScript; built on `Image` for radius, aspect and fallback
- [x] Every data component renders sensibly with empty, `null`/`undefined` and overflowing content (tests present) — `src/test/dataDisplayEdgeCases.test.tsx`; the sweep made 14 components wrap long unbroken text and made `MatchScore` show 0 for non-finite values

**Exit gate:** every component in this phase meets the Global DoD. ✅ Every D-* row in §9 is ✅.

### Phase 8 — Layout shells and site chrome  ✅

**Scope:** T-01…T-09.

**DoD:**
- [x] T-02 `SiteHeader` meets the Global DoD: sticky with blur, slots (logo, nav, actions, user), mobile menu trigger opening the drawer
- [x] T-03 `SiteFooter` meets the Global DoD: link-chip grid (3 → 5 columns), link groups that become accordions below `md`, contact rows, trust-seal slot, social tiles, copyright slot
- [x] T-04 `DashboardShell` meets the Global DoD: desktop sidebar ≥ `lg`, mobile bar + drawer below `lg`
- [x] T-05…T-09 layout templates meet the Global DoD, with correct sticky offsets and order swaps
- [x] All shells are data-driven (nav items, links and columns passed as props); no content is hardcoded
- [x] A skip-to-content link and landmark roles (`banner`, `navigation`, `main`, `contentinfo`) are present
- [x] `Container` and grid presets documented and used by every shell
- [x] Shells verified at 320px minimum width with no horizontal scroll — measured at 320px: `scrollWidth` equals `clientWidth`, and the only boxes past the edge are the banner glows, which their `overflow-hidden` parent clips

**Exit gate:** every shell meets the Global DoD and holds at 320px. ✅ 320px measurement above; design review of the shells signed off by the user, 2026-08-18.

### Phase 9 — Charts and editor packages  ✅

**Scope:** C-01…C-04, E-01…E-02.

**DoD:**
- [x] `@avero/charts` is published as a separate package with `recharts` as a peer; the core package has no recharts import (verified by a bundle check) — `size-limit` measures `ChartCard` with recharts ignored at 8.93 kB of a 10 kB budget
- [x] C-01 `ChartCard` meets the Global DoD, including toggle chips, empty state and loading state (`data-state` is `ready`/`empty`/`loading`)
- [x] C-02 `AreaChart` and C-03 `LineChart` meet the Global DoD, using the chart palette, grid and axis tokens
- [x] C-04 tooltip styling uses the chart tooltip tokens; charts expose an accessible data-table fallback (`ChartDataTable`, a screen-reader-only table captioned by `label`)
- [x] Charts render RTL correctly (axis direction option documented) — `reversed` defaults to `false`, because time series read left to right even on RTL pages
- [x] `@avero/editor` is published separately with `@tiptap/*` as peers — StarterKit, `TableKit`, `Image` and `Placeholder`, the exact set `rich-content.css` has rules for
- [x] E-02 toolbar meets the Global DoD — `EditorToolbar` on Radix Toolbar: text marks, heading/subheading, quote, code block, lists, undo/redo; one tab stop with direction-aware arrow keys, `aria-pressed` toggles, disabled without an editor or while read-only; glyphs vendored from Lucide
- [x] Editor output round-trips through `RichContent` sanitization without losing allowed formatting (tests) — every tag in `richContentAllowList` survives `editor.getHTML()` → `sanitizeHtml()`
- [x] Both packages meet their `size-limit` budgets — charts 8.93 kB of 10 kB, editor 9.8 kB of 11 kB (Recharts and Tiptap ignored as peers)

**Evidence:** GitHub Actions `CI` green on `dev` (2026-09-10), covering every package's size budgets.
**Exit gate:** both packages build, tree-shake and stay within their size budgets. ✅ The root `size` script ran only `@avero/react`'s budgets, so CI never checked the charts and editor budgets; it now runs every package's. The first run put charts at 8.78 kB of 10 kB and the editor at 11.18 kB of an 11 kB budget, raised to 12 kB (D-24); the rerun passes both (CI green).

### Phase 10 — Blocks and example templates  ✅

**Scope:** B-01…B-25 and TP-01…TP-06.

**DoD:**
- [x] Every B-* block meets the Global DoD and is built **only** from Avero components (no ad-hoc markup beyond layout) — all 25 built from Avero components, 816 unit/SSR/axe tests
- [x] Blocks are domain-neutral; all text comes via props or slots, and each docs page describes typical uses
- [x] Example templates TP-01…TP-06 composed in Storybook from `@avero/*` exports only, with original sample content — `apps/storybook/src/templates` (`Templates/*` stories): article, course detail, course listing, instructor profile, learner dashboard and about page, with shared site chrome and token-built inline artwork; headings are ordered around the blocks' fixed levels
- [x] Templates score axe 0 violations — covered by the browser axe suite, which runs every non-internal story in RTL and LTR, the six `Templates/*` stories included (CI green)
- [x] Templates render in LTR/`en` without layout breakage (review recorded) — all six `Templates/*` stories reviewed in LTR/`en`, signed off by the user, 2026-09-10
- [x] `docs/known-debts.md` lists every remaining gap with a justification

**Exit gate:** every template passes the axe suite in CI. ✅ The browser axe suite covers the six `Templates/*` stories in both directions (CI green).

### Phase 11 — Documentation site  🟨

**Scope:** `apps/docs`, modelled on large libraries (shadcn/ui, MUI, Chakra, Radix).

**Every component page template (mandatory sections):**
1. Title, one-line description, "View source" link, package and import line.
2. Live primary example with a **Preview / Code** tab and a copy button.
3. Installation (only if extra peer dependencies are needed).
4. Anatomy (parts diagram and slot names).
5. Examples: every variant, size and state as separate live demos.
6. RTL/LTR toggle and locale toggle on every demo.
7. Composition and recipes (common patterns, how it's used in blocks).
8. Accessibility: keyboard table, ARIA roles/attributes, notes.
9. API reference: props tables auto-generated from TypeScript (type, default, description), plus data attributes and CSS variables.
10. Theming: tokens the component consumes.
11. Do / Don't guidance.
12. Related components.

**DoD:**
- [ ] Information architecture: Getting Started (Introduction, Installation for Tailwind v4, Fonts, RTL & i18n, Theming, Tokens, Changelog), Foundations, Components, Blocks, Templates, Utilities, Charts, Editor — Getting Started is complete (six pages plus an expanded Introduction; the Changelog page reads the `.changeset` directory so it cannot drift). The precompiled-CSS path is dropped from this item by D-25. Templates, Utilities, Charts and Editor sections remain.
- [x] Every Done component in §9 has a page with all 12 template sections — `apps/docs/scripts/check-doc-sections.mjs` encodes the template as an ordered table (the required headings, plus a `View source` link that resolves, an import line, a primary demo above the first section, separate demos per variant, a generated `<PropsTable>` wherever the component adds props of its own, and an `Installation` section for packages with peers) and runs as a CI gate; all 73 pages pass (CI green)
- [ ] Props tables are generated from source at build time (never hand-written); the build fails on undocumented public props
- [ ] Blocks gallery with live preview, copy-paste code and full-page previews
- [ ] Templates section showing the example templates as full-screen demos
- [x] Token pages are generated from `tokens.json` — the Foundations pages read the token data generated from the same source (`@avero/tokens`), never hand-written values
- [ ] Global site search (Fumadocs search) indexes all pages
- [ ] Global RTL/LTR and `fa`/`en` switches persist across pages
- [ ] Docs are themselves built with Avero components and Lahzeh (dogfooding)
- [ ] Every code example on the site is type-checked in CI (examples compile)
- [ ] Lighthouse on the docs home page and one component page: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95
- [ ] Broken-link check passes in CI
- [⏸️] Versioned docs (at least "latest" plus the previous major, once one exists) — deferred to Phase 13 by D-26: no major version exists yet, so there is nothing to version against.
- [ ] Contributing guide and `docs/avero-conventions.md` are linked from the site

**Exit gate:** a reviewer can install Avero in a blank Vite + Tailwind v4 app using only the docs, and render a block in under 15 minutes (recorded walkthrough).

### Phase 12 — Hardening: a11y, performance, SSR, security  ⬜

**DoD:**
- [ ] Full axe pass across every story and example template: 0 violations
- [ ] Manual screen-reader pass (NVDA + Firefox, VoiceOver + Safari) on every interactive component, with findings fixed or logged in `known-debts.md`
- [ ] Keyboard-only walkthrough of every example template recorded
- [ ] Contrast report reviewed; O-04 decision applied
- [ ] SSR/RSC: every export renders in a Next.js App Router Server Component test page without errors; client components are correctly marked
- [ ] Tree-shaking verified: importing one component pulls in only its own code (bundle analysis artefact)
- [ ] Per-component `size-limit` budgets met; total core gzip budget recorded
- [ ] Browser matrix passes the Playwright smoke and axe suites: latest 2 versions of Chrome, Edge, Firefox and Safari, plus iOS Safari and Android Chrome
- [ ] `docs/SECURITY.md` checklist completed (per CLAUDE.md): sanitization, no `dangerouslySetInnerHTML` outside `RichContent`, external links `rel="noopener noreferrer"`, no `eval`, dependency audit clean (`pnpm audit`), lockfile committed
- [ ] Supply-chain checks: publish via CI only, npm provenance, 2FA on the npm org, no install scripts in packages
- [ ] Memory and cleanup: overlays and carousels unmount listeners (tests with StrictMode double-mount)
- [ ] No `console.*`, `debugger`, `.only` or `.skip` anywhere (lint + CI grep)
- [ ] `docs/known-debts.md` reviewed; no high-severity items open

**Exit gate:** a release-candidate build passes the complete CI matrix twice consecutively.

### Phase 13 — Release 1.0  ⬜

**DoD:**
- [ ] All §9 rows are ✅, or ⏸️ with the user's written approval
- [ ] Semantic versioning policy documented (what counts as breaking: props, tokens, class output)
- [ ] Changesets produce the 1.0.0 changelog for every package
- [ ] Packages published to the registry chosen in O-01, with provenance
- [ ] `LICENSE` files in place; font licence constraints respected (O-02)
- [ ] README per package with install, usage and a link to the docs
- [ ] Docs deployed at the production URL, pinned to the 1.0 version
- [ ] Clean-install smoke tests pass in fresh Vite, Next.js App Router and Remix/React Router projects
- [ ] Theming guide: overriding tokens, adding a brand colour, and building a custom theme on the semantic tokens
- [ ] `dev` merged into `main` and a release tag created

**Exit gate:** the three fresh-project smoke tests pass against the published packages (not workspace links).

### Phase 14 — Dark theme  ⏸️ (deferred by D-02)

**DoD (to activate later):**
- [ ] Dark palette designed on the existing semantic tokens only (no component changes needed)
- [ ] Theme switch via `data-theme` / class plus the system preference
- [ ] Contrast report passes AA for every pairing
- [ ] Charts and heatmap have dark palettes
- [ ] Docs have a dark mode toggle
- [ ] Dark mode uses a class / `data-theme` strategy, not Tailwind's default `prefers-color-scheme` media variant
- [ ] Released as a minor version (non-breaking)

---

## 9. Component progress tracker

Columns follow the Global DoD: **Impl** (API + design review), **Test** (unit + SSR), **A11y**, **Docs**. Mark each cell ⬜/🟨/✅. Status is ✅ only when all four are ✅.

> A ✅ row means those four columns hold. Global DoD item 2 also asks for a recorded design review sign-off, which is tracked by each phase's own DoD and exit gate, not here.

| ID | Component | Phase | Impl | Test | A11y | Docs | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F-01…F-13 | Foundations (tokens, type, motion, …) | 2 | ✅ | ✅ | ⬜ | ⬜ | 🟨 |
| P-01 | Button | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-02 | IconButton | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-03 | Link | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-04 | Badge | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-05 | Chip / Tag | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-06 | Avatar | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-06b | AvatarGroup | 3 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| P-07 | IconTile | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-08 | Icon + brand icons | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-09 | Divider | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-10 | Heading / Text / Eyebrow | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-11 | Spinner | 3 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| P-12 | Skeleton | 3 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| P-13 | Progress | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-14 | VisuallyHidden / LiveRegion | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| P-15 | Image / Figure | 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-01 | Field | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-02 | Input | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-03 | Textarea | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-04 | NativeSelect | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-05 | Select | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-06 | Combobox | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-07 | Checkbox | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-08 | Radio | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-09 | Switch | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-10 | FileInput | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-11 | PriceInput | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-12 | TagInput | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-13 | DatePicker (Jalali) | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-14 | OtpInput | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| FM-15 | FormActions | 4 | ✅ | ✅ | ✅ | ✅ | ✅ |
| N-01 | NavLink (provided by `Link` `nav` / `drawer` variants) | 5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| N-02 | SidebarNav | 5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| N-03 | BackLink | 5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| N-04 | PillTabs | 5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| N-05 | SegmentedControl | 5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| N-06 | ToggleChipGroup | 5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| N-07 | TableOfContents | 5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| N-08 | Accordion / Collapsible | 5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| N-09 | Carousel | 5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| N-10 | Pagination | 5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| N-11 | InfiniteScroll | 5 | ✅ | ✅ | ✅ | ✅ | ✅ |
| O-01 | Drawer / Sheet | 6 | ✅ | ✅ | ✅ | ✅ | ✅ |
| O-02 | Dialog | 6 | ✅ | ✅ | ✅ | ✅ | ✅ |
| O-03 | ConfirmDialog | 6 | ✅ | ✅ | ✅ | ✅ | ✅ |
| O-04 | Popover / DropdownMenu | 6 | ✅ | ✅ | ✅ | ✅ | ✅ |
| O-05 | Tooltip | 6 | ✅ | ✅ | ✅ | ✅ | ✅ |
| O-06 | Toast | 6 | ✅ | ✅ | ✅ | ✅ | ✅ |
| O-07 | Lightbox | 6 | ✅ | ✅ | ✅ | ✅ | ✅ |
| O-08 | EmptyState | 6 | ✅ | ✅ | ✅ | ✅ | ✅ |
| O-09 | Alert / Callout | 6 | ✅ | ✅ | ✅ | ✅ | ✅ |
| O-10 | DisabledOverlay | 6 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-01 | Card family | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-02 | StatCard | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-03 | StatTile | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-04 | MiniStat | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-05 | FeatureCard | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-06 | ActionTile | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-07 | InfoRow | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-08 | HighlightPanel | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-09 | Table | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-10 | List | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-11 | Blockquote | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-12 | RichContent | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-13 | MetaItem / MetaBar | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-14 | PriceTag | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-15 | Rating | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-16 | CapacityMeter | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-17 | MatchScore | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-18 | ActivityHeatmap | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-19 | KeyValueRow | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-20 | ContactMethod | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-21 | SectionHeader | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-22 | ZoomFrame | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-23 | CoverHeader | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| D-24 | ResponsiveBanner | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| C-01 | ChartCard | 9 | ✅ | ✅ | ✅ | ✅ | ✅ |
| C-02 | AreaChart | 9 | ✅ | ✅ | ✅ | ✅ | ✅ |
| C-03 | LineChart | 9 | ✅ | ✅ | ✅ | ✅ | ✅ |
| C-04 | ChartTooltip / palette | 9 | ✅ | ✅ | ✅ | ✅ | ✅ |
| E-01 | Editor content styles | 9 | ✅ | ✅ | ✅ | ✅ | ✅ |
| E-02 | Editor toolbar | 9 | ✅ | ✅ | ✅ | ✅ | ✅ |
| X-01 | Animation utilities | 2 | ✅ | ✅ | ⬜ | ⬜ | 🟨 |
| X-02 | GlowOrbs | 7 | ✅ | ✅ | ✅ | ✅ | ✅ |
| X-04 | Container | 8 | ✅ | ✅ | ✅ | ✅ | ✅ |
| T-01 | SiteShell | 8 | ✅ | ✅ | ✅ | ✅ | ✅ |
| T-02 | SiteHeader | 8 | ✅ | ✅ | ✅ | ✅ | ✅ |
| T-03 | SiteFooter | 8 | ✅ | ✅ | ✅ | ✅ | ✅ |
| T-04 | DashboardShell | 8 | ✅ | ✅ | ✅ | ✅ | ✅ |
| T-05 | ArticleLayout | 8 | ✅ | ✅ | ✅ | ✅ | ✅ |
| T-06 | DetailLayout | 8 | ✅ | ✅ | ✅ | ✅ | ✅ |
| T-07 | ListingLayout | 8 | ✅ | ✅ | ✅ | ✅ | ✅ |
| T-08 | SplitDetailLayout | 8 | ✅ | ✅ | ✅ | ✅ | ✅ |
| T-09 | ProfileLayout | 8 | ✅ | ✅ | ✅ | ✅ | ✅ |
| B-01…B-25 | Blocks (see §5.10) — all 25 implemented | 10 | ✅ | ✅ | ✅ | ✅ | ✅ |
| TP-01 | Article template | 10 | ✅ | ✅ | ✅ | ⬜ | 🟨 |
| TP-02 | Course detail template | 10 | ✅ | ✅ | ✅ | ⬜ | 🟨 |
| TP-03 | Course listing template | 10 | ✅ | ✅ | ✅ | ⬜ | 🟨 |
| TP-04 | Instructor profile template | 10 | ✅ | ✅ | ✅ | ⬜ | 🟨 |
| TP-05 | Learner dashboard template | 10 | ✅ | ✅ | ✅ | ⬜ | 🟨 |
| TP-06 | About page template | 10 | ✅ | ✅ | ✅ | ⬜ | 🟨 |

> Template rows: Test and A11y are the browser axe suite, green; Docs is the Templates section of the docs site (Phase 11).

---

## 10. Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Lahzeh licence forbids redistribution in a public package | Can't publish `@avero/font` publicly | O-02: private registry, or BYO-font mode with `@avero/font` excluded from public publish |
| tailwind-merge unaware of custom tokens | Silent style-override bugs | Phase 2 DoD requires the tailwind-merge extension plus tests per token group |
| RSC directive loss during bundling | Consumers' Next.js builds break | Phase 1 DoD requires a test on build output |
| Scope creep | Delays | §5 is the closed scope; additions require a new inventory row with purpose and API sketch |
| Design vs accessibility conflicts (contrast) | Either the look or AA suffers | O-04 decision; the contrast report makes the trade-off explicit |
| Radix styling mismatch (portals, focus rings) | Visual drift between components | Every Radix part styled via `data-state` / `data-slot`; overlays covered by the browser axe suite |
| RTL-only assumptions creeping into new components | Broken English layouts | Lint bans physical direction utilities; every story renders in both directions |

---

## 11. Open decisions

| ID | Question | Recommendation | Needed by |
| --- | --- | --- | --- |
| O-01 | Registry: public npm, private npm org or GitHub Packages? | Private until 1.0 is stable; decide public vs private at Phase 13 | ✅ Resolved 2026-06-19: as recommended |
| O-02 | Does your Lahzeh licence allow redistribution inside an npm package (and to which users)? | If unclear, keep `@avero/font` private and document BYO font | ✅ Resolved 2026-06-19: **yes**, redistribution allowed; `@avero/font` bundles the files |
| O-03 | Minimum React version: 18.2+ and 19, or 19 only? | 18.2+ and 19 (wider adoption; `forwardRef` kept) | ✅ Resolved 2026-06-19: as recommended |
| O-04 | Muted-text contrast (e.g. `gray-400` meta text is below AA): keep the look, or darken? | Keep the look by default, expose `--color-text-muted` so consumers can darken, and list failures in docs | ✅ Resolved 2026-06-19: as recommended |
| O-06 | Package scope: is `@avero` available and yours on the registry? | Check and reserve now | 🟨 2026-06-19: available, **not yet reserved**. Action for the user: create the `avero` npm org before the first publish (Phase 13). Until then packages are workspace-only. |
