import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MotionHelpers } from "@/components/site/MotionHelpers";

function NotFoundComponent() {
  return (
    <div className="container-x flex min-h-[80vh] flex-col justify-center pt-20">
      <p className="eyebrow mb-6">404 / Off the path</p>
      <h1 className="font-display text-mega">This path doesn't lead anywhere.</h1>
      <div className="mt-10">
        <Link to="/" className="btn btn-primary">
          Back to the path →
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="container-x flex min-h-[80vh] flex-col justify-center pt-20">
      <p className="eyebrow mb-6">Error</p>
      <h1 className="font-display text-huge">Something interrupted the path.</h1>
      <div className="mt-10 flex gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="btn btn-primary"
        >
          Try again
        </button>
        <a href="/" className="btn btn-ghost">
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CRESVIA 360 - The Path of Growth" },
      {
        name: "description",
        content:
          "CRESVIA 360 is a digital growth studio helping businesses move from potential to performance.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "CRESVIA 360" },
      { property: "og:title", content: "CRESVIA 360 - The Path of Growth" },
      {
        property: "og:description",
        content:
          "Website development, website design and SEO. CRESVIA 360 helps businesses move from potential to performance.",
      },
      { name: "application-name", content: "CRESVIA 360" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#031211" },
    ],
    scripts: [
      {
        // Marks the page as JS-enabled so reveal elements only start hidden when JS can show them.
        children: "document.documentElement.classList.add('js')",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "CRESVIA 360",
          email: "cresvia360@gmail.com",
          description: "Website development, website design and SEO studio.",
        }),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/cresvia360-logo.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500&family=Geist+Mono:wght@400&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <MotionHelpers />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
