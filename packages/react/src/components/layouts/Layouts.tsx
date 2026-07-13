import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";
import { Container } from "../container/Container.js";

/**
 * Page templates (T-05…T-09). Each one renders the page's `main` landmark, centres a `max-w-7xl`
 * column and lays out the reference's grid for that page type. Sticky offsets match the reference,
 * so an aside stops under the sticky header rather than behind it.
 */

type LayoutRootProps = {
  className?: string;
  children: ReactNode;
  containerClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

const LayoutRoot = forwardRef<HTMLElement, LayoutRootProps & { slot: string }>(function LayoutRoot(
  { slot, className, containerClassName, children, ...props },
  ref,
) {
  return (
    <main
      ref={ref}
      data-slot={slot}
      className={cn("relative flex w-full justify-center", className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </main>
  );
});

/** Props shared by the two-column templates. */
export type AsideLayoutOwnProps = {
  /** The narrow column: table of contents, author card, price card, related items. */
  aside?: ReactNode;
  /** Accessible name for the aside landmark. */
  asideLabel?: string;
  /** Extra classes for the aside column. */
  asideClassName?: string;
};

export type AsideLayoutProps = Omit<HTMLAttributes<HTMLElement>, keyof AsideLayoutOwnProps> &
  AsideLayoutOwnProps;

/** Article page (T-05, R-01): 8/4 from `lg`, with an aside that sticks under the header. */
export const ArticleLayout = forwardRef<HTMLElement, AsideLayoutProps>(function ArticleLayout(
  { aside, asideLabel, asideClassName, children, ...props },
  ref,
) {
  return (
    <LayoutRoot
      ref={ref}
      slot="article-layout"
      containerClassName="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-10"
      {...props}
    >
      <div className="flex flex-col gap-8 lg:col-span-8">{children}</div>
      {aside ? (
        <aside
          aria-label={asideLabel}
          data-slot="article-layout-aside"
          className={cn(
            "flex h-fit w-full flex-col gap-8 lg:sticky lg:top-28 lg:col-span-4",
            asideClassName,
          )}
        >
          {aside}
        </aside>
      ) : null}
    </LayoutRoot>
  );
});

ArticleLayout.displayName = "ArticleLayout";

/** Service detail page (T-06, R-05): 8/4 from `lg`, aside sticky at `top-24`. */
export const DetailLayout = forwardRef<HTMLElement, AsideLayoutProps>(function DetailLayout(
  { aside, asideLabel, asideClassName, children, ...props },
  ref,
) {
  return (
    <LayoutRoot
      ref={ref}
      slot="detail-layout"
      containerClassName="grid grid-cols-1 gap-8 lg:grid-cols-12"
      {...props}
    >
      <section className="space-y-8 lg:col-span-8">{children}</section>
      {aside ? (
        <aside
          aria-label={asideLabel}
          data-slot="detail-layout-aside"
          className={cn("h-fit space-y-6 lg:sticky lg:top-24 lg:col-span-4", asideClassName)}
        >
          {aside}
        </aside>
      ) : null}
    </LayoutRoot>
  );
});

DetailLayout.displayName = "DetailLayout";

/** Props specific to `ListingLayout`. */
export type ListingLayoutOwnProps = AsideLayoutOwnProps & {
  /** Page heading row above both columns. */
  header?: ReactNode;
};

export type ListingLayoutProps = Omit<HTMLAttributes<HTMLElement>, keyof ListingLayoutOwnProps> &
  ListingLayoutOwnProps;

/** Marketplace listing (T-07, R-06): sticky filters at the inline start, results beside them. */
export const ListingLayout = forwardRef<HTMLElement, ListingLayoutProps>(function ListingLayout(
  { aside, asideLabel, asideClassName, header, children, ...props },
  ref,
) {
  return (
    <LayoutRoot
      ref={ref}
      slot="listing-layout"
      containerClassName="flex flex-col gap-y-10 md:gap-y-18"
      {...props}
    >
      {header ? <header>{header}</header> : null}
      <div className="grid grid-cols-12 gap-7">
        {aside ? (
          <aside
            aria-label={asideLabel}
            data-slot="listing-layout-aside"
            className={cn(
              "col-span-12 space-y-7 md:sticky md:top-10 md:col-span-3 md:overflow-y-auto",
              asideClassName,
            )}
          >
            {aside}
          </aside>
        ) : null}
        <section className={cn("col-span-12", aside ? "md:col-span-9" : "md:col-span-12")}>
          {children}
        </section>
      </div>
    </LayoutRoot>
  );
});

ListingLayout.displayName = "ListingLayout";

/** Project detail (T-08, R-07): a quarter-width aside that drops below the content on phones. */
export const SplitDetailLayout = forwardRef<HTMLElement, AsideLayoutProps>(
  function SplitDetailLayout({ aside, asideLabel, asideClassName, children, ...props }, ref) {
    return (
      <LayoutRoot
        ref={ref}
        slot="split-detail-layout"
        containerClassName="flex flex-col gap-y-10 md:gap-y-20"
        {...props}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {aside ? (
            <aside
              aria-label={asideLabel}
              data-slot="split-detail-layout-aside"
              className={cn("order-2 space-y-6 lg:order-1 lg:col-span-1", asideClassName)}
            >
              {aside}
            </aside>
          ) : null}
          <div className="order-1 space-y-6 lg:order-2 lg:col-span-3">{children}</div>
        </div>
      </LayoutRoot>
    );
  },
);

SplitDetailLayout.displayName = "SplitDetailLayout";

export type ProfileLayoutProps = HTMLAttributes<HTMLElement>;

/** Freelancer profile (T-09, R-04/R-08): a single 12-column stack under the cover header. */
export const ProfileLayout = forwardRef<HTMLElement, ProfileLayoutProps>(function ProfileLayout(
  { children, ...props },
  ref,
) {
  return (
    <LayoutRoot
      ref={ref}
      slot="profile-layout"
      className="py-6 md:py-10"
      containerClassName="grid grid-cols-12 gap-y-6 [&>*]:col-span-12"
      {...props}
    >
      {children}
    </LayoutRoot>
  );
});

ProfileLayout.displayName = "ProfileLayout";
