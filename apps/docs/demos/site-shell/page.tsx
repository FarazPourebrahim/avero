import { Container, Link, SiteFooter, SiteHeader, SiteShell } from "@averoui/react";

export default function SiteShellPageDemo() {
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
                دوره‌ها
              </Link>
            }
          />
        }
        footer={<SiteFooter copyright="© ۱۴۰۵ آورو" />}
      >
        <Container as="main" id="main-content" className="py-10">
          <h2 className="text-lg font-bold text-gray-900">محتوای صفحه</h2>
          <p className="mt-2 text-sm text-gray-600">
            هر قالب صفحه اینجا می‌نشیند و خودش نشانه `main` را می‌سازد.
          </p>
        </Container>
      </SiteShell>
    </div>
  );
}
