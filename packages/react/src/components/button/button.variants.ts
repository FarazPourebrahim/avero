import { cva, type VariantProps } from "class-variance-authority";

/**
 * Button styles extracted from the reference (P-01):
 * - primary: CTA buttons (R-03 "مشاهده پروژه‌ها", comment submit R-01/R-05, dashboard menu R-02)
 * - secondary: orange drawer CTA "ثبت آگهی" (shared mobile drawer)
 * - soft + tone: tinted share / report / certificate / contact buttons (R-01, R-03, R-04, R-05)
 * - ghost: back button (R-01)
 * - outline: "مشاهده پروفایل فریلنسر" (R-05)
 * - inverse: "ارسال درخواست" (R-07)
 * - warning: amber CTA (CSS-only in the reference)
 */
export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all duration-200",
    "cursor-pointer disabled:pointer-events-none disabled:opacity-50 aria-busy:cursor-progress",
    "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary-hover text-white",
        secondary: "bg-secondary text-white hover:opacity-90 active:scale-[0.99]",
        soft: "",
        ghost: "hover:text-primary text-gray-500",
        outline:
          "hover:border-primary hover:text-primary border border-slate-200 bg-transparent text-slate-700",
        inverse:
          "border-primary bg-primary hover:bg-surface-glass hover:text-primary border text-white",
        warning: "bg-warning hover:bg-warning-hover text-white",
      },
      tone: {
        neutral: "",
        slate: "",
        sky: "",
        emerald: "",
        blue: "",
        indigo: "",
        purple: "",
        amber: "",
        rose: "",
        red: "",
      },
      size: {
        xs: "gap-1 px-2.5 py-1 text-xs font-semibold",
        sm: "gap-1.5 px-3.5 py-2 text-xs font-bold",
        md: "gap-2 px-5 py-2.5 text-sm font-semibold",
        lg: "gap-2 px-6 py-3 text-sm font-medium",
        xl: "gap-2 px-6 py-3.5 text-base font-medium",
      },
      radius: {
        none: "rounded-none",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
      block: {
        true: "w-full",
        false: "",
      },
      elevated: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "soft", tone: "neutral", class: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
      // Portfolio card like button (R-08); mirrors IconButton's slate tone.
      { variant: "soft", tone: "slate", class: "bg-slate-50 text-slate-500 hover:bg-slate-100" },
      { variant: "soft", tone: "sky", class: "bg-sky-50 text-sky-600 hover:bg-sky-100" },
      {
        variant: "soft",
        tone: "emerald",
        class: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
      },
      { variant: "soft", tone: "blue", class: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
      {
        variant: "soft",
        tone: "indigo",
        class: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
      },
      {
        variant: "soft",
        tone: "purple",
        class: "bg-purple-50 text-purple-700 hover:bg-purple-100",
      },
      { variant: "soft", tone: "amber", class: "bg-amber-50 text-amber-600 hover:bg-amber-100" },
      { variant: "soft", tone: "rose", class: "bg-rose-50 text-rose-600 hover:bg-rose-100" },
      { variant: "soft", tone: "red", class: "bg-red-50 text-red-600 hover:bg-red-100" },
      { variant: "primary", elevated: true, class: "shadow-primary/20 shadow-md" },
      { variant: ["secondary", "inverse", "warning"], elevated: true, class: "shadow-sm" },
    ],
    defaultVariants: {
      variant: "primary",
      tone: "neutral",
      size: "md",
      radius: "xl",
      block: false,
      elevated: false,
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
