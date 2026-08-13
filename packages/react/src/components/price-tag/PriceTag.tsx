"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { useAvero, useAveroFormatter } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

type PriceTagVariant = "display" | "inline" | "compact";

export const priceTagVariants = cva("", {
  variants: {
    variant: {
      /** A large black primary amount and a small currency, e.g. in a price card. */
      display: "flex items-baseline gap-2",
      /** A card footer price such as "از ۴٬۵۰۰٬۰۰۰ تومان". */
      inline: "text-sm-plus text-text-chrome font-normal",
      /** A small, heavy primary price, e.g. in a related-items list. */
      compact: "text-primary text-xs font-black",
    },
  },
  defaultVariants: { variant: "display" },
});

const amountClasses: Record<PriceTagVariant, string> = {
  display: "text-primary text-3xl font-black",
  inline: "font-bold",
  compact: "",
};

/** Props specific to `PriceTag`. It also accepts every native `<span>` attribute. */
export type PriceTagOwnProps = {
  /** The price, formatted with the active locale's digits and grouping. */
  amount: number;
  /** Visual style. @defaultValue "display" */
  variant?: VariantProps<typeof priceTagVariants>["variant"];
  /** Currency after the amount. @defaultValue the dictionary's `currencyToman` ("تومان" / "Toman") */
  currency?: ReactNode;
  /**
   * Text before the amount. The `inline` variant defaults to the dictionary's `pricePrefixFrom`
   * ("از" / "From"); pass `null` to hide it.
   */
  prefix?: ReactNode;
  /** Extra classes for the amount, e.g. a larger size in a custom card. */
  amountClassName?: string;
};

export type PriceTagProps = Omit<HTMLAttributes<HTMLSpanElement>, keyof PriceTagOwnProps> &
  PriceTagOwnProps;

export const PriceTag = forwardRef<HTMLSpanElement, PriceTagProps>(function PriceTag(
  { amount, variant, currency, prefix, amountClassName, className, ...props },
  ref,
) {
  const { dictionary } = useAvero();
  const format = useAveroFormatter();
  const resolved: PriceTagVariant = variant ?? "display";
  const prefixNode =
    prefix === undefined && resolved === "inline" ? dictionary.pricePrefixFrom : prefix;
  const separator = resolved === "display" ? null : " ";

  return (
    <span
      ref={ref}
      data-slot="price-tag"
      className={cn(priceTagVariants({ variant }), className)}
      {...props}
    >
      {prefixNode ? (
        <>
          <span data-slot="price-tag-prefix">{prefixNode}</span>
          {separator}
        </>
      ) : null}
      <span data-slot="price-tag-amount" className={cn(amountClasses[resolved], amountClassName)}>
        {format.number(amount)}
      </span>
      {separator}
      <span
        data-slot="price-tag-currency"
        className={resolved === "display" ? "text-xs font-bold text-slate-500" : undefined}
      >
        {currency ?? dictionary.currencyToman}
      </span>
    </span>
  );
});

PriceTag.displayName = "PriceTag";
