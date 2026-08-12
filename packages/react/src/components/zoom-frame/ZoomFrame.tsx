"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { ZoomInIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `ZoomFrame`. It also accepts every native `<button>` attribute. */
export type ZoomFrameOwnProps = {
  /** Pill text shown on hover and focus. @defaultValue the dictionary's `zoomHint` ("نمایش بزرگ‌تر" / "View larger") */
  hint?: ReactNode;
};

export type ZoomFrameProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ZoomFrameOwnProps
> &
  ZoomFrameOwnProps;

/**
 * Clickable image frame for galleries (D-22): on hover or keyboard focus the image scales
 * slightly, dims, and a "view larger" pill slides in. Open your lightbox in `onClick`.
 */
export const ZoomFrame = forwardRef<HTMLButtonElement, ZoomFrameProps>(function ZoomFrame(
  { hint, type = "button", className, children, ...props },
  ref,
) {
  const { dictionary } = useAvero();

  return (
    <button
      ref={ref}
      type={type}
      data-slot="zoom-frame"
      className={cn(
        "group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl p-0 text-start",
        "[&_img]:transition-transform [&_img]:duration-300 hover:[&_img]:scale-[1.02] focus-visible:[&_img]:scale-[1.02]",
        "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
      <span
        data-slot="zoom-frame-overlay"
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20 group-focus-visible:bg-black/20"
      >
        <span className="flex translate-y-2 items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-2 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <ZoomInIcon className="size-4" />
          {hint ?? dictionary.zoomHint}
        </span>
      </span>
    </button>
  );
});

ZoomFrame.displayName = "ZoomFrame";
