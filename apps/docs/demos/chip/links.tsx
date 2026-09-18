import { Chip } from "@averoui/react";
import { Tag } from "lucide-react";

export default function ChipLinksDemo() {
  return (
    <>
      <Chip asChild variant="link">
        <a href="#design">طراحی</a>
      </Chip>
      <Chip asChild variant="tag">
        <a href="#react">
          <Tag aria-hidden />
          <span>React</span>
        </a>
      </Chip>
      <Chip asChild variant="footer">
        <a href="#ux">تجربه کاربری</a>
      </Chip>
    </>
  );
}
