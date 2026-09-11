import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@avero/react";

const SESSIONS = [
  ["۱", "آشنایی با داده", "۴۵ دقیقه", "تمرین ۱", "۲۴ شهریور", "آنلاین"],
  ["۲", "پاک‌سازی داده", "۵۲ دقیقه", "تمرین ۲", "۳۱ شهریور", "آنلاین"],
  ["۳", "نمودارها", "۳۸ دقیقه", "پروژه کوچک", "۷ مهر", "حضوری"],
];

export default function TableScrollDemo() {
  return (
    <Table containerClassName="max-w-md">
      <TableHeader>
        <TableRow>
          {["جلسه", "عنوان", "مدت", "تکلیف", "تاریخ", "نحوه برگزاری"].map((head) => (
            <TableHead key={head} className="whitespace-nowrap">
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {SESSIONS.map((row) => (
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
