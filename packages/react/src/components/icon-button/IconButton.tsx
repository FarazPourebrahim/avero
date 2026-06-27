import { Slot } from "radix-ui";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";
import { iconButtonVariants, type IconButtonVariantProps } from "./iconButton.variants.js";

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> &
  IconButtonVariantProps & {
    /** Accessible name. Icon-only controls have no visible text, so a label is required. */
    label: string;
    /** Renders the child element (e.g. a link) with icon-button styles instead of a `<button>`. */
    asChild?: boolean;
  };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, asChild = false, className, variant, tone, size, type, children, ...props },
  ref,
) {
  const classes = cn(iconButtonVariants({ variant, tone, size }), className);

  if (asChild) {
    return (
      <Slot.Root
        ref={ref}
        aria-label={label}
        data-slot="icon-button"
        className={classes}
        {...props}
      >
        {children}
      </Slot.Root>
    );
  }

  return (
    <button
      ref={ref}
      type={type ?? "button"}
      aria-label={label}
      data-slot="icon-button"
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
});

IconButton.displayName = "IconButton";
