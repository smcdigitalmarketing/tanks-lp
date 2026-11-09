/**
 * Decorative band between major sections, part of a brand direction's look:
 * a soft wave (Soft, Retro), a hazard stripe (Field), a double rule (Story)
 * or a centred ornament (Heritage, Luxe).
 */
export function Divider({ kind }: { kind?: "none" | "wave" | "stripe" | "rule" | "ornament" }) {
  if (kind === "rule")
    return (
      <div aria-hidden="true" className="bg-bg px-4">
        <div className="mx-auto h-1.5 max-w-6xl border-y border-ink" />
      </div>
    );
  if (kind === "ornament")
    return (
      <div aria-hidden="true" className="flex items-center justify-center gap-4 bg-bg px-4 py-6 text-brand">
        <span className="h-px w-24 bg-current opacity-60" />
        <span className="text-lg leading-none">✦</span>
        <span className="h-px w-24 bg-current opacity-60" />
      </div>
    );
  if (kind === "wave")
    return (
      <div aria-hidden="true" className="bg-bg text-surface-2">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="block h-8 w-full md:h-12"
        >
          <path
            fill="currentColor"
            d="M0 24c120-20 240-20 360 0s240 20 360 0 240-20 360 0 240 20 360 0v24H0z"
          />
        </svg>
      </div>
    );
  if (kind === "stripe")
    return (
      <div
        aria-hidden="true"
        className="h-3"
        style={{
          background:
            "repeating-linear-gradient(-45deg, var(--highlight) 0 14px, var(--bg) 14px 28px)",
        }}
      />
    );
  return null;
}
