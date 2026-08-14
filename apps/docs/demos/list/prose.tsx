import { Blockquote, List, ListItem } from "@avero/react";

export default function ListProseDemo() {
  return (
    <div className="max-w-xl text-base leading-8 text-gray-700">
      <p>گذراندن یک دوره آنلاین معمولاً چند مرحله دارد:</p>
      <List ordered>
        <ListItem>انتخاب دوره و ثبت‌نام</ListItem>
        <ListItem>دیدن جلسه‌ها و انجام تمرین‌ها</ListItem>
        <ListItem>تحویل پروژه پایانی</ListItem>
      </List>
      <List>
        <ListItem>هر هفته زمان ثابتی برای یادگیری کنار بگذارید.</ListItem>
        <ListItem>پرسش‌هایتان را در انجمن دوره مطرح کنید.</ListItem>
      </List>
      <Blockquote>
        <strong className="font-bold text-gray-900">
          یادگیری یعنی تمرین، نه فقط تماشای ویدیو.
        </strong>{" "}
        هرچه زودتر آموخته‌ها را به کار بگیرید، ماندگارتر می‌شوند.
      </Blockquote>
    </div>
  );
}
