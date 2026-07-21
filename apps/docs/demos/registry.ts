import type { ComponentType } from "react";
import AccordionFooter from "./accordion/footer";
import ActivityHeatmapYear from "./activity-heatmap/year";
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
import CapacityMeterUsages from "./capacity-meter/usages";
import CardSurfaces from "./card/surfaces";
import CoverHeaderProfile from "./cover-header/profile";
import CarouselPill from "./carousel/pill";
import CarouselRelatedProjects from "./carousel/related-projects";
import ChartsAnalytics from "./charts/analytics";
import ChartsTrend from "./charts/trend";
import ChipLinks from "./chip/links";
import ContainerSizes from "./container/sizes";
import DashboardShellFreelancer from "./dashboard-shell/freelancer";
import ChipStatic from "./chip/static";
import DisabledOverlayFullCard from "./disabled-overlay/full-card";
import DividerBasic from "./divider/basic";
import DrawerMenu from "./drawer/menu";
import EditorBasic from "./editor/basic";
import EmptyStateVariants from "./empty-state/variants";
import FeatureCardActions from "./feature-card/actions";
import FormActionsCommentForm from "./form-actions/comment-form";
import FeatureCardGrid from "./feature-card/grid";
import IconButtonChrome from "./icon-button/chrome";
import IconButtonShare from "./icon-button/share";
import IconButtonSocial from "./icon-button/social";
import IconTileSizes from "./icon-tile/sizes";
import IconTileVariants from "./icon-tile/variants";
import IconsGallery from "./icons/gallery";
import InputVariants from "./input/variants";
import ImageCardAndFallback from "./image/card-and-fallback";
import ImageCover from "./image/cover";
import LayoutsTemplates from "./layouts/templates";
import LinkInline from "./link/inline";
import ListingCardService from "./listing-card/service";
import LinkNavigation from "./link/navigation";
import ListProse from "./list/prose";
import MatchScoreSuggested from "./match-score/suggested";
import MetaArticle from "./meta/article";
import MetaContacts from "./meta/contacts";
import NativeSelectSort from "./native-select/sort";
import PillTabsProfile from "./pill-tabs/profile";
import PriceTagVariants from "./price-tag/variants";
import ProgressCapacity from "./progress/capacity";
import ProgressVariants from "./progress/variants";
import RatingUsages from "./rating/usages";
import RichContentArticle from "./rich-content/article";
import RichContentSanitized from "./rich-content/sanitized";
import SectionHeaderDarkBanner from "./section-header/dark-banner";
import SelectFilter from "./select/filter";
import SiteFooterDefault from "./site-footer/default";
import SiteHeaderDefault from "./site-header/default";
import SectionHeaderVariants from "./section-header/variants";
import SegmentedControlAnalytics from "./segmented-control/analytics";
import SidebarNavDashboard from "./sidebar-nav/dashboard";
import StatsAchievements from "./stats/achievements";
import StatsDashboard from "./stats/dashboard";
import StatsProfile from "./stats/profile";
import TableArticle from "./table/article";
import TextareaVariants from "./textarea/variants";
import TableOfContentsArticle from "./table-of-contents/article";
import ToggleChipGroupMetrics from "./toggle-chip-group/metrics";
import TypographyHeadings from "./typography/headings";
import TypographyText from "./typography/text";
import VisuallyHiddenLiveRegion from "./visually-hidden/live-region";
import ZoomFrameGallery from "./zoom-frame/gallery";

/** Every live demo, keyed by its file path under `demos/` (without extension). */
export const demos = {
  "accordion/footer": AccordionFooter,
  "card/surfaces": CardSurfaces,
  "feature-card/grid": FeatureCardGrid,
  "feature-card/actions": FeatureCardActions,
  "section-header/variants": SectionHeaderVariants,
  "section-header/dark-banner": SectionHeaderDarkBanner,
  "stats/dashboard": StatsDashboard,
  "stats/profile": StatsProfile,
  "stats/achievements": StatsAchievements,
  "table/article": TableArticle,
  "list/prose": ListProse,
  "listing-card/service": ListingCardService,
  "meta/article": MetaArticle,
  "meta/contacts": MetaContacts,
  "price-tag/variants": PriceTagVariants,
  "rating/usages": RatingUsages,
  "capacity-meter/usages": CapacityMeterUsages,
  "match-score/suggested": MatchScoreSuggested,
  "zoom-frame/gallery": ZoomFrameGallery,
  "cover-header/profile": CoverHeaderProfile,
  "rich-content/article": RichContentArticle,
  "rich-content/sanitized": RichContentSanitized,
  "activity-heatmap/year": ActivityHeatmapYear,
  "input/variants": InputVariants,
  "textarea/variants": TextareaVariants,
  "native-select/sort": NativeSelectSort,
  "select/filter": SelectFilter,
  "form-actions/comment-form": FormActionsCommentForm,
  "charts/analytics": ChartsAnalytics,
  "charts/trend": ChartsTrend,
  "editor/basic": EditorBasic,
  "container/sizes": ContainerSizes,
  "site-header/default": SiteHeaderDefault,
  "site-footer/default": SiteFooterDefault,
  "dashboard-shell/freelancer": DashboardShellFreelancer,
  "layouts/templates": LayoutsTemplates,
  "drawer/menu": DrawerMenu,
  "empty-state/variants": EmptyStateVariants,
  "disabled-overlay/full-card": DisabledOverlayFullCard,
  "carousel/related-projects": CarouselRelatedProjects,
  "carousel/pill": CarouselPill,
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
