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
          <SelectItem value="design">طراحی</SelectItem>
          <SelectItem value="data">داده</SelectItem>
          <SelectItem value="photography" disabled>
            عکاسی
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
