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
import { useCopy } from "../copy";

export default function SelectStatesDemo() {
  const t = useCopy({
    fa: {
      level: "سطح دوره",
      levelPlaceholder: "یک سطح را انتخاب کنید",
      beginner: "مقدماتی",
      advanced: "پیشرفته",
      levelError: "انتخاب سطح دوره الزامی است.",
      term: "ترم",
      autumn: "پاییز ۱۴۰۵",
    },
    en: {
      level: "Course level",
      levelPlaceholder: "Choose a level",
      beginner: "Beginner",
      advanced: "Advanced",
      levelError: "Choosing a level is required.",
      term: "Term",
      autumn: "Autumn 2026",
    },
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Field invalid required>
        <FieldLabel>{t.level}</FieldLabel>
        <Select>
          <FieldControl>
            <SelectTrigger>
              <SelectValue placeholder={t.levelPlaceholder} />
            </SelectTrigger>
          </FieldControl>
          <SelectContent>
            <SelectItem value="beginner">{t.beginner}</SelectItem>
            <SelectItem value="advanced">{t.advanced}</SelectItem>
          </SelectContent>
        </Select>
        <FieldError>{t.levelError}</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>{t.term}</FieldLabel>
        <Select defaultValue="autumn">
          <FieldControl>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
          </FieldControl>
          <SelectContent>
            <SelectItem value="autumn">{t.autumn}</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
