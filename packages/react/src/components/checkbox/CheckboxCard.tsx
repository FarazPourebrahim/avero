"use client";

import {
  forwardRef,
  useId,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
} from "react";
import { cn } from "../../utils/cn.js";
import { Checkbox, type CheckboxProps } from "./Checkbox.js";

/** Props specific to `CheckboxCard`. It also accepts every `Checkbox` prop. */
export type CheckboxCardOwnProps = {
  /** The option's name, e.g. "ایمیل هفتگی". Labels the checkbox. */
  title: ReactNode;
  /** A line under the title, e.g. what the option does. Describes the checkbox. */
  description?: ReactNode;
  /** Content at the card's inline end, such as a price or an icon. */
  aside?: ReactNode;
  /** Classes for the checkbox inside the card. `className` styles the card itself. */
  checkboxClassName?: string;
};

export type CheckboxCardProps = Omit<CheckboxProps, keyof CheckboxCardOwnProps | "children"> &
  CheckboxCardOwnProps;

/**
 * A checkbox presented as a bordered option: the whole card is the click target, and it takes the
 * soft blue tint while checked. Use it where each choice needs a title and a line of explanation.
 * The ref and every checkbox prop go to the checkbox, so it works with forms like `Checkbox` does.
 */
// Annotated rather than inferred: the inferred type reaches into Radix's own props type, which the
// declaration build cannot name from here (TS2883).
export const CheckboxCard: ForwardRefExoticComponent<
  CheckboxCardProps & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, CheckboxCardProps>(function CheckboxCard(
  { title, description, aside, className, checkboxClassName, id, ...props },
  ref,
) {
  const generatedId = useId();
  const checkboxId = id ?? `${generatedId}-checkbox`;
  const titleId = `${checkboxId}-title`;
  const descriptionId = `${checkboxId}-description`;
  const describedBy = [props["aria-describedby"], description ? descriptionId : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    // The label makes the whole card toggle the checkbox; the checkbox takes its name and
    // description from the parts by id, so the description is not folded into the name.
    <label
      htmlFor={checkboxId}
      data-slot="checkbox-card"
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200",
        "hover:border-gray-300",
        "has-[[data-state=checked]]:border-blue-200 has-[[data-state=checked]]:bg-blue-50/60",
        "has-[[data-state=indeterminate]]:border-blue-200 has-[[data-state=indeterminate]]:bg-blue-50/60",
        "has-[[aria-invalid=true]]:border-red-500",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60",
        className,
      )}
    >
      <Checkbox
        ref={ref}
        id={checkboxId}
        aria-labelledby={titleId}
        {...props}
        aria-describedby={describedBy || undefined}
        className={cn("-mt-0.5", checkboxClassName)}
      />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          id={titleId}
          data-slot="checkbox-card-title"
          className="text-sm font-semibold break-words text-gray-800"
        >
          {title}
        </span>
        {description ? (
          <span
            id={descriptionId}
            data-slot="checkbox-card-description"
            className="text-xs leading-5 break-words text-gray-500"
          >
            {description}
          </span>
        ) : null}
      </span>
      {aside ? (
        <span data-slot="checkbox-card-aside" className="shrink-0 text-sm text-gray-700">
          {aside}
        </span>
      ) : null}
    </label>
  );
});

CheckboxCard.displayName = "CheckboxCard";
