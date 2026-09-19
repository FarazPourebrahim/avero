"use client";

import { ListingCard } from "@averoui/react";
import { useCopy } from "../copy";

export default function ListingCardCourseDemo() {
  const t = useCopy({
    fa: {
      title: "مبانی طراحی رابط کاربری",
      category: "طراحی",
      excerpt: "<p>از اصول چیدمان و رنگ تا ساختن نخستین نمونه اولیه در Figma</p>",
      author: "سارا محمدی",
    },
    en: {
      title: "UI design foundations",
      category: "Design",
      excerpt: "<p>From layout and colour principles to your first Figma prototype</p>",
      author: "Sara Mohammadi",
    },
  });

  return (
    <div className="w-full max-w-sm">
      <ListingCard
        title={t.title}
        href="#"
        category={t.category}
        excerpt={t.excerpt}
        authorName={t.author}
        price={4_500_000}
        likes={0}
      />
    </div>
  );
}
