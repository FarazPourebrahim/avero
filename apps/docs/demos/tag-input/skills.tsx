"use client";

import { Field, FieldControl, FieldDescription, FieldLabel, TagInput } from "@avero/react";

export default function TagInputSkillsDemo() {
  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldLabel>مهارت‌ها</FieldLabel>
        <FieldControl>
          <TagInput
            name="skills"
            maxTags={8}
            defaultValue={["طراحی رابط کاربری", "Figma"]}
            placeholder="مهارت را بنویسید"
          />
        </FieldControl>
        <FieldDescription>با Enter یا ویرگول جدا کنید؛ حداکثر ۸ مهارت.</FieldDescription>
      </Field>
    </div>
  );
}
