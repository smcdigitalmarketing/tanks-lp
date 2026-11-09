import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Slide } from "~/content/types";
import { SlideView } from "./slides";

/**
 * Full-screen view of one gallery slide. Arrows, swipe and the keyboard move
 * between slides; Escape, the close button or a click outside the image close
 * it. Rendered into <body> (so no sticky column or header can sit on top of
 * it) inside its own data-theme wrapper, so slides keep the concept's look.
 */
export function Lightbox({
  slides,
  index,
  theme,
  onIndex,
  onClose,
}: {
  slides: Slide[];
  index: number;
  theme: string;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const n = slides.length;
  const go = (i: number) => onIndex((i + n) % n);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    // Keep the page behind from scrolling while the image is open.
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return createPortal(
    <div data-theme={theme} className="font-sans text-ink">
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${n}`}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? index + 1 : index - 1);
        touchX.current = null;
      }}
    >
      <div
        className="relative aspect-square w-[min(92vw,84vh)] overflow-hidden rounded-card bg-surface shadow-2xl [container-type:inline-size]"
        onClick={(e) => e.stopPropagation()}
      >
        <SlideView slide={slides[index]} priority />
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25"
        aria-label="Close image"
      >
        <X aria-hidden="true" className="size-6" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(index - 1);
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25"
        aria-label="Previous image"
      >
        <ChevronLeft aria-hidden="true" className="size-6" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(index + 1);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25"
        aria-label="Next image"
      >
        <ChevronRight aria-hidden="true" className="size-6" />
      </button>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white tabular-nums">
        {index + 1} / {n}
      </p>
    </div>
    </div>,
    document.body,
  );
}
