import { cva, type VariantProps } from "class-variance-authority";

/**
 * Icon-only button styles:
 * - chrome: dashboard toolbar buttons such as home and notifications
 * - outline: header menu toggle
 * - ghost: drawer close button
 * - soft + tone: share buttons
 * - circle: carousel previous / next
 * - social: profile social links
 * - tile: footer social icons, which turn orange on hover
 */
export const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center transition duration-200",
    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-30",
    "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        chrome:
          "rounded-xl border border-zinc-200/50 bg-zinc-50 text-zinc-600 shadow-xs hover:bg-zinc-100 hover:text-zinc-800",
        outline: "rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50",
        ghost: "rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600",
        soft: "rounded-xl",
        circle: "rounded-full border border-gray-200 hover:bg-gray-50",
        social:
          "size-9 rounded-xl bg-slate-100 text-slate-600 shadow-xs hover:bg-blue-600 hover:text-white",
        tile: "bg-surface-muted text-icon-muted hover:text-accent-social size-10 rounded-md",
      },
      tone: {
        neutral: "",
        blue: "",
        sky: "",
        green: "",
        emerald: "",
        slate: "",
      },
      size: {
        sm: "p-1.5",
        md: "p-2",
        lg: "p-2.5",
      },
    },
    compoundVariants: [
      { variant: "soft", tone: "neutral", class: "bg-gray-50 text-gray-600 hover:bg-gray-100" },
      { variant: "soft", tone: "blue", class: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
      { variant: "soft", tone: "sky", class: "bg-sky-50 text-sky-600 hover:bg-sky-100" },
      { variant: "soft", tone: "green", class: "bg-green-50 text-green-600 hover:bg-green-100" },
      {
        variant: "soft",
        tone: "emerald",
        class: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
      },
      {
        variant: "soft",
        tone: "slate",
        class: "bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600",
      },
      // Fixed-size variants ignore the padding scale.
      { variant: ["social", "tile"], class: "p-0" },
    ],
    defaultVariants: {
      variant: "chrome",
      tone: "neutral",
      size: "md",
    },
  },
);

export type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;
