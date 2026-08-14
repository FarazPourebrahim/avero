# Security Checklist

Avero is a client-side UI library, so its main risks are unsafe HTML rendering, unsafe links, supply-chain compromise and leaking behaviour into consumers' apps.
Before every release (Phase 12 and Phase 13), verify every item below and record the evidence in the release PR.

## Rendering

- [ ] `dangerouslySetInnerHTML` is used **only** inside `RichContent`, and `RichContent` always sanitizes its input (js-xss) before rendering.
- [ ] Sanitization tests cover `<script>`, inline event handlers (`on*`), `javascript:`/`data:` URLs, `<iframe>`/`<object>`/`<embed>`, SVG script vectors and CSS `expression()`.
- [ ] Excerpt helpers strip HTML instead of rendering it.
- [ ] No `eval`, `new Function` or string-based `setTimeout`/`setInterval`.

## Links and navigation

- [ ] Every link that can open a new tab (`target="_blank"`) sets `rel="noopener noreferrer"`.
- [ ] Share and contact helpers encode user-provided values with `encodeURIComponent` and only build `https:`, `mailto:` and `tel:` URLs.
- [ ] Components never navigate on their own. Navigation is delegated to the consumer (links or callbacks).

## Data handling

- [ ] Components never read or write `localStorage`, `sessionStorage` or cookies unless the prop is explicitly documented as persistent (none today).
- [ ] No component logs to the console in production code (`no-console` lint rule).
- [ ] No network requests from the core library.

## Supply chain

- [ ] `pnpm audit --prod` reports no high or critical vulnerabilities in published packages.
- [ ] The lockfile is committed and CI installs with `--frozen-lockfile`.
- [ ] Published packages have no `install`/`postinstall` scripts.
- [ ] Publishing happens from CI only, with npm provenance and 2FA on the npm organisation.
- [ ] Runtime dependencies are limited to the ones listed in `docs/avero-conventions.md`. New runtime dependencies need review.

## Fonts and assets

- [ ] Redistributed font files match the licence terms (the Lahzeh licence allows redistribution).
- [ ] Brand icons are redistributable, with licences recorded next to the icon source.
