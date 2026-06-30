"use client";

import { AveroProvider } from "@avero/react";
import { useState, type ReactNode } from "react";

type Direction = "rtl" | "ltr";

const DIRECTIONS: ReadonlyArray<{ value: Direction; label: string }> = [
  { value: "rtl", label: "RTL · فارسی" },
  { value: "ltr", label: "LTR · English" },
];

/** Live preview surface with a direction/locale switch. Demos render inside `AveroProvider`. */
export function PreviewFrame({ children }: { children: ReactNode }) {
  const [dir, setDir] = useState<Direction>("rtl");

  return (
    <div className="flex flex-col">
      <div
        role="radiogroup"
        aria-label="Preview direction"
        className="border-fd-border flex justify-end gap-1 border-b p-2"
      >
        {DIRECTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={dir === option.value}
            onClick={() => setDir(option.value)}
            className="text-fd-muted-foreground aria-checked:bg-fd-accent aria-checked:text-fd-accent-foreground rounded-md px-2.5 py-1 text-xs font-medium"
          >
            {option.label}
          </button>
        ))}
      </div>
      <AveroProvider dir={dir} locale={dir === "rtl" ? "fa-IR" : "en-US"}>
        <div
          dir={dir}
          lang={dir === "rtl" ? "fa" : "en"}
          className="bg-background flex min-h-40 flex-wrap items-center justify-center gap-3 p-8 font-sans"
        >
          {children}
        </div>
      </AveroProvider>
    </div>
  );
}
