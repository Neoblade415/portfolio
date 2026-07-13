/**
 * Global fixed-position CRT film overlay: scanlines, grain and vignette.
 * Rendered once at the app root so texture stays stable during scroll and
 * feels like a single physical screen across the whole page.
 */
export function CRTFilmOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      {/* scanlines */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.14) 0px, rgba(0,0,0,0.14) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* grain */}
      <div
        className="absolute -inset-1/4 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9  0 0 0 0 0.9  0 0 0 0 0.9  0 0 0 0.35 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          animation: "grain 1.2s steps(6) infinite",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 90%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}
