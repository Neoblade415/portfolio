import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

function routeLabel(pathname: string): string {
  if (pathname === "/" || pathname === "") return "HOME";
  const seg = pathname.split("/").filter(Boolean)[0] ?? "HOME";
  return seg.toUpperCase();
}

function routeColors(pathname: string): { bg: string; text: string } {
  if (pathname === "/" || pathname === "") return { bg: "#f0ebe3", text: "#000000" };
  if (pathname.startsWith("/projects")) return { bg: "#e14b42", text: "#f0ebe3" };
  if (pathname.startsWith("/artworks")) return { bg: "#2f5be8", text: "#f0ebe3" };
  if (pathname.startsWith("/contact")) return { bg: "#2b1f3d", text: "#f0ebe3" };
  return { bg: "var(--crt-red)", text: "#f0ebe3" };
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
  const [colors, setColors] = useState(() => routeColors(location.pathname));
  const firstRun = useRef(true);

  useEffect(() => {
    // Skip on initial mount
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setLabel(routeLabel(location.pathname));
    setColors(routeColors(location.pathname));
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
          id="crt-transition-overlay"
          key="crt-overlay"
          className="absolute inset-0 z-20 flex flex-col justify-center overflow-hidden"
          style={{ background: colors.bg }}
          data-no-splash="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.25, ease: "easeOut" } }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }}
        >
          {/* stacked labels */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-1 text-center px-4 w-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.09, duration: 0.35, ease: [0.2, 1.2, 0.3, 1] }}
                className="display-heading text-[13vw] md:text-[11vw] leading-[0.85]"
                style={{ color: colors.text, textShadow: "0 0 1px rgba(0,0,0,0.15)" }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
