"use client";

import { Toast as ToastPrimitive } from "radix-ui";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";
import { alertIconClasses } from "../alert/alert.variants.js";
import { Button } from "../button/Button.js";

export type ToastTone = "info" | "success" | "warning" | "danger";

export type ToastAction = {
  /** Visible label of the action button. */
  label: ReactNode;
  /**
   * How to do the same thing without the toast, for screen reader users who can't reach it in
   * time, e.g. "Undo from the trash page".
   */
  altText: string;
  onClick: () => void;
};

export type ToastOptions = {
  /** Meaning, icon and progress colour. `danger` toasts are announced assertively. @defaultValue "info" */
  tone?: ToastTone;
  title: ReactNode;
  description?: ReactNode;
  /** One button next to the message. Clicking it also closes the toast. */
  action?: ToastAction;
  /** Milliseconds before it closes; `Infinity` keeps it open. @defaultValue the provider's `duration` */
  duration?: number;
};

export type ToastApi = {
  /** Shows a toast and returns its id. */
  toast: (options: ToastOptions) => number;
  /** Closes one toast by id, or every toast without an id. */
  dismiss: (id?: number) => void;
};

type ToastItem = ToastOptions & { id: number };

const ToastContext = createContext<ToastApi | null>(null);

/** Returns `toast` and `dismiss` from the nearest `ToastProvider`. */
export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) {
    throw new Error("useToast must be used inside a ToastProvider.");
  }
  return api;
}

const toneIcons: Record<ToastTone, ReactNode> = {
  info: <InfoIcon />,
  success: <CircleCheckIcon />,
  warning: <TriangleAlertIcon />,
  danger: <CircleAlertIcon />,
};

const progressClasses: Record<ToastTone, string> = {
  info: "bg-blue-500",
  success: "bg-green-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
};

/** Props of `ToastProvider`. */
export type ToastProviderProps = {
  /** The app. Anything inside can call `useToast`. */
  children?: ReactNode;
  /** Default milliseconds before a toast closes. @defaultValue 5000 */
  duration?: number;
  /** Most toasts shown at once; the oldest closes when a new one would exceed it. @defaultValue 3 */
  limit?: number;
  /** Accessible name of the toast region. @defaultValue the dictionary's `toastRegion` */
  label?: string;
  /** Classes for the fixed region that stacks the toasts. */
  viewportClassName?: string;
};

/**
 * Holds the toasts for everything inside it and renders them in a region at the bottom of the
 * viewport: full width up to 480px, then a 24rem column at the inline end. Built on Radix Toast,
 * which pauses the timers while a toast is hovered or focused and lets it be swiped away.
 */
export function ToastProvider({
  children,
  duration = 5000,
  limit = 3,
  label,
  viewportClassName,
}: ToastProviderProps) {
  const { dir, dictionary } = useAvero();
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id?: number) => {
    setItems((current) => (id === undefined ? [] : current.filter((item) => item.id !== id)));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      nextId.current += 1;
      const id = nextId.current;
      setItems((current) => [...current, { ...options, id }].slice(-limit));
      return id;
    },
    [limit],
  );

  const api = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      <ToastPrimitive.Provider
        duration={duration}
        label={dictionary.toastLabel}
        // Toasts sit at the inline end, so swiping toward that edge dismisses them.
        swipeDirection={dir === "rtl" ? "left" : "right"}
      >
        {children}
        {items.map((item) => (
          <ToastCard
            key={item.id}
            item={item}
            duration={item.duration ?? duration}
            closeLabel={dictionary.close}
            onClose={() => dismiss(item.id)}
          />
        ))}
        <ToastPrimitive.Viewport
          label={label ?? dictionary.toastRegion}
          dir={dir}
          data-slot="toast-viewport"
          className={cn(
            "fixed start-0 end-0 bottom-0 z-(--z-toast) m-0 flex max-h-screen list-none flex-col gap-2 p-3 outline-none min-[30rem]:start-auto min-[30rem]:w-96 min-[30rem]:p-4",
            viewportClassName,
          )}
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

type ToastCardProps = {
  item: ToastItem;
  duration: number;
  closeLabel: string;
  onClose: () => void;
};

function ToastCard({ item, duration, closeLabel, onClose }: ToastCardProps) {
  const tone = item.tone ?? "info";
  const [paused, setPaused] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const progress = useRef<Animation | null>(null);
  const timed = Number.isFinite(duration);

  // The Web Animations API can pause and resume in step with Radix's timer, which a CSS
  // transition can't.
  useEffect(() => {
    const bar = barRef.current;
    if (!timed || !bar || typeof bar.animate !== "function") return;
    const animation = bar.animate([{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }], {
      duration,
      fill: "forwards",
    });
    progress.current = animation;
    return () => animation.cancel();
  }, [duration, timed]);

  return (
    <ToastPrimitive.Root
      type={tone === "danger" ? "foreground" : "background"}
      duration={duration}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      onPause={() => {
        setPaused(true);
        progress.current?.pause();
      }}
      onResume={() => {
        setPaused(false);
        progress.current?.play();
      }}
      data-slot="toast"
      data-tone={tone}
      data-paused={paused}
      className={cn(
        "shadow-elevated relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 pe-10 text-sm leading-6",
        "data-[state=open]:animate-slide-up data-[swipe=end]:hidden",
        "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)",
      )}
    >
      <span
        aria-hidden
        data-slot="toast-icon"
        className={cn("mt-0.5 flex shrink-0 [&>svg]:size-5", alertIconClasses[tone])}
      >
        {toneIcons[tone]}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <ToastPrimitive.Title data-slot="toast-title" className="font-bold text-gray-900">
          {item.title}
        </ToastPrimitive.Title>
        {item.description ? (
          <ToastPrimitive.Description data-slot="toast-description" className="text-gray-600">
            {item.description}
          </ToastPrimitive.Description>
        ) : null}
        {item.action ? (
          <ToastPrimitive.Action altText={item.action.altText} asChild>
            <Button
              size="sm"
              variant="outline"
              data-slot="toast-action"
              className="mt-2 self-start"
              onClick={item.action.onClick}
            >
              {item.action.label}
            </Button>
          </ToastPrimitive.Action>
        ) : null}
      </div>
      <ToastPrimitive.Close
        aria-label={closeLabel}
        data-slot="toast-close"
        className="absolute end-2 top-2 cursor-pointer rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none"
      >
        <XIcon className="size-4" />
      </ToastPrimitive.Close>
      {timed ? (
        <div
          ref={barRef}
          aria-hidden
          data-slot="toast-progress"
          // The bar shrinks toward the inline start, so it drains in the reading direction.
          className={cn(
            "absolute start-0 end-0 bottom-0 h-1 origin-left motion-reduce:hidden rtl:origin-right",
            progressClasses[tone],
          )}
        />
      ) : null}
    </ToastPrimitive.Root>
  );
}
