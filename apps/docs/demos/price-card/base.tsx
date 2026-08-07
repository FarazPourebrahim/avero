"use client";

import { PriceCard } from "@avero/react";

export default function PriceCardBaseDemo() {
  return (
    <div className="w-full max-w-sm">
      <PriceCard amount={20000000} />
    </div>
  );
}
