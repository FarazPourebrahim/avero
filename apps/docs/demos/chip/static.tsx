import { Chip } from "@avero/react";

export default function ChipStaticDemo() {
  return (
    <>
      <Chip>طراحی UI/UX</Chip>
      <Chip size="sm">آنلاین</Chip>
      <Chip variant="mini">Figma</Chip>
      <Chip variant="skill">React</Chip>
      <Chip variant="skill">تحلیل داده</Chip>
    </>
  );
}
