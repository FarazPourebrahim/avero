import { PostListItem } from "@avero/react";

export default function PostListItemRelatedDemo() {
  return (
    <ul className="w-full max-w-sm space-y-4">
      <PostListItem
        title="بهترین مهارت‌های فریلنسری در سال ۲۰۲۶؛ کدام مهارت‌ها آینده بهتری دارند؟"
        href="#"
        author="محمد ابراهیمی"
        readTime="5 دقیقه"
      />
      <PostListItem
        title="چطور اولین پروژه فریلنسری خود را بگیریم؟"
        href="#"
        author="محمد ابراهیمی"
        readTime="7 دقیقه"
      />
    </ul>
  );
}
