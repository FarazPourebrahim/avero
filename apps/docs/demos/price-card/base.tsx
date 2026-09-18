"use client";

import { PriceCard } from "@averoui/react";

export default function PriceCardBaseDemo() {
  return (
    <div className="w-full max-w-sm">
      <PriceCard amount={4500000} />
    </div>
  );
}
