"use client";

import {
  Avatar,
  AvatarGroup,
  AveroProvider,
  Badge,
  Button,
  Card,
  CapacityMeter,
  DatePicker,
  Field,
  FieldControl,
  FieldLabel,
  IconButton,
  PriceTag,
  Rating,
  SegmentedControl,
  SegmentedControlItem,
  Switch,
} from "@averoui/react";
import { Bookmark } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

export type StageDirection = "rtl" | "ltr";

const COPY = {
  rtl: {
    locale: "fa-IR",
    lang: "fa",
    instructor: "سارا محمدی",
    role: "مدرس طراحی محصول",
    seats: "۹ جای خالی",
    title: "مبانی طراحی رابط کاربری",
    summary: "از اصول چیدمان و رنگ تا ساختن نخستین نمونه اولیه.",
    capacity: "ظرفیت ثبت‌نام",
    start: "تاریخ شروع",
    reminders: "یادآوری جلسه‌ها",
    enrol: "ثبت‌نام در دوره",
    save: "ذخیره دوره",
    classmates: "هم‌کلاسی‌ها",
    people: ["نیکا کریمی", "علی رضایی", "مینا شریفی", "رضا احمدی", "حسین نوری", "سارا محمدی"],
    joined: "این هفته ثبت‌نام کردند",
  },
  ltr: {
    locale: "en-US",
    lang: "en",
    instructor: "Sara Mohammadi",
    role: "Product design instructor",
    seats: "9 seats left",
    title: "UI design foundations",
    summary: "From layout and colour principles to your first prototype.",
    capacity: "Places taken",
    start: "Start date",
    reminders: "Session reminders",
    enrol: "Enrol in the course",
    save: "Save course",
    classmates: "Classmates",
    people: [
      "Nika Karimi",
      "Ali Rezaei",
      "Mina Sharifi",
      "Reza Ahmadi",
      "Hossein Nouri",
      "Sara M.",
    ],
    joined: "enrolled this week",
  },
} as const;

type HeroStageProps = {
  dir: StageDirection;
  onDirChange: (dir: StageDirection) => void;
  /** Called on the first pointer or key press inside the stage. */
  onInteract: () => void;
  toolbarEnd?: ReactNode;
};

/**
 * A small product surface built only from Avero components. It renders in whichever direction the
 * headline is currently naming, and the form state is held here so switching language keeps what
 * the visitor picked.
 */
export function HeroStage({ dir, onDirChange, onInteract, toolbarEnd }: HeroStageProps) {
  const [start, setStart] = useState<string | null>("2026-03-21");
  const [reminders, setReminders] = useState(true);
  const [saved, setSaved] = useState(false);
  const reminderId = useId();
  const t = COPY[dir];

  return (
    <div className="border-fd-border bg-fd-card relative rounded-[1.75rem] border p-1.5 shadow-[0_30px_80px_-30px] shadow-slate-900/25 dark:shadow-black/60">
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <code className="text-fd-muted-foreground truncate text-xs" aria-live="polite">
          <span className="text-fd-foreground/60">&lt;html</span> dir=&quot;
          <span className="text-fd-foreground font-semibold">{dir}</span>&quot; lang=&quot;
          <span className="text-fd-foreground font-semibold">{t.lang}</span>&quot;
          <span className="text-fd-foreground/60">&gt;</span>
        </code>
        <div className="flex shrink-0 items-center gap-1.5">
          <AveroProvider dir={dir} locale={t.locale}>
            <SegmentedControl
              aria-label="Stage language"
              value={dir}
              onValueChange={(next) => onDirChange(next as StageDirection)}
            >
              <SegmentedControlItem value="rtl">فا</SegmentedControlItem>
              <SegmentedControlItem value="ltr">EN</SegmentedControlItem>
            </SegmentedControl>
          </AveroProvider>
          {toolbarEnd}
        </div>
      </div>

      <AveroProvider dir={dir} locale={t.locale}>
        {/* Positioned in the stage's own direction, so the floating card's `end` side flips too. */}
        <div dir={dir} className="relative">
          <div
            className="bg-background relative overflow-hidden rounded-[1.4rem] p-4 font-sans sm:p-6"
            onPointerDownCapture={onInteract}
            onKeyDownCapture={onInteract}
          >
            <div key={dir} dir={dir} lang={t.lang} className="landing-stage-enter">
              <Card elevation="soft" padding="md" className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Avatar name={t.instructor} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="text-text-strong truncate text-sm font-bold">{t.instructor}</p>
                    <p className="text-text-subtle truncate text-xs">{t.role}</p>
                  </div>
                  <Badge tone="success" className="py-1">
                    {t.seats}
                  </Badge>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h2 className="text-text-strong text-lg leading-snug font-bold sm:text-xl">
                    {t.title}
                  </h2>
                  <p className="text-sm leading-7 text-gray-600">{t.summary}</p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Rating value={4.8} size="sm" className="text-xs font-bold text-slate-600" />
                  <PriceTag amount={4_500_000} amountClassName="text-2xl" />
                </div>

                <CapacityMeter label={t.capacity} value={3} max={12} />

                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <Field>
                    <FieldLabel>{t.start}</FieldLabel>
                    <FieldControl>
                      <DatePicker value={start} onValueChange={setStart} />
                    </FieldControl>
                  </Field>
                  <div className="flex h-11 items-center gap-3">
                    <Switch id={reminderId} checked={reminders} onCheckedChange={setReminders} />
                    <label htmlFor={reminderId} className="text-sm text-gray-700">
                      {t.reminders}
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* `flex-1` rather than `block`: the button is `shrink-0`, so a full-width button
                    would push the icon button out of the card. */}
                  <Button size="lg" elevated className="min-w-0 flex-1">
                    {t.enrol}
                  </Button>
                  <IconButton
                    label={t.save}
                    variant="outline"
                    size="lg"
                    aria-pressed={saved}
                    onClick={() => setSaved((value) => !value)}
                    className="aria-pressed:text-primary size-11 shrink-0"
                  >
                    <Bookmark className="size-5 [[aria-pressed=true]_&]:fill-current" aria-hidden />
                  </IconButton>
                </div>
              </Card>
            </div>
          </div>

          <div
            lang={t.lang}
            className="landing-float absolute -end-3 -bottom-7 hidden sm:block lg:-end-8"
          >
            <div
              key={dir}
              dir={dir}
              className="landing-stage-enter shadow-float flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 font-sans"
            >
              <AvatarGroup label={t.classmates} max={3} size="xs" overlap="md">
                {t.people.map((name) => (
                  <Avatar key={name} name={name} size="xs" className="border-2 border-white" />
                ))}
              </AvatarGroup>
              <p className="text-text-subtle text-xs leading-5">{t.joined}</p>
            </div>
          </div>
        </div>
      </AveroProvider>
    </div>
  );
}
