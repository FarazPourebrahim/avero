import { Button } from "@avero/react";
import { ArrowLeft } from "lucide-react";

export default function ButtonPrimaryDemo() {
  return (
    <Button elevated>
      <span>مشاهده دوره‌ها</span>
      <ArrowLeft className="size-4 ltr:-scale-x-100" aria-hidden />
    </Button>
  );
}
