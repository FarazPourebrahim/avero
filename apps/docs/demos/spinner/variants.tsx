import { Spinner } from "@averoui/react";

const VARIANTS = ["ring", "track", "glow", "dots", "bars", "spokes"] as const;

export default function SpinnerVariants() {
  return (
    <div className="text-primary grid grid-cols-3 gap-x-10 gap-y-6 sm:grid-cols-6">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-3">
          <Spinner variant={variant} size="xl" />
          <code className="text-xs text-gray-600" dir="ltr">
            {variant}
          </code>
        </div>
      ))}
    </div>
  );
}
