"use client";

import { ToggleChip, ToggleChipGroup } from "@avero/react";
import { useState } from "react";

export default function ToggleChipGroupControlledDemo() {
  const [levels, setLevels] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleChipGroup aria-label="سطح دوره" value={levels} onValueChange={setLevels}>
        <ToggleChip value="beginner" color="var(--color-emerald-500)">
          مقدماتی
        </ToggleChip>
        <ToggleChip value="intermediate" color="var(--color-amber-500)">
          متوسط
        </ToggleChip>
        <ToggleChip value="advanced" color="var(--color-rose-500)">
          پیشرفته
        </ToggleChip>
      </ToggleChipGroup>
      <p role="status" className="text-sm text-gray-700">
        {levels.length === 0 ? "همه سطح‌ها" : `${levels.length} سطح انتخاب شده`}
      </p>
    </div>
  );
}
