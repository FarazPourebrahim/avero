import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Avero</h1>
      <p className="text-fd-muted-foreground max-w-md">
        A Persian RTL and English LTR React component library built on Radix UI.
      </p>
      <Link href="/docs" className="font-medium underline underline-offset-4">
        Read the documentation
      </Link>
    </main>
  );
}
