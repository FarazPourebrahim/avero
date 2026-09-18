import { BackLink } from "@averoui/react";

export default function BackLinkUsagesDemo() {
  return (
    <div className="flex flex-col items-start gap-6">
      <BackLink />
      <BackLink variant="soft" />
      <BackLink variant="subtle" href="#courses" label="بازگشت به فهرست دوره‌ها" />
    </div>
  );
}
