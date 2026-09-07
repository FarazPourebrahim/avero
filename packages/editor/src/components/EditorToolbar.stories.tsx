import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Editor } from "@tiptap/react";
import { useState } from "react";
import { EditorToolbar } from "./EditorToolbar.js";
import { RichTextEditor } from "./RichTextEditor.js";

const CONTENT = [
  "<h2>درباره این دوره</h2>",
  "<p>این متن با <strong>ویرایشگر</strong> نوشته شده و همان استایل مقاله را دارد.</p>",
  "<ul><li>مورد اول</li><li>مورد دوم</li></ul>",
].join("");

function EditorWithToolbar({ editable = true }: { editable?: boolean }) {
  const [editor, setEditor] = useState<Editor | null>(null);
  return (
    <div className="max-w-2xl overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <EditorToolbar editor={editor} />
      <RichTextEditor defaultValue={CONTENT} editable={editable} onReady={setEditor} />
    </div>
  );
}

const meta = {
  title: "Editor/EditorToolbar",
  component: EditorWithToolbar,
} satisfies Meta<typeof EditorWithToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithEditor: Story = {};

export const ReadOnly: Story = { args: { editable: false } };
