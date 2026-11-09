import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { marked } from "marked";
import type { Route } from "./+types/sop";
// The SOP lives in the repo as markdown; this page renders that same file.
import sopMarkdown from "../../docs/pdp-template-sop.md?raw";
import { HUB_FONTS, fontHref } from "~/lib/seo";

export const meta: Route.MetaFunction = () => [
  { title: "Product Landing Page SOP" },
  { name: "robots", content: "noindex, nofollow" },
  {
    tagName: "link",
    rel: "stylesheet",
    href: fontHref(HUB_FONTS),
  },
];

export function loader() {
  return { html: marked.parse(sopMarkdown, { async: false }) };
}

export default function Sop({ loaderData }: Route.ComponentProps) {
  return (
    <div className="min-h-dvh bg-[#f6f6f4] font-[Inter,system-ui,sans-serif] text-[#16151a]">
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-black/60 hover:text-black"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All concepts
        </Link>
        <article
          className="sop mt-6 rounded-xl border border-black/10 bg-white p-6 md:p-10"
          dangerouslySetInnerHTML={{ __html: loaderData.html }}
        />
      </main>
    </div>
  );
}
