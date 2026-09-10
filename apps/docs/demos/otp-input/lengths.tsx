import { Field, FieldControl, FieldDescription, FieldLabel, OtpInput } from "@avero/react";

export default function OtpInputLengthsDemo() {
  return (
    <div className="flex flex-col items-center gap-5">
      <Field>
        <FieldLabel>کد چهار رقمی</FieldLabel>
        <FieldControl>
          <OtpInput length={4} defaultValue="۱۲" />
        </FieldControl>
        <FieldDescription>طول کد را با `length` تعیین کنید.</FieldDescription>
      </Field>
      <Field disabled>
        <FieldLabel>کد تأییدشده</FieldLabel>
        <FieldControl>
          <OtpInput length={4} defaultValue="۴۸۱۹" />
        </FieldControl>
      </Field>
    </div>
  );
}
