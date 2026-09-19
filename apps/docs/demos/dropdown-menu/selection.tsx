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
import { useCopy } from "../copy";

export default function DropdownMenuSelectionDemo() {
  const [onlyFree, setOnlyFree] = useState(true);
  const [sort, setSort] = useState("newest");
  const t = useCopy({
    fa: {
      trigger: "نمایش فهرست",
      filter: "پالایش",
      freeOnly: "فقط دوره‌های رایگان",
      sort: "مرتب‌سازی",
      newest: "جدیدترین",
      popular: "محبوب‌ترین",
      export: "برون‌بری",
      csv: "فایل CSV",
      pdf: "فایل PDF",
      clear: "پاک کردن فهرست",
    },
    en: {
      trigger: "List options",
      filter: "Filter",
      freeOnly: "Free courses only",
      sort: "Sort",
      newest: "Newest",
      popular: "Most popular",
      export: "Export",
      csv: "CSV file",
      pdf: "PDF file",
      clear: "Clear the list",
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{t.trigger}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t.filter}</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked={onlyFree} onCheckedChange={setOnlyFree}>
          {t.freeOnly}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{t.sort}</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="newest">{t.newest}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="popular">{t.popular}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>{t.export}</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>{t.csv}</DropdownMenuItem>
            <DropdownMenuItem>{t.pdf}</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem tone="danger">{t.clear}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
