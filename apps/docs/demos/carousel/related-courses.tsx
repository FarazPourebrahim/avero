import {
  Carousel,
  CarouselDots,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "@averoui/react";

const COURSES = [
  "مبانی طراحی رابط کاربری",
  "تحلیل داده با Python",
  "کارگاه آزمون کاربردپذیری",
  "اصول تایپوگرافی فارسی",
];

export default function CarouselRelatedCoursesDemo() {
  return (
    <div className="w-full max-w-3xl">
      <Carousel aria-label="دوره‌های مرتبط">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 md:text-2xl">دوره‌های مرتبط</h3>
          <div className="flex items-center gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
        <CarouselViewport>
          {COURSES.map((title, index) => (
            <CarouselSlide key={title} aria-label={`${index + 1} از ${COURSES.length}`}>
              <div className="bg-surface-glass flex min-h-40 flex-col gap-5 rounded-xl border border-gray-200 p-5">
                <h4 className="text-primary text-base font-bold md:text-lg">{title}</h4>
                <p className="text-sm leading-7 text-gray-500">ظرفیت ثبت‌نام</p>
              </div>
            </CarouselSlide>
          ))}
        </CarouselViewport>
        <CarouselDots />
      </Carousel>
    </div>
  );
}
