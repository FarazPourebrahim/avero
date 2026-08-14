import { Eyebrow, GlowOrbs, Heading } from "@avero/react";

export default function DarkBannerDemo() {
  return (
    <div className="gradient-night relative w-full overflow-hidden rounded-3xl p-8 text-white shadow-xl md:p-12">
      <GlowOrbs />
      <div className="relative z-10 flex max-w-3xl flex-col gap-y-4">
        <Eyebrow tone="onDark">مأموریت ما</Eyebrow>
        <Heading size="section" as="h3" className="text-white">
          یادگیری بدون مرز، برای همه
        </Heading>
        <p className="text-sm leading-8 text-slate-300 md:text-base">
          هدف ما فقط برگزاری چند دوره نیست؛ می‌خواهیم هر کسی بتواند با سرعت خودش مهارتی تازه
          بیاموزد.
        </p>
      </div>
    </div>
  );
}
