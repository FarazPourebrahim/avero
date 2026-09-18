import { IconTile } from "@averoui/react";
import { Zap } from "lucide-react";

const TONES = ["blue", "purple", "amber", "emerald", "rose", "indigo", "slate"] as const;
const VARIANTS = ["soft", "muted", "tint", "gradient"] as const;

export default function IconTileVariantsDemo() {
  return (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <span className="w-16 text-xs text-gray-500">{variant}</span>
          {TONES.map((tone) => (
            <IconTile key={tone} variant={variant} tone={tone} size="lg">
              <Zap className="size-4 sm:size-5" />
            </IconTile>
          ))}
        </div>
      ))}
    </div>
  );
}
