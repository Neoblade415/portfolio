import type { CSSProperties, ReactNode } from "react";

interface CRTScreenProps {
  children: ReactNode;
  background?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Single continuous rounded CRT frame. All page content lives inside one
 * of these — no stacked frames. Film/scanline/vignette overlays are rendered
 * globally by <CRTFilmOverlay /> so they stay stable during scroll.
 */
export function CRTScreen({ children, background, className = "", style }: CRTScreenProps) {
  return (
    <div
      className={`crt-screen relative ${className}`}
      style={{
        background: background ?? "var(--crt-cream)",
        ...style,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
