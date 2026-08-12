import { cva, type VariantProps } from "class-variance-authority";

/**
 * Badge styles (P-04):
 * - status: publication and availability states such as "منتشر شده" or "9 جای خالی"
 * - outline: bordered soft pills for category, format or location
 * - counter: a count beside a heading
 * - premium: gold gradient badge for special plans
 * - label: gradient label pill above a section title
 * - overlay: floating labels on media, such as a zoom hint
 * - solid: a strong status badge over a covered card
 */
export const badgeVariants = cva("inline-flex items-center gap-1.5 whitespace-nowrap", {
  variants: {
    variant: {
      status: "rounded-full px-2 py-0.5 text-xs font-medium",
      outline: "rounded-full border px-3.5 py-1 text-xs font-bold",
      counter: "rounded-full bg-gray-50 px-2.5 py-1 text-xs font-bold text-gray-700",
      premium:
        "gradient-premium rounded-full border border-amber-300/40 px-3 py-1 text-xs font-bold text-amber-700 shadow-xs",
      label:
        "gradient-label border-primary/20 text-primary rounded-full border px-3.5 py-1.5 text-xs font-bold shadow-xs md:text-sm",
      overlay: "rounded-full px-3.5 py-2 text-xs font-semibold text-white shadow-lg",
      solid: "rounded-xl px-5 py-2 text-sm text-white",
    },
    tone: {
      neutral: "",
      success: "",
      danger: "",
      indigo: "",
      emerald: "",
      amber: "",
      blue: "",
      dark: "",
    },
  },
  compoundVariants: [
    { variant: "status", tone: "neutral", class: "bg-gray-100 text-gray-600" },
    { variant: "status", tone: "success", class: "bg-green-100 text-green-700" },
    { variant: "status", tone: "danger", class: "bg-red-100 text-red-700" },
    { variant: "outline", tone: "neutral", class: "border-slate-100 bg-slate-50 text-slate-600" },
    { variant: "outline", tone: "indigo", class: "border-indigo-100 bg-indigo-50 text-indigo-600" },
    {
      variant: "outline",
      tone: "emerald",
      class: "border-emerald-100 bg-emerald-50 text-emerald-700",
    },
    { variant: "outline", tone: "amber", class: "border-amber-100 bg-amber-50 text-amber-700" },
    { variant: "overlay", tone: ["neutral", "dark"], class: "bg-black/60 backdrop-blur-sm" },
    {
      variant: "overlay",
      tone: "blue",
      class: "rounded-xl bg-blue-600/90 px-3 py-1.5 font-bold shadow-none backdrop-blur-xs",
    },
    { variant: "solid", tone: ["neutral", "danger"], class: "bg-red-500" },
    { variant: "solid", tone: "success", class: "bg-green-600" },
  ],
  defaultVariants: {
    variant: "status",
    tone: "neutral",
  },
});

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
