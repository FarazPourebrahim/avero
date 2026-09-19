"use client";

import { ActionTile } from "@averoui/react";
import { Award, BookOpen, CalendarPlus, Shield, TrendingUp, Zap } from "lucide-react";
import { useCopy } from "../copy";

const icon = "size-4 sm:size-5";

export default function ActionTilesDemo() {
  const t = useCopy({
    fa: {
      addCourse: "افزودن دوره",
      addSession: "افزودن جلسه",
      newExercise: "ساخت تمرین",
      takeTest: "شرکت در آزمون",
      upgrade: "ارتقای اشتراک",
      editProfile: "ویرایش پروفایل",
    },
    en: {
      addCourse: "Add a course",
      addSession: "Add a session",
      newExercise: "Create an exercise",
      takeTest: "Take a test",
      upgrade: "Upgrade plan",
      editProfile: "Edit profile",
    },
  });

  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
      <ActionTile tone="blue" icon={<BookOpen className={icon} />}>
        {t.addCourse}
      </ActionTile>
      <ActionTile tone="purple" icon={<CalendarPlus className={icon} />}>
        {t.addSession}
      </ActionTile>
      <ActionTile tone="amber" icon={<Zap className={icon} />}>
        {t.newExercise}
      </ActionTile>
      <ActionTile tone="emerald" icon={<Award className={icon} />}>
        {t.takeTest}
      </ActionTile>
      <ActionTile tone="rose" icon={<TrendingUp className={icon} />}>
        {t.upgrade}
      </ActionTile>
      <ActionTile tone="slate" icon={<Shield className={icon} />}>
        {t.editProfile}
      </ActionTile>
    </div>
  );
}
