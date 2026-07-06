import { Eyebrow, GlowOrbs, Heading } from "@avero/react";

export default function DarkBannerDemo() {
  return (
    <div className="gradient-night relative w-full overflow-hidden rounded-3xl p-8 text-white shadow-xl md:p-12">
      <GlowOrbs />
      <div className="relative z-10 flex max-w-3xl flex-col gap-y-4">
        <Eyebrow tone="onDark">مأموریت و چشم‌انداز</Eyebrow>
        <Heading size="section" as="h3" className="text-white">
          ساختن آینده‌ای که در آن تخصص و تلاش حد و مرزی ندارد
        </Heading>
        <p className="text-sm leading-8 text-slate-300 md:text-base">
          هدف ما تنها مدیریت چند پروژه نیست؛ ما در پی ایجاد اکوسیستمی پایدار و ارزش‌آفرین هستیم.
        </p>
      </div>
    </div>
  );
}
