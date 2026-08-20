"use client";

import { useState, type CSSProperties } from "react";

type AnimationPreviewProps = {
  name: string;
  /** The token's `animation` shorthand, e.g. `fade-in 0.4s ease-out both`. */
  animation: string;
};

// The accordion keyframes animate to Radix's measured panel height, which a bare preview lacks.
const PREVIEW_STYLE = { "--radix-accordion-content-height": "3rem" } as CSSProperties;

/** Runs one animation on a specimen tile, and runs it again on demand. */
export function AnimationPreview({ name, animation }: AnimationPreviewProps) {
  const [run, setRun] = useState(0);

  return (
    <div className="flex items-center gap-4">
      <div
        className="flex h-16 w-28 items-center justify-center overflow-hidden"
        style={PREVIEW_STYLE}
      >
        <div
          key={run}
          aria-hidden
          className="h-12 w-24 rounded-xl border-e-2 border-transparent bg-linear-to-r from-indigo-200 via-indigo-400 to-indigo-200 bg-size-[200%_100%]"
          style={{ animation }}
        />
      </div>
      <button
        type="button"
        onClick={() => setRun((count) => count + 1)}
        className="border-fd-border hover:bg-fd-accent rounded-md border px-2.5 py-1 text-xs font-medium"
        aria-label={`Replay ${name}`}
      >
        Replay
      </button>
    </div>
  );
}
