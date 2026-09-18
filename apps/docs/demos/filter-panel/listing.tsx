"use client";

import {
  FilterPanel,
  Input,
  NativeSelect,
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
        <NativeSelect aria-label="مرتب‌سازی" defaultValue="newest">
          <option value="newest">جدیدترین</option>
          <option value="oldest">قدیمی‌ترین</option>
          <option value="popular">محبوب‌ترین</option>
          <option value="price_asc">ارزان‌ترین</option>
          <option value="price_desc">گران‌ترین</option>
        </NativeSelect>
      </FilterPanel>
    </div>
  );
}
