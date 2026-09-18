import { RichContent } from "@averoui/react";

const ARTICLE = `
<h2>سیستم طراحی چیست؟</h2>
<p>سیستم طراحی مجموعه‌ای از <strong>قاعده‌ها، توکن‌ها و کامپوننت‌ها</strong> است که ظاهر محصول را یکپارچه نگه می‌دارد.</p>
<ol><li>تعریف توکن‌های رنگ و تایپوگرافی</li><li>ساختن کتابخانه کامپوننت</li></ol>
<blockquote>سیستم طراحی یعنی تصمیم‌هایی که یک بار گرفته می‌شوند و همه‌جا به کار می‌روند.</blockquote>
<p>اطلاعات بیشتر در <a href="https://example.com" target="_blank">این صفحه</a>.</p>
`;

export default function RichContentArticleDemo() {
  return (
    <div className="w-full max-w-2xl">
      <RichContent html={ARTICLE} />
    </div>
  );
}
