"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import {
  forwardRef,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero, useAveroFormatter } from "../../i18n/AveroProvider.js";
import { formatMessage } from "../../i18n/dictionaries.js";
import { ChevronLeftIcon, ChevronRightIcon, XIcon, ZoomInIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";

export type LightboxImage = {
  src: string;
  /** Describes the image; announced when it is shown. */
  alt: string;
  /** Shown under the image. */
  caption?: ReactNode;
};

/** Props specific to `Lightbox`. It also accepts every Radix dialog content prop. */
export type LightboxOwnProps = {
  /** The images to page through. */
  images: readonly LightboxImage[];
  /** Whether the lightbox is open (controlled). */
  open?: boolean;
  /** Initially open (uncontrolled). @defaultValue false */
  defaultOpen?: boolean;
  /** Called when the lightbox opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Index of the image shown (controlled). */
  index?: number;
  /** Initial image index (uncontrolled). @defaultValue 0 */
  defaultIndex?: number;
  /** Called when another image is shown. */
  onIndexChange?: (index: number) => void;
  /** Accessible name of the dialog. @defaultValue the dictionary's `lightboxLabel` */
  label?: string;
  /** Portal target for the lightbox. @defaultValue `document.body` */
  container?: HTMLElement | null;
};

export type LightboxProps = Omit<
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  keyof LightboxOwnProps
> &
  LightboxOwnProps;

const controlClasses =
  "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none disabled:cursor-default disabled:opacity-30 aria-pressed:bg-white/25 [&>svg]:size-5";

/**
 * Shows images full screen over a dark scrim, one at a time. Built on Radix Dialog, so focus is
 * trapped inside, `Esc` closes it and focus returns to what opened it. Open it from a `ZoomFrame`.
 */
export const Lightbox = forwardRef<HTMLDivElement, LightboxProps>(function Lightbox(
  {
    images,
    open,
    defaultOpen = false,
    onOpenChange,
    index,
    defaultIndex = 0,
    onIndexChange,
    label,
    container,
    className,
    onKeyDown,
    onOpenAutoFocus,
    onCloseAutoFocus,
    ...props
  },
  ref,
) {
  const { dir, dictionary } = useAvero();
  const format = useAveroFormatter();
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [requestedIndex, setIndex] = useControllableState({
    value: index,
    defaultValue: defaultIndex,
    onChange: onIndexChange,
  });
  const [zoomed, setZoomed] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  const last = Math.max(images.length - 1, 0);
  const current = Math.min(Math.max(requestedIndex, 0), last);
  const image = images[current];
  const paged = images.length > 1;

  function show(target: number) {
    const next = Math.min(Math.max(target, 0), last);
    if (next === current) return;
    setZoomed(false);
    setIndex(next);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    // Next is the image further along the reading direction.
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const backward = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    const targets: Record<string, number> = {
      [forward]: current + 1,
      [backward]: current - 1,
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    show(target);
  }

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(next) => {
        if (!next) setZoomed(false);
        setOpen(next);
      }}
    >
      <DialogPrimitive.Portal container={container}>
        <DialogPrimitive.Overlay
          data-slot="lightbox-overlay"
          className="fixed inset-0 z-(--z-modal) bg-black/90 backdrop-blur-sm"
        />
        <DialogPrimitive.Content
          ref={ref}
          // Portalled out of the page, so the direction is set here for the arrows and chevrons.
          dir={dir}
          aria-describedby={undefined}
          data-slot="lightbox"
          onKeyDown={handleKeyDown}
          onOpenAutoFocus={(event) => {
            // Radix returns focus only to its own trigger, and a lightbox is opened from outside,
            // usually a ZoomFrame, so remember what had focus.
            returnFocus.current =
              document.activeElement instanceof HTMLElement ? document.activeElement : null;
            onOpenAutoFocus?.(event);
          }}
          onCloseAutoFocus={(event) => {
            onCloseAutoFocus?.(event);
            const target = returnFocus.current;
            if (event.defaultPrevented || !target?.isConnected) return;
            event.preventDefault();
            target.focus();
          }}
          className={cn(
            "fixed inset-0 z-(--z-modal-content) flex flex-col items-center gap-4 p-4 outline-none sm:p-8",
            className,
          )}
          {...props}
        >
          <DialogPrimitive.Title className="sr-only">
            {label ?? dictionary.lightboxLabel}
          </DialogPrimitive.Title>
          <div className="flex w-full items-center justify-between gap-2 text-sm text-white">
            <p data-slot="lightbox-counter" aria-live="polite" className="font-medium tabular-nums">
              {paged
                ? formatMessage(dictionary.ofTotal, {
                    value: format.number(current + 1),
                    max: format.number(images.length),
                  })
                : null}
            </p>
            <div className="flex items-center gap-2">
              {image ? (
                <button
                  type="button"
                  aria-label={dictionary.zoomHint}
                  aria-pressed={zoomed}
                  data-slot="lightbox-zoom"
                  onClick={() => setZoomed((value) => !value)}
                  className={controlClasses}
                >
                  <ZoomInIcon />
                </button>
              ) : null}
              <DialogPrimitive.Close
                aria-label={dictionary.close}
                data-slot="lightbox-close"
                className={controlClasses}
              >
                <XIcon />
              </DialogPrimitive.Close>
            </div>
          </div>
          <div className="relative flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden">
            {image ? (
              // The zoom button above is the keyboard path; clicking the image is a pointer shortcut.
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                data-slot="lightbox-image"
                data-zoomed={zoomed}
                onClick={() => setZoomed((value) => !value)}
                className={cn(
                  "shadow-lightbox max-h-full max-w-full rounded-2xl object-contain transition-transform duration-300",
                  zoomed ? "scale-175 cursor-zoom-out" : "cursor-zoom-in",
                )}
              />
            ) : null}
            {paged ? (
              <>
                <button
                  type="button"
                  aria-label={dictionary.previous}
                  data-slot="lightbox-previous"
                  disabled={current === 0}
                  onClick={() => show(current - 1)}
                  className={cn(controlClasses, "absolute start-0 top-1/2 -translate-y-1/2")}
                >
                  <ChevronLeftIcon className="rtl:-scale-x-100" />
                </button>
                <button
                  type="button"
                  aria-label={dictionary.next}
                  data-slot="lightbox-next"
                  disabled={current === last}
                  onClick={() => show(current + 1)}
                  className={cn(controlClasses, "absolute end-0 top-1/2 -translate-y-1/2")}
                >
                  <ChevronRightIcon className="rtl:-scale-x-100" />
                </button>
              </>
            ) : null}
          </div>
          {image?.caption ? (
            <p
              data-slot="lightbox-caption"
              className="max-w-2xl text-center text-sm leading-6 text-white/80"
            >
              {image.caption}
            </p>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

Lightbox.displayName = "Lightbox";
