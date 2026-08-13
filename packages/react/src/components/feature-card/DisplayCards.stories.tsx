import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Award,
  Briefcase,
  Eye,
  Shield,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { ActionTile } from "../action-tile/ActionTile.js";
import { GlowOrbs } from "../glow-orbs/GlowOrbs.js";
import { SectionHeader } from "../section-header/SectionHeader.js";
import { FeatureCard } from "./FeatureCard.js";

const meta: Meta = {
  title: "Data display/Feature and action cards",
  component: FeatureCard,
};

export default meta;
type Story = StoryObj;

export const FeatureGrid: Story = {
  render: () => (
    <div className="flex flex-col gap-y-6">
      <SectionHeader variant="icon" as="h3" title="چرا دوره‌های ما متفاوت‌اند؟" icon={<Target />} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          tone="emerald"
          icon={<ShieldCheck className="text-emerald-500" />}
          title="پرداخت امن و بدون دغدغه"
          description="پرداخت آنلاین امن، با امکان بازگشت وجه تا هفت روز پس از ثبت‌نام."
        />
        <FeatureCard
          tone="blue"
          icon={<Users className="text-blue-500" />}
          title="مدرس‌های باتجربه"
          description="هر دوره را متخصصی تدریس می‌کند که سال‌ها در همان حوزه کار کرده است."
        />
        <FeatureCard
          tone="purple"
          icon={<Award className="text-purple-500" />}
          title="گواهی پایان دوره"
          description="پس از گذراندن تمرین‌ها و پروژه پایانی، گواهی دریافت می‌کنید."
        />
        <FeatureCard
          tone="amber"
          icon={<Zap className="text-amber-500" />}
          title="پشتیبانی همیشگی"
          description="پرسش‌های خود را هر زمان در انجمن دوره مطرح کنید."
        />
      </div>
    </div>
  ),
};

const actionIcon = "size-4 sm:size-5";

export const QuickActions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
      <ActionTile tone="blue" icon={<Briefcase className={actionIcon} />}>
        افزودن دوره
      </ActionTile>
      <ActionTile tone="purple" icon={<Eye className={actionIcon} />}>
        افزودن جلسه
      </ActionTile>
      <ActionTile tone="amber" icon={<Zap className={actionIcon} />}>
        ساخت تمرین
      </ActionTile>
      <ActionTile tone="emerald" icon={<Award className={actionIcon} />}>
        شروع آزمون
      </ActionTile>
      <ActionTile tone="rose" icon={<TrendingUp className={actionIcon} />}>
        ارتقای اشتراک
      </ActionTile>
      <ActionTile tone="slate" icon={<Shield className={actionIcon} />}>
        ویرایش پروفایل
      </ActionTile>
    </div>
  ),
};

export const SectionHeaders: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-8 rounded-3xl bg-white p-6">
      <SectionHeader
        variant="accentBar"
        as="h3"
        title="درباره ما"
        subtitle="داستان ساختن جایی برای یادگیری ساده و لذت‌بخش ✨"
      />
      <SectionHeader variant="dot" as="h3" title="درباره من" />
      <SectionHeader variant="icon" as="h3" title="چرا دوره‌های ما متفاوت‌اند؟" icon={<Target />} />
      <SectionHeader title="دوره‌های مرتبط" as="h3" />
    </div>
  ),
};

export const DarkBanner: Story = {
  render: () => (
    <div className="gradient-night relative overflow-hidden rounded-3xl p-8 text-white shadow-xl md:p-12">
      <GlowOrbs />
      <div className="relative z-10 flex max-w-3xl flex-col gap-y-4">
        <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
          مأموریت ما
        </span>
        <h3 className="text-xl leading-snug font-bold md:text-2xl">یادگیری بدون مرز، برای همه</h3>
      </div>
    </div>
  ),
};
