import { Checkbox, Field, FieldControl, FieldError, FieldLabel } from "@averoui/react";

const STATES = [
  { id: "state-on", label: "انتخاب‌شده", checked: true as const },
  { id: "state-mixed", label: "بخشی انتخاب‌شده", checked: "indeterminate" as const },
  { id: "state-off", label: "انتخاب‌نشده", checked: false as const },
  { id: "state-disabled", label: "غیرفعال", checked: true as const, disabled: true },
];

export default function CheckboxStatesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <div className="flex flex-col gap-3">
        {STATES.map(({ id, label, ...props }) => (
          <div key={id} className="flex items-center gap-2">
            <Checkbox id={id} {...props} />
            <label htmlFor={id} className="text-sm text-gray-700">
              {label}
            </label>
          </div>
        ))}
      </div>
      <Field invalid required>
        <div className="flex items-center gap-2">
          <FieldControl>
            <Checkbox />
          </FieldControl>
          <FieldLabel>قوانین را می‌پذیرم</FieldLabel>
        </div>
        <FieldError>برای ادامه باید قوانین را بپذیرید.</FieldError>
      </Field>
    </div>
  );
}
