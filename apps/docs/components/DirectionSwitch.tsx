"use client";

import { AveroProvider, SegmentedControl, SegmentedControlItem } from "@averoui/react";
import { usePreviewSettings, type PreviewDirection } from "./preview-settings.context";

const OPTIONS: ReadonlyArray<{ value: PreviewDirection; label: string }> = [
  { value: "rtl", label: "فارسی" },
  { value: "ltr", label: "English" },
];

/**
 * Switches the direction and locale of every live demo on the site. It sits in the navbar, and the
 * choice persists across pages and reloads.
 *
 * Built on Avero's own SegmentedControl: the documentation uses the library it documents, and this
 * control gets the keyboard behaviour that comes with it.
 */
export function DirectionSwitch({ className }: { className?: string }) {
  const { dir, setDirection } = usePreviewSettings();

  return (
    // The switch reads in the direction it selects, so it stays legible in either mode.
    <AveroProvider dir={dir} locale={dir === "rtl" ? "fa-IR" : "en-US"}>
      <SegmentedControl
        aria-label="Demo direction and language"
        value={dir}
        onValueChange={(next) => setDirection(next as PreviewDirection)}
        className={className}
      >
        {OPTIONS.map((option) => (
          <SegmentedControlItem key={option.value} value={option.value}>
            {option.label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
    </AveroProvider>
  );
}
