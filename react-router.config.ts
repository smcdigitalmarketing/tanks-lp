import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

const CONCEPTS = ["soft", "premium", "contemporary", "bold", "calm", "heritage"];

export default {
  ssr: true,
  presets: [vercelPreset()],
  // Every page is static: the hub, the gallery, the SOP and, per concept, four
  // pages (product, home, 7 Reasons, advertorial) in three offers.
  // The 1600 px gallery render route stays dynamic (only the export script uses it).
  async prerender() {
    return [
      "/",
      "/gallery",
      "/sop",
      ...CONCEPTS.flatMap((c) =>
        ["", "/home", "/7-reasons", "/advertorial"].flatMap((page) =>
          ["", "/early-black-friday", "/christmas"].map(
            (offer) => `/${c}${page}${offer}`,
          ),
        ),
      ),
    ];
  },
} satisfies Config;
