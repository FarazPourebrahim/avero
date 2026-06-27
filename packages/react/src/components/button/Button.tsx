import { Slot } from "radix-ui";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";
import { buttonVariants, type ButtonVariantProps } from "./button.variants.js";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & {
    /** Renders the child element (e.g. a link) with button styles instead of a `<button>`. */
    asChild?: boolean;
    /** Shows a spinner, marks the button busy and blocks interaction while an action is pending. */
    loading?: boolean;
  };

function Spinner() {
  return (
    <span
      aria-hidden="true"
      data-slot="button-spinner"
      className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    asChild = false,
    loading = false,
    disabled,
    className,
    variant,
    tone,
    size,
    radius,
    block,
    elevated,
    type,
    children,
    ...props
  },
  ref,
) {
  const classes = cn(buttonVariants({ variant, tone, size, radius, block, elevated }), className);

  if (asChild) {
    return (
      <Slot.Root ref={ref} data-slot="button" className={classes} {...props}>
        {children}
      </Slot.Root>
    );
  }

  return (
    <button
      ref={ref}
      type={type ?? "button"}
      data-slot="button"
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
});

Button.displayName = "Button";
