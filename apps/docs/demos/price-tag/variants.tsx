import { PriceTag } from "@avero/react";

export default function PriceTagVariantsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div>
        <div className="mb-4 text-xs font-bold text-slate-400">قیمت پایه خدمت</div>
        <PriceTag amount={20_000_000} />
      </div>
      <div className="border-t border-gray-100 pt-3">
        <PriceTag variant="inline" amount={20_000_000} />
      </div>
      <PriceTag variant="compact" amount={35_000_000} />
    </div>
  );
}
