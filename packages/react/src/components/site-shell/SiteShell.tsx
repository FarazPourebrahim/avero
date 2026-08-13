"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `SiteShell`. It also accepts every native `<div>` attribute. */
export type SiteShellOwnProps = {
  /** The site header, usually `SiteHeader` with its drawer. */
  header?: ReactNode;
  /** The site footer, usually `SiteFooter`. */
  footer?: ReactNode;
  /** Page content — typically one of the layout templates, which supplies the `main` landmark. */
  children?: ReactNode;
  /**
   * Target id for the skip link. Set it on the page's `main` element.
   * @defaultValue "main-content"
   */
  mainId?: string;
  /** Skip-link text. @defaultValue the dictionary's `skipToContent` */
  skipLabel?: ReactNode;
  /** Hides the skip link, e.g. in a preview. @defaultValue true */
  skipLink?: boolean;
};

export type SiteShellProps = Omit<HTMLAttributes<HTMLDivElement>, keyof SiteShellOwnProps> &
  SiteShellOwnProps;

/**
 * Public page shell: skip link, header, content and footer with a consistent vertical
 * rhythm. The header and footer are slots, so routing and data stay in the application.
 */
export const SiteShell = forwardRef<HTMLDivElement, SiteShellProps>(function SiteShell(
  {
    header,
    footer,
    mainId = "main-content",
    skipLabel,
    skipLink = true,
    className,
    children,
    ...props
  },
  ref,
) {
  const { dictionary } = useAvero();

  return (
    <div
      ref={ref}
      data-slot="site-shell"
      className={cn("flex flex-col gap-y-10", className)}
      {...props}
    >
      {skipLink ? (
        <a
          href={`#${mainId}`}
          data-slot="site-shell-skip-link"
          className="bg-primary sr-only rounded-xl px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-(--z-max)"
        >
          {skipLabel ?? dictionary.skipToContent}
        </a>
      ) : null}
      {header}
      {children}
      {footer}
    </div>
  );
});

SiteShell.displayName = "SiteShell";
