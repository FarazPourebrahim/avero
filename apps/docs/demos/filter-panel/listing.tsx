"use client";

import {
  FilterPanel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@averoui/react";
import { useCopy } from "../copy";

export default function FilterPanelListingDemo() {
  const t = useCopy({
    fa: {
      search: "جستجو",
      searchPlaceholder: "جستجو...",
      category: "دسته‌بندی",
      allCategories: "همه دسته‌ها",
      design: "طراحی",
      data: "داده",
      sort: "مرتب‌سازی",
      newest: "جدیدترین",
      oldest: "قدیمی‌ترین",
      popular: "محبوب‌ترین",
      cheapest: "ارزان‌ترین",
      priciest: "گران‌ترین",
    },
    en: {
      search: "Search",
      searchPlaceholder: "Search…",
      category: "Category",
      allCategories: "All categories",
      design: "Design",
      data: "Data",
      sort: "Sort",
      newest: "Newest",
      oldest: "Oldest",
      popular: "Most popular",
      cheapest: "Lowest price",
      priciest: "Highest price",
    },
  });

  return (
    <div className="w-full max-w-xs">
      <FilterPanel>
        <Input aria-label={t.search} placeholder={t.searchPlaceholder} />
        <Select>
          <SelectTrigger aria-label={t.category}>
            <SelectValue placeholder={t.allCategories} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.allCategories}</SelectItem>
            <SelectItem value="design">{t.design}</SelectItem>
            <SelectItem value="data">{t.data}</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="newest">
          <SelectTrigger aria-label={t.sort}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t.newest}</SelectItem>
            <SelectItem value="oldest">{t.oldest}</SelectItem>
            <SelectItem value="popular">{t.popular}</SelectItem>
            <SelectItem value="price_asc">{t.cheapest}</SelectItem>
            <SelectItem value="price_desc">{t.priciest}</SelectItem>
          </SelectContent>
        </Select>
      </FilterPanel>
    </div>
  );
}
