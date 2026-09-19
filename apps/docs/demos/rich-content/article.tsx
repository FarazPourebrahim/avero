"use client";

import { RichContent } from "@averoui/react";
import { useCopy } from "../copy";

export default function RichContentArticleDemo() {
  const t = useCopy({
    fa: {
      article: `
<h2>سیستم طراحی چیست؟</h2>
<p>سیستم طراحی مجموعه‌ای از <strong>قاعده‌ها، توکن‌ها و کامپوننت‌ها</strong> است که ظاهر محصول را یکپارچه نگه می‌دارد.</p>
<ol><li>تعریف توکن‌های رنگ و تایپوگرافی</li><li>ساختن کتابخانه کامپوننت</li></ol>
<blockquote>سیستم طراحی یعنی تصمیم‌هایی که یک بار گرفته می‌شوند و همه‌جا به کار می‌روند.</blockquote>
<p>اطلاعات بیشتر در <a href="https://example.com" target="_blank">این صفحه</a>.</p>
`,
    },
    en: {
      article: `
<h2>What is a design system?</h2>
<p>A design system is a set of <strong>rules, tokens and components</strong> that keeps a product looking like one thing.</p>
<ol><li>Define the colour and typography tokens</li><li>Build the component library</li></ol>
<blockquote>A design system is the decisions you make once and then use everywhere.</blockquote>
<p>There is more on <a href="https://example.com" target="_blank">this page</a>.</p>
`,
    },
  });

  return (
    <div className="w-full max-w-2xl">
      <RichContent html={t.article} />
    </div>
  );
}
