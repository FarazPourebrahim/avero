"use client";

import { Tooltip as TooltipPrimitive } from "radix-ui";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

export type TooltipProviderProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;

// Radix doesn't expose whether a provider is mounted, and a nested provider would cut a tooltip
// off from the shared delay of the one above it.
const HasTooltipProvider = createContext(false);

/**
 * Shares the open delay between tooltips, so moving from one trigger to the next shows the second
 * at once. Optional: a `Tooltip` renders its own provider when there is none above it.
 */
export function TooltipProvider({ delayDuration = 300, children, ...props }: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...props}>
      <HasTooltipProvider.Provider value={true}>{children}</HasTooltipProvider.Provider>
    </TooltipPrimitive.Provider>
  );
}

/** Props specific to `Tooltip`. It also accepts every Radix tooltip content prop. */
export type TooltipOwnProps = {
  /** The short text shown in the tooltip. It describes the trigger; it is not its name. */
  content: ReactNode;
  /** The trigger: one focusable element, such as a `Button` or `IconButton`. */
  children: ReactElement;
  /** Whether the tooltip is open (controlled). */
  open?: boolean;
  /** Initially open (uncontrolled). @defaultValue false */
  defaultOpen?: boolean;
  /** Called when the tooltip opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Milliseconds the pointer rests on the trigger before the tooltip opens.
   * @defaultValue the `TooltipProvider` delay, 300 without one
   */
  delayDuration?: number;
  /** Draws an arrow pointing at the trigger. @defaultValue true */
  showArrow?: boolean;
  /** Portal target for the tooltip. @defaultValue `document.body` */
  container?: HTMLElement | null;
};

export type TooltipProps = Omit<
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  keyof TooltipOwnProps
> &
  TooltipOwnProps;

/**
 * A short description shown when the trigger is hovered or focused. Radix supplies the delay,
 * `Esc` dismissal and the `aria-describedby` link to the trigger.
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  {
    content,
    children,
    open,
    defaultOpen,
    onOpenChange,
    delayDuration,
    showArrow = true,
    container,
    side = "top",
    sideOffset = 6,
    collisionPadding = 8,
    className,
    ...props
  },
  ref,
) {
  const { dir } = useAvero();
  const hasProvider = useContext(HasTooltipProvider);

  const tooltip = (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal container={container}>
        <TooltipPrimitive.Content
          ref={ref}
          // Portalled out of the page, so the direction is set here for `align` and the text.
          dir={dir}
          side={side}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          data-slot="tooltip"
          className={cn(
            "shadow-pop z-(--z-popover) max-w-64 rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs leading-5 text-white",
            className,
          )}
          {...props}
        >
          {content}
          {showArrow ? (
            <TooltipPrimitive.Arrow
              data-slot="tooltip-arrow"
              width={10}
              height={5}
              className="fill-slate-800"
            />
          ) : null}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );

  return hasProvider ? tooltip : <TooltipProvider>{tooltip}</TooltipProvider>;
});

Tooltip.displayName = "Tooltip";
