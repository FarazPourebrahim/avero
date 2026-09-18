import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { formatMessage } from "../../i18n/dictionaries.js";
import { formatNumber } from "../../utils/format.js";
import { cn } from "../../utils/cn.js";
import { avatarVariants, type AvatarOwnProps } from "../avatar/Avatar.js";

/** Props specific to `AvatarGroup`. It also accepts every native `<div>` attribute. */
export type AvatarGroupOwnProps = {
  /** The avatars to overlap, in reading order. */
  children: ReactNode;
  /**
   * Show at most this many avatars; the rest become a "+N" tile. Without it every child is shown.
   */
  max?: number;
  /** Size of the overflow tile. Match the avatars it sits beside. @defaultValue "sm" */
  size?: AvatarOwnProps["size"];
  /** How far each avatar overlaps the one before it. @defaultValue "md" */
  overlap?: "sm" | "md" | "lg";
  /** Accessible name of the group, e.g. "شرکت‌کنندگان". */
  label?: string;
};

export type AvatarGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof AvatarGroupOwnProps | "children"
> &
  AvatarGroupOwnProps;

// Logical margin, so the stack overlaps towards the reading direction in both LTR and RTL.
const OVERLAP: Record<NonNullable<AvatarGroupOwnProps["overlap"]>, string> = {
  sm: "[&>*:not(:first-child)]:-ms-2",
  md: "[&>*:not(:first-child)]:-ms-3",
  lg: "[&>*:not(:first-child)]:-ms-4",
};

/**
 * Overlapping avatars for a small group of people, e.g. the participants on a workshop card.
 * Beyond `max` the remainder collapses into a counted tile, so a long list never pushes the layout.
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { children, max, size = "sm", overlap = "md", label, className, ...props },
  ref,
) {
  const { dictionary, locale, digits } = useAvero();
  const items = Array.isArray(children) ? children.flat() : [children];
  const visible = max === undefined ? items : items.slice(0, max);
  const hidden = items.length - visible.length;

  return (
    <div
      ref={ref}
      data-slot="avatar-group"
      role="group"
      aria-label={label}
      className={cn("flex items-center", OVERLAP[overlap], className)}
      {...props}
    >
      {visible}
      {hidden > 0 ? (
        <span
          data-slot="avatar-group-overflow"
          className={cn(
            avatarVariants({ size, shape: "circle", border: "ring" }),
            "bg-gray-100 text-xs font-bold text-gray-600",
          )}
          aria-label={formatMessage(dictionary.avatarGroupOverflow, {
            count: formatNumber(hidden, { locale, digits }),
          })}
          role="img"
        >
          {`+${formatNumber(hidden, { locale, digits })}`}
        </span>
      ) : null}
    </div>
  );
});

AvatarGroup.displayName = "AvatarGroup";
