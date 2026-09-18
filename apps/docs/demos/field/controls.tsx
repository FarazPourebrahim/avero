import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  NativeSelect,
  Textarea,
} from "@averoui/react";

export default function FieldControlsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Field>
        <FieldLabel>درباره من</FieldLabel>
        <FieldControl>
          <Textarea rows={3} placeholder="در چند خط از تجربه‌تان بنویسید." />
        </FieldControl>
        <FieldDescription>در صفحه پروفایل شما دیده می‌شود.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>شهر</FieldLabel>
        <FieldControl>
          <NativeSelect defaultValue="tehran">
            <option value="tehran">تهران</option>
            <option value="shiraz">شیراز</option>
            <option value="tabriz">تبریز</option>
          </NativeSelect>
        </FieldControl>
      </Field>
    </div>
  );
}
