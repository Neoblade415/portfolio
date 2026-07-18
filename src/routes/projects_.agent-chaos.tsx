import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useLayoutEffect } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/projects_/agent-chaos")({
  head: () => ({
    meta: [
      { title: "A.G.E.N.T. CHAOS — Galekto" },
      { name: "description", content: "Case study for A.G.E.N.T. CHAOS." },
    ],
  }),
  component: AgentChaosCaseStudy,
});

function AgentChaosCaseStudy() {
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
        <div className="w-full bg-[#111] aspect-[21/9] flex items-end p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <span className="display-heading text-[20vw] text-[#e14b42] whitespace-nowrap">AGENT CHAOS</span>
          </div>
          <h1 className="display-heading text-[12vw] md:text-[9rem] leading-[0.85] text-[#f2f0ec] relative z-10">
            A.G.E.N.T. CHAOS
          </h1>
        </div>

        {/* Stats Bar */}
        <div className="w-full border-y border-black/10 bg-[#ebe9e4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 px-8 md:px-16 py-6 md:py-8 mx-auto divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="md:px-8 first:md:pl-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">CLIENT</h4>
              <p className="text-sm font-medium">Jollify Games</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">YEAR</h4>
              <p className="text-sm font-medium">2025</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">ROLE</h4>
              <p className="text-sm font-medium">Lead UX/UI & Game Designer</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8 last:md:pr-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">PLATFORM</h4>
              <p className="text-sm font-medium">Mobile</p>
            </div>
          </div>
        </div>

        {/* Overview & Grid */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="max-w-4xl mb-16">
            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">PROJECT CONTEXT</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              Led the UX/UI and overarching game design elements for A.G.E.N.T. Chaos, a fast-paced pixel art strategy game. Designed all menus, heads-up displays, and combat interfaces to ensure clear readability amidst the retro visual style.
            </p>
          </div>
          <div className="w-full bg-[#1c1c1c] aspect-[16/7] rounded-xl flex items-center justify-center shadow-lg border border-black/10">
            <span className="text-xs tracking-[0.2em] opacity-50 text-white/50 px-4">CHARACTER PORTRAIT GRID MOCKUP</span>
          </div>
        </div>

        {/* The Challenge & Solution */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE CHALLENGE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                Balancing nostalgic pixel art aesthetics with modern mobile usability standards. The dense character rosters and upgrade trees needed to be accessible on small screens without losing the gritty, retro vibe.
              </p>
            </div>
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE SOLUTION</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                Developed a scalable UI system using high-contrast typography and clear iconography that blended seamlessly with the game's pixel art. We utilized simplified tap targets and gesture-based navigation for complex inventory screens.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Screens UI */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">
          {[1,2,3,4].map((i) => (
             <div key={i} className="w-full md:w-1/4 bg-[#333] aspect-[9/19.5] rounded-xl flex items-center justify-center border-4 border-[#222] shadow-xl">
               <span className="text-[10px] tracking-[0.2em] opacity-40 text-white text-center">GAME UI {i}</span>
             </div>
          ))}
        </div>

        {/* UI Design & 2 Screens */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">UI DESIGN</h2>
          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-4xl mb-12">
            The user interface was crafted to feel like a tactile, retro dashboard. Deeply integrated visual feedback loops ensure players always understand the combat state and resource availability at a glance.
          </p>
          <div className="w-full bg-[#1c1c1c] aspect-[21/9] rounded-xl flex items-center justify-center shadow-lg border border-black/10">
            <span className="text-xs tracking-[0.2em] opacity-50 text-white/50 px-4">GAMEPLAY SCREENS MOCKUP</span>
          </div>
        </div>

        {/* Footer Tags */}
        <div className="w-full py-16 md:py-24 border-t border-black/10 overflow-hidden">
          <div className="flex justify-center whitespace-nowrap px-4">
            <span className="display-heading text-[5vw] md:text-5xl opacity-30 tracking-widest flex gap-8 md:gap-16">
              <span>UX DESIGN</span>
              <span>UI DESIGN</span>
              <span>GAME DESIGN</span>
              <span>PROTOTYPING</span>
              <span>ILLUSTRATION</span>
            </span>
          </div>
        </div>

        {/* Learnings */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto mb-16">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">LEARNINGS</h2>
          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-4xl">
            Designing for a specific retro aesthetic requires a deep understanding of historical UI patterns while strictly adhering to modern UX principles. Striking that balance was difficult but ultimately rewarding, resulting in an interface that felt authentic yet highly usable.
          </p>
        </div>

        {/* Next Project Hero (ZYNGA SOLITAIRE) */}
        <Link to="/projects/zynga-solitaire" state={{ transitionText: "LOADING" }} className="block w-full bg-[#1e4a3b] text-white aspect-[21/9] flex items-end p-8 md:p-16 relative overflow-hidden group">
          <div className="absolute inset-0 flex justify-end items-center opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-700">
             <span className="display-heading text-[25vw] text-white whitespace-nowrap select-none">SOLITAIRE</span>
          </div>
          <div className="relative z-10 w-full flex justify-between items-end">
            <div>
              <h1 className="display-heading text-[8vw] md:text-[6rem] leading-[0.85] text-white">
                ZYNGA SOLITAIRE
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
