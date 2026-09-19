"use client";

import { Container, Link, SiteFooter, SiteHeader, SiteShell } from "@averoui/react";
import { useCopy } from "../copy";

export default function SiteShellPageDemo() {
  const t = useCopy({
    fa: {
      courses: "دوره‌ها",
      copyright: "© ۱۴۰۵ آورو",
      heading: "محتوای صفحه",
      body: "هر قالب صفحه اینجا می‌نشیند و خودش نشانه `main` را می‌سازد.",
    },
    en: {
      courses: "Courses",
      copyright: "© 2026 Avero",
      heading: "Page content",
      body: "Each page template sits here and provides its own `main` landmark.",
    },
  });

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-100">
      <SiteShell
        // The preview is not the page's own document, so the skip link has nowhere to go.
        skipLink={false}
        header={
          <SiteHeader
            sticky={false}
            logo={
              <a href="#" className="text-primary text-lg font-black">
                Avero
              </a>
            }
            nav={
              <Link variant="nav" href="#">
                {t.courses}
              </Link>
            }
          />
        }
        footer={<SiteFooter copyright={t.copyright} />}
      >
        <Container as="main" id="main-content" className="py-10">
          <h2 className="text-lg font-bold text-gray-900">{t.heading}</h2>
          <p className="mt-2 text-sm text-gray-600">{t.body}</p>
        </Container>
      </SiteShell>
    </div>
  );
}
