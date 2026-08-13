import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Carousel,
  CarouselDots,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "./Carousel.js";

const COURSES = [
  "مبانی طراحی رابط کاربری",
  "TypeScript برای توسعه‌دهندگان React",
  "تحلیل داده با Python",
  "مدیریت محصول دیجیتال",
];

const meta: Meta = {
  title: "Navigation/Carousel",
  component: Carousel,
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

function Slides() {
  return (
    <CarouselViewport>
      {COURSES.map((title, index) => (
        <CarouselSlide key={title} aria-label={`${index + 1} از ${COURSES.length}`}>
          <div className="bg-surface-glass flex min-h-40 flex-col gap-5 rounded-xl border border-gray-200 p-5">
            <h3 className="text-primary text-base font-bold md:text-lg">{title}</h3>
            <p className="text-sm leading-7 text-gray-500">ظرفیت ثبت‌نام</p>
          </div>
        </CarouselSlide>
      ))}
    </CarouselViewport>
  );
}

export const RelatedCourses: Story = {
  render: () => (
    <Carousel aria-label="دوره‌های مرتبط">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">دوره‌های مرتبط</h2>
        <div className="flex items-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <Slides />
      <CarouselDots />
    </Carousel>
  ),
};

export const PillPagination: Story = {
  render: () => (
    <Carousel aria-label="دوره‌ها">
      <Slides />
      <CarouselDots variant="pill" />
    </Carousel>
  ),
};
