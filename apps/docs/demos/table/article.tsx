"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@averoui/react";
import { useCopy } from "../copy";

export default function TableArticleDemo() {
  const t = useCopy({
    fa: {
      caption: "مقایسه دوره آنلاین و حضوری",
      heads: ["ویژگی", "آنلاین", "حضوری"],
      rows: [
        ["انعطاف زمانی", "بالا", "محدود"],
        ["گفت‌وگو با مدرس", "در انجمن دوره", "سر کلاس"],
      ],
    },
    en: {
      caption: "Online and in-person courses compared",
      heads: ["Feature", "Online", "In person"],
      rows: [
        ["Flexible timing", "High", "Limited"],
        ["Talking to the teacher", "In the course forum", "In class"],
      ],
    },
  });

  return (
    <Table containerClassName="max-w-xl">
      <TableCaption>{t.caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {t.heads.map((head) => (
            <TableHead key={head}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {t.rows.map((row) => (
          <TableRow key={row[0]}>
            {row.map((cell) => (
              <TableCell key={cell}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
