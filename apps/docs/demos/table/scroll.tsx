"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@averoui/react";
import { useCopy } from "../copy";

export default function TableScrollDemo() {
  const t = useCopy({
    fa: {
      heads: ["جلسه", "عنوان", "مدت", "تکلیف", "تاریخ", "نحوه برگزاری"],
      rows: [
        ["۱", "آشنایی با داده", "۴۵ دقیقه", "تمرین ۱", "۲۴ شهریور", "آنلاین"],
        ["۲", "پاک‌سازی داده", "۵۲ دقیقه", "تمرین ۲", "۳۱ شهریور", "آنلاین"],
        ["۳", "نمودارها", "۳۸ دقیقه", "پروژه کوچک", "۷ مهر", "حضوری"],
      ],
    },
    en: {
      heads: ["Session", "Title", "Length", "Assignment", "Date", "Format"],
      rows: [
        ["1", "Meet your data", "45 min", "Exercise 1", "15 September", "Online"],
        ["2", "Cleaning data", "52 min", "Exercise 2", "22 September", "Online"],
        ["3", "Charts", "38 min", "Small project", "29 September", "In person"],
      ],
    },
  });

  return (
    <Table containerClassName="max-w-md">
      <TableHeader>
        <TableRow>
          {t.heads.map((head) => (
            <TableHead key={head} className="whitespace-nowrap">
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {t.rows.map((row) => (
          <TableRow key={row[0]}>
            {row.map((cell, column) => (
              <TableCell key={`${row[0]}-${column}`} className="whitespace-nowrap">
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
