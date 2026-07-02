import { BackLink } from "@avero/react";

export default function BackLinkUsagesDemo() {
  return (
    <div className="flex flex-col items-start gap-6">
      <BackLink />
      <BackLink variant="soft" />
      <BackLink variant="subtle" href="#projects" label="بازگشت به لیست پروژه‌ها" />
    </div>
  );
}
