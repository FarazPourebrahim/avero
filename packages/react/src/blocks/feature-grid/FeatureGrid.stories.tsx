import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeatureCard } from "../../components/feature-card/index.js";
import { FeatureGrid } from "./FeatureGrid.js";

const meta: Meta<typeof FeatureGrid> = {
  title: "Blocks/FeatureGrid",
  component: FeatureGrid,
};

export default meta;
type Story = StoryObj<typeof FeatureGrid>;

const CARDS = [
  {
    title: "سیستم پرداخت امن و تضمین‌شده",
    description: "پرداخت مرحله‌ای و امانی.",
    tone: "emerald",
  },
  {
    title: "دسترسی به برترین استعدادها",
    description: "هزاران متخصص و فریلنسر ماهر.",
    tone: "blue",
  },
  {
    title: "سنجش مهارت و گواهینامه معتبر",
    description: "آزمون‌های تخصصی برای اعتبارسنجی.",
    tone: "purple",
  },
  {
    title: "سرعت، سهولت و پشتیبانی فعال",
    description: "رابط کاربری ساده و تیم پشتیبانی.",
    tone: "amber",
  },
] as const;

export const WhyUs: Story = {
  render: () => (
    <FeatureGrid title="چرا دورلنسر انتخابی متفاوت است؟">
      {CARDS.map((card) => (
        <FeatureCard key={card.title} {...card} />
      ))}
    </FeatureGrid>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <FeatureGrid columns={3}>
      {CARDS.slice(0, 3).map((card) => (
        <FeatureCard key={card.title} {...card} />
      ))}
    </FeatureGrid>
  ),
};
