import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";
import { IconTile, type IconTileOwnProps } from "../icon-tile/IconTile.js";

type Tone = NonNullable<IconTileOwnProps["tone"]>;

/* --------------------------------------------------------------------------------------------
 * StatCard: dashboard counters. Label and icon tile on top, big value below.
 * ------------------------------------------------------------------------------------------ */

/** Props specific to `StatCard`. It also accepts every native `<div>` attribute. */
export type StatCardOwnProps = {
  label: ReactNode;
  value: ReactNode;
  /** Icon shown in a tinted tile beside the label. */
  icon?: ReactNode;
  /** Icon tile color. @defaultValue "blue" */
  tone?: Tone;
};

export type StatCardProps = Omit<HTMLAttributes<HTMLDivElement>, keyof StatCardOwnProps> &
  StatCardOwnProps;

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, icon, tone = "blue", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="stat-card"
      className={cn(
        "rounded-2xl border border-gray-100 bg-white p-3 transition-shadow duration-200 hover:shadow-md sm:p-4",
        className,
      )}
      {...props}
    >
      <div className="mb-2 flex items-center justify-between sm:mb-3">
        <span className="text-2xs font-medium text-gray-500 sm:text-xs">{label}</span>
        {icon ? (
          <IconTile tone={tone} size="xs">
            {icon}
          </IconTile>
        ) : null}
      </div>
      <div className="text-xl font-bold text-gray-900 sm:text-2xl">{value}</div>
    </div>
  );
});

StatCard.displayName = "StatCard";

/* --------------------------------------------------------------------------------------------
 * StatTile + StatStrip: a profile's statistics strip.
 * ------------------------------------------------------------------------------------------ */

/** Props specific to `StatTile`. It also accepts every native `<div>` attribute. */
export type StatTileOwnProps = {
  label: ReactNode;
  value: ReactNode;
  /** Icon shown in a translucent tile. */
  icon?: ReactNode;
  /** Icon tile color. @defaultValue "blue" */
  tone?: Tone;
};

export type StatTileProps = Omit<HTMLAttributes<HTMLDivElement>, keyof StatTileOwnProps> &
  StatTileOwnProps;

export const StatTile = forwardRef<HTMLDivElement, StatTileProps>(function StatTile(
  { label, value, icon, tone = "blue", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="stat-tile"
      className={cn(
        "flex flex-col items-start gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 transition-all hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-4 sm:p-4",
        className,
      )}
      {...props}
    >
      {icon ? (
        <IconTile variant="tint" tone={tone} size="xl">
          {icon}
        </IconTile>
      ) : null}
      <div className="min-w-0">
        <span className="block truncate text-lg leading-tight font-bold text-slate-900 sm:text-2xl">
          {value}
        </span>
        <span className="text-2xs mt-0.5 block truncate font-medium text-slate-500 sm:text-xs">
          {label}
        </span>
      </div>
    </div>
  );
});

StatTile.displayName = "StatTile";

export type StatStripProps = HTMLAttributes<HTMLDivElement>;

