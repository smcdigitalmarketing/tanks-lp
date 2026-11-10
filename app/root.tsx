import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { brand } from "~/content/store";
import { fontHref } from "~/lib/seo";
import { CartProvider } from "~/lib/mock-cart";
import { StoreShell } from "~/components/store/shell";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/png", href: "/favicon.png" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "stylesheet", href: fontHref(brand.brand.googleFonts) },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-flags="off">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fbf6ef" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* One cart for the whole store, so it survives moving between pages. */}
        <CartProvider>{children}</CartProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  let details = "Something went wrong on our side. Please try again.";
  let stack: string | undefined;
  if (isRouteErrorResponse(error) && !notFound)
    details = error.statusText || details;
  else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <StoreShell>
      <section className="px-4 py-20 text-center md:py-28">
        <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {notFound ? "404" : "Error"}
        </p>
        <h1 className="display mt-3 text-[2.4rem] md:text-[3.2rem]">
          {notFound ? "We can't find that page" : "Sorry, that didn't work"}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          {notFound
            ? "It may have moved. The Everyday Tank is just a click away."
            : details}
        </p>
        <p className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/" className="btn-primary px-6 py-3 font-semibold">
            Back to {brand.brand.name}
          </a>
          <a
            href="/collections/all"
            className="rounded-btn border border-ink px-6 py-3 font-semibold"
          >
            Shop all colours
          </a>
        </p>
        {stack && (
          <pre className="mx-auto mt-10 max-w-4xl overflow-x-auto p-4 text-left text-xs">
            <code>{stack}</code>
          </pre>
        )}
      </section>
    </StoreShell>
  );
}
