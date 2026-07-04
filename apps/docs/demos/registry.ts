import type { ComponentType } from "react";
import AccordionFooter from "./accordion/footer";
import AvatarFallback from "./avatar/fallback";
import AvatarUsages from "./avatar/usages";
import BadgeHighlights from "./badge/highlights";
import BadgeOutline from "./badge/outline";
import BadgeStatus from "./badge/status";
import BackLinkUsages from "./back-link/usages";
import ButtonAsLink from "./button/as-link";
import ButtonPrimary from "./button/primary";
import ButtonSizes from "./button/sizes";
import ButtonStates from "./button/states";
import ButtonTones from "./button/tones";
import ButtonVariants from "./button/variants";
import ChipLinks from "./chip/links";
import ChipStatic from "./chip/static";
import DividerBasic from "./divider/basic";
import IconButtonChrome from "./icon-button/chrome";
import IconButtonShare from "./icon-button/share";
import IconButtonSocial from "./icon-button/social";
import IconTileSizes from "./icon-tile/sizes";
import IconTileVariants from "./icon-tile/variants";
import IconsGallery from "./icons/gallery";
import ImageCardAndFallback from "./image/card-and-fallback";
import ImageCover from "./image/cover";
import LinkInline from "./link/inline";
import LinkNavigation from "./link/navigation";
import PillTabsProfile from "./pill-tabs/profile";
import ProgressCapacity from "./progress/capacity";
import ProgressVariants from "./progress/variants";
import SegmentedControlAnalytics from "./segmented-control/analytics";
import SidebarNavDashboard from "./sidebar-nav/dashboard";
import TableOfContentsArticle from "./table-of-contents/article";
import ToggleChipGroupMetrics from "./toggle-chip-group/metrics";
import TypographyHeadings from "./typography/headings";
import TypographyText from "./typography/text";
import VisuallyHiddenLiveRegion from "./visually-hidden/live-region";

/** Every live demo, keyed by its file path under `demos/` (without extension). */
export const demos = {
  "accordion/footer": AccordionFooter,
  "table-of-contents/article": TableOfContentsArticle,
  "avatar/usages": AvatarUsages,
  "avatar/fallback": AvatarFallback,
  "badge/status": BadgeStatus,
  "badge/outline": BadgeOutline,
  "badge/highlights": BadgeHighlights,
  "back-link/usages": BackLinkUsages,
  "button/primary": ButtonPrimary,
  "button/variants": ButtonVariants,
  "button/tones": ButtonTones,
  "button/sizes": ButtonSizes,
  "button/states": ButtonStates,
  "button/as-link": ButtonAsLink,
  "chip/static": ChipStatic,
  "chip/links": ChipLinks,
  "divider/basic": DividerBasic,
  "icon-button/chrome": IconButtonChrome,
  "icon-button/share": IconButtonShare,
  "icon-button/social": IconButtonSocial,
  "icon-tile/variants": IconTileVariants,
  "icon-tile/sizes": IconTileSizes,
  "icons/gallery": IconsGallery,
  "image/cover": ImageCover,
  "image/card-and-fallback": ImageCardAndFallback,
  "link/navigation": LinkNavigation,
  "link/inline": LinkInline,
  "progress/capacity": ProgressCapacity,
  "progress/variants": ProgressVariants,
  "pill-tabs/profile": PillTabsProfile,
  "segmented-control/analytics": SegmentedControlAnalytics,
  "sidebar-nav/dashboard": SidebarNavDashboard,
  "toggle-chip-group/metrics": ToggleChipGroupMetrics,
  "typography/headings": TypographyHeadings,
  "typography/text": TypographyText,
  "visually-hidden/live-region": VisuallyHiddenLiveRegion,
} satisfies Record<string, ComponentType>;

export type DemoName = keyof typeof demos;
