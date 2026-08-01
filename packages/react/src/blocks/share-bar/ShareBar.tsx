"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Button, type ButtonProps } from "../../components/button/index.js";
import { Card } from "../../components/card/index.js";
import { IconButton, type IconButtonProps } from "../../components/icon-button/index.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { CopyIcon, MessageCircleIcon, SendIcon, Share2Icon } from "../../icons/internalIcons.js";
import {
  CopySolidIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "../../icons/referenceIcons.generated.js";
import { cn } from "../../utils/cn.js";

/** A share destination, or the copy-link action. */
export type ShareChannel = "copy" | "telegram" | "whatsapp" | "linkedin" | "x";

/** The reference's order, which differs between the two bars. */
const DEFAULT_CHANNELS = {
  icon: ["copy", "telegram", "linkedin", "x", "whatsapp"],
  labelled: ["telegram", "whatsapp", "linkedin", "copy"],
} as const satisfies Record<string, readonly ShareChannel[]>;

/**
 * Per-variant channel styling. The two bars use different icon sets and different tints for the
 * same channel: the article uses Font Awesome brand glyphs, the service page Lucide outlines.
 * `className` carries the shades that are not tones of their own — LinkedIn's darker blue text
 * on the shared blue ground, and X's near-black on gray.
 */
type IconChannelStyle = { tone: IconButtonProps["tone"]; icon: ReactNode; className?: string };

const ICON_CHANNELS: Record<ShareChannel, IconChannelStyle> = {
  copy: { tone: "neutral", icon: <CopySolidIcon size={15} /> },
  telegram: { tone: "blue", icon: <TelegramIcon size={15} /> },
  linkedin: { tone: "blue", icon: <LinkedinIcon size={15} />, className: "text-blue-700" },
  x: { tone: "neutral", icon: <TwitterIcon size={15} />, className: "text-gray-800" },
  whatsapp: { tone: "green", icon: <WhatsappIcon size={15} /> },
};

type LabelledChannelStyle = { tone: ButtonProps["tone"]; icon: ReactNode };

const LABELLED_CHANNELS: Record<ShareChannel, LabelledChannelStyle> = {
  copy: { tone: "neutral", icon: <CopyIcon className="size-3.5" /> },
  telegram: { tone: "sky", icon: <SendIcon className="size-3.5" /> },
  whatsapp: { tone: "emerald", icon: <MessageCircleIcon className="size-3.5" /> },
  linkedin: { tone: "blue", icon: <LinkedinIcon className="size-3.5" /> },
  x: { tone: "neutral", icon: <TwitterIcon className="size-3.5" /> },
};

/** Props specific to `ShareBar`. It also accepts every native `<div>` attribute. */
export type ShareBarOwnProps = {
  /**
   * `icon` is the article's row of icon-only buttons (R-01); `labelled` is the service page's
   * card of named buttons (R-05). @defaultValue "icon"
   */
  variant?: "icon" | "labelled";
  /** Text before the buttons. @defaultValue the `shareLabel` dictionary string */
  label?: ReactNode;
  /** Which channels to offer, in order. @defaultValue the reference's order for the variant */
  channels?: readonly ShareChannel[];
  /** Channel names, for overriding a single label. @defaultValue the `share*` dictionary strings */
  labels?: Partial<Record<ShareChannel, string>>;
  /** Called with the channel that was activated. */
  onShare?: (channel: ShareChannel) => void;
};

export type ShareBarProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof ShareBarOwnProps | "children"
> &
  ShareBarOwnProps;

/**
 * Share controls (B-09, R-01/R-05). The article's bar is icon-only and sits in the action row
 * beside the like button; the service page's is a card of named buttons.
 *
 * The reference labels the icon buttons in English ("Share on Telegram") while showing Persian
 * tooltips; here both come from the dictionary, so the accessible name matches what is seen.
 */
export const ShareBar = forwardRef<HTMLDivElement, ShareBarProps>(function ShareBar(
  { variant = "icon", label, channels, labels, onShare, className, ...props },
  ref,
) {
  const { dictionary } = useAvero();
  const isLabelled = variant === "labelled";
  const list = channels ?? DEFAULT_CHANNELS[variant];

  const names: Record<ShareChannel, string> = {
    copy: dictionary.shareCopy,
    telegram: dictionary.shareTelegram,
    whatsapp: dictionary.shareWhatsapp,
    linkedin: dictionary.shareLinkedin,
    x: dictionary.shareX,
  };

  const buttons = list.map((channel) => {
    const name = labels?.[channel] ?? names[channel];

    if (isLabelled) {
      const { tone, icon } = LABELLED_CHANNELS[channel];
      return (
        <Button
          key={channel}
          variant="soft"
          tone={tone}
          size="sm"
          onClick={() => onShare?.(channel)}
        >
          {icon}
          {name}
        </Button>
      );
    }

    const { tone, icon, className: channelClassName } = ICON_CHANNELS[channel];
    return (
      <IconButton
        key={channel}
        label={name}
        title={name}
        variant="soft"
        tone={tone}
        size="lg"
        className={channelClassName}
        onClick={() => onShare?.(channel)}
      >
        {icon}
      </IconButton>
    );
  });

  if (!isLabelled) {
    return (
      <div
        ref={ref}
        data-slot="share-bar"
        className={cn("flex items-center gap-3", className)}
        {...props}
      >
        <span className="text-xs font-medium text-gray-500">{label ?? dictionary.shareLabel}</span>
        {buttons}
      </div>
    );
  }

  return (
    <Card
      ref={ref}
      variant="surface"
      elevation="xs"
      padding="none"
      className={cn("flex flex-wrap items-center justify-between gap-4 p-6", className)}
      data-slot="share-bar"
      {...props}
    >
      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
        <Share2Icon className="size-4 text-indigo-600" />
        <span>{label ?? dictionary.shareLabel}</span>
      </div>
      <div data-slot="share-bar-actions" className="flex flex-wrap items-center gap-2">
        {buttons}
      </div>
    </Card>
  );
});

ShareBar.displayName = "ShareBar";
