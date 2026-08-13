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
      <StatCard label="دوره‌ها" value="0" icon={<Briefcase className={small} />} tone="blue" />
      <StatCard label="جلسات" value="0" icon={<Eye className={small} />} tone="purple" />
      <StatCard label="تمرین فعال" value="0" icon={<Zap className={small} />} tone="amber" />
      <StatCard label="گواهی‌ها" value="0" icon={<Award className={small} />} tone="emerald" />
      <StatCard label="نشان‌ها" value="0" icon={<Trophy className={small} />} tone="rose" />
    </div>
  ),
};

export const ProfileStrip: Story = {
  render: () => (
    <StatStrip>
      <StatTile
        label="سابقه تدریس"
        value="3 سال"
        icon={<Briefcase className="size-5 sm:size-6" />}
      />
      <StatTile
        label="دوره‌های منتشرشده"
        value="4"
        icon={<Layers className="size-5 sm:size-6" />}
        tone="purple"
      />
      <StatTile
        label="شرکت‌کنندگان"
        value="120"
        icon={<CircleCheckBig className="size-5 sm:size-6" />}
        tone="emerald"
      />
      <StatTile
        label="بدون امتیاز"
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
      <HighlightPanel label="رتبه در جدول امتیازها" value="-" />
      <InfoRow
        label="گواهی‌ها"
        value="0 عدد"
        icon={<FileCheck className={small} />}
        tone="emerald"
      />
      <InfoRow label="نشان‌ها" value="0 عدد" icon={<Trophy className={small} />} tone="purple" />
      <InfoRow label="مهارت تأییدشده" value="0 عدد" icon={<Shield className={small} />} />
    </div>
  ),
};

export const ProviderMiniStats: Story = {
  render: () => (
    <div className="grid max-w-xs grid-cols-2 gap-3 rounded-3xl bg-white p-6">
      <MiniStat label="تعداد دوره‌ها" value="3" />
      <MiniStat
        label="امتیاز شرکت‌کنندگان"
        value="0.00"
        icon={<Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />}
      />
    </div>
  ),
};
