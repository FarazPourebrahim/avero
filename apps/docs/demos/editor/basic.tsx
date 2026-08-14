"use client";

import { RichTextEditor } from "@avero/editor";

const CONTENT = [
  "<h2>درباره این دوره</h2>",
  "<p>این متن با <strong>ویرایشگر</strong> نوشته شده و همان استایل مقاله را دارد.</p>",
  "<ul><li>مورد اول</li><li>مورد دوم</li></ul>",
].join("");

export default function EditorBasicDemo() {
  return (
    <div className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white">
      <RichTextEditor defaultValue={CONTENT} />
    </div>
  );
}
