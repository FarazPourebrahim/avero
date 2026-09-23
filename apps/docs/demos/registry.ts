import type { ComponentType } from "react";
import AccordionFooter from "./accordion/footer";
import AlertTones from "./alert/tones";
import AchievementsPanelRank from "./achievements-panel/rank";
import ActivityHeatmapYear from "./activity-heatmap/year";
import AuthorCardSidebar from "./author-card/sidebar";
import ArticleHeaderBlogPost from "./article-header/blog-post";
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
import CarouselRelatedCourses from "./carousel/related-courses";
import CategoryLinksRelated from "./category-links/related";
import ChartsAnalytics from "./charts/analytics";
import ChartsTrend from "./charts/trend";
import ChipLinks from "./chip/links";
import ComboboxCategories from "./combobox/categories";
import DatePickerBooking from "./date-picker/booking";
import InfiniteScrollFeed from "./infinite-scroll/feed";
import PaginationResults from "./pagination/results";
import ConfirmDialogDeleteCourse from "./confirm-dialog/delete-course";
import DialogEditProfile from "./dialog/edit-profile";
import FileInputAttachments from "./file-input/attachments";
import PriceInputBudget from "./price-input/budget";
import TagInputSkills from "./tag-input/skills";
import CommentSectionArticle from "./comment-section/article";
import CommentSectionService from "./comment-section/service";
import ContactMethodsDirect from "./contact-methods/direct";
import ContainerSizes from "./container/sizes";
import CtaBannerMission from "./cta-banner/mission";
import DashboardShellLearner from "./dashboard-shell/learner";
import ChipStatic from "./chip/static";
import DisabledOverlayFullCard from "./disabled-overlay/full-card";
import DividerBasic from "./divider/basic";
import DrawerMenu from "./drawer/menu";
import DropdownMenuUserMenu from "./dropdown-menu/user-menu";
import LightboxGallery from "./lightbox/gallery";
import PopoverNotifications from "./popover/notifications";
import ToastTones from "./toast/tones";
import TooltipShareActions from "./tooltip/share-actions";
import EditorBasic from "./editor/basic";
import EditorWithToolbar from "./editor/with-toolbar";
import EmptyStateVariants from "./empty-state/variants";
import FeatureCardActions from "./feature-card/actions";
import FeatureGridWhyUs from "./feature-grid/why-us";
import FilterPanelListing from "./filter-panel/listing";
import FormActionsCommentForm from "./form-actions/comment-form";
import FeatureCardGrid from "./feature-card/grid";
import CheckboxCards from "./checkbox/cards";
import CheckboxPreferences from "./checkbox/preferences";
import FieldProfileForm from "./field/profile-form";
import OtpInputVerify from "./otp-input/verify";
import RadioGroupDelivery from "./radio-group/delivery";
import SwitchSettings from "./switch/settings";
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
import ListingCardCourse from "./listing-card/course";
import LinkNavigation from "./link/navigation";
import ListProse from "./list/prose";
import MatchScoreSuggested from "./match-score/suggested";
import MetaArticle from "./meta/article";
import MetaContacts from "./meta/contacts";
import OpportunityCardRelated from "./opportunity-card/related";
import PillTabsProfile from "./pill-tabs/profile";
import PostListItemRelated from "./post-list-item/related";
import PriceCardBase from "./price-card/base";
import PriceTagVariants from "./price-tag/variants";
import ProgressCapacity from "./progress/capacity";
import ProgressVariants from "./progress/variants";
import PromoBannerSidebar from "./promo-banner/sidebar";
import ProfileHeaderInstructor from "./profile-header/instructor";
import ProviderCardInstructor from "./provider-card/instructor";
import QuickActionsDashboard from "./quick-actions/dashboard";
import RatingUsages from "./rating/usages";
import ReactionBarCourse from "./reaction-bar/course";
import RelatedListCourses from "./related-list/courses";
import ReportVariants from "./report/variants";
import ResponsiveBannerCampaign from "./responsive-banner/campaign";
import RichContentArticle from "./rich-content/article";
import RichContentSanitized from "./rich-content/sanitized";
import SectionHeaderDarkBanner from "./section-header/dark-banner";
import SelectFilter from "./select/filter";
import ShowcaseCardShowcase from "./showcase-card/showcase";
import SiteFooterDefault from "./site-footer/default";
import SiteHeaderDefault from "./site-header/default";
import SplitHeroAbout from "./split-hero/about";
import SectionHeaderVariants from "./section-header/variants";
import SegmentedControlAnalytics from "./segmented-control/analytics";
import ShareBarIcons from "./share-bar/icons";
import ShareBarLabelled from "./share-bar/labelled";
import SidebarNavDashboard from "./sidebar-nav/dashboard";
import StatsAchievements from "./stats/achievements";
import StatsDashboard from "./stats/dashboard";
import StatsProfile from "./stats/profile";
import SuggestionItemDashboard from "./suggestion-item/dashboard";
import TableArticle from "./table/article";
import TextareaVariants from "./textarea/variants";
import InputPrimary from "./input/primary";
import TextareaPrimary from "./textarea/primary";
import ActivityHeatmapEmpty from "./activity-heatmap/empty";
import ActivityHeatmapScale from "./activity-heatmap/scale";
import CardElevation from "./card/elevation";
import CardInteractive from "./card/interactive";
import CardPrimary from "./card/primary";
import CardVariants from "./card/variants";
import CapacityMeterFull from "./capacity-meter/full";
import CoverHeaderDefaults from "./cover-header/defaults";
import ListNested from "./list/nested";
import MatchScoreValues from "./match-score/values";
import PriceTagCurrency from "./price-tag/currency";
import PriceTagDisplay from "./price-tag/display";
import RatingPrecision from "./rating/precision";
import RatingSizes from "./rating/sizes";
import ResponsiveBannerBreakpoints from "./responsive-banner/breakpoints";
import TableScroll from "./table/scroll";
import ZoomFrameHint from "./zoom-frame/hint";
import AlertDismissible from "./alert/dismissible";
import AlertVariants from "./alert/variants";
import ConfirmDialogTones from "./confirm-dialog/tones";
import DialogSizes from "./dialog/sizes";
import DisabledOverlayTones from "./disabled-overlay/tones";
import DrawerSides from "./drawer/sides";
import DropdownMenuSelection from "./dropdown-menu/selection";
import EmptyStateDistinct from "./empty-state/distinct";
import LightboxCaptions from "./lightbox/captions";
import PopoverAlignment from "./popover/alignment";
import ToastAction from "./toast/action";
import TooltipOptions from "./tooltip/options";
import AccordionFaq from "./accordion/faq";
import BackLinkActions from "./back-link/actions";
import ContainerGutters from "./container/gutters";
import DashboardShellSections from "./dashboard-shell/sections";
import DividerTones from "./divider/tones";
import IconsSizes from "./icons/sizes";
import InfiniteScrollEnd from "./infinite-scroll/end";
import LayoutsDetail from "./layouts/detail";
import PaginationLinks from "./pagination/links";
import PillTabsCounts from "./pill-tabs/counts";
import SegmentedControlControlled from "./segmented-control/controlled";
import SidebarNavTones from "./sidebar-nav/tones";
import SiteFooterMinimal from "./site-footer/minimal";
import SiteHeaderActions from "./site-header/actions";
import SiteShellPage from "./site-shell/page";
import TableOfContentsLevels from "./table-of-contents/levels";
import ToggleChipGroupControlled from "./toggle-chip-group/controlled";
import VisuallyHiddenLabel from "./visually-hidden/label";
import CheckboxStates from "./checkbox/states";
import ComboboxFlat from "./combobox/flat";
import DatePickerCalendars from "./date-picker/calendars";
import DatePickerLimits from "./date-picker/limits";
import FieldControls from "./field/controls";
import FileInputRejections from "./file-input/rejections";
import FormActionsAlignment from "./form-actions/alignment";
import InputStates from "./input/states";
import InputTypes from "./input/types";
import OtpInputLengths from "./otp-input/lengths";
import PriceInputVariants from "./price-input/variants";
import RadioGroupValidation from "./radio-group/validation";
import SelectGroups from "./select/groups";
import SelectStates from "./select/states";
import SwitchControlled from "./switch/controlled";
import TagInputStates from "./tag-input/states";
import TextareaResize from "./textarea/resize";
import TextareaStates from "./textarea/states";
import TableOfContentsArticle from "./table-of-contents/article";
import ToggleChipGroupMetrics from "./toggle-chip-group/metrics";
import TypographyHeadings from "./typography/headings";
import TypographyText from "./typography/text";
import VisuallyHiddenLiveRegion from "./visually-hidden/live-region";
import WelcomeCardDashboard from "./welcome-card/dashboard";
import ZoomFrameGallery from "./zoom-frame/gallery";
import AvatarGroupOverlap from "./avatar-group/overlap";
import AvatarGroupParticipants from "./avatar-group/participants";
import SkeletonAnimations from "./skeleton/animations";
import SkeletonCardDemo from "./skeleton/card";
import SkeletonShapes from "./skeleton/shapes";
import SpinnerInContext from "./spinner/in-context";
import SpinnerSizes from "./spinner/sizes";
import SpinnerTones from "./spinner/tones";
import SpinnerVariants from "./spinner/variants";

