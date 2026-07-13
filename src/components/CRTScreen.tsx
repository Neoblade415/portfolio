import type { CSSProperties, ReactNode } from "react";

interface CRTScreenProps {
  children: ReactNode;
  background?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wraps content in a curved retro-CRT "screen" frame with
 * rounded corners, scanlines, film grain and edge vignette.
 */
export function CRTScreen({ children, background, className = "", style }: CRTScreenProps) {
  return (
    <div
      className={`crt-screen relative ${className}`}
      style={{
        background: background ?? "var(--crt-cream)",
        animation: "crt-flicker 4s infinite",
        ...style,
      }}
    >
      <div className="relative z-10">{children}</div>

      {/* scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 mix-blend-multiply opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.14) 0px, rgba(0,0,0,0.14) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1/2 z-30 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9  0 0 0 0 0.9  0 0 0 0 0.9  0 0 0 0.35 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          animation: "grain 1.2s steps(6) infinite",
        }}
      />

      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.35) 85%, rgba(0,0,0,0.75) 100%)",
        }}
      />
    </div>
  );
}
