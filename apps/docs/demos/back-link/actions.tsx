"use client";

import { BackLink } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function BackLinkActionsDemo() {
  const [step, setStep] = useState(2);
  const t = useCopy({
    fa: { previous: "مرحله پیش", progress: (current: number) => `مرحله ${current} از ۳` },
    en: { previous: "Previous step", progress: (current: number) => `Step ${current} of 3` },
  });

  return (
    <div className="flex flex-col items-start gap-4">
      <BackLink label={t.previous} onClick={() => setStep((current) => Math.max(1, current - 1))} />
      <p role="status" className="text-sm text-gray-700">
        {t.progress(step)}
      </p>
    </div>
  );
}
