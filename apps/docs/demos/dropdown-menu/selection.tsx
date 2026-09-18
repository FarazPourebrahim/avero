"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@averoui/react";
import { useState } from "react";

export default function DropdownMenuSelectionDemo() {
  const [onlyFree, setOnlyFree] = useState(true);
  const [sort, setSort] = useState("newest");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">نمایش فهرست</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>پالایش</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked={onlyFree} onCheckedChange={setOnlyFree}>
          فقط دوره‌های رایگان
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>مرتب‌سازی</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="newest">جدیدترین</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="popular">محبوب‌ترین</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>برون‌بری</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>فایل CSV</DropdownMenuItem>
            <DropdownMenuItem>فایل PDF</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem tone="danger">پاک کردن فهرست</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
