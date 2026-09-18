import {
  ArticleHeader,
  ArticleLayout,
  AuthorCard,
  CalendarSolidIcon,
  Card,
  CardHeader,
  CardTitle,
  CategoryLinks,
  Chip,
  ClockSolidIcon,
  CommentSection,
  MetaItem,
  PostListItem,
  PromoBanner,
  RichContent,
  ShareBar,
  TableOfContents,
  type TocItem,
} from "@averoui/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { bannerArt, coverArt, portraitArt, PublicPage } from "./templateChrome";

// TP-01: a blog article. Headings run h1 (title) → h2/h3 (body) → h2 (categories) → h3 (comments,
// author, related posts) → h4 (related post titles).

const TOC: TocItem[] = [
  { id: "why", label: "چرا عادت یادگیری مهم است؟" },
  { id: "plan", label: "یک برنامه ساده بچینید" },
  { id: "time", label: "زمان کوتاه، اما هر روز", level: 3 },
  { id: "notes", label: "یادداشت‌برداری فعال", level: 3 },
  { id: "summary", label: "جمع‌بندی" },
];

const BODY = `
<p>بیشتر ما دوره‌های زیادی را شروع می‌کنیم و کمتر آن‌ها را به پایان می‌رسانیم. مشکل معمولاً کمبود استعداد نیست؛ نبودن یک عادت ساده و پایدار است.</p>
<h2>چرا عادت یادگیری مهم است؟</h2>
<p>وقتی یادگیری به بخشی از روز تبدیل شود، دیگر به <strong>انگیزه لحظه‌ای</strong> وابسته نیست. پیشرفت کوچک اما پیوسته، در چند ماه به نتیجه‌ای بزرگ می‌رسد.</p>
<h2>یک برنامه ساده بچینید</h2>
<h3>زمان کوتاه، اما هر روز</h3>
<p>بیست دقیقه در روز از سه ساعت در آخر هفته بهتر است. زمان ثابتی انتخاب کنید و آن را در تقویم بنویسید.</p>
<h3>یادداشت‌برداری فعال</h3>
<ul><li>پس از هر جلسه، سه نکته اصلی را با کلمات خودتان بنویسید.</li><li>یک پرسش باز برای جلسه بعد یادداشت کنید.</li></ul>
<blockquote>یادگیری مسابقه سرعت نیست؛ مهم این است که هر روز کمی جلوتر باشید.</blockquote>
<h2>جمع‌بندی</h2>
<p>کوچک شروع کنید، زمان ثابت داشته باشید و آموخته‌ها را بنویسید. همین سه قدم بیشتر از هر ترفندی کمک می‌کند.</p>
`;

function ArticleTemplate() {
  return (
    <PublicPage current="blog">
      <ArticleLayout
        id="main-content"
        asideLabel="اطلاعات تکمیلی مقاله"
        aside={
          <>
            <TableOfContents items={TOC} spy={false} defaultActiveId="plan" />
            <AuthorCard
              name="سارا محمدی"
              image={portraitArt}
              roleLabel="نویسنده وبلاگ"
              bio="طراح محصول و مدرس؛ درباره یادگیری مهارت‌های تازه و طراحی رابط کاربری می‌نویسم."
            />
            <Card variant="flat" padding="md" className="space-y-4">
              <CardHeader>
                <CardTitle size="sm">مقاله‌های مرتبط</CardTitle>
              </CardHeader>
              <ul className="space-y-4">
                <PostListItem
                  title="چطور برای یادگیری برنامه‌نویسی وقت پیدا کنیم؟"
                  href="#"
                  author="علی کریمی"
                  readTime="۶ دقیقه"
                />
                <PostListItem
                  title="ده اشتباه رایج در دوره‌های آنلاین"
                  href="#"
                  author="مریم احمدی"
                  readTime="۸ دقیقه"
                />
              </ul>
            </Card>
            <PromoBanner href="#" image={bannerArt} label="دوره‌های تازه پاییز" />
          </>
        }
      >
        <ArticleHeader
          title="چطور یک عادت یادگیری پایدار بسازیم؟"
          image={coverArt}
          meta={
            <>
              <MetaItem icon={<CalendarSolidIcon size={14} />} label="انتشار:">
                <time dateTime="2026-10-04">۱۲ مهر ۱۴۰۵</time>
              </MetaItem>
              <MetaItem icon={<ClockSolidIcon size={14} />}>۷ دقیقه مطالعه</MetaItem>
            </>
          }
        />
        <Card padding="lg">
          <RichContent html={BODY} />
        </Card>
        <CategoryLinks
          title="دسته‌بندی‌های مرتبط"
          titleAs="h2"
          description="موضوع‌های مرتبط با این مقاله"
        >
          {["یادگیری", "بهره‌وری", "دوره‌های آنلاین"].map((category) => (
            <Chip key={category} asChild variant="tag">
              <a href="#">{category}</a>
            </Chip>
          ))}
        </CategoryLinks>
        <ShareBar variant="labelled" label="اشتراک‌گذاری این مقاله:" />
        <CommentSection
          count={0}
          placeholder="دیدگاه خود را درباره این مقاله بنویسید…"
          hint="دیدگاه‌ها پس از بررسی منتشر می‌شوند."
        />
      </ArticleLayout>
    </PublicPage>
  );
}

const meta = {
  title: "Templates/Article",
  component: ArticleTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ArticleTemplate>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
