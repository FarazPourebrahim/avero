"use client";

import { EditorToolbar, RichTextEditor } from "@avero/editor";
import type { Editor } from "@tiptap/react";
import { useState } from "react";

const CONTENT = [
  "<h2>درباره این دوره</h2>",
  "<p>متن را انتخاب کنید و از نوار ابزار برای <strong>قالب‌بندی</strong> استفاده کنید.</p>",
].join("");

export default function EditorWithToolbarDemo() {
  const [editor, setEditor] = useState<Editor | null>(null);

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <EditorToolbar editor={editor} />
      <RichTextEditor defaultValue={CONTENT} onReady={setEditor} />
    </div>
  );
}
