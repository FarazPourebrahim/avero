import { Textarea } from "@averoui/react";

export default function TextareaPrimaryDemo() {
  return (
    <div className="w-full max-w-xl">
      <Textarea
        rows={3}
        aria-label="دیدگاه مقاله"
        placeholder="دیدگاه خود را درباره این مقاله بنویسید…"
      />
    </div>
  );
}
