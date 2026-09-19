"use client";

import { EditorToolbar, RichTextEditor } from "@averoui/editor";
import type { Editor } from "@tiptap/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function EditorWithToolbarDemo() {
  const [editor, setEditor] = useState<Editor | null>(null);
  const t = useCopy({
    fa: {
      content: [
        "<h2>درباره این دوره</h2>",
        "<p>متن را انتخاب کنید و از نوار ابزار برای <strong>قالب‌بندی</strong> استفاده کنید.</p>",
      ].join(""),
    },
    en: {
      content: [
        "<h2>About this course</h2>",
        "<p>Select some text and use the toolbar to <strong>format</strong> it.</p>",
      ].join(""),
    },
  });

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <EditorToolbar editor={editor} />
      <RichTextEditor key={t.content} defaultValue={t.content} onReady={setEditor} />
    </div>
  );
}
