"use client";

import { MatchScore } from "@averoui/react";
import { useCopy } from "../copy";

export default function MatchScoreValuesDemo() {
  const t = useCopy({
    fa: { search: "هم‌خوانی با جستجو" },
    en: { search: "Match with your search" },
  });

  return (
    <div className="flex flex-wrap items-start gap-8">
      <MatchScore value={96} />
      <MatchScore value={64} label={t.search} />
      <MatchScore value={0} />
    </div>
  );
}
