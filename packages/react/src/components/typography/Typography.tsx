import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Heading scale:
 * - display: the title of a detail page
 * - article: an article title
 * - page: page titles, such as a dashboard or an "about" page
 * - section: section titles such as "دوره‌های مرتبط"
 * - card: card titles such as "دیدگاه‌ها"
 * - subsection: feature and panel titles
 */
export const headingVariants = cva("", {
  variants: {
    size: {
      display: "text-2xl leading-relaxed font-black text-slate-900 md:text-4xl",
      article: "text-2xl leading-snug font-bold text-gray-800 sm:text-3xl md:text-4xl",
      page: "text-xl font-extrabold text-slate-900 md:text-3xl",
      section: "text-xl font-bold text-slate-900 md:text-2xl",
      card: "text-lg font-bold text-gray-800",
      subsection: "text-base font-bold text-slate-800",
    },
  },
  defaultVariants: { size: "section" },
});

const DEFAULT_LEVEL = {
  display: "h1",
  article: "h1",
  page: "h1",
  section: "h2",
  card: "h3",
  subsection: "h4",
} as const;

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/** Props specific to `Heading`. It also accepts every native heading attribute. */
export type HeadingOwnProps = {
  /** Visual scale, from `display` (detail page title) to `subsection` (panel title). @defaultValue "section" */
  size?: VariantProps<typeof headingVariants>["size"];
  /** The heading element. @defaultValue the level that fits the size (e.g. `page` → `h1`) */
  as?: HeadingLevel;
  /** Renders the child element with heading styles instead. @defaultValue false */
  asChild?: boolean;
};

export type HeadingProps = Omit<HTMLAttributes<HTMLHeadingElement>, keyof HeadingOwnProps> &
  HeadingOwnProps;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { as, asChild = false, size, className, ...props },
  ref,
) {
  const Component = asChild ? Slot.Root : (as ?? DEFAULT_LEVEL[size ?? "section"]);
  return (
    <Component
      ref={ref}
      data-slot="heading"
      className={cn(headingVariants({ size }), className)}
      {...props}
    />
  );
});

Heading.displayName = "Heading";

/**
 * Body text styles:
 * - body: article paragraphs (`text-base leading-8 text-gray-700`)
 * - lead: justified intro paragraphs
 * - muted: secondary descriptions (`text-xs md:text-sm text-gray-500`)
 * - caption: fine print such as a comment moderation note
 */
export const textVariants = cva("", {
  variants: {
    variant: {
      body: "text-base leading-8 text-gray-700",
      lead: "md:text-md text-justify text-sm leading-8 text-gray-600",
      muted: "text-xs leading-6 text-gray-500 md:text-sm",
      caption: "text-xs text-gray-400",
    },
  },
  defaultVariants: { variant: "body" },
});

/** Props specific to `Text`. It also accepts every native paragraph attribute. */
export type TextOwnProps = {
  /** Text style. @defaultValue "body" */
  variant?: VariantProps<typeof textVariants>["variant"];
  /** The element to render. @defaultValue "p" */
  as?: "p" | "span" | "div";
  /** Renders the child element with text styles instead. @defaultValue false */
  asChild?: boolean;
};

export type TextProps = Omit<HTMLAttributes<HTMLParagraphElement>, keyof TextOwnProps> &
  TextOwnProps;

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  { as = "p", asChild = false, variant, className, ...props },
  ref,
) {
  const Component = asChild ? Slot.Root : as;
  return (
    <Component
      ref={ref}
      data-slot="text"
      className={cn(textVariants({ variant }), className)}
      {...props}
    />
  );
});

Text.displayName = "Text";

/**
 * Small uppercase labels above headings:
 * - onDark: a label above a heading in a dark banner
 * - onLight: a label above a name, such as "ارائه‌دهنده" in a provider card
 */
export const eyebrowVariants = cva("block tracking-wider uppercase", {
  variants: {
    tone: {
      onDark: "text-xs font-semibold text-cyan-400",
      onLight: "text-3xs mb-0.5 font-bold text-gray-600",
    },
  },
  defaultVariants: { tone: "onLight" },
});

/** Props specific to `Eyebrow`. It also accepts every native `<span>` attribute. */
export type EyebrowOwnProps = {
  /** Color for light or dark backgrounds. @defaultValue "onLight" */
  tone?: VariantProps<typeof eyebrowVariants>["tone"];
};

export type EyebrowProps = Omit<HTMLAttributes<HTMLSpanElement>, keyof EyebrowOwnProps> &
  EyebrowOwnProps;

export const Eyebrow = forwardRef<HTMLSpanElement, EyebrowProps>(function Eyebrow(
  { tone, className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="eyebrow"
      className={cn(eyebrowVariants({ tone }), className)}
      {...props}
    />
  );
});

Eyebrow.displayName = "Eyebrow";
