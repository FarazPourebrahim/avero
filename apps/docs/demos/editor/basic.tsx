"use client";

import { RichTextEditor } from "@averoui/editor";
import { useCopy } from "../copy";

export default function EditorBasicDemo() {
  const t = useCopy({
    fa: {
      content: [
        "<h2>درباره این دوره</h2>",
        "<p>این متن با <strong>ویرایشگر</strong> نوشته شده و همان استایل مقاله را دارد.</p>",
        "<ul><li>مورد اول</li><li>مورد دوم</li></ul>",
      ].join(""),
    },
    en: {
      content: [
        "<h2>About this course</h2>",
        "<p>This text was written in the <strong>editor</strong>, and carries the same article styling.</p>",
        "<ul><li>First item</li><li>Second item</li></ul>",
      ].join(""),
    },
  });

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white">
      <RichTextEditor key={t.content} defaultValue={t.content} />
    </div>
  );
}
