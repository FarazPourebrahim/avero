import { Field, FieldControl, FieldDescription, FieldLabel, PriceInput } from "@averoui/react";

export default function PriceInputVariantsDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Field>
        <FieldLabel>قیمت دوره</FieldLabel>
        <FieldControl>
          <PriceInput variant="soft" defaultValue={1_200_000} />
        </FieldControl>
        <FieldDescription>واحد از فرهنگ واژگان می‌آید.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>تعداد جلسه</FieldLabel>
        <FieldControl>
          <PriceInput variant="slate" currency={null} defaultValue={12} max={60} />
        </FieldControl>
        <FieldDescription>برای حذف واحد، `currency` را خالی بگذارید.</FieldDescription>
      </Field>
    </div>
  );
}
