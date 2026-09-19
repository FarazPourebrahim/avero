"use client";

import { PostListItem } from "@averoui/react";
import { useCopy } from "../copy";

export default function PostListItemRelatedDemo() {
  const t = useCopy({
    fa: {
      firstTitle: "ده اصل طراحی رابط کاربری که هر طراح تازه‌کاری باید بداند",
      firstAuthor: "سارا محمدی",
      firstReadTime: "۵ دقیقه",
      secondTitle: "آشنایی با اصول تایپوگرافی فارسی",
      secondAuthor: "علی کریمی",
      secondReadTime: "۷ دقیقه",
    },
    en: {
      firstTitle: "Ten UI design principles every new designer should know",
      firstAuthor: "Sara Mohammadi",
      firstReadTime: "5 min",
      secondTitle: "An introduction to Persian typography",
      secondAuthor: "Ali Karimi",
      secondReadTime: "7 min",
    },
  });

  return (
    <ul className="w-full max-w-sm space-y-4">
      <PostListItem
        title={t.firstTitle}
        href="#"
        author={t.firstAuthor}
        readTime={t.firstReadTime}
      />
      <PostListItem
        title={t.secondTitle}
        href="#"
        author={t.secondAuthor}
        readTime={t.secondReadTime}
      />
    </ul>
  );
}
