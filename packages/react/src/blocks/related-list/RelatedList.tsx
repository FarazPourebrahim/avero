"use client";

import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { Card } from "../../components/card/index.js";
import { Image } from "../../components/image/index.js";
import { PriceTag } from "../../components/price-tag/index.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `RelatedList`. It also accepts every native `<section>` attribute. */
export type RelatedListOwnProps = {
  /** Panel title, e.g. "خدمات مرتبط". */
  title: ReactNode;
  /** Content at the end of the header row, e.g. a "see all" link. */
  actions?: ReactNode;
  /** The rows, `RelatedItem`s in the reference. */
  children: ReactNode;
  /** Heading level of the title. @defaultValue "h4" */
  titleAs?: "h2" | "h3" | "h4";
};

export type RelatedListProps = Omit<HTMLAttributes<HTMLElement>, keyof RelatedListOwnProps> &
  RelatedListOwnProps;

/**
 * Related services panel (B-24, R-05): a titled card over a stack of linked rows, each a
 * thumbnail beside a name and a price.
 */
export const RelatedList = forwardRef<HTMLElement, RelatedListProps>(function RelatedList(
  { title, actions, children, titleAs: Title = "h4", className, ...props },
  ref,
) {
  return (
    <Card
      asChild
      variant="surface"
      elevation="xs"
      padding="none"
      className={cn("space-y-4 p-6", className)}
    >
      <section ref={ref} data-slot="related-list" {...props}>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <Title className="text-sm font-black text-slate-900">{title}</Title>
          {actions}
        </div>
        <div data-slot="related-list-items" className="space-y-4">
          {children}
        </div>
      </section>
    </Card>
  );
});

RelatedList.displayName = "RelatedList";

/** Props specific to `RelatedItem`. It also accepts every native `<a>` attribute. */
export type RelatedItemOwnProps = {
  /** The item's name, clamped to one line. */
  title: string;
  /** Where the row links to. */
  href: string;
  /** Thumbnail image. */
  image?: string;
  /** Price under the name, formatted with the active locale's digits. */
  price?: number;
  /** Anything else under the name. Takes the place of `price` when both are given. */
  meta?: ReactNode;
};

export type RelatedItemProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof RelatedItemOwnProps | "children"
> &
  RelatedItemOwnProps;

/** One row of a `RelatedList` (B-24, R-05): a 64px thumbnail, a name and a price, all one link. */
export const RelatedItem = forwardRef<HTMLAnchorElement, RelatedItemProps>(function RelatedItem(
  { title, href, image, price, meta, className, ...props },
  ref,
) {
  return (
    <a
      ref={ref}
      href={href}
      data-slot="related-item"
      className={cn(
        "group flex items-center gap-3 rounded-2xl border border-transparent p-2 transition hover:border-slate-100 hover:bg-slate-50",
        className,
      )}
      {...props}
    >
      {image ? <Image src={image} alt="" radius="xl" className="size-16 shrink-0" /> : null}
      <div className="min-w-0 flex-1 space-y-3">
        <h5 className="group-hover:text-primary truncate text-xs font-bold text-slate-900 transition">
          {title}
        </h5>
        {meta ?? (price === undefined ? null : <PriceTag amount={price} variant="compact" />)}
      </div>
    </a>
  );
});

RelatedItem.displayName = "RelatedItem";
