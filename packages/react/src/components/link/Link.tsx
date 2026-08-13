import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Text link styles:
 * - nav: header navigation; the current page uses the primary color
 * - drawer: mobile drawer navigation with a leading icon
 * - prose: links inside article content
 * - chrome: footer and contact links
 * - subtle: a quiet back-to-list link
 * - brand: bold inline brand link, e.g. in a copyright line
 */
export const linkVariants = cva(
  "focus-visible:ring-primary/40 rounded-sm transition focus-visible:ring-2 focus-visible:outline-none",
  {
    variants: {
      variant: {
        nav: "hover:text-primary aria-[current=page]:text-primary text-sm font-medium text-gray-600",
        drawer:
          "aria-[current=page]:text-primary flex items-center gap-x-3 text-xs text-gray-500 [&>svg]:size-5",
        prose: "text-indigo-600 underline hover:text-indigo-800",
        chrome:
          "text-text-chrome hover:text-text-chrome-hover transition-all duration-200 ease-linear",
        subtle: "inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700",
        brand: "hover:text-primary font-semibold",
      },
    },
    defaultVariants: {
      variant: "prose",
    },
  },
);

/** Props specific to `Link`. It also accepts every native `<a>` attribute. */
export type LinkOwnProps = {
  /** Visual style. @defaultValue "prose" */
  variant?: VariantProps<typeof linkVariants>["variant"];
  /** Renders the child element (e.g. a router link) with link styles instead of an `<a>`. @defaultValue false */
  asChild?: boolean;
  /** Opens in a new tab with `rel="noopener noreferrer"` (see docs/SECURITY.md). @defaultValue false */
  external?: boolean;
  /** Marks the link as the current page (`aria-current="page"`). @defaultValue false */
  current?: boolean;
};

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkOwnProps> &
  LinkOwnProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { asChild = false, external = false, current = false, className, variant, rel, ...props },
  ref,
) {
  const Component = asChild ? Slot.Root : "a";
  const externalProps = external
    ? { target: "_blank", rel: cn("noopener noreferrer", rel) }
    : { rel };

  return (
    <Component
      ref={ref}
      data-slot="link"
      aria-current={current ? "page" : undefined}
      className={cn(linkVariants({ variant }), className)}
      {...externalProps}
      {...props}
    />
  );
});

Link.displayName = "Link";
