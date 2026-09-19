"use client";

import { Link } from "@averoui/react";
import { BookOpen, House } from "lucide-react";
import { useCopy } from "../copy";

export default function LinkNavigationDemo() {
  const t = useCopy({
    fa: { home: "خانه", courses: "دوره‌ها", blog: "وبلاگ" },
    en: { home: "Home", courses: "Courses", blog: "Blog" },
  });

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="header" className="flex gap-10">
        <Link href="#home" variant="nav" current>
          {t.home}
        </Link>
        <Link href="#courses" variant="nav">
          {t.courses}
        </Link>
        <Link href="#blog" variant="nav">
          {t.blog}
        </Link>
      </nav>
      <nav aria-label="drawer" className="flex flex-col gap-6">
        <Link href="#home" variant="drawer">
          <House />
          {t.home}
        </Link>
        <Link href="#courses" variant="drawer">
          <BookOpen />
          {t.courses}
        </Link>
      </nav>
    </div>
  );
}
