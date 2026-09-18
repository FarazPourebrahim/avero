import {
  FilterPanel,
  Input,
  ListingCard,
  ListingLayout,
  NativeSelect,
  Pagination,
  PromoBanner,
  SectionHeader,
} from "@averoui/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { bannerArt, coolArt, coverArt, portraitArt, PublicPage, warmArt } from "./templateChrome";

// TP-03: a course listing. Headings run h1 (page) → h2 (filters); the cards carry their names as
// link labels rather than headings.

const COURSES = [
  {
    title: "مبانی طراحی رابط کاربری",
    category: "طراحی",
    excerpt: "<p>از اصول چیدمان و رنگ تا ساختن نخستین نمونه اولیه در Figma</p>",
    authorName: "نگار رضایی",
    price: 4_500_000,
    likes: 128,
    image: coverArt,
  },
  {
    title: "تحلیل داده با پایتون",
    category: "داده",
    excerpt: "<p>پاک‌سازی، تحلیل و رسم نمودار با داده‌های واقعی</p>",
    authorName: "علی کریمی",
    price: 5_200_000,
    likes: 86,
    image: coolArt,
  },
  {
    title: "عکاسی با موبایل",
    category: "عکاسی",
    excerpt: "<p>نور، ترکیب‌بندی و ویرایش عکس فقط با گوشی همراه</p>",
    authorName: "مریم احمدی",
    price: 1_900_000,
    likes: 214,
    image: warmArt,
  },
  {
    title: "برنامه‌نویسی وب با React",
    category: "برنامه‌نویسی",
    excerpt: "<p>ساختن یک اپلیکیشن کامل، از کامپوننت تا مدیریت داده</p>",
    authorName: "علی کریمی",
    price: 6_800_000,
    likes: 173,
    image: coolArt,
  },
  {
    title: "اصول تایپوگرافی فارسی",
    category: "طراحی",
    excerpt: "<p>انتخاب قلم، اندازه و فاصله خطوط برای متن‌های خوانا</p>",
    authorName: "نگار رضایی",
    price: 2_200_000,
    likes: 64,
    image: warmArt,
  },
  {
    title: "مدیریت زمان برای فریلنسرها",
    category: "مهارت‌های نرم",
    excerpt: "<p>برنامه‌ریزی پروژه‌ها، قیمت‌گذاری و تعادل کار و زندگی</p>",
    authorName: "مریم احمدی",
    price: 1_500_000,
    likes: 39,
    image: coverArt,
  },
];

function CourseListingTemplate() {
  return (
    <PublicPage current="courses">
      <ListingLayout
        id="main-content"
        asideLabel="فیلتر دوره‌ها"
        header={
          <SectionHeader
            as="h1"
            variant="accentBar"
            title="همه دوره‌ها"
            subtitle="۸۶ دوره در طراحی، داده، برنامه‌نویسی و مهارت‌های نرم"
          />
        }
        aside={
          <>
            <FilterPanel>
              <Input aria-label="جستجو در دوره‌ها" placeholder="جستجو..." />
              <NativeSelect aria-label="دسته‌بندی" defaultValue="all">
                <option value="all">همه دسته‌ها</option>
                <option value="design">طراحی</option>
                <option value="data">داده</option>
                <option value="code">برنامه‌نویسی</option>
              </NativeSelect>
              <NativeSelect aria-label="مرتب‌سازی" defaultValue="newest">
                <option value="newest">جدیدترین</option>
                <option value="popular">محبوب‌ترین</option>
                <option value="price_asc">ارزان‌ترین</option>
              </NativeSelect>
            </FilterPanel>
            <PromoBanner href="#" image={bannerArt} label="تخفیف ثبت‌نام پاییز" />
          </>
        }
      >
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((course) => (
              <ListingCard key={course.title} href="#" authorImage={portraitArt} {...course} />
            ))}
          </div>
          <Pagination pageCount={15} defaultPage={1} getHref={(page) => `#page-${page}`} />
        </div>
      </ListingLayout>
    </PublicPage>
  );
}

const meta = {
  title: "Templates/Course Listing",
  component: CourseListingTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CourseListingTemplate>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
