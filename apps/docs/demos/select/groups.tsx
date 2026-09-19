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
} from "@averoui/react";
import { useCopy } from "../copy";

export default function SelectGroupsDemo() {
  const t = useCopy({
    fa: {
      label: "دوره",
      design: "طراحی",
      ui: "طراحی رابط کاربری",
      motion: "موشن گرافیک",
      code: "برنامه‌نویسی",
      web: "برنامه‌نویسی وب",
      python: "پایتون مقدماتی",
    },
    en: {
      label: "Course",
      design: "Design",
      ui: "UI design",
      motion: "Motion graphics",
      code: "Development",
      web: "Web development",
      python: "Python basics",
    },
  });

  return (
    <div className="w-full max-w-sm">
      <Select defaultValue="ui">
        <SelectTrigger aria-label={t.label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t.design}</SelectLabel>
            <SelectItem value="ui">{t.ui}</SelectItem>
            <SelectItem value="motion">{t.motion}</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>{t.code}</SelectLabel>
            <SelectItem value="web">{t.web}</SelectItem>
            <SelectItem value="python">{t.python}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
