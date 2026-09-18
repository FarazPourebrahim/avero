import { Button } from "@averoui/react";

const TONES = [
  "neutral",
  "sky",
  "emerald",
  "blue",
  "indigo",
  "purple",
  "amber",
  "rose",
  "red",
] as const;

export default function ButtonTonesDemo() {
  return (
    <>
      {TONES.map((tone) => (
        <Button key={tone} variant="soft" tone={tone} size="sm">
          {tone}
        </Button>
      ))}
    </>
  );
}
