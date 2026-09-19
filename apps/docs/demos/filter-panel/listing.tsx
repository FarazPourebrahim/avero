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

export default function FilterPanelListingDemo() {
  return (
    <div className="w-full max-w-xs">
      <FilterPanel>
        <Input aria-label="جستجو" placeholder="جستجو..." />
        <Select>
          <SelectTrigger aria-label="دسته‌بندی">
            <SelectValue placeholder="همه دسته‌ها" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه دسته‌ها</SelectItem>
            <SelectItem value="design">طراحی</SelectItem>
            <SelectItem value="data">داده</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="newest">
          <SelectTrigger aria-label="مرتب‌سازی">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">جدیدترین</SelectItem>
            <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
            <SelectItem value="popular">محبوب‌ترین</SelectItem>
            <SelectItem value="price_asc">ارزان‌ترین</SelectItem>
            <SelectItem value="price_desc">گران‌ترین</SelectItem>
          </SelectContent>
        </Select>
      </FilterPanel>
    </div>
  );
}
