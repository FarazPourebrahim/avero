import type { Meta, StoryObj } from "@storybook/react-vite";
import { RichTextEditor } from "./RichTextEditor.js";

const CONTENT = [
  "<h2>درباره این خدمت</h2>",
  "<p>این متن با <strong>ویرایشگر</strong> نوشته شده و همان استایل مقاله را دارد.</p>",
  "<ul><li>مورد اول</li><li>مورد دوم</li></ul>",
  "<blockquote><p>یک نقل قول کوتاه.</p></blockquote>",
].join("");

const meta: Meta<typeof RichTextEditor> = {
  title: "Editor/RichTextEditor",
  component: RichTextEditor,
  decorators: [
    (Story) => (
      <div className="max-w-2xl rounded-2xl border border-gray-100 bg-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Empty: Story = {};

export const WithContent: Story = {
  args: { defaultValue: CONTENT },
};

export const ReadOnly: Story = {
  args: { defaultValue: CONTENT, editable: false },
};
