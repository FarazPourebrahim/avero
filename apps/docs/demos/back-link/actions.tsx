"use client";

import { BackLink } from "@averoui/react";
import { useState } from "react";

export default function BackLinkActionsDemo() {
  const [step, setStep] = useState(2);

  return (
    <div className="flex flex-col items-start gap-4">
      <BackLink label="مرحله پیش" onClick={() => setStep((current) => Math.max(1, current - 1))} />
      <p role="status" className="text-sm text-gray-700">
        مرحله {step} از ۳
      </p>
    </div>
  );
}
