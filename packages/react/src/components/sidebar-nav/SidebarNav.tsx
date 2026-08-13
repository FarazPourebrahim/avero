import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { forwardRef, type HTMLAttributes, type ReactNode, type Ref } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Dashboard sidebar navigation (N-02):
 * the current page is a filled primary pill, idle items tint on hover, and the
 * logout item is a danger action that fills red on hover.
 */
export const sidebarNavItemVariants = cva(
  [
    "flex w-full items-center gap-x-3 rounded-2xl px-3 py-4 text-sm font-medium transition-all duration-200",
    "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none",
  ],
  {
    variants: {
      tone: {
        default: "",
        danger: "cursor-pointer text-red-500 hover:bg-red-500/95 hover:text-white",
      },
      current: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { tone: "default", current: true, class: "bg-primary text-white shadow-md" },
      {
        tone: "default",
        current: false,
        class: "hover:bg-primary/10 hover:text-primary text-zinc-600",
      },
    ],
    defaultVariants: { tone: "default", current: false },
  },
);

/** Props specific to `SidebarNav`. It also accepts every native `<nav>` attribute. */
export type SidebarNavOwnProps = {
  /** Accessible name of the navigation landmark, e.g. "منوی داشبورد". */
  "aria-label": string;
};

export type SidebarNavProps = Omit<HTMLAttributes<HTMLElement>, keyof SidebarNavOwnProps> &
  SidebarNavOwnProps;

export const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(function SidebarNav(
  { className, children, ...props },
  ref,
) {
  return (
    <nav ref={ref} data-slot="sidebar-nav" className={cn("w-full", className)} {...props}>
      <ul className="flex w-full flex-col items-center gap-y-1">{children}</ul>
    </nav>
  );
});

SidebarNav.displayName = "SidebarNav";

/** Props specific to `SidebarNavItem`. It also accepts every native link or button attribute. */
export type SidebarNavItemOwnProps = {
  /** Destination. With `href` it renders a link; without it, a button (e.g. logout). */
  href?: string;
  /** Marks the item as the current page (`aria-current="page"`). @defaultValue false */
  current?: boolean;
  /** `danger` is the red logout action. @defaultValue "default" */
  tone?: VariantProps<typeof sidebarNavItemVariants>["tone"];
  /** Icon shown before the label. */
  icon?: ReactNode;
  /** Renders the child element (e.g. a router link) with item styles. @defaultValue false */
  asChild?: boolean;
};

export type SidebarNavItemProps = Omit<HTMLAttributes<HTMLElement>, keyof SidebarNavItemOwnProps> &
  SidebarNavItemOwnProps;

export const SidebarNavItem = forwardRef<HTMLElement, SidebarNavItemProps>(function SidebarNavItem(
  { href, current = false, tone, icon, asChild = false, className, children, ...props },
  ref,
) {
  const classes = cn(sidebarNavItemVariants({ tone, current }), className);
  const shared = {
    "data-slot": "sidebar-nav-item",
    "aria-current": current ? ("page" as const) : undefined,
    className: classes,
  };

  let item: ReactNode;
  if (asChild) {
    item = (
      <Slot.Root ref={ref} {...shared} {...props}>
        {children}
      </Slot.Root>
    );
  } else if (href !== undefined) {
    item = (
      <a ref={ref as Ref<HTMLAnchorElement>} href={href} {...shared} {...props}>
        {icon ? <span className="shrink-0">{icon}</span> : null}
        <span>{children}</span>
      </a>
    );
  } else {
    item = (
      <button ref={ref as Ref<HTMLButtonElement>} type="button" {...shared} {...props}>
        {icon ? <span className="shrink-0">{icon}</span> : null}
        <span>{children}</span>
      </button>
    );
  }

  return <li className="w-full">{item}</li>;
});

SidebarNavItem.displayName = "SidebarNavItem";
