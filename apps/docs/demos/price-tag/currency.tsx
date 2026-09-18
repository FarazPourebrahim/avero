import { PriceTag } from "@averoui/react";

export default function PriceTagCurrencyDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <PriceTag variant="inline" prefix="از" amount={1_900_000} />
      <PriceTag amount={49} currency="دلار" />
      <PriceTag variant="compact" amount={350_000} currency={null} />
    </div>
  );
}
