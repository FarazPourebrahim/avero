import {
  Carousel,
  CarouselDots,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "@avero/react";

const PROJECTS = [
  "توسعه دهنده php",
  "تبدیل قالب HTML به وردپرس",
  "همکاری دائمی با برنامه‌نویس فول‌استک وب",
  "طراح گرافیک",
];

export default function CarouselRelatedProjectsDemo() {
  return (
    <div className="w-full max-w-3xl">
      <Carousel aria-label="پروژه‌های مرتبط">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 md:text-2xl">پروژه‌های مرتبط</h3>
          <div className="flex items-center gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
        <CarouselViewport>
          {PROJECTS.map((title, index) => (
            <CarouselSlide key={title} aria-label={`${index + 1} از ${PROJECTS.length}`}>
              <div className="bg-surface-glass flex min-h-40 flex-col gap-5 rounded-xl border border-gray-200 p-5">
                <h4 className="text-primary text-base font-bold md:text-lg">{title}</h4>
                <p className="text-sm leading-7 text-gray-500">ظرفیت ارسال رزومه</p>
              </div>
            </CarouselSlide>
          ))}
        </CarouselViewport>
        <CarouselDots />
      </Carousel>
    </div>
  );
}
