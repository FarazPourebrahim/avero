import type { Meta, StoryObj } from "@storybook/react-vite";
import { RichContent } from "./RichContent.js";

const ARTICLE = `
<h2>فریلنسری چیست؟</h2>
<p>فریلنسری یعنی ارائه‌ی <strong>مهارت تخصصی</strong> به‌صورت مستقل و پروژه‌محور.</p>
<h3>مراحل یک پروژه</h3>
<ol><li>ثبت پروژه توسط کارفرما</li><li>بررسی پروژه توسط فریلنسر</li></ol>
<blockquote>فریلنسری یعنی فروش مهارت، نه صرفاً فروش زمان.</blockquote>
<table><thead><tr><th scope="col">ویژگی</th><th scope="col">فریلنسری</th></tr></thead>
<tbody><tr><td>انعطاف زمانی</td><td>بالا</td></tr></tbody></table>
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