/** A white strip of `StatTile`s with blue accent bars on both edges. */
export const StatStrip = forwardRef<HTMLDivElement, StatStripProps>(function StatStrip(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="stat-strip"
      className={cn(
        "relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6 lg:px-12 lg:py-8",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute start-0 top-1/2 hidden h-12 w-1.5 -translate-y-1/2 rounded-e-full bg-blue-600 sm:flex"
      />
      <div className="grid grid-cols-2 gap-3 text-slate-700 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        {children}
      </div>
      <span
        aria-hidden="true"
        className="absolute end-0 top-1/2 hidden h-12 w-1.5 -translate-y-1/2 rounded-s-full bg-blue-600 sm:flex"
      />
    </div>
  );
});

StatStrip.displayName = "StatStrip";

/* --------------------------------------------------------------------------------------------
 * MiniStat: centered label + value, as in a provider card.
 * ------------------------------------------------------------------------------------------ */

/** Props specific to `MiniStat`. It also accepts every native `<div>` attribute. */
export type MiniStatOwnProps = {
  label: ReactNode;
  value: ReactNode;
  /** Optional icon before the value, e.g. a filled star for ratings. */
  icon?: ReactNode;
};

export type MiniStatProps = Omit<HTMLAttributes<HTMLDivElement>, keyof MiniStatOwnProps> &
  MiniStatOwnProps;

export const MiniStat = forwardRef<HTMLDivElement, MiniStatProps>(function MiniStat(
  { label, value, icon, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="mini-stat"
      className={cn("rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center", className)}
      {...props}
    >
      <span className="text-3xs block font-bold text-slate-400">{label}</span>
      <span className="flex items-center justify-center gap-1 text-base font-black text-slate-900">
        {icon}
        {value}
      </span>
    </div>
  );
});

MiniStat.displayName = "MiniStat";

/* --------------------------------------------------------------------------------------------
 * InfoRow: tinted rows with an icon tile, as in an achievements panel.
 * ------------------------------------------------------------------------------------------ */

export const infoRowVariants = cva(
  "flex items-center gap-2.5 rounded-xl border p-2.5 sm:gap-3 sm:p-3",
  {
    variants: {
      tone: {
        primary: "border-blue-100 bg-blue-50/50",
        blue: "border-blue-100 bg-blue-50/50",
        purple: "border-purple-100 bg-purple-50/50",
        amber: "border-amber-100 bg-amber-50/50",
        emerald: "border-emerald-100 bg-emerald-50/50",
        rose: "border-rose-100 bg-rose-50/50",
        indigo: "border-indigo-100 bg-indigo-50/50",
        slate: "border-slate-100 bg-slate-50/50",
      },
    },
    defaultVariants: { tone: "blue" },
  },
);

/** Props specific to `InfoRow`. It also accepts every native `<div>` attribute. */
export type InfoRowOwnProps = {
  label: ReactNode;
  value: ReactNode;
  icon?: ReactNode;
  /** Row and icon tile color. @defaultValue "blue" */
  tone?: VariantProps<typeof infoRowVariants>["tone"];
};

export type InfoRowProps = Omit<HTMLAttributes<HTMLDivElement>, keyof InfoRowOwnProps> &
  InfoRowOwnProps;

export const InfoRow = forwardRef<HTMLDivElement, InfoRowProps>(function InfoRow(
  { label, value, icon, tone = "blue", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="info-row"
      className={cn(infoRowVariants({ tone }), className)}
      {...props}
    >
      {icon ? (
        <IconTile variant="muted" tone={tone ?? "blue"} size="md">
          {icon}
        </IconTile>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="text-2xs text-gray-500 sm:text-xs">{label}</p>
        <p className="text-xs font-bold text-gray-800 sm:text-sm">{value}</p>
      </div>
    </div>
  );
});

InfoRow.displayName = "InfoRow";

/* --------------------------------------------------------------------------------------------
 * HighlightPanel: an amber panel for one headline figure, such as a rank.
 * ------------------------------------------------------------------------------------------ */

/** Props specific to `HighlightPanel`. It also accepts every native `<div>` attribute. */
export type HighlightPanelOwnProps = {
  label: ReactNode;
  value: ReactNode;
  /** Content at the inline end, e.g. an icon or a badge. */
  aside?: ReactNode;
};

export type HighlightPanelProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof HighlightPanelOwnProps
> &
  HighlightPanelOwnProps;

export const HighlightPanel = forwardRef<HTMLDivElement, HighlightPanelProps>(
  function HighlightPanel({ label, value, aside, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="highlight-panel"
        className={cn(
          // Fades toward the inline end (`to-l` in RTL) and mirrors in LTR.
          "rounded-xl border border-amber-100 from-amber-50 to-orange-50 p-3 sm:p-4 ltr:bg-gradient-to-r rtl:bg-gradient-to-l",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xs mb-0.5 text-amber-600 sm:mb-1 sm:text-xs">{label}</p>
            <p className="text-xl font-bold text-amber-700 sm:text-2xl">{value}</p>
          </div>
          {aside}
        </div>
      </div>
    );
  },
);

HighlightPanel.displayName = "HighlightPanel";
