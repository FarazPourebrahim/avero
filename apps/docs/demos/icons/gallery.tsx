import {
  ArrowRightSolidIcon,
  CalendarSolidIcon,
  ChartBarOutlineIcon,
  ClockSolidIcon,
  CommentSolidIcon,
  CopySolidIcon,
  EyeSolidIcon,
  FolderSolidIcon,
  HeartSolidIcon,
  InstagramIcon,
  LinkedinIcon,
  LinkedinInIcon,
  ListUlSolidIcon,
  PaperPlaneSolidIcon,
  QuoteRightSolidIcon,
  TelegramIcon,
  TelegramPlaneIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@averoui/react";

const ICONS = [
  ["ArrowRightSolidIcon", ArrowRightSolidIcon],
  ["CalendarSolidIcon", CalendarSolidIcon],
  ["ClockSolidIcon", ClockSolidIcon],
  ["EyeSolidIcon", EyeSolidIcon],
  ["QuoteRightSolidIcon", QuoteRightSolidIcon],
  ["FolderSolidIcon", FolderSolidIcon],
  ["HeartSolidIcon", HeartSolidIcon],
  ["CopySolidIcon", CopySolidIcon],
  ["CommentSolidIcon", CommentSolidIcon],
  ["PaperPlaneSolidIcon", PaperPlaneSolidIcon],
  ["ListUlSolidIcon", ListUlSolidIcon],
  ["TelegramIcon", TelegramIcon],
  ["TelegramPlaneIcon", TelegramPlaneIcon],
  ["LinkedinIcon", LinkedinIcon],
  ["LinkedinInIcon", LinkedinInIcon],
  ["TwitterIcon", TwitterIcon],
  ["WhatsappIcon", WhatsappIcon],
  ["InstagramIcon", InstagramIcon],
  ["ChartBarOutlineIcon", ChartBarOutlineIcon],
] as const;

export default function IconGalleryDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
      {ICONS.map(([name, Icon]) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-gray-700"
        >
          <Icon size={24} />
          <span className="text-2xs text-gray-500" dir="ltr">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
