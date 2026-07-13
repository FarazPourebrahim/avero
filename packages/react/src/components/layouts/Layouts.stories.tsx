import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ArticleLayout,
  DetailLayout,
  ListingLayout,
  ProfileLayout,
  SplitDetailLayout,
} from "./Layouts.js";

const meta: Meta = {
  title: "Layout/Templates",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

function Block({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={`flex min-h-24 items-center justify-center rounded-2xl bg-white text-sm text-gray-500 shadow-xs ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export const Article: Story = {
  render: () => (
    <div className="bg-background py-6">
      <ArticleLayout
        asideLabel="ستون کناری"
        aside={
          <>
            <Block>فهرست مطالب</Block>
            <Block>نویسنده</Block>
          </>
        }
      >
        <Block className="min-h-64">مقاله</Block>
        <Block>نظرات</Block>
      </ArticleLayout>
    </div>
  ),
};

export const Detail: Story = {
  render: () => (
    <div className="bg-background py-6">
      <DetailLayout
        asideLabel="اطلاعات خدمت"
        aside={
          <>
            <Block>قیمت</Block>
            <Block>ارائه‌دهنده</Block>
          </>
        }
      >
        <Block className="min-h-64">توضیحات خدمت</Block>
      </DetailLayout>
    </div>
  ),
};

export const Listing: Story = {
  render: () => (
    <div className="bg-background py-6">
      <ListingLayout
        header={<h1 className="text-xl font-bold text-slate-900 md:text-2xl">خدمات فریلنسرها</h1>}
        asideLabel="فیلترها"
        aside={<Block className="min-h-48">فیلترها</Block>}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Block>خدمت</Block>
          <Block>خدمت</Block>
          <Block>خدمت</Block>
        </div>
      </ListingLayout>
    </div>
  ),
};

export const SplitDetail: Story = {
  render: () => (
    <div className="bg-background py-6">
      <SplitDetailLayout asideLabel="بنر" aside={<Block className="min-h-48">بنر ثبت پروژه</Block>}>
        <Block className="min-h-64">جزئیات پروژه</Block>
      </SplitDetailLayout>
    </div>
  ),
};

export const Profile: Story = {
  render: () => (
    <div className="bg-background">
      <ProfileLayout>
        <Block className="min-h-40">هدر پروفایل</Block>
        <Block>آمار</Block>
        <Block>درباره من</Block>
      </ProfileLayout>
    </div>
  ),
};
