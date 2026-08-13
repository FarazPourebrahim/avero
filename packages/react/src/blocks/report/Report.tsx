"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { Button } from "../../components/button/index.js";
import { Card } from "../../components/card/index.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { FlagIcon, ShieldAlertIcon, TriangleAlertIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";

/**
 * Three report control shapes:
 * - `mini`: a compact control in a card's action row, beside like and share
 * - `text`: a plain text control under a description
 * - `soft`: a tinted button, as inside `ReportCard`
 */
export const reportActionVariants = cva("inline-flex cursor-pointer items-center transition", {
  variants: {
    variant: {
      mini: "text-2xs gap-1 px-2 py-1 text-slate-400 hover:text-red-500",
      text: "gap-2 text-sm text-gray-500 hover:text-red-600",
      soft: "",
    },
  },
  defaultVariants: { variant: "mini" },
});

/** Props specific to `ReportAction`. It also accepts every native `<button>` attribute. */
export type ReportActionOwnProps = {
  /** Which of the three shapes to render. @defaultValue "mini" */
  variant?: VariantProps<typeof reportActionVariants>["variant"];
  /** The control's text. @defaultValue the `report` dictionary string */
  children?: ReactNode;
  /** Called when the control is activated. */
  onReport?: () => void;
};

export type ReportActionProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ReportActionOwnProps
> &
  ReportActionOwnProps;

/**
 * Report control. The same action appears in three places with three
 * shapes, so it is one component with a variant rather than three near-copies.
 *
 * Every variant has real text, because a `title` attribute alone is not a reliable accessible
 * name.
 */
export const ReportAction = forwardRef<HTMLButtonElement, ReportActionProps>(function ReportAction(
  { variant = "mini", children, onReport, className, type, title, ...props },
  ref,
) {
  const { dictionary } = useAvero();
  const label = children ?? dictionary.report;

  if (variant === "soft") {
    return (
      <Button
        ref={ref}
        data-slot="report-action"
        variant="soft"
        tone="rose"
        size="sm"
        onClick={onReport}
        className={className}
        title={title}
        type={type}
        {...props}
      >
        <ShieldAlertIcon className="size-4" />
        {label}
      </Button>
    );
  }

  return (
    <button
      ref={ref}
      type={type ?? "button"}
      data-slot="report-action"
      title={title}
      onClick={onReport}
      className={cn(reportActionVariants({ variant }), className)}
      {...props}
    >
      {variant === "mini" ? (
        <TriangleAlertIcon className="size-3.5" />
      ) : (
        <FlagIcon className="size-4" />
      )}
      <span>{label}</span>
    </button>
  );
});

ReportAction.displayName = "ReportAction";

/** Props specific to `ReportCard`. It also accepts every native `<div>` attribute. */
export type ReportCardOwnProps = {
  /** Panel title. @defaultValue the `reportTitle` dictionary string */
  title?: ReactNode;
  /** Line under the title. @defaultValue the `reportDescription` dictionary string */
  description?: ReactNode;
  /** Button text. @defaultValue the `report` dictionary string */
  actionLabel?: ReactNode;
  /** Called when the button is activated. */
  onReport?: () => void;
};

export type ReportCardProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof ReportCardOwnProps | "children"
> &
  ReportCardOwnProps;

/** Report panel for a detail page: a titled row with a tinted report button. */
export const ReportCard = forwardRef<HTMLDivElement, ReportCardProps>(function ReportCard(
  { title, description, actionLabel, onReport, className, ...props },
  ref,
) {
  const { dictionary } = useAvero();

  return (
    <Card
      ref={ref}
      variant="surface"
      elevation="xs"
      padding="none"
      className={cn("flex items-center justify-between p-5", className)}
      data-slot="report-card"
      {...props}
    >
      <div className="space-y-0.5">
        <span className="block text-xs font-bold text-slate-700">
          {title ?? dictionary.reportTitle}
        </span>
        <span className="text-3xs block text-slate-400">
          {description ?? dictionary.reportDescription}
        </span>
      </div>
      <ReportAction variant="soft" onReport={onReport}>
        {actionLabel}
      </ReportAction>
    </Card>
  );
});

ReportCard.displayName = "ReportCard";
