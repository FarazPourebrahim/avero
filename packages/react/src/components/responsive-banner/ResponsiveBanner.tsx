import { forwardRef, type ReactNode } from "react";
import { Image, type ImageProps } from "../image/Image.js";

// Tailwind v4's default breakpoints, which Avero keeps (§4.4). A `<source>` media query can't read
// a CSS variable, so the values are repeated here.
const BREAKPOINT_MEDIA = {
  sm: "(min-width: 40rem)",
  md: "(min-width: 48rem)",
  lg: "(min-width: 64rem)",
} as const;

/** Props specific to `ResponsiveBanner`. It also accepts every `Image` prop except `src`. */
export type ResponsiveBannerOwnProps = {
  /** Artwork for screens at or above `breakpoint`. */
  desktopSrc: string;
  /** Artwork for narrower screens; also the fallback for browsers without `<picture>`. */
  mobileSrc: string;
  /** Alternative text, shared by both artworks. Pass an empty string for a decorative banner. */
  alt: string;
  /** Width at which the desktop artwork takes over. @defaultValue "md" */
  breakpoint?: keyof typeof BREAKPOINT_MEDIA;
  /** Corner radius. @defaultValue "2xl" */
  radius?: ImageProps["radius"];
  /** Rendered in place of the banner when the artwork fails to load. */
  fallback?: ReactNode;
  /** Classes for the `<picture>` wrapper. */
  pictureClassName?: string;
};

export type ResponsiveBannerProps = Omit<ImageProps, "src" | keyof ResponsiveBannerOwnProps> &
  ResponsiveBannerOwnProps;

/**
 * A banner that shows separate artwork on mobile and desktop. The browser picks the file through
 * `<picture>`, so only one image downloads and it works without JavaScript or a layout shift.
 */
export const ResponsiveBanner = forwardRef<HTMLImageElement, ResponsiveBannerProps>(
  function ResponsiveBanner(
    {
      desktopSrc,
      mobileSrc,
      alt,
      breakpoint = "md",
      radius = "2xl",
      pictureClassName,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <picture data-slot="responsive-banner" className={pictureClassName}>
        <source media={BREAKPOINT_MEDIA[breakpoint]} srcSet={desktopSrc} />
        <Image
          ref={ref}
          src={mobileSrc}
          alt={alt}
          radius={radius}
          className={className ?? "w-full"}
          {...props}
        />
      </picture>
    );
  },
);

ResponsiveBanner.displayName = "ResponsiveBanner";
