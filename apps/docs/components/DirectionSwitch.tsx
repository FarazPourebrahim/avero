"use client";

import { usePreviewSettings, type PreviewDirection } from "./preview-settings.context";

const OPTIONS: ReadonlyArray<{ value: PreviewDirection; label: string; hint: string }> = [
  { value: "rtl", label: "فارسی", hint: "Persian, right to left" },
  { value: "ltr", label: "English", hint: "English, left to right" },
];

/**
 * Switches the direction and locale of every live demo on the site. It sits in the navbar, and the
 * choice persists across pages and reloads.
 */
export function DirectionSwitch({ className }: { className?: string }) {
  const { dir, setDirection } = usePreviewSettings();

  return (
    <div
      role="radiogroup"
      aria-label="Demo direction and language"
      className={`border-fd-border flex items-center gap-0.5 rounded-lg border p-0.5 ${className ?? ""}`}
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={dir === option.value}
          title={option.hint}
          onClick={() => setDirection(option.value)}
          className="text-fd-muted-foreground hover:text-fd-foreground aria-checked:bg-fd-accent aria-checked:text-fd-accent-foreground rounded-md px-2 py-1 text-xs font-medium transition-colors"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
