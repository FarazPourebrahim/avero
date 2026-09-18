import { CoverHeader } from "@averoui/react";

export default function CoverHeaderDefaultsDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <CoverHeader className="w-full">
        <h3 className="text-lg font-bold text-gray-900">بدون تصویر جلد</h3>
        <p className="mt-1 text-sm text-gray-500">
          جلد پیش‌فرض یک گرادیان آبی به بنفش است و جای آواتار خالی می‌ماند.
        </p>
      </CoverHeader>
      <CoverHeader
        className="w-full"
        cover={<div className="gradient-night size-full" />}
        avatar={
          <span className="flex size-full items-center justify-center bg-slate-100 text-lg font-bold text-slate-600">
            س‌م
          </span>
        }
      >
        <h3 className="text-lg font-bold text-gray-900">جلد و آواتار دلخواه</h3>
        <p className="mt-1 text-sm text-gray-500">هر دو جایگاه هر محتوایی را می‌پذیرند.</p>
      </CoverHeader>
    </div>
  );
}
