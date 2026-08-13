import { FilterXSS } from "xss";

/**
 * Tags and attributes `RichContent` renders (D-12). Everything else is dropped: unknown tags lose
 * their markup but keep their text, while script-like tags lose their content too.
 *
 * `xss` is used rather than DOMPurify because it needs no DOM, so the same code runs in the
 * browser, in SSR and in tests without pulling jsdom into a server bundle (decision D-15).
 *
 * A stripped tag nested inside another stripped tag (`<svg><script>…`) leaves the sanitizer's
 * literal `[removed]` marker where the payload was. The markup is gone either way.
 */
export const richContentAllowList: Readonly<Record<string, string[]>> = {
  p: [],
  br: [],
  hr: [],
  span: [],
  div: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  strong: [],
  b: [],
  em: [],
  i: [],
  u: [],
  s: [],
  mark: [],
  small: [],
  sub: [],
  sup: [],
  a: ["href", "title", "target", "rel"],
  ul: [],
  ol: ["start"],
  li: [],
  blockquote: ["cite"],
  figure: [],
  figcaption: [],
  img: ["src", "alt", "title", "width", "height", "loading"],
  table: [],
  thead: [],
  tbody: [],
  tfoot: [],
  tr: [],
  th: ["scope", "colspan", "rowspan"],
  td: ["colspan", "rowspan"],
  caption: [],
  pre: [],
  code: [],
};

/** Tags whose content is dropped along with the tag itself. */
const STRIP_WITH_BODY = [
  "script",
  "style",
  "iframe",
  "frame",
  "frameset",
  "object",
  "embed",
  "applet",
  "noscript",
  "template",
  "svg",
  "math",
  "form",
];

const filter = new FilterXSS({
  whiteList: { ...richContentAllowList },
  stripIgnoreTag: true,
  stripIgnoreTagBody: STRIP_WITH_BODY,
  css: false,
});

const EXTERNAL_LINK = /<a\b([^>]*\btarget\s*=\s*"[^"]*"[^>]*)>/gi;

/** Links opened in a new tab must not hand the opener over to the target document. */
function hardenLinks(html: string): string {
  return html.replace(EXTERNAL_LINK, (match, attrs: string) =>
    /\brel\s*=/i.test(attrs) ? match : `<a${attrs} rel="noopener noreferrer">`,
  );
}

/**
 * Removes every tag, attribute and URL scheme outside {@link richContentAllowList}: script and
 * style bodies, `on*` handlers, `javascript:` and `data:` URLs, and inline styles.
 */
// Every tag is dropped, but the text inside ordinary tags is kept, so an excerpt reads as prose.
const stripFilter = new FilterXSS({
  whiteList: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: STRIP_WITH_BODY,
  css: false,
});

const ENTITIES: ReadonlyArray<readonly [RegExp, string]> = [
  [/&lt;/g, "<"],
  [/&gt;/g, ">"],
  [/&quot;/g, '"'],
  [/&#39;/g, "'"],
  [/&nbsp;/g, " "],
  // `&amp;` is decoded last, so "&amp;lt;" becomes "&lt;" rather than "<".
  [/&amp;/g, "&"],
];

/**
 * Returns an HTML string's readable text: markup is removed, the basic entities are decoded once
 * and whitespace is collapsed.
 *
 * Use it where stored HTML must appear as plain text, such as a card excerpt, so tags never show up
 * as visible characters. To render stored HTML, use `RichContent`, which sanitizes it.
 */
export function stripHtml(html: string): string {
  if (!html) return "";

  const text = ENTITIES.reduce(
    (value, [pattern, character]) => value.replace(pattern, character),
    stripFilter.process(html),
  );
  return text.replace(/\s+/g, " ").trim();
}

export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return hardenLinks(filter.process(html));
}
