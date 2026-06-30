import { Button } from "@avero/react";

export default function ButtonStatesDemo() {
  return (
    <>
      <Button loading>ثبت نظر</Button>
      <Button disabled>ثبت نظر</Button>
      <Button variant="inverse" size="xl" block className="max-w-sm">
        ارسال درخواست
      </Button>
    </>
  );
}
