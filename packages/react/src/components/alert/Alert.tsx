"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";
import {
  alertIconClasses,
  alertTitleClasses,
  alertVariants,
  type AlertTone,
  type AlertVariantProps,
} from "./alert.variants.js";

const defaultIcons: Record<AlertTone, ReactNode> = {
  info: <InfoIcon />,
  success: <CircleCheckIcon />,
  warning: <TriangleAlertIcon />,
  danger: <CircleAlertIcon />,
  neutral: <InfoIcon />,
};

/** Props specific to `Alert`. It also accepts every native `<div>` attribute except `title`. */
export type AlertOwnProps = {
  /** Meaning and colour of the message. @defaultValue "info" */
  tone?: AlertTone;
  /** `tinted` fills the panel with the tone; `bordered` is white with an accent bar. @defaultValue "tinted" */
  variant?: AlertVariantProps["variant"];
  /** A short headline in bold. */
  title?: ReactNode;
  /** The message. */
  children?: ReactNode;
  /** Replaces the tone's icon; `false` removes the icon. */
  icon?: ReactNode | false;
  /** Buttons or links below the message. */
  action?: ReactNode;
  /** Shows a close button that calls this. The alert doesn't hide itself; remove it in response. */
  onDismiss?: () => void;
  /** Accessible label of the close button. @defaultValue the dictionary's `close` */
  dismissLabel?: string;
};

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, keyof AlertOwnProps | "title"> &
  AlertOwnProps;

/**
 * A message in a tinted or bordered panel. It is not a live region by default: pass `role="alert"`
 * when it appears in response to an action, such as a failed submit, so screen readers announce it.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    tone = "info",
    variant = "tinted",
    title,
    icon,
    action,
    onDismiss,
    dismissLabel,
    className,
    children,
    ...props
  },
  ref,
) {
  const { dictionary } = useAvero();
  const shownIcon = icon === false ? null : (icon ?? defaultIcons[tone]);

  return (
    <div
      ref={ref}
      data-slot="alert"
      data-tone={tone}
      data-variant={variant}
      className={cn(alertVariants({ variant, tone }), className)}
      {...props}
    >
      {shownIcon ? (
        <span
          aria-hidden
          data-slot="alert-icon"
          className={cn("mt-0.5 flex shrink-0 [&>svg]:size-5", alertIconClasses[tone])}
        >
          {shownIcon}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title ? (
          <div
            data-slot="alert-title"
            className={cn(
              "font-bold",
              variant === "bordered" ? "text-gray-900" : alertTitleClasses[tone],
            )}
          >
            {title}
          </div>
        ) : null}
        {children ? <div data-slot="alert-description">{children}</div> : null}
        {action ? (
          <div data-slot="alert-action" className="mt-2 flex flex-wrap items-center gap-2">
            {action}
          </div>
        ) : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          aria-label={dismissLabel ?? dictionary.close}
          data-slot="alert-dismiss"
          onClick={onDismiss}
          className="-me-1.5 -mt-1 shrink-0 cursor-pointer rounded-lg p-1.5 opacity-70 transition hover:bg-black/5 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-current/40 focus-visible:outline-none"
        >
          <XIcon className="size-4" />
        </button>
      ) : null}
    </div>
  );
});

Alert.displayName = "Alert";
