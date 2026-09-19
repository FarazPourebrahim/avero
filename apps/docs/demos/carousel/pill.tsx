import { Carousel, CarouselDots, CarouselSlide, CarouselViewport } from "@averoui/react";

const SLIDE_COUNT = 4;

export default function CarouselPillDemo() {
  return (
    <div className="w-full max-w-3xl">
      <Carousel aria-label="دوره‌ها">
        <CarouselViewport>
          {Array.from({ length: SLIDE_COUNT }, (_, index) => (
            <CarouselSlide key={index} aria-label={`${index + 1} از ${SLIDE_COUNT}`}>
              <div className="flex h-32 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-gray-700">
                {index + 1}
              </div>
            </CarouselSlide>
          ))}
        </CarouselViewport>
        <CarouselDots variant="pill" />
      </Carousel>
    </div>
  );
}
