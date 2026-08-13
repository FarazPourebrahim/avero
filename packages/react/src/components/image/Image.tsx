"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn.js";

/**
 * Image styles: cover images with rounded corners, a subtle hover zoom for article covers
 * (`hover:scale-102 duration-500`) and a group zoom for cards (`group-hover:scale-105 duration-500`).
 */
export const imageVariants = cva("block max-w-full", {
  variants: {
    fit: {
      cover: "object-cover",
      contain: "object-contain",
    },
    radius: {
      none: "",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
    zoom: {
      none: "",
      subtle: "transition duration-500 hover:scale-102",
      hover: "transition duration-500 hover:scale-105",
      group: "transition-transform duration-500 group-hover:scale-105",
    },
    aspect: {
      auto: "",
      video: "aspect-video w-full",
      "4/3": "aspect-[4/3] w-full",
      "9/16": "aspect-[9/16] w-full",
      "9/15": "aspect-[9/15] w-full",
      square: "aspect-square w-full",
    },
  },
  defaultVariants: {
    fit: "cover",
    radius: "none",
    zoom: "none",
    aspect: "auto",
  },
});

type ImageVariantProps = VariantProps<typeof imageVariants>;

/** Props specific to `Image`. It also accepts every native `<img>` attribute. */
export type ImageOwnProps = {
  /** Alternative text. Pass an empty string for purely decorative images. */
  alt: string;
  /** Rendered in place of the image when it fails to load. @defaultValue a neutral gray block */
  fallback?: ReactNode;
  /** How the image fills its box. @defaultValue "cover" */
  fit?: ImageVariantProps["fit"];
  /** Corner radius. @defaultValue "none" */
  radius?: ImageVariantProps["radius"];
  /** Hover zoom: `subtle` (article cover), `hover` or `group` (zooms when a parent `group` is hovered). @defaultValue "none" */
  zoom?: ImageVariantProps["zoom"];
  /** Fixed aspect ratio at full width. @defaultValue "auto" */
  aspect?: ImageVariantProps["aspect"];
};

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, keyof ImageOwnProps> &
  ImageOwnProps;

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    className,
    fit,
    radius,
    zoom,
    aspect,
    fallback,
    alt,
    loading = "lazy",
    decoding = "async",
    onError,
    ...props
  },
  ref,
) {
  const [failed, setFailed] = useState(false);
  const classes = cn(imageVariants({ fit, radius, zoom, aspect }), className);

  if (failed) {
    return (
      fallback ?? (
        <span
          role={alt ? "img" : undefined}
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : true}
          data-slot="image-fallback"
          className={cn(classes, "bg-gray-100")}
        />
      )
    );
  }

  return (
    <img
      ref={ref}
      alt={alt}
      loading={loading}
      decoding={decoding}
      data-slot="image"
      className={classes}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...props}
    />
  );
});

Image.displayName = "Image";

/** Props specific to `Figure`. It also accepts every native `<figure>` attribute. */
export type FigureOwnProps = {
  /** Optional caption rendered in a `<figcaption>`. */
  caption?: ReactNode;
  /** Clips zoomed media to the figure's rounded corners. @defaultValue true */
  clip?: boolean;
};

export type FigureProps = Omit<HTMLAttributes<HTMLElement>, keyof FigureOwnProps> & FigureOwnProps;

/** Wraps media, clipping zoom effects to rounded corners, e.g. an article cover frame. */
export const Figure = forwardRef<HTMLElement, FigureProps>(function Figure(
  { caption, clip = true, className, children, ...props },
  ref,
) {
  return (
    <figure
      ref={ref}
      data-slot="figure"
      className={cn(clip && "overflow-hidden", "rounded-2xl", className)}
      {...props}
    >
      {children}
      {caption ? (
        <figcaption className="mt-2 text-center text-xs text-gray-500">{caption}</figcaption>
      ) : null}
    </figure>
  );
});

Figure.displayName = "Figure";
