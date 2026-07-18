import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/projects_/bein-sports-connect")({
  head: () => ({
    meta: [
      { title: "BEIN SPORTS CONNECT — Galekto" },
      { name: "description", content: "Case study for BEIN SPORTS CONNECT." },
    ],
  }),
  component: BeinSportsConnectCaseStudy,
});

function BeinSportsConnectCaseStudy() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 50);
  };

  return (
    <motion.div ref={scrollRef} onScroll={handleScroll} className="w-full h-full crt-content-scroll" style={{ background: "#f2f0ec" }}>
      <div className="w-full text-[#222]">
        
        {/* Site Header (Sticky across whole page) */}
        <div className="sticky top-0 z-50 w-full h-0 pointer-events-none">
          <div className="pointer-events-auto pt-4 md:pt-6">
            <SiteHeader variant="dark" centerIcons="diamond" backLink="/projects" bgColor={isScrolled ? "#333333" : "transparent"} />
          </div>
        </div>
          
        {/* Hero */}
        <div className="w-full bg-[#201041] h-screen min-h-[600px] flex items-end p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <span className="display-heading text-[25vw] text-white whitespace-nowrap">BEIN SPORTS</span>
          </div>
          <h1 className="display-heading text-[10vw] md:text-[8rem] leading-[0.85] text-[#f2f0ec] relative z-10">
            BEIN SPORTS CONNECT
          </h1>
        </div>

        {/* Stats Bar */}
        <div className="w-full border-y border-black/10 bg-[#ebe9e4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 px-8 md:px-16 py-6 md:py-8 mx-auto divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="md:px-8 first:md:pl-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">CLIENT</h4>
              <p className="text-sm font-medium">beIN Media Group</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">YEAR</h4>
              <p className="text-sm font-medium">2019</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">ROLE</h4>
              <p className="text-sm font-medium">UX/UI Designer</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8 last:md:pr-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">PLATFORM</h4>
              <p className="text-sm font-medium">Web, iOS, Android, TV</p>
            </div>
          </div>
        </div>

        {/* Overview & Intro text */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="max-w-4xl mb-16">
            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">ABOUT beIN SPORTS CONNECT</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
              A comprehensive multi-platform streaming service delivering live sports content to millions of fans globally. I collaborated on standardizing the user experience across their web and mobile applications.
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              Our core objective was to surface live events more intelligently and create a video player experience that felt immersive yet highly functional across devices.
            </p>
          </div>
        </div>

        {/* The Challenge & Solution */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE CHALLENGE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                The platform suffered from content discovery issues, especially during peak weekend hours when dozens of live matches happened simultaneously. The visual language was fragmented across Web, iOS, and Android platforms, leading to inconsistent user flows.
              </p>
            </div>
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE SOLUTION</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                We developed a unified design system that scaled from small mobile screens up to smart TVs. The new homepage structure prioritized live and upcoming events based on user preferences, while the completely overhauled video player introduced intuitive gestures for timeline scrubbing and multi-cam switching.
              </p>
            </div>
          </div>
        </div>

        {/* 2 Mockups (Mobile/Tablet) */}
        <div className="px-8 md:px-16 py-20 max-w-7xl mx-auto">
          <div className="w-full bg-[#d0cac2] aspect-video md:aspect-[21/9] rounded-xl flex items-center justify-center shadow-inner overflow-hidden relative">
             <div className="absolute inset-0 flex items-center justify-center gap-16 scale-110">
               <div className="w-40 md:w-56 aspect-[9/19.5] bg-[#111] rounded-3xl border-4 border-[#333] shadow-2xl flex items-center justify-center translate-y-12">
                 <span className="text-[10px] tracking-[0.2em] opacity-40 text-white text-center">MOBILE APP</span>
               </div>
               <div className="w-64 md:w-96 aspect-[3/4] bg-[#222] rounded-3xl border-4 border-[#444] shadow-2xl flex items-center justify-center -translate-y-8">
                 <span className="text-[10px] tracking-[0.2em] opacity-40 text-white text-center">TABLET APP</span>
               </div>
             </div>
          </div>
        </div>

        {/* Approach + Large Mockup */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center">
            <div className="md:col-span-1">
              <h2 className="display-heading text-3xl md:text-4xl mb-6">APPROACH</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                Data heavily informed our structural decisions. By analyzing viewing habits, we realized users primarily cared about two things: what is live right now, and what are the highlights of matches they missed.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                We streamlined the navigation to focus on these two pillars, removing cluttered sub-menus that previously hid valuable archival content.
              </p>
            </div>
            <div className="md:col-span-2 w-full bg-white aspect-video rounded-xl flex items-center justify-center shadow-sm border border-black/10 p-8">
              <span className="text-xs tracking-[0.2em] opacity-50 text-center">MATCH SCHEDULE & STATS UI</span>
            </div>
          </div>
        </div>

        {/* Video Player Mockup */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="w-full bg-[#111] aspect-[16/10] md:aspect-video rounded-xl border border-black/10 flex items-center justify-center shadow-xl">
            <span className="text-xs tracking-[0.2em] opacity-50 text-white">VIDEO PLAYER INTERFACE</span>
          </div>
        </div>

        {/* The Experience + 3 Screens */}
        <div className="px-8 md:px-16 py-16 max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="display-heading text-3xl md:text-4xl mb-6">THE EXPERIENCE</h2>
             <p className="text-sm md:text-base opacity-80 leading-relaxed">
               Creating a seamless transition between platforms was key. Whether watching on a phone during a commute or casting to a TV at home, the interface feels deeply integrated and context-aware.
             </p>
          </div>
          <div className="w-full bg-[#e8e6e1] aspect-video rounded-xl flex items-center justify-center shadow-sm border border-black/10 mb-12 relative overflow-hidden">
             <span className="text-xs tracking-[0.2em] opacity-50 text-center">WEB PLATFORM HERO MOCKUP</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            {[1,2,3].map((i) => (
               <div key={i} className="w-full md:w-1/3 bg-[#fff] aspect-square md:aspect-[4/5] rounded-xl flex items-center justify-center border border-black/10 shadow-md">
                 <span className="text-[10px] tracking-[0.2em] opacity-40 text-center">FEATURE DETAIL {i}</span>
               </div>
            ))}
          </div>
        </div>

        {/* Footer Tags */}
        <div className="w-full py-16 md:py-24 border-t border-black/10 overflow-hidden mt-12">
          <div className="flex justify-center whitespace-nowrap px-4">
            <span className="display-heading text-[5vw] md:text-5xl opacity-30 tracking-widest flex gap-8 md:gap-16">
              <span>UX DESIGN</span>
              <span>UI DESIGN</span>
              <span>DESIGN SYSTEM</span>
              <span>PROTOTYPING</span>
              <span>MULTI-PLATFORM</span>
            </span>
          </div>
        </div>

        {/* Learnings */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto mb-16">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">LEARNINGS</h2>
          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-4xl">
            Designing for video streaming requires a unique sensitivity to performance and cognitive load. The UI should ideally disappear when the content plays. Navigating complex legal requirements regarding broadcast rights across different territories also introduced fascinating UX constraints that challenged us to be more creative with empty states and messaging.
          </p>
        </div>

        {/* Next Project Hero (ING BANK) */}
        <Link to="/projects/ing-bank" state={{ transitionText: "LOADING" }} className="block w-full bg-[#ff6200] text-white h-screen min-h-[600px] flex items-end p-8 md:p-16 relative overflow-hidden group">
          <div className="absolute inset-0 flex justify-end items-center opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-700">
             <span className="display-heading text-[25vw] text-white whitespace-nowrap select-none">ING</span>
          </div>
          <div className="relative z-10 w-full flex justify-between items-end">
            <div>
              <h1 className="display-heading text-[8vw] md:text-[6rem] leading-[0.85] text-white">
                ING BANK
              </h1>
            </div>
            <div className="text-right pb-4 hidden md:block">
              <p className="text-xs tracking-[0.3em] opacity-50 mb-2">NEXT PROJECT</p>
              <p className="text-sm font-semibold tracking-widest">VIEW CASE STUDY ↗</p>
            </div>
          </div>
        </Link>

        <SiteFooter />
      </div>
    </motion.div>
  );
}
