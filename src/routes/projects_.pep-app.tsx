import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useLayoutEffect } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/projects_/pep-app")({
  head: () => ({
    meta: [
      { title: "PEP APP — Galekto" },
      { name: "description", content: "Case study for PEP APP." },
    ],
  }),
  component: PepAppCaseStudy,
});

function PepAppCaseStudy() {
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
          
        {/* PEP APP Hero */}
        <div className="w-full bg-[#1c1c1c] aspect-[21/9] flex items-end p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 flex justify-end items-center opacity-80 pointer-events-none">
            <div className="w-[60%] h-[120%] bg-white/5 rotate-12 translate-x-[20%]"></div>
          </div>
          <h1 className="display-heading text-[12vw] md:text-[9rem] leading-[0.85] text-[#f2f0ec] relative z-10">
            PEP APP
          </h1>
        </div>

        {/* Stats Bar */}
        <div className="w-full border-y border-black/10 bg-[#ebe9e4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 px-8 md:px-16 py-6 md:py-8 mx-auto divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="md:px-8 first:md:pl-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">CLIENT</h4>
              <p className="text-sm font-medium">Paladium Elektronik Para</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">YEAR</h4>
              <p className="text-sm font-medium">2025</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">ROLE</h4>
              <p className="text-sm font-medium">Lead Designer</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8 last:md:pr-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">PLATFORM</h4>
              <p className="text-sm font-medium">iOS, Android</p>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">ABOUT PEP (PALADYUM ELEKTRONIK PARA)</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
              Reworked missing or inconsistent product pages into a unified experience. Restructured user journeys, improved navigation between core features, and shipped a scalable design system that raised visual coherence across major fintech functionalities.
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              The primary objective was to create an intuitive and accessible interface that instills trust. We focused on clarity, reducing cognitive load by simplifying complex financial data into digestible, actionable insights.
            </p>
          </div>
        </div>

        {/* The Challenge & The Solution */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE CHALLENGE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                The existing application suffered from fragmented user flows and inconsistent visual language across different modules. Users struggled to navigate between core features, leading to drop-offs in key conversion funnels. The lack of a centralized design system made it difficult for engineering and design teams to align on updates.
              </p>
            </div>
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE SOLUTION</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                We initiated a comprehensive audit of the entire application, mapping out existing user journeys and identifying critical pain points. By establishing a robust, scalable design system, we standardized components and typography. The redesigned navigation architecture streamlined access to core features, significantly improving overall usability and visual coherence.
              </p>
            </div>
          </div>
        </div>

        {/* Laptop Mockup */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="w-full bg-[#e8e6e1] aspect-video rounded-xl border border-black/10 flex items-center justify-center shadow-sm">
            <span className="text-xs tracking-[0.2em] opacity-50">WEB DASHBOARD (LAPTOP MOCKUP)</span>
          </div>
        </div>

        {/* My Role */}
        <div className="px-8 md:px-16 py-16 md:py-20 max-w-7xl mx-auto">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">MY ROLE</h2>
          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-4xl">
            As the Lead UX/UI Designer, I spearheaded the entire redesign process from initial research to final implementation. I worked closely with product managers and engineers to ensure technical feasibility while advocating for user-centric solutions. My responsibilities included wireframing, prototyping, building the comprehensive design system, and providing art direction for marketing assets.
          </p>
        </div>

        {/* Key Features */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">KEY FEATURES</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                A complete overhaul of the component library enabled the introduction of a seamless dark mode. Color contrast ratios were rigorously tested to ensure accessibility compliance across both light and dark themes.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                We introduced personalized dashboards, simplified money transfer flows, and a unified transaction history module with advanced filtering capabilities.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-[280px] bg-white aspect-[9/19.5] rounded-[3rem] border-[8px] border-black/10 flex items-center justify-center shadow-xl">
                <span className="text-xs tracking-[0.2em] opacity-40 text-center px-4">APP HOME SCREEN</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Result */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="order-2 md:order-1">
              <div className="w-full bg-[#1c1c1c] aspect-[4/3] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xs tracking-[0.2em] opacity-50 text-white/50 text-center px-4">UI COMPONENTS DARK</span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE RESULT</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                The redesigned app launched to overwhelmingly positive user feedback. Task completion rates for key actions like transfers and bill payments increased by 35%. 
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                The new design system reduced development time for new features by 40%, allowing the team to iterate and ship updates much faster than before.
              </p>
            </div>
          </div>
        </div>

        {/* Wireframe to Visual (Two Phones) */}
        <div className="px-8 md:px-16 py-20 max-w-7xl mx-auto">
          <div className="w-full bg-[#d0cac2] aspect-video md:aspect-[21/9] rounded-xl flex items-center justify-center shadow-inner overflow-hidden relative">
             <div className="absolute inset-0 flex items-center justify-center gap-12 rotate-[-15deg] scale-125">
               <div className="w-48 md:w-64 aspect-[9/19.5] bg-white/80 rounded-3xl border-4 border-white/50 shadow-2xl flex items-center justify-center">
                 <span className="text-[10px] tracking-[0.2em] opacity-40 text-center">WIREFRAME</span>
               </div>
               <div className="w-48 md:w-64 aspect-[9/19.5] bg-[#111] rounded-3xl border-4 border-[#333] shadow-2xl flex items-center justify-center mt-24">
                 <span className="text-[10px] tracking-[0.2em] opacity-40 text-white text-center">FINAL UI</span>
               </div>
             </div>
          </div>
          <p className="text-center text-xs tracking-[0.2em] opacity-50 mt-8">WIREFRAME TO VISUAL EVOLUTION</p>
        </div>

        {/* Wireframes Grid */}
        <div className="px-8 md:px-16 py-12 max-w-[1400px] mx-auto">
          <div className="w-full bg-[#cfccc4] aspect-video rounded-xl flex items-center justify-center p-8">
             <span className="text-xs tracking-[0.2em] opacity-40 text-center">WIREFRAMES ARCHITECTURE GRID</span>
          </div>
        </div>

        {/* Design System */}
        <div className="px-8 md:px-16 py-12 max-w-[1400px] mx-auto">
          <div className="w-full bg-[#cfccc4] aspect-video rounded-xl flex items-center justify-center p-8">
             <span className="text-xs tracking-[0.2em] opacity-40 text-center">DESIGN SYSTEM, COLORS, TYPOGRAPHY, ICONS</span>
          </div>
        </div>

        {/* Footer Tags */}
        <div className="w-full py-16 md:py-24 border-t border-black/10 overflow-hidden">
          <div className="flex justify-center whitespace-nowrap px-4">
            <span className="display-heading text-[5vw] md:text-5xl opacity-30 tracking-widest flex gap-8 md:gap-16">
              <span>UX DESIGN</span>
              <span>UI DESIGN</span>
              <span>WIREFRAMING</span>
              <span>DESIGN SYSTEM</span>
              <span>PROTOTYPING</span>
            </span>
          </div>
        </div>

        {/* Learnings */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto mb-16">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">LEARNINGS</h2>
          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-4xl">
            This project underscored the vital importance of aligning engineering and design teams early in the process. Creating a comprehensive design system wasn't just about visual consistency; it was a necessary bridge for cross-functional communication. We also learned that incremental user testing during the wireframing phase saved countless hours of revisions later on.
          </p>
        </div>

        {/* Next Project Hero (AGENT CHAOS) */}
        <Link to="/projects/agent-chaos" state={{ transitionText: "LOADING" }} className="block w-full bg-[#111] text-white aspect-[21/9] flex items-end p-8 md:p-16 cursor-pointer hover:bg-black transition-colors relative group">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <span className="display-heading text-[25vw] text-[#e14b42] whitespace-nowrap select-none">AGENT CHAOS</span>
          </div>
          <div className="relative z-10 w-full flex justify-between items-end">
            <div>
              <h1 className="display-heading text-[8vw] md:text-[6rem] leading-[0.85] text-white">
                A.G.E.N.T. CHAOS
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
