import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";

/** Props specific to `CategoryLinks`. It also accepts every native `<div>` attribute. */
export type CategoryLinksOwnProps = {
  /** Section title, e.g. "دسته‌بندی‌های مرتبط". */
  title: ReactNode;
  /** Line under the title. */
  description?: ReactNode;
  /** Icon inside the tinted square beside the title. */
  icon?: ReactNode;
  /** The links, `Chip` components in the reference's `tag` variant. */
  children: ReactNode;
  /** Heading level of the title. @defaultValue "h3" */
  titleAs?: "h2" | "h3" | "h4";
};

export type CategoryLinksProps = Omit<HTMLAttributes<HTMLDivElement>, keyof CategoryLinksOwnProps> &
  CategoryLinksOwnProps;

/**
 * Related categories (B-21, R-07): a small titled header beside a tinted icon, over a wrapping
 * row of category links.
 *
 * It sits at the end of the project description, so the block brings its own top divider rather
 * than a card surface.
 */
export const CategoryLinks = forwardRef<HTMLDivElement, CategoryLinksProps>(function CategoryLinks(
  { title, description, icon, children, titleAs: Title = "h3", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="category-links"
      className={cn("space-y-3 border-t border-gray-100 pt-6", className)}
      {...props}
    >
      <div className="flex items-center gap-2.5">
        {icon ? (
          <div className="text-primary flex size-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 [&>svg]:size-[18px]">
            {icon}
          </div>
        ) : null}
        <div>
          <Title className="text-sm font-bold text-gray-800 md:text-base">{title}</Title>
          {description ? <p className="text-xs text-gray-400">{description}</p> : null}
        </div>
      </div>
      <div data-slot="category-links-items" className="flex flex-wrap gap-2.5 pt-1">
        {children}
      </div>
    </div>
  );
});

CategoryLinks.displayName = "CategoryLinks";
