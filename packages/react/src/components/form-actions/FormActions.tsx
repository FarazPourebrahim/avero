import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";

/** Props specific to `FormActions`. It also accepts every native `<div>` attribute. */
export type FormActionsOwnProps = {
  /** Text beside the actions, e.g. "دیدگاه‌ها پس از بررسی منتشر می‌شوند.". */
  hint?: ReactNode;
  /** `between` puts the hint opposite the actions; `end` keeps the actions alone at the end. @defaultValue the hint decides */
  align?: "between" | "end";
};

export type FormActionsProps = Omit<HTMLAttributes<HTMLDivElement>, keyof FormActionsOwnProps> &
  FormActionsOwnProps;

/** The row under a form: an optional hint, then the submit controls. */
export const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(function FormActions(
  { hint, align, className, children, ...props },
  ref,
) {
  const resolved = align ?? (hint ? "between" : "end");

  return (
    <div
      ref={ref}
      data-slot="form-actions"
      className={cn(
        "flex items-center gap-3",
        resolved === "between" ? "justify-between" : "justify-end",
        className,
      )}
      {...props}
    >
      {hint ? (
        <p data-slot="form-actions-hint" className="text-xs text-gray-400">
          {hint}
        </p>
      ) : null}
      {children}
    </div>
  );
});

FormActions.displayName = "FormActions";
