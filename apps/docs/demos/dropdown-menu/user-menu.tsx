"use client";

import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@averoui/react";
import { Award, LogOut, Settings, User } from "lucide-react";

export default function DropdownMenuUserMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="منوی حساب کاربری"
          className="focus-visible:ring-primary/40 rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
        >
          <Avatar name="سارا محمدی" size="lg" className="rounded-2xl" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>سارا محمدی</DropdownMenuLabel>
        <DropdownMenuItem>
          <User aria-hidden />
          مشاهده پروفایل
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Award aria-hidden />
          گواهی‌های من
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings aria-hidden />
          تنظیمات
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="danger">
          <LogOut aria-hidden />
          خروج از حساب
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
