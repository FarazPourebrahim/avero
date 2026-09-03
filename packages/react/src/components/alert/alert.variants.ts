import { cva, type VariantProps } from "class-variance-authority";

/**
 * Alert styles:
 * - tinted: a soft panel in the tone's colour, for messages inside a form or page section
 * - bordered: a white panel with an accent bar at the inline start, for callouts in prose
 */
export const alertVariants = cva("flex items-start gap-3 rounded-2xl p-4 text-sm leading-6", {
  variants: {
    variant: {
      tinted: "border",
      bordered: "border border-s-4 border-gray-200 bg-white text-gray-700 shadow-xs",
    },
    tone: {
      info: "",
      success: "",
      warning: "",
      danger: "",
      neutral: "",
    },
  },
  compoundVariants: [
    { variant: "tinted", tone: "info", class: "border-blue-100 bg-blue-50 text-blue-800" },
    { variant: "tinted", tone: "success", class: "border-green-100 bg-green-50 text-green-800" },
    { variant: "tinted", tone: "warning", class: "border-amber-100 bg-amber-50 text-amber-800" },
    { variant: "tinted", tone: "danger", class: "border-red-100 bg-red-50 text-red-800" },
    { variant: "tinted", tone: "neutral", class: "border-gray-200 bg-gray-50 text-gray-700" },
    { variant: "bordered", tone: "info", class: "border-s-blue-500" },
    { variant: "bordered", tone: "success", class: "border-s-green-500" },
    { variant: "bordered", tone: "warning", class: "border-s-amber-500" },
    { variant: "bordered", tone: "danger", class: "border-s-red-500" },
    { variant: "bordered", tone: "neutral", class: "border-s-gray-400" },
  ],
  defaultVariants: {
    variant: "tinted",
    tone: "info",
  },
});

export type AlertVariantProps = VariantProps<typeof alertVariants>;

export type AlertTone = NonNullable<AlertVariantProps["tone"]>;

/** Icon colour per tone; each meets 3:1 against its tinted background. */
export const alertIconClasses: Record<AlertTone, string> = {
  info: "text-blue-600",
  success: "text-green-600",
  warning: "text-amber-600",
  danger: "text-red-600",
  neutral: "text-gray-500",
};

/** Title colour per tone on the tinted variant; the bordered variant always uses `gray-900`. */
export const alertTitleClasses: Record<AlertTone, string> = {
  info: "text-blue-900",
  success: "text-green-900",
  warning: "text-amber-900",
  danger: "text-red-900",
  neutral: "text-gray-900",
};
