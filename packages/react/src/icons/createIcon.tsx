import { forwardRef, type SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "ref" | "children"> & {
  /** Width and height. Defaults to `1em` so the icon scales with the surrounding font size. */
  size?: number | string;
  /** Accessible name. Without it the icon is decorative and hidden from assistive technology. */
  title?: string;
};

export type IconDefinition = {
  viewBox: string;
  paths: readonly string[];
  /** `fill` glyphs are solid shapes; `stroke` glyphs are outlines drawn with a 2px stroke. */
  mode: "fill" | "stroke";
};

/** Builds a React icon component from raw SVG path data. */
export function createIcon(displayName: string, { viewBox, paths, mode }: IconDefinition) {
  const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
    { size = "1em", title, ...props },
    ref,
  ) {
    const isStroke = mode === "stroke";
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width={size}
        height={size}
        fill={isStroke ? "none" : "currentColor"}
        stroke={isStroke ? "currentColor" : undefined}
        strokeWidth={isStroke ? 2 : undefined}
        strokeLinecap={isStroke ? "round" : undefined}
        strokeLinejoin={isStroke ? "round" : undefined}
        role={title ? "img" : undefined}
        aria-hidden={title ? undefined : true}
        focusable="false"
        data-slot="icon"
        {...props}
      >
        {title ? <title>{title}</title> : null}
        {paths.map((path) => (
          <path key={path} d={path} />
        ))}
      </svg>
    );
  });
  Icon.displayName = displayName;
  return Icon;
}
