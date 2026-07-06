import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@avero/react";

export default function TableArticleDemo() {
  return (
    <Table containerClassName="max-w-xl">
      <TableCaption>مقایسه فریلنسری و استخدام تمام‌وقت</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ویژگی</TableHead>
          <TableHead>فریلنسری</TableHead>
          <TableHead>استخدام</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>انعطاف زمانی</TableCell>
          <TableCell>بالا</TableCell>
          <TableCell>محدود</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ثبات درآمد</TableCell>
          <TableCell>متغیر</TableCell>
          <TableCell>ثابت</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
