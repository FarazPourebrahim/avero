import { Blockquote, List, ListItem } from "@avero/react";

export default function ListProseDemo() {
  return (
    <div className="max-w-xl text-base leading-8 text-gray-700">
      <p>فرآیند انجام یک پروژه فریلنسری معمولاً شامل چند مرحله است:</p>
      <List ordered>
        <ListItem>ثبت یا انتشار پروژه توسط کارفرما</ListItem>
        <ListItem>بررسی پروژه توسط فریلنسر</ListItem>
        <ListItem>ارسال پیشنهاد همکاری</ListItem>
      </List>
      <List>
        <ListItem>مهارت تخصصی قابل ارائه دارند.</ListItem>
        <ListItem>از کار مستقل لذت می‌برند.</ListItem>
      </List>
      <Blockquote>
        <strong className="font-bold text-gray-900">
          فریلنسری یعنی فروش مهارت، نه صرفاً فروش زمان.
        </strong>{" "}
        هرچه تخصص و نمونه‌کار بیشتری داشته باشید، شانس شما بیشتر است.
      </Blockquote>
    </div>
  );
}
