"use client";

import { PriceCard } from "@avero/react";

export default function PriceCardBaseDemo() {
  return (
    <div className="w-full max-w-sm">
      <PriceCard amount={4500000} />
    </div>
  );
}
