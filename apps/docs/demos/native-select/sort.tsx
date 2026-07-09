import { NativeSelect } from "@avero/react";

export default function NativeSelectSortDemo() {
  return (
    <NativeSelect aria-label="مرتب‌سازی" defaultValue="newest">
      <option value="newest">جدیدترین</option>
      <option value="oldest">قدیمی‌ترین</option>
      <option value="popular">محبوب‌ترین</option>
      <option value="price_asc">ارزان‌ترین</option>
      <option value="price_desc">گران‌ترین</option>
    </NativeSelect>
  );
}
