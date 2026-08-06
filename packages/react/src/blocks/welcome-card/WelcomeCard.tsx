"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { formatMessage } from "../../i18n/dictionaries.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `WelcomeCard`. It also accepts every native `<div>` attribute. */
export type WelcomeCardOwnProps = {
  /** Who is being greeted. Filled into the `greeting` dictionary string. */
  name: string;
  /** The whole greeting line, replacing the dictionary's. */
  greeting?: ReactNode;
  /** Line under the greeting. @defaultValue the `welcomeMessage` dictionary string */
  children?: ReactNode;
};

export type WelcomeCardProps = Omit<HTMLAttributes<HTMLDivElement>, keyof WelcomeCardOwnProps> &
  WelcomeCardOwnProps;

/**
 * Dashboard greeting card (B-18, R-02): the sidebar's welcome, a bold line naming the person
 * above a quieter one.
 *
 * The reference's surface carries the broken `shadow-[0_0_20px_0_(--shadow)]` (defect R-02),
 * which renders nothing; this ships the visually equivalent `shadow-brand-soft`.
 */
export const WelcomeCard = forwardRef<HTMLDivElement, WelcomeCardProps>(function WelcomeCard(
  { name, greeting, children, className, ...props },
  ref,
) {
  const { dictionary } = useAvero();

  return (
    <div
      ref={ref}
      data-slot="welcome-card"
      className={cn(
        "text-md shadow-brand-soft flex w-full flex-col gap-2.5 rounded-2xl bg-white px-4 py-6 font-normal text-gray-500",
        className,
      )}
      {...props}
    >
      <span data-slot="welcome-card-greeting" className="font-semibold text-gray-900">
        {greeting ?? formatMessage(dictionary.greeting, { name })}
      </span>
      <span>{children ?? dictionary.welcomeMessage}</span>
    </div>
  );
});

WelcomeCard.displayName = "WelcomeCard";
