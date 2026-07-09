import { Button, FormActions, Textarea } from "@avero/react";

export default function FormActionsCommentFormDemo() {
  return (
    <form className="w-full max-w-xl">
      <div className="mb-3">
        <Textarea aria-label="نظر" placeholder="نظر خود را درباره این مقاله بنویسید..." />
      </div>
      <FormActions hint="نظرات پس از بررسی و تایید مدیر منتشر خواهند شد.">
        <Button type="submit" size="sm">
          ثبت نظر
        </Button>
      </FormActions>
    </form>
  );
}
