import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@avero/react";

const QUESTIONS = [
  {
    value: "refund",
    question: "امکان بازگشت وجه هست؟",
    answer: "تا هفت روز پس از خرید، اگر کمتر از یک‌سوم دوره را دیده باشید، وجه بازگردانده می‌شود.",
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
];

export default function AccordionFaqDemo() {
  return (
    <div className="w-full max-w-md">
      <Accordion type="multiple" defaultValue={["refund"]}>
        {QUESTIONS.map(({ value, question, answer }) => (
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
