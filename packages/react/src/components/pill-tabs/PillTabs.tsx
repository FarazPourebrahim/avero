"use client";

import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import {
  forwardRef,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "../../utils/cn.js";
import { mergeRefs } from "../../utils/refs.js";

/**
 * Link-based pill tabs, e.g. under a profile header:
 * a horizontally scrollable row with a hidden scrollbar; the current tab is a filled blue pill.
 */
export const pillTabVariants = cva(
  [
    "flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-bold whitespace-nowrap transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5",
    "[&>svg]:size-4 [&>svg]:shrink-0",
    "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none",
  ],
  {
    variants: {
      current: {
        true: "bg-blue-600 text-white shadow-md shadow-blue-500/20",
        false: "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-blue-600",
      },
    },
    defaultVariants: { current: false },
  },
);

/** Props specific to `PillTabs`. It also accepts every native `<nav>` attribute. */
export type PillTabsOwnProps = {
  /** Accessible name of the navigation, e.g. "بخش‌های پروفایل". */
  "aria-label": string;
};

export type PillTabsProps = Omit<HTMLAttributes<HTMLElement>, keyof PillTabsOwnProps> &
  PillTabsOwnProps;

/** Scrolls the row horizontally (never the page) so the current tab is visible. */
function revealCurrentTab(nav: HTMLElement | null) {
  const current = nav?.querySelector<HTMLElement>('[aria-current="page"]');
  if (!nav || !current || typeof nav.scrollBy !== "function") return;
  const navRect = nav.getBoundingClientRect();
  const tabRect = current.getBoundingClientRect();
  if (tabRect.left >= navRect.left && tabRect.right <= navRect.right) return;
  nav.scrollBy({ left: tabRect.left + tabRect.width / 2 - (navRect.left + navRect.width / 2) });
}

export const PillTabs = forwardRef<HTMLElement, PillTabsProps>(function PillTabs(
  { className, children, ...props },
  ref,
) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    revealCurrentTab(navRef.current);
  }, [children]);

  return (
    <nav
      ref={mergeRefs(ref, navRef)}
      data-slot="pill-tabs"
      className={cn("scrollbar-hidden w-full overflow-x-auto pb-1 md:w-auto md:pb-0", className)}
      {...props}
    >
      <ul className="flex min-w-max items-center justify-start gap-2 text-xs text-gray-600 sm:gap-3 sm:text-sm">
        {children}
      </ul>
    </nav>
  );
});

PillTabs.displayName = "PillTabs";

/** Props specific to `PillTab`. It also accepts every native `<a>` attribute. */
export type PillTabOwnProps = {
  /** Destination of the tab. */
  href?: string;
  /** Marks the tab as the current page (`aria-current="page"`). @defaultValue false */
  current?: boolean;
  /** Icon shown before the label. */
  icon?: ReactNode;
  /** Renders the child element (e.g. a router link) with tab styles. @defaultValue false */
  asChild?: boolean;
};

export type PillTabProps = Omit<HTMLAttributes<HTMLAnchorElement>, keyof PillTabOwnProps> &
  PillTabOwnProps;

export const PillTab = forwardRef<HTMLAnchorElement, PillTabProps>(function PillTab(
  { href, current = false, icon, asChild = false, className, children, ...props },
  ref,
) {
  const classes = cn(pillTabVariants({ current }), className);
  const ariaCurrent = current ? ("page" as const) : undefined;

  return (
    <li>
      {asChild ? (
        <Slot.Root
          ref={ref}
          aria-current={ariaCurrent}
          data-slot="pill-tab"
          className={classes}
          {...props}
        >
          {children}
        </Slot.Root>
      ) : (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          aria-current={ariaCurrent}
          data-slot="pill-tab"
          className={classes}
          {...props}
        >
          {icon}
          {children}
        </a>
      )}
    </li>
  );
});

PillTab.displayName = "PillTab";
