"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Avatar as RadixAvatar } from "radix-ui";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";

/**
 * Avatar styles extracted from the reference (P-06):
 * sizes from the listing author (28px) to the profile header (112 → 176px); shapes from circles to
 * the dashboard's rounded squares; borders from the header hairline to the profile's white ring.
 */
export const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-slate-200 align-middle",
  {
    variants: {
      size: {
        xs: "size-7",
        sm: "size-10",
        md: "size-12 sm:size-14",
        lg: "size-16",
        xl: "size-20",
        "2xl": "size-24",
        "3xl": "size-28 md:size-44",
      },
      shape: {
        circle: "rounded-full",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
      },
      border: {
        none: "",
        hairline: "border border-gray-200",
        accent: "border-2 border-indigo-100",
        muted: "border-4 border-gray-500/20",
        ring: "border-4 border-white shadow-md",
      },
    },
    defaultVariants: {
      size: "sm",
      shape: "circle",
      border: "none",
    },
  },
);

export type AvatarProps = Omit<ComponentPropsWithoutRef<typeof RadixAvatar.Root>, "children"> &
  VariantProps<typeof avatarVariants> & {
    src?: string;
    /** The person's name. Used as the image's alternative text and to derive fallback initials. */
    name: string;
    /** Content shown while the image loads or when it fails. Defaults to the name's initials. */
    fallback?: ReactNode;
    /** Classes for the `<img>` element, e.g. hover zoom. */
    imageClassName?: string;
  };

/** Returns up to two initials from a name, e.g. "Faraz Pourebrahim" → "FP", "زینب فلاح" → "زف". */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = words[0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1] ?? "") : "";
  return `${Array.from(first)[0] ?? ""}${Array.from(last)[0] ?? ""}`.toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, name, fallback, size, shape, border, className, imageClassName, ...props },
  ref,
) {
  return (
    <RadixAvatar.Root
      ref={ref}
      data-slot="avatar"
      className={cn(avatarVariants({ size, shape, border }), className)}
      {...props}
    >
      {src ? (
        <RadixAvatar.Image
          src={src}
          alt={name}
          className={cn("size-full object-cover", imageClassName)}
        />
      ) : null}
      {/* Without an image the fallback renders immediately (also on the server); with one it waits
          briefly so fast-loading images don't flash the initials. */}
      <RadixAvatar.Fallback
        delayMs={src ? 300 : undefined}
        className="flex size-full items-center justify-center text-sm font-bold text-slate-600"
        aria-label={name}
        role="img"
      >
        {fallback ?? getInitials(name)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
});

Avatar.displayName = "Avatar";
