"use client";

import { PriceTag } from "@averoui/react";
import { useCopy } from "../copy";

export default function PriceTagCurrencyDemo() {
  const t = useCopy({
    fa: { from: "از", dollars: "دلار" },
    en: { from: "From", dollars: "USD" },
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <PriceTag variant="inline" prefix={t.from} amount={1_900_000} />
      <PriceTag amount={49} currency={t.dollars} />
      <PriceTag variant="compact" amount={350_000} currency={null} />
    </div>
  );
}
