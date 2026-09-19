"use client";

import { Field, FieldControl, FieldError, FieldLabel, TagInput } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function TagInputStatesDemo() {
  const [topics, setTopics] = useState<string[]>([]);
  const t = useCopy({
    fa: {
      topics: "موضوع‌های دوره",
      placeholder: "موضوع را بنویسید",
      error: "دست‌کم یک موضوع اضافه کنید.",
      approved: "برچسب‌های تأییدشده",
      tags: ["طراحی", "Figma"],
    },
    en: {
      topics: "Course topics",
      placeholder: "Type a topic",
      error: "Add at least one topic.",
      approved: "Approved tags",
      tags: ["Design", "Figma"],
    },
  });

  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <Field invalid={topics.length === 0} required>
        <FieldLabel>{t.topics}</FieldLabel>
        <FieldControl>
          <TagInput value={topics} onValueChange={setTopics} placeholder={t.placeholder} />
        </FieldControl>
        <FieldError>{t.error}</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>{t.approved}</FieldLabel>
        <FieldControl>
          <TagInput key={t.approved} defaultValue={t.tags} />
        </FieldControl>
      </Field>
    </div>
  );
}
