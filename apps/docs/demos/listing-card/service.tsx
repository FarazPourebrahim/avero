import { ListingCard } from "@avero/react";

export default function ListingCardServiceDemo() {
  return (
    <div className="w-full max-w-sm">
      <ListingCard
        title="طراحی سایت و سئو"
        href="#"
        category="سئو"
        excerpt="<p>انواع طراحی سایت و سئو اعم از فروشگاهی، شرکتی، آموزشی و شخصی</p>"
        authorName="زینب فلاح"
        price={20_000_000}
        likes={0}
      />
    </div>
  );
}
