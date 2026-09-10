import { Textarea } from "@avero/react";

export default function TextareaResizeDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Textarea rows={2} aria-label="یادداشت کوتاه" placeholder="ارتفاع ثابت است." />
      <Textarea
        resize="vertical"
        rows={3}
        aria-label="توضیح دوره"
        placeholder="گوشه پایین را بکشید تا بلندتر شود."
      />
    </div>
  );
}
