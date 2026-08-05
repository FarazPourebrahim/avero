import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Badge } from "../../components/badge/index.js";
import { Card } from "../../components/card/index.js";
import { Image } from "../../components/image/index.js";

/** Props specific to `SplitHero`. It also accepts every native `<div>` attribute. */
export type SplitHeroOwnProps = {
  /** Gradient pill above the title, e.g. "تابستون ۱۴۰۵". Pass an icon with it if you want one. */
  eyebrow?: ReactNode;
  /** Quiet line beside the pill, e.g. "نقطه آغاز ماجرا". */
  note?: ReactNode;
  /** The hero's headline. */
  title: ReactNode;
  /** Body paragraphs, in the reference's justified 15px prose. */
  children?: ReactNode;
  /** Buttons or links under the text. */
  actions?: ReactNode;
  /** Illustration for the framed panel beside the text. */
  image?: string;
  /** The illustration's alternative text. Pass an empty string if it is purely decorative. */
  imageAlt?: string;
  /** Heading level of the title. @defaultValue "h2" */
  titleAs?: "h1" | "h2" | "h3";
};

export type SplitHeroProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof SplitHeroOwnProps | "children"
> &
  SplitHeroOwnProps;

/**
 * Split hero (B-14, R-03): seven columns of text beside five columns of framed illustration,
 * stacking to one column below `lg`.
 *
 * The reference pins the text with `text-right`, which is correct only in RTL (defect R-09); this
 * uses the logical `text-start`, so the hero also reads correctly in LTR.
 */
export const SplitHero = forwardRef<HTMLDivElement, SplitHeroProps>(function SplitHero(
  {
    eyebrow,
    note,
    title,
    children,
    actions,
    image,
    imageAlt = "",
    titleAs: Title = "h2",
    className,
    ...props
  },
  ref,
) {
  return (
    <Card
      ref={ref}
      variant="surface"
      elevation="soft"
      padding="xl"
      className={className}
      data-slot="split-hero"
      {...props}
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="flex flex-col items-start gap-y-5 text-start lg:col-span-7">
          {eyebrow || note ? (
            <div className="flex items-center gap-2">
              {eyebrow ? <Badge variant="label">{eyebrow}</Badge> : null}
              {note ? <span className="text-xs font-medium text-gray-400">{note}</span> : null}
            </div>
          ) : null}

          <Title className="text-xl leading-snug font-bold text-slate-800 md:text-2xl">
            {title}
          </Title>

          {children ? (
            <div
              data-slot="split-hero-body"
              className="md:text-md space-y-4 text-justify text-sm leading-8 text-gray-600"
            >
              {children}
            </div>
          ) : null}

          {actions ? (
            <div data-slot="split-hero-actions" className="flex flex-wrap items-center gap-3 pt-2">
              {actions}
            </div>
          ) : null}
        </div>

        {image ? (
          <div className="flex items-center justify-center lg:col-span-5">
            <div className="relative flex w-full max-w-md justify-center rounded-2xl border border-slate-100 bg-gradient-to-tr from-slate-50 to-indigo-50/50 p-4">
              <Image
                src={image}
                alt={imageAlt}
                fit="contain"
                zoom="hover"
                className="max-h-80 w-full drop-shadow-sm"
              />
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
});

SplitHero.displayName = "SplitHero";
