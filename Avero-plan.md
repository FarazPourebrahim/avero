# Avero — Component Library Plan

> **Avero** is a production-grade React + Tailwind CSS v4 component library that reproduces, 1:1, the UI and design system of the reference website stored in `reference/` (8 saved pages of a Persian, RTL freelancing platform). The library is domain-neutral and reusable in any project, and ships with a full documentation site.

| Meta | Value |
| --- | --- |
| Plan version | 1.0 |
| Created | 2026-06-19 |
| Last updated | 2026-06-19 |
| Source of truth for visuals | `reference/**` (read-only, never modified) |
| Target stack | React 18.2+/19, TypeScript (strict), Tailwind CSS v4.3 (same major/minor as reference), Radix UI primitives, pnpm workspace |
| Default direction / locale | RTL / `fa-IR`, with full LTR / `en` support |

---

## Table of contents

1. [Progress tracker](#1-progress-tracker)
2. [Goals and non-goals](#2-goals-and-non-goals)
3. [Decision log](#3-decision-log)
4. [Reference analysis](#4-reference-analysis)
5. [Extracted design system](#5-extracted-design-system)
6. [Reference defects and the deviation register](#6-reference-defects-and-the-deviation-register)
7. [Component inventory](#7-component-inventory)
8. [Architecture](#8-architecture)
9. [Global Definition of Done (per component)](#9-global-definition-of-done-per-component)
10. [Phases with strict DoDs](#10-phases-with-strict-dods)
11. [Component progress tracker](#11-component-progress-tracker)
12. [Risks and mitigations](#12-risks-and-mitigations)
13. [Open decisions](#13-open-decisions)
14. [Appendices](#14-appendices)

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
| 0 | Reference audit and extraction | 🟨 | 9 / 12 | — | M | 2026-06-19 | |
| 1 | Workspace, tooling and CI | 🟨 | 15 / 16 | 0 | M | 2026-06-19 | |
| 2 | Design tokens and foundations | 🟨 | 9 / 15 | 1 | L | 2026-06-19 | |
| 3 | Core primitives | 🟨 | 0 / 9 | 2 | L | 2026-06-19 | |
| 4 | Forms | ⬜ | 0 / 10 | 3, 0.B | L | | |
| 5 | Navigation, disclosure and carousel | 🟨 | 0 / 9 | 3 | M | 2026-06-19 | |
| 6 | Overlays and feedback | ⬜ | 0 / 10 | 3, 0.B | L | | |
| 7 | Data display | ⬜ | 0 / 9 | 3 | L | | |
| 8 | Layout shells and site chrome | ⬜ | 0 / 9 | 5, 6, 7 | M | | |
| 9 | Charts and editor packages | ⬜ | 0 / 10 | 7 | M | | |
| 10 | Blocks, templates and replica pages (visual parity gate) | ⬜ | 0 / 10 | 4–9 | L | | |
| 11 | Documentation site | 🟨 | 0 / 14 | 3 (can start in parallel) | L | 2026-06-19 | |
| 12 | Hardening: a11y, performance, SSR, security | ⬜ | 0 / 13 | 10, 11 | M | | |
| 13 | Release 1.0 | ⬜ | 0 / 10 | 12 | S | | |
| 14 | Dark theme | ⏸️ | 0 / 8 | 13 | L | | |

**Overall:** 33 / 164 phase-DoD items (≈20%).

> Phase 3 note (2026-06-19): 13 primitives are implemented, unit/SSR/axe-tested (255 tests, 100% statements) and visually baselined locally, but no Phase 3 item is ticked yet. Docs pages with live RTL/LTR previews and generated props tables now exist for all 13; what remains is cross-platform visual baselines (KD-06).

---

## 2. Goals and non-goals

### Goals
1. **Visual fidelity.** Every component, token and pattern in the reference files is reproduced. Recreating the 8 reference pages with Avero alone must produce screenshots within the diff threshold defined in Phase 10.
2. **Completeness.** "Everything in the files" means everything observable in the 8 saved DOMs (Tier A) plus everything the shared compiled stylesheet and bundle prove exists on pages we don't have (Tier B, see §7). Nothing is left out silently. Every gap is tracked.
3. **Production quality.** Typed APIs, WCAG 2.2 AA behaviour, SSR/RSC-safe, tree-shakable, tested, versioned and documented.
4. **Reusable in any project.** Components use domain-neutral names (e.g. `ListingCard`, not `ServiceCard`) and have no business logic, API calls or hardcoded Persian strings.
5. **RTL-first, bidirectional.** Defaults match the reference (RTL, Persian digits and dates). LTR and English work without extra effort because every component uses logical CSS properties.

### Non-goals
- Reproducing the reference site's backend, data fetching, auth or routing.
- Inventing components that don't appear anywhere in the reference files (no speculative "nice to have" components).
- Dark theme in v1.0 (deferred to Phase 14 by decision D-02; the tokens are designed for it now).
- Copying the reference's brand identity (logo, name "دورلنسر", trust-seal images). Avero ships neutral placeholders; consumers bring their own brand.

---

## 3. Decision log

| ID | Decision | Choice | Rationale | Decided by / date |
| --- | --- | --- | --- | --- |
| D-01 | Font delivery | The user provides licensed Lahzeh `woff2` files. They are bundled in the optional `@avero/font` package. `@avero/tokens` declares `Lahzeh` with the reference's fallback stack. | The reference only links `font/lahzeh/*.woff(2)`; the files were not saved. Lahzeh is a commercial typeface. | User, 2026-06-19 |
| D-02 | Dark mode | Light theme only in v1.0, built entirely on semantic tokens so a dark theme can be added later (Phase 14). | The reference is light-only; its 35 stray `dark:` utilities come from Tailwind's default media variant, not a designed theme. | User, 2026-06-19 |
| D-03 | Interaction primitives | Headless **Radix UI** primitives for behaviour, with Avero's extracted styling on top. | The reference's hand-rolled menus, selects and drawers lack focus management and ARIA. Radix provides `DirectionProvider` for RTL. | User, 2026-06-19 (primitive family: Radix, chosen by plan) |
| D-04 | Documentation | Custom **Next.js + Fumadocs** docs app (`apps/docs`), plus internal Storybook (`apps/storybook`) for visual, interaction and a11y testing. | The user wants "big component library" style docs. | User, 2026-06-19 |
| D-05 | Styling engine | Tailwind CSS **v4** (the reference is compiled with `tailwindcss v4.3.0`), variants via `class-variance-authority`, class merging via `tailwind-merge` configured with Avero's custom tokens. | Same engine means identical generated CSS values. | Plan default |
| D-06 | Icons | `lucide-react` as a peer dependency (the reference uses Lucide: `lucide lucide-*` classes). Brand icons (Telegram, WhatsApp, LinkedIn, X, Instagram) ship as Avero SVG components. The reference uses Font Awesome paths via `react-icons`; licences must be verified. | Avoid pulling all of `react-icons` for 5 glyphs. | Plan default |
| D-07 | Charts | `@avero/charts`, an optional package wrapping **Recharts** (the reference uses Recharts). | Keeps the core free of heavy dependencies. | Plan default |
| D-08 | Rich text | `@avero/editor`, an optional package wrapping **Tiptap** (the reference uses Tiptap: `.tiptap-content`, `vendor-tiptap`). `RichContent` (the renderer) lives in core and always sanitizes. | Heavy dependency is optional; renderer is needed everywhere. | Plan default |
| D-09 | Carousel | **Embla Carousel** (headless), styled to match the reference's Swiper pagination and scroll-snap carousels. | Headless, matches D-03. The engine is invisible; only the styling must match. | Plan default |
| D-10 | Toasts | Radix Toast styled to match the reference's react-toastify light theme (see §6, R-14 for the font deviation). | One primitive family. | Plan default |
| D-11 | Visual-conflict rule | Avero reproduces **what the browser actually renders**, not what a broken class intended. The exception is when the rendered result is broken or unusable; those cases go in the deviation register (§6.2) for approval. | Keeps "looks exactly like" objective and testable. | Plan default |
| D-12 | Monorepo | pnpm workspace following `.claude/CLAUDE.md` (`apps/*`, `packages/*`). The `packages/contracts` package from CLAUDE.md is **not applicable** because there is no backend and no cross-app API contracts. | Follows the working agreement and records the deliberate omission. | Plan default |
| D-13 | Library build | **Changed from Vite library mode to the TypeScript compiler** (`tsc`, per-file ESM + `.d.ts`). Library source uses `.js`-suffixed relative imports (`module: NodeNext`). | No bundler plugins are needed to keep `"use client"` directives. Output is valid Node ESM and tree-shakes per file. | Implementation, 2026-06-19 |
| D-15 | `RichContent` sanitizer | **js-xss** (`xss`), not DOMPurify: an allowlist filter that needs no DOM, so the same code runs in the browser, in SSR and in tests. `isomorphic-dompurify` would pull jsdom (~10 MB) into every server bundle that renders stored HTML. | Sanitizing is mandatory (D-08) and must not cost a jsdom dependency on the server. | Implementation, 2026-07-05, approved by the user |
| D-14 | Toolchain pins | TypeScript ~6.0.3 (typescript-eslint supports `<6.1.0`); Node floor ≥ 22.12; jsdom ^28.1 and size-limit ^12.1 (newer majors need Node ≥ 22.18/22.22). | Keeps lint working and supports the local Node 22.16. | Implementation, 2026-06-19 |

---

## 4. Reference analysis

### 4.1 What the reference is built with (verified from the files)

| Evidence | Finding |
| --- | --- |
| `index-D-ggWoGk.css` header: `/*! tailwindcss v4.3.0 */` | Tailwind CSS v4.3.0, default v4 palette (display-p3 with hex fallbacks), default spacing `--spacing: .25rem` |
| `index-DIky2qDu.js.download` | React SPA built with Vite/Rolldown, lazy-loaded route chunks (169 chunk names) |
| Class names `lucide lucide-*` | Lucide icons (`vendor-icons`) |
| SVGs with viewBox `0 0 448 512` / `512 512` / `576 512` / `496 512` | Font Awesome glyphs (via `react-icons`): brands, blog meta icons, footer socials |
| `recharts-*` classes | Recharts (`vendor-charts`) |
| `.swiper-*`, `home-primary-*.css`, `home-tertiary-*.css`, `vendor-swiper-*.css` | Swiper core, pagination and navigation CSS |
| `.Toastify*` + `--toastify-*` | react-toastify (default light theme) |
| `.tiptap-content`, `vendor-tiptap` chunk | Tiptap rich-text editor |
| `yup`, `index.esm` chunks | Form validation (react-hook-form + yup) |
| `font.css` | Lahzeh font, weights 100, 200, 300, 400, 500, 600, 700, 800, 900 |
| `<html lang="fa" dir="rtl">`, `html{direction:rtl}` | RTL Persian UI |

### 4.2 Page map

The saved filenames don't always match their content (the SPA's title changed after navigation), so pages are identified by **content**:

| Ref ID | Saved file | Actual content | Key UI |
| --- | --- | --- | --- |
| R-01 | `برنامه_نویس Backend با Laravel _ PROJ-RLS694 _ دورلنسر.html` | **Blog article**: "What is freelancing?" | Article card, meta bar, prose (h2/h3/p/ol/ul/table/blockquote/figure), category chips, like button, share buttons, comments form and empty state, sticky TOC, author card, related posts |
| R-02 | `داشبورد فریلنسر _ دورلنسر.html` | **Freelancer dashboard** (no site header/footer) | Sidebar nav (active/idle/danger), greeting, mobile bar and drawer, stat cards, quick-action tiles, suggested projects with match %, achievements, notifications empty state, segmented tabs, chart cards (Recharts area/line), metric toggle chips, activity heatmap and legend, empty states |
| R-03 | `درباره ما _ داستان دورلنسر.html` | **About us / story** | Accent-bar page header, split hero (text + illustration), gradient label pill, primary and soft buttons, feature card grid, dark gradient CTA banner with blurred orbs |
| R-04 | `درباره من - فلاح _ دورلنسر.html` | **Freelancer profile: About** | Cover gradient header with overlapping avatar, premium gradient badge, meta chips, pill tabs, social icon buttons, stat tiles with side accent bars, section cards, skill tags, certificates list, empty text |
| R-05 | `طراحی سایت و سئو _ خدمات فریلنسری دورلنسر.html` | **Service detail** | Back button, soft pills, stat chips, like toggle, gallery with zoom overlay, rich content, contact-method chips, labelled share buttons, comments, price card, provider card with mini stats, related services, report card |
| R-06 | `فریلنسری چیست؟ … مقالات دورلنسر.html` | **Services marketplace list** | Section title, filter panel (input, custom select trigger, native select), promo banner, glass listing cards (image, category chip, title, excerpt, avatar, price, likes) |
| R-07 | `لیست پروژه_ها _ دورلنسر.html` | **Project detail** | Back link, mono ID and status badge, meta row, capacity progress, rich content, related-category tag links, reaction bar (like/view/cap/save), full-width inverse CTA, report link, related-projects carousel (snap, chevron buttons, dots, "capacity full" overlay state) |
| R-08 | `نمونه_کارهای فلاح _ دورلنسر.html` | **Freelancer profile: Portfolio** | Same profile header (different active tab), showcase cards (image zoom, hover gradient overlay CTA, tag, like/share/report actions) |
| Shared | R-01, 03–08 | **Site chrome** | Sticky blurred header (logo, nav, hamburger, avatar), mobile nav drawer, footer (skill-category chip grid, logo, quick links, contact rows, mobile accordions, about strip with trust-seal slot, copyright, social tiles), toast container |

### 4.3 Extraction statistics (from this audit)

- 2,353 distinct utility classes in the compiled CSS; 906 are used in the 8 DOMs; **1,572 are CSS-only**, i.e. they belong to states and pages we don't have (they are the evidence for Tier B).
- 248 arbitrary-value classes (e.g. `shadow-[0_10px_40px_rgba(15,23,42,0.08)]`).
- 14 custom keyframes plus 4 Tailwind defaults and 18 Toastify keyframes.
- About 70 distinct Lucide icons in the DOMs (list in Appendix C).
- Custom CSS outside utilities: `:root` brand variables, `.fancy-scroll`, `.comment-scroll`, `.scrollbar-hide`/`.no-scrollbar`, `.projects-home-pagination`, `.skeleton-shimmer`, `.premium-glow-ring`, `.typing-effect`, `.editor`, `.content-area`, `.question-rendered-content`, `.tiptap-content`, `.desktop-banner`/`.mobile-banner`, and the hero-illustration animations.

---

## 5. Extracted design system

Every value below was read from `reference/*_files/index-D-ggWoGk.css`, `font.css`, or the DOMs. Phase 2 turns each row into a token; Phase 2's DoD requires 100% coverage of these tables.

### 5.1 Color: brand and semantic (reference `:root` variables)

| Reference var | Value | Role | Avero token (proposed) |
| --- | --- | --- | --- |
| `--background` | `#f4f4f4` | Page background | `--color-background` |
| `--foreground` | `#464646` | Default body text | `--color-foreground` |
| `--bg-card` | `#ffffff6b` (white at 42%) | Glass card surface | `--color-surface-glass` |
| `--primary` | `#0a66c2` | Brand primary | `--color-primary` |
| *(literal)* `#004182` | `#004182` | Primary hover / gradient end | `--color-primary-hover` |
| `--secondary` | `#f15928` | Brand secondary (orange CTA, caret) | `--color-secondary` |
| `--shadow` | `#0a66c205` | Brand-tinted soft shadow colour | `--color-shadow-brand` |
| `--shadow-box` | `#0f172a14` | Box shadow colour | `--color-shadow-box` |
| `--border-link` | `#d5d9df` | Filter panel border | `--color-border-subtle` |
| `--text-header-footer` | `#242424` | Chrome headings, price text | `--color-text-strong` |
| `--text-link-footer` | `#8390a2` | Footer links and chips | `--color-text-chrome` |
| `--text-link-footer-hover` | `#242424` | Footer link hover | `--color-text-chrome-hover` |
| `--text-sub-footer` | `#54595f` | Footer subtext | `--color-text-subtle` |
| *(literal)* `#f9fafc` | `#f9fafc` | Footer surface, social tiles, accordions | `--color-surface-muted` |
| *(literal)* `#FF9606` | `#ff9606` | Footer social icon hover | `--color-accent-social` |
| *(literal)* `#F59E0B` / `#D97706` | amber (Tailwind **v3** values; v4's amber-500 is `#f99c00`) | Warning CTA and hover (CSS-only) | `--color-warning` / `--color-warning-hover` |
| *(literal)* `#E7E9EC` | `#e7e9ec` | Neutral surface (CSS-only) | `--color-surface-sunken` |
| `--hero-*` (17 vars) | see Appendix B | Animated hero illustration | `--color-hero-*` |

### 5.2 Color: Tailwind palette usage (DOM usage counts)

The reference uses the **default Tailwind v4 palette** as-is. Avero keeps the full palette (so reference class names work verbatim) and adds semantic aliases.

| Family | Main uses (count in DOMs) | Semantic role in Avero |
| --- | --- | --- |
| `gray` | 100 (471), 800 (406), 50 (402), 700 (149), 500 (123), 200, 600, 400, 900 | Default neutral: borders (`gray-100/200`), text (`gray-700/800/900`), muted text (`gray-400/500`), soft fills (`gray-50/100`) |
| `slate` | 100, 50, 600, 900, 400, 500, 700, 200, 800 | Neutral on profile, service and about pages |
| `zinc` | 600, 50, 200, 100, 800 | Neutral in dashboard chrome (icon buttons, nav items) |
| `indigo` | 400 (370, mostly heatmap), 600, 500, 50, 100, 200 | Accent: focus rings, TOC active, section icons, prose links |
| `blue` | 600, 50, 500, 200, 100, 700 | Info/active: profile tabs, tags, soft buttons |
| `emerald`, `amber`, `purple`, `rose`, `red`, `green`, `sky`, `cyan`, `teal`, `orange`, `pink`, `yellow`, `violet` | tints (`-50/-100`) + text (`-500/-600/-700`) | Categorical icon tiles, status, charts |

**Semantic aliases (proposed):** `success` = green-100/green-700 (status "published"), `danger` = red-100/red-700 and red-500 (logout, capacity full), `warning` = amber-50/amber-700, `info` = blue-50/blue-600, `accent` = indigo-600, `focus-ring` = indigo-500/20 (textarea) and blue-500/20 (select).

**Categorical tile palette** (dashboard and about pages): `blue`, `purple`, `amber`, `emerald`, `rose`, `indigo`, `slate`, each as `bg-{c}-50 text-{c}-600` (tile) or `from-{c}-500 to-{c}-600` (gradient tile). The gradient pairs used are: blue 500→600, purple 500→600, amber-500→orange-500, emerald 500→600, rose-500→pink-600, slate 600→700.

**Chart palette** (inline SVG in R-02): `#6366f1` indigo-500, `#f43f5e` rose-500, `#10b981` emerald-500, `#8b5cf6` violet-500, `#f59e0b` amber-500, `rgb(59,130,246)` blue-500, `rgb(236,72,153)` pink-500. Grid `#f1f5f9`, axis ticks `#94a3b8`.

**Heatmap scale:** `gray-100` → `emerald-200` → `emerald-400` → `emerald-500` → `emerald-700`; hover `ring-2 ring-indigo-400 ring-offset-1`.

**Gradients:**
- Cover: `from-blue-600 via-indigo-600 to-purple-700` plus overlay `from-black/40 via-transparent`.
- Dark CTA: `from-slate-900 via-indigo-950 to-slate-900` with orbs `bg-(--primary)/20` and `bg-cyan-500/20` using `blur-3xl`.
- Accent bar: `from-(--primary) to-cyan-500`.
- Label pill: `from-(--primary)/10 to-cyan-50`.
- Premium badge: `from-amber-500/10 via-yellow-500/20 to-amber-500/10`.
- Rank panel: `from-amber-50 to-orange-50`.
- Hero art box: `from-slate-50 to-indigo-50/50`.
- CSS-only primary: `from-[#0a66c2] to-[#004182]`.

### 5.3 Typography

| Property | Values |
| --- | --- |
| Family | `Lahzeh, Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif`; `a, button` forced to `Lahzeh` |
| Mono | Tailwind default mono stack (IDs like `PROJ-RLS694`, contact values); editor code uses `Fira Code, JetBrains Mono, monospace` |
| Weights | 100 Thin, 200 ExtraLight, 300 Light, 400 Regular, 500 Medium (dominant: 913 uses), 600 SemiBold, 700 Bold, 800 ExtraBold, 900 Black |
| Scale (Tailwind) | `xs` 12/16 (728 uses), `sm` 14/20 (486), `base` 16/24 (209), `lg` 18/28, `xl` 20/28, `2xl` 24/32, `3xl` 30/36, `4xl` 36/40, `5xl` 48/1, `8xl` 96/1 |
| Micro sizes (arbitrary) | 8px, 9px, 10px, 11px (45 uses), 12px, 13px, 14px, 15px, 22px → Avero tokens `text-4xs` (9px), `text-3xs` (10px), `text-2xs` (11px), `text-sm-plus` (13px), `text-md` (15px), `text-xl-plus` (22px); 8px, 12px and 14px map to existing values |
| Line heights | `leading-8` (2rem) is the Persian body standard (261 uses), `leading-7`, `leading-6`, `leading-5`, `snug` 1.375, `tight` 1.25, `relaxed` 1.625, arbitrary `1.5`, `2.2`; prose `1.8` |
| Tracking | `tight` −0.025em, `wider` 0.05em (uppercase eyebrow), `widest` 0.1em |
| Rendering | `text-rendering: optimizeLegibility`, antialiased, `min-width: 320px` |
| Heading patterns | Page title `text-xl md:text-3xl font-extrabold`; article h1 `text-2xl sm:text-3xl md:text-4xl font-bold leading-snug`; section `text-xl font-bold md:text-2xl`; card title `text-lg font-bold`; eyebrow `text-xs font-semibold tracking-wider uppercase text-cyan-400` |

### 5.4 Spacing and layout

- Spacing base is Tailwind v4's `--spacing: .25rem`. The reference uses non-standard steps like `h-70`, `gap-y-18`, `gap-y-30`, `max-h-250`, `px-18`, `w-110`, which v4 generates dynamically.
- **Container:** `w-full max-w-7xl` (80rem) with `px-4 sm:px-6 lg:px-8`, centred with `flex justify-center`. The dashboard uses `px-3 sm:px-6 lg:px-8`.
- **Page rhythm:** root `flex flex-col gap-y-10` (dashboard `gap-y-6 sm:gap-y-10`); section gaps `gap-y-10 md:gap-y-20`; card padding `p-6 sm:p-8` or `p-4 sm:p-6`; lists `space-y-4`/`space-y-6`.
- **Grids:**
  - Article: `lg:grid-cols-12` split 8/4.
  - Listing: 3/9 with a sticky filter aside (`md:sticky md:top-10`).
  - Project: `lg:grid-cols-4` split 1/3 with order swap.
  - Dashboard: `lg:grid-cols-3` split 1/2.
  - Card grids: `sm:grid-cols-2 lg:grid-cols-3|4|5|6`.
- **Sticky:** the header is `sticky top-12 z-50 backdrop-blur-2xl`. Article asides are `sticky top-28 h-fit`; the service aside is `lg:sticky lg:top-24`.
- **Breakpoints (Tailwind v4 default):** `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem. Custom: `max-width: 767px` (desktop/mobile banner swap), `max-width: 480px` (toast full width).

### 5.5 Radius

| Token | Value | Used for |
| --- | --- | --- |
| `rounded-xs` | 0.125rem | Heatmap cells (374 uses) |
| `rounded` / `rounded-sm` | 0.25rem | Filter input, native select |
| `rounded-md` | 0.375rem | Footer link chips, footer strip, social tiles (406 uses) |
| `rounded-lg` | 0.5rem | Icon tiles (small), tags, segmented items |
| `rounded-xl` | 0.75rem | Buttons, icon buttons, inputs, tags, sub-cards (165 uses) |
| `rounded-2xl` | 1rem | Cards (dashboard), textarea, nav items, images (110 uses) |
| `rounded-3xl` | 1.5rem | Primary content cards, profile header, cover avatar squircle |
| `rounded-full` | 9999px | Pills, avatars, progress, dots |
| Arbitrary | `28px`; `rounded-tl-[40px] rounded-br-[40px]` (asymmetric, CSS-only); side accent bars `rounded-tl-full rounded-bl-full` | Special shapes |

### 5.6 Elevation (shadows)

| Avero token (proposed) | Value | Used by |
| --- | --- | --- |
| `shadow-2xs` | `0 1px #0000000d` | Skill tags, tables |
| `shadow-xs` | `0 1px 2px 0 #0000000d` | Icon buttons, avatars, pills (37 uses) |
| `shadow-sm` / `md` / `lg` / `xl` / `2xl` | Tailwind v4 defaults (verify values in Phase 2) | Hover elevation (`hover:shadow-md` 37 uses), drawers (`2xl`) |
| `shadow-brand-soft` | `0 0 20px 0 var(--color-shadow-brand)` | Blog and dashboard cards (see R-02 in §6) |
| `shadow-brand-md` | `0 0 35px 0 var(--color-shadow-brand)` / `0 0 40px …` | CSS-only |
| `shadow-brand-hover` | `0 2px 35px 0 var(--color-shadow-brand)` | CSS-only hover |
| `shadow-card-soft` | `0 4px 25px rgba(0,0,0,.04)` | About hero card |
| `shadow-card-ambient` | `0 0 25px 0 rgba(0,0,0,.05)` | Profile header |
| `shadow-card-faint` | `0 4px 20px rgba(0,0,0,.02)` | Feature cards |
| `shadow-card-subtle` | `0 4px 20px rgba(0,0,0,.03)`, `0 2px 16px rgba(15,23,42,.06)`, `0 2px 12px 0 rgba(0,0,0,.08)` | CSS-only |
| `shadow-elevated` | `0 10px 40px rgba(15,23,42,.08)` (also `.06`, `0 10px 35px …`) | CSS-only panels |
| `shadow-float` | `0 20px 80px rgba(15,23,42,.08)`; hover `0 20px 60px rgba(15,23,42,.12)`, `0 8px 40px rgba(15,23,42,.12)`, `0 16px 35px rgba(15,23,42,.22)` | CSS-only hover lifts |
| `shadow-modal` | `0 25px 80px rgba(15,23,42,.2)` | CSS-only modal |
| `shadow-lightbox` | `0 25px 70px rgba(0,0,0,.35)` | CSS-only lightbox |
| `shadow-box` | `0 2px 4px var(--color-shadow-box)` | CSS-only |
| `shadow-pop` | `0 4px 15px -3px rgba(0,0,0,.1)`, `0 8px 40px rgba(0,0,0,.08)` | CSS-only dropdowns |
| Coloured | `shadow-md shadow-(--primary)/20`, `shadow-blue-500/20`, `shadow-indigo-100` | Primary buttons, active tabs |
| Drop shadows | `drop-shadow-sm`, `0 10px 30px rgba(0,0,0,.04)`, amber glows `0 1px 4px rgba(251,191,36,.35)`, `0 2px 8px rgba(234,179,8,.45)` | Illustrations, star/badge glow |

### 5.7 Motion

- **Durations:** 100, 150 (default), **200 (dominant: 845 uses)**, 300, 500, 700, 1000 ms.
- **Easings:** `ease-out` `cubic-bezier(0,0,.2,1)` (441), `ease-linear` (392), `ease-in-out` `cubic-bezier(.4,0,.2,1)`; default transition `.15s cubic-bezier(.4,0,.2,1)`.
- **Interaction patterns:**
  - Hover lift `-translate-y-0.5` / `-translate-y-1`.
  - Hover scale `1.02` / `1.03` / `1.05` (images 500ms).
  - Press `active:scale-[0.99]` / `[0.98]` / `group-active:scale-95`.
  - Chevron and arrow `rotate-180`; accordion `max-h-0 opacity-0` → open (and `grid-rows-[0fr]` → `[1fr]` CSS-only).
  - Drawer `translate-x-full` ↔ `0` over 300ms.
  - Pagination bullet width 8 → 28px over `.4s cubic-bezier(.4,0,.2,1)`.
- **Keyframes (custom):**

| Name | Spec | Utility |
| --- | --- | --- |
| `slide-up` | opacity 0→1, translateY 100%→0 | `animate-slide-up` .25s ease-out |
| `fade-in` | opacity 0→1, translateY 12px→0 | `animate-fade-in` .4s ease-out both (page enter) |
| `fade` | opacity 0→1, translateY −4px→0 | `animate-fade` .5s |
| `blink` | opacity 1→0→1 | `animate-blink` 1s step-end ∞ |
| `blink-caret` | border-color transparent ↔ `--secondary` | `.typing-effect`, `animate-blink-caret` .75s step-end ∞ |
| `sway` | fade in, float −6px, rotate 2deg, fade out | `animate-sway` 3s forwards |
| `shimmer` | background-position −200% → 200% | `.skeleton-shimmer` 1.6s linear ∞, gradient `#f1f5f9 → #e2e8f0 → #f1f5f9` |
| `spin-glow` | rotate 360 + glow `0 0 15–25px #6366f1 33–66%` | `.premium-glow-ring` 1.5s |
| `typing-left-hand` / `typing-right-hand` | ±2px, ±1deg jitter | `animate-typing-left` .22s / `-right` .18s |
| `coffee-steam-rise` | rise −20px, scaleX, skew, fade | `animate-steam` 3.5s |
| `leaf-sway` / `leaf-sway-alt` | rotate ±1.5deg | 6s / 7.5s |
| `monitor-light-pulse` | opacity .3 ↔ .55 | `animate-monitor-glow` 4s |
| Tailwind defaults | `spin`, `ping`, `pulse`, `bounce` | as Tailwind |

- **Reduced motion:** the reference has no `prefers-reduced-motion` handling. Avero adds it (deviation V-06).

### 5.8 Z-index scale (observed values → proposed named tokens)

`-z-10`, `-z-1`, `z-1`, `z-10` (raised), `z-20`, `z-30`, `z-40`, `z-50` (sticky header, drawers), `z-[60]`, `z-[100]`, `z-[105]`, `z-[110]`, `z-[115]`, `z-[120]` (overlay stack), `z-[999]`, `z-[2000]`, `z-[3000]`, `z-[9999]` (toasts: `--toastify-z-index`), `z-[10001]`. The final mapping to `--z-dropdown`, `--z-overlay`, `--z-modal`, `--z-popover`, `--z-toast` and `--z-max` is set after the Tier B captures show which element uses which layer.

### 5.9 Iconography

- Lucide at default 24px viewBox. Sizes seen: 14px (`w-3.5`), 16px (`w-4`), 18px (`sm:w-[18px]`), 20px (`w-5`), 24px (`w-6`). Default stroke 2; `stroke-[2.5]`, `stroke-[3]`, `stroke-[3.5]` appear CSS-only.
- Filled star: `fill-amber-400 text-amber-400`.
- Brand icons (Font Awesome paths): Telegram, WhatsApp, LinkedIn, X, and three footer socials (viewBox 448/512).

### 5.10 Scrollbars and utilities

- `.fancy-scroll`: thin, thumb `#0f172a59`, track `#94a3b80f`, 8px webkit, 2px white-ish border, radius 999px, hover `#0f172a80`.
- `.comment-scroll`: 4px, thumb `#d1d5db`, radius 8px.
- `.scrollbar-hide` / `.no-scrollbar`: hidden scrollbars.
- `tailwind-scrollbar` plugin classes (`scrollbar-thin`, `scrollbar-thumb-*`, `scrollbar-track-*`) appear CSS-only.
- `.line-clamp-2` override, `[word-break:break-word]`, `.desktop-banner` / `.mobile-banner` swap at 767px.

### 5.11 Rich-content (prose) styles

Three overlapping systems exist in the reference and are unified into one `RichContent` style (with the exact per-context values preserved as variants):

- **`.content-area` (rendered article, service and project descriptions):**
  - `h2`: `text-xl sm:text-2xl font-bold mt-6 mb-3 leading-snug`; `h3`: `text-lg sm:text-xl font-bold mt-5 mb-2.5`.
  - `p`: `text-base text-gray-700 leading-8 mb-4`; `strong`: `font-bold text-gray-900`.
  - `ol`/`ul`: `list-outside pr-6 sm:pr-7 space-y-2 my-3`, `li` `leading-8 my-1`.
  - `blockquote`: `border-r-4 border-indigo-500 bg-indigo-50/30 italic py-2.5 rounded-l-lg` with quote icon `text-indigo-400/40`.
  - `figure img`: `rounded-xl shadow-md mx-auto`.
  - Links: `text-indigo-600 underline hover:text-indigo-800`.
  - Tables: responsive wrapper `overflow-x-auto rounded-xl border border-gray-200`; `th` `bg-gray-100 p-2.5 font-bold`; `td` `border border-gray-200 p-2.5 align-top`; row `hover:bg-gray-50/50`.
- **`.editor`:** h1 1.75rem/800, h2 1.4rem/700, p line-height 1.8rem, links `#2563eb`, blockquote `border-right 3px #3b82f6`.
- **`.tiptap-content .tiptap`:**
  - p `.95rem/1.8 #374151`; h1 `1.75rem/800 #111827`; h2 `1.4rem/700 #1f2937`; h3 `1.15rem/600 #374151`.
  - `pre`: LTR, bg `#1e293b`, text `#86efac`, radius .75rem. Inline `code`: `#dc2626` on `#f3f4f6`.
  - `hr` 2px `#e5e7eb`; tables with selected-cell overlay `#6366f126`; placeholder `#9ca3af`; selected node outline `2px #6366f1`.

---

## 6. Reference defects and the deviation register

### 6.1 Defects found in the reference (verified in the compiled CSS)

| ID | Where | Defect | What the browser renders | Avero behaviour (per D-11) |
| --- | --- | --- | --- | --- |
| R-01 | About CTA `hover:bg-(--primary-hover)` | `--primary-hover` is never defined | On hover the background becomes transparent, leaving white text on a light card (broken) | **Deviation V-01:** use `--color-primary-hover: #004182` |
| R-02 | Blog and dashboard cards `shadow-[0_0_20px_0_(--shadow)]` | Compiles to `var(--tw-shadow-color,(--shadow))`, which is invalid | No shadow | Ship `shadow-brand-soft` (a 2%-alpha colour, visually indistinguishable). Visual tests tolerate it. |
| R-03 | Footer strip `shadow-[0px_2px_20x_0px_…]` | `20x` typo compiles to `20dppx` (invalid) | No shadow | Same as R-02 |
| R-04 | Listing price `font-[15px]` | Compiles to `font-weight:15px` (invalid) | Bold (from `font-bold`) at the inherited 13px | Reproduce the rendered result; expose a `size` prop |
| R-05 | Prose h2 `text-gray-850` | Colour doesn't exist, so nothing is compiled | Inherits `text-gray-700` from `.content-area` | Reproduce the rendered result (gray-700); document it |
| R-06 | Capacity overlay `bg-bg-[var(--bg-card)]/40` | Typo, not compiled | Only `backdrop-blur-[1px]` applies | Reproduce the rendered result |
| R-07 | Comment submit `hover:bg-[var(--primary)]` | Same as base colour | No hover feedback | **Deviation V-02:** hover to `primary-hover` |
| R-08 | Listing card excerpt | Raw HTML shown as text (`"<p>…"`) | Visible tags | **Deviation V-03:** `ListingCard` strips HTML from excerpts |
| R-09 | Everywhere | Physical properties in RTL (`pr-6`, `border-r-4`, `mr-auto`, `text-right`, `left-0`) | Correct in RTL only | Logical properties (`ps/pe`, `border-s`, `ms-auto`, `text-start`); identical in RTL, correct in LTR |
| R-10 | Header/drawers/menus | Icon buttons without accessible names, drawers without focus trap or `aria-modal`, custom select without listbox semantics, `div role="link"`, accordions without `aria-expanded`, heatmap cells not exposed | — | **Deviation V-04:** Radix semantics; visuals unchanged |
| R-11 | Global CSS | `.swiper-wrapper{align-items:stretch!important}`, `.swiper-slide{height:auto!important}` leak globally | — | Scoped to the Avero carousel only |
| R-12 | Global CSS | Custom `.line-clamp-2` duplicates Tailwind's utility | — | Use Tailwind's utility |
| R-13 | Neutrals | `gray`, `slate` and `zinc` are used interchangeably for the same roles | — | Keep per-component fidelity, route through semantic tokens, document it |
| R-14 | Toasts | `--toastify-font-family: sans-serif`, so toasts don't use Lahzeh | System sans | **Deviation V-05:** toasts use Lahzeh (pending approval) |
| R-15 | Muted text | `text-gray-400` (#99a1af) on white is below the WCAG AA 4.5:1 ratio for small text | Low contrast | Open decision O-04 |
| R-16 | Digits | Persian and Latin digits are mixed ("5 دقیقه", "0 از 15" vs "۲۰٬۰۰۰٬۰۰۰") | Inconsistent | `formatNumber` utility with `digits: "fa" \| "latn"`; defaults reproduce the reference per component |
| R-17 | Header `sticky top-12` | A 48px offset suggests a top bar that isn't in any capture | Gap above the header | Confirm via Tier B capture (C-01) |
| R-18 | Motion | No `prefers-reduced-motion` handling | Always animated | **Deviation V-06:** respect reduced motion |

### 6.2 Deviation register (needs your approval)

| ID | Change vs rendered reference | Default | Status |
| --- | --- | --- | --- |
| V-01 | Primary hover uses `#004182` instead of a transparent background | Apply | ✅ Approved 2026-06-19 |
| V-02 | Primary submit gets a hover state | Apply | ✅ Approved 2026-06-19 |
| V-03 | Excerpts strip HTML tags | Apply | ✅ Approved 2026-06-19 |
| V-04 | Accessibility semantics added (no visual change) | Apply | ✅ Approved 2026-06-19 |
| V-05 | Toasts use Lahzeh | Apply | ✅ Approved 2026-06-19 |
| V-06 | Animations disabled or reduced under `prefers-reduced-motion` | Apply | ✅ Approved 2026-06-19 |
| V-07 | `Select`'s listbox (open state) is designed from the token system: the reference only ever renders the closed trigger, so there is nothing to reproduce. The trigger itself still matches the reference exactly. | Apply | 🟨 Proposed 2026-07-05 |
| V-08 | Form controls gain an invalid state (red border and ring under `aria-invalid`), which the reference never renders | Apply | 🟨 Proposed 2026-07-05 |
| V-10 | `--z-drawer` is raised from the reference's `50` to `70`. The reference puts drawers on the same layer as the sticky header and below dropdowns (`60`), so a drawer can render underneath both; a layering check script now enforces the order. | Apply | 🟨 Proposed 2026-07-05 |
| V-09 | `Drawer` renders a dimmed scrim behind the panel. The reference has no backdrop element at all (no `bg-black/*` anywhere), so its drawers leave the page clickable behind them — a focus-trap and click-outside bug. The panel itself still matches the reference exactly. | Apply | 🟨 Proposed 2026-07-05 |

---

## 7. Component inventory

**Tiers:**
- **A (observed):** full markup and styling exist in the 8 DOMs. It can be built to pixel parity now.
- **B (inferred):** proven to exist by the compiled CSS (CSS-only classes) and/or bundle chunk names (e.g. `ConfirmDialog`, `PersianDatePicker`), but the markup and open states were not captured. **These are blocked on Phase 0.B (additional captures).** Building them without captures would be guessing, which violates the "exactly like" goal.

**Naming:** components are domain-neutral. The reference name is kept as an alias in the docs ("Reference: *Service card*").

### 7.1 Foundations (F)
| ID | Item | Tier | Source |
| --- | --- | --- | --- |
| F-01 | Color tokens (brand, semantic, palette, categorical, chart, heatmap, gradients) | A | CSS `:root`, DOMs |
| F-02 | Typography (Lahzeh, scale, micro sizes, leading, heading patterns) | A | `font.css`, CSS |
| F-03 | Spacing, container, page rhythm, grid presets | A | DOMs |
| F-04 | Radius scale | A | CSS |
| F-05 | Elevation (shadows, drop shadows) | A | CSS |
| F-06 | Motion (durations, easings, keyframes, animation utilities) | A | CSS |
| F-07 | Z-index scale | A/B | CSS |
| F-08 | Breakpoints | A | CSS |
| F-09 | Iconography (Lucide sizing + brand icon set) | A | DOMs |
| F-10 | Scrollbar styles (`fancy`, `thin`, `hidden`) | A | CSS |
| F-11 | Global base (body, font smoothing, smooth scroll, `min-width`) | A | CSS |
| F-12 | Direction and locale (RTL/LTR, Persian digits, Jalali dates, toman formatting) | A | DOMs |
| F-13 | Prose / rich-content typography | A | CSS, R-01/05/07 |

### 7.2 Primitives (P)
| ID | Component | Variants / notes | Tier | Source |
| --- | --- | --- | --- | --- |
| P-01 | `Button` | `primary` (solid, `rounded-xl`, `shadow-md shadow-primary/20`), `secondary` (orange drawer CTA), `soft` (slate-100), `ghost` (gray-500 → primary), `outline` (slate-200 → primary border+text), `danger-soft` (red-50/rose-50), `inverse` (primary → glass on hover), `warning` (amber, CSS-only); sizes `xs`/`sm`/`md`/`lg`/`block`; radius `xl`/`2xl`; `loading`, `disabled`, leading/trailing icon, `asChild` | A | R-01/03/05/07 |
| P-02 | `IconButton` | `chrome` (zinc-50 + zinc-200/50 border + shadow-xs), `soft-tinted` (gray/blue/green share), `circle-outline` (carousel), `social` (slate-100 → blue-600), `tile` (footer `#f9fafc` → `#FF9606`); sizes 32/36/40 | A | R-01/02/04/07 |
| P-03 | `Link` | `nav` (gray-600 → primary), `prose` (indigo underline), `muted` (text-chrome → hover), `back` | A | all |
| P-04 | `Badge` | `status` (success/danger/neutral), `soft-bordered` (indigo/emerald/amber), `counter`, `premium` (amber gradient + pulsing sparkles), `label` (primary→cyan gradient), `overlay` (black/60 blur) | A | R-01/04/05/07 |
| P-05 | `Chip` / `Tag` | static (gray-100 rounded-full), `link` (blog category), `icon-link` (tag icon, slate-50 → blue), `footer` (bordered `rounded-md`), `mini` (10px rounded-lg), `skill` (blue-50 + blue-100 border) | A (removable: B) | R-01/04/06/07/08 |
| P-06 | `Avatar` | sizes 28/40/48/56/64/80/96/112/176; `circle` / `squircle` (2xl/3xl); borders (white-4, gray-500/20-4, indigo-100-2); hover ring; fallback | A | all |
| P-06b | `AvatarGroup` | overlapping `-space-x-3` | B | CSS |
| P-07 | `IconTile` | categorical colours × sizes 28/32/36/40/48; `soft` / `gradient`; `lg`/`xl` radius | A | R-02/03/04 |
| P-08 | `Icon` + brand icons | size scale, `aria-hidden` default | A | all |
| P-09 | `Divider` | `border-gray-100`, `border-slate-100`, `border-gray-200` | A | all |
| P-10 | `Heading`, `Text`, `Eyebrow` | patterns from §5.3 | A | all |
| P-11 | `Spinner` | `animate-spin`, `premium-glow-ring` variant | B | CSS, `LoadingSpinner` chunk |
| P-12 | `Skeleton` | `shimmer`, `pulse`; `SkeletonCard` preset | B | CSS, `SkeletonCard` chunk |
| P-13 | `Progress` | linear `h-2 bg-gray-100 rounded-full`, primary fill, width transition | A | R-07 |
| P-14 | `VisuallyHidden`, `LiveRegion` | `sr-only` announcer (`#blog-action-live`) | A | R-01 |
| P-15 | `Image` / `Figure` | hover zoom, rounded variants, fallback, `aspect-*` (16/9, 4/3, 9/16, 9/15, 280/454) | A (aspects: B) | all |

### 7.3 Forms (FM)
| ID | Component | Tier | Source |
| --- | --- | --- | --- |
| FM-01 | `Field` (label, description, error, required) | B | `FormField` chunk, CSS |
| FM-02 | `Input` (filter style, search) | A | R-06 |
| FM-03 | `Textarea` (gray-50, `rounded-2xl`, indigo focus ring) + a slate variant | A | R-01/05 |
| FM-04 | `NativeSelect` | A | R-06 |
| FM-05 | `Select` (custom trigger `rounded-xl`, chevron rotate, blue focus ring) | A (trigger) / B (listbox) | R-06 |
| FM-06 | `Combobox` (searchable select, category variant) | B | `SearchableSelect`, `SearchableCategorySelect`, `FilterSelect` chunks |
| FM-07 | `Checkbox` (`accent-indigo-600`) | B | CSS |
| FM-08 | `Radio` (`accent-rose-600`) | B | CSS |
| FM-09 | `Switch` (`translate-x-5`) | B | CSS |
| FM-10 | `FileInput` / upload (`file:` variants: blue-50/purple-600) | B | CSS, `ImageEditors` chunk |
| FM-11 | `PriceInput` (toman, thousands separators) | B | `PriceInput` chunk |
| FM-12 | `TagInput` | B | `SkillTagInput` chunk |
| FM-13 | `DatePicker` (Jalali) | B | `PersianDatePicker` chunk |
| FM-14 | `OtpInput` | B | `AuthOtp` chunk |
| FM-15 | `FormActions` row (hint text + submit) | A | R-01 |

### 7.4 Navigation and disclosure (N)
| ID | Component | Tier | Source |
| --- | --- | --- | --- |
| N-01 | `NavLink` (header, drawer with icon) | A | shared |
| N-02 | `SidebarNav` + `SidebarNavItem` (`active`: primary bg + white + shadow-md; `idle`: zinc-600 → primary/10; `danger`: red-500 → red-500/95 + white) | A | R-02 |
| N-03 | `BackLink` / back button (3 styles) | A | R-01/05/07 |
| N-04 | `PillTabs` (link tabs, horizontally scrollable, icon + count; active blue-600) | A | R-04/08 |
| N-05 | `SegmentedControl` (gray-100 track, white active, indigo text) | A | R-02 |
| N-06 | `ToggleChipGroup` (chart metric toggles, coloured active) | A | R-02 |
| N-07 | `TableOfContents` (active `border-s-2 indigo-500`, nested level indent) | A | R-01 |
| N-08 | `Accordion` / `Collapsible` (footer style: `#f9fafc`, arrow rotate, `max-h` transition) | A | shared footer |
| N-09 | `Carousel` (Embla; snap; chevron controls; dot and pill pagination) | A (dots, snap) / B (pill bullets) | R-07, CSS |
| N-10 | `Pagination` | B | `Pagination` chunk |
| N-11 | `InfiniteScroll` sentinel | B | `InfiniteScrollSentinel` chunk |

### 7.5 Overlays and feedback (O)
| ID | Component | Tier | Source |
| --- | --- | --- | --- |
| O-01 | `Drawer` / `Sheet` (start/end side, widths `w-2/3`, `75%`/`sm:1/2`/`max-w-sm`, header, body, 300ms slide) | A (closed state) | shared, R-02 |
| O-02 | `Dialog` / `Modal` (`fixed inset-0 bg-black/50`, blur, `max-h-[90vh]`, `rounded-3xl`, `shadow-modal`) | B | CSS, `*Modal` chunks |
| O-03 | `ConfirmDialog` | B | `ConfirmDialog` chunk |
| O-04 | `Popover` / `DropdownMenu` (notification bell menu) | B | R-02 bell, CSS |
| O-05 | `Tooltip` (generic) + chart tooltip | B / A (chart) | CSS, R-02 |
| O-06 | `Toast` / `Toaster` | A (container) / B (visual states) | all pages, CSS |
| O-07 | `Lightbox` (gallery zoom, `cursor-zoom-in`/`-out`, black/90–95) | B | R-05, CSS |
| O-08 | `EmptyState` (inline text, icon + text, icon-in-circle, "coming soon") | A | R-01/02/04/05 |
| O-09 | `Alert` / `Callout` (tinted, bordered) | B | CSS |
| O-10 | `DisabledOverlay` ("capacity full" blur + badge) | A | R-07 |

### 7.6 Data display (D)
| ID | Component | Tier | Source |
| --- | --- | --- | --- |
| D-01 | `Card` (`surface` rounded-3xl white + border-slate/gray-100; `glass` bg-card + white border → white; `flat` rounded-2xl bordered; `muted` slate-50/80) + `CardHeader`/`CardTitle`/`CardBody`/`CardFooter` | A | all |
| D-02 | `StatCard` (label + icon tile + value) | A | R-02 |
| D-03 | `StatTile` (icon tile + big value + label; side accent bars on container) | A | R-04 |
| D-04 | `MiniStat` (centred label + value) | A | R-05 |
| D-05 | `FeatureCard` (icon tile + title + text; hover border primary/30 + shadow-md) | A | R-03 |
| D-06 | `ActionTile` (gradient icon; hover fills with gradient; lift) | A | R-02 |
| D-07 | `InfoRow` (tinted row + icon tile + label/value) | A | R-02 |
| D-08 | `HighlightPanel` (amber gradient rank panel) | A | R-02 |
| D-09 | `Table` (responsive, bordered, header tint, row hover) | A | R-01 |
| D-10 | `List` (ordered/unordered prose lists) | A | R-01/07 |
| D-11 | `Blockquote` | A | R-01 |
| D-12 | `RichContent` (sanitized HTML renderer; variants `content`, `editor`, `question`) | A | R-01/05/07 |
| D-13 | `MetaItem` / `MetaBar` (icon + label + value; blog meta bar; project meta row; pill-meta) | A | R-01/04/05/07 |
| D-14 | `PriceTag` (large black primary + currency; inline "از … تومان") | A | R-05/06 |
| D-15 | `Rating` / score (filled star + value) | A | R-04/05 |
| D-16 | `CapacityMeter` (label, count, progress, "x sent / max y", status pill) | A | R-07 |
| D-17 | `MatchScore` (percentage + caption) | A | R-02 |
| D-18 | `ActivityHeatmap` + legend (12 months × 7 weekdays, Persian weekday initials) | A | R-02 |
| D-19 | `KeyValueRow` (footer contact rows, LTR values) | A | shared |
| D-20 | `ContactMethod` chip (icon + label + mono LTR value) | A | R-05 |
| D-21 | `SectionHeader` (`accent-bar` + subtitle, `dot`, `icon`, `plain`, with actions slot) | A | R-02/03/04/06/07 |
| D-22 | `ZoomFrame` (hover dim + "view zoom" pill) | A | R-05 |
| D-23 | `CoverHeader` (gradient cover + overlapping avatar) | A | R-04/08 |
| D-24 | `ResponsiveBanner` (desktop/mobile image swap) | B | CSS |

### 7.7 Charts: `@avero/charts` (C)
| ID | Component | Tier | Source |
| --- | --- | --- | --- |
| C-01 | `ChartCard` (title, toggle chips, body, empty state) | A | R-02 |
| C-02 | `AreaChart` | A | R-02 |
| C-03 | `LineChart` | A | R-02 |
| C-04 | `ChartTooltip`, axis/grid styling, palette | A | R-02 |

### 7.8 Editor: `@avero/editor` (E)
| ID | Component | Tier | Source |
| --- | --- | --- | --- |
| E-01 | `RichTextEditor` content styles (headings, lists, code, tables, placeholder, selection) | A (CSS) | CSS |
| E-02 | Editor toolbar and chrome | B | `RichTextEditor`, `QuestionRichEditor` chunks |

### 7.9 Effects and illustration (X)
| ID | Item | Tier | Source |
| --- | --- | --- | --- |
| X-01 | Animation utilities (`fade-in`, `fade`, `slide-up`, `sway`, `blink`, `blink-caret`/typing effect) | A (CSS) | CSS |
| X-02 | `GlowOrbs` background decoration | A | R-03 |
| X-03 | Animated hero illustration (`--hero-*` tokens, typing hands, steam, leaves, monitor glow) | B | CSS (home page not captured) |

### 7.10 Blocks: composed, copy-paste-able (B)
| ID | Block | Reference alias | Tier | Source |
| --- | --- | --- | --- | --- |
| B-01 | `ListingCard` | Service card | A | R-06 |
| B-02 | `ShowcaseCard` | Portfolio card | A | R-08 |
| B-03 | `OpportunityCard` (+ full/disabled state) | Project card | A | R-07 |
| B-04 | `SuggestionItem` | Suggested project | A | R-02 |
| B-05 | `PostListItem` | Related blog | A | R-01 |
| B-06 | `AuthorCard` | Author box | A | R-01 |
| B-07 | `ProviderCard` | Service provider | A | R-05 |
| B-08 | `CommentSection` (header + count, form, empty; list items: B) | Comments | A/B | R-01/05, `Comments` chunk |
| B-09 | `ShareBar` (`icon` and `labelled` variants) | Share | A | R-01/05 |
| B-10 | `ReportCard` / `ReportAction` | Report violation | A | R-05/07/08 |
| B-11 | `FilterPanel` | Filters | A | R-06 |
| B-12 | `PromoBanner` | Sidebar banner | A | R-06/07 |
| B-13 | `CtaBanner` (dark gradient + orbs + eyebrow) | Mission | A | R-03 |
| B-14 | `SplitHero` | About hero | A | R-03 |
| B-15 | `FeatureGrid` | Why us | A | R-03 |
| B-16 | `QuickActions` | Dashboard shortcuts | A | R-02 |
| B-17 | `ProfileHeader` (cover, avatar, name, badge, meta, tabs, socials) | Freelancer header | A | R-04/08 |
| B-18 | `WelcomeCard` / greeting | Dashboard greeting | A | R-02 |
| B-19 | `ReactionBar` (like, views, cap, save) | Project actions | A | R-07 |
| B-20 | `ArticleHeader` (image, title, meta bar) | Blog header | A | R-01 |
| B-21 | `CategoryLinks` (header + tag links) | Related categories | A | R-07 |
| B-22 | `ContactMethods` panel | Direct contact | A | R-05 |
| B-23 | `PriceCard` | Base price | A | R-05 |
| B-24 | `RelatedList` | Related services | A | R-05 |
| B-25 | `AchievementsPanel` | Rank & achievements | A | R-02 |

### 7.11 Layout shells and templates (T)
| ID | Template | Tier | Source |
| --- | --- | --- | --- |
| T-01 | `SiteShell` (`SiteHeader`, `MobileNav`, `main`, `SiteFooter`) | A | shared |
| T-02 | `SiteHeader` (sticky blur, logo slot, nav, menu button, user slot) | A | shared |
| T-03 | `SiteFooter` (link-chip grid, brand column, link groups, contact column, mobile accordions, about strip, trust-seal slot, copyright, social tiles) | A | shared |
| T-04 | `DashboardShell` (sidebar, greeting, mobile bar, drawer, content card) | A | R-02 |
| T-05 | `ArticleLayout` (8/4 + sticky aside) | A | R-01 |
| T-06 | `DetailLayout` (8/4 + sticky aside) | A | R-05 |
| T-07 | `ListingLayout` (3/9 + sticky filters) | A | R-06 |
| T-08 | `SplitDetailLayout` (1/3 of 4 with order swap) | A | R-07 |
| T-09 | `ProfileLayout` | A | R-04/08 |
| T-10 | Replica pages RP-01…RP-08 (the 8 reference pages rebuilt with Avero, used for the parity gate) | A | all |

---

## 8. Architecture

### 8.1 Repository layout (follows `.claude/CLAUDE.md`)

```
complib/
├── package.json              # per-app cd-scripts (docs-dev, storybook-dev, replica-dev, …); no bare "dev"
├── pnpm-workspace.yaml       # apps/*, packages/*
├── Avero-plan.md             # this file
├── reference/                # READ-ONLY source of truth (never edited)
├── docs/                     # project rules (read before work)
│   ├── avero-conventions.md  # API, naming, styling, RTL rules for contributors
│   ├── reference-inventory.md# generated inventory with source pointers
│   ├── deviations.md         # mirror of §6 (approved deviations)
│   ├── known-debts.md
│   └── SECURITY.md
├── packages/
│   ├── config/               # @avero/config – shared tsconfig, eslint, prettier, tailwind-merge config
│   ├── tokens/               # @avero/tokens – theme.css (@theme), base.css, tokens.json (DTCG), tokens.ts
│   ├── font/                 # @avero/font – Lahzeh @font-face + licensed woff2 (see O-02)
│   ├── react/                # @avero/react – all core components, hooks, utils, icons
│   ├── charts/               # @avero/charts – Recharts wrappers (peer: recharts)
│   └── editor/               # @avero/editor – Tiptap editor (peer: @tiptap/*)
└── apps/
    ├── docs/                 # Next.js + Fumadocs public documentation
    ├── storybook/            # internal: stories, interaction + a11y + visual tests
    └── replica/              # Vite app rebuilding the 8 reference pages with Avero only
```

- Workspace packages use the named scope `@avero/*`. App-internal imports use `@/…`. This is consistent with CLAUDE.md's alias convention.

### 8.2 Package internals (`@avero/react`)

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
├── layouts/                      # T-* shells
├── hooks/                        # useControllableState, useDirection, useMediaQuery, …
├── utils/                        # cn (tailwind-merge configured), format (digits, toman, jalali), sanitize
├── i18n/                         # AveroProvider, dictionaries: fa.ts, en.ts
├── icons/                        # brand SVG icons
└── index.ts                      # public surface (named exports only)
```

### 8.3 Styling and consumption

- **Tailwind v4 consumers (primary path):**
  ```css
  @import "tailwindcss";
  @import "@avero/tokens/theme.css";   /* @theme tokens */
  @import "@avero/tokens/base.css";    /* body, scrollbars, keyframes, prose */
  @import "@avero/font/lahzeh.css";    /* optional */
  @source "../node_modules/@avero/react/dist";
  ```
- **Non-Tailwind consumers:** a precompiled `@avero/react/styles.css` containing only the classes Avero uses, with an option that omits preflight.
- `cn()` = `clsx` + `tailwind-merge`, **extended with every custom token** (font sizes, shadows, radii, z-index). Otherwise overrides like `className="shadow-card-soft"` would merge incorrectly.
- Components contain no raw hex or rgb values. They use tokens or Tailwind palette classes only (enforced by lint, Phase 1).
- Logical properties only (`ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`, `border-s`, `rounded-s`, `text-start`). Physical `left`/`right`/`pl`/`pr`/`ml`/`mr` are banned by lint.

### 8.4 Component API conventions

- Function declarations and `type` over `interface` (per CLAUDE.md). Refs forwarded with `forwardRef` while React 18 is supported (see O-03). `displayName` is set.
- Every component accepts `className` and spreads remaining native props onto its root.
- State is exposed via `data-state` / `data-active` / `data-disabled` attributes for styling and testing. Each root carries `data-slot="<name>"`.
- Variants use `cva`, and the variant function is exported (`buttonVariants`) so it can be reused on links.
- `asChild` (Radix `Slot`) is available where a component commonly wraps links (Button, Chip, IconButton, Card).
- Stateful components support controlled and uncontrolled modes (`value`/`defaultValue`/`onValueChange`).
- Form controls are compatible with react-hook-form: they forward refs and accept `name`, `onBlur` and `aria-invalid`.
- No built-in user-facing literals. All default strings come from `AveroProvider` dictionaries (`fa` default, `en`) and can be overridden per component via label props.
- `AveroProvider` props: `dir` (default `rtl`), `locale` (default `fa-IR`), `digits` (`fa`/`latn`), `calendar` (`persian`/`gregory`). It wraps Radix `DirectionProvider` and `Tooltip.Provider`.
- Formatting uses `Intl` only (`fa-IR-u-ca-persian` for Jalali dates, `Intl.NumberFormat` with the Persian thousands separator `٬`). There are no date libraries in core.
- `"use client"` only on interactive components. Server-safe components stay directive-free, and the build preserves per-file directives.

### 8.5 Build and release tooling

- TypeScript compiler emit (decision D-13): per-file ESM + `.d.ts`, directives preserved and verified by `scripts/verify-build.mjs`. Subpath exports per component; `sideEffects: false` for JS packages, `["*.css"]` for the tokens package.
- Changesets for versioning and changelog. `size-limit` enforces per-component budgets.
- CI (GitHub Actions) runs: install (pnpm, frozen lockfile), typecheck (`tsc -b`), lint, unit tests, build, Storybook build, Playwright visual + a11y, size-limit, docs build.
- Git: `main` (releasable) and `dev` (integration), commit format `type(Scope): Title-Style Description` (per CLAUDE.md).

---

## 9. Global Definition of Done (per component)

A component or block counts as **Done** in §11 only when **all** of these hold. Each item is verifiable in CI or by a recorded artefact.

1. **API:** fully typed props, no `any` (except `// BOUNDARY:`-documented third-party callbacks), `className` merge, rest-prop spread, ref forwarding, `data-slot`, and controlled/uncontrolled where stateful.
2. **Fidelity:** every variant, size and state listed in §7 exists and matches its reference source. For Tier A, the Storybook story is placed next to a cropped reference screenshot in a review story, and reviewer sign-off is recorded.
3. **Tokens only:** zero raw colour or shadow values in the component (lint rule passes); only logical direction utilities (lint rule passes).
4. **RTL + LTR:** a story renders in both directions, and a visual snapshot exists for each. Icons that imply direction (arrows, chevrons) flip correctly.
5. **Accessibility:** `axe` reports 0 violations in unit and Storybook tests. Keyboard behaviour matches the documented table (WAI-ARIA APG pattern). `focus-visible` styling is present. `prefers-reduced-motion` is respected.
6. **Tests:** Vitest + Testing Library cover render, every variant, interactions, keyboard and edge cases (empty, long text, disabled, loading). Component statement coverage is ≥ 90% and branch coverage ≥ 85%. An SSR `renderToString` smoke test passes.
7. **Visual regression:** Playwright screenshots of every story at 375, 768 and 1280px, in RTL and LTR, are committed as baselines.
8. **i18n:** no hardcoded user-facing strings; `fa` and `en` dictionary entries exist.
9. **Docs:** a docs page exists (see Phase 11 template) with a live example of every variant, a props table and an accessibility section.
10. **Build:** tree-shakable subpath export, and the per-component `size-limit` budget passes.
11. **Quality gates:** `tsc -b` reports 0 errors, lint reports 0 warnings, and the changeset entry is added.

---

## 10. Phases with strict DoDs

> Each phase lists **Scope**, **Deliverables**, **DoD** (checkboxes, all mandatory) and an **Exit gate** (the single verification that closes the phase). Record evidence links on the "Evidence" line.

### Phase 0 — Reference audit and extraction  🟨

**Scope:**
- **0.A:** analyse the 8 pages and shared assets (done in this session).
- **0.B:** obtain the missing captures needed for Tier B (Appendix A).
- **0.C:** produce machine-readable extraction artefacts.

**Deliverables:** §4–§7 of this plan; `docs/reference-inventory.md`; `tokens.extracted.json`; reference screenshot baselines; Tier B capture set.

**DoD:**
- [x] Stack of the reference identified and evidenced (§4.1)
- [x] Page map with the filename→content mismatch resolved (§4.2)
- [x] Brand variables, palette usage, typography, radius, shadows, motion, z-index, breakpoints extracted (§5)
- [x] CSS-only class diff computed to evidence Tier B (§4.3, §7)
- [x] Reference defects verified against compiled CSS (§6.1)
- [x] Component inventory with tier and source per item (§7)
- [x] Deviation register V-01…V-06 approved or rejected by the user (§6.2) — all approved 2026-06-19
- [x] Open decisions O-01…O-06 resolved (§13) — O-06 resolved with a pending user action (reserve the npm org before Phase 13)
- [ ] Tier B capture set received (Appendix A): every row marked received or explicitly dropped by the user
- [ ] Tier B items re-classified to A (or removed) with source pointers, and §7 and §11 updated
- [x] `tokens.extracted.json` generated by a script from the CSS (not hand-typed), committed with the script — `packages/tokens/scripts/extract-reference-tokens.mjs`
- [ ] Reference screenshot baselines: the 8 pages served locally, remote images replaced with local copies, captured at 375/768/1280/1536px with Lahzeh loaded, committed under `apps/replica/baselines/reference/`

**Evidence:** this plan (sections 4–7), audit session 2026-06-19.
**Exit gate:** every §7 item has Tier A status or is explicitly dropped; baselines exist for all 8 pages × 4 viewports.

### Phase 1 — Workspace, tooling and CI  ⬜

**Scope:** monorepo skeleton per §8.1, empty packages building, all quality gates wired.

**DoD:**
- [x] Git initialised or verified with `main` and `dev` branches; work happens on `dev`
- [x] `pnpm-workspace.yaml` and root `package.json` with per-app cd-scripts only (no bare `dev`), `packageManager` pinned
- [x] `@avero/config` providing strict `tsconfig` bases, ESLint flat config and Prettier config, consumed by all packages
- [x] TypeScript strict and `noUncheckedIndexedAccess` on; `tsc -b` at root passes — equivalent `pnpm typecheck` runs `tsc` in every project (per-package `NodeNext`/`Bundler` configs)
- [x] Custom lint rules active: no raw hex/rgb/hsl in `packages/react/src/**`; no physical direction utilities (`pl-`, `pr-`, `ml-`, `mr-`, `left-`, `right-`, `border-l`, `border-r`, `rounded-l`, `rounded-r`, `text-left`, `text-right`); `no-console` — `avero/no-raw-color`, `avero/no-physical-direction`, 26 RuleTester cases
- [x] Tailwind v4.3.x installed; a smoke component renders a token class in Storybook — Playwright asserts `rgb(10, 102, 194)`
- [x] Library build producing ESM + `.d.ts` with preserved `"use client"` directives (verified by a script that inspects the output; D-13) — `verify-build.mjs`: 7 modules emitted, 1 directive preserved
- [x] Vitest + Testing Library + `vitest-axe` configured, with a sample test passing — an `axe-core` helper replaces `vitest-axe` (unmaintained); 77 tests passing
- [x] Playwright configured for visual + axe tests against Storybook and `apps/replica` — Storybook suite running; replica suite added in Phase 10
- [x] Storybook (internal) boots with RTL/LTR and locale toolbar toggles
- [x] `apps/docs` (Next.js + Fumadocs) boots with one MDX page rendering a live Avero component — Button, Badge, Chip on the introduction page
- [x] `apps/replica` (Vite) boots
- [x] Changesets initialised; `size-limit` configured
- [ ] CI pipeline runs all gates in §8.5 on every PR to `dev` and is green
- [x] `docs/avero-conventions.md`, `docs/known-debts.md` and `docs/SECURITY.md` created
- [x] Dependency versions pinned to current stable releases and recorded in `docs/avero-conventions.md`

**Exit gate:** a fresh clone passes `pnpm install && pnpm -r build && pnpm -r test` with CI green.

### Phase 2 — Design tokens and foundations  ⬜

**Scope:** F-01…F-13.

**DoD:**
- [x] `@avero/tokens/theme.css` defines every token in §5 as Tailwind v4 `@theme` variables (brand, semantic, categorical, chart, heatmap, gradients as utilities, micro font sizes, leading, shadows, radii, z-index, easings, animations) — categorical/chart/heatmap colours reuse the default palette; gradients live in `utilities.css`; z-index layers are `--z-*` properties
- [x] Reference `:root` names are available as a compatibility layer (`--primary` etc. aliasing the Avero tokens) so reference markup renders unchanged — `compat.css`
- [x] `tokens.json` (DTCG format) and `tokens.ts` are generated from a single source; a CI check fails if they drift — `generate-token-data.mjs --check` (emits `tokens.js` + `tokens.d.ts`)
- [x] **Coverage check:** a script asserts every value in `tokens.extracted.json` maps to a token (100%) — 187/187 mapped, 143 documented exclusions
- [x] `base.css`: body defaults, font smoothing, `min-width: 320px`, smooth scroll, `fancy`/`thin`/`hidden` scrollbar utilities, all 14 custom keyframes and animation utilities, `prefers-reduced-motion` override — split into `base.css` (document, opt-in), `utilities.css` and keyframes in `theme.css`
- [ ] `@avero/font`: `@font-face` for all 9 Lahzeh weights with `font-display: swap`, woff2 first; a Playwright test confirms each weight actually loads (`document.fonts.check`)
- [x] Prose/`RichContent` style layer reproduces `.content-area`, `.editor` and `.tiptap-content` values (§5.11) — `rich-content.css`, reproducing rendered values (the global list overrides included)
- [x] `cn()` with tailwind-merge extended for every custom token group; unit tests prove that overriding each custom token group merges correctly — groups generated from `@avero/tokens` (`tokenGroups`)
- [x] Formatting utils: `formatNumber` (fa/latn digits, `٬` grouping), `formatToman`, `formatDate` (Jalali/Gregorian via `Intl`), `formatRelativeTime`; 100% unit-test coverage, including edge cases (0, negative, large, NaN) — the currency unit comes from the dictionary (`currencyToman`) and is composed by `PriceTag`, so there is no separate `formatToman`; 100% statements / 95.7% branches
- [x] `AveroProvider` (dir, locale, digits, calendar) with `fa` and `en` dictionaries
- [ ] Brand icon set (Telegram, WhatsApp, LinkedIn, X, Instagram, plus the footer icons) with licences verified and recorded — 19 reference glyphs extracted with sources in `THIRD_PARTY_NOTICES.md`; the Instagram licence is pending (KD-05)
- [ ] Token docs pages: colour swatches with hex and contrast ratios, type scale specimen in Lahzeh, radius, shadow, motion (live keyframe demos), z-index, breakpoints
- [ ] Contrast report generated for every text/background pairing used in §7, with failures listed against O-04
- [ ] Visual snapshot of the token specimen pages committed
- [ ] Global DoD items 3, 8, 10 and 11 hold for the tokens packages

**Exit gate:** the coverage script reports 100%, and the specimen page is signed off side-by-side with reference screenshots.

### Phase 3 — Core primitives  ⬜

**Scope:** P-01…P-15 (Tier A now; P-06b, P-11, P-12 once Tier B is captured).

**DoD:**
- [ ] P-01 `Button` meets the Global DoD, including all 8 variants × 5 sizes × states (hover, active, focus-visible, disabled, loading)
- [ ] P-02 `IconButton` meets the Global DoD; an accessible name is required at the type level
- [ ] P-03 `Link`, P-09 `Divider` and P-10 typography meet the Global DoD
- [ ] P-04 `Badge` and P-05 `Chip`/`Tag` meet the Global DoD
- [ ] P-06 `Avatar` meets the Global DoD, including image-error fallback and all size/shape/border variants
- [ ] P-07 `IconTile` and P-08 `Icon` meet the Global DoD, including all categorical colours
- [ ] P-13 `Progress` meets the Global DoD (`role="progressbar"`, `aria-valuenow`)
- [ ] P-14 `VisuallyHidden`/`LiveRegion` and P-15 `Image`/`Figure` meet the Global DoD
- [ ] P-06b, P-11 and P-12 meet the Global DoD, or are marked ⛔ with a reference to the pending Tier B capture

**Exit gate:** a Storybook "Primitives" review page is signed off against reference crops.

### Phase 4 — Forms  🟨

**Scope:** FM-01…FM-15.

**DoD:**
- [x] FM-02 `Input`, FM-03 `Textarea`, FM-04 `NativeSelect` and FM-15 `FormActions` meet the Global DoD
- [x] FM-05 `Select` (Radix) meets the Global DoD, and its trigger matches the reference pixel-for-pixel (listbox designed per deviation V-07)
- [ ] FM-01 `Field` wires label, description and error ids (`aria-describedby`, `aria-invalid`) automatically
- [x] A react-hook-form + zod integration example passes a test for register, validation errors and submit
- [ ] FM-06 `Combobox` meets the Global DoD (after capture)
- [ ] FM-07 `Checkbox`, FM-08 `Radio` and FM-09 `Switch` meet the Global DoD (after capture)
- [ ] FM-10 `FileInput` meets the Global DoD, including keyboard access and file-type/size props (after capture)
- [ ] FM-11 `PriceInput` and FM-12 `TagInput` meet the Global DoD, including Persian digit input normalisation (after capture)
- [ ] FM-13 `DatePicker` (Jalali) meets the Global DoD, using `Intl` only, with RTL grid navigation (after capture)
- [ ] FM-14 `OtpInput` meets the Global DoD, including paste handling and `autocomplete="one-time-code"` (after capture)

**Exit gate:** a "Forms" demo form (every control, validation on) passes axe and keyboard-only completion in Playwright.

### Phase 5 — Navigation, disclosure and carousel  ⬜

**Scope:** N-01…N-11.

**DoD:**
- [ ] N-01 `NavLink`, N-02 `SidebarNav` and N-03 `BackLink` meet the Global DoD (`aria-current="page"` on active)
- [ ] N-04 `PillTabs` meets the Global DoD, including horizontal scroll with hidden scrollbar and the active item scrolled into view
- [ ] N-05 `SegmentedControl` and N-06 `ToggleChipGroup` meet the Global DoD (Radix ToggleGroup semantics)
- [ ] N-07 `TableOfContents` meets the Global DoD, including scroll-spy active state and nested levels
- [ ] N-08 `Accordion`/`Collapsible` meets the Global DoD, with the height animation matching the reference (300ms)
- [ ] N-09 `Carousel` meets the Global DoD: snap, chevron controls with disabled state, dot pagination, pill pagination (28px active), RTL drag direction
- [ ] N-10 `Pagination` meets the Global DoD (after capture)
- [ ] N-11 `InfiniteScroll` meets the Global DoD, using IntersectionObserver with a loading slot (after capture)
- [ ] Keyboard tables documented for every component in this phase

**Exit gate:** reference regions for the TOC, profile tabs, segmented control and related-projects carousel pass visual diff ≤ 1%.

### Phase 6 — Overlays and feedback  🟨

**Scope:** O-01…O-10.

**DoD:**
- [x] O-01 `Drawer`/`Sheet` meets the Global DoD: focus trap, `Esc`, scroll lock, start/end sides mirror in LTR, and it reproduces both reference drawers
- [ ] O-02 `Dialog` and O-03 `ConfirmDialog` meet the Global DoD (after capture)
- [ ] O-04 `Popover`/`DropdownMenu` meet the Global DoD, including the notification-menu composition (after capture)
- [ ] O-05 `Tooltip` meets the Global DoD
- [ ] O-06 `Toast` meets the Global DoD: success, error, info and warning variants, stacking, 480px mobile behaviour, and a pause-on-hover progress bar (after capture of the visual states)
- [ ] O-07 `Lightbox` meets the Global DoD, including keyboard navigation and focus return (after capture)
- [x] O-08 `EmptyState` meets the Global DoD with all 4 reference variants, and distinguishes "no results" from "nothing yet"
- [ ] O-09 `Alert` (after capture) and O-10 `DisabledOverlay` meet the Global DoD
- [x] Z-index tokens finalised (§5.8), with a layering test proving toast > modal > drawer > dropdown > header — `packages/tokens/scripts/check-z-order.mjs`, run by the tokens test; `--z-drawer` raised above the header and dropdown layers (deviation V-10)
- [ ] Scroll-lock behaviour is verified not to shift layout, both RTL and LTR (scrollbar-gutter handled)

**Exit gate:** a Playwright overlay-stacking test and axe pass on a page containing every overlay open in turn.

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
- [ ] D-24 `ResponsiveBanner` meets the Global DoD (after capture)
- [ ] Every data component renders sensibly with empty, `null`/`undefined` and overflowing content (tests present)

**Exit gate:** the reference regions for the blog prose, the dashboard stats and the profile stat strip pass visual diff ≤ 1%.

### Phase 8 — Layout shells and site chrome  🟨

**Scope:** T-01…T-09.

**DoD:**
- [x] T-02 `SiteHeader` meets the Global DoD: sticky with blur, slots (logo, nav, actions, user), mobile menu trigger opening the drawer
- [x] T-03 `SiteFooter` meets the Global DoD: link-chip grid (3 → 5 columns), link groups that become accordions below `md`, contact rows, trust-seal slot, social tiles, copyright slot
- [x] T-04 `DashboardShell` meets the Global DoD: desktop sidebar ≥ `lg`, mobile bar + drawer below `lg`
- [x] T-05…T-09 layout templates meet the Global DoD, with correct sticky offsets and order swaps
- [x] All shells are data-driven (nav items, links and columns passed as props); no reference content is hardcoded
- [x] A skip-to-content link and landmark roles (`banner`, `navigation`, `main`, `contentinfo`) are present
- [x] `Container` and grid presets documented and used by every shell
- [ ] Shells verified at 320px minimum width with no horizontal scroll
- [ ] Visual baselines committed for every shell at 4 viewports × 2 directions

**Exit gate:** the header, footer and dashboard chrome of the replica pass visual diff ≤ 1% against the reference at 375/768/1280/1536px.

### Phase 9 — Charts and editor packages  ⬜

**Scope:** C-01…C-04, E-01…E-02.

**DoD:**
- [ ] `@avero/charts` is published as a separate package with `recharts` as a peer; the core package has no recharts import (verified by a bundle check)
- [ ] C-01 `ChartCard` meets the Global DoD, including toggle chips, empty state and loading state
- [ ] C-02 `AreaChart` and C-03 `LineChart` meet the Global DoD, using the reference palette, grid and axis colours
- [ ] C-04 tooltip styling matches the reference; charts expose an accessible data-table fallback
- [ ] Charts render RTL correctly (axis direction option documented)
- [ ] `@avero/editor` is published separately with `@tiptap/*` as peers
- [ ] E-01 content styles match §5.11 exactly (visual test against a captured editor state)
- [ ] E-02 toolbar meets the Global DoD (after capture)
- [ ] Editor output round-trips through `RichContent` sanitization without losing allowed formatting (tests)
- [ ] Both packages meet their `size-limit` budgets

**Exit gate:** the dashboard analytics region of the replica passes visual diff ≤ 1%.

### Phase 10 — Blocks, templates and replica pages (visual parity gate)  ⬜

**Scope:** B-01…B-25 and RP-01…RP-08.

**DoD:**
- [ ] Every B-* block meets the Global DoD and is built **only** from Avero components (no ad-hoc markup beyond layout)
- [ ] Blocks are domain-neutral; all text comes via props or slots, with the reference alias noted in docs
- [ ] RP-01…RP-08 rebuilt in `apps/replica` using only `@avero/*` exports and the reference's own text and images
- [ ] **Parity gate:** each replica page vs its reference baseline at 375/768/1280/1536px has `maxDiffPixelRatio ≤ 0.01`, masking only approved deviations (§6.2) and live chart canvases
- [ ] Diff images for every page and viewport are archived as CI artefacts
- [ ] Hover and focus parity checked for every interactive block (Playwright hover screenshots)
- [ ] Replica pages score axe 0 violations
- [ ] Replica pages render in LTR/`en` without layout breakage (visual review recorded)
- [ ] Tier B templates (Appendix A pages) rebuilt and passing the same gate once captured
- [ ] `docs/known-debts.md` lists every remaining mismatch with a justification

**Exit gate:** all replica pages pass the parity gate in CI. This is the objective proof of "looks exactly like the website".

### Phase 11 — Documentation site  ⬜

**Scope:** `apps/docs`, modelled on large libraries (shadcn/ui, MUI, Chakra, Radix).

**Every component page template (mandatory sections):**
1. Title, one-line description, reference alias and tier, "View source" link, package and import line.
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
- [ ] Information architecture: Getting Started (Introduction, Installation for Tailwind v4 and precompiled CSS, Fonts, RTL & i18n, Theming, Tokens, Changelog), Foundations, Components, Blocks, Templates, Utilities, Charts, Editor
- [ ] Every Done component in §11 has a page with all 12 template sections (CI check: a script validates headings per page)
- [ ] Props tables are generated from source at build time (never hand-written); the build fails on undocumented public props
- [ ] Blocks gallery with live preview, copy-paste code and full-page previews
- [ ] Templates section showing the 8 replica pages as full-screen demos
- [ ] Token pages are generated from `tokens.json`
- [ ] Global site search (Fumadocs search) indexes all pages
- [ ] Global RTL/LTR and `fa`/`en` switches persist across pages
- [ ] Docs are themselves built with Avero components and Lahzeh (dogfooding)
- [ ] Every code example on the site is type-checked in CI (examples compile)
- [ ] Lighthouse on the docs home page and one component page: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95
- [ ] Broken-link check passes in CI
- [ ] Versioned docs (at least "latest" plus the previous major, once one exists)
- [ ] Contributing guide and `docs/avero-conventions.md` are linked from the site

**Exit gate:** a reviewer can install Avero in a blank Vite + Tailwind v4 app using only the docs, and render a replica block in under 15 minutes (recorded walkthrough).

### Phase 12 — Hardening: a11y, performance, SSR, security  ⬜

**DoD:**
- [ ] Full axe pass across every story and replica page: 0 violations
- [ ] Manual screen-reader pass (NVDA + Firefox, VoiceOver + Safari) on every interactive component, with findings fixed or logged in `known-debts.md`
- [ ] Keyboard-only walkthrough of all 8 replica pages recorded
- [ ] Contrast report reviewed; O-04 decision applied
- [ ] SSR/RSC: every export renders in a Next.js App Router Server Component test page without errors; client components are correctly marked
- [ ] Tree-shaking verified: importing one component pulls in only its own code (bundle analysis artefact)
- [ ] Per-component `size-limit` budgets met; total core gzip budget recorded
- [ ] Browser matrix passes visual tests: latest 2 versions of Chrome, Edge, Firefox and Safari, plus iOS Safari and Android Chrome
- [ ] `docs/SECURITY.md` checklist completed (per CLAUDE.md): sanitization, no `dangerouslySetInnerHTML` outside `RichContent`, external links `rel="noopener noreferrer"`, no `eval`, dependency audit clean (`pnpm audit`), lockfile committed
- [ ] Supply-chain checks: publish via CI only, npm provenance, 2FA on the npm org, no install scripts in packages
- [ ] Memory and cleanup: overlays and carousels unmount listeners (tests with StrictMode double-mount)
- [ ] No `console.*`, `debugger`, `.only` or `.skip` anywhere (lint + CI grep)
- [ ] `docs/known-debts.md` reviewed; no high-severity items open

**Exit gate:** a release-candidate build passes the complete CI matrix twice consecutively.

### Phase 13 — Release 1.0  ⬜

**DoD:**
- [ ] All §11 rows are ✅, or ⏸️ with the user's written approval
- [ ] Semantic versioning policy documented (what counts as breaking: props, tokens, class output)
- [ ] Changesets produce the 1.0.0 changelog for every package
- [ ] Packages published to the registry chosen in O-01, with provenance
- [ ] `LICENSE` files in place; font licence constraints respected (O-02)
- [ ] README per package with install, usage and a link to the docs
- [ ] Docs deployed at the production URL, pinned to the 1.0 version
- [ ] Clean-install smoke tests pass in fresh Vite, Next.js App Router and Remix/React Router projects
- [ ] "Migrating from reference markup" guide (reference class and variable names → Avero components and tokens)
- [ ] `dev` merged into `main` and a release tag created

**Exit gate:** the three fresh-project smoke tests pass against the published packages (not workspace links).

### Phase 14 — Dark theme  ⏸️ (deferred by D-02)

**DoD (to activate later):**
- [ ] Dark palette designed on the existing semantic tokens only (no component changes needed)
- [ ] Theme switch via `data-theme` / class plus the system preference
- [ ] Contrast report passes AA for every pairing
- [ ] Every story has a dark visual baseline
- [ ] Charts and heatmap have dark palettes
- [ ] Docs have a dark mode toggle
- [ ] The reference's stray `dark:` media-query utilities are **not** reproduced (Avero uses a class strategy)
- [ ] Released as a minor version (non-breaking)

---

## 11. Component progress tracker

Columns follow the Global DoD: **Impl** (API + fidelity), **Test** (unit + SSR), **A11y**, **Vis** (visual baselines RTL/LTR), **Docs**. Mark each cell ⬜/🟨/✅. Status is ✅ only when all five are ✅. ⛔ = blocked on a Tier B capture.

| ID | Component | Tier | Phase | Impl | Test | A11y | Vis | Docs | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F-01…F-13 | Foundations (tokens, type, motion, …) | A | 2 | ✅ | ✅ | ⬜ | ⬜ | ⬜ | 🟨 |
| P-01 | Button | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| P-02 | IconButton | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| P-03 | Link | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| P-04 | Badge | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| P-05 | Chip / Tag | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| P-06 | Avatar | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| P-06b | AvatarGroup | B | 3 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| P-07 | IconTile | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| P-08 | Icon + brand icons | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| P-09 | Divider | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| P-10 | Heading / Text / Eyebrow | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| P-11 | Spinner | B | 3 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| P-12 | Skeleton | B | 3 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| P-13 | Progress | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| P-14 | VisuallyHidden / LiveRegion | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| P-15 | Image / Figure | A | 3 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| FM-01 | Field | B | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| FM-02 | Input | A | 4 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| FM-03 | Textarea | A | 4 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| FM-04 | NativeSelect | A | 4 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| FM-05 | Select | A/B | 4 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| FM-06 | Combobox | B | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| FM-07 | Checkbox | B | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| FM-08 | Radio | B | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| FM-09 | Switch | B | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| FM-10 | FileInput | B | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| FM-11 | PriceInput | B | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| FM-12 | TagInput | B | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| FM-13 | DatePicker (Jalali) | B | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| FM-14 | OtpInput | B | 4 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| FM-15 | FormActions | A | 4 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| N-01 | NavLink (provided by `Link` `nav` / `drawer` variants) | A | 5 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| N-02 | SidebarNav | A | 5 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| N-03 | BackLink | A | 5 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| N-04 | PillTabs | A | 5 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| N-05 | SegmentedControl | A | 5 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| N-06 | ToggleChipGroup | A | 5 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| N-07 | TableOfContents | A | 5 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| N-08 | Accordion / Collapsible | A | 5 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| N-09 | Carousel | A/B | 5 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| N-10 | Pagination | B | 5 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| N-11 | InfiniteScroll | B | 5 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| O-01 | Drawer / Sheet | A | 6 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| O-02 | Dialog | B | 6 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| O-03 | ConfirmDialog | B | 6 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| O-04 | Popover / DropdownMenu | B | 6 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| O-05 | Tooltip | B | 6 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| O-06 | Toast | A/B | 6 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| O-07 | Lightbox | B | 6 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| O-08 | EmptyState | A | 6 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| O-09 | Alert / Callout | B | 6 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| O-10 | DisabledOverlay | A | 6 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-01 | Card family | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-02 | StatCard | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-03 | StatTile | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-04 | MiniStat | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-05 | FeatureCard | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-06 | ActionTile | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-07 | InfoRow | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-08 | HighlightPanel | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-09 | Table | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-10 | List | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-11 | Blockquote | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-12 | RichContent | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-13 | MetaItem / MetaBar | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-14 | PriceTag | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-15 | Rating | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-16 | CapacityMeter | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-17 | MatchScore | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-18 | ActivityHeatmap | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-19 | KeyValueRow | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-20 | ContactMethod | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-21 | SectionHeader | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-22 | ZoomFrame | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-23 | CoverHeader | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| D-24 | ResponsiveBanner | B | 7 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| C-01 | ChartCard | A | 9 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| C-02 | AreaChart | A | 9 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| C-03 | LineChart | A | 9 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| C-04 | ChartTooltip / palette | A | 9 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| E-01 | Editor content styles | A | 9 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| E-02 | Editor toolbar | B | 9 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| X-01 | Animation utilities | A | 2 | ✅ | ✅ | ⬜ | ⬜ | ⬜ | 🟨 |
| X-02 | GlowOrbs | A | 7 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| X-03 | Hero illustration | B | 10 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⛔ |
| T-01 | SiteShell | A | 8 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| T-02 | SiteHeader | A | 8 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| T-03 | SiteFooter | A | 8 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| T-04 | DashboardShell | A | 8 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| T-05 | ArticleLayout | A | 8 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| T-06 | DetailLayout | A | 8 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| T-07 | ListingLayout | A | 8 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| T-08 | SplitDetailLayout | A | 8 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| T-09 | ProfileLayout | A | 8 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| X-04 | Container (added for T-01) | A | 8 | ✅ | ✅ | ✅ | 🟨 | ✅ | 🟨 |
| B-01…B-25 | Blocks (see §7.10) | A | 10 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| RP-01…RP-08 | Replica pages (parity gate) | A | 10 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

> When Phase 10 starts, expand the `T-*`, `B-*` and `RP-*` summary rows into one row per ID.

---

## 12. Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Tier B captures never arrive, or are incomplete | Missing components; the "everything" goal fails | Phase 0.B blocks only Tier B rows; Tier A proceeds. Each missing capture needs an explicit user drop/keep decision. |
| Lahzeh licence forbids redistribution in a public package | Can't publish `@avero/font` publicly | O-02: private registry, or BYO-font mode with `@avero/font` excluded from public publish |
| Pixel diffs caused by font rendering differences across OSes | Flaky parity gate | Run visual tests in a pinned Docker Playwright image; baselines are generated in the same image |
| Remote images in reference pages (api.dorlancer.ir) unavailable | Baselines break | Copy all images locally during Phase 0 baseline capture; mask truly dynamic regions |
| tailwind-merge unaware of custom tokens | Silent style-override bugs | Phase 2 DoD requires the tailwind-merge extension plus tests per token group |
| RSC directive loss during bundling | Consumers' Next.js builds break | Phase 1 DoD requires a test on build output |
| Scope creep from "every component" | Delays | §7 is the closed scope; additions require a new inventory row with a reference source |
| Fidelity vs accessibility conflicts (contrast) | Either the look or AA suffers | O-04 decision; the contrast report makes the trade-off explicit |
| Radix styling mismatch (portals, focus rings) | Visual drift | Every Radix part styled via `data-state` / `data-slot`; overlays checked in the parity gate |

---

## 13. Open decisions

| ID | Question | Recommendation | Needed by |
| --- | --- | --- | --- |
| O-01 | Registry: public npm, private npm org or GitHub Packages? | Private until 1.0 is stable; decide public vs private at Phase 13 | ✅ Resolved 2026-06-19: as recommended |
| O-02 | Does your Lahzeh licence allow redistribution inside an npm package (and to which users)? | If unclear, keep `@avero/font` private and document BYO font | ✅ Resolved 2026-06-19: **yes**, redistribution allowed; `@avero/font` bundles the files |
| O-03 | Minimum React version: 18.2+ and 19, or 19 only? | 18.2+ and 19 (wider adoption; `forwardRef` kept) | ✅ Resolved 2026-06-19: as recommended |
| O-04 | Muted-text contrast (e.g. `gray-400` meta text is below AA): keep exact look, or darken? | Keep the exact look by default, expose `--color-text-muted` so consumers can darken, and list failures in docs | ✅ Resolved 2026-06-19: as recommended |
| O-05 | Approve deviations V-01…V-06 (§6.2)? | Approve all | ✅ Resolved 2026-06-19: all approved |
| O-06 | Package scope: is `@avero` available and yours on the registry? | Check and reserve now | 🟨 2026-06-19: available, **not yet reserved**. Action for the user: create the `avero` npm org before the first publish (Phase 13). Until then packages are workspace-only. |

---

## 14. Appendices

### Appendix A — Tier B capture list (Phase 0.B)

**Capture protocol:**
1. Open the page on the live site and put the UI into the listed state (open the menu, trigger the error, and so on).
2. In DevTools, right-click `<html>` → **Copy outerHTML**, and save it as `reference/captures/<id>.html`.
3. Also take a full-page screenshot at 1280px and 375px.
4. Where possible, capture both **desktop and mobile** widths.

| ID | Page / state | Unblocks |
| --- | --- | --- |
| C-01 | Home page (hero illustration, projects swiper with pill pagination, any top bar above the sticky header) | X-03, N-09, R-17 |
| C-02 | Login / register, and the OTP step | FM-01, FM-02 states, FM-14 |
| C-03 | Create/edit project form (every field, validation errors shown) | FM-01, FM-05 listbox, FM-06, FM-11, FM-12, FM-13 |
| C-04 | Create/edit service form (image upload, image editor, rich text editor with toolbar) | FM-10, E-02 |
| C-05 | Profile settings (checkboxes, radios, switches) | FM-07, FM-08, FM-09 |
| C-06 | Notification bell dropdown open; user menu open | O-04 |
| C-07 | Any modal open (subscription required, report violation, project detail modal, confirm delete) | O-02, O-03 |
| C-08 | Toasts: success, error, info, warning (visible) | O-06 |
| C-09 | Service gallery lightbox open | O-07 |
| C-10 | Mobile nav drawer **open**; dashboard drawer **open** (375px) | O-01 open state |
| C-11 | Projects list with filters, pagination/infinite scroll, loading skeletons | N-10, N-11, P-12 |
| C-12 | Blog list page; freelancers list page | Listing variants |
| C-13 | Pricing / upgrade plan / subscription pages | Pricing cards (new rows if found) |
| C-14 | Tickets list and ticket detail (conversation) | New rows if found |
| C-15 | Exams list, exam taking, exam result, certificate | New rows if found |
| C-16 | Stories (9:16 viewer) | New rows if found |
| C-17 | Comment list with at least 2 comments and a reply | B-08 list items |
| C-18 | Employer dashboard; applicants page; sent proposals | Dashboard variants |
| C-19 | 404 page; payment result (success/failure) | Empty/error states |
| C-20 | An alert/callout banner state (warning/info) | O-09 |
| C-21 | Any tooltip open | O-05 |
| C-22 | Any loading spinner / premium glow ring visible | P-11 |
| C-23 | Admin table page (optional; wide `min-w-[1100px]` tables) | D-09 data-table variant |

### Appendix B — Hero illustration tokens (from `:root`)

`--hero-skin-color #ffd1b3`, `--hero-skin-shadow #e0b496`, `--hero-hair-color #4e3629`, `--hero-tshirt-color #4f46e5`, `--hero-tshirt-shadow #3b31c9`, `--hero-headphones-color #1e293b`, `--hero-headphones-detail #f15928`, `--hero-laptop-body #e2e8f0`, `--hero-laptop-screen #0f172a`, `--hero-laptop-glow #6366f140`, `--hero-mug-color #f15928`, `--hero-coffee-steam #78787840`, `--hero-desk-wood #a16207`, `--hero-pot-color #cbd5e1`, `--hero-plant-leaf-1 #10b981`, `--hero-plant-leaf-2 #047857`, `--hero-keyboard-keys #94a3b8`.

### Appendix C — Lucide icons observed in the DOMs

`activity`, `arrow-down`, `arrow-left`, `arrow-right`, `award`, `bell`, `bookmark`, `briefcase`, `briefcase-business`, `calendar`, `chart-column`, `chevron-down`, `chevron-left`, `chevron-right`, `circle-check-big`, `clock`, `copy`, `credit-card`, `earth`, `external-link`, `eye`, `file-check`, `file-text`, `flag`, `folder-kanban`, `folder-tree`, `globe`, `graduation-cap`, `heart`, `house`, `image`, `info`, `layers`, `log-out`, `mail`, `map-pin`, `medal`, `menu`, `message-circle`, `message-square`, `message-square-text`, `package`, `paperclip`, `phone`, `plus`, `receipt`, `rocket`, `send`, `settings`, `share-2`, `shield`, `shield-alert`, `shield-check`, `sparkles`, `star`, `tag`, `target`, `ticket`, `trending-up`, `triangle-alert`, `trophy`, `user`, `user-check`, `users`, `x`, `zap`, `zoom-in`.

### Appendix D — Reference class → Avero mapping (starter; completed in Phase 13 migration guide)

| Reference | Avero |
| --- | --- |
| `bg-(--primary)` / `bg-[var(--primary)]` / `bg-[#0a66c2]` | `bg-primary` |
| `hover:bg-[#004182]` / `hover:bg-(--primary-hover)` | `hover:bg-primary-hover` |
| `bg-(--secondary)` | `bg-secondary` |
| `bg-[var(--bg-card)]` | `bg-surface-glass` |
| `bg-[#f9fafc]` | `bg-surface-muted` |
| `border-(--border-link)` | `border-border-subtle` |
| `text-(--text-header-footer)` | `text-text-strong` |
| `text-(--text-link-footer)` | `text-text-chrome` |
| `shadow-[0_0_20px_0_(--shadow)]` | `shadow-brand-soft` |
| `shadow-[0_4px_25px_rgba(0,0,0,0.04)]` | `shadow-card-soft` |
| `text-[11px]` / `text-[10px]` / `text-[9px]` | `text-2xs` / `text-3xs` / `text-4xs` |
| `pr-6` / `border-r-4` / `mr-auto` / `text-right` (reference is RTL, so "right" = inline-start) | `ps-6` / `border-s-4` / `ms-auto` / `text-start`; the full per-property mapping is generated in Phase 2 |
