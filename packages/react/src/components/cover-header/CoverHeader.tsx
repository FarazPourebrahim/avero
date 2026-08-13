import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";

/** Props specific to `CoverHeader`. It also accepts every native `<div>` attribute. */
export type CoverHeaderOwnProps = {
  /** Cover content, e.g. an `<img>`. Defaults to a blue-to-purple gradient. */
  cover?: ReactNode;
  /** Avatar content, e.g. an `<img>`, placed in the white ring that overlaps the cover. */
  avatar?: ReactNode;
  /** Bar under a divider, e.g. profile tabs and social buttons. */
  footer?: ReactNode;
};

export type CoverHeaderProps = Omit<HTMLAttributes<HTMLDivElement>, keyof CoverHeaderOwnProps> &
  CoverHeaderOwnProps;

/**
 * Profile header (D-23): a gradient cover with a bottom shade, an avatar overlapping
 * the cover, identity content beside it and an optional footer bar. Children are the identity
 * block (name, badges, meta).
 */
export const CoverHeader = forwardRef<HTMLDivElement, CoverHeaderProps>(function CoverHeader(
  { cover, avatar, footer, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="cover-header"
      className={cn(
        "shadow-card-ambient relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 sm:p-6",
        className,
      )}
      {...props}
    >
      <div
        data-slot="cover-header-cover"
        className="relative h-36 w-full overflow-hidden rounded-2xl from-blue-600 via-indigo-600 to-purple-700 md:h-52 lg:h-72 ltr:bg-gradient-to-l rtl:bg-gradient-to-r [&>img]:size-full [&>img]:object-cover"
      >
        {cover}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      <div className="relative w-full lg:px-4 xl:px-8">
        <div className="mb-6 flex flex-col items-start justify-between sm:mb-8 lg:flex-row">
          <div className="flex w-full flex-col items-center text-center lg:flex-row lg:items-end lg:text-start">
            {avatar ? (
              <div className="relative shrink-0">
                <div
                  data-slot="cover-header-avatar"
                  className="relative -mt-14 flex size-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-md md:-mt-20 md:size-44 lg:me-6 [&>img]:size-full [&>img]:object-cover [&>img]:transition [&>img]:duration-300 [&>img]:hover:scale-105"
                >
                  {avatar}
                </div>
              </div>
            ) : null}
            <div data-slot="cover-header-content" className="mt-3 flex-1 lg:mt-4">
              {children}
            </div>
          </div>
        </div>
        {footer ? (
          <div
            data-slot="cover-header-footer"
            className="flex flex-col items-stretch justify-between gap-4 border-t border-slate-100 pt-4 md:flex-row md:items-center"
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
});

CoverHeader.displayName = "CoverHeader";
