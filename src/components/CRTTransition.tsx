import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

function routeLabel(pathname: string): string {
  if (pathname === "/" || pathname === "") return "HOME";
  const seg = pathname.split("/").filter(Boolean)[0] ?? "HOME";
  return seg.toUpperCase();
}

/**
 * Retro CRT-TV page transition overlay. Plays on every route change.
 * Sequence: red screen powers on -> 5 stacked text lines stagger in -> hold -> power off.
 */
export function CRTTransition() {
  const { location } = useRouterState();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [label, setLabel] = useState(() => routeLabel(location.pathname));
  const firstRun = useRef(true);

  useEffect(() => {
    // Skip on initial mount
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setLabel(routeLabel(location.pathname));
    setMounted(true);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, [location.pathname]);

  if (!mounted) return null;

  return (
    <AnimatePresence onExitComplete={() => setMounted(false)}>
      {visible && (
        <motion.div
          key="crt-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          <motion.div
            className="crt-screen relative w-[92vw] h-[90vh] flex flex-col justify-center overflow-hidden"
            style={{ background: "var(--crt-red)" }}
            initial={{ scaleY: 0.02, scaleX: 0.8, opacity: 0 }}
            animate={{ scaleY: 1, scaleX: 1, opacity: 1, transition: { duration: 0.35, ease: [0.2, 0.9, 0.3, 1] } }}
            exit={{ scaleY: 0.005, scaleX: 0.6, opacity: 0, transition: { duration: 0.35, ease: [0.6, 0, 0.9, 0.4] } }}
          >
            {/* stacked labels */}
            <div className="relative z-10 pl-[10vw] pr-[4vw] flex flex-col gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.09, duration: 0.35, ease: [0.2, 1.2, 0.3, 1] }}
                  className="display-heading text-[#f0ebe3] text-[13vw] leading-[0.85]"
                  style={{ textShadow: "0 0 1px rgba(0,0,0,0.15)" }}
                >
                  {label}
                </motion.div>
              ))}
            </div>

            {/* scanlines */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 opacity-60 mix-blend-multiply"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
