"use client";

import { List, ListItem } from "@averoui/react";
import { useCopy } from "../copy";

export default function ListNestedDemo() {
  const t = useCopy({
    fa: {
      before: "پیش از شروع",
      install: "نصب ابزارها",
      account: "ساختن حساب کاربری",
      week: "هفته اول",
      watch: "تماشای سه جلسه نخست",
      exercise: "تحویل تمرین ۱",
    },
    en: {
      before: "Before you start",
      install: "Install the tools",
      account: "Create an account",
      week: "Week one",
      watch: "Watch the first three sessions",
      exercise: "Hand in exercise 1",
    },
  });

  return (
    <div className="max-w-xl text-base leading-8 text-gray-700">
      <List ordered>
        <ListItem>
          {t.before}
          <List>
            <ListItem>{t.install}</ListItem>
            <ListItem>{t.account}</ListItem>
          </List>
        </ListItem>
        <ListItem>
          {t.week}
          <List>
            <ListItem>{t.watch}</ListItem>
            <ListItem>{t.exercise}</ListItem>
          </List>
        </ListItem>
      </List>
    </div>
  );
}
