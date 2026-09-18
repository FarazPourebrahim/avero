import { Button, EmptyState } from "@averoui/react";
import { BookOpen, SearchX } from "lucide-react";

export default function EmptyStateDistinctDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <EmptyState variant="circle" icon={<SearchX />}>
        هیچ دوره‌ای با «تحلیل داده پیشرفته» پیدا نشد. واژه دیگری را امتحان کنید.
      </EmptyState>
      <EmptyState
        variant="circle"
        icon={<BookOpen />}
        action={<Button size="sm">دیدن فهرست دوره‌ها</Button>}
      >
        هنوز در هیچ دوره‌ای ثبت‌نام نکرده‌اید.
      </EmptyState>
    </div>
  );
}
