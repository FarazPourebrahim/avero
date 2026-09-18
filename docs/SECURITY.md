# Security Checklist

Avero is a client-side UI library, so its main risks are unsafe HTML rendering, unsafe links, supply-chain compromise and leaking behaviour into consumers' apps.
Before every release (Phase 12 and Phase 13), verify every item below and record the evidence in the release PR.

## Rendering

- [x] `dangerouslySetInnerHTML` is used **only** inside `RichContent`, and `RichContent` always sanitizes its input (js-xss) before rendering. — Verified 2026-09-10: one occurrence, in `RichContent.tsx`, and it sanitizes on every render.
- [x] Sanitization tests cover `<script>`, inline event handlers (`on*`), `javascript:`/`data:` URLs, `<iframe>`/`<object>`/`<embed>`, SVG script vectors and CSS `expression()`. — Verified 2026-09-10: `sanitize.test.ts` covers all of these, plus case-shifted and entity-encoded schemes; `data:image` is deliberately kept.
- [x] Excerpt helpers strip HTML instead of rendering it. — Verified 2026-09-10: `stripHtml` decodes entities once, so an escaped tag stays escaped text.
- [x] No `eval`, `new Function` or string-based `setTimeout`/`setInterval`. — Verified 2026-09-10: no matches in package source.

## Links and navigation

- [x] Every link that can open a new tab (`target="_blank"`) sets `rel="noopener noreferrer"`. — Verified 2026-09-10: `Link`, `ContactMethod` and `SiteFooter` are the only components that set `target`, each alongside `rel`, with tests.
- [x] Share and contact helpers encode user-provided values with `encodeURIComponent` and only build `https:`, `mailto:` and `tel:` URLs. — Verified 2026-09-10: Avero builds no share or contact URLs. `ShareBar` reports the chosen channel through `onShare` and the consumer owns the URL.
- [x] Components never navigate on their own. Navigation is delegated to the consumer (links or callbacks). — Verified 2026-09-10: no `window.location`, `router` or `history` use in package source.

## Data handling

- [x] Components never read or write `localStorage`, `sessionStorage` or cookies unless the prop is explicitly documented as persistent (none today). — Verified 2026-09-10: no storage or cookie access in package source.
- [x] No component logs to the console in production code (`no-console` lint rule). — Verified 2026-09-10: `no-console` is enforced and `pnpm lint` is green at 0 warnings.
- [x] No network requests from the core library. — Verified 2026-09-10: no `fetch`, `XMLHttpRequest` or `sendBeacon` in package source.

## Supply chain

- [x] `pnpm audit --prod` reports no high or critical vulnerabilities in published packages. — Verified 2026-09-10: no known vulnerabilities.
- [x] The lockfile is committed and CI installs with `--frozen-lockfile`. — Verified 2026-09-10.
- [x] Published packages have no `install`/`postinstall` scripts. — Verified 2026-09-10: none of the five published packages defines an install hook.
- [ ] Publishing happens from CI only, with npm provenance and 2FA on the npm organisation. — `.github/workflows/release.yml` publishes from CI with `NPM_CONFIG_PROVENANCE`; the `avero` npm organisation is not reserved yet (O-06), so 2FA cannot be enabled and nothing has been published.
- [x] Runtime dependencies are limited to the ones listed in `docs/avero-conventions.md`. New runtime dependencies need review. — Verified 2026-09-10: `@averoui/react` depends on `@averoui/tokens`, `class-variance-authority`, `clsx`, `embla-carousel-react`, `radix-ui` and `xss`, with React and `lucide-react` as peers.

## Fonts and assets

- [x] Redistributed font files match the licence terms (the Lahzeh licence allows redistribution). — Verified 2026-09-10: O-06 confirmed redistribution is permitted, and `packages/font/files/README.md` records the terms next to the files.
- [x] Brand icons are redistributable, with licences recorded next to the icon source. — Verified 2026-09-10: `packages/react/THIRD_PARTY_NOTICES.md` records Font Awesome Free 5 (CC BY 4.0), Heroicons v1 (MIT) and Ionicons v4 (MIT), each naming the glyphs used and the changes made.
