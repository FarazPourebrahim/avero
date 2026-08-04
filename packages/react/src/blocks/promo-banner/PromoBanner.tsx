import { forwardRef, type AnchorHTMLAttributes } from "react";
import { Image } from "../../components/image/index.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `PromoBanner`. It also accepts every native `<a>` attribute. */
export type PromoBannerOwnProps = {
  /** Where the banner links to. */
  href: string;
  /** Banner artwork. */
  image: string;
  /** The link's accessible name, and the image's alternative text. */
  label: string;
  /**
   * `listing` is the services sidebar's banner, hidden below `md` (R-06); `project` is the
   * projects sidebar's, which carries a shadow and fades on hover (R-07). @defaultValue "listing"
   */
  variant?: "listing" | "project";
};

export type PromoBannerProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof PromoBannerOwnProps | "children"
> &
  PromoBannerOwnProps;

/**
 * Sidebar promo banner (B-12, R-06/R-07): one artwork that links somewhere, in the two shapes the
 * reference gives it.
 *
 * The services banner sets `w-full h-70` on an inline `<a>`, where neither applies, so it renders
 * at the artwork's own aspect ratio rather than in a 280px box (defect R-19). That rendered result
 * is what this reproduces, per the visual-conflict rule.
 *
 * The reference's services banner also carries `alt=""` on the only content of a link, leaving the
 * link unnamed (defect R-10); `label` is required here (deviation V-04).
 */
export const PromoBanner = forwardRef<HTMLAnchorElement, PromoBannerProps>(function PromoBanner(
  { href, image, label, variant = "listing", className, ...props },
  ref,
) {
  const isProject = variant === "project";

  return (
    <a
      ref={ref}
      href={href}
      data-slot="promo-banner"
      className={cn(
        isProject ? "block overflow-hidden rounded-2xl" : "hidden rounded-xl md:block",
        className,
      )}
      {...props}
    >
      <Image
        src={image}
        alt={label}
        radius={isProject ? "2xl" : "xl"}
        className={cn("w-full", isProject && "shadow-sm transition-opacity hover:opacity-95")}
      />
    </a>
  );
});

PromoBanner.displayName = "PromoBanner";
