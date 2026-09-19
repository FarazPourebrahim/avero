"use client";

import { ToggleChip, ToggleChipGroup } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function ToggleChipGroupControlledDemo() {
  const [levels, setLevels] = useState<string[]>([]);
  const t = useCopy({
    fa: {
      label: "سطح دوره",
      beginner: "مقدماتی",
      intermediate: "متوسط",
      advanced: "پیشرفته",
      all: "همه سطح‌ها",
      selected: (count: number) => `${count} سطح انتخاب شده`,
    },
    en: {
      label: "Course level",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      all: "All levels",
      selected: (count: number) => `${count} selected`,
    },
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleChipGroup aria-label={t.label} value={levels} onValueChange={setLevels}>
        <ToggleChip value="beginner" color="var(--color-emerald-500)">
          {t.beginner}
        </ToggleChip>
        <ToggleChip value="intermediate" color="var(--color-amber-500)">
          {t.intermediate}
        </ToggleChip>
        <ToggleChip value="advanced" color="var(--color-rose-500)">
          {t.advanced}
        </ToggleChip>
      </ToggleChipGroup>
      <p role="status" className="text-sm text-gray-700">
        {levels.length === 0 ? t.all : t.selected(levels.length)}
      </p>
    </div>
  );
}
