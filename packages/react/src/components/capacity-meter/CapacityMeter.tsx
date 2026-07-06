"use client";

import { forwardRef, useId, type HTMLAttributes, type ReactNode } from "react";
import { useAvero, useAveroFormatter } from "../../i18n/AveroProvider.js";
import { formatMessage } from "../../i18n/dictionaries.js";
import { cn } from "../../utils/cn.js";
import { Progress } from "../progress/Progress.js";

/** Props specific to `CapacityMeter`. It also accepts every native `<div>` attribute. */
export type CapacityMeterOwnProps = {
  /** What is being counted, e.g. "ظرفیت دریافت رزومه". Also labels the progress bar. */
  label: ReactNode;
  /** Places taken. */
  value: number;
  /** Total places. */
  max: number;
  /**
   * `detail` shows "value of max" beside the label (project page); `card` shows a status pill and
   * a caption row (related-project cards). @defaultValue "detail"
   */
  variant?: "detail" | "card";
  /** `card` only: pill text, e.g. "9 جای خالی". Turns red once the meter is full. */
  status?: ReactNode;
  /** `card` only: caption under the bar's start, e.g. "3 رزومه ارسال شده". */
  startCaption?: ReactNode;
  /** `card` only: caption under the bar's end, e.g. "حداکثر 12 نفر". */
  endCaption?: ReactNode;
};

export type CapacityMeterProps = Omit<HTMLAttributes<HTMLDivElement>, keyof CapacityMeterOwnProps> &
  CapacityMeterOwnProps;

/** Labelled capacity bar (D-16, R-07). Exposes `data-state="full"` once `value` reaches `max`. */
export const CapacityMeter = forwardRef<HTMLDivElement, CapacityMeterProps>(function CapacityMeter(
  { label, value, max, variant = "detail", status, startCaption, endCaption, className, ...props },
  ref,
) {
  const { dictionary } = useAvero();
  const format = useAveroFormatter();
  const labelId = useId();
  const full = max > 0 && value >= max;
  const card = variant === "card";

  return (
    <div
      ref={ref}
      data-slot="capacity-meter"
      data-state={full ? "full" : "available"}
      className={cn("space-y-2", className)}
      {...props}
    >
      <div
        className={cn("flex items-center justify-between", card ? "flex-wrap gap-2" : "text-sm")}
      >
        <span id={labelId} className={card ? "text-xs text-gray-500" : "text-gray-600"}>
          {label}
        </span>
        {card ? (
          status ? (
            <span
              data-slot="capacity-meter-status"
              className={cn(
                "rounded-full px-2 py-1 text-xs font-medium",
                full ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700",
              )}
            >
              {status}
            </span>
          ) : null
        ) : (
          <span className="font-medium text-gray-800">
            {formatMessage(dictionary.ofTotal, {
              value: format.number(value),
              max: format.number(max),
            })}
          </span>
        )}
      </div>
      <Progress value={value} max={max} aria-labelledby={labelId} />
      {card && (startCaption || endCaption) ? (
        <div className="text-2xs flex justify-between text-gray-400">
          <span>{startCaption}</span>
          <span>{endCaption}</span>
        </div>
      ) : null}
    </div>
  );
});

CapacityMeter.displayName = "CapacityMeter";
