"use client";

import {
  forwardRef,
  useId,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
} from "react";
import { cn } from "../../utils/cn.js";
import { Switch, type SwitchProps } from "./Switch.js";

/** Props specific to `SwitchCard`. It also accepts every `Switch` prop. */
export type SwitchCardOwnProps = {
  /** The setting's name, e.g. "اعلان‌های ایمیلی". Labels the switch. */
  title: ReactNode;
  /** A line under the title, e.g. what the setting changes. Describes the switch. */
  description?: ReactNode;
  /** Classes for the switch inside the card. `className` styles the card itself. */
  switchClassName?: string;
};

export type SwitchCardProps = Omit<SwitchProps, keyof SwitchCardOwnProps | "children"> &
  SwitchCardOwnProps;

/**
 * A setting presented as a bordered row: the title and description at the inline start, the switch
 * at the inline end. The whole card is the click target, and it takes a soft blue tint while on.
 * The ref and every switch prop go to the switch, so it works with forms like `Switch` does.
 */
// Annotated rather than inferred: the inferred type reaches into the Radix props type, which the
// declaration build cannot name from here (TS2883).
export const SwitchCard: ForwardRefExoticComponent<
  SwitchCardProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, SwitchCardProps>(function SwitchCard(
  { title, description, className, switchClassName, id, ...props },
  ref,
) {
  const generatedId = useId();
  const switchId = id ?? `${generatedId}-switch`;
  const titleId = `${switchId}-title`;
  const descriptionId = `${switchId}-description`;
  const describedBy = [props["aria-describedby"], description ? descriptionId : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    // The label makes the whole card toggle the switch; the switch takes its name and description
    // from the parts by id, so the description is not folded into the name.
    <label
      htmlFor={switchId}
      data-slot="switch-card"
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200",
        "hover:border-gray-300",
        "has-[[data-state=checked]]:border-blue-200 has-[[data-state=checked]]:bg-blue-50/60",
        "has-[[aria-invalid=true]]:border-red-500",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60",
        className,
      )}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          id={titleId}
          data-slot="switch-card-title"
          className="text-sm font-semibold break-words text-gray-800"
        >
          {title}
        </span>
        {description ? (
          <span
            id={descriptionId}
            data-slot="switch-card-description"
            className="text-xs leading-5 break-words text-gray-500"
          >
            {description}
          </span>
        ) : null}
      </span>
      <Switch
        ref={ref}
        id={switchId}
        aria-labelledby={titleId}
        {...props}
        aria-describedby={describedBy || undefined}
        className={cn("-mt-0.5", switchClassName)}
      />
    </label>
  );
});

SwitchCard.displayName = "SwitchCard";
