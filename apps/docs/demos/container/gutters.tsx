import { Container } from "@averoui/react";

const GUTTERS = [
  { gutter: "default", label: "default — صفحه‌های سایت (۱۶ تا ۳۲px)" },
  { gutter: "tight", label: "tight — داشبورد (۱۲ تا ۳۲px)" },
  { gutter: "none", label: "none — وقتی خودتان فاصله می‌دهید" },
] as const;

export default function ContainerGuttersDemo() {
  return (
    <div className="w-full space-y-3 rounded-2xl bg-gray-100 py-4">
      {GUTTERS.map(({ gutter, label }) => (
        <Container key={gutter} gutter={gutter}>
          <div className="rounded-xl bg-white p-4 text-xs text-gray-600 sm:text-sm">{label}</div>
        </Container>
      ))}
      <Container as="section" size="prose">
        <div className="rounded-xl border border-dashed border-gray-300 p-4 text-xs text-gray-600 sm:text-sm">
          `as` عنصر را عوض می‌کند — اینجا یک `section` با ستون خواندنی.
        </div>
      </Container>
    </div>
  );
}
