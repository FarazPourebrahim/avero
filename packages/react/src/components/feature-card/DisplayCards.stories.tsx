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
      <SectionHeader
        variant="icon"
        as="h3"
        title="چرا دورلنسر انتخابی متفاوت است؟"
        icon={<Target />}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          tone="emerald"
          icon={<ShieldCheck className="text-emerald-500" />}
          title="سیستم پرداخت امن و تضمین‌شده"
          description="حفظ امنیت مالی کارفرما و تضمین دریافت دستمزد فریلنسر با پرداخت مرحله‌ای و امانی."
        />
        <FeatureCard
          tone="blue"
          icon={<Users className="text-blue-500" />}
          title="دسترسی به برترین استعدادها"
          description="گردهم‌آوری هزاران متخصص و فریلنسر ماهر در حوزه‌های مختلف."
        />
        <FeatureCard
          tone="purple"
          icon={<Award className="text-purple-500" />}
          title="سنجش مهارت و گواهینامه‌های معتبر"
          description="سیستم پیشرفته آزمون‌های تخصصی برای اعتبارسنجی مهارت‌ها."
        />
        <FeatureCard
          tone="amber"
          icon={<Zap className="text-amber-500" />}
          title="سرعت، سهولت و پشتیبانی فعال"
          description="رابط کاربری ساده، سیستم چت اختصاصی و تیم پشتیبانی همراه."
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
        افزودن خدمت
      </ActionTile>
      <ActionTile tone="purple" icon={<Eye className={actionIcon} />}>
        افزودن نمونه‌کار
      </ActionTile>
      <ActionTile tone="amber" icon={<Zap className={actionIcon} />}>
        ساخت استوری
      </ActionTile>
      <ActionTile tone="emerald" icon={<Award className={actionIcon} />}>
        شرکت در آزمون
      </ActionTile>
      <ActionTile tone="rose" icon={<TrendingUp className={actionIcon} />}>
        ارتقای پلن
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
        title="داستان شکل‌گیری دورلنسر"
        subtitle="روایت یک تصمیم برای تحول فضای دورکاری و توانمندسازی جامعه متخصصان ایران ✨"
      />
      <SectionHeader variant="dot" as="h3" title="درباره من" />
      <SectionHeader
        variant="icon"
        as="h3"
        title="چرا دورلنسر انتخابی متفاوت است؟"
        icon={<Target />}
      />
      <SectionHeader title="پروژه‌های مرتبط" as="h3" />
    </div>
  ),
};

export const DarkBanner: Story = {
  render: () => (
    <div className="gradient-night relative overflow-hidden rounded-3xl p-8 text-white shadow-xl md:p-12">
      <GlowOrbs />
      <div className="relative z-10 flex max-w-3xl flex-col gap-y-4">
        <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
          مأموریت و چشم‌انداز
        </span>
        <h3 className="text-xl leading-snug font-bold md:text-2xl">
          ساختن آینده‌ای که در آن تخصص و تلاش حد و مرزی ندارد
        </h3>
      </div>
    </div>
  ),
};
