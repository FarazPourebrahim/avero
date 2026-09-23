"use client";

import {
  Alert,
  Avatar,
  AvatarGroup,
  AveroProvider,
  Badge,
  Button,
  Checkbox,
  Chip,
  IconButton,
  MatchScore,
  PriceInput,
  Rating,
  SegmentedControl,
  SegmentedControlItem,
  SkeletonText,
  Spinner,
  Switch,
  ToggleChip,
  ToggleChipGroup,
  Tooltip,
  TooltipProvider,
} from "@averoui/react";
import { ArrowUpRight, Bookmark, Link2, Share2 } from "lucide-react";
import { useId, type ReactNode } from "react";
import { usePreviewSettings } from "@/components/preview-settings.context";
import { useCopy } from "@/demos/copy";

type TileProps = {
  name: string;
  href: string;
  className?: string;
  children: ReactNode;
};

function Tile({ name, href, className = "", children }: TileProps) {
  const { dir, lang } = usePreviewSettings();
  return (
    <article
      className={`group border-fd-border bg-fd-card flex flex-col rounded-3xl border p-1.5 transition-colors ${className}`}
    >
      <div
        dir={dir}
        lang={lang}
        className="bg-background flex min-h-44 flex-1 flex-wrap items-center justify-center gap-3 rounded-[1.25rem] p-6 font-sans"
      >
        {children}
      </div>
      <a
        href={href}
        className="text-fd-foreground focus-visible:ring-primary/40 flex items-center justify-between rounded-xl px-4 pt-3 pb-2 text-sm font-semibold focus-visible:ring-4 focus-visible:outline-none"
      >
        {name}
        <ArrowUpRight
          className="text-fd-muted-foreground group-hover:text-fd-foreground size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </a>
    </article>
  );
}

const docs = (slug: string) => `/docs/components/${slug}`;

