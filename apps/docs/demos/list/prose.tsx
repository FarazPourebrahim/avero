"use client";

import { Blockquote, List, ListItem } from "@averoui/react";
import { useCopy } from "../copy";

export default function ListProseDemo() {
  const t = useCopy({
    fa: {
      intro: "گذراندن یک دوره آنلاین معمولاً چند مرحله دارد:",
      steps: ["انتخاب دوره و ثبت‌نام", "دیدن جلسه‌ها و انجام تمرین‌ها", "تحویل پروژه پایانی"],
      tips: [
        "هر هفته زمان ثابتی برای یادگیری کنار بگذارید.",
        "پرسش‌هایتان را در انجمن دوره مطرح کنید.",
      ],
      quoteStrong: "یادگیری یعنی تمرین، نه فقط تماشای ویدیو.",
      quoteRest: "هرچه زودتر آموخته‌ها را به کار بگیرید، ماندگارتر می‌شوند.",
    },
    en: {
      intro: "Working through an online course usually takes a few steps:",
      steps: [
        "Pick a course and sign up",
        "Watch the sessions and do the exercises",
        "Hand in the final project",
      ],
      tips: [
        "Set aside the same time each week to study.",
        "Ask your questions in the course forum.",
      ],
      quoteStrong: "Learning means practising, not just watching video.",
      quoteRest: "The sooner you put it to use, the longer it stays with you.",
    },
  });

  return (
    <div className="max-w-xl text-base leading-8 text-gray-700">
      <p>{t.intro}</p>
      <List ordered>
        {t.steps.map((step) => (
          <ListItem key={step}>{step}</ListItem>
        ))}
      </List>
      <List>
        {t.tips.map((tip) => (
          <ListItem key={tip}>{tip}</ListItem>
        ))}
      </List>
      <Blockquote>
        <strong className="font-bold text-gray-900">{t.quoteStrong}</strong> {t.quoteRest}
      </Blockquote>
    </div>
  );
}
