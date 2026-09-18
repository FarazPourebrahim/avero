import { Button, Spinner } from "@avero/react";

export default function SpinnerInContext() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button loading>در حال ارسال</Button>
      <p
        role="status"
        className="flex items-center gap-2 text-sm text-gray-600"
        aria-label="در حال بارگذاری نظرات"
      >
        <Spinner size="sm" />
        در حال بارگذاری نظرات…
      </p>
    </div>
  );
}
