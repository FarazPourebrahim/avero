import {
  AchievementsPanel,
  AwardIcon,
  Badge,
  BookmarkIcon,
  Card,
  CardHeader,
  CardTitle,
  HighlightPanel,
  IconButton,
  InfoRow,
  LinkedinIcon,
  MetaItem,
  OpportunityCard,
  PillTab,
  PillTabs,
  ProfileHeader,
  ProfileLayout,
  RichContent,
  SectionHeader,
  ShowcaseCard,
  StarIcon,
  StatStrip,
  StatTile,
  TelegramIcon,
  UsersIcon,
} from "@averoui/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { coolArt, portraitArt, PublicPage, warmArt } from "./templateChrome";

// TP-04: an instructor profile. Headings run (name) → h2 (about, work) → h3 (showcase, workshops)
// → h4 (showcase titles) / h3 (workshop titles) → h2 (achievements).

const ABOUT = `
<p>ده سال است که رابط کاربری طراحی می‌کنم و پنج سال است که آن را آموزش می‌دهم. در دوره‌هایم تمرکز روی پروژه‌های واقعی است؛ هر شرکت‌کننده در پایان یک نمونه کار کامل دارد.</p>
<p>پیش از تدریس، در تیم‌های محصول چند استارتاپ روی اپلیکیشن‌های پرکاربرد کار کرده‌ام.</p>
`;

const statIcon = "size-5 sm:size-6";

function InstructorProfileTemplate() {
  return (
    <PublicPage current="courses">
      <ProfileLayout id="main-content">
        <ProfileHeader
          name="نگار رضایی"
          image={portraitArt}
          headline="مدرس طراحی رابط کاربری"
          badge={<Badge variant="premium">مدرس برگزیده</Badge>}
          meta={
            <>
              <MetaItem variant="pill">تهران (ایران)</MetaItem>
              <MetaItem>عضویت: ۲ سال پیش</MetaItem>
            </>
          }
          tabs={
            <PillTabs aria-label="بخش‌های پروفایل">
              <PillTab href="#" current>
                درباره من
              </PillTab>
              <PillTab href="#">دوره‌ها (۴)</PillTab>
              <PillTab href="#">نمونه کارها (۲)</PillTab>
            </PillTabs>
          }
          socials={
            <>
              <IconButton label="تلگرام" variant="social">
                <TelegramIcon />
              </IconButton>
              <IconButton label="لینکدین" variant="social">
                <LinkedinIcon />
              </IconButton>
            </>
          }
        />
        <StatStrip>
          <StatTile label="سابقه تدریس" value="۵ سال" icon={<AwardIcon className={statIcon} />} />
          <StatTile
            label="تعداد دوره‌ها"
            value="۴"
            icon={<BookmarkIcon className={statIcon} />}
            tone="purple"
          />
          <StatTile
            label="شرکت‌کنندگان"
            value="۱٬۲۰۰"
            icon={<UsersIcon className={statIcon} />}
            tone="emerald"
          />
          <StatTile
            label="میانگین امتیاز"
            value="۴٫۸"
            icon={<StarIcon className={statIcon} />}
            tone="amber"
          />
        </StatStrip>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card padding="lg" className="space-y-4">
              <CardHeader>
                <CardTitle as="h2">درباره من</CardTitle>
              </CardHeader>
              <RichContent html={ABOUT} />
            </Card>
            <SectionHeader title="کارها و کارگاه‌ها" />
            <SectionHeader as="h3" variant="dot" title="نمونه کارهای شرکت‌کنندگان" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ShowcaseCard
                title="اپلیکیشن مدیریت کارها"
                href="#"
                image={coolArt}
                description="پروژه پایانی دوره طراحی رابط کاربری برای مدیریت کارهای روزانه"
                tags={["Figma", "طراحی رابط کاربری"]}
                likes={42}
              />
              <ShowcaseCard
                title="فروشگاه آنلاین گیاهان"
                href="#"
                image={warmArt}
                description="طراحی تجربه خرید موبایل، از فهرست محصولات تا پرداخت"
                tags={["نمونه اولیه"]}
                likes={31}
              />
            </div>
            <SectionHeader as="h3" variant="dot" title="کارگاه‌های پیش‌رو" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <OpportunityCard
                title="کارگاه آزمون کاربردپذیری"
                href="#"
                date="۱۵ آبان"
                tags={["آنلاین"]}
                description="سه جلسه عملی برای طراحی و اجرای آزمون کاربردپذیری"
                capacityLabel="ظرفیت ثبت‌نام"
                value={4}
                max={12}
                status="۸ جای خالی"
                startCaption="۴ نفر ثبت‌نام کرده‌اند"
                endCaption="حداکثر ۱۲ نفر"
              />
              <OpportunityCard
                title="کارگاه طراحی آیکون"
                href="#"
                date="۲۲ آبان"
                tags={["حضوری"]}
                description="از طرح اولیه تا مجموعه آیکون یکپارچه"
                capacityLabel="ظرفیت ثبت‌نام"
                value={10}
                max={10}
                status="ظرفیت تکمیل شد"
                startCaption="۱۰ نفر ثبت‌نام کرده‌اند"
                endCaption="حداکثر ۱۰ نفر"
                full
              />
            </div>
          </div>
          <AchievementsPanel title="رتبه و دستاوردها" titleAs="h2" className="h-fit">
            <HighlightPanel label="رتبه در میان مدرس‌ها" value="۳" />
            <InfoRow label="گواهی‌های صادرشده" value="۸۴۰ عدد" tone="emerald" />
            <InfoRow label="نشان‌ها" value="۱۲ عدد" tone="purple" />
            <InfoRow label="پرسش‌های پاسخ‌داده" value="۱٬۶۰۰ عدد" tone="blue" />
          </AchievementsPanel>
        </div>
      </ProfileLayout>
    </PublicPage>
  );
}

const meta = {
  title: "Templates/Instructor Profile",
  component: InstructorProfileTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof InstructorProfileTemplate>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
