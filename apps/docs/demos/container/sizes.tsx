import { Container } from "@averoui/react";

export default function ContainerSizesDemo() {
  return (
    <div className="w-full space-y-3 rounded-2xl bg-gray-100 py-4">
      {(["default", "prose", "full"] as const).map((size) => (
        <Container key={size} size={size}>
          <div className="rounded-xl bg-white p-4 text-sm text-gray-600">{size}</div>
        </Container>
      ))}
    </div>
  );
}
