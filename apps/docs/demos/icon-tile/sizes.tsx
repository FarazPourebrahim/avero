import { IconTile } from "@avero/react";
import { Briefcase } from "lucide-react";

const SIZES = ["xs", "sm", "md", "lg", "xl", "padded"] as const;

export default function IconTileSizesDemo() {
  return (
    <>
      {SIZES.map((size) => (
        <IconTile key={size} size={size} variant="tint">
          <Briefcase className="size-4" />
        </IconTile>
      ))}
    </>
  );
}
