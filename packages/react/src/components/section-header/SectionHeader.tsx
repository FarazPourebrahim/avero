import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Section headings (D-21):
 * - accentBar: page header with a gradient bar, title and subtitle
 * - dot: blue dot + title, as in "درباره من"
 * - icon: primary icon + title, as in "چرا ما را انتخاب کنید؟"
 * - plain: bold title with an actions slot, as in "دوره‌های مرتبط"
 */
export const sectionHeaderTitleVariants = cva("", {
  variants: {
    variant: {
      accentBar: "text-xl font-extrabold text-slate-900 md:text-3xl",
      dot: "text-xl font-bold text-blue-600",
      icon: "text-lg font-bold text-slate-800 md:text-xl",
      plain: "text-xl font-bold text-slate-900 md:text-2xl",
    },
  },
  defaultVariants: { variant: "plain" },
});

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

/** Props specific to `SectionHeader`. It also accepts every native `<div>` attribute. */
export type SectionHeaderOwnProps = {
  title: ReactNode;
  /** Visual style. @defaultValue "plain" */
  variant?: VariantProps<typeof sectionHeaderTitleVariants>["variant"];
  /** Supporting line under the title (`accentBar` variant). */
  subtitle?: ReactNode;
  /** Icon before the title (`icon` variant). */
  icon?: ReactNode;
  /** Content at the inline end, e.g. carousel controls or a count. */
  actions?: ReactNode;
  /** Heading element. @defaultValue "h2" */
  as?: HeadingLevel;
};

export type SectionHeaderProps = Omit<HTMLAttributes<HTMLDivElement>, keyof SectionHeaderOwnProps> &
  SectionHeaderOwnProps;

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(function SectionHeader(
  { title, variant = "plain", subtitle, icon, actions, as: Heading = "h2", className, ...props },
  ref,
) {
  const heading = <Heading className={sectionHeaderTitleVariants({ variant })}>{title}</Heading>;

  if (variant === "accentBar") {
    return (
      <div
        ref={ref}
        data-slot="section-header"
        className={cn("flex items-center gap-3 border-b border-slate-100 py-2 pb-4", className)}
        {...props}
      >
        <span aria-hidden="true" className="gradient-accent-bar h-9 w-1.5 rounded-full shadow-sm" />
        <div className="min-w-0 flex-1">
          {heading}
          {subtitle ? <p className="mt-1 text-xs text-gray-500 md:text-sm">{subtitle}</p> : null}
        </div>
        {actions}
      </div>
    );
  }

  if (variant === "dot") {
    return (
      <div
        ref={ref}
        data-slot="section-header"
        className={cn("mb-4 flex items-center gap-2", className)}
        {...props}
      >
        <span aria-hidden="true" className="size-2.5 rounded-full bg-blue-600" />
        {heading}
        {actions ? <div className="ms-auto">{actions}</div> : null}
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <div
        ref={ref}
        data-slot="section-header"
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {icon ? (
          <span aria-hidden="true" className="text-primary [&>svg]:size-5">
            {icon}
          </span>
        ) : null}
        {heading}
        {actions ? <div className="ms-auto">{actions}</div> : null}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-slot="section-header"
      className={cn("flex w-full items-center justify-between gap-3 py-3", className)}
      {...props}
    >
      {heading}
      {actions}
    </div>
  );
});

SectionHeader.displayName = "SectionHeader";
