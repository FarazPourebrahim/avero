"use client";

import { Button, FormActions, Textarea } from "@averoui/react";
import { useCopy } from "../copy";

export default function FormActionsCommentFormDemo() {
  const t = useCopy({
    fa: {
      label: "دیدگاه",
      placeholder: "دیدگاه خود را درباره این مقاله بنویسید…",
      hint: "دیدگاه‌ها پس از بررسی منتشر می‌شوند.",
      submit: "ارسال دیدگاه",
    },
    en: {
      label: "Comment",
      placeholder: "Share what you thought of this article…",
      hint: "Comments appear once they have been reviewed.",
      submit: "Post comment",
    },
  });

  return (
    <form className="w-full max-w-xl">
      <div className="mb-3">
        <Textarea aria-label={t.label} placeholder={t.placeholder} />
      </div>
      <FormActions hint={t.hint}>
        <Button type="submit" size="sm">
          {t.submit}
        </Button>
      </FormActions>
    </form>
  );
}
