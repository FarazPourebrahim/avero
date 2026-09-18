"use client";

import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
} from "@averoui/react";
import { useState } from "react";

export default function FieldProfileFormDemo() {
  const [username, setUsername] = useState("س");
  const invalid = username.length < 3;

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Field required invalid={invalid}>
        <FieldLabel>نام کاربری</FieldLabel>
        <FieldControl>
          <Input value={username} onChange={(event) => setUsername(event.target.value)} />
        </FieldControl>
        <FieldDescription>این نام در نشانی پروفایل شما دیده می‌شود.</FieldDescription>
        <FieldError>نام کاربری باید حداقل ۳ نویسه باشد.</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>ایمیل</FieldLabel>
        <FieldControl>
          <Input type="email" dir="ltr" defaultValue="sara@example.com" />
        </FieldControl>
        <FieldDescription>ایمیل پس از ثبت‌نام قابل تغییر نیست.</FieldDescription>
      </Field>
    </div>
  );
}
