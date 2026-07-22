import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Per-route assets to preload during the transition overlay window (~1.4s).
 * Adding an asset here ensures the browser cache is warm by the time the
 * destination page mounts.
 */
const ROUTE_ASSETS: Record<string, string[]> = {
  "/": ["/pink_bg.png", "/art_one.png", "/black_and_white.png"],
  "/projects/navswap": [
    "/pep_app_hero.png", "/phone_view.png", "/dashboard.png", "/macbook.png",
    "/wireframe_Dark_full.png", "/wire_frame_bright.png", "/wireframe_grid.png",
  ],
  "/projects/cortex": [
    "/cortex_hero_logo.png",
    "/cortex_dashboard_1.png", "/cortex_dashboard_2.png", "/cortex_dashboard_3.png",
    "/cortex_dashboard_4.png", "/cortex_dashboard_5.png", "/cortex_dashboard_6.png",
    "/safari_cortex_boomerang.mp4",
  ],
  "/projects/polaris": ["/polaris_hero.png"],
  "/projects/ovela": [
    "/ovela_hero.png", "/ovela_logo_without_bg.png",
    "/ovela1.png", "/ovela2.png", "/ovela3.png",
    "/ovela4.png", "/ovela5.png", "/ovela6.png",
    "/ovela7.png", "/ovela8.png", "/ovela9.png",
    "/ovela_all_pages.png", "/ovela_video.mp4",
  ],
};

function routeLabel(pathname: string): string {
  if (pathname === "/" || pathname === "") return "HOME";
  const seg = pathname.split("/").filter(Boolean)[0] ?? "HOME";
  return seg.toUpperCase();
}

function routeColors(pathname: string): { bg: string; text: string } {
  if (pathname === "/" || pathname === "") return { bg: "#f0ebe3", text: "#000000" };
  if (pathname.startsWith("/projects/") && pathname.length > 10) return { bg: "#333333", text: "#f0ebe3" };
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
  const [label, setLabel] = useState(() => {
    const state = location.state as any;
    return state?.transitionText || routeLabel(location.pathname);
  });
  const [colors, setColors] = useState(() => routeColors(location.pathname));
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    // Only play transition if we actually navigated to a new route
    if (prevPathname.current === location.pathname) {
      return;
    }
    prevPathname.current = location.pathname;

    const state = location.state as any;
    setLabel(state?.transitionText || routeLabel(location.pathname));
    setColors(routeColors(location.pathname));
    setMounted(true);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, [location.pathname, location.state]);

  // Preload destination-page assets during the ~1.4s transition window.
  useEffect(() => {
    if (!visible) return;

    const assets = ROUTE_ASSETS[location.pathname];
    if (!assets) return;

    const aborter = new AbortController();
    for (const src of assets) {
      fetch(src, { signal: aborter.signal }).catch(() => {});
    }
    return () => aborter.abort();
  }, [visible, location.pathname]);

  if (!mounted) return null;

  return (
    <AnimatePresence onExitComplete={() => setMounted(false)}>
      {visible && (
        <motion.div
          id="crt-transition-overlay"
          key="crt-overlay"
          className="absolute inset-0 z-[100] flex flex-col justify-center overflow-hidden"
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
