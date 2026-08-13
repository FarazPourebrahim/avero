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
    title: "پرداخت امن و بدون دغدغه",
    description: "بازگشت وجه تا هفت روز پس از ثبت‌نام.",
    tone: "emerald",
  },
  {
    title: "مدرس‌های باتجربه",
    description: "متخصصانی با سال‌ها تجربه در همان حوزه.",
    tone: "blue",
  },
  {
    title: "گواهی پایان دوره",
    description: "پس از گذراندن پروژه پایانی.",
    tone: "purple",
  },
  {
    title: "پشتیبانی همیشگی",
    description: "انجمن پرسش و پاسخ برای هر دوره.",
    tone: "amber",
  },
] as const;

export const WhyUs: Story = {
  render: () => (
    <FeatureGrid title="چرا دوره‌های ما متفاوت‌اند؟">
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
