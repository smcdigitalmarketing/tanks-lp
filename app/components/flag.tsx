import type { Flag as FlagData, FlagKind } from "~/content/types";

const LABEL: Record<FlagKind, string> = {
  source: "Source claim",
  conflict: "Source conflict",
  provisional: "Provisional price",
  "competitor-review": "Competitor review",
  "to-confirm": "To confirm",
};

/**
 * A small dashed tag marking something we can't claim yet. Hover (or tap) for
 * the note. The preview strip's "Flags" switch hides them all for clean
 * screenshots by setting data-flags="off" on <html>.
 */
export function Flag({
  flag,
  className = "",
}: {
  flag?: FlagData;
  className?: string;
}) {
  if (!flag) return null;
  return (
    <span
      data-flag={flag.kind}
      title={flag.note ?? LABEL[flag.kind]}
      className={`ml-1.5 inline-flex translate-y-[-1px] items-center whitespace-nowrap rounded-full border border-dashed border-current px-1.5 py-px align-middle font-[Inter,system-ui,sans-serif] text-[10px] font-semibold uppercase leading-4 tracking-wide text-[#9a6a00] ${className}`}
    >
      {LABEL[flag.kind]}
    </span>
  );
}

export const flagLabel = (kind: FlagKind) => LABEL[kind];
