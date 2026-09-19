"use client";

import { Field, FieldControl, FieldDescription, FieldLabel, TagInput } from "@averoui/react";
import { useCopy } from "../copy";

export default function TagInputSkillsDemo() {
  const t = useCopy({
    fa: {
      label: "مهارت‌ها",
      placeholder: "مهارت را بنویسید",
      description: "با Enter یا ویرگول جدا کنید؛ حداکثر ۸ مهارت.",
      tags: ["طراحی رابط کاربری", "Figma"],
    },
    en: {
      label: "Skills",
      placeholder: "Type a skill",
      description: "Separate with Enter or a comma; up to 8 skills.",
      tags: ["UI design", "Figma"],
    },
  });

  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldLabel>{t.label}</FieldLabel>
        <FieldControl>
          <TagInput
            key={t.label}
            name="skills"
            maxTags={8}
            defaultValue={t.tags}
            placeholder={t.placeholder}
          />
        </FieldControl>
        <FieldDescription>{t.description}</FieldDescription>
      </Field>
    </div>
  );
}
