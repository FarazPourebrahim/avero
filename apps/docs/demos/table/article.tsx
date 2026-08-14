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
      <TableCaption>مقایسه دوره آنلاین و حضوری</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ویژگی</TableHead>
          <TableHead>آنلاین</TableHead>
          <TableHead>حضوری</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>انعطاف زمانی</TableCell>
          <TableCell>بالا</TableCell>
          <TableCell>محدود</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>گفت‌وگو با مدرس</TableCell>
          <TableCell>در انجمن دوره</TableCell>
          <TableCell>سر کلاس</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
