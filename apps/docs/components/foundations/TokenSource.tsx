import type { TokenSource as Source } from "@/lib/foundations";

/** Marks whether a token is Avero's own or one of Tailwind's defaults. */
export function TokenSource({ source }: { source: Source }) {
  return source === "avero" ? (
    <span className="bg-fd-primary/10 text-fd-primary rounded-md px-1.5 py-0.5 text-xs font-medium">
      Avero
    </span>
  ) : (
    <span className="text-fd-muted-foreground text-xs">Tailwind</span>
  );
}
