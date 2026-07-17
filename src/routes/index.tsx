import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useMemo, useEffect } from "react";
import { useScrollColorPlateaus } from "@/hooks/useScrollColorPlateaus";
import { useMotionValueEvent } from "motion/react";
import { HeroFluidReveal } from "@/components/HeroFluidReveal";

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
        >
          {/* Layer 1: Pink Base Background (Full Frame) */}
          <img src="/pink_bg.png" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none" alt="" />
          
          {/* Layer 2: HeroFluidReveal (Full Frame) */}
          <div className="absolute inset-0 z-20">
            <HeroFluidReveal targetRef={artRef} />
          </div>

          <div className="relative z-30 pt-4 md:pt-6">
            <SiteHeader variant="light" centerIcons="diamond" />
          </div>

          <div className="relative flex-1 flex flex-col items-center justify-center px-6 md:px-12 pt-8 pb-24">
            {/* orbit ellipse */}
            <div
              aria-hidden
              className="absolute z-30 inset-x-6 top-16 bottom-16 border border-black/15 rounded-[50%] rotate-[-8deg] pointer-events-none"
            />

            {/* side vertical labels */}
            <Link
              to="/projects"
              className="hidden md:block absolute z-30 left-6 top-1/2 -translate-y-1/2 text-black/80 text-[10px] tracking-[0.4em] font-semibold pointer-events-auto"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateY(50%)" }}
            >
              ← PROJECTS
            </Link>
            <div
              aria-hidden
              className="hidden md:block absolute z-30 left-24 top-1/2 -translate-y-1/2 display-heading text-black/8 text-[6rem] pointer-events-none"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "rgba(0,0,0,0.06)" }}
            >
              01
            </div>

            <Link
              to="/artworks"
              className="hidden md:block absolute z-30 right-6 top-1/2 -translate-y-1/2 text-black/80 text-[10px] tracking-[0.4em] font-semibold pointer-events-auto"
              style={{ writingMode: "vertical-rl" }}
            >
              ARTWORKS →
            </Link>
            <div
              aria-hidden
              className="hidden md:block absolute z-30 right-24 top-1/2 -translate-y-1/2 display-heading text-black/8 text-[6rem] pointer-events-none"
              style={{ writingMode: "vertical-rl", color: "rgba(0,0,0,0.06)" }}
            >
              02
            </div>

            {/* portrait */}
            <div className="relative z-10 mt-auto flex items-end justify-center w-full max-w-[280px] md:max-w-[420px] mx-auto pointer-events-none scale-[1.5] md:scale-[1.8] origin-bottom translate-y-[180px] md:translate-y-[340px]">
              {/* Colorful layer (sets natural dimensions) */}
              <img ref={artRef} src="/art_one.png" alt="Galekto" className="relative z-10 w-full h-auto object-contain pointer-events-none select-none" />
            </div>

            <h1 className="relative z-30 display-heading text-[18vw] md:text-[14rem] leading-[0.85] text-black mt-[-6vw] md:mt-[-8rem] tracking-tight pointer-events-none">
              JOHNY
            </h1>

            <p className="relative z-30 mt-8 max-w-2xl text-center text-sm md:text-base text-black/70 pointer-events-none">
              I'm <strong className="text-black">Evren Yılmaz</strong> — a UX/UI designer, illustrator and creative director from
              Istanbul. Building interfaces by day, painting strange worlds by night.
            </p>

            <div className="relative z-30 mt-8 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
              <Link
                to="/projects"
                className="rounded-full border border-black/30 px-6 py-3 text-xs tracking-[0.25em] font-semibold text-black hover:bg-black hover:text-[#f0ebe3] transition-colors"
              >
                SEE PROJECTS
              </Link>
              <Link
                to="/artworks"
                className="rounded-full bg-black px-6 py-3 text-xs tracking-[0.25em] font-semibold text-[#f0ebe3] hover:bg-[#e14b42] transition-colors"
              >
                VIEW ARTWORKS
              </Link>
            </div>
          </div>
        </div>

        <div ref={footerRef}>
          <SiteFooter />
        </div>
    </div>
  );
}
