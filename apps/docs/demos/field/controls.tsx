import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
        <Select defaultValue="tehran">
          <FieldControl>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
          </FieldControl>
          <SelectContent>
            <SelectItem value="tehran">تهران</SelectItem>
            <SelectItem value="shiraz">شیراز</SelectItem>
            <SelectItem value="tabriz">تبریز</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