/** Every live demo, keyed by its file path under `demos/` (without extension). */
export const demos = {
  "accordion/footer": AccordionFooter,
  "alert/tones": AlertTones,
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
  "author-card/sidebar": AuthorCardSidebar,
  "listing-card/course": ListingCardCourse,
  "opportunity-card/related": OpportunityCardRelated,
  "suggestion-item/dashboard": SuggestionItemDashboard,
  "post-list-item/related": PostListItemRelated,
  "provider-card/instructor": ProviderCardInstructor,
  "comment-section/article": CommentSectionArticle,
  "comment-section/service": CommentSectionService,
  "filter-panel/listing": FilterPanelListing,
  "promo-banner/sidebar": PromoBannerSidebar,
  "cta-banner/mission": CtaBannerMission,
  "welcome-card/dashboard": WelcomeCardDashboard,
  "quick-actions/dashboard": QuickActionsDashboard,
  "achievements-panel/rank": AchievementsPanelRank,
  "price-card/base": PriceCardBase,
  "contact-methods/direct": ContactMethodsDirect,
  "related-list/courses": RelatedListCourses,
  "article-header/blog-post": ArticleHeaderBlogPost,
  "profile-header/instructor": ProfileHeaderInstructor,
  "reaction-bar/course": ReactionBarCourse,
  "category-links/related": CategoryLinksRelated,
  "split-hero/about": SplitHeroAbout,
  "feature-grid/why-us": FeatureGridWhyUs,
  "report/variants": ReportVariants,
  "share-bar/icons": ShareBarIcons,
  "share-bar/labelled": ShareBarLabelled,
  "showcase-card/showcase": ShowcaseCardShowcase,
  "meta/article": MetaArticle,
  "meta/contacts": MetaContacts,
  "price-tag/variants": PriceTagVariants,
  "rating/usages": RatingUsages,
  "capacity-meter/usages": CapacityMeterUsages,
  "match-score/suggested": MatchScoreSuggested,
  "zoom-frame/gallery": ZoomFrameGallery,
  "cover-header/profile": CoverHeaderProfile,
  "responsive-banner/campaign": ResponsiveBannerCampaign,
  "rich-content/article": RichContentArticle,
  "rich-content/sanitized": RichContentSanitized,
  "activity-heatmap/year": ActivityHeatmapYear,
  "checkbox/cards": CheckboxCards,
  "checkbox/preferences": CheckboxPreferences,
  "field/profile-form": FieldProfileForm,
  "otp-input/verify": OtpInputVerify,
  "radio-group/delivery": RadioGroupDelivery,
  "switch/settings": SwitchSettings,
  "input/variants": InputVariants,
  "textarea/variants": TextareaVariants,
  "combobox/categories": ComboboxCategories,
  "date-picker/booking": DatePickerBooking,
  "infinite-scroll/feed": InfiniteScrollFeed,
  "pagination/results": PaginationResults,
  "confirm-dialog/delete-course": ConfirmDialogDeleteCourse,
  "dialog/edit-profile": DialogEditProfile,
  "file-input/attachments": FileInputAttachments,
  "price-input/budget": PriceInputBudget,
  "tag-input/skills": TagInputSkills,
  "select/filter": SelectFilter,
  "form-actions/comment-form": FormActionsCommentForm,
  "checkbox/states": CheckboxStates,
  "combobox/flat": ComboboxFlat,
  "date-picker/calendars": DatePickerCalendars,
  "date-picker/limits": DatePickerLimits,
  "field/controls": FieldControls,
  "file-input/rejections": FileInputRejections,
  "form-actions/alignment": FormActionsAlignment,
  "input/states": InputStates,
  "input/types": InputTypes,
  "otp-input/lengths": OtpInputLengths,
  "price-input/variants": PriceInputVariants,
  "radio-group/validation": RadioGroupValidation,
  "select/groups": SelectGroups,
  "select/states": SelectStates,
  "switch/controlled": SwitchControlled,
  "tag-input/states": TagInputStates,
  "textarea/resize": TextareaResize,
  "textarea/states": TextareaStates,
  "input/primary": InputPrimary,
  "textarea/primary": TextareaPrimary,
  "activity-heatmap/empty": ActivityHeatmapEmpty,
  "activity-heatmap/scale": ActivityHeatmapScale,
  "card/elevation": CardElevation,
  "card/interactive": CardInteractive,
  "card/primary": CardPrimary,
  "card/variants": CardVariants,
  "capacity-meter/full": CapacityMeterFull,
  "cover-header/defaults": CoverHeaderDefaults,
  "list/nested": ListNested,
  "match-score/values": MatchScoreValues,
  "price-tag/currency": PriceTagCurrency,
  "price-tag/display": PriceTagDisplay,
  "rating/precision": RatingPrecision,
  "rating/sizes": RatingSizes,
  "responsive-banner/breakpoints": ResponsiveBannerBreakpoints,
  "table/scroll": TableScroll,
  "zoom-frame/hint": ZoomFrameHint,
  "alert/dismissible": AlertDismissible,
  "alert/variants": AlertVariants,
  "confirm-dialog/tones": ConfirmDialogTones,
  "dialog/sizes": DialogSizes,
  "disabled-overlay/tones": DisabledOverlayTones,
  "drawer/sides": DrawerSides,
  "dropdown-menu/selection": DropdownMenuSelection,
  "empty-state/distinct": EmptyStateDistinct,
  "lightbox/captions": LightboxCaptions,
  "popover/alignment": PopoverAlignment,
  "toast/action": ToastAction,
  "tooltip/options": TooltipOptions,
  "accordion/faq": AccordionFaq,
  "back-link/actions": BackLinkActions,
  "container/gutters": ContainerGutters,
  "dashboard-shell/sections": DashboardShellSections,
  "divider/tones": DividerTones,
  "icons/sizes": IconsSizes,
  "infinite-scroll/end": InfiniteScrollEnd,
  "layouts/detail": LayoutsDetail,
  "pagination/links": PaginationLinks,
  "pill-tabs/counts": PillTabsCounts,
  "segmented-control/controlled": SegmentedControlControlled,
  "sidebar-nav/tones": SidebarNavTones,
  "site-footer/minimal": SiteFooterMinimal,
  "site-header/actions": SiteHeaderActions,
  "site-shell/page": SiteShellPage,
  "table-of-contents/levels": TableOfContentsLevels,
  "toggle-chip-group/controlled": ToggleChipGroupControlled,
  "visually-hidden/label": VisuallyHiddenLabel,
  "charts/analytics": ChartsAnalytics,
  "charts/trend": ChartsTrend,
  "editor/basic": EditorBasic,
  "editor/with-toolbar": EditorWithToolbar,
  "container/sizes": ContainerSizes,
  "site-header/default": SiteHeaderDefault,
  "site-footer/default": SiteFooterDefault,
  "dashboard-shell/learner": DashboardShellLearner,
  "layouts/templates": LayoutsTemplates,
  "drawer/menu": DrawerMenu,
  "dropdown-menu/user-menu": DropdownMenuUserMenu,
  "lightbox/gallery": LightboxGallery,
  "popover/notifications": PopoverNotifications,
  "toast/tones": ToastTones,
  "tooltip/share-actions": TooltipShareActions,
  "empty-state/variants": EmptyStateVariants,
  "disabled-overlay/full-card": DisabledOverlayFullCard,
  "carousel/related-courses": CarouselRelatedCourses,
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
  "avatar-group/overlap": AvatarGroupOverlap,
  "avatar-group/participants": AvatarGroupParticipants,
  "skeleton/animations": SkeletonAnimations,
  "skeleton/card": SkeletonCardDemo,
  "skeleton/shapes": SkeletonShapes,
  "spinner/in-context": SpinnerInContext,
  "spinner/sizes": SpinnerSizes,
  "spinner/tones": SpinnerTones,
  "spinner/variants": SpinnerVariants,
} satisfies Record<string, ComponentType>;

export type DemoName = keyof typeof demos;
