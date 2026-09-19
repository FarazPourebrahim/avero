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
import { useCopy } from "../copy";

export default function FieldProfileFormDemo() {
  const [username, setUsername] = useState("s");
  const invalid = username.length < 3;
  const t = useCopy({
    fa: {
      username: "نام کاربری",
      usernameHint: "این نام در نشانی پروفایل شما دیده می‌شود.",
      usernameError: "نام کاربری باید حداقل ۳ نویسه باشد.",
      email: "ایمیل",
      emailHint: "ایمیل پس از ثبت‌نام قابل تغییر نیست.",
    },
    en: {
      username: "Username",
      usernameHint: "This name appears in your profile address.",
      usernameError: "A username needs at least 3 characters.",
      email: "Email",
      emailHint: "Email cannot be changed after signing up.",
    },
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Field required invalid={invalid}>
        <FieldLabel>{t.username}</FieldLabel>
        <FieldControl>
          <Input value={username} onChange={(event) => setUsername(event.target.value)} />
        </FieldControl>
        <FieldDescription>{t.usernameHint}</FieldDescription>
        <FieldError>{t.usernameError}</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>{t.email}</FieldLabel>
        <FieldControl>
          <Input type="email" dir="ltr" defaultValue="sara@example.com" />
        </FieldControl>
        <FieldDescription>{t.emailHint}</FieldDescription>
      </Field>
    </div>
  );
}
