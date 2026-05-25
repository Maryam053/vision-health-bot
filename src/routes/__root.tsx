import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AppSidebar, MobileNav } from "@/components/AppSidebar";
import { TopNav, SiteFooter } from "@/components/PublicLayout";
import { Toaster } from "@/components/ui/sonner";
import { Heart } from "lucide-react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            Try again
          </button>
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
      { title: "SehatBot — AI Health Assistant for Pakistan" },
      {
        name: "description",
        content:
          "SehatBot is an AI-powered health assistant for Pakistan supporting SDG 3 and Vision 2030 — chat, clinics, and wellness tips.",
      },
      { property: "og:title", content: "SehatBot — AI Health Assistant for Pakistan" },
      { name: "twitter:title", content: "SehatBot — AI Health Assistant for Pakistan" },
      { name: "description", content: "SehatBot is a web application providing AI-powered health advice and clinic information for Pakistan." },
      { property: "og:description", content: "SehatBot is a web application providing AI-powered health advice and clinic information for Pakistan." },
      { name: "twitter:description", content: "SehatBot is a web application providing AI-powered health advice and clinic information for Pakistan." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3786f401-3653-402d-bfc4-4fe8211c7af8/id-preview-bbdf6ea2--bf436f10-327e-42ce-8179-8eaa6645a9d0.lovable.app-1779420501818.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3786f401-3653-402d-bfc4-4fe8211c7af8/id-preview-bbdf6ea2--bf436f10-327e-42ce-8179-8eaa6645a9d0.lovable.app-1779420501818.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
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
      <LayoutSwitch />
      <Toaster />
    </QueryClientProvider>
  );
}

function LayoutSwitch() {
  const pathname = useRouterState({ select: (s: { location: { pathname: string } }) => s.location.pathname });

  if (pathname === "/login") {
    return <Outlet />;
  }

  // Dashboard layout (sidebar) for admin & clinic portals
  const isDashboard = pathname.startsWith("/admin") || pathname.startsWith("/client");
  if (isDashboard) {
    return (
      <div className="min-h-screen flex bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="md:hidden sticky top-0 z-30 bg-card border-b px-4 py-3 flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="size-4 text-primary-foreground" fill="currentColor" />
            </div>
            <div className="font-bold">SehatBot</div>
          </header>
          <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
        <MobileNav />
      </div>
    );
  }

  // Public marketing layout (top nav + footer)
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

