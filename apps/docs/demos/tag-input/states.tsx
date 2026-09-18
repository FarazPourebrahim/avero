"use client";

import { Field, FieldControl, FieldError, FieldLabel, TagInput } from "@averoui/react";
import { useState } from "react";

export default function TagInputStatesDemo() {
  const [topics, setTopics] = useState<string[]>([]);

  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <Field invalid={topics.length === 0} required>
        <FieldLabel>موضوع‌های دوره</FieldLabel>
        <FieldControl>
          <TagInput value={topics} onValueChange={setTopics} placeholder="موضوع را بنویسید" />
        </FieldControl>
        <FieldError>دست‌کم یک موضوع اضافه کنید.</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>برچسب‌های تأییدشده</FieldLabel>
        <FieldControl>
          <TagInput defaultValue={["طراحی", "Figma"]} />
        </FieldControl>
      </Field>
    </div>
  );
}
