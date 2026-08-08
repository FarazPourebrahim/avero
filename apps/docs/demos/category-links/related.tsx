import { CategoryLinks, Chip } from "@avero/react";

const CATEGORIES = ["PHP", "Laravel", "برنامه‌نویسی وب", "API"];

export default function CategoryLinksRelatedDemo() {
  return (
    <CategoryLinks
      title="دسته‌بندی‌های مرتبط"
      description="دسته‌بندی‌ها و زمینه‌های تخصصی مربوط به این آگهی"
    >
      {CATEGORIES.map((category) => (
        <Chip key={category} asChild variant="tag">
          <a href="#">{category}</a>
        </Chip>
      ))}
    </CategoryLinks>
  );
}
