import type { Meta, StoryObj } from "@storybook/react-vite";
import { Layers, MessageSquare, Target } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "./Card.js";

const meta = {
  title: "Data display/Card",
  component: Card,
  args: { children: "محتوای کارت" },
  argTypes: {
    variant: { control: "inline-radio", options: ["surface", "flat", "glass", "muted"] },
    elevation: {
      control: "select",
      options: ["none", "xs", "sm", "soft", "ambient", "faint", "brand"],
    },
    padding: { control: "inline-radio", options: ["none", "sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Surfaces: Story = {
  render: () => (
    <div className="bg-background grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
      <Card elevation="xs">
        <CardHeader className="mb-4">
          <CardTitle size="lg">
            <MessageSquare />
            دیدگاه‌ها (0)
          </CardTitle>
        </CardHeader>
        <p className="text-xs text-slate-400">هنوز دیدگاهی ثبت نشده است.</p>
      </Card>
      <Card variant="flat" padding="sm">
        <CardHeader className="mb-3 sm:mb-4">
          <CardTitle size="sm">
            <Target className="size-4" />
            دوره‌های پیشنهادی
          </CardTitle>
          <span className="text-2xs text-gray-400 sm:text-xs">5 دوره</span>
        </CardHeader>
        <p className="text-xs text-gray-500">مبانی طراحی تجربه کاربری</p>
      </Card>
      <Card elevation="sm" padding="lg">
        <CardTitle className="mb-4">
          <Layers className="text-blue-600" />
          تخصص‌ها و مهارت‌ها
        </CardTitle>
        <p className="text-sm text-slate-600">React · طراحی تعاملی</p>
      </Card>
      <Card variant="glass" padding="none" className="p-3">
        <div className="h-32 rounded-lg bg-gray-100" />
        <CardFooter className="mt-4">
          <span className="text-sm-plus">از ۴٬۵۰۰٬۰۰۰ تومان</span>
          <span className="text-xs text-gray-500">0 پسند</span>
        </CardFooter>
      </Card>
    </div>
  ),
};
