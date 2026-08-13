import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";
import { IconTile } from "../icon-tile/IconTile.js";

/** The gradient that fills the tile on hover; it matches the icon tile's gradient. */
export const actionTileOverlayVariants = cva(
  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
  {
    variants: {
      tone: {
        primary: "from-blue-500 to-blue-600",
        blue: "from-blue-500 to-blue-600",
        purple: "from-purple-500 to-purple-600",
        amber: "from-amber-500 to-orange-500",
        emerald: "from-emerald-500 to-emerald-600",
        rose: "from-rose-500 to-pink-600",
        indigo: "from-indigo-500 to-indigo-600",
        slate: "from-slate-600 to-slate-700",
      },
    },
    defaultVariants: { tone: "blue" },
  },
);

/** Props specific to `ActionTile`. It also accepts every native `<button>` attribute. */
export type ActionTileOwnProps = {
  /** Icon shown in a gradient tile. */
  icon: ReactNode;
  /** Gradient color. @defaultValue "blue" */
  tone?: VariantProps<typeof actionTileOverlayVariants>["tone"];
  /** Renders the child element (e.g. a link) with tile styles; put the label inside it. @defaultValue false */
  asChild?: boolean;
};

export type ActionTileProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ActionTileOwnProps
> &
  ActionTileOwnProps;

/**
 * Dashboard quick action (D-06): a gradient icon tile with a label; on hover the whole tile
 * fills with the gradient, lifts slightly and the label turns white.
 */
export const ActionTile = forwardRef<HTMLButtonElement, ActionTileProps>(function ActionTile(
  { icon, tone = "blue", asChild = false, type, className, children, ...props },
  ref,
) {
  const content = (
    <>
      <span aria-hidden="true" className={actionTileOverlayVariants({ tone })} />
      <span className="relative flex flex-col items-center gap-1.5 sm:gap-2">
        <IconTile
          variant="gradient"
          tone={tone ?? "blue"}
          size="lg"
          className="transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-lg"
        >
          {icon}
        </IconTile>
        <span className="text-2xs text-center leading-tight font-medium text-gray-600 transition-colors duration-300 group-hover:text-white sm:text-xs">
          {asChild ? null : children}
        </span>
      </span>
    </>
  );
  const classes = cn(
    "group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-4",
    "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
    className,
  );

  if (asChild) {
    return (
      <Slot.Root ref={ref} data-slot="action-tile" className={classes} {...props}>
        {children}
      </Slot.Root>
    );
  }

  return (
    <button
      ref={ref}
      type={type ?? "button"}
      data-slot="action-tile"
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
});

ActionTile.displayName = "ActionTile";
