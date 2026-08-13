import { describe, expect, it } from "vitest";
import { richContentAllowList, sanitizeHtml, stripHtml } from "./sanitize.js";

describe("stripHtml", () => {
  it("returns the readable text of an excerpt stored as HTML", () => {
    expect(stripHtml("<p>مبانی طراحی رابط کاربری</p>")).toBe("مبانی طراحی رابط کاربری");
  });

  it("keeps the text of nested formatting tags", () => {
    expect(stripHtml("<p>یک <strong>متن</strong> با <em>قالب</em></p>")).toBe("یک متن با قالب");
  });

  it("drops script-like tags with their content", () => {
    expect(stripHtml("<p>سلام</p><script>alert(1)</script>")).toBe("سلام");
  });

  it("decodes basic entities once, so an escaped tag stays escaped text", () => {
    expect(stripHtml("<p>a &amp;lt;b&amp;gt; c</p>")).toBe("a &lt;b&gt; c");
    expect(stripHtml("<p>5 &lt; 7 &amp; 8 &gt; 6</p>")).toBe("5 < 7 & 8 > 6");
  });

  it("collapses whitespace and trims", () => {
    expect(stripHtml("<p>  یک\n\n  دو  </p>")).toBe("یک دو");
  });

  it("returns an empty string for empty input", () => {
    expect(stripHtml("")).toBe("");
  });
});

describe("sanitizeHtml", () => {
  it("keeps the allowed prose markup", () => {
    const html =
      '<h2>عنوان</h2><p class="x">متن <strong>پررنگ</strong></p><ul><li>یک</li></ul>' +
      '<blockquote cite="https://example.com">نقل</blockquote>' +
      '<table><thead><tr><th scope="col">سر</th></tr></thead><tbody><tr><td>خانه</td></tr></tbody></table>';
    const safe = sanitizeHtml(html);

    expect(safe).toContain("<h2>عنوان</h2>");
    expect(safe).toContain("<strong>پررنگ</strong>");
    expect(safe).toContain('<th scope="col">');
    expect(safe).toContain('<blockquote cite="https://example.com">');
    // Attributes outside the allowlist are dropped even on allowed tags.
    expect(safe).not.toContain("class=");
  });

  it("drops script tags with their content", () => {
    expect(sanitizeHtml('<p>سلام</p><script>alert("x")</script>')).toBe("<p>سلام</p>");
    expect(sanitizeHtml("<style>body{display:none}</style><p>a</p>")).toBe("<p>a</p>");
  });

  it("drops event handler attributes", () => {
    const safe = sanitizeHtml('<p onclick="steal()" onmouseover="x()">متن</p>');

    expect(safe).toBe("<p>متن</p>");
  });

  it("neutralises dangerous URL schemes", () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)">x</a>')).not.toContain("javascript:");
    expect(sanitizeHtml('<img src="javascript:alert(1)">')).not.toContain("javascript:");
    expect(sanitizeHtml('<a href="https://example.com">x</a>')).toContain(
      'href="https://example.com"',
    );
  });

  it("drops embedded frames and objects entirely", () => {
    expect(sanitizeHtml('<iframe src="https://evil.test"></iframe><p>a</p>')).toBe("<p>a</p>");
    expect(sanitizeHtml('<object data="x"></object><p>a</p>')).toBe("<p>a</p>");
  });

  it("marks stripped nested payloads instead of leaking them", () => {
    // One stripped tag inside another leaves the sanitizer's `[removed]` marker in place of the
    // payload. The dangerous markup is gone either way; the marker only shows that it was there.
    const safe = sanitizeHtml("<svg><script>alert(1)</script></svg><p>a</p>");

    expect(safe).toBe("[removed]<p>a</p>");
    expect(safe).not.toContain("alert");
  });

  it("adds rel to links that open a new tab", () => {
    const safe = sanitizeHtml('<a href="https://example.com" target="_blank">x</a>');

    expect(safe).toContain('rel="noopener noreferrer"');
  });

  it("keeps an explicit rel untouched", () => {
    const safe = sanitizeHtml('<a href="https://e.test" target="_blank" rel="nofollow">x</a>');

    expect(safe).toContain('rel="nofollow"');
    expect(safe).not.toContain("noopener");
  });

  it("returns an empty string for empty input", () => {
    expect(sanitizeHtml("")).toBe("");
  });

  it("exposes the allowlist without style or event attributes", () => {
    expect(richContentAllowList.a).toEqual(["href", "title", "target", "rel"]);
    expect(Object.values(richContentAllowList).flat()).not.toContain("style");
  });
});
