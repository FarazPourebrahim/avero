import { AuthorCard } from "@avero/react";

export default function AuthorCardSidebarDemo() {
  return (
    <div className="w-full max-w-sm">
      <AuthorCard
        name="سارا محمدی"
        roleLabel="سردبیر وبلاگ"
        bio="طراح محصول و علاقه‌مند به آموزش؛ در این وبلاگ از تجربه‌های روزمره‌ام در طراحی رابط کاربری و ساختن سیستم‌های طراحی می‌نویسم. ✏️"
      />
    </div>
  );
}
