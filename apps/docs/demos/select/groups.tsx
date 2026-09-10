"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@avero/react";

export default function SelectGroupsDemo() {
  return (
    <div className="w-full max-w-sm">
      <Select defaultValue="ui">
        <SelectTrigger aria-label="دوره">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>طراحی</SelectLabel>
            <SelectItem value="ui">طراحی رابط کاربری</SelectItem>
            <SelectItem value="motion">موشن گرافیک</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>برنامه‌نویسی</SelectLabel>
            <SelectItem value="web">برنامه‌نویسی وب</SelectItem>
            <SelectItem value="python">پایتون مقدماتی</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
