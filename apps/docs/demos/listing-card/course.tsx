import { ListingCard } from "@avero/react";

export default function ListingCardCourseDemo() {
  return (
    <div className="w-full max-w-sm">
      <ListingCard
        title="مبانی طراحی رابط کاربری"
        href="#"
        category="طراحی"
        excerpt="<p>از اصول چیدمان و رنگ تا ساختن نخستین نمونه اولیه در Figma</p>"
        authorName="سارا محمدی"
        price={4_500_000}
        likes={0}
      />
    </div>
  );
}
