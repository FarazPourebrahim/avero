"use client";

import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@averoui/react";

export default function SelectStatesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Field invalid required>
        <FieldLabel>سطح دوره</FieldLabel>
        <Select>
          <FieldControl>
            <SelectTrigger>
              <SelectValue placeholder="یک سطح را انتخاب کنید" />
            </SelectTrigger>
          </FieldControl>
          <SelectContent>
            <SelectItem value="beginner">مقدماتی</SelectItem>
            <SelectItem value="advanced">پیشرفته</SelectItem>
          </SelectContent>
        </Select>
        <FieldError>انتخاب سطح دوره الزامی است.</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>ترم</FieldLabel>
        <Select defaultValue="autumn">
          <FieldControl>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
          </FieldControl>
          <SelectContent>
            <SelectItem value="autumn">پاییز ۱۴۰۵</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
