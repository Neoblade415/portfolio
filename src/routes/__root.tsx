import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CRTTransition } from "../components/CRTTransition";
import { CRTScreen } from "../components/CRTScreen";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="max-w-md text-center">
        <h1 className="display-heading text-7xl text-white">404</h1>
        <p className="mt-4 text-sm text-white/60">This channel is out of range.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-xs tracking-[0.25em] text-white hover:bg-white hover:text-black transition-colors"
        >
          GO HOME
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="max-w-md text-center">
        <h1 className="display-heading text-3xl text-white">SIGNAL LOST</h1>
        <p className="mt-2 text-sm text-white/60">Try adjusting the antenna.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full border border-white/30 px-5 py-2 text-xs tracking-[0.25em] text-white hover:bg-white hover:text-black transition-colors"
          >
            TRY AGAIN
          </button>
          <a href="/" className="rounded-full border border-white/30 px-5 py-2 text-xs tracking-[0.25em] text-white hover:bg-white hover:text-black transition-colors">
            GO HOME
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Galekto — Evren Yılmaz, UX/UI Designer" },
      { name: "description", content: "Portfolio of Evren Yılmaz (Galekto): UX/UI design, illustration, and creative direction from Istanbul." },
      { property: "og:title", content: "Galekto — Evren Yılmaz" },
      { property: "og:description", content: "UX/UI designer & illustrator based in Istanbul. Selected projects and artworks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&display=swap",
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
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
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
      <div className="bg-black w-screen h-screen overflow-hidden">
        <CRTScreen>
          <Outlet />
          <CRTTransition />
        </CRTScreen>
      </div>
    </QueryClientProvider>
  );
}
