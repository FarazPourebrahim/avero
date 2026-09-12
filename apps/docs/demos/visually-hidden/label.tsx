import { Button, VisuallyHidden } from "@avero/react";

export default function VisuallyHiddenLabelDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <ul className="flex flex-col gap-2 text-sm">
        {["مبانی تحلیل داده", "طراحی رابط کاربری"].map((course) => (
          <li key={course} className="flex items-center justify-between gap-4">
            <span className="text-gray-700">{course}</span>
            <Button variant="ghost" size="sm">
              ویرایش
              <VisuallyHidden> {course}</VisuallyHidden>
            </Button>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-500">
        هر دکمه روی صفحه «ویرایش» دیده می‌شود، اما برای صفحه‌خوان نام دوره را هم می‌گوید.
      </p>
    </div>
  );
}
