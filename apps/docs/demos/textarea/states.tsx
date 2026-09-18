import { Textarea } from "@averoui/react";

export default function TextareaStatesDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Textarea aria-label="دیدگاه نامعتبر" aria-invalid defaultValue="کوتاه" />
      <Textarea
        aria-label="دیدگاه بسته"
        disabled
        defaultValue="دیدگاه‌ها برای این مقاله بسته است."
      />
    </div>
  );
}
