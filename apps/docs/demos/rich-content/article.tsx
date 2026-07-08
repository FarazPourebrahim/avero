import { RichContent } from "@avero/react";

const ARTICLE = `
<h2>فریلنسری چیست؟</h2>
<p>فریلنسری یعنی ارائه‌ی <strong>مهارت تخصصی</strong> به‌صورت مستقل و پروژه‌محور.</p>
<ol><li>ثبت پروژه توسط کارفرما</li><li>بررسی پروژه توسط فریلنسر</li></ol>
<blockquote>فریلنسری یعنی فروش مهارت، نه صرفاً فروش زمان.</blockquote>
<p>اطلاعات بیشتر در <a href="https://example.com" target="_blank">این صفحه</a>.</p>
`;

export default function RichContentArticleDemo() {
  return (
    <div className="w-full max-w-2xl">
      <RichContent html={ARTICLE} />
    </div>
  );
}
