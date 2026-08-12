"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { forwardRef, type HTMLAttributes, type ReactNode, type Ref } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { ArrowRightIcon } from "../../icons/internalIcons.js";
import { ArrowRightSolidIcon } from "../../icons/publicIcons.js";
import { cn } from "../../utils/cn.js";

/**
 * Back links (N-03):
 * - text: a "بازگشت" button with a solid arrow
 * - soft: a back button with a hover fill
 * - subtle: a quiet link such as "بازگشت به فهرست دوره‌ها"
 * The arrow points to the inline start (right in RTL) and flips in LTR.
 */
export const backLinkVariants = cva(
  "focus-visible:ring-primary/40 inline-flex cursor-pointer items-center gap-2 rounded-sm transition focus-visible:ring-2 focus-visible:outline-none",
  {
    variants: {
      variant: {
        text: "hover:text-primary text-sm font-medium text-gray-500",
        soft: "px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50",
        subtle: "text-sm text-gray-500 hover:text-gray-700",
      },
    },
    defaultVariants: { variant: "text" },
  },
);

/** Props specific to `BackLink`. It also accepts every native link or button attribute. */
export type BackLinkOwnProps = {
  /** Visual style. @defaultValue "text" */
  variant?: VariantProps<typeof backLinkVariants>["variant"];
  /** Destination. With `href` it renders a link; without it, a button (use `onClick`). */
  href?: string;
  /** Visible label. @defaultValue the dictionary's `back` string ("بازگشت" / "Back") */
  label?: ReactNode;
  /** Renders the child element (e.g. a router link) with back-link styles. The label and arrow are added inside it. @defaultValue false */
  asChild?: boolean;
};

export type BackLinkProps = Omit<HTMLAttributes<HTMLElement>, keyof BackLinkOwnProps> &
  BackLinkOwnProps;

function BackArrow({ variant }: { variant: BackLinkOwnProps["variant"] }) {
  const flip = "shrink-0 ltr:-scale-x-100";
  if (variant === "soft") return <ArrowRightIcon className={cn(flip, "size-4")} />;
  if (variant === "subtle") return <ArrowRightIcon size={24} className={flip} />;
  return <ArrowRightSolidIcon className={flip} />;
}

export const BackLink = forwardRef<HTMLElement, BackLinkProps>(function BackLink(
  { variant, href, label, asChild = false, className, children, ...props },
  ref,
) {
  const { dictionary } = useAvero();
  const classes = cn(backLinkVariants({ variant }), className);
  const content = (
    <>
      <BackArrow variant={variant ?? "text"} />
      <span>{label ?? dictionary.back}</span>
    </>
  );

  if (asChild) {
    return (
      <Slot.Root ref={ref} data-slot="back-link" className={classes} {...props}>
        <Slot.Slottable>{children}</Slot.Slottable>
      </Slot.Root>
    );
  }

  if (href !== undefined) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        data-slot="back-link"
        className={classes}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      data-slot="back-link"
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
});

BackLink.displayName = "BackLink";
