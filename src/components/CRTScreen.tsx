import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { useAmbientDisturbances } from "../hooks/useAmbientDisturbances";
import SplashCursor from "./SplashCursor";

export interface CRTScreenProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wraps content in a curved retro-CRT "screen" frame with
 * barrel distortion, rounded corners, scanlines, film grain, and vignette.
 */
export const CRTScreen = ({ children, className = "", style }: CRTScreenProps) => {
    const outerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const clipId = useId();

    useAmbientDisturbances(outerRef);

    useEffect(() => {
      if (!outerRef.current) return;
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
        }
      });
      observer.observe(outerRef.current);
      return () => observer.disconnect();
    }, []);

    const { w, h } = size;
    let clipPathD = "";

    if (w > 0 && h > 0) {
      const R = 48; // Base corner radius
      const Bx = Math.max(12, w * 0.015); // Horizontal bulge
      const By = Math.max(12, h * 0.015); // Vertical bulge
      const safeR = Math.min(R, w / 3, h / 3);

      clipPathD = `
        M ${Bx}, ${By + safeR}
        A ${safeR} ${safeR} 0 0 1 ${Bx + safeR}, ${By}
        Q ${w / 2}, ${-By} ${w - Bx - safeR}, ${By}
        A ${safeR} ${safeR} 0 0 1 ${w - Bx}, ${By + safeR}
        Q ${w + Bx}, ${h / 2} ${w - Bx}, ${h - By - safeR}
        A ${safeR} ${safeR} 0 0 1 ${w - Bx - safeR}, ${h - By}
        Q ${w / 2}, ${h + By} ${Bx + safeR}, ${h - By}
        A ${safeR} ${safeR} 0 0 1 ${Bx}, ${h - By - safeR}
        Q ${-Bx}, ${h / 2} ${Bx}, ${By + safeR}
        Z
      `;
    }

    return (
      <div
        ref={outerRef}
        className={`crt-screen ${className}`}
        style={{
          clipPath: w > 0 ? `url(#${clipId})` : "none",
          WebkitClipPath: w > 0 ? `url(#${clipId})` : "none",
          ...style,
        }}
      >
        {w > 0 && (
          <svg width="0" height="0" className="absolute pointer-events-none">
            <clipPath id={clipId}>
              <path d={clipPathD.trim().replace(/\s+/g, " ")} />
            </clipPath>
          </svg>
        )}

        <div
          className="relative z-10 w-full h-full overflow-hidden"
          style={{
            filter: "brightness(var(--crt-brightness, 1))",
            textShadow: "var(--crt-chromatic-x, 0px) 0 0 red, calc(var(--crt-chromatic-x, 0px) * -1) 0 0 blue",
          }}
        >
          {children}
        </div>

        {/* dynamic scanline rolls */}
        {[1, 2, 3].map((i) => (
          <div
            key={`roll-${i}`}
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bg-white/90 z-35 mix-blend-overlay blur-[2px]"
            style={{
              top: `var(--crt-roll${i}-pos, -10%)`,
              opacity: `var(--crt-roll${i}-opacity, 0)`,
              height: `var(--crt-roll${i}-h, 2%)`,
              transition: `top var(--crt-roll${i}-duration, 0ms) linear`,
            }}
          />
        ))}

        {/* ambient static noise overlay */}
        <div aria-hidden className="crt-ambient-noise" />

        {/* scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 mix-blend-multiply opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(0,0,0,0.14) 0px, rgba(0,0,0,0.14) 1px, transparent 1px, transparent 3px)",
          }}
        />

        {/* WebGL Splash Cursor (z-35, above noise z-30, below vignette z-40) */}
        <SplashCursor />

        {/* vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-40"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,var(--crt-vignette-a1, 0.35)) 85%, rgba(0,0,0,var(--crt-vignette-a2, 0.75)) 100%)",
          }}
        />
      </div>
  );
};
