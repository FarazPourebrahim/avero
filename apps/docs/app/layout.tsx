import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { PreviewSettingsProvider } from "@/components/preview-settings.context";
import "./global.css";

export const metadata: Metadata = {
  title: { default: "Avero", template: "%s | Avero" },
  description: "Avero: a Persian RTL and English LTR React component library built on Radix UI.",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>
          <PreviewSettingsProvider>{children}</PreviewSettingsProvider>
        </RootProvider>
      </body>
    </html>
  );
}
