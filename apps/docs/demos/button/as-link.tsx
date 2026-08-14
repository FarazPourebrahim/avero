import { Button } from "@avero/react";

export default function ButtonAsLinkDemo() {
  return (
    <Button asChild variant="soft">
      <a href="#contact">تماس با پشتیبانی</a>
    </Button>
  );
}
