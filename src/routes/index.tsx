import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useMemo, useEffect, useState } from "react";
import { useScrollColorPlateaus } from "@/hooks/useScrollColorPlateaus";
import { useMotionValueEvent, motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { HeroFluidReveal } from "@/components/HeroFluidReveal";
import { SlotText } from "@/components/SlotText";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Galekto" },
      { name: "description", content: "UX/UI designer & illustrator" },
    ],
  }),
  component: Index,
});

function Index() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLImageElement>(null);

  const [hoverState, setHoverState] = useState<'left' | 'right' | 'center'>('center');
  const [activeText, setActiveText] = useState("JOHNY");
  const mouseY = useMotionValue(0.5);
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const yOffset = useTransform(smoothMouseY, [0, 1], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentage = x / rect.width;
    const percentageY = y / rect.height;

    mouseY.set(percentageY);

    // 12% dead-zone in the middle (0.44 to 0.56)
    if (percentage < 0.40) {
      setHoverState('left');
    } else if (percentage > 0.60) {
      setHoverState('right');
    } else {
      setHoverState('center');
    }
  };

  const handleMouseLeave = () => {
    setHoverState('center');
    mouseY.set(0.5);
  };

  useEffect(() => {
    if (hoverState === 'left') {
      setActiveText("ANSH ");
    } else if (hoverState === 'right') {
      setActiveText("JOHNY");
    }
  }, [hoverState]);

  useEffect(() => {
    let animationFrameId: number;
    const updateHeroBounds = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const root = document.documentElement;
        root.style.setProperty('--p-left', `${rect.left}px`);
        root.style.setProperty('--p-top', `${rect.top}px`);
        root.style.setProperty('--p-right', `${rect.right}px`);
        root.style.setProperty('--p-bottom', `${rect.bottom}px`);
      }
    };

    const handleScrollOrResize = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateHeroBounds);
    };

    // Since CRTScreen is in __root.tsx, the scroll container is `.crt-content-scroll`
    const scrollContainer = document.querySelector('.crt-content-scroll') as HTMLElement | null;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScrollOrResize, { passive: true });
      // Hack to feed the scroll container to our hook that expects a ref
      (scrollRef as any).current = scrollContainer;
    }
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    
    // Initial call
    handleScrollOrResize();

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScrollOrResize);
      }
      window.removeEventListener('resize', handleScrollOrResize);
      cancelAnimationFrame(animationFrameId);
      
      const root = document.documentElement;
      root.style.removeProperty('--p-left');
      root.style.removeProperty('--p-top');
      root.style.removeProperty('--p-right');
      root.style.removeProperty('--p-bottom');
    };
  }, []);

  const sections = useMemo(() => [
    { ref: heroRef, color: "#f0ebe3" },
    { ref: footerRef, color: "#000000" },
  ], []);

  const backgroundColor = useScrollColorPlateaus(scrollRef, sections);

  useMotionValueEvent(backgroundColor, "change", (latest) => {
    document.documentElement.style.setProperty("--crt-bg", latest);
  });

  return (
    <div className="w-full">
        <div 
          ref={heroRef} 
          className="relative overflow-hidden min-h-screen flex flex-col" 
          data-no-splash="true"
          style={{
            clipPath: 'url(#global-crt-clip)',
            WebkitClipPath: 'url(#global-crt-clip)'
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Layer 1: Pink Base Background (Full Frame) */}
          <img src="/pink_bg.png" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none" alt="" />
          
          {/* Layer 2: HeroFluidReveal (Full Frame) */}
          <div className="absolute inset-0 z-20">
            <HeroFluidReveal targetRef={artRef} />
          </div>

          <div className="relative z-30 pt-4 md:pt-6">
            <SiteHeader variant="light" centerIcons="none" noBlur />
          </div>

          <div className="relative flex-1 flex flex-col items-center justify-center px-6 md:px-12 pt-8 pb-24">
            {/* Liquid Ripple 1 */}
            <motion.div
              aria-hidden
              animate={{ 
                scale: [1, 1.05, 1],
                borderRadius: ["25% 75% 85% 15% / 25% 20% 80% 75%", "75% 25% 15% 85% / 75% 80% 20% 25%", "25% 75% 85% 15% / 25% 20% 80% 75%"]
              }}
              transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
              className="absolute z-20 inset-6 md:inset-16 border-[1px] border-black/20 pointer-events-none origin-center"
            />
            
            {/* Liquid Ripple 2 */}
            <motion.div
              aria-hidden
              animate={{ 
                scale: [1, 1.05, 1],
                borderRadius: ["25% 75% 85% 15% / 25% 20% 80% 75%", "75% 25% 15% 85% / 75% 80% 20% 25%", "25% 75% 85% 15% / 25% 20% 80% 75%"]
              }}
              transition={{ repeat: Infinity, duration: 25, ease: "easeInOut", delay: 1 }}
              className="absolute z-20 inset-2 md:inset-8 border-[1px] border-black/15 pointer-events-none origin-center"
            />

            {/* Liquid Ripple 3 */}
            <motion.div
              aria-hidden
              animate={{ 
                scale: [1, 1.05, 1],
                borderRadius: ["25% 75% 85% 15% / 25% 20% 80% 75%", "75% 25% 15% 85% / 75% 80% 20% 25%", "25% 75% 85% 15% / 25% 20% 80% 75%"]
              }}
              transition={{ repeat: Infinity, duration: 25, ease: "easeInOut", delay: 2 }}
              className="absolute z-20 -inset-2 md:inset-0 border-[1px] border-black/10 pointer-events-none origin-center"
            />

            {/* side vertical labels */}
            <motion.div
              className="hidden md:block absolute z-30 left-6 top-1/2 origin-center pointer-events-auto"
              initial={{ y: "-50%" }}
              animate={{
                y: "-50%",
                scale: hoverState === 'left' ? 1.4 : 1,
                color: hoverState === 'left' ? "#ff3333" : "rgba(0,0,0,0.8)",
                textShadow: hoverState === 'left' ? "0 0 40px rgba(255, 50, 50, 0.8)" : "0 0 0px rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/projects"
                className="text-[18px] tracking-[0.4em] font-semibold block outline-none"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "inherit", textShadow: "inherit" }}
              >
                ← PROJECTS
              </Link>
            </motion.div>
            <motion.div
              animate={{
                scale: hoverState === 'left' ? 1.4 : 1,
                rotate: hoverState === 'left' ? 630 : 180,
                color: hoverState === 'left' ? "#ff3333" : "rgba(0,0,0,0.06)",
                textShadow: hoverState === 'left' ? "0 0 40px rgba(255, 50, 50, 0.8)" : "0 0 0px rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
              className="hidden md:block absolute z-30 left-24 top-1/2 display-heading font-thin text-[12rem] origin-center cursor-pointer pointer-events-auto"
              style={{ writingMode: "vertical-rl", marginTop: "-6rem" }}
            >
              <Link to="/projects" className="outline-none block" style={{ color: "inherit", textShadow: "inherit" }}>
                01
              </Link>
            </motion.div>

            <motion.div
              className="hidden md:block absolute z-30 right-6 top-1/2 origin-center pointer-events-auto"
              initial={{ y: "-50%" }}
              animate={{
                y: "-50%",
                scale: hoverState === 'right' ? 1.4 : 1,
                color: hoverState === 'right' ? "#3366ff" : "rgba(0,0,0,0.8)",
                textShadow: hoverState === 'right' ? "0 0 40px rgba(50, 100, 255, 0.8)" : "0 0 0px rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/artworks"
                className="text-[18px] tracking-[0.4em] font-semibold block outline-none"
                style={{ writingMode: "vertical-rl", color: "inherit", textShadow: "inherit" }}
              >
                ARTWORKS →
              </Link>
            </motion.div>
            <motion.div
              animate={{
                scale: hoverState === 'right' ? 1.4 : 1,
                rotate: hoverState === 'right' ? 630 : 0,
                color: hoverState === 'right' ? "#3366ff" : "rgba(0,0,0,0.06)",
                textShadow: hoverState === 'right' ? "0 0 40px rgba(50, 100, 255, 0.8)" : "0 0 0px rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
              className="hidden md:block absolute z-30 right-24 top-1/2 display-heading font-thin text-[12rem] origin-center cursor-pointer pointer-events-auto"
              style={{ writingMode: "vertical-rl", marginTop: "-6rem" }}
            >
              <Link to="/artworks" className="outline-none block" style={{ color: "inherit", textShadow: "inherit" }}>
                02
              </Link>
            </motion.div>

            {/* portrait */}
            <motion.div
              style={{ y: yOffset }}
              animate={{ x: hoverState === 'left' ? 140 : hoverState === 'right' ? -140 : 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mt-auto flex items-end justify-center w-full max-w-[320px] md:max-w-[480px] mx-auto pointer-events-none"
            >
              <div className="w-full scale-[1.5] md:scale-[1.8] origin-bottom translate-y-[180px] md:translate-y-[340px]">
                {/* Colorful layer (sets natural dimensions) */}
                <img ref={artRef} src="/art_one.png" alt="Galekto" className="relative z-10 w-full h-auto object-contain pointer-events-none select-none" />
              </div>
            </motion.div>

            <motion.h1 
              style={{ y: yOffset }}
              animate={{ x: hoverState === 'left' ? 140 : hoverState === 'right' ? -140 : 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-30 display-heading text-[18vw] md:text-[14rem] text-[#333] mt-[-6vw] md:mt-[-8rem] tracking-wide pointer-events-none flex justify-center"
            >
              <SlotText text={activeText} />
            </motion.h1>


          </div>
        </div>

        <div ref={footerRef}>
          <SiteFooter />
        </div>
    </div>
  );
}
