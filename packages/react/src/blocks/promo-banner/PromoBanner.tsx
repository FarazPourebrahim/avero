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
   * `listing` is a listing sidebar's banner, hidden below `md`; `project` is a detail
   * sidebar's, which carries a shadow and fades on hover. @defaultValue "listing"
   */
  variant?: "listing" | "project";
};

export type PromoBannerProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof PromoBannerOwnProps | "children"
> &
  PromoBannerOwnProps;

/**
 * Sidebar promo banner: one artwork that links somewhere, in two shapes.
 *
 * The banner sets no height, so the artwork keeps its own aspect ratio. The image is the link's
 * only content, so `label` is required: it names the link and the image alike.
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
