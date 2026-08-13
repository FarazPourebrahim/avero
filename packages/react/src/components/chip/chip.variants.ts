import { cva, type VariantProps } from "class-variance-authority";

/**
 * Chip / tag styles:
 * - category: a card's category chip, or a small format chip
 * - link: a category link under an article
 * - tag: a related-topic link with a tag icon
 * - footer: bordered footer link chip
 * - mini: compact technology tag
 * - skill: profile skill tag
 */
export const chipVariants = cva("inline-flex items-center whitespace-nowrap", {
  variants: {
    variant: {
      category: "rounded-full bg-gray-100 px-2 py-1 text-xs font-normal text-gray-600",
      link: "rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-indigo-100",
      tag: [
        "group gap-2 rounded-xl border border-slate-200/90 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 transition-all sm:text-sm",
        "hover:border-blue-200 hover:bg-blue-50/80 hover:text-blue-700",
        "[&>svg]:size-4 [&>svg]:text-slate-400 [&>svg]:transition-colors group-hover:[&>svg]:text-blue-500",
      ],
      footer:
        "border-text-chrome/15 text-text-chrome hover:text-text-chrome-hover rounded-md border px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-linear hover:bg-white",
      mini: "text-3xs rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-600",
      skill:
        "rounded-xl border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-2xs",
    },
    size: {
      sm: "",
      md: "",
    },
  },
  compoundVariants: [{ variant: "category", size: "sm", class: "text-3xs py-0.5" }],
  defaultVariants: {
    variant: "category",
    size: "md",
  },
});

export type ChipVariantProps = VariantProps<typeof chipVariants>;
