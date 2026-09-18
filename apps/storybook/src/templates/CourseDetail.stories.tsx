import {
  BackLink,
  CalendarSolidIcon,
  CapacityMeter,
  Card,
  Chip,
  ClockSolidIcon,
  CommentSection,
  DetailLayout,
  Heading,
  MetaBar,
  MetaItem,
  PriceCard,
  ProviderCard,
  Rating,
  ReactionBar,
  RelatedItem,
  RelatedList,
  RichContent,
  ShareBar,
} from "@averoui/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { portraitArt, PublicPage } from "./templateChrome";

// TP-02: a course detail page. Headings run h1 (course) → h2 (description) → h3 (comments) →
// h4 (instructor, related courses) → h5 (related course titles).

const DESCRIPTION = `
<h2>درباره این دوره</h2>
<p>در این دوره از صفر با اصول طراحی رابط کاربری آشنا می‌شوید و در پایان، رابط یک اپلیکیشن کامل را در Figma طراحی می‌کنید.</p>
<h2>سرفصل‌ها</h2>
<ol><li>اصول چیدمان، فاصله‌گذاری و شبکه</li><li>رنگ، تایپوگرافی و خوانایی متن فارسی</li><li>ساختن کامپوننت و نمونه اولیه تعاملی</li><li>آزمون کاربردپذیری و بهبود طراحی</li></ol>
<h2>این دوره برای چه کسانی است؟</h2>
<p>برای کسانی که می‌خواهند طراحی رابط کاربری را به‌صورت عملی بیاموزند؛ به دانش قبلی نیازی نیست.</p>
`;

function CourseDetailTemplate() {
  return (
    <PublicPage current="courses">
      <DetailLayout
        id="main-content"
        asideLabel="ثبت‌نام و اطلاعات مدرس"
        aside={
          <>
            <PriceCard amount={4_500_000} />
            <ProviderCard
              name="نگار رضایی"
              image={portraitArt}
              headline="مدرس طراحی رابط کاربری"
              stats={[
                { label: "تعداد دوره‌ها", value: "۴" },
                { label: "امتیاز شرکت‌کنندگان", value: <Rating value={4.8} size="sm" /> },
              ]}
              profileHref="#"
            />
            <RelatedList title="دوره‌های مرتبط">
              <RelatedItem title="طراحی سیستم طراحی در Figma" href="#" price={3_500_000} />
              <RelatedItem title="اصول تایپوگرافی فارسی" href="#" price={2_200_000} />
              <RelatedItem title="کارگاه آزمون کاربردپذیری" href="#" meta={<span>رایگان</span>} />
            </RelatedList>
          </>
        }
      >
        <BackLink href="#" label="بازگشت به دوره‌ها" />
        <Card padding="lg" className="space-y-6">
          <div className="space-y-4">
            <Chip>طراحی</Chip>
            <Heading size="display">مبانی طراحی رابط کاربری</Heading>
            <MetaBar variant="inline">
              <MetaItem icon={<CalendarSolidIcon size={14} />} label="شروع:">
                ۱ آبان ۱۴۰۵
              </MetaItem>
              <MetaItem icon={<ClockSolidIcon size={14} />}>۱۲ جلسه، ۲۴ ساعت</MetaItem>
            </MetaBar>
          </div>
          <ReactionBar likes={128} views={2450} capacity="حداکثر ۳۰ نفر" saved={false} />
          <RichContent html={DESCRIPTION} />
          <CapacityMeter label="ظرفیت ثبت‌نام" value={18} max={30} />
          <ShareBar variant="labelled" label="اشتراک‌گذاری این دوره:" />
        </Card>
        <CommentSection
          variant="service"
          title="دیدگاه شرکت‌کنندگان"
          count={0}
          placeholder="دیدگاه خود را درباره این دوره بنویسید…"
        />
      </DetailLayout>
    </PublicPage>
  );
}

const meta = {
  title: "Templates/Course Detail",
  component: CourseDetailTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CourseDetailTemplate>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
