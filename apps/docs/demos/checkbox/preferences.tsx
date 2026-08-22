"use client";

import { Checkbox } from "@avero/react";
import { useState } from "react";

const TOPICS = [
  { id: "design", label: "طراحی رابط کاربری" },
  { id: "data", label: "تحلیل داده" },
  { id: "web", label: "برنامه‌نویسی وب" },
];

export default function CheckboxPreferencesDemo() {
  const [selected, setSelected] = useState<string[]>(["design"]);
  const allState =
    selected.length === TOPICS.length ? true : selected.length === 0 ? false : "indeterminate";

  const toggle = (id: string, checked: boolean) =>
    setSelected((current) => (checked ? [...current, id] : current.filter((item) => item !== id)));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox
          id="all-topics"
          checked={allState}
          onCheckedChange={(checked) =>
            setSelected(checked === true ? TOPICS.map((topic) => topic.id) : [])
          }
        />
        <label htmlFor="all-topics" className="text-sm font-medium text-gray-800">
          همه موضوع‌ها
        </label>
      </div>
      <div className="flex flex-col gap-3 ps-7">
        {TOPICS.map((topic) => (
          <div key={topic.id} className="flex items-center gap-2">
            <Checkbox
              id={topic.id}
              checked={selected.includes(topic.id)}
              onCheckedChange={(checked) => toggle(topic.id, checked === true)}
            />
            <label htmlFor={topic.id} className="text-sm text-gray-700">
              {topic.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
