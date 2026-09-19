"use client";

import {
  Avatar,
  Button,
  IconButton,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@averoui/react";
import { Bell } from "lucide-react";
import { useCopy } from "../copy";

export default function PopoverNotificationsDemo() {
  const t = useCopy({
    fa: {
      title: "اعلان‌ها",
      trigger: (unread: number) => `اعلان‌ها، ${unread} خوانده‌نشده`,
      viewAll: "مشاهده همه اعلان‌ها",
      items: [
        { id: 1, name: "سارا محمدی", text: "به دیدگاه شما پاسخ داد.", time: "۵ دقیقه پیش" },
        { id: 2, name: "علی رضایی", text: "در دوره شما ثبت‌نام کرد.", time: "۱ ساعت پیش" },
        { id: 3, name: "مریم احمدی", text: "گواهی دوره شما صادر شد.", time: "دیروز" },
      ],
    },
    en: {
      title: "Notifications",
      trigger: (unread: number) => `Notifications, ${unread} unread`,
      viewAll: "See all notifications",
      items: [
        { id: 1, name: "Sara Mohammadi", text: "replied to your comment.", time: "5 minutes ago" },
        { id: 2, name: "Ali Rezaei", text: "enrolled in your course.", time: "1 hour ago" },
        {
          id: 3,
          name: "Maryam Ahmadi",
          text: "your course certificate is ready.",
          time: "Yesterday",
        },
      ],
    },
  });

  const unreadIds = [1, 2];
  const unread = unreadIds.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton label={t.trigger(unread)} className="relative">
          <Bell aria-hidden className="size-5" />
          <span aria-hidden className="absolute end-1.5 top-1.5 size-2 rounded-full bg-red-500" />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="end" aria-labelledby="notifications-title" className="w-80 p-0">
        <p
          id="notifications-title"
          className="border-b border-gray-100 px-4 py-3 font-bold text-gray-900"
        >
          {t.title}
        </p>
        <ul className="flex flex-col py-1">
          {t.items.map((item) => (
            <li
              key={item.id}
              data-unread={unreadIds.includes(item.id)}
              className="flex items-start gap-3 px-4 py-3 data-[unread=true]:bg-blue-50/50"
            >
              <Avatar name={item.name} size="sm" />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm leading-6 text-gray-700">
                  <span className="font-bold text-gray-900">{item.name}</span> {item.text}
                </p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-100 p-2">
          <PopoverClose asChild>
            <Button variant="ghost" size="sm" className="w-full">
              {t.viewAll}
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
