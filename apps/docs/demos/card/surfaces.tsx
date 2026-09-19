"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@averoui/react";
import { Layers, MessageSquare, Target } from "lucide-react";
import { useCopy } from "../copy";

export default function CardSurfacesDemo() {
  const t = useCopy({
    fa: {
      comments: "دیدگاه‌ها (۰)",
      noComments: "هنوز دیدگاهی ثبت نشده است.",
      suggested: "دوره‌های پیشنهادی",
      courseCount: "۵ دوره",
      sampleCourse: "مبانی تحلیل داده",
      topics: "موضوع‌ها و مهارت‌ها",
      skills: "Figma · طراحی رابط کاربری",
      price: "از ۴٬۵۰۰٬۰۰۰ تومان",
      likes: "۰ پسند",
    },
    en: {
      comments: "Comments (0)",
      noComments: "No comments yet.",
      suggested: "Suggested courses",
      courseCount: "5 courses",
      sampleCourse: "Data analysis basics",
      topics: "Topics and skills",
      skills: "Figma · UI design",
      price: "From 4,500,000 toman",
      likes: "0 likes",
    },
  });

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      <Card elevation="xs">
        <CardHeader className="mb-4">
          <CardTitle size="lg">
            <MessageSquare />
            {t.comments}
          </CardTitle>
        </CardHeader>
        <p className="text-xs text-slate-400">{t.noComments}</p>
      </Card>
      <Card variant="flat" padding="sm">
        <CardHeader className="mb-3 sm:mb-4">
          <CardTitle size="sm">
            <Target className="size-4" />
            {t.suggested}
          </CardTitle>
          <span className="text-2xs text-gray-400 sm:text-xs">{t.courseCount}</span>
        </CardHeader>
        <p className="text-xs text-gray-500">{t.sampleCourse}</p>
      </Card>
      <Card elevation="sm">
        <CardTitle className="mb-4">
          <Layers className="text-blue-600" />
          {t.topics}
        </CardTitle>
        <p className="text-sm text-slate-600">{t.skills}</p>
      </Card>
      <Card variant="glass" padding="none" className="p-3">
        <div className="h-24 rounded-lg bg-gray-100" />
        <CardFooter className="mt-4">
          <span className="text-sm-plus">{t.price}</span>
          <span className="text-xs text-gray-500">{t.likes}</span>
        </CardFooter>
      </Card>
    </div>
  );
}
