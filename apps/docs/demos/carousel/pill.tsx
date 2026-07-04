import { Carousel, CarouselDots, CarouselSlide, CarouselViewport } from "@avero/react";

const SLIDES = ["۱", "۲", "۳", "۴"];

export default function CarouselPillDemo() {
  return (
    <div className="w-full max-w-3xl">
      <Carousel aria-label="پروژه‌ها">
        <CarouselViewport>
          {SLIDES.map((label, index) => (
            <CarouselSlide key={label} aria-label={`${index + 1} از ${SLIDES.length}`}>
              <div className="flex h-32 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-gray-700">
                {label}
              </div>
            </CarouselSlide>
          ))}
        </CarouselViewport>
        <CarouselDots variant="pill" />
      </Carousel>
    </div>
  );
}
