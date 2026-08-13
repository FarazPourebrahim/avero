import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";
import { Container } from "../container/Container.js";

/** Props specific to `DashboardShell`. It also accepts every native `<div>` attribute. */
export type DashboardShellOwnProps = {
  /** Sidebar column, shown from `lg`: greeting, navigation, account actions. */
  sidebar?: ReactNode;
  /** Compact card shown below `lg` in place of the sidebar, usually with the drawer trigger. */
  mobileBar?: ReactNode;
  /** Panel content. It sits in the white card that fills the remaining two thirds. */
  children?: ReactNode;
};

export type DashboardShellProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof DashboardShellOwnProps
> &
  DashboardShellOwnProps;

/**
 * Dashboard chrome: a one-third sidebar beside a two-thirds content card from `lg`,
 * collapsing to a stacked mobile bar plus card below it. The content card is the `main` landmark.
 */
export const DashboardShell = forwardRef<HTMLDivElement, DashboardShellProps>(
  function DashboardShell({ sidebar, mobileBar, className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dashboard-shell"
        className={cn("flex flex-col gap-y-6 sm:gap-y-10", className)}
        {...props}
      >
        <Container
          as="main"
          gutter="tight"
          className="relative mt-4 mb-4 flex flex-col gap-y-6 sm:mt-8 md:mt-20 md:mb-5 md:gap-y-12 lg:mt-28"
        >
          <div className="grid w-full grid-cols-1 items-start gap-4 px-0 sm:gap-6 sm:px-2 lg:grid-cols-3">
            <div className="col-span-1 w-full">
              {mobileBar ? (
                <div
                  data-slot="dashboard-shell-mobile-bar"
                  className="shadow-brand-soft mb-2 flex w-full flex-col gap-y-3 rounded-3xl bg-white p-4 sm:p-5 lg:hidden"
                >
                  {mobileBar}
                </div>
              ) : null}
              {sidebar ? (
                <div
                  data-slot="dashboard-shell-sidebar"
                  className="hidden flex-col items-start gap-y-6 lg:flex"
                >
                  {sidebar}
                </div>
              ) : null}
            </div>
            <div
              data-slot="dashboard-shell-content"
              className="shadow-brand-soft col-span-1 min-w-0 rounded-2xl bg-white px-3 py-4 sm:rounded-3xl sm:px-6 sm:py-8 md:px-8 md:py-12 lg:col-span-2 lg:px-12"
            >
              {children}
            </div>
          </div>
        </Container>
      </div>
    );
  },
);

DashboardShell.displayName = "DashboardShell";
