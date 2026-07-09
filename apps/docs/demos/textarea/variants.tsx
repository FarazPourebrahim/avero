import { Textarea } from "@avero/react";

export default function TextareaVariantsDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Textarea aria-label="نظر مقاله" placeholder="نظر خود را درباره این مقاله بنویسید..." />
      <Textarea
        variant="slate"
        rows={3}
        aria-label="نظر خدمت"
        placeholder="نظر خود را درباره این خدمت بنویسید..."
      />
    </div>
  );
}
