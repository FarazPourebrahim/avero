import type { Meta, StoryObj } from "@storybook/react-vite";
import { RichContent } from "./RichContent.js";

const ARTICLE = `
<h2>سیستم طراحی چیست؟</h2>
<p>سیستم طراحی مجموعه‌ای از <strong>قواعد و کامپوننت‌های مشترک</strong> است که محصول را یکپارچه نگه می‌دارد.</p>
<h3>مراحل ساخت</h3>
<ol><li>فهرست کردن الگوهای موجود</li><li>تعریف توکن‌های رنگ و تایپوگرافی</li></ol>
<blockquote>سیستم طراحی یک محصول است، نه یک پروژه یک‌باره.</blockquote>
<table><thead><tr><th scope="col">ویژگی</th><th scope="col">سیستم طراحی</th></tr></thead>
<tbody><tr><td>سرعت توسعه</td><td>بالا</td></tr></tbody></table>
<p>اطلاعات بیشتر در <a href="https://example.com" target="_blank">این صفحه</a>.</p>
`;

const UNTRUSTED = `
<p onclick="steal()">این متن از یک ورودی غیرقابل‌اعتماد می‌آید.</p>
<script>alert("xss")</script>
<a href="javascript:alert(1)">لینک خطرناک</a>
<iframe src="https://evil.test"></iframe>
`;

const meta: Meta<typeof RichContent> = {
  title: "Data display/RichContent",
  component: RichContent,
};

export default meta;
type Story = StoryObj<typeof RichContent>;

export const Article: Story = {
  args: { html: ARTICLE },
  render: (args) => (
    <div className="max-w-2xl rounded-3xl bg-white p-6">
      <RichContent {...args} />
    </div>
  ),
};

export const Sanitized: Story = {
  args: { html: UNTRUSTED },
  render: (args) => (
    <div className="max-w-2xl rounded-3xl bg-white p-6">
      <RichContent {...args} />
    </div>
  ),
};

export const EditorPreview: Story = {
  args: { variant: "editor", html: ARTICLE },
  render: (args) => (
    <div className="max-w-2xl rounded-3xl bg-white p-6">
      <RichContent {...args} />
    </div>
  ),
};
