"use client";

import { Slot } from "radix-ui";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type Dispatch,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type SetStateAction,
} from "react";
import { CircleAlertIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";

type FieldContextValue = {
  controlId: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
  hasDescription: boolean;
  hasError: boolean;
  setDescriptionCount: Dispatch<SetStateAction<number>>;
  setErrorCount: Dispatch<SetStateAction<number>>;
};

const FieldContext = createContext<FieldContextValue | null>(null);

function useFieldContext(part: string): FieldContextValue {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error(`${part} must be used within Field`);
  }
  return context;
}

// Descriptions and errors register while they are mounted, so the control's aria-describedby only
// ever points at elements that exist.
function useRegistration(setCount: Dispatch<SetStateAction<number>>, active: boolean) {
  useEffect(() => {
    if (!active) return;
    setCount((count) => count + 1);
    return () => setCount((count) => count - 1);
  }, [active, setCount]);
}

/** Props specific to `Field`. It also accepts every native `<div>` attribute. */
export type FieldOwnProps = {
  /** Id of the control; the label points at it. @defaultValue a generated id */
  id?: string;
  /** Marks the control invalid and shows `FieldError`. @defaultValue false */
  invalid?: boolean;
  /** Marks the control required for assistive technology and adds an asterisk to the label. @defaultValue false */
  required?: boolean;
  /** Disables the control. @defaultValue false */
  disabled?: boolean;
};

export type FieldProps = Omit<HTMLAttributes<HTMLDivElement>, keyof FieldOwnProps> & FieldOwnProps;

/**
 * Groups a label, a control, a description and an error, and wires the ids and ARIA attributes
 * between them.
 */
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { id, invalid = false, required = false, disabled = false, className, ...props },
  ref,
) {
  const generatedId = useId();
  const controlId = id ?? `${generatedId}-control`;
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const context = useMemo<FieldContextValue>(
    () => ({
      controlId,
      descriptionId: `${controlId}-description`,
      errorId: `${controlId}-error`,
      invalid,
      required,
      disabled,
      hasDescription: descriptionCount > 0,
      hasError: errorCount > 0,
      setDescriptionCount,
      setErrorCount,
    }),
    [controlId, invalid, required, disabled, descriptionCount, errorCount],
  );

  return (
    <FieldContext.Provider value={context}>
      <div
        ref={ref}
        data-slot="field"
        data-invalid={invalid ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={cn("flex flex-col gap-1.5", className)}
        {...props}
      />
    </FieldContext.Provider>
  );
});

Field.displayName = "Field";

export type FieldLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

/** The field's label. Points at the control and shows a decorative asterisk when required. */
export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(function FieldLabel(
  { className, children, ...props },
  ref,
) {
  const field = useFieldContext("FieldLabel");

  return (
    <label
      ref={ref}
      htmlFor={field.controlId}
      data-slot="field-label"
      className={cn(
        "text-sm font-semibold text-gray-800",
        field.disabled && "opacity-60",
        className,
      )}
      {...props}
    >
      {children}
      {field.required ? (
        <span aria-hidden="true" className="ms-1 text-red-600">
          *
        </span>
      ) : null}
    </label>
  );
});

FieldLabel.displayName = "FieldLabel";

export type FieldControlProps = ComponentPropsWithoutRef<typeof Slot.Root>;

/**
 * Passes the field's id and ARIA state to its only child, which can be any control. It renders no
 * element of its own, and ids the caller already put in `aria-describedby` are kept first.
 */
export const FieldControl = forwardRef<HTMLElement, FieldControlProps>(function FieldControl(
  { "aria-describedby": describedBy, ...props },
  ref,
) {
  const field = useFieldContext("FieldControl");
  const describedByIds = [
    describedBy,
    field.hasDescription ? field.descriptionId : undefined,
    field.invalid && field.hasError ? field.errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  // `disabled` is not part of Slot's props type, but every control that supports it receives it.
  const fieldProps = {
    id: field.controlId,
    "aria-describedby": describedByIds || undefined,
    "aria-invalid": field.invalid || undefined,
    "aria-required": field.required || undefined,
    ...(field.disabled ? { disabled: true } : {}),
  };

  return <Slot.Root ref={ref} {...fieldProps} {...props} />;
});

FieldControl.displayName = "FieldControl";

export type FieldDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

/** Help text, announced as the control's description. */
export const FieldDescription = forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  function FieldDescription({ className, ...props }, ref) {
    const field = useFieldContext("FieldDescription");
    useRegistration(field.setDescriptionCount, true);

    return (
      <p
        ref={ref}
        id={field.descriptionId}
        data-slot="field-description"
        className={cn("text-xs leading-5 text-gray-500", className)}
        {...props}
      />
    );
  },
);

FieldDescription.displayName = "FieldDescription";

export type FieldErrorProps = HTMLAttributes<HTMLParagraphElement>;

/** The validation message. Rendered only while the field is invalid and there is a message. */
export const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(function FieldError(
  { className, children, ...props },
  ref,
) {
  const field = useFieldContext("FieldError");
  const visible =
    field.invalid &&
    children !== undefined &&
    children !== null &&
    children !== false &&
    children !== "";
  useRegistration(field.setErrorCount, visible);

  if (!visible) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={field.errorId}
      role="alert"
      data-slot="field-error"
      className={cn(
        "flex items-start gap-1.5 text-xs leading-5 font-medium text-red-600",
        className,
      )}
      {...props}
    >
      {/* The icon makes the error recognisable without relying on colour alone. */}
      <CircleAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
});

FieldError.displayName = "FieldError";
