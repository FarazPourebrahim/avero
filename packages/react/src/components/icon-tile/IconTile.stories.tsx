import type { Meta, StoryObj } from "@storybook/react-vite";
import { Award, Briefcase, Eye, Layers, ShieldCheck, TrendingUp, Trophy, Zap } from "lucide-react";
import { IconTile } from "./IconTile.js";

const TONES = ["blue", "purple", "amber", "emerald", "rose", "indigo", "slate", "primary"] as const;

const meta = {
  title: "Primitives/IconTile",
  component: IconTile,
  args: { children: <Briefcase className="size-4 sm:size-[18px]" /> },
  argTypes: {
    variant: { control: "inline-radio", options: ["soft", "muted", "tint", "gradient"] },
    tone: { control: "select", options: TONES },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "padded"] },
  },
} satisfies Meta<typeof IconTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["soft", "muted", "tint", "gradient"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <span className="w-16 text-xs text-gray-500">{variant}</span>
          {TONES.map((tone) => (
            <IconTile key={tone} variant={variant} tone={tone} size="lg">
              <Zap className="size-4 sm:size-5" />
            </IconTile>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const ReferenceUsages: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 rounded-3xl bg-white p-6">
      <IconTile tone="blue">
        <Briefcase className="size-4 sm:size-[18px]" />
      </IconTile>
      <IconTile tone="purple">
        <Eye className="size-4 sm:size-[18px]" />
      </IconTile>
      <IconTile variant="muted" tone="emerald" size="md">
        <Award className="size-4 sm:size-[18px]" />
      </IconTile>
      <IconTile variant="tint" tone="blue" size="xl">
        <Briefcase className="size-5 sm:size-6" />
      </IconTile>
      <IconTile variant="tint" tone="purple" size="xl">
        <Layers className="size-5 sm:size-6" />
      </IconTile>
      <IconTile variant="gradient" tone="rose" size="lg">
        <TrendingUp className="size-4 sm:size-5" />
      </IconTile>
      <IconTile variant="soft" tone="emerald" size="padded">
        <ShieldCheck className="size-6 text-emerald-500" />
      </IconTile>
      <IconTile variant="muted" tone="purple" size="md">
        <Trophy className="size-4 sm:size-[18px]" />
      </IconTile>
    </div>
  ),
};
