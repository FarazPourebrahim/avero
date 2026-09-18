import { Link } from "@averoui/react";
import { BookOpen, House } from "lucide-react";

export default function LinkNavigationDemo() {
  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="header" className="flex gap-10">
        <Link href="#home" variant="nav" current>
          خانه
        </Link>
        <Link href="#courses" variant="nav">
          دوره‌ها
        </Link>
        <Link href="#blog" variant="nav">
          وبلاگ
        </Link>
      </nav>
      <nav aria-label="drawer" className="flex flex-col gap-6">
        <Link href="#home" variant="drawer">
          <House />
          خانه
        </Link>
        <Link href="#courses" variant="drawer">
          <BookOpen />
          دوره‌ها
        </Link>
      </nav>
    </div>
  );
}
