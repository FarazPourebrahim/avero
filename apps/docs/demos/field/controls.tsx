"use client";

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
import { useCopy } from "../copy";

export default function FieldControlsDemo() {
  const t = useCopy({
    fa: {
      about: "درباره من",
      aboutPlaceholder: "در چند خط از تجربه‌تان بنویسید.",
      aboutHint: "در صفحه پروفایل شما دیده می‌شود.",
      city: "شهر",
      tehran: "تهران",
      shiraz: "شیراز",
      tabriz: "تبریز",
    },
    en: {
      about: "About me",
      aboutPlaceholder: "Write a few lines about your experience.",
      aboutHint: "This appears on your profile page.",
      city: "City",
      tehran: "Tehran",
      shiraz: "Shiraz",
      tabriz: "Tabriz",
    },
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Field>
        <FieldLabel>{t.about}</FieldLabel>
        <FieldControl>
          <Textarea rows={3} placeholder={t.aboutPlaceholder} />
        </FieldControl>
        <FieldDescription>{t.aboutHint}</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>{t.city}</FieldLabel>
        <Select defaultValue="tehran">
          <FieldControl>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
          </FieldControl>
          <SelectContent>
            <SelectItem value="tehran">{t.tehran}</SelectItem>
            <SelectItem value="shiraz">{t.shiraz}</SelectItem>
            <SelectItem value="tabriz">{t.tabriz}</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
