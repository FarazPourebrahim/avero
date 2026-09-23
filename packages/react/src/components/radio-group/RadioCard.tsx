"use client";

import {
  forwardRef,
  useId,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
} from "react";
import { cn } from "../../utils/cn.js";
import { RadioGroupItem, type RadioGroupItemProps } from "./RadioGroup.js";

/** Props specific to `RadioCard`. It also accepts every `RadioGroupItem` prop. */
export type RadioCardOwnProps = {
  /** The option's name, e.g. "ارسال با پیک". Labels the radio. */
  title: ReactNode;
  /** A line under the title, e.g. what the option means. Describes the radio. */
  description?: ReactNode;
  /** Content at the card's inline end, such as a price or an icon. */
  aside?: ReactNode;
  /** Classes for the radio inside the card. `className` styles the card itself. */
  radioClassName?: string;
};

export type RadioCardProps = Omit<RadioGroupItemProps, keyof RadioCardOwnProps | "children"> &
  RadioCardOwnProps;

/**
 * A `RadioGroup` option presented as a bordered card: the whole card is the click target, and it
 * takes a soft blue tint while chosen. Use it inside a `RadioGroup` where each option needs a title
 * and a line of explanation. The ref and every item prop go to the radio itself, so arrow keys,
 * `value` and form submission work exactly as they do for `RadioGroupItem`.
 */
// Annotated rather than inferred: the inferred type reaches into Radix's own props type, which the
// declaration build cannot name from here (TS2883).
export const RadioCard: ForwardRefExoticComponent<
  RadioCardProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, RadioCardProps>(function RadioCard(
  { title, description, aside, className, radioClassName, id, ...props },
  ref,
) {
  const generatedId = useId();
  const radioId = id ?? `${generatedId}-radio`;
  const titleId = `${radioId}-title`;
  const descriptionId = `${radioId}-description`;
  const describedBy = [props["aria-describedby"], description ? descriptionId : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    // The label makes the whole card choose the option; the radio takes its name and description
    // from the parts by id, so the description is not folded into the name.
    <label
      htmlFor={radioId}
      data-slot="radio-card"
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200",
        "hover:border-gray-300",
        "has-[[data-state=checked]]:border-blue-200 has-[[data-state=checked]]:bg-blue-50/60",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60",
        className,
      )}
    >
      <RadioGroupItem
        ref={ref}
        id={radioId}
        aria-labelledby={titleId}
        {...props}
        aria-describedby={describedBy || undefined}
        className={cn("-mt-0.5", radioClassName)}
      />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          id={titleId}
          data-slot="radio-card-title"
          className="text-sm font-semibold break-words text-gray-800"
        >
          {title}
        </span>
        {description ? (
          <span
            id={descriptionId}
            data-slot="radio-card-description"
            className="text-xs leading-5 break-words text-gray-500"
          >
            {description}
          </span>
        ) : null}
      </span>
      {aside ? (
        <span data-slot="radio-card-aside" className="shrink-0 text-sm text-gray-700">
          {aside}
        </span>
      ) : null}
    </label>
  );
});

RadioCard.displayName = "RadioCard";
