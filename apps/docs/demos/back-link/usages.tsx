"use client";

import { BackLink } from "@averoui/react";
import { useCopy } from "../copy";

export default function BackLinkUsagesDemo() {
  const t = useCopy({
    fa: { toCourses: "بازگشت به فهرست دوره‌ها" },
    en: { toCourses: "Back to all courses" },
  });

  return (
    <div className="flex flex-col items-start gap-6">
      <BackLink />
      <BackLink variant="soft" />
      <BackLink variant="subtle" href="#courses" label={t.toCourses} />
    </div>
  );
}
