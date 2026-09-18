import { CategoryLinks, Chip } from "@averoui/react";

const CATEGORIES = ["TypeScript", "React", "طراحی رابط کاربری", "دسترس‌پذیری"];

export default function CategoryLinksRelatedDemo() {
  return (
    <CategoryLinks
      title="دسته‌بندی‌های مرتبط"
      description="موضوع‌ها و زمینه‌های مرتبط با این مقاله"
    >
      {CATEGORIES.map((category) => (
        <Chip key={category} asChild variant="tag">
          <a href="#">{category}</a>
        </Chip>
      ))}
    </CategoryLinks>
  );
}
