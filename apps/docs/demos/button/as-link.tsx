import { Button } from "@averoui/react";

export default function ButtonAsLinkDemo() {
  return (
    <Button asChild variant="soft">
      <a href="#contact">تماس با پشتیبانی</a>
    </Button>
  );
}
