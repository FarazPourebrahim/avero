import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Award,
  Briefcase,
  CircleCheckBig,
  Eye,
  FileCheck,
  Layers,
  Shield,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { HighlightPanel, InfoRow, MiniStat, StatCard, StatStrip, StatTile } from "./Stat.js";

const meta: Meta = {
  title: "Data display/Stats",
  component: StatCard,
};

export default meta;
type Story = StoryObj;

const small = "size-4 sm:size-[18px]";

export const DashboardCounters: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
      <StatCard label="خدمات" value="0" icon={<Briefcase className={small} />} tone="blue" />
      <StatCard label="نمونه‌کار" value="0" icon={<Eye className={small} />} tone="purple" />
      <StatCard label="استوری فعال" value="0" icon={<Zap className={small} />} tone="amber" />
      <StatCard label="گواهینامه" value="0" icon={<Award className={small} />} tone="emerald" />
      <StatCard label="نشان‌ها" value="0" icon={<Trophy className={small} />} tone="rose" />
    </div>
  ),
};

export const ProfileStrip: Story = {
  render: () => (
    <StatStrip>
      <StatTile
        label="مدت تجربه کاری"
        value="3 سال"
        icon={<Briefcase className="size-5 sm:size-6" />}
      />
      <StatTile
        label="تعداد نمونه‌کار"
        value="4"
        icon={<Layers className="size-5 sm:size-6" />}
        tone="purple"
      />
      <StatTile
        label="تعداد خدمات"
        value="1"
        icon={<CircleCheckBig className="size-5 sm:size-6" />}
        tone="emerald"
      />
      <StatTile
        label="بدون میانگین"
        value="—"
        icon={<Star className="size-5 text-slate-300 sm:size-6" />}
        tone="amber"
      />
    </StatStrip>
  ),
};

export const Achievements: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-2.5 rounded-2xl border border-gray-100 bg-white p-5 sm:gap-3">
      <HighlightPanel label="رتبه در دورلنسر" value="-" />
      <InfoRow
        label="گواهینامه‌ها"
        value="0 عدد"
        icon={<FileCheck className={small} />}
        tone="emerald"
      />
      <InfoRow label="نشان‌ها" value="0 عدد" icon={<Trophy className={small} />} tone="purple" />
      <InfoRow label="مهارت تأیید شده" value="0 عدد" icon={<Shield className={small} />} />
    </div>
  ),
};

export const ProviderMiniStats: Story = {
  render: () => (
    <div className="grid max-w-xs grid-cols-2 gap-3 rounded-3xl bg-white p-6">
      <MiniStat label="تعداد خدمات" value="1" />
      <MiniStat
        label="امتیاز رضایت"
        value="0.00"
        icon={<Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />}
      />
    </div>
  ),
};
