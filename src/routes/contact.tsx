import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowUpRight } from "lucide-react";
import { useRef, useMemo, useLayoutEffect, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useScrollColorPlateaus } from "@/hooks/useScrollColorPlateaus";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence, useAnimationFrame, useVelocity, useTransform } from "motion/react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Galekto" },
      { name: "description", content: "Get in touch with Evren Yılmaz (Galekto) for UX/UI design and illustration collaborations." },
      { property: "og:title", content: "Contact — Galekto" },
      { property: "og:description", content: "Get in touch with Evren Yılmaz for design and illustration collaborations." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const sections = useMemo(() => [
    { ref: scrollRef, color: "#333333" },
  ], []);

  const backgroundColor = useScrollColorPlateaus(scrollRef, sections);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  const [isPointerFine, setIsPointerFine] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(hover: hover) and (pointer: fine)");
      setIsPointerFine(media.matches);
      const listener = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = prefersReducedMotion 
    ? { stiffness: 1000, damping: 1000 } 
    : { stiffness: 150, damping: 25, mass: 0.5 };
    
  const ufoX = useSpring(mouseX, springConfig);
  const ufoY = useSpring(mouseY, springConfig);



  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (isPointerFine) {
      document.body.style.cursor = 'none';
      return () => {
        document.body.style.cursor = '';
      };
    }
  }, [isPointerFine]);

  const [hoveringLine, setHoveringLine] = useState<'top' | 'bottom' | null>(null);
  const [isHoveringEmail, setIsHoveringEmail] = useState(false);

  const emailRef = useRef<HTMLAnchorElement>(null);
  const beamRotate = useSpring(0, springConfig);
  const beamLength = useSpring(256, springConfig);
  
  const ufoVelocityX = useVelocity(ufoX);
  const ufoRotate = useTransform(ufoVelocityX, [-2000, 2000], [-35, 35], { clamp: true });

  useAnimationFrame(() => {
    if (!emailRef.current) return;
    
    if (isHoveringEmail) {
      const rect = emailRef.current.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;
      
      const ux = ufoX.get();
      const uy = ufoY.get();
      
      const dx = targetX - ux;
      const dy = targetY - uy;
      
      let angleRad = Math.atan2(dy, dx) - Math.PI/2;
      let angleDeg = angleRad * (180 / Math.PI);
      
      let dist = Math.sqrt(dx*dx + dy*dy);
      
      beamRotate.set(angleDeg);
      beamLength.set(Math.min(dist, 800)); // allow reaching bottom of screen
    } else {
      beamRotate.set(0);
      beamLength.set(256);
    }
  });

  return (
    <motion.div 
      ref={scrollRef} 
      className={`w-full h-full crt-content-scroll relative overflow-x-hidden ${isPointerFine ? 'cursor-none' : ''}`}
      style={{ background: backgroundColor }}
    >
      {/* Background Glow Tracking Cursor */}
      {isPointerFine && (
        <motion.div
          className="fixed pointer-events-none z-0"
          style={{ x: ufoX, y: ufoY, translateX: "-50%", translateY: "-50%" }}
        >
          <motion.div 
            className="w-[1200px] h-[1200px] rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(160, 50, 255, 0.25) 0%, rgba(255, 120, 50, 0.1) 40%, transparent 75%)",
              filter: "blur(50px)"
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHoveringEmail ? 1 : 0,
              scale: isHoveringEmail ? 1 : 0.8
            }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}

      {/* Main Content */}
      <div ref={contactRef} className="relative z-10 h-full flex flex-col">
        <div className="pt-4 md:pt-6">
          <SiteHeader variant="dark" centerIcons="space" logo="I WANT TO BELIEVE" />
        </div>

        <div className="relative px-7 md:px-10 flex-1 grid md:grid-cols-2 gap-5 pt-10 md:pt-16 pb-12 h-full">
          {/* Heading Side */}
          <div className="flex flex-col justify-start relative z-20 h-full">
            <motion.div
              onMouseEnter={() => setHoveringLine('top')}
              onMouseLeave={() => setHoveringLine(null)}
              className="inline-block origin-left w-fit"
              animate={{ scale: hoveringLine === 'top' && !prefersReducedMotion ? 1.025 : 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.h1
                className="display-heading text-[28vw] md:text-[20vw] leading-[0.8] tracking-normal m-0 whitespace-nowrap [-webkit-text-stroke:1px_rgba(240,235,227,0.35)] [text-shadow:none]"
                initial={false}
                animate={{
                  WebkitTextFillColor: hoveringLine === 'top' ? "rgba(240, 235, 227, 1)" : "rgba(240, 235, 227, 0)",
                  color: hoveringLine === 'top' ? "rgba(240, 235, 227, 1)" : "rgba(240, 235, 227, 0)"
                } as any}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                GET IN
              </motion.h1>
            </motion.div>
            
            <motion.div
              onMouseEnter={() => setHoveringLine('bottom')}
              onMouseLeave={() => setHoveringLine(null)}
              className="inline-block origin-left w-fit"
              animate={{ scale: hoveringLine === 'bottom' && !prefersReducedMotion ? 1.025 : 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.h1
                className="display-heading text-[28vw] md:text-[20vw] leading-[0.8] tracking-normal m-0 whitespace-nowrap [-webkit-text-stroke:1px_rgba(240,235,227,0.35)] [text-shadow:none]"
                initial={false}
                animate={{
                  WebkitTextFillColor: hoveringLine === 'bottom' ? "rgba(240, 235, 227, 1)" : "rgba(240, 235, 227, 0)",
                  color: hoveringLine === 'bottom' ? "rgba(240, 235, 227, 1)" : "rgba(240, 235, 227, 0)"
                } as any}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                TOUCH
              </motion.h1>
            </motion.div>
          </div>

          {/* Contact Details Side */}
          <div 
            className="relative z-20 text-center flex flex-col justify-center items-center mt-12 md:mt-0 h-full pb-16 md:pb-32 self-center"
            onMouseEnter={() => setIsHoveringEmail(true)}
            onMouseLeave={() => setIsHoveringEmail(false)}
          >
            <motion.p 
              className="text-sm text-[#5eff9f] mb-4 h-5 whitespace-nowrap"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.8, ease: "linear", delay: 0.5 }}
            >
              The truth is out there... but a collaboration starts here.
            </motion.p>
            
            <div className="inline-block">
              <a
                ref={emailRef}
                href="mailto:hello@galekto.com"
                className={`display-heading text-3xl md:text-5xl text-[#f0ebe3] transition-colors block ${isPointerFine ? 'cursor-none' : ''}`}
                style={{ textShadow: "0 0 15px rgba(94, 255, 159, 0.35)" }}
              >
                hello@galekto.com
              </a>
            </div>

            <div className="mt-8 flex gap-6 text-xs tracking-[0.3em] text-[#f0ebe3]/80">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 hover:text-white transition-colors ${isPointerFine ? 'cursor-none' : ''}`}>
                INSTAGRAM <ArrowUpRight size={12} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 hover:text-white transition-colors ${isPointerFine ? 'cursor-none' : ''}`}>
                LINKEDIN <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* faint stars (background) */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                className="absolute w-[2px] h-[2px] rounded-full bg-white/60"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                  opacity: 0.3 + ((i * 7) % 5) / 10,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Custom Cursor Layer (UFO + Beam) */}
      {isPointerFine && typeof document !== 'undefined' && createPortal(
        <motion.div
          className="fixed pointer-events-none z-[9999] top-0 left-0"
          style={{ x: ufoX, y: ufoY }}
        >
          {/* The UFO graphic is centered on the cursor, but offset slightly up so the cursor tip is the UFO body */}
          <motion.div 
            className="relative w-24 h-40 flex flex-col items-center origin-[50%_24px]"
            style={{ x: "-50%", y: "-24px", rotate: ufoRotate }}
          >
            
            {/* UFO */}
            <svg viewBox="0 0 120 60" className="w-24 h-12 relative z-10 drop-shadow-xl">
              <ellipse cx="60" cy="42" rx="50" ry="10" fill="#c8c8d0" />
              <ellipse cx="60" cy="38" rx="40" ry="8" fill="#a0a0b0" />
              <path d="M35,35 Q60,10 85,35 Z" fill="#d8d8e0" />
              <circle cx="45" cy="45" r="2" fill="#f2c94c" />
              <circle cx="60" cy="47" r="2" fill="#e14b42" />
              <circle cx="75" cy="45" r="2" fill="#5eff9f" />
            </svg>

            {/* Light Beam */}
            <motion.svg
              className="absolute top-10 w-48 origin-top"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHoveringEmail ? 0.6 : 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: "blur(2px)", rotate: beamRotate, height: beamLength }}
            >
              <defs>
                <linearGradient id="cursorBeam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5eff9f" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#5eff9f" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points="50,0 70,100 30,100" fill="url(#cursorBeam)" />
            </motion.svg>
          </motion.div>
        </motion.div>,
        document.body
      )}

    </motion.div>
  );
}
