import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { GlowOrbs } from "../../components/glow-orbs/index.js";
import { Eyebrow } from "../../components/typography/index.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `CtaBanner`. It also accepts every native `<section>` attribute. */
export type CtaBannerOwnProps = {
  /** Small uppercase label above the title, e.g. "مأموریت و چشم‌انداز". */
  eyebrow?: ReactNode;
  /** The banner's headline. */
  title: ReactNode;
  /** Supporting paragraph under the headline. */
  children?: ReactNode;
  /**
   * Controls under the text. The reference's banner has none — it is purely a statement — so
   * anything here is the page's own addition.
   */
  actions?: ReactNode;
  /** Heading level of the title. @defaultValue "h3" */
  titleAs?: "h2" | "h3" | "h4";
};

export type CtaBannerProps = Omit<HTMLAttributes<HTMLElement>, keyof CtaBannerOwnProps> &
  CtaBannerOwnProps;

/**
 * Dark gradient banner (B-13, R-03): a slate-to-indigo sweep with two blurred glows behind an
 * eyebrow, a headline and a paragraph.
 *
 * The glows are decorative and hidden from assistive technology; the text sits above them on its
 * own stacking layer so the blur never washes it out.
 */
export const CtaBanner = forwardRef<HTMLElement, CtaBannerProps>(function CtaBanner(
  { eyebrow, title, children, actions, titleAs: Title = "h3", className, ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      data-slot="cta-banner"
      className={cn(
        "relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl md:p-12",
        className,
      )}
      {...props}
    >
      <GlowOrbs />
      <div className="relative z-10 flex max-w-3xl flex-col gap-y-4">
        {eyebrow ? <Eyebrow tone="onDark">{eyebrow}</Eyebrow> : null}
        <Title className="text-xl leading-snug font-bold md:text-2xl">{title}</Title>
        {children ? (
          <p className="text-justify text-sm leading-8 text-slate-300 md:text-base">{children}</p>
        ) : null}
        {actions ? (
          <div data-slot="cta-banner-actions" className="flex flex-wrap items-center gap-3 pt-2">
            {actions}
          </div>
        ) : null}
      </div>
    </section>
  );
});

CtaBanner.displayName = "CtaBanner";
