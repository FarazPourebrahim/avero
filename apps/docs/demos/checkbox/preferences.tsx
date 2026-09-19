"use client";

import { Checkbox } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

const TOPIC_IDS = ["design", "data", "web"] as const;

export default function CheckboxPreferencesDemo() {
  const [selected, setSelected] = useState<string[]>(["design"]);
  const t = useCopy({
    fa: {
      all: "همه موضوع‌ها",
      topics: { design: "طراحی رابط کاربری", data: "تحلیل داده", web: "برنامه‌نویسی وب" },
    },
    en: {
      all: "All topics",
      topics: { design: "UI design", data: "Data analysis", web: "Web development" },
    },
  });

  const allState =
    selected.length === TOPIC_IDS.length ? true : selected.length === 0 ? false : "indeterminate";

  const toggle = (id: string, checked: boolean) =>
    setSelected((current) => (checked ? [...current, id] : current.filter((item) => item !== id)));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox
          id="all-topics"
          checked={allState}
          onCheckedChange={(checked) => setSelected(checked === true ? [...TOPIC_IDS] : [])}
        />
        <label htmlFor="all-topics" className="text-sm font-medium text-gray-800">
          {t.all}
        </label>
      </div>
      <div className="flex flex-col gap-3 ps-7">
        {TOPIC_IDS.map((id) => (
          <div key={id} className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={selected.includes(id)}
              onCheckedChange={(checked) => toggle(id, checked === true)}
            />
            <label htmlFor={id} className="text-sm text-gray-700">
              {t.topics[id]}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
