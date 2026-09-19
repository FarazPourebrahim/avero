"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@averoui/react";
import { useCopy } from "../copy";

export default function AccordionFaqDemo() {
  const t = useCopy({
    fa: {
      questions: [
        {
          value: "refund",
          question: "امکان بازگشت وجه هست؟",
          answer:
            "تا هفت روز پس از خرید، اگر کمتر از یک‌سوم دوره را دیده باشید، وجه بازگردانده می‌شود.",
        },
        {
          value: "access",
          question: "دسترسی به دوره تا کی است؟",
          answer: "دسترسی دائمی است و جلسه‌های به‌روزشده هم به همان دوره اضافه می‌شوند.",
        },
        {
          value: "certificate",
          question: "گواهی پایان دوره داده می‌شود؟",
          answer: "پس از تحویل پروژه پایانی، گواهی با نام شما صادر می‌شود.",
        },
      ],
    },
    en: {
      questions: [
        {
          value: "refund",
          question: "Can I get a refund?",
          answer:
            "Within seven days of buying, if you have watched less than a third of the course, you get your money back.",
        },
        {
          value: "access",
          question: "How long do I keep access?",
          answer: "Access is permanent, and updated sessions are added to the same course.",
        },
        {
          value: "certificate",
          question: "Is there a certificate?",
          answer: "Once you hand in the final project, a certificate is issued in your name.",
        },
      ],
    },
  });

  return (
    <div className="w-full max-w-md">
      <Accordion type="multiple" defaultValue={["refund"]}>
        {t.questions.map(({ value, question, answer }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>
              <p className="px-8 py-5 text-sm leading-7 text-gray-600">{answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
