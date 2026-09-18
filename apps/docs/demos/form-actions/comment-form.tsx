import { Button, FormActions, Textarea } from "@averoui/react";

export default function FormActionsCommentFormDemo() {
  return (
    <form className="w-full max-w-xl">
      <div className="mb-3">
        <Textarea aria-label="دیدگاه" placeholder="دیدگاه خود را درباره این مقاله بنویسید…" />
      </div>
      <FormActions hint="دیدگاه‌ها پس از بررسی منتشر می‌شوند.">
        <Button type="submit" size="sm">
          ارسال دیدگاه
        </Button>
      </FormActions>
    </form>
  );
}
