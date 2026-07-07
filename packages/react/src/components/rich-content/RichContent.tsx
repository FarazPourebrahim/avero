import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";
import { sanitizeHtml } from "../../utils/sanitize.js";

const VARIANT_CLASSES = {
  /** Rendered article, service and project descriptions (`.content-area`). */
  content: "avero-rich-content",
  /** Editor preview (`.editor`). */
  editor: "avero-rich-content-editor",
  /** Question surface (`.question-rendered-content`): shared list rules, inherited typography. */
  question: "avero-rich-content-question",
} as const;

/** Props specific to `RichContent`. It also accepts every native `<div>` attribute. */
export type RichContentOwnProps = {
  /** HTML to render. It is always sanitized before it reaches the DOM. */
  html: string;
  /** Prose style. @defaultValue "content" */
  variant?: keyof typeof VARIANT_CLASSES;
  /**
   * Replaces the built-in sanitizer. It receives the raw HTML and **must** return safe HTML —
   * passing a function that returns its input reintroduces XSS.
   */
  sanitize?: (html: string) => string;
};

export type RichContentProps = Omit<HTMLAttributes<HTMLDivElement>, keyof RichContentOwnProps> &
  RichContentOwnProps;

/**
 * Renders stored HTML with the reference's prose styles (D-12, R-01/R-05/R-07). The HTML is
 * sanitized on every render, on the server and in the browser alike, so untrusted content
 * (comments, descriptions, editor output) is safe to pass straight in.
 */
export const RichContent = forwardRef<HTMLDivElement, RichContentProps>(function RichContent(
  { html, variant = "content", sanitize = sanitizeHtml, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="rich-content"
      className={cn(VARIANT_CLASSES[variant], className)}
      dangerouslySetInnerHTML={{ __html: sanitize(html) }}
      {...props}
    />
  );
});

RichContent.displayName = "RichContent";
