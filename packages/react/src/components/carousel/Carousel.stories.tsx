import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Carousel,
  CarouselDots,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "./Carousel.js";

const PROJECTS = [
  "توسعه دهنده php",
  "تبدیل قالب HTML به وردپرس",
  "همکاری دائمی با برنامه‌نویس فول‌استک وب",
  "طراح گرافیک",
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
      {PROJECTS.map((title, index) => (
        <CarouselSlide key={title} aria-label={`${index + 1} از ${PROJECTS.length}`}>
          <div className="bg-surface-glass flex min-h-40 flex-col gap-5 rounded-xl border border-gray-200 p-5">
            <h3 className="text-primary text-base font-bold md:text-lg">{title}</h3>
            <p className="text-sm leading-7 text-gray-500">ظرفیت ارسال رزومه</p>
          </div>
        </CarouselSlide>
      ))}
    </CarouselViewport>
  );
}

export const RelatedProjects: Story = {
  render: () => (
    <Carousel aria-label="پروژه‌های مرتبط">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">پروژه‌های مرتبط</h2>
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
    <Carousel aria-label="پروژه‌ها">
      <Slides />
      <CarouselDots variant="pill" />
    </Carousel>
  ),
};
