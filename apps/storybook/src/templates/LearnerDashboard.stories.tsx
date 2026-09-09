import {
  AchievementsPanel,
  ActionTile,
  ArrowRightIcon,
  AwardIcon,
  BookmarkIcon,
  CalendarSolidIcon,
  Card,
  CardHeader,
  CardTitle,
  CommentSolidIcon,
  DashboardShell,
  FolderSolidIcon,
  Heading,
  HeartSolidIcon,
  HighlightPanel,
  InfoRow,
  ListUlSolidIcon,
  PaperPlaneSolidIcon,
  QuickActions,
  SectionHeader,
  SidebarNav,
  SidebarNavItem,
  StatCard,
  SuggestionItem,
  UserIcon,
  UsersIcon,
  WelcomeCard,
  ZapIcon,
} from "@avero/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

// TP-05: a learner dashboard. The shell has no `main` of its own, so the page supplies it.
// Headings run h1 (dashboard) → h2 (activity) → h3 (suggestions, achievements) → h4 (suggested
// course titles).

const statIcon = "size-4 sm:size-[18px]";

function LearnerDashboardTemplate() {
  return (
    <div className="bg-background min-h-screen">
      <main id="main-content">
        <DashboardShell
          sidebar={
            <>
              <WelcomeCard name="سارا محمدی" />
              <SidebarNav aria-label="منوی داشبورد">
                <SidebarNavItem href="#" icon={<ZapIcon />} current>
                  پیشخوان
                </SidebarNavItem>
                <SidebarNavItem href="#" icon={<BookmarkIcon />}>
                  دوره‌های من
                </SidebarNavItem>
                <SidebarNavItem href="#" icon={<AwardIcon />}>
                  گواهی‌ها
                </SidebarNavItem>
                <SidebarNavItem href="#" icon={<UserIcon />}>
                  ویرایش پروفایل
                </SidebarNavItem>
                <SidebarNavItem
                  icon={<ArrowRightIcon className="ltr:-scale-x-100" />}
                  tone="danger"
                >
                  خروج از حساب
                </SidebarNavItem>
              </SidebarNav>
            </>
          }
          mobileBar={
            <div className="flex items-center justify-between gap-x-2">
              <span className="truncate text-sm font-semibold text-gray-800">پنل کاربری</span>
              <button
                type="button"
                aria-label="باز کردن منو"
                className="bg-primary rounded-xl p-2 text-white shadow-xs"
              >
                <ListUlSolidIcon className="size-5" />
              </button>
            </div>
          }
        >
          <div className="space-y-6">
            <Heading size="page">پیشخوان من</Heading>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
              <StatCard
                label="دوره‌های فعال"
                value="۳"
                icon={<BookmarkIcon className={statIcon} />}
              />
              <StatCard
                label="جلسه‌های این هفته"
                value="۵"
                icon={<CalendarSolidIcon className={statIcon} />}
                tone="purple"
              />
              <StatCard
                label="گواهی‌ها"
                value="۲"
                icon={<AwardIcon className={statIcon} />}
                tone="emerald"
              />
              <StatCard
                label="هم‌گروهی‌ها"
                value="۴۸"
                icon={<UsersIcon className={statIcon} />}
                tone="amber"
              />
            </div>
            <QuickActions label="دسترسی سریع" columns={4}>
              <ActionTile tone="blue" icon={<PaperPlaneSolidIcon size={18} />}>
                ارسال تمرین
              </ActionTile>
              <ActionTile tone="purple" icon={<FolderSolidIcon size={18} />}>
                فایل‌های دوره
              </ActionTile>
              <ActionTile tone="rose" icon={<HeartSolidIcon size={18} />}>
                ذخیره‌شده‌ها
              </ActionTile>
              <ActionTile tone="emerald" icon={<CommentSolidIcon size={18} />}>
                پرسش و پاسخ
              </ActionTile>
            </QuickActions>
            <SectionHeader title="فعالیت من" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Card variant="flat" padding="md" className="space-y-3 lg:col-span-2">
                <CardHeader>
                  <CardTitle size="sm">پیشنهادها برای شما</CardTitle>
                </CardHeader>
                <SuggestionItem
                  title="طراحی سیستم طراحی در Figma"
                  href="#"
                  description="ساختن کتابخانه کامپوننت و توکن‌های طراحی"
                  tags={["پیشرفته", "آنلاین"]}
                  match={92}
                />
                <SuggestionItem
                  title="مبانی تحلیل داده"
                  href="#"
                  description="کار با داده‌های واقعی و رسم نمودار"
                  tags={["مقدماتی"]}
                  match={64}
                />
              </Card>
              <AchievementsPanel title="رتبه و دستاوردها">
                <HighlightPanel label="رتبه در جدول امتیازها" value="۱۲" />
                <InfoRow label="گواهی‌ها" value="۲ عدد" tone="emerald" />
                <InfoRow label="نشان‌ها" value="۵ عدد" tone="purple" />
                <InfoRow label="آزمون‌ها" value="۸ عدد" tone="blue" />
              </AchievementsPanel>
            </div>
          </div>
        </DashboardShell>
      </main>
    </div>
  );
}

const meta = {
  title: "Templates/Learner Dashboard",
  component: LearnerDashboardTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LearnerDashboardTemplate>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
