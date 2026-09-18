import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionLink,
  AccordionTrigger,
} from "@averoui/react";

export default function AccordionFooterDemo() {
  return (
    <div className="w-full max-w-md">
      <Accordion type="single" collapsible defaultValue="about">
        <AccordionItem value="about">
          <AccordionTrigger>درباره ما</AccordionTrigger>
          <AccordionContent>
            <AccordionLink href="#rules">قوانین و مقررات</AccordionLink>
            <AccordionLink href="#contact">تماس با ما</AccordionLink>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="categories">
          <AccordionTrigger>دسته‌بندی دوره‌ها</AccordionTrigger>
          <AccordionContent>
            <AccordionLink href="#design">طراحی رابط کاربری</AccordionLink>
            <AccordionLink href="#data">تحلیل داده</AccordionLink>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="quick">
          <AccordionTrigger>دسترسی سریع</AccordionTrigger>
          <AccordionContent>
            <AccordionLink href="#home">صفحه اصلی</AccordionLink>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
