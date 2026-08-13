import { Slot } from "radix-ui";
import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";
import { Container } from "../container/Container.js";

/** Props specific to `SiteHeader`. It also accepts every native `<header>` attribute. */
export type SiteHeaderOwnProps = {
  /** Brand mark, usually a linked logo. */
  logo?: ReactNode;
  /** Primary navigation links; hidden below `md`, where the menu trigger takes over. */
  nav?: ReactNode;
  /** Trailing slot: user avatar, dashboard link, call to action. */
  actions?: ReactNode;
  /** Mobile menu trigger, shown below `md`. Wrap `SiteHeaderMenuButton` in a `DrawerTrigger`. */
  menu?: ReactNode;
  /** Sticks to the top while scrolling. @defaultValue true */
  sticky?: boolean;
};

export type SiteHeaderProps = Omit<HTMLAttributes<HTMLElement>, keyof SiteHeaderOwnProps> &
  SiteHeaderOwnProps;

/**
 * Site chrome header: a blurred, sticky bar with the logo and navigation at the inline
 * start and the user actions at the inline end. It holds no state — pass the drawer's trigger as
 * `menu` so the header stays a server component.
 */
export const SiteHeader = forwardRef<HTMLElement, SiteHeaderProps>(function SiteHeader(
  { logo, nav, actions, menu, sticky = true, className, children, ...props },
  ref,
) {
  return (
    <header
      ref={ref}
      data-slot="site-header"
      className={cn(
        "z-(--z-sticky) flex w-full items-center justify-center backdrop-blur-2xl transition-all duration-100 ease-out",
        sticky && "sticky top-12",
        className,
      )}
      {...props}
    >
      <Container className="py-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-6">
            {menu}
            {logo}
            {nav ? (
              <nav data-slot="site-header-nav" className="hidden gap-10 md:flex">
                {nav}
              </nav>
            ) : null}
          </div>
          {actions ? (
            <div data-slot="site-header-actions" className="flex items-center gap-x-4">
              {actions}
            </div>
          ) : null}
        </div>
        {children}
      </Container>
    </header>
  );
});

SiteHeader.displayName = "SiteHeader";

/** Props specific to `SiteHeaderMenuButton`. It also accepts every native `<button>` attribute. */
export type SiteHeaderMenuButtonOwnProps = {
  /** Renders the child element (e.g. a `DrawerTrigger`) with the button's styles. @defaultValue false */
  asChild?: boolean;
};

export type SiteHeaderMenuButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof SiteHeaderMenuButtonOwnProps
> &
  SiteHeaderMenuButtonOwnProps;

/** The bordered hamburger button shown below `md`. */
export const SiteHeaderMenuButton = forwardRef<HTMLButtonElement, SiteHeaderMenuButtonProps>(
  function SiteHeaderMenuButton({ asChild = false, className, type, ...props }, ref) {
    const Component = asChild ? Slot.Root : "button";

    return (
      <Component
        ref={ref}
        data-slot="site-header-menu-button"
        {...(asChild ? {} : { type: type ?? "button" })}
        className={cn(
          "flex items-center justify-between rounded-xl border border-gray-200 p-2 text-gray-700 md:hidden",
          "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none",
          className,
        )}
        {...props}
      />
    );
  },
);

SiteHeaderMenuButton.displayName = "SiteHeaderMenuButton";