export function ComponentGallery() {
  const { dir, locale } = usePreviewSettings();
  const ids = useId();
  const t = useCopy({
    fa: {
      enrol: "ثبت‌نام",
      details: "جزئیات",
      share: "هم‌رسانی",
      weekly: "ایمیل هفتگی",
      reminders: "یادآوری جلسه‌ها",
      terms: "شرایط را می‌پذیرم",
      range: "بازه گزارش",
      ranges: ["هفته", "ماه", "سال"],
      published: "منتشر شده",
      full: "تکمیل",
      participants: "شرکت‌کنندگان",
      people: ["سارا محمدی", "علی رضایی", "نیکا کریمی", "رضا احمدی", "مینا شریفی", "حسین نوری"],
      alertTitle: "ظرفیت رو به اتمام",
      alertBody: "تنها ۳ جای خالی در این دوره باقی مانده است.",
      metrics: "شاخص‌های نمودار",
      views: "بازدید",
      likes: "لایک",
      clicks: "کلیک",
      comments: "نظر",
      budget: "بودجه",
      match: "هم‌خوانی با شما",
      saveTip: "ذخیره در فهرست من",
      save: "ذخیره",
      copyTip: "رونوشت پیوند",
      copy: "رونوشت",
      shareTip: "ارسال برای دوستان",
      tags: ["طراحی UI/UX", "تحلیل داده", "آنلاین"],
    },
    en: {
      enrol: "Enrol",
      details: "Details",
      share: "Share",
      weekly: "Weekly email",
      reminders: "Session reminders",
      terms: "I accept the terms",
      range: "Report range",
      ranges: ["Week", "Month", "Year"],
      published: "Published",
      full: "Full",
      participants: "Participants",
      people: [
        "Sara Mohammadi",
        "Ali Rezaei",
        "Nika Karimi",
        "Reza Ahmadi",
        "Mina Sharifi",
        "Hossein Nouri",
      ],
      alertTitle: "Almost full",
      alertBody: "Only 3 seats are left on this course.",
      metrics: "Chart metrics",
      views: "Views",
      likes: "Likes",
      clicks: "Clicks",
      comments: "Comments",
      budget: "Budget",
      match: "Match with you",
      saveTip: "Save to my list",
      save: "Save",
      copyTip: "Copy the link",
      copy: "Copy link",
      shareTip: "Send it to a friend",
      tags: ["UI/UX design", "Data analysis", "Online"],
    },
  });

  return (
    <AveroProvider dir={dir} locale={locale}>
      <TooltipProvider delayDuration={150}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Tile name="Button" href={docs("button")} className="sm:col-span-2">
            <Button elevated>{t.enrol}</Button>
            <Button variant="outline">{t.details}</Button>
            <Button variant="soft" tone="blue">
              {t.share}
            </Button>
            <Button loading>{t.enrol}</Button>
          </Tile>

          <Tile name="Switch & Checkbox" href={docs("switch")}>
            <div className="flex w-full max-w-56 flex-col gap-3.5">
              <label className="flex items-center justify-between gap-3 text-sm text-gray-700">
                {t.weekly}
                <Switch defaultChecked />
              </label>
              <label className="flex items-center justify-between gap-3 text-sm text-gray-700">
                {t.reminders}
                <Switch />
              </label>
              <label className="flex items-center gap-2.5 text-sm text-gray-700">
                <Checkbox defaultChecked />
                {t.terms}
              </label>
            </div>
          </Tile>

          <Tile name="SegmentedControl" href={docs("segmented-control")}>
            <SegmentedControl aria-label={t.range} defaultValue="1">
              {t.ranges.map((label, index) => (
                <SegmentedControlItem key={label} value={String(index)}>
                  {label}
                </SegmentedControlItem>
              ))}
            </SegmentedControl>
          </Tile>

          <Tile name="Alert" href={docs("alert")} className="sm:col-span-2">
            <Alert tone="warning" title={t.alertTitle} className="w-full max-w-md">
              {t.alertBody}
            </Alert>
          </Tile>

          <Tile name="Rating & Badge" href={docs("badge")}>
            <div className="flex flex-col items-center gap-3">
              <Rating value={4.8} className="text-sm font-bold text-slate-600" />
              <div className="flex gap-2">
                <Badge tone="success">{t.published}</Badge>
                <Badge tone="danger">{t.full}</Badge>
              </div>
            </div>
          </Tile>

          <Tile name="AvatarGroup" href={docs("avatar-group")}>
            <AvatarGroup label={t.participants} max={4} size="md">
              {t.people.map((name) => (
                <Avatar key={name} name={name} size="md" className="border-2 border-white" />
              ))}
            </AvatarGroup>
          </Tile>

          <Tile name="ToggleChipGroup" href={docs("toggle-chip-group")} className="sm:col-span-2">
            <ToggleChipGroup aria-label={t.metrics} defaultValue={["views", "likes"]}>
              <ToggleChip value="views" color="var(--color-chart-views)">
                {t.views}
              </ToggleChip>
              <ToggleChip value="likes" color="var(--color-chart-likes)">
                {t.likes}
              </ToggleChip>
              <ToggleChip value="clicks" color="var(--color-chart-clicks)">
                {t.clicks}
              </ToggleChip>
              <ToggleChip value="comments" color="var(--color-chart-comments)">
                {t.comments}
              </ToggleChip>
            </ToggleChipGroup>
          </Tile>

          <Tile name="PriceInput" href={docs("price-input")}>
            <div className="flex w-full max-w-52 flex-col gap-2">
              <label htmlFor={`${ids}-budget`} className="text-sm font-semibold text-gray-700">
                {t.budget}
              </label>
              <PriceInput id={`${ids}-budget`} defaultValue={12_450_000} />
            </div>
          </Tile>

          <Tile name="MatchScore" href={docs("match-score")}>
            <MatchScore value={92} label={t.match} />
          </Tile>

          <Tile name="Skeleton & Spinner" href={docs("skeleton")}>
            <div className="flex w-full max-w-52 items-center gap-4">
              <Spinner variant="glow" size="lg" />
              <SkeletonText lines={3} className="flex-1" />
            </div>
          </Tile>

          <Tile name="Tooltip" href={docs("tooltip")}>
            <Tooltip content={t.saveTip}>
              <IconButton label={t.save}>
                <Bookmark />
              </IconButton>
            </Tooltip>
            <Tooltip content={t.copyTip}>
              <IconButton label={t.copy}>
                <Link2 />
              </IconButton>
            </Tooltip>
            <Tooltip content={t.shareTip}>
              <IconButton label={t.share}>
                <Share2 />
              </IconButton>
            </Tooltip>
          </Tile>

          <Tile name="Chip" href={docs("chip")} className="sm:col-span-2">
            <Chip>{t.tags[0]}</Chip>
            <Chip variant="skill">{t.tags[1]}</Chip>
            <Chip size="sm">{t.tags[2]}</Chip>
            <Chip variant="mini">Figma</Chip>
            <Chip variant="skill">React</Chip>
          </Tile>
        </div>
      </TooltipProvider>
    </AveroProvider>
  );
}
