import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { DirectionSwitch } from "@/components/DirectionSwitch";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
      // Sets the direction and locale of every demo on the site; the choice persists across pages.
      children: <DirectionSwitch className="ms-auto me-2" />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
