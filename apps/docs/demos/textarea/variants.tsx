import { Textarea } from "@avero/react";

export default function TextareaVariantsDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Textarea aria-label="دیدگاه مقاله" placeholder="دیدگاه خود را درباره این مقاله بنویسید…" />
      <Textarea
        variant="slate"
        rows={3}
        aria-label="دیدگاه دوره"
        placeholder="دیدگاه خود را درباره این دوره بنویسید…"
      />
    </div>
  );
}
