import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useLayoutEffect } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/projects_/zynga-solitaire")({
  head: () => ({
    meta: [
      { title: "ZYNGA SOLITAIRE — Galekto" },
      { name: "description", content: "Case study for ZYNGA SOLITAIRE." },
    ],
  }),
  component: ZyngaSolitaireCaseStudy,
});

function ZyngaSolitaireCaseStudy() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <motion.div ref={scrollRef} className="w-full h-full crt-content-scroll" style={{ background: "#f2f0ec" }}>
      <div className="w-full text-[#222]">
        
        {/* Site Header */}
        <div className="relative z-50 p-6 pointer-events-none">
          <div className="pointer-events-auto">
            <SiteHeader variant="light" centerIcons="diamond" />
          </div>
        </div>
          
        {/* Hero */}
        <div className="w-full bg-[#1e4a3b] aspect-[21/9] flex items-end p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <span className="display-heading text-[25vw] text-white whitespace-nowrap">SOLITAIRE</span>
          </div>
          <h1 className="display-heading text-[12vw] md:text-[9rem] leading-[0.85] text-[#f2f0ec] relative z-10">
            ZYNGA SOLITAIRE
          </h1>
        </div>

        {/* Stats Bar */}
        <div className="w-full border-y border-black/10 bg-[#ebe9e4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 px-8 md:px-16 py-6 md:py-8 mx-auto divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="md:px-8 first:md:pl-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">CLIENT</h4>
              <p className="text-sm font-medium">Zynga</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">YEAR</h4>
              <p className="text-sm font-medium">2020</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">ROLE</h4>
              <p className="text-sm font-medium">UX/UI Designer</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8 last:md:pr-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">PLATFORM</h4>
              <p className="text-sm font-medium">iOS, Android</p>
            </div>
          </div>
        </div>

        {/* Overview & Intro text */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="max-w-4xl mb-16">
            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">PROJECT CONTEXT</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
              Contributed to the interface layouts and interaction patterns for Zynga's Solitaire app. Designed elements that support clear gameplay flows and accessible player experiences for one of the most classic card games in the world.
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              The focus was strictly on usability, clarity of the card faces, and optimizing the drag-and-drop / tap-to-move mechanics for varying screen sizes.
            </p>
          </div>
        </div>

        {/* 3 Mockups with Playing Cards */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 justify-between items-center">
          {[1,2,3].map((i) => (
             <div key={i} className="w-full md:w-1/3 bg-[#2a6853] aspect-[9/19.5] rounded-[2rem] flex items-center justify-center border-[8px] border-[#1e4a3b] shadow-2xl relative overflow-hidden">
               <span className="text-[10px] tracking-[0.2em] opacity-40 text-white text-center">SOLITAIRE SCREEN {i}</span>
             </div>
          ))}
        </div>

        {/* My Role & Process + Flowchart */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">MY ROLE & PROCESS</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                I owned the core gameplay UI and meta-game screens (like leaderboards and daily challenges). The process involved extensive mapping of the user journey to ensure that the transition between playing a hand and viewing rewards felt completely frictionless.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                By diagramming the full application architecture, we identified redundant screens and consolidated the navigation, bringing the most important features to the forefront.
              </p>
            </div>
            <div className="w-full bg-white aspect-square md:aspect-[4/3] rounded-xl flex items-center justify-center shadow-sm border border-black/10 p-8">
              <span className="text-xs tracking-[0.2em] opacity-50 text-center">FLOWCHART DIAGRAM</span>
            </div>
          </div>
        </div>

        {/* 4 Mockups */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">
          {[1,2,3,4].map((i) => (
             <div key={i} className="w-full md:w-1/4 bg-[#111] aspect-[9/19.5] rounded-xl flex items-center justify-center border border-black/10 shadow-lg">
               <span className="text-[10px] tracking-[0.2em] opacity-40 text-white text-center">UI FLOW {i}</span>
             </div>
          ))}
        </div>

        {/* The Challenge & Solution */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE CHALLENGE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                Refreshing a classic game without alienating the existing player base. The design needed to feel modern and crisp, but fundamentally familiar. Card readability on smaller devices was a major pain point in previous iterations.
              </p>
            </div>
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE SOLUTION</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                We designed a modular card system with enhanced contrast and larger suit indicators. The UI surrounding the play area was minimized to maximize the playable space, and we introduced subtle animations to make interactions feel more satisfying.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Kings / Assets Grid */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="w-full bg-[#e8e6e1] aspect-[21/9] rounded-xl flex items-center justify-center shadow-sm border border-black/10">
             <span className="text-xs tracking-[0.2em] opacity-50 text-center">ILLUSTRATIONS / CARD ASSETS (4 KINGS)</span>
          </div>
        </div>

        {/* Footer Tags */}
        <div className="w-full py-16 md:py-24 border-t border-black/10 overflow-hidden mt-12">
          <div className="flex justify-center whitespace-nowrap px-4">
            <span className="display-heading text-[5vw] md:text-5xl opacity-30 tracking-widest flex gap-8 md:gap-16">
              <span>UX DESIGN</span>
              <span>PROTOTYPING</span>
              <span>GAME DESIGN</span>
              <span>ICON DESIGN</span>
              <span>ILLUSTRATION</span>
            </span>
          </div>
        </div>

        {/* Learnings */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto mb-16">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">LEARNINGS</h2>
          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-4xl">
            Working on a title with millions of daily active users taught me the importance of subtlety in design updates. Even minor changes to card layouts had measurable impacts on session lengths. This project reinforced the value of data-driven design decisions over purely aesthetic ones.
          </p>
        </div>

        {/* Next Project Hero (BEIN SPORTS) */}
        <Link to="/projects/bein-sports-connect" state={{ transitionText: "LOADING" }} className="block w-full bg-[#201041] text-white aspect-[21/9] flex items-end p-8 md:p-16 relative overflow-hidden group">
          <div className="absolute inset-0 flex justify-end items-center opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-700">
             <span className="display-heading text-[25vw] text-white whitespace-nowrap select-none">BEIN</span>
          </div>
          <div className="relative z-10 w-full flex justify-between items-end">
            <div>
              <h1 className="display-heading text-[8vw] md:text-[6rem] leading-[0.85] text-white">
                BEIN SPORTS CONNECT
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
