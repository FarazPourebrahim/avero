import { ToggleChip, ToggleChipGroup } from "@avero/react";

export default function ToggleChipGroupMetricsDemo() {
  return (
    <ToggleChipGroup aria-label="شاخص‌های نمودار" defaultValue={["views", "likes"]}>
      <ToggleChip value="views" color="var(--color-indigo-500)">
        بازدید
      </ToggleChip>
      <ToggleChip value="likes" color="var(--color-rose-500)">
        لایک
      </ToggleChip>
      <ToggleChip value="clicks" color="var(--color-emerald-500)">
        کلیک
      </ToggleChip>
      <ToggleChip value="comments" color="var(--color-amber-500)">
        نظر
      </ToggleChip>
    </ToggleChipGroup>
  );
}
