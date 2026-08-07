"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Card } from "../../components/card/index.js";
import { PriceTag } from "../../components/price-tag/index.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `PriceCard`. It also accepts every native `<div>` attribute. */
export type PriceCardOwnProps = {
  /** The price, formatted with the active locale's digits and grouping. */
  amount: number;
  /** Caption above the amount. @defaultValue the `basePrice` dictionary string */
  label?: ReactNode;
  /** Currency after the amount. @defaultValue the `currencyToman` dictionary string */
  currency?: ReactNode;
  /** Anything under the price, e.g. a call to action the reference does not have. */
  children?: ReactNode;
};

export type PriceCardProps = Omit<HTMLAttributes<HTMLDivElement>, keyof PriceCardOwnProps> &
  PriceCardOwnProps;

/**
 * Base price panel in the service sidebar (B-23, R-05): a small caption over a large primary
 * amount with its currency.
 */
export const PriceCard = forwardRef<HTMLDivElement, PriceCardProps>(function PriceCard(
  { amount, label, currency, children, className, ...props },
  ref,
) {
  const { dictionary } = useAvero();

  return (
    <Card
      ref={ref}
      variant="surface"
      elevation="xs"
      padding="none"
      className={cn("space-y-6 p-6", className)}
      data-slot="price-card"
      {...props}
    >
      <div>
        <div data-slot="price-card-label" className="mb-4 text-xs font-bold text-slate-400">
          {label ?? dictionary.basePrice}
        </div>
        <PriceTag amount={amount} variant="display" currency={currency} />
      </div>
      {children}
    </Card>
  );
});

PriceCard.displayName = "PriceCard";
