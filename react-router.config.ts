import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

const CONCEPTS = ["soft", "premium", "contemporary"];

export default {
  ssr: true,
  presets: [vercelPreset()],
  // Every page is static: the hub, the gallery, the SOP and four pages per concept.
  // The 1600 px gallery render route stays dynamic (only the export script uses it).
  async prerender() {
    return [
      "/",
      "/gallery",
      "/sop",
      ...CONCEPTS.flatMap((c) => [
        `/${c}`,
        `/${c}/early-black-friday`,
        `/${c}/advertorial`,
        `/${c}/advertorial/early-black-friday`,
      ]),
    ];
  },
} satisfies Config;
