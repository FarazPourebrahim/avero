"use client";

import { ToggleChip, ToggleChipGroup } from "@averoui/react";
import { useCopy } from "../copy";

export default function ToggleChipGroupMetricsDemo() {
  const t = useCopy({
    fa: {
      label: "شاخص‌های نمودار",
      views: "بازدید",
      likes: "لایک",
      clicks: "کلیک",
      comments: "نظر",
    },
    en: {
      label: "Chart metrics",
      views: "Views",
      likes: "Likes",
      clicks: "Clicks",
      comments: "Comments",
    },
  });

  return (
    <ToggleChipGroup aria-label={t.label} defaultValue={["views", "likes"]}>
      <ToggleChip value="views" color="var(--color-indigo-500)">
        {t.views}
      </ToggleChip>
      <ToggleChip value="likes" color="var(--color-rose-500)">
        {t.likes}
      </ToggleChip>
      <ToggleChip value="clicks" color="var(--color-emerald-500)">
        {t.clicks}
      </ToggleChip>
      <ToggleChip value="comments" color="var(--color-amber-500)">
        {t.comments}
      </ToggleChip>
    </ToggleChipGroup>
  );
}
