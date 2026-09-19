"use client";

import { Button, FormActions } from "@averoui/react";
import { useCopy } from "../copy";

export default function FormActionsAlignmentDemo() {
  const t = useCopy({
    fa: {
      hint: "تغییرات بلافاصله ذخیره می‌شوند.",
      save: "ذخیره",
      cancel: "انصراف",
      submit: "ثبت دوره",
    },
    en: {
      hint: "Changes are saved straight away.",
      save: "Save",
      cancel: "Cancel",
      submit: "Publish course",
    },
  });

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <FormActions hint={t.hint}>
        <Button type="submit" size="sm">
          {t.save}
        </Button>
      </FormActions>
      <FormActions align="end">
        <Button type="button" variant="ghost" size="sm">
          {t.cancel}
        </Button>
        <Button type="submit" size="sm">
          {t.submit}
        </Button>
      </FormActions>
    </div>
  );
}
