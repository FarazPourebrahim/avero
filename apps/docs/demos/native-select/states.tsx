import { Field, FieldControl, FieldError, FieldLabel, NativeSelect } from "@avero/react";

export default function NativeSelectStatesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Field invalid required>
        <FieldLabel>سطح دوره</FieldLabel>
        <FieldControl>
          <NativeSelect defaultValue="">
            <option value="" disabled>
              یک سطح را انتخاب کنید
            </option>
            <option value="beginner">مقدماتی</option>
            <option value="advanced">پیشرفته</option>
          </NativeSelect>
        </FieldControl>
        <FieldError>انتخاب سطح دوره الزامی است.</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>زبان دوره</FieldLabel>
        <FieldControl>
          <NativeSelect defaultValue="fa">
            <option value="fa">فارسی</option>
          </NativeSelect>
        </FieldControl>
      </Field>
    </div>
  );
}
