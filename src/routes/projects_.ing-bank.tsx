import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useLayoutEffect } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/projects_/ing-bank")({
  head: () => ({
    meta: [
      { title: "ING BANK — Galekto" },
      { name: "description", content: "Case study for ING BANK." },
    ],
  }),
  component: IngBankCaseStudy,
});

function IngBankCaseStudy() {
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
        <div className="w-full bg-[#ff6200] aspect-[21/9] flex items-end p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <span className="display-heading text-[25vw] text-white whitespace-nowrap">ING BANK</span>
          </div>
          <h1 className="display-heading text-[12vw] md:text-[9rem] leading-[0.85] text-[#f2f0ec] relative z-10">
            ING BANK
          </h1>
        </div>

        {/* Stats Bar */}
        <div className="w-full border-y border-black/10 bg-[#ebe9e4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 px-8 md:px-16 py-6 md:py-8 mx-auto divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="md:px-8 first:md:pl-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">CLIENT</h4>
              <p className="text-sm font-medium">ING Group</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">YEAR</h4>
              <p className="text-sm font-medium">2018</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">ROLE</h4>
              <p className="text-sm font-medium">UX/UI Designer</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8 last:md:pr-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">PLATFORM</h4>
              <p className="text-sm font-medium">Mobile</p>
            </div>
          </div>
        </div>

        {/* Overview & Intro text */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="max-w-4xl mb-16">
            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">PROJECT CONTEXT</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
              A comprehensive redesign of the ING mobile banking app. The goal was to modernize the visual language, improve the discoverability of advanced features, and establish a design system that could be rolled out across European markets.
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              We focused on creating a warmer, more human approach to digital banking, moving away from the cold, spreadsheet-like interfaces of the past.
            </p>
          </div>
        </div>

        {/* The Challenge & Solution */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE CHALLENGE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                The legacy app had grown organically over years, resulting in deeply buried features and inconsistent navigation patterns. Users frequently called support for tasks they should have been able to complete in the app.
              </p>
            </div>
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE SOLUTION</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                We restructured the information architecture, bringing everyday tasks (transfers, balance checks) to the forefront while neatly tucking away complex configurations into logical hubs. The introduction of colloquial language and illustrative elements softened the experience.
              </p>
            </div>
          </div>
        </div>

        {/* 2 Mobile Mockups */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto flex flex-col md:flex-row justify-center gap-16 items-center">
          <div className="w-64 md:w-80 aspect-[9/19.5] bg-[#fff] rounded-[3rem] flex items-center justify-center border-[8px] border-black/10 shadow-xl relative overflow-hidden">
             <span className="text-[10px] tracking-[0.2em] opacity-40 text-center">ACCOUNT DASHBOARD</span>
          </div>
          <div className="w-64 md:w-80 aspect-[9/19.5] bg-[#fff] rounded-[3rem] flex items-center justify-center border-[8px] border-black/10 shadow-xl relative overflow-hidden">
             <span className="text-[10px] tracking-[0.2em] opacity-40 text-center">TRANSFER FLOW</span>
          </div>
        </div>

        {/* My Role & Process + Wireframes */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="order-2 md:order-1 w-full bg-[#e8e6e1] aspect-square rounded-xl flex items-center justify-center shadow-inner border border-black/10 p-8">
              <span className="text-xs tracking-[0.2em] opacity-50 text-center">WIREFRAMES / PAPER STACKS MOCKUP</span>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="display-heading text-3xl md:text-4xl mb-6">MY ROLE & PROCESS</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                I was responsible for translating complex business requirements into intuitive UI flows. This involved rapid paper prototyping and iterative user testing sessions to validate our assumptions before writing a single line of code.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                A significant portion of my time was spent standardizing the component library to ensure the new design language could be easily maintained by the internal development teams.
              </p>
            </div>
          </div>
        </div>

        {/* Isometric Grid */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="w-full bg-[#1c1c1c] aspect-[16/9] rounded-xl border border-black/10 flex items-center justify-center shadow-xl">
            <span className="text-xs tracking-[0.2em] opacity-50 text-white/50">ISOMETRIC SCREENS GRID</span>
          </div>
        </div>

        {/* The Match (or some feature text) + 1 Angled Mockup */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE MATCH</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                One of the standout features we introduced was "The Match," a smart categorisation tool that automatically grouped transactions and provided users with actionable insights on their spending habits.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                By visualizing the data through clear, engaging infographics, we turned a mundane task into a valuable financial wellness tool.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-[320px] bg-[#d0cac2] aspect-[3/4] rounded-xl border border-black/10 flex items-center justify-center shadow-lg rotate-3">
                <span className="text-xs tracking-[0.2em] opacity-40 text-center px-4">ANGLED FEATURE MOCKUP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Icons Grid */}
        <div className="px-8 md:px-16 py-12 max-w-[1400px] mx-auto">
          <div className="w-full bg-white aspect-[21/9] rounded-xl flex items-center justify-center shadow-sm border border-black/10 p-8">
             <span className="text-xs tracking-[0.2em] opacity-40 text-center">ICONOGRAPHY SYSTEM GRID</span>
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
              <span>MOBILE DESIGN</span>
            </span>
          </div>
        </div>

        {/* Learnings */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto mb-16">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">LEARNINGS</h2>
          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-4xl">
            Working within the strict regulatory environment of the banking sector taught me how to balance compliance requirements with optimal user experience. Sometimes the "best" UX is legally impossible, and true design problem-solving lies in finding the most elegant compromise.
          </p>
        </div>

        {/* Next Project Hero (PEP APP) */}
        <Link to="/projects/pep-app" state={{ transitionText: "LOADING" }} className="block w-full bg-[#1c1c1c] text-white aspect-[21/9] flex items-end p-8 md:p-16 relative overflow-hidden group">
          <div className="absolute inset-0 flex justify-end items-center opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-700">
             <span className="display-heading text-[25vw] text-[#ff6200] whitespace-nowrap select-none">PEP</span>
          </div>
          <div className="relative z-10 w-full flex justify-between items-end">
            <div>
              <h1 className="display-heading text-[8vw] md:text-[6rem] leading-[0.85] text-white">
                PALADIUM ELEKTRONIK PARA
              </h1>
            </div>
            <div className="text-right pb-4 hidden md:block">
              <p className="text-xs tracking-[0.3em] opacity-50 mb-2">NEXT PROJECT</p>
              <p className="text-sm font-semibold tracking-widest text-white">VIEW CASE STUDY ↗</p>
            </div>
          </div>
        </Link>

        <SiteFooter />
      </div>
    </motion.div>
  );
}
