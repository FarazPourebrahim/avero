import { Card, CardFooter, CardHeader, CardTitle } from "@averoui/react";
import { Layers, MessageSquare, Target } from "lucide-react";

export default function CardSurfacesDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      <Card elevation="xs">
        <CardHeader className="mb-4">
          <CardTitle size="lg">
            <MessageSquare />
            دیدگاه‌ها (0)
          </CardTitle>
        </CardHeader>
        <p className="text-xs text-slate-400">هنوز دیدگاهی ثبت نشده است.</p>
      </Card>
      <Card variant="flat" padding="sm">
        <CardHeader className="mb-3 sm:mb-4">
          <CardTitle size="sm">
            <Target className="size-4" />
            دوره‌های پیشنهادی
          </CardTitle>
          <span className="text-2xs text-gray-400 sm:text-xs">5 دوره</span>
        </CardHeader>
        <p className="text-xs text-gray-500">مبانی تحلیل داده</p>
      </Card>
      <Card elevation="sm">
        <CardTitle className="mb-4">
          <Layers className="text-blue-600" />
          موضوع‌ها و مهارت‌ها
        </CardTitle>
        <p className="text-sm text-slate-600">Figma · طراحی رابط کاربری</p>
      </Card>
      <Card variant="glass" padding="none" className="p-3">
        <div className="h-24 rounded-lg bg-gray-100" />
        <CardFooter className="mt-4">
          <span className="text-sm-plus">از ۴٬۵۰۰٬۰۰۰ تومان</span>
          <span className="text-xs text-gray-500">0 پسند</span>
        </CardFooter>
      </Card>
    </div>
  );
}
