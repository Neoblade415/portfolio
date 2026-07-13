import type { CSSProperties, ReactNode } from "react";

interface CRTScreenProps {
  children: ReactNode;
  background?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * A fixed-position CRT television bezel. The rounded frame, border, vignette
 * and grain never move or resize with the viewport — only the inner content
 * scrolls behind the "glass". Think of a TV on a wall: the bezel is bolted
 * in place; the video plays inside it.
 */
export function CRTScreen({ children, background, className = "", style }: CRTScreenProps) {
  return (
    <div
      aria-hidden={false}
      className={`crt-screen fixed inset-3 md:inset-5 lg:inset-6 z-10 ${className}`}
      style={style}
    >
      {/* Inner scroll surface — the "glass" */}
      <div
        className="crt-scroll absolute inset-0 overflow-y-auto overflow-x-hidden"
        style={{ background: background ?? "var(--crt-cream)" }}
      >
        {children}
      </div>

      {/* Scanlines — fixed on the bezel, don't scroll with content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-50 mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.14) 0px, rgba(0,0,0,0.14) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1/4 z-20 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9  0 0 0 0 0.9  0 0 0 0 0.9  0 0 0 0.35 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          animation: "grain 1.2s steps(6) infinite",
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 90%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}
