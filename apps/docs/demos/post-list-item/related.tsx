import { PostListItem } from "@avero/react";

export default function PostListItemRelatedDemo() {
  return (
    <ul className="w-full max-w-sm space-y-4">
      <PostListItem
        title="ده اصل طراحی رابط کاربری که هر طراح تازه‌کاری باید بداند"
        href="#"
        author="سارا محمدی"
        readTime="5 دقیقه"
      />
      <PostListItem
        title="آشنایی با اصول تایپوگرافی فارسی"
        href="#"
        author="علی کریمی"
        readTime="7 دقیقه"
      />
    </ul>
  );
}
