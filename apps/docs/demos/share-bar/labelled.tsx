"use client";

import { ShareBar } from "@averoui/react";
import { useCopy } from "../copy";

export default function ShareBarLabelledDemo() {
  const t = useCopy({
    fa: { label: "اشتراک‌گذاری این دوره:" },
    en: { label: "Share this course:" },
  });

  return (
    <div className="w-full">
      <ShareBar variant="labelled" label={t.label} />
    </div>
  );
}
