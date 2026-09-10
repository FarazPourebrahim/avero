import { Button, FormActions } from "@avero/react";

export default function FormActionsAlignmentDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <FormActions hint="تغییرات بلافاصله ذخیره می‌شوند.">
        <Button type="submit" size="sm">
          ذخیره
        </Button>
      </FormActions>
      <FormActions align="end">
        <Button type="button" variant="ghost" size="sm">
          انصراف
        </Button>
        <Button type="submit" size="sm">
          ثبت دوره
        </Button>
      </FormActions>
    </div>
  );
}
