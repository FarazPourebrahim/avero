import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Colored icon containers extracted from the reference (P-07):
 * - soft: dashboard stat tiles and feature cards (`bg-{c}-50 text-{c}-600`, R-02/R-03)
 * - muted: dashboard achievement rows (`bg-{c}-100 text-{c}-600`, R-02)
 * - tint: profile stat tiles (`bg-{c}-600/10 text-{c}-600`, R-04)
 * - gradient: dashboard quick actions (`from-{c}-500 to-{c}-600`, R-02)
 */
export const iconTileVariants = cva(
  "inline-flex shrink-0 items-center justify-center [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        soft: "",
        muted: "",
        tint: "",
        gradient: "bg-gradient-to-br text-white",
      },
      tone: {
        primary: "",
        blue: "",
        purple: "",
        amber: "",
        emerald: "",
        rose: "",
        indigo: "",
        slate: "",
      },
      size: {
        xs: "size-7 rounded-lg sm:size-8",
        sm: "size-8 rounded-xl",
        md: "size-8 rounded-lg sm:size-9",
        lg: "size-8 rounded-xl sm:size-10",
        xl: "size-10 rounded-xl sm:size-12",
        padded: "rounded-xl p-3",
      },
    },
    compoundVariants: [
      // soft
      { variant: "soft", tone: "primary", class: "text-primary bg-blue-50" },
      { variant: "soft", tone: "blue", class: "bg-blue-50 text-blue-600" },
      { variant: "soft", tone: "purple", class: "bg-purple-50 text-purple-600" },
      { variant: "soft", tone: "amber", class: "bg-amber-50 text-amber-600" },
      { variant: "soft", tone: "emerald", class: "bg-emerald-50 text-emerald-600" },
      { variant: "soft", tone: "rose", class: "bg-rose-50 text-rose-600" },
      { variant: "soft", tone: "indigo", class: "bg-indigo-50 text-indigo-600" },
      { variant: "soft", tone: "slate", class: "bg-slate-50 text-slate-600" },
      // muted
      { variant: "muted", tone: ["primary", "blue"], class: "bg-blue-100 text-blue-600" },
      { variant: "muted", tone: "purple", class: "bg-purple-100 text-purple-600" },
      { variant: "muted", tone: "amber", class: "bg-amber-100 text-amber-600" },
      { variant: "muted", tone: "emerald", class: "bg-emerald-100 text-emerald-600" },
      { variant: "muted", tone: "rose", class: "bg-rose-100 text-rose-600" },
      { variant: "muted", tone: "indigo", class: "bg-indigo-100 text-indigo-600" },
      { variant: "muted", tone: "slate", class: "bg-slate-100 text-slate-600" },
      // tint
      { variant: "tint", tone: ["primary", "blue"], class: "bg-blue-600/10 text-blue-600" },
      { variant: "tint", tone: "purple", class: "bg-purple-600/10 text-purple-600" },
      { variant: "tint", tone: "amber", class: "bg-amber-500/10 text-amber-500" },
      { variant: "tint", tone: "emerald", class: "bg-emerald-600/10 text-emerald-600" },
      { variant: "tint", tone: "rose", class: "bg-rose-600/10 text-rose-600" },
      { variant: "tint", tone: "indigo", class: "bg-indigo-600/10 text-indigo-600" },
      { variant: "tint", tone: "slate", class: "bg-slate-600/10 text-slate-600" },
      // gradient
      { variant: "gradient", tone: ["primary", "blue"], class: "from-blue-500 to-blue-600" },
      { variant: "gradient", tone: "purple", class: "from-purple-500 to-purple-600" },
      { variant: "gradient", tone: "amber", class: "from-amber-500 to-orange-500" },
      { variant: "gradient", tone: "emerald", class: "from-emerald-500 to-emerald-600" },
      { variant: "gradient", tone: "rose", class: "from-rose-500 to-pink-600" },
      { variant: "gradient", tone: "indigo", class: "from-indigo-500 to-indigo-600" },
      { variant: "gradient", tone: "slate", class: "from-slate-600 to-slate-700" },
    ],
    defaultVariants: {
      variant: "soft",
      tone: "blue",
      size: "xs",
    },
  },
);

export type IconTileProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof iconTileVariants>;

/** A decorative, tinted square that holds an icon. Place the icon as its child. */
export const IconTile = forwardRef<HTMLSpanElement, IconTileProps>(function IconTile(
  { className, variant, tone, size, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="icon-tile"
      aria-hidden="true"
      className={cn(iconTileVariants({ variant, tone, size }), className)}
      {...props}
    />
  );
});

IconTile.displayName = "IconTile";
