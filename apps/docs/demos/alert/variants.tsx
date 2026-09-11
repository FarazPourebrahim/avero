import { Alert } from "@avero/react";

export default function AlertVariantsDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Alert tone="warning" title="ظرفیت رو به اتمام">
        پنج جای خالی باقی مانده است.
      </Alert>
      <Alert variant="bordered" tone="warning" title="ظرفیت رو به اتمام">
        همان پیام، در نوار کناره‌دار روی سطح سفید.
      </Alert>
    </div>
  );
}
