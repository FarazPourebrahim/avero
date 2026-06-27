import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Heading scale extracted from the reference (P-10):
 * - display: service title (R-05)
 * - article: blog article title (R-01)
 * - page: page titles such as "داستان شکل‌گیری دورلنسر" and "پیشخوان فریلنسر" (R-02, R-03)
 * - section: section titles such as "خدمات فریلنسرها" / "پروژه‌های مرتبط" (R-06, R-07)
 * - card: card titles such as "نظرات کاربران" (R-01)
 * - subsection: feature and panel titles (R-03, R-05)
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

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    /** The heading element. Defaults to the level that fits the size (e.g. `page` → `h1`). */
    as?: HeadingLevel;
    asChild?: boolean;
  };

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
 * Body text styles extracted from the reference (P-10):
 * - body: article paragraphs (`text-base leading-8 text-gray-700`, R-01)
 * - lead: justified intro paragraphs (R-03)
 * - muted: secondary descriptions (`text-xs md:text-sm text-gray-500`, R-03)
 * - caption: fine print such as the comment moderation note (R-01)
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

export type TextProps = HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants> & {
    as?: "p" | "span" | "div";
    asChild?: boolean;
  };

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
 * Small uppercase labels above headings (P-10):
 * - onDark: "مأموریت و چشم‌انداز" in the dark banner (R-03)
 * - onLight: "ارائه‌دهنده خدمت" in the provider card (R-05)
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

export type EyebrowProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof eyebrowVariants>;

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
