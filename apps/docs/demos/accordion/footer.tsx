"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionLink,
  AccordionTrigger,
} from "@averoui/react";
import { useCopy } from "../copy";

export default function AccordionFooterDemo() {
  const t = useCopy({
    fa: {
      about: "درباره ما",
      rules: "قوانین و مقررات",
      contact: "تماس با ما",
      categories: "دسته‌بندی دوره‌ها",
      design: "طراحی رابط کاربری",
      data: "تحلیل داده",
      quick: "دسترسی سریع",
      home: "صفحه اصلی",
    },
    en: {
      about: "About us",
      rules: "Terms and conditions",
      contact: "Contact us",
      categories: "Course categories",
      design: "UI design",
      data: "Data analysis",
      quick: "Quick links",
      home: "Home",
    },
  });

  return (
    <div className="w-full max-w-md">
      <Accordion type="single" collapsible defaultValue="about">
        <AccordionItem value="about">
          <AccordionTrigger>{t.about}</AccordionTrigger>
          <AccordionContent>
            <AccordionLink href="#rules">{t.rules}</AccordionLink>
            <AccordionLink href="#contact">{t.contact}</AccordionLink>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="categories">
          <AccordionTrigger>{t.categories}</AccordionTrigger>
          <AccordionContent>
            <AccordionLink href="#design">{t.design}</AccordionLink>
            <AccordionLink href="#data">{t.data}</AccordionLink>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="quick">
          <AccordionTrigger>{t.quick}</AccordionTrigger>
          <AccordionContent>
            <AccordionLink href="#home">{t.home}</AccordionLink>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
