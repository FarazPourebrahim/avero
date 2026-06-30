import { Slot } from "radix-ui";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";
import { iconButtonVariants, type IconButtonVariantProps } from "./iconButton.variants.js";

/** Props specific to `IconButton`. It also accepts every native `<button>` attribute except `aria-label`. */
export type IconButtonOwnProps = {
  /** Accessible name. Icon-only controls have no visible text, so a label is required. */
  label: string;
  /** Visual style, from the dashboard `chrome` buttons to the footer social `tile`. @defaultValue "chrome" */
  variant?: IconButtonVariantProps["variant"];
  /** Color of the `soft` variant. @defaultValue "neutral" */
  tone?: IconButtonVariantProps["tone"];
  /** Padding. Ignored by the fixed-size `social` and `tile` variants. @defaultValue "md" */
  size?: IconButtonVariantProps["size"];
  /** Renders the child element (e.g. a link) with icon-button styles instead of a `<button>`. @defaultValue false */
  asChild?: boolean;
};

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof IconButtonOwnProps | "aria-label"
> &
  IconButtonOwnProps;

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
