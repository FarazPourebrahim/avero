import { AuthorCard } from "@avero/react";

export default function AuthorCardSidebarDemo() {
  return (
    <div className="w-full max-w-sm">
      <AuthorCard
        name="محمد ابراهیمی"
        roleLabel="مدیر دورلنسر"
        bio="یه برنامه‌نویس و عاشق دنیای تکنولوژی‌ام که دورلنسر رو با هدف ساختن یه فضای بهتر برای همکاری فریلنسرها و کارفرماها راه‌اندازی کردم. اینجا سعی می‌کنیم کار کردن، پیدا کردن پروژه و همکاری رو ساده‌تر و حرفه‌ای‌تر کنیم. 🚀"
      />
    </div>
  );
}
