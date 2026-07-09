"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@avero/react";

export default function SelectFilterDemo() {
  return (
    <div className="w-full max-w-sm">
      <Select>
        <SelectTrigger aria-label="دسته‌بندی">
          <SelectValue placeholder="همه دسته‌ها" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه دسته‌ها</SelectItem>
          <SelectItem value="seo">سئو</SelectItem>
          <SelectItem value="design">طراحی سایت</SelectItem>
          <SelectItem value="content" disabled>
            تولید محتوا
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
