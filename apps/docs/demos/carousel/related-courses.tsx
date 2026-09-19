"use client";

import {
  Carousel,
  CarouselDots,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "@averoui/react";
import { useCopy } from "../copy";

export default function CarouselRelatedCoursesDemo() {
  const t = useCopy({
    fa: {
      heading: "دوره‌های مرتبط",
      capacity: "ظرفیت ثبت‌نام",
      slideLabel: (index: number, total: number) => `${index} از ${total}`,
      courses: [
        "مبانی طراحی رابط کاربری",
        "تحلیل داده با Python",
        "کارگاه آزمون کاربردپذیری",
        "اصول تایپوگرافی فارسی",
      ],
    },
    en: {
      heading: "Related courses",
      capacity: "Places available",
      slideLabel: (index: number, total: number) => `${index} of ${total}`,
      courses: [
        "UI design foundations",
        "Data analysis with Python",
        "Usability testing workshop",
        "Persian typography basics",
      ],
    },
  });

  return (
    <div className="w-full max-w-3xl">
      <Carousel aria-label={t.heading}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 md:text-2xl">{t.heading}</h3>
          <div className="flex items-center gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
        <CarouselViewport>
          {t.courses.map((title, index) => (
            <CarouselSlide key={title} aria-label={t.slideLabel(index + 1, t.courses.length)}>
              <div className="bg-surface-glass flex min-h-40 flex-col gap-5 rounded-xl border border-gray-200 p-5">
                <h4 className="text-primary text-base font-bold md:text-lg">{title}</h4>
                <p className="text-sm leading-7 text-gray-500">{t.capacity}</p>
              </div>
            </CarouselSlide>
          ))}
        </CarouselViewport>
        <CarouselDots />
      </Carousel>
    </div>
  );
}
