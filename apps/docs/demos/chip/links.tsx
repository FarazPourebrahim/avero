import { Chip } from "@avero/react";
import { Tag } from "lucide-react";

export default function ChipLinksDemo() {
  return (
    <>
      <Chip asChild variant="link">
        <a href="#freelancing">فریلنسری</a>
      </Chip>
      <Chip asChild variant="tag">
        <a href="#php">
          <Tag aria-hidden />
          <span>PHP</span>
        </a>
      </Chip>
      <Chip asChild variant="footer">
        <a href="#web-design">طراحی سایت</a>
      </Chip>
    </>
  );
}
