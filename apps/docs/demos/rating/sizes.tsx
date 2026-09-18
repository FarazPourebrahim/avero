import { Rating } from "@averoui/react";

export default function RatingSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-600">
      <Rating value={4.8} size="sm" />
      <Rating value={4.8} />
    </div>
  );
}
