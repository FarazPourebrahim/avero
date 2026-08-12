import { Slot } from "radix-ui";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";
import { buttonVariants, type ButtonVariantProps } from "./button.variants.js";

/** Props specific to `Button`. It also accepts every native `<button>` attribute. */
export type ButtonOwnProps = {
  /** Visual style. `soft` takes its color from `tone`. @defaultValue "primary" */
  variant?: ButtonVariantProps["variant"];
  /** Color of the `soft` variant. @defaultValue "neutral" */
  tone?: ButtonVariantProps["tone"];
  /** Padding and type size. @defaultValue "md" */
  size?: ButtonVariantProps["size"];
  /** Corner radius. @defaultValue "xl" */
  radius?: ButtonVariantProps["radius"];
  /** Stretches the button to the full width of its container. @defaultValue false */
  block?: ButtonVariantProps["block"];
  /** Adds a soft drop shadow (primary: `shadow-md shadow-primary/20`). @defaultValue false */
  elevated?: ButtonVariantProps["elevated"];
  /** Renders the child element (e.g. a link) with button styles instead of a `<button>`. @defaultValue false */
  asChild?: boolean;
  /** Shows a spinner, marks the button busy and blocks interaction while an action is pending. @defaultValue false */
  loading?: boolean;
};

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> &
  ButtonOwnProps;

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
